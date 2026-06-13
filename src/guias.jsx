const { Icons, Navbar, Footer, CookieBanner, AdSenseBlock } = window;
const { useState } = React;

const SectionGuides = function SectionGuides() {
  const categories = [
    {
      id: 'banyo',
      title: 'Baño',
      icon: '🚿',
      color: 'bg-cyan-100 text-cyan-700',
      description: 'Adaptación integral del cuarto de baño y prevención de caídas.',
      image: 'assets/banyo_adaptado.png',
      link: 'guia-bano.html'
    },
    {
      id: 'dormitorio',
      title: 'Dormitorio',
      icon: '🛏️',
      color: 'bg-indigo-100 text-indigo-700',
      description: 'Seguridad en el dormitorio: Prevención de caídas y transferencias.',
      image: 'assets/dormitorio_adaptado.png',
      link: 'guia-dormitorio.html'
    },
    {
      id: 'cocina',
      title: 'Cocina',
      icon: '🍳',
      color: 'bg-amber-100 text-amber-700',
      description: 'Eficiencia en la cocina: Organización y conservación de la energía.',
      image: 'assets/cocina_adaptada.png',
      link: 'guia-cocina.html'
    },
    {
      id: 'movilidad',
      title: 'Movilidad',
      icon: '♿',
      color: 'bg-emerald-100 text-emerald-700',
      description: 'Movilidad y autonomía: Prescripción de productos de apoyo.',
      image: 'assets/movilidad_adaptada.jpg',
      link: 'guia-movilidad.html'
    },
    {
      id: 'alimentacion',
      title: 'Alimentación',
      icon: '🍽️',
      color: 'bg-rose-100 text-rose-700',
      description: 'Alimentación independiente: Ergonomía y autonomía en la mesa.',
      image: 'assets/cubiertos_adaptados.jpg',
      link: 'guia-alimentacion.html'
    },
    {
      id: 'sillas-ruedas',
      title: 'Sillas de Ruedas',
      icon: '🦽',
      color: 'bg-purple-100 text-purple-700',
      description: 'Sillas de ruedas: Guía de selección y funcionalidad.',
      image: 'assets/silla_activa.png',
      link: 'guia-sillas-ruedas.html'
    },
    {
      id: 'prevencion-escaras',
      title: 'Prevención Escaras',
      icon: '🛡️',
      color: 'bg-red-100 text-red-700',
      description: 'Prevención de úlceras por presión: Posicionamiento y cuidado.',
      image: 'assets/prevencion_escaras.png',
      link: 'guia-escaras.html'
    }
  ];

  return (
    <section id="guides" className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-brand-100 text-brand-700 rounded-full px-5 py-2 text-base font-bold uppercase tracking-widest mb-4">Directorio de Guías</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-900 mb-4">Adaptación por Áreas</h2>
          <div className="section-divider w-24 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre guías detalladas desde la perspectiva de la Terapia Ocupacional para hacer de tu hogar un entorno seguro, funcional y promotor de la autonomía.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <a key={cat.id} href={cat.link} className="group bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden transition-all duration-300 flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-xl p-2 shadow-sm">
                  <span className="text-2xl">{cat.icon}</span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors">{cat.title}</h3>
                <p className="text-gray-600 flex-1">{cat.description}</p>
                <div className="mt-6 flex items-center text-brand-600 font-bold text-sm uppercase tracking-wide group-hover:gap-2 transition-all">
                  Leer Guía Completa <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bloque de anuncios - Final de sección */}
        <div className="mt-16 overflow-hidden rounded-xl bg-gray-50/50 min-h-[100px] flex flex-col items-center justify-center">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Publicidad</span>
          <AdSenseBlock slot="9272607554" />
        </div>
      </div>
    </section>
  );
};

function App() {
  return (
    <>
      <Navbar currentPage="guides" />
      <main id="main-content">
        <SectionGuides />
      </main>
      <Footer currentPage="guides" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
