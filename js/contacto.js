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
    icon: /*#__PURE__*/React.createElement(Icons.Mail, {
      className: "w-7 h-7 text-white"
    }),
    label: 'Correo electrónico',
    value: 'contacto@iadapta.es',
    href: '#',
    onClick: e => {
      e.preventDefault();
      setIsModalOpen(true);
    },
    iconBg: 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-100',
    cardBorder: 'hover:border-indigo-400 hover:shadow-indigo-50/50'
  }, {
    icon: /*#__PURE__*/React.createElement(Icons.WhatsApp, {
      className: "w-7 h-7 text-white"
    }),
    label: 'WhatsApp',
    value: ['+34', '644', '61', '62', '32'].join(' '),
    href: '#',
    onClick: e => {
      e.preventDefault();
      const p1 = '34';
      const p2 = '644';
      const p3 = '616';
      const p4 = '232';
      window.open(`https://wa.me/${p1}${p2}${p3}${p4}?text=Hola,%20tengo%20una%20consulta%20sobre%20IAdapta`, '_blank', 'noopener,noreferrer');
    },
    iconBg: 'bg-[#25d366] text-white shadow-md shadow-green-100',
    cardBorder: 'hover:border-green-400 hover:shadow-green-50/50'
  }, {
    icon: /*#__PURE__*/React.createElement(Icons.Instagram, {
      className: "w-7 h-7 text-white"
    }),
    label: 'Síguenos en Instagram',
    value: '@iadapta',
    href: 'https://www.instagram.com/iadapta/',
    iconBg: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-md shadow-pink-100',
    cardBorder: 'hover:border-pink-300 hover:shadow-pink-50/50'
  }, {
    icon: /*#__PURE__*/React.createElement(Icons.LinkedIn, {
      className: "w-7 h-7 text-white"
    }),
    label: 'LinkedIn',
    value: 'Pablo Narciso Millán',
    href: 'https://www.linkedin.com/in/pablo-narciso-millan',
    iconBg: 'bg-[#0077b5] text-white shadow-md shadow-blue-100',
    cardBorder: 'hover:border-blue-400 hover:shadow-blue-50/50'
  }, {
    icon: /*#__PURE__*/React.createElement(Icons.Heart, {
      className: "fill-red-500 text-red-500"
    }),
    label: 'Apoyo al proyecto',
    value: 'Realizar una donación',
    href: '#',
    onClick: e => {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('open-donation-modal'));
    },
    special: true
  }];
  return /*#__PURE__*/React.createElement("section", {
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
  }, info.map((item, i) => {
    const CardElement = item.href ? 'a' : 'div';
    return /*#__PURE__*/React.createElement(CardElement, {
      key: i,
      href: item.href || undefined,
      onClick: item.onClick || undefined,
      target: item.href && !item.href.startsWith('#') && !item.href.startsWith('mailto:') ? "_blank" : undefined,
      rel: item.href && !item.href.startsWith('#') && !item.href.startsWith('mailto:') ? "noopener noreferrer" : undefined,
      className: `flex items-center justify-between gap-5 border rounded-[2rem] p-6 shadow-sm hover:shadow-lg transition-all duration-300 group ${item.special ? 'bg-gradient-to-r from-rose-50 to-rose-100/30 border-rose-200 shadow-rose-50 hover:border-rose-300' : item.cardBorder || 'bg-white border-brand-100 hover:border-brand-300'} ${item.href ? 'cursor-pointer' : ''}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${item.special ? 'bg-white text-red-600 shadow-sm' : item.iconBg || 'bg-brand-100 text-brand-600'}`
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
  })))), isModalOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-brand-950/40 backdrop-blur-sm transition-opacity",
    onClick: () => setIsModalOpen(false)
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative bg-white rounded-[2.5rem] shadow-2xl border border-brand-100 w-full max-w-lg overflow-hidden transform transition-all p-8 sm:p-10 z-10"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsModalOpen(false),
    className: "absolute top-6 right-6 text-gray-400 hover:text-brand-800 transition-colors w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-brand-50"
  }, /*#__PURE__*/React.createElement(Icons.Close, {
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-2xl font-bold text-brand-900 mb-2"
  }, "Env\xEDanos un mensaje"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 text-sm"
  }, "Completa el formulario y te responder\xE9 lo antes posible.")), /*#__PURE__*/React.createElement("form", {
    action: "https://api.web3forms.com/submit",
    method: "POST",
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "access_key",
    value: "17a9d1e2-5bc3-4d1e-856c-1e9873dd9cee"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "subject",
    value: "Nuevo mensaje de contacto desde IAdapta"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "redirect",
    value: "https://iadapta.es/contacto.html"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold uppercase tracking-wider text-brand-400 mb-1.5"
  }, "Nombre"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "name",
    required: true,
    placeholder: "Tu nombre",
    className: "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-gray-700 transition-all text-base"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold uppercase tracking-wider text-brand-400 mb-1.5"
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    name: "email",
    required: true,
    placeholder: "tu@email.com",
    className: "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-gray-700 transition-all text-base"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold uppercase tracking-wider text-brand-400 mb-1.5"
  }, "Mensaje"), /*#__PURE__*/React.createElement("textarea", {
    name: "message",
    required: true,
    rows: "4",
    placeholder: "\xBFEn qu\xE9 puedo ayudarte?",
    className: "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-gray-700 transition-all resize-none text-base"
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "w-full bg-brand-900 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-brand-800 transition-colors shadow-md hover:shadow-lg mt-2 text-base"
  }, "Enviar mensaje")))));
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