const { Icons, Navbar, Footer, CookieBanner } = window;

const { useState, useEffect, useCallback, useRef, useMemo } = React;

const SectionLegal = function SectionLegal() {
  const [activeTab, setActiveTab] = useState('privacy');

  return (
    <div className="min-h-screen pt-36 pb-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
        {/* Tab Selector */}
        <div className="flex border-b border-gray-100 bg-brand-50/30">
          <button 
            onClick={() => setActiveTab('legal')}
            className={`flex-1 py-6 font-bold text-lg transition-all focus:outline-none ${activeTab === 'legal' ? 'bg-white text-brand-900 border-b-4 border-brand-900' : 'text-gray-400 hover:text-brand-600'}`}
          >
            Aviso Legal
          </button>
          <button 
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 py-6 font-bold text-lg transition-all focus:outline-none ${activeTab === 'privacy' ? 'bg-white text-brand-900 border-b-4 border-brand-900' : 'text-gray-400 hover:text-brand-600'}`}
          >
            Política de Privacidad
          </button>
        </div>

        <div className="p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg anim-fade-in">
          {activeTab === 'legal' ? (
            <>
              <h1 className="font-display text-4xl font-bold text-brand-900 mb-8">Aviso Legal</h1>
              <section>
                <h2 className="text-2xl font-bold text-brand-800 mb-4">1. Datos del Responsable</h2>
                <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI), se exponen los siguientes datos identificativos:</p>
                <ul className="mt-4 space-y-2 list-disc pl-6">
                  <li><strong>Titular:</strong> Pablo Narciso Millán (IAdapta)</li>
                  <li><strong>Actividad:</strong> Terapeuta Ocupacional & Especialista en Accesibilidad</li>
                  <li><strong>Email:</strong> iadaptato@gmail.com</li>
                  <li><strong>Sitio Web:</strong> iadapta.es</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-brand-800 mb-4">2. Finalidad del Sitio Web</h2>
                <p>
                  IAdapta es una plataforma informativa dedicada a la difusión de conocimientos sobre adaptaciones de ortopedia, accesibilidad y recursos para profesionales de la salud. 
                  El sitio web incluye enlaces de afiliación de Amazon y espacios publicitarios para su sostenibilidad.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-brand-800 mb-4">3. Exclusión de Responsabilidad (Descargo Clínico)</h2>
                <p className="bg-brand-50 p-6 rounded-2xl border-l-4 border-brand-500 italic">
                  Todo el contenido, guías, análisis de IA y recursos publicados en este sitio web tienen carácter estrictamente orientativo e informativo. 
                  En ningún caso esta información sustituye la valoración clínica, el diagnóstico o el tratamiento realizado por un profesional sanitario colegiado en persona. 
                  IAdapta no se hace responsable de las decisiones tomadas por el usuario basadas únicamente en la información aquí expuesta.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-brand-800 mb-4">4. Propiedad Intelectual</h2>
                <p>Todo el contenido de este sitio web, incluyendo textos, gráficos, interfaces, juegos cognitivos y logotipos, es propiedad de IAdapta o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual internacionales.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-brand-800 mb-4">5. Condiciones de Uso</h2>
                <p>El usuario se compromete a hacer un uso adecuado de los contenidos y servicios de la web. Queda prohibida la reproducción total o parcial de los recursos profesionales y juegos con fines comerciales sin autorización expresa del titular.</p>
              </section>
            </>
          ) : (
            <>
              <h1 className="font-display text-4xl font-bold text-brand-900 mb-8">Política de Privacidad y Cookies</h1>
              <section>
                <h2 className="text-2xl font-bold text-brand-800 mb-4">1. Protección de Datos (RGPD)</h2>
                <p>IAdapta garantiza la protección de los datos de carácter personal que el usuario preocupe a través de los formularios de contacto o correos electrónicos, tratando dicha información con la máxima confidencialidad y únicamente para responder a las solicitudes de servicio.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-brand-800 mb-4">2. Uso de Cookies</h2>
                <p>Utilizamos cookies propias y de terceros para mejorar la experiencia de usuario, gestionar los enlaces de afiliación y mostrar publicidad:</p>
                <ul className="mt-4 space-y-2 list-disc pl-6 mb-4">
                  <li><strong>Cookies de Afiliación:</strong> Al clicar en productos recomendados, Amazon instala una cookie (24h) para identificar el origen de la compra.</li>
                  <li><strong>Cookies Técnicas:</strong> Necesarias para recordar tus preferencias (como la aceptación de este aviso).</li>
                </ul>
                <h3 className="font-bold text-brand-700 mt-6 mb-2">Cookies Publicitarias de Google AdSense</h3>
                <p className="mb-2 text-sm">
                  Los proveedores de terceros, incluido Google, utilizan cookies para publicar anuncios basándose en las visitas anteriores de un usuario a nuestro sitio web o a otros sitios de Internet.
                </p>
                <p className="mb-2 text-sm">
                  El uso de cookies de publicidad permite a Google y a sus socios publicar anuncios basados en las visitas que los usuarios realizan a este sitio web y a otros en Internet.
                </p>
                <p className="text-sm">
                  Los usuarios pueden inhabilitar la publicidad personalizada. Para ello, pueden visitar la <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">Configuración de anuncios de Google</a>.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-brand-800 mb-4">3. Valoración de la estancia (Gemini Vision)</h2>
                <p>Cuando utilizas nuestra Valoración de la estancia, las imágenes enviadas se procesan de forma efímera a través de la API de Google Gemini para generar el informe de accesibilidad. <strong>No almacenamos, compartimos ni utilizamos tus imágenes</strong> para ningún otro fin comercial o de entrenamiento de modelos.</p>
              </section>
            </>
          )}
          <div className="pt-10 border-t border-gray-100 flex justify-between items-center text-sm text-gray-400">
            <p>Última actualización: Mayo 2026</p>
            <p>iadapta.es</p>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <Navbar currentPage="legal" />
      <main id="main-content">
        <SectionLegal />
      </main>
      <Footer currentPage="legal" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
