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
const GuiaParkinson = function GuiaParkinson() {
  const materials = [{
    name: 'Cubiertos con Peso para Temblores',
    desc: 'Cubiertos ergonómicos diseñados con peso adicional para estabilizar la mano y minimizar el efecto del temblor al comer.',
    image: 'assets/cubiertos_adaptados.jpg',
    link: 'https://amzn.to/4fwJvbH',
    query: 'cubiertos con peso temblor parkinson'
  }, {
    name: 'Tapete Antideslizante de Silicona',
    desc: 'Base de alta adherencia que evita el deslizamiento de platos y vasos, facilitando una alimentación autónoma y segura.',
    image: 'assets/tapete_antideslizante.jpg',
    link: 'https://amzn.to/3SZLxsg',
    query: 'tapete antideslizante silicona'
  }, {
    name: 'Elevador de Inodoro con Reposabrazos',
    desc: 'Facilita la incorporación reduciendo el esfuerzo requerido en las rodillas y caderas, ofreciendo apoyos laterales firmes.',
    image: 'assets/elevador_wc.jpg',
    link: 'https://amzn.to/3RwHjYy',
    query: 'elevador wc con reposabrazos'
  }, {
    name: 'Calzador de Mango Largo con Gancho',
    desc: 'Permite calzarse cómodamente sin necesidad de agacharse y ayuda a acercar prendas de vestir gracias a su gancho integrado, evitando la pérdida de equilibrio.',
    image: 'assets/calzador_largo.png',
    link: 'https://amzn.to/4vtwynE',
    query: 'calzador largo con gancho'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "pt-36 pb-24 px-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/guia_parkinson.png",
    alt: "Terapia Ocupacional y Parkinson: Gu\xEDa de adaptaci\xF3n",
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
  }, "Terapia Ocupacional en el Parkinson: Gu\xEDa Completa de Adaptaci\xF3n del Entorno y Productos de Apoyo"), /*#__PURE__*/React.createElement("p", {
    className: "mb-4"
  }, "La enfermedad de Parkinson es una condici\xF3n neurodegenerativa compleja caracterizada principalmente por s\xEDntomas motores como el temblor en reposo, la rigidez muscular, la bradicinesia (lentitud de movimientos) y la inestabilidad postural. No obstante, sus efectos van mucho m\xE1s all\xE1 de estos signos visibles, influyendo directamente en la capacidad de la persona para realizar sus actividades de la vida diaria (AVD) de manera aut\xF3noma y segura."), /*#__PURE__*/React.createElement("p", {
    className: "mb-6"
  }, "Desde la perspectiva de la ", /*#__PURE__*/React.createElement("strong", null, "Terapia Ocupacional"), ", el objetivo prioritario no es curar la patolog\xEDa, sino capacitar a la persona para que contin\xFAe participando activamente en sus rutinas significativas. Esto se logra mediante la modificaci\xF3n de la actividad, el entrenamiento en nuevas t\xE9cnicas de movimiento y, de forma fundamental, a trav\xE9s de la ", /*#__PURE__*/React.createElement("strong", null, "adaptaci\xF3n del entorno f\xEDsico"), " y la prescripci\xF3n adecuada de ", /*#__PURE__*/React.createElement("strong", null, "productos de apoyo"), " (antes conocidos como ayudas t\xE9cnicas). A continuaci\xF3n, analizamos de manera detallada c\xF3mo intervenir en cada \xE1rea del hogar para maximizar la autonom\xEDa y prevenir riesgos."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 mt-6 border-t border-gray-100 pt-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83C\uDF7D\uFE0F"), " 1. Alimentaci\xF3n Aut\xF3noma y Adaptaciones en la Mesa"), /*#__PURE__*/React.createElement("p", null, "Comer es una actividad social e \xEDntima que suele verse afectada tempranamente por el temblor y la falta de coordinaci\xF3n. La frustraci\xF3n derivada de los derrames de comida suele llevar al aislamiento del usuario. Para evitarlo, la Terapia Ocupacional propone soluciones pr\xE1cticas:"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Cubiertos de Peso (Cubiertos Lastrados):"), " El principio f\xEDsico detr\xE1s de estos utensilios es simple pero efectivo. Al a\xF1adir un peso calibrado en el mango del tenedor o de la cuchara (generalmente entre 100 y 200 gramos), se amortigua el temblor involuntario de la mano, permitiendo llevar el alimento a la boca con mayor estabilidad."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Platos con Borde Elevado o Rebordes de Quita y Pon:"), " Evitan que los alimentos salgan del plato al intentar empujarlos con el cubierto. Un fondo antideslizante con ventosas proporciona un punto de resistencia firme para comer con una sola mano si es necesario."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Vasos Dise\xF1ados con Escotadura Nasal o Tapa:"), " Permiten beber sin necesidad de inclinar la cabeza hacia atr\xE1s, disminuyendo el riesgo de aspiraciones (atragantamientos) en personas que tambi\xE9n presentan disfagia. Los vasos con doble asa facilitan un agarre bimanual estable."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Tapetes Antideslizantes:"), " Colocar l\xE1minas de silicona tipo Dycem bajo el plato impide que la vajilla se desplace por la mesa debido a movimientos bruscos involuntarios."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDC55"), " 2. Facilitando el Vestido y la Autonom\xEDa en el Cuidado Personal"), /*#__PURE__*/React.createElement("p", null, "La rigidez matutina y las fluctuaciones motoras (per\xEDodos \"ON-OFF\") convierten el acto de vestirse en una tarea lenta y agotadora. La fatiga acumulada durante el vestido a menudo reduce la energ\xEDa disponible para el resto del d\xEDa."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Modificaci\xF3n de la Ropa:"), " Sustituir cierres complejos por alternativas m\xE1s sencillas. Reemplazar botones tradicionales por botones magn\xE9ticos o tiras de velcro. Optar por pantalones con cintura el\xE1stica en lugar de cremalleras y cinturones r\xEDgidos."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Abotonadores y Tiradores de Cremallera:"), " Herramientas con mangos engrosados y antideslizantes que ayudan a pasar el bot\xF3n por el ojal con un esfuerzo m\xEDnimo de motricidad fina. Un simple aro met\xE1lico o cord\xF3n en los cursores de las cremalleras facilita su agarre."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Calzador de Mango Largo y Calzamedias:"), " Productos fundamentales para evitar tener que flexionarse excesivamente, lo que compromete gravemente el equilibrio y puede inducir ca\xEDdas."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Cordones El\xE1sticos para el Calzado:"), " Permiten transformar zapatos normales con cordones en calzado el\xE1stico tipo \"slip-on\", manteniendo la sujeci\xF3n necesaria sin requerir la destreza manual para hacer un lazo."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "T\xE9cnicas de Vestido:"), " Se recomienda comenzar siempre vistiendo la extremidad m\xE1s afectada por la rigidez o el temblor, y desvestirse en sentido inverso (retirando primero el lado m\xE1s \xE1gil). Realizar esta tarea sentados en una silla firme con reposabrazos mejora dr\xE1sticamente la seguridad."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDEBF"), " 3. Seguridad Cr\xEDtica en el Cuarto de Ba\xF1o"), /*#__PURE__*/React.createElement("p", null, "El ba\xF1o, por combinar superficies h\xFAmedas y espacios reducidos, representa la zona de mayor peligro del hogar. La inestabilidad postural en el Parkinson exige redise\xF1ar este espacio con un enfoque preventivo estricto."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Ducha vs Ba\xF1era:"), " Es altamente recomendable sustituir la ba\xF1era por un plato de ducha a ras de suelo. Las transferencias para entrar y salir de una ba\xF1era son complejas y aumentan el riesgo de ca\xEDdas al exigir mantener el equilibrio sobre un solo pie en suelo resbaladizo."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Asientos de Ducha:"), " El aseo debe realizarse sentado. El uso de banquetas con conteras antideslizantes o sillas de ducha con respaldo y reposabrazos proporciona un descanso seguro y reduce la fatiga muscular provocada por la bipedestaci\xF3n prolongada."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Barras de Apoyo Murales:"), " Colocadas estrat\xE9gicamente junto al inodoro y dentro de la ducha. Deben estar firmemente atornilladas y contar con superficies texturizadas antideslizantes. Deben evitarse los asideros de ventosa, ya que no garantizan la resistencia necesaria ante una p\xE9rdida s\xFAbita de equilibrio."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Elevador de Inodoro (WC):"), " Al elevar la altura del asiento del WC unos 10-15 cm, se reduce la flexi\xF3n de rodilla requerida y se facilita enormemente el paso de sentado a de pie, lo cual es cr\xEDtico dado que la bradicinesia dificulta la propulsi\xF3n muscular inicial."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDEB6"), " 4. Movilidad en el Hogar y Manejo de los Bloqueos de la Marcha"), /*#__PURE__*/React.createElement("p", null, "Uno de los fen\xF3menos m\xE1s incapacitantes en fases moderadas y avanzadas es el ", /*#__PURE__*/React.createElement("i", null, "freezing"), " o bloqueo de la marcha (la sensaci\xF3n de tener los pies \"pegados al suelo\"). Este fen\xF3meno suele ocurrir al iniciar la marcha, al girar o al atravesar espacios estrechos como puertas o pasillos."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Se\xF1ales Visuales y Auditivas:"), " Las pistas externas ayudan al cerebro a sortear el bloqueo motor. Colocar l\xEDneas de colores contrastantes en el suelo (por ejemplo, cintas adhesivas de color brillante perpendiculares al sentido de la marcha) act\xFAa como un est\xEDmulo visual que ayuda a la persona a \"dar el paso sobre la l\xEDnea\", rompiendo el bloqueo."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Productos de Apoyo Espec\xEDficos para la Marcha:"), " Existen andadores y bastones equipados con tecnolog\xEDa l\xE1ser que proyecta una l\xEDnea roja en el suelo frente al usuario cuando detecta un bloqueo. Al intentar \"pisar\" esa luz roja, el cerebro activa una v\xEDa motora alternativa no da\xF1ada. Los metr\xF3nomos port\xE1tiles que emiten un ritmo ac\xFAstico regular tambi\xE9n facilitan mantener un paso constante."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Eliminaci\xF3n de Obst\xE1culos:"), " Retirar alfombras, cables sueltos o muebles bajos. El suelo debe estar despejado para evitar tropiezos debido a la marcha festinante (pasos cortos, r\xE1pidos y arrastrando los pies)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Distribuci\xF3n Lum\xEDnica:"), " Mantener una iluminaci\xF3n uniforme en toda la vivienda. Las zonas con sombras marcadas o cambios bruscos de iluminaci\xF3n pueden ser malinterpretadas visualmente, desencadenando bloqueos de la marcha involuntarios."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\u270D\uFE0F"), " 5. Comunicaci\xF3n, Escritura y Ocio Adaptado"), /*#__PURE__*/React.createElement("p", null, "La micrograf\xEDa (escritura que se vuelve progresivamente m\xE1s peque\xF1a e ilegible) y los problemas de control fino limitan tareas cotidianas como firmar documentos, usar el tel\xE9fono m\xF3vil o disfrutar de juegos de mesa."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Bol\xEDgrafos con Peso y Mangos Engrosados:"), " Al igual que con los cubiertos, el peso extra estabiliza la mano para escribir de manera m\xE1s fluida. Los adaptadores de espuma blanda para l\xE1pices reducen la fuerza de prensi\xF3n requerida y la fatiga muscular de los dedos."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Tecnolog\xEDa de Apoyo:"), " Configurar asistentes de voz en dispositivos inteligentes (como altavoces inteligentes o tel\xE9fonos) para realizar llamadas, encender luces o programar recordatorios mediante comandos de voz simples, evitando la frustraci\xF3n de pulsar pantallas t\xE1ctiles peque\xF1as durante episodios de temblor."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Ocio Adaptado:"), " Juegos de mesa con piezas sobredimensionadas y f\xE1ciles de sujetar, soportes para cartas (tarjeteros) que eliminan la necesidad de sostenerlas constantemente en abanico con las manos, y libros en formato digital para ajustar el tama\xF1o del texto y evitar sostener f\xEDsicamente el peso de libros voluminosos."))), /*#__PURE__*/React.createElement("div", {
    className: "bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-2xl shadow-sm mt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-purple-800 uppercase tracking-wide text-base"
  }, "El Consejo del Terapeuta Ocupacional")), /*#__PURE__*/React.createElement("p", {
    className: "text-purple-900 italic text-base leading-relaxed"
  }, "\"Respeta los tiempos de la persona y planifica las actividades m\xE1s complejas durante los per\xEDodos 'ON' de la medicaci\xF3n (cuando los f\xE1rmacos logran su m\xE1ximo efecto terap\xE9utico). No caigas en la tentaci\xF3n de hacer las cosas por ellos bajo el pretexto de ir m\xE1s r\xE1pido; cada actividad que el usuario realiza por s\xED mismo, aunque tarde m\xE1s tiempo, es una victoria terap\xE9utica que preserva sus conexiones neuronales, su movilidad articular y, sobre todo, su dignidad y autoestima.\""))), /*#__PURE__*/React.createElement("div", {
    className: "mt-12 bg-gray-50 rounded-2xl p-6 sm:p-8 border border-brand-100 shadow-sm"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-brand-800 uppercase tracking-wide text-lg mb-6 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Check, null), " Material recomendado para el Parkinson"), /*#__PURE__*/React.createElement("ul", {
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
  }, /*#__PURE__*/React.createElement(GuiaParkinson, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();