// Página de serviços reestruturada para exibir cards estáticos e modernos

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const services = [
    {
      emoji: '⚡',
      title: 'Bioimpedância',
      description:
        'A bioimpedância é um exame rápido e não invasivo que analisa a composição corporal — mostrando a quantidade de massa muscular, gordura corporal, água e taxa metabólica. Com esses dados, conseguimos identificar se o seu peso atual é realmente saudável e direcionar seu treino e alimentação para resultados mais eficientes.',
    },
    {
      emoji: '📏',
      title: 'Dobras Cutâneas',
      description:
        'A avaliação de dobras cutâneas mede a espessura da gordura sob a pele em pontos específicos do corpo, permitindo calcular o percentual de gordura corporal com alta precisão. Essa técnica é amplamente utilizada em academias e estudos científicos para acompanhar a evolução física de forma detalhada.',
    },
    {
      emoji: '🧮',
      title: 'Perimetria',
      description:
        'A perimetria é a medição das circunferências corporais, como cintura, quadril, peito, braços e coxas. Ela permite acompanhar o ganho de massa muscular e a redução de medidas, servindo como um excelente indicador visual e prático da sua evolução.',
    },
    {
      emoji: '🧍‍♂️',
      title: 'Avaliação Postural',
      description:
        'A avaliação postural analisa o alinhamento corporal e possíveis desvios na postura, que podem causar dores, limitações e prejuízos no desempenho físico. Com base nessa análise, ajustamos o treino para corrigir desequilíbrios, prevenir lesões e melhorar a performance e estética corporal.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f2c94c] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-black mb-4">Nossos Serviços</h1>
          <p className="text-xl text-black/80 max-w-3xl mx-auto">
            Avaliações completas e personalizadas para acompanhar sua evolução
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-[#0a0a0a] text-white rounded-xl border border-yellow-400/40 p-8 shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-0.5 transition duration-200"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl" aria-hidden>
                  {s.emoji}
                </div>
                <h3 className="text-2xl font-bold text-yellow-400">{s.title}</h3>
              </div>
              <p className="text-yellow-50/90 leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-black text-yellow-400 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-xl text-yellow-400/90 mb-6">
            Agende sua avaliação e dê o primeiro passo rumo aos seus objetivos
          </p>
          <button
            onClick={() => onNavigate('booking')}
            className="bg-yellow-400 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition"
          >
            Agendar Agora
          </button>
        </div>
      </div>
    </div>
  );
}
