import { useState, useEffect } from 'react';
import { Calendar, FileText, User, Download, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api, API_URL } from '../lib/api';

interface AppointmentWithService {
  id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  notes: string | null;
  services: {
    name: string;
    duration_minutes: number;
  };
}

interface EvaluationWithProfessional {
  id: string;
  evaluation_date: string;
  pdf_url: string | null;
  notes: string | null;
  profiles: {
    full_name: string;
  };
}

interface ClientDashboardProps {
  onNavigate: (page: string) => void;
}

function PasswordChangeCard() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('A confirmação da nova senha não confere');
      return;
    }

    if (newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      await api.post<{ success: boolean }>('/auth/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
      });
      setSuccess('Senha alterada com sucesso');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      const message = err?.message || 'Erro ao alterar senha';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black p-8 rounded-xl shadow-lg border-2 border-yellow-400">
      <div className="flex items-center gap-2 mb-4">
        <Lock size={22} className="text-yellow-400" />
        <h3 className="text-xl font-bold text-yellow-400">Alterar Senha</h3>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg border border-red-400 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg border border-green-400 text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-yellow-400 font-semibold mb-2">Senha atual</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-yellow-500/60 rounded-lg bg-black text-yellow-100 focus:border-yellow-400 focus:outline-none transition"
            required
          />
        </div>
        <div>
          <label className="block text-yellow-400 font-semibold mb-2">Nova senha</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-yellow-500/60 rounded-lg bg-black text-yellow-100 focus:border-yellow-400 focus:outline-none transition"
            required
            minLength={6}
          />
        </div>
        <div>
          <label className="block text-yellow-400 font-semibold mb-2">Confirmar nova senha</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-yellow-500/60 rounded-lg bg-black text-yellow-100 focus:border-yellow-400 focus:outline-none transition"
            required
            minLength={6}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Salvar nova senha'}
        </button>
      </form>
    </div>
  );
}
export function ClientDashboard({ onNavigate }: ClientDashboardProps) {
  const { profile, user } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentWithService[]>([]);
  const [evaluations, setEvaluations] = useState<EvaluationWithProfessional[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'appointments' | 'evaluations' | 'profile'>('appointments');

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;

    try {
      const [appointmentsData, evaluationsData] = await Promise.all([
        api.get<any[]>(`/client/${user.id}/appointments`),
        api.get<any[]>(`/client/${user.id}/evaluations`),
      ]);

      const mappedAppointments: AppointmentWithService[] = appointmentsData.map((item) => ({
        id: item.id,
        appointment_date: item.appointment_date,
        appointment_time: item.appointment_time,
        status: item.status,
        notes: item.notes,
        services: {
          name: item.service_name,
          duration_minutes: item.service_duration_minutes,
        },
      }));

      const mappedEvaluations: EvaluationWithProfessional[] = evaluationsData.map((item) => ({
        id: item.id,
        evaluation_date: item.evaluation_date,
        pdf_url: item.pdf_url,
        notes: item.notes,
        profiles: {
          full_name: item.professional_full_name,
        },
      }));

      setAppointments(mappedAppointments);
      setEvaluations(mappedEvaluations);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar dados do cliente', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-400',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-400',
      completed: 'bg-green-100 text-green-800 border-green-400',
      cancelled: 'bg-red-100 text-red-800 border-red-400',
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: 'Pendente',
      confirmed: 'Confirmado',
      completed: 'Concluído',
      cancelled: 'Cancelado',
    };
    return texts[status as keyof typeof texts] || status;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f2c94c] flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2c94c] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="w-full flex justify-start mb-3">
            <div className="bg-black rounded-xl px-6 py-3 shadow-lg border border-yellow-400/40 inline-block">
              <h1 className="text-4xl font-bold text-yellow-400 m-0">
                Olá, {profile?.full_name}!
              </h1>
            </div>
          </div>
          <p className="text-gray-600">Bem-vindo à sua área de cliente</p>
        </div>

        <div className="flex gap-4 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-6 py-3 font-semibold transition border-b-4 whitespace-nowrap rounded-xl shadow-md border-transparent ${
              activeTab === 'appointments'
                ? 'bg-black text-yellow-400 border-yellow-400'
                : 'bg-black text-gray-300 hover:text-yellow-300 border-gray-500/40'
            }`}
          >
            <Calendar className="inline mr-2" size={20} />
            Meus Agendamentos
          </button>
          <button
            onClick={() => setActiveTab('evaluations')}
            className={`px-6 py-3 font-semibold transition border-b-4 whitespace-nowrap rounded-xl shadow-md border-transparent ${
              activeTab === 'evaluations'
                ? 'bg-black text-yellow-400 border-yellow-400'
                : 'bg-black text-gray-300 hover:text-yellow-300 border-gray-500/40'
            }`}
          >
            <FileText className="inline mr-2" size={20} />
            Minhas Avaliações
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 font-semibold transition border-b-4 whitespace-nowrap rounded-xl shadow-md border-transparent ${
              activeTab === 'profile'
                ? 'bg-black text-yellow-400 border-yellow-400'
                : 'bg-black text-gray-300 hover:text-yellow-300 border-gray-500/40'
            }`}
          >
            <User className="inline mr-2" size={20} />
            Meu Perfil
          </button>
        </div>

        {activeTab === 'appointments' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="inline-block bg-black border border-yellow-400/40 rounded-xl px-6 py-3 shadow-lg">
                <h2 className="text-2xl font-bold text-yellow-400 m-0">Agendamentos</h2>
              </div>
              <button
                onClick={() => onNavigate('booking')}
                className="bg-black border border-yellow-400/60 text-yellow-400 px-6 py-2 rounded-lg font-semibold shadow-lg hover:bg-[#111111] transition"
              >
                Novo Agendamento
              </button>
            </div>

            {appointments.length === 0 ? (
              <div className="bg-black text-yellow-400 p-12 rounded-xl shadow-lg border-2 border-yellow-400 text-center">
                <Calendar size={64} className="mx-auto text-yellow-400 mb-4" />
                <p className="text-yellow-100 text-lg mb-4">Você ainda não tem agendamentos</p>
                <button
                  onClick={() => onNavigate('booking')}
                  className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
                >
                  Agendar Primeira Avaliação
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-black text-white p-6 rounded-xl shadow-md border-2 border-yellow-400 hover:shadow-lg transition"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-yellow-400 mb-2">
                          {appointment.services.name}
                        </h3>
                        <div className="space-y-1 text-yellow-100">
                          <p>
                            <Calendar className="inline mr-2" size={16} />
                            {new Date(appointment.appointment_date).toLocaleDateString('pt-BR')} às {appointment.appointment_time}
                          </p>
                          <p className="text-sm">Duração: {appointment.services.duration_minutes} minutos</p>
                          {appointment.notes && (
                            <p className="text-sm mt-2 italic">Obs: {appointment.notes}</p>
                          )}
                        </div>
                      </div>
                      <span className={`px-4 py-2 rounded-lg font-semibold border-2 ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'evaluations' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Histórico de Avaliações</h2>

            {evaluations.length === 0 ? (
              <div className="bg-white p-12 rounded-xl shadow-lg border-2 border-yellow-400 text-center">
                <FileText size={64} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg">Nenhuma avaliação realizada ainda</p>
              </div>
            ) : (
              <div className="space-y-4">
                {evaluations.map((evaluation) => (
                  <div
                    key={evaluation.id}
                    className="bg-black text-white p-6 rounded-xl shadow-md border-2 border-yellow-400 hover:shadow-lg transition"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-yellow-400 mb-2">
                          Avaliação Física
                        </h3>
                        <div className="space-y-1 text-yellow-100">
                          <p>
                            <Calendar className="inline mr-2" size={16} />
                            {new Date(evaluation.evaluation_date).toLocaleDateString('pt-BR')}
                          </p>
                          <p>
                            <User className="inline mr-2" size={16} />
                            Profissional: {evaluation.profiles.full_name}
                          </p>
                          {evaluation.notes && (
                            <p className="text-sm mt-2 italic">Observações: {evaluation.notes}</p>
                          )}
                        </div>
                      </div>
                      {evaluation.pdf_url && (
                        <button
                          onClick={() => {
                            const url = evaluation.pdf_url!.startsWith('http')
                              ? evaluation.pdf_url!
                              : `${API_URL}${evaluation.pdf_url}`;
                            window.open(url, '_blank');
                          }}
                          className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition flex items-center gap-2"
                        >
                          <Download size={20} />
                          Baixar PDF
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Meu Perfil</h2>
            <div className="grid gap-8 lg:grid-cols-2 lg:items-start max-w-5xl">
              <div className="bg-black p-8 rounded-xl shadow-lg border-2 border-yellow-400">
                <div className="space-y-6">
                  <div>
                    <label className="block text-yellow-400 font-semibold mb-2">Nome Completo</label>
                    <p className="px-4 py-3 bg-black border border-yellow-400/40 rounded-lg text-yellow-100">
                      {profile?.full_name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-yellow-400 font-semibold mb-2">E-mail</label>
                    <p className="px-4 py-3 bg-black border border-yellow-400/40 rounded-lg text-yellow-100">
                      {profile?.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-yellow-400 font-semibold mb-2">Telefone</label>
                    <p className="px-4 py-3 bg-black border border-yellow-400/40 rounded-lg text-yellow-100">
                      {profile?.phone || 'Não informado'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-yellow-400 font-semibold mb-2">Membro desde</label>
                    <p className="px-4 py-3 bg-black border border-yellow-400/40 rounded-lg text-yellow-100">
                      {new Date(profile?.created_at || '').toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>

              <PasswordChangeCard />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
