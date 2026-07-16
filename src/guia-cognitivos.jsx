const { Icons, Navbar, Footer, CookieBanner, getAmazonLink } = window;
const { useState } = React;

const GuiaCognitivos = function GuiaCognitivos() {
  const materials = [
    {
      name: 'Libro de pasatiempos variados para adultos',
      desc: 'Cuaderno completo que reúne sopas de letras, crucigramas, sudokus y retos de lógica. Excelente recurso para realizar rutinas de gimnasia cerebral diarias.',
      image: 'assets/pasatiempos.png',
      link: 'https://amzn.to/3Rhlo7G',
      query: 'libro pasatiempos adultos sopa letras crucigramas'
    },
    {
      name: 'Libro de ejercicios mentales y entrenamiento de memoria',
      desc: 'Libro enfocado en la estimulación cognitiva estructurada, con ejercicios específicos para mejorar la retención de datos, la atención sostenida y el lenguaje.',
      image: 'assets/ejercicios_mentales.png',
      link: 'https://amzn.to/4prQqWX',
      query: 'libro ejercicios memoria estimulacion cognitiva adultos'
    }
  ];

  return (
    <section className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
        <img src="assets/guia_cognitivos.png" alt="Ejercicios Cognitivos y Estimulación Mental" className="w-full h-64 sm:h-96 object-cover" />
        
        <div className="p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg">
          <div>
            <a href="guias.html" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors mb-6 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Volver a Guías
            </a>
            
            <h1 className="font-display text-4xl font-bold text-brand-900 mb-8">Ejercicios Cognitivos y Estimulación Mental</h1>
            
            <h2 className="font-display text-2xl font-bold text-brand-800 mb-4">Gimnasia Cerebral: Mantener la Mente Activa para Conservar la Autonomía</h2>
            
            <p className="mb-4">
              La Terapia Ocupacional no trata solo de sobrevivir (comer, vestirse, asearse). Trata de vivir. A menudo asociamos la independencia con la fuerza física, pero la verdadera llave de la autonomía está en el cerebro. Olvidar si se ha tomado la medicación, perder el hilo de una conversación o tener dificultades para gestionar el dinero al hacer la compra son señales de que el sistema cognitivo necesita entrenamiento. El cerebro, al igual que los músculos, responde al principio de "o lo usas, o lo pierdes".
            </p>
            <p className="mb-6">
              La estimulación cognitiva no tiene por qué ser aburrida ni limitarse a rellenar fichas escolares. Integrar pequeños retos mentales en la rutina diaria protege la reserva cognitiva, frena el deterioro y ayuda a mantener el control de la propia vida durante mucho más tiempo. Estimular las conexiones neuronales nos dota de mayor adaptabilidad frente al envejecimiento natural o patológico.
            </p>

            <div className="space-y-8 mt-6 border-t border-gray-100 pt-6">
              
              {/* Sección 1 */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🧩</span>
                  <h3 className="text-2xl font-bold text-brand-900">1. Memoria y Atención (El Escudo contra los Despistes)</h3>
                </div>
                <p>
                  La memoria de trabajo y la atención sostenida son las funciones que más sufren el desgaste del día a día, pero también las más agradecidas de entrenar. Al enfocar la atención voluntaria y realizar el esfuerzo de retención, fortalecemos las sinapsis de la corteza prefrontal y temporal.
                </p>
                <div className="bg-brand-50/50 p-6 rounded-2xl border-l-4 border-brand-500 space-y-4 mt-2">
                  <div>
                    <h4 className="font-bold text-brand-800 text-base">El Juego de la Lista de la Compra (Memoria a Corto Plazo)</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Cómo realizarlo:</strong> Antes de ir al supermercado, escribe una lista de 8 a 10 productos cotidianos. Léela con atención durante un minuto completo para fijar los términos, guárdate el papel en el bolsillo e intenta realizar la compra de memoria. Justo antes de ir a pagar en la caja, saca el papel para comprobar si te ha faltado algún artículo.
                    </p>
                    <p className="text-xs text-brand-700 italic mt-1">
                      <strong>Beneficio clínico:</strong> Estimula la memoria inmediata y el agrupamiento categórico, habilidades indispensables para el manejo independiente en el entorno comunitario.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-800 text-base">Atención con el Periódico (Rastreo Visual y Concentración)</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Cómo realizarlo:</strong> Coge una noticia o columna de prensa escrita en papel. Con un bolígrafo, tacha de forma sistemática todas las letras "A" (o cualquier otra vocal) que encuentres en un único párrafo, leyendo de izquierda a derecha. Intenta medir el tiempo que tardas y los fallos cometidos.
                    </p>
                    <p className="text-xs text-brand-700 italic mt-1">
                      <strong>Beneficio clínico:</strong> Entrena la velocidad de procesamiento visual, la atención sostenida y la inhibición de estímulos irrelevantes, previniendo distracciones que afecten a tareas de riesgo en casa.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sección 2 */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">✍️</span>
                  <h3 className="text-2xl font-bold text-brand-900">2. Lenguaje y Funciones Ejecutivas (Planificación y Fluidez)</h3>
                </div>
                <p>
                  Las funciones ejecutivas nos permiten organizar el día, tomar decisiones correctas y resolver problemas imprevistos sobre la marcha, mientras que el lenguaje fluido nos mantiene comunicados socialmente y previene el aislamiento.
                </p>
                <div className="bg-brand-50/50 p-6 rounded-2xl border-l-4 border-brand-500 space-y-4 mt-2">
                  <div>
                    <h4 className="font-bold text-brand-800 text-base">Fluidez Verbal por Categorías (Acceso Léxico)</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Cómo realizarlo:</strong> Dedica 2 minutos al día a nombrar en voz alta todas las palabras que puedas que pertenezcan a una categoría semántica o fonológica específica sin repetirte (por ejemplo: marcas de coches, herramientas del taller, nombres de flores, o bien alimentos que empiecen estrictamente por la letra "M").
                    </p>
                    <p className="text-xs text-brand-700 italic mt-1">
                      <strong>Beneficio clínico:</strong> Entrena la agilidad de búsqueda en el almacén de memoria a largo plazo y mejora la fluidez conversacional en las interacciones del día a día.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-800 text-base">Cálculo con la Vuelta de la Compra (Función Ejecutiva)</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Cómo realizarlo:</strong> Cuando vayas a comprar, intenta estimar de cabeza el precio acumulado de tres artículos antes de que los pasen por el lector de caja. Asimismo, si pagas en efectivo, calcula el cambio exacto que te deben entregar antes de que el cajero te dé las monedas.
                    </p>
                    <p className="text-xs text-brand-700 italic mt-1">
                      <strong>Beneficio clínico:</strong> Ejercita el cálculo aritmético básico y la memoria de trabajo activa, habilidades instrumentales críticas para conservar la autonomía en transacciones financieras.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sección 3 */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🧭</span>
                  <h3 className="text-2xl font-bold text-brand-900">3. Habilidades Visoespaciales y Orientación</h3>
                </div>
                <p>
                  La capacidad de reconocer el espacio, las dimensiones y las formas geométricas nos protege de la desorientación y mantiene activa la coordinación ojo-mano.
                </p>
                <div className="bg-brand-50/50 p-6 rounded-2xl border-l-4 border-brand-500 space-y-4 mt-2">
                  <div>
                    <h4 className="font-bold text-brand-800 text-base">Cambio de Rutas (Orientación Espacial)</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Cómo realizarlo:</strong> Al salir a pasear por tu barrio o ir al mercado, cambia de forma deliberada el camino que tomas siempre. Intenta cruzar calles diferentes o rodea una manzana alternativa buscando puntos de referencia conocidos.
                    </p>
                    <p className="text-xs text-brand-700 italic mt-1">
                      <strong>Beneficio clínico:</strong> Fuerza al cerebro a procesar información visual y espacial nueva, actualizando los mapas cognitivos de orientación y previniendo la desorientación fuera de casa.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-800 text-base">Rompecabezas y Tangrams (Habilidad Visoconstructiva)</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Cómo realizarlo:</strong> Dedica tiempo a encajar piezas de rompecabezas tridimensionales o planos. Manipular los bloques y visualizar la forma en que deben encajar en un espacio determinado entrena las habilidades visoespaciales.
                    </p>
                    <p className="text-xs text-brand-700 italic mt-1">
                      <strong>Beneficio clínico:</strong> Desarrolla la rotación mental de objetos, que es el mismo mecanismo visoespacial que necesitamos para realizar tareas domésticas complejas como organizar cajones, armarios o cargar de forma eficiente el lavavajillas.
                    </p>
                  </div>
                </div>
              </div>

              {/* Gimnasio Cerebral Interactivo */}
              <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-center">
                <div className="shrink-0 bg-indigo-100 text-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner">
                  <Icons.MessageSquare className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-display text-xl font-bold text-brand-900 mb-2">¿Quieres entrenar ahora mismo en línea?</h4>
                  <p className="text-gray-600 mb-4 text-base">
                    Además de estos ejercicios caseros, te invito a entrenar tu mente de forma interactiva en nuestro <a href="estimulacion-cognitiva.html" className="text-indigo-600 font-bold hover:underline">Área Cognitiva y Gimnasio Cerebral</a>, donde encontrarás juegos digitales gratuitos diseñados específicamente para potenciar tu memoria, atención y agilidad mental.
                  </p>
                  <a href="estimulacion-cognitiva.html" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-sm active:scale-95">
                    Ir al Gimnasio Cerebral interactivo
                  </a>
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
                  "Para que un ejercicio cognitivo funcione, debe cumplir dos requisitos: tiene que ser un reto (si es demasiado fácil, el cerebro se aburre y no se esfuerza) y tiene que ser divertido (si es demasiado difícil o frustrante, se abandona). No busques la perfección en el resultado; lo que realmente genera nuevas conexiones neuronales es el esfuerzo que hace tu mente mientras busca la respuesta."
                </p>
              </div>

              {/* Productos de Apoyo Recomendados */}
              <div className="space-y-6 pt-6">
                <h3 className="font-display text-2xl font-bold text-brand-900">
                  Libros y Recursos de Estimulación Recomendados
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
        <GuiaCognitivos />
      </main>
      <Footer currentPage="guides" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
