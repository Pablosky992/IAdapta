const { Icons, Navbar, Footer, CookieBanner, getAmazonLink } = window;
const { useState } = React;

const GuiaCaidas = function GuiaCaidas() {
  const materials = [
    {
      name: 'Luces LED Nocturnas con Sensor de Movimiento',
      desc: 'Iluminan automáticamente los pasillos y el camino al baño durante la noche sin necesidad de buscar interruptores a oscuras.',
      image: 'assets/luces_sensor.png',
      link: 'https://amzn.to/4f2x4nP',
      query: 'luces led sensor movimiento enchufe'
    },
    {
      name: 'Cinta Adhesiva Antideslizante para Alfombras',
      desc: 'Fija firmemente las alfombras al suelo de madera, baldosa o linóleo, evitando que las esquinas se levanten y provoquen tropiezos.',
      image: 'assets/cinta_alfombras.jpg',
      link: 'https://amzn.to/4aRELuy',
      query: 'cinta adhesiva doble cara alfombras antideslizante'
    },
    {
      name: 'Barra de Apoyo Antideslizante para Baño',
      desc: 'Asidero de seguridad con textura rugosa que proporciona un punto de apoyo firme al entrar o salir de la ducha.',
      image: 'assets/barra_apoyo.png',
      link: 'https://amzn.to/4fopvaa',
      query: 'barra de apoyo seguridad ducha acero inoxidable'
    },
    {
      name: 'Trapecio Incorporador para Cama',
      desc: 'Estructura de pie autónoma con asa ajustable suspendida que permite al usuario levantarse y posicionarse de forma segura en la cama.',
      image: 'assets/trapecio_cama.png',
      link: 'https://amzn.to/4gE7KWw',
      query: 'trapecio incorporador cama'
    }
  ];

  return (
    <section className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
        <img src="assets/guia_caidas.png" alt="Prevención de caídas en el hogar: Guía de Terapia Ocupacional" className="w-full h-64 sm:h-96 object-cover" />
        
        <div className="p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg">
          <div>
            <a href="guias.html" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors mb-6 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Volver a Guías
            </a>
            
            <h1 className="font-display text-4xl font-bold text-brand-900 mb-8">Prevención de Caídas en el Hogar: Guía Definitiva para un Entorno Seguro</h1>
            
            <p className="mb-4">
              Las caídas en el hogar representan uno de los mayores riesgos para la salud, la independencia y la calidad de vida de las personas mayores o con movilidad reducida. Una simple caída puede desencadenar consecuencias físicas graves, como fracturas de cadera, traumatismos craneoencefálicos o el temido <strong>síndrome poscaída</strong> (el miedo intenso a volver a caerse, que lleva a la persona a autolimitar su actividad física, provocando un rápido deterioro de la fuerza y el equilibrio). La mayoría de los accidentes domésticos no ocurren por azar, sino por una combinación de factores de riesgo intrínsecos (pérdida de equilibrio, problemas visuales o debilidad muscular) y extrínsecos (obstáculos en el entorno).
            </p>
            <p className="mb-6">
              Desde la disciplina de la <strong>Terapia Ocupacional</strong>, analizamos el hogar como un escenario dinámico donde interactúan la persona y sus actividades cotidianas. Adaptar la vivienda para eliminar barreras y añadir apoyos específicos no es sinónimo de perder autonomía; al contrario, es la herramienta más eficaz para preservarla y garantizar que el hogar siga siendo un refugio seguro. En esta guía detallamos las principales estrategias de adaptación área por área.
            </p>

            <div className="space-y-8 mt-6 border-t border-gray-100 pt-6">
              
              {/* Sección 1 */}
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">💡</span> 1. Iluminación y Visibilidad: El Camino Seguro en la Oscuridad</h5>
                <p>
                  El déficit de iluminación es el desencadenante de un porcentaje muy elevado de caídas nocturnas, especialmente cuando las personas se levantan con urgencia para ir al baño a oscuras.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Luces de Noche Automáticas:</strong> Instalar luces LED con sensor de movimiento en los enchufes del pasillo, dormitorio y baño. Estas luces se encienden solas cuando detectan el movimiento del usuario al levantarse de la cama, guiándolo de forma segura sin tener que buscar los interruptores de la pared en la oscuridad.</li>
                  <li><strong>Interruptores Accesibles y Luminosos:</strong> Colocar interruptores con pilotos de luz LED que los hagan visibles en la penumbra. Además, el interruptor principal del dormitorio debe estar al alcance directo de la mano desde la cama para no levantarse nunca a oscuras.</li>
                  <li><strong>Evitar Deslumbramientos:</strong> Utilizar bombillas de luz cálida e indirecta para evitar destellos que puedan causar desorientación momentánea en personas con cataratas o degeneración macular.</li>
                </ul>
              </div>

              {/* Sección 2 */}
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🧹</span> 2. Suelos Libres de Obstáculos y Tropiezos</h5>
                <p>
                  El suelo debe ser una superficie homogénea y predecible. Cualquier cambio brusco de nivel o elemento suelto se convierte en una trampa potencial para los pies:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>El Peligro de las Alfombras:</strong> Las alfombras son la causa número uno de tropiezos. Lo ideal es retirarlas del hogar. Si se decide conservarlas, es obligatorio fijarlas firmemente al suelo con cinta de doble cara de alta resistencia y asegurarse de que los bordes no estén deshilachados o levantados.</li>
                  <li><strong>Zonas de Paso Despejadas:</strong> Retirar del camino habitual muebles pequeños, revisteros, macetas o cables eléctricos sueltos. Los cables deben canalizarse mediante canaletas de plástico fijadas a las paredes o rodapiés.</li>
                  <li><strong>Suelos Antideslizantes:</strong> Evitar el encerado o pulido excesivo de los suelos de parqué o mármol. En zonas húmedas (baño, cocina o accesos exteriores), aplicar tratamientos antideslizantes líquidos para baldosas.</li>
                </ul>
              </div>

              {/* Sección 3 */}
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🚿</span> 3. El Cuarto de Baño: La Zona de Mayor Riesgo del Hogar</h5>
                <p>
                  El cuarto de baño concentra el mayor número de caídas graves debido a la presencia de agua, jabón y superficies resbaladizas. Adaptarlo es prioritario:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Ducha en Lugar de Bañera:</strong> El acceso a la bañera exige un gran equilibrio monopedal (apoyarse en un solo pie) para salvar la altura del borde, algo sumamente peligroso. Un plato de ducha a ras de suelo elimina esta barrera arquitectónica por completo.</li>
                  <li><strong>Barras de Apoyo Murales:</strong> Instalar barras de seguridad de acero inoxidable o materiales plásticos rugosos atornilladas firmemente a la pared de la ducha y al lado del inodoro. Nunca se deben utilizar toalleros o jaboneras como puntos de agarre, ya que no están diseñados para soportar el peso corporal.</li>
                  <li><strong>Alfombrillas y Adhesivos Antideslizantes:</strong> Colocar bandas antideslizantes rugosas en el fondo del plato de ducha y alfombras con ventosas de alta succión fuera del mismo para secarse de forma segura.</li>
                </ul>
              </div>

              {/* Sección 4 */}
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🛏️</span> 4. Seguridad en el Dormitorio y Transferencias</h5>
                <p>
                  El paso de la cama a la posición de pie (bipedestación) requiere estabilidad, especialmente al despertar, cuando la presión arterial puede bajar bruscamente al incorporarse (hipotensión ortostática).
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Incorporador o Asidero de Cama:</strong> Consiste en una barra metálica en forma de L que se ancla bajo el colchón. Proporciona un agarre seguro para que la persona pueda voltearse en la cama, sentarse en el borde e impulsarse para ponerse de pie con total estabilidad.</li>
                  <li><strong>Altura Correcta de la Cama:</strong> La cama debe estar a una altura que permita al usuario sentarse en el borde apoyando completamente las plantas de los pies en el suelo, manteniendo las rodillas en un ángulo de aproximadamente 90 grados. Si es demasiado baja o alta, el esfuerzo para levantarse puede provocar pérdidas de equilibrio.</li>
                  <li><strong>Calzado Adecuado en el Despertar:</strong> Evitar levantarse descalzo o en calcetines normales. Usar calzado cerrado, sujeto al talón (evitar chanclas o pantuflas abiertas) y con suelas de goma antideslizante. Si se prefiere andar sin zapatos, utilizar calcetines con suela de silicona rugosa (antideslizantes).</li>
                </ul>
              </div>

              {/* Sección 5 */}
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">👣</span> 5. Escaleras y Accesos Exteriores Seguros</h5>
                <p>
                  Las escaleras son zonas críticas donde cualquier error de cálculo visual o tropiezo menor puede derivar en consecuencias catastróficas.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Doble Pasamanos:</strong> Instalar pasamanos a ambos lados de la escalera, extendiéndose unos 30 cm más allá del primer y último escalón. Esto proporciona un apoyo continuo durante todo el trayecto.</li>
                  <li><strong>Señalización Visual de los Escalones:</strong> Colocar tiras antideslizantes con contraste de color (o fotoluminiscentes) en el borde de cada peldaño para facilitar que las personas identifiquen claramente el relieve de los escalones, previniendo fallos de cálculo de profundidad.</li>
                </ul>
              </div>

              {/* Caja de consejos */}
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💡</span>
                  <h5 className="font-bold text-emerald-800 uppercase tracking-wide text-base">El Consejo del Terapeuta Ocupacional</h5>
                </div>
                <p className="text-emerald-900 italic text-base leading-relaxed">
                  "No subestimes el peligro de levantarte rápidamente de la cama o del sofá. Al cambiar bruscamente de posición, el cuerpo tarda unos segundos en regular la presión arterial. Acostúmbrate a seguir la regla de los tres pasos: 1) Siéntate lentamente en el borde de la cama, 2) Espera unos 10-15 segundos respirando con tranquilidad y apoyando bien los pies en el suelo, y 3) Levántate apoyándote firmemente en un asidero o en tus muslos. Esta simple pausa evita los mareos repentinos que causan la mayoría de caídas al despertar."
                </p>
              </div>
            </div>

            {/* Material Recomendado */}
            <div className="mt-12 bg-gray-50 rounded-2xl p-6 sm:p-8 border border-brand-100 shadow-sm">
              <h3 className="font-bold text-brand-800 uppercase tracking-wide text-lg mb-6 flex items-center gap-2">
                <Icons.Check /> Material recomendado para la Prevención de Caídas
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
        <GuiaCaidas />
      </main>
      <Footer currentPage="guides" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
