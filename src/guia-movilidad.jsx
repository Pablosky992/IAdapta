const { Icons, Navbar, Footer, CookieBanner, getAmazonLink } = window;
const { useState } = React;

const GuiaMovilidad = function GuiaMovilidad() {
  const materials = [
    {
      name: 'Andador de aluminio para interior',
      desc: 'Ligero y estrecho, con ruedas delanteras para maniobrar por pasillos y puertas de casa.',
      image: 'andador_interior.png',
      link: 'https://amzn.to/49eGadM',
      query: 'andador interior estrecho ancianos'
    },
    {
      name: 'Andador tipo Rollator (exterior)',
      desc: 'Con cuatro ruedas grandes, asiento y frenos para paseos seguros en la calle.',
      image: 'andador_exterior.png',
      link: 'https://amzn.to/4nioy6O',
      query: 'andador rollator exterior aluminio'
    },
    {
      name: 'Conteras antideslizantes',
      desc: 'Gomas anchas de repuesto para bastones o andadores. Máximo agarre en el suelo.',
      image: 'conteras.png',
      link: 'https://amzn.to/4uw9fth',
      query: 'conteras antideslizantes baston'
    }
  ];

  return (
    <section className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
        <img src="assets/movilidad_adaptada.jpg" alt="Movilidad Adaptada" className="w-full h-64 sm:h-96 object-cover" />
        
        <div className="p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg">
          <div>
            <a href="guias.html" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors mb-6 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Volver a Guías
            </a>
            <h1 className="font-display text-4xl font-bold text-brand-900 mb-8">Movilidad y Autonomía: Prescripción de Productos de Apoyo</h1>
            
            <p>Mantener la movilidad activa, tanto dentro como fuera del hogar, es el factor preventivo número uno frente al declive funcional. Sin embargo, la elección de un dispositivo de asistencia no debe ser una decisión al azar; un producto mal prescrito o mal configurado puede alterar el patrón de marcha, generar vicios posturales y provocar patologías secundarias en hombros, espalda y muñecas.</p>

            <div className="space-y-8 mt-6 border-t border-gray-100 pt-6">
              <p>Desde el análisis biomecánico, la movilidad se divide según la necesidad de soporte y el entorno de uso:</p>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🦯</span> 1. El Bastón: Simetría y Descarga</h5>
                <p>Es el dispositivo más común, diseñado para mejorar el equilibrio aumentando la base de sustentación o para descargar peso de una articulación afecta (cadera o rodilla).</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Configuración Ergonómica:</strong> El uso correcto no solo depende de la altura, sino de la coordinación motriz. Un bastón mal utilizado puede desplazar el centro de gravedad de forma peligrosa.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🚶</span> 2. Tipologías de Andadores (Caminadores)</h5>
                <p>La elección del andador depende del equilibrio dinámico del usuario y del entorno donde se desplazará:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Andador Fijo (4 tacos):</strong> Proporciona la máxima estabilidad. Es ideal para fases iniciales de rehabilitación o usuarios con gran inestabilidad, ya que obliga a realizar una marcha lenta y fragmentada (levantar, avanzar, apoyar).</li>
                  <li><strong>Andador de dos ruedas (Delanteras y tacos traseros):</strong> El estándar para interiores domésticos. Las ruedas delanteras facilitan la fluidez del movimiento sin necesidad de levantar el dispositivo, mientras que los tacos traseros actúan como freno natural al ejercer presión hacia abajo.</li>
                  <li><strong>Andador de cuatro ruedas (Rollator):</strong> Diseñado específicamente para exteriores. Permite una marcha rápida y natural. Incluye frenos de mano para seguridad en pendientes y, habitualmente, un asiento incorporado para gestionar la fatiga mediante descansos frecuentes.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🦽</span> 3. Sillas de Ruedas: Cuando la Marcha no es Funcional</h5>
                <p>Cuando la bipedestación supone un riesgo de caída alto o la fatiga impide completar actividades básicas, la silla de ruedas se convierte en la herramienta de participación social por excelencia.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Sillas Manuales:</strong> Requieren que el usuario tenga fuerza suficiente en los miembros superiores para la autopropulsión o que disponga de un cuidador. Son ligeras, plegables y facilitan el transporte en vehículos.</li>
                  <li><strong>Sillas Eléctricas:</strong> Prescritas para usuarios con limitaciones severas en la fuerza de los brazos o enfermedades que cursan con fatiga extrema. Aportan una independencia total en distancias largas y terrenos irregulares sin esfuerzo físico.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">📏</span> 4. Protocolo de Ajuste y Mantenimiento</h5>
                <p>La efectividad de cualquier ayuda técnica se pierde si no se ajusta a la antropometría del usuario:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Evaluación de Altura:</strong> La empuñadura del dispositivo debe coincidir exactamente con el trocánter mayor (el relieve óseo lateral de la cadera). Con el usuario de pie y los brazos relajados, el codo debe presentar una flexión de entre 20º y 30º.</li>
                  <li><strong>Revisión de Conteras:</strong> Las gomas de la base (conteras) son el único punto de contacto con el suelo. Deben revisarse mensualmente; si el relieve antideslizante se ha desgastado, el riesgo de resbalón aumenta de forma exponencial, especialmente en superficies húmedas.</li>
                </ul>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💡</span>
                  <h5 className="font-bold text-emerald-800 uppercase tracking-wide text-base">El Consejo del Terapeuta Ocupacional</h5>
                </div>
                <p className="text-emerald-900 italic text-base leading-relaxed">
                  "Existe un error muy extendido: utilizar el bastón en el mismo lado que la pierna débil. Para una marcha fisiológica, el bastón debe empuñarse SIEMPRE con la mano contraria a la pierna lesionada o dolorida. Esto permite que el brazo y la pierna contraria avancen a la vez, simulando el balanceo natural del cuerpo, repartiendo las cargas de forma simétrica y protegiendo tu cadera."
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
        <GuiaMovilidad />
      </main>
      <Footer currentPage="guides" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
