import { useState } from 'react';
import { api } from '../lib/api';

interface BootstrapAdminPageProps {
  onNavigate: (page: string) => void;
}

export function BootstrapAdminPage({ onNavigate }: BootstrapAdminPageProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('A confirmação de senha não confere');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/bootstrap-admin', {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      setSuccess('Administrador criado com sucesso. Você já pode fazer login.');
      setTimeout(() => {
        onNavigate('login');
      }, 2000);
    } catch (err: any) {
      const message = err?.message || 'Erro ao criar administrador inicial';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-400 flex items-start justify-center pt-24 pb-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8">
          <div className="inline-block bg-black border-2 border-yellow-400 rounded-xl px-6 py-4 shadow-lg">
            <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-1">Criar Admin Inicial</h1>
            <p className="text-yellow-300 text-sm sm:text-base">
              Use esta tela apenas para criar o primeiro administrador do sistema
            </p>
          </div>
        </div>

        <div className="bg-black p-8 rounded-xl shadow-lg border-2 border-yellow-400">
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-400 text-sm">
              {error}
            </div>
          )}
          {success && !error && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg border border-green-400 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-yellow-400 font-semibold mb-2">Nome completo *</label>
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none transition"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label className="block text-yellow-400 font-semibold mb-2">E-mail *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none transition"
                placeholder="admin@clinicacheckin.com"
              />
            </div>

            <div>
              <label className="block text-yellow-400 font-semibold mb-2">Telefone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none transition"
                placeholder="(75) 99999-9999"
              />
            </div>

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

            <div>
              <label className="block text-yellow-400 font-semibold mb-2">Confirmar senha *</label>
              <input
                type="password"
                required
                minLength={6}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none transition"
                placeholder="Repita a senha"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black py-4 rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
            >
              {loading ? 'Criando admin...' : 'Criar Admin'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('login')}
              className="text-yellow-300 hover:text-yellow-500 font-semibold text-sm"
            >
              Voltar para login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
