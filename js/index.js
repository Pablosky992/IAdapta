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

// --- COMPONENTE SECTIONABOUT ---
const SectionAbout = function SectionAbout() {
  return /*#__PURE__*/React.createElement("section", {
    id: "about",
    className: "pt-36 pb-24 px-4 bg-white relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-br from-brand-50 to-sky-50 rounded-3xl border border-brand-100 shadow-lg p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shrink-0 relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-brand-400 rounded-full blur-2xl opacity-20"
  }), /*#__PURE__*/React.createElement("img", {
    src: "narciso_millan_portrait.jpg",
    alt: "Pablo Narciso Mill\xE1n",
    className: "relative w-64 h-64 rounded-full object-cover shadow-xl border-4 border-white z-10"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 text-center md:text-left"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block bg-white text-brand-600 border border-brand-200 text-sm font-bold uppercase tracking-widest rounded-full px-4 py-1.5 mb-4 shadow-sm"
  }, "Sobre M\xED"), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-4xl font-bold text-brand-900 mb-4"
  }, "Pablo Narciso Mill\xE1n"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 text-xl text-gray-700 leading-relaxed mb-6"
  }, /*#__PURE__*/React.createElement("p", null, "Terapeuta Ocupacional graduado en 2015 con una s\xF3lida trayectoria en ", /*#__PURE__*/React.createElement("strong", {
    className: "text-brand-700"
  }, "geriatr\xEDa y ortopedia"), ". Mi enfoque se centra en potenciar la autonom\xEDa de las personas mediante intervenciones personalizadas que combinan la experiencia cl\xEDnica con soluciones pr\xE1cticas y resolutivas para el d\xEDa a d\xEDa."), /*#__PURE__*/React.createElement("p", null, "Aprovecho mi conocimiento en herramientas innovadoras como la ", /*#__PURE__*/React.createElement("strong", {
    className: "text-brand-700"
  }, "impresi\xF3n 3D"), " para promover el uso de adaptaciones funcionales de bajo coste, buscando siempre que la tecnolog\xEDa sea un puente hacia la independencia. Mi objetivo es mejorar la calidad de vida de mis pacientes, ofreciendo una atenci\xF3n t\xE9cnica, emp\xE1tica y adaptada a las necesidades reales de cada entorno.")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row items-center justify-between gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-3 justify-center md:justify-start"
  }, ['Geriatría', 'Ortopedia', 'Impresión 3D', 'Adaptación del Entorno'].map(tag => /*#__PURE__*/React.createElement("span", {
    key: tag,
    className: "bg-white border border-brand-200 text-brand-700 rounded-full px-4 py-1.5 text-sm font-semibold shadow-sm"
  }, tag))), /*#__PURE__*/React.createElement("a", {
    href: "cv.html",
    className: "shrink-0 flex items-center gap-2 bg-brand-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-800 transition-all shadow-md hover:shadow-lg active:scale-95 group"
  }, /*#__PURE__*/React.createElement(Icons.FileText, null), "Ver Curr\xEDculum", /*#__PURE__*/React.createElement("span", {
    className: "transition-transform group-hover:translate-x-1"
  }, /*#__PURE__*/React.createElement(Icons.ArrowRight, null))))))));
};

