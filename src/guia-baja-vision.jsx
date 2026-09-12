const { Icons, Navbar, Footer, CookieBanner, getAmazonLink } = window;
const { useState } = React;

const GuiaBajaVision = function GuiaBajaVision() {
  const materials = [
    {
      name: 'Lupa de lectura con 30 aumentos y 18 luces LED',
      desc: 'Proporciona aumento uniforme y luz fría de alto contraste para lectura y medicación.',
      image: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T1/images/I/61yGmfAFUGL._AC_SL1500_.jpg',
      link: 'https://amzn.to/4r4JXC4',
      query: 'lupa lectura alta potencia luz led aumentos personas mayores'
    },
    {
      name: 'Reloj de Orientación y Números Grandes',
      desc: 'Pantalla de alto contraste con dígitos gigantes que facilita la lectura horaria sin forzar la vista.',
      image: 'assets/reloj_orientacion.png',
      link: 'https://amzn.to/4wJVzML',
      query: 'reloj orientacion numeros grandes mayores'
    },
    {
      name: 'Teléfono fijo con teclas gigantes y teclas fotográficas',
      desc: 'Marcación directa intuitiva sin necesidad de forzar la vista ni memorizar números.',
      image: 'https://m.media-amazon.com/images/W/BW_MEDIAX_AVIF_MEASUREMENT_1306696-T1/images/I/71YIFf0h1yL._AC_SL1500_.jpg',
      link: 'https://amzn.to/4xwVRGM',
      query: 'telefono fijo teclas grandes fotos ancianos baja vision'
    }
  ];

  return (
    <section className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
        <img src="assets/guia_baja_vision.png" alt="Adaptaciones para Baja Visión y Accesibilidad Sensorial" className="w-full h-64 sm:h-96 object-cover" />
        
        <div className="p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg">
          <div>
            <a href="guias.html" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors mb-6 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Volver a Guías
            </a>
            <h1 className="font-display text-4xl font-bold text-brand-900 mb-8">Adaptaciones para Baja Visión y Accesibilidad Sensorial</h1>
            
            <p>
              Patologías oculares comunes en el adulto mayor como la degeneración macular asociada a la edad (DMAE), el glaucoma, la retinopatía diabética o las cataratas reducen sensiblemente la agudeza visual, la sensibilidad al contraste y el campo visual periférico. Desde la Terapia Ocupacional, intervenimos en el entorno adaptando la iluminación, maximizando el contraste cromático, integrando macrotipos y recurriendo a la estimulación háptica y auditiva para que la persona mantenga su total autonomía en las actividades de la vida diaria.
            </p>

            <div className="space-y-8 mt-6 border-t border-gray-100 pt-6">
              <p>A continuación, detallamos las adaptaciones clave para un entorno doméstico accesible para personas con déficit visual:</p>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🎨</span> 1. El Principio del Alto Contraste Cromático</h5>
                <p>La pérdida de sensibilidad al contraste hace que los objetos del mismo tono se fusionen en un plano confuso.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Contraste en la Mesa:</strong> Utilizar vajilla de color oscuro (azul marino o rojo) sobre manteles blancos o viceversa. Esto permite delimitar con claridad el contorno del plato y la cantidad de comida servida.</li>
                  <li><strong>Delimitación de Puertas e Interruptores:</strong> Colocar marcos o embellecedores de interruptor de color oscuro sobre paredes claras facilita su localización rápida sin tanteos.</li>
                  <li><strong>Bordes de Escalones y Rodapiés:</strong> Franjas amarillas o negras de 5 cm de ancho en el canto de cada peldaño alertan del cambio de plano y previenen tropiezos catastróficos.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">💡</span> 2. Iluminación Estratégica sin Deslumbramiento</h5>
                <p>Una luz excesiva o mal dirigida genera reflejos dolorosos y reduce aún más la visión funcional.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Iluminación de Tareas Focalizada:</strong> Emplear flexos o lámparas de brazo articulado con bombillas LED de temperatura neutra/fría (4000K-5000K), orientando el haz directamente sobre el libro, la tabla de corte o el costurero, por debajo de la altura de los ojos.</li>
                  <li><strong>Eliminación de Sombras y Deslumbramientos:</strong> Evitar suelos excesivamente encerados o brillantes que reflejen la luz solar directa, utilizando cortinas traslúcidas que difuminen la claridad exterior.</li>
                  <li><strong>Luces de Guía Nocturna:</strong> Balizas LED de paso bajo consumo que proporcionan referencia espacial en pasillos y aseos.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🔍</span> 3. Ayudas Ópticas, Macrotipos y Tecnología Adaptada</h5>
                <p>Facilitar el acceso a la lectura de etiquetas, prospectos médicos y comunicación personal.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Lupas con Iluminación Incorporada:</strong> Lupas de mano con aumentos ópticos de 3x a 30x y luz LED perimetral que compensan la pérdida de agudeza en la fóvea.</li>
                  <li><strong>Teclados y Teléfonos de Macrotipos:</strong> Teclas grandes de 2x2 cm con números grabados en alto contraste (amarillo sobre negro o blanco sobre negro) y volumen amplificado.</li>
                  <li><strong>Pastilleros Semanales Gigantes con Relieve:</strong> Compartimentos sobredimensionados con serigrafía en letras gigantes y código Braille o táctil.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🔘</span> 4. Marcadores Táctiles y Organización Háptica</h5>
                <p>El tacto compensa de forma extraordinaria la disminución de la capacidad visual.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Puntos de Silicona en Relieve (Bump Dots):</strong> Pequeñas gotas adhesivas transparentes o de color que se pegan sobre los programas más utilizados del microondas, la lavadora o el dial del termostato.</li>
                  <li><strong>Criterio de Orden Fijo:</strong> Mantener los objetos de aseo, cubiertos y ropa siempre en la misma posición dentro de cajones compartimentados para evitar búsquedas visuales frustrantes.</li>
                </ul>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💡</span>
                  <h5 className="font-bold text-emerald-800 uppercase tracking-wide text-base">El Consejo de la Terapia Ocupacional</h5>
                </div>
                <p className="text-emerald-900 italic text-base leading-relaxed">
                  "En la baja visión, iluminar más no siempre significa ver mejor. La luz directa sobre los ojos provoca un 'velo de deslumbramiento' que anula la visión residual. Sitúa siempre la fuente de luz detrás o a un lado del hombro del usuario, nunca enfrente de su campo visual, y prioriza el contraste cromático antes que el aumento de vatios."
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
        <GuiaBajaVision />
      </main>
      <Footer currentPage="guides" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
