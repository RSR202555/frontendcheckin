import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-yellow-400 border-t border-yellow-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Clínica Fitness</h3>
            <p className="text-yellow-400/80 leading-relaxed">
              Centro especializado em avaliações físicas e acompanhamento profissional para seus objetivos de saúde e bem-estar.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span className="text-yellow-400/80">Rua Exemplo, 123 - Centro, Cidade - UF</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="flex-shrink-0" />
                <span className="text-yellow-400/80">(11) 9999-9999</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="flex-shrink-0" />
                <span className="text-yellow-400/80">contato@clinicafitness.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Horário de Atendimento</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <Clock size={20} className="mt-1 flex-shrink-0" />
                <div className="text-yellow-400/80">
                  <p>Segunda a Sexta: 8h às 20h</p>
                  <p>Sábado: 8h às 13h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-yellow-400/20 mt-8 pt-8 text-center text-yellow-400/60">
          <p>&copy; 2024 Clínica Fitness. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
