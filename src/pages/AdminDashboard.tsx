import { useState, useEffect } from 'react';
import { Calendar, Users, FileText, Upload } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api, API_URL } from '../lib/api';

interface AppointmentWithDetails {
  id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  notes: string | null;
  profiles: {
    full_name: string;
    email: string;
    phone: string;
  };
  services: {
    name: string;
  };
}

interface ClientProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  created_at: string;
}

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'appointments' | 'clients' | 'upload'>('appointments');
  const [appointments, setAppointments] = useState<AppointmentWithDetails[]>([]);
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState('');
  const [uploadForm, setUploadForm] = useState({
    evaluationDate: new Date().toISOString().split('T')[0],
    notes: '',
    pdfUrl: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [latestEvaluationId, setLatestEvaluationId] = useState<string | null>(null);
  const [showNewEvaluationAlert, setShowNewEvaluationAlert] = useState(false);

  useEffect(() => {
    loadData();
    initLatestEvaluationWatcher();
  }, []);

  const loadData = async () => {
    try {
      const [appointmentsData, clientsData] = await Promise.all([
        api.get<any[]>('/admin/appointments'),
        api.get<ClientProfile[]>('/admin/clients'),
      ]);

      const mappedAppointments: AppointmentWithDetails[] = appointmentsData.map((item) => ({
        id: item.id,
        appointment_date: item.appointment_date,
        appointment_time: item.appointment_time,
        status: item.status,
        notes: item.notes,
        profiles: {
          full_name: item.client_full_name,
          email: item.client_email,
          phone: item.client_phone,
        },
        services: {
          name: item.service_name,
        },
      }));

      setAppointments(mappedAppointments);
      setClients(clientsData);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar dados do admin', error);
      setLoading(false);
    }
  };

  const initLatestEvaluationWatcher = async () => {
    try {
      // Busca inicial para saber qual é a última avaliação no momento em que o painel abre
      const initial = await api.get<any | null>('/admin/evaluations/latest');
      if (initial && initial.id) {
        setLatestEvaluationId(initial.id);
      }

      // Polling periódico para verificar novas avaliações
      const intervalId = window.setInterval(async () => {
        try {
          const latest = await api.get<any | null>('/admin/evaluations/latest');
          if (latest && latest.id && latest.id !== latestEvaluationId) {
            setLatestEvaluationId(latest.id);
            setShowNewEvaluationAlert(true);
          }
        } catch (error) {
          console.error('Erro ao verificar novas avaliações', error);
        }
      }, 30000); // verifica a cada 30 segundos

      return () => window.clearInterval(intervalId);
    } catch (error) {
      console.error('Erro ao inicializar verificação de avaliações', error);
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, newStatus: string) => {
    try {
      await api.patch<{ success: boolean }>(`/admin/appointments/${appointmentId}/status`, {
        status: newStatus,
      });
      loadData();
    } catch (error) {
      console.error('Erro ao atualizar status do agendamento', error);
    }
  };

  const handleUploadEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedClient) return;

    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('client_id', selectedClient);
        if (profile?.id) {
          formData.append('professional_id', profile.id);
        }
        formData.append('appointment_id', '');
        formData.append('evaluation_date', uploadForm.evaluationDate);
        formData.append('notes', uploadForm.notes || '');

        const response = await fetch(`${API_URL}/admin/evaluations/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        }
      } else {
        await api.post<{ success: boolean }>('/admin/evaluations', {
          client_id: selectedClient,
          professional_id: profile?.id,
          appointment_id: null,
          evaluation_date: uploadForm.evaluationDate,
          pdf_url: uploadForm.pdfUrl || null,
          notes: uploadForm.notes || null,
        });
      }

      setUploadSuccess(true);
      setUploadForm({
        evaluationDate: new Date().toISOString().split('T')[0],
        notes: '',
        pdfUrl: '',
      });
      setSelectedFile(null);
      setSelectedClient('');
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      console.error('Erro ao registrar avaliação', error);
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
        {showNewEvaluationAlert && (
          <div className="mb-4 p-4 bg-blue-100 text-blue-900 rounded-lg border border-blue-400 flex justify-between items-center">
            <span>
              Nova avaliação foi registrada recentemente. Atualize a aba de clientes ou comunique o cliente.
            </span>
            <button
              onClick={() => setShowNewEvaluationAlert(false)}
              className="ml-4 text-sm font-semibold text-blue-800 hover:underline"
            >
              Fechar
            </button>
          </div>
        )}
        <div className="mb-8">
          <div className="w-full flex justify-start mb-3">
            <div className="inline-block bg-black border-2 border-yellow-400 rounded-xl px-6 py-3 shadow-lg">
              <h1 className="text-4xl font-bold text-yellow-400 m-0">
                Painel Administrativo
              </h1>
            </div>
          </div>
          <p className="text-gray-600">Bem-vindo, {profile?.full_name}</p>
        </div>

        <div className="flex gap-4 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-6 py-3 font-semibold transition whitespace-nowrap rounded-xl shadow-md border-transparent ${
              activeTab === 'appointments'
                ? 'bg-black text-yellow-400 border-yellow-400'
                : 'bg-black text-gray-300 hover:text-yellow-300 border-gray-500/40'
            }`}
          >
            <Calendar className="inline mr-2" size={20} />
            Agendamentos
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`px-6 py-3 font-semibold transition whitespace-nowrap rounded-xl shadow-md border-transparent ${
              activeTab === 'clients'
                ? 'bg-black text-yellow-400 border-yellow-400'
                : 'bg-black text-gray-300 hover:text-yellow-300 border-gray-500/40'
            }`}
          >
            <Users className="inline mr-2" size={20} />
            Clientes
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 font-semibold transition whitespace-nowrap rounded-xl shadow-md border-transparent ${
              activeTab === 'upload'
                ? 'bg-black text-yellow-400 border-yellow-400'
                : 'bg-black text-gray-300 hover:text-yellow-300 border-gray-500/40'
            }`}
          >
            <FileText className="inline mr-2" size={20} />
            Registrar Avaliação
          </button>
        </div>

        {activeTab === 'appointments' && (
          <div>
            <div className="mb-6 flex justify-start">
              <div className="inline-block bg-black border-2 border-yellow-400 rounded-xl px-6 py-3 shadow-lg">
                <h2 className="text-2xl font-bold text-yellow-400">
                  Gerenciar Agendamentos
                </h2>
              </div>
            </div>

            {appointments.length === 0 ? (
              <div className="bg-black text-yellow-100 p-12 rounded-xl shadow-lg border-2 border-yellow-400 text-center">
                <Calendar size={64} className="mx-auto text-yellow-400 mb-4" />
                <p className="text-lg">Nenhum agendamento encontrado</p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-black text-yellow-100 p-6 rounded-xl shadow-md border-2 border-yellow-400"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-yellow-400 mb-2">
                          {appointment.services.name}
                        </h3>
                        <div className="space-y-1">
                          <p className="font-semibold text-yellow-100">
                            Cliente: {appointment.profiles.full_name}
                          </p>
                          <p>E-mail: {appointment.profiles.email}</p>
                          <p>Telefone: {appointment.profiles.phone}</p>
                          <p>
                            <Calendar className="inline mr-2" size={16} />
                            {new Date(appointment.appointment_date).toLocaleDateString('pt-BR')} às {appointment.appointment_time}
                          </p>
                          {appointment.notes && (
                            <p className="text-sm mt-2 italic">Obs: {appointment.notes}</p>
                          )}
                        </div>
                      </div>
                      <span className={`px-4 py-2 rounded-lg font-semibold border-2 ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {appointment.status === 'pending' && (
                        <button
                          onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-semibold"
                        >
                          Confirmar
                        </button>
                      )}
                      {appointment.status === 'confirmed' && (
                        <button
                          onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm font-semibold"
                        >
                          Marcar como Concluído
                        </button>
                      )}
                      {appointment.status !== 'cancelled' && (
                        <button
                          onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-semibold"
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'clients' && (
          <div>
            <div className="mb-6 flex justify-start">
              <div className="inline-block bg-black border-2 border-yellow-400 rounded-xl px-6 py-3 shadow-lg">
                <h2 className="text-2xl font-bold text-yellow-400">
                  Lista de Clientes ({clients.length})
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="bg-black text-yellow-100 p-6 rounded-xl shadow-md border-2 border-yellow-400 hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-bold text-yellow-400 mb-3">{client.full_name}</h3>
                  <div className="space-y-2 text-yellow-100 text-sm">
                    <p>E-mail: {client.email}</p>
                    <p>Telefone: {client.phone || 'Não informado'}</p>
                    <p className="text-xs">
                      Cliente desde: {new Date(client.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div>
            <div className="mb-6 flex justify-start">
              <div className="inline-block bg-black border-2 border-yellow-400 rounded-xl px-6 py-3 shadow-lg">
                <h2 className="text-2xl font-bold text-yellow-400">
                  Registrar Avaliação
                </h2>
              </div>
            </div>

            <div className="bg-black text-yellow-100 p-8 rounded-xl shadow-lg border-2 border-yellow-400 max-w-2xl">
              {uploadSuccess && (
                <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg border border-green-400">
                  Avaliação registrada com sucesso!
                </div>
              )}

              <form onSubmit={handleUploadEvaluation} className="space-y-6">
                <div>
                  <label className="block text-yellow-400 font-semibold mb-2">
                    Selecionar Cliente *
                  </label>
                  <select
                    required
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-yellow-500/60 rounded-lg bg-black text-yellow-100 focus:border-yellow-400 focus:outline-none transition"
                  >
                    <option value="">Escolha um cliente</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.full_name} - {client.email}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-yellow-400 font-semibold mb-2">
                    Data da Avaliação *
                  </label>
                  <input
                    type="date"
                    required
                    value={uploadForm.evaluationDate}
                    onChange={(e) => setUploadForm({ ...uploadForm, evaluationDate: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-yellow-500/60 rounded-lg bg-black text-yellow-100 focus:border-yellow-400 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-yellow-400 font-semibold mb-2">
                    Arquivo PDF da avaliação (opcional)
                  </label>
                  <div className="flex items-center gap-2 mb-2">
                    <Upload size={20} className="text-gray-400" />
                    <span className="text-sm text-gray-600">Selecione um arquivo PDF do seu computador</span>
                  </div>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setSelectedFile(file);
                      if (file) {
                        setUploadForm({ ...uploadForm, pdfUrl: '' });
                      }
                    }}
                    className="w-full px-4 py-2 border-2 border-yellow-500/60 rounded-lg focus:border-yellow-400 focus:outline-none transition bg-black text-yellow-100"
                  />
                </div>

                <div>
                  <label className="block text-yellow-400 font-semibold mb-2">
                    Observações
                  </label>
                  <textarea
                    rows={5}
                    value={uploadForm.notes}
                    onChange={(e) => setUploadForm({ ...uploadForm, notes: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-yellow-500/60 rounded-lg bg-black text-yellow-100 focus:border-yellow-400 focus:outline-none transition resize-none"
                    placeholder="Anotações sobre a avaliação, recomendações, etc."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-400 text-black py-4 rounded-lg font-semibold hover:bg-yellow-500 transition flex items-center justify-center gap-2"
                >
                  <FileText size={20} />
                  Salvar Avaliação
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
