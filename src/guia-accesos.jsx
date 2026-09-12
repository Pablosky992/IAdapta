const { Icons, Navbar, Footer, CookieBanner, getAmazonLink } = window;
const { useState } = React;

const GuiaAccesos = function GuiaAccesos() {
  const materials = [
    {
      name: 'Rampa telescópica plegable de aluminio',
      desc: 'Supera escalones y desniveles en accesos con máxima ligereza y superficie antideslizante.',
      image: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T1/images/I/813wIDx9CLL._AC_SL1500_.jpg',
      link: 'https://amzn.to/3USy3zg',
      query: 'rampa telescopica plegable aluminio silla ruedas ortopedia'
    },
    {
      name: 'Rampa de umbral de goma biselada',
      desc: 'Salva pequeños resaltes de 1 a 4 cm en puertas interiores y cancelas sin tropiezos.',
      image: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T1/images/I/61gx2i0TLkL._AC_SL1200_.jpg',
      link: 'https://amzn.to/470euYt',
      query: 'rampa umbral goma puerta accesibilidad silla ruedas'
    },
    {
      name: 'Pasamanos continuo de pared de acero',
      desc: 'Soporte ergonómico continuo para escaleras y pasillos con fijación robusta.',
      image: 'assets/asideros.jpg',
      link: 'https://amzn.to/4u4JBw3',
      query: 'pasamanos escalera continuo acero inoxidable pared'
    },
    {
      name: 'Luz LED con sensor de movimiento recargable',
      desc: 'Ilumina automáticamente zonas de paso, rellanos y escalones al detectar presencia.',
      image: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T1/images/I/61CMP2PbU0L._AC_SL1500_.jpg',
      link: 'https://amzn.to/3TppZpm',
      query: 'luz sensor movimiento nocturna pasillo escalera led recargable'
    }
  ];

  return (
    <section className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
        <img src="assets/guia_accesos.png" alt="Accesibilidad en Entradas y Pasillos" className="w-full h-64 sm:h-96 object-cover" />
        
        <div className="p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg">
          <div>
            <a href="guias.html" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors mb-6 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Volver a Guías
            </a>
            <h1 className="font-display text-4xl font-bold text-brand-900 mb-8">Accesibilidad en Entradas, Pasillos y Escaleras</h1>
            
            <p>
              El acceso al domicilio es el primer eslabón de la cadena de accesibilidad universal: si la entrada o las zonas de circulación interna presentan barreras, la persona corre el riesgo de quedar confinada en su propio hogar o depender permanentemente de terceros. Desde la Terapia Ocupacional, abordamos el entorno de acceso evaluando el itinerario peatonal completo, la biomecánica de la marcha, la maniobrabilidad de productos de apoyo (sillas de ruedas, andadores y bastones) y la percepción visual de los desniveles.
            </p>

            <div className="space-y-8 mt-6 border-t border-gray-100 pt-6">
              <p>A continuación, analizamos las intervenciones arquitectónicas y productos de apoyo más eficaces para garantizar un tránsito seguro y fluido:</p>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🚪</span> 1. Desniveles y Escalones: Rampas Fijas y Telescópicas</h5>
                <p>Un escalón de apenas 3 cm puede suponer una barrera insalvable para una silla de ruedas o provocar un tropiezo grave en personas con marcha senil o parkinsoniana.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Pendiente Reglamentaria y Segura:</strong> Según el Código Técnico de la Edificación (DB-SUA), las rampas deben mantener una pendiente máxima del 10% para tramos menores de 3 metros y del 8% para tramos de hasta 6 metros. Una inclinación excesiva genera sobreesfuerzo en el propulsor o riesgo de vuelco.</li>
                  <li><strong>Rampas Telescópicas Portátiles:</strong> Fabricadas en aluminio ligero con ranuras antideslizantes, son ideales para superar tramos de 2 a 5 escalones en portales, terrazas o vehículos sin necesidad de acometer obras comunitarias.</li>
                  <li><strong>Rampas de Umbral Biseladas:</strong> Piezas de goma maciza o aluminio que suavizan el resalte de marcos de puertas correderas o cancelas exteriores, permitiendo el paso suave de andadores con ruedas.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🪜</span> 2. Escaleras Seguras: Pasamanos Dobles y Huellas Antideslizantes</h5>
                <p>Las escaleras representan el punto crítico con mayor severidad en traumatismos por caídas en el adulto mayor.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Pasamanos Continuo a Ambos Lados:</strong> Permite utilizar el miembro superior hábil independientemente de si se sube o se baja. La altura recomendada se sitúa entre 90 y 105 cm del plano de la huella.</li>
                  <li><strong>Prolongación en Extremos:</strong> El pasamanos debe prolongarse al menos 30 cm más allá del primer y último peldaño, ofreciendo un punto de apoyo firme antes de iniciar o finalizar el tramo.</li>
                  <li><strong>Contraste Visual en el Borde:</strong> Instalar bandas fotoluminiscentes o cantoneras de alto contraste en la arista de cada peldaño facilita la discriminación de profundidad a personas con visión reducida.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">↔️</span> 3. Anchura de Paso y Maniobrabilidad en Pasillos y Puertas</h5>
                <p>La circulación interior requiere dimensiones mínimas que permitan el giro y el acompañamiento asistido.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Anchura Libre de Paso:</strong> Las puertas interiores deben proporcionar un vano libre mínimo de 80 cm (idealmente 85-90 cm para sillas eléctricas). Si la puerta existente es estrecha, las bisagras de apertura desplazada (tipo Z) ganan hasta 5 cm útiles sin cambiar el marco.</li>
                  <li><strong>Despeje de Pasillos:</strong> Eliminar mesitas auxiliares, paragüeros y maceteros para garantizar un ancho de paso continuo de al menos 90-100 cm.</li>
                  <li><strong>Suelo Continuo y Homogéneo:</strong> Retirar felpudos gruesos y alfombras sueltas, o fijarlas mediante cinta de doble cara de alta resistencia perimetral.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">💡</span> 4. Iluminación Guiada de Pasos y Sensores de Presencia</h5>
                <p>El déficit de iluminación nocturna en pasillos y descansillos es uno de los mayores desencadenantes de desorientación y caídas.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Balizamiento a Nivel de Rodapié:</strong> Luces LED nocturnas con sensor crepuscular y de movimiento colocadas a 30 cm del suelo que guían el camino hacia el baño o la cocina sin deslumbrar.</li>
                  <li><strong>Interruptores Conmutados Accesibles:</strong> Ubicación a una altura entre 90 y 110 cm del suelo, con teclas anchas basculantes o pilotos luminosos de localización nocturna.</li>
                </ul>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💡</span>
                  <h5 className="font-bold text-emerald-800 uppercase tracking-wide text-base">El Consejo de la Terapia Ocupacional</h5>
                </div>
                <p className="text-emerald-900 italic text-base leading-relaxed">
                  "El mayor error al instalar una rampa es subestimar su longitud. Una rampa demasiado corta resultará excesivamente empinada y peligrosa. Recuerda la regla básica: por cada centímetro de altura a salvar, necesitas al menos 10 o 12 centímetros de longitud de rampa para que el empuje sea seguro y ergonómico, tanto para el usuario independiente como para el cuidador."
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
                    <a
                      href={getAmazonLink(mat.query, mat.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-4 p-4 items-start w-full h-full"
                    >
                      {mat.image && (
                        <img src={mat.image} alt={mat.name} className="w-16 h-16 object-cover rounded-lg border border-gray-100 shrink-0" />
                      )}
                      <div className="flex flex-col gap-1.5 flex-1">
                        <span className="font-semibold text-gray-900 text-sm">{mat.name}</span>
                        {mat.desc && <p className="text-xs text-gray-500 leading-snug">{mat.desc}</p>}
                        <div className="inline-flex items-center gap-1 text-[#FF9900] font-bold text-xs mt-1">
                          Ver en Amazon
                        </div>
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
        <GuiaAccesos />
      </main>
      <Footer currentPage="guides" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
