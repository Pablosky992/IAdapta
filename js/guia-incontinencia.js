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
const GuiaIncontinencia = function GuiaIncontinencia() {
  const materials = [{
    name: 'Bidé acoplable para inodoro con doble boquilla',
    desc: 'Higiene íntima suave con agua sin transferencias difíciles ni irritación cutánea.',
    image: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T1/images/I/512T5rRH5UL._AC_SL1500_.jpg',
    link: 'https://amzn.to/4yEfVYJ',
    query: 'bide acoplable inodoro agua higiene intima'
  }, {
    name: 'Empapador de cama impermeable y lavable (4 capas)',
    desc: 'Protección absorbente transpirable que evita la humedad prolongada y cuida la piel.',
    image: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T1/images/I/71uYFtQlXLL._AC_SL1500_.jpg',
    link: 'https://amzn.to/4cGvuGE',
    query: 'empapador cama lavable impermeable transpirable cuatro capas'
  }, {
    name: 'Botella urinaria anatómica con válvula antiderrame',
    desc: 'Facilita la micción en cama o sedestación sin riesgo de escapes ni esfuerzo.',
    image: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T1/images/I/41DAiVbkaQL._SL1500_.jpg',
    link: 'https://amzn.to/3VafIOd',
    query: 'botella urinaria con valvula antiderrame ortopedia'
  }, {
    name: 'Cuña higiénica para encamados con asa ergonómica',
    desc: 'Diseño de bajo perfil para colocación sin sobrecargar la espalda del cuidador.',
    image: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T1/images/I/61DTvef9NRL._AC_SL1500_.jpg',
    link: 'https://amzn.to/4dykCLf',
    query: 'cuña orinal encamados plastico resistente ortopedia'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "pt-36 pb-24 px-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/guia_incontinencia.png",
    alt: "Higiene y Manejo de la Incontinencia",
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
  }, "Higiene y Manejo Integral de la Incontinencia"), /*#__PURE__*/React.createElement("p", null, "La incontinencia urinaria y fecal es una de las condiciones con mayor impacto en la calidad de vida, la autoestima y la autonom\xEDa de las personas mayores y en situaci\xF3n de dependencia. Desde la Terapia Ocupacional, el objetivo no es \xFAnicamente \"contener\" el escape mediante absorbentes, sino promover la dignidad, prevenir el deterioro cut\xE1neo (dermatitis asociada a la incontinencia) y facilitar rutinas funcionales de vaciado que simplifiquen la tarea del cuidador sin generar dolor ni sobreesfuerzo."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 mt-6 border-t border-gray-100 pt-6"
  }, /*#__PURE__*/React.createElement("p", null, "A continuaci\xF3n, detallamos las mejores estrategias cl\xEDnicas y productos de apoyo para el manejo del aseo \xEDntimo:"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\u23F0"), " 1. Reentrenamiento y Rutinas de Aseo Programado"), /*#__PURE__*/React.createElement("p", null, "Establecer un patr\xF3n temporal regular reduce dr\xE1sticamente los episodios de incontinencia funcional."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "T\xE9cnica de Micci\xF3n Pautada:"), " Acompa\xF1ar o recordar al usuario acudir al inodoro cada 2 o 3 horas durante el d\xEDa, coincidiendo con momentos clave (al levantarse, tras las comidas y antes de acostarse)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Acceso R\xE1pido y Despejado:"), " Garantizar que el trayecto desde la cama o el sill\xF3n hasta el inodoro est\xE9 totalmente libre de obst\xE1culos para reducir el tiempo de respuesta ante la urgencia miccional."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Ropa de F\xE1cil Desabrochado:"), " Pantalones con cinturilla el\xE1stica o cierres de velcro que permiten un bajado r\xE1pido sin lidiar con cremalleras ni botones dif\xEDciles."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCA7"), " 2. Higiene \xCDntima sin Fricci\xF3n: El Bid\xE9 Acoplable"), /*#__PURE__*/React.createElement("p", null, "La limpieza frecuente con toallitas desechables o papel higi\xE9nico \xE1spero puede desgastar la barrera lip\xEDdica de la piel sensible."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Bid\xE9 Acoplable Mec\xE1nico o El\xE9ctrico:"), " Se instala bajo la tapa del inodoro est\xE1ndar y proyecta un chorro de agua limpia dirigida con presi\xF3n regulable, facilitando una limpieza perfecta sin necesidad de transferir a la persona a la ducha."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Secado por Toques Suaves:"), " Emplear toallas de algod\xF3n suave o papel absorbente aplicando una ligera presi\xF3n sin frotar."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Jabones de pH Neutro o \xC1cido D\xE9bil (5.5):"), " Preservan el manto protector de la piel y reducen la proliferaci\xF3n bacteriana causante de infecciones urinarias."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDECF\uFE0F"), " 3. Protecci\xF3n de Cama y Asientos: Empapadores Transpirables"), /*#__PURE__*/React.createElement("p", null, "El uso de pl\xE1sticos impermeables no transpirables incrementa la sudoraci\xF3n y la maceraci\xF3n de la epidermis."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Empapadores Reutilizables Multicapa:"), " Dise\xF1ados con una capa superior hipoalerg\xE9nica de secado r\xE1pido, un n\xFAcleo absorbente de alta capacidad y una base impermeable pero transpirable con alas laterales para sujetar bajo el colch\xF3n."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Protectores de Sill\xF3n y Silla de Ruedas:"), " Cojines y fundas con barrera hidr\xF3fuga que resguardan el tapizado y se lavan c\xF3modamente a m\xE1quina."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDEE1\uFE0F"), " 4. Evacuaci\xF3n en Cama: Cu\xF1as y Botellas Antiderrame"), /*#__PURE__*/React.createElement("p", null, "Para personas con inmovilidad temporal o reposo prolongado, las ayudas t\xE9cnicas de evacuaci\xF3n evitan transferencias arriesgadas."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Botellas Urinarias con V\xE1lvula Antirretorno:"), " Permiten la micci\xF3n en dec\xFAbito supino o lateral sin que el l\xEDquido retorne aunque la botella se incline accidentalmente."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Cu\xF1as Anat\xF3micas de Perfil Bajo:"), " Facilitan la colocaci\xF3n mediante lateralizaci\xF3n del paciente, reduciendo la fuerza lumbar requerida por el cuidador."))), /*#__PURE__*/React.createElement("div", {
    className: "bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-emerald-800 uppercase tracking-wide text-base"
  }, "El Consejo de la Terapia Ocupacional")), /*#__PURE__*/React.createElement("p", {
    className: "text-emerald-900 italic text-base leading-relaxed"
  }, "\"Nunca restrinjas la ingesta de agua para intentar 'evitar los escapes'. La falta de hidrataci\xF3n concentra la orina, irritando las paredes de la vejiga y aumentando parad\xF3jicamente la frecuencia urinaria y el riesgo de infecciones y desorientaci\xF3n. La clave cl\xEDnica radica en mantener una buena hidrataci\xF3n matutina y reducir los l\xEDquidos 2 horas antes del sue\xF1o nocturno.\""))), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement(GuiaIncontinencia, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();