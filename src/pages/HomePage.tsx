import { Activity, Users, Award, Calendar } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="relative bg-black text-yellow-400 pt-0 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-0">
              <img
                src="/brand/logo-novo.png.jpeg"
                alt="CHECK IN — Avaliações Físicas e Prescrição de Treinamento Personalizado"
                className="w-60 md:w-[380px] h-auto transition-transform duration-300 hover:scale-105"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-yellow-400">
              Avaliar é o Primeiro Passo Para Resultados Seguros e Eficientes
            </h1>
            <p className="text-xl md:text-2xl text-yellow-400/90 mb-2 max-w-3xl mx-auto leading-relaxed">
              Avaliações Físicas Completas e Treinos Personalizados Com Profissionais Especializados
            </p>
            <button
              onClick={() => onNavigate('booking')}
              className="bg-yellow-400 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition transform hover:scale-105 shadow-xl"
            >
              Agende Sua Avaliação
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f2c94c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full flex justify-center mb-16">
            <div className="bg-black rounded-xl px-6 py-4 shadow-lg border border-yellow-400/40 inline-block">
              <h2 className="text-4xl font-bold text-center text-yellow-400">
                Por Que Escolher a Clínica Checkin ?
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#0a0a0a] p-8 rounded-xl shadow-lg border-2 border-yellow-400 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                <Activity size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">Avaliações Completas</h3>
              <p className="text-yellow-50/90 leading-relaxed">
                Análise detalhada de composição corporal, postura e capacidade física
              </p>
            </div>

            <div className="bg-[#0a0a0a] p-8 rounded-xl shadow-lg border-2 border-yellow-400 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                <Users size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">Equipe Especializada</h3>
              <p className="text-yellow-50/90 leading-relaxed">
                Equipe Especializada e Preparada Para te Oferecer Um Atendimento de Excelência.
              </p>
            </div>

            <div className="bg-[#0a0a0a] p-8 rounded-xl shadow-lg border-2 border-yellow-400 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                <Award size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">Resultados Comprovados</h3>
              <p className="text-yellow-50/90 leading-relaxed">
                Cada Avaliação gera dados reais que mostram sua evolução e orientam seu treino com precisão.
              </p>
            </div>

            <div className="bg-[#0a0a0a] p-8 rounded-xl shadow-lg border-2 border-yellow-400 hover:shadow-xl transition">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                <Calendar size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">Agendamento Fácil</h3>
              <p className="text-yellow-50/90 leading-relaxed">
                Sistema online prático e acesso às suas avaliações a qualquer momento
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f2c94c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-full flex justify-center mb-4">
              <div className="bg-black rounded-xl px-6 py-3 shadow-lg border border-yellow-400/40 inline-block">
                <h2 className="text-4xl font-bold text-yellow-400 m-0">Nossos Serviços</h2>
              </div>
            </div>
            <p className="text-xl text-black/80 max-w-3xl mx-auto">
              Avaliações completas e personalizadas para acompanhar sua evolução
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#0a0a0a] text-white rounded-xl border border-yellow-400/40 p-8 shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-0.5 transition duration-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl" aria-hidden>
                  ⚡
                </div>
                <h3 className="text-2xl font-bold text-yellow-400">Bioimpedância</h3>
              </div>
              <p className="text-yellow-50/90 leading-relaxed">
                A bioimpedância é um exame rápido e não invasivo que analisa a composição corporal —
                mostrando a quantidade de massa muscular, gordura corporal, água e taxa metabólica.
                Com esses dados, conseguimos identificar se o seu peso atual é realmente saudável e
                direcionar seu treino e alimentação para resultados mais eficientes.
              </p>
            </div>

            <div className="bg-[#0a0a0a] text-white rounded-xl border border-yellow-400/40 p-8 shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-0.5 transition duration-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl" aria-hidden>
                  📏
                </div>
                <h3 className="text-2xl font-bold text-yellow-400">Dobras Cutâneas</h3>
              </div>
              <p className="text-yellow-50/90 leading-relaxed">
                A avaliação de dobras cutâneas mede a espessura da gordura sob a pele em pontos
                específicos do corpo, permitindo calcular o percentual de gordura corporal com alta
                precisão. Essa técnica é amplamente utilizada em academias e estudos científicos para
                acompanhar a evolução física de forma detalhada.
              </p>
            </div>

            <div className="bg-[#0a0a0a] text-white rounded-xl border border-yellow-400/40 p-8 shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-0.5 transition duration-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl" aria-hidden>
                  🧮
                </div>
                <h3 className="text-2xl font-bold text-yellow-400">Perimetria</h3>
              </div>
              <p className="text-yellow-50/90 leading-relaxed">
                A perimetria é a medição das circunferências corporais, como cintura, quadril, peito,
                braços e coxas. Ela permite acompanhar o ganho de massa muscular e a redução de medidas,
                servindo como um excelente indicador visual e prático da sua evolução.
              </p>
            </div>

            <div className="bg-[#0a0a0a] text-white rounded-xl border border-yellow-400/40 p-8 shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-0.5 transition duration-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl" aria-hidden>
                  🧍‍♂️
                </div>
                <h3 className="text-2xl font-bold text-yellow-400">Avaliação Postural</h3>
              </div>
              <p className="text-yellow-50/90 leading-relaxed">
                A avaliação postural analisa o alinhamento corporal e possíveis desvios na postura,
                que podem causar dores, limitações e prejuízos no desempenho físico. Com base nessa
                análise, ajustamos o treino para corrigir desequilíbrios, prevenir lesões e melhorar a
                performance e estética corporal.
              </p>
            </div>
          </div>

          <div className="bg-black text-yellow-400 rounded-xl p-8 text-center">
            <h3 className="text-3xl font-bold mb-4">Pronto para começar?</h3>
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
      </section>

      <section className="bg-black text-yellow-400 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-full flex justify-center mb-6">
              <div className="bg-[#f2c94c] rounded-xl px-6 py-3 shadow-lg border border-black/20 inline-block">
                <h2 className="text-4xl font-bold text-black m-0">Como Funciona?</h2>
              </div>
            </div>
            <p className="text-xl text-yellow-400/90 mb-12 max-w-3xl mx-auto">
              Processo simples e rápido para começar sua jornada
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-[#0a0a0a] p-8 rounded-xl border border-yellow-400/30">
                <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">Agende Online</h3>
                <p className="text-white leading-relaxed">
                  Escolha a data, horário e tipo de avaliação que deseja realizar
                </p>
              </div>

              <div className="bg-[#0a0a0a] p-8 rounded-xl border border-yellow-400/30">
                <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">Realize a Avaliação</h3>
                <p className="text-white leading-relaxed">
                  Compareça na data marcada para uma avaliação completa e profissional
                </p>
              </div>

              <div className="bg-[#0a0a0a] p-8 rounded-xl border border-yellow-400/30">
                <div className="w-12 h-12 bg-yellow-400 text-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">Acesse Seus Resultados</h3>
                <p className="text-white leading-relaxed">
                  Baixe o PDF com sua avaliação e acompanhe sua evolução
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('booking')}
              className="mt-12 bg-yellow-400 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition transform hover:scale-105"
            >
              Começar Agora
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
