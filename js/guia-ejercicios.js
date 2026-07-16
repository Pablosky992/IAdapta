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
const GuiaEjercicios = function GuiaEjercicios() {
  const materials = [{
    name: 'Pelota para ejercitar las manos y dedos',
    desc: 'Pelota ergonómica de silicona para realizar ejercicios de presión y pinza. Ayuda a fortalecer la musculatura intrínseca de la mano y mantener la movilidad de los dedos.',
    image: 'assets/pelota_manos.png',
    link: 'https://amzn.to/4wHv7TF',
    query: 'pelota ejercitar manos rehabilitacion'
  }, {
    name: 'Bandas elásticas de resistencia',
    desc: 'Cintas elásticas de látex para realizar ejercicios de resistencia muscular progresiva y estiramientos controlados tanto sentados como de pie.',
    image: 'assets/bandas_elasticas.png',
    link: 'https://amzn.to/4aZ54z1',
    query: 'bandas elasticas musculacion estiramientos'
  }, {
    name: 'Pedalier para brazos y piernas',
    desc: 'Ejercitador de pedal doble para colocar en el suelo. Permite pedalear sentado en una silla común, mejorando la circulación periférica y la capacidad cardiopulmonar.',
    image: 'assets/pedalier.png',
    link: 'https://amzn.to/4bMWuUh',
    query: 'pedalier ejercicio brazos piernas mayores'
  }, {
    name: 'Simulador pasivo de la marcha',
    desc: 'Ejercitador de piernas motorizado que genera movimientos de marcha alternativos y suaves de forma sentada. Ideal para personas con movilidad muy reducida.',
    image: 'assets/simulador_marcha.png',
    link: 'https://amzn.to/4waslqk',
    query: 'simulador de marcha pasivo ejercitador piernas'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "pt-36 pb-24 px-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/guia_ejercicios.png",
    alt: "Ejercicios F\xEDsicos y Movilidad en la Tercera Edad",
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
  }, "Ejercicios F\xEDsicos y Movilidad en la Tercera Edad"), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-2xl font-bold text-brand-800 mb-4"
  }, "Envejecimiento Activo: Moverse para Seguir Siendo Libre"), /*#__PURE__*/React.createElement("p", {
    className: "mb-4"
  }, "La Terapia Ocupacional no trata solo de sobrevivir (comer, vestirse, asearse). Trata de vivir. El movimiento es el verdadero motor de la autonom\xEDa. A menudo se piensa que al envejecer debemos \"guardar reposo\" o evitar el esfuerzo por miedo a las ca\xEDdas. Sin embargo, ocurre todo lo contrario: el sedentarismo es el que debilita los m\xFAsculos, desgasta el equilibrio y arrebata la independencia para subir escaleras, levantarse del sof\xE1 o ir a comprar el pan."), /*#__PURE__*/React.createElement("p", {
    className: "mb-6"
  }, "Afortunadamente, mantener el cuerpo activo no requiere convertirse en un atleta de \xE9lite. Adaptar el ejercicio f\xEDsico a las capacidades de cada persona mayor permite prevenir ca\xEDdas, proteger las articulaciones y mantener la libertad del d\xEDa a d\xEDa. El acondicionamiento muscular estimula los propioceptores, lubrica los cart\xEDlagos articulares y genera una cascada de beneficios neurocognitivos vitales para mantener la salud mental."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 mt-6 border-t border-gray-100 pt-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-3xl"
  }, "\uD83E\uDE91"), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-brand-900"
  }, "1. Ejercicios en Silla (Gimnasia Sentada)")), /*#__PURE__*/React.createElement("p", null, "Para personas con movilidad reducida, problemas de equilibrio severos o riesgo elevado de ca\xEDdas, la silla no es una limitaci\xF3n, sino una herramienta de entrenamiento excelente y segura. El ejercicio en silla minimiza el miedo a perder el equilibrio, permitiendo centrar todo el esfuerzo muscular en el tren inferior y superior."), /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-50/50 p-6 rounded-2xl border-l-4 border-brand-500 space-y-4 mt-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-brand-800 text-base"
  }, "Extensiones de Rodilla (Fortalecimiento de Cu\xE1driceps)"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "C\xF3mo realizarlo:"), " Sentado con la espalda bien apoyada en el respaldo de la silla, estirar una pierna hacia el frente de forma horizontal, mantenerla tensa un par de segundos y bajarla lentamente. Realizar de 10 a 12 repeticiones con cada pierna."), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-brand-700 italic mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "Beneficio cl\xEDnico:"), " Este ejercicio fortalece el cu\xE1driceps, el m\xFAsculo principal implicado en la bipedestaci\xF3n (acci\xF3n de ponerse de pie), facilitando la salida de sillas, retretes e inodoros de manera aut\xF3noma.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-brand-800 text-base"
  }, "Flexi\xF3n de Cadera (Marcha Sentada)"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "C\xF3mo realizarlo:"), " Manteniendo una postura erguida, elevar alternativamente las rodillas hacia el pecho, despegando los muslos del asiento de la silla, simulando una marcha militar sin moverse del sitio. Realizar 15 repeticiones alternas."), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-brand-700 italic mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "Beneficio cl\xEDnico:"), " Es ideal para mantener la flexibilidad de los flexores de la cadera y la pelvis, mejorando el patr\xF3n de la marcha y disminuyendo el riesgo de tropiezos al levantar el pie del suelo.")))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-3xl"
  }, "\uD83E\uDDB5"), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-brand-900"
  }, "2. Fuerza y Flexibilidad para el D\xEDa a D\xEDa")), /*#__PURE__*/React.createElement("p", null, "El entrenamiento de fuerza muscular es el mejor escudo contra la sarcopenia (p\xE9rdida progresiva de masa y potencia muscular) y ayuda a proteger los huesos de la osteoporosis al estimular la s\xEDntesis de calcio mediante el impacto muscular sobre el tejido \xF3seo."), /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-50/50 p-6 rounded-2xl border-l-4 border-brand-500 space-y-4 mt-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-brand-800 text-base"
  }, "Sentarse y Levantarse (El Squat Funcional)"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "C\xF3mo realizarlo:"), " El ejercicio m\xE1s funcional que existe. Usando una silla estable y apoyando las manos en los reposabrazos si es necesario al principio, la persona debe levantarse erguida y volverse a sentar de forma lenta y controlada. Realizar de 8 a 10 repeticiones."), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-brand-700 italic mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "Beneficio cl\xEDnico:"), " Desarrolla la fuerza explosiva y el control motor exc\xE9ntrico en el tren inferior, reduciendo la dependencia f\xEDsica al usar sillas, sof\xE1s y transporte p\xFAblico.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-brand-800 text-base"
  }, "Elevaci\xF3n de Talones (Fuerza de Pantorrilla)"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "C\xF3mo realizarlo:"), " Apoyando las manos en el respaldo de una silla pesada o en la encimera de la cocina para no perder el equilibrio, ponerse de puntillas lentamente elevando ambos talones y bajar controladamente. Realizar 12 repeticiones."), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-brand-700 italic mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "Beneficio cl\xEDnico:"), " Refuerza los gemelos y el tend\xF3n de Aquiles, mejorando la estabilidad del tobillo y proporcionando un impulso firme y seguro al caminar.")))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-3xl"
  }, "\u2696\uFE0F"), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-brand-900"
  }, "3. Equilibrio y Prevenci\xF3n de Ca\xEDdas")), /*#__PURE__*/React.createElement("p", null, "El miedo a caerse suele hacer que las personas mayores caminen menos, lo que debilita su equilibrio y, parad\xF3jicamente, aumenta el riesgo de sufrir una ca\xEDda. Hay que romper ese c\xEDrculo vicioso mediante la reeducaci\xF3n vestibular y propioceptiva."), /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-50/50 p-6 rounded-2xl border-l-4 border-brand-500 space-y-4 mt-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-brand-800 text-base"
  }, "La Posici\xF3n del Flamenco (Apoyo Monopodal)"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "C\xF3mo realizarlo:"), " Sujet\xE1ndose firmemente a una superficie estable con una o ambas manos, intentar levantar un pie del suelo y mantener el equilibrio sobre una sola pierna durante 10 o 15 segundos. Luego, cambiar al otro pie."), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-brand-700 italic mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "Beneficio cl\xEDnico:"), " Entrena la estabilidad est\xE1tica profunda. Es clave para prevenir tropiezos durante la fase de balanceo al caminar, cuando todo el peso recae temporalmente sobre un solo pie.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-brand-800 text-base"
  }, "Caminar en L\xEDnea Recta (Marcha en T\xE1ndem)"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "C\xF3mo realizarlo:"), " Caminar colocando un pie justo delante del otro (tocando el tal\xF3n delantero con la punta de los dedos del pie trasero) a lo largo de una l\xEDnea recta o pasillo, preferiblemente cerca de la pared para poder apoyarse si se experimenta inestabilidad."), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-brand-700 italic mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "Beneficio cl\xEDnico:"), " Refuerza la coordinaci\xF3n motora din\xE1mica y reduce la base de sustentaci\xF3n, simulando situaciones cotidianas donde debemos sortear obst\xE1culos o transitar por espacios reducidos.")))), /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-br from-brand-900 to-indigo-950 text-white rounded-[2rem] p-8 sm:p-10 shadow-xl relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute right-0 bottom-0 opacity-10 pointer-events-none"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-9xl"
  }, "\uD83D\uDCA1")), /*#__PURE__*/React.createElement("h4", {
    className: "font-display text-2xl font-bold mb-4 flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCA1"), " El Consejo del Terapeuta Ocupacional"), /*#__PURE__*/React.createElement("p", {
    className: "text-brand-100 text-lg leading-relaxed italic"
  }, "\"No dejes que el miedo a caerte te paralice. El cuerpo humano est\xE1 dise\xF1ado para moverse en todas las etapas de la vida, y la fragilidad no se combate con el reposo, sino con la actividad adaptada. Empieza poco a poco, celebra cada peque\xF1o progreso y recuerda: el mejor ejercicio es el que realmente se hace. Mantener tus m\xFAsculos fuertes hoy es asegurar tu independencia de ma\xF1ana.\"")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 pt-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-2xl font-bold text-brand-900"
  }, "Material de Entrenamiento y Ejercicio Recomendado"), /*#__PURE__*/React.createElement("ul", {
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
  }, "Las recomendaciones que ves en esta web han sido seleccionadas bajo criterio profesional de Terapia Ocupacional. Al comprar a trav\xE9s de estos enlaces, deseas contribuir a mantener el proyecto IAdapta sin que a ti te cueste ni un c\xE9ntimo m\xE1s.")))))));
};
function App() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Navbar, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement("main", {
    id: "main-content"
  }, /*#__PURE__*/React.createElement(GuiaEjercicios, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();