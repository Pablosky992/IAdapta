const { Icons, Navbar, Footer, CookieBanner, getAmazonLink } = window;
const { useState } = React;

const GuiaParkinson = function GuiaParkinson() {
  const materials = [
    {
      name: 'Cubiertos con Peso para Temblores',
      desc: 'Cubiertos ergonómicos diseñados con peso adicional para estabilizar la mano y minimizar el efecto del temblor al comer.',
      image: 'assets/cubiertos_adaptados.jpg',
      link: 'https://amzn.to/4fwJvbH',
      query: 'cubiertos con peso temblor parkinson'
    },
    {
      name: 'Tapete Antideslizante de Silicona',
      desc: 'Base de alta adherencia que evita el deslizamiento de platos y vasos, facilitando una alimentación autónoma y segura.',
      image: 'assets/tapete_antideslizante.jpg',
      link: 'https://amzn.to/3SZLxsg',
      query: 'tapete antideslizante silicona'
    },
    {
      name: 'Elevador de Inodoro con Reposabrazos',
      desc: 'Facilita la incorporación reduciendo el esfuerzo requerido en las rodillas y caderas, ofreciendo apoyos laterales firmes.',
      image: 'assets/elevador_wc.jpg',
      link: 'https://amzn.to/3RwHjYy',
      query: 'elevador wc con reposabrazos'
    },
    {
      name: 'Calzador de Mango Largo con Gancho',
      desc: 'Permite calzarse cómodamente sin necesidad de agacharse y ayuda a acercar prendas de vestir gracias a su gancho integrado, evitando la pérdida de equilibrio.',
      image: 'assets/calzador_largo.png',
      link: 'https://amzn.to/4vtwynE',
      query: 'calzador largo con gancho'
    }
  ];

  return (
    <section className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
        <img src="assets/guia_parkinson.png" alt="Terapia Ocupacional y Parkinson: Guía de adaptación" className="w-full h-64 sm:h-96 object-cover" />
        
        <div className="p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg">
          <div>
            <a href="guias.html" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors mb-6 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Volver a Guías
            </a>
            
            <h1 className="font-display text-4xl font-bold text-brand-900 mb-8">Terapia Ocupacional en el Parkinson: Guía Completa de Adaptación del Entorno y Productos de Apoyo</h1>
            
            <p className="mb-4">
              La enfermedad de Parkinson es una condición neurodegenerativa compleja caracterizada principalmente por síntomas motores como el temblor en reposo, la rigidez muscular, la bradicinesia (lentitud de movimientos) y la inestabilidad postural. No obstante, sus efectos van mucho más allá de estos signos visibles, influyendo directamente en la capacidad de la persona para realizar sus actividades de la vida diaria (AVD) de manera autónoma y segura.
            </p>
            <p className="mb-6">
              Desde la perspectiva de la <strong>Terapia Ocupacional</strong>, el objetivo prioritario no es curar la patología, sino capacitar a la persona para que continúe participando activamente en sus rutinas significativas. Esto se logra mediante la modificación de la actividad, el entrenamiento en nuevas técnicas de movimiento y, de forma fundamental, a través de la <strong>adaptación del entorno físico</strong> y la prescripción adecuada de <strong>productos de apoyo</strong> (antes conocidos como ayudas técnicas). A continuación, analizamos de manera detallada cómo intervenir en cada área del hogar para maximizar la autonomía y prevenir riesgos.
            </p>

            <div className="space-y-8 mt-6 border-t border-gray-100 pt-6">
              
              {/* Sección 1 */}
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🍽️</span> 1. Alimentación Autónoma y Adaptaciones en la Mesa</h5>
                <p>
                  Comer es una actividad social e íntima que suele verse afectada tempranamente por el temblor y la falta de coordinación. La frustración derivada de los derrames de comida suele llevar al aislamiento del usuario. Para evitarlo, la Terapia Ocupacional propone soluciones prácticas:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Cubiertos de Peso (Cubiertos Lastrados):</strong> El principio físico detrás de estos utensilios es simple pero efectivo. Al añadir un peso calibrado en el mango del tenedor o de la cuchara (generalmente entre 100 y 200 gramos), se amortigua el temblor involuntario de la mano, permitiendo llevar el alimento a la boca con mayor estabilidad.</li>
                  <li><strong>Platos con Borde Elevado o Rebordes de Quita y Pon:</strong> Evitan que los alimentos salgan del plato al intentar empujarlos con el cubierto. Un fondo antideslizante con ventosas proporciona un punto de resistencia firme para comer con una sola mano si es necesario.</li>
                  <li><strong>Vasos Diseñados con Escotadura Nasal o Tapa:</strong> Permiten beber sin necesidad de inclinar la cabeza hacia atrás, disminuyendo el riesgo de aspiraciones (atragantamientos) en personas que también presentan disfagia. Los vasos con doble asa facilitan un agarre bimanual estable.</li>
                  <li><strong>Tapetes Antideslizantes:</strong> Colocar láminas de silicona tipo Dycem bajo el plato impide que la vajilla se desplace por la mesa debido a movimientos bruscos involuntarios.</li>
                </ul>
              </div>

              {/* Sección 2 */}
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">👕</span> 2. Facilitando el Vestido y la Autonomía en el Cuidado Personal</h5>
                <p>
                  La rigidez matutina y las fluctuaciones motoras (períodos "ON-OFF") convierten el acto de vestirse en una tarea lenta y agotadora. La fatiga acumulada durante el vestido a menudo reduce la energía disponible para el resto del día.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Modificación de la Ropa:</strong> Sustituir cierres complejos por alternativas más sencillas. Reemplazar botones tradicionales por botones magnéticos o tiras de velcro. Optar por pantalones con cintura elástica en lugar de cremalleras y cinturones rígidos.</li>
                  <li><strong>Abotonadores y Tiradores de Cremallera:</strong> Herramientas con mangos engrosados y antideslizantes que ayudan a pasar el botón por el ojal con un esfuerzo mínimo de motricidad fina. Un simple aro metálico o cordón en los cursores de las cremalleras facilita su agarre.</li>
                  <li><strong>Calzador de Mango Largo y Calzamedias:</strong> Productos fundamentales para evitar tener que flexionarse excesivamente, lo que compromete gravemente el equilibrio y puede inducir caídas.</li>
                  <li><strong>Cordones Elásticos para el Calzado:</strong> Permiten transformar zapatos normales con cordones en calzado elástico tipo "slip-on", manteniendo la sujeción necesaria sin requerir la destreza manual para hacer un lazo.</li>
                  <li><strong>Técnicas de Vestido:</strong> Se recomienda comenzar siempre vistiendo la extremidad más afectada por la rigidez o el temblor, y desvestirse en sentido inverso (retirando primero el lado más ágil). Realizar esta tarea sentados en una silla firme con reposabrazos mejora drásticamente la seguridad.</li>
                </ul>
              </div>

              {/* Sección 3 */}
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🚿</span> 3. Seguridad Crítica en el Cuarto de Baño</h5>
                <p>
                  El baño, por combinar superficies húmedas y espacios reducidos, representa la zona de mayor peligro del hogar. La inestabilidad postural en el Parkinson exige rediseñar este espacio con un enfoque preventivo estricto.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Ducha vs Bañera:</strong> Es altamente recomendable sustituir la bañera por un plato de ducha a ras de suelo. Las transferencias para entrar y salir de una bañera son complejas y aumentan el riesgo de caídas al exigir mantener el equilibrio sobre un solo pie en suelo resbaladizo.</li>
                  <li><strong>Asientos de Ducha:</strong> El aseo debe realizarse sentado. El uso de banquetas con conteras antideslizantes o sillas de ducha con respaldo y reposabrazos proporciona un descanso seguro y reduce la fatiga muscular provocada por la bipedestación prolongada.</li>
                  <li><strong>Barras de Apoyo Murales:</strong> Colocadas estratégicamente junto al inodoro y dentro de la ducha. Deben estar firmemente atornilladas y contar con superficies texturizadas antideslizantes. Deben evitarse los asideros de ventosa, ya que no garantizan la resistencia necesaria ante una pérdida súbita de equilibrio.</li>
                  <li><strong>Elevador de Inodoro (WC):</strong> Al elevar la altura del asiento del WC unos 10-15 cm, se reduce la flexión de rodilla requerida y se facilita enormemente el paso de sentado a de pie, lo cual es crítico dado que la bradicinesia dificulta la propulsión muscular inicial.</li>
                </ul>
              </div>

              {/* Sección 4 */}
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🚶</span> 4. Movilidad en el Hogar y Manejo de los Bloqueos de la Marcha</h5>
                <p>
                  Uno de los fenómenos más incapacitantes en fases moderadas y avanzadas es el <i>freezing</i> o bloqueo de la marcha (la sensación de tener los pies "pegados al suelo"). Este fenómeno suele ocurrir al iniciar la marcha, al girar o al atravesar espacios estrechos como puertas o pasillos.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Señales Visuales y Auditivas:</strong> Las pistas externas ayudan al cerebro a sortear el bloqueo motor. Colocar líneas de colores contrastantes en el suelo (por ejemplo, cintas adhesivas de color brillante perpendiculares al sentido de la marcha) actúa como un estímulo visual que ayuda a la persona a "dar el paso sobre la línea", rompiendo el bloqueo.</li>
                  <li><strong>Productos de Apoyo Específicos para la Marcha:</strong> Existen andadores y bastones equipados con tecnología láser que proyecta una línea roja en el suelo frente al usuario cuando detecta un bloqueo. Al intentar "pisar" esa luz roja, el cerebro activa una vía motora alternativa no dañada. Los metrónomos portátiles que emiten un ritmo acústico regular también facilitan mantener un paso constante.</li>
                  <li><strong>Eliminación de Obstáculos:</strong> Retirar alfombras, cables sueltos o muebles bajos. El suelo debe estar despejado para evitar tropiezos debido a la marcha festinante (pasos cortos, rápidos y arrastrando los pies).</li>
                  <li><strong>Distribución Lumínica:</strong> Mantener una iluminación uniforme en toda la vivienda. Las zonas con sombras marcadas o cambios bruscos de iluminación pueden ser malinterpretadas visualmente, desencadenando bloqueos de la marcha involuntarios.</li>
                </ul>
              </div>

              {/* Sección 5 */}
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">✍️</span> 5. Comunicación, Escritura y Ocio Adaptado</h5>
                <p>
                  La micrografía (escritura que se vuelve progresivamente más pequeña e ilegible) y los problemas de control fino limitan tareas cotidianas como firmar documentos, usar el teléfono móvil o disfrutar de juegos de mesa.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Bolígrafos con Peso y Mangos Engrosados:</strong> Al igual que con los cubiertos, el peso extra estabiliza la mano para escribir de manera más fluida. Los adaptadores de espuma blanda para lápices reducen la fuerza de prensión requerida y la fatiga muscular de los dedos.</li>
                  <li><strong>Tecnología de Apoyo:</strong> Configurar asistentes de voz en dispositivos inteligentes (como altavoces inteligentes o teléfonos) para realizar llamadas, encender luces o programar recordatorios mediante comandos de voz simples, evitando la frustración de pulsar pantallas táctiles pequeñas durante episodios de temblor.</li>
                  <li><strong>Ocio Adaptado:</strong> Juegos de mesa con piezas sobredimensionadas y fáciles de sujetar, soportes para cartas (tarjeteros) que eliminan la necesidad de sostenerlas constantemente en abanico con las manos, y libros en formato digital para ajustar el tamaño del texto y evitar sostener físicamente el peso de libros voluminosos.</li>
                </ul>
              </div>

              {/* Caja de consejos */}
              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-2xl shadow-sm mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💡</span>
                  <h5 className="font-bold text-purple-800 uppercase tracking-wide text-base">El Consejo del Terapeuta Ocupacional</h5>
                </div>
                <p className="text-purple-900 italic text-base leading-relaxed">
                  "Respeta los tiempos de la persona y planifica las actividades más complejas durante los períodos 'ON' de la medicación (cuando los fármacos logran su máximo efecto terapéutico). No caigas en la tentación de hacer las cosas por ellos bajo el pretexto de ir más rápido; cada actividad que el usuario realiza por sí mismo, aunque tarde más tiempo, es una victoria terapéutica que preserva sus conexiones neuronales, su movilidad articular y, sobre todo, su dignidad y autoestima."
                </p>
              </div>
            </div>

            {/* Material Recomendado */}
            <div className="mt-12 bg-gray-50 rounded-2xl p-6 sm:p-8 border border-brand-100 shadow-sm">
              <h3 className="font-bold text-brand-800 uppercase tracking-wide text-lg mb-6 flex items-center gap-2">
                <Icons.Check /> Material recomendado para el Parkinson
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
        <GuiaParkinson />
      </main>
      <Footer currentPage="guides" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
