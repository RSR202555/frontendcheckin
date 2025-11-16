export function AboutPage() {
  return (
    <section className="py-12 bg-[#f2c94c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <div className="w-full flex justify-center mb-4">
            <div className="inline-block bg-black border border-yellow-400/40 rounded-xl px-6 py-3 shadow-lg">
              <h1 className="text-4xl font-bold text-yellow-400 m-0">Conheça o Profissional</h1>
            </div>
          </div>
          <p className="text-lg text-black/80 mt-2">
            Transformando vidas com ciência, estratégia e acompanhamento humano.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <figure className="rounded-xl overflow-hidden bg-black shadow-lg">
            <img
              src="/sobre-mim/lucas-novo.png.jpeg"
              alt="Foto de Lucas Paranhos com uniforme da Clínica Checkin"
              className="w-full h-full object-cover"
            />
          </figure>

          <article className="bg-black text-yellow-50 rounded-xl border border-yellow-400/30 p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-yellow-400">Lucas Paranhos</h2>
            <p className="mt-1 text-yellow-400">CREF: <strong>017819-G/BA</strong></p>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="border border-yellow-400/30 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-400 mb-2">Formação</h3>
                <ul className="list-disc list-inside text-yellow-400">
                  <li>Bacharel em Educação Física</li>
                </ul>
              </div>
              <div className="border border-yellow-400/30 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-400 mb-2">Especializações</h3>
                <ul className="list-disc list-inside text-yellow-400 space-y-1">
                  <li>Especialista em Avaliação Física e Correção Postural</li>
                  <li>Pós-graduado em Condicionamento Físico, Prevenção e Reabilitação de Lesões</li>
                </ul>
              </div>
            </div>

            <blockquote className="mt-4 border-l-4 border-yellow-400 pl-4 italic text-yellow-400">
              “+10 anos transformando vidas com avaliação assertiva, treinos inteligentes e resultados reais.”
            </blockquote>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#agendar" className="btn-primary bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-500 transition">
                Agendar Avaliação
              </a>
              <a href="#contato" className="btn-primary bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-500 transition">
                Entrar em Contato
              </a>
              <a href="/" className="btn-primary bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-500 transition">
                Voltar para Início
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
