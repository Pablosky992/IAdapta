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
const GuiaBano = function GuiaBano() {
  const materials = [{
    name: 'Tabla de bañera',
    desc: 'Permite sentarse y girar las piernas hacia el interior de forma segura sin obras.',
    image: 'tabla_banera.png',
    link: 'https://amzn.to/4uLnkU5',
    query: 'tabla bañera ortopedia'
  }, {
    name: 'Asiento giratorio para bañera',
    desc: 'Permite entrar y salir de la bañera cómodamente sin levantar las piernas.',
    image: 'asiento_banera.png',
    link: 'https://amzn.to/4d3bjlv',
    query: 'asiento giratorio bañera ortopedia'
  }, {
    name: 'Asiento para ducha',
    desc: 'Banqueta estable con conteras antideslizantes para una higiene segura.',
    image: 'asiento_ducha.png',
    link: 'https://amzn.to/4dfjkUJ',
    query: 'asiento ducha banqueta ortopedia'
  }, {
    name: 'Elevador de inodoro con reposabrazos',
    desc: 'Aumenta la altura del WC y da soporte firme al levantarse o sentarse.',
    image: 'alza_wc.png',
    link: 'https://amzn.to/42hlsWU',
    query: 'elevador inodoro con reposabrazos'
  }, {
    name: 'Agarraderas / Barras de apoyo',
    desc: 'Asideros de pared imprescindibles para prevenir caídas en la ducha.',
    image: 'barras_apoyo.png',
    link: 'https://amzn.to/4u4JBw3',
    query: 'asidero barra apoyo baño'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "pt-36 pb-24 px-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/banyo_adaptado.png",
    alt: "Ba\xF1o Adaptado",
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
  }, "Adaptaci\xF3n integral del cuarto de ba\xF1o"), /*#__PURE__*/React.createElement("p", null, "El cuarto de ba\xF1o es, estad\xEDsticamente, la estancia del hogar con mayor \xEDndice de ca\xEDdas y accidentes dom\xE9sticos. Sin embargo, m\xE1s all\xE1 de la seguridad f\xEDsica, es el espacio donde la preservaci\xF3n de la intimidad y la autonom\xEDa personal cobran su valor m\xE1s alto. Desde la perspectiva de la Terapia Ocupacional, entendemos que una adaptaci\xF3n exitosa no siempre requiere obras de gran envergadura; la clave reside en el dise\xF1o centrado en el usuario y en el an\xE1lisis minucioso de la secuencia de movimientos durante el aseo personal."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 mt-6 border-t border-gray-100 pt-6"
  }, /*#__PURE__*/React.createElement("p", null, "A continuaci\xF3n, detallamos los pilares fundamentales para transformar el ba\xF1o en un entorno facilitador:"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDEBF"), " 1. Eliminaci\xF3n de Barreras: Del Plato de Ducha a la Adaptaci\xF3n sin Obras"), /*#__PURE__*/React.createElement("p", null, "Sustituir la ba\xF1era por un plato de ducha extraplano es la intervenci\xF3n m\xE1s eficaz para eliminar el obst\xE1culo arquitect\xF3nico m\xE1s limitante del hogar. Sin embargo, cuando la reforma estructural no es viable por motivos econ\xF3micos o de vivienda, existen soluciones t\xE9cnicas de alta eficacia."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Acceso Universal y Seguridad:"), " Al instalar un plato a ras de suelo, se eliminan los tropiezos y se permite el acceso de ayudas t\xE9cnicas como sillas de ducha con ruedas. La ausencia de escalones es la clave para una entrada y salida fluida."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "La Alternativa sin Obras: Tabla de Ba\xF1era:"), " Si la sustituci\xF3n de la ba\xF1era no es posible, la tabla de ba\xF1era es el producto de apoyo por excelencia."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Funcionalidad:"), " Se encaja firmemente sobre los bordes de la ba\xF1era, permitiendo que el usuario se siente desde fuera y gire las piernas hacia el interior de forma controlada y segura."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83E\uDDBE"), " 2. Soporte Estructural: Barras de Apoyo Estrat\xE9gicas"), /*#__PURE__*/React.createElement("p", null, "Las barras no son simples asideros; son herramientas biomec\xE1nicas que ayudan a distribuir el esfuerzo muscular y compensar d\xE9ficits de equilibrio."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Distribuci\xF3n Funcional:"), " Barra Vertical imprescindible en la entrada de la zona de ducha para facilitar el equilibrio durante el traspaso de pesos."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Barra Horizontal u Oblicua:"), " Situada a la altura \xF3ptima del usuario para asistir en el paso de sedestaci\xF3n a bipedestaci\xF3n (levantarse y sentarse), ya sea en el inodoro o en el asiento de ducha."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Fijaci\xF3n de Seguridad:"), " Se recomienda siempre el anclaje mediante taladro a la pared estructural. Las barras de ventosa pueden ser \xFAtiles para viajes, pero no ofrecen la estabilidad necesaria para un uso domiciliario seguro ante una carga de peso s\xFAbita."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDEBD"), " 3. Ergonom\xEDa y Biomec\xE1nica del Inodoro"), /*#__PURE__*/React.createElement("p", null, "La altura est\xE1ndar de un inodoro suele ser insuficiente para personas con movilidad reducida o patolog\xEDas articulares en miembros inferiores."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "La Regla de los 90 Grados:"), " Para que la transici\xF3n de sentado a pie sea eficiente y con el m\xEDnimo desgaste articular, la altura del asiento debe permitir que las rodillas y las caderas formen un \xE1ngulo recto, con los pies firmemente apoyados."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Soluciones Adaptables:"), " Dependiendo de la necesidad, se puede optar por elevadores de inodoro, inodoros de altura especial o la instalaci\xF3n de modelos suspendidos que permiten regular la altura de montaje."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDEB0"), " 4. Grifer\xEDa y Accesorios de F\xE1cil Alcance"), /*#__PURE__*/React.createElement("p", null, "La funcionalidad tambi\xE9n reside en los peque\xF1os detalles que facilitan la destreza motora fina."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Mecanismos de Palanca:"), " Sustituir los grifos de rosca por modelos monomando de palanca larga facilita el control del caudal y la temperatura, especialmente en personas con artritis o debilidad en el agarre."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sistemas Termost\xE1ticos:"), " Estos evitan cambios bruscos de temperatura, previniendo quemaduras accidentales, un factor cr\xEDtico en personas con sensibilidad t\xE9rmica alterada."))), /*#__PURE__*/React.createElement("div", {
    className: "bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-emerald-800 uppercase tracking-wide text-base"
  }, "El Consejo de la Terapia Ocupacional")), /*#__PURE__*/React.createElement("p", {
    className: "text-emerald-900 italic text-base leading-relaxed"
  }, "\"La seguridad no termina al cerrar el grifo. Es fundamental que la alfombrilla antideslizante exterior sea de base estable y cubra toda la zona de apoyo de los pies al salir de la ducha. Asimismo, en casos de d\xE9ficit visual o deterioro cognitivo, es vital que las barras de apoyo tengan un contraste crom\xE1tico fuerte con el azulejo (por ejemplo, barras de color oscuro sobre pared blanca) para facilitar su localizaci\xF3n inmediata y segura.\""))), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement(GuiaBano, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();