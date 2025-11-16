import { useEffect, useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { HomePage } from './pages/HomePage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { BookingPage } from './pages/BookingPage';
import { LoginPage } from './pages/LoginPage';
import { ClientDashboard } from './pages/ClientDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { ResetPasswordPage } from './pages/ResetPasswordPage';

type Page = 'home' | 'services' | 'contact' | 'booking' | 'login' | 'client-dashboard' | 'admin-dashboard' | 'about' | 'reset-password';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [resetToken, setResetToken] = useState<string | null>(null);

  const navigate = (page: string) => setCurrentPage(page as Page);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const url = new URL(window.location.href);
    const path = url.pathname;

    if (path.includes('reset-password')) {
      const token = url.searchParams.get('token');
      setResetToken(token);
      setCurrentPage('reset-password');
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'services':
        return <HomePage onNavigate={navigate} />;
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutPage />;
      case 'booking':
        return <BookingPage onNavigate={navigate} />;
      case 'login':
        return <LoginPage onNavigate={navigate} />;
      case 'client-dashboard':
        return <ClientDashboard onNavigate={navigate} />;
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={navigate} />;
      case 'reset-password':
        return <ResetPasswordPage token={resetToken} onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header onNavigate={navigate} currentPage={currentPage} />
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
