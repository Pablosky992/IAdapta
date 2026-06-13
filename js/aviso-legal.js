(function() {
const {
  Icons,
  Navbar,
  Footer,
  CookieBanner
} = window;
const {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo
} = React;
const SectionLegal = function SectionLegal() {
  const [activeTab, setActiveTab] = useState('privacy');
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen pt-36 pb-20 px-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex border-b border-gray-100 bg-brand-50/30"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('legal'),
    className: `flex-1 py-6 font-bold text-lg transition-all focus:outline-none ${activeTab === 'legal' ? 'bg-white text-brand-900 border-b-4 border-brand-900' : 'text-gray-400 hover:text-brand-600'}`
  }, "Aviso Legal"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('privacy'),
    className: `flex-1 py-6 font-bold text-lg transition-all focus:outline-none ${activeTab === 'privacy' ? 'bg-white text-brand-900 border-b-4 border-brand-900' : 'text-gray-400 hover:text-brand-600'}`
  }, "Pol\xEDtica de Privacidad")), /*#__PURE__*/React.createElement("div", {
    className: "p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg anim-fade-in"
  }, activeTab === 'legal' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-4xl font-bold text-brand-900 mb-8"
  }, "Aviso Legal"), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-brand-800 mb-4"
  }, "1. Datos del Responsable"), /*#__PURE__*/React.createElement("p", null, "En cumplimiento del art\xEDculo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Informaci\xF3n y Comercio Electr\xF3nico (LSSI), se exponen los siguientes datos identificativos:"), /*#__PURE__*/React.createElement("ul", {
    className: "mt-4 space-y-2 list-disc pl-6"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Titular:"), " Pablo Narciso Mill\xE1n (IAdapta)"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Actividad:"), " Terapeuta Ocupacional & Especialista en Accesibilidad"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Email:"), " iadaptato@gmail.com"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Sitio Web:"), " iadapta.es"))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-brand-800 mb-4"
  }, "2. Finalidad del Sitio Web"), /*#__PURE__*/React.createElement("p", null, "IAdapta es una plataforma informativa dedicada a la difusi\xF3n de conocimientos sobre adaptaciones de ortopedia, accesibilidad y recursos para profesionales de la salud. El sitio web incluye enlaces de afiliaci\xF3n de Amazon y espacios publicitarios para su sostenibilidad.")), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-brand-800 mb-4"
  }, "3. Exclusi\xF3n de Responsabilidad (Descargo Cl\xEDnico)"), /*#__PURE__*/React.createElement("p", {
    className: "bg-brand-50 p-6 rounded-2xl border-l-4 border-brand-500 italic"
  }, "Todo el contenido, gu\xEDas, an\xE1lisis de IA y recursos publicados en este sitio web tienen car\xE1cter estrictamente orientativo e informativo. En ning\xFAn caso esta informaci\xF3n sustituye la valoraci\xF3n cl\xEDnica, el diagn\xF3stico o el tratamiento realizado por un profesional sanitario colegiado en persona. IAdapta no se hace responsable de las decisiones tomadas por el usuario basadas \xFAnicamente en la informaci\xF3n aqu\xED expuesta.")), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-brand-800 mb-4"
  }, "4. Propiedad Intelectual"), /*#__PURE__*/React.createElement("p", null, "Todo el contenido de este sitio web, incluyendo textos, gr\xE1ficos, interfaces, juegos cognitivos y logotipos, es propiedad de IAdapta o de sus proveedores de contenido y est\xE1 protegido por las leyes de propiedad intelectual internacionales.")), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-brand-800 mb-4"
  }, "5. Condiciones de Uso"), /*#__PURE__*/React.createElement("p", null, "El usuario se compromete a hacer un uso adecuado de los contenidos y servicios de la web. Queda prohibida la reproducci\xF3n total o parcial de los recursos profesionales y juegos con fines comerciales sin autorizaci\xF3n expresa del titular."))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-4xl font-bold text-brand-900 mb-8"
  }, "Pol\xEDtica de Privacidad y Cookies"), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-brand-800 mb-4"
  }, "1. Protecci\xF3n de Datos (RGPD)"), /*#__PURE__*/React.createElement("p", null, "IAdapta garantiza la protecci\xF3n de los datos de car\xE1cter personal que el usuario preocupe a trav\xE9s de los formularios de contacto o correos electr\xF3nicos, tratando dicha informaci\xF3n con la m\xE1xima confidencialidad y \xFAnicamente para responder a las solicitudes de servicio.")), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-brand-800 mb-4"
  }, "2. Uso de Cookies"), /*#__PURE__*/React.createElement("p", null, "Utilizamos cookies propias y de terceros para mejorar la experiencia de usuario, gestionar los enlaces de afiliaci\xF3n y mostrar publicidad:"), /*#__PURE__*/React.createElement("ul", {
    className: "mt-4 space-y-2 list-disc pl-6 mb-4"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Cookies de Afiliaci\xF3n:"), " Al clicar en productos recomendados, Amazon instala una cookie (24h) para identificar el origen de la compra."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Cookies T\xE9cnicas:"), " Necesarias para recordar tus preferencias (como la aceptaci\xF3n de este aviso).")), /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-brand-700 mt-6 mb-2"
  }, "Cookies Publicitarias de Google AdSense"), /*#__PURE__*/React.createElement("p", {
    className: "mb-2 text-sm"
  }, "Los proveedores de terceros, incluido Google, utilizan cookies para publicar anuncios bas\xE1ndose en las visitas anteriores de un usuario a nuestro sitio web o a otros sitios de Internet."), /*#__PURE__*/React.createElement("p", {
    className: "mb-2 text-sm"
  }, "El uso de cookies de publicidad permite a Google y a sus socios publicar anuncios basados en las visitas que los usuarios realizan a este sitio web y a otros en Internet."), /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, "Los usuarios pueden inhabilitar la publicidad personalizada. Para ello, pueden visitar la ", /*#__PURE__*/React.createElement("a", {
    href: "https://www.google.com/settings/ads",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "text-brand-600 underline"
  }, "Configuraci\xF3n de anuncios de Google"), ".")), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-brand-800 mb-4"
  }, "3. Valoraci\xF3n de la estancia (Gemini Vision)"), /*#__PURE__*/React.createElement("p", null, "Cuando utilizas nuestra Valoraci\xF3n de la estancia, las im\xE1genes enviadas se procesan de forma ef\xEDmera a trav\xE9s de la API de Google Gemini para generar el informe de accesibilidad. ", /*#__PURE__*/React.createElement("strong", null, "No almacenamos, compartimos ni utilizamos tus im\xE1genes"), " para ning\xFAn otro fin comercial o de entrenamiento de modelos."))), /*#__PURE__*/React.createElement("div", {
    className: "pt-10 border-t border-gray-100 flex justify-between items-center text-sm text-gray-400"
  }, /*#__PURE__*/React.createElement("p", null, "\xDAltima actualizaci\xF3n: Mayo 2026"), /*#__PURE__*/React.createElement("p", null, "iadapta.es")))));
};
function App() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Navbar, {
    currentPage: "legal"
  }), /*#__PURE__*/React.createElement("main", {
    id: "main-content"
  }, /*#__PURE__*/React.createElement(SectionLegal, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "legal"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();