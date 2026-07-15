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
const GuiaVestido = function GuiaVestido() {
  const materials = [{
    name: 'Calzador de Mango Largo',
    desc: 'Permite ponerse los zapatos sin necesidad de agacharse o flexionar la cadera.',
    image: 'assets/calzador_largo.png',
    link: 'https://amzn.to/44ccKdr',
    query: 'calzador mango largo metalico'
  }, {
    name: 'Pone-calcetines (Calcetinero)',
    desc: 'Dispositivo para deslizar el calcetín por el pie tirando de unas cintas, ideal post-cirugía.',
    image: 'assets/pone_calcetines.png',
    link: 'https://amzn.to/3QCeZDT',
    query: 'pone calcetines medias'
  }, {
    name: 'Abotonador con Mango Grueso',
    desc: 'Permite abrochar botones pequeños usando una sola mano o compensando la falta de movilidad en los dedos.',
    image: 'assets/abotonador.png',
    link: 'https://amzn.to/4eXYry7',
    query: 'abotonador mango grueso artrosis'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "pt-36 pb-24 px-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/guia_vestido.png",
    alt: "Vestido y Calzado Independiente",
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
  }, "Vestido y Calzado: Autonom\xEDa frente a las Limitaciones Articulares"), /*#__PURE__*/React.createElement("p", null, "Vestirse es una Actividad B\xE1sica de la Vida Diaria (ABVD) fundamental para la autoestima. Sin embargo, puede convertirse en un reto inmenso cuando existen problemas para agacharse (artrosis de cadera, pr\xF3tesis, lumbalgias) o falta de destreza en las manos (artritis reumatoide, hemiplejia, Parkinson)."), /*#__PURE__*/React.createElement("p", null, "Desde la Terapia Ocupacional, el abordaje se divide en dos estrategias: modificar las prendas para que sean m\xE1s f\xE1ciles de poner, y utilizar productos de apoyo (ayudas t\xE9cnicas) que compensen la limitaci\xF3n f\xEDsica."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 mt-6 border-t border-gray-100 pt-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDC56"), " 1. Vestido del Tren Inferior (Pantalones y Calcetines)"), /*#__PURE__*/React.createElement("p", null, "Alcanzar los pies es el mayor desaf\xEDo. La regla principal para quienes no pueden flexionar la cadera m\xE1s de 90 grados es utilizar herramientas de largo alcance."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "El Pone-calcetines o Pone-medias:"), " Es un canal de pl\xE1stico flexible donde se encaja el calcet\xEDn. El usuario lo deja caer al suelo sujeto por unas cintas largas, introduce el pie y tira hacia arriba. El calcet\xEDn queda puesto sin necesidad de encorvar la espalda."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Pinza de largo alcance:"), " Permite enganchar la cinturilla del pantal\xF3n o ropa interior desde el suelo para subirla hasta las rodillas, momento en el que las manos ya pueden alcanzarla sin peligro."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDC5E"), " 2. Calzado Adaptado y Sistemas de Cierre"), /*#__PURE__*/React.createElement("p", null, "Atarse los cordones requiere motricidad fina, buena visi\xF3n y flexi\xF3n de tronco. Si falla alguna, debemos adaptar el zapato."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Cordones el\xE1sticos (rizados o con tanca):"), " Transforman unas deportivas de cordones en un zapato que cede al meter el pie y luego ajusta perfectamente sin tener que hacer lazos."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Calzadores de mango extra largo (60-80cm):"), " Fundamentales. Evitan pisotear el contrafuerte del zapato y permiten calzarse estando sentado con la espalda recta o incluso de pie."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Zapatos con cierres de Velcro:"), " Siempre que sea posible, optar por cierres de gancho y bucle (velcro) amplios y f\xE1ciles de asir."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDC55"), " 3. Vestido del Tren Superior (Camisas y Botones)"), /*#__PURE__*/React.createElement("p", null, "Las restricciones en el movimiento de los hombros o el dolor en los dedos complican ponerse chaquetas y abrochar botones."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "T\xE9cnica de vestido en hemiplejia:"), " La regla de oro es \"el brazo afecto entra el primero y sale el \xFAltimo\". Es decir, al ponerse una camisa, se introduce primero la manga del lado paralizado o dolorido usando la mano sana. Al desvestirse, se saca primero el lado sano."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Abotonadores:"), " Un mango grueso con un lazo de alambre en la punta. Se pasa el alambre por el ojal, se engancha el bot\xF3n y se tira. Permite abrochar camisas con una sola mano o con dedos con artrosis."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Adaptaci\xF3n de ropa:"), " Sustituir botones por imanes ocultos (cierres magn\xE9ticos) o coser velcros bajo los botones originales, manteniendo la est\xE9tica de la prenda pero haci\xE9ndola facil\xEDsima de cerrar."))), /*#__PURE__*/React.createElement("div", {
    className: "bg-sky-50 border-l-4 border-sky-500 p-6 rounded-r-2xl shadow-sm mt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-sky-800 uppercase tracking-wide text-base"
  }, "El Consejo del Terapeuta Ocupacional")), /*#__PURE__*/React.createElement("p", {
    className: "text-sky-900 italic text-base leading-relaxed"
  }, "\"Simplifica el armario. En fases donde la energ\xEDa es limitada, vestir prendas de punto suave, cinturillas el\xE1sticas (sin botones ni cremalleras) y zapatos slip-on puede significar la diferencia entre necesitar la ayuda de un cuidador cada ma\xF1ana o poder mantener la autonom\xEDa personal total en el dormitorio.\""))), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement(GuiaVestido, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();