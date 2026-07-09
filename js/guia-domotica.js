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
const GuiaDomotica = function GuiaDomotica() {
  const materials = [{
    name: 'Controlador Inteligente (Alexa)',
    desc: 'El cerebro de la casa adaptada. Permite controlar luces, llamar a emergencias o escuchar la radio solo con la voz.',
    image: 'assets/alexa_altavoz.png',
    link: 'https://amzn.to/4eJQqy3',
    query: 'altavoz inteligente alexa echo'
  }, {
    name: 'Enchufe Inteligente con Control Remoto',
    desc: 'Convierten cualquier lámpara o radiador antiguo en un dispositivo que se puede encender con la voz o desde el móvil.',
    image: 'assets/enchufe_inteligente.png',
    link: 'https://amzn.to/3QWndGL',
    query: 'enchufe inteligente wifi'
  }, {
    name: 'Teléfono Móvil para Mayores',
    desc: 'Interfaz simplificada, volumen alto, números grandes y botón de emergencia en la parte trasera conectado a los familiares.',
    image: 'assets/movil_mayores.png',
    link: 'https://amzn.to/4vQ7mZG',
    query: 'telefono movil mayores boton sos'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "pt-36 pb-24 px-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/guia_domotica.png",
    alt: "Hogar Inteligente y Accesibilidad Digital",
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
  }, "Accesibilidad Digital y Dom\xF3tica: El Hogar Inteligente"), /*#__PURE__*/React.createElement("p", null, "La tecnolog\xEDa ha democratizado la accesibilidad. Lo que hace unos a\xF1os requer\xEDa obras millonarias para domotizar una casa, hoy se puede conseguir por menos de cien euros comprando dispositivos de consumo general en cualquier tienda de electr\xF3nica."), /*#__PURE__*/React.createElement("p", null, "Para las personas con movilidad severamente reducida (lesi\xF3n medular, ELA) o para personas mayores que viven solas, la dom\xF3tica b\xE1sica no es un lujo, es una herramienta fundamental que les devuelve el control sobre su entorno y proporciona seguridad a sus familias."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 mt-6 border-t border-gray-100 pt-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDDE3\uFE0F"), " 1. El Control por Voz: Tu Nuevo Mando a Distancia Universal"), /*#__PURE__*/React.createElement("p", null, "El teclado y el rat\xF3n requieren motricidad fina; los interruptores de la pared requieren movilidad y bipedestaci\xF3n. La voz, en cambio, es la interfaz m\xE1s accesible que existe."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Asistentes Virtuales (Alexa, Google Assistant, Siri):"), " Configurar altavoces inteligentes distribuidos por la casa permite a la persona realizar tareas complejas sin moverse: \"Enciende la luz del pasillo\", \"Llama a mi hija\", \"Pon la radio\", \"Recu\xE9rdame tomar la pastilla a las 8\"."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Llamadas y Mensajer\xEDa:"), " Los dispositivos con pantalla (como el Echo Show) permiten hacer videollamadas autom\xE1ticas (la persona no tiene ni que tocar la pantalla para descolgar, ideal para comprobar c\xF3mo est\xE1n)."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDD0C"), " 2. Automatizaci\xF3n Econ\xF3mica"), /*#__PURE__*/React.createElement("p", null, "No necesitas tirar los electrodom\xE9sticos viejos para tener una casa inteligente."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Enchufes y Bombillas Inteligentes:"), " Un enchufe inteligente se interpone entre el aparato (una estufa, un ventilador, una l\xE1mpara antigua) y el enchufe de la pared. A partir de ah\xED, puedes encender y apagar ese aparato con la voz o programarlo desde el m\xF3vil (ej. \"Que se encienda el radiador media hora antes de levantarme\")."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Mandos a distancia por infrarrojos WiFi:"), " Peque\xF1os aparatos que copian la se\xF1al del mando de la tele o el aire acondicionado, permiti\xE9ndote controlar estos dispositivos no inteligentes mediante comandos de voz (\"Sube el volumen de la tele\", \"Pon Telecinco\")."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCF1"), " 3. Comunicaci\xF3n y Emergencias (Teleasistencia)"), /*#__PURE__*/React.createElement("p", null, "La tranquilidad de saber que la persona puede pedir ayuda si se cae estando sola en casa no tiene precio."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Tel\xE9fonos Adaptados:"), " Existen smartphones dise\xF1ados espec\xEDficamente para mayores. Tienen una interfaz de iconos gigantes y, sobre todo, un gran bot\xF3n f\xEDsico de SOS en la parte trasera. Al pulsarlo, el tel\xE9fono llama secuencialmente a una lista de contactos predefinida hasta que alguien descuelga, y env\xEDa un SMS con las coordenadas GPS."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Relojes Inteligentes (Smartwatches) con detecci\xF3n de ca\xEDdas:"), " Si la persona sufre un desmayo o tropiezo brusco y no se mueve en los siguientes segundos, el reloj llama autom\xE1ticamente a emergencias (112) y a los familiares, sin que la persona tenga que pulsar nada."))), /*#__PURE__*/React.createElement("div", {
    className: "bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-2xl shadow-sm mt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-indigo-800 uppercase tracking-wide text-base"
  }, "El Consejo del Terapeuta Ocupacional")), /*#__PURE__*/React.createElement("p", {
    className: "text-indigo-900 italic text-base leading-relaxed"
  }, "\"No abrumes a la persona mayor con un m\xF3vil de \xFAltima generaci\xF3n lleno de aplicaciones que no va a usar. Config\xFArale el m\xF3vil borrando (o escondiendo) TODO excepto las llamadas, los mensajes y la c\xE1mara. El miedo a 'romper' la tecnolog\xEDa desaparece cuando la interfaz es limpia y los iconos son grandes.\""))), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement(GuiaDomotica, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();