const { Icons, Navbar, Footer, CookieBanner, AdSenseBlock, getAmazonLink, PRODUCT_CATALOG } = window;

const { useState, useEffect, useCallback, useRef, useMemo } = React;

const ArticleBlock = function ArticleBlock({ article, getAmazonLink, onCategoryChange }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <div className="flex-1">
        <div className="mb-8 rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative group cursor-pointer" onClick={() => setIsExpanded(true)}>
          <img src={article.image} alt={article.title} className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700" />
          {!isExpanded && (
            <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold shadow-lg text-sm">Ver detalles</span>
            </div>
          )}
        </div>
        <h4 className="text-2xl font-bold text-brand-900 mb-5">{article.title}</h4>

        <div className="text-lg">
          {article.renderText(isExpanded, onCategoryChange)}
        </div>

        {article.hasMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-6 font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 px-5 py-2.5 rounded-full text-sm shadow-sm focus:outline-none"
          >
            {isExpanded ? 'Mostrar menos' : 'Leer artículo completo'}
            <svg className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
        )}
      </div>

      <div className="lg:w-1/3 bg-gray-50 rounded-2xl p-6 border border-brand-100 shadow-sm self-start sticky top-24">
        <h5 className="font-bold text-brand-800 uppercase tracking-wide text-sm mb-4 flex items-center gap-2">
          <Icons.Check /> Material recomendado
        </h5>
        <ul className="space-y-4">
          {article.materials.map((mat, i) => (
            <li key={i} className="group/card bg-white rounded-xl border border-gray-200 shadow-sm hover:border-brand-300 hover:shadow-md transition-all overflow-hidden cursor-pointer animate-fade-in">
              <a
                href={getAmazonLink(mat.query, mat.link)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 p-4 items-start w-full h-full outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                {mat.image && (
                  <img src={mat.image} alt={mat.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-gray-100 shrink-0 shadow-sm group-hover/card:border-brand-200 transition-colors" />
                )}
                <div className="flex flex-col gap-1.5 flex-1">
                  <span className="font-semibold text-gray-900 text-sm sm:text-base leading-tight group-hover/card:text-brand-700 transition-colors">{mat.name}</span>
                  {mat.desc && <p className="text-xs sm:text-sm text-gray-500 leading-snug">{mat.desc}</p>}

                  <div className="inline-flex items-center gap-2 text-[#FF9900] group-hover/card:text-[#ffaa22] font-bold text-sm sm:text-base mt-1 transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 group-hover/card:scale-110 transition-transform"><path d="M11.996 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12 12 12 0 0 0-12-12zm-3.078 18.066c-2.484 0-4.636-1.077-6.22-2.793.18-.12.443-.095.682.023 1.58 1.484 3.655 2.375 5.86 2.375 2.155 0 4.19-.884 5.753-2.316.204-.155.515-.155.707.012-1.615 1.74-3.838 2.7-6.782 2.7zm8.172-3.155c-.204.36-.635.48-1.043.25-.407-.228-.622-.683-.49-1.114.6-2.095-.084-4.526-1.796-6.19-2.06-2.012-5.46-2.348-8.29-.683-.406.24-.91.07-1.125-.335-.216-.407-.06-.922.347-1.162 3.424-2.012 7.555-1.593 10.057.85 2.107 2.06 2.873 5.09 2.34 7.384z" /></svg>
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
  );
};

const SectionGuides = function SectionGuides() {
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    // Si hay parámetros de categoría en la URL, los abrimos al cargar
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    if (cat) {
      setOpenCategory(cat);
    }
  }, []);

  const categories = [
    {
      id: 'banyo',
      title: 'Baño',
      icon: '🚿',
      color: 'bg-cyan-100 text-cyan-700',
      articles: [
        {
          title: 'Adaptación integral del cuarto de baño',
          image: 'assets/banyo_adaptado.png',
          hasMore: true,
          renderText: (isExpanded, onCategoryChange) => (
            <div className="space-y-4 text-gray-700">
              <p>
                El cuarto de baño es, estadísticamente, la estancia del hogar con mayor índice de caídas y accidentes domésticos. Sin embargo, más allá de la seguridad física, es el espacio donde la preservación de la intimidad y la autonomía personal cobran su valor más alto. Desde la perspectiva de la Terapia Ocupacional, entendemos que una adaptación exitosa no siempre requiere obras de gran envergadura; la clave reside en el diseño centrado en el usuario y en el análisis minucioso de la secuencia de movimientos durante el aseo personal.
              </p>

              {!isExpanded ? (
                <p className="text-gray-500 italic mt-4">A continuación, detallamos los pilares fundamentales para transformar el baño en un entorno facilitador...</p>
              ) : (
                <div className="space-y-8 mt-6 anim-fade-in border-t border-gray-100 pt-6">
                  <p>A continuación, detallamos los pilares fundamentales para transformar el baño en un entorno facilitador:</p>

                  <div className="space-y-3">
                    <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🚿</span> 1. Eliminación de Barreras: Del Plato de Ducha a la Adaptación sin Obras</h5>
                    <p>Sustituir la bañera por un plato de ducha extraplano es la intervención más eficaz para eliminar el obstáculo arquitectónico más limitante del hogar. Sin embargo, cuando la reforma estructural no es viable por motivos económicos o de vivienda, existen soluciones técnicas de alta eficacia.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Acceso Universal y Seguridad:</strong> Al instalar un plato a ras de suelo, se eliminan los tropiezos y se permite el acceso de ayudas técnicas como sillas de ducha con ruedas. La ausencia de escalones es la clave para una entrada y salida fluida.</li>
                      <li><strong>La Alternativa sin Obras: Tabla de Bañera:</strong> Si la sustitución de la bañera no es posible, la tabla de bañera es el producto de apoyo por excelencia.</li>
                      <li><strong>Funcionalidad:</strong> Se encaja firmemente sobre los bordes de la bañera, permitiendo que el usuario se siente desde fuera y gire las piernas hacia el interior de forma controlada y segura.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🦾</span> 2. Soporte Estructural: Barras de Apoyo Estratégicas</h5>
                    <p>Las barras no son simples asideros; son herramientas biomecánicas que ayudan a distribuir el esfuerzo muscular y compensar déficits de equilibrio.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Distribución Funcional:</strong> Barra Vertical imprescindible en la entrada de la zona de ducha para facilitar el equilibrio durante el traspaso de pesos.</li>
                      <li><strong>Barra Horizontal u Oblicua:</strong> Situada a la altura óptima del usuario para asistir en el paso de sedestación a bipedestación (levantarse y sentarse), ya sea en el inodoro o en el asiento de ducha.</li>
                      <li><strong>Fijación de Seguridad:</strong> Se recomienda siempre el anclaje mediante taladro a la pared estructural. Las barras de ventosa pueden ser útiles para viajes, pero no ofrecen la estabilidad necesaria para un uso domiciliario seguro ante una carga de peso súbita.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🚽</span> 3. Ergonomía y Biomecánica del Inodoro</h5>
                    <p>La altura estándar de un inodoro suele ser insuficiente para personas con movilidad reducida o patologías articulares en miembros inferiores.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>La Regla de los 90 Grados:</strong> Para que la transición de sentado a pie sea eficiente y con el mínimo desgaste articular, la altura del asiento debe permitir que las rodillas y las caderas formen un ángulo recto, con los pies firmemente apoyados.</li>
                      <li><strong>Soluciones Adaptables:</strong> Dependiendo de la necesidad, se puede optar por elevadores de inodoro, inodoros de altura especial o la instalación de modelos suspendidos que permiten regular la altura de montaje.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🚰</span> 4. Grifería y Accesorios de Fácil Alcance</h5>
                    <p>La funcionalidad también reside en los pequeños detalles que facilitan la destreza motora fina.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Mecanismos de Palanca:</strong> Sustituir los grifos de rosca por modelos monomando de palanca larga facilita el control del caudal y la temperatura, especialmente en personas con artritis o debilidad en el agarre.</li>
                      <li><strong>Sistemas Termostáticos:</strong> Estos evitan cambios bruscos de temperatura, previniendo quemaduras accidentales, un factor crítico en personas con sensibilidad térmica alterada.</li>
                    </ul>
                  </div>

                  <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">💡</span>
                      <h5 className="font-bold text-emerald-800 uppercase tracking-wide text-base">El Consejo de la Terapia Ocupacional</h5>
                    </div>
                    <p className="text-emerald-900 italic text-base leading-relaxed">
                      "La seguridad no termina al cerrar el grifo. Es fundamental que la alfombrilla antideslizante exterior sea de base estable y cubra toda la zona de apoyo de los pies al salir de la ducha. Asimismo, en casos de déficit visual o deterioro cognitivo, es vital que las barras de apoyo tengan un contraste cromático fuerte con el azulejo (por ejemplo, barras de color oscuro sobre pared blanca) para facilitar su localización inmediata y segura."
                    </p>
                  </div>
                </div>
              )}
            </div>
          ),
          materials: [
            {
              name: 'Tabla de bañera',
              desc: 'Permite sentarse y girar las piernas hacia el interior de forma segura sin obras.',
              image: 'tabla_banera.png',
              link: 'https://amzn.to/4uLnkU5',
              query: 'tabla bañera ortopedia'
            },
            {
              name: 'Asiento giratorio para bañera',
              desc: 'Permite entrar y salir de la bañera cómodamente sin levantar las piernas.',
              image: 'asiento_banera.png',
              link: 'https://amzn.to/4d3bjlv',
              query: 'asiento giratorio bañera ortopedia'
            },
            {
              name: 'Asiento para ducha',
              desc: 'Banqueta estable con conteras antideslizantes para una higiene segura.',
              image: 'asiento_ducha.png',
              link: 'https://amzn.to/4dfjkUJ',
              query: 'asiento ducha banqueta ortopedia'
            },
            {
              name: 'Elevador de inodoro con reposabrazos',
              desc: 'Aumenta la altura del WC y da soporte firme al levantarse o sentarse.',
              image: 'alza_wc.png',
              link: 'https://amzn.to/42hlsWU',
              query: 'elevador inodoro con reposabrazos'
            },
            {
              name: 'Agarraderas / Barras de apoyo',
              desc: 'Asideros de pared imprescindibles para prevenir caídas en la ducha.',
              image: 'barras_apoyo.png',
              link: 'https://amzn.to/4u4JBw3',
              query: 'asidero barra apoyo baño'
            }
          ]
        }
      ]
    },
    {
      id: 'dormitorio',
      title: 'Dormitorio',
      icon: '🛏️',
      color: 'bg-indigo-100 text-indigo-700',
      articles: [
        {
          title: 'Seguridad en el Dormitorio: Prevención de Caídas y Transferencias Eficientes',
          image: 'assets/dormitorio_adaptado.png',
          hasMore: true,
          renderText: (isExpanded, onCategoryChange) => (
            <div className="space-y-4 text-gray-700">
              <p>
                El dormitorio debe ser un santuario de descanso, pero para personas con movilidad reducida, procesos postquirúrgicos o adultos mayores, puede convertirse en un entorno de riesgo. El tránsito nocturno —especialmente los desplazamientos entre la cama y el baño— es uno de los momentos críticos debido a factores como la hipotensión ortostática (mareos al levantarse), la urgencia miccional o la desorientación al despertar.
              </p>

              {!isExpanded ? (
                <p className="text-gray-500 italic mt-4">A continuación, detallamos la adecuación del mobiliario y la optimización del flujo de movimiento...</p>
              ) : (
                <div className="space-y-8 mt-6 anim-fade-in border-t border-gray-100 pt-6">
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
              )}
            </div>
          ),
          materials: [
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
          ]
        }
      ]
    },
    {
      id: 'cocina',
      title: 'Cocina',
      icon: '🍳',
      color: 'bg-amber-100 text-amber-700',
      articles: [
        {
          title: 'Eficiencia en la Cocina: Organización y Conservación de la Energía',
          image: 'assets/cocina_adaptada.png',
          hasMore: true,
          renderText: (isExpanded, onCategoryChange) => (
            <div className="space-y-4 text-gray-700">
              <p>
                La cocina es uno de los entornos más exigentes desde el punto de vista físico. Requiere periodos prolongados de bipedestación estática (estar de pie sin moverse), desplazamientos frecuentes y la manipulación de cargas, lo que puede derivar en una fatiga muscular prematura o dolor articular.
              </p>
              <p>
                Para una persona con movilidad reducida, procesos inflamatorios como la artritis o condiciones de fatiga crónica, el objetivo no es solo cocinar, sino hacerlo aplicando principios de economía articular para proteger las estructuras del cuerpo y ahorrar energía para el resto del día.
              </p>

              {!isExpanded ? (
                <p className="text-gray-500 italic mt-4">A continuación, detallamos estrategias para la organización y conservación de energía...</p>
              ) : (
                <div className="space-y-8 mt-6 anim-fade-in border-t border-gray-100 pt-6">

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
              )}
            </div>
          ),
          materials: [
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
          ]
        }
      ]
    },
    {
      id: 'movilidad',
      title: 'Movilidad',
      icon: '♿',
      color: 'bg-emerald-100 text-emerald-700',
      articles: [
        {
          title: 'Movilidad y Autonomía: Prescripción de Productos de Apoyo',
          image: 'assets/movilidad_adaptada.png',
          hasMore: true,
          renderText: (isExpanded, onCategoryChange) => (
            <div className="space-y-4 text-gray-700">
              <p>Mantener la movilidad activa, tanto dentro como fuera del hogar, es el factor preventivo número uno frente al declive funcional. Sin embargo, la elección de un dispositivo de asistencia no debe ser una decisión al azar; un producto mal prescrito o mal configurado puede alterar el patrón de marcha, generar vicios posturales y provocar patologías secundarias en hombros, espalda y muñecas.</p>

              {!isExpanded ? (
                <p className="text-gray-500 italic mt-4">A continuación, detallamos los tipos de productos de apoyo y su ajuste biomecánico...</p>
              ) : (
                <div className="space-y-8 mt-6 anim-fade-in border-t border-gray-100 pt-6">
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
                      <li><strong>Sillas Manuales:</strong> Requieren que el usuario tenga fuerza suficiente en los miembros superiores para la autopropulsión o que disponga de un cuidador. Son ligereas, plegables y facilitan el transporte en vehículos.</li>
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
              )}
            </div>
          ),
          materials: [
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
          ]
        }
      ]
    },
    {
      id: 'alimentacion',
      title: 'Alimentación',
      icon: '🍽️',
      color: 'bg-rose-100 text-rose-700',
      articles: [
        {
          title: 'Alimentación Independiente: Ergonomía y Autonomía en la Mesa',
          image: 'cubiertos_adaptados.png',
          hasMore: true,
          renderText: (isExpanded, onCategoryChange) => (
            <div className="space-y-4 text-gray-700">
              <p>
                La alimentación es una de las Actividades de la Vida Diaria (AVD) más complejas y con mayor carga social. No se trata solo de la nutrición, sino de la capacidad de participar de forma digna y autónoma en un acto cotidiano. Limitaciones en la fuerza de prensión, temblores, rangos de movimiento reducidos en el hombro o dificultades en la coordinación ojo-mano pueden convertir la comida en un proceso frustrante y agotador.
              </p>
              <p>
                Desde la Terapia Ocupacional, el objetivo es compensar estos déficits mediante el uso de productos de apoyo y estrategias de economía articular.
              </p>

              {!isExpanded ? (
                <p className="text-gray-500 italic mt-4">A continuación, detallamos las opciones y adaptaciones para optimizar la ergonomía en la mesa...</p>
              ) : (
                <div className="space-y-8 mt-6 anim-fade-in border-t border-gray-100 pt-6">

                  <div className="space-y-3">
                    <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🥄</span> 1. Cubiertos Ergonómicos: Optimizando el Agarre</h5>
                    <p>Cuando existe debilidad muscular o dolor en las pequeñas articulaciones de la mano (como en la artritis), el uso de cubiertos estándar resulta ineficiente.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Engrosadores de Mango:</strong> Aumentar el diámetro del mango reduce la tensión necesaria para cerrar el puño, permitiendo un agarre más relajado y menos doloroso.</li>
                      <li><strong>Cubiertos Angulados y Flexibles:</strong> Ideales para personas con limitación en la flexión del codo o en la supinación de la muñeca (giro de la mano). Permiten llevar el alimento a la boca sin necesidad de realizar movimientos compensatorios bruscos con el cuello o el tronco.</li>
                      <li><strong>Cubiertos con Peso:</strong> Para usuarios con temblores esenciales o parkinsonianos, los cubiertos lastrados ayudan a estabilizar el movimiento mediante la propiocepción, mejorando la precisión en el trayecto plato-boca.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🍽️</span> 2. Vajilla Funcional y Control del Entorno</h5>
                    <p>Un plato adecuado puede marcar la diferencia entre necesitar ayuda o comer de forma independiente.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Rebordes de Plato (Platos de Pared Alta):</strong> Facilitan la carga del alimento en la cuchara o tenedor al ofrecer un tope contra el que empujar, algo fundamental para personas que solo pueden utilizar una mano (hemiparesia).</li>
                      <li><strong>Bases Antideslizantes:</strong> El uso de tapetes de polímero de alta adherencia (tipo Dycem) o platos con ventosa evita que el recipiente se desplace por la mesa, permitiendo que el usuario se centre exclusivamente en la manipulación del cubierto.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">💧</span> 3. Hidratación Segura y Accesible</h5>
                    <p>Beber líquidos requiere una coordinación precisa para evitar atragantamientos o derrames, especialmente si hay problemas de movilidad cervical.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Vasos con Escotadura Nasal:</strong> Permiten beber sin necesidad de inclinar la cabeza hacia atrás, lo cual es crítico en pacientes con riesgo de aspiración o con rigidez en el cuello.</li>
                      <li><strong>Vasos de Doble Asa:</strong> Facilitan un agarre bimanual simétrico, distribuyendo el peso del líquido y compensando la falta de fuerza o el temblor de una sola mano.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🪑</span> 4. Biomecánica de la Postura en la Mesa</h5>
                    <p>La eficacia de cualquier adaptación depende de una base postural sólida. Una mala alineación del tronco dificulta la deglución y el control motor fino.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Posicionamiento:</strong> Los pies deben estar bien apoyados y la pelvis lo más atrás posible en la silla. La mesa debe estar a una altura que permita apoyar los antebrazos cómodamente sin elevar los hombros, facilitando una trayectoria estable hacia la boca.</li>
                    </ul>
                  </div>

                  <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">💡</span>
                      <h5 className="font-bold text-emerald-800 uppercase tracking-wide text-base">El Consejo del Terapeuta Ocupacional</h5>
                    </div>
                    <p className="text-emerald-900 italic text-base leading-relaxed">
                      "Si necesitas una adaptación muy específica que no encuentras en el mercado convencional, no descartes las soluciones de bajo coste mediante impresión 3D. Actualmente, conocemos diseños de código abierto para engrosadores, pinzas de sujeción y soportes de vasos que se pueden fabricar a medida por una fracción del precio de una ortopedia tradicional. Además, un pequeño truco casero: si un plato se resbala y no tienes una base técnica, una bayeta húmeda o una goma elástica ancha alrededor del vaso pueden mejorar drásticamente el agarre y la estabilidad de forma inmediata."
                    </p>
                  </div>
                </div>
              )}
            </div>
          ),
          materials: [
            {
              name: 'Cubiertos ergonómicos engrosados',
              desc: 'Set de cubiertos con mangos gruesos para facilitar el agarre relajado.',
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
              name: 'Vaso con escotadura nasal',
              desc: 'Permite beber sin inclinar el cuello hacia atrás, ideal para disfagia.',
              image: 'vaso_escotadura.png',
              link: 'https://amzn.to/3R1tYXJ',
              query: 'vaso escotadura nasal disfagia'
            }
          ]
        }
      ]
    },
    {
      id: 'sillas-ruedas',
      title: 'Sillas de Ruedas',
      icon: '🦽',
      color: 'bg-purple-100 text-purple-700',
      articles: [
        {
          title: 'Sillas de Ruedas: Guía de Selección y Funcionalidad',
          image: 'assets/silla_activa.png',
          hasMore: true,
          renderText: (isExpanded, onCategoryChange) => (
            <div className="space-y-4 text-gray-700">
              <p>
                La silla de ruedas no debe entenderse como una limitación, sino como una herramienta de libertad y participación social. Una elección adecuada, basada en las capacidades residuales del usuario y las demandas de su entorno, es la diferencia entre el aislamiento y la independencia.
              </p>

              {!isExpanded ? (
                <p className="text-gray-500 italic mt-4">A continuación, detallamos las diferentes tipologías de sillas de ruedas y sus funcionalidades...</p>
              ) : (
                <div className="space-y-8 mt-6 anim-fade-in border-t border-gray-100 pt-6">

                  <div className="space-y-3">
                    <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">⚡</span> 1. Sillas de Ruedas Manuales y Activas</h5>
                    <p>La propulsión manual requiere una evaluación precisa de la fuerza en miembros superiores y la estabilidad del tronco.</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Sillas Manuales Estándar:</strong> Diseñadas para un uso ocasional o de transporte. Suelen ser más pesadas y menos ajustables, enfocadas en la durabilidad y la facilidad de plegado para acompañantes.</li>
                      <li><strong>Sillas Activas (Ultraligeras):</strong> Son la extensión del cuerpo del usuario independiente. Fabricadas en materiales como aluminio aeronáutico, titanio o carbono, permiten ajustar el centro de gravedad. Su diseño (de chasis rígido o plegable) busca la máxima eficiencia en cada pedalada, minimizando el esfuerzo y protegiendo la articulación del hombro a largo plazo.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🔋</span> 2. Sillas Eléctricas: Potencia y Portabilidad</h5>
                    <p>La motorización está indicada cuando la propulsión manual no es funcional por fatiga, dolor o falta de fuerza.</p>
                    <div className="my-4 rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white">
                      <img src="assets/silla_electrica.png" alt="Silla eléctrica ligera plegable en entorno urbano" className="w-full h-auto object-cover max-h-96 hover:scale-105 transition-transform duration-700" />
                    </div>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Sillas Eléctricas Ligeras (Plegables):</strong> Equipadas habitualmente con baterias de litio, están diseñadas para la vida urbana y los viajes. Son fáciles de transportar en el maletero de un coche y ofrecen una gran maniobrabilidad en espacios reducidos, sacrificando algo de amortiguación por ligereza.</li>
                      <li><strong>Sillas Eléctricas Fijas (Robustas):</strong> Priorizan la estabilidad y la autonomía en exteriores. Suelen tener baterías de mayor capacidad, sistemas de suspensión avanzados y ruedas de mayor diámetro para sortear obstáculos y terrenos irregulares con seguridad.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">⚙️</span> 3. Sistemas de Basculación y Multifunción</h5>
                    <p>En casos donde el usuario permanece sentado durante largos periodos y no puede realizar cambios posturales de forma autónoma, la tecnología de posicionamiento es crítica para la salud.</p>
                    <div className="my-4 rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white">
                      <img src="assets/silla_basculante.png" alt="Silla de ruedas eléctrica con sistema de basculación" className="w-full h-auto object-cover max-h-96 hover:scale-105 transition-transform duration-700" />
                    </div>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Sillas Basculantes (Manuales):</strong> Permiten inclinar todo el conjunto de asiento y respaldo sin cambiar el ángulo de las articulaciones del usuario. Esto es vital para la redistribución de presiones y la prevención de úlceras por presión (escaras).</li>
                      <li><strong>Sillas Eléctricas Basculantes y Multifunción:</strong> Representan el máximo nivel de tecnología asistencial. Permiten al usuario controlar electrónicamente la basculación, la reclinación del respaldo y la elevación de los reposapiés.</li>
                    </ul>
                  </div>

                  <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">💡</span>
                      <h5 className="font-bold text-emerald-800 uppercase tracking-wide text-base">El Consejo del Terapeuta Ocupacional</h5>
                    </div>
                    <p className="text-emerald-900 italic text-base leading-relaxed">
                      "La silla de ruedas no es un mueble, es una prótesis de movilidad. Un error crítico es no prestar atención al cojín antiescaras; de nada sirve la mejor silla eléctrica del mercado si la superficie de apoyo no gestiona correctamente las presiones. Asimismo, recuerda que una silla eléctrica multifunción no es solo comodidad: la capacidad de elevar las piernas por encima del nivel del corazón o cambiar el ángulo de apoyo es una intervención médica constante que previene complicaciones graves y mejora el confort diario."
                    </p>
                  </div>
                </div>
              )}
            </div>
          ),
          materials: []
        }
      ]
    }
  ];

  return (
    <section id="guides" className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-brand-100 text-brand-700 rounded-full px-5 py-2 text-base font-bold uppercase tracking-widest mb-4">Consejos Profesionales</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-900 mb-4">Adaptación por Áreas</h2>
          <div className="section-divider w-24 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre guías detalladas desde la perspectiva de la Terapia Ocupacional para hacer de tu hogar un entorno seguro, funcional y promotor de la autonomía.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {categories.map((cat) => {
            const isOpen = openCategory === cat.id;
            const catImage = cat.articles[0]?.image;

            return (
              <div key={cat.id} className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden transition-all duration-300 mb-6">
                <div
                  className={`p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors ${isOpen ? 'border-b border-gray-100 ' + cat.color + ' bg-opacity-20 hover:bg-opacity-30' : ''}`}
                  onClick={() => setOpenCategory(isOpen ? null : cat.id)}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    {catImage && <img src={catImage} alt={cat.title} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl shadow-sm" />}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="text-3xl sm:text-4xl">{cat.icon}</span>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">{cat.title}</h3>
                    </div>
                  </div>
                  <div className="text-gray-400 mr-2 sm:mr-4 shrink-0">
                    <svg className={`w-8 h-8 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-600' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>

                {isOpen && (
                  <div className="p-8 anim-fade-in">
                    {cat.articles.map((article, idx) => (
                      <ArticleBlock key={idx} article={article} getAmazonLink={getAmazonLink} onCategoryChange={setOpenCategory} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bloque de anuncios - Final de sección */}
        <div className="mt-16 overflow-hidden rounded-xl bg-gray-50/50 min-h-[100px] flex flex-col items-center justify-center">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Publicidad</span>
          <AdSenseBlock slot="9272607554" />
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
        <SectionGuides />
      </main>
      <Footer currentPage="guides" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
