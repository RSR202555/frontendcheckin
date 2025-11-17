import { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Service } from '../lib/supabase';
import { api } from '../lib/api';

interface BookingPageProps {
  onNavigate: (page: string) => void;
}

export function BookingPage({ onNavigate }: BookingPageProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    serviceId: '',
    date: '',
    time: '',
    notes: '',
    contactName: '',
    contactPhone: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await api.get<Service[]>('/services');
      setServices(data);
    } catch (error) {
      console.error('Erro ao carregar serviços', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.post<{ success: boolean }>('/appointments', {
        service_id: formData.serviceId,
        appointment_date: formData.date,
        appointment_time: formData.time,
        notes: formData.notes || null,
        contact_name: formData.contactName,
        contact_phone: formData.contactPhone,
      });

      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onNavigate('home');
      }, 8000);
    } catch (error) {
      console.error('Erro ao criar agendamento', error);
      setLoading(false);
    }
  };

  const timeSlots = [
    '07:00', '09:00', '10:00', '11:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-yellow-400 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-full flex justify-center mb-4">
            <div className="bg-black rounded-xl px-6 py-3 shadow-lg border border-yellow-400/40 inline-block">
              <h1 className="text-5xl font-bold text-yellow-400 m-0">Agendar Avaliação</h1>
            </div>
          </div>
          <p className="text-xl text-gray-600">
            Escolha o serviço, data e horário de sua preferência
          </p>
        </div>

        {success && (
          <div className="mb-6 space-y-4">
            <div className="p-6 bg-green-100 text-green-800 rounded-lg border border-green-400">
              <p className="font-semibold">Agendamento enviado com sucesso!</p>
              <p>Entraremos em contato para confirmar seu horário.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                window.open(
                  'https://www.google.com/maps?q=Praça+Pedro+da+Costa+Doréa,+76+-+Alagoinhas+Velha,+Alagoinhas+-+BA,+48007-326',
                  '_blank'
                );
              }}
              className="w-full bg-black text-yellow-400 p-4 rounded-xl border-2 border-yellow-400 shadow-lg hover:bg-[#111111] transition text-left"
            >
              <p className="font-semibold text-lg">Como chegar na clínica?</p>
              <p className="text-sm text-yellow-100">
                Clique aqui para abrir o endereço da clínica no Google Maps
              </p>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-black text-white p-8 rounded-xl shadow-lg border-2 border-yellow-400">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-yellow-400 font-semibold mb-2">
                  Nome completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-black focus:border-yellow-400 focus:outline-none transition"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label className="block text-yellow-400 font-semibold mb-2">
                  Telefone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-black focus:border-yellow-400 focus:outline-none transition"
                  placeholder="(75) 99999-9999"
                />
              </div>
            </div>

            <div>
              <label className="block text-yellow-400 font-semibold mb-2">
                Tipo de Avaliação *
              </label>
              <select
                required
                value={formData.serviceId}
                onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-black focus:border-yellow-400 focus:outline-none transition"
              >
                <option value="">Selecione um serviço</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - R$ {Number(service.price).toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-yellow-400 font-semibold mb-2">
                <Calendar className="inline mr-2" size={20} />
                Data *
              </label>
              <input
                type="date"
                required
                min={minDate}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-black focus:border-yellow-400 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-yellow-400 font-semibold mb-2">
                <Clock className="inline mr-2" size={20} />
                Horário *
              </label>
              <select
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-black focus:border-yellow-400 focus:outline-none transition"
              >
                <option value="">Selecione um horário</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-yellow-400 font-semibold mb-2">
                Observações (opcional)
              </label>
              <textarea
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-black focus:border-yellow-400 focus:outline-none transition resize-none"
                placeholder="Informações adicionais sobre seu agendamento"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black py-4 rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Agendando...' : 'Confirmar Agendamento'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-gray-600">
          <p>Confirmaremos seu agendamento por e-mail em até 24 horas</p>
        </div>
      </div>
    </div>
  );
}
