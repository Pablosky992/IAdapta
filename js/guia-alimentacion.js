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
const GuiaAlimentacion = function GuiaAlimentacion() {
  const materials = [{
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
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "pt-36 pb-24 px-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/cubiertos_adaptados.jpg",
    alt: "Alimentaci\xF3n Adaptada",
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
  }, "Alimentaci\xF3n Independiente: Ergonom\xEDa y Autonom\xEDa en la Mesa"), /*#__PURE__*/React.createElement("p", null, "La alimentaci\xF3n es una de las Actividades de la Vida Diaria (AVD) m\xE1s complejas y con mayor carga social. No se trata solo de la nutrici\xF3n, sino de la capacidad de participar de forma digna y aut\xF3noma en un acto cotidiano. Limitaciones en la fuerza de prensi\xF3n, temblores, rangos de movimiento reducidos en el hombro o dificultades en la coordinaci\xF3n ojo-mano pueden convertir la comida en un proceso frustrante y agotador."), /*#__PURE__*/React.createElement("p", null, "Desde la Terapia Ocupacional, el objetivo es compensar estos d\xE9ficits mediante el uso de productos de apoyo y estrategias de econom\xEDa articular."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 mt-6 border-t border-gray-100 pt-6"
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
  }, "\"Si necesitas una adaptaci\xF3n muy espec\xEDfica que no encuentras en el mercado convencional, no descartes las soluciones de bajo coste mediante impresi\xF3n 3D. Actualmente, conocemos dise\xF1os de c\xF3digo abierto para engrosadores, pinzas de sujeci\xF3n y soportes de vasos que se pueden fabricar a medida por una fracci\xF3n del precio de una ortopedia tradicional. Adem\xE1s, un peque\xF1o truco casero: si un plato se resbala y no tienes una base t\xE9cnica, una bayeta h\xFAmeda o una goma el\xE1stica ancha alrededor del vaso pueden mejorar dr\xE1sticamente el agarre y la estabilidad de forma inmediata.\""))), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement(GuiaAlimentacion, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();