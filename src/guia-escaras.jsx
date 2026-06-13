const { Icons, Navbar, Footer, CookieBanner, AdSenseBlock, getAmazonLink } = window;
const { useState } = React;

const GuiaEscaras = function GuiaEscaras() {
  const materials = [
    {
      name: 'Cojín Antiescaras Viscoelástico',
      desc: 'Espuma con memoria que distribuye el peso de forma uniforme, ideal para prevención en sillas.',
      image: 'cojin_antiescaras.png',
      link: 'https://amzn.to/4fJLTwu',
      query: 'cojin antiescaras viscoelastico'
    },
    {
      name: 'Colchón de Aire Alternante',
      desc: 'Sistema con compresor que infla y desinfla celdas para cambiar los puntos de presión continuamente.',
      image: 'colchon_aire.png',
      link: 'https://amzn.to/43yPs1a',
      query: 'colchon antiescaras aire alternante'
    },
    {
      name: 'Taloneras Antiescaras',
      desc: 'Protecciones acolchadas para el talón, una de las zonas con mayor riesgo de ulceración en cama.',
      image: 'taloneras_antiescaras.png',
      link: 'https://amzn.to/3S72kcn',
      query: 'talonera antiescaras borreguito'
    }
  ];

  return (
    <section className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
        <img src="assets/prevencion_escaras.png" alt="Prevención de Escaras" className="w-full h-64 sm:h-96 object-cover" />
        
        <div className="p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg">
          <div>
            <a href="guias.html" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors mb-6 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Volver a Guías
            </a>
            <h1 className="font-display text-4xl font-bold text-brand-900 mb-8">Prevención de Úlceras por Presión (Escaras): Posicionamiento y Cuidado</h1>
            
            <p>
              Las úlceras por presión, comúnmente conocidas como escaras, son lesiones en la piel y los tejidos subyacentes que se producen como consecuencia de una presión prolongada, fricción o cizallamiento sobre la piel. Generalmente aparecen en las zonas donde el hueso está más cerca de la piel (prominencias óseas) como los talones, los tobillos, las caderas y el coxis.
            </p>
            <p>
              Para las personas con movilidad reducida que pasan mucho tiempo en cama o en silla de ruedas, la prevención es vital. Tratar una úlcera una vez que ha aparecido es un proceso largo, doloroso y complejo. Desde la Terapia Ocupacional, el abordaje se centra en el manejo del entorno y el uso de superficies especiales para el manejo de la presión (SEMP).
            </p>

            <div className="space-y-8 mt-6 border-t border-gray-100 pt-6">
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🔄</span> 1. Cambios Posturales: La Base de la Prevención</h5>
                <p>Ningún cojín o colchón sustituye la necesidad de realizar cambios posturales periódicos. La regla de oro es redistribuir el peso antes de que el tejido sufra isquemia (falta de riego sanguíneo).</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Frecuencia:</strong> Para personas encamadas, se recomienda un cambio de postura cada 2-3 horas. Para usuarios de silla de ruedas que no pueden recolocarse de forma autónoma, deben realizarse descargas de presión (inclinando la silla o levantando el peso) cada 15-30 minutos.</li>
                  <li><strong>Alineación:</strong> Durante los cambios, se debe asegurar que el cuerpo mantenga una alineación natural. El uso de almohadas comunes entre las rodillas o bajo las pantorrillas (dejando los talones suspendidos) es una práctica excelente.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🛏️</span> 2. Superficies Especiales en la Cama (Colchones Antiescaras)</h5>
                <p>Cuando el riesgo es alto, el colchón habitual no es suficiente para aliviar la presión sobre los tejidos blandos.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Colchones de Aire Alternante:</strong> Son los más eficaces para el domicilio. Consisten en una sobrecolchoneta formada por celdas de aire conectadas a un pequeño compresor silencioso. El motor infla y desinfla filas de celdas de manera alterna, consiguiendo que los puntos de apoyo del cuerpo cambien constantemente sin que la persona tenga que moverse.</li>
                  <li><strong>Posicionamiento del paciente:</strong> Debe colocarse siempre sobre el colchón de aire solo con la sábana bajera interpuesta. Evitar poner empapadores gruesos o múltiples mantas debajo del paciente, ya que esto anula el efecto de alivio de presión del colchón.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🪑</span> 3. Sedestación Prolongada: El Cojín Antiescaras</h5>
                <p>La posición de sentado ejerce una presión masiva sobre los isquiones (los huesos de la pelvis sobre los que nos sentamos) y la zona sacra.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Tipos de Cojines:</strong>
                    <ul className="list-circle pl-5 mt-2 space-y-1">
                      <li><em>Viscoelásticos o espuma de poliuretano:</em> Ideales para riesgo bajo-medio. Tienen 'memoria' y se adaptan a la anatomía del usuario aumentando la superficie de contacto.</li>
                      <li><em>Gel o fluidos:</em> Mantienen una temperatura baja y distribuyen bien la presión. Útiles para usuarios con control de tronco moderado.</li>
                      <li><em>Celdas de aire (tipo Roho):</em> Para riesgo muy alto o cuando ya existe una úlcera. Funcionan por inmersión, permitiendo que el paciente "flote" sobre las celdas, pero requieren un calibrado exacto de aire.</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🛡️</span> 4. Cuidado de la Piel y Control del Microclima</h5>
                <p>La presión no es el único enemigo; la humedad y el roce son factores de riesgo críticos.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Manejo de la humedad:</strong> La piel húmeda por sudoración o incontinencia es extremadamente frágil. Se debe mantener la piel limpia e hidratada (pero seca), y utilizar cremas barrera (con óxido de zinc) si hay riesgo de maceración.</li>
                  <li><strong>Cuidado con el cizallamiento:</strong> Al sentar al paciente en la cama, si esta se eleva a más de 30 grados, el cuerpo tiende a resbalar hacia los pies. Este deslizamiento estira y rasga los vasos sanguíneos bajo la piel. Para evitarlo, siempre hay que subir primero la sección de las piernas de la cama articulada y luego elevar el respaldo.</li>
                </ul>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💡</span>
                  <h5 className="font-bold text-emerald-800 uppercase tracking-wide text-base">El Consejo del Terapeuta Ocupacional</h5>
                </div>
                <p className="text-emerald-900 italic text-base leading-relaxed">
                  "El error más común y peligroso que vemos en las casas es colocar flotadores o cojines con forma de 'donut' redondo para aliviar la presión del coxis. Nunca los utilices. Estos cojines concentran toda la presión en el anillo exterior y cortan la circulación sanguínea hacia el centro, creando un efecto de torniquete que favorece la aparición de escaras justo en el agujero central. Utiliza siempre cojines de base completa (cuadrados o anatómicos) de viscoelástica, gel o aire."
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
        <GuiaEscaras />
      </main>
      <Footer currentPage="guides" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
