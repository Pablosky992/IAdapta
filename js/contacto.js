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
const SectionContact = function SectionContact() {
  const info = [{
    icon: /*#__PURE__*/React.createElement(Icons.Mail, null),
    label: 'Correo electrónico',
    value: 'iadaptato@gmail.com',
    href: 'mailto:iadaptato@gmail.com'
  }, {
    icon: /*#__PURE__*/React.createElement(Icons.Location, null),
    label: 'Localización',
    value: 'Barcelona, España',
    href: null
  }, {
    icon: /*#__PURE__*/React.createElement(Icons.Heart, {
      className: "fill-red-500 text-red-500"
    }),
    label: 'Apoyo al proyecto',
    value: 'Realizar una donación',
    href: 'https://www.paypal.com/donate/?hosted_button_id=E8A34ZM4Q4YS8',
    special: true
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    className: "pt-36 pb-24 px-4 bg-gradient-to-b from-brand-50 to-white min-h-screen"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-14"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block bg-brand-100 text-brand-700 rounded-full px-5 py-2 text-base font-bold uppercase tracking-widest mb-4"
  }, "Contacto"), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-4xl sm:text-5xl font-bold text-brand-900 mb-4"
  }, "Hablemos"), /*#__PURE__*/React.createElement("div", {
    className: "section-divider w-24 mx-auto mb-6"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-gray-600 max-w-2xl mx-auto"
  }, "\xBFTienes dudas, quieres solicitar una valoraci\xF3n o simplemente saludar? Estar\xE9 encantado de atenderte.")), /*#__PURE__*/React.createElement("div", {
    className: "max-w-xl mx-auto space-y-6"
  }, info.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `flex items-center gap-5 border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all ${item.special ? 'bg-rose-50 border-rose-200 shadow-rose-100' : 'bg-white border-brand-100'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${item.special ? 'bg-white text-red-600 shadow-sm' : 'bg-brand-100 text-brand-600'}`
  }, item.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: `text-sm font-bold uppercase tracking-widest mb-0.5 ${item.special ? 'text-rose-400' : 'text-brand-400'}`
  }, item.label), item.href ? /*#__PURE__*/React.createElement("a", {
    href: item.href,
    target: item.href.startsWith('mailto:') ? undefined : "_blank",
    rel: item.href.startsWith('mailto:') ? undefined : "noopener noreferrer",
    className: `text-xl font-semibold underline underline-offset-2 transition-colors ${item.special ? 'text-rose-700 hover:text-rose-900' : 'text-brand-800 hover:text-brand-600'}`
  }, item.value) : /*#__PURE__*/React.createElement("p", {
    className: "text-xl font-semibold text-brand-800"
  }, item.value)))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-3xl overflow-hidden shadow-2xl border border-brand-100 mt-10"
  }, /*#__PURE__*/React.createElement("img", {
    src: "contact_ot.jpg",
    alt: "Consulta de Terapia Ocupacional - Intervenci\xF3n profesional",
    className: "w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
  })))));
};
function App() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Navbar, {
    currentPage: "contact"
  }), /*#__PURE__*/React.createElement("main", {
    id: "main-content"
  }, /*#__PURE__*/React.createElement(SectionContact, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "contact"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();