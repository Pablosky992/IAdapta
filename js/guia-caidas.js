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
const GuiaCaidas = function GuiaCaidas() {
  const materials = [{
    name: 'Luces LED Nocturnas con Sensor de Movimiento',
    desc: 'Iluminan automáticamente los pasillos y el camino al baño durante la noche sin necesidad de buscar interruptores a oscuras.',
    image: 'assets/luces_sensor.png',
    link: 'https://amzn.to/4f2x4nP',
    query: 'luces led sensor movimiento enchufe'
  }, {
    name: 'Cinta Adhesiva Antideslizante para Alfombras',
    desc: 'Fija firmemente las alfombras al suelo de madera, baldosa o linóleo, evitando que las esquinas se levanten y provoquen tropiezos.',
    image: 'assets/cinta_alfombras.jpg',
    link: 'https://amzn.to/4aRELuy',
    query: 'cinta adhesiva doble cara alfombras antideslizante'
  }, {
    name: 'Barra de Apoyo Antideslizante para Baño',
    desc: 'Asidero de seguridad con textura rugosa que proporciona un punto de apoyo firme al entrar o salir de la ducha.',
    image: 'assets/barra_apoyo.png',
    link: 'https://amzn.to/4fopvaa',
    query: 'barra de apoyo seguridad ducha acero inoxidable'
  }, {
    name: 'Trapecio Incorporador para Cama',
    desc: 'Estructura de pie autónoma con asa ajustable suspendida que permite al usuario levantarse y posicionarse de forma segura en la cama.',
    image: 'assets/trapecio_cama.png',
    link: 'https://amzn.to/4gE7KWw',
    query: 'trapecio incorporador cama'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "pt-36 pb-24 px-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/guia_caidas.png",
    alt: "Prevenci\xF3n de ca\xEDdas en el hogar: Gu\xEDa de Terapia Ocupacional",
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
  }, "Prevenci\xF3n de Ca\xEDdas en el Hogar: Gu\xEDa Definitiva para un Entorno Seguro"), /*#__PURE__*/React.createElement("p", {
    className: "mb-4"
  }, "Las ca\xEDdas en el hogar representan uno de los mayores riesgos para la salud, la independencia y la calidad de vida de las personas mayores o con movilidad reducida. Una simple ca\xEDda puede desencadenar consecuencias f\xEDsicas graves, como fracturas de cadera, traumatismos craneoencef\xE1licos o el temido ", /*#__PURE__*/React.createElement("strong", null, "s\xEDndrome posca\xEDda"), " (el miedo intenso a volver a caerse, que lleva a la persona a autolimitar su actividad f\xEDsica, provocando un r\xE1pido deterioro de la fuerza y el equilibrio). La mayor\xEDa de los accidentes dom\xE9sticos no ocurren por azar, sino por una combinaci\xF3n de factores de riesgo intr\xEDnsecos (p\xE9rdida de equilibrio, problemas visuales o debilidad muscular) y extr\xEDnsecos (obst\xE1culos en el entorno)."), /*#__PURE__*/React.createElement("p", {
    className: "mb-6"
  }, "Desde la disciplina de la ", /*#__PURE__*/React.createElement("strong", null, "Terapia Ocupacional"), ", analizamos el hogar como un escenario din\xE1mico donde interact\xFAan la persona y sus actividades cotidianas. Adaptar la vivienda para eliminar barreras y a\xF1adir apoyos espec\xEDficos no es sin\xF3nimo de perder autonom\xEDa; al contrario, es la herramienta m\xE1s eficaz para preservarla y garantizar que el hogar siga siendo un refugio seguro. En esta gu\xEDa detallamos las principales estrategias de adaptaci\xF3n \xE1rea por \xE1rea."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8 mt-6 border-t border-gray-100 pt-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCA1"), " 1. Iluminaci\xF3n y Visibilidad: El Camino Seguro en la Oscuridad"), /*#__PURE__*/React.createElement("p", null, "El d\xE9ficit de iluminaci\xF3n es el desencadenante de un porcentaje muy elevado de ca\xEDdas nocturnas, especialmente cuando las personas se levantan con urgencia para ir al ba\xF1o a oscuras."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Luces de Noche Autom\xE1ticas:"), " Instalar luces LED con sensor de movimiento en los enchufes del pasillo, dormitorio y ba\xF1o. Estas luces se encienden solas cuando detectan el movimiento del usuario al levantarse de la cama, gui\xE1ndolo de forma segura sin tener que buscar los interruptores de la pared en la oscuridad."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Interruptores Accesibles y Luminosos:"), " Colocar interruptores con pilotos de luz LED que los hagan visibles en la penumbra. Adem\xE1s, el interruptor principal del dormitorio debe estar al alcance directo de la mano desde la cama para no levantarse nunca a oscuras."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Evitar Deslumbramientos:"), " Utilizar bombillas de luz c\xE1lida e indirecta para evitar destellos que puedan causar desorientaci\xF3n moment\xE1nea en personas con cataratas o degeneraci\xF3n macular."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83E\uDDF9"), " 2. Suelos Libres de Obst\xE1culos y Tropiezos"), /*#__PURE__*/React.createElement("p", null, "El suelo debe ser una superficie homog\xE9nea y predecible. Cualquier cambio brusco de nivel o elemento suelto se convierte en una trampa potencial para los pies:"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "El Peligro de las Alfombras:"), " Las alfombras son la causa n\xFAmero uno de tropiezos. Lo ideal es retirarlas del hogar. Si se decide conservarlas, es obligatorio fijarlas firmemente al suelo con cinta de doble cara de alta resistencia y asegurarse de que los bordes no est\xE9n deshilachados o levantados."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Zonas de Paso Despejadas:"), " Retirar del camino habitual muebles peque\xF1os, revisteros, macetas o cables el\xE9ctricos sueltos. Los cables deben canalizarse mediante canaletas de pl\xE1stico fijadas a las paredes o rodapi\xE9s."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Suelos Antideslizantes:"), " Evitar el encerado o pulido excesivo de los suelos de parqu\xE9 o m\xE1rmol. En zonas h\xFAmedas (ba\xF1o, cocina o accesos exteriores), aplicar tratamientos antideslizantes l\xEDquidos para baldosas."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDEBF"), " 3. El Cuarto de Ba\xF1o: La Zona de Mayor Riesgo del Hogar"), /*#__PURE__*/React.createElement("p", null, "El cuarto de ba\xF1o concentra el mayor n\xFAmero de ca\xEDdas graves debido a la presencia de agua, jab\xF3n y superficies resbaladizas. Adaptarlo es prioritario:"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Ducha en Lugar de Ba\xF1era:"), " El acceso a la ba\xF1era exige un gran equilibrio monopedal (apoyarse en un solo pie) para salvar la altura del borde, algo sumamente peligroso. Un plato de ducha a ras de suelo elimina esta barrera arquitect\xF3nica por completo."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Barras de Apoyo Murales:"), " Instalar barras de seguridad de acero inoxidable o materiales pl\xE1sticos rugosos atornilladas firmemente a la pared de la ducha y al lado del inodoro. Nunca se deben utilizar toalleros o jaboneras como puntos de agarre, ya que no est\xE1n dise\xF1ados para soportar el peso corporal."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Alfombrillas y Adhesivos Antideslizantes:"), " Colocar bandas antideslizantes rugosas en el fondo del plato de ducha y alfombras con ventosas de alta succi\xF3n fuera del mismo para secarse de forma segura."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDECF\uFE0F"), " 4. Seguridad en el Dormitorio y Transferencias"), /*#__PURE__*/React.createElement("p", null, "El paso de la cama a la posici\xF3n de pie (bipedestaci\xF3n) requiere estabilidad, especialmente al despertar, cuando la presi\xF3n arterial puede bajar bruscamente al incorporarse (hipotensi\xF3n ortost\xE1tica)."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Incorporador o Asidero de Cama:"), " Consiste en una barra met\xE1lica en forma de L que se ancla bajo el colch\xF3n. Proporciona un agarre seguro para que la persona pueda voltearse en la cama, sentarse en el borde e impulsarse para ponerse de pie con total estabilidad."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Altura Correcta de la Cama:"), " La cama debe estar a una altura que permita al usuario sentarse en el borde apoyando completamente las plantas de los pies en el suelo, manteniendo las rodillas en un \xE1ngulo de aproximadamente 90 grados. Si es demasiado baja o alta, el esfuerzo para levantarse puede provocar p\xE9rdidas de equilibrio."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Calzado Adecuado en el Despertar:"), " Evitar levantarse descalzo o en calcetines normales. Usar calzado cerrado, sujeto al tal\xF3n (evitar chanclas o pantuflas abiertas) y con suelas de goma antideslizante. Si se prefiere andar sin zapatos, utilizar calcetines con suela de silicona rugosa (antideslizantes)."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-brand-900 text-xl flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDC63"), " 5. Escaleras y Accesos Exteriores Seguros"), /*#__PURE__*/React.createElement("p", null, "Las escaleras son zonas cr\xEDticas donde cualquier error de c\xE1lculo visual o tropiezo menor puede derivar en consecuencias catastr\xF3ficas."), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Doble Pasamanos:"), " Instalar pasamanos a ambos lados de la escalera, extendi\xE9ndose unos 30 cm m\xE1s all\xE1 del primer y \xFAltimo escal\xF3n. Esto proporciona un apoyo continuo durante todo el trayecto."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Se\xF1alizaci\xF3n Visual de los Escalones:"), " Colocar tiras antideslizantes con contraste de color (o fotoluminiscentes) en el borde de cada pelda\xF1o para facilitar que las personas identifiquen claramente el relieve de los escalones, previniendo fallos de c\xE1lculo de profundidad."))), /*#__PURE__*/React.createElement("div", {
    className: "bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("h5", {
    className: "font-bold text-emerald-800 uppercase tracking-wide text-base"
  }, "El Consejo del Terapeuta Ocupacional")), /*#__PURE__*/React.createElement("p", {
    className: "text-emerald-900 italic text-base leading-relaxed"
  }, "\"No subestimes el peligro de levantarte r\xE1pidamente de la cama o del sof\xE1. Al cambiar bruscamente de posici\xF3n, el cuerpo tarda unos segundos en regular la presi\xF3n arterial. Acost\xFAmbrate a seguir la regla de los tres pasos: 1) Si\xE9ntate lentamente en el borde de la cama, 2) Espera unos 10-15 segundos respirando con tranquilidad y apoyando bien los pies en el suelo, y 3) Lev\xE1ntate apoy\xE1ndote firmemente en un asidero o en tus muslos. Esta simple pausa evita los mareos repentinos que causan la mayor\xEDa de ca\xEDdas al despertar.\""))), /*#__PURE__*/React.createElement("div", {
    className: "mt-12 bg-gray-50 rounded-2xl p-6 sm:p-8 border border-brand-100 shadow-sm"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-brand-800 uppercase tracking-wide text-lg mb-6 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Check, null), " Material recomendado para la Prevenci\xF3n de Ca\xEDdas"), /*#__PURE__*/React.createElement("ul", {
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
  }, /*#__PURE__*/React.createElement(GuiaCaidas, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "guides"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();