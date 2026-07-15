const { Icons, Navbar, Footer, CookieBanner, getAmazonLink } = window;
const { useState } = React;

const GuiaBano = function GuiaBano() {
  const materials = [
    {
      name: 'Tabla de bañera',
      desc: 'Permite sentarse y girar las piernas hacia el interior de forma segura sin obras.',
      image: 'tabla_banera.png',
      link: 'https://amzn.to/4uLnkU5',
      query: 'tabla bañera ortopedia'
    },
    {
      name: 'Asiento giratorio para bañera',
      desc: 'Permite entrar y salir de la bañera cómodamente sin levantar las piernas.',
      image: 'asiento_banera.png',
      link: 'https://amzn.to/4d3bjlv',
      query: 'asiento giratorio bañera ortopedia'
    },
    {
      name: 'Asiento para ducha',
      desc: 'Banqueta estable con conteras antideslizantes para una higiene segura.',
      image: 'asiento_ducha.png',
      link: 'https://amzn.to/4dfjkUJ',
      query: 'asiento ducha banqueta ortopedia'
    },
    {
      name: 'Elevador de inodoro con reposabrazos',
      desc: 'Aumenta la altura del WC y da soporte firme al levantarse o sentarse.',
      image: 'alza_wc.png',
      link: 'https://amzn.to/42hlsWU',
      query: 'elevador inodoro con reposabrazos'
    },
    {
      name: 'Agarraderas / Barras de apoyo',
      desc: 'Asideros de pared imprescindibles para prevenir caídas en la ducha.',
      image: 'barras_apoyo.png',
      link: 'https://amzn.to/4u4JBw3',
      query: 'asidero barra apoyo baño'
    }
  ];

  return (
    <section className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
        <img src="assets/banyo_adaptado.png" alt="Baño Adaptado" className="w-full h-64 sm:h-96 object-cover" />
        
        <div className="p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg">
          <div>
            <a href="guias.html" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors mb-6 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Volver a Guías
            </a>
            <h1 className="font-display text-4xl font-bold text-brand-900 mb-8">Adaptación integral del cuarto de baño</h1>
            
            <p>
              El cuarto de baño es, estadísticamente, la estancia del hogar con mayor índice de caídas y accidentes domésticos. Sin embargo, más allá de la seguridad física, es el espacio donde la preservación de la intimidad y la autonomía personal cobran su valor más alto. Desde la perspectiva de la Terapia Ocupacional, entendemos que una adaptación exitosa no siempre requiere obras de gran envergadura; la clave reside en el diseño centrado en el usuario y en el análisis minucioso de la secuencia de movimientos durante el aseo personal.
            </p>

            <div className="space-y-8 mt-6 border-t border-gray-100 pt-6">
              <p>A continuación, detallamos los pilares fundamentales para transformar el baño en un entorno facilitador:</p>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🚿</span> 1. Eliminación de Barreras: Del Plato de Ducha a la Adaptación sin Obras</h5>
                <p>Sustituir la bañera por un plato de ducha extraplano es la intervención más eficaz para eliminar el obstáculo arquitectónico más limitante del hogar. Sin embargo, cuando la reforma estructural no es viable por motivos económicos o de vivienda, existen soluciones técnicas de alta eficacia.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Acceso Universal y Seguridad:</strong> Al instalar un plato a ras de suelo, se eliminan los tropiezos y se permite el acceso de ayudas técnicas como sillas de ducha con ruedas. La ausencia de escalones es la clave para una entrada y salida fluida.</li>
                  <li><strong>La Alternativa sin Obras: Tabla de Bañera:</strong> Si la sustitución de la bañera no es posible, la tabla de bañera es el producto de apoyo por excelencia.</li>
                  <li><strong>Funcionalidad:</strong> Se encaja firmemente sobre los bordes de la bañera, permitiendo que el usuario se siente desde fuera y gire las piernas hacia el interior de forma controlada y segura.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🦾</span> 2. Soporte Estructural: Barras de Apoyo Estratégicas</h5>
                <p>Las barras no son simples asideros; son herramientas biomecánicas que ayudan a distribuir el esfuerzo muscular y compensar déficits de equilibrio.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Distribución Funcional:</strong> Barra Vertical imprescindible en la entrada de la zona de ducha para facilitar el equilibrio durante el traspaso de pesos.</li>
                  <li><strong>Barra Horizontal u Oblicua:</strong> Situada a la altura óptima del usuario para asistir en el paso de sedestación a bipedestación (levantarse y sentarse), ya sea en el inodoro o en el asiento de ducha.</li>
                  <li><strong>Fijación de Seguridad:</strong> Se recomienda siempre el anclaje mediante taladro a la pared estructural. Las barras de ventosa pueden ser útiles para viajes, pero no ofrecen la estabilidad necesaria para un uso domiciliario seguro ante una carga de peso súbita.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🚽</span> 3. Ergonomía y Biomecánica del Inodoro</h5>
                <p>La altura estándar de un inodoro suele ser insuficiente para personas con movilidad reducida o patologías articulares en miembros inferiores.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>La Regla de los 90 Grados:</strong> Para que la transición de sentado a pie sea eficiente y con el mínimo desgaste articular, la altura del asiento debe permitir que las rodillas y las caderas formen un ángulo recto, con los pies firmemente apoyados.</li>
                  <li><strong>Soluciones Adaptables:</strong> Dependiendo de la necesidad, se puede optar por elevadores de inodoro, inodoros de altura especial o la instalación de modelos suspendidos que permiten regular la altura de montaje.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">🚰</span> 4. Grifería y Accesorios de Fácil Alcance</h5>
                <p>La funcionalidad también reside en los pequeños detalles que facilitan la destreza motora fina.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Mecanismos de Palanca:</strong> Sustituir los grifos de rosca por modelos monomando de palanca larga facilita el control del caudal y la temperatura, especialmente en personas con artritis o debilidad en el agarre.</li>
                  <li><strong>Sistemas Termostáticos:</strong> Estos evitan cambios bruscos de temperatura, previniendo quemaduras accidentales, un factor crítico en personas con sensibilidad térmica alterada.</li>
                </ul>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl shadow-sm mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💡</span>
                  <h5 className="font-bold text-emerald-800 uppercase tracking-wide text-base">El Consejo de la Terapia Ocupacional</h5>
                </div>
                <p className="text-emerald-900 italic text-base leading-relaxed">
                  "La seguridad no termina al cerrar el grifo. Es fundamental que la alfombrilla antideslizante exterior sea de base estable y cubra toda la zona de apoyo de los pies al salir de la ducha. Asimismo, en casos de déficit visual o deterioro cognitivo, es vital que las barras de apoyo tengan un contraste cromático fuerte con el azulejo (por ejemplo, barras de color oscuro sobre pared blanca) para facilitar su localización inmediata y segura."
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
        <GuiaBano />
      </main>
      <Footer currentPage="guides" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
