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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const info = [{
    icon: /*#__PURE__*/React.createElement(Icons.Mail, null),
    label: 'Correo electrónico',
    value: 'iadaptato@gmail.com',
    href: '#',
    onClick: (e) => { e.preventDefault(); setIsModalOpen(true); }
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    id: "contact",
    className: "pt-36 pb-24 px-4 bg-gradient-to-b from-brand-50 to-white min-h-screen relative"
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
    target: item.href === '#' ? undefined : "_blank",
    rel: item.href === '#' ? undefined : "noopener noreferrer",
    onClick: item.onClick,
    className: `text-xl font-semibold underline underline-offset-2 transition-colors cursor-pointer ${item.special ? 'text-rose-700 hover:text-rose-900' : 'text-brand-800 hover:text-brand-600'}`
  }, item.value) : /*#__PURE__*/React.createElement("p", {
    className: "text-xl font-semibold text-brand-800"
  }, item.value)))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-3xl overflow-hidden shadow-2xl border border-brand-100 mt-10"
  }, /*#__PURE__*/React.createElement("img", {
    src: "contact_ot.jpg",
    alt: "Consulta de Terapia Ocupacional - Intervenci\xF3n profesional",
    className: "w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
  })))), isModalOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[100] flex items-center justify-center bg-brand-900/40 backdrop-blur-sm p-4",
    onClick: () => setIsModalOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    className: "absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-brand-50 text-brand-600 font-bold rounded-full hover:bg-brand-100 transition-colors",
    onClick: () => setIsModalOpen(false),
    title: "Cerrar"
  }, "\u2715"), /*#__PURE__*/React.createElement("form", {
    action: "https://formsubmit.co/iadaptato@gmail.com",
    method: "POST",
    className: "space-y-4 mt-2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-brand-900 mb-4"
  }, "Env\xEDanos un mensaje"), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_subject",
    value: "Nuevo mensaje de contacto desde IAdapta (Contacto)"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_next",
    value: "https://iadapta.vercel.app/contacto.html"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_captcha",
    value: "false"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-1"
  }, "Nombre"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "name",
    required: true,
    className: "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-1"
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    name: "email",
    required: true,
    className: "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-1"
  }, "Mensaje"), /*#__PURE__*/React.createElement("textarea", {
    name: "message",
    required: true,
    rows: "4",
    className: "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "w-full bg-brand-900 text-white font-bold py-3 px-4 rounded-xl hover:bg-brand-800 transition-colors mt-2"
  }, "Enviar mensaje"))))));
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