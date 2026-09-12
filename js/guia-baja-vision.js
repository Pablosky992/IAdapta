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
const GuiaBajaVision = function GuiaBajaVision() {
  const materials = [{
    name: 'Lupa de lectura con 30 aumentos y 18 luces LED',
    desc: 'Proporciona aumento uniforme y luz fría de alto contraste para lectura y medicación.',
    image: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T1/images/I/61yGmfAFUGL._AC_SL1500_.jpg',
    link: 'https://amzn.to/4r4JXC4',
    query: 'lupa lectura alta potencia luz led aumentos personas mayores'
  }, {
    name: 'Reloj de Orientación y Números Grandes',
    desc: 'Pantalla de alto contraste con dígitos gigantes que facilita la lectura horaria sin forzar la vista.',
    image: 'assets/reloj_orientacion.png',
    link: 'https://amzn.to/4wJVzML',
    query: 'reloj orientacion numeros grandes mayores'
  }, {
    name: 'Teléfono fijo con teclas gigantes y teclas fotográficas',
    desc: 'Marcación directa intuitiva sin necesidad de forzar la vista ni memorizar números.',
    image: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T1/images/I/71YIFf0h1yL._AC_SL1500_.jpg',
    link: 'https://amzn.to/4xwVRGM',
    query: 'telefono fijo teclas grandes fotos ancianos baja vision'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "pt-36 pb-24 px-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/guia_baja_vision.png",
    alt: "Adaptaciones para Baja Visi\xF3n y Accesibilidad Sensorial",
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
  }, "Adaptaciones para Baja Visi\xF3n y Accesibilidad Sensorial"), /*#__PURE__*/React.createElement("p", null, "Patolog\xEDas oculares comunes en el adulto mayor como la degeneraci\xF3n macular asociada a la edad (DMAE), el glaucoma, la retinopat\xEDa diab\xE9tica o las cataratas reducen sensiblemente la agudeza visual, la sensibilidad al contraste y el campo visual perif\xE9rico. Desde la Terapia Ocupacional, intervenimos en el entorno adaptando la iluminaci\xF3n, maximizando el contraste crom\xE1tico, integrando macrotipos y recurriendo a la estimulaci\xF3n h\xE1ptica y auditiva para que la persona mantenga su total autonom\xEDa en las actividades de la vida diaria."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 mt-6 border-t border-gray-100 pt-6"
  }, /*#__PURE__*/React.createElement("p", null, "A continuaci\xF3n, detallamos las adaptaciones clave para un entorno dom\xE9stico accesible para personas con d\xE9ficit visual:"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83C\uDFA8"), " 1. El Principio del Alto Contraste Crom\xE1tico"), /*#__PURE__*/React.createElement("p", null, "La p\xE9rdida de sensibilidad al contraste hace que los objetos del mismo tono se fusionen en un plano confuso."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Contraste en la Mesa:"), " Utilizar vajilla de color oscuro (azul marino o rojo) sobre manteles blancos o viceversa. Esto permite delimitar con claridad el contorno del plato y la cantidad de comida servida."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Delimitaci\xF3n de Puertas e Interruptores:"), " Colocar marcos o embellecedores de interruptor de color oscuro sobre paredes claras facilita su localizaci\xF3n r\xE1pida sin tanteos."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Bordes de Escalones y Rodapi\xE9s:"), " Franjas amarillas o negras de 5 cm de ancho en el canto de cada pelda\xF1o alertan del cambio de plano y previenen tropiezos catastr\xF3ficos."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCA1"), " 2. Iluminaci\xF3n Estrat\xE9gica sin Deslumbramiento"), /*#__PURE__*/React.createElement("p", null, "Una luz excesiva o mal dirigida genera reflejos dolorosos y reduce a\xFAn m\xE1s la visi\xF3n funcional."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Iluminaci\xF3n de Tareas Focalizada:"), " Emplear flexos o l\xE1mparas de brazo articulado con bombillas LED de temperatura neutra/fr\xEDa (4000K-5000K), orientando el haz directamente sobre el libro, la tabla de corte o el costurero, por debajo de la altura de los ojos."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Eliminaci\xF3n de Sombras y Deslumbramientos:"), " Evitar suelos excesivamente encerados o brillantes que reflejen la luz solar directa, utilizando cortinas trasl\xFAcidas que difuminen la claridad exterior."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Luces de Gu\xEDa Nocturna:"), " Balizas LED de paso bajo consumo que proporcionan referencia espacial en pasillos y aseos."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDD0D"), " 3. Ayudas \xD3pticas, Macrotipos y Tecnolog\xEDa Adaptada"), /*#__PURE__*/React.createElement("p", null, "Facilitar el acceso a la lectura de etiquetas, prospectos m\xE9dicos y comunicaci\xF3n personal."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Lupas con Iluminaci\xF3n Incorporada:"), " Lupas de mano con aumentos \xF3pticos de 3x a 30x y luz LED perimetral que compensan la p\xE9rdida de agudeza en la f\xF3vea."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Teclados y Tel\xE9fonos de Macrotipos:"), " Teclas grandes de 2x2 cm con n\xFAmeros grabados en alto contraste (amarillo sobre negro o blanco sobre negro) y volumen amplificado."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Pastilleros Semanales Gigantes con Relieve:"), " Compartimentos sobredimensionados con serigraf\xEDa en letras gigantes y c\xF3digo Braille o t\xE1ctil."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDD18"), " 4. Marcadores T\xE1ctiles y Organizaci\xF3n H\xE1ptica"), /*#__PURE__*/React.createElement("p", null, "El tacto compensa de forma extraordinaria la disminuci\xF3n de la capacidad visual."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Puntos de Silicona en Relieve (Bump Dots):"), " Peque\xF1as gotas adhesivas transparentes o de color que se pegan sobre los programas m\xE1s utilizados del microondas, la lavadora o el dial del termostato."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Criterio de Orden Fijo:"), " Mantener los objetos de aseo, cubiertos y ropa siempre en la misma posici\xF3n dentro de cajones compartimentados para evitar b\xFAsquedas visuales frustrantes."))), /*#__PURE__*/React.createElement("div", {
    className: "bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-emerald-800 uppercase tracking-wide text-base"
  }, "El Consejo de la Terapia Ocupacional")), /*#__PURE__*/React.createElement("p", {
    className: "text-emerald-900 italic text-base leading-relaxed"
  }, "\"En la baja visi\xF3n, iluminar m\xE1s no siempre significa ver mejor. La luz directa sobre los ojos provoca un 'velo de deslumbramiento' que anula la visi\xF3n residual. Sit\xFAa siempre la fuente de luz detr\xE1s o a un lado del hombro del usuario, nunca enfrente de su campo visual, y prioriza el contraste crom\xE1tico antes que el aumento de vatios.\""))), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement(GuiaBajaVision, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();