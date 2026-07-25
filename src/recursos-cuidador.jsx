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
    { id: 'products', title: 'Productos Recomendados', shortTitle: 'Productos', icon: '🛒', color: 'bg-accent-coral border-accent-coral' },
    { id: 'zarit', title: 'Test de Sobrecarga Zarit', shortTitle: 'Test Zarit', icon: '📋', color: 'bg-indigo-600 border-indigo-600' },
    { id: 'log', title: 'Diario de Registro', shortTitle: 'Diario', icon: '📝', color: 'bg-amber-600 border-amber-600' },
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
    <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-brand-100 overflow-hidden flex flex-col md:flex-row h-[550px] md:h-[700px] lg:h-[750px] relative anim-scale-in text-left">
      
      {/* Mobile backdrop overlay */}
      {showSidebarMobile && (
        <div 
          className="md:hidden absolute inset-0 bg-black/50 z-30 transition-opacity"
          onClick={() => setShowSidebarMobile(false)}
        ></div>
      )}
      
      {/* SIDEBAR */}
      <aside className={`w-72 border-r border-brand-100 bg-white flex flex-col shrink-0 transition-transform duration-300 z-45 md:relative md:translate-x-0 absolute inset-y-0 left-0
        ${showSidebarMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}`}>
        
        <div className="p-6 border-b border-brand-100 flex items-center justify-between">
          <h4 className="font-display text-lg font-bold text-brand-900">Historial de Consultas</h4>
          <button 
            onClick={() => setShowSidebarMobile(false)}
            className="md:hidden p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            ❌
          </button>
        </div>

        <div className="p-4">
          <button 
            onClick={() => {
              createNewSession();
              setShowSidebarMobile(false);
            }}
            className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-bold transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 text-sm cursor-pointer"
          >
            ➕ Nueva Consulta
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1.5 no-scrollbar">
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
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 shrink-0 transition-opacity">
                  <button
                    onClick={(e) => renameSession(s.id, e)}
                    className="p-1.5 rounded-lg text-gray-300 hover:text-teal-600 hover:bg-teal-50/80 transition-all cursor-pointer"
                    title="Renombrar consulta"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => deleteSession(s.id, e)}
                    className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                    title="Eliminar consulta"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col justify-between bg-white relative min-w-0">
        {/* Chat Header */}
        <div className="p-4 md:p-6 border-b border-brand-100 flex items-center justify-between bg-brand-50/10 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowSidebarMobile(o => !o)}
              className="md:hidden p-2 text-brand-900 hover:bg-brand-50 rounded-xl transition-all cursor-pointer"
            >
              ☰
            </button>
            <div>
              <h4 className="font-display text-lg font-bold text-brand-900 flex items-center gap-2">
                <span>💬</span> Asistente del Cuidador
              </h4>
              <p className="text-xs text-gray-500 font-medium">Límite de 5 preguntas por sesión • Respuestas sencillas y comprensibles</p>
            </div>
          </div>
          <span className="bg-teal-50 text-teal-700 font-bold text-xs px-3 py-1.5 rounded-xl border border-teal-100">
            Preguntas: {userQuestionsCount} / 5
          </span>
        </div>

        {/* Message Thread */}
        <div 
          ref={chatContainerRef}
          className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 md:space-y-6 bg-slate-50/30 no-scrollbar"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto py-4 md:py-12">
              <span className="text-3xl md:text-5xl mb-2 md:mb-4 animate-bounce">👋</span>
              <h5 className="font-display text-lg md:text-xl font-bold text-brand-900 mb-1 md:mb-2">¡Hola! Soy tu asistente de apoyo</h5>
              <p className="text-gray-555 text-xs md:text-base leading-relaxed mb-4 md:mb-6">
                Estoy aquí para orientarte en tus dudas diarias sobre el cuidado de tu familiar. Puedes preguntarme sobre técnicas de movilización sencillas, ayudas para el baño o simplemente buscar apoyo.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center mb-4 md:mb-8 w-full max-w-xs sm:max-w-none">
                <button 
                  onClick={() => handleSendMessage('¿Cómo puedo levantar de la cama a mi familiar sin hacerme daño en la espalda?')}
                  className="bg-white border border-brand-100 hover:border-teal-200 text-gray-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm hover:bg-brand-50/20 cursor-pointer text-left sm:text-center"
                >
                  🚶 Pauta para levantar de la cama
                </button>
                <button 
                  onClick={() => handleSendMessage('¿Qué adaptaciones o productos me recomiendas para duchar a mi familiar con seguridad?')}
                  className="bg-white border border-brand-100 hover:border-teal-200 text-gray-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm hover:bg-brand-50/20 cursor-pointer text-left sm:text-center"
                >
                  🛁 Adaptar el aseo
                </button>
              </div>

              {/* Warning Alert */}
              <div className="bg-amber-50/60 border border-amber-250/50 rounded-2xl p-3 text-left w-full flex gap-2.5 text-amber-900 text-[10px] md:text-[11px] leading-relaxed">
                <span className="text-sm shrink-0 select-none">⚠️</span>
                <div>
                  <strong className="font-bold block mb-0.5">Nota de orientación:</strong>
                  Las respuestas son generadas por Inteligencia Artificial con fines únicamente informativos y divulgativos. Consulta siempre con tu médico o terapeuta ocupacional antes de movilizaciones físicas o cambios de rutinas.
                </div>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => {
              const isUser = msg.sender === 'user';
              return (
                <div key={idx} className={`flex gap-3.5 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
                  {/* Avatar */}
                  <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center font-bold text-sm shadow-sm
                    ${isUser ? 'bg-brand-900 text-white' : 'bg-teal-600 text-white'}`}>
                    {isUser ? '👤' : '🤖'}
                  </div>
                  {/* Message body */}
                  <div className={`p-5 rounded-3xl text-base md:text-lg leading-relaxed border shadow-sm
                    ${isUser 
                      ? 'bg-brand-900 text-white border-transparent rounded-tr-none' 
                      : 'bg-white text-gray-800 border-brand-50 rounded-tl-none'}`}>
                    {isUser ? <p className="whitespace-pre-wrap">{msg.text}</p> : renderMessageText(msg.text)}
                  </div>
                </div>
              );
            })
          )}

          {isLoading && (
            <div className="flex gap-3.5 mr-auto">
              <div className="w-9 h-9 rounded-full bg-teal-600 text-white shrink-0 flex items-center justify-center font-bold text-sm shadow-sm">
                🤖
              </div>
              <div className="bg-white border border-brand-50 p-5 rounded-3xl rounded-tl-none flex items-center gap-2 shadow-sm">
                <span className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-bounce"></span>
                <span className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="bg-red-50 border-2 border-red-200 p-4 rounded-2xl text-red-700 text-xs font-bold flex items-center gap-2">
              <span>⚠️ Error: {errorMsg}</span>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-3 md:p-6 border-t border-brand-100 bg-white shrink-0">
          {isLimitReached ? (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-800 text-xs font-bold text-center leading-relaxed">
              🔒 Has alcanzado el límite de 5 consultas en esta sesión para evitar la sobrecarga del servicio. 
              <br />
              Para seguir chateando, por favor haz clic en <button onClick={createNewSession} className="text-teal-600 underline font-black cursor-pointer hover:text-teal-800">Nueva Consulta</button> e inicia una nueva sesión.
            </div>
          ) : (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-3"
            >
              <input
                type="text"
                placeholder={isLimitNear ? "Última pregunta de tu sesión..." : "Escribe tu consulta aquí..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-gray-50 border border-gray-250 focus:border-teal-500 focus:bg-white rounded-2xl px-4 py-3 md:px-5 md:py-4 text-sm md:text-base outline-none text-gray-700 transition-all font-medium"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-4 py-3 md:px-6 md:py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-bold transition-all shadow-md flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-sm"
              >
                <span>Enviar</span>
                <span>➔</span>
              </button>
            </form>
          )}
          <p className="text-[10px] text-gray-400 text-center mt-3 max-w-lg mx-auto font-medium leading-normal">
            Las respuestas de esta IA son meramente orientativas. Consulta siempre con un profesional sanitario o terapeuta ocupacional especialista antes de proceder con transferencias físicas o pautas médicas.
          </p>
        </div>
      </div>
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
    if (['products', 'zarit', 'log', 'chat'].includes(tool)) {
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

  // VISTA 1: MENÚ PRINCIPAL
  if (currentView === 'menu') {
    return (
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-10 mb-12">
          <span className="inline-block bg-brand-100 text-brand-700 rounded-full px-5 py-2 text-sm font-bold uppercase tracking-widest mb-4">
            Área del Cuidador
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-900 mb-6">
            Recursos para el Cuidador
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Cuidar de un ser querido es una labor extraordinaria que requiere orientación y herramientas prácticas. A continuación, selecciona el apartado técnico que desees consultar para acceder a guías, asistentas e inventarios recomendados por profesionales.
          </p>
        </div>

        <hr className="border-brand-100 mb-12" />

        {/* Rejilla de Apartados */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Apartado 1: Catálogo de Productos (Activo) */}
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
                <span className="text-brand-400 font-bold uppercase tracking-widest text-[10px] mb-3 block">Catálogo</span>
                <h3 className="font-display text-xl font-bold text-brand-900 mb-4 group-hover:text-brand-650 transition-colors">Productos Recomendados</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Catálogo e inventario interactivo de ayudas técnicas y productos de apoyo recomendados. Encuentra descripciones detalladas sobre cómo cada producto puede facilitar el aseo, el descanso y la movilidad.
                </p>
                <ul className="list-disc pl-5 mb-6 text-xs text-gray-400 text-left space-y-1">
                  <li>Buscador y filtros interactivos instantáneos</li>
                  <li>Explicación clínica de uso para cada producto</li>
                  <li>Enlaces de acceso rápido referenciados</li>
                </ul>
              </div>
              <div className="inline-flex items-center justify-center gap-2 text-accent-coral font-bold group-hover:gap-3 transition-all text-sm pt-4 border-t border-gray-100">
                Abrir Catálogo de Productos &rarr;
              </div>
            </div>
          </article>

          {/* Apartado 2: Test de Zarit (Activo) */}
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
                <span className="text-brand-400 font-bold uppercase tracking-widest text-[10px] mb-3 block">Evaluación</span>
                <h3 className="font-display text-xl font-bold text-brand-900 mb-4 group-hover:text-brand-650 transition-colors">Test de Zarit</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  La escala científica original de 22 preguntas de Zarit diseñada para medir objetivamente la sobrecarga del cuidador y diagnosticar de forma precoz el desgaste físico y mental.
                </p>
                <ul className="list-disc pl-5 mb-6 text-xs text-gray-400 text-left space-y-1">
                  <li>Cuestionario oficial de 22 preguntas completas</li>
                  <li>Paginación interactiva cómoda paso a paso</li>
                  <li>Resultados dinámicos y recomendaciones de autocuidado</li>
                </ul>
              </div>
              <div className="inline-flex items-center justify-center gap-2 text-indigo-600 font-bold group-hover:gap-3 transition-all text-sm pt-4 border-t border-gray-100">
                Realizar Test de Zarit &rarr;
              </div>
            </div>
          </article>

          {/* Apartado 3: Asistente del Cuidador (Activo) */}
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
                <span className="text-brand-400 font-bold uppercase tracking-widest text-[10px] mb-3 block">Asistente IA</span>
                <h3 className="font-display text-xl font-bold text-brand-900 mb-4 group-hover:text-brand-650 transition-colors">Asistente del Cuidador</h3>
                <p className="text-gray-550 text-sm leading-relaxed mb-6">
                  Nuestro asistente virtual con Inteligencia Artificial. Haz consultas empáticas y sencillas sobre movilizaciones, adaptaciones del hogar y consejos prácticos del día a día.
                </p>
                <ul className="list-disc pl-5 mb-6 text-xs text-gray-400 text-left space-y-1">
                  <li>Respuestas sencillas, directas y sin tecnicismos</li>
                  <li>Sugerencias de productos y enlaces de la web</li>
                  <li>Límite de 5 preguntas por sesión de consulta</li>
                </ul>
              </div>
              <div className="inline-flex items-center justify-center gap-2 text-teal-600 font-bold group-hover:gap-3 transition-all text-sm pt-4 border-t border-gray-100">
                Consultar al Asistente &rarr;
              </div>
            </div>
          </article>

          {/* Apartado 4: Diario de Registro (Activo) */}
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
                <span className="text-brand-400 font-bold uppercase tracking-widest text-[10px] mb-3 block">Seguimiento</span>
                <h3 className="font-display text-xl font-bold text-brand-900 mb-4 group-hover:text-brand-650 transition-colors">Diario de Registro</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Registra de forma interactiva la toma de medicación, horas de sueño, hidratación y estado de ánimo de tu familiar para no pasar por alto ningún detalle de salud.
                </p>
                <ul className="list-disc pl-5 mb-6 text-xs text-gray-400 text-left space-y-1">
                  <li>Formulario de métricas y constantes básicas</li>
                  <li>Persistencia local en el dispositivo del cuidador</li>
                  <li>Generación instantánea de reporte PDF para el médico</li>
                </ul>
              </div>
              <div className="inline-flex items-center justify-center gap-2 text-amber-600 font-bold group-hover:gap-3 transition-all text-sm pt-4 border-t border-gray-100">
                Ver Diario de Registro &rarr;
              </div>
            </div>
          </article>
        </div>
      </section>
    );
  }

  // VISTA 2: CATÁLOGO DE PRODUCTOS RECOMENDADOS
  if (currentView === 'products') {
    return (
      <section className="max-w-7xl mx-auto px-4 py-8">
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
      <section className="max-w-7xl mx-auto px-4 py-8">
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
    </section>
    );
  }

  // VISTA 4: CHATBOT PARA CUIDADORES
  if (currentView === 'chat') {
    return (
      <section className="max-w-7xl mx-auto px-4 py-8">
        <CaregiverSubNav currentView="chat" onViewChange={setCurrentView} />
        
        <div className="max-w-6xl mx-auto">
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
      <section className="max-w-7xl mx-auto px-4 py-8">
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
      <main id="main-content" className="pt-36 pb-12">
        <SectionCaregiverResources />
      </main>
      <Footer currentPage="caregiver_resources" />
      <CookieBanner />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
