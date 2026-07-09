const { Icons, Navbar, Footer, CookieBanner } = window;

const { useState, useEffect, useCallback, useRef, useMemo } = React;

// --- COMPONENTE SECTIONABOUT ---
const SectionAbout = function SectionAbout() {
  return (
    <section id="about" className="pt-36 pb-24 px-4 bg-white relative">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-brand-50 to-sky-50 rounded-3xl border border-brand-100 shadow-lg p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
          <div className="shrink-0 relative">
            <div className="absolute inset-0 bg-brand-400 rounded-full blur-2xl opacity-20"></div>
            <img src="narciso_millan_portrait.jpg" alt="Pablo Narciso Millán" className="relative w-64 h-64 rounded-full object-cover shadow-xl border-4 border-white z-10" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-white text-brand-600 border border-brand-200 text-sm font-bold uppercase tracking-widest rounded-full px-4 py-1.5 mb-4 shadow-sm">Sobre Mí</span>
            <h2 className="font-display text-4xl font-bold text-brand-900 mb-4">Pablo Narciso Millán</h2>
            <div className="space-y-4 text-xl text-gray-700 leading-relaxed mb-6">
              <p>
                Terapeuta Ocupacional graduado en 2015 con una sólida trayectoria en <strong className="text-brand-700">geriatría y ortopedia</strong>. Mi enfoque se centra en potenciar la autonomía de las personas mediante intervenciones personalizadas que combinan la experiencia clínica con soluciones prácticas y resolutivas para el día a día.
              </p>
              <p>
                Aprovecho mi conocimiento en herramientas innovadoras como la <strong className="text-brand-700">impresión 3D</strong> para promover el uso de adaptaciones funcionales de bajo coste, buscando siempre que la tecnología sea un puente hacia la independencia. Mi objetivo es mejorar la calidad de vida de mis pacientes, ofreciendo una atención técnica, empática y adaptada a las necesidades reales de cada entorno.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {['Geriatría', 'Ortopedia', 'Impresión 3D', 'Adaptación del Entorno'].map(tag => (
                  <span key={tag} className="bg-white border border-brand-200 text-brand-700 rounded-full px-4 py-1.5 text-sm font-semibold shadow-sm">{tag}</span>
                ))}
              </div>
              <a
                href="cv.html"
                className="shrink-0 flex items-center gap-2 bg-brand-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-800 transition-all shadow-md hover:shadow-lg active:scale-95 group"
              >
                <Icons.FileText />
                Ver Currículum
                <span className="transition-transform group-hover:translate-x-1"><Icons.ArrowRight /></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENTE SECTIONHOME ---
const SectionHome = function SectionHome() {
  const cards = [
    {
      id: 'analyzer', icon: <Icons.Brain />, color: 'bg-sky-100 text-sky-600', badge: 'Inteligencia Artificial',
      title: 'Valoración de la estancia', desc: 'Introduce las características de tu hogar o espacio y nuestra inteligencia artificial evaluará las barreras arquitectónicas existentes, sugiriendo las mejores adaptaciones.', cta: 'Valorar estancia',
      img: 'ai_analyzer_thumbnail.png',
      href: 'valoracion-estancia.html'
    },
    {
      id: 'guides', icon: <Icons.Book />, color: 'bg-indigo-100 text-indigo-600', badge: 'Recursos',
      title: 'Guías de Adaptación', desc: 'Consejos prácticos, normativas y descripciones detalladas de productos de apoyo para adaptar el baño, cocina, dormitorio y zonas comunes del hogar, previniendo caídas.', cta: 'Explorar guías',
      img: 'adaptation_guides_thumbnail.png',
      href: 'guias.html'
    },
    {
      id: 'cognitive', icon: <Icons.Puzzle />, color: 'bg-emerald-100 text-emerald-600', badge: 'Entrenamiento Mental',
      title: 'Ejercicios Mentales', desc: 'Ejercicios prácticos, retos diarios de memoria, cálculo numérico, sopas de letras y atención visual diseñados para fortalecer la agilidad mental y promover la autonomía personal.', cta: 'Entrenar ahora',
      img: 'mental_exercises_thumbnail.png',
      href: 'estimulacion-cognitiva.html'
    },
    {
      id: 'resources', icon: <Icons.FilePdf />, color: 'bg-rose-100 text-rose-600', badge: 'Área Profesional',
      title: 'Recursos para Profesionales', desc: 'Herramientas y materiales descargables diseñados para facilitar la práctica clínica diaria de terapeutas ocupacionales y profesionales de la salud.', cta: 'Ver recursos',
      img: 'resources_bg.png',
      href: 'recursos.html'
    },
    {
      id: 'cv', icon: <Icons.FileText />, color: 'bg-blue-100 text-blue-600', badge: 'Perfil Profesional',
      title: 'Mi Trayectoria', desc: 'Conoce mi formación, experiencia clínica en geriatría y ortopedia, y competencias avanzadas en impresión 3D.', cta: 'Saber más',
      img: 'cv_trayectoria_thumbnail_ot_v2.png',
      href: 'cv.html'
    },
  ];

  return (
    <div id="home">
      <section className="hero-gradient min-h-[90vh] flex flex-col justify-center pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-900 leading-tight mb-6">
              Tu bienestar y<br /><span className="text-brand-500">autonomía</span>, primero
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-10">
              Evaluación experta de tu entorno y asesoramiento en productos de apoyo. <strong className="text-brand-700">"Te guío en la adaptación de tu casa para que vuelvas a moverte con seguridad y total confianza."</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {cards.map((c, i) => (
              <a 
                key={c.id} 
                href={c.href}
                className="bg-white rounded-3xl overflow-hidden border border-blue-50 shadow-lg card-lift flex flex-col cursor-pointer group block" 
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className={`absolute top-4 right-4 w-12 h-12 ${c.color} rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform`}>
                    {c.icon}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-400 mb-2">{c.badge}</span>
                  <h2 className="font-display text-xl font-bold text-brand-900 mb-3 group-hover:text-brand-600 transition-colors leading-tight">{c.title}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-3">{c.desc}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-brand-600 font-bold text-sm group-hover:gap-3 transition-all">
                    {c.cta}
                    <Icons.ArrowRight />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// --- COMPONENTE SECTIONCONTACT ---
const SectionContact = function SectionContact() {
  const info = [
    { icon: <Icons.Mail />, label: 'Correo electrónico', value: 'iadaptato@gmail.com', href: 'mailto:iadaptato@gmail.com' },
    { icon: <Icons.Instagram />, label: 'Síguenos en Instagram', value: '@iadapta', href: 'https://www.instagram.com/iadapta/' },
    { icon: <Icons.Location />, label: 'Localización', value: 'Barcelona, España', href: null },
    { icon: <Icons.Heart className="fill-red-500 text-red-500" />, label: 'Apoyo al proyecto', value: 'Realizar una donación', href: 'https://www.paypal.com/donate/?hosted_button_id=E8A34ZM4Q4YS8', special: true },
  ];

  return (
    <section id="contact" className="pt-36 pb-24 px-4 bg-gradient-to-b from-brand-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-brand-100 text-brand-700 rounded-full px-5 py-2 text-base font-bold uppercase tracking-widest mb-4">Contacto</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-900 mb-4">Hablemos</h2>
          <div className="section-divider w-24 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ¿Tienes dudas, quieres solicitar una valoración o simplemente saludar? Estaré encantado de atenderte.
          </p>
        </div>

        <div className="max-w-xl mx-auto space-y-6">
          {info.map((item, i) => {
            const CardElement = item.href ? 'a' : 'div';
            return (
              <CardElement
                key={i}
                href={item.href || undefined}
                target={item.href && !item.href.startsWith('mailto:') ? "_blank" : undefined}
                rel={item.href && !item.href.startsWith('mailto:') ? "noopener noreferrer" : undefined}
                className={`flex items-center justify-between gap-5 border rounded-[2rem] p-6 shadow-sm hover:shadow-lg transition-all duration-300 group ${
                  item.special 
                    ? 'bg-gradient-to-r from-rose-50 to-rose-100/30 border-rose-200 shadow-rose-50 hover:border-rose-300' 
                    : 'bg-white border-brand-100 hover:border-brand-300'
                } ${item.href ? 'cursor-pointer' : ''}`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                    item.special ? 'bg-white text-red-600 shadow-sm' : 'bg-brand-100 text-brand-600'
                  }`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${item.special ? 'text-rose-400' : 'text-brand-400'}`}>
                      {item.label}
                    </p>
                    <p className={`text-lg sm:text-xl font-semibold transition-colors ${
                      item.special ? 'text-rose-800 group-hover:text-rose-950' : 'text-brand-800 group-hover:text-brand-600'
                    }`}>
                      {item.value}
                    </p>
                  </div>
                </div>
                {item.href && (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 ${
                    item.special ? 'text-rose-600 bg-white shadow-sm' : 'text-brand-600 bg-brand-50'
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </CardElement>
            );
          })}
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-brand-100 mt-10">
            <img src="contact_ot.jpg" alt="Consulta de Terapia Ocupacional - Intervención profesional" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000" />
          </div>
        </div>
      </div>
    </section>
  );
};

// --- APLICACIÓN PRINCIPAL ---
function App() {
  return (
    <>
      <Navbar currentPage="home" />
      <main id="main-content">
        <SectionHome />
        <div className="max-w-4xl mx-auto px-4"><div className="section-divider my-0"></div></div>
        <SectionAbout />
        <div className="max-w-4xl mx-auto px-4"><div className="section-divider my-0"></div></div>
        <SectionContact />
      </main>
      <Footer currentPage="home" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
