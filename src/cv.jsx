const { Icons, Navbar, Footer, CookieBanner } = window;

const { useState, useEffect, useCallback, useRef, useMemo } = React;

const SectionCV = function SectionCV() {
  const experience = [
    { period: '06/2026 – Actualidad', role: 'Terapeuta Ocupacional', place: 'Ortopedia LaFACT', desc: 'Asesoramiento especializado en productos de apoyo y adaptaciones funcionales. Valoración integral de la autonomía y diseño de soluciones personalizadas.' },
    { period: '09/2021 – 05/2026', role: 'Técnico y Terapeuta Ocupacional', place: 'Instituto Técnico Ortopédico, Barcelona', desc: 'Evaluación y diagnóstico de necesidades funcionales. Control de stock y gestión de proveedores. Elaboración de presupuestos personalizados. Responsable de tienda y atención al cliente.' },
    { period: '02/2016 – 09/2021', role: 'Terapeuta Ocupacional', place: 'Residencia asistida Sant Víctor, Artés', desc: 'Gestión de productos ortopédicos. Diseño de actividades de estimulación funcional y cognitiva. Promoción de la autonomía mediante intervención centrada en la persona.' },
    { period: '09/2015 – 04/2020', role: 'Terapeuta Ocupacional', place: 'Residencia Valldaura, Manresa', desc: 'Intervención integral en personas mayores con dependencia. Trabajo multidisciplinar para un enfoque global y continuo.' },
    { period: '06/2014 – 12/2014', role: 'Auxiliar de Terapia Ocupacional', place: 'Centro de Día MonBarnasalud, L\'Hospitalet', desc: 'Apoyo en sesiones terapéuticas y actividades de estimulación funcional y cognitiva. Facilitación de la participación y fomento de la autonomía en AVD.' },
    { period: '01/2010 – 04/2015', role: 'Administrativo y Vendedor', place: 'Empresa Informática, L\'Hospitalet', desc: 'Atención al cliente, comunicación, gestión administrativa y soporte técnico en venta y reparación de equipos informáticos.' },
    { period: '2011 – 2014', role: 'Prácticas de Terapia Ocupacional', place: 'Varios Centros (Barcelona y L\'H)', desc: 'Formación práctica en salud mental, entornos residenciales y hospitalarios (Bellvitge, Benito Menni, Feixa Llarga, Sant Pere Claver).' },
  ];

  const education = [
    { year: '2015', degree: 'Grado en Terapia Ocupacional (Mención Intervención Avanzada)', school: 'EUIT Terrassa' },
    { year: 'Extra', degree: 'Gestión y Dirección Sanitaria', school: 'Formación Complementaria' },
    { year: 'Extra', degree: 'RCP y Primeros Auxilios', school: 'Formación Complementaria' },
    { year: 'Extra', degree: 'Toma de medidas para medias de compresión', school: 'Formación Complementaria' },
    { year: 'Extra', degree: 'Manipulador de Alimentos', school: 'Formación Complementaria' },
    { year: 'Extra', degree: 'Ventas y Atención al Cliente', school: 'Formación Complementaria' },
  ];

  const skills = [
    { label: 'Geriatría, Rehabilitación y Autonomía', pct: 95 },
    { label: 'Evaluación y Ortopedia', pct: 90 },
    { label: 'Productos de Apoyo y Adaptación', pct: 85 },
    { label: 'Diseño e Impresión 3D', pct: 80 },
  ];

  return (
    <div className="min-h-screen pt-36 pb-20 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-brand-100 text-brand-700 rounded-full px-5 py-2 text-base font-bold uppercase tracking-widest mb-4">Perfil Profesional</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand-900 mb-4">Curriculum Vitae</h1>
          <p className="text-2xl font-bold text-brand-600 mb-2">Pablo Narciso Millán</p>
          <div className="section-divider w-24 mx-auto mb-8"></div>

          <div className="max-w-3xl mx-auto space-y-4 text-lg sm:text-xl text-gray-700 leading-relaxed text-left bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <p>
              Terapeuta Ocupacional graduado en 2015 con una sólida trayectoria en <strong className="text-brand-700">geriatría y ortopedia</strong>. Mi enfoque se centra en potenciar la autonomía de las personas mediante intervenciones personalizadas que combinan la experiencia clínica con soluciones prácticas y resolutivas para el día a día.
            </p>
            <p>
              Aprovecho mi conocimiento en herramientas innovadoras como la <strong className="text-brand-700">impresión 3D</strong> para promover el uso de adaptaciones funcionales de bajo coste, buscando siempre que la tecnología sea un puente hacia la independencia. Mi objetivo es mejorar la calidad de vida de mis pacientes, ofreciendo una atención técnica, empática y adaptada a las necesidades reales de cada entorno.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experiencia */}
          <div>
            <h3 className="font-display text-2xl font-bold text-brand-900 mb-8 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">E</span>
              Experiencia Profesional
            </h3>
            <ol className="relative space-y-8">
              {experience.map((exp, i) => (
                <li key={i} className="relative pl-12 timeline-line">
                  <div className="absolute left-0 top-1 w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center shadow-md z-10">
                    <span className="text-white text-xs font-bold">{experience.length - i}</span>
                  </div>
                  <div className="bg-white border border-brand-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <span className="inline-block bg-brand-100 text-brand-600 text-sm font-bold rounded-full px-3 py-1 mb-2">{exp.period}</span>
                    <h4 className="font-bold text-lg text-brand-900 leading-tight">{exp.role}</h4>
                    <p className="text-brand-500 font-medium text-base mb-2">{exp.place}</p>
                    <p className="text-gray-600 text-base leading-relaxed">{exp.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Formación y Skills */}
          <div className="space-y-10">
            <div>
              <h3 className="font-display text-2xl font-bold text-brand-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">H</span>
                Competencias Destacadas
              </h3>
              <ul className="space-y-4">
                {skills.map((s) => (
                  <li key={s.label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-brand-900 font-semibold text-base">{s.label}</span>
                    </div>
                    <div className="w-full bg-brand-100 rounded-full h-3">
                      <div className="bg-gradient-to-r from-brand-400 to-brand-600 h-3 rounded-full" style={{ width: `${s.pct}%` }}></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-brand-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">F</span>
                Formación Académica
              </h3>
              <ul className="space-y-4">
                {education.map((e, i) => (
                  <li key={i} className="flex gap-4 bg-white rounded-2xl p-4 border border-brand-100 shadow-sm">
                    <div className="shrink-0 w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center border border-brand-100">
                      <span className="text-brand-600 font-bold text-sm">{e.year}</span>
                    </div>
                    <div>
                      <p className="font-bold text-brand-900 text-base leading-tight">{e.degree}</p>
                      <p className="text-gray-500 text-sm mt-0.5">{e.school}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-brand-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">T</span>
                Herramientas e Idiomas
              </h3>
              <div className="bg-white p-5 rounded-2xl border border-brand-100 shadow-sm">
                <p className="text-gray-700 mb-2"><strong>Idiomas:</strong> Catalán (Nativo), Castellano (Nativo), Inglés (Nivel medio)</p>
                <p className="text-gray-700 mb-2"><strong>Software:</strong> ResiPlus, Ortogest, Office avanzado</p>
                <p className="text-gray-700"><strong>Otros:</strong> Diseño y uso de Impresoras 3D, RCP.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <Navbar currentPage="cv" />
      <main id="main-content">
        <SectionCV />
      </main>
      <Footer currentPage="cv" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
