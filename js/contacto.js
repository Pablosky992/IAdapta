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
    icon: /*#__PURE__*/React.createElement(Icons.Instagram, null),
    label: 'Síguenos en Instagram',
    value: '@iadapta',
    href: 'https://www.instagram.com/iadapta/'
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
  }, info.map((item, i) => {
    const CardElement = item.href ? 'a' : 'div';
    return /*#__PURE__*/React.createElement(CardElement, {
      key: i,
      href: item.href || undefined,
      target: item.href ? "_blank" : undefined,
      rel: item.href ? "noopener noreferrer" : undefined,
      className: `flex items-center justify-between gap-5 border rounded-[2rem] p-6 shadow-sm hover:shadow-lg transition-all duration-300 group ${item.special ? 'bg-gradient-to-r from-rose-50 to-rose-100/30 border-rose-200 shadow-rose-50 hover:border-rose-300' : 'bg-white border-brand-100 hover:border-brand-300'} ${item.href ? 'cursor-pointer' : ''}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${item.special ? 'bg-white text-red-600 shadow-sm' : 'bg-brand-100 text-brand-600'}`
    }, item.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: `text-xs font-bold uppercase tracking-widest mb-1 ${item.special ? 'text-rose-400' : 'text-brand-400'}`
    }, item.label), /*#__PURE__*/React.createElement("p", {
      className: `text-lg sm:text-xl font-semibold transition-colors ${item.special ? 'text-rose-800 group-hover:text-rose-950' : 'text-brand-800 group-hover:text-brand-600'}`
    }, item.value))), item.href && /*#__PURE__*/React.createElement("div", {
      className: `w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 ${item.special ? 'text-rose-600 bg-white shadow-sm' : 'text-brand-600 bg-brand-50'}`
    }, /*#__PURE__*/React.createElement("svg", {
      className: "w-5 h-5",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
      strokeWidth: "2.5"
    }, /*#__PURE__*/React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M9 5l7 7-7 7"
    }))));
  }), /*#__PURE__*/React.createElement("div", {
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