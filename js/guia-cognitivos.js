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
const GuiaCognitivos = function GuiaCognitivos() {
  const materials = [{
    name: 'Libro de pasatiempos variados para adultos',
    desc: 'Cuaderno completo que reúne sopas de letras, crucigramas, sudokus y retos de lógica. Excelente recurso para realizar rutinas de gimnasia cerebral diarias.',
    image: 'assets/pasatiempos.png',
    link: 'https://amzn.to/3Rhlo7G',
    query: 'libro pasatiempos adultos sopa letras crucigramas'
  }, {
    name: 'Libro de ejercicios mentales y entrenamiento de memoria',
    desc: 'Libro enfocado en la estimulación cognitiva estructurada, con ejercicios específicos para mejorar la retención de datos, la atención sostenida y el lenguaje.',
    image: 'assets/ejercicios_mentales.png',
    link: 'https://amzn.to/4prQqWX',
    query: 'libro ejercicios memoria estimulacion cognitiva adultos'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "pt-36 pb-24 px-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/guia_cognitivos.png",
    alt: "Ejercicios Cognitivos y Estimulaci\xF3n Mental",
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
  }, "Ejercicios Cognitivos y Estimulaci\xF3n Mental"), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-2xl font-bold text-brand-800 mb-4"
  }, "Gimnasia Cerebral: Mantener la Mente Activa para Conservar la Autonom\xEDa"), /*#__PURE__*/React.createElement("p", {
    className: "mb-4"
  }, "La Terapia Ocupacional no trata solo de sobrevivir (comer, vestirse, asearse). Trata de vivir. A menudo asociamos la independencia con la fuerza f\xEDsica, pero la verdadera llave de la autonom\xEDa est\xE1 en el cerebro. Olvidar si se ha tomado la medicaci\xF3n, perder el hilo de una conversaci\xF3n o tener dificultades para gestionar el dinero al hacer la compra son se\xF1ales de que el sistema cognitivo necesita entrenamiento. El cerebro, al igual que los m\xFAsculos, responde al principio de \"o lo usas, o lo pierdes\"."), /*#__PURE__*/React.createElement("p", {
    className: "mb-6"
  }, "La estimulaci\xF3n cognitiva no tiene por qu\xE9 ser aburrida ni limitarse a rellenar fichas escolares. Integrar peque\xF1os retos mentales en la rutina diaria protege la reserva cognitiva, frena el deterioro y ayuda a mantener el control de la propia vida durante mucho m\xE1s tiempo. Estimular las conexiones neuronales nos dota de mayor adaptabilidad frente al envejecimiento natural o patol\xF3gico."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 mt-6 border-t border-gray-100 pt-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-3xl"
  }, "\uD83E\uDDE9"), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-brand-900"
  }, "1. Memoria y Atenci\xF3n (El Escudo contra los Despistes)")), /*#__PURE__*/React.createElement("p", null, "La memoria de trabajo y la atenci\xF3n sostenida son las funciones que m\xE1s sufren el desgaste del d\xEDa a d\xEDa, pero tambi\xE9n las m\xE1s agradecidas de entrenar. Al enfocar la atenci\xF3n voluntaria y realizar el esfuerzo de retenci\xF3n, fortalecemos las sinapsis de la corteza prefrontal y temporal."), /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-50/50 p-6 rounded-2xl border-l-4 border-brand-500 space-y-4 mt-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-brand-800 text-base"
  }, "El Juego de la Lista de la Compra (Memoria a Corto Plazo)"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "C\xF3mo realizarlo:"), " Antes de ir al supermercado, escribe una lista de 8 a 10 productos cotidianos. L\xE9ela con atenci\xF3n durante un minuto completo para fijar los t\xE9rminos, gu\xE1rdate el papel en el bolsillo e intenta realizar la compra de memoria. Justo antes de ir a pagar en la caja, saca el papel para comprobar si te ha faltado alg\xFAn art\xEDculo."), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-brand-700 italic mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "Beneficio cl\xEDnico:"), " Estimula la memoria inmediata y el agrupamiento categ\xF3rico, habilidades indispensables para el manejo independiente en el entorno comunitario.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-brand-800 text-base"
  }, "Atenci\xF3n con el Peri\xF3dico (Rastreo Visual y Concentraci\xF3n)"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "C\xF3mo realizarlo:"), " Coge una noticia o columna de prensa escrita en papel. Con un bol\xEDgrafo, tacha de forma sistem\xE1tica todas las letras \"A\" (o cualquier otra vocal) que encuentres en un \xFAnico p\xE1rrafo, leyendo de izquierda a derecha. Intenta medir el tiempo que tardas y los fallos cometidos."), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-brand-700 italic mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "Beneficio cl\xEDnico:"), " Entrena la velocidad de procesamiento visual, la atenci\xF3n sostenida y la inhibici\xF3n de est\xEDmulos irrelevantes, previniendo distracciones que afecten a tareas de riesgo en casa.")))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-3xl"
  }, "\u270D\uFE0F"), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-brand-900"
  }, "2. Lenguaje y Funciones Ejecutivas (Planificaci\xF3n y Fluidez)")), /*#__PURE__*/React.createElement("p", null, "Las funciones ejecutivas nos permiten organizar el d\xEDa, tomar decisiones correctas y resolver problemas imprevistos sobre la marcha, mientras que el lenguaje fluido nos mantiene comunicados socialmente y previene el aislamiento."), /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-50/50 p-6 rounded-2xl border-l-4 border-brand-500 space-y-4 mt-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-brand-800 text-base"
  }, "Fluidez Verbal por Categor\xEDas (Acceso L\xE9xico)"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "C\xF3mo realizarlo:"), " Dedica 2 minutos al d\xEDa a nombrar en voz alta todas las palabras que puedas que pertenezcan a una categor\xEDa sem\xE1ntica o fonol\xF3gica espec\xEDfica sin repetirte (por ejemplo: marcas de coches, herramientas del taller, nombres de flores, o bien alimentos que empiecen estrictamente por la letra \"M\")."), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-brand-700 italic mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "Beneficio cl\xEDnico:"), " Entrena la agilidad de b\xFAsqueda en el almac\xE9n de memoria a largo plazo y mejora la fluidez conversacional en las interacciones del d\xEDa a d\xEDa.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-brand-800 text-base"
  }, "C\xE1lculo con la Vuelta de la Compra (Funci\xF3n Ejecutiva)"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "C\xF3mo realizarlo:"), " Cuando vayas a comprar, intenta estimar de cabeza el precio acumulado de tres art\xEDculos antes de que los pasen por el lector de caja. Asimismo, si pagas en efectivo, calcula el cambio exacto que te deben entregar antes de que el cajero te d\xE9 las monedas."), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-brand-700 italic mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "Beneficio cl\xEDnico:"), " Ejercita el c\xE1lculo aritm\xE9tico b\xE1sico y la memoria de trabajo activa, habilidades instrumentales cr\xEDticas para conservar la autonom\xEDa en transacciones financieras.")))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-3xl"
  }, "\uD83E\uDDED"), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-brand-900"
  }, "3. Habilidades Visoespaciales y Orientaci\xF3n")), /*#__PURE__*/React.createElement("p", null, "La capacidad de reconocer el espacio, las dimensiones y las formas geom\xE9tricas nos protege de la desorientaci\xF3n y mantiene activa la coordinaci\xF3n ojo-mano."), /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-50/50 p-6 rounded-2xl border-l-4 border-brand-500 space-y-4 mt-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-brand-800 text-base"
  }, "Cambio de Rutas (Orientaci\xF3n Espacial)"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "C\xF3mo realizarlo:"), " Al salir a pasear por tu barrio o ir al mercado, cambia de forma deliberada el camino que tomas siempre. Intenta cruzar calles diferentes o rodea una manzana alternativa buscando puntos de referencia conocidos."), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-brand-700 italic mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "Beneficio cl\xEDnico:"), " Fuerza al cerebro a procesar informaci\xF3n visual y espacial nueva, actualizando los mapas cognitivos de orientaci\xF3n y previniendo la desorientaci\xF3n fuera de casa.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-brand-800 text-base"
  }, "Rompecabezas y Tangrams (Habilidad Visoconstructiva)"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "C\xF3mo realizarlo:"), " Dedica tiempo a encajar piezas de rompecabezas tridimensionales o planos. Manipular los bloques y visualizar la forma en que deben encajar en un espacio determinado entrena las habilidades visoespaciales."), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-brand-700 italic mt-1"
  }, /*#__PURE__*/React.createElement("strong", null, "Beneficio cl\xEDnico:"), " Desarrolla la rotaci\xF3n mental de objetos, que es el mismo mecanismo visoespacial que necesitamos para realizar tareas dom\xE9sticas complejas como organizar cajones, armarios o cargar de forma eficiente el lavavajillas.")))), /*#__PURE__*/React.createElement("div", {
    className: "bg-indigo-50 border border-indigo-100 rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shrink-0 bg-indigo-100 text-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner"
  }, /*#__PURE__*/React.createElement(Icons.MessageSquare, {
    className: "w-8 h-8"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-display text-xl font-bold text-brand-900 mb-2"
  }, "\xBFQuieres entrenar ahora mismo en l\xEDnea?"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mb-4 text-base"
  }, "Adem\xE1s de estos ejercicios caseros, te invito a entrenar tu mente de forma interactiva en nuestro ", /*#__PURE__*/React.createElement("a", {
    href: "estimulacion-cognitiva.html",
    className: "text-indigo-600 font-bold hover:underline"
  }, "\xC1rea Cognitiva y Gimnasio Cerebral"), ", donde encontrar\xE1s juegos digitales gratuitos dise\xF1ados espec\xEDficamente para potenciar tu memoria, atenci\xF3n y agilidad mental."), /*#__PURE__*/React.createElement("a", {
    href: "estimulacion-cognitiva.html",
    className: "inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-sm active:scale-95"
  }, "Ir al Gimnasio Cerebral interactivo"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-br from-brand-900 to-indigo-950 text-white rounded-[2rem] p-8 sm:p-10 shadow-xl relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute right-0 bottom-0 opacity-10 pointer-events-none"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-9xl"
  }, "\uD83D\uDCA1")), /*#__PURE__*/React.createElement("h4", {
    className: "font-display text-2xl font-bold mb-4 flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCA1"), " El Consejo del Terapeuta Ocupacional"), /*#__PURE__*/React.createElement("p", {
    className: "text-brand-100 text-lg leading-relaxed italic"
  }, "\"Para que un ejercicio cognitivo funcione, debe cumplir dos requisitos: tiene que ser un reto (si es demasiado f\xE1cil, el cerebro se aburre y no se esfuerza) y tiene que ser divertido (si es demasiado dif\xEDcil o frustrante, se abandona). No busques la perfecci\xF3n en el resultado; lo que realmente genera nuevas conexiones neuronales es el esfuerzo que hace tu mente mientras busca la respuesta.\"")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 pt-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-2xl font-bold text-brand-900"
  }, "Libros y Recursos de Estimulaci\xF3n Recomendados"), /*#__PURE__*/React.createElement("ul", {
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
  }, /*#__PURE__*/React.createElement(GuiaCognitivos, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();