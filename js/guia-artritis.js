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
const GuiaArtritis = function GuiaArtritis() {
  const materials = [{
    name: 'Cubiertos Adaptados con Mango Grueso',
    desc: 'Reducen la tensión en las pequeñas articulaciones de los dedos al requerir menor fuerza de prensión para comer.',
    image: 'assets/cubiertos_adaptados.jpg',
    link: 'https://amzn.to/4wi1BVq',
    query: 'cubiertos adaptados mango grueso'
  }, {
    name: 'Abridor de Tarros y Botes Ergonómico',
    desc: 'Herramienta que multiplica la fuerza y evita los dolorosos movimientos de torsión en la muñeca al abrir tarros.',
    image: 'assets/abridor_tarros.jpg',
    link: 'https://amzn.to/3SZNDIE',
    query: 'abridor de tarros ergonomico'
  }, {
    name: 'Adaptador de Llaves de Gran Palanca',
    desc: 'Añade una superficie de agarre ancha para girar las llaves en la cerradura utilizando la fuerza de la palma de la mano.',
    image: 'assets/adaptador_llaves.png',
    link: 'https://amzn.to/458NnJP',
    query: 'adaptador llaves facilitar giro'
  }, {
    name: 'Abotonador con Mango Ergonómico',
    desc: 'Permite abrochar botones pequeños sin realizar la pinza fina con las yemas de los dedos, ideal en fases de inflamación.',
    image: 'assets/abotonador.png',
    link: 'https://amzn.to/4eXYry7',
    query: 'abotonador de ropa'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "pt-36 pb-24 px-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/guia_artritis.png",
    alt: "Terapia Ocupacional y Artritis: Gu\xEDa de adaptaci\xF3n",
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
  }, "Terapia Ocupacional en la Artritis: Gu\xEDa de Protecci\xF3n Articular y Autonom\xEDa"), /*#__PURE__*/React.createElement("p", {
    className: "mb-4"
  }, "La ", /*#__PURE__*/React.createElement("strong", null, "artritis"), " y la ", /*#__PURE__*/React.createElement("strong", null, "artrosis"), " son patolog\xEDas que afectan de forma directa a las articulaciones, provocando dolor cr\xF3nico, inflamaci\xF3n, rigidez matutina y, en fases avanzadas, deformidad y limitaci\xF3n del rango de movimiento. Aunque cl\xEDnicamente tienen or\xEDgenes diferentes (la artritis es un proceso inflamatorio autoinmune o metab\xF3lico, mientras que la artrosis es un desgaste mec\xE1nico del cart\xEDlago), ambas comparten un impacto severo sobre las actividades de la vida diaria (AVD). Acciones tan sencillas como abrir un bote, girar una llave, abrocharse un bot\xF3n o escribir pueden transformarse en retos dolorosos y frustrantes."), /*#__PURE__*/React.createElement("p", {
    className: "mb-6"
  }, "Desde la disciplina de la ", /*#__PURE__*/React.createElement("strong", null, "Terapia Ocupacional"), ", el enfoque de tratamiento se fundamenta en la ", /*#__PURE__*/React.createElement("strong", null, "protecci\xF3n articular"), " y la ", /*#__PURE__*/React.createElement("strong", null, "conservaci\xF3n de energ\xEDa"), ". El objetivo principal es reducir la carga f\xEDsica y el estr\xE9s mec\xE1nico sobre las articulaciones da\xF1adas, previniendo la progresi\xF3n de deformidades y permitiendo que la persona contin\xFAe siendo productiva e independiente en sus rutinas habituales. A continuaci\xF3n, desarrollamos una gu\xEDa pr\xE1ctica con adaptaciones del hogar y recomendaciones cl\xEDnicas para el d\xEDa a d\xEDa."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 mt-6 border-t border-gray-100 pt-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83C\uDF73"), " 1. Alimentaci\xF3n y Tareas de la Cocina sin Sobrecarga"), /*#__PURE__*/React.createElement("p", null, "Las articulaciones de los dedos y las mu\xF1ecas son las que m\xE1s sufren durante las tareas culinarias. Las fuerzas de pinza y de torsi\xF3n requeridas para abrir envases o manipular utensilios pesados deben compensarse:"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Cubiertos de Mango Engrosado:"), " Al aumentar el di\xE1metro del mango de los tenedores, cucharas y cuchillos, se requiere un menor esfuerzo del pu\xF1o para sostenerlos. Esto disminuye la presi\xF3n intraarticular en las articulaciones de los dedos, reduciendo la fatiga y el dolor durante las comidas."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Abridores de Tarros Ergon\xF3micos:"), " Los abridores manuales con recubrimiento de silicona o los dispositivos montados bajo la encimera multiplican la fuerza de palanca. Esto evita realizar el movimiento de rotaci\xF3n extrema con la mu\xF1eca, protegiendo las articulaciones carpometacarpianas (como en la rizartrosis o artrosis del pulgar)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Vajilla y Utensilios Ligeros:"), " Sustituir cazuelas de hierro fundido por sartenes de aluminio ligero con doble asa para poder levantarlas con ambas manos. Cambiar los platos cer\xE1micos pesados por vajilla de Opal, que mantiene una excelente resistencia siendo notablemente m\xE1s ligera."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDC55"), " 2. Vestido, Calzado y Manejo de la Rigidez Matutina"), /*#__PURE__*/React.createElement("p", null, "La rigidez matutina es uno de los s\xEDntomas m\xE1s caracter\xEDsticos de la artritis reumatoide, complicando notablemente el aseo y vestido al despertar. Organizar la tarea de forma estrat\xE9gica reduce el impacto de esta rigidez:"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Abotonadores Ergon\xF3micos:"), " Sostener un peque\xF1o bot\xF3n e introducirlo por el ojal requiere una pinza fina de gran presi\xF3n. El abotonador manual soluciona este problema mediante un asa de alambre que sujeta el bot\xF3n y permite deslizarlo a trav\xE9s del ojal realizando un movimiento del brazo entero, protegiendo las articulaciones distales de los dedos."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sustituci\xF3n de Cierres:"), " Optar por ropa holgada, con cinturas el\xE1sticas o cierres de velcro. En chaquetas y abrigos, se pueden acoplar tiradores de cremallera en forma de anilla para subirlas introduciendo simplemente un dedo, evitando el pellizco de la cremallera."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Facilitar el Calzado:"), " Utilizar cordones el\xE1sticos que no requieran nudos y calzadores de mango largo de metal para introducir el pie con facilidad, evitando flexionar excesivamente las caderas y rodillas si estas se encuentran inflamadas."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDEBF"), " 3. Adaptaciones en el Ba\xF1o para Proteger Caderas y Rodillas"), /*#__PURE__*/React.createElement("p", null, "El agua caliente es un gran aliado para aliviar el dolor y reducir la rigidez muscular. Sin embargo, el esfuerzo de sentarse y levantarse de superficies bajas resulta muy perjudicial para las articulaciones de carga de los miembros inferiores (rodillas y caderas)."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Elevador de WC con Reposabrazos:"), " Los inodoros est\xE1ndar suelen ser demasiado bajos. Al elevar la altura unos 10-15 cm, disminuye dr\xE1sticamente el \xE1ngulo de flexi\xF3n articular necesario para incorporarse. Los reposabrazos integrados permiten ayudarse con la fuerza de los brazos, descargando las piernas."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Higiene Sentados en la Ducha:"), " Disponer de un taburete o silla de ducha estable con conteras antideslizantes. Permanecer de pie sobre una superficie resbaladiza fatiga las articulaciones y aumenta la inestabilidad postural si el dolor afecta a los pies."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Adaptadores de Grifos:"), " Sustituir los mandos de rosca tradicionales por grifos monomando de palanca larga, que pueden accionarse con el antebrazo o la palma de la mano sin necesidad de hacer pinza ni giro con los dedos."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDD11"), " 4. Ergonom\xEDa en la Oficina y Tareas del Hogar"), /*#__PURE__*/React.createElement("p", null, "Peque\xF1os gestos repetitivos a lo largo del d\xEDa pueden provocar microrroturas y acelerar la deformidad si no se adaptan las herramientas:"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Adaptadores de Llaves:"), " Girar una llave est\xE1ndar requiere un fuerte pellizco de los dedos \xEDndice y pulgar que genera una gran tensi\xF3n en la base de la mano. Los soportes adaptadores para llaves aumentan el brazo de palanca y la superficie de agarre, permitiendo abrir la cerradura empleando la fuerza de toda la mano."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Bol\xEDgrafos Ergon\xF3micos o Engrosados:"), " Para la escritura, se deben utilizar bol\xEDgrafos de tinta fluida (para no presionar con fuerza contra el papel) y acoplarles manguitos de espuma blanda. Esto previene la t\xEDpica hiperextensi\xF3n de las articulaciones de los dedos al escribir."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Manillas Tipo Palanca:"), " Cambiar los pomos giratorios de las puertas por manillas tipo palanca, f\xE1ciles de accionar empujando hacia abajo con la mano abierta o el codo."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDEE1\uFE0F"), " 5. Principios Clave de la Protecci\xF3n Articular"), /*#__PURE__*/React.createElement("p", null, "La protecci\xF3n articular es una educaci\xF3n postural y de comportamiento que el terapeuta ocupacional ense\xF1a al paciente para integrarla en todas sus rutinas:"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Utilizar la Articulaci\xF3n M\xE1s Grande Disponible:"), " Al transportar bolsas de la compra, no las sostenga con la punta de los dedos. Cu\xE9lguelas en el antebrazo o al hombro. Al cerrar un grifo o empujar una puerta, utilice la palma de la mano abierta o el cuerpo, nunca la punta de los dedos."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Evitar Mantener la Misma Postura:"), " Al leer o usar dispositivos, cambie de posici\xF3n o realice estiramientos suaves cada 20-30 minutos para evitar la rigidez articular."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Respetar el Dolor:"), " El dolor es una se\xF1al de alarma del cuerpo. No fuerce una articulaci\xF3n inflamada m\xE1s all\xE1 de sus l\xEDmites normales. Planifique periodos de descanso alternados con la actividad."))), /*#__PURE__*/React.createElement("div", {
    className: "bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-2xl shadow-sm mt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-purple-800 uppercase tracking-wide text-base"
  }, "El Consejo del Terapeuta Ocupacional")), /*#__PURE__*/React.createElement("p", {
    className: "text-purple-900 italic text-base leading-relaxed"
  }, "\"No confundas el reposo con la inactividad total. Durante un brote inflamatorio agudo, el uso de f\xE9rulas de reposo termopl\xE1sticas a medida (confeccionadas por un terapeuta ocupacional) es crucial para alinear la articulaci\xF3n, mitigar el dolor y evitar deformidades como la desviaci\xF3n cubital de los dedos. Sin embargo, en los periodos de remisi\xF3n, es fundamental realizar ejercicios suaves de rango de movimiento y fortalecimiento moderado para mantener la musculatura activa. Mant\xE9n tus manos en movimiento, pero de forma inteligente.\""))), /*#__PURE__*/React.createElement("div", {
    className: "mt-12 bg-gray-50 rounded-2xl p-6 sm:p-8 border border-brand-100 shadow-sm"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-brand-800 uppercase tracking-wide text-lg mb-6 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Check, null), " Material recomendado para la Artritis y Artrosis"), /*#__PURE__*/React.createElement("ul", {
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
  }, /*#__PURE__*/React.createElement(GuiaArtritis, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();