const { Icons, Navbar, Footer, CookieBanner, getAmazonLink } = window;
const { useState } = React;

const GuiaCocina = function GuiaCocina() {
  const materials = [
    {
      name: 'Set de cubiertos adaptados',
      desc: 'Mangos engrosados que facilitan el agarre para personas con artritis o pérdida de fuerza.',
      image: 'cubiertos_adaptados.png',
      link: 'https://amzn.to/4wi1BVq',
      query: 'cubiertos adaptados mango grueso'
    },
    {
      name: 'Cuchillo Nelson',
      desc: 'Permite cortar con una sola mano gracias a su diseño de hoja curva oscilante.',
      image: 'cuchillo_nelson.png',
      link: 'https://amzn.to/3QPzqgd',
      query: 'cuchillo nelson adaptado'
    },
    {
      name: 'Tabla de cortar adaptada',
      desc: 'Con ventosas y clavos de sujeción para fijar los alimentos y manipularlos con seguridad.',
      image: 'tabla_cortar.png',
      link: 'https://amzn.to/42CtdHf',
      query: 'tabla de cortar adaptada una mano'
    }
  ];

  return (
    <section className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
        <img src="assets/cocina_adaptada.png" alt="Cocina Adaptada" className="w-full h-64 sm:h-96 object-cover" />
        
        <div className="p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg">
          <div>
            <a href="guias.html" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors mb-6 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Volver a Guías
            </a>
            <h1 className="font-display text-4xl font-bold text-brand-900 mb-8">Eficiencia en la Cocina: Organización y Conservación de la Energía</h1>
            
            <p>
              La cocina es uno de los entornos más exigentes desde el punto de vista físico. Requiere periodos prolongados de bipedestación estática (estar de pie sin moverse), desplazamientos frecuentes y la manipulación de cargas, lo que puede derivar en una fatiga muscular prematura o dolor articular.
            </p>
            <p>
              Para una persona con movilidad reducida, procesos inflamatorios como la artritis o condiciones de fatiga crónica, el objetivo no es solo cocinar, sino hacerlo aplicando principios de economía articular para proteger las estructuras del cuerpo y ahorrar energía para el resto del día.
            </p>

            <div className="space-y-8 mt-6 border-t border-gray-100 pt-6">
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">📏</span> 1. La "Zona de Alcance Óptimo": Biomecánica del Almacenaje</h5>
                <p>El diseño de la cocina debe adaptarse a la mecánica de nuestro cuerpo. Evitar alcances extremos (muy altos o muy bajos) previene lesiones en el manguito rotador y sobrecargas en la zona lumbar.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Distribución Inteligente:</strong> Almacena el menaje, los pequeños electrodomésticos y los alimentos de uso diario en estantes situados estrictamente entre la altura de la cintura y la de los hombros.</li>
                  <li><strong>Sistemas de Extracción:</strong> En los armarios bajos, prioriza el uso de cajones extraíbles o "cestas telescópicas" en lugar de puertas fijas, eliminando la necesidad de agacharse o arrodillarse para buscar objetos al fondo.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🪑</span> 2. Cocinado en Sedestación Dinámica</h5>
                <p>Reducir el tiempo de permanencia de pie es la intervención más eficaz para conservar energía y disminuir el edema en miembros inferiores.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>El Taburete Tipo 'Percha':</strong> El uso de un taburete de apoyo isquiático (con el asiento ligeramente inclinado) permite trabajar en una posición de semi-sentado. Esto mantiene la columna alineada y reduce drásticamente la carga de peso sobre las rodillas, los tobillos y la zona lumbosacra mientras preparas los alimentos o lavas los platos.</li>
                  <li><strong>Espacio bajo la encimera:</strong> Si es posible, deja un espacio libre bajo una sección de la bancada para que las rodillas entren cómodamente al estar sentado.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🍽️</span> 3. Optimización de Utensilios y Ayudas Técnicas</h5>
                <p>Las herramientas adecuadas compensan la falta de fuerza en el agarre o las limitaciones en la movilidad de las manos.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Engrosadores y Mangos Ergonómicos:</strong> Incorporar fundas de espuma en cubiertos y utensilios reduce el esfuerzo necesario para la pinza manual.</li>
                  <li><strong>Preparación Adaptada:</strong> Utiliza tablas de corte con pinchos para fijar alimentos (ideal para uso con una sola mano), abrebotellas mecánicos de pared y peladores de mango ancho para minimizar el estrés en las pequeñas articulaciones de los dedos.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🛒</span> 4. Gestión de Cargas y Desplazamientos</h5>
                <p>La clave es "deslizar en lugar de levantar". Transportar ollas con agua o platos pesados es una de las actividades con mayor riesgo de lesión.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Continuidad de Superficies:</strong> Mantén las superficies de trabajo conectadas. Si necesitas mover una olla pesada del fregadero a la placa de cocción, deslízala suavemente por la encimera en lugar de cargarla a pulso.</li>
                  <li><strong>Uso de Carritos de Servicio:</strong> Para llevar la comida a la mesa, un carrito con ruedas es un aliado indispensable que evita múltiples viajes y reduce la carga sobre la espalda.</li>
                </ul>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💡</span>
                  <h5 className="font-bold text-emerald-800 uppercase tracking-wide text-base">El Consejo del Terapeuta Ocupacional</h5>
                </div>
                <p className="text-emerald-900 italic text-base leading-relaxed">
                  "Sustituye la vajilla de cerámica pesada o gres por alternativas de vidrio templado ligero (tipo Opal) o polímeros de alta resistencia libres de BPA. Estas opciones mantienen una estética excelente, son aptas para microondas y pesan hasta un 50% menos, reduciendo el esfuerzo en muñecas y hombros. Además, acostúmbrate a deslizar los recipientes por la bancada siempre que sea posible; tu espalda y tus articulaciones te lo agradecerán al final del día."
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
        <GuiaCocina />
      </main>
      <Footer currentPage="guides" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
