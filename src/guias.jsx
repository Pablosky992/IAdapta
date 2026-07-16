const { Icons, Navbar, Footer, CookieBanner } = window;
const { useState } = React;

const SectionGuides = function SectionGuides() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('todas');

  const categories = [
    {
      id: 'banyo',
      title: 'Baño',
      icon: '🚿',
      color: 'bg-cyan-100 text-cyan-700',
      description: 'Adaptación integral del cuarto de baño y prevención de caídas.',
      image: 'assets/banyo_adaptado.png',
      link: 'guia-bano.html',
      category: 'hogar',
      tags: ['aseo', 'ducha', 'bañera', 'resbalon', 'caidas', 'higiene', 'lavarse', 'grifo', 'inodoro']
    },
    {
      id: 'dormitorio',
      title: 'Dormitorio',
      icon: '🛏️',
      color: 'bg-indigo-100 text-indigo-700',
      description: 'Seguridad en el dormitorio: Prevención de caídas and transferencias.',
      image: 'assets/dormitorio_adaptado.png',
      link: 'guia-dormitorio.html',
      category: 'hogar',
      tags: ['cama', 'dormir', 'transferencia', 'levantarse', 'caidas', 'barreras', 'colchon']
    },
    {
      id: 'cocina',
      title: 'Cocina',
      icon: '🍳',
      color: 'bg-amber-100 text-amber-700',
      description: 'Eficiencia en la cocina: Organización y conservación de la energía.',
      image: 'assets/cocina_adaptada.png',
      link: 'guia-cocina.html',
      category: 'hogar',
      tags: ['comer', 'cocinar', 'sarten', 'plato', 'cubiertos', 'alimentos', 'tabla', 'cortar', 'abrir']
    },
    {
      id: 'movilidad',
      title: 'Movilidad',
      icon: '♿',
      color: 'bg-emerald-100 text-emerald-700',
      description: 'Movilidad y autonomía: Prescripción de productos de apoyo.',
      image: 'assets/movilidad_adaptada.jpg',
      link: 'guia-movilidad.html',
      category: 'hogar',
      tags: ['andar', 'caminar', 'baston', 'andador', 'silla', 'muletas', 'ortopedia', 'marcha']
    },
    {
      id: 'alimentacion',
      title: 'Alimentación',
      icon: '🍽️',
      color: 'bg-rose-100 text-rose-700',
      description: 'Alimentación independiente: Ergonomía y autonomía en la mesa.',
      image: 'assets/cubiertos_adaptados.jpg',
      link: 'guia-alimentacion.html',
      category: 'autonomia',
      tags: ['comer', 'plato', 'cuchara', 'tenedor', 'vaso', 'nelson', 'mesa', 'cubiertos']
    },
    {
      id: 'sillas-ruedas',
      title: 'Sillas de Ruedas',
      icon: '🦽',
      color: 'bg-purple-100 text-purple-700',
      description: 'Sillas de ruedas: Guía de selección y funcionalidad.',
      image: 'assets/silla_activa.png',
      link: 'guia-sillas-ruedas.html',
      category: 'autonomia',
      tags: ['silla', 'ruedas', 'autonomia', 'transferencia', 'propulsion', 'cojin']
    },
    {
      id: 'prevencion-escaras',
      title: 'Prevención Escaras',
      icon: '🛡️',
      color: 'bg-red-100 text-red-700',
      description: 'Prevención de úlceras por presión: Posicionamiento y cuidado.',
      image: 'assets/prevencion_escaras.png',
      link: 'guia-escaras.html',
      category: 'patologias',
      tags: ['escaras', 'ulceras', 'cama', 'colchon', 'posicion', 'piel', 'presion']
    },
    {
      id: 'prevenir-caidas',
      title: 'Prevenir Caídas',
      icon: '🛡️',
      color: 'bg-emerald-100 text-emerald-700',
      description: 'Prevención de caídas: Estrategias, iluminación y hogar seguro.',
      image: 'assets/guia_caidas.png',
      link: 'guia-caidas.html',
      category: 'hogar',
      tags: ['prevenir', 'caidas', 'equilibrio', 'iluminacion', 'sensores', 'suelos', 'alfombras', 'obstaculos', 'seguridad']
    },
    {
      id: 'cuidador',
      title: 'Cuidado del Cuidador',
      icon: '🤝',
      color: 'bg-teal-100 text-teal-700',
      description: 'Transferencias, ergonomía y prevención de lesiones.',
      image: 'assets/guia_cuidador.png',
      link: 'guia-cuidador.html',
      category: 'autonomia',
      tags: ['cuidar', 'espalda', 'lesion', 'transferencia', 'peso', 'levantar', 'cuidador']
    },
    {
      id: 'vestido',
      title: 'Vestido y Calzado',
      icon: '👕',
      color: 'bg-pink-100 text-pink-700',
      description: 'Autonomía frente a limitaciones articulares y hemiplejia.',
      image: 'assets/guia_vestido.png',
      link: 'guia-vestido.html',
      category: 'autonomia',
      tags: ['ropa', 'vestir', 'vestirse', 'calzado', 'zapatos', 'calcetines', 'abotonador', 'abrochar', 'botones']
    },
    {
      id: 'demencias',
      title: 'Demencias',
      icon: '🧩',
      color: 'bg-indigo-100 text-indigo-700',
      description: 'Adaptación del entorno y accesibilidad cognitiva para Alzheimer.',
      image: 'assets/guia_demencias.png',
      link: 'guia-demencias.html',
      category: 'patologias',
      tags: ['alzheimer', 'cognitivo', 'memoria', 'entorno', 'desorientacion', 'seguridad', 'demencia']
    },
    {
      id: 'parkinson',
      title: 'Parkinson',
      icon: '🧠',
      color: 'bg-rose-100 text-rose-700',
      description: 'Terapia Ocupacional y Parkinson: Adaptación del entorno y productos de apoyo.',
      image: 'assets/guia_parkinson.png',
      link: 'guia-parkinson.html',
      category: 'patologias',
      tags: ['temblor', 'rigidez', 'bloqueo', 'marcha', 'caminar', 'comer', 'vestirse', 'parkinson']
    },
    {
      id: 'ictus',
      title: 'Ictus',
      icon: '🧠',
      color: 'bg-teal-100 text-teal-700',
      description: 'Terapia Ocupacional tras un Ictus: Autonomía y adaptación para la hemiparesia.',
      image: 'assets/guia_ictus.png',
      link: 'guia-ictus.html',
      category: 'patologias',
      tags: ['hemiplejia', 'hemiparesia', 'derrame', 'acv', 'paralisis', 'una mano', 'vestirse', 'comer', 'ictus']
    },
    {
      id: 'artritis',
      title: 'Artritis',
      icon: '🦾',
      color: 'bg-amber-100 text-amber-700',
      description: 'Terapia Ocupacional en la Artritis: Guía de protección articular y autonomía.',
      image: 'assets/guia_artritis.png',
      link: 'guia-artritis.html',
      category: 'patologias',
      tags: ['artrosis', 'dolor', 'articulacion', 'manos', 'dedos', 'llave', 'abrir', 'inflamacion', 'artritis']
    },
    {
      id: 'domotica',
      title: 'Domótica',
      icon: '📱',
      color: 'bg-cyan-100 text-cyan-700',
      description: 'Hogar inteligente, control por voz y teleasistencia.',
      image: 'assets/guia_domotica.png',
      link: 'guia-domotica.html',
      category: 'hogar',
      tags: ['tecnologia', 'inteligente', 'voz', 'alexa', 'control', 'luces', 'domotica']
    },
    {
      id: 'ocio',
      title: 'Ocio Adaptado',
      icon: '🎨',
      color: 'bg-orange-100 text-orange-700',
      description: 'Pasatiempos, lectura y tiempo libre con productos de apoyo.',
      image: 'assets/guia_ocio.png',
      link: 'guia-ocio.html',
      category: 'autonomia',
      tags: ['leer', 'jugar', 'cartas', 'viajar', 'tiempo libre', 'entretenimiento', 'ocio']
    },
    {
      id: 'ejercicios-mayores',
      title: 'Ejercicios Físicos',
      icon: '🏃‍♂️',
      color: 'bg-emerald-100 text-emerald-700',
      description: 'Actividad física adaptada: Fuerza, equilibrio, flexibilidad y movilidad.',
      image: 'assets/guia_ejercicios.png',
      link: 'guia-ejercicios.html',
      category: 'autonomia',
      tags: ['ejercicio', 'gimnasia', 'fuerza', 'equilibrio', 'flexibilidad', 'movilidad', 'salud', 'deporte', 'entrenar']
    },
    {
      id: 'ejercicios-cognitivos',
      title: 'Ejercicios Cognitivos',
      icon: '🧠',
      color: 'bg-indigo-100 text-indigo-700',
      description: 'Gimnasia cerebral: Ejercicios prácticos para la memoria, atención y lenguaje.',
      image: 'assets/guia_cognitivos.png',
      link: 'guia-cognitivos.html',
      category: 'autonomia',
      tags: ['memoria', 'atencion', 'lenguaje', 'calculo', 'cerebro', 'cognitivo', 'juegos', 'rompecabezas', 'entrenamiento']
    }
  ];

  const filterTabs = [
    { id: 'todas', label: 'Todas las Guías', icon: '📋' },
    { id: 'hogar', label: 'Hogar y Entorno', icon: '🏡' },
    { id: 'autonomia', label: 'Autonomía (AVD)', icon: '🦾' },
    { id: 'patologias', label: 'Patologías y Cuidados', icon: '🧠' }
  ];

  const searchWords = searchTerm.toLowerCase().split(/\s+/).filter(w => w.length > 2);

  const filteredCategories = categories.filter(cat => {
    // 1. Filtrado por Pestaña Activa
    if (activeCategory !== 'todas' && cat.category !== activeCategory) {
      return false;
    }

    // 2. Filtrado por palabras clave en buscador
    if (searchWords.length === 0) return true;
    return searchWords.some(word => {
      const inTitle = cat.title.toLowerCase().includes(word);
      const inDesc = cat.description.toLowerCase().includes(word);
      const inTags = cat.tags && cat.tags.some(tag => tag.toLowerCase().includes(word) || word.includes(tag.toLowerCase()));
      return inTitle || inDesc || inTags;
    });
  });

  const clearSearch = () => {
    setSearchTerm('');
    setActiveCategory('todas');
  };

  return (
    <section id="guides" className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-brand-100 text-brand-700 rounded-full px-5 py-2 text-base font-bold uppercase tracking-widest mb-4">Directorio de Guías</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-900 mb-4">Adaptación por Áreas</h2>
          <div className="section-divider w-24 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre guías detalladas desde la perspectiva de la Terapia Ocupacional para hacer de tu hogar un entorno seguro, funcional y promotor de la autonomía.
          </p>
        </div>

        {/* Buscador */}
        <div className="max-w-md mx-auto mb-8 relative">
          <input
            type="text"
            placeholder="Buscar guías (ej: Parkinson, Baño, Vestido...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent shadow-sm text-gray-700 placeholder-gray-400 transition-all text-base bg-white"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          )}
        </div>

        {/* Filtros por Categoría */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 border shadow-sm ${
                activeCategory === tab.id
                  ? 'bg-brand-900 text-white border-brand-900 scale-105'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {filteredCategories.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 shadow-sm max-w-2xl mx-auto p-8">
            <span className="text-5xl block mb-4">🔍</span>
            <h3 className="text-xl font-bold text-gray-800">No se han encontrado guías</h3>
            <p className="text-gray-500 mt-2 mb-6">Prueba a cambiar de categoría o buscar otro término.</p>
            <button
              onClick={clearSearch}
              className="px-5 py-2.5 bg-brand-100 text-brand-900 font-bold rounded-xl text-sm hover:bg-brand-200 transition-colors"
            >
              Restablecer todo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((cat) => (
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
        )}
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
