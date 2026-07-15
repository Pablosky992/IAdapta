const { Icons, Navbar, Footer, CookieBanner, getAmazonLink } = window;
const { useState } = React;

const GuiaOcio = function GuiaOcio() {
  const materials = [
    {
      name: 'Lupa de Lectura con Luz LED',
      desc: 'Lupa de gran tamaño, ideal para degeneración macular, que se apoya sobre el texto e ilumina la página.',
      image: '',
      link: 'https://amzn.to/4p8zeWA',
      query: 'lupa lectura luz led grande'
    },
    {
      name: 'Sujeta-cartas Curvo de Madera',
      desc: 'Permite jugar a las cartas a personas con hemiplejia, artritis o que solo pueden usar una mano.',
      image: '',
      link: 'https://amzn.to/4gDQ9y3',
      query: 'sujeta cartas soporte madera'
    },
    {
      name: 'Enhebrador Automático de Agujas',
      desc: 'Para amantes de la costura con temblores o pérdida de visión, inserta el hilo en la aguja al pulsar un botón.',
      image: '',
      link: 'https://amzn.to/4wth44g',
      query: 'enhebrador agujas automatico'
    }
  ];

  return (
    <section className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
        <img src="assets/guia_ocio.png" alt="Ocio y Tiempo Libre Adaptado" className="w-full h-64 sm:h-96 object-cover" />
        
        <div className="p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg">
          <div>
            <a href="guias.html" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors mb-6 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Volver a Guías
            </a>
            <h1 className="font-display text-4xl font-bold text-brand-900 mb-8">Ocio, Pasatiempos y Tiempo Libre Adaptado</h1>
            
            <p>
              La Terapia Ocupacional no trata solo de sobrevivir (comer, vestirse, asearse). Trata de <strong>vivir</strong>. El ocio y los hobbies son el motor de la motivación, la participación social y la salud mental. Abandonar un hobby por culpa de la artrosis, el Parkinson o la pérdida visual acelera el declive cognitivo y conduce al aislamiento y la depresión.
            </p>
            <p>
              Afortunadamente, el mercado actual ofrece productos de apoyo ingeniosos para casi cualquier afición, permitiendo adaptar la actividad para que la persona pueda seguir disfrutando de sus pasiones.
            </p>

            <div className="space-y-8 mt-6 border-t border-gray-100 pt-6">
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">📖</span> 1. Lectura y Baja Visión</h5>
                <p>La presbicia (vista cansada), las cataratas o la Degeneración Macular Asociada a la Edad (DMAE) dificultan disfrutar de un buen libro o incluso leer el periódico.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Lupas de Lectura y Atriles:</strong> Las lupas tipo cúpula (dome magnifiers) se deslizan directamente sobre la página sin tener que sostenerlas a pulso. Las lupas de cuello o pecho dejan las manos libres para coser o hacer manualidades. Las que incluyen luz LED incorporada aumentan drásticamente el contraste de las letras negras sobre el papel.</li>
                  <li><strong>Audiolibros y Lectores Digitales:</strong> Los dispositivos como el Kindle permiten aumentar el tamaño de la letra y cambiar la tipografía (existen fuentes específicas para dislexia). Para pérdida visual severa, los audiolibros o usar altavoces inteligentes ("Alexa, léeme mi libro") son la solución perfecta.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🃏</span> 2. Juegos de Mesa y Socialización</h5>
                <p>Las partidas de cartas o de dominó son vitales para la estimulación cognitiva y social de los mayores.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Sujeta-cartas:</strong> Si la persona ha sufrido un ictus (hemiplejia) o tiene artritis severa en las manos, no puede sujetar las cartas en abanico. Un soporte de madera curvo sobre la mesa soluciona el problema, permitiéndole ver sus cartas de forma privada y jugar usando su mano hábil.</li>
                  <li><strong>Juegos Macrotipo:</strong> Existen barajas de cartas de póker o española, así como fichas de dominó y tableros de parchís en tamaño XL. Sus números e índices gigantes permiten jugar sin forzar la vista.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🧶</span> 3. Costura, Manualidades y Jardinería</h5>
                <p>Las actividades que requieren pinza fina y fuerza de agarre.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Enhebradores y Lupas de Costura:</strong> Para quienes se niegan a dejar el punto o la costura, los enhebradores automáticos y los dedales de silicona evitan la frustración de no atinar con el hilo.</li>
                  <li><strong>Herramientas Ergonómicas de Jardín:</strong> Palas y rastrillos con mangos angulados (a 90 grados respecto a la herramienta) permiten mantener la muñeca en posición neutra, evitando el dolor por tendinitis o túnel carpiano al cuidar las plantas.</li>
                </ul>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-2xl shadow-sm mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💡</span>
                  <h5 className="font-bold text-orange-800 uppercase tracking-wide text-base">El Consejo del Terapeuta Ocupacional</h5>
                </div>
                <p className="text-orange-900 italic text-base leading-relaxed">
                  "No te conformes con el 'ya estoy viejo para esto'. Detrás de cada abandono de una actividad suele haber un problema físico o sensorial que tiene adaptación. Pregunta siempre '¿Por qué has dejado de hacerlo?' y busca la ayuda técnica específica para suplir esa barrera. Mantener la ocupación es mantener la vida."
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
        <GuiaOcio />
      </main>
      <Footer currentPage="guides" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
