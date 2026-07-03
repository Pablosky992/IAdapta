(function() {
const {
  Icons,
  Navbar,
  Footer,
  CookieBanner,
  AdSenseBlock,
  getAmazonLink
} = window;
const {
  useState
} = React;
const GuiaDemencias = function GuiaDemencias() {
  const materials = [{
    name: 'Reloj de Orientación (Calendario Digital)',
    desc: 'Pantalla grande que muestra el día de la semana y el momento del día (mañana, tarde, noche) sin abreviaturas.',
    image: 'assets/reloj_orientacion.png',
    link: 'https://amzn.to/4wJVzML',
    query: 'reloj alzheimer calendario digital'
  }, {
    name: 'Detector de Humo y Gas Automático',
    desc: 'Imprescindible en la cocina para prevenir accidentes si hay problemas de memoria u olvidos frecuentes.',
    image: 'assets/alarma_humo_gas.png',
    link: 'https://amzn.to/44J1W6H',
    query: 'detector humo gas cocina'
  }, {
    name: 'Localizador GPS Personas Mayores',
    desc: 'Dispositivo SOS para llevar encima que permite saber la ubicación exacta en caso de desorientación o fuga.',
    image: 'assets/localizador_gps.png',
    link: 'https://amzn.to/4wu15TA',
    query: 'localizador gps mayores sos'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "pt-36 pb-24 px-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/guia_demencias.png",
    alt: "Adaptaci\xF3n del entorno para Alzheimer y Demencias",
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
  }, "Accesibilidad Cognitiva: Adaptando el Entorno para el Alzheimer"), /*#__PURE__*/React.createElement("p", null, "Cuando pensamos en accesibilidad, solemos imaginar rampas y pasamanos. Sin embargo, para una persona con Alzheimer, demencia vascular u otro deterioro cognitivo, las barreras no son f\xEDsicas, sino mentales. La desorientaci\xF3n, la p\xE9rdida de memoria y la confusi\xF3n transforman su propia casa en un entorno hostil y peligroso."), /*#__PURE__*/React.createElement("p", null, "La accesibilidad cognitiva busca simplificar el entorno, proporcionando pistas visuales que compensen la p\xE9rdida de memoria y garanticen la seguridad frente a olvidos (como dejarse el gas encendido) o conductas de errabundeo (fugas)."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 mt-6 border-t border-gray-100 pt-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83E\uDDE0"), " 1. Orientaci\xF3n Espacial y Temporal"), /*#__PURE__*/React.createElement("p", null, "La desorientaci\xF3n temporal (no saber en qu\xE9 d\xEDa, mes o a\xF1o viven, o confundir la noche con el d\xEDa) es uno de los primeros y m\xE1s angustiosos s\xEDntomas."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Relojes de Orientaci\xF3n:"), " Son fundamentales. Sustituye los relojes anal\xF3gicos por pantallas digitales grandes que indiquen expl\xEDcitamente \"Es LUNES por la MA\xD1ANA\". Evita las abreviaturas (nada de \"Lun\" o \"Sep\")."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Luz Natural y Ritmos Circadianos:"), " Mant\xE9n las persianas abiertas durante el d\xEDa y la casa muy iluminada. Al atardecer, cierra persianas y usa luces c\xE1lidas. Esto ayuda a regular el reloj biol\xF3gico y disminuye el \"s\xEDndrome del ocaso\" (agitaci\xF3n vespertina)."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83C\uDFF7\uFE0F"), " 2. Simplificaci\xF3n Visual y Se\xF1al\xE9tica"), /*#__PURE__*/React.createElement("p", null, "El exceso de est\xEDmulos genera agitaci\xF3n. El entorno debe ser lo m\xE1s claro e intuitivo posible."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Contraste de Colores:"), " Utiliza el contraste crom\xE1tico para destacar lo que quieres que vean. Por ejemplo, un plato rojo sobre un mantel blanco ayuda a discriminar la comida (muy \xFAtil si hay problemas de percepci\xF3n de profundidad). Sin embargo, evita alfombras oscuras, ya que pueden percibirlas como \"agujeros\" en el suelo y negarse a pisarlas."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Etiquetado de puertas y cajones:"), " Pon carteles con texto y un dibujo (pictograma) en las puertas importantes (ej: \"BA\xD1O\" con la foto de un retrete). Si abren compulsivamente todos los cajones buscando ropa, pega una foto de calcetines en el caj\xF3n correspondiente."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Camuflaje:"), " Lo que no quieres que vean, esc\xF3ndelo. Pinta la puerta de salida a la calle del mismo color que la pared para evitar las fugas, o cubre los espejos si la persona no reconoce su propio reflejo y se asusta creyendo que hay un extra\xF1o en casa."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDD12"), " 3. Seguridad y Prevenci\xF3n de Riesgos"), /*#__PURE__*/React.createElement("p", null, "La p\xE9rdida del juicio abstracto impide valorar el peligro."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "En la Cocina:"), " Es el lugar de mayor riesgo. Instala detectores de humo y corta\xFAles autom\xE1ticos para el gas o la placa de inducci\xF3n. Retira de la vista objetos punzantes y productos de limpieza t\xF3xicos (gu\xE1rdalos bajo llave)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Prevenci\xF3n de Fugas (Errabundeo):"), " Si hay riesgo de que salgan de casa desorientados, instala cerraduras que no reconozcan o coloca pestillos en la parte muy alta o muy baja de la puerta (fuera de su campo visual habitual). Las alarmas de puerta y los localizadores GPS (en pulseras o plantillas del zapato) proporcionan tranquilidad al cuidador."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Gesti\xF3n de la Medicaci\xF3n:"), " Bajo ning\xFAn concepto la medicaci\xF3n debe estar a su libre disposici\xF3n. Los pastilleros electr\xF3nicos con alarma son ideales para fases iniciales donde viven solos; en fases avanzadas, el cuidador debe custodiar y administrar todas las tomas."))), /*#__PURE__*/React.createElement("div", {
    className: "bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-2xl shadow-sm mt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-purple-800 uppercase tracking-wide text-base"
  }, "El Consejo del Terapeuta Ocupacional")), /*#__PURE__*/React.createElement("p", {
    className: "text-purple-900 italic text-base leading-relaxed"
  }, "\"No intentes corregir constantemente su realidad. Si tu familiar pregunta por su madre (ya fallecida), decirle repetidamente 'Tu madre muri\xF3 hace 20 a\xF1os' solo le causar\xE1 el dolor del duelo una y otra vez. Usa la t\xE9cnica de 'Validaci\xF3n': reconoce su emoci\xF3n ('La echas de menos, \xBFverdad? Era muy buena cocinera') y redirige sutilmente la atenci\xF3n hacia otra actividad agradable en el presente.\""))), /*#__PURE__*/React.createElement("div", {
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
  }, "Las recomendaciones que ves en esta web han sido seleccionadas bajo criterio profesional de Terapia Ocupacional. Al comprar a trav\xE9s de estos enlaces, ayudas a mantener el proyecto IAdapta sin que a ti te cueste ni un c\xE9ntimo m\xE1s.")), /*#__PURE__*/React.createElement("div", {
    className: "mt-16 overflow-hidden rounded-xl bg-gray-50/50 min-h-[100px] flex flex-col items-center justify-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-gray-400 uppercase tracking-widest mb-2"
  }, "Publicidad"), /*#__PURE__*/React.createElement(AdSenseBlock, {
    slot: "9272607554"
  }))))));
};
function App() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Navbar, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement("main", {
    id: "main-content"
  }, /*#__PURE__*/React.createElement(GuiaDemencias, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();