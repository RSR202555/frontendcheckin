import { useState } from 'react';
import { LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const { signIn, forgotPassword } = useAuth();
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setInfo('');

    if (isForgotPassword) {
      const { error } = await forgotPassword(formData.email);
      if (error) {
        console.error('Erro ao solicitar redefinição de senha:', error);
        setError(error.message || 'Erro ao solicitar redefinição de senha');
      } else {
        setInfo('Se este e-mail estiver cadastrado, enviaremos um link para redefinir sua senha.');
      }
    } else {
      const { error, profile } = await signIn(formData.email, formData.password);
      if (error) {
        console.error('Erro no login:', error);
        setError(error.message || 'Email ou senha incorretos');
      } else {
        if (profile && profile.role === 'admin') {
          onNavigate('admin-dashboard');
        } else {
          onNavigate('client-dashboard');
        }
      }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-yellow-400 flex items-start justify-center pt-24 pb-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8">
          <div className="inline-block bg-black border-2 border-yellow-400 rounded-xl px-6 py-4 shadow-lg">
            <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-1">Fazer Login</h1>
            <p className="text-yellow-300 text-sm sm:text-base">
              Acesse sua área de cliente ou administrativa
            </p>
          </div>
        </div>

        <div className="bg-black p-8 rounded-xl shadow-lg border-2 border-yellow-400">
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-400">
              {error}
            </div>
          )}
          {info && !error && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg border border-green-400">
              {info}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-yellow-400 font-semibold mb-2">E-mail *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none transition"
                placeholder="seu@email.com"
              />
            </div>

            {!isForgotPassword && (
              <div>
                <label className="block text-yellow-400 font-semibold mb-2">Senha *</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none transition"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black py-4 rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isForgotPassword ? null : <LogIn size={20} />}
              {loading
                ? 'Processando...'
                : isForgotPassword
                  ? 'Enviar link de redefinição'
                  : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsForgotPassword(!isForgotPassword);
                setError('');
                setInfo('');
              }}
              className="text-yellow-300 hover:text-yellow-500 font-semibold text-sm"
            >
              {isForgotPassword ? 'Voltar para login' : 'Esqueceu a senha?'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
