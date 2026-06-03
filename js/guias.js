(function() {
const {
  Icons,
  Navbar,
  Footer,
  CookieBanner,
  AdSenseBlock,
  getAmazonLink,
  PRODUCT_CATALOG
} = window;
const {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo
} = React;
const ArticleBlock = function ArticleBlock({
  article,
  getAmazonLink,
  onCategoryChange
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col lg:flex-row gap-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-8 rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative group cursor-pointer",
    onClick: () => setIsExpanded(true)
  }, /*#__PURE__*/React.createElement("img", {
    src: article.image,
    alt: article.title,
    className: "w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
  }), !isExpanded && /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bg-white text-gray-900 px-4 py-2 rounded-full font-bold shadow-lg text-sm"
  }, "Ver detalles"))), /*#__PURE__*/React.createElement("h4", {
    className: "text-2xl font-bold text-brand-900 mb-5"
  }, article.title), /*#__PURE__*/React.createElement("div", {
    className: "text-lg"
  }, article.renderText(isExpanded, onCategoryChange)), article.hasMore && /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsExpanded(!isExpanded),
    className: "mt-6 font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 px-5 py-2.5 rounded-full text-sm shadow-sm focus:outline-none"
  }, isExpanded ? 'Mostrar menos' : 'Leer artículo completo', /*#__PURE__*/React.createElement("svg", {
    className: `w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M19 9l-7 7-7-7"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "lg:w-1/3 bg-gray-50 rounded-2xl p-6 border border-brand-100 shadow-sm self-start sticky top-24"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-800 uppercase tracking-wide text-sm mb-4 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Check, null), " Material recomendado"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-4"
  }, article.materials.map((mat, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "group/card bg-white rounded-xl border border-gray-200 shadow-sm hover:border-brand-300 hover:shadow-md transition-all overflow-hidden cursor-pointer animate-fade-in"
  }, /*#__PURE__*/React.createElement("a", {
    href: getAmazonLink(mat.query, mat.link),
    target: "_blank",
    rel: "noopener noreferrer",
    className: "flex gap-4 p-4 items-start w-full h-full outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
  }, mat.image && /*#__PURE__*/React.createElement("img", {
    src: mat.image,
    alt: mat.name,
    className: "w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-gray-100 shrink-0 shadow-sm group-hover/card:border-brand-200 transition-colors"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-1.5 flex-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-gray-900 text-sm sm:text-base leading-tight group-hover/card:text-brand-700 transition-colors"
  }, mat.name), mat.desc && /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-gray-500 leading-snug"
  }, mat.desc), /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-2 text-[#FF9900] group-hover/card:text-[#ffaa22] font-bold text-sm sm:text-base mt-1 transition-colors"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    className: "w-5 h-5 sm:w-6 sm:h-6 group-hover/card:scale-110 transition-transform"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M11.996 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12 12 12 0 0 0-12-12zm-3.078 18.066c-2.484 0-4.636-1.077-6.22-2.793.18-.12.443-.095.682.023 1.58 1.484 3.655 2.375 5.86 2.375 2.155 0 4.19-.884 5.753-2.316.204-.155.515-.155.707.012-1.615 1.74-3.838 2.7-6.782 2.7zm8.172-3.155c-.204.36-.635.48-1.043.25-.407-.228-.622-.683-.49-1.114.6-2.095-.084-4.526-1.796-6.19-2.06-2.012-5.46-2.348-8.29-.683-.406.24-.91.07-1.125-.335-.216-.407-.06-.922.347-1.162 3.424-2.012 7.555-1.593 10.057.85 2.107 2.06 2.873 5.09 2.34 7.384z"
  })), "Ver en Amazon")))))), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 p-4 bg-white rounded-xl border border-gray-100 text-xs text-gray-500 leading-relaxed shadow-sm"
  }, "Las recomendaciones que ves en esta web han sido seleccionadas bajo criterio profesional de Terapia Ocupacional. Al comprar a trav\xE9s de estos enlaces, ayudas a mantener el proyecto IAdapta sin que a ti te cueste ni un c\xE9ntimo m\xE1s.")));
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
  const categories = [{
    id: 'banyo',
    title: 'Baño',
    icon: '🚿',
    color: 'bg-cyan-100 text-cyan-700',
    articles: [{
      title: 'Adaptación integral del cuarto de baño',
      image: 'assets/banyo_adaptado.png',
      hasMore: true,
      renderText: (isExpanded, onCategoryChange) => /*#__PURE__*/React.createElement("div", {
        className: "space-y-4 text-gray-700"
      }, /*#__PURE__*/React.createElement("p", null, "El cuarto de ba\xF1o es, estad\xEDsticamente, la estancia del hogar con mayor \xEDndice de ca\xEDdas y accidentes dom\xE9sticos. Sin embargo, m\xE1s all\xE1 de la seguridad f\xEDsica, es el espacio donde la preservaci\xF3n de la intimidad y la autonom\xEDa personal cobran su valor m\xE1s alto. Desde la perspectiva de la Terapia Ocupacional, entendemos que una adaptaci\xF3n exitosa no siempre requiere obras de gran envergadura; la clave reside en el dise\xF1o centrado en el usuario y en el an\xE1lisis minucioso de la secuencia de movimientos durante el aseo personal."), !isExpanded ? /*#__PURE__*/React.createElement("p", {
        className: "text-gray-500 italic mt-4"
      }, "A continuaci\xF3n, detallamos los pilares fundamentales para transformar el ba\xF1o en un entorno facilitador...") : /*#__PURE__*/React.createElement("div", {
        className: "space-y-8 mt-6 anim-fade-in border-t border-gray-100 pt-6"
      }, /*#__PURE__*/React.createElement("p", null, "A continuaci\xF3n, detallamos los pilares fundamentales para transformar el ba\xF1o en un entorno facilitador:"), /*#__PURE__*/React.createElement("div", {
        className: "space-y-3"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-brand-900 text-xl flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83D\uDEBF"), " 1. Eliminaci\xF3n de Barreras: Del Plato de Ducha a la Adaptaci\xF3n sin Obras"), /*#__PURE__*/React.createElement("p", null, "Sustituir la ba\xF1era por un plato de ducha extraplano es la intervenci\xF3n m\xE1s eficaz para eliminar el obst\xE1culo arquitect\xF3nico m\xE1s limitante del hogar. Sin embargo, cuando la reforma estructural no es viable por motivos econ\xF3micos o de vivienda, existen soluciones t\xE9cnicas de alta eficacia."), /*#__PURE__*/React.createElement("ul", {
        className: "list-disc pl-5 space-y-2"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Acceso Universal y Seguridad:"), " Al instalar un plato a ras de suelo, se eliminan los tropiezos y se permite el acceso de ayudas t\xE9cnicas como sillas de ducha con ruedas. La ausencia de escalones es la clave para una entrada y salida fluida."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "La Alternativa sin Obras: Tabla de Ba\xF1era:"), " Si la sustituci\xF3n de la ba\xF1era no es posible, la tabla de ba\xF1era es el producto de apoyo por excelencia."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Funcionalidad:"), " Se encaja firmemente sobre los bordes de la ba\xF1era, permitiendo que el usuario se siente desde fuera y gire las piernas hacia el interior de forma controlada y segura."))), /*#__PURE__*/React.createElement("div", {
        className: "space-y-3"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-brand-900 text-xl flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83E\uDDBE"), " 2. Soporte Estructural: Barras de Apoyo Estrat\xE9gicas"), /*#__PURE__*/React.createElement("p", null, "Las barras no son simples asideros; son herramientas biomec\xE1nicas que ayudan a distribuir el esfuerzo muscular y compensar d\xE9ficits de equilibrio."), /*#__PURE__*/React.createElement("ul", {
        className: "list-disc pl-5 space-y-2"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Distribuci\xF3n Funcional:"), " Barra Vertical imprescindible en la entrada de la zona de ducha para facilitar el equilibrio durante el traspaso de pesos."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Barra Horizontal u Oblicua:"), " Situada a la altura \xF3ptima del usuario para asistir en el paso de sedestaci\xF3n a bipedestaci\xF3n (levantarse y sentarse), ya sea en el inodoro o en el asiento de ducha."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Fijaci\xF3n de Seguridad:"), " Se recomienda siempre el anclaje mediante taladro a la pared estructural. Las barras de ventosa pueden ser \xFAtiles para viajes, pero no ofrecen la estabilidad necesaria para un uso domiciliario seguro ante una carga de peso s\xFAbita."))), /*#__PURE__*/React.createElement("div", {
        className: "space-y-3"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-brand-900 text-xl flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83D\uDEBD"), " 3. Ergonom\xEDa y Biomec\xE1nica del Inodoro"), /*#__PURE__*/React.createElement("p", null, "La altura est\xE1ndar de un inodoro suele ser insuficiente para personas con movilidad reducida o patolog\xEDas articulares en miembros inferiores."), /*#__PURE__*/React.createElement("ul", {
        className: "list-disc pl-5 space-y-2"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "La Regla de los 90 Grados:"), " Para que la transici\xF3n de sentado a pie sea eficiente y con el m\xEDnimo desgaste articular, la altura del asiento debe permitir que las rodillas y las caderas formen un \xE1ngulo recto, con los pies firmemente apoyados."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Soluciones Adaptables:"), " Dependiendo de la necesidad, se puede optar por elevadores de inodoro, inodoros de altura especial o la instalaci\xF3n de modelos suspendidos que permiten regular la altura de montaje."))), /*#__PURE__*/React.createElement("div", {
        className: "space-y-3"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-brand-900 text-xl flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83D\uDEB0"), " 4. Grifer\xEDa y Accesorios de F\xE1cil Alcance"), /*#__PURE__*/React.createElement("p", null, "La funcionalidad tambi\xE9n reside en los peque\xF1os detalles que facilitan la destreza motora fina."), /*#__PURE__*/React.createElement("ul", {
        className: "list-disc pl-5 space-y-2"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Mecanismos de Palanca:"), " Sustituir los grifos de rosca por modelos monomando de palanca larga facilita el control del caudal y la temperatura, especialmente en personas con artritis o debilidad en el agarre."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sistemas Termost\xE1ticos:"), " Estos evitan cambios bruscos de temperatura, previniendo quemaduras accidentales, un factor cr\xEDtico en personas con sensibilidad t\xE9rmica alterada."))), /*#__PURE__*/React.createElement("div", {
        className: "bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-2 mb-3"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-emerald-800 uppercase tracking-wide text-base"
      }, "El Consejo de la Terapia Ocupacional")), /*#__PURE__*/React.createElement("p", {
        className: "text-emerald-900 italic text-base leading-relaxed"
      }, "\"La seguridad no termina al cerrar el grifo. Es fundamental que la alfombrilla antideslizante exterior sea de base estable y cubra toda la zona de apoyo de los pies al salir de la ducha. Asimismo, en casos de d\xE9ficit visual o deterioro cognitivo, es vital que las barras de apoyo tengan un contraste crom\xE1tico fuerte con el azulejo (por ejemplo, barras de color oscuro sobre pared blanca) para facilitar su localizaci\xF3n inmediata y segura.\"")))),
      materials: [{
        name: 'Tabla de bañera',
        desc: 'Permite sentarse y girar las piernas hacia el interior de forma segura sin obras.',
        image: 'tabla_banera.png',
        link: 'https://amzn.to/4uLnkU5',
        query: 'tabla bañera ortopedia'
      }, {
        name: 'Asiento giratorio para bañera',
        desc: 'Permite entrar y salir de la bañera cómodamente sin levantar las piernas.',
        image: 'asiento_banera.png',
        link: 'https://amzn.to/4d3bjlv',
        query: 'asiento giratorio bañera ortopedia'
      }, {
        name: 'Asiento para ducha',
        desc: 'Banqueta estable con conteras antideslizantes para una higiene segura.',
        image: 'asiento_ducha.png',
        link: 'https://amzn.to/4dfjkUJ',
        query: 'asiento ducha banqueta ortopedia'
      }, {
        name: 'Elevador de inodoro con reposabrazos',
        desc: 'Aumenta la altura del WC y da soporte firme al levantarse o sentarse.',
        image: 'alza_wc.png',
        link: 'https://amzn.to/42hlsWU',
        query: 'elevador inodoro con reposabrazos'
      }, {
        name: 'Agarraderas / Barras de apoyo',
        desc: 'Asideros de pared imprescindibles para prevenir caídas en la ducha.',
        image: 'barras_apoyo.png',
        link: 'https://amzn.to/4u4JBw3',
        query: 'asidero barra apoyo baño'
      }]
    }]
  }, {
    id: 'dormitorio',
    title: 'Dormitorio',
    icon: '🛏️',
    color: 'bg-indigo-100 text-indigo-700',
    articles: [{
      title: 'Seguridad en el Dormitorio: Prevención de Caídas y Transferencias Eficientes',
      image: 'assets/dormitorio_adaptado.png',
      hasMore: true,
      renderText: (isExpanded, onCategoryChange) => /*#__PURE__*/React.createElement("div", {
        className: "space-y-4 text-gray-700"
      }, /*#__PURE__*/React.createElement("p", null, "El dormitorio debe ser un santuario de descanso, pero para personas con movilidad reducida, procesos postquir\xFArgicos o adultos mayores, puede convertirse en un entorno de riesgo. El tr\xE1nsito nocturno \u2014especialmente los desplazamientos entre la cama y el ba\xF1o\u2014 es uno de los momentos cr\xEDticos debido a factores como la hipotensi\xF3n ortost\xE1tica (mareos al levantarse), la urgencia miccional o la desorientaci\xF3n al despertar."), !isExpanded ? /*#__PURE__*/React.createElement("p", {
        className: "text-gray-500 italic mt-4"
      }, "A continuaci\xF3n, detallamos la adecuaci\xF3n del mobiliario y la optimizaci\xF3n del flujo de movimiento...") : /*#__PURE__*/React.createElement("div", {
        className: "space-y-8 mt-6 anim-fade-in border-t border-gray-100 pt-6"
      }, /*#__PURE__*/React.createElement("p", null, "Para garantizar un entorno seguro, debemos centrarnos en la adecuaci\xF3n del mobiliario y la optimizaci\xF3n del flujo de movimiento:"), /*#__PURE__*/React.createElement("div", {
        className: "space-y-3"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-brand-900 text-xl flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83D\uDECF\uFE0F"), " 1. La Ergonom\xEDa de la Cama: Altura y Biomec\xE1nica"), /*#__PURE__*/React.createElement("p", null, "La altura del lecho es el factor determinante para una transferencia segura y aut\xF3noma. Una cama demasiado baja exige un esfuerzo excesivo de los cu\xE1driceps y las articulaciones de la rodilla, aumentando el riesgo de p\xE9rdida de equilibrio."), /*#__PURE__*/React.createElement("ul", {
        className: "list-disc pl-5 space-y-2"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "La Regla de la Sedestaci\xF3n:"), " La altura ideal debe permitir que, al estar sentado en el borde del colch\xF3n, los pies apoyen totalmente en el suelo mientras las caderas y rodillas mantienen un \xE1ngulo de aproximadamente 90 grados."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Soluciones T\xE9cnicas:"), " Si la cama es baja, el uso de tacos elevadores en las patas es una soluci\xF3n sencilla y estable. En casos de mayor necesidad cl\xEDnica, las camas articuladas con carro elevador permiten regular la altura para facilitar tanto la entrada/salida como la asistencia del cuidador."))), /*#__PURE__*/React.createElement("div", {
        className: "space-y-3"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-brand-900 text-xl flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83D\uDCA1"), " 2. Iluminaci\xF3n Inteligente y Accesibilidad"), /*#__PURE__*/React.createElement("p", null, "La falta de visibilidad es la causa directa de la mayor\xEDa de los tropiezos nocturnos. El objetivo es eliminar la \"ceguera moment\xE1nea\" al despertar."), /*#__PURE__*/React.createElement("ul", {
        className: "list-disc pl-5 space-y-2"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Control al Alcance de la Mano:"), " Los interruptores principales deben ser accesibles desde la posici\xF3n de tumbado, evitando que el usuario deba incorporarse a ciegas para encender la luz."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sistemas Automatizados:"), " La instalaci\xF3n de sensores de movimiento que activen una luz tenue de cortes\xEDa es altamente eficaz. Esta luz debe ser indirecta y de tono c\xE1lido para no deslumbrar ni alterar el ciclo del sue\xF1o, pero lo suficientemente clara para identificar obst\xE1culos."))), /*#__PURE__*/React.createElement("div", {
        className: "space-y-3"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-brand-900 text-xl flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83E\uDDBE"), " 3. Productos de Apoyo para la Movilidad en Cama"), /*#__PURE__*/React.createElement("p", null, "Las transferencias no solo ocurren de la cama al suelo, sino tambi\xE9n dentro del propio colch\xF3n (giros y cambios posturales)."), /*#__PURE__*/React.createElement("ul", {
        className: "list-disc pl-5 space-y-2"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Asideros de Incorporaci\xF3n:"), " A diferencia de las barandillas completas (que pueden ser restrictivas), los asideros o barandillas de transferencia cortos proporcionan un punto de palanca firme y seguro. Estos dispositivos fomentan la independencia al permitir que el usuario use la fuerza de sus miembros superiores para pivotar o impulsarse hacia la bipedestaci\xF3n."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Fijaci\xF3n Estructural:"), " Es vital que estos productos cuenten con sistemas de anclaje de seguridad bajo el colch\xF3n o cinchas de sujeci\xF3n al somier para evitar desplazamientos accidentales durante el uso."))), /*#__PURE__*/React.createElement("div", {
        className: "space-y-3"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-brand-900 text-xl flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83D\uDEB6"), " 4. Organizaci\xF3n del Entorno y Despeje de V\xEDas"), /*#__PURE__*/React.createElement("p", null, "Un dormitorio seguro es un dormitorio libre de obst\xE1culos. La planificaci\xF3n del espacio es tan importante como el mobiliario."), /*#__PURE__*/React.createElement("ul", {
        className: "list-disc pl-5 space-y-2"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Rutas de Paso:"), " Se debe garantizar un pasillo despejado de al menos 80-90 cm alrededor de la cama para permitir el uso de andadores o sillas de ruedas si fuera necesario."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Calzado Adecuado:"), " El uso de calzado con sujeci\xF3n posterior (no chanclas) y suela antideslizante es indispensable para asegurar el agarre en el momento de tomar contacto con el suelo."))), /*#__PURE__*/React.createElement("div", {
        className: "bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-2 mb-3"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-emerald-800 uppercase tracking-wide text-base"
      }, "El Consejo del Terapeuta Ocupacional")), /*#__PURE__*/React.createElement("p", {
        className: "text-emerald-900 italic text-base leading-relaxed"
      }, "\"El mayor enemigo de la seguridad en el dormitorio son las alfombras decorativas; el riesgo de tropiezo o deslizamiento es extremadamente alto, por lo que recomendamos retirarlas por completo de las zonas de paso. Para optimizar la seguridad, instala una tira de luz LED con sensor de movimiento bajo la estructura de la cama. Al detectar que el usuario baja los pies, iluminar\xE1 suavemente el suelo y las zapatillas, guiando el camino hacia el ba\xF1o sin necesidad de buscar interruptores y evitando deslumbramientos que puedan causar desorientaci\xF3n.\"")))),
      materials: [{
        name: 'Barandilla extensible',
        desc: 'Asidero seguro para facilitar la incorporación y evitar caídas nocturnas.',
        image: 'barandilla_cama.png',
        link: 'https://amzn.to/42hT9Yu',
        query: 'barandilla asidero cama ancianos'
      }, {
        name: 'Trapecio Universal',
        desc: 'Estructura de apoyo superior para facilitar la incorporación y cambios posturales en cama.',
        image: 'trapecio_cama.png',
        link: 'https://amzn.to/3PqiHj4',
        query: 'trapecio incorporador cama'
      }, {
        name: 'Tacos elevadores para patas de cama',
        desc: 'Aumentan la altura de la cama para facilitar levantarse sin esfuerzo articular.',
        image: 'tacos_cama.png',
        link: 'https://amzn.to/4tXN3Zo',
        query: 'tacos elevadores cama'
      }]
    }]
  }, {
    id: 'cocina',
    title: 'Cocina',
    icon: '🍳',
    color: 'bg-amber-100 text-amber-700',
    articles: [{
      title: 'Eficiencia en la Cocina: Organización y Conservación de la Energía',
      image: 'assets/cocina_adaptada.png',
      hasMore: true,
      renderText: (isExpanded, onCategoryChange) => /*#__PURE__*/React.createElement("div", {
        className: "space-y-4 text-gray-700"
      }, /*#__PURE__*/React.createElement("p", null, "La cocina es uno de los entornos m\xE1s exigentes desde el punto de vista f\xEDsico. Requiere periodos prolongados de bipedestaci\xF3n est\xE1tica (estar de pie sin moverse), desplazamientos frecuentes y la manipulaci\xF3n de cargas, lo que puede derivar en una fatiga muscular prematura o dolor articular."), /*#__PURE__*/React.createElement("p", null, "Para una persona con movilidad reducida, procesos inflamatorios como la artritis o condiciones de fatiga cr\xF3nica, el objetivo no es solo cocinar, sino hacerlo aplicando principios de econom\xEDa articular para proteger las estructuras del cuerpo y ahorrar energ\xEDa para el resto del d\xEDa."), !isExpanded ? /*#__PURE__*/React.createElement("p", {
        className: "text-gray-500 italic mt-4"
      }, "A continuaci\xF3n, detallamos estrategias para la organizaci\xF3n y conservaci\xF3n de energ\xEDa...") : /*#__PURE__*/React.createElement("div", {
        className: "space-y-8 mt-6 anim-fade-in border-t border-gray-100 pt-6"
      }, /*#__PURE__*/React.createElement("div", {
        className: "space-y-3"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-brand-900 text-xl flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83D\uDCCF"), " 1. La \"Zona de Alcance \xD3ptimo\": Biomec\xE1nica del Almacenaje"), /*#__PURE__*/React.createElement("p", null, "El dise\xF1o de la cocina debe adaptarse a la mec\xE1nica de nuestro cuerpo. Evitar alcances extremos (muy altos o muy bajos) previene lesiones en el manguito rotador y sobrecargas en la zona lumbar."), /*#__PURE__*/React.createElement("ul", {
        className: "list-disc pl-5 space-y-2"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Distribuci\xF3n Inteligente:"), " Almacena el menaje, los peque\xF1os electrodom\xE9sticos y los alimentos de uso diario en estantes situados estrictamente entre la altura de la cintura y la de los hombros."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sistemas de Extracci\xF3n:"), " En los armarios bajos, prioriza el uso de cajones extra\xEDbles o \"cestas telesc\xF3picas\" en lugar de puertas fijas, eliminando la necesidad de agacharse o arrodillarse para buscar objetos al fondo."))), /*#__PURE__*/React.createElement("div", {
        className: "space-y-3"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-brand-900 text-xl flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83E\uDE91"), " 2. Cocinado en Sedestaci\xF3n Din\xE1mica"), /*#__PURE__*/React.createElement("p", null, "Reducir el tiempo de permanencia de pie es la intervenci\xF3n m\xE1s eficaz para conservar energ\xEDa y disminuir el edema en miembros inferiores."), /*#__PURE__*/React.createElement("ul", {
        className: "list-disc pl-5 space-y-2"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "El Taburete Tipo 'Percha':"), " El uso de un taburete de apoyo isqui\xE1tico (con el asiento ligeramente inclinado) permite trabajar en una posici\xF3n de semi-sentado. Esto mantiene la columna alineada y reduce dr\xE1sticamente la carga de peso sobre las rodillas, los tobillos y la zona lumbosacra mientras preparas los alimentos o lavas los platos."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Espacio bajo la encimera:"), " Si es posible, deja un espacio libre bajo una secci\xF3n de la bancada para que las rodillas entren c\xF3modamente al estar sentado."))), /*#__PURE__*/React.createElement("div", {
        className: "space-y-3"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-brand-900 text-xl flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83C\uDF7D\uFE0F"), " 3. Optimizaci\xF3n de Utensilios y Ayudas T\xE9cnicas"), /*#__PURE__*/React.createElement("p", null, "Las herramientas adecuadas compensan la falta de fuerza en el agarre o las limitaciones en la movilidad de las manos."), /*#__PURE__*/React.createElement("ul", {
        className: "list-disc pl-5 space-y-2"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Engrosadores y Mangos Ergon\xF3micos:"), " Incorporar fundas de espuma en cubiertos y utensilios reduce el esfuerzo necesario para la pinza manual."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Preparaci\xF3n Adaptada:"), " Utiliza tablas de corte con pinchos para fijar alimentos (ideal para uso con una sola mano), abrebotellas mec\xE1nicos de pared y peladores de mango ancho para minimizar el estr\xE9s en las peque\xF1as articulaciones de los dedos."))), /*#__PURE__*/React.createElement("div", {
        className: "space-y-3"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-brand-900 text-xl flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83D\uDED2"), " 4. Gesti\xF3n de Cargas y Desplazamientos"), /*#__PURE__*/React.createElement("p", null, "La clave es \"deslizar en lugar de levantar\". Transportar ollas con agua o platos pesados es una de las actividades con mayor riesgo de lesi\xF3n."), /*#__PURE__*/React.createElement("ul", {
        className: "list-disc pl-5 space-y-2"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Continuidad de Superficies:"), " Mant\xE9n las superficies de trabajo conectadas. Si necesitas mover una olla pesada del fregadero a la placa de cocci\xF3n, desl\xEDzala suavemente por la encimera en lugar de cargarla a pulso."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Uso de Carritos de Servicio:"), " Para llevar la comida a la mesa, un carrito con ruedas es un aliado indispensable que evita m\xFAltiples viajes y reduce la carga sobre la espalda."))), /*#__PURE__*/React.createElement("div", {
        className: "bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-2 mb-3"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-emerald-800 uppercase tracking-wide text-base"
      }, "El Consejo del Terapeuta Ocupacional")), /*#__PURE__*/React.createElement("p", {
        className: "text-emerald-900 italic text-base leading-relaxed"
      }, "\"Sustituye la vajilla de cer\xE1mica pesada o gres por alternativas de vidrio templado ligero (tipo Opal) o pol\xEDmeros de alta resistencia libres de BPA. Estas opciones mantienen una est\xE9tica excelente, son aptas para microondas y pesan hasta un 50% menos, reduciendo el esfuerzo en mu\xF1ecas y hombros. Adem\xE1s, acost\xFAmbrate a deslizar los recipientes por la bancada siempre que sea posible; tu espalda y tus articulaciones te lo agradecer\xE1n al final del d\xEDa.\"")))),
      materials: [{
        name: 'Set de cubiertos adaptados',
        desc: 'Mangos engrosados que facilitan el agarre para personas con artritis o pérdida de fuerza.',
        image: 'cubiertos_adaptados.png',
        link: 'https://amzn.to/4wi1BVq',
        query: 'cubiertos adaptados mango grueso'
      }, {
        name: 'Cuchillo Nelson',
        desc: 'Permite cortar con una sola mano gracias a su diseño de hoja curva oscilante.',
        image: 'cuchillo_nelson.png',
        link: 'https://amzn.to/3QPzqgd',
        query: 'cuchillo nelson adaptado'
      }, {
        name: 'Tabla de cortar adaptada',
        desc: 'Con ventosas y clavos de sujeción para fijar los alimentos y manipularlos con seguridad.',
        image: 'tabla_cortar.png',
        link: 'https://amzn.to/42CtdHf',
        query: 'tabla de cortar adaptada una mano'
      }]
    }]
  }, {
    id: 'movilidad',
    title: 'Movilidad',
    icon: '♿',
    color: 'bg-emerald-100 text-emerald-700',
    articles: [{
      title: 'Movilidad y Autonomía: Prescripción de Productos de Apoyo',
      image: 'assets/movilidad_adaptada.jpg',
      hasMore: true,
      renderText: (isExpanded, onCategoryChange) => /*#__PURE__*/React.createElement("div", {
        className: "space-y-4 text-gray-700"
      }, /*#__PURE__*/React.createElement("p", null, "Mantener la movilidad activa, tanto dentro como fuera del hogar, es el factor preventivo n\xFAmero uno frente al declive funcional. Sin embargo, la elecci\xF3n de un dispositivo de asistencia no debe ser una decisi\xF3n al azar; un producto mal prescrito o mal configurado puede alterar el patr\xF3n de marcha, generar vicios posturales y provocar patolog\xEDas secundarias en hombros, espalda y mu\xF1ecas."), !isExpanded ? /*#__PURE__*/React.createElement("p", {
        className: "text-gray-500 italic mt-4"
      }, "A continuaci\xF3n, detallamos los tipos de productos de apoyo y su ajuste biomec\xE1nico...") : /*#__PURE__*/React.createElement("div", {
        className: "space-y-8 mt-6 anim-fade-in border-t border-gray-100 pt-6"
      }, /*#__PURE__*/React.createElement("p", null, "Desde el an\xE1lisis biomec\xE1nico, la movilidad se divide seg\xFAn la necesidad de soporte y el entorno de uso:"), /*#__PURE__*/React.createElement("div", {
        className: "space-y-3"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-brand-900 text-xl flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83E\uDDAF"), " 1. El Bast\xF3n: Simetr\xEDa y Descarga"), /*#__PURE__*/React.createElement("p", null, "Es el dispositivo m\xE1s com\xFAn, dise\xF1ado para mejorar el equilibrio aumentando la base de sustentaci\xF3n o para descargar peso de una articulaci\xF3n afecta (cadera o rodilla)."), /*#__PURE__*/React.createElement("ul", {
        className: "list-disc pl-5 space-y-2"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Configuraci\xF3n Ergon\xF3mica:"), " El uso correcto no solo depende de la altura, sino de la coordinaci\xF3n motriz. Un bast\xF3n mal utilizado puede desplazar el centro de gravedad de forma peligrosa."))), /*#__PURE__*/React.createElement("div", {
        className: "space-y-3"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-brand-900 text-xl flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83D\uDEB6"), " 2. Tipolog\xEDas de Andadores (Caminadores)"), /*#__PURE__*/React.createElement("p", null, "La elecci\xF3n del andador depende del equilibrio din\xE1mico del usuario y del entorno donde se desplazar\xE1:"), /*#__PURE__*/React.createElement("ul", {
        className: "list-disc pl-5 space-y-2"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Andador Fijo (4 tacos):"), " Proporciona la m\xE1xima estabilidad. Es ideal para fases iniciales de rehabilitaci\xF3n o usuarios con gran inestabilidad, ya que obliga a realizar una marcha lenta y fragmentada (levantar, avanzar, apoyar)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Andador de dos ruedas (Delanteras y tacos traseros):"), " El est\xE1ndar para interiores dom\xE9sticos. Las ruedas delanteras facilitan la fluidez del movimiento sin necesidad de levantar el dispositivo, mientras que los tacos traseros act\xFAan como freno natural al ejercer presi\xF3n hacia abajo."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Andador de cuatro ruedas (Rollator):"), " Dise\xF1ado espec\xEDficamente para exteriores. Permite una marcha r\xE1pida y natural. Incluye frenos de mano para seguridad en pendientes y, habitualmente, un asiento incorporado para gestionar la fatiga mediante descansos frecuentes."))), /*#__PURE__*/React.createElement("div", {
        className: "space-y-3"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-brand-900 text-xl flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83E\uDDBD"), " 3. Sillas de Ruedas: Cuando la Marcha no es Funcional"), /*#__PURE__*/React.createElement("p", null, "Cuando la bipedestaci\xF3n supone un riesgo de ca\xEDda alto o la fatiga impide completar actividades b\xE1sicas, la silla de ruedas se convierte en la herramienta de participaci\xF3n social por excelencia."), /*#__PURE__*/React.createElement("ul", {
        className: "list-disc pl-5 space-y-2"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sillas Manuales:"), " Requieren que el usuario tenga fuerza suficiente en los miembros superiores para la autopropulsi\xF3n o que disponga de un cuidador. Son ligereas, plegables y facilitan el transporte en veh\xEDculos."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sillas El\xE9ctricas:"), " Prescritas para usuarios con limitaciones severas en la fuerza de los brazos o enfermedades que cursan con fatiga extrema. Aportan una independencia total en distancias largas y terrenos irregulares sin esfuerzo f\xEDsico."))), /*#__PURE__*/React.createElement("div", {
        className: "space-y-3"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-brand-900 text-xl flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83D\uDCCF"), " 4. Protocolo de Ajuste y Mantenimiento"), /*#__PURE__*/React.createElement("p", null, "La efectividad de cualquier ayuda t\xE9cnica se pierde si no se ajusta a la antropometr\xEDa del usuario:"), /*#__PURE__*/React.createElement("ul", {
        className: "list-disc pl-5 space-y-2"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Evaluaci\xF3n de Altura:"), " La empu\xF1adura del dispositivo debe coincidir exactamente con el troc\xE1nter mayor (el relieve \xF3seo lateral de la cadera). Con el usuario de pie y los brazos relajados, el codo debe presentar una flexi\xF3n de entre 20\xBA y 30\xBA."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Revisi\xF3n de Conteras:"), " Las gomas de la base (conteras) son el \xFAnico punto de contacto con el suelo. Deben revisarse mensualmente; si el relieve antideslizante se ha desgastado, el riesgo de resbal\xF3n aumenta de forma exponencial, especialmente en superficies h\xFAmedas."))), /*#__PURE__*/React.createElement("div", {
        className: "bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-2 mb-3"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-emerald-800 uppercase tracking-wide text-base"
      }, "El Consejo del Terapeuta Ocupacional")), /*#__PURE__*/React.createElement("p", {
        className: "text-emerald-900 italic text-base leading-relaxed"
      }, "\"Existe un error muy extendido: utilizar el bast\xF3n en el mismo lado que la pierna d\xE9bil. Para una marcha fisiol\xF3gica, el bast\xF3n debe empu\xF1arse SIEMPRE con la mano contraria a la pierna lesionada o dolorida. Esto permite que el brazo y la pierna contraria avancen a la vez, simulando el balanceo natural del cuerpo, repartiendo las cargas de forma sim\xE9trica y protegiendo tu cadera.\"")))),
      materials: [{
        name: 'Andador de aluminio para interior',
        desc: 'Ligero y estrecho, con ruedas delanteras para maniobrar por pasillos y puertas de casa.',
        image: 'andador_interior.png',
        link: 'https://amzn.to/49eGadM',
        query: 'andador interior estrecho ancianos'
      }, {
        name: 'Andador tipo Rollator (exterior)',
        desc: 'Con cuatro ruedas grandes, asiento y frenos para paseos seguros en la calle.',
        image: 'andador_exterior.png',
        link: 'https://amzn.to/4nioy6O',
        query: 'andador rollator exterior aluminio'
      }, {
        name: 'Conteras antideslizantes',
        desc: 'Gomas anchas de repuesto para bastones o andadores. Máximo agarre en el suelo.',
        image: 'conteras.png',
        link: 'https://amzn.to/4uw9fth',
        query: 'conteras antideslizantes baston'
      }]
    }]
  }, {
    id: 'alimentacion',
    title: 'Alimentación',
    icon: '🍽️',
    color: 'bg-rose-100 text-rose-700',
    articles: [{
      title: 'Alimentación Independiente: Ergonomía y Autonomía en la Mesa',
      image: 'cubiertos_adaptados.png',
      hasMore: true,
      renderText: (isExpanded, onCategoryChange) => /*#__PURE__*/React.createElement("div", {
        className: "space-y-4 text-gray-700"
      }, /*#__PURE__*/React.createElement("p", null, "La alimentaci\xF3n es una de las Actividades de la Vida Diaria (AVD) m\xE1s complejas y con mayor carga social. No se trata solo de la nutrici\xF3n, sino de la capacidad de participar de forma digna y aut\xF3noma en un acto cotidiano. Limitaciones en la fuerza de prensi\xF3n, temblores, rangos de movimiento reducidos en el hombro o dificultades en la coordinaci\xF3n ojo-mano pueden convertir la comida en un proceso frustrante y agotador."), /*#__PURE__*/React.createElement("p", null, "Desde la Terapia Ocupacional, el objetivo es compensar estos d\xE9ficits mediante el uso de productos de apoyo y estrategias de econom\xEDa articular."), !isExpanded ? /*#__PURE__*/React.createElement("p", {
        className: "text-gray-500 italic mt-4"
      }, "A continuaci\xF3n, detallamos las opciones y adaptaciones para optimizar la ergonom\xEDa en la mesa...") : /*#__PURE__*/React.createElement("div", {
        className: "space-y-8 mt-6 anim-fade-in border-t border-gray-100 pt-6"
      }, /*#__PURE__*/React.createElement("div", {
        className: "space-y-3"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-brand-900 text-xl flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83E\uDD44"), " 1. Cubiertos Ergon\xF3micos: Optimizando el Agarre"), /*#__PURE__*/React.createElement("p", null, "Cuando existe debilidad muscular o dolor en las peque\xF1as articulaciones de la mano (como en la artritis), el uso de cubiertos est\xE1ndar resulta ineficiente."), /*#__PURE__*/React.createElement("ul", {
        className: "list-disc pl-5 space-y-2"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Engrosadores de Mango:"), " Aumentar el di\xE1metro del mango reduce la tensi\xF3n necesaria para cerrar el pu\xF1o, permitiendo un agarre m\xE1s relajado y menos doloroso."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Cubiertos Angulados y Flexibles:"), " Ideales para personas con limitaci\xF3n en la flexi\xF3n del codo o en la supinaci\xF3n de la mu\xF1eca (giro de la mano). Permiten llevar el alimento a la boca sin necesidad de realizar movimientos compensatorios bruscos con el cuello o el tronco."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Cubiertos con Peso:"), " Para usuarios con temblores esenciales o parkinsonianos, los cubiertos lastrados ayudan a estabilizar el movimiento mediante la propiocepci\xF3n, mejorando la precisi\xF3n en el trayecto plato-boca."))), /*#__PURE__*/React.createElement("div", {
        className: "space-y-3"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-brand-900 text-xl flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83C\uDF7D\uFE0F"), " 2. Vajilla Funcional y Control del Entorno"), /*#__PURE__*/React.createElement("p", null, "Un plato adecuado puede marcar la diferencia entre necesitar ayuda o comer de forma independiente."), /*#__PURE__*/React.createElement("ul", {
        className: "list-disc pl-5 space-y-2"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Rebordes de Plato (Platos de Pared Alta):"), " Facilitan la carga del alimento en la cuchara o tenedor al ofrecer un tope contra el que empujar, algo fundamental para personas que solo pueden utilizar una mano (hemiparesia)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Bases Antideslizantes:"), " El uso de tapetes de pol\xEDmero de alta adherencia (tipo Dycem) o platos con ventosa evita que el recipiente se desplace por la mesa, permitiendo que el usuario se centre exclusivamente en la manipulaci\xF3n del cubierto."))), /*#__PURE__*/React.createElement("div", {
        className: "space-y-3"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-brand-900 text-xl flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83D\uDCA7"), " 3. Hidrataci\xF3n Segura y Accesible"), /*#__PURE__*/React.createElement("p", null, "Beber l\xEDquidos requiere una coordinaci\xF3n precisa para evitar atragantamientos o derrames, especialmente si hay problemas de movilidad cervical."), /*#__PURE__*/React.createElement("ul", {
        className: "list-disc pl-5 space-y-2"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Vasos con Escotadura Nasal:"), " Permiten beber sin necesidad de inclinar la cabeza hacia atr\xE1s, lo cual es cr\xEDtico en pacientes con riesgo de aspiraci\xF3n o con rigidez en el cuello."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Vasos de Doble Asa:"), " Facilitan un agarre bimanual sim\xE9trico, distribuyendo el peso del l\xEDquido y compensando la falta de fuerza o el temblor de una sola mano."))), /*#__PURE__*/React.createElement("div", {
        className: "space-y-3"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-brand-900 text-xl flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83E\uDE91"), " 4. Biomec\xE1nica de la Postura en la Mesa"), /*#__PURE__*/React.createElement("p", null, "La eficacia de cualquier adaptaci\xF3n depende de una base postural s\xF3lida. Una mala alineaci\xF3n del tronco dificulta la degluci\xF3n y el control motor fino."), /*#__PURE__*/React.createElement("ul", {
        className: "list-disc pl-5 space-y-2"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Posicionamiento:"), " Los pies deben estar bien apoyados y la pelvis lo m\xE1s atr\xE1s posible en la silla. La mesa debe estar a una altura que permita apoyar los antebrazos c\xF3modamente sin elevar los hombros, facilitando una trayectoria estable hacia la boca."))), /*#__PURE__*/React.createElement("div", {
        className: "bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-2 mb-3"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-emerald-800 uppercase tracking-wide text-base"
      }, "El Consejo del Terapeuta Ocupacional")), /*#__PURE__*/React.createElement("p", {
        className: "text-emerald-900 italic text-base leading-relaxed"
      }, "\"Si necesitas una adaptaci\xF3n muy espec\xEDfica que no encuentras en el mercado convencional, no descartes las soluciones de bajo coste mediante impresi\xF3n 3D. Actualmente, conocemos dise\xF1os de c\xF3digo abierto para engrosadores, pinzas de sujeci\xF3n y soportes de vasos que se pueden fabricar a medida por una fracci\xF3n del precio de una ortopedia tradicional. Adem\xE1s, un peque\xF1o truco casero: si un plato se resbala y no tienes una base t\xE9cnica, una bayeta h\xFAmeda o una goma el\xE1stica ancha alrededor del vaso pueden mejorar dr\xE1sticamente el agarre y la estabilidad de forma inmediata.\"")))),
      materials: [{
        name: 'Cubiertos ergonómicos engrosados',
        desc: 'Set de cubiertos con mangos gruesos para facilitar el agarre relajado.',
        image: 'cubiertos_adaptados.png',
        link: 'https://amzn.to/4wi1BVq',
        query: 'cubiertos adaptados mango grueso'
      }, {
        name: 'Cuchillo Nelson',
        desc: 'Permite cortar con una sola mano gracias a su diseño de hoja curva oscilante.',
        image: 'cuchillo_nelson.png',
        link: 'https://amzn.to/3QPzqgd',
        query: 'cuchillo nelson adaptado'
      }, {
        name: 'Vaso con escotadura nasal',
        desc: 'Permite beber sin inclinar el cuello hacia atrás, ideal para disfagia.',
        image: 'vaso_escotadura.png',
        link: 'https://amzn.to/3R1tYXJ',
        query: 'vaso escotadura nasal disfagia'
      }]
    }]
  }, {
    id: 'sillas-ruedas',
    title: 'Sillas de Ruedas',
    icon: '🦽',
    color: 'bg-purple-100 text-purple-700',
    articles: [{
      title: 'Sillas de Ruedas: Guía de Selección y Funcionalidad',
      image: 'assets/silla_activa.png',
      hasMore: true,
      renderText: (isExpanded, onCategoryChange) => /*#__PURE__*/React.createElement("div", {
        className: "space-y-4 text-gray-700"
      }, /*#__PURE__*/React.createElement("p", null, "La silla de ruedas no debe entenderse como una limitaci\xF3n, sino como una herramienta de libertad y participaci\xF3n social. Una elecci\xF3n adecuada, basada en las capacidades residuales del usuario y las demandas de su entorno, es la diferencia entre el aislamiento y la independencia."), !isExpanded ? /*#__PURE__*/React.createElement("p", {
        className: "text-gray-500 italic mt-4"
      }, "A continuaci\xF3n, detallamos las diferentes tipolog\xEDas de sillas de ruedas y sus funcionalidades...") : /*#__PURE__*/React.createElement("div", {
        className: "space-y-8 mt-6 anim-fade-in border-t border-gray-100 pt-6"
      }, /*#__PURE__*/React.createElement("div", {
        className: "space-y-3"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-brand-900 text-xl flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\u26A1"), " 1. Sillas de Ruedas Manuales y Activas"), /*#__PURE__*/React.createElement("p", null, "La propulsi\xF3n manual requiere una evaluaci\xF3n precisa de la fuerza en miembros superiores y la estabilidad del tronco."), /*#__PURE__*/React.createElement("ul", {
        className: "list-disc pl-5 space-y-2"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sillas Manuales Est\xE1ndar:"), " Dise\xF1adas para un uso ocasional o de transporte. Suelen ser m\xE1s pesadas y menos ajustables, enfocadas en la durabilidad y la facilidad de plegado para acompa\xF1antes."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sillas Activas (Ultraligeras):"), " Son la extensi\xF3n del cuerpo del usuario independiente. Fabricadas en materiales como aluminio aeron\xE1utico, titanio o carbono, permiten ajustar el centro de gravedad. Su dise\xF1o (de chasis r\xEDgido o plegable) busca la m\xE1xima eficiencia en cada pedalada, minimizando el esfuerzo y protegiendo la articulaci\xF3n del hombro a largo plazo."))), /*#__PURE__*/React.createElement("div", {
        className: "space-y-3"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-brand-900 text-xl flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83D\uDD0B"), " 2. Sillas El\xE9ctricas: Potencia y Portabilidad"), /*#__PURE__*/React.createElement("p", null, "La motorizaci\xF3n est\xE1 indicada cuando la propulsi\xF3n manual no es funcional por fatiga, dolor o falta de fuerza."), /*#__PURE__*/React.createElement("div", {
        className: "my-4 rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white"
      }, /*#__PURE__*/React.createElement("img", {
        src: "assets/silla_electrica.png",
        alt: "Silla el\xE9ctrica ligera plegable en entorno urbano",
        className: "w-full h-auto object-cover max-h-96 hover:scale-105 transition-transform duration-700"
      })), /*#__PURE__*/React.createElement("ul", {
        className: "list-disc pl-5 space-y-2"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sillas El\xE9ctricas Ligeras (Plegables):"), " Equipadas habitualmente con baterias de litio, est\xE1n dise\xF1adas para la vida urbana y los viajes. Son f\xE1ciles de transportar en el maletero de un coche y ofrecen una gran maniobrabilidad en espacios reducidos, sacrificando algo de amortiguaci\xF3n por ligereza."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sillas El\xE9ctricas Fijas (Robustas):"), " Priorizan la estabilidad y la autonom\xEDa en exteriores. Suelen tener bater\xEDas de mayor capacidad, sistemas de suspensi\xF3n avanzados y ruedas de mayor di\xE1metro para sortear obst\xE1culos y terrenos irregulares con seguridad."))), /*#__PURE__*/React.createElement("div", {
        className: "space-y-3"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-brand-900 text-xl flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\u2699\uFE0F"), " 3. Sistemas de Basculaci\xF3n y Multifunci\xF3n"), /*#__PURE__*/React.createElement("p", null, "En casos donde el usuario permanece sentado durante largos periodos y no puede realizar cambios posturales de forma aut\xF3noma, la tecnolog\xEDa de posicionamiento es cr\xEDtica para la salud."), /*#__PURE__*/React.createElement("div", {
        className: "my-4 rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white"
      }, /*#__PURE__*/React.createElement("img", {
        src: "assets/silla_basculante.png",
        alt: "Silla de ruedas el\xE9ctrica con sistema de basculaci\xF3n",
        className: "w-full h-auto object-cover max-h-96 hover:scale-105 transition-transform duration-700"
      })), /*#__PURE__*/React.createElement("ul", {
        className: "list-disc pl-5 space-y-2"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sillas Basculantes (Manuales):"), " Permiten inclinar todo el conjunto de asiento y respaldo sin cambiar el \xE1ngulo de las articulaciones del usuario. Esto es vital para la redistribuci\xF3n de presiones y la prevenci\xF3n de \xFAlceras por presi\xF3n (escaras)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sillas El\xE9ctricas Basculantes y Multifunci\xF3n:"), " Representan el m\xE1ximo nivel de tecnolog\xEDa asistencial. Permiten al usuario controlar electr\xF3nicamente la basculaci\xF3n, la reclinaci\xF3n del respaldo y la elevaci\xF3n de los reposapi\xE9s."))), /*#__PURE__*/React.createElement("div", {
        className: "bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-2 mb-3"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-2xl"
      }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("h5", {
        className: "font-bold text-emerald-800 uppercase tracking-wide text-base"
      }, "El Consejo del Terapeuta Ocupacional")), /*#__PURE__*/React.createElement("p", {
        className: "text-emerald-900 italic text-base leading-relaxed"
      }, "\"La silla de ruedas no es un mueble, es una pr\xF3tesis de movilidad. Un error cr\xEDtico es no prestar atenci\xF3n al coj\xEDn antiescaras; de nada sirve la mejor silla el\xE9ctrica del mercado si la superficie de apoyo no gestiona correctamente las presiones. Asimismo, recuerda que una silla el\xE9ctrica multifunci\xF3n no es solo comodidad: la capacidad de elevar las piernas por encima del nivel del coraz\xF3n o cambiar el \xE1ngulo de apoyo es una intervenci\xF3n m\xE9dica constante que previene complicaciones graves y mejora el confort diario.\"")))),
      materials: []
    }]
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "guides",
    className: "pt-36 pb-24 px-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-16"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block bg-brand-100 text-brand-700 rounded-full px-5 py-2 text-base font-bold uppercase tracking-widest mb-4"
  }, "Consejos Profesionales"), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-4xl sm:text-5xl font-bold text-brand-900 mb-4"
  }, "Adaptaci\xF3n por \xC1reas"), /*#__PURE__*/React.createElement("div", {
    className: "section-divider w-24 mx-auto mb-6"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-gray-600 max-w-2xl mx-auto"
  }, "Descubre gu\xEDas detalladas desde la perspectiva de la Terapia Ocupacional para hacer de tu hogar un entorno seguro, funcional y promotor de la autonom\xEDa.")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-6"
  }, categories.map(cat => {
    const isOpen = openCategory === cat.id;
    const catImage = cat.articles[0]?.image;
    return /*#__PURE__*/React.createElement("div", {
      key: cat.id,
      className: "bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden transition-all duration-300 mb-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: `p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors ${isOpen ? 'border-b border-gray-100 ' + cat.color + ' bg-opacity-20 hover:bg-opacity-30' : ''}`,
      onClick: () => setOpenCategory(isOpen ? null : cat.id)
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-4 sm:gap-6"
    }, catImage && /*#__PURE__*/React.createElement("img", {
      src: catImage,
      alt: cat.title,
      className: "w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl shadow-sm"
    }), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3 sm:gap-4"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-3xl sm:text-4xl"
    }, cat.icon), /*#__PURE__*/React.createElement("h3", {
      className: "font-display text-2xl sm:text-3xl font-bold text-gray-900"
    }, cat.title))), /*#__PURE__*/React.createElement("div", {
      className: "text-gray-400 mr-2 sm:mr-4 shrink-0"
    }, /*#__PURE__*/React.createElement("svg", {
      className: `w-8 h-8 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-600' : ''}`,
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M19 9l-7 7-7-7"
    })))), isOpen && /*#__PURE__*/React.createElement("div", {
      className: "p-8 anim-fade-in"
    }, cat.articles.map((article, idx) => /*#__PURE__*/React.createElement(ArticleBlock, {
      key: idx,
      article: article,
      getAmazonLink: getAmazonLink,
      onCategoryChange: setOpenCategory
    }))));
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-16 overflow-hidden rounded-xl bg-gray-50/50 min-h-[100px] flex flex-col items-center justify-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-gray-400 uppercase tracking-widest mb-2"
  }, "Publicidad"), /*#__PURE__*/React.createElement(AdSenseBlock, {
    slot: "9272607554"
  }))));
};
function App() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Navbar, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement("main", {
    id: "main-content"
  }, /*#__PURE__*/React.createElement(SectionGuides, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();