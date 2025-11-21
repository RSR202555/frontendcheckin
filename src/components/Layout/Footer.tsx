import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-yellow-400 border-t border-yellow-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Clínica Checkin</h3>
            <p className="text-yellow-400/80 leading-relaxed">
              Centro Especializado em Avaliações Físicas e Prescrição de Treinos Personalizados.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span className="text-yellow-400/80">
                  Praça Pedro da Costa Doréa, Nº76 Proximo a Ruína Inacabada, Alagoinhas Velha, CEP:48007326
                </span>
              </div>
              <a
                href="https://wa.me/557599196485?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-yellow-300 transition"
              >
                <Phone size={20} className="flex-shrink-0" />
                <span className="text-yellow-400/80 underline">(75) 9919-6485</span>
              </a>
              <div className="flex items-center gap-3">
                <Mail size={20} className="flex-shrink-0" />
                <span className="text-yellow-400/80">clinicacheckin@gmail.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Horário de Atendimento</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <Clock size={20} className="mt-1 flex-shrink-0" />
                <div className="text-yellow-400/80">
                  <p>Segunda a Sexta:</p>
                  <p>07:00 às 11:00 e 14:00 às 19:00</p>
                  <p>Sábado: 07:00 às 13:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-yellow-400/20 mt-8 pt-8 text-center text-yellow-400/60">
          <p>&copy; 2024 Clínica Checkin. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
