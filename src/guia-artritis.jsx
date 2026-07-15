const { Icons, Navbar, Footer, CookieBanner, getAmazonLink } = window;
const { useState } = React;

const GuiaArtritis = function GuiaArtritis() {
  const materials = [
    {
      name: 'Cubiertos Adaptados con Mango Grueso',
      desc: 'Reducen la tensión en las pequeñas articulaciones de los dedos al requerir menor fuerza de prensión para comer.',
      image: 'assets/cubiertos_adaptados.jpg',
      link: 'https://amzn.to/4wi1BVq',
      query: 'cubiertos adaptados mango grueso'
    },
    {
      name: 'Abridor de Tarros y Botes Ergonómico',
      desc: 'Herramienta que multiplica la fuerza y evita los dolorosos movimientos de torsión en la muñeca al abrir tarros.',
      image: 'assets/abridor_tarros.jpg',
      link: 'https://amzn.to/3SZNDIE',
      query: 'abridor de tarros ergonomico'
    },
    {
      name: 'Adaptador de Llaves de Gran Palanca',
      desc: 'Añade una superficie de agarre ancha para girar las llaves en la cerradura utilizando la fuerza de la palma de la mano.',
      image: 'assets/adaptador_llaves.png',
      link: 'https://amzn.to/458NnJP',
      query: 'adaptador llaves facilitar giro'
    },
    {
      name: 'Abotonador con Mango Ergonómico',
      desc: 'Permite abrochar botones pequeños sin realizar la pinza fina con las yemas de los dedos, ideal en fases de inflamación.',
      image: 'assets/abotonador.png',
      link: 'https://amzn.to/4eXYry7',
      query: 'abotonador de ropa'
    }
  ];

  return (
    <section className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
        <img src="assets/guia_artritis.png" alt="Terapia Ocupacional y Artritis: Guía de adaptación" className="w-full h-64 sm:h-96 object-cover" />
        
        <div className="p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg">
          <div>
            <a href="guias.html" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors mb-6 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Volver a Guías
            </a>
            
            <h1 className="font-display text-4xl font-bold text-brand-900 mb-8">Terapia Ocupacional en la Artritis: Guía de Protección Articular y Autonomía</h1>
            
            <p className="mb-4">
              La <strong>artritis</strong> y la <strong>artrosis</strong> son patologías que afectan de forma directa a las articulaciones, provocando dolor crónico, inflamación, rigidez matutina y, en fases avanzadas, deformidad y limitación del rango de movimiento. Aunque clínicamente tienen orígenes diferentes (la artritis es un proceso inflamatorio autoinmune o metabólico, mientras que la artrosis es un desgaste mecánico del cartílago), ambas comparten un impacto severo sobre las actividades de la vida diaria (AVD). Acciones tan sencillas como abrir un bote, girar una llave, abrocharse un botón o escribir pueden transformarse en retos dolorosos y frustrantes.
            </p>
            <p className="mb-6">
              Desde la disciplina de la <strong>Terapia Ocupacional</strong>, el enfoque de tratamiento se fundamenta en la <strong>protección articular</strong> y la <strong>conservación de energía</strong>. El objetivo principal es reducir la carga física y el estrés mecánico sobre las articulaciones dañadas, previniendo la progresión de deformidades y permitiendo que la persona continúe siendo productiva e independiente en sus rutinas habituales. A continuación, desarrollamos una guía práctica con adaptaciones del hogar y recomendaciones clínicas para el día a día.
            </p>

            <div className="space-y-8 mt-6 border-t border-gray-100 pt-6">
              
              {/* Sección 1 */}
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🍳</span> 1. Alimentación y Tareas de la Cocina sin Sobrecarga</h5>
                <p>
                  Las articulaciones de los dedos y las muñecas son las que más sufren durante las tareas culinarias. Las fuerzas de pinza y de torsión requeridas para abrir envases o manipular utensilios pesados deben compensarse:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Cubiertos de Mango Engrosado:</strong> Al aumentar el diámetro del mango de los tenedores, cucharas y cuchillos, se requiere un menor esfuerzo del puño para sostenerlos. Esto disminuye la presión intraarticular en las articulaciones de los dedos, reduciendo la fatiga y el dolor durante las comidas.</li>
                  <li><strong>Abridores de Tarros Ergonómicos:</strong> Los abridores manuales con recubrimiento de silicona o los dispositivos montados bajo la encimera multiplican la fuerza de palanca. Esto evita realizar el movimiento de rotación extrema con la muñeca, protegiendo las articulaciones carpometacarpianas (como en la rizartrosis o artrosis del pulgar).</li>
                  <li><strong>Vajilla y Utensilios Ligeros:</strong> Sustituir cazuelas de hierro fundido por sartenes de aluminio ligero con doble asa para poder levantarlas con ambas manos. Cambiar los platos cerámicos pesados por vajilla de Opal, que mantiene una excelente resistencia siendo notablemente más ligera.</li>
                </ul>
              </div>

              {/* Sección 2 */}
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">👕</span> 2. Vestido, Calzado y Manejo de la Rigidez Matutina</h5>
                <p>
                  La rigidez matutina es uno de los síntomas más característicos de la artritis reumatoide, complicando notablemente el aseo y vestido al despertar. Organizar la tarea de forma estratégica reduce el impacto de esta rigidez:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Abotonadores Ergonómicos:</strong> Sostener un pequeño botón e introducirlo por el ojal requiere una pinza fina de gran presión. El abotonador manual soluciona este problema mediante un asa de alambre que sujeta el botón y permite deslizarlo a través del ojal realizando un movimiento del brazo entero, protegiendo las articulaciones distales de los dedos.</li>
                  <li><strong>Sustitución de Cierres:</strong> Optar por ropa holgada, con cinturas elásticas o cierres de velcro. En chaquetas y abrigos, se pueden acoplar tiradores de cremallera en forma de anilla para subirlas introduciendo simplemente un dedo, evitando el pellizco de la cremallera.</li>
                  <li><strong>Facilitar el Calzado:</strong> Utilizar cordones elásticos que no requieran nudos y calzadores de mango largo de metal para introducir el pie con facilidad, evitando flexionar excesivamente las caderas y rodillas si estas se encuentran inflamadas.</li>
                </ul>
              </div>

              {/* Sección 3 */}
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🚿</span> 3. Adaptaciones en el Baño para Proteger Caderas y Rodillas</h5>
                <p>
                  El agua caliente es un gran aliado para aliviar el dolor y reducir la rigidez muscular. Sin embargo, el esfuerzo de sentarse y levantarse de superficies bajas resulta muy perjudicial para las articulaciones de carga de los miembros inferiores (rodillas y caderas).
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Elevador de WC con Reposabrazos:</strong> Los inodoros estándar suelen ser demasiado bajos. Al elevar la altura unos 10-15 cm, disminuye drásticamente el ángulo de flexión articular necesario para incorporarse. Los reposabrazos integrados permiten ayudarse con la fuerza de los brazos, descargando las piernas.</li>
                  <li><strong>Higiene Sentados en la Ducha:</strong> Disponer de un taburete o silla de ducha estable con conteras antideslizantes. Permanecer de pie sobre una superficie resbaladiza fatiga las articulaciones y aumenta la inestabilidad postural si el dolor afecta a los pies.</li>
                  <li><strong>Adaptadores de Grifos:</strong> Sustituir los mandos de rosca tradicionales por grifos monomando de palanca larga, que pueden accionarse con el antebrazo o la palma de la mano sin necesidad de hacer pinza ni giro con los dedos.</li>
                </ul>
              </div>

              {/* Sección 4 */}
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🔑</span> 4. Ergonomía en la Oficina y Tareas del Hogar</h5>
                <p>
                  Pequeños gestos repetitivos a lo largo del día pueden provocar microrroturas y acelerar la deformidad si no se adaptan las herramientas:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Adaptadores de Llaves:</strong> Girar una llave estándar requiere un fuerte pellizco de los dedos índice y pulgar que genera una gran tensión en la base de la mano. Los soportes adaptadores para llaves aumentan el brazo de palanca y la superficie de agarre, permitiendo abrir la cerradura empleando la fuerza de toda la mano.</li>
                  <li><strong>Bolígrafos Ergonómicos o Engrosados:</strong> Para la escritura, se deben utilizar bolígrafos de tinta fluida (para no presionar con fuerza contra el papel) y acoplarles manguitos de espuma blanda. Esto previene la típica hiperextensión de las articulaciones de los dedos al escribir.</li>
                  <li><strong>Manillas Tipo Palanca:</strong> Cambiar los pomos giratorios de las puertas por manillas tipo palanca, fáciles de accionar empujando hacia abajo con la mano abierta o el codo.</li>
                </ul>
              </div>

              {/* Sección 5 */}
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🛡️</span> 5. Principios Clave de la Protección Articular</h5>
                <p>
                  La protección articular es una educación postural y de comportamiento que el terapeuta ocupacional enseña al paciente para integrarla en todas sus rutinas:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Utilizar la Articulación Más Grande Disponible:</strong> Al transportar bolsas de la compra, no las sostenga con la punta de los dedos. Cuélguelas en el antebrazo o al hombro. Al cerrar un grifo o empujar una puerta, utilice la palma de la mano abierta o el cuerpo, nunca la punta de los dedos.</li>
                  <li><strong>Evitar Mantener la Misma Postura:</strong> Al leer o usar dispositivos, cambie de posición o realice estiramientos suaves cada 20-30 minutos para evitar la rigidez articular.</li>
                  <li><strong>Respetar el Dolor:</strong> El dolor es una señal de alarma del cuerpo. No fuerce una articulación inflamada más allá de sus límites normales. Planifique periodos de descanso alternados con la actividad.</li>
                </ul>
              </div>

              {/* Caja de consejos */}
              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-2xl shadow-sm mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💡</span>
                  <h5 className="font-bold text-purple-800 uppercase tracking-wide text-base">El Consejo del Terapeuta Ocupacional</h5>
                </div>
                <p className="text-purple-900 italic text-base leading-relaxed">
                  "No confundas el reposo con la inactividad total. Durante un brote inflamatorio agudo, el uso de férulas de reposo termoplásticas a medida (confeccionadas por un terapeuta ocupacional) es crucial para alinear la articulación, mitigar el dolor y evitar deformidades como la desviación cubital de los dedos. Sin embargo, en los periodos de remisión, es fundamental realizar ejercicios suaves de rango de movimiento y fortalecimiento moderado para mantener la musculatura activa. Mantén tus manos en movimiento, pero de forma inteligente."
                </p>
              </div>
            </div>

            {/* Material Recomendado */}
            <div className="mt-12 bg-gray-50 rounded-2xl p-6 sm:p-8 border border-brand-100 shadow-sm">
              <h3 className="font-bold text-brand-800 uppercase tracking-wide text-lg mb-6 flex items-center gap-2">
                <Icons.Check /> Material recomendado para la Artritis y Artrosis
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
        <GuiaArtritis />
      </main>
      <Footer currentPage="guides" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
