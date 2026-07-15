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
const GuiaOcio = function GuiaOcio() {
  const materials = [{
    name: 'Lupa de Lectura con Luz LED',
    desc: 'Lupa de gran tamaño, ideal para degeneración macular, que se apoya sobre el texto e ilumina la página.',
    image: '',
    link: 'https://amzn.to/4p8zeWA',
    query: 'lupa lectura luz led grande'
  }, {
    name: 'Sujeta-cartas Curvo de Madera',
    desc: 'Permite jugar a las cartas a personas con hemiplejia, artritis o que solo pueden usar una mano.',
    image: '',
    link: 'https://amzn.to/4gDQ9y3',
    query: 'sujeta cartas soporte madera'
  }, {
    name: 'Enhebrador Automático de Agujas',
    desc: 'Para amantes de la costura con temblores o pérdida de visión, inserta el hilo en la aguja al pulsar un botón.',
    image: '',
    link: 'https://amzn.to/4wth44g',
    query: 'enhebrador agujas automatico'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "pt-36 pb-24 px-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/guia_ocio.png",
    alt: "Ocio y Tiempo Libre Adaptado",
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
  }, "Ocio, Pasatiempos y Tiempo Libre Adaptado"), /*#__PURE__*/React.createElement("p", null, "La Terapia Ocupacional no trata solo de sobrevivir (comer, vestirse, asearse). Trata de ", /*#__PURE__*/React.createElement("strong", null, "vivir"), ". El ocio y los hobbies son el motor de la motivaci\xF3n, la participaci\xF3n social y la salud mental. Abandonar un hobby por culpa de la artrosis, el Parkinson o la p\xE9rdida visual acelera el declive cognitivo y conduce al aislamiento y la depresi\xF3n."), /*#__PURE__*/React.createElement("p", null, "Afortunadamente, el mercado actual ofrece productos de apoyo ingeniosos para casi cualquier afici\xF3n, permitiendo adaptar la actividad para que la persona pueda seguir disfrutando de sus pasiones."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 mt-6 border-t border-gray-100 pt-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCD6"), " 1. Lectura y Baja Visi\xF3n"), /*#__PURE__*/React.createElement("p", null, "La presbicia (vista cansada), las cataratas o la Degeneraci\xF3n Macular Asociada a la Edad (DMAE) dificultan disfrutar de un buen libro o incluso leer el peri\xF3dico."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Lupas de Lectura y Atriles:"), " Las lupas tipo c\xFApula (dome magnifiers) se deslizan directamente sobre la p\xE1gina sin tener que sostenerlas a pulso. Las lupas de cuello o pecho dejan las manos libres para coser o hacer manualidades. Las que incluyen luz LED incorporada aumentan dr\xE1sticamente el contraste de las letras negras sobre el papel."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Audiolibros y Lectores Digitales:"), " Los dispositivos como el Kindle permiten aumentar el tama\xF1o de la letra y cambiar la tipograf\xEDa (existen fuentes espec\xEDficas para dislexia). Para p\xE9rdida visual severa, los audiolibros o usar altavoces inteligentes (\"Alexa, l\xE9eme mi libro\") son la soluci\xF3n perfecta."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83C\uDCCF"), " 2. Juegos de Mesa y Socializaci\xF3n"), /*#__PURE__*/React.createElement("p", null, "Las partidas de cartas o de domin\xF3 son vitales para la estimulaci\xF3n cognitiva y social de los mayores."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sujeta-cartas:"), " Si la persona ha sufrido un ictus (hemiplejia) o tiene artritis severa en las manos, no puede sujetar las cartas en abanico. Un soporte de madera curvo sobre la mesa soluciona el problema, permiti\xE9ndole ver sus cartas de forma privada y jugar usando su mano h\xE1bil."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Juegos Macrotipo:"), " Existen barajas de cartas de p\xF3ker o espa\xF1ola, as\xED como fichas de domin\xF3 y tableros de parch\xEDs en tama\xF1o XL. Sus n\xFAmeros e \xEDndices gigantes permiten jugar sin forzar la vista."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83E\uDDF6"), " 3. Costura, Manualidades y Jardiner\xEDa"), /*#__PURE__*/React.createElement("p", null, "Las actividades que requieren pinza fina y fuerza de agarre."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Enhebradores y Lupas de Costura:"), " Para quienes se niegan a dejar el punto o la costura, los enhebradores autom\xE1ticos y los dedales de silicona evitan la frustraci\xF3n de no atinar con el hilo."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Herramientas Ergon\xF3micas de Jard\xEDn:"), " Palas y rastrillos con mangos angulados (a 90 grados respecto a la herramienta) permiten mantener la mu\xF1eca en posici\xF3n neutra, evitando el dolor por tendinitis o t\xFAnel carpiano al cuidar las plantas."))), /*#__PURE__*/React.createElement("div", {
    className: "bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-2xl shadow-sm mt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-orange-800 uppercase tracking-wide text-base"
  }, "El Consejo del Terapeuta Ocupacional")), /*#__PURE__*/React.createElement("p", {
    className: "text-orange-900 italic text-base leading-relaxed"
  }, "\"No te conformes con el 'ya estoy viejo para esto'. Detr\xE1s de cada abandono de una actividad suele haber un problema f\xEDsico o sensorial que tiene adaptaci\xF3n. Pregunta siempre '\xBFPor qu\xE9 has dejado de hacerlo?' y busca la ayuda t\xE9cnica espec\xEDfica para suplir esa barrera. Mantener la ocupaci\xF3n es mantener la vida.\""))), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement(GuiaOcio, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();