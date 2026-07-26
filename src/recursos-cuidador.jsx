const { Icons, Navbar, Footer, CookieBanner, PRODUCT_CATALOG, getAmazonLink } = window;

const { useState, useEffect, useCallback, useMemo, useRef } = React;

// --- PREGUNTAS OFICIALES DEL TEST DE ZARIT (22 PREGUNTAS) ---
const ZARIT_QUESTIONS = [
  { id: 1, text: '¿Piensa que su familiar le pide más ayuda de la que realmente necesita?' },
  { id: 2, text: '¿Piensa que debido al tiempo que dedica a su familiar no tiene suficiente tiempo para usted?' },
  { id: 3, text: '¿Se siente tenso/a cuando tiene que cuidar a su familiar y además atender otras responsabilidades (trabajo, hogar...)?' },
  { id: 4, text: '¿Se siente avergonzado/a por la conducta de su familiar?' },
  { id: 5, text: '¿Se siente enfadado/a o irritado/a cuando está cerca de su familiar?' },
  { id: 6, text: '¿Piensa que cuidar a su familiar afecta negativamente a sus relaciones con otros miembros de la familia o amigos?' },
  { id: 7, text: '¿Tiene temor por el futuro de su familiar (qué pasará cuando usted no pueda cuidarle)?' },
  { id: 8, text: '¿Piensa que su familiar depende de usted en exceso?' },
  { id: 9, text: '¿Se siente agotado/a, cansado/a o sin energía debido a tener que estar junto a su familiar?' },
  { id: 10, text: '¿Siente que su propia salud física o mental ha empeorado debido a tener que cuidar a su familiar?' },
  { id: 11, text: '¿Piensa que no tiene tanta intimidad o espacio propio como le gustaría debido a su familiar?' },
  { id: 12, text: '¿Piensa que su vida social se ha visto afectada o reducida negativamente por tener que cuidar a su familiar?' },
  { id: 13, text: '¿Se siente incómodo/a por invitar a amigos o visitas a casa debido a su familiar?' },
  { id: 14, text: '¿Piensa que su familiar espera que usted le cuide, como si fuera la única persona con la que puede contar?' },
  { id: 15, text: '¿Piensa que no dispone de suficiente dinero para cuidar a su familiar además de sus otros gastos habituales?' },
  { id: 16, text: '¿Siente que será incapaz de cuidar a su familiar por mucho más tiempo?' },
  { id: 17, text: '¿Siente que ha perdido el control de su vida desde que comenzó la labor de cuidado de su familiar?' },
  { id: 18, text: '¿Desearía poder delegar o encargar el cuidado de su familiar a otra persona o institución?' },
  { id: 19, text: '¿Se siente indeciso/a, confuso/a o con dudas sobre qué decisiones tomar con su familiar?' },
  { id: 20, text: '¿Piensa que debería hacer más por su familiar de lo que ya hace?' },
  { id: 21, text: '¿Piensa que podría cuidar mejor o de forma más atenta a su familiar?' },
  { id: 22, text: 'En general, ¿se siente muy sobrecargado/a por tener que cuidar a su familiar?' }
];

const ZARIT_OPTIONS = [
  { value: 0, label: 'Nunca' },
  { value: 1, label: 'Rara vez' },
  { value: 2, label: 'Algunas veces' },
  { value: 3, label: 'Bastantes veces' },
  { value: 4, label: 'Casi siempre' }
];

// --- METADATOS COMPLEMENTARIOS PARA CUIDADORES ---
const CAREGIVER_DESCRIPTIONS = {
  '1': { category: 'banyo', desc: 'Facilita la entrada y salida de la bañera de forma segura al permitir realizar la transferencia en posición sentada, evitando resbalones y sobreesfuerzos.' },
  '2': { category: 'banyo', desc: 'Proporciona un soporte estable y antideslizante para asearse sentado dentro de la ducha, ideal para personas con fatiga, debilidad muscular o problemas de equilibrio.' },
  '3': { category: 'banyo', desc: 'Punto de sujeción firme que ofrece seguridad y apoyo durante las transferencias críticas, como sentarse o levantarse de la ducha, bañera e inodoro.' },
  '4': { category: 'banyo', desc: 'Eleva la altura del inodoro estándar facilitando la incorporación autónoma y disminuyendo el esfuerzo en rodillas y caderas en personas con movilidad reducida.' },
  '5': { category: 'banyo', desc: 'Permite sentarse fuera de la bañera y girar de forma suave hacia el interior, eliminando la necesidad de levantar las piernas sobre el borde mientras se mantiene el equilibrio.' },
  '6': { category: 'dormitorio', desc: 'Barrera de seguridad abatible que previene caídas accidentales de la cama durante la noche y sirve de punto de apoyo firme para incorporarse y realizar transferencias.' },
  '7': { category: 'dormitorio', desc: 'Estructura triangular suspendida sobre la cama que facilita al paciente cambiar de postura, reincorporarse o colaborar en las tareas de movilización del cuidador.' },
  '8': { category: 'dormitorio', desc: 'Bloques robustos que elevan la altura de la cama para facilitar el acostado e incorporación, reduciendo la flexión excesiva del cuidador durante las movilizaciones.' },
  '9': { category: 'cocina', desc: 'Cubertería con mangos gruesos, ergonómicos y antideslizantes diseñados para facilitar el agarre y la alimentación independiente si existe debilidad o artrosis en las manos.' },
  '10': { category: 'cocina', desc: 'Cuchillo ergonómico con hoja curva diseñado para cortar alimentos con una sola mano mediante un movimiento de balanceo oscilante de forma segura.' },
  '11': { category: 'cocina', desc: 'Tabla de preparación de alimentos adaptada con clavos de sujeción y bordes elevados que fijan la comida para permitir pelar, cortar y untar utilizando una sola mano.' },
  '12': { category: 'cocina', desc: 'Plato con pared interior alta y ventosa en la base para evitar que los alimentos se derramen y facilitar su recogida con el tenedor o cuchara utilizando una sola mano.' },
  '13': { category: 'cocina', desc: 'Vaso con recorte nasal diseñado para beber líquidos cómodamente sin necesidad de inclinar la cabeza hacia atrás, previniendo atragantamientos por disfagia.' },
  '14': { category: 'movilidad', desc: 'Estructura ligera y estrecha recomendada para garantizar la estabilidad al caminar en pasillos y estancias interiores estrechas del hogar.' },
  '15': { category: 'movilidad', desc: 'Andador de cuatro ruedas grandes con asiento integrado y frenos de presión, óptimo para caminar por exteriores de forma segura y descansar ante la fatiga.' },
  '16': { category: 'movilidad', desc: 'Gomas de repuesto reforzadas y de alta adherencia para andadores y muletas que garantizan el agarre en suelos interiores húmedos o resbaladizos.' },
  '17': { category: 'movilidad', desc: 'Muletas ergonómicas con apoyo regulable en antebrazo que distribuyen el peso del cuerpo de forma más eficiente previniendo dolores en las muñecas.' },
  '18': { category: 'movilidad', desc: 'Cinturón robusto con múltiples asas que se coloca al paciente para que el cuidador lo sujete firmemente durante levantamientos y transferencias, evitando lesiones de espalda.' },
  '19': { category: 'movilidad', desc: 'Plataforma circular giratoria antideslizante que facilita el giro controlado del paciente al pasar de la cama a la silla de ruedas, eliminando la torsión en las articulaciones.' },
  '20': { category: 'movilidad', desc: 'Sábana de tejido tubular ultra-deslizante que facilita la recolocación y giros del paciente encamado con un esfuerzo mínimo por parte del cuidador.' },
  '21': { category: 'seguridad', desc: 'Reloj digital con pantalla grande que muestra claramente el día, fecha y periodo del día (mañana, tarde, noche) ideal para la orientación temporal en personas con demencia.' },
  '22': { category: 'seguridad', desc: 'Dispositivo detector automático que alerta al instante ante la presencia de humos o fugas de gas en la cocina, garantizando la seguridad ante descuidos u olvidos.' },
  '23': { category: 'seguridad', desc: 'Localizador GPS de muñeca o bolsillo con botón SOS integrado que permite a los cuidadores rastrear la ubicación en tiempo real en caso de desorientación.' },
  '24': { category: 'seguridad', desc: 'Asistente virtual por voz (Alexa) que ayuda a la persona mayor a realizar llamadas, escuchar recordatorios de medicación o controlar luces mediante órdenes verbales simples.' },
  '25': { category: 'seguridad', desc: 'Enchufes controlables de forma remota que permiten apagar o programar calefactores y electrodomésticos a distancia para evitar riesgos de quemaduras o incendios.' },
  '26': { category: 'seguridad', desc: 'Teléfono móvil adaptado con teclas grandes y legibles, menú simplificado y botón SOS trasero que llama automáticamente a familiares o emergencias en caso de caída.' },
  '27': { category: 'dormitorio', desc: 'Cojín diseñado con material viscoelástico y funda impermeable que previene la aparición de escaras en personas que pasan largas jornadas sentadas.' },
  '28': { category: 'dormitorio', desc: 'Colchón ortopédico motorizado que infla y desinfla sus celdas de aire de forma alternante para aliviar la presión continua del cuerpo en pacientes encamados.' },
  '29': { category: 'dormitorio', desc: 'Taloneras acolchadas de borreguito que protegen la piel del talón contra el roce y la fricción continua con las sábanas, evitando la formación de úlceras.' },
  '30': { category: 'seguridad', desc: 'Lupa con luces LED de alta potencia que facilita la lectura independiente de prospectos de medicamentos o cartas a personas con problemas de visión.' },
  '31': { category: 'estimulacion', desc: 'Soporte curvo que sujeta las cartas de juego sin esfuerzo, ideal para personas con debilidad o temblor en las manos que disfrutan de juegos de mesa.' },
  '32': { category: 'seguridad', desc: 'Pequeño dispositivo mecánico que enhebra la aguja de coser automáticamente, útil para mantener actividades significativas de costura si hay pérdida de vista.' },
  '33': { category: 'movilidad', desc: 'Calzador metálico de mango largo que permite colocarse el calzado de pie o sentado sin necesidad de agacharse ni flexionar la columna vertebral.' },
  '34': { category: 'movilidad', desc: 'Estructura flexible que ayuda a colocarse calcetines o medias de forma independiente y sin realizar flexiones lumbares dolorosas.' },
  '35': { category: 'movilidad', desc: 'Mango ergonómico con bucle de alambre diseñado para pasar los botones por el ojal utilizando una sola mano, superando la falta de destreza fina.' },
  '36': { category: 'cocina', desc: 'Cubiertos pesados diseñados específicamente para estabilizar la mano durante la alimentación en personas con temblores severos (como Parkinson).' },
  '37': { category: 'banyo', desc: 'Alza de inodoro regulable que incorpora apoyabrazos laterales abatibles para ofrecer un punto de empuje seguro y estable durante el uso del WC.' },
  '38': { category: 'movilidad', desc: 'Calzador extra largo equipado con un gancho en el extremo opuesto que asiste al paciente para vestirse, alcanzar o arrastrar ropa.' },
  '39': { category: 'banyo', desc: 'Alfombra interior de caucho antideslizante con ventosas potentes para garantizar una pisada firme y sin resbalones dentro del plato de ducha o bañera.' },
  '40': { category: 'banyo', desc: 'Esponja acoplada a un mango ergonómico largo y curvado que permite lavar la espalda y pies sin necesidad de agacharse ni realizar flexiones.' },
  '41': { category: 'cocina', desc: 'Herramienta ergonómica de palanca o rosca que facilita la apertura cómoda de tarros de cristal y botellas de plástico sin requerir fuerza de agarre.' },
  '42': { category: 'seguridad', desc: 'Adaptador de plástico rígido que se acopla a las llaves de casa para ampliar la superficie de agarre, facilitando el giro de la cerradura ante falta de fuerza.' },
  '43': { category: 'dormitorio', desc: 'Dispositivos LED de enchufe que se iluminan automáticamente al detectar movimiento en la oscuridad, creando un pasillo seguro y previniendo caídas nocturnas.' },
  '44': { category: 'movilidad', desc: 'Cinta adhesiva especial de doble cara para fijar firmemente los bordes de alfombras al suelo, eliminando una de las causas más frecuentes de tropiezos en casa.' },
  '45': { category: 'banyo', desc: 'Asidero de seguridad de acero inoxidable rugoso para instalación mural fija que resiste altas cargas de peso en zonas resbaladizas.' },
  '46': { category: 'dormitorio', desc: 'Trapecio incorporador metálico portátil que se asienta de manera independiente bajo la cama, facilitando al paciente cambiar de postura con autonomía.' },
  '47': { category: 'estimulacion', desc: 'Pelota de silicona de densidad media ideal para realizar ejercicios de rehabilitación de la pinza y fuerza de agarre en procesos de artritis o tras ictus.' },
  '48': { category: 'estimulacion', desc: 'Set de bandas de resistencia suave ideales para realizar estiramientos y ejercicios terapéuticos sentados en silla, manteniendo el tono muscular activo.' },
  '49': { category: 'estimulacion', desc: 'Pedales portátiles estables diseñados para ejercitar la musculatura y articulaciones de piernas y brazos sentados cómodamente desde el sofá.' },
  '50': { category: 'estimulacion', desc: 'Ejercitador eléctrico pasivo que mueve las piernas suavemente adelante y atrás mientras se está sentado, estimulando la circulación y evitando la rigidez.' },
  '51': { category: 'estimulacion', desc: 'Libro de sopas de letras, crucigramas y laberintos con letra grande para mantener la mente activa, ejercitar la atención y divertirse de forma independiente.' },
  '52': { category: 'estimulacion', desc: 'Cuaderno completo de fichas y retos de memoria, razonamiento, cálculo y funciones ejecutivas adaptado para la prevención del deterioro cognitivo en adultos.' }
};

const CATEGORIES = [
  { id: 'all', title: 'Todos', icon: '📋', color: 'bg-brand-900' },
  { id: 'banyo', title: 'Baño e Higiene', icon: '🛁', color: 'bg-sky-600' },
  { id: 'dormitorio', title: 'Dormitorio y Descanso', icon: '🛏️', color: 'bg-indigo-600' },
  { id: 'cocina', title: 'Alimentación y Cocina', icon: '🍳', color: 'bg-accent-coral' },
  { id: 'movilidad', title: 'Movilidad y Transferencias', icon: '🚶', color: 'bg-emerald-600' },
  { id: 'seguridad', title: 'Domótica y Seguridad', icon: '🔌', color: 'bg-blue-900' },
  { id: 'estimulacion', title: 'Estimulación y Ejercicio', icon: '🧠', color: 'bg-orange-500' }
];

// --- BARRA DE SUB-NAVEGACIÓN INTERNA ---
const CaregiverSubNav = function CaregiverSubNav({ currentView, onViewChange }) {
  const tabs = [
    { id: 'printables', title: 'Fichas Imprimibles', shortTitle: 'Imprimibles', icon: '🖨️', color: 'bg-blue-600 border-blue-600' },
    { id: 'log', title: 'Diario de Registro', shortTitle: 'Diario', icon: '📝', color: 'bg-amber-600 border-amber-600' },
    { id: 'wizard', title: 'Orientador de Caso', shortTitle: 'Orientador', icon: '🧙‍♂️', color: 'bg-emerald-600 border-emerald-600' },
    { id: 'zarit', title: 'Test de Sobrecarga Zarit', shortTitle: 'Test Zarit', icon: '📋', color: 'bg-indigo-600 border-indigo-600' },
    { id: 'products', title: 'Productos Recomendados', shortTitle: 'Productos', icon: '🛒', color: 'bg-accent-coral border-accent-coral' },
    { id: 'chat', title: 'Asistente del Cuidador', shortTitle: 'Asistente IA', icon: '💬', color: 'bg-teal-600 border-teal-600' }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mb-10">
      <div className="flex items-center justify-between gap-4 flex-wrap border-b border-brand-100 pb-5">
        {/* Volver button */}
        <button 
          onClick={() => onViewChange('menu')}
          className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors bg-white px-4 py-2.5 rounded-xl shadow-sm border border-brand-100 group text-sm cursor-pointer"
        >
          <Icons.ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Volver a Recursos</span>
        </button>

        {/* Tab pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar whitespace-nowrap">
          {tabs.map(tab => {
            const isActive = currentView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onViewChange(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all border-2 cursor-pointer
                  ${isActive 
                    ? `${tab.color} text-white shadow-md shadow-brand-900/10 scale-105`
                    : 'bg-white border-brand-50 text-brand-500 hover:text-brand-900 hover:border-brand-200'}`}
              >
                <span>{tab.icon}</span>
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- MARKDOWN PARSER HELPERS FOR CHATBOT ---
const parseInlineMarkdown = (text) => {
  if (!text) return '';
  const regex = /(\[.*?\]\(.*?\))|(\*\*.*?\*\*)/g;
  const parts = text.split(regex);
  return parts.map((part, index) => {
    if (!part) return null;
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const linkText = part.substring(1, part.indexOf(']'));
      const url = part.substring(part.indexOf('](') + 2, part.length - 1);
      const isInternal = !url.startsWith('http') || url.includes('iadapta.es') || url.includes('localhost');
      return (
        <a 
          key={index} 
          href={url} 
          target={isInternal ? "_self" : "_blank"}
          rel="noopener noreferrer"
          className="text-teal-600 font-bold hover:underline inline-flex items-center gap-0.5 bg-teal-50/50 px-2 py-0.5 rounded-lg border border-teal-100/40"
        >
          {linkText}
          {isInternal ? ' 🔗' : ' ↗️'}
        </a>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold text-brand-900">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const renderProductCards = (ids) => {
  return (
    <div className="flex flex-col gap-3 my-3">
      {ids.map(id => {
        const p = PRODUCT_CATALOG[id];
        if (!p) return null;
        return (
          <div key={id} className="bg-white border border-brand-100 rounded-2xl p-4 shadow-sm flex items-center gap-4 animate-scale-in text-left">
            <img src={p.img} alt={p.name} className="w-16 h-16 object-contain rounded-lg bg-brand-50 shrink-0" />
            <div className="flex-1 min-w-0">
              <h5 className="font-bold text-brand-900 text-sm truncate">{p.name}</h5>
              <p className="text-[10px] text-teal-600 mb-2 font-medium">Recomendado para cuidadores</p>
              <a 
                href={getAmazonLink(p.query, p.url)} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 bg-accent-coral hover:bg-opacity-90 text-white px-3 py-1.5 rounded-xl font-bold text-xs transition-all active:scale-95 cursor-pointer"
              >
                <span>Ver en Amazon</span>
                <Icons.ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const renderMessageText = (text) => {
  if (!text) return null;
  const paragraphs = text.split('\n\n');
  return paragraphs.map((paragraph, pIdx) => {
    let content = paragraph.trim();
    if (!content) return null;

    const productRegex = /\[\[PRODUCTO?[:\s]*(\d+)\]\]/gi;
    const matches = [...content.matchAll(productRegex)];
    const productIds = [...new Set(matches.map(m => m[1]))];
    const cleanText = content.replace(productRegex, '').trim();
    
    if (!cleanText && productIds.length > 0) {
      return (
        <div key={pIdx} className="mb-4">
          {renderProductCards(productIds)}
        </div>
      );
    }

    let renderedElement = null;

    if (cleanText.startsWith('### ')) {
      renderedElement = (
        <h4 className="font-display text-lg font-bold text-brand-900 mt-4 mb-2">
          {cleanText.replace('### ', '')}
        </h4>
      );
    } else if (cleanText.startsWith('## ')) {
      renderedElement = (
        <h3 className="font-display text-xl font-bold text-brand-900 mt-5 mb-3">
          {cleanText.replace('## ', '')}
        </h3>
      );
    } else {
      const lines = cleanText.split('\n');
      const isList = lines.every(line => line.trim().startsWith('* ') || line.trim().startsWith('- '));
      if (isList) {
        renderedElement = (
          <ul className="list-disc pl-5 my-2 space-y-1.5 text-base text-gray-850 leading-relaxed text-left">
            {lines.map((line, lIdx) => {
              const cleanLine = line.trim().replace(/^[\*\-]\s+/, '');
              return <li key={lIdx}>{parseInlineMarkdown(cleanLine)}</li>;
            })}
          </ul>
        );
      } else {
        const subLines = cleanText.split('\n');
        renderedElement = (
          <p className="text-base text-gray-850 leading-relaxed mb-3.5 text-left">
            {subLines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {lIdx > 0 && <br />}
                {parseInlineMarkdown(line)}
              </React.Fragment>
            ))}
          </p>
        );
      }
    }

    return (
      <div key={pIdx} className="mb-4">
        {renderedElement}
        {productIds.length > 0 && renderProductCards(productIds)}
      </div>
    );
  });
};

// --- CHATBOT COMPONENT FOR CAREGIVER ---
const CaregiverChatbotComponent = function CaregiverChatbotComponent() {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('iadapta_caregiver_sessions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSessions(parsed);
        if (parsed.length > 0) {
          setActiveSessionId(parsed[0].id);
        } else {
          createNewSession();
        }
      } catch (e) {
        console.error("Error parsing caregiver sessions", e);
        createNewSession();
      }
    } else {
      createNewSession();
    }
  }, []);

  const saveSessions = (updated) => {
    setSessions(updated);
    localStorage.setItem('iadapta_caregiver_sessions', JSON.stringify(updated));
  };

  const createNewSession = () => {
    const newSession = {
      id: Date.now().toString(),
      title: 'Nueva consulta...',
      messages: [],
      date: new Date().toLocaleDateString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };
    
    setSessions(prev => {
      const updated = [newSession, ...prev];
      localStorage.setItem('iadapta_caregiver_sessions', JSON.stringify(updated));
      return updated;
    });
    setActiveSessionId(newSession.id);
    setInput('');
    setErrorMsg('');
  };

  const renameSession = (id, e) => {
    e.stopPropagation();
    const session = sessions.find(s => s.id === id);
    if (!session) return;
    const newTitle = window.prompt('Editar título de la conversación:', session.title);
    if (newTitle && newTitle.trim()) {
      const updated = sessions.map(s => {
        if (s.id === id) {
          return { ...s, title: newTitle.trim() };
        }
        return s;
      });
      saveSessions(updated);
    }
  };

  const deleteSession = (id, e) => {
    e.stopPropagation();
    const updated = sessions.filter(s => s.id !== id);
    saveSessions(updated);
    
    if (activeSessionId === id) {
      if (updated.length > 0) {
        setActiveSessionId(updated[0].id);
      } else {
        createNewSession();
      }
    }
  };

  const activeSession = useMemo(() => {
    return sessions.find(s => s.id === activeSessionId) || null;
  }, [sessions, activeSessionId]);

  const messages = useMemo(() => {
    return activeSession ? activeSession.messages : [];
  }, [activeSession]);

  const userQuestionsCount = useMemo(() => {
    return messages.filter(m => m.sender === 'user').length;
  }, [messages]);

  const isLimitReached = userQuestionsCount >= 5;
  const isLimitNear = userQuestionsCount === 4;

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading || isLimitReached) return;

    setErrorMsg('');
    if (!textToSend) setInput('');

    const userMsg = { sender: 'user', text };
    
    let updatedSessions = sessions.map(session => {
      if (session.id === activeSessionId) {
        const newMessages = [...session.messages, userMsg];
        let newTitle = session.title;
        if (session.title === 'Nueva consulta...') {
          newTitle = text.length > 28 ? text.substring(0, 28) + '...' : text;
        }
        return {
          ...session,
          title: newTitle,
          messages: newMessages
        };
      }
      return session;
    });

    saveSessions(updatedSessions);
    setIsLoading(true);

    const activeSessionMessages = updatedSessions.find(s => s.id === activeSessionId).messages;

    try {
      const response = await fetch('/api/chat-caregiver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: activeSessionMessages })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error al comunicarse con el asistente.');
      }

      const botMsg = { sender: 'bot', text: data.text };

      updatedSessions = updatedSessions.map(session => {
        if (session.id === activeSessionId) {
          return {
            ...session,
            messages: [...session.messages, botMsg]
          };
        }
        return session;
      });

      saveSessions(updatedSessions);

    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'No se pudo obtener una respuesta del servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[3rem] shadow-2xl border border-brand-100 overflow-hidden flex flex-col md:flex-row h-[750px] relative anim-scale-in text-left">
      
      {/* SIDEBAR - DESKTOP & MOBILE TRANSITION */}
      <aside className={`w-80 border-r border-brand-100 bg-brand-50/30 flex flex-col shrink-0 transition-transform duration-300 z-40 md:relative md:translate-x-0 absolute inset-y-0 left-0 bg-white
        ${showSidebarMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}`}>
        
        {/* Sidebar Header */}
        <div className="p-6 border-b border-brand-100 flex items-center justify-between">
          <h4 className="font-display text-lg font-bold text-brand-900">Historial de Consultas</h4>
          <button 
            onClick={() => setShowSidebarMobile(false)}
            className="md:hidden p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <Icons.X className="w-5 h-5" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button 
            onClick={() => {
              createNewSession();
              setShowSidebarMobile(false);
            }}
            className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-bold transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 text-sm cursor-pointer"
          >
            <Icons.Plus className="w-4 h-4" />
            Nueva Consulta
          </button>
        </div>

        {/* Sessions list */}
        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1.5 custom-scrollbar">
          {sessions.map(s => {
            const isActive = s.id === activeSessionId;
            return (
              <div 
                key={s.id}
                onClick={() => {
                  setActiveSessionId(s.id);
                  setErrorMsg('');
                  setShowSidebarMobile(false);
                }}
                className={`group p-4 rounded-2xl cursor-pointer transition-all flex items-center justify-between border-2
                  ${isActive 
                    ? 'bg-teal-50/50 border-teal-100 text-teal-900' 
                    : 'bg-white border-transparent text-gray-600 hover:bg-brand-50/40 hover:text-brand-900'}`}
              >
                <div className="flex-1 min-w-0 pr-2">
                  <p className="font-bold text-xs truncate leading-snug">{s.title}</p>
                  <span className="text-[10px] text-gray-400 block mt-1 font-medium">{s.date}</span>
                </div>
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 shrink-0 transition-opacity">
                  <button
                    onClick={(e) => renameSession(s.id, e)}
                    className="p-1.5 rounded-lg text-gray-300 hover:text-teal-600 hover:bg-teal-50/80 transition-all cursor-pointer"
                    title="Renombrar consulta"
                  >
                    <Icons.Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => deleteSession(s.id, e)}
                    className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50/80 transition-all cursor-pointer"
                    title="Eliminar consulta"
                  >
                    <Icons.Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* BACKDROP FOR MOBILE SIDEBAR */}
      {showSidebarMobile && (
        <div 
          onClick={() => setShowSidebarMobile(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 md:hidden animate-fade-in"
        ></div>
      )}

      {/* CHAT AREA */}
      <section className="flex-1 flex flex-col h-full bg-white relative min-w-0">
        
        {/* Chat Header */}
        <header className="px-6 py-4 border-b border-brand-100 flex items-center justify-between bg-white/80 backdrop-blur-sm relative z-10 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowSidebarMobile(true)}
              className="md:hidden p-2 text-gray-500 hover:text-gray-800 rounded-xl hover:bg-gray-100 shrink-0"
            >
              <Icons.Menu className="w-6 h-6" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center text-xl shrink-0 font-bold">
              💬
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-brand-900 text-base sm:text-lg">Asistente del Cuidador</h3>
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" title="Conectado"></span>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400 font-medium">Asistente de Apoyo y Guía Técnica</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-teal-50 text-teal-700 font-bold text-xs px-3 py-1.5 rounded-xl border border-teal-100/60 shadow-sm">
              Preguntas: {userQuestionsCount} / 5
            </span>
          </div>
        </header>

        {/* Message Container */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 custom-scrollbar relative">
          
          {messages.length === 0 ? (
            /* Welcome / Onboarding Screen */
            <div className="max-w-2xl mx-auto text-center py-8 sm:py-12 space-y-8 animate-fade-in flex flex-col items-center">
              <div className="inline-block p-6 bg-teal-50 text-teal-600 rounded-full text-4xl shadow-sm border border-teal-100 animate-bounce">
                👋
              </div>
              <div>
                <h4 className="font-display text-2xl font-black text-brand-900 mb-3">¡Hola! Soy tu asistente de apoyo</h4>
                <p className="text-gray-550 text-sm leading-relaxed max-w-lg mx-auto text-center mb-6">
                  Estoy aquí para orientarte en tus dudas diarias sobre el cuidado de tu familiar. Puedes preguntarme sobre técnicas de movilización sencillas, ayudas para el baño o simplemente buscar apoyo.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-2.5 justify-center mb-6 w-full max-w-md">
                  <button 
                    onClick={() => handleSendMessage('¿Cómo puedo levantar de la cama a mi familiar sin hacerme daño en la espalda?')}
                    className="bg-white border border-brand-100 hover:border-teal-200 text-gray-700 text-xs font-bold px-4 py-3 rounded-xl transition-all shadow-sm hover:bg-brand-50/20 cursor-pointer text-left sm:text-center"
                  >
                    🚶 Pauta para levantar de la cama
                  </button>
                  <button 
                    onClick={() => handleSendMessage('¿Qué adaptaciones o productos me recomiendas para duchar a mi familiar con seguridad?')}
                    className="bg-white border border-brand-100 hover:border-teal-200 text-gray-700 text-xs font-bold px-4 py-3 rounded-xl transition-all shadow-sm hover:bg-brand-50/20 cursor-pointer text-left sm:text-center"
                  >
                    🛁 Adaptar el aseo
                  </button>
                </div>
              </div>

              {/* Warning Alert */}
              <div className="bg-amber-50/70 border border-amber-250/50 rounded-2xl p-4 text-left max-w-lg mx-auto flex gap-3 text-amber-900 text-xs leading-relaxed">
                <Icons.Warning className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <strong className="font-bold block mb-0.5">Nota de orientación:</strong>
                  Las respuestas son generadas por Inteligencia Artificial con fines únicamente informativos y divulgativos. Consulta siempre con tu médico o terapeuta ocupacional antes de realizar movilizaciones físicas o aplicar cambios en las rutinas de tu familiar.
                </div>
              </div>
            </div>
          ) : (
            /* Render active conversation */
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((msg, index) => {
                const isUser = msg.sender === 'user';
                return (
                  <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                    <div className={`flex gap-3 max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-sm font-bold shadow-sm border
                        ${isUser 
                          ? 'bg-brand-900 text-white border-brand-900/10' 
                          : 'bg-teal-100 text-teal-700 border-teal-200/40'}`}>
                        {isUser ? '👤' : '🤖'}
                      </div>
                      
                      {/* Speech Bubble */}
                      <div className={`p-4 sm:p-5 rounded-2xl shadow-sm border
                        ${isUser 
                          ? 'bg-brand-900 text-white border-brand-900/10 rounded-tr-none' 
                          : 'bg-white text-gray-855 border-gray-150 rounded-tl-none'}`}>
                        {isUser ? (
                          <p className="text-base whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                        ) : (
                          renderMessageText(msg.text)
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Bot Loading Bubble */}
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="flex gap-3 max-w-[85%] flex-row">
                    <div className="w-8 h-8 rounded-full bg-teal-100 border border-teal-200/40 text-teal-700 shrink-0 flex items-center justify-center text-sm font-bold shadow-sm">
                      🤖
                    </div>
                    <div className="p-4 bg-white border border-gray-150 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                      <span className="text-xs text-gray-400 font-medium font-mono">El Asistente está analizando la consulta...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message Bubble */}
              {errorMsg && (
                <div className="max-w-lg mx-auto bg-red-50 border border-red-200 rounded-2xl p-4 text-red-900 text-xs flex gap-3 leading-relaxed animate-shake">
                  <Icons.AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <div>
                    <strong className="font-bold block mb-0.5">Error de Conexión:</strong>
                    <span>{errorMsg}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Chat Input Container */}
        <footer className="p-4 md:p-6 border-t border-brand-100 bg-white relative z-10 shrink-0">
          {isLimitReached ? (
            <div className="bg-amber-50 border border-amber-250/70 p-4 rounded-2xl text-amber-900 text-xs font-semibold text-center leading-relaxed">
              🔒 Has alcanzado el límite de 5 consultas en esta sesión para evitar la sobrecarga del servicio. 
              <br />
              Para seguir chateando, por favor haz clic en <button onClick={createNewSession} className="text-teal-600 underline font-bold cursor-pointer hover:text-teal-800">Nueva Consulta</button> e inicia una nueva sesión.
            </div>
          ) : (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-3 relative"
            >
              <input
                type="text"
                placeholder={isLimitNear ? "Última pregunta de tu sesión..." : "Escribe tu consulta aquí..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="w-full bg-slate-50 border border-gray-250 focus:border-teal-500 focus:bg-white rounded-2xl pl-5 pr-14 py-4 text-sm md:text-base outline-none text-gray-700 font-medium transition-all shadow-sm"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-11 h-11 bg-teal-600 hover:bg-teal-700 text-white rounded-xl flex items-center justify-center transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                title="Enviar mensaje"
              >
                <Icons.Send className="w-5 h-5" />
              </button>
            </form>
          )}
          
          <p className="text-[10px] text-gray-400 text-center mt-3 max-w-lg mx-auto font-medium leading-normal">
            Las respuestas de esta IA son meramente orientativas. Consulta siempre con un profesional sanitario o terapeuta ocupacional especialista antes de proceder con transferencias físicas o pautas médicas.
          </p>
        </footer>
      </section>
    </div>
  );
};

// --- DIARIO DE REGISTRO DE CUIDADOS COMPONENT ---
const CareLogComponent = function CareLogComponent() {
  const getFoodLabel = (f) => {
    switch (f) {
      case 'good': return '🟢 Buena';
      case 'regular': return '🟡 Regular';
      case 'bad': return '🔴 Mala';
      default: return '🟢 Buena';
    }
  };
  const [entries, setEntries] = useState([]);
  
  // Form states
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Meds (Morning/Afternoon/Night)
  const [medsMorning, setMedsMorning] = useState(true);
  const [medsAfternoon, setMedsAfternoon] = useState(true);
  const [medsNight, setMedsNight] = useState(true);
  
  // Nutrition & Hydration
  const [waterIntake, setWaterIntake] = useState(4);
  const [foodStatus, setFoodStatus] = useState('good');
  
  // Hygiene metrics
  const [showerDone, setShowerDone] = useState(false);
  const [washDone, setWashDone] = useState(true);
  const [teethWashCount, setTeethWashCount] = useState(2);
  const [diaperChangeCount, setDiaperChangeCount] = useState(0);

  // Elimination metrics
  const [urineCount, setUrineCount] = useState(4);
  const [stoolCount, setStoolCount] = useState(1);
  const [stoolType, setStoolType] = useState('normal'); // 'normal', 'constipation', 'diarrhea'

  // Mood states
  const [moodCalm, setMoodCalm] = useState(true);
  const [moodCooperative, setMoodCooperative] = useState(true);
  const [moodAnxious, setMoodAnxious] = useState(false);
  const [moodSad, setMoodSad] = useState(false);
  const [moodConfused, setMoodConfused] = useState(false);
  const [moodAgitated, setMoodAgitated] = useState(false);

  // Sleep
  const [sleepHours, setSleepHours] = useState(7);
  const [nightWakings, setNightWakings] = useState(0);
  
  // Text Notes
  const [notes, setNotes] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Screen History Preset Filter State
  const [viewPreset, setViewPreset] = useState('all'); // 'all', '7d', '15d', '30d'

  const filteredEntries = useMemo(() => {
    if (viewPreset === 'all') return entries;
    const now = new Date();
    let days = 7;
    if (viewPreset === '15d') days = 15;
    else if (viewPreset === '30d') days = 30;
    
    const limitDate = new Date();
    limitDate.setDate(now.getDate() - days);
    const limitDateStr = limitDate.toISOString().split('T')[0];
    
    return entries.filter(item => item.date >= limitDateStr);
  }, [entries, viewPreset]);

  // Modal and PDF Export states
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportPreset, setExportPreset] = useState('all'); // 'all', '7d', '15d', '30d', 'custom'
  const [exportStartDate, setExportStartDate] = useState('');
  const [exportEndDate, setExportEndDate] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('iadapta_caregiver_logs');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error("Error reading log entries", e);
      }
    }
  }, []);

  const saveEntries = (updated) => {
    setEntries(updated);
    localStorage.setItem('iadapta_caregiver_logs', JSON.stringify(updated));
  };

  const handleSaveEntry = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now().toString(),
      date,
      medsMorning,
      medsAfternoon,
      medsNight,
      waterIntake,
      foodStatus,
      showerDone,
      washDone,
      teethWashCount: parseInt(teethWashCount) || 0,
      diaperChangeCount: parseInt(diaperChangeCount) || 0,
      urineCount: parseInt(urineCount) || 0,
      stoolCount: parseInt(stoolCount) || 0,
      stoolType,
      moodCalm,
      moodCooperative,
      moodAnxious,
      moodSad,
      moodConfused,
      moodAgitated,
      sleepHours: parseFloat(sleepHours) || 0,
      nightWakings: parseInt(nightWakings) || 0,
      notes: notes.trim()
    };

    let updated;
    const existingIndex = entries.findIndex(item => item.date === date);
    if (existingIndex > -1) {
      if (!window.confirm("Ya existe un registro para esta fecha. ¿Quieres sobrescribirlo con los datos actuales?")) {
        return;
      }
      updated = [...entries];
      updated[existingIndex] = newEntry;
    } else {
      updated = [newEntry, ...entries];
    }

    updated.sort((a, b) => b.date.localeCompare(a.date));
    
    saveEntries(updated);
    setSaveSuccess(true);
    setNotes('');
    
    // Reset counters to defaults for next entry
    setShowerDone(false);
    setWashDone(true);
    setTeethWashCount(2);
    setDiaperChangeCount(0);
    setUrineCount(4);
    setStoolCount(1);
    setStoolType('normal');
    setNightWakings(0);
    
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  const handleDeleteEntry = (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este registro de cuidados?")) {
      const updated = entries.filter(item => item.id !== id);
      saveEntries(updated);
    }
  };

  const generatePDFReport = (targetsToExport) => {
    const list = targetsToExport || entries;
    if (list.length === 0) {
      alert("No hay registros en el período seleccionado para exportar.");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape');
    
    const drawPageHeader = (pageNum) => {
      // Top navy colored header band
      doc.setFillColor(26, 48, 82);
      doc.rect(20, 12, 257, 16, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("IAdapta", 25, 22);
      
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("DIARIO DE REGISTRO DE CUIDADOS", 272, 22, { align: "right" });
      
      // Clinical Metadata Card
      doc.setFillColor(242, 240, 233); // Brand cream background
      doc.rect(20, 28, 257, 10, 'F');
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(26, 48, 82);
      
      const firstDate = new Date(list[list.length - 1].date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const lastDate = new Date(list[0].date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const metaText = `REPORTE DE SEGUIMIENTO DOMÉSTICO  |  Período: ${firstDate} al ${lastDate}  |  Días Registrados: ${list.length}  |  Pág. ${pageNum}`;
      doc.text(metaText, 25, 34.5);
    };

    const drawTableHeaders = (startY) => {
      // Table Header Row background
      doc.setFillColor(40, 56, 85);
      doc.rect(20, startY, 257, 9, 'F');
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      
      let currentX = 20;
      cols.forEach(col => {
        doc.text(col.name, currentX + 3, startY + 6);
        currentX += col.w;
      });
    };

    const cols = [
      { name: "Fecha", w: 25 },
      { name: "Medicación", w: 32 },
      { name: "Higiene / Aseo", w: 42 },
      { name: "Nutrición", w: 30 },
      { name: "Eliminación", w: 34 },
      { name: "Estado de Ánimo", w: 42 },
      { name: "Sueño", w: 20 },
      { name: "Observaciones", w: 32 }
    ];

    let pageNum = 1;
    drawPageHeader(pageNum);
    
    let tableStartY = 42;
    drawTableHeaders(tableStartY);
    
    let currentY = tableStartY + 9;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(8.5);
    
    list.forEach((item, index) => {
      // Calculate wrapped lines for Observations cell to handle height dynamically
      const noteLines = doc.splitTextToSize(item.notes || "-", cols[7].w - 4);
      
      // Determine height of this row based on content length
      const rowHeight = Math.max(18, noteLines.length * 4.5 + 4);
      
      // Page break check (Landscape height is 210mm, margins at 200mm)
      if (currentY + rowHeight > 192) {
        doc.addPage('landscape');
        pageNum++;
        drawPageHeader(pageNum);
        drawTableHeaders(42);
        currentY = 51;
      }
      
      // Alternate row backgrounds
      if (index % 2 === 0) {
        doc.setFillColor(248, 250, 252);
        doc.rect(20, currentY, 257, rowHeight, 'F');
      }
      
      // Draw bottom row line
      doc.setDrawColor(226, 232, 240);
      doc.line(20, currentY + rowHeight, 277, currentY + rowHeight);
      
      // Col 0: Fecha
      const weekday = new Date(item.date).toLocaleDateString('es-ES', { weekday: 'short' });
      const dateStr = new Date(item.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
      doc.setFont("helvetica", "bold");
      doc.setTextColor(26, 48, 82);
      doc.text(`${weekday.toUpperCase()}`, 23, currentY + 6);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 110, 130);
      doc.text(dateStr, 23, currentY + 11);
      
      // Col 1: Medicación
      doc.setTextColor(50, 50, 50);
      doc.text(`Mañ: ${item.medsMorning ? 'Sí' : 'No'}`, 48, currentY + 5.5);
      doc.text(`Tar:  ${item.medsAfternoon ? 'Sí' : 'No'}`, 48, currentY + 10);
      doc.text(`Noc: ${item.medsNight ? 'Sí' : 'No'}`, 48, currentY + 14.5);
      
      // Col 2: Higiene
      doc.text(`Ducha: ${item.showerDone ? 'Sí' : 'No'}`, 80, currentY + 5.5);
      doc.text(`Lavado: ${item.washDone ? 'Sí' : 'No'}`, 80, currentY + 10);
      doc.text(`Dientes: ${item.teethWashCount}v / Pañal: ${item.diaperChangeCount}v`, 80, currentY + 14.5);
      
      // Col 3: Nutrición
      const foodLabel = item.foodStatus === 'good' ? "Buena" : item.foodStatus === 'regular' ? "Regular" : "Mala";
      if (item.foodStatus === 'good') doc.setTextColor(30, 130, 76);
      else if (item.foodStatus === 'regular') doc.setTextColor(190, 90, 10);
      else doc.setTextColor(219, 10, 10);
      doc.setFont("helvetica", "bold");
      doc.text(foodLabel, 122, currentY + 6);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(50, 50, 50);
      doc.text(`${item.waterIntake} vasos agua`, 122, currentY + 12);
      
      // Col 4: Eliminación
      doc.text(`Micciones: ${item.urineCount}v`, 152, currentY + 6);
      const stoolTypeLabel = item.stoolType === 'normal' ? 'Norm' : item.stoolType === 'constipation' ? 'Estreñ' : 'Diarrea';
      doc.text(`Deposic.: ${item.stoolCount}v`, 152, currentY + 11);
      if (item.stoolCount > 0) {
        doc.setFont("helvetica", "oblique");
        doc.text(`(${stoolTypeLabel})`, 152, currentY + 15.5);
        doc.setFont("helvetica", "normal");
      }
      
      // Col 5: Estado de Ánimo
      const moods = [];
      if (item.moodCalm) moods.push("Tranquilo");
      if (item.moodCooperative) moods.push("Cooperativo");
      if (item.moodAnxious) moods.push("Ansioso");
      if (item.moodSad) moods.push("Decaído");
      if (item.moodConfused) moods.push("Confuso");
      if (item.moodAgitated) moods.push("Agitado");
      
      const moodLines = doc.splitTextToSize(moods.join(", "), cols[5].w - 4);
      doc.text(moodLines, 186, currentY + 5.5);
      
      // Col 6: Sueño
      doc.setFont("helvetica", "bold");
      doc.setTextColor(79, 70, 229);
      doc.text(`${item.sleepHours}h`, 230, currentY + 7);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 110, 130);
      doc.text(`${item.nightWakings} desp.`, 229, currentY + 13);
      
      // Col 7: Observaciones
      doc.setTextColor(50, 50, 50);
      doc.text(noteLines, 249, currentY + 5.5);
      
      // Draw grid vertical column separators for alignment
      doc.setDrawColor(226, 232, 240);
      let gridX = 20;
      doc.line(gridX, currentY, gridX, currentY + rowHeight); // Left border
      
      cols.forEach(col => {
        gridX += col.w;
        doc.line(gridX, currentY, gridX, currentY + rowHeight); // Column separator
      });
      
      currentY += rowHeight;
    });
    
    // Bottom document notice
    doc.setFontSize(7.5);
    doc.setTextColor(150, 150, 150);
    doc.text("Este diario de registro es confidencial y ha sido generado para uso clínico y terapéutico de IAdapta (iadapta.es).", 148, 199, { align: "center" });
    
    doc.save(`Diario_Registro_Cuidados_IAdapta.pdf`);
  };

  return (
    <div className="anim-scale-in">
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* FORMULARIO DE ENTRADA */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-brand-100 shadow-xl p-6 md:p-8 flex flex-col h-fit">
          <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-brand-50">
            <span className="text-3xl">📝</span>
            <div className="text-left">
              <h4 className="font-display text-xl font-bold text-brand-900">Registrar Día</h4>
              <p className="text-xs text-gray-500 font-medium">Añade o edita una ficha de cuidado</p>
            </div>
          </div>

          {saveSuccess && (
            <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 p-4 rounded-xl text-xs font-bold mb-6 text-center animate-fade-in flex items-center justify-center gap-2">
              <span>✅</span>
              <span>¡Registro guardado correctamente!</span>
            </div>
          )}

          <form onSubmit={handleSaveEntry} className="space-y-5 text-left">
            <div>
              <label className="block text-xs font-black text-brand-900 uppercase tracking-wider mb-2">Fecha del Registro</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required
                className="w-full bg-gray-50 border border-gray-250 focus:border-amber-600 focus:bg-white rounded-xl px-4 py-3 text-sm outline-none text-gray-700 font-medium transition-all"
              />
            </div>

            {/* Medicación por horario */}
            <div className="bg-brand-50/20 p-4 rounded-2xl border border-brand-100/50 space-y-3">
              <span className="block text-xs font-black text-brand-900 uppercase tracking-wider">Toma de Medicamentos</span>
              <div className="flex flex-col gap-2.5">
                <label className="flex items-center gap-3 text-xs font-bold text-gray-700 cursor-pointer bg-white px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors select-none">
                  <input
                    type="checkbox"
                    checked={medsMorning}
                    onChange={(e) => setMedsMorning(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-gray-300 text-brand-900 focus:ring-brand-500 cursor-pointer animate-none"
                  />
                  <span className="flex items-center gap-2">☀️ Mañana</span>
                </label>
                <label className="flex items-center gap-3 text-xs font-bold text-gray-700 cursor-pointer bg-white px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors select-none">
                  <input
                    type="checkbox"
                    checked={medsAfternoon}
                    onChange={(e) => setMedsAfternoon(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-gray-300 text-brand-900 focus:ring-brand-500 cursor-pointer animate-none"
                  />
                  <span className="flex items-center gap-2">🌤️ Tarde</span>
                </label>
                <label className="flex items-center gap-3 text-xs font-bold text-gray-700 cursor-pointer bg-white px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors select-none">
                  <input
                    type="checkbox"
                    checked={medsNight}
                    onChange={(e) => setMedsNight(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-gray-300 text-brand-900 focus:ring-brand-500 cursor-pointer animate-none"
                  />
                  <span className="flex items-center gap-2">🌙 Noche</span>
                </label>
              </div>
            </div>

            {/* Higiene Completa y Frecuencia */}
            <div className="bg-sky-50/25 p-4 rounded-2xl border border-sky-100/60 space-y-4">
              <span className="block text-xs font-black text-sky-950 uppercase tracking-wider">Higiene y Aseo diario</span>
              
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showerDone} 
                    onChange={(e) => setShowerDone(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-gray-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                  />
                  <span>🛁 Ducha/Baño completo</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={washDone} 
                    onChange={(e) => setWashDone(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-gray-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                  />
                  <span>🧼 Lavado esponja/parcial</span>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-sky-100/50">
                <div>
                  <label className="block text-[10px] font-black text-sky-900 uppercase tracking-wider mb-1.5">🪥 Lavado Dientes</label>
                  <div className="flex items-center bg-white border border-gray-200 rounded-xl px-2 py-0.5">
                    <button 
                      type="button" 
                      onClick={() => setTeethWashCount(c => Math.max(0, c - 1))}
                      className="w-7 h-7 font-black text-gray-400 hover:text-brand-900 hover:bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-xs text-brand-900">{teethWashCount}</span>
                    <button 
                      type="button" 
                      onClick={() => setTeethWashCount(c => Math.min(5, c + 1))}
                      className="w-7 h-7 font-black text-gray-400 hover:text-brand-900 hover:bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-sky-900 uppercase tracking-wider mb-1.5">🧻 Cambios Pañal</label>
                  <div className="flex items-center bg-white border border-gray-200 rounded-xl px-2 py-0.5">
                    <button 
                      type="button" 
                      onClick={() => setDiaperChangeCount(c => Math.max(0, c - 1))}
                      className="w-7 h-7 font-black text-gray-400 hover:text-brand-900 hover:bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-xs text-brand-900">{diaperChangeCount}</span>
                    <button 
                      type="button" 
                      onClick={() => setDiaperChangeCount(c => Math.min(10, c + 1))}
                      className="w-7 h-7 font-black text-gray-400 hover:text-brand-900 hover:bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Eliminación / Fisiológico */}
            <div className="bg-emerald-50/20 p-4 rounded-2xl border border-emerald-100/50 space-y-4">
              <span className="block text-xs font-black text-emerald-950 uppercase tracking-wider">Eliminación y Deposiciones</span>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-emerald-900 uppercase tracking-wider mb-1.5">💧 Micciones (Orina)</label>
                  <div className="flex items-center bg-white border border-gray-200 rounded-xl px-2 py-0.5">
                    <button 
                      type="button" 
                      onClick={() => setUrineCount(u => Math.max(0, u - 1))}
                      className="w-7 h-7 font-black text-gray-400 hover:text-brand-900 hover:bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-xs text-brand-900">{urineCount}</span>
                    <button 
                      type="button" 
                      onClick={() => setUrineCount(u => Math.min(15, u + 1))}
                      className="w-7 h-7 font-black text-gray-400 hover:text-brand-900 hover:bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-emerald-900 uppercase tracking-wider mb-1.5">💩 Heces (Deposición)</label>
                  <div className="flex items-center bg-white border border-gray-200 rounded-xl px-2 py-0.5">
                    <button 
                      type="button" 
                      onClick={() => setStoolCount(s => Math.max(0, s - 1))}
                      className="w-7 h-7 font-black text-gray-400 hover:text-brand-900 hover:bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-xs text-brand-900">{stoolCount}</span>
                    <button 
                      type="button" 
                      onClick={() => setStoolCount(s => Math.min(8, s + 1))}
                      className="w-7 h-7 font-black text-gray-400 hover:text-brand-900 hover:bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {stoolCount > 0 && (
                <div>
                  <label className="block text-[10px] font-black text-emerald-900 uppercase tracking-wider mb-1.5">Consistencia Heces</label>
                  <select 
                    value={stoolType}
                    onChange={(e) => setStoolType(e.target.value)}
                    className="w-full bg-white border border-gray-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs outline-none text-gray-700 font-medium transition-all"
                  >
                    <option value="normal">🟢 Normales / Blandas</option>
                    <option value="constipation">🟡 Estreñimiento (Duras/secas)</option>
                    <option value="diarrhea">🔴 Diarrea (Líquidas)</option>
                  </select>
                </div>
              )}
            </div>

            {/* Alimentación y Vasos */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-brand-900 uppercase tracking-wider mb-2">Alimentación</label>
                <select 
                  value={foodStatus} 
                  onChange={(e) => setFoodStatus(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-250 focus:border-amber-600 focus:bg-white rounded-xl px-3 py-2.5 text-xs outline-none text-gray-700 font-medium transition-all"
                >
                  <option value="good">🟢 Buena (Todo)</option>
                  <option value="regular">🟡 Regular (Mitad)</option>
                  <option value="bad">🔴 Mala (Poco/Nada)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black text-brand-900 uppercase tracking-wider mb-2">Agua (Vasos 🥛)</label>
                <div className="flex items-center bg-gray-50 border border-gray-250 rounded-xl px-3 py-1 bg-white">
                  <button 
                    type="button" 
                    onClick={() => setWaterIntake(w => Math.max(0, w - 1))}
                    className="w-8 h-8 font-black text-gray-500 hover:text-brand-900 hover:bg-gray-200/50 rounded-lg text-lg flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold text-xs text-brand-900">{waterIntake}</span>
                  <button 
                    type="button" 
                    onClick={() => setWaterIntake(w => Math.min(15, w + 1))}
                    className="w-8 h-8 font-black text-gray-500 hover:text-brand-900 hover:bg-gray-200/50 rounded-lg text-lg flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Estado de Ánimo y Conducta */}
            <div className="bg-brand-50/10 p-4 rounded-2xl border border-brand-100/50">
              <span className="block text-xs font-black text-brand-900 uppercase tracking-wider mb-2.5">Ánimo y Conducta (Múltiple)</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'calm', label: '😊 Tranquilo', state: moodCalm, setter: setMoodCalm },
                  { id: 'cooperative', label: '🤝 Cooperativo', state: moodCooperative, setter: setMoodCooperative },
                  { id: 'anxious', label: '😰 Ansioso', state: moodAnxious, setter: setMoodAnxious },
                  { id: 'sad', label: '😢 Decaído', state: moodSad, setter: setMoodSad },
                  { id: 'confused', label: '😕 Confuso', state: moodConfused, setter: setMoodConfused },
                  { id: 'agitated', label: '😡 Agitado', state: moodAgitated, setter: setMoodAgitated }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => item.setter(s => !s)}
                    className={`py-1.5 px-2.5 rounded-lg text-xs font-bold border transition-all cursor-pointer
                      ${item.state 
                        ? 'bg-brand-900 text-white border-transparent shadow-sm' 
                        : 'bg-white border-gray-150 text-gray-600 hover:bg-gray-50'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Descanso */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-brand-900 uppercase tracking-wider mb-2">Horas de Sueño</label>
                <div className="flex items-center bg-gray-50 border border-gray-250 rounded-xl px-2 py-0.5">
                  <button 
                    type="button" 
                    onClick={() => setSleepHours(s => Math.max(0, s - 0.5))}
                    className="w-7 h-7 font-black text-gray-400 hover:text-brand-900 hover:bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold text-xs text-brand-900">{sleepHours}h</span>
                  <button 
                    type="button" 
                    onClick={() => setSleepHours(s => Math.min(24, s + 0.5))}
                    className="w-7 h-7 font-black text-gray-400 hover:text-brand-900 hover:bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-brand-900 uppercase tracking-wider mb-2">Despertares Noct.</label>
                <div className="flex items-center bg-gray-50 border border-gray-250 rounded-xl px-2 py-0.5">
                  <button 
                    type="button" 
                    onClick={() => setNightWakings(w => Math.max(0, w - 1))}
                    className="w-7 h-7 font-black text-gray-400 hover:text-brand-900 hover:bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold text-xs text-brand-900">{nightWakings}</span>
                  <button 
                    type="button" 
                    onClick={() => setNightWakings(w => Math.min(10, w + 1))}
                    className="w-7 h-7 font-black text-gray-400 hover:text-brand-900 hover:bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-brand-900 uppercase tracking-wider mb-2">Notas / Observaciones</label>
              <textarea 
                rows="3" 
                placeholder="Escribe dolores detectados, citas médicas, comportamiento reseñable..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-gray-50 border border-gray-250 focus:border-amber-600 focus:bg-white rounded-xl px-4 py-3 text-sm outline-none text-gray-700 font-medium transition-all resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-bold transition-all shadow-md hover:scale-[1.02] active:scale-95 text-sm cursor-pointer"
            >
              💾 Guardar Registro Diario
            </button>
          </form>
        </div>

        {/* HISTORIAL Y REPORTES */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-3xl border border-brand-100 shadow-xl p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-brand-50">
              <div className="text-left">
                <h4 className="font-display text-xl font-bold text-brand-900">Historial de Cuidados</h4>
                <p className="text-xs text-gray-550 font-medium">Revisa y descarga la evolución del cuidado diario</p>
              </div>
              <button 
                onClick={() => setShowExportModal(true)}
                disabled={entries.length === 0}
                className="px-5 py-3 bg-brand-900 hover:bg-brand-955 text-white font-bold rounded-xl text-sm transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>📥</span> Descargar Reporte PDF
              </button>
            </div>

            {/* Selector de período visual en pantalla */}
            {entries.length > 0 && (
              <div className="bg-brand-50/45 p-5 rounded-3xl border border-brand-100/70 mb-6 text-left">
                <span className="block text-xs font-black text-brand-900 uppercase tracking-wider mb-3">
                  🔎 Mostrar en el historial:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { id: 'all', label: '📋 Todos los registros' },
                    { id: '7d', label: '📅 Última semana' },
                    { id: '15d', label: '📅 Últimos 15 días' },
                    { id: '30d', label: '📅 Último mes' }
                  ].map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setViewPreset(p.id)}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs border-2 transition-all cursor-pointer shadow-sm
                        ${viewPreset === p.id 
                          ? 'bg-amber-600 border-transparent text-white scale-[1.02] shadow-md' 
                          : 'bg-white border-gray-150 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {entries.length === 0 ? (
              <div className="text-center py-16 px-4 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                <span className="text-4xl mb-3 block">🗓️</span>
                <p className="text-gray-500 font-bold text-sm">No hay registros guardados todavía</p>
                <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto leading-relaxed">Rellena el formulario de la izquierda para empezar a registrar el diario de cuidados de tu familiar.</p>
              </div>
            ) : filteredEntries.length === 0 ? (
              <div className="text-center py-16 px-4 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                <span className="text-4xl mb-3 block">🔍</span>
                <p className="text-gray-500 font-bold text-sm">Ninguna ficha coincide con el período</p>
                <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto leading-relaxed">Modifica el rango de fechas "Desde" y "Hasta" para visualizar las fichas diarias de ese intervalo.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[1250px] overflow-y-auto pr-1 no-scrollbar text-left">
                {filteredEntries.map(item => {
                  const displayDate = new Date(item.date).toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  });
                  return (
                    <div key={item.id} className="bg-white border border-brand-100 rounded-2xl p-5 hover:border-amber-250 hover:shadow-md transition-all relative group">
                      <button 
                        onClick={() => handleDeleteEntry(item.id)}
                        className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                        title="Eliminar registro"
                      >
                        🗑️
                      </button>
                      
                      <div className="mb-4">
                        <span className="bg-amber-50 text-amber-900 font-bold text-[10px] px-2.5 py-1 rounded-lg uppercase tracking-wider mb-1 inline-block">
                          Ficha Diaria
                        </span>
                        <h5 className="font-display text-sm font-bold text-brand-900 capitalize">
                          {displayDate}
                        </h5>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50/50 rounded-xl p-4 border border-gray-100 mb-3.5 text-xs">
                        {/* Medicación */}
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Medicamentos</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.medsMorning && <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded font-black">Mañ</span>}
                            {item.medsAfternoon && <span className="bg-orange-100 text-orange-850 text-[10px] px-1.5 py-0.5 rounded font-black">Tar</span>}
                            {item.medsNight && <span className="bg-indigo-100 text-indigo-900 text-[10px] px-1.5 py-0.5 rounded font-black">Noc</span>}
                            {!item.medsMorning && !item.medsAfternoon && !item.medsNight && <span className="text-gray-400 font-semibold">Ninguna</span>}
                          </div>
                        </div>

                        {/* Alimentación e Hidratación */}
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Nutrición</span>
                          <span className="font-bold text-brand-900 mt-1">
                            {getFoodLabel(item.foodStatus)} / 🥛 {item.waterIntake}v
                          </span>
                        </div>

                        {/* Higiene diaria */}
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Higiene realizada</span>
                          <span className="font-semibold text-gray-700 mt-1 leading-snug">
                            {item.showerDone && '🛁 Ducha completo. '}
                            {item.washDone && '🧼 Aseo parcial. '}
                            {item.teethWashCount > 0 && `🪥 Dientes: ${item.teethWashCount}v. `}
                            {item.diaperChangeCount > 0 && `🧻 Pañal: ${item.diaperChangeCount}v.`}
                            {!item.showerDone && !item.washDone && item.teethWashCount === 0 && item.diaperChangeCount === 0 && 'Ninguno'}
                          </span>
                        </div>

                        {/* Eliminación */}
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Eliminación</span>
                          <span className="font-semibold text-emerald-800 mt-1 leading-snug">
                            💧 Micciones: {item.urineCount}v
                            <br />
                            💩 Deposición: {item.stoolCount}v {item.stoolCount > 0 && `(${item.stoolType === 'normal' ? 'Normal' : item.stoolType === 'constipation' ? 'Estreñido' : 'Diarrea'})`}
                          </span>
                        </div>

                        {/* Sueño y descanso */}
                        <div className="flex flex-col pt-2 border-t border-gray-100 sm:border-0 sm:pt-0">
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Sueño y Descanso</span>
                          <span className="font-bold text-indigo-700 mt-1">
                            😴 {item.sleepHours}h / {item.nightWakings} desp.
                          </span>
                        </div>

                        {/* Ánimo y Conducta */}
                        <div className="flex flex-col pt-2 border-t border-gray-100 sm:border-0 sm:pt-0 col-span-3">
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Estado de Ánimo</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.moodCalm && <span className="bg-brand-50 text-brand-900 text-[10px] px-1.5 py-0.5 rounded font-bold">Tranquilo</span>}
                            {item.moodCooperative && <span className="bg-emerald-50 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded font-bold">Cooperativo</span>}
                            {item.moodAnxious && <span className="bg-amber-50 text-amber-800 text-[10px] px-1.5 py-0.5 rounded font-bold">Ansioso</span>}
                            {item.moodSad && <span className="bg-blue-50 text-blue-800 text-[10px] px-1.5 py-0.5 rounded font-bold">Decaído</span>}
                            {item.moodConfused && <span className="bg-indigo-50 text-indigo-800 text-[10px] px-1.5 py-0.5 rounded font-bold">Confuso</span>}
                            {item.moodAgitated && <span className="bg-red-50 text-red-800 text-[10px] px-1.5 py-0.5 rounded font-bold">Agitado</span>}
                          </div>
                        </div>
                      </div>

                      {item.notes ? (
                        <div className="bg-amber-50/20 p-3 rounded-lg border border-amber-500/10 text-xs text-gray-700 italic">
                          <strong>Observaciones:</strong> {item.notes}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* MODAL DE EXPORTACIÓN A PDF CON PORTAL */}
      {showExportModal && ReactDOM.createPortal(
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(5px)',
            padding: '1rem'
          }}
        >
          <div className="bg-white rounded-[2.5rem] p-6 md:p-8 max-w-xl w-full shadow-2xl border border-brand-100 text-left relative z-[100000] animate-[scaleIn_0.2s_ease-out]">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h3 className="font-display text-2xl font-bold text-brand-900 flex items-center gap-2">
                📥 Descargar Reporte PDF
              </h3>
              <button 
                onClick={() => setShowExportModal(false)}
                className="w-10 h-10 hover:bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-brand-900 transition-colors cursor-pointer text-xl font-bold"
              >
                ✕
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mb-6 font-medium leading-relaxed">
              Selecciona el rango de fechas de los cuidados que deseas incluir en el reporte para tu médico o especialista:
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                { id: 'all', label: '📋 Todo el historial registrado' },
                { id: '7d', label: '📅 Última semana (últimos 7 días)' },
                { id: '15d', label: '📅 Últimos 15 días' },
                { id: '30d', label: '📅 Último mes (últimos 30 días)' },
                { id: 'custom', label: '🗓️ Período personalizado (seleccionar fechas)' }
              ].map(opt => (
                <label 
                  key={opt.id} 
                  className={`flex items-center gap-3.5 p-4 rounded-2xl border-2 transition-all cursor-pointer select-none
                    ${exportPreset === opt.id 
                      ? 'border-amber-600 bg-amber-50/10 font-bold text-brand-900 shadow-sm' 
                      : 'border-gray-150 hover:border-gray-250 bg-white text-gray-600'}`}
                >
                  <input
                    type="radio"
                    name="exportPreset"
                    checked={exportPreset === opt.id}
                    onChange={() => setExportPreset(opt.id)}
                    className="w-5 h-5 border-gray-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                  />
                  <span className="text-sm font-semibold">{opt.label}</span>
                </label>
              ))}
              
              {exportPreset === 'custom' && (
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <div>
                    <label className="block text-[10px] font-black text-brand-900 uppercase tracking-wider mb-2">Fecha Desde</label>
                    <input
                      type="date"
                      value={exportStartDate}
                      onChange={(e) => setExportStartDate(e.target.value)}
                      required
                      className="w-full bg-white border border-gray-250 focus:border-amber-600 rounded-xl px-3 py-2 text-xs outline-none text-gray-700 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-brand-900 uppercase tracking-wider mb-2">Fecha Hasta</label>
                    <input
                      type="date"
                      value={exportEndDate}
                      onChange={(e) => setExportEndDate(e.target.value)}
                      required
                      className="w-full bg-white border border-gray-250 focus:border-amber-600 rounded-xl px-3 py-2 text-xs outline-none text-gray-700 font-medium"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => {
                  let targets = [];
                  if (exportPreset === 'all') {
                    targets = entries;
                  } else if (exportPreset === 'custom') {
                    targets = entries.filter(item => {
                      if (exportStartDate && item.date < exportStartDate) return false;
                      if (exportEndDate && item.date > exportEndDate) return false;
                      return true;
                    });
                  } else {
                    const now = new Date();
                    let days = 7;
                    if (exportPreset === '15d') days = 15;
                    else if (exportPreset === '30d') days = 30;
                    
                    const limitDate = new Date();
                    limitDate.setDate(now.getDate() - days);
                    const limitStr = limitDate.toISOString().split('T')[0];
                    targets = entries.filter(item => item.date >= limitStr);
                  }
                  
                  if (targets.length === 0) {
                    alert("No se encontraron registros de cuidado en el intervalo seleccionado.");
                    return;
                  }
                  
                  generatePDFReport(targets);
                  setShowExportModal(false);
                }}
                className="flex-1 py-4 bg-brand-900 hover:bg-brand-955 text-white rounded-2xl font-bold transition-all shadow-md active:scale-95 text-center text-sm cursor-pointer"
              >
                📥 Descargar Reporte PDF
              </button>
              <button
                onClick={() => setShowExportModal(false)}
                className="py-4 px-6 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-2xl font-bold transition-all text-sm cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

// --- CONTENEDOR PRINCIPAL DE RECURSOS ---
const SectionCaregiverResources = function SectionCaregiverResources() {
  const [currentView, setCurrentView] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const tool = params.get('tool') || params.get('section');
    if (['wizard', 'printables', 'products', 'zarit', 'log', 'chat'].includes(tool)) {
      return tool;
    }
    return 'menu';
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (currentView === 'menu') {
      params.delete('tool');
      params.delete('section');
    } else {
      params.set('tool', currentView);
    }
    const newSearch = params.toString();
    const newUrl = window.location.pathname + (newSearch ? `?${newSearch}` : '');
    window.history.replaceState({ path: newUrl }, '', newUrl);
  }, [currentView]);

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Estados del Test de Zarit
  const [zaritAnswers, setZaritAnswers] = useState(Array(22).fill(null));
  const [zaritPage, setZaritPage] = useState(0); 
  const [showZaritError, setShowZaritError] = useState(false);
  const QUESTIONS_PER_PAGE = 6;

  // Sincronizar catálogo
  const catalogList = useMemo(() => {
    return Object.keys(PRODUCT_CATALOG).map(id => {
      const baseProduct = PRODUCT_CATALOG[id];
      const metadata = CAREGIVER_DESCRIPTIONS[id] || { category: 'estimulacion', desc: 'Producto de apoyo seleccionado.' };
      return {
        id,
        name: baseProduct.name,
        img: baseProduct.img,
        url: baseProduct.url,
        query: baseProduct.query,
        category: metadata.category,
        desc: metadata.desc
      };
    });
  }, []);

  // Filtrado reactivo de productos
  const filteredProducts = useMemo(() => {
    return catalogList.filter(prod => {
      const matchesCategory = activeCategory === 'all' || prod.category === activeCategory;
      const cleanSearch = searchQuery.toLowerCase().trim();
      const matchesText = !cleanSearch ||
        prod.name.toLowerCase().includes(cleanSearch) ||
        prod.desc.toLowerCase().includes(cleanSearch);
      return matchesCategory && matchesText;
    });
  }, [catalogList, activeCategory, searchQuery]);

  const getCategoryBadge = (catId) => {
    const found = CATEGORIES.find(c => c.id === catId);
    return found ? `${found.icon} ${found.title}` : '';
  };

  // Lógica del Test de Zarit
  const handleZaritAnswer = (questionIndex, val) => {
    setShowZaritError(false);
    setZaritAnswers(prev => {
      const updated = [...prev];
      updated[questionIndex] = val;
      return updated;
    });
  };

  const zaritTotalScore = useMemo(() => {
    return zaritAnswers.reduce((sum, current) => sum + (current !== null ? current : 0), 0);
  }, [zaritAnswers]);

  const isZaritComplete = useMemo(() => {
    return zaritAnswers.every(ans => ans !== null);
  }, [zaritAnswers]);

  const zaritDiagnosis = useMemo(() => {
    const score = zaritTotalScore;
    if (score <= 21) {
      return {
        level: 'Sin sobrecarga',
        color: 'text-green-600 bg-green-50 border-green-200',
        barColor: 'bg-green-500',
        advice: '¡Enhorabuena! Te encuentras dentro de los parámetros de bajo desgaste emocional. Cuidar de tu familiar está requiriendo esfuerzo, pero de momento estás logrando mantener tu espacio personal y salud en equilibrio. Sigue priorizando tu descanso y actividades propias para no quemarte.'
      };
    } else if (score <= 46) {
      return {
        level: 'Sobrecarga leve',
        color: 'text-amber-700 bg-amber-50 border-amber-200',
        barColor: 'bg-amber-500',
        advice: 'Atención. Empiezan a aparecer los primeros signos de fatiga física o estrés mental. Aunque de momento puedes con la situación, es fundamental que comiences a delegar pequeñas tareas cotidianas, reserves al menos 1 hora diaria para ti mismo/a y mantengas tu propia vida social activa.'
      };
    } else if (score <= 55) {
      return {
        level: 'Sobrecarga moderada',
        color: 'text-orange-700 bg-orange-50 border-orange-200',
        barColor: 'bg-orange-500',
        advice: 'Alerta. Te encuentras en un nivel preocupante de desgaste. Es habitual que sientas fatiga acumulada, impaciencia o falta de intimidad. Te recomendamos firmemente pedir ayuda a familiares, valorar la incorporación de asistentes profesionales y reestructurar las rutinas diarias para aliviar tu carga.'
      };
    } else {
      return {
        level: 'Sobrecarga intensa',
        color: 'text-red-700 bg-red-50 border-red-200',
        barColor: 'bg-red-500',
        advice: 'Alerta Crítica. Te encuentras en una situación de desgaste extremo y agotamiento (síndrome del cuidador quemado). Tu salud física y emocional está sufriendo por el exceso de responsabilidades. Es urgente y prioritario que solicites ayuda profesional, delegues gran parte de las tareas del cuidado y busques soporte social inmediato.'
      };
    }
  }, [zaritTotalScore]);

  const resetZarit = () => {
    setZaritAnswers(Array(22).fill(null));
    setZaritPage(0);
    setShowZaritError(false);
  };

  // --- ORIENTADOR DE CASO REAL (ASISTENTE GUIADO DE SELECCIÓN DE PRODUCTOS) ---
const CaregiverWizardComponent = function CaregiverWizardComponent({ onGoToCatalog }) {
  const [step, setStep] = useState(1);
  const [situation, setSituation] = useState(null);
  const [zone, setZone] = useState(null);
  const [dependence, setDependence] = useState(null);

  const SITUATIONS = [
    { id: 'hip_stroke', title: 'Operación / Fractura / Ictus', desc: 'Prótesis de cadera o rodilla, convalecencia o secuelas de ictus.', icon: '🦴', color: 'border-blue-200 bg-blue-50/40 hover:border-blue-400' },
    { id: 'mobility_falls', title: 'Dificultad de Movilidad / Caídas', desc: 'Inestabilidad al caminar, falta de fuerza o tropezones frecuentes.', icon: '🦽', color: 'border-emerald-200 bg-emerald-50/40 hover:border-emerald-400' },
    { id: 'dementia_cognitive', title: 'Deterioro Cognitivo / Demencia', desc: 'Desorientación espacial o temporal, olvidos y cambios de conducta.', icon: '🧠', color: 'border-purple-200 bg-purple-50/40 hover:border-purple-400' },
    { id: 'hands_arthrosis', title: 'Artrosis / Temblor en Manos', desc: 'Falta de fuerza o temblor para comer, abrochar ropa o sujetar botes.', icon: '🖐️', color: 'border-amber-200 bg-amber-50/40 hover:border-amber-400' },
    { id: 'bedridden_ulcers', title: 'Encamado / Muchas Horas en Cama', desc: 'Pasa la mayor parte del día encamado. Riesgo de llagas o escaras.', icon: '🛏️', color: 'border-rose-200 bg-rose-50/40 hover:border-rose-400' }
  ];

  const ZONES = [
    { id: 'bano', title: 'Cuarto de Baño y Aseo', desc: 'Ducha, bañera, uso del inodoro e higiene personal.', icon: '🛁', color: 'border-cyan-200 bg-cyan-50/40 hover:border-cyan-400' },
    { id: 'dormitorio', title: 'Dormitorio y Descanso', desc: 'Acostarse, incorporarse de la cama y movimientos nocturnos.', icon: '🛏️', color: 'border-indigo-200 bg-indigo-50/40 hover:border-indigo-400' },
    { id: 'cocina', title: 'Comida y Cocina', desc: 'Manipulación de alimentos, cubiertos, platos y autonomía al comer.', icon: '🍽️', color: 'border-amber-200 bg-amber-50/40 hover:border-amber-400' },
    { id: 'movilidad', title: 'Pasillos y Desplazamientos', desc: 'Paseo en casa, superación de desniveles y seguridad en trayectos.', icon: '🚶', color: 'border-teal-200 bg-teal-50/40 hover:border-teal-400' }
  ];

  const DEPENDENCE_LEVELS = [
    { id: 'independent', title: 'Autónomo con dificultad', desc: 'Se mueve o asea solo/a pero con inestabilidad, lentitud o riesgo.', icon: '🟢', color: 'border-green-200 bg-green-50/40 hover:border-green-400' },
    { id: 'partial', title: 'Necesita ayuda puntual', desc: 'Requiere la supervisión o apoyo de 1 persona para ciertas tareas.', icon: '🟡', color: 'border-amber-200 bg-amber-50/40 hover:border-amber-400' },
    { id: 'high', title: 'Dependencia elevada', desc: 'Requiere asistencia total o el uso de ayudas mayores / grúa.', icon: '🔴', color: 'border-red-200 bg-red-50/40 hover:border-red-400' }
  ];

  const getRecommendations = () => {
    let productIds = [1, 2, 3];
    let tips = [];
    let title = 'Kit de Recomendación Técnica Personalizado';

    if (situation === 'hip_stroke') {
      if (zone === 'bano') {
        productIds = [37, 2, 39];
        tips = [
          'Evita doblar la cadera más de 90° durante las primeras 6 a 8 semanas tras una prótesis. El elevador de inodoro con reposabrazos es indispensable.',
          'Sustituye la entrada a la bañera por una silla de ducha a ras de suelo sin elevar la pierna operada.'
        ];
        title = 'Kit de Adaptación para Post-Operatorio de Cadera en Baño';
      } else if (zone === 'dormitorio') {
        productIds = [6, 33, 34];
        tips = [
          'Para acostarse o levantarse, mantén siempre las piernas ligeramente separadas sin cruzar los tobillos.',
          'Usa el calzador de mango largo y el ponecalcetines para evitar flexionar la columna lumbar o la cadera.'
        ];
        title = 'Kit de Seguridad en Dormitorio para Convalecencia';
      } else if (zone === 'cocina') {
        productIds = [9, 12, 13];
        tips = [
          'Si existe debilidad en una mano (hemiparesia), utiliza platos con ventosa y reborde para apoyarse con la cuchara.',
          'Mantén los utensilios de uso diario a la altura del pecho para no realizar agachamientos bruscos.'
        ];
        title = 'Kit de Autonomía en Alimentación Post-Ictus';
      } else {
        productIds = [14, 18, 38];
        tips = [
          'Usa un andador ligero de interior regulado exactamente a la altura de la muñeca cuando los brazos están relajados.',
          'El cuidador debe utilizar un cinturón de sujeción firme durante las transferencias sin tirar de los brazos del familiar.'
        ];
        title = 'Kit de Movilidad e Incorporación Segura';
      }
    } else if (situation === 'mobility_falls') {
      if (zone === 'bano') {
        productIds = [4, 2, 3];
        tips = [
          'Instala barras de apoyo fijadas firmemente sobre muros resistentes en la ducha y junto al inodoro.',
          'Ducharse sentado en un asiento antideslizante elimina la fatiga y el 90% de los riesgos de resbalón.'
        ];
        title = 'Kit de Prevención de Caídas en el Baño';
      } else if (zone === 'dormitorio') {
        productIds = [6, 43, 8];
        tips = [
          'Las luces nocturnas con sensor de movimiento guían el camino al baño sin necesidad de buscar a oscuras el interruptor.',
          'Eleva ligeramente la cama con tacos rígidos si cuesta trabajo ponerse de pie desde la posición sentada.'
        ];
        title = 'Kit de Prevención de Caídas Nocturnas';
      } else if (zone === 'cocina') {
        productIds = [9, 12, 41];
        tips = [
          'Los abrebotellas y abridores ergonómicos evitan sobrecargas articulares al preparar los alimentos.',
          'Utiliza un carrito de servicio con ruedas para transportar platos y recipientes calientes sin cargarlos en vuelo.'
        ];
        title = 'Kit de Seguridad y Ergonomía en Cocina';
      } else {
        productIds = [14, 18, 44];
        tips = [
          'Fija firmemente los bordes de todas las alfombras del hogar con cinta de doble cara antideslizante.',
          'Retira todos los cables de paso y muebles bajos del recorrido habitual entre el dormitorio y el baño.'
        ];
        title = 'Kit de Movilidad y Pasillos Seguros';
      }
    } else if (situation === 'dementia_cognitive') {
      if (zone === 'bano') {
        productIds = [39, 3, 2];
        tips = [
          'Mantén el espacio visualmente contrastado: toallas y tapa de inodoro en colores oscuros sobre azulejos claros para facilitar su reconocimiento.',
          'Regula el calentador a un máximo de 45°C para prevenir quemaduras por despiste al abrir la grifería.'
        ];
        title = 'Kit de Aseo Adaptado para Deterioro Cognitivo';
      } else if (zone === 'dormitorio') {
        productIds = [6, 43, 21];
        tips = [
          'Un reloj digital de orientación que indique de forma clara si es "MAÑANA" o "NOCHE" ayuda a mantener los ritmos circadianos.',
          'Usa luces nocturnas tenues automáticas para evitar que se desoriente si se levanta a medianoche.'
        ];
        title = 'Kit de Dormitorio y Orientación Temporal';
      } else if (zone === 'cocina') {
        productIds = [22, 12, 13];
        tips = [
          'Instala detectores automáticos de humo y gas en la cocina ante posibles descuidos con los fogones.',
          'Utiliza vajillas de material irrompible y alto contraste cromo-visual para estimular el apetito y facilitar la visión del plato.'
        ];
        title = 'Kit de Seguridad en Cocina para Demencias';
      } else {
        productIds = [23, 26, 44];
        tips = [
          'Los dispositivos de geolocalización o teléfonos adaptados con botón SOS aportan tranquilidad si hay tendencia a desorientarse fuera de casa.',
          'Mantén la casa despejada de obstáculos que puedan provocar caídas durante paseos o deambulación inquieta.'
        ];
        title = 'Kit de Seguridad y Rastreo Preventivo';
      }
    } else if (situation === 'hands_arthrosis') {
      if (zone === 'bano') {
        productIds = [40, 4, 3];
        tips = [
          'La esponja de mango largo curvado permite lavarse la espalda y los pies sin realizar esfuerzos en hombros ni columna.',
          'Instala grifos monomando o palancas largas en lugar de mandos de rosca difíciles de girar.'
        ];
        title = 'Kit de Aseo para Manos con Artrosis / Falta de Fuerza';
      } else if (zone === 'dormitorio') {
        productIds = [35, 34, 33];
        tips = [
          'El abrochabotones y el ponecalcetines devuelven la autonomía en el vestido sin necesidad de realizar el pellizco fino.',
          'Sustituye la ropa con botones por prendas con velcro o cremalleras con tirador grande.'
        ];
        title = 'Kit de Vestido Autónomo para Artrosis';
      } else if (zone === 'cocina') {
        productIds = [9, 41, 10];
        tips = [
          'Los cubiertos con mangos engrosados antideslizantes reducen la fuerza requerida en la pinza de los dedos.',
          'Usa abridores de tarros de palanca para evitar la torsión dolorosa en muñecas y pulgares.'
        ];
        title = 'Kit de Alimentación Adaptada para Manos y Muñecas';
      } else {
        productIds = [42, 17, 38];
        tips = [
          'El adaptador giratorio de llaves amplía la palanca y permite abrir la puerta de casa con un mínimo esfuerzo.',
          'Usa muletas ergonómicas con empuñadura blanda que distribuyan la presión en el antebrazo.'
        ];
        title = 'Kit de Autonomía Doméstica y Agarre';
      }
    } else {
      if (zone === 'bano') {
        productIds = [40, 2, 1];
        tips = [
          'Para pacientes encamados, la higiene debe planificarse con esponjas desechables jabonosas o mantas impermeables.',
          'Si es posible el traslado al baño, utiliza una silla de ducha con ruedas y cubeta extraíble.'
        ];
        title = 'Kit de Higiene para Paciente Encamado';
      } else if (zone === 'dormitorio') {
        productIds = [28, 27, 29];
        tips = [
          'El colchón de aire alternante y los cojines viscoelásticos son esenciales para aliviar los puntos de presión sobre crestas ilíacas y sacro.',
          'Realiza cambios posturales cada 2 a 3 horas alternando entre boca arriba y decúbitos laterales.'
        ];
        title = 'Kit de Prevención de Escaras y Cuidado Encamado';
      } else if (zone === 'cocina') {
        productIds = [13, 12, 9];
        tips = [
          'Si existe disfagia o dificultad al tragar, eleva el cabecero de la cama a 90° durante las comidas y usa vasos con escotadura nasal.',
          'Mantén la posición erguida durante al menos 30 minutos tras finalizar la ingesta para evitar reflujo y atragantamientos.'
        ];
        title = 'Kit de Alimentación Segura en Cama';
      } else {
        productIds = [20, 19, 18];
        tips = [
          'La sábana de reposicionamiento súper-deslizante permite mover al familiar dentro de la cama con un esfuerzo mínimo de espalda para el cuidador.',
          'Utiliza el cinturón de sujeción para realizar transferencias seguras a la silla de ruedas o sillón descanso.'
        ];
        title = 'Kit de Movilización y Transferencias de Pacientes Encamados';
      }
    }

    return { productIds, tips, title };
  };

  const selectedSit = SITUATIONS.find(s => s.id === situation);
  const selectedZon = ZONES.find(z => z.id === zone);
  const selectedDep = DEPENDENCE_LEVELS.find(d => d.id === dependence);

  const resetWizard = () => {
    setStep(1);
    setSituation(null);
    setZone(null);
    setDependence(null);
  };

  const recommendations = step === 4 ? getRecommendations() : null;

  return (
    <div className="bg-white rounded-3xl border border-brand-100 shadow-xl p-6 md:p-10 max-w-4xl mx-auto anim-scale-in text-left">
      
      {/* Header Wizard Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-50 pb-6 mb-8">
        <div>
          <span className="bg-emerald-50 text-emerald-700 font-bold text-xs px-3 py-1.5 rounded-xl uppercase tracking-wider mb-2 inline-block">
            🧙‍♂️ Asistente Guiado Inteligente
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-900">
            Orientador de Caso Real: ¿Qué necesito?
          </h2>
        </div>
        
        {step < 4 && (
          <div className="flex items-center gap-2">
            {[1, 2, 3].map(s => (
              <div 
                key={s} 
                className={`w-9 h-9 rounded-xl font-bold text-sm flex items-center justify-center transition-all ${
                  step === s 
                    ? 'bg-emerald-600 text-white shadow-md scale-105' 
                    : step > s 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-gray-100 text-gray-400'
                }`}
              >
                {step > s ? '✓' : s}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* STEP 1: SITUACIÓN CLÍNICA */}
      {step === 1 && (
        <div className="space-y-6 anim-fade-in">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-brand-900 mb-1">Paso 1 de 3: ¿Cuál es la situación o condición principal de tu familiar?</h3>
            <p className="text-sm text-gray-500 font-medium">Selecciona la opción que mejor describa su estado de salud o recuperación actual.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SITUATIONS.map(item => (
              <div
                key={item.id}
                onClick={() => setSituation(item.id)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                  situation === item.id 
                    ? `${item.color} border-2 shadow-md scale-[1.01]` 
                    : 'border-gray-150 bg-white hover:border-gray-300 hover:bg-gray-50/50'
                }`}
              >
                <span className="text-3xl shrink-0 p-2 bg-white rounded-xl shadow-xs">{item.icon}</span>
                <div>
                  <h4 className="font-bold text-brand-900 text-base mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-550 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-brand-50 mt-8">
            <button
              onClick={() => situation && setStep(2)}
              disabled={!situation}
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
            >
              <span>Siguiente Paso</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: ESTANCIA O ZONA DEL HOGAR */}
      {step === 2 && (
        <div className="space-y-6 anim-fade-in">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-brand-900 mb-1">Paso 2 de 3: ¿En qué zona o momento de la casa encontráis mayor dificultad?</h3>
            <p className="text-sm text-gray-500 font-medium">Elige la estancia prioritaria donde quieres mejorar la seguridad y autonomía.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ZONES.map(item => (
              <div
                key={item.id}
                onClick={() => setZone(item.id)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                  zone === item.id 
                    ? `${item.color} border-2 shadow-md scale-[1.01]` 
                    : 'border-gray-150 bg-white hover:border-gray-300 hover:bg-gray-50/50'
                }`}
              >
                <span className="text-3xl shrink-0 p-2 bg-white rounded-xl shadow-xs">{item.icon}</span>
                <div>
                  <h4 className="font-bold text-brand-900 text-base mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-550 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-brand-50 mt-8">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-all cursor-pointer text-sm"
            >
              &larr; Volver
            </button>
            <button
              onClick={() => zone && setStep(3)}
              disabled={!zone}
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
            >
              <span>Siguiente Paso</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: NIVEL DE DEPENDENCIA */}
      {step === 3 && (
        <div className="space-y-6 anim-fade-in">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-brand-900 mb-1">Paso 3 de 3: ¿Qué nivel de asistencia física requiere tu familiar?</h3>
            <p className="text-sm text-gray-500 font-medium">Esto nos ayuda a ajustar las recomendaciones exactas de esfuerzo para el cuidador.</p>
          </div>

          <div className="space-y-4">
            {DEPENDENCE_LEVELS.map(item => (
              <div
                key={item.id}
                onClick={() => setDependence(item.id)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                  dependence === item.id 
                    ? `${item.color} border-2 shadow-md scale-[1.01]` 
                    : 'border-gray-150 bg-white hover:border-gray-300 hover:bg-gray-50/50'
                }`}
              >
                <span className="text-3xl shrink-0 p-2 bg-white rounded-xl shadow-xs">{item.icon}</span>
                <div>
                  <h4 className="font-bold text-brand-900 text-base mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-550 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-brand-50 mt-8">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-all cursor-pointer text-sm"
            >
              &larr; Volver
            </button>
            <button
              onClick={() => dependence && setStep(4)}
              disabled={!dependence}
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
            >
              <span>Generar Informe de Recomendaciones</span>
              <span>✨</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: RESULTADO FICHA DE RECOMENDACIÓN */}
      {step === 4 && recommendations && (
        <div className="space-y-8 anim-scale-in">
          {/* Summary Banner */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border border-emerald-200/80 rounded-3xl p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-emerald-600 text-white font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                Kit Clínico Generado
              </span>
              <span className="bg-white border border-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                {selectedSit?.icon} {selectedSit?.title}
              </span>
              <span className="bg-white border border-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                {selectedZon?.icon} {selectedZon?.title}
              </span>
            </div>
            
            <h3 className="font-display text-2xl md:text-3xl font-bold text-brand-900 mb-3">
              {recommendations.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed font-medium">
              Basándonos en la situación clínica seleccionada, esta es la combinación de productos de apoyo y pautas ergonómicas de Terapia Ocupacional prioritaria para tu hogar.
            </p>
          </div>

          {/* Recommended Products */}
          <div>
            <h4 className="font-display text-xl font-bold text-brand-900 mb-4 flex items-center gap-2">
              <span>🛒</span> Productos de Apoyo Imprescindibles Recomendados
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.productIds.map(prodId => {
                const prod = PRODUCT_CATALOG[prodId];
                if (!prod) return null;
                const caregiverMeta = CAREGIVER_DESCRIPTIONS[prodId.toString()];

                return (
                  <div key={prodId} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                      <div className="h-32 bg-gray-50 rounded-xl overflow-hidden mb-4 p-2 flex items-center justify-center">
                        <img src={prod.img} alt={prod.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <h5 className="font-bold text-brand-900 text-sm mb-2 leading-tight">{prod.name}</h5>
                      <p className="text-xs text-gray-550 leading-relaxed mb-4">
                        {caregiverMeta ? caregiverMeta.desc : prod.desc}
                      </p>
                    </div>

                    <a
                      href={getAmazonLink(prod.query, prod.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-accent-coral hover:bg-accent-coral/90 text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-xs"
                    >
                      <span>Ver en Amazon</span>
                      <Icons.ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Clinical OT Safety Tips */}
          <div className="bg-amber-50/70 border border-amber-250/70 rounded-3xl p-6">
            <h4 className="font-display text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
              <Icons.Warning className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Pautas Clave de Seguridad y Ergonomía (Terapia Ocupacional)</span>
            </h4>
            <ul className="space-y-3">
              {recommendations.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-amber-950 font-medium leading-relaxed bg-white/80 p-3.5 rounded-2xl border border-amber-100">
                  <span className="font-black text-amber-600 shrink-0 text-base">{idx + 1}.</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions & Print */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-150">
            <button
              onClick={resetWizard}
              className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-all cursor-pointer text-sm"
            >
              🔄 Volver a Empezar
            </button>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={() => window.print()}
                className="flex-1 sm:flex-none px-6 py-3 bg-brand-900 hover:bg-brand-800 text-white font-bold rounded-2xl transition-all shadow-md cursor-pointer text-sm flex items-center justify-center gap-2"
              >
                <span>🖨️ Imprimir / Guardar PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- GENERADOR DE FICHAS E IMPRIMIBLES PARA EL HOGAR ---
const CaregiverPrintablesComponent = function CaregiverPrintablesComponent() {
  const [activeTab, setActiveTab] = useState('emergency');

  // Form States
  const [patientName, setPatientName] = useState('Ejemplo: María José');
  const [routinePatientName, setRoutinePatientName] = useState('Ejemplo: María José');
  const [medicationPatientName, setMedicationPatientName] = useState('Ejemplo: María José');
  const [vitalsPatientName, setVitalsPatientName] = useState('Ejemplo: María José');
  const [posturalPatientName, setPosturalPatientName] = useState('Ejemplo: María José');

  const [bloodType, setBloodType] = useState('A+');
  const [allergies, setAllergies] = useState('Penicilina, Fructosa');
  const [primaryDoctor, setPrimaryDoctor] = useState('Dr. Martínez (Centro de Salud Salut - Tel: 93 123 45 67)');
  const [emergencyContacts, setEmergencyContacts] = useState('Hijo Carlos: 612 345 678 | Hija Ana: 687 654 321');
  const [medication, setMedication] = useState('Sintrom 2mg (09:00h), Enalapril 10mg (21:00h), Nolotil si dolor puntual');
  const [fallInstructions, setFallInstructions] = useState('Comprobar estado de consciencia. Si manifiesta dolor agudo en cadera o cabeza, NO mover bruscamente. Mantener abrigado/a y llamar al 112 inmediatamente.');

  // Medication Table Items
  const [medicationItems, setMedicationItems] = useState([
    { id: 1, name: 'Sintrom 2mg', dose: '1/2 comprimido', schedule: '15:00h (Ayunas de 2h)', purpose: 'Anticoagulante sanguíneo' },
    { id: 2, name: 'Enalapril 10mg', dose: '1 comprimido', schedule: '09:00h (Con desayuno)', purpose: 'Tensión arterial' },
    { id: 3, name: 'Omeprazol 20mg', dose: '1 cápsula', schedule: '08:30h (Antes de desayunar)', purpose: 'Protector estomacal' },
    { id: 4, name: 'Paracetamol 1g', dose: '1 sobre', schedule: '21:00h (Si dolor puntual)', purpose: 'Analgésico para el dolor' }
  ]);

  // Custom Sign Creator State
  const [customSignTitle, setCustomSignTitle] = useState('HABITACIÓN DE MAMÁ');
  const [customSignDesc, setCustomSignDesc] = useState('Dormitorio Principal');
  const [customSignIcon, setCustomSignIcon] = useState('🛏️');
  const [signTheme, setSignTheme] = useState('standard'); // 'standard' | 'high-contrast' | 'soft'

  // Signs State
  const SIGNS = [
    { id: 'bano', title: 'BAÑO', icon: '🛁', desc: 'Aseo e Higiene', border: 'border-blue-600 bg-blue-50 text-blue-900' },
    { id: 'dormitorio', title: 'DORMITORIO', icon: '🛏️', desc: 'Cama y Descanso', border: 'border-purple-600 bg-purple-50 text-purple-900' },
    { id: 'cocina', title: 'COCINA', icon: '🍽️', desc: 'Comida y Agua', border: 'border-amber-600 bg-amber-50 text-amber-900' },
    { id: 'medicacion', title: 'MEDICACIÓN', icon: '💊', desc: 'Toma de Pastillas', border: 'border-red-600 bg-red-50 text-red-900' },
    { id: 'agua', title: 'BEBER AGUA', icon: '🚰', desc: 'Hidratación Diaria', border: 'border-cyan-600 bg-cyan-50 text-cyan-900' },
    { id: 'salida', title: 'SALIDA', icon: '🚪', desc: 'Puerta Principal', border: 'border-emerald-600 bg-emerald-50 text-emerald-900' },
    { id: 'fogones', title: 'APAGAR FOGONES', icon: '⚠️', desc: 'Precaución Cocina', border: 'border-rose-600 bg-rose-50 text-rose-900' },
    { id: 'salon', title: 'SALÓN', icon: '📺', desc: 'Sofá y Televisión', border: 'border-indigo-600 bg-indigo-50 text-indigo-900' }
  ];

  const printSingleSign = (sign, mode = signTheme) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    let bodyBg = '#fff';
    let cardBg = '#fafafa';
    let borderColor = '#1A3052';
    let titleColor = '#1A3052';
    let subColor = '#E87D55';
    let subBg = '#fff';
    let subBorder = '#E87D55';
    let footerColor = '#64748b';
    let logoFilter = 'none';

    if (mode === 'high-contrast') {
      bodyBg = '#000000';
      cardBg = '#000000';
      borderColor = '#FACC15'; // Neon yellow
      titleColor = '#FACC15';
      subColor = '#FFFFFF';
      subBg = '#1e293b';
      subBorder = '#FACC15';
      footerColor = '#FACC15';
      logoFilter = 'brightness(0) invert(1)';
    } else if (mode === 'soft') {
      bodyBg = '#FFFBEB';
      cardBg = '#FEF3C7';
      borderColor = '#D97706';
      titleColor = '#78350F';
      subColor = '#92400E';
      subBg = '#FFFBEB';
      subBorder = '#D97706';
      footerColor = '#B45309';
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Cartel - ${sign.title} | IAdapta</title>
        <style>
          @page { size: A4 portrait; margin: 0; }
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            padding: 30px;
            box-sizing: border-box;
            background: ${bodyBg};
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .card-border {
            border: 10px solid ${borderColor};
            border-radius: 36px;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            text-align: center;
            padding: 50px 30px;
            box-sizing: border-box;
            background: ${cardBg};
          }
          .logo { height: 50px; object-fit: contain; margin-top: 10px; filter: ${logoFilter}; }
          .content { display: flex; flex-direction: column; align-items: center; }
          .icon { font-size: 160px; margin-bottom: 20px; line-height: 1; }
          .title { font-size: 68px; font-weight: 900; color: ${titleColor}; letter-spacing: 4px; text-transform: uppercase; margin: 0 0 16px 0; word-break: break-word; }
          .sub { font-size: 26px; font-weight: 800; color: ${subColor}; text-transform: uppercase; letter-spacing: 2px; background: ${subBg}; padding: 10px 24px; border-radius: 20px; border: 2px solid ${subBorder}; word-break: break-word; }
          .footer { font-size: 14px; font-weight: 800; color: ${footerColor}; text-transform: uppercase; letter-spacing: 1px; }
        </style>
      </head>
      <body>
        <div class="card-border">
          <img src="assets/iadapta_logo.png" alt="IAdapta" class="logo" />
          <div class="content">
            <div class="icon">${sign.icon}</div>
            <div class="title">${sign.title}</div>
            <div class="sub">${sign.desc}</div>
          </div>
          <div class="footer">iadapta.es • Señalética Doméstica de Accesibilidad</div>
        </div>
        <script>
          window.onload = function() { window.print(); window.close(); }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  const printEmergencyCard = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Ficha de Emergencia - ${patientName} | IAdapta</title>
        <style>
          @page { size: A4 portrait; margin: 12mm; }
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, Arial, sans-serif;
            color: #1e293b;
            margin: 0;
            padding: 0;
            background: #fff;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .page-container {
            border: 3px solid #1A3052;
            border-radius: 20px;
            padding: 24px;
            box-sizing: border-box;
            min-height: calc(100vh - 24mm);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 3px solid #1A3052;
            padding-bottom: 16px;
            margin-bottom: 20px;
          }
          .brand-logo { height: 48px; object-fit: contain; }
          .header-text { text-align: right; }
          .header-title { font-size: 20px; font-weight: 900; color: #DC2626; text-transform: uppercase; margin: 0; letter-spacing: 0.5px; }
          .header-sub { font-size: 11px; font-weight: 700; color: #1A3052; text-transform: uppercase; margin-top: 2px; }
          
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; }
          .box { border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 12px 16px; background: #f8fafc; }
          .box.alert { border-color: #fca5a5; background: #fef2f2; }
          .box.full { grid-column: span 2; }
          .label { font-size: 10px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 4px; display: flex; align-items: center; gap: 6px; }
          .val { font-size: 15px; font-weight: 700; color: #0f172a; word-break: break-word; line-height: 1.4; }
          .val.red { color: #dc2626; }
          
          .footer {
            border-top: 2px solid #e2e8f0;
            padding-top: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 11px;
            color: #64748b;
            font-weight: 700;
          }
          .footer-emergency { background: #dc2626; color: #fff; padding: 4px 12px; border-radius: 8px; font-weight: 900; }
        </style>
      </head>
      <body>
        <div class="page-container">
          <div>
            <div class="header">
              <img src="assets/iadapta_logo.png" alt="IAdapta" class="brand-logo" />
              <div class="header-text">
                <div class="header-title">🚨 Ficha de Emergencia Médica</div>
                <div class="header-sub">Documento de Salud Doméstica • IAdapta Terapia Ocupacional</div>
              </div>
            </div>

            <div class="grid">
              <div class="box">
                <span class="label">👤 Nombre del Paciente / Familiar</span>
                <div class="val">${patientName}</div>
              </div>
              <div class="box alert">
                <span class="label" style="color: #dc2626;">🩸 Grupo Sanguíneo</span>
                <div class="val red">${bloodType}</div>
              </div>
              <div class="box alert full">
                <span class="label" style="color: #dc2626;">⚠️ Alergias Conocidas e Intolerancias</span>
                <div class="val red">${allergies}</div>
              </div>
              <div class="box full">
                <span class="label">📞 Contactos de Emergencia (Familiares)</span>
                <div class="val">${emergencyContacts}</div>
              </div>
              <div class="box full">
                <span class="label">🏥 Médico de Familia / Centro de Salud</span>
                <div class="val">${primaryDoctor}</div>
              </div>
              <div class="box full">
                <span class="label">💊 Pauta de Medicación Diaria</span>
                <div class="val">${medication}</div>
              </div>
              <div class="box alert full">
                <span class="label" style="color: #dc2626;">🛡️ Protocolo de Actuación ante Caída o Dolor Agudo</span>
                <div class="val red">${fallInstructions}</div>
              </div>
            </div>
          </div>

          <div class="footer">
            <div>iadapta.es • Terapia Ocupacional & Accesibilidad</div>
            <div class="footer-emergency">TELÉFONO DE EMERGENCIAS: 112</div>
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); window.close(); }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  const printRoutineCard = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const displayName = routinePatientName || patientName || '[ Nombre del Familiar ]';
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Planificador Semanal - ${displayName} | IAdapta</title>
        <style>
          @page { size: A4 landscape; margin: 10mm; }
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, Arial, sans-serif;
            color: #1e293b;
            margin: 0;
            padding: 0;
            background: #fff;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .container {
            border: 3px solid #1A3052;
            border-radius: 20px;
            padding: 20px;
            box-sizing: border-box;
            height: calc(100vh - 20mm);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 3px solid #1A3052;
            padding-bottom: 12px;
            margin-bottom: 16px;
          }
          .logo { height: 40px; object-fit: contain; }
          .title-box { text-align: right; }
          .title { font-size: 20px; font-weight: 900; color: #1A3052; text-transform: uppercase; margin: 0; }
          .sub { font-size: 11px; font-weight: 700; color: #E87D55; text-transform: uppercase; }

          table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
          th { background: #1A3052; color: #fff; padding: 10px; font-size: 11px; text-transform: uppercase; font-weight: 800; border: 1px solid #1A3052; }
          td { border: 1.5px solid #cbd5e1; padding: 10px; text-align: center; font-size: 12px; font-weight: 600; }
          tr:nth-child(even) { background: #f8fafc; }
          .day { font-weight: 800; color: #1A3052; }
          .footer { display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #64748b; font-weight: 700; border-top: 2px solid #e2e8f0; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div>
            <div class="header">
              <img src="assets/iadapta_logo.png" alt="IAdapta" class="logo" />
              <div class="title-box">
                <div class="title">📅 Planificador Semanal de Cuidados e Hidratación</div>
                <div class="sub">Control diario para ${displayName} • iadapta.es</div>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Día</th>
                  <th>☀️ Mañana (Pastillas)</th>
                  <th>🌤️ Mediodía</th>
                  <th>🌙 Noche</th>
                  <th>💧 Hidratación Diaria (8 Vasos)</th>
                  <th>🚶 Paseo / Ejercicio</th>
                </tr>
              </thead>
              <tbody>
                ${['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(day => `
                  <tr>
                    <td class="day">${day}</td>
                    <td>[ ] Pastilla</td>
                    <td>[ ] Pastilla</td>
                    <td>[ ] Pastilla</td>
                    <td>💧 💧 💧 💧 💧 💧 💧 💧</td>
                    <td>[ ] 15 - 30 min</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="footer">
            <div>iadapta.es • Terapia Ocupacional & Accesibilidad</div>
            <div>Documento Clínico de Seguimiento Doméstico</div>
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); window.close(); }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  const printMedicationCard = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const displayName = medicationPatientName || patientName || '[ Nombre del Familiar ]';
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Control de Medicación - ${displayName} | IAdapta</title>
        <style>
          @page { size: A4 portrait; margin: 12mm; }
          body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, Arial, sans-serif; color: #1e293b; margin: 0; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .page-container { border: 3px solid #1A3052; border-radius: 20px; padding: 24px; box-sizing: border-box; min-height: calc(100vh - 24mm); display: flex; flex-direction: column; justify-content: space-between; }
          .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #1A3052; padding-bottom: 14px; margin-bottom: 20px; }
          .brand-logo { height: 44px; object-fit: contain; }
          .title-box { text-align: right; }
          .title { font-size: 20px; font-weight: 900; color: #1A3052; text-transform: uppercase; margin: 0; }
          .sub { font-size: 11px; font-weight: 700; color: #E87D55; text-transform: uppercase; margin-top: 2px; }
          
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th { background: #1A3052; color: #fff; padding: 10px; font-size: 11px; text-transform: uppercase; font-weight: 800; text-align: left; }
          td { border: 1.5px solid #cbd5e1; padding: 10px; font-size: 13px; font-weight: 600; }
          tr:nth-child(even) { background: #f8fafc; }
          
          .notes-box { background: #fef2f2; border: 2px solid #fca5a5; border-radius: 12px; padding: 12px 16px; font-size: 12px; color: #991b1b; font-weight: 700; margin-bottom: 20px; }
          .footer { border-top: 2px solid #e2e8f0; padding-top: 12px; display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: #64748b; font-weight: 700; }
        </style>
      </head>
      <body>
        <div class="page-container">
          <div>
            <div class="header">
              <img src="assets/iadapta_logo.png" alt="IAdapta" class="brand-logo" />
              <div class="title-box">
                <div class="title">💊 Control Detallado de Medicación</div>
                <div class="sub">Pauta de Administración para ${displayName} • iadapta.es</div>
              </div>
            </div>

            <div class="notes-box">
              ⚠️ ATENCIÓN: No modificar dosis ni retirar fármacos sin consulta previa con el médico prescriptor o farmacéutico.
            </div>

            <table>
              <thead>
                <tr>
                  <th>Fármaco / Medicamento</th>
                  <th>Dosis Exacta</th>
                  <th>Horario / Pauta de Toma</th>
                  <th>Indicación / Para qué sirve</th>
                </tr>
              </thead>
              <tbody>
                ${medicationItems.map(item => `
                  <tr>
                    <td><strong>${item.name}</strong></td>
                    <td>${item.dose}</td>
                    <td>${item.schedule}</td>
                    <td>${item.purpose}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="footer">
            <div>iadapta.es • Terapia Ocupacional & Accesibilidad</div>
            <div>Documento de Salud Doméstica</div>
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); window.close(); }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  const printVitalsCard = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const displayName = vitalsPatientName || patientName || '[ Nombre del Familiar ]';
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Registro de Constantes Vitales - ${displayName} | IAdapta</title>
        <style>
          @page { size: A4 portrait; margin: 12mm; }
          body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, Arial, sans-serif; color: #1e293b; margin: 0; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .page-container { border: 3px solid #1A3052; border-radius: 20px; padding: 20px; box-sizing: border-box; min-height: calc(100vh - 24mm); display: flex; flex-direction: column; justify-content: space-between; }
          .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #1A3052; padding-bottom: 12px; margin-bottom: 16px; }
          .brand-logo { height: 42px; object-fit: contain; }
          .title-box { text-align: right; }
          .title { font-size: 19px; font-weight: 900; color: #1A3052; text-transform: uppercase; margin: 0; }
          .sub { font-size: 11px; font-weight: 700; color: #E87D55; text-transform: uppercase; margin-top: 2px; }

          table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
          th { background: #1A3052; color: #fff; padding: 8px 6px; font-size: 10px; text-transform: uppercase; font-weight: 800; }
          td { border: 1.5px solid #cbd5e1; padding: 8px 6px; text-align: center; font-size: 11px; height: 26px; }
          tr:nth-child(even) { background: #f8fafc; }
          .footer { border-top: 2px solid #e2e8f0; padding-top: 10px; display: flex; justify-content: space-between; font-size: 11px; color: #64748b; font-weight: 700; }
        </style>
      </head>
      <body>
        <div class="page-container">
          <div>
            <div class="header">
              <img src="assets/iadapta_logo.png" alt="IAdapta" class="brand-logo" />
              <div class="title-box">
                <div class="title">🩸 Registro Mensual de Constantes Vitales</div>
                <div class="sub">Hoja de seguimiento clínico para ${displayName} • iadapta.es</div>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th style="width: 10%;">Fecha</th>
                  <th style="width: 18%;">Tensión (SYS/DIA)</th>
                  <th style="width: 14%;">Pulsaciones</th>
                  <th style="width: 14%;">Glucosa</th>
                  <th style="width: 12%;">Peso (kg)</th>
                  <th style="width: 12%;">Temp (°C)</th>
                  <th>Observaciones</th>
                </tr>
              </thead>
              <tbody>
                ${Array.from({ length: 18 }).map((_, idx) => `
                  <tr>
                    <td>___ / ___</td>
                    <td>____ / ____ mmHg</td>
                    <td>____ ppm</td>
                    <td>____ mg/dL</td>
                    <td>____ kg</td>
                    <td>____ °C</td>
                    <td></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="footer">
            <div>iadapta.es • Terapia Ocupacional & Accesibilidad</div>
            <div>Hoja de Control de Constantes Vitales para Consulta Médica</div>
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); window.close(); }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  const printPosturalCard = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const displayName = posturalPatientName || patientName || '[ Nombre del Familiar ]';
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Cambios Posturales - ${displayName} | IAdapta</title>
        <style>
          @page { size: A4 portrait; margin: 12mm; }
          body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, Arial, sans-serif; color: #1e293b; margin: 0; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .page-container { border: 3px solid #1A3052; border-radius: 20px; padding: 22px; box-sizing: border-box; min-height: calc(100vh - 24mm); display: flex; flex-direction: column; justify-content: space-between; }
          .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #1A3052; padding-bottom: 12px; margin-bottom: 18px; }
          .brand-logo { height: 44px; object-fit: contain; }
          .title-box { text-align: right; }
          .title { font-size: 20px; font-weight: 900; color: #1A3052; text-transform: uppercase; margin: 0; }
          .sub { font-size: 11px; font-weight: 700; color: #E87D55; text-transform: uppercase; margin-top: 2px; }

          table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
          th { background: #1A3052; color: #fff; padding: 7px 6px; font-size: 10px; text-transform: uppercase; font-weight: 800; text-align: center; }
          td { border: 1.5px solid #cbd5e1; padding: 6px 6px; font-size: 11px; font-weight: 600; text-align: center; }
          tr:nth-child(even) { background: #f8fafc; }
          .time { font-weight: 900; color: #1A3052; width: 14%; }
          .pos { font-weight: 800; color: #0284c7; width: 44%; text-align: left; padding-left: 10px; }
          .night-row { background: #f1f5f9 !important; }
          
          .checklist { background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 12px; padding: 10px 14px; margin-bottom: 12px; }
          .checklist h4 { font-size: 11px; font-weight: 900; color: #166534; margin: 0 0 4px 0; text-transform: uppercase; }
          .checklist ul { margin: 0; padding-left: 16px; font-size: 10px; color: #14532d; font-weight: 600; }
          
          .footer { border-top: 2px solid #e2e8f0; padding-top: 8px; display: flex; justify-content: space-between; font-size: 10px; color: #64748b; font-weight: 700; }
        </style>
      </head>
      <body>
        <div class="page-container">
          <div>
            <div class="header">
              <img src="assets/iadapta_logo.png" alt="IAdapta" class="brand-logo" />
              <div class="title-box">
                <div class="title">🔄 Horario de Cambios Posturales (24 Horas)</div>
                <div class="sub">Protocolo de Prevención de Escaras para ${displayName} • iadapta.es</div>
              </div>
            </div>

            <div class="checklist">
              <h4>🛡️ Pautas de Cuidado Cutáneo y Prevención de Úlceras por Presión</h4>
              <ul>
                <li>Rotación continua día y noche cada 2-3 horas sin arrastrar la piel sobre la sábana.</li>
                <li>Aplicar crema hidratante / ácidos grasos hiperoxigenados en sacro, caderas y talones.</li>
                <li>Inspeccionar la piel y comprobar zonas rojas de presión en cada cambio postural.</li>
              </ul>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Hora</th>
                  <th>Posición del Cuerpo</th>
                  <th>Puntos de Alivio / Cojines</th>
                  <th>Firma / Verificado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="time">08:00 h</td>
                  <td class="pos">🛌 Boca Arriba (Decúbito Supino)</td>
                  <td>Cojín bajo pantorrillas (talones flotantes)</td>
                  <td>[ ] Realizado</td>
                </tr>
                <tr>
                  <td class="time">11:00 h</td>
                  <td class="pos">↩️ Costado Izquierdo (Decúbito Lateral Izq)</td>
                  <td>Almohada entre rodillas y detrás de espalda</td>
                  <td>[ ] Realizado</td>
                </tr>
                <tr>
                  <td class="time">14:00 h</td>
                  <td class="pos">🛌 Boca Arriba (Decúbito Supino)</td>
                  <td>Alza cabecero a 30° para la comida</td>
                  <td>[ ] Realizado</td>
                </tr>
                <tr>
                  <td class="time">17:00 h</td>
                  <td class="pos">↪️ Costado Derecho (Decúbito Lateral Der)</td>
                  <td>Almohada entre rodillas y apoyo en brazo</td>
                  <td>[ ] Realizado</td>
                </tr>
                <tr>
                  <td class="time">20:00 h</td>
                  <td class="pos">🛌 Boca Arriba (Decúbito Supino)</td>
                  <td>Inspección de piel y alineación corporal</td>
                  <td>[ ] Realizado</td>
                </tr>
                <tr class="night-row">
                  <td class="time">23:00 h 🌙</td>
                  <td class="pos">↩️ Costado Izquierdo (Decúbito Lateral Izq)</td>
                  <td>Almohada entre rodillas para postura nocturna</td>
                  <td>[ ] Realizado</td>
                </tr>
                <tr class="night-row">
                  <td class="time">02:00 h 🌙</td>
                  <td class="pos">🛌 Boca Arriba (Decúbito Supino)</td>
                  <td>Giro nocturno, descarga de sacro y talones</td>
                  <td>[ ] Realizado</td>
                </tr>
                <tr class="night-row">
                  <td class="time">05:00 h 🌙</td>
                  <td class="pos">↪️ Costado Derecho (Decúbito Lateral Der)</td>
                  <td>Almohada de apoyo y cambio de postura nocturna</td>
                  <td>[ ] Realizado</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="footer">
            <div>iadapta.es • Terapia Ocupacional & Accesibilidad</div>
            <div>Hoja de Control de Cambios Posturales en Encamados (24 Horas)</div>
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); window.close(); }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  const PRINTABLE_TABS = [
    { id: 'emergency', label: 'Ficha Emergencia', icon: '🚨', cat: 'Salud', color: 'bg-red-600 text-white shadow-md ring-2 ring-red-300' },
    { id: 'medication', label: 'Control Pastillas', icon: '💊', cat: 'Salud', color: 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-300' },
    { id: 'vitals', label: 'Constantes Vitales', icon: '🩸', cat: 'Salud', color: 'bg-rose-600 text-white shadow-md ring-2 ring-rose-300' },
    { id: 'postural', label: 'Cambios Posturales', icon: '🔄', cat: 'Salud', color: 'bg-cyan-600 text-white shadow-md ring-2 ring-cyan-300' },
    { id: 'signs', label: 'Carteles A4 Domésticos', icon: '🏷️', cat: 'Organización', color: 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300' },
    { id: 'routine', label: 'Planificador Semanal', icon: '📅', cat: 'Organización', color: 'bg-amber-600 text-white shadow-md ring-2 ring-amber-300' }
  ];

  const currentIdx = PRINTABLE_TABS.findIndex(t => t.id === activeTab);
  const prevTabObj = currentIdx > 0 ? PRINTABLE_TABS[currentIdx - 1] : null;
  const nextTabObj = currentIdx < PRINTABLE_TABS.length - 1 ? PRINTABLE_TABS[currentIdx + 1] : null;

  return (
    <div className="bg-white rounded-3xl border border-brand-100 shadow-xl p-6 md:p-10 max-w-5xl mx-auto anim-scale-in text-left">
      {/* Header & Main Category Navigation */}
      <div className="border-b border-brand-100 pb-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="bg-blue-50 text-blue-700 font-bold text-xs px-3 py-1.5 rounded-xl uppercase tracking-wider mb-2 inline-block">
              🖨️ Generador de Documentos Clínicos y Domésticos
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-900">
              Fichas e Imprimibles para el Hogar
            </h2>
          </div>
          <div className="text-xs font-bold text-gray-500 bg-gray-50 border border-gray-200 px-3.5 py-2 rounded-xl self-start md:self-auto">
            📄 Documento <span className="text-brand-900 font-black">{currentIdx + 1}</span> de <span className="text-brand-900 font-black">{PRINTABLE_TABS.length}</span>
          </div>
        </div>

        {/* Desplegable para pantallas táctiles/móviles pequeños */}
        <div className="block md:hidden mb-4">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Seleccionar Documento:</label>
          <select
            value={activeTab}
            onChange={e => setActiveTab(e.target.value)}
            className="w-full bg-gray-50 border-2 border-brand-200 text-brand-900 font-bold rounded-2xl p-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
          >
            {PRINTABLE_TABS.map(t => (
              <option key={t.id} value={t.id}>
                {t.icon} {t.label} ({t.cat})
              </option>
            ))}
          </select>
        </div>

        {/* Barra de Pestañas completa para escritorio/tablet */}
        <div className="hidden md:grid grid-cols-6 gap-2.5 bg-gray-100/90 p-2.5 rounded-2xl border border-gray-200">
          {PRINTABLE_TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer text-center ${
                  isActive ? tab.color : 'bg-white text-gray-600 hover:text-brand-900 hover:bg-gray-50 border border-gray-200/80 shadow-2xs'
                }`}
              >
                <span className="text-2xl">{tab.icon}</span>
                <span className="leading-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: FICHA DE EMERGENCIA */}
      {activeTab === 'emergency' && (
        <div className="space-y-6 anim-fade-in">
          <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-5 mb-6">
            <h3 className="font-bold text-blue-900 text-base mb-1">Ficha Médica y Teléfonos para la Nevera</h3>
            <p className="text-xs text-blue-800 leading-relaxed font-medium">
              Rellena los datos de tu familiar a continuación. Al pulsar en "Imprimir / Exportar a PDF", obtendrás un documento A4 limpio y formateado listo para imantar en la nevera o colocar junto al teléfono fijo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Nombre del Familiar</label>
              <input
                type="text"
                value={patientName}
                onChange={e => setPatientName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Grupo Sanguíneo</label>
              <input
                type="text"
                value={bloodType}
                onChange={e => setBloodType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-red-700 uppercase tracking-wider mb-1.5">Alergias Conocidas</label>
              <input
                type="text"
                value={allergies}
                onChange={e => setAllergies(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-red-200 bg-red-50/30 text-sm font-medium text-red-900 focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Contactos de Emergencia (Familiares)</label>
              <input
                type="text"
                value={emergencyContacts}
                onChange={e => setEmergencyContacts(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Médico de Familia / Centro de Salud</label>
              <input
                type="text"
                value={primaryDoctor}
                onChange={e => setPrimaryDoctor(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Medicación Diaria y Horarios</label>
              <textarea
                rows={2}
                value={medication}
                onChange={e => setMedication(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Protocolo de Actuación ante Caída</label>
              <textarea
                rows={2}
                value={fallInstructions}
                onChange={e => setFallInstructions(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-150 mt-6">
            <button
              onClick={printEmergencyCard}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-md cursor-pointer flex items-center gap-2 text-sm"
            >
              <span>🖨️ Imprimir Ficha de Emergencia (A4)</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: CONTROL DETALLADO DE PASTILLAS */}
      {activeTab === 'medication' && (
        <div className="space-y-6 anim-fade-in">
          <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-5 mb-6">
            <h3 className="font-bold text-emerald-900 text-base mb-1">Control y Pauta Detallada de Medicación</h3>
            <p className="text-xs text-emerald-800 leading-relaxed font-medium">
              Añade los medicamentos, dosis y horarios exactos de tu familiar. Genera un documento A4 muy claro para tener en la cocina o entregar a cuidadores de apoyo.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <div className="mb-6 max-w-md">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Nombre del Familiar para la Ficha
              </label>
              <input
                type="text"
                value={medicationPatientName}
                onChange={e => setMedicationPatientName(e.target.value)}
                className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="space-y-3 mb-6">
              <h4 className="font-bold text-gray-800 text-sm mb-3">Lista de Medicamentos Registrados</h4>
              {medicationItems.map((item, idx) => (
                <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-200 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-3">
                    <input
                      type="text"
                      value={item.name}
                      onChange={e => {
                        const updated = [...medicationItems];
                        updated[idx].name = e.target.value;
                        setMedicationItems(updated);
                      }}
                      placeholder="Nombre (ej. Sintrom)"
                      className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs font-bold text-gray-900"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <input
                      type="text"
                      value={item.dose}
                      onChange={e => {
                        const updated = [...medicationItems];
                        updated[idx].dose = e.target.value;
                        setMedicationItems(updated);
                      }}
                      placeholder="Dosis (ej. 1 comprimido)"
                      className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs font-medium text-gray-700"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <input
                      type="text"
                      value={item.schedule}
                      onChange={e => {
                        const updated = [...medicationItems];
                        updated[idx].schedule = e.target.value;
                        setMedicationItems(updated);
                      }}
                      placeholder="Horario (ej. 09:00h)"
                      className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs font-medium text-gray-700"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      value={item.purpose}
                      onChange={e => {
                        const updated = [...medicationItems];
                        updated[idx].purpose = e.target.value;
                        setMedicationItems(updated);
                      }}
                      placeholder="Para qué sirve"
                      className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs font-medium text-gray-700"
                    />
                  </div>
                  <div className="sm:col-span-1 text-right">
                    <button
                      onClick={() => setMedicationItems(medicationItems.filter(m => m.id !== item.id))}
                      className="text-red-500 hover:text-red-700 font-bold text-lg p-1 cursor-pointer"
                      title="Eliminar fármaco"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => setMedicationItems([...medicationItems, { id: Date.now(), name: '', dose: '', schedule: '', purpose: '' }])}
                className="px-5 py-2.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold rounded-xl text-xs transition-all cursor-pointer"
              >
                + Añadir Nuevo Fármaco
              </button>

              <button
                onClick={printMedicationCard}
                className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-md cursor-pointer inline-flex items-center gap-2 text-sm"
              >
                <span>🖨️ Imprimir Ficha de Medicación (A4)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: REGISTRO DE CONSTANTES VITALES */}
      {activeTab === 'vitals' && (
        <div className="space-y-6 anim-fade-in">
          <div className="bg-rose-50/60 border border-rose-100 rounded-2xl p-5 mb-6">
            <h3 className="font-bold text-rose-900 text-base mb-1">Registro Mensual de Constantes Vitales</h3>
            <p className="text-xs text-rose-800 leading-relaxed font-medium">
              Genera una plantilla en A4 lista para imprimir y colocar junto al tensiómetro o glucómetro para anotar la evolución de salud de tu familiar.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-left">
            <div className="mb-6 max-w-md">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Nombre del Familiar para la Plantilla
              </label>
              <input
                type="text"
                value={vitalsPatientName}
                onChange={e => setVitalsPatientName(e.target.value)}
                className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>

            <div className="text-center pt-4 border-t border-gray-200">
              <span className="text-5xl mb-3 block">🩸</span>
              <h4 className="font-bold text-brand-900 text-lg mb-2">Hoja de Control de Constantes para el Médico</h4>
              <p className="text-xs text-gray-500 max-w-lg mx-auto mb-6 leading-relaxed">
                Contiene 18 filas con columnas para Fecha, Tensión Arterial (SYS/DIA), Pulsaciones, Glucosa, Peso, Temperatura y Observaciones.
              </p>

              <button
                onClick={printVitalsCard}
                className="px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl transition-all shadow-md cursor-pointer inline-flex items-center gap-2 text-sm"
              >
                <span>🖨️ Imprimir Registro de Constantes Vitales (A4)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CAMBIOS POSTURALES */}
      {activeTab === 'postural' && (
        <div className="space-y-6 anim-fade-in">
          <div className="bg-cyan-50/60 border border-cyan-100 rounded-2xl p-5 mb-6">
            <h3 className="font-bold text-cyan-900 text-base mb-1">Horario de Cambios Posturales y Prevención de Escaras</h3>
            <p className="text-xs text-cyan-800 leading-relaxed font-medium">
              Guía práctica para personas encamadas o con movilidad muy reducida con el objetivo de alternar posiciones cada 2-3 horas, aliviar puntos de presión y proteger la piel.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-left">
            <div className="mb-6 max-w-md">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Nombre del Familiar para el Protocolo
              </label>
              <input
                type="text"
                value={posturalPatientName}
                onChange={e => setPosturalPatientName(e.target.value)}
                className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>

            <div className="text-center pt-4 border-t border-gray-200">
              <span className="text-5xl mb-3 block">🔄</span>
              <h4 className="font-bold text-brand-900 text-lg mb-2">Protocolo de Rotación 24H y Prevención de Escaras</h4>
              <p className="text-xs text-gray-500 max-w-lg mx-auto mb-6 leading-relaxed">
                Incluye cuadrícula horaria de giros (Boca arriba ➔ Costado Izquierdo ➔ Costado Derecho), colocación de cojines y pautas de hidratación cutánea.
              </p>

              <button
                onClick={printPosturalCard}
                className="px-8 py-3.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-2xl transition-all shadow-md cursor-pointer inline-flex items-center gap-2 text-sm"
              >
                <span>🖨️ Imprimir Horario de Cambios Posturales (A4)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CARTELES DOMÉSTICOS Y CREADOR PERSONALIZADO */}
      {activeTab === 'signs' && (
        <div className="space-y-8 anim-fade-in">
          <div className="bg-purple-50/60 border border-purple-100 rounded-2xl p-5">
            <h3 className="font-bold text-purple-900 text-base mb-1">Señalética Doméstica y Carteles a Medida</h3>
            <p className="text-xs text-purple-800 leading-relaxed font-medium">
              Crea carteles personalizados o imprime la señalética recomendada por Terapia Ocupacional para orientación en demencias, Alzheimer o baja visión.
            </p>
          </div>

          {/* SELECTOR DE ESTILO / CONTRASTE VISUAL */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-brand-900 text-sm mb-1">👁️ Estilo Visual y Nivel de Contraste</h4>
              <p className="text-xs text-gray-500 font-medium">Selecciona el modo de legibilidad para todas las impresiones de esta sección:</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSignTheme('standard')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  signTheme === 'standard' ? 'bg-blue-900 text-white shadow' : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                🎨 Estándar (Azul/Blanco)
              </button>
              <button
                onClick={() => setSignTheme('high-contrast')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  signTheme === 'high-contrast' ? 'bg-black text-yellow-300 shadow ring-2 ring-yellow-400' : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                👁️ Alto Contraste (Demencias)
              </button>
              <button
                onClick={() => setSignTheme('soft')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  signTheme === 'soft' ? 'bg-amber-700 text-amber-50 shadow' : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                ☀️ Ámbar Calma
              </button>
            </div>
          </div>

          {/* CREADOR PERSONALIZADO Y VISTA PREVIA EN VIVO */}
          <div className="bg-white border-2 border-brand-100 rounded-3xl p-6 md:p-8 shadow-sm">
            <h4 className="font-display font-bold text-lg text-brand-900 mb-6 flex items-center gap-2">
              <span>✏️ Creador de Cartel Doméstico Personalizado</span>
            </h4>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Formulario */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Título Principal del Cartel
                  </label>
                  <input
                    type="text"
                    value={customSignTitle}
                    onChange={e => setCustomSignTitle(e.target.value.toUpperCase())}
                    placeholder="Ej. HABITACIÓN DE PAPÁ"
                    className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-300 text-sm font-bold text-brand-900 uppercase focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Subtítulo / Aclaración (Opcional)
                  </label>
                  <input
                    type="text"
                    value={customSignDesc}
                    onChange={e => setCustomSignDesc(e.target.value)}
                    placeholder="Ej. Dormitorio Principal"
                    className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Seleccionar Icono / Emoji Gigante
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['🛏️', '🛁', '🍽️', '🚪', '⚠️', '🔑', '🛋️', '🚰', '💊', '👓', '🚨', '📱', '🧼', '📺', '🧥', '♿'].map(icon => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setCustomSignIcon(icon)}
                        className={`w-11 h-11 text-2xl rounded-xl transition-all flex items-center justify-center cursor-pointer ${
                          customSignIcon === icon ? 'bg-purple-600 text-white scale-110 shadow' : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => printSingleSign({ title: customSignTitle, desc: customSignDesc, icon: customSignIcon }, signTheme)}
                    className="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl transition-all shadow-md cursor-pointer flex items-center gap-2 text-sm"
                  >
                    <span>🖨️ Imprimir Cartel Personalizado (A4)</span>
                  </button>
                </div>
              </div>

              {/* Vista Previa Interactiva */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Vista Previa A4 (Estilo Seleccionado)</span>
                <div
                  className={`w-full max-w-xs aspect-[3/4] rounded-3xl p-6 border-8 flex flex-col items-center justify-between text-center transition-all shadow-lg ${
                    signTheme === 'high-contrast'
                      ? 'bg-black border-yellow-400 text-yellow-300'
                      : signTheme === 'soft'
                      ? 'bg-amber-100 border-amber-600 text-amber-950'
                      : 'bg-slate-50 border-brand-900 text-brand-900'
                  }`}
                >
                  <div className="text-[10px] font-bold tracking-widest opacity-60 uppercase">IAdapta A4</div>
                  <div className="my-auto">
                    <span className="text-6xl mb-3 block">{customSignIcon}</span>
                    <h5 className="font-black text-2xl tracking-wider uppercase mb-2 leading-tight">{customSignTitle || 'TÍTULO'}</h5>
                    <span className="text-xs font-bold uppercase px-3 py-1 rounded-lg border border-current inline-block opacity-90">{customSignDesc || 'SUBTÍTULO'}</span>
                  </div>
                  <div className="text-[9px] font-extrabold tracking-widest uppercase opacity-75">iadapta.es</div>
                </div>
              </div>
            </div>
          </div>

          {/* CARTELES PREDISEÑADOS */}
          <div>
            <h4 className="font-bold text-brand-900 text-base mb-4">Carteles Rápidos Prediseñados</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SIGNS.map(sign => (
                <div
                  key={sign.id}
                  onClick={() => printSingleSign(sign, signTheme)}
                  className={`p-6 rounded-2xl border-4 text-center cursor-pointer transition-all hover:scale-105 shadow-sm hover:shadow-md flex flex-col items-center justify-center min-h-[160px] group ${
                    signTheme === 'high-contrast'
                      ? 'bg-black border-yellow-400 text-yellow-300'
                      : signTheme === 'soft'
                      ? 'bg-amber-100 border-amber-600 text-amber-950'
                      : `${sign.border}`
                  }`}
                >
                  <span className="text-5xl mb-3 group-hover:scale-110 transition-transform">{sign.icon}</span>
                  <h4 className="font-black text-lg tracking-wider uppercase mb-1">{sign.title}</h4>
                  <span className="text-[11px] font-bold opacity-75 uppercase">{sign.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 font-medium pt-2">
            * Haz clic en cualquiera de los carteles prediseñados para imprimirlos en el estilo visual de alto contraste seleccionado.
          </p>
        </div>
      )}

      {/* TAB 3: PLANIFICADOR */}
      {activeTab === 'routine' && (
        <div className="space-y-6 anim-fade-in">
          <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-5 mb-6">
            <h3 className="font-bold text-amber-900 text-base mb-1">Planificador Semanal de Cuidados e Hidratación</h3>
            <p className="text-xs text-amber-800 leading-relaxed font-medium">
              Genera una plantilla en orientación horizontal (A4) para marcar casillas diarias de toma de pastillas, vasos de agua ingeridos y paseos en casa.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-left">
            <div className="mb-6 max-w-md">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Nombre del Familiar para la Plantilla
              </label>
              <input
                type="text"
                value={routinePatientName}
                onChange={e => setRoutinePatientName(e.target.value)}
                placeholder="Escribe aquí el nombre (ej. María José)"
                className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            <div className="text-center pt-4 border-t border-gray-200">
              <span className="text-5xl mb-3 block">📅</span>
              <h4 className="font-bold text-brand-900 text-lg mb-2">Plantilla Semanal para la Mesa / Pared</h4>
              <p className="text-xs text-gray-500 max-w-lg mx-auto mb-6 leading-relaxed">
                Incluye cuadrícula de Lunes a Domingo con casillas para medicación de Mañana ☀️, Mediodía 🌤️, Noche 🌙 y contador de 8 vasos de agua diarios 💧.
              </p>

              <button
                onClick={printRoutineCard}
                className="px-8 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl transition-all shadow-md cursor-pointer inline-flex items-center gap-2 text-sm"
              >
                <span>🖨️ Generar e Imprimir Planificador Semanal (A4)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// VISTA 1: MENÚ PRINCIPAL
  if (currentView === 'menu') {
    return (
      <section id="caregiver-resources" className="pt-36 pb-24 px-4 bg-brand-50/50 min-h-screen">
        <div className="max-w-6xl mx-auto transition-all duration-300">
          <div className="text-center mb-16">
            <span className="inline-block bg-brand-100 text-brand-700 rounded-full px-5 py-2 text-base font-bold uppercase tracking-widest mb-4">
              Área del Cuidador
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-900 mb-6">
              Recursos para el Cuidador
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Cuidar de un ser querido es una labor extraordinaria que requiere orientación y herramientas prácticas. A continuación, selecciona el apartado técnico que desees consultar para acceder a guías, asistentas e inventarios recomendados por profesionales.
            </p>
            <div className="section-divider w-24 mx-auto mb-8"></div>
          </div>

          {/* Rejilla de Apartados */}
          <div className="grid md:grid-cols-3 gap-8">
          {/* Fila 1 - Card 1: Fichas e Imprimibles (Activo) */}
          <article 
            onClick={() => setCurrentView('printables')}
            className="bg-white rounded-[2.5rem] overflow-hidden border border-brand-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="h-48 overflow-hidden relative">
              <img src="caregiver_printables_thumbnail.png" className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-110" alt="Fichas e Imprimibles" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>
              <div className="absolute top-4 right-4 w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform text-xl">
                🖨️
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1 justify-between text-center">
              <div>
                <span className="text-blue-700 font-extrabold uppercase tracking-widest text-xs mb-3 block">Documentos Domésticos</span>
                <h3 className="font-display text-2xl font-bold text-brand-900 mb-4 group-hover:text-blue-700 transition-colors">Fichas e Imprimibles</h3>
                <p className="text-slate-900 text-base leading-relaxed mb-6 font-medium">
                  Genera e imprime en 1 clic documentos de utilidad para la casa: Fichas de emergencia para la nevera, carteles visuales de estancias y planificadores semanales.
                </p>
                <ul className="list-disc pl-5 mb-6 text-sm text-slate-800 font-semibold text-left space-y-1.5">
                  <li>Ficha de Emergencia y Medicación para Nevera</li>
                  <li>Carteles visuales A4 de estancias (Demencias)</li>
                  <li>Planificador semanal de cuidados e hidratación</li>
                </ul>
              </div>
              <div className="inline-flex items-center justify-center gap-2 text-blue-700 font-bold group-hover:gap-3 transition-all text-base pt-4 border-t border-gray-150">
                Generar e Imprimir Documentos &rarr;
              </div>
            </div>
          </article>

          {/* Fila 1 - Card 2: Diario de Registro (Activo) */}
          <article 
            onClick={() => setCurrentView('log')}
            className="bg-white rounded-[2.5rem] overflow-hidden border border-brand-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="h-48 overflow-hidden relative">
              <img src="caregiver_log_thumbnail.png" className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-110" alt="Diario de Registro" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>
              <div className="absolute top-4 right-4 w-12 h-12 bg-amber-650 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform text-xl">
                📝
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1 justify-between text-center">
              <div>
                <span className="text-amber-700 font-extrabold uppercase tracking-widest text-xs mb-3 block">Seguimiento</span>
                <h3 className="font-display text-2xl font-bold text-brand-900 mb-4 group-hover:text-amber-700 transition-colors">Diario de Registro</h3>
                <p className="text-slate-900 text-base leading-relaxed mb-6 font-medium">
                  Registra de forma interactiva la toma de medicación, horas de sueño, hidratación y estado de ánimo de tu familiar para no pasar por alto ningún detalle de salud.
                </p>
                <ul className="list-disc pl-5 mb-6 text-sm text-slate-800 font-semibold text-left space-y-1.5">
                  <li>Formulario de métricas y constantes básicas</li>
                  <li>Persistencia local en el dispositivo del cuidador</li>
                  <li>Generación instantánea de reporte PDF para el médico</li>
                </ul>
              </div>
              <div className="inline-flex items-center justify-center gap-2 text-amber-700 font-bold group-hover:gap-3 transition-all text-base pt-4 border-t border-gray-150">
                Ver Diario de Registro &rarr;
              </div>
            </div>
          </article>

          {/* Fila 1 - Card 3: Orientador de Caso Real (Activo) */}
          <article 
            onClick={() => setCurrentView('wizard')}
            className="bg-white rounded-[2.5rem] overflow-hidden border border-brand-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="h-48 overflow-hidden relative">
              <img src="caregiver_wizard_thumbnail.png" className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-110" alt="Orientador de Caso Real" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>
              <div className="absolute top-4 right-4 w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform text-xl">
                🧙‍♂️
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1 justify-between text-center">
              <div>
                <span className="text-emerald-700 font-extrabold uppercase tracking-widest text-xs mb-3 block">Recomendación Guiada</span>
                <h3 className="font-display text-2xl font-bold text-brand-900 mb-4 group-hover:text-emerald-700 transition-colors">Orientador de Caso Real</h3>
                <p className="text-slate-900 text-base leading-relaxed mb-6 font-medium">
                  ¿No sabes qué adaptaciones o productos necesitas? Responde 3 preguntas sencillas y obtén un informe técnico personalizado con los productos de apoyo e instrucciones clave para tu caso.
                </p>
                <ul className="list-disc pl-5 mb-6 text-sm text-slate-800 font-semibold text-left space-y-1.5">
                  <li>Test guiado de 3 clics rápidos en 1 minuto</li>
                  <li>Recomendación clínica por Terapia Ocupacional</li>
                  <li>Kit descargable e imprimible en PDF</li>
                </ul>
              </div>
              <div className="inline-flex items-center justify-center gap-2 text-emerald-700 font-bold group-hover:gap-3 transition-all text-base pt-4 border-t border-gray-150">
                Iniciar Orientador de Caso &rarr;
              </div>
            </div>
          </article>

          {/* Fila 2 - Card 4: Test de Zarit (Activo) */}
          <article 
            onClick={() => setCurrentView('zarit')}
            className="bg-white rounded-[2.5rem] overflow-hidden border border-brand-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="h-48 overflow-hidden relative">
              <img src="caregiver_zarit_thumbnail.png" className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-110" alt="Test de Zarit" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>
              <div className="absolute top-4 right-4 w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform text-xl">
                📋
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1 justify-between text-center">
              <div>
                <span className="text-indigo-700 font-extrabold uppercase tracking-widest text-xs mb-3 block">Evaluación</span>
                <h3 className="font-display text-2xl font-bold text-brand-900 mb-4 group-hover:text-indigo-700 transition-colors">Test de Zarit</h3>
                <p className="text-slate-900 text-base leading-relaxed mb-6 font-medium">
                  La escala científica original de 22 preguntas de Zarit diseñada para medir objetivamente la sobrecarga del cuidador y diagnosticar de forma precoz el desgaste físico y mental.
                </p>
                <ul className="list-disc pl-5 mb-6 text-sm text-slate-800 font-semibold text-left space-y-1.5">
                  <li>Cuestionario oficial de 22 preguntas completas</li>
                  <li>Paginación interactiva cómoda paso a paso</li>
                  <li>Resultados dinámicos y recomendaciones de autocuidado</li>
                </ul>
              </div>
              <div className="inline-flex items-center justify-center gap-2 text-indigo-700 font-bold group-hover:gap-3 transition-all text-base pt-4 border-t border-gray-150">
                Realizar Test de Zarit &rarr;
              </div>
            </div>
          </article>

          {/* Fila 2 - Card 5: Productos Recomendados (Activo) */}
          <article 
            onClick={() => setCurrentView('products')}
            className="bg-white rounded-[2.5rem] overflow-hidden border border-brand-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="h-48 overflow-hidden relative">
              <img src="caregiver_products_thumbnail.png" className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-110" alt="Productos Recomendados" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>
              <div className="absolute top-4 right-4 w-12 h-12 bg-accent-coral text-white rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform text-xl">
                🛒
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1 justify-between text-center">
              <div>
                <span className="text-amber-700 font-extrabold uppercase tracking-widest text-xs mb-3 block">Catálogo</span>
                <h3 className="font-display text-2xl font-bold text-brand-900 mb-4 group-hover:text-amber-700 transition-colors">Productos Recomendados</h3>
                <p className="text-slate-900 text-base leading-relaxed mb-6 font-medium">
                  Catálogo e inventario interactivo de ayudas técnicas y productos de apoyo recomendados. Encuentra descripciones detalladas sobre cómo cada producto puede facilitar el aseo, el descanso y la movilidad.
                </p>
                <ul className="list-disc pl-5 mb-6 text-sm text-slate-800 font-semibold text-left space-y-1.5">
                  <li>Buscador y filtros interactivos instantáneos</li>
                  <li>Explicación clínica de uso para cada producto</li>
                  <li>Enlaces de acceso rápido referenciados</li>
                </ul>
              </div>
              <div className="inline-flex items-center justify-center gap-2 text-amber-700 font-bold group-hover:gap-3 transition-all text-base pt-4 border-t border-gray-150">
                Abrir Catálogo de Productos &rarr;
              </div>
            </div>
          </article>

          {/* Fila 2 - Card 6: Asistente del Cuidador (Activo) */}
          <article 
            onClick={() => setCurrentView('chat')}
            className="bg-white rounded-[2.5rem] overflow-hidden border border-brand-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="h-48 overflow-hidden relative">
              <img src="caregiver_chat_thumbnail.png" className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-110" alt="Asistente del Cuidador" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>
              <div className="absolute top-4 right-4 w-12 h-12 bg-teal-600 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform text-xl">
                💬
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1 justify-between text-center">
              <div>
                <span className="text-teal-700 font-extrabold uppercase tracking-widest text-xs mb-3 block">Asistente IA</span>
                <h3 className="font-display text-2xl font-bold text-brand-900 mb-4 group-hover:text-teal-700 transition-colors">Asistente del Cuidador</h3>
                <p className="text-slate-900 text-base leading-relaxed mb-6 font-medium">
                  Nuestro asistente virtual con Inteligencia Artificial. Haz consultas empáticas y sencillas sobre movilizaciones, adaptaciones del hogar y consejos prácticos del día a día.
                </p>
                <ul className="list-disc pl-5 mb-6 text-sm text-slate-800 font-semibold text-left space-y-1.5">
                  <li>Respuestas sencillas, directas y sin tecnicismos</li>
                  <li>Sugerencias de productos y enlaces de la web</li>
                  <li>Límite de 5 preguntas por sesión de consulta</li>
                </ul>
              </div>
              <div className="inline-flex items-center justify-center gap-2 text-teal-700 font-bold group-hover:gap-3 transition-all text-base pt-4 border-t border-gray-150">
                Consultar al Asistente &rarr;
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
    );
  }

  // VISTA 2: CATÁLOGO DE PRODUCTOS RECOMENDADOS
  if (currentView === 'products') {
    return (
      <section id="caregiver-resources" className="pt-36 pb-24 px-4 bg-brand-50/50 min-h-screen">
        <div className="max-w-6xl mx-auto transition-all duration-300">
          <CaregiverSubNav currentView="products" onViewChange={setCurrentView} />

        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-brand-900 mb-2">
            Productos de Apoyo Recomendados
          </h2>
          <p className="text-gray-550 max-w-3xl mx-auto text-base mb-4 leading-relaxed font-medium">
            Catálogo e inventario interactivo de ayudas técnicas y productos de apoyo recomendados. Encuentra descripciones detalladas sobre cómo cada producto puede facilitar el aseo, el descanso y la movilidad.
          </p>
          <p className="text-[11px] text-gray-400 italic max-w-2xl mx-auto bg-gray-50 border border-gray-200/60 rounded-xl px-4 py-2">
            Nota de transparencia: En calidad de Afiliado de Amazon, IAdapta obtiene ingresos por las compras adscritas que cumplen los requisitos aplicables. Los enlaces a productos de apoyo presentados en este portal son recomendaciones de carácter técnico y clínico.
          </p>
        </div>

        <div className="bg-gradient-to-br from-brand-50 to-sky-50/50 border border-brand-100 rounded-3xl p-6 md:p-8 mb-12 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Buscar productos por nombre o utilidad (ej: cama, plato, andador)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-brand-100 hover:border-brand-200 focus:border-brand-500 rounded-2xl outline-none text-gray-700 transition-all font-medium text-base shadow-sm"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400">
                <Icons.Search className="w-6 h-6" />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-900 text-sm font-bold bg-gray-100 px-2.5 py-1 rounded-lg cursor-pointer"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 justify-center">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm border-2 transition-all cursor-pointer shadow-sm
                    ${isActive 
                      ? `${cat.color} border-transparent text-white scale-[1.03] shadow-md`
                      : 'bg-white border-brand-100 text-brand-800 hover:border-brand-300 hover:bg-brand-50/50'}`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(prod => (
              <article
                key={prod.id}
                className="bg-white rounded-[2rem] border border-gray-150 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div className="relative h-48 bg-gray-50 border-b border-gray-100 overflow-hidden">
                  <img
                    src={prod.img}
                    alt={prod.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-brand-900/90 text-white font-bold text-xs px-3 py-1.5 rounded-xl backdrop-blur-sm shadow-sm flex items-center gap-1.5">
                    {getCategoryBadge(prod.category)}
                  </span>
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-brand-900 mb-3 leading-tight group-hover:text-brand-600 transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium">
                      {prod.desc}
                    </p>
                  </div>

                  <a
                    href={getAmazonLink(prod.query, prod.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-4 bg-accent-coral text-white font-bold rounded-2xl hover:bg-accent-coral/90 transition-all shadow-md group/btn cursor-pointer font-sans"
                  >
                    <span>🛒 Ver en Amazon</span>
                    <span className="group-hover/btn:translate-x-0.5 transition-transform"><Icons.ArrowRight className="w-4 h-4" /></span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 border border-dashed border-gray-200 rounded-3xl p-8">
            <p className="text-gray-550 font-bold text-lg mb-2">No se encontraron productos de apoyo</p>
            <p className="text-gray-400 text-sm">Prueba a buscar con otros términos o cambia la categoría de filtro.</p>
          </div>
        )}
      </div>
    </section>
    );
  }

  // VISTA 3: TEST DE SOBRECARGA ZARIT (22 PREGUNTAS PAGINADAS)
  if (currentView === 'zarit') {
    const startIndex = zaritPage * QUESTIONS_PER_PAGE;
    const pageQuestions = ZARIT_QUESTIONS.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);
    const totalPages = Math.ceil(ZARIT_QUESTIONS.length / QUESTIONS_PER_PAGE);

    const answeredCount = zaritAnswers.filter(a => a !== null).length;
    const progressPercent = Math.round((answeredCount / ZARIT_QUESTIONS.length) * 100);
    const isCurrentPageComplete = pageQuestions.every((q, idx) => zaritAnswers[startIndex + idx] !== null);

    return (
      <section id="caregiver-resources" className="pt-36 pb-24 px-4 bg-brand-50/50 min-h-screen">
        <div className="max-w-6xl mx-auto transition-all duration-300">
          <CaregiverSubNav currentView="zarit" onViewChange={setCurrentView} />

        <div className="max-w-4xl mx-auto">
          {!isZaritComplete ? (
            <div className="bg-white rounded-3xl border border-brand-100 shadow-xl p-8 md:p-10 anim-scale-in">
            {/* Cabecera del Test */}
            <div className="mb-8 border-b border-brand-50 pb-6">
              <span className="bg-indigo-50 text-indigo-700 font-bold text-xs px-3 py-1.5 rounded-xl uppercase tracking-wider mb-3 inline-block">
                Evaluación Científica Oficial
              </span>
              <h2 className="font-display text-3xl font-bold text-brand-900 mb-2">
                Escala de Sobrecarga del Cuidador (Zarit)
              </h2>
              <p className="text-gray-555 text-base md:text-lg leading-relaxed font-medium">
                La escala científica original de 22 preguntas de Zarit diseñada para medir objetivamente la sobrecarga del cuidador y diagnosticar de forma precoz el desgaste físico y mental. Responde con total sinceridad en qué medida te sientes identificado/a con cada una de las siguientes afirmaciones.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center text-xs font-bold text-brand-500 uppercase mb-2">
                <span>Progreso: {progressPercent}%</span>
                <span>{answeredCount} de 22 respondidas</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Questions list for current page */}
            <div className="space-y-8 mb-8">
              {pageQuestions.map((q, idx) => {
                const globalIndex = startIndex + idx;
                const activeValue = zaritAnswers[globalIndex];

                return (
                  <div 
                    key={q.id}
                    className={`p-6 rounded-2xl border transition-all ${
                      activeValue !== null 
                        ? 'border-indigo-200 bg-indigo-50/10' 
                        : 'border-gray-150 hover:border-gray-250 bg-white'
                    }`}
                  >
                    <p className="font-bold text-brand-900 mb-5 text-lg md:text-xl">
                      {globalIndex + 1}. {q.text}
                    </p>
                    <div className="grid grid-cols-5 gap-1 md:gap-2">
                      {ZARIT_OPTIONS.map(opt => {
                        const isSelected = activeValue === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleZaritAnswer(globalIndex, opt.value)}
                            className={`py-3 px-1 md:px-2 rounded-xl text-xs md:text-sm font-bold text-center border-2 transition-all cursor-pointer leading-tight flex flex-col items-center justify-center gap-1 min-h-[64px]
                              ${isSelected 
                                ? 'bg-indigo-600 border-transparent text-white scale-[1.02] shadow-sm font-black' 
                                : 'bg-white border-gray-100 text-gray-650 hover:border-indigo-100 hover:bg-indigo-50/20'}`}
                          >
                            <span className="text-xs sm:text-sm md:text-base opacity-90">
                              {opt.value === 0 ? '0️⃣' : opt.value === 1 ? '1️⃣' : opt.value === 2 ? '2️⃣' : opt.value === 3 ? '3️⃣' : '4️⃣'}
                            </span>
                            <span>{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {showZaritError && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-150 text-red-800 rounded-2xl text-sm font-bold text-center animate-pulse flex items-center justify-center gap-2">
                <span>⚠️</span>
                <span>Por favor, responde a todas las preguntas de esta página antes de continuar.</span>
              </div>
            )}

            {/* Paginator Controls */}
            <div className="flex justify-between items-center pt-6 border-t border-brand-50">
              <button
                onClick={() => {
                  setZaritPage(p => Math.max(0, p - 1));
                  setShowZaritError(false);
                }}
                disabled={zaritPage === 0}
                className="px-5 py-3 border border-brand-100 hover:border-brand-200 text-brand-700 font-bold rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brand-50 transition-colors cursor-pointer text-sm"
              >
                &larr; Anterior
              </button>

              <span className="text-xs font-bold text-brand-500">
                Página {zaritPage + 1} de {totalPages}
              </span>

              {zaritPage < totalPages - 1 ? (
                <button
                  onClick={() => {
                    if (isCurrentPageComplete) {
                      setZaritPage(p => p + 1);
                      setShowZaritError(false);
                    } else {
                      setShowZaritError(true);
                    }
                  }}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer text-sm"
                >
                  Siguiente &rarr;
                </button>
              ) : (
                <div className="text-xs text-brand-400 font-semibold italic">Completa el test para ver el resultado</div>
              )}
            </div>
          </div>
        ) : (
          /* RESULTADOS DEL TEST COMPLETADO */
          <div className="bg-white rounded-3xl border border-brand-100 shadow-xl p-8 md:p-12 anim-scale-in">
            <div className="text-center mb-8 border-b border-brand-50 pb-8">
              <span className="bg-indigo-50 text-indigo-700 font-bold text-xs px-3.5 py-1.5 rounded-xl uppercase tracking-wider mb-4 inline-block">
                Resultado Oficial Zarit
              </span>
              <h2 className="font-display text-4xl font-bold text-brand-900 mb-2">
                Tu Informe de Sobrecarga
              </h2>
              <p className="text-gray-500 text-sm">
                A continuación se muestra el diagnóstico clínico obtenido basado en tu puntuación en la Escala de Zarit.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-center mb-10">
              {/* Radial Puntuación */}
              <div className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-brand-50/50 rounded-3xl border border-brand-100/50">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="72" cy="72" r="60" stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
                    <circle 
                      cx="72" 
                      cy="72" 
                      r="60" 
                      stroke="#4f46e5" 
                      strokeWidth="12" 
                      fill="transparent" 
                      strokeDasharray="377" 
                      strokeDashoffset={377 - (377 * (zaritTotalScore || 0)) / 88} 
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-black text-brand-900">{zaritTotalScore}</span>
                    <span className="text-[10px] uppercase font-bold text-brand-400">Puntos</span>
                  </div>
                </div>
                <span className="text-xs text-gray-500 font-semibold mt-4">Máx. escala: 88 puntos</span>
              </div>

              {/* Diagnóstico Semáforo */}
              <div className="md:col-span-2 space-y-4">
                <div className={`p-5 rounded-2xl border-2 font-bold text-lg text-center ${zaritDiagnosis.color}`}>
                  Nivel de afectación: {zaritDiagnosis.level}
                </div>
                <div className="bg-gray-50 border border-gray-150 p-6 rounded-2xl leading-relaxed text-sm text-gray-700">
                  <h4 className="font-bold text-brand-900 mb-2">🩺 Valoración de Terapia Ocupacional:</h4>
                  <p>{zaritDiagnosis.advice}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand-50 to-indigo-50/50 border border-brand-100 rounded-3xl p-6 md:p-8 mb-10">
              <h3 className="font-display text-xl font-bold text-brand-900 mb-5 flex items-center gap-2">
                💡 Pautas de cuidado recomendadas para ti:
              </h3>
              <div className="grid sm:grid-cols-2 gap-6 text-sm">
                <div className="bg-white p-5 rounded-2xl border border-brand-100/50">
                  <h4 className="font-bold text-brand-900 mb-2 flex items-center gap-1.5">
                    🤝 Aprender a Delegar
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-xs">
                    No intentes asumir todas las responsabilidades del cuidado en solitario. Coordina con otros familiares turnos fijos o acude a centros de día profesionales.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-brand-100/50">
                  <h4 className="font-bold text-brand-900 mb-2 flex items-center gap-1.5">
                    🔀 Simplificación del Entorno
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-xs">
                    Adaptar el hogar mediante asideros, andadores o cubiertos adaptados reduce la dependencia de tu familiar, aliviando tu nivel de supervisión continua.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-brand-100/50">
                  <h4 className="font-bold text-brand-900 mb-2 flex items-center gap-1.5">
                    ⏳ El derecho al Auto-cuidado
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-xs">
                    Establece momentos sagrados en tu semana para tus aficiones, deporte o paseos sin interrupciones. Recuerda: *"Para poder cuidar bien, debes cuidarte tú primero"*.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-brand-100/50">
                  <h4 className="font-bold text-brand-900 mb-2 flex items-center gap-1.5">
                    🏥 Asesoramiento Técnico
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-xs">
                    Consulta con un terapeuta ocupacional de tu zona para reestructurar las actividades diarias del paciente y optimizar los esfuerzos en las transferencias físicas cotidianas.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center pt-6 border-t border-brand-50 flex gap-4 justify-center">
              <button
                onClick={resetZarit}
                className="px-8 py-4 bg-brand-900 hover:bg-brand-950 text-white font-bold rounded-2xl transition-all shadow-md active:scale-[0.98] cursor-pointer text-sm"
              >
                🔄 Reiniciar el Test
              </button>
              <button
                onClick={() => setCurrentView('menu')}
                className="px-6 py-4 bg-white border-2 border-brand-100 hover:border-brand-200 text-brand-700 font-bold rounded-2xl transition-colors cursor-pointer text-sm"
              >
                Volver a Recursos
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </section>
    );
  }

  // VISTA 4: CHATBOT PARA CUIDADORES
  if (currentView === 'chat') {
    return (
      <section id="caregiver-resources" className="pt-36 pb-24 px-4 bg-brand-50/50 min-h-screen">
        <div className="max-w-6xl mx-auto transition-all duration-300">
          <CaregiverSubNav currentView="chat" onViewChange={setCurrentView} />
          
          <div className="mb-8 text-center">
            <h2 className="font-display text-3xl font-bold text-brand-900 mb-2">
              Asistente del Cuidador
            </h2>
            <p className="text-gray-555 max-w-2xl mx-auto text-base">
              Pregunta de forma sencilla tus dudas cotidianas sobre el cuidado en casa, la movilidad del paciente o las adaptaciones. Límite de 5 preguntas por sesión.
            </p>
          </div>

          <CaregiverChatbotComponent />
        </div>
      </section>
    );
  }

  // VISTA 5: DIARIO DE REGISTRO DE CUIDADOS
  if (currentView === 'log') {
    return (
      <section id="caregiver-resources" className="pt-36 pb-24 px-4 bg-brand-50/50 min-h-screen">
        <div className="max-w-6xl mx-auto transition-all duration-300">
          <CaregiverSubNav currentView="log" onViewChange={setCurrentView} />
          
          <div className="mb-10 text-center">
            <span className="inline-block bg-amber-50 text-amber-800 font-bold text-xs px-3.5 py-1.5 rounded-xl uppercase tracking-wider mb-3">
              Seguimiento de Salud Doméstica
            </span>
            <h2 className="font-display text-3xl font-bold text-brand-900 mb-2">
              Diario de Registro de Cuidados
            </h2>
            <p className="text-gray-555 max-w-3xl mx-auto text-base mb-4 leading-relaxed font-medium">
              Lleva un control detallado del día a día de tu familiar. Anota tomas de medicamentos, descanso, alimentación y observaciones. Al final de la semana, genera un reporte clínico en PDF listo para imprimir o compartir en consultas médicas.
            </p>
          </div>

          <CareLogComponent />
        </div>
      </section>
    );
  }

  // VISTA 6: ORIENTADOR DE CASO REAL
  if (currentView === 'wizard') {
    return (
      <section id="caregiver-resources" className="pt-36 pb-24 px-4 bg-brand-50/50 min-h-screen">
        <div className="max-w-6xl mx-auto transition-all duration-300">
          <CaregiverSubNav currentView="wizard" onViewChange={setCurrentView} />
          
          <div className="mb-10 text-center">
            <span className="inline-block bg-emerald-50 text-emerald-800 font-bold text-xs px-3.5 py-1.5 rounded-xl uppercase tracking-wider mb-3">
              Recomendador Clínico Personalizado
            </span>
            <h2 className="font-display text-3xl font-bold text-brand-900 mb-2">
              Orientador de Caso Real
            </h2>
            <p className="text-gray-555 max-w-3xl mx-auto text-base mb-4 leading-relaxed font-medium">
              Selecciona la situación principal de tu familiar, la zona de la casa a adaptar y el nivel de ayuda para recibir un kit de recomendación de productos e instrucciones de seguridad en menos de un minuto.
            </p>
          </div>

          <CaregiverWizardComponent onGoToCatalog={() => setCurrentView('products')} />
        </div>
      </section>
    );
  }

  // VISTA 7: GENERADOR DE FICHAS E IMPRIMIBLES
  if (currentView === 'printables') {
    return (
      <section id="caregiver-resources" className="pt-36 pb-24 px-4 bg-brand-50/50 min-h-screen">
        <div className="max-w-6xl mx-auto transition-all duration-300">
          <CaregiverSubNav currentView="printables" onViewChange={setCurrentView} />
          
          <div className="mb-10 text-center">
            <span className="inline-block bg-blue-50 text-blue-800 font-bold text-xs px-3.5 py-1.5 rounded-xl uppercase tracking-wider mb-3">
              Herramientas Imprimibles Domésticas
            </span>
            <h2 className="font-display text-3xl font-bold text-brand-900 mb-2">
              Fichas e Imprimibles para el Hogar
            </h2>
            <p className="text-gray-555 max-w-3xl mx-auto text-base mb-4 leading-relaxed font-medium">
              Genera e imprime en un clic fichas de emergencia para imantar en la nevera, carteles visuales A4 para señalizar la vivienda y planificadores semanales de cuidados.
            </p>
          </div>

          <CaregiverPrintablesComponent />
        </div>
      </section>
    );
  }
};

function App() {
  const navigateTo = useCallback((page, section = null) => {
    if (page === 'caregiver_resources') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    let target = 'index.html';
    if (page === 'cognitive' || page === 'games') target = 'estimulacion-cognitiva.html';
    else if (page === 'guides') target = 'guias.html';
    else if (page === 'cv') target = 'cv.html';
    else if (page === 'analyzer') target = 'valoracion-estancia.html';
    else if (page === 'contact') target = 'contacto.html';
    else if (page === 'legal') target = 'aviso-legal.html';
    else if (page === 'resources') target = 'recursos.html';
    
    if (section) {
      target += '?section=' + section;
    }
    window.location.href = target;
  }, []);

  return (
    <>
      <Navbar currentPage="caregiver_resources" />
      <main id="main-content">
        <SectionCaregiverResources />
      </main>
      <Footer currentPage="caregiver_resources" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
