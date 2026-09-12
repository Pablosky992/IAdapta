const { Icons, Navbar, Footer, CookieBanner, getAmazonLink } = window;
const { useState } = React;

const GuiaIncontinencia = function GuiaIncontinencia() {
  const materials = [
    {
      name: 'Bidé acoplable para inodoro con doble boquilla',
      desc: 'Higiene íntima suave con agua sin transferencias difíciles ni irritación cutánea.',
      image: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T1/images/I/512T5rRH5UL._AC_SL1500_.jpg',
      link: 'https://amzn.to/4yEfVYJ',
      query: 'bide acoplable inodoro agua higiene intima'
    },
    {
      name: 'Empapador de cama impermeable y lavable (4 capas)',
      desc: 'Protección absorbente transpirable que evita la humedad prolongada y cuida la piel.',
      image: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T1/images/I/71uYFtQlXLL._AC_SL1500_.jpg',
      link: 'https://amzn.to/4cGvuGE',
      query: 'empapador cama lavable impermeable transpirable cuatro capas'
    },
    {
      name: 'Botella urinaria anatómica con válvula antiderrame',
      desc: 'Facilita la micción en cama o sedestación sin riesgo de escapes ni esfuerzo.',
      image: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T1/images/I/41DAiVbkaQL._SL1500_.jpg',
      link: 'https://amzn.to/3VafIOd',
      query: 'botella urinaria con valvula antiderrame ortopedia'
    },
    {
      name: 'Cuña higiénica para encamados con asa ergonómica',
      desc: 'Diseño de bajo perfil para colocación sin sobrecargar la espalda del cuidador.',
      image: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T1/images/I/61DTvef9NRL._AC_SL1500_.jpg',
      link: 'https://amzn.to/4dykCLf',
      query: 'cuña orinal encamados plastico resistente ortopedia'
    }
  ];

  return (
    <section className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
        <img src="assets/guia_incontinencia.png" alt="Higiene y Manejo de la Incontinencia" className="w-full h-64 sm:h-96 object-cover" />
        
        <div className="p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg">
          <div>
            <a href="guias.html" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors mb-6 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Volver a Guías
            </a>
            <h1 className="font-display text-4xl font-bold text-brand-900 mb-8">Higiene y Manejo Integral de la Incontinencia</h1>
            
            <p>
              La incontinencia urinaria y fecal es una de las condiciones con mayor impacto en la calidad de vida, la autoestima y la autonomía de las personas mayores y en situación de dependencia. Desde la Terapia Ocupacional, el objetivo no es únicamente "contener" el escape mediante absorbentes, sino promover la dignidad, prevenir el deterioro cutáneo (dermatitis asociada a la incontinencia) y facilitar rutinas funcionales de vaciado que simplifiquen la tarea del cuidador sin generar dolor ni sobreesfuerzo.
            </p>

            <div className="space-y-8 mt-6 border-t border-gray-100 pt-6">
              <p>A continuación, detallamos las mejores estrategias clínicas y productos de apoyo para el manejo del aseo íntimo:</p>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">⏰</span> 1. Reentrenamiento y Rutinas de Aseo Programado</h5>
                <p>Establecer un patrón temporal regular reduce drásticamente los episodios de incontinencia funcional.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Técnica de Micción Pautada:</strong> Acompañar o recordar al usuario acudir al inodoro cada 2 o 3 horas durante el día, coincidiendo con momentos clave (al levantarse, tras las comidas y antes de acostarse).</li>
                  <li><strong>Acceso Rápido y Despejado:</strong> Garantizar que el trayecto desde la cama o el sillón hasta el inodoro esté totalmente libre de obstáculos para reducir el tiempo de respuesta ante la urgencia miccional.</li>
                  <li><strong>Ropa de Fácil Desabrochado:</strong> Pantalones con cinturilla elástica o cierres de velcro que permiten un bajado rápido sin lidiar con cremalleras ni botones difíciles.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">💧</span> 2. Higiene Íntima sin Fricción: El Bidé Acoplable</h5>
                <p>La limpieza frecuente con toallitas desechables o papel higiénico áspero puede desgastar la barrera lipídica de la piel sensible.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Bidé Acoplable Mecánico o Eléctrico:</strong> Se instala bajo la tapa del inodoro estándar y proyecta un chorro de agua limpia dirigida con presión regulable, facilitando una limpieza perfecta sin necesidad de transferir a la persona a la ducha.</li>
                  <li><strong>Secado por Toques Suaves:</strong> Emplear toallas de algodón suave o papel absorbente aplicando una ligera presión sin frotar.</li>
                  <li><strong>Jabones de pH Neutro o Ácido Débil (5.5):</strong> Preservan el manto protector de la piel y reducen la proliferación bacteriana causante de infecciones urinarias.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🛏️</span> 3. Protección de Cama y Asientos: Empapadores Transpirables</h5>
                <p>El uso de plásticos impermeables no transpirables incrementa la sudoración y la maceración de la epidermis.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Empapadores Reutilizables Multicapa:</strong> Diseñados con una capa superior hipoalergénica de secado rápido, un núcleo absorbente de alta capacidad y una base impermeable pero transpirable con alas laterales para sujetar bajo el colchón.</li>
                  <li><strong>Protectores de Sillón y Silla de Ruedas:</strong> Cojines y fundas con barrera hidrófuga que resguardan el tapizado y se lavan cómodamente a máquina.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🛡️</span> 4. Evacuación en Cama: Cuñas y Botellas Antiderrame</h5>
                <p>Para personas con inmovilidad temporal o reposo prolongado, las ayudas técnicas de evacuación evitan transferencias arriesgadas.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Botellas Urinarias con Válvula Antirretorno:</strong> Permiten la micción en decúbito supino o lateral sin que el líquido retorne aunque la botella se incline accidentalmente.</li>
                  <li><strong>Cuñas Anatómicas de Perfil Bajo:</strong> Facilitan la colocación mediante lateralización del paciente, reduciendo la fuerza lumbar requerida por el cuidador.</li>
                </ul>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💡</span>
                  <h5 className="font-bold text-emerald-800 uppercase tracking-wide text-base">El Consejo de la Terapia Ocupacional</h5>
                </div>
                <p className="text-emerald-900 italic text-base leading-relaxed">
                  "Nunca restrinjas la ingesta de agua para intentar 'evitar los escapes'. La falta de hidratación concentra la orina, irritando las paredes de la vejiga y aumentando paradójicamente la frecuencia urinaria y el riesgo de infecciones y desorientación. La clave clínica radica en mantener una buena hidratación matutina y reducir los líquidos 2 horas antes del sueño nocturno."
                </p>
              </div>
            </div>

            {/* Material Recomendado */}
            <div className="mt-12 bg-gray-50 rounded-2xl p-6 sm:p-8 border border-brand-100 shadow-sm">
              <h3 className="font-bold text-brand-800 uppercase tracking-wide text-lg mb-6 flex items-center gap-2">
                <Icons.Check /> Material recomendado
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {materials.map((mat, i) => (
                  <li key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:border-brand-300 hover:shadow-md transition-all overflow-hidden">
                    <a
                      href={getAmazonLink(mat.query, mat.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-4 p-4 items-start w-full h-full"
                    >
                      {mat.image && (
                        <img src={mat.image} alt={mat.name} className="w-16 h-16 object-cover rounded-lg border border-gray-100 shrink-0" />
                      )}
                      <div className="flex flex-col gap-1.5 flex-1">
                        <span className="font-semibold text-gray-900 text-sm">{mat.name}</span>
                        {mat.desc && <p className="text-xs text-gray-500 leading-snug">{mat.desc}</p>}
                        <div className="inline-flex items-center gap-1 text-[#FF9900] font-bold text-xs mt-1">
                          Ver en Amazon
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-white rounded-xl border border-gray-100 text-xs text-gray-500 leading-relaxed shadow-sm">
                Las recomendaciones que ves en esta web han sido seleccionadas bajo criterio profesional de Terapia Ocupacional. Al comprar a través de estos enlaces, ayudas a mantener el proyecto IAdapta sin que a ti te cueste ni un céntimo más.
              </div>
            </div>

          </div>
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
        <GuiaIncontinencia />
      </main>
      <Footer currentPage="guides" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
