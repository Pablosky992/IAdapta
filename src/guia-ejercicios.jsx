const { Icons, Navbar, Footer, CookieBanner, getAmazonLink } = window;
const { useState } = React;

const GuiaEjercicios = function GuiaEjercicios() {
  const materials = [
    {
      name: 'Pelota para ejercitar las manos y dedos',
      desc: 'Pelota ergonómica de silicona para realizar ejercicios de presión y pinza. Ayuda a fortalecer la musculatura intrínseca de la mano y mantener la movilidad de los dedos.',
      image: 'assets/pelota_manos.png',
      link: 'https://amzn.to/4wHv7TF',
      query: 'pelota ejercitar manos rehabilitacion'
    },
    {
      name: 'Bandas elásticas de resistencia',
      desc: 'Cintas elásticas de látex para realizar ejercicios de resistencia muscular progresiva y estiramientos controlados tanto sentados como de pie.',
      image: 'assets/bandas_elasticas.png',
      link: 'https://amzn.to/4aZ54z1',
      query: 'bandas elasticas musculacion estiramientos'
    },
    {
      name: 'Pedalier para brazos y piernas',
      desc: 'Ejercitador de pedal doble para colocar en el suelo. Permite pedalear sentado en una silla común, mejorando la circulación periférica y la capacidad cardiopulmonar.',
      image: 'assets/pedalier.png',
      link: 'https://amzn.to/4bMWuUh',
      query: 'pedalier ejercicio brazos piernas mayores'
    },
    {
      name: 'Simulador pasivo de la marcha',
      desc: 'Ejercitador de piernas motorizado que genera movimientos de marcha alternativos y suaves de forma sentada. Ideal para personas con movilidad muy reducida.',
      image: 'assets/simulador_marcha.png',
      link: 'https://amzn.to/4waslqk',
      query: 'simulador de marcha pasivo ejercitador piernas'
    }
  ];

  return (
    <section className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
        <img src="assets/guia_ejercicios.png" alt="Ejercicios Físicos y Movilidad en la Tercera Edad" className="w-full h-64 sm:h-96 object-cover" />
        
        <div className="p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg">
          <div>
            <a href="guias.html" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors mb-6 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Volver a Guías
            </a>
            
            <h1 className="font-display text-4xl font-bold text-brand-900 mb-8">Ejercicios Físicos y Movilidad en la Tercera Edad</h1>
            
            <h2 className="font-display text-2xl font-bold text-brand-800 mb-4">Envejecimiento Activo: Moverse para Seguir Siendo Libre</h2>
            
            <p className="mb-4">
              La Terapia Ocupacional no trata solo de sobrevivir (comer, vestirse, asearse). Trata de vivir. El movimiento es el verdadero motor de la autonomía. A menudo se piensa que al envejecer debemos "guardar reposo" o evitar el esfuerzo por miedo a las caídas. Sin embargo, ocurre todo lo contrario: el sedentarismo es el que debilita los músculos, desgasta el equilibrio y arrebata la independencia para subir escaleras, levantarse del sofá o ir a comprar el pan.
            </p>
            <p className="mb-6">
              Afortunadamente, mantener el cuerpo activo no requiere convertirse en un atleta de élite. Adaptar el ejercicio físico a las capacidades de cada persona mayor permite prevenir caídas, proteger las articulaciones y mantener la libertad del día a día. El acondicionamiento muscular estimula los propioceptores, lubrica los cartílagos articulares y genera una cascada de beneficios neurocognitivos vitales para mantener la salud mental.
            </p>

            <div className="space-y-8 mt-6 border-t border-gray-100 pt-6">
              
              {/* Sección 1 */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🪑</span>
                  <h3 className="text-2xl font-bold text-brand-900">1. Ejercicios en Silla (Gimnasia Sentada)</h3>
                </div>
                <p>
                  Para personas con movilidad reducida, problemas de equilibrio severos o riesgo elevado de caídas, la silla no es una limitación, sino una herramienta de entrenamiento excelente y segura. El ejercicio en silla minimiza el miedo a perder el equilibrio, permitiendo centrar todo el esfuerzo muscular en el tren inferior y superior.
                </p>
                <div className="bg-brand-50/50 p-6 rounded-2xl border-l-4 border-brand-500 space-y-4 mt-2">
                  <div>
                    <h4 className="font-bold text-brand-800 text-base">Extensiones de Rodilla (Fortalecimiento de Cuádriceps)</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Cómo realizarlo:</strong> Sentado con la espalda bien apoyada en el respaldo de la silla, estirar una pierna hacia el frente de forma horizontal, mantenerla tensa un par de segundos y bajarla lentamente. Realizar de 10 a 12 repeticiones con cada pierna.
                    </p>
                    <p className="text-xs text-brand-700 italic mt-1">
                      <strong>Beneficio clínico:</strong> Este ejercicio fortalece el cuádriceps, el músculo principal implicado en la bipedestación (acción de ponerse de pie), facilitando la salida de sillas, retretes e inodoros de manera autónoma.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-800 text-base">Flexión de Cadera (Marcha Sentada)</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Cómo realizarlo:</strong> Manteniendo una postura erguida, elevar alternativamente las rodillas hacia el pecho, despegando los muslos del asiento de la silla, simulando una marcha militar sin moverse del sitio. Realizar 15 repeticiones alternas.
                    </p>
                    <p className="text-xs text-brand-700 italic mt-1">
                      <strong>Beneficio clínico:</strong> Es ideal para mantener la flexibilidad de los flexores de la cadera y la pelvis, mejorando el patrón de la marcha y disminuyendo el riesgo de tropiezos al levantar el pie del suelo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sección 2 */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🦵</span>
                  <h3 className="text-2xl font-bold text-brand-900">2. Fuerza y Flexibilidad para el Día a Día</h3>
                </div>
                <p>
                  El entrenamiento de fuerza muscular es el mejor escudo contra la sarcopenia (pérdida progresiva de masa y potencia muscular) y ayuda a proteger los huesos de la osteoporosis al estimular la síntesis de calcio mediante el impacto muscular sobre el tejido óseo.
                </p>
                <div className="bg-brand-50/50 p-6 rounded-2xl border-l-4 border-brand-500 space-y-4 mt-2">
                  <div>
                    <h4 className="font-bold text-brand-800 text-base">Sentarse y Levantarse (El Squat Funcional)</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Cómo realizarlo:</strong> El ejercicio más funcional que existe. Usando una silla estable y apoyando las manos en los reposabrazos si es necesario al principio, la persona debe levantarse erguida y volverse a sentar de forma lenta y controlada. Realizar de 8 a 10 repeticiones.
                    </p>
                    <p className="text-xs text-brand-700 italic mt-1">
                      <strong>Beneficio clínico:</strong> Desarrolla la fuerza explosiva y el control motor excéntrico en el tren inferior, reduciendo la dependencia física al usar sillas, sofás y transporte público.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-800 text-base">Elevación de Talones (Fuerza de Pantorrilla)</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Cómo realizarlo:</strong> Apoyando las manos en el respaldo de una silla pesada o en la encimera de la cocina para no perder el equilibrio, ponerse de puntillas lentamente elevando ambos talones y bajar controladamente. Realizar 12 repeticiones.
                    </p>
                    <p className="text-xs text-brand-700 italic mt-1">
                      <strong>Beneficio clínico:</strong> Refuerza los gemelos y el tendón de Aquiles, mejorando la estabilidad del tobillo y proporcionando un impulso firme y seguro al caminar.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sección 3 */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">⚖️</span>
                  <h3 className="text-2xl font-bold text-brand-900">3. Equilibrio y Prevención de Caídas</h3>
                </div>
                <p>
                  El miedo a caerse suele hacer que las personas mayores caminen menos, lo que debilita su equilibrio y, paradójicamente, aumenta el riesgo de sufrir una caída. Hay que romper ese círculo vicioso mediante la reeducación vestibular y propioceptiva.
                </p>
                <div className="bg-brand-50/50 p-6 rounded-2xl border-l-4 border-brand-500 space-y-4 mt-2">
                  <div>
                    <h4 className="font-bold text-brand-800 text-base">La Posición del Flamenco (Apoyo Monopodal)</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Cómo realizarlo:</strong> Sujetándose firmemente a una superficie estable con una o ambas manos, intentar levantar un pie del suelo y mantener el equilibrio sobre una sola pierna durante 10 o 15 segundos. Luego, cambiar al otro pie.
                    </p>
                    <p className="text-xs text-brand-700 italic mt-1">
                      <strong>Beneficio clínico:</strong> Entrena la estabilidad estática profunda. Es clave para prevenir tropiezos durante la fase de balanceo al caminar, cuando todo el peso recae temporalmente sobre un solo pie.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-800 text-base">Caminar en Línea Recta (Marcha en Tándem)</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Cómo realizarlo:</strong> Caminar colocando un pie justo delante del otro (tocando el talón delantero con la punta de los dedos del pie trasero) a lo largo de una línea recta o pasillo, preferiblemente cerca de la pared para poder apoyarse si se experimenta inestabilidad.
                    </p>
                    <p className="text-xs text-brand-700 italic mt-1">
                      <strong>Beneficio clínico:</strong> Refuerza la coordinación motora dinámica y reduce la base de sustentación, simulando situaciones cotidianas donde debemos sortear obstáculos o transitar por espacios reducidos.
                    </p>
                  </div>
                </div>
              </div>

              {/* El Consejo del Terapeuta Ocupacional */}
              <div className="bg-gradient-to-br from-brand-900 to-indigo-950 text-white rounded-[2rem] p-8 sm:p-10 shadow-xl relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                  <span className="text-9xl">💡</span>
                </div>
                <h4 className="font-display text-2xl font-bold mb-4 flex items-center gap-3">
                  <span>💡</span> El Consejo del Terapeuta Ocupacional
                </h4>
                <p className="text-brand-100 text-lg leading-relaxed italic">
                  "No dejes que el miedo a caerte te paralice. El cuerpo humano está diseñado para moverse en todas las etapas de la vida, y la fragilidad no se combate con el reposo, sino con la actividad adaptada. Empieza poco a poco, celebra cada pequeño progreso y recuerda: el mejor ejercicio es el que realmente se hace. Mantener tus músculos fuertes hoy es asegurar tu independencia de mañana."
                </p>
              </div>

              {/* Productos de Apoyo Recomendados */}
              <div className="space-y-6 pt-6">
                <h3 className="font-display text-2xl font-bold text-brand-900">
                  Material de Entrenamiento y Ejercicio Recomendado
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
                  Las recomendaciones que ves en esta web han sido seleccionadas bajo criterio profesional de Terapia Ocupacional. Al comprar a través de estos enlaces, deseas contribuir a mantener el proyecto IAdapta sin que a ti te cueste ni un céntimo más.
                </div>
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
        <GuiaEjercicios />
      </main>
      <Footer currentPage="guides" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
