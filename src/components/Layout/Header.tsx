import { Menu, X, User, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    onNavigate('home');
  };

  return (
    <header className="bg-black text-yellow-400 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <img
              src="/brand/logo-novo.png.jpeg"
              alt="Clínica Checkin - símbolo"
              className="h-12 w-auto md:hidden transition-transform duration-200 hover:scale-105"
            />
            <img
              src="/brand/logo-novo.png.jpeg"
              alt="Clínica Checkin - logo"
              className="hidden md:block h-16 w-auto transition-transform duration-200 hover:scale-105"
            />
            <span className="text-2xl font-bold ml-3 hidden sm:inline">Clínica Checkin</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-yellow-300 transition ${currentPage === 'home' ? 'text-yellow-300 font-semibold' : ''}`}
            >
              Início
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`hover:text-yellow-300 transition ${currentPage === 'contact' ? 'text-yellow-300 font-semibold' : ''}`}
            >
              Contato
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-yellow-300 transition"
            >
              Sobre Mim
            </button>

            <a
              href="https://wa.me/557599196485"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition"
            >
              WhatsApp
            </a>
            <a
              href="https://instagram.com/clinica_checkin"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition"
            >
              Instagram
            </a>

            {user ? (
              <>
                <button
                  onClick={() => onNavigate(profile?.role === 'client' ? 'client-dashboard' : 'admin-dashboard')}
                  className="flex items-center gap-2 hover:text-yellow-300 transition"
                >
                  <User size={20} />
                  Minha Área
                </button>
                <button
                  onClick={handleSignOut}
                  className="bg-yellow-400 text-black px-6 py-2 rounded-lg hover:bg-yellow-500 transition font-semibold"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="hover:text-yellow-300 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate('booking')}
                  className="bg-yellow-400 text-black px-6 py-2 rounded-lg hover:bg-yellow-500 transition font-semibold flex items-center gap-2"
                >
                  <Calendar size={20} />
                  Agendar
                </button>
              </>
            )}
          </nav>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-yellow-400/20">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
                className="text-left hover:text-yellow-300 transition"
              >
                Início
              </button>
              <button
                onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }}
                className="text-left hover:text-yellow-300 transition"
              >
                Contato
              </button>
              <button
                onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }}
                className="text-left hover:text-yellow-300 transition"
              >
                Sobre Mim
              </button>
              <a
                href="https://wa.me/557599196485"
                target="_blank"
                rel="noopener noreferrer"
                className="text-left hover:text-yellow-300 transition"
              >
                WhatsApp
              </a>
              <a
                href="https://instagram.com/clinica_checkin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-left hover:text-yellow-300 transition"
              >
                Instagram
              </a>
              {user ? (
                <>
                  <button
                    onClick={() => { onNavigate(profile?.role === 'client' ? 'client-dashboard' : 'admin-dashboard'); setMobileMenuOpen(false); }}
                    className="text-left hover:text-yellow-300 transition"
                  >
                    Minha Área
                  </button>
                  <button
                    onClick={() => { handleSignOut(); setMobileMenuOpen(false); }}
                    className="text-left bg-yellow-400 text-black px-6 py-2 rounded-lg hover:bg-yellow-500 transition font-semibold"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { onNavigate('login'); setMobileMenuOpen(false); }}
                    className="text-left hover:text-yellow-300 transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => { onNavigate('booking'); setMobileMenuOpen(false); }}
                    className="text-left bg-yellow-400 text-black px-6 py-2 rounded-lg hover:bg-yellow-500 transition font-semibold"
                  >
                    Agendar Avaliação
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
