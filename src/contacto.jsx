const { Icons, Navbar, Footer, CookieBanner } = window;

const { useState, useEffect, useCallback, useRef, useMemo } = React;

const SectionContact = function SectionContact() {
  const info = [
    { icon: <Icons.Mail />, label: 'Correo electrónico', value: 'iadaptato@gmail.com', href: 'mailto:iadaptato@gmail.com' },
    { icon: <Icons.Location />, label: 'Localización', value: 'Barcelona, España', href: null },
    { icon: <Icons.Heart className="fill-red-500 text-red-500" />, label: 'Apoyo al proyecto', value: 'Realizar una donación', href: 'https://www.paypal.com/donate/?hosted_button_id=E8A34ZM4Q4YS8', special: true },
  ];

  return (
    <section id="contact" className="pt-36 pb-24 px-4 bg-gradient-to-b from-brand-50 to-white min-h-screen">
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
          {info.map((item, i) => (
            <div key={i} className={`flex items-center gap-5 border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all ${item.special ? 'bg-rose-50 border-rose-200 shadow-rose-100' : 'bg-white border-brand-100'}`}>
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${item.special ? 'bg-white text-red-600 shadow-sm' : 'bg-brand-100 text-brand-600'}`}>
                {item.icon}
              </div>
              <div>
                <p className={`text-sm font-bold uppercase tracking-widest mb-0.5 ${item.special ? 'text-rose-400' : 'text-brand-400'}`}>{item.label}</p>
                {item.href ? (
                  <a 
                    href={item.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`text-xl font-semibold underline underline-offset-2 transition-colors ${item.special ? 'text-rose-700 hover:text-rose-900' : 'text-brand-800 hover:text-brand-600'}`}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-xl font-semibold text-brand-800">{item.value}</p>
                )}
              </div>
            </div>
          ))}
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-brand-100 mt-10">
            <img src="contact_ot.jpg" alt="Consulta de Terapia Ocupacional - Intervención profesional" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000" />
          </div>
        </div>
      </div>
    </section>
  );
};

function App() {
  return (
    <>
      <Navbar currentPage="contact" />
      <main id="main-content">
        <SectionContact />
      </main>
      <Footer currentPage="contact" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
