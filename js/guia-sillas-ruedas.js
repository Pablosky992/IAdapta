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
const GuiaSillasRuedas = function GuiaSillasRuedas() {
  const materials = [];
  return /*#__PURE__*/React.createElement("section", {
    className: "pt-36 pb-24 px-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/silla_activa.png",
    alt: "Sillas de Ruedas",
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
  }, "Sillas de Ruedas: Gu\xEDa de Selecci\xF3n y Funcionalidad"), /*#__PURE__*/React.createElement("p", null, "La silla de ruedas no debe entenderse como una limitaci\xF3n, sino como una herramienta de libertad y participaci\xF3n social. Una elecci\xF3n adecuada, basada en las capacidades residuales del usuario y las demandas de su entorno, es la diferencia entre el aislamiento y la independencia."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 mt-6 border-t border-gray-100 pt-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\u26A1"), " 1. Sillas de Ruedas Manuales y Activas"), /*#__PURE__*/React.createElement("p", null, "La propulsi\xF3n manual requiere una evaluaci\xF3n precisa de la fuerza en miembros superiores y la estabilidad del tronco."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sillas Manuales Est\xE1ndar:"), " Dise\xF1adas para un uso ocasional o de transporte. Suelen ser m\xE1s pesadas y menos ajustables, enfocadas en la durabilidad y la facilidad de plegado para acompa\xF1antes."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sillas Activas (Ultraligeras):"), " Son la extensi\xF3n del cuerpo del usuario independiente. Fabricadas en materiales como aluminio aeron\xE1utico, titanio o carbono, permiten ajustar el centro de gravedad. Su dise\xF1o (de chasis r\xEDgido o plegable) busca la m\xE1xima eficiencia en cada pedalada, minimizando el esfuerzo y protegiendo la articulaci\xF3n del hombro a largo plazo."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDD0B"), " 2. Sillas El\xE9ctricas: Potencia y Portabilidad"), /*#__PURE__*/React.createElement("p", null, "La motorizaci\xF3n est\xE1 indicada cuando la propulsi\xF3n manual no es funcional por fatiga, dolor o falta de fuerza."), /*#__PURE__*/React.createElement("div", {
    className: "my-4 rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/silla_electrica.png",
    alt: "Silla el\xE9ctrica ligera plegable en entorno urbano",
    className: "w-full h-auto object-cover max-h-96 hover:scale-105 transition-transform duration-700"
  })), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sillas El\xE9ctricas Ligeras (Plegables):"), " Equipadas habitualmente con baterias de litio, est\xE1n dise\xF1adas para la vida urbana y los viajes. Son f\xE1ciles de transportar en el maletero de un coche y ofrecen una gran maniobrabilidad en espacios reducidos, sacrificando algo de amortiguaci\xF3n por ligereza."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sillas El\xE9ctricas Fijas (Robustas):"), " Priorizan la estabilidad y la autonom\xEDa en exteriores. Suelen tener bater\xEDas de mayor capacidad, sistemas de suspensi\xF3n avanzados y ruedas de mayor di\xE1metro para sortear obst\xE1culos y terrenos irregulares con seguridad."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\u2699\uFE0F"), " 3. Sistemas de Basculaci\xF3n y Multifunci\xF3n"), /*#__PURE__*/React.createElement("p", null, "En casos donde el usuario permanece sentado durante largos periodos y no puede realizar cambios posturales de forma aut\xF3noma, la tecnolog\xEDa de posicionamiento es cr\xEDtica para la salud."), /*#__PURE__*/React.createElement("div", {
    className: "my-4 rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/silla_basculante.png",
    alt: "Silla de ruedas el\xE9ctrica con sistema de basculaci\xF3n",
    className: "w-full h-auto object-cover max-h-96 hover:scale-105 transition-transform duration-700"
  })), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sillas Basculantes (Manuales):"), " Permiten inclinar todo el conjunto de asiento y respaldo sin cambiar el \xE1ngulo de las articulaciones del usuario. Esto es vital para la redistribuci\xF3n de presiones y la prevenci\xF3n de \xFAlceras por presi\xF3n (escaras)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sillas El\xE9ctricas Basculantes y Multifunci\xF3n:"), " Representan el m\xE1ximo nivel de tecnolog\xEDa asistencial. Permiten al usuario controlar electr\xF3nicamente la basculaci\xF3n, la reclinaci\xF3n del respaldo y la elevaci\xF3n de los reposapi\xE9s."))), /*#__PURE__*/React.createElement("div", {
    className: "bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-emerald-800 uppercase tracking-wide text-base"
  }, "El Consejo del Terapeuta Ocupacional")), /*#__PURE__*/React.createElement("p", {
    className: "text-emerald-900 italic text-base leading-relaxed"
  }, "\"La silla de ruedas no es un mueble, es una pr\xF3tesis de movilidad. Un error cr\xEDtico es no prestar atenci\xF3n al coj\xEDn antiescaras; de nada sirve la mejor silla el\xE9ctrica del mercado si la superficie de apoyo no gestiona correctamente las presiones. Asimismo, recuerda que una silla el\xE9ctrica multifunci\xF3n no es solo comodidad: la capacidad de elevar las piernas por encima del nivel del coraz\xF3n o cambiar el \xE1ngulo de apoyo es una intervenci\xF3n m\xE9dica constante que previene complicaciones graves y mejora el confort diario.\""))), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement(GuiaSillasRuedas, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();