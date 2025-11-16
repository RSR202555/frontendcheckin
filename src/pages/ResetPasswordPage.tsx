import { useState } from 'react';
import { api } from '../lib/api';

interface ResetPasswordPageProps {
  token: string | null;
  onNavigate: (page: string) => void;
}

export function ResetPasswordPage({ token, onNavigate }: ResetPasswordPageProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');

    if (!token) {
      setError('Token inválido ou ausente. Use novamente o link enviado por e-mail.');
      return;
    }

    if (password.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/reset-password', {
        token,
        new_password: password,
      });

      setInfo('Senha redefinida com sucesso. Você já pode fazer login com a nova senha.');
      setPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        onNavigate('login');
      }, 2000);
    } catch (err) {
      console.error('Erro ao redefinir senha:', err);
      setError('Erro ao redefinir a senha. O token pode estar inválido ou expirado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-400 flex items-start justify-center pt-24 pb-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8">
          <div className="inline-block bg-black border-2 border-yellow-400 rounded-xl px-6 py-4 shadow-lg">
            <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-1">
              Redefinir Senha
            </h1>
            <p className="text-yellow-300 text-sm sm:text-base">
              Defina uma nova senha para acessar sua conta
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
              <label className="block text-yellow-400 font-semibold mb-2">Nova senha *</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none transition"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div>
              <label className="block text-yellow-400 font-semibold mb-2">Confirmar nova senha *</label>
              <input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none transition"
                placeholder="Repita a nova senha"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black py-4 rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? 'Processando...' : 'Redefinir senha'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('login')}
              className="text-yellow-400 hover:text-yellow-500 font-semibold"
            >
              Voltar para o login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
