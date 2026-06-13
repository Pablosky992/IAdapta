const { Icons, Navbar, Footer, CookieBanner, AdSenseBlock, getAmazonLink } = window;
const { useState } = React;

const GuiaSillasRuedas = function GuiaSillasRuedas() {
  const materials = [];

  return (
    <section className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
        <img src="assets/silla_activa.png" alt="Sillas de Ruedas" className="w-full h-64 sm:h-96 object-cover" />
        
        <div className="p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg">
          <div>
            <a href="guias.html" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors mb-6 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Volver a Guías
            </a>
            <h1 className="font-display text-4xl font-bold text-brand-900 mb-8">Sillas de Ruedas: Guía de Selección y Funcionalidad</h1>
            
            <p>
              La silla de ruedas no debe entenderse como una limitación, sino como una herramienta de libertad y participación social. Una elección adecuada, basada en las capacidades residuales del usuario y las demandas de su entorno, es la diferencia entre el aislamiento y la independencia.
            </p>

            <div className="space-y-8 mt-6 border-t border-gray-100 pt-6">
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">⚡</span> 1. Sillas de Ruedas Manuales y Activas</h5>
                <p>La propulsión manual requiere una evaluación precisa de la fuerza en miembros superiores y la estabilidad del tronco.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Sillas Manuales Estándar:</strong> Diseñadas para un uso ocasional o de transporte. Suelen ser más pesadas y menos ajustables, enfocadas en la durabilidad y la facilidad de plegado para acompañantes.</li>
                  <li><strong>Sillas Activas (Ultraligeras):</strong> Son la extensión del cuerpo del usuario independiente. Fabricadas en materiales como aluminio aeronáutico, titanio o carbono, permiten ajustar el centro de gravedad. Su diseño (de chasis rígido o plegable) busca la máxima eficiencia en cada pedalada, minimizando el esfuerzo y protegiendo la articulación del hombro a largo plazo.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🔋</span> 2. Sillas Eléctricas: Potencia y Portabilidad</h5>
                <p>La motorización está indicada cuando la propulsión manual no es funcional por fatiga, dolor o falta de fuerza.</p>
                <div className="my-4 rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white">
                  <img src="assets/silla_electrica.png" alt="Silla eléctrica ligera plegable en entorno urbano" className="w-full h-auto object-cover max-h-96 hover:scale-105 transition-transform duration-700" />
                </div>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Sillas Eléctricas Ligeras (Plegables):</strong> Equipadas habitualmente con baterias de litio, están diseñadas para la vida urbana y los viajes. Son fáciles de transportar en el maletero de un coche y ofrecen una gran maniobrabilidad en espacios reducidos, sacrificando algo de amortiguación por ligereza.</li>
                  <li><strong>Sillas Eléctricas Fijas (Robustas):</strong> Priorizan la estabilidad y la autonomía en exteriores. Suelen tener baterías de mayor capacidad, sistemas de suspensión avanzados y ruedas de mayor diámetro para sortear obstáculos y terrenos irregulares con seguridad.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">⚙️</span> 3. Sistemas de Basculación y Multifunción</h5>
                <p>En casos donde el usuario permanece sentado durante largos periodos y no puede realizar cambios posturales de forma autónoma, la tecnología de posicionamiento es crítica para la salud.</p>
                <div className="my-4 rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white">
                  <img src="assets/silla_basculante.png" alt="Silla de ruedas eléctrica con sistema de basculación" className="w-full h-auto object-cover max-h-96 hover:scale-105 transition-transform duration-700" />
                </div>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Sillas Basculantes (Manuales):</strong> Permiten inclinar todo el conjunto de asiento y respaldo sin cambiar el ángulo de las articulaciones del usuario. Esto es vital para la redistribución de presiones y la prevención de úlceras por presión (escaras).</li>
                  <li><strong>Sillas Eléctricas Basculantes y Multifunción:</strong> Representan el máximo nivel de tecnología asistencial. Permiten al usuario controlar electrónicamente la basculación, la reclinación del respaldo y la elevación de los reposapiés.</li>
                </ul>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💡</span>
                  <h5 className="font-bold text-emerald-800 uppercase tracking-wide text-base">El Consejo del Terapeuta Ocupacional</h5>
                </div>
                <p className="text-emerald-900 italic text-base leading-relaxed">
                  "La silla de ruedas no es un mueble, es una prótesis de movilidad. Un error crítico es no prestar atención al cojín antiescaras; de nada sirve la mejor silla eléctrica del mercado si la superficie de apoyo no gestiona correctamente las presiones. Asimismo, recuerda que una silla eléctrica multifunción no es solo comodidad: la capacidad de elevar las piernas por encima del nivel del corazón o cambiar el ángulo de apoyo es una intervención médica constante que previene complicaciones graves y mejora el confort diario."
                </p>
              </div>
            </div>

            <div className="mt-16 overflow-hidden rounded-xl bg-gray-50/50 min-h-[100px] flex flex-col items-center justify-center">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Publicidad</span>
              <AdSenseBlock slot="9272607554" />
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
        <GuiaSillasRuedas />
      </main>
      <Footer currentPage="guides" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
