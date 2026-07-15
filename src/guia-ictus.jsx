const { Icons, Navbar, Footer, CookieBanner, getAmazonLink } = window;
const { useState } = React;

const GuiaIctus = function GuiaIctus() {
  const materials = [
    {
      name: 'Esponja de Baño con Mango Largo',
      desc: 'Facilita el lavado de la espalda y zonas de difícil acceso sin realizar movimientos exigentes de hombro, compensando la movilidad del lado afectado.',
      image: 'assets/esponja_mango_largo.png',
      link: 'https://amzn.to/4wN3I30',
      query: 'esponja mango largo baño'
    },
    {
      name: 'Tabla de Corte para una Mano',
      desc: 'Equipada con clavos de acero inoxidable y ventosas de fijación para sujetar los alimentos mientras se pelan o cortan.',
      image: 'assets/tabla_cortar.png',
      link: 'https://amzn.to/42CtdHf',
      query: 'tabla de corte para una mano'
    },
    {
      name: 'Pone-calcetines y Medias',
      desc: 'Dispositivo plástico flexible con cuerdas que facilita ponerse calcetines o medias sin necesidad de usar ambas manos ni agacharse.',
      image: 'assets/pone_calcetines.png',
      link: 'https://amzn.to/3QCeZDT',
      query: 'pone calcetines medias'
    },
    {
      name: 'Abotonador con Mango Grueso',
      desc: 'Herramienta metálica con mango ergonómico antideslizante que facilita pasar los botones por los ojales usando una única mano.',
      image: 'assets/abotonador.png',
      link: 'https://amzn.to/4eXYry7',
      query: 'abotonador mango grueso'
    }
  ];

  return (
    <section className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
        <img src="assets/guia_ictus.png" alt="Terapia Ocupacional e Ictus: Guía de adaptación" className="w-full h-64 sm:h-96 object-cover" />
        
        <div className="p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg">
          <div>
            <a href="guias.html" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors mb-6 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Volver a Guías
            </a>
            
            <h1 className="font-display text-4xl font-bold text-brand-900 mb-8">Terapia Ocupacional tras un Ictus: Guía Práctica para la Autonomía y Adaptación del Hogar</h1>
            
            <p className="mb-4">
              El accidente cerebrovascular (ACV), conocido comúnmente como <strong>Ictus</strong>, es una de las principales causas de discapacidad física y cognitiva en adultos a nivel mundial. La interrupción del flujo sanguíneo cerebral (ya sea por un trombo en el ictus isquémico o por una ruptura arterial en el ictus hemorrágico) provoca la muerte de neuronas en áreas específicas. Esto suele traducirse clínicamente en una hemiparesia o hemiplejia (pérdida de fuerza o parálisis de la mitad del cuerpo contraria al hemisferio cerebral dañado), alteraciones sensitivas, problemas de equilibrio, dificultades en la comunicación (afasia) o de atención (hemi-negligencia).
            </p>
            <p className="mb-6">
              Ante este panorama, la <strong>Terapia Ocupacional</strong> juega un papel determinante en el proceso de neurorrehabilitación. A través de la adaptación del entorno, la reeducación funcional y el uso de productos de apoyo específicos, el terapeuta ocupacional busca capacitar al paciente para que vuelva a realizar sus actividades de la vida diaria (AVD) de manera autónoma. A continuación, presentamos una guía detallada con estrategias y soluciones de adaptación para facilitar el día a día tras sufrir un Ictus.
            </p>

            <div className="space-y-8 mt-6 border-t border-gray-100 pt-6">
              
              {/* Sección 1 */}
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🍽️</span> 1. Alimentación Adaptada para Hemiparesia</h5>
                <p>
                  Comer de forma independiente es una de las primeras metas en el proceso de rehabilitación. Cuando un brazo queda paralizado o débil, tareas bilaterales como cortar carne o untar pan se vuelven imposibles de realizar con cubiertos estándar. Las siguientes adaptaciones compensan la falta de funcionalidad de una de las extremidades:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Cuchillo Nelson y Cubiertos Basculantes:</strong> El cuchillo Nelson es un producto de apoyo clásico. Integra en una sola pieza un tenedor y un cuchillo con filo oscilante. Permite cortar el alimento balanceando el cubierto y, a continuación, pincharlo para llevarlo a la boca sin soltar el utensilio.</li>
                  <li><strong>Platos con Reborde Alto:</strong> Los platos adaptados con un borde vertical pronunciado en uno de sus lados facilitan que el usuario empuje la comida contra la pared del plato para cargar la cuchara o tenedor utilizando únicamente su mano sana.</li>
                  <li><strong>Soportes y Tapetes Antideslizantes:</strong> Colocar un tapete de silicona bajo el plato evita que este se mueva durante la manipulación. También existen sujeta-vasos de silicona con ventosas que fijan el recipiente a la mesa para prevenir derrames accidentales al intentar cogerlo.</li>
                </ul>
              </div>

              {/* Sección 2 */}
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">👕</span> 2. Técnicas de Vestido a una Mano (Hemi-vestido)</h5>
                <p>
                  El vestido es una actividad altamente compleja que requiere coordinación bilateral y equilibrio. El terapeuta ocupacional entrena al paciente en la técnica de hemi-vestido, una estrategia de movimiento paso a paso:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Secuencia de Vestido:</strong> Para ponerse camisas, chaquetas o jerseys, el paciente debe sentarse en una superficie estable. Se debe introducir siempre <strong>primero la manga del brazo afectado</strong>, llevar la prenda por la espalda con el brazo sano y, finalmente, meter la manga del lado sano. Para desvestirse, el proceso es inverso: se retira <strong>primero el lado sano</strong> y finalmente el afectado.</li>
                  <li><strong>Abotonadores de una Mano:</strong> Pasar un botón por su ojal con una sola mano es extremadamente difícil. El abotonador cuenta con un lazo de alambre en el extremo de un mango engrosado; se pasa el alambre por el ojal, se sujeta el botón y se tira de él hacia atrás para abrocharlo fácilmente.</li>
                  <li><strong>Ayudas para el Calzado y Medias:</strong> El "pone-calcetines" consiste en una cuna plástica donde se monta el calcetín; el paciente introduce el pie y tira de las cintas para deslizarlo. Los cordones elásticos y calzadores de mango largo eliminan la necesidad de agacharse y atar lazos, tareas de gran riesgo para el equilibrio.</li>
                </ul>
              </div>

              {/* Sección 3 */}
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🚿</span> 3. Seguridad en la Higiene y Aseo Personal</h5>
                <p>
                  El cuarto de baño suele ser el entorno que mayor ansiedad genera debido al riesgo de resbalones y la exigencia física del aseo. Adaptar esta estancia previene caídas y fomenta la intimidad del usuario.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Ducha Adaptada y Asientos:</strong> Se debe evitar la bañera. Un plato de ducha a ras de suelo con una silla de ducha con reposabrazos y respaldo proporciona la estabilidad necesaria. El paciente puede lavarse sentado de forma segura, reduciendo el riesgo de caídas derivado de la hemiparesia.</li>
                  <li><strong>Barras de Apoyo y Asideros:</strong> Es crucial colocar barras de seguridad de superficie rugosa al lado del inodoro y dentro de la ducha. Deben estar atornilladas firmemente a la pared para resistir el peso del paciente durante las transferencias.</li>
                  <li><strong>Esponjas y Cepillos de Mango Largo:</strong> Permiten alcanzar la espalda o los pies sin necesidad de realizar flexiones extremas de tronco, compensando la limitación de movilidad de la extremidad afectada.</li>
                </ul>
              </div>

              {/* Sección 4 */}
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🛋️</span> 4. Posicionamiento, Movilidad y Prevención del Hombro Doloroso</h5>
                <p>
                  Tras un ictus, el brazo afectado suele pasar por una fase flácida inicial y, posteriormente, una fase espástica (rigidez extrema). Es vital cuidar la postura tanto en la cama como en el sofá para evitar contracturas y la temida subluxación de hombro (desplazamiento de la articulación por falta de tono muscular).
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Posicionamiento en la Cama:</strong> Al estar tumbado de lado sobre el lado sano, el brazo afectado debe descansar apoyado sobre una almohada frente al cuerpo, manteniendo el codo estirado y la mano abierta. Esto evita que el brazo cuelgue y tire de la articulación del hombro, previniendo dolores crónicos.</li>
                  <li><strong>Cojines de Posicionamiento en Silla de Ruedas:</strong> En sedestación, el brazo afectado nunca debe quedar colgando al lado de la silla. Se debe utilizar un soporte de reposabrazos especial (soportes de hemicuerpo) o colocar una almohada sobre el regazo para apoyar el brazo en una posición neutra y visible.</li>
                  <li><strong>Transferencias Seguras:</strong> Para pasar de la cama a la silla, se debe realizar la transferencia preferentemente <strong>hacia el lado sano</strong> en las fases iniciales, facilitando que el paciente use su fuerza residual para pivotar. El uso de un cinturón de transferencia ayuda al cuidador a guiar el movimiento de forma ergonómica.</li>
                </ul>
              </div>

              {/* Sección 5 */}
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🍳</span> 5. Cocina y Tareas del Hogar a una Mano</h5>
                <p>
                  Retomar las tareas del hogar es un excelente ejercicio de rehabilitación cognitiva y motora. La cocina es una actividad compleja que puede adaptarse para realizarse de forma segura con un solo brazo útil:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Tablas de Cortar Adaptadas:</strong> Cuentan con un sistema de clavos metálicos donde se pincha la patata, manzana u verdura para que quede fija, permitiendo al paciente pelarla o cortarla con la mano sana. También incluyen rebordes para sujetar rebanadas de pan y untarlas fácilmente.</li>
                  <li><strong>Abrebotes Monomanuales:</strong> Dispositivos fijados bajo el mueble de la cocina o bases de silicona texturizada que sujetan el tarro por su base, permitiendo al usuario desenroscar la tapa usando una sola mano.</li>
                  <li><strong>Organizadores y Distribución:</strong> Almacenar los utensilios de uso diario en cajones o estantes situados a una altura comprendida entre la cadera y los hombros, evitando tener que agacharse o estirarse en exceso, lo que comprometería el equilibrio.</li>
                </ul>
              </div>

              {/* Caja de consejos */}
              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-2xl shadow-sm mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💡</span>
                  <h5 className="font-bold text-purple-800 uppercase tracking-wide text-base">El Consejo del Terapeuta Ocupacional</h5>
                </div>
                <p className="text-purple-900 italic text-base leading-relaxed">
                  "Presta especial atención a la hemi-negligencia. Tras un ictus en el hemisferio derecho, es muy común que el paciente 'ignore' visual y espacialmente todo lo que está a su izquierda (incluido su propio brazo). Para estimular la plasticidad cerebral, coloca los objetos de interés (como el teléfono o la televisión) en el lado afectado para obligarle a girar la cabeza y buscar estímulos allí. Asimismo, integra el brazo afecto en las tareas diarias como 'ayudante pasivo' (por ejemplo, sujetar el papel mientras escribes con la mano sana). La neuroplasticidad se alimenta del uso y la atención."
                </p>
              </div>
            </div>

            {/* Material Recomendado */}
            <div className="mt-12 bg-gray-50 rounded-2xl p-6 sm:p-8 border border-brand-100 shadow-sm">
              <h3 className="font-bold text-brand-800 uppercase tracking-wide text-lg mb-6 flex items-center gap-2">
                <Icons.Check /> Material recomendado para la rehabilitación del Ictus
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
        <GuiaIctus />
      </main>
      <Footer currentPage="guides" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
