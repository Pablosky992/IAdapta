(function() {
const {
  Icons,
  Navbar,
  Footer,
  CookieBanner,
  getAmazonLink
} = window;
const {
  useState
} = React;
const GuiaCocina = function GuiaCocina() {
  const materials = [{
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
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "pt-36 pb-24 px-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/cocina_adaptada.png",
    alt: "Cocina Adaptada",
    className: "w-full h-64 sm:h-96 object-cover"
  }), /*#__PURE__*/React.createElement("div", {
    className: "p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    href: "guias.html",
    className: "inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors mb-6 text-sm"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-4 h-4",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M10 19l-7-7m0 0l7-7m-7 7h18"
  })), "Volver a Gu\xEDas"), /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-4xl font-bold text-brand-900 mb-8"
  }, "Eficiencia en la Cocina: Organizaci\xF3n y Conservaci\xF3n de la Energ\xEDa"), /*#__PURE__*/React.createElement("p", null, "La cocina es uno de los entornos m\xE1s exigentes desde el punto de vista f\xEDsico. Requiere periodos prolongados de bipedestaci\xF3n est\xE1tica (estar de pie sin moverse), desplazamientos frecuentes y la manipulaci\xF3n de cargas, lo que puede derivar en una fatiga muscular prematura o dolor articular."), /*#__PURE__*/React.createElement("p", null, "Para una persona con movilidad reducida, procesos inflamatorios como la artritis o condiciones de fatiga cr\xF3nica, el objetivo no es solo cocinar, sino hacerlo aplicando principios de econom\xEDa articular para proteger las estructuras del cuerpo y ahorrar energ\xEDa para el resto del d\xEDa."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 mt-6 border-t border-gray-100 pt-6"
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
  }, "\"Sustituye la vajilla de cer\xE1mica pesada o gres por alternativas de vidrio templado ligero (tipo Opal) o pol\xEDmeros de alta resistencia libres de BPA. Estas opciones mantienen una est\xE9tica excelente, son aptas para microondas y pesan hasta un 50% menos, reduciendo el esfuerzo en mu\xF1ecas y hombros. Adem\xE1s, acost\xFAmbrate a deslizar los recipientes por la bancada siempre que sea posible; tu espalda y tus articulaciones te lo agradecer\xE1n al final del d\xEDa.\""))), /*#__PURE__*/React.createElement("div", {
    className: "mt-12 bg-gray-50 rounded-2xl p-6 sm:p-8 border border-brand-100 shadow-sm"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-brand-800 uppercase tracking-wide text-lg mb-6 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Check, null), " Material recomendado"), /*#__PURE__*/React.createElement("ul", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, materials.map((mat, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "bg-white rounded-xl border border-gray-200 shadow-sm hover:border-brand-300 hover:shadow-md transition-all overflow-hidden"
  }, /*#__PURE__*/React.createElement("a", {
    href: getAmazonLink(mat.query, mat.link),
    target: "_blank",
    rel: "noopener noreferrer",
    className: "flex gap-4 p-4 items-start w-full h-full"
  }, mat.image && /*#__PURE__*/React.createElement("img", {
    src: mat.image,
    alt: mat.name,
    className: "w-16 h-16 object-cover rounded-lg border border-gray-100 shrink-0"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-1.5 flex-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-gray-900 text-sm"
  }, mat.name), mat.desc && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 leading-snug"
  }, mat.desc), /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-1 text-[#FF9900] font-bold text-xs mt-1"
  }, "Ver en Amazon")))))), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 p-4 bg-white rounded-xl border border-gray-100 text-xs text-gray-500 leading-relaxed shadow-sm"
  }, "Las recomendaciones que ves en esta web han sido seleccionadas bajo criterio profesional de Terapia Ocupacional. Al comprar a trav\xE9s de estos enlaces, ayudas a mantener el proyecto IAdapta sin que a ti te cueste ni un c\xE9ntimo m\xE1s."))))));
};
function App() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Navbar, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement("main", {
    id: "main-content"
  }, /*#__PURE__*/React.createElement(GuiaCocina, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();