const { Icons, Navbar, Footer, CookieBanner, AdSenseBlock, getAmazonLink } = window;
const { useState } = React;

const GuiaDormitorio = function GuiaDormitorio() {
  const materials = [
    {
      name: 'Barandilla extensible',
      desc: 'Asidero seguro para facilitar la incorporación y evitar caídas nocturnas.',
      image: 'barandilla_cama.png',
      link: 'https://amzn.to/42hT9Yu',
      query: 'barandilla asidero cama ancianos'
    },
    {
      name: 'Trapecio Universal',
      desc: 'Estructura de apoyo superior para facilitar la incorporación y cambios posturales en cama.',
      image: 'trapecio_cama.png',
      link: 'https://amzn.to/3PqiHj4',
      query: 'trapecio incorporador cama'
    },
    {
      name: 'Tacos elevadores para patas de cama',
      desc: 'Aumentan la altura de la cama para facilitar levantarse sin esfuerzo articular.',
      image: 'tacos_cama.png',
      link: 'https://amzn.to/4tXN3Zo',
      query: 'tacos elevadores cama'
    }
  ];

  return (
    <section className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
        <img src="assets/dormitorio_adaptado.png" alt="Dormitorio Adaptado" className="w-full h-64 sm:h-96 object-cover" />
        
        <div className="p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg">
          <div>
            <a href="guias.html" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors mb-6 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Volver a Guías
            </a>
            <h1 className="font-display text-4xl font-bold text-brand-900 mb-8">Seguridad en el Dormitorio: Prevención de Caídas y Transferencias Eficientes</h1>
            
            <p>
              El dormitorio debe ser un santuario de descanso, pero para personas con movilidad reducida, procesos postquirúrgicos o adultos mayores, puede convertirse en un entorno de riesgo. El tránsito nocturno —especialmente los desplazamientos entre la cama y el baño— es uno de los momentos críticos debido a factores como la hipotensión ortostática (mareos al levantarse), la urgencia miccional o la desorientación al despertar.
            </p>

            <div className="space-y-8 mt-6 border-t border-gray-100 pt-6">
              <p>Para garantizar un entorno seguro, debemos centrarnos en la adecuación del mobiliario y la optimización del flujo de movimiento:</p>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🛏️</span> 1. La Ergonomía de la Cama: Altura y Biomecánica</h5>
                <p>La altura del lecho es el factor determinante para una transferencia segura y autónoma. Una cama demasiado baja exige un esfuerzo excesivo de los cuádriceps y las articulaciones de la rodilla, aumentando el riesgo de pérdida de equilibrio.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>La Regla de la Sedestación:</strong> La altura ideal debe permitir que, al estar sentado en el borde del colchón, los pies apoyen totalmente en el suelo mientras las caderas y rodillas mantienen un ángulo de aproximadamente 90 grados.</li>
                  <li><strong>Soluciones Técnicas:</strong> Si la cama es baja, el uso de tacos elevadores en las patas es una solución sencilla y estable. En casos de mayor necesidad clínica, las camas articuladas con carro elevador permiten regular la altura para facilitar tanto la entrada/salida como la asistencia del cuidador.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">💡</span> 2. Iluminación Inteligente y Accesibilidad</h5>
                <p>La falta de visibilidad es la causa directa de la mayoría de los tropiezos nocturnos. El objetivo es eliminar la "ceguera momentánea" al despertar.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Control al Alcance de la Mano:</strong> Los interruptores principales deben ser accesibles desde la posición de tumbado, evitando que el usuario deba incorporarse a ciegas para encender la luz.</li>
                  <li><strong>Sistemas Automatizados:</strong> La instalación de sensores de movimiento que activen una luz tenue de cortesía es altamente eficaz. Esta luz debe ser indirecta y de tono cálido para no deslumbrar ni alterar el ciclo del sueño, pero lo suficientemente clara para identificar obstáculos.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🦾</span> 3. Productos de Apoyo para la Movilidad en Cama</h5>
                <p>Las transferencias no solo ocurren de la cama al suelo, sino también dentro del propio colchón (giros y cambios posturales).</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Asideros de Incorporación:</strong> A diferencia de las barandillas completas (que pueden ser restrictivas), los asideros o barandillas de transferencia cortos proporcionan un punto de palanca firme y seguro. Estos dispositivos fomentan la independencia al permitir que el usuario use la fuerza de sus miembros superiores para pivotar o impulsarse hacia la bipedestación.</li>
                  <li><strong>Fijación Estructural:</strong> Es vital que estos productos cuenten con sistemas de anclaje de seguridad bajo el colchón o cinchas de sujeción al somier para evitar desplazamientos accidentales durante el uso.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🚶</span> 4. Organización del Entorno y Despeje de Vías</h5>
                <p>Un dormitorio seguro es un dormitorio libre de obstáculos. La planificación del espacio es tan importante como el mobiliario.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Rutas de Paso:</strong> Se debe garantizar un pasillo despejado de al menos 80-90 cm alrededor de la cama para permitir el uso de andadores o sillas de ruedas si fuera necesario.</li>
                  <li><strong>Calzado Adecuado:</strong> El uso de calzado con sujeción posterior (no chanclas) y suela antideslizante es indispensable para asegurar el agarre en el momento de tomar contacto con el suelo.</li>
                </ul>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💡</span>
                  <h5 className="font-bold text-emerald-800 uppercase tracking-wide text-base">El Consejo del Terapeuta Ocupacional</h5>
                </div>
                <p className="text-emerald-900 italic text-base leading-relaxed">
                  "El mayor enemigo de la seguridad en el dormitorio son las alfombras decorativas; el riesgo de tropiezo o deslizamiento es extremadamente alto, por lo que recomendamos retirarlas por completo de las zonas de paso. Para optimizar la seguridad, instala una tira de luz LED con sensor de movimiento bajo la estructura de la cama. Al detectar que el usuario baja los pies, iluminará suavemente el suelo y las zapatillas, guiando el camino hacia el baño sin necesidad de buscar interruptores y evitando deslumbramientos que puedan causar desorientación."
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
        <GuiaDormitorio />
      </main>
      <Footer currentPage="guides" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
