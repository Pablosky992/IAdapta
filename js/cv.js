(function() {
const {
  Icons,
  Navbar,
  Footer,
  CookieBanner
} = window;
const {
  useState,
  useEffect
} = React;
const SectionCV = function SectionCV() {
  const [mailHref, setMailHref] = useState('#');
  useEffect(() => {
    const u = "pnarciso92";
    const d = "gmail.com";
    setMailHref(`mailto:${u}@${d}`);
  }, []);
  const experience = [{
    period: '06/2026 – Actualidad',
    role: 'Terapeuta Ocupacional',
    place: 'Ortopedia LaFACT',
    desc: 'Asesoramiento especializado en productos de apoyo y adaptaciones funcionales. Valoración integral de la autonomía y diseño de soluciones personalizadas.',
    tags: ['Ortopedia', 'Adaptaciones', 'Evaluación', 'Gestión', 'Atención al Cliente'],
    isCurrent: true
  }, {
    period: '09/2021 – 05/2026',
    role: 'Técnico y Terapeuta Ocupacional',
    place: 'Instituto Técnico Ortopédico, Barcelona',
    desc: 'Evaluación y diagnóstico de necesidades funcionales. Control de stock y gestión de proveedores. Elaboración de presupuestos personalizados. Responsable de tienda y atención al cliente.',
    tags: ['Evaluación', 'Gestión', 'Atención al Cliente']
  }, {
    period: '02/2016 – 09/2021',
    role: 'Terapeuta Ocupacional',
    place: 'Residencia asistida Sant Víctor, Artés',
    desc: 'Gestión de productos ortopédicos. Diseño de actividades de estimulación funcional y cognitiva. Promoción de la autonomía mediante intervención centrada en la persona.',
    tags: ['Geriatría', 'Estimulación', 'ACP']
  }, {
    period: '09/2015 – 04/2020',
    role: 'Terapeuta Ocupacional',
    place: 'Residencia Valldaura, Manresa',
    desc: 'Intervención integral en personas mayores con dependencia. Trabajo multidisciplinar para un enfoque global y continuo.',
    tags: ['Geriatría', 'Dependencia', 'Trabajo en Equipo']
  }, {
    period: '06/2014 – 12/2014',
    role: 'Auxiliar de Terapia Ocupacional',
    place: 'Centro de Día MonBarnasalud, L\'Hospitalet',
    desc: 'Apoyo en sesiones terapéuticas y actividades de estimulación funcional y cognitiva. Facilitación de la participación y fomento de la autonomía en AVD.',
    tags: ['AVD', 'Soporte Terapéutico', 'Estimulación']
  }, {
    period: '01/2010 – 04/2015',
    role: 'Administrativo y Vendedor',
    place: 'Empresa Informática, L\'Hospitalet',
    desc: 'Atención al cliente, comunicación, gestión administrativa y soporte técnico en venta y reparación de equipos informáticos.',
    tags: ['Gestión', 'Soporte Técnico', 'Atención al Cliente']
  }, {
    period: '2011 – 2014',
    role: 'Prácticas de Terapia Ocupacional',
    place: 'Varios Centros (Barcelona y L\'H)',
    desc: 'Formación práctica en salud mental, entornos residenciales y hospitalarios (Bellvitge, Benito Menni, Feixa Llarga, Sant Pere Claver).',
    tags: ['Formación Práctica', 'Salud Mental', 'Hospitales']
  }];
  const education = [{
    year: '2015',
    degree: 'Grado en Terapia Ocupacional (Mención Intervención Avanzada)',
    school: 'EUIT Terrassa'
  }, {
    year: 'Extra',
    degree: 'Gestión y Dirección Sanitaria',
    school: 'Formación Complementaria'
  }, {
    year: 'Extra',
    degree: 'RCP y Primeros Auxilios',
    school: 'Formación Complementaria'
  }, {
    year: 'Extra',
    degree: 'Toma de medidas para medias de compresión',
    school: 'Curso de Ortopedia y Formación Complementaria'
  }, {
    year: 'Extra',
    degree: 'Manipulador de Alimentos',
    school: 'Formación Complementaria'
  }, {
    year: 'Extra',
    degree: 'Ventas y Atención al Cliente',
    school: 'Formación Complementaria'
  }];
  const skills = [{
    label: 'Geriatría, Rehabilitación y Autonomía',
    icon: '👵'
  }, {
    label: 'Evaluación y Ortopedia Técnica',
    icon: '♿'
  }, {
    label: 'Productos de Apoyo y Adaptación',
    icon: '🔧'
  }, {
    label: 'Diseño e Impresión 3D en Salud',
    icon: '🖨️'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen pt-32 pb-20 bg-gray-50/50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] border border-gray-100 shadow-xl p-8 sm:p-12 mb-12 flex flex-col md:flex-row gap-10 items-center relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 right-0 w-80 h-80 bg-brand-50 rounded-full blur-3xl -z-10 opacity-70"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-0 left-0 w-80 h-80 bg-indigo-50/50 rounded-full blur-3xl -z-10 opacity-70"
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative group shrink-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -inset-1.5 bg-gradient-to-tr from-brand-600 to-indigo-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-300"
  }), /*#__PURE__*/React.createElement("img", {
    src: "assets/contacto_terapeuta.jpg",
    alt: "Pablo Narciso Mill\xE1n",
    className: "relative w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-full border-4 border-white shadow-lg"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 text-center md:text-left space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "inline-block bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2"
  }, "Perfil Profesional"), /*#__PURE__*/React.createElement("h1", {
    className: "font-display text-4xl sm:text-5xl font-bold text-brand-900"
  }, "Pablo Narciso Mill\xE1n"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl sm:text-2xl font-bold bg-gradient-to-r from-brand-700 to-indigo-700 bg-clip-text text-transparent mt-1"
  }, "Terapeuta Ocupacional | Especialista en Ortopedia y Geriatr\xEDa")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-x-6 gap-y-2 text-sm sm:text-base text-gray-500 font-bold justify-center md:justify-start"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, "\uD83D\uDCCD Barcelona, Espa\xF1a")), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 text-lg sm:text-xl leading-relaxed"
  }, "Terapeuta Ocupacional graduado en 2015 con una s\xF3lida trayectoria de m\xE1s de una d\xE9cada en geriatr\xEDa y productos de apoyo. Mi enfoque se centra en potenciar la autonom\xEDa mediante intervenciones de vanguardia, impresi\xF3n 3D adaptada y soluciones de ortopedia t\xE9cnica."), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-4 justify-center md:justify-start pt-2"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.linkedin.com/in/pablo-narciso-millan",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "inline-flex items-center gap-2 px-5 py-2.5 bg-[#0077b5] text-white font-bold rounded-xl text-sm shadow-md hover:bg-[#006396] hover:shadow-lg transition-all active:scale-95 no-print"
  }, /*#__PURE__*/React.createElement(Icons.LinkedIn, {
    className: "w-5 h-5 text-white"
  }), "LinkedIn"), /*#__PURE__*/React.createElement("a", {
    href: mailHref,
    className: "inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold rounded-xl text-sm shadow-md hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transition-all active:scale-95 no-print",
    title: "Haga clic para enviar un correo electr\xF3nico"
  }, /*#__PURE__*/React.createElement(Icons.Mail, {
    className: "w-5 h-5 text-white"
  }), "Enviar Correo"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      window.print();
    },
    className: "inline-flex items-center gap-2 px-5 py-2.5 bg-brand-900 text-white font-bold rounded-xl text-sm shadow-md hover:bg-brand-950 hover:shadow-lg transition-all active:scale-95 no-print"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-5 h-5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
  })), "Descargar CV (PDF)")))), /*#__PURE__*/React.createElement("div", {
    className: "grid lg:grid-cols-12 gap-12 items-start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-7 space-y-8"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-2xl font-bold text-brand-900 mb-6 flex items-center gap-3 border-b border-gray-100 pb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-8 h-8 bg-brand-900 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-sm"
  }, "\uD83D\uDCBC"), "Experiencia Profesional"), /*#__PURE__*/React.createElement("ol", {
    className: "relative border-l-2 border-brand-200 ml-4 space-y-10 pl-6"
  }, experience.map((exp, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "relative"
  }, /*#__PURE__*/React.createElement("span", {
    className: `absolute -left-[31px] top-1.5 flex h-4 h-4 w-4 rounded-full border-2 border-white shadow-sm items-center justify-center ${exp.isCurrent ? 'bg-brand-600 ring-4 ring-brand-100' : 'bg-brand-400'}`
  }, exp.isCurrent && /*#__PURE__*/React.createElement("span", {
    className: "absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75 animate-ping"
  })), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-brand-200 transition-all group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center justify-between gap-2 mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: `text-xs font-bold px-2.5 py-1 rounded-full ${exp.isCurrent ? 'bg-brand-100 text-brand-800' : 'bg-gray-100 text-gray-600'}`
  }, exp.period), exp.isCurrent && /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md animate-pulse"
  }, "Puesto Actual")), /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-xl text-brand-900 leading-tight group-hover:text-brand-700 transition-colors"
  }, exp.role), /*#__PURE__*/React.createElement("p", {
    className: "text-brand-500 font-semibold text-base mb-3"
  }, exp.place), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 text-base leading-relaxed mb-4"
  }, exp.desc), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-1.5"
  }, exp.tags && exp.tags.map((tag, tIdx) => /*#__PURE__*/React.createElement("span", {
    key: tIdx,
    className: "text-xs font-bold bg-brand-50 text-brand-700 px-2.5 py-0.5 rounded-md"
  }, "#", tag)))))))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-5 space-y-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-3xl border border-gray-100 p-8 shadow-sm"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-2xl font-bold text-brand-900 mb-6 flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xl"
  }, "\u26A1"), "Competencias Clave"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-3"
  }, skills.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "flex items-center gap-4 bg-brand-50/50 rounded-2xl p-4 border border-brand-100/50 hover:border-brand-200 transition-colors"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center border border-brand-100/50 shrink-0"
  }, s.icon), /*#__PURE__*/React.createElement("span", {
    className: "text-brand-900 font-bold text-base leading-tight"
  }, s.label))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-3xl border border-gray-100 p-8 shadow-sm"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-2xl font-bold text-brand-900 mb-6 flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xl"
  }, "\uD83C\uDF93"), "Formaci\xF3n"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-4"
  }, education.map((e, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "flex gap-4 items-start group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shrink-0 w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100 group-hover:bg-brand-900 group-hover:text-white transition-all"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-brand-700 font-extrabold text-xs group-hover:text-white"
  }, e.year)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-brand-900 text-base leading-tight group-hover:text-brand-700 transition-colors"
  }, e.degree), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 text-sm mt-0.5"
  }, e.school)))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-2xl font-bold text-brand-900 flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xl"
  }, "\uD83D\uDCBB"), "Software e Idiomas"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-5 text-base text-gray-700"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-b border-gray-100 pb-3.5 flex items-start gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xl shrink-0 mt-0.5"
  }, "\uD83D\uDDE3\uFE0F"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "block text-brand-900 text-xs uppercase tracking-wider mb-1"
  }, "Idiomas"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-1 text-gray-600 font-medium"
  }, /*#__PURE__*/React.createElement("li", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-1.5 h-1.5 bg-brand-500 rounded-full"
  }), "Catal\xE1n \u2014 Nativo"), /*#__PURE__*/React.createElement("li", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-1.5 h-1.5 bg-brand-500 rounded-full"
  }), "Castellano \u2014 Nativo"), /*#__PURE__*/React.createElement("li", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-1.5 h-1.5 bg-brand-500 rounded-full"
  }), "Ingl\xE9s \u2014 Nivel medio")))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xl shrink-0 mt-0.5"
  }, "\uD83D\uDCBB"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "block text-brand-900 text-xs uppercase tracking-wider mb-1"
  }, "Software Especializado"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-1 text-gray-600 font-medium"
  }, /*#__PURE__*/React.createElement("li", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-1.5 h-1.5 bg-indigo-500 rounded-full"
  }), "ResiPlus"), /*#__PURE__*/React.createElement("li", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-1.5 h-1.5 bg-indigo-500 rounded-full"
  }), "Ortogest"), /*#__PURE__*/React.createElement("li", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-1.5 h-1.5 bg-indigo-500 rounded-full"
  }), "Microsoft Office Avanzado"))))))))));
};
function App() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Navbar, {
    currentPage: "cv"
  }), /*#__PURE__*/React.createElement("main", {
    id: "main-content"
  }, /*#__PURE__*/React.createElement(SectionCV, null)), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "cv"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();