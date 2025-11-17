import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#f2c94c] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-full flex justify-center mb-4">
            <div className="bg-black rounded-xl px-6 py-3 shadow-lg border border-yellow-400/40 inline-block">
              <h1 className="text-5xl font-bold text-yellow-400 m-0">Entre em Contato</h1>
            </div>
          </div>
          <p className="text-xl text-black/80 max-w-3xl mx-auto">
            Estamos aqui para ajudar você a começar sua jornada de transformação
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="w-full flex justify-start mb-4">
              <div className="inline-block bg-black border border-yellow-400/40 rounded-xl px-6 py-3 shadow-lg">
                <h2 className="text-3xl font-bold text-yellow-400 m-0">Informações de Contato</h2>
              </div>
            </div>

            <div className="space-y-6">
              <a
                href="https://www.google.com/maps?q=Praça+Pedro+da+Costa+Doréa,+76+-+Alagoinhas+Velha,+Alagoinhas+-+BA,+48007-326"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="flex items-start gap-4 bg-[#0a0a0a] p-6 rounded-xl shadow-md border-l-4 border-yellow-400 cursor-pointer hover:bg-[#111111] transition">
                  <MapPin size={24} className="text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-yellow-400 mb-1">Endereço</h3>
                    <p className="text-yellow-50/90">Praça Pedro da Costa Doréa, Nº76 Proximo a Ruína Inacabada</p>
                    <p className="text-yellow-50/90">Alagoinhas Velha, CEP:48007326</p>
                  </div>
                </div>
              </a>

              <a
                href="https://wa.me/557599196485"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="flex items-start gap-4 bg-[#0a0a0a] p-6 rounded-xl shadow-md border-l-4 border-yellow-400 cursor-pointer hover:bg-[#111111] transition">
                  <Phone size={24} className="text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-yellow-400 mb-1">Telefone / WhatsApp</h3>
                    <p className="text-yellow-50/90">(75) 9919-6485</p>
                    <p className="text-yellow-50/90 text-sm">Clique para falar conosco pelo WhatsApp</p>
                  </div>
                </div>
              </a>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=clinicacheckin@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="flex items-start gap-4 bg-[#0a0a0a] p-6 rounded-xl shadow-md border-l-4 border-yellow-400 cursor-pointer hover:bg-[#111111] transition">
                  <Mail size={24} className="text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-yellow-400 mb-1">E-mail</h3>
                    <p className="text-yellow-50/90">clinicacheckin@gmail.com</p>
                    <p className="text-yellow-50/90 text-sm">Clique para enviar um e-mail</p>
                  </div>
                </div>
              </a>

              <a
                href="https://instagram.com/clinica_checkin"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="flex items-start gap-4 bg-[#0a0a0a] p-6 rounded-xl shadow-md border-l-4 border-yellow-400 cursor-pointer hover:bg-[#111111] transition">
                  <Mail size={24} className="text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-yellow-400 mb-1">Instagram</h3>
                    <p className="text-yellow-50/90">@clinica_checkin</p>
                    <p className="text-yellow-50/90 text-sm">Clique para visitar nosso perfil</p>
                  </div>
                </div>
              </a>

              <div className="flex items-start gap-4 bg-[#0a0a0a] p-6 rounded-xl shadow-md border-l-4 border-yellow-400">
                <Clock size={24} className="text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-yellow-400 mb-1">Horário de Atendimento</h3>
                  <p className="text-yellow-50/90">Segunda a Sexta:</p>
                  <p className="text-yellow-50/90">07:00 às 11:00 e 14:00 às 19:00</p>
                  <p className="text-yellow-50/90">Sábado: 07:00 às 13:00</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="w-full flex justify-start mb-4">
              <div className="inline-block bg-black border border-yellow-400/40 rounded-xl px-6 py-3 shadow-lg">
                <h2 className="text-3xl font-bold text-yellow-400 m-0">Envie uma Mensagem</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-[#0a0a0a] p-8 rounded-xl shadow-lg border-2 border-yellow-400 text-yellow-50">
              {submitted && (
                <div className="mb-6 p-4 bg-yellow-100 text-yellow-800 rounded-lg border border-yellow-400">
                  Mensagem enviada com sucesso! Entraremos em contato em breve.
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-yellow-400 font-semibold mb-2">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none transition"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label className="block text-yellow-400 font-semibold mb-2">E-mail</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none transition"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-yellow-400 font-semibold mb-2">Telefone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none transition"
                    placeholder="(75) 99999-9999"
                  />
                </div>

                <div>
                  <label className="block text-yellow-400 font-semibold mb-2">Mensagem</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none transition resize-none"
                    placeholder="Como podemos ajudar você?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-400 text-black py-4 rounded-lg font-semibold hover:bg-yellow-500 transition flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Enviar Mensagem
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
