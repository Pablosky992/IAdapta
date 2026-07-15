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
const GuiaCuidador = function GuiaCuidador() {
  const materials = [{
    name: 'Cinturón de Transferencia',
    desc: 'Proporciona un agarre seguro para ayudar a levantar o caminar a una persona sin tirar de sus brazos o ropa.',
    image: 'assets/cinturon_transferencia.png',
    link: 'https://amzn.to/4y4MAa2',
    query: 'cinturon transferencia paciente'
  }, {
    name: 'Disco Giratorio de Transferencia',
    desc: 'Facilita los giros sobre los pies para pasar de la cama a la silla de ruedas sin forzar las rodillas.',
    image: 'assets/disco_giratorio.png',
    link: 'https://amzn.to/4wsSMY7',
    query: 'disco giratorio transferencia'
  }, {
    name: 'Sábana Deslizante Tubular',
    desc: 'Tejido de muy baja fricción para reposicionar a personas encamadas sin esfuerzo.',
    image: 'assets/sabana_deslizante.png',
    link: 'https://amzn.to/4vLQmUg',
    query: 'sabana tubular deslizante'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "pt-36 pb-24 px-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/guia_cuidador.png",
    alt: "El Cuidado del Cuidador",
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
  }, "El Cuidado del Cuidador: Transferencias y Ergonom\xEDa"), /*#__PURE__*/React.createElement("p", null, "El trabajo de cuidar a una persona en situaci\xF3n de dependencia tiene un peaje f\xEDsico enorme. Las lesiones de espalda (lumbalgias, hernias) son la principal causa de baja o incapacidad entre los cuidadores familiares y profesionales."), /*#__PURE__*/React.createElement("p", null, "En Terapia Ocupacional, ense\xF1amos que ", /*#__PURE__*/React.createElement("strong", null, "nunca se debe levantar el peso muerto de un paciente"), ". El objetivo de esta gu\xEDa es aprender a utilizar ayudas t\xE9cnicas y principios de ergonom\xEDa para proteger tu cuerpo mientras brindas el mejor cuidado posible."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 mt-6 border-t border-gray-100 pt-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\u2696\uFE0F"), " 1. Principios B\xE1sicos de Ergonom\xEDa"), /*#__PURE__*/React.createElement("p", null, "Antes de usar cualquier aparato, tu postura es lo m\xE1s importante."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Base de sustentaci\xF3n amplia:"), " Separa las piernas a la anchura de los hombros. Pon un pie ligeramente m\xE1s adelantado que el otro."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Usa las piernas, no la espalda:"), " Flexiona las rodillas y mant\xE9n la espalda completamente recta. La fuerza para levantar debe venir de los potentes m\xFAsculos de tus muslos, no de tu columna lumbar."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Acerca la carga:"), " Mant\xE9n a la persona lo m\xE1s cerca posible de tu centro de gravedad. Cuanto m\xE1s lejos est\xE9s, m\xE1s palanca haces y m\xE1s sufre tu espalda."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDD04"), " 2. Transferencias de Cama a Silla (y viceversa)"), /*#__PURE__*/React.createElement("p", null, "Las transferencias son el momento de mayor riesgo de ca\xEDda para el paciente y de lesi\xF3n para el cuidador."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "El Cintur\xF3n de Transferencia:"), " Es una banda resistente que se coloca alrededor de la cintura del paciente. Te permite tener puntos de agarre s\xF3lidos (asas) para estabilizar o levantar, en lugar de tirar de los brazos del paciente, lo cual puede dislocarles el hombro."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Discos Giratorios:"), " Si el paciente puede mantenerse de pie pero no puede mover los pies para girar hacia la silla, se colocan sus pies sobre este disco. El cuidador solo tiene que hacer un ligero movimiento para pivotar al paciente 90 grados hacia la silla."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDECF\uFE0F"), " 3. Movilizaciones en la Cama"), /*#__PURE__*/React.createElement("p", null, "Mover a alguien hacia el cabecero de la cama es un esfuerzo brutal si se hace a pulso."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "S\xE1banas Tubulares (Deslizantes):"), " Son tejidos de nailon ultradeslizante con forma de tubo. Al colocarlas bajo el paciente, reducen la fricci\xF3n a cero. Permiten a un solo cuidador deslizar a una persona pesada hacia arriba en la cama con una sola mano y sin esfuerzo."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("em", null, "Importante:"), " Recuerda retirar siempre la s\xE1bana deslizante una vez terminado el movimiento para evitar que el paciente se resbale."))), /*#__PURE__*/React.createElement("div", {
    className: "bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-2xl shadow-sm mt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-amber-800 uppercase tracking-wide text-base"
  }, "El Consejo del Terapeuta Ocupacional")), /*#__PURE__*/React.createElement("p", {
    className: "text-amber-900 italic text-base leading-relaxed"
  }, "\"Si necesitas hacer fuerza pura, est\xE1s haciendo algo mal. Las transferencias deben ser movimientos fluidos basados en el contrapeso y la inercia, no en levantar kilos. Si tu familiar es completamente dependiente, no lo dudes: solicita o adquiere una gr\xFAa de traslado domiciliaria. Tu salud es el pilar que sostiene todo el cuidado.\""))), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement(GuiaCuidador, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();