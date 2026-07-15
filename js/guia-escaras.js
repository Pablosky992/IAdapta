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
const GuiaEscaras = function GuiaEscaras() {
  const materials = [{
    name: 'Cojín Antiescaras Viscoelástico',
    desc: 'Espuma con memoria que distribuye el peso de forma uniforme, ideal para prevención en sillas.',
    image: 'cojin_antiescaras.png',
    link: 'https://amzn.to/4fJLTwu',
    query: 'cojin antiescaras viscoelastico'
  }, {
    name: 'Colchón de Aire Alternante',
    desc: 'Sistema con compresor que infla y desinfla celdas para cambiar los puntos de presión continuamente.',
    image: 'colchon_aire.png',
    link: 'https://amzn.to/43yPs1a',
    query: 'colchon antiescaras aire alternante'
  }, {
    name: 'Taloneras Antiescaras',
    desc: 'Protecciones acolchadas para el talón, una de las zonas con mayor riesgo de ulceración en cama.',
    image: 'taloneras_antiescaras.png',
    link: 'https://amzn.to/3S72kcn',
    query: 'talonera antiescaras borreguito'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "pt-36 pb-24 px-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/prevencion_escaras.png",
    alt: "Prevenci\xF3n de Escaras",
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
  }, "Prevenci\xF3n de \xDAlceras por Presi\xF3n (Escaras): Posicionamiento y Cuidado"), /*#__PURE__*/React.createElement("p", null, "Las \xFAlceras por presi\xF3n, com\xFAnmente conocidas como escaras, son lesiones en la piel y los tejidos subyacentes que se producen como consecuencia de una presi\xF3n prolongada, fricci\xF3n o cizallamiento sobre la piel. Generalmente aparecen en las zonas donde el hueso est\xE1 m\xE1s cerca de la piel (prominencias \xF3seas) como los talones, los tobillos, las caderas y el coxis."), /*#__PURE__*/React.createElement("p", null, "Para las personas con movilidad reducida que pasan mucho tiempo en cama o en silla de ruedas, la prevenci\xF3n es vital. Tratar una \xFAlcera una vez que ha aparecido es un proceso largo, doloroso y complejo. Desde la Terapia Ocupacional, el abordaje se centra en el manejo del entorno y el uso de superficies especiales para el manejo de la presi\xF3n (SEMP)."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 mt-6 border-t border-gray-100 pt-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDD04"), " 1. Cambios Posturales: La Base de la Prevenci\xF3n"), /*#__PURE__*/React.createElement("p", null, "Ning\xFAn coj\xEDn o colch\xF3n sustituye la necesidad de realizar cambios posturales peri\xF3dicos. La regla de oro es redistribuir el peso antes de que el tejido sufra isquemia (falta de riego sangu\xEDneo)."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Frecuencia:"), " Para personas encamadas, se recomienda un cambio de postura cada 2-3 horas. Para usuarios de silla de ruedas que no pueden recolocarse de forma aut\xF3noma, deben realizarse descargas de presi\xF3n (inclinando la silla o levantando el peso) cada 15-30 minutos."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Alineaci\xF3n:"), " Durante los cambios, se debe asegurar que el cuerpo mantenga una alineaci\xF3n natural. El uso de almohadas comunes entre las rodillas o bajo las pantorrillas (dejando los talones suspendidos) es una pr\xE1ctica excelente."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDECF\uFE0F"), " 2. Superficies Especiales en la Cama (Colchones Antiescaras)"), /*#__PURE__*/React.createElement("p", null, "Cuando el riesgo es alto, el colch\xF3n habitual no es suficiente para aliviar la presi\xF3n sobre los tejidos blandos."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Colchones de Aire Alternante:"), " Son los m\xE1s eficaces para el domicilio. Consisten en una sobrecolchoneta formada por celdas de aire conectadas a un peque\xF1o compresor silencioso. El motor infla y desinfla filas de celdas de manera alterna, consiguiendo que los puntos de apoyo del cuerpo cambien constantemente sin que la persona tenga que moverse."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Posicionamiento del paciente:"), " Debe colocarse siempre sobre el colch\xF3n de aire solo con la s\xE1bana bajera interpuesta. Evitar poner empapadores gruesos o m\xFAltiples mantas debajo del paciente, ya que esto anula el efecto de alivio de presi\xF3n del colch\xF3n."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83E\uDE91"), " 3. Sedestaci\xF3n Prolongada: El Coj\xEDn Antiescaras"), /*#__PURE__*/React.createElement("p", null, "La posici\xF3n de sentado ejerce una presi\xF3n masiva sobre los isquiones (los huesos de la pelvis sobre los que nos sentamos) y la zona sacra."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Tipos de Cojines:"), /*#__PURE__*/React.createElement("ul", {
    className: "list-circle pl-5 mt-2 space-y-1"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("em", null, "Viscoel\xE1sticos o espuma de poliuretano:"), " Ideales para riesgo bajo-medio. Tienen 'memoria' y se adaptan a la anatom\xEDa del usuario aumentando la superficie de contacto."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("em", null, "Gel o fluidos:"), " Mantienen una temperatura baja y distribuyen bien la presi\xF3n. \xDAtiles para usuarios con control de tronco moderado."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("em", null, "Celdas de aire (tipo Roho):"), " Para riesgo muy alto o cuando ya existe una \xFAlcera. Funcionan por inmersi\xF3n, permitiendo que el paciente \"flote\" sobre las celdas, pero requieren un calibrado exacto de aire."))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDEE1\uFE0F"), " 4. Cuidado de la Piel y Control del Microclima"), /*#__PURE__*/React.createElement("p", null, "La presi\xF3n no es el \xFAnico enemigo; la humedad y el roce son factores de riesgo cr\xEDticos."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Manejo de la humedad:"), " La piel h\xFAmeda por sudoraci\xF3n o incontinencia es extremadamente fr\xE1gil. Se debe mantener la piel limpia e hidratada (pero seca), y utilizar cremas barrera (con \xF3xido de zinc) si hay riesgo de maceraci\xF3n."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Cuidado con el cizallamiento:"), " Al sentar al paciente en la cama, si esta se eleva a m\xE1s de 30 grados, el cuerpo tiende a resbalar hacia los pies. Este deslizamiento estira y rasga los vasos sangu\xEDneos bajo la piel. Para evitarlo, siempre hay que subir primero la secci\xF3n de las piernas de la cama articulada y luego elevar el respaldo."))), /*#__PURE__*/React.createElement("div", {
    className: "bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-emerald-800 uppercase tracking-wide text-base"
  }, "El Consejo del Terapeuta Ocupacional")), /*#__PURE__*/React.createElement("p", {
    className: "text-emerald-900 italic text-base leading-relaxed"
  }, "\"El error m\xE1s com\xFAn y peligroso que vemos en las casas es colocar flotadores o cojines con forma de 'donut' redondo para aliviar la presi\xF3n del coxis. Nunca los utilices. Estos cojines concentran toda la presi\xF3n en el anillo exterior y cortan la circulaci\xF3n sangu\xEDnea hacia el centro, creando un efecto de torniquete que favorece la aparici\xF3n de escaras justo en el agujero central. Utiliza siempre cojines de base completa (cuadrados o anat\xF3micos) de viscoel\xE1stica, gel o aire.\""))), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement(GuiaEscaras, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();