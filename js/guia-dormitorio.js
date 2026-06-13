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
const GuiaDormitorio = function GuiaDormitorio() {
  const materials = [{
    name: 'Barandilla extensible',
    desc: 'Asidero seguro para facilitar la incorporación y evitar caídas nocturnas.',
    image: 'barandilla_cama.png',
    link: 'https://amzn.to/42hT9Yu',
    query: 'barandilla asidero cama ancianos'
  }, {
    name: 'Trapecio Universal',
    desc: 'Estructura de apoyo superior para facilitar la incorporación y cambios posturales en cama.',
    image: 'trapecio_cama.png',
    link: 'https://amzn.to/3PqiHj4',
    query: 'trapecio incorporador cama'
  }, {
    name: 'Tacos elevadores para patas de cama',
    desc: 'Aumentan la altura de la cama para facilitar levantarse sin esfuerzo articular.',
    image: 'tacos_cama.png',
    link: 'https://amzn.to/4tXN3Zo',
    query: 'tacos elevadores cama'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "pt-36 pb-24 px-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/dormitorio_adaptado.png",
    alt: "Dormitorio Adaptado",
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
  }, "Seguridad en el Dormitorio: Prevenci\xF3n de Ca\xEDdas y Transferencias Eficientes"), /*#__PURE__*/React.createElement("p", null, "El dormitorio debe ser un santuario de descanso, pero para personas con movilidad reducida, procesos postquir\xFArgicos o adultos mayores, puede convertirse en un entorno de riesgo. El tr\xE1nsito nocturno \u2014especialmente los desplazamientos entre la cama y el ba\xF1o\u2014 es uno de los momentos cr\xEDticos debido a factores como la hipotensi\xF3n ortost\xE1tica (mareos al levantarse), la urgencia miccional o la desorientaci\xF3n al despertar."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 mt-6 border-t border-gray-100 pt-6"
  }, /*#__PURE__*/React.createElement("p", null, "Para garantizar un entorno seguro, debemos centrarnos en la adecuaci\xF3n del mobiliario y la optimizaci\xF3n del flujo de movimiento:"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDECF\uFE0F"), " 1. La Ergonom\xEDa de la Cama: Altura y Biomec\xE1nica"), /*#__PURE__*/React.createElement("p", null, "La altura del lecho es el factor determinante para una transferencia segura y aut\xF3noma. Una cama demasiado baja exige un esfuerzo excesivo de los cu\xE1driceps y las articulaciones de la rodilla, aumentando el riesgo de p\xE9rdida de equilibrio."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "La Regla de la Sedestaci\xF3n:"), " La altura ideal debe permitir que, al estar sentado en el borde del colch\xF3n, los pies apoyen totalmente en el suelo mientras las caderas y rodillas mantienen un \xE1ngulo de aproximadamente 90 grados."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Soluciones T\xE9cnicas:"), " Si la cama es baja, el uso de tacos elevadores en las patas es una soluci\xF3n sencilla y estable. En casos de mayor necesidad cl\xEDnica, las camas articuladas con carro elevador permiten regular la altura para facilitar tanto la entrada/salida como la asistencia del cuidador."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCA1"), " 2. Iluminaci\xF3n Inteligente y Accesibilidad"), /*#__PURE__*/React.createElement("p", null, "La falta de visibilidad es la causa directa de la mayor\xEDa de los tropiezos nocturnos. El objetivo es eliminar la \"ceguera moment\xE1nea\" al despertar."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Control al Alcance de la Mano:"), " Los interruptores principales deben ser accesibles desde la posici\xF3n de tumbado, evitando que el usuario deba incorporarse a ciegas para encender la luz."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sistemas Automatizados:"), " La instalaci\xF3n de sensores de movimiento que activen una luz tenue de cortes\xEDa es altamente eficaz. Esta luz debe ser indirecta y de tono c\xE1lido para no deslumbrar ni alterar el ciclo del sue\xF1o, pero lo suficientemente clara para identificar obst\xE1culos."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83E\uDDBE"), " 3. Productos de Apoyo para la Movilidad en Cama"), /*#__PURE__*/React.createElement("p", null, "Las transferencias no solo ocurren de la cama al suelo, sino tambi\xE9n dentro del propio colch\xF3n (giros y cambios posturales)."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Asideros de Incorporaci\xF3n:"), " A diferencia de las barandillas completas (que pueden ser restrictivas), los asideros o barandillas de transferencia cortos proporcionan un punto de palanca firme y seguro. Estos dispositivos fomentan la independencia al permitir que el usuario use la fuerza de sus miembros superiores para pivotar o impulsarse hacia la bipedestaci\xF3n."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Fijaci\xF3n Estructural:"), " Es vital que estos productos cuenten con sistemas de anclaje de seguridad bajo el colch\xF3n o cinchas de sujeci\xF3n al somier para evitar desplazamientos accidentales durante el uso."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDEB6"), " 4. Organizaci\xF3n del Entorno y Despeje de V\xEDas"), /*#__PURE__*/React.createElement("p", null, "Un dormitorio seguro es un dormitorio libre de obst\xE1culos. La planificaci\xF3n del espacio es tan importante como el mobiliario."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Rutas de Paso:"), " Se debe garantizar un pasillo despejado de al menos 80-90 cm alrededor de la cama para permitir el uso de andadores o sillas de ruedas si fuera necesario."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Calzado Adecuado:"), " El uso de calzado con sujeci\xF3n posterior (no chanclas) y suela antideslizante es indispensable para asegurar el agarre en el momento de tomar contacto con el suelo."))), /*#__PURE__*/React.createElement("div", {
    className: "bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-emerald-800 uppercase tracking-wide text-base"
  }, "El Consejo del Terapeuta Ocupacional")), /*#__PURE__*/React.createElement("p", {
    className: "text-emerald-900 italic text-base leading-relaxed"
  }, "\"El mayor enemigo de la seguridad en el dormitorio son las alfombras decorativas; el riesgo de tropiezo o deslizamiento es extremadamente alto, por lo que recomendamos retirarlas por completo de las zonas de paso. Para optimizar la seguridad, instala una tira de luz LED con sensor de movimiento bajo la estructura de la cama. Al detectar que el usuario baja los pies, iluminar\xE1 suavemente el suelo y las zapatillas, guiando el camino hacia el ba\xF1o sin necesidad de buscar interruptores y evitando deslumbramientos que puedan causar desorientaci\xF3n.\""))), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement(GuiaDormitorio, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();