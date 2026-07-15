const { Icons, Navbar, Footer, CookieBanner, getAmazonLink } = window;
const { useState } = React;

const GuiaAlimentacion = function GuiaAlimentacion() {
  const materials = [
    {
      name: 'Cubiertos ergonómicos engrosados',
      desc: 'Set de cubiertos con mangos gruesos para facilitar el agarre relajado.',
      image: 'cubiertos_adaptados.png',
      link: 'https://amzn.to/4wi1BVq',
      query: 'cubiertos adaptados mango grueso'
    },
    {
      name: 'Cuchillo Nelson',
      desc: 'Permite cortar con una sola mano gracias a su diseño de hoja curva oscilante.',
      image: 'cuchillo_nelson.png',
      link: 'https://amzn.to/3QPzqgd',
      query: 'cuchillo nelson adaptado'
    },
    {
      name: 'Vaso con escotadura nasal',
      desc: 'Permite beber sin inclinar el cuello hacia atrás, ideal para disfagia.',
      image: 'vaso_escotadura.png',
      link: 'https://amzn.to/3R1tYXJ',
      query: 'vaso escotadura nasal disfagia'
    }
  ];

  return (
    <section className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
        <img src="assets/cubiertos_adaptados.jpg" alt="Alimentación Adaptada" className="w-full h-64 sm:h-96 object-cover" />
        
        <div className="p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg">
          <div>
            <a href="guias.html" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors mb-6 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Volver a Guías
            </a>
            <h1 className="font-display text-4xl font-bold text-brand-900 mb-8">Alimentación Independiente: Ergonomía y Autonomía en la Mesa</h1>
            
            <p>
              La alimentación es una de las Actividades de la Vida Diaria (AVD) más complejas y con mayor carga social. No se trata solo de la nutrición, sino de la capacidad de participar de forma digna y autónoma en un acto cotidiano. Limitaciones en la fuerza de prensión, temblores, rangos de movimiento reducidos en el hombro o dificultades en la coordinación ojo-mano pueden convertir la comida en un proceso frustrante y agotador.
            </p>
            <p>
              Desde la Terapia Ocupacional, el objetivo es compensar estos déficits mediante el uso de productos de apoyo y estrategias de economía articular.
            </p>

            <div className="space-y-8 mt-6 border-t border-gray-100 pt-6">
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🥄</span> 1. Cubiertos Ergonómicos: Optimizando el Agarre</h5>
                <p>Cuando existe debilidad muscular o dolor en las pequeñas articulaciones de la mano (como en la artritis), el uso de cubiertos estándar resulta ineficiente.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Engrosadores de Mango:</strong> Aumentar el diámetro del mango reduce la tensión necesaria para cerrar el puño, permitiendo un agarre más relajado y menos doloroso.</li>
                  <li><strong>Cubiertos Angulados y Flexibles:</strong> Ideales para personas con limitación en la flexión del codo o en la supinación de la muñeca (giro de la mano). Permiten llevar el alimento a la boca sin necesidad de realizar movimientos compensatorios bruscos con el cuello o el tronco.</li>
                  <li><strong>Cubiertos con Peso:</strong> Para usuarios con temblores esenciales o parkinsonianos, los cubiertos lastrados ayudan a estabilizar el movimiento mediante la propiocepción, mejorando la precisión en el trayecto plato-boca.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🍽️</span> 2. Vajilla Funcional y Control del Entorno</h5>
                <p>Un plato adecuado puede marcar la diferencia entre necesitar ayuda o comer de forma independiente.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Rebordes de Plato (Platos de Pared Alta):</strong> Facilitan la carga del alimento en la cuchara o tenedor al ofrecer un tope contra el que empujar, algo fundamental para personas que solo pueden utilizar una mano (hemiparesia).</li>
                  <li><strong>Bases Antideslizantes:</strong> El uso de tapetes de polímero de alta adherencia (tipo Dycem) o platos con ventosa evita que el recipiente se desplace por la mesa, permitiendo que el usuario se centre exclusivamente en la manipulación del cubierto.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">💧</span> 3. Hidratación Segura y Accesible</h5>
                <p>Beber líquidos requiere una coordinación precisa para evitar atragantamientos o derrames, especialmente si hay problemas de movilidad cervical.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Vasos con Escotadura Nasal:</strong> Permiten beber sin necesidad de inclinar la cabeza hacia atrás, lo cual es crítico en pacientes con riesgo de aspiración o con rigidez en el cuello.</li>
                  <li><strong>Vasos de Doble Asa:</strong> Facilitan un agarre bimanual simétrico, distribuyendo el peso del líquido y compensando la falta de fuerza o el temblor de una sola mano.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🪑</span> 4. Biomecánica de la Postura en la Mesa</h5>
                <p>La eficacia de cualquier adaptación depende de una base postural sólida. Una mala alineación del tronco dificulta la deglución y el control motor fino.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Posicionamiento:</strong> Los pies deben estar bien apoyados y la pelvis lo más atrás posible en la silla. La mesa debe estar a una altura que permita apoyar los antebrazos cómodamente sin elevar los hombros, facilitando una trayectoria estable hacia la boca.</li>
                </ul>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💡</span>
                  <h5 className="font-bold text-emerald-800 uppercase tracking-wide text-base">El Consejo del Terapeuta Ocupacional</h5>
                </div>
                <p className="text-emerald-900 italic text-base leading-relaxed">
                  "Si necesitas una adaptación muy específica que no encuentras en el mercado convencional, no descartes las soluciones de bajo coste mediante impresión 3D. Actualmente, conocemos diseños de código abierto para engrosadores, pinzas de sujeción y soportes de vasos que se pueden fabricar a medida por una fracción del precio de una ortopedia tradicional. Además, un pequeño truco casero: si un plato se resbala y no tienes una base técnica, una bayeta húmeda o una goma elástica ancha alrededor del vaso pueden mejorar drásticamente el agarre y la estabilidad de forma inmediata."
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
        <GuiaAlimentacion />
      </main>
      <Footer currentPage="guides" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
