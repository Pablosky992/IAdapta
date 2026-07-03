const { Icons, Navbar, Footer, CookieBanner, AdSenseBlock, getAmazonLink } = window;
const { useState } = React;

const GuiaDemencias = function GuiaDemencias() {
  const materials = [
    {
      name: 'Reloj de Orientación (Calendario Digital)',
      desc: 'Pantalla grande que muestra el día de la semana y el momento del día (mañana, tarde, noche) sin abreviaturas.',
      image: 'assets/reloj_orientacion.png',
      link: 'https://amzn.to/4wJVzML',
      query: 'reloj alzheimer calendario digital'
    },
    {
      name: 'Detector de Humo y Gas Automático',
      desc: 'Imprescindible en la cocina para prevenir accidentes si hay problemas de memoria u olvidos frecuentes.',
      image: 'assets/alarma_humo_gas.png',
      link: 'https://amzn.to/44J1W6H',
      query: 'detector humo gas cocina'
    },
    {
      name: 'Localizador GPS Personas Mayores',
      desc: 'Dispositivo SOS para llevar encima que permite saber la ubicación exacta en caso de desorientación o fuga.',
      image: 'assets/localizador_gps.png',
      link: 'https://amzn.to/4wu15TA',
      query: 'localizador gps mayores sos'
    }
  ];

  return (
    <section className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
        <img src="assets/guia_demencias.png" alt="Adaptación del entorno para Alzheimer y Demencias" className="w-full h-64 sm:h-96 object-cover" />
        
        <div className="p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg">
          <div>
            <a href="guias.html" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors mb-6 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Volver a Guías
            </a>
            <h1 className="font-display text-4xl font-bold text-brand-900 mb-8">Accesibilidad Cognitiva: Adaptando el Entorno para el Alzheimer</h1>
            
            <p>
              Cuando pensamos en accesibilidad, solemos imaginar rampas y pasamanos. Sin embargo, para una persona con Alzheimer, demencia vascular u otro deterioro cognitivo, las barreras no son físicas, sino mentales. La desorientación, la pérdida de memoria y la confusión transforman su propia casa en un entorno hostil y peligroso.
            </p>
            <p>
              La accesibilidad cognitiva busca simplificar el entorno, proporcionando pistas visuales que compensen la pérdida de memoria y garanticen la seguridad frente a olvidos (como dejarse el gas encendido) o conductas de errabundeo (fugas).
            </p>

            <div className="space-y-8 mt-6 border-t border-gray-100 pt-6">
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🧠</span> 1. Orientación Espacial y Temporal</h5>
                <p>La desorientación temporal (no saber en qué día, mes o año viven, o confundir la noche con el día) es uno de los primeros y más angustiosos síntomas.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Relojes de Orientación:</strong> Son fundamentales. Sustituye los relojes analógicos por pantallas digitales grandes que indiquen explícitamente "Es LUNES por la MAÑANA". Evita las abreviaturas (nada de "Lun" o "Sep").</li>
                  <li><strong>Luz Natural y Ritmos Circadianos:</strong> Mantén las persianas abiertas durante el día y la casa muy iluminada. Al atardecer, cierra persianas y usa luces cálidas. Esto ayuda a regular el reloj biológico y disminuye el "síndrome del ocaso" (agitación vespertina).</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🏷️</span> 2. Simplificación Visual y Señalética</h5>
                <p>El exceso de estímulos genera agitación. El entorno debe ser lo más claro e intuitivo posible.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Contraste de Colores:</strong> Utiliza el contraste cromático para destacar lo que quieres que vean. Por ejemplo, un plato rojo sobre un mantel blanco ayuda a discriminar la comida (muy útil si hay problemas de percepción de profundidad). Sin embargo, evita alfombras oscuras, ya que pueden percibirlas como "agujeros" en el suelo y negarse a pisarlas.</li>
                  <li><strong>Etiquetado de puertas y cajones:</strong> Pon carteles con texto y un dibujo (pictograma) en las puertas importantes (ej: "BAÑO" con la foto de un retrete). Si abren compulsivamente todos los cajones buscando ropa, pega una foto de calcetines en el cajón correspondiente.</li>
                  <li><strong>Camuflaje:</strong> Lo que no quieres que vean, escóndelo. Pinta la puerta de salida a la calle del mismo color que la pared para evitar las fugas, o cubre los espejos si la persona no reconoce su propio reflejo y se asusta creyendo que hay un extraño en casa.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🔒</span> 3. Seguridad y Prevención de Riesgos</h5>
                <p>La pérdida del juicio abstracto impide valorar el peligro.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>En la Cocina:</strong> Es el lugar de mayor riesgo. Instala detectores de humo y cortaúles automáticos para el gas o la placa de inducción. Retira de la vista objetos punzantes y productos de limpieza tóxicos (guárdalos bajo llave).</li>
                  <li><strong>Prevención de Fugas (Errabundeo):</strong> Si hay riesgo de que salgan de casa desorientados, instala cerraduras que no reconozcan o coloca pestillos en la parte muy alta o muy baja de la puerta (fuera de su campo visual habitual). Las alarmas de puerta y los localizadores GPS (en pulseras o plantillas del zapato) proporcionan tranquilidad al cuidador.</li>
                  <li><strong>Gestión de la Medicación:</strong> Bajo ningún concepto la medicación debe estar a su libre disposición. Los pastilleros electrónicos con alarma son ideales para fases iniciales donde viven solos; en fases avanzadas, el cuidador debe custodiar y administrar todas las tomas.</li>
                </ul>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-2xl shadow-sm mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💡</span>
                  <h5 className="font-bold text-purple-800 uppercase tracking-wide text-base">El Consejo del Terapeuta Ocupacional</h5>
                </div>
                <p className="text-purple-900 italic text-base leading-relaxed">
                  "No intentes corregir constantemente su realidad. Si tu familiar pregunta por su madre (ya fallecida), decirle repetidamente 'Tu madre murió hace 20 años' solo le causará el dolor del duelo una y otra vez. Usa la técnica de 'Validación': reconoce su emoción ('La echas de menos, ¿verdad? Era muy buena cocinera') y redirige sutilmente la atención hacia otra actividad agradable en el presente."
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
        <GuiaDemencias />
      </main>
      <Footer currentPage="guides" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
