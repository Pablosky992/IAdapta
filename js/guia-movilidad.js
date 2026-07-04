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
const GuiaMovilidad = function GuiaMovilidad() {
  const materials = [{
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
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "pt-36 pb-24 px-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/movilidad_adaptada.jpg",
    alt: "Movilidad Adaptada",
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
  }, "Movilidad y Autonom\xEDa: Prescripci\xF3n de Productos de Apoyo"), /*#__PURE__*/React.createElement("p", null, "Mantener la movilidad activa, tanto dentro como fuera del hogar, es el factor preventivo n\xFAmero uno frente al declive funcional. Sin embargo, la elecci\xF3n de un dispositivo de asistencia no debe ser una decisi\xF3n al azar; un producto mal prescrito o mal configurado puede alterar el patr\xF3n de marcha, generar vicios posturales y provocar patolog\xEDas secundarias en hombros, espalda y mu\xF1ecas."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 mt-6 border-t border-gray-100 pt-6"
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
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sillas Manuales:"), " Requieren que el usuario tenga fuerza suficiente en los miembros superiores para la autopropulsi\xF3n o que disponga de un cuidador. Son ligeras, plegables y facilitan el transporte en veh\xEDculos."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sillas El\xE9ctricas:"), " Prescritas para usuarios con limitaciones severas en la fuerza de los brazos o enfermedades que cursan con fatiga extrema. Aportan una independencia total en distancias largas y terrenos irregulares sin esfuerzo f\xEDsico."))), /*#__PURE__*/React.createElement("div", {
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
  }, "\"Existe un error muy extendido: utilizar el bast\xF3n en el mismo lado que la pierna d\xE9bil. Para una marcha fisiol\xF3gica, el bast\xF3n debe empu\xF1arse SIEMPRE con la mano contraria a la pierna lesionada o dolorida. Esto permite que el brazo y la pierna contraria avancen a la vez, simulando el balanceo natural del cuerpo, repartiendo las cargas de forma sim\xE9trica y protegiendo tu cadera.\""))), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement(GuiaMovilidad, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();