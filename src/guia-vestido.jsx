const { Icons, Navbar, Footer, CookieBanner, getAmazonLink } = window;
const { useState } = React;

const GuiaVestido = function GuiaVestido() {
  const materials = [
    {
      name: 'Calzador de Mango Largo',
      desc: 'Permite ponerse los zapatos sin necesidad de agacharse o flexionar la cadera.',
      image: 'assets/calzador_largo.png',
      link: 'https://amzn.to/44ccKdr',
      query: 'calzador mango largo metalico'
    },
    {
      name: 'Pone-calcetines (Calcetinero)',
      desc: 'Dispositivo para deslizar el calcetín por el pie tirando de unas cintas, ideal post-cirugía.',
      image: 'assets/pone_calcetines.png',
      link: 'https://amzn.to/3QCeZDT',
      query: 'pone calcetines medias'
    },
    {
      name: 'Abotonador con Mango Grueso',
      desc: 'Permite abrochar botones pequeños usando una sola mano o compensando la falta de movilidad en los dedos.',
      image: 'assets/abotonador.png',
      link: 'https://amzn.to/4eXYry7',
      query: 'abotonador mango grueso artrosis'
    }
  ];

  return (
    <section className="pt-36 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
        <img src="assets/guia_vestido.png" alt="Vestido y Calzado Independiente" className="w-full h-64 sm:h-96 object-cover" />
        
        <div className="p-8 sm:p-16 space-y-10 text-gray-700 leading-relaxed text-lg">
          <div>
            <a href="guias.html" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors mb-6 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Volver a Guías
            </a>
            <h1 className="font-display text-4xl font-bold text-brand-900 mb-8">Vestido y Calzado: Autonomía frente a las Limitaciones Articulares</h1>
            
            <p>
              Vestirse es una Actividad Básica de la Vida Diaria (ABVD) fundamental para la autoestima. Sin embargo, puede convertirse en un reto inmenso cuando existen problemas para agacharse (artrosis de cadera, prótesis, lumbalgias) o falta de destreza en las manos (artritis reumatoide, hemiplejia, Parkinson).
            </p>
            <p>
              Desde la Terapia Ocupacional, el abordaje se divide en dos estrategias: modificar las prendas para que sean más fáciles de poner, y utilizar productos de apoyo (ayudas técnicas) que compensen la limitación física.
            </p>

            <div className="space-y-8 mt-6 border-t border-gray-100 pt-6">
              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">👖</span> 1. Vestido del Tren Inferior (Pantalones y Calcetines)</h5>
                <p>Alcanzar los pies es el mayor desafío. La regla principal para quienes no pueden flexionar la cadera más de 90 grados es utilizar herramientas de largo alcance.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>El Pone-calcetines o Pone-medias:</strong> Es un canal de plástico flexible donde se encaja el calcetín. El usuario lo deja caer al suelo sujeto por unas cintas largas, introduce el pie y tira hacia arriba. El calcetín queda puesto sin necesidad de encorvar la espalda.</li>
                  <li><strong>Pinza de largo alcance:</strong> Permite enganchar la cinturilla del pantalón o ropa interior desde el suelo para subirla hasta las rodillas, momento en el que las manos ya pueden alcanzarla sin peligro.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">👞</span> 2. Calzado Adaptado y Sistemas de Cierre</h5>
                <p>Atarse los cordones requiere motricidad fina, buena visión y flexión de tronco. Si falla alguna, debemos adaptar el zapato.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Cordones elásticos (rizados o con tanca):</strong> Transforman unas deportivas de cordones en un zapato que cede al meter el pie y luego ajusta perfectamente sin tener que hacer lazos.</li>
                  <li><strong>Calzadores de mango extra largo (60-80cm):</strong> Fundamentales. Evitan pisotear el contrafuerte del zapato y permiten calzarse estando sentado con la espalda recta o incluso de pie.</li>
                  <li><strong>Zapatos con cierres de Velcro:</strong> Siempre que sea posible, optar por cierres de gancho y bucle (velcro) amplios y fáciles de asir.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-brand-900 text-xl flex items-center gap-2"><span className="text-2xl">👕</span> 3. Vestido del Tren Superior (Camisas y Botones)</h5>
                <p>Las restricciones en el movimiento de los hombros o el dolor en los dedos complican ponerse chaquetas y abrochar botones.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Técnica de vestido en hemiplejia:</strong> La regla de oro es "el brazo afecto entra el primero y sale el último". Es decir, al ponerse una camisa, se introduce primero la manga del lado paralizado o dolorido usando la mano sana. Al desvestirse, se saca primero el lado sano.</li>
                  <li><strong>Abotonadores:</strong> Un mango grueso con un lazo de alambre en la punta. Se pasa el alambre por el ojal, se engancha el botón y se tira. Permite abrochar camisas con una sola mano o con dedos con artrosis.</li>
                  <li><strong>Adaptación de ropa:</strong> Sustituir botones por imanes ocultos (cierres magnéticos) o coser velcros bajo los botones originales, manteniendo la estética de la prenda pero haciéndola facilísima de cerrar.</li>
                </ul>
              </div>

              <div className="bg-sky-50 border-l-4 border-sky-500 p-6 rounded-r-2xl shadow-sm mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💡</span>
                  <h5 className="font-bold text-sky-800 uppercase tracking-wide text-base">El Consejo del Terapeuta Ocupacional</h5>
                </div>
                <p className="text-sky-900 italic text-base leading-relaxed">
                  "Simplifica el armario. En fases donde la energía es limitada, vestir prendas de punto suave, cinturillas elásticas (sin botones ni cremalleras) y zapatos slip-on puede significar la diferencia entre necesitar la ayuda de un cuidador cada mañana o poder mantener la autonomía personal total en el dormitorio."
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
        <GuiaVestido />
      </main>
      <Footer currentPage="guides" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
