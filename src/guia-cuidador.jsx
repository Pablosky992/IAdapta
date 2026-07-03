const { Icons, Navbar, Footer, CookieBanner, AdSenseBlock, getAmazonLink } = window;
const { useState } = React;

const GuiaCuidador = function GuiaCuidador() {
  const materials = [
    {
      name: 'Cinturón de Transferencia',
      desc: 'Proporciona un agarre seguro para ayudar a levantar o caminar a una persona sin tirar de sus brazos o ropa.',
      image: 'assets/cinturon_transferencia.png',
      link: 'https://amzn.to/4y4MAa2',
      query: 'cinturon transferencia paciente'
    },
    {
      name: 'Disco Giratorio de Transferencia',
      desc: 'Facilita los giros sobre los pies para pasar de la cama a la silla de ruedas sin forzar las rodillas.',
      image: 'assets/disco_giratorio.png',
      link: 'https://amzn.to/4wsSMY7',
      query: 'disco giratorio transferencia'
    },
    {
      name: 'Sábana Deslizante Tubular',
      desc: 'Tejido de muy baja fricción para reposicionar a personas encamadas sin esfuerzo.',
      image: 'assets/sabana_deslizante.png',
      link: 'https://amzn.to/4vLQmUg',
      query: 'sabana tubular deslizante'
    }
  ];

  return (
    <section className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
        <img src="assets/guia_cuidador.png" alt="El Cuidado del Cuidador" className="w-full h-64 sm:h-96 object-cover" />
        
        <div className="p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg">
          <div>
            <a href="guias.html" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors mb-6 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Volver a Guías
            </a>
            <h1 className="font-display text-4xl font-bold text-brand-900 mb-8">El Cuidado del Cuidador: Transferencias y Ergonomía</h1>
            
            <p>
              El trabajo de cuidar a una persona en situación de dependencia tiene un peaje físico enorme. Las lesiones de espalda (lumbalgias, hernias) son la principal causa de baja o incapacidad entre los cuidadores familiares y profesionales.
            </p>
            <p>
              En Terapia Ocupacional, enseñamos que <strong>nunca se debe levantar el peso muerto de un paciente</strong>. El objetivo de esta guía es aprender a utilizar ayudas técnicas y principios de ergonomía para proteger tu cuerpo mientras brindas el mejor cuidado posible.
            </p>

            <div className="space-y-8 mt-6 border-t border-gray-100 pt-6">
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">⚖️</span> 1. Principios Básicos de Ergonomía</h5>
                <p>Antes de usar cualquier aparato, tu postura es lo más importante.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Base de sustentación amplia:</strong> Separa las piernas a la anchura de los hombros. Pon un pie ligeramente más adelantado que el otro.</li>
                  <li><strong>Usa las piernas, no la espalda:</strong> Flexiona las rodillas y mantén la espalda completamente recta. La fuerza para levantar debe venir de los potentes músculos de tus muslos, no de tu columna lumbar.</li>
                  <li><strong>Acerca la carga:</strong> Mantén a la persona lo más cerca posible de tu centro de gravedad. Cuanto más lejos estés, más palanca haces y más sufre tu espalda.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🔄</span> 2. Transferencias de Cama a Silla (y viceversa)</h5>
                <p>Las transferencias son el momento de mayor riesgo de caída para el paciente y de lesión para el cuidador.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>El Cinturón de Transferencia:</strong> Es una banda resistente que se coloca alrededor de la cintura del paciente. Te permite tener puntos de agarre sólidos (asas) para estabilizar o levantar, en lugar de tirar de los brazos del paciente, lo cual puede dislocarles el hombro.</li>
                  <li><strong>Discos Giratorios:</strong> Si el paciente puede mantenerse de pie pero no puede mover los pies para girar hacia la silla, se colocan sus pies sobre este disco. El cuidador solo tiene que hacer un ligero movimiento para pivotar al paciente 90 grados hacia la silla.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🛏️</span> 3. Movilizaciones en la Cama</h5>
                <p>Mover a alguien hacia el cabecero de la cama es un esfuerzo brutal si se hace a pulso.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Sábanas Tubulares (Deslizantes):</strong> Son tejidos de nailon ultradeslizante con forma de tubo. Al colocarlas bajo el paciente, reducen la fricción a cero. Permiten a un solo cuidador deslizar a una persona pesada hacia arriba en la cama con una sola mano y sin esfuerzo.</li>
                  <li><em>Importante:</em> Recuerda retirar siempre la sábana deslizante una vez terminado el movimiento para evitar que el paciente se resbale.</li>
                </ul>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-2xl shadow-sm mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💡</span>
                  <h5 className="font-bold text-amber-800 uppercase tracking-wide text-base">El Consejo del Terapeuta Ocupacional</h5>
                </div>
                <p className="text-amber-900 italic text-base leading-relaxed">
                  "Si necesitas hacer fuerza pura, estás haciendo algo mal. Las transferencias deben ser movimientos fluidos basados en el contrapeso y la inercia, no en levantar kilos. Si tu familiar es completamente dependiente, no lo dudes: solicita o adquiere una grúa de traslado domiciliaria. Tu salud es el pilar que sostiene todo el cuidado."
                </p>
              </div>
            </div>

            {/* Material Recomendado */}
            <div className="mt-12 bg-gray-50 rounded-2xl p-6 sm:p-8 border border-brand-100 shadow-sm">
              <h3 className="font-bold text-brand-800 uppercase tracking-wide text-lg mb-6 flex items-center gap-2">
                <Icons.Check /> Material recomendado
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {materials.map((mat, i) => (
                  <li key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:border-brand-300 hover:shadow-md transition-all overflow-hidden">
                    <a href={getAmazonLink(mat.query, mat.link)} target="_blank" rel="noopener noreferrer" className="flex gap-4 p-4 items-start w-full h-full">
                      {mat.image && <img src={mat.image} alt={mat.name} className="w-16 h-16 object-cover rounded-lg border border-gray-100 shrink-0" />}
                      <div className="flex flex-col gap-1.5 flex-1">
                        <span className="font-semibold text-gray-900 text-sm">{mat.name}</span>
                        {mat.desc && <p className="text-xs text-gray-500 leading-snug">{mat.desc}</p>}
                        <div className="inline-flex items-center gap-1 text-[#FF9900] font-bold text-xs mt-1">Ver en Amazon</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-white rounded-xl border border-gray-100 text-xs text-gray-500 leading-relaxed shadow-sm">
                Las recomendaciones que ves en esta web han sido seleccionadas bajo criterio profesional de Terapia Ocupacional. Al comprar a través de estos enlaces, ayudas a mantener el proyecto IAdapta sin que a ti te cueste ni un céntimo más.
              </div>
            </div>

            <div className="mt-16 overflow-hidden rounded-xl bg-gray-50/50 min-h-[100px] flex flex-col items-center justify-center">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Publicidad</span>
              <AdSenseBlock slot="9272607554" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

function App() {
  return (
    <>
      <Navbar currentPage="guides" />
      <main id="main-content">
        <GuiaCuidador />
      </main>
      <Footer currentPage="guides" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
