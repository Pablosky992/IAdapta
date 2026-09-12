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
const GuiaAccesos = function GuiaAccesos() {
  const materials = [{
    name: 'Rampa telescópica plegable de aluminio',
    desc: 'Supera escalones y desniveles en accesos con máxima ligereza y superficie antideslizante.',
    image: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T1/images/I/813wIDx9CLL._AC_SL1500_.jpg',
    link: 'https://amzn.to/3USy3zg',
    query: 'rampa telescopica plegable aluminio silla ruedas ortopedia'
  }, {
    name: 'Rampa de umbral de goma biselada',
    desc: 'Salva pequeños resaltes de 1 a 4 cm en puertas interiores y cancelas sin tropiezos.',
    image: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T1/images/I/61gx2i0TLkL._AC_SL1200_.jpg',
    link: 'https://amzn.to/470euYt',
    query: 'rampa umbral goma puerta accesibilidad silla ruedas'
  }, {
    name: 'Pasamanos continuo de pared de acero',
    desc: 'Soporte ergonómico continuo para escaleras y pasillos con fijación robusta.',
    image: 'assets/asideros.jpg',
    link: 'https://amzn.to/4u4JBw3',
    query: 'pasamanos escalera continuo acero inoxidable pared'
  }, {
    name: 'Luz LED con sensor de movimiento recargable',
    desc: 'Ilumina automáticamente zonas de paso, rellanos y escalones al detectar presencia.',
    image: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T1/images/I/61CMP2PbU0L._AC_SL1500_.jpg',
    link: 'https://amzn.to/3TppZpm',
    query: 'luz sensor movimiento nocturna pasillo escalera led recargable'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "pt-36 pb-24 px-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/guia_accesos.png",
    alt: "Accesibilidad en Entradas y Pasillos",
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
  }, "Accesibilidad en Entradas, Pasillos y Escaleras"), /*#__PURE__*/React.createElement("p", null, "El acceso al domicilio es el primer eslab\xF3n de la cadena de accesibilidad universal: si la entrada o las zonas de circulaci\xF3n interna presentan barreras, la persona corre el riesgo de quedar confinada en su propio hogar o depender permanentemente de terceros. Desde la Terapia Ocupacional, abordamos el entorno de acceso evaluando el itinerario peatonal completo, la biomec\xE1nica de la marcha, la maniobrabilidad de productos de apoyo (sillas de ruedas, andadores y bastones) y la percepci\xF3n visual de los desniveles."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 mt-6 border-t border-gray-100 pt-6"
  }, /*#__PURE__*/React.createElement("p", null, "A continuaci\xF3n, analizamos las intervenciones arquitect\xF3nicas y productos de apoyo m\xE1s eficaces para garantizar un tr\xE1nsito seguro y fluido:"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDEAA"), " 1. Desniveles y Escalones: Rampas Fijas y Telesc\xF3picas"), /*#__PURE__*/React.createElement("p", null, "Un escal\xF3n de apenas 3 cm puede suponer una barrera insalvable para una silla de ruedas o provocar un tropiezo grave en personas con marcha senil o parkinsoniana."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Pendiente Reglamentaria y Segura:"), " Seg\xFAn el C\xF3digo T\xE9cnico de la Edificaci\xF3n (DB-SUA), las rampas deben mantener una pendiente m\xE1xima del 10% para tramos menores de 3 metros y del 8% para tramos de hasta 6 metros. Una inclinaci\xF3n excesiva genera sobreesfuerzo en el propulsor o riesgo de vuelco."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Rampas Telesc\xF3picas Port\xE1tiles:"), " Fabricadas en aluminio ligero con ranuras antideslizantes, son ideales para superar tramos de 2 a 5 escalones en portales, terrazas o veh\xEDculos sin necesidad de acometer obras comunitarias."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Rampas de Umbral Biseladas:"), " Piezas de goma maciza o aluminio que suavizan el resalte de marcos de puertas correderas o cancelas exteriores, permitiendo el paso suave de andadores con ruedas."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83E\uDE9C"), " 2. Escaleras Seguras: Pasamanos Dobles y Huellas Antideslizantes"), /*#__PURE__*/React.createElement("p", null, "Las escaleras representan el punto cr\xEDtico con mayor severidad en traumatismos por ca\xEDdas en el adulto mayor."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Pasamanos Continuo a Ambos Lados:"), " Permite utilizar el miembro superior h\xE1bil independientemente de si se sube o se baja. La altura recomendada se sit\xFAa entre 90 y 105 cm del plano de la huella."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Prolongaci\xF3n en Extremos:"), " El pasamanos debe prolongarse al menos 30 cm m\xE1s all\xE1 del primer y \xFAltimo pelda\xF1o, ofreciendo un punto de apoyo firme antes de iniciar o finalizar el tramo."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Contraste Visual en el Borde:"), " Instalar bandas fotoluminiscentes o cantoneras de alto contraste en la arista de cada pelda\xF1o facilita la discriminaci\xF3n de profundidad a personas con visi\xF3n reducida."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\u2194\uFE0F"), " 3. Anchura de Paso y Maniobrabilidad en Pasillos y Puertas"), /*#__PURE__*/React.createElement("p", null, "La circulaci\xF3n interior requiere dimensiones m\xEDnimas que permitan el giro y el acompa\xF1amiento asistido."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Anchura Libre de Paso:"), " Las puertas interiores deben proporcionar un vano libre m\xEDnimo de 80 cm (idealmente 85-90 cm para sillas el\xE9ctricas). Si la puerta existente es estrecha, las bisagras de apertura desplazada (tipo Z) ganan hasta 5 cm \xFAtiles sin cambiar el marco."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Despeje de Pasillos:"), " Eliminar mesitas auxiliares, parag\xFCeros y maceteros para garantizar un ancho de paso continuo de al menos 90-100 cm."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Suelo Continuo y Homog\xE9neo:"), " Retirar felpudos gruesos y alfombras sueltas, o fijarlas mediante cinta de doble cara de alta resistencia perimetral."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCA1"), " 4. Iluminaci\xF3n Guiada de Pasos y Sensores de Presencia"), /*#__PURE__*/React.createElement("p", null, "El d\xE9ficit de iluminaci\xF3n nocturna en pasillos y descansillos es uno de los mayores desencadenantes de desorientaci\xF3n y ca\xEDdas."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Balizamiento a Nivel de Rodapi\xE9:"), " Luces LED nocturnas con sensor crepuscular y de movimiento colocadas a 30 cm del suelo que gu\xEDan el camino hacia el ba\xF1o o la cocina sin deslumbrar."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Interruptores Conmutados Accesibles:"), " Ubicaci\xF3n a una altura entre 90 y 110 cm del suelo, con teclas anchas basculantes o pilotos luminosos de localizaci\xF3n nocturna."))), /*#__PURE__*/React.createElement("div", {
    className: "bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-emerald-800 uppercase tracking-wide text-base"
  }, "El Consejo de la Terapia Ocupacional")), /*#__PURE__*/React.createElement("p", {
    className: "text-emerald-900 italic text-base leading-relaxed"
  }, "\"El mayor error al instalar una rampa es subestimar su longitud. Una rampa demasiado corta resultar\xE1 excesivamente empinada y peligrosa. Recuerda la regla b\xE1sica: por cada cent\xEDmetro de altura a salvar, necesitas al menos 10 o 12 cent\xEDmetros de longitud de rampa para que el empuje sea seguro y ergon\xF3mico, tanto para el usuario independiente como para el cuidador.\""))), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement(GuiaAccesos, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();