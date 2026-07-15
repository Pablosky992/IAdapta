const { Icons, Navbar, Footer, CookieBanner, getAmazonLink } = window;
const { useState } = React;

const GuiaDomotica = function GuiaDomotica() {
  const materials = [
    {
      name: 'Controlador Inteligente (Alexa)',
      desc: 'El cerebro de la casa adaptada. Permite controlar luces, llamar a emergencias o escuchar la radio solo con la voz.',
      image: 'assets/alexa_altavoz.png',
      link: 'https://amzn.to/4eJQqy3',
      query: 'altavoz inteligente alexa echo'
    },
    {
      name: 'Enchufe Inteligente con Control Remoto',
      desc: 'Convierten cualquier lámpara o radiador antiguo en un dispositivo que se puede encender con la voz o desde el móvil.',
      image: 'assets/enchufe_inteligente.png',
      link: 'https://amzn.to/3QWndGL',
      query: 'enchufe inteligente wifi'
    },
    {
      name: 'Teléfono Móvil para Mayores',
      desc: 'Interfaz simplificada, volumen alto, números grandes y botón de emergencia en la parte trasera conectado a los familiares.',
      image: 'assets/movil_mayores.png',
      link: 'https://amzn.to/4vQ7mZG',
      query: 'telefono movil mayores boton sos'
    }
  ];

  return (
    <section className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
        <img src="assets/guia_domotica.png" alt="Hogar Inteligente y Accesibilidad Digital" className="w-full h-64 sm:h-96 object-cover" />
        
        <div className="p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg">
          <div>
            <a href="guias.html" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors mb-6 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Volver a Guías
            </a>
            <h1 className="font-display text-4xl font-bold text-brand-900 mb-8">Accesibilidad Digital y Domótica: El Hogar Inteligente</h1>
            
            <p>
              La tecnología ha democratizado la accesibilidad. Lo que hace unos años requería obras millonarias para domotizar una casa, hoy se puede conseguir por menos de cien euros comprando dispositivos de consumo general en cualquier tienda de electrónica.
            </p>
            <p>
              Para las personas con movilidad severamente reducida (lesión medular, ELA) o para personas mayores que viven solas, la domótica básica no es un lujo, es una herramienta fundamental que les devuelve el control sobre su entorno y proporciona seguridad a sus familias.
            </p>

            <div className="space-y-8 mt-6 border-t border-gray-100 pt-6">
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🗣️</span> 1. El Control por Voz: Tu Nuevo Mando a Distancia Universal</h5>
                <p>El teclado y el ratón requieren motricidad fina; los interruptores de la pared requieren movilidad y bipedestación. La voz, en cambio, es la interfaz más accesible que existe.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Asistentes Virtuales (Alexa, Google Assistant, Siri):</strong> Configurar altavoces inteligentes distribuidos por la casa permite a la persona realizar tareas complejas sin moverse: "Enciende la luz del pasillo", "Llama a mi hija", "Pon la radio", "Recuérdame tomar la pastilla a las 8".</li>
                  <li><strong>Llamadas y Mensajería:</strong> Los dispositivos con pantalla (como el Echo Show) permiten hacer videollamadas automáticas (la persona no tiene ni que tocar la pantalla para descolgar, ideal para comprobar cómo están).</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🔌</span> 2. Automatización Económica</h5>
                <p>No necesitas tirar los electrodomésticos viejos para tener una casa inteligente.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Enchufes y Bombillas Inteligentes:</strong> Un enchufe inteligente se interpone entre el aparato (una estufa, un ventilador, una lámpara antigua) y el enchufe de la pared. A partir de ahí, puedes encender y apagar ese aparato con la voz o programarlo desde el móvil (ej. "Que se encienda el radiador media hora antes de levantarme").</li>
                  <li><strong>Mandos a distancia por infrarrojos WiFi:</strong> Pequeños aparatos que copian la señal del mando de la tele o el aire acondicionado, permitiéndote controlar estos dispositivos no inteligentes mediante comandos de voz ("Sube el volumen de la tele", "Pon Telecinco").</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">📱</span> 3. Comunicación y Emergencias (Teleasistencia)</h5>
                <p>La tranquilidad de saber que la persona puede pedir ayuda si se cae estando sola en casa no tiene precio.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Teléfonos Adaptados:</strong> Existen smartphones diseñados específicamente para mayores. Tienen una interfaz de iconos gigantes y, sobre todo, un gran botón físico de SOS en la parte trasera. Al pulsarlo, el teléfono llama secuencialmente a una lista de contactos predefinida hasta que alguien descuelga, y envía un SMS con las coordenadas GPS.</li>
                  <li><strong>Relojes Inteligentes (Smartwatches) con detección de caídas:</strong> Si la persona sufre un desmayo o tropiezo brusco y no se mueve en los siguientes segundos, el reloj llama automáticamente a emergencias (112) y a los familiares, sin que la persona tenga que pulsar nada.</li>
                </ul>
              </div>

              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-2xl shadow-sm mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💡</span>
                  <h5 className="font-bold text-indigo-800 uppercase tracking-wide text-base">El Consejo del Terapeuta Ocupacional</h5>
                </div>
                <p className="text-indigo-900 italic text-base leading-relaxed">
                  "No abrumes a la persona mayor con un móvil de última generación lleno de aplicaciones que no va a usar. Configúrale el móvil borrando (o escondiendo) TODO excepto las llamadas, los mensajes y la cámara. El miedo a 'romper' la tecnología desaparece cuando la interfaz es limpia y los iconos son grandes."
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
                    <a href={getAmazonLink(mat.query, mat.link)} target="_blank" rel="noopener noreferrer" className="flex gap-4 p-4 items-start w-full h-full">
                      {mat.image && <img src={mat.image} alt={mat.name} className="w-16 h-16 object-cover rounded-lg border border-gray-100 shrink-0" />}
                      <div className="flex flex-col gap-1.5 flex-1">
                        <span className="font-semibold text-gray-900 text-sm">{mat.name}</span>
                        {mat.desc && <p className="text-xs text-gray-500 leading-snug">{mat.desc}</p>}
                        <div className="inline-flex items-center gap-1 text-[#FF9900] font-bold text-xs mt-1">Ver en Amazon</div>
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
        <GuiaDomotica />
      </main>
      <Footer currentPage="guides" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