// --- COMPONENTE SECTIONHOME ---
const SectionHome = function SectionHome() {
  const cards = [{
    id: 'analyzer',
    icon: /*#__PURE__*/React.createElement(Icons.Brain, null),
    color: 'bg-sky-100 text-sky-600',
    badge: 'Inteligencia Artificial',
    title: 'Valoración de la estancia',
    desc: 'Introduce las características de tu hogar o espacio y nuestra inteligencia artificial evaluará las barreras arquitectónicas existentes, sugiriendo las mejores adaptaciones.',
    cta: 'Valorar estancia',
    img: 'ai_analyzer_thumbnail.png',
    href: 'valoracion-estancia.html'
  }, {
    id: 'guides',
    icon: /*#__PURE__*/React.createElement(Icons.Book, null),
    color: 'bg-indigo-100 text-indigo-600',
    badge: 'Recursos',
    title: 'Guías de Adaptación',
    desc: 'Consejos prácticos, normativas y descripciones detalladas de productos de apoyo para adaptar el baño, cocina, dormitorio y zonas comunes del hogar, previniendo caídas.',
    cta: 'Explorar guías',
    img: 'adaptation_guides_thumbnail.png',
    href: 'guias.html'
  }, {
    id: 'cognitive',
    icon: /*#__PURE__*/React.createElement(Icons.Puzzle, null),
    color: 'bg-emerald-100 text-emerald-600',
    badge: 'Entrenamiento Mental',
    title: 'Ejercicios Mentales',
    desc: 'Ejercicios prácticos, retos diarios de memoria, cálculo numérico, sopas de letras y atención visual diseñados para fortalecer la agilidad mental y promover la autonomía personal.',
    cta: 'Entrenar ahora',
    img: 'mental_exercises_thumbnail.png',
    href: 'estimulacion-cognitiva.html'
  }, {
    id: 'resources',
    icon: /*#__PURE__*/React.createElement(Icons.FilePdf, null),
    color: 'bg-rose-100 text-rose-600',
    badge: 'Área Profesional',
    title: 'Recursos para Profesionales',
    desc: 'Herramientas y materiales descargables diseñados para facilitar la práctica clínica diaria de terapeutas ocupacionales y profesionales de la salud.',
    cta: 'Ver recursos',
    img: 'resources_bg.png',
    href: 'recursos.html'
  }, {
    id: 'caregiver_resources',
    icon: /*#__PURE__*/React.createElement(Icons.Heart, {
      className: "fill-rose-500 text-rose-500 w-6 h-6"
    }),
    color: 'bg-rose-50 text-rose-600',
    badge: 'Área del Cuidador',
    title: 'Recursos para el Cuidador',
    desc: 'Pautas prácticas, manuales ergonómicos, infografías de autocuidado y herramientas de apoyo diario diseñados para familiares y cuidadores.',
    cta: 'Ver recursos',
    img: 'recursos_cuidador_thumbnail.png',
    href: 'recursos-cuidador.html'
  }, {
    id: 'cv',
    icon: /*#__PURE__*/React.createElement(Icons.FileText, null),
    color: 'bg-blue-100 text-blue-600',
    badge: 'Perfil Profesional',
    title: 'Mi Trayectoria',
    desc: 'Conoce mi formación, experiencia clínica en geriatría y ortopedia, y competencias avanzadas en impresión 3D.',
    cta: 'Saber más',
    img: 'cv_trayectoria_thumbnail_ot_v2.png',
    href: 'cv.html'
  }];
  return /*#__PURE__*/React.createElement("div", {
    id: "home"
  }, /*#__PURE__*/React.createElement("section", {
    className: "hero-gradient min-h-[90vh] flex flex-col justify-center pt-32 pb-20 px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-16"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-900 leading-tight mb-6"
  }, "Tu bienestar y", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "text-brand-500"
  }, "autonom\xEDa"), ", primero"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-10"
  }, "Evaluaci\xF3n experta de tu entorno y asesoramiento en productos de apoyo. ", /*#__PURE__*/React.createElement("strong", {
    className: "text-brand-700"
  }, "\"Te gu\xEDo en la adaptaci\xF3n de tu casa para que vuelvas a moverte con seguridad y total confianza.\""))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center"
  }, cards.map((c, i) => /*#__PURE__*/React.createElement("a", {
    key: c.id,
    href: c.href,
    className: "bg-white rounded-3xl overflow-hidden border border-blue-50 shadow-lg card-lift flex flex-col cursor-pointer group block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative h-44 overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: c.img,
    alt: c.title,
    className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
  }), /*#__PURE__*/React.createElement("div", {
    className: `absolute top-4 right-4 w-12 h-12 ${c.color} rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform`
  }, c.icon)), /*#__PURE__*/React.createElement("div", {
    className: "p-6 flex flex-col flex-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-bold uppercase tracking-[0.2em] text-brand-400 mb-2"
  }, c.badge), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-xl font-bold text-brand-900 mb-3 group-hover:text-brand-600 transition-colors leading-tight"
  }, c.title), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 text-sm leading-relaxed flex-1 line-clamp-3"
  }, c.desc), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 inline-flex items-center gap-2 text-brand-600 font-bold text-sm group-hover:gap-3 transition-all"
  }, c.cta, /*#__PURE__*/React.createElement(Icons.ArrowRight, null)))))))));
};

// --- COMPONENTE SECTIONCONTACT ---
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
    className: "pt-36 pb-24 px-4 bg-gradient-to-b from-brand-50 to-white relative"
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
    value: "Nuevo mensaje de contacto desde IAdapta (Inicio)"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "redirect",
    value: "https://iadapta.es/"
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

// --- APLICACIÓN PRINCIPAL ---
function App() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Navbar, {
    currentPage: "home"
  }), /*#__PURE__*/React.createElement("main", {
    id: "main-content"
  }, /*#__PURE__*/React.createElement(SectionHome, null), /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-divider my-0"
  })), /*#__PURE__*/React.createElement(SectionAbout, null), /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-divider my-0"
  })), /*#__PURE__*/React.createElement(SectionContact, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "home"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();