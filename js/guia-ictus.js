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
const GuiaIctus = function GuiaIctus() {
  const materials = [{
    name: 'Esponja de Baño con Mango Largo',
    desc: 'Facilita el lavado de la espalda y zonas de difícil acceso sin realizar movimientos exigentes de hombro, compensando la movilidad del lado afectado.',
    image: 'assets/esponja_mango_largo.png',
    link: 'https://amzn.to/4wN3I30',
    query: 'esponja mango largo baño'
  }, {
    name: 'Tabla de Corte para una Mano',
    desc: 'Equipada con clavos de acero inoxidable y ventosas de fijación para sujetar los alimentos mientras se pelan o cortan.',
    image: 'assets/tabla_cortar.png',
    link: 'https://amzn.to/42CtdHf',
    query: 'tabla de corte para una mano'
  }, {
    name: 'Pone-calcetines y Medias',
    desc: 'Dispositivo plástico flexible con cuerdas que facilita ponerse calcetines o medias sin necesidad de usar ambas manos ni agacharse.',
    image: 'assets/pone_calcetines.png',
    link: 'https://amzn.to/3QCeZDT',
    query: 'pone calcetines medias'
  }, {
    name: 'Abotonador con Mango Grueso',
    desc: 'Herramienta metálica con mango ergonómico antideslizante que facilita pasar los botones por los ojales usando una única mano.',
    image: 'assets/abotonador.png',
    link: 'https://amzn.to/4eXYry7',
    query: 'abotonador mango grueso'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "pt-36 pb-24 px-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/guia_ictus.png",
    alt: "Terapia Ocupacional e Ictus: Gu\xEDa de adaptaci\xF3n",
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
  }, "Terapia Ocupacional tras un Ictus: Gu\xEDa Pr\xE1ctica para la Autonom\xEDa y Adaptaci\xF3n del Hogar"), /*#__PURE__*/React.createElement("p", {
    className: "mb-4"
  }, "El accidente cerebrovascular (ACV), conocido com\xFAnmente como ", /*#__PURE__*/React.createElement("strong", null, "Ictus"), ", es una de las principales causas de discapacidad f\xEDsica y cognitiva en adultos a nivel mundial. La interrupci\xF3n del flujo sangu\xEDneo cerebral (ya sea por un trombo en el ictus isqu\xE9mico o por una ruptura arterial en el ictus hemorr\xE1gico) provoca la muerte de neuronas en \xE1reas espec\xEDficas. Esto suele traducirse cl\xEDnicamente en una hemiparesia o hemiplejia (p\xE9rdida de fuerza o par\xE1lisis de la mitad del cuerpo contraria al hemisferio cerebral da\xF1ado), alteraciones sensitivas, problemas de equilibrio, dificultades en la comunicaci\xF3n (afasia) o de atenci\xF3n (hemi-negligencia)."), /*#__PURE__*/React.createElement("p", {
    className: "mb-6"
  }, "Ante este panorama, la ", /*#__PURE__*/React.createElement("strong", null, "Terapia Ocupacional"), " juega un papel determinante en el proceso de neurorrehabilitaci\xF3n. A trav\xE9s de la adaptaci\xF3n del entorno, la reeducaci\xF3n funcional y el uso de productos de apoyo espec\xEDficos, el terapeuta ocupacional busca capacitar al paciente para que vuelva a realizar sus actividades de la vida diaria (AVD) de manera aut\xF3noma. A continuaci\xF3n, presentamos una gu\xEDa detallada con estrategias y soluciones de adaptaci\xF3n para facilitar el d\xEDa a d\xEDa tras sufrir un Ictus."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 mt-6 border-t border-gray-100 pt-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83C\uDF7D\uFE0F"), " 1. Alimentaci\xF3n Adaptada para Hemiparesia"), /*#__PURE__*/React.createElement("p", null, "Comer de forma independiente es una de las primeras metas en el proceso de rehabilitaci\xF3n. Cuando un brazo queda paralizado o d\xE9bil, tareas bilaterales como cortar carne o untar pan se vuelven imposibles de realizar con cubiertos est\xE1ndar. Las siguientes adaptaciones compensan la falta de funcionalidad de una de las extremidades:"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Cuchillo Nelson y Cubiertos Basculantes:"), " El cuchillo Nelson es un producto de apoyo cl\xE1sico. Integra en una sola pieza un tenedor y un cuchillo con filo oscilante. Permite cortar el alimento balanceando el cubierto y, a continuaci\xF3n, pincharlo para llevarlo a la boca sin soltar el utensilio."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Platos con Reborde Alto:"), " Los platos adaptados con un borde vertical pronunciado en uno de sus lados facilitan que el usuario empuje la comida contra la pared del plato para cargar la cuchara o tenedor utilizando \xFAnicamente su mano sana."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Soportes y Tapetes Antideslizantes:"), " Colocar un tapete de silicona bajo el plato evita que este se mueva durante la manipulaci\xF3n. Tambi\xE9n existen sujeta-vasos de silicona con ventosas que fijan el recipiente a la mesa para prevenir derrames accidentales al intentar cogerlo."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDC55"), " 2. T\xE9cnicas de Vestido a una Mano (Hemi-vestido)"), /*#__PURE__*/React.createElement("p", null, "El vestido es una actividad altamente compleja que requiere coordinaci\xF3n bilateral y equilibrio. El terapeuta ocupacional entrena al paciente en la t\xE9cnica de hemi-vestido, una estrategia de movimiento paso a paso:"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Secuencia de Vestido:"), " Para ponerse camisas, chaquetas o jerseys, el paciente debe sentarse en una superficie estable. Se debe introducir siempre ", /*#__PURE__*/React.createElement("strong", null, "primero la manga del brazo afectado"), ", llevar la prenda por la espalda con el brazo sano y, finalmente, meter la manga del lado sano. Para desvestirse, el proceso es inverso: se retira ", /*#__PURE__*/React.createElement("strong", null, "primero el lado sano"), " y finalmente el afectado."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Abotonadores de una Mano:"), " Pasar un bot\xF3n por su ojal con una sola mano es extremadamente dif\xEDcil. El abotonador cuenta con un lazo de alambre en el extremo de un mango engrosado; se pasa el alambre por el ojal, se sujeta el bot\xF3n y se tira de \xE9l hacia atr\xE1s para abrocharlo f\xE1cilmente."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Ayudas para el Calzado y Medias:"), " El \"pone-calcetines\" consiste en una cuna pl\xE1stica donde se monta el calcet\xEDn; el paciente introduce el pie y tira de las cintas para deslizarlo. Los cordones el\xE1sticos y calzadores de mango largo eliminan la necesidad de agacharse y atar lazos, tareas de gran riesgo para el equilibrio."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDEBF"), " 3. Seguridad en la Higiene y Aseo Personal"), /*#__PURE__*/React.createElement("p", null, "El cuarto de ba\xF1o suele ser el entorno que mayor ansiedad genera debido al riesgo de resbalones y la exigencia f\xEDsica del aseo. Adaptar esta estancia previene ca\xEDdas y fomenta la intimidad del usuario."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Ducha Adaptada y Asientos:"), " Se debe evitar la ba\xF1era. Un plato de ducha a ras de suelo con una silla de ducha con reposabrazos y respaldo proporciona la estabilidad necesaria. El paciente puede lavarse sentado de forma segura, reduciendo el riesgo de ca\xEDdas derivado de la hemiparesia."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Barras de Apoyo y Asideros:"), " Es crucial colocar barras de seguridad de superficie rugosa al lado del inodoro y dentro de la ducha. Deben estar atornilladas firmemente a la pared para resistir el peso del paciente durante las transferencias."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Esponjas y Cepillos de Mango Largo:"), " Permiten alcanzar la espalda o los pies sin necesidad de realizar flexiones extremas de tronco, compensando la limitaci\xF3n de movilidad de la extremidad afectada."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDECB\uFE0F"), " 4. Posicionamiento, Movilidad y Prevenci\xF3n del Hombro Doloroso"), /*#__PURE__*/React.createElement("p", null, "Tras un ictus, el brazo afectado suele pasar por una fase fl\xE1cida inicial y, posteriormente, una fase esp\xE1stica (rigidez extrema). Es vital cuidar la postura tanto en la cama como en el sof\xE1 para evitar contracturas y la temida subluxaci\xF3n de hombro (desplazamiento de la articulaci\xF3n por falta de tono muscular)."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Posicionamiento en la Cama:"), " Al estar tumbado de lado sobre el lado sano, el brazo afectado debe descansar apoyado sobre una almohada frente al cuerpo, manteniendo el codo estirado y la mano abierta. Esto evita que el brazo cuelgue y tire de la articulaci\xF3n del hombro, previniendo dolores cr\xF3nicos."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Cojines de Posicionamiento en Silla de Ruedas:"), " En sedestaci\xF3n, el brazo afectado nunca debe quedar colgando al lado de la silla. Se debe utilizar un soporte de reposabrazos especial (soportes de hemicuerpo) o colocar una almohada sobre el regazo para apoyar el brazo en una posici\xF3n neutra y visible."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Transferencias Seguras:"), " Para pasar de la cama a la silla, se debe realizar la transferencia preferentemente ", /*#__PURE__*/React.createElement("strong", null, "hacia el lado sano"), " en las fases iniciales, facilitando que el paciente use su fuerza residual para pivotar. El uso de un cintur\xF3n de transferencia ayuda al cuidador a guiar el movimiento de forma ergon\xF3mica."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83C\uDF73"), " 5. Cocina y Tareas del Hogar a una Mano"), /*#__PURE__*/React.createElement("p", null, "Retomar las tareas del hogar es un excelente ejercicio de rehabilitaci\xF3n cognitiva y motora. La cocina es una actividad compleja que puede adaptarse para realizarse de forma segura con un solo brazo \xFAtil:"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Tablas de Cortar Adaptadas:"), " Cuentan con un sistema de clavos met\xE1licos donde se pincha la patata, manzana u verdura para que quede fija, permitiendo al paciente pelarla o cortarla con la mano sana. Tambi\xE9n incluyen rebordes para sujetar rebanadas de pan y untarlas f\xE1cilmente."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Abrebotes Monomanuales:"), " Dispositivos fijados bajo el mueble de la cocina o bases de silicona texturizada que sujetan el tarro por su base, permitiendo al usuario desenroscar la tapa usando una sola mano."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Organizadores y Distribuci\xF3n:"), " Almacenar los utensilios de uso diario en cajones o estantes situados a una altura comprendida entre la cadera y los hombros, evitando tener que agacharse o estirarse en exceso, lo que comprometer\xEDa el equilibrio."))), /*#__PURE__*/React.createElement("div", {
    className: "bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-2xl shadow-sm mt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-purple-800 uppercase tracking-wide text-base"
  }, "El Consejo del Terapeuta Ocupacional")), /*#__PURE__*/React.createElement("p", {
    className: "text-purple-900 italic text-base leading-relaxed"
  }, "\"Presta especial atenci\xF3n a la hemi-negligencia. Tras un ictus en el hemisferio derecho, es muy com\xFAn que el paciente 'ignore' visual y espacialmente todo lo que est\xE1 a su izquierda (incluido su propio brazo). Para estimular la plasticidad cerebral, coloca los objetos de inter\xE9s (como el tel\xE9fono o la televisi\xF3n) en el lado afectado para obligarle a girar la cabeza y buscar est\xEDmulos all\xED. Asimismo, integra el brazo afecto en las tareas diarias como 'ayudante pasivo' (por ejemplo, sujetar el papel mientras escribes con la mano sana). La neuroplasticidad se alimenta del uso y la atenci\xF3n.\""))), /*#__PURE__*/React.createElement("div", {
    className: "mt-12 bg-gray-50 rounded-2xl p-6 sm:p-8 border border-brand-100 shadow-sm"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-brand-800 uppercase tracking-wide text-lg mb-6 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Check, null), " Material recomendado para la rehabilitaci\xF3n del Ictus"), /*#__PURE__*/React.createElement("ul", {
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
  }, /*#__PURE__*/React.createElement(GuiaIctus, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();