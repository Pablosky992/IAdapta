(function() {
const {
  Icons,
  Navbar,
  Footer,
  CookieBanner,
  PRODUCT_CATALOG,
  getAmazonLink
} = window;
const {
  useState,
  useEffect,
  useRef
} = React;
const SectionAnalyzer = function SectionAnalyzer({
  isTeaser,
  isStandalone
}) {
  const [step, setStep] = useState('form');
  const [score, setScore] = useState(0);
  const [ringOffset, setRingOffset] = useState(283);
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    edad: '',
    tipo: '',
    ascensor: '',
    anchoAscensor: '',
    largoAscensor: '',
    tipoBanyo: '',
    barras: '',
    alzaWC: '',
    iluminacion: '',
    puertas: '',
    movilidad: '',
    nivelMovilidad: '',
    destrezaManos: '',
    caidas: '',
    percepcionSeguridad: 5,
    convivencia: '',
    limitaciones: [],
    notas: ''
  });

  // New States for AI Image Analysis
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [base64, setBase64] = useState(null);
  const [aiResponse, setAiResponse] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [aiError, setAiError] = useState('');
  const [savedReports, setSavedReports] = useState([]);
  const [limitacionesOpen, setLimitacionesOpen] = useState(false);
  const resultRef = useRef(null);
  const topRef = useRef(null);
  useEffect(() => {
    if (step === 'results' && resultRef.current) {
      setTimeout(() => {
        resultRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, [step]);

  // Cargar historial al inicio
  useEffect(() => {
    const localData = localStorage.getItem('iadapta_reports');
    if (localData) {
      try {
        setSavedReports(JSON.parse(localData));
      } catch (e) {}
    }
  }, []);

  // Guardar informe en el historial
  const saveToHistory = (dataText, sc) => {
    const newReport = {
      id: Date.now(),
      date: new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      score: sc,
      aiResponse: dataText,
      form: {
        ...form
      }
    };
    const updated = [newReport, ...savedReports].slice(0, 10);
    setSavedReports(updated);
    localStorage.setItem('iadapta_reports', JSON.stringify(updated));
  };

  // Auto-guardado de borrador
  useEffect(() => {
    const draft = localStorage.getItem('iadapta_draft');
    if (draft) {
      try {
        setForm(JSON.parse(draft));
      } catch (e) {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('iadapta_draft', JSON.stringify(form));
  }, [form]);
  const loadFromHistory = report => {
    setForm(report.form);
    setAiResponse(report.aiResponse);
    setScore(report.score);
    setStep('results');
    setTimeout(() => setRingOffset(283 - 283 * report.score / 100), 100);
  };
  const deleteFromHistory = (e, id) => {
    e.stopPropagation();
    const updated = savedReports.filter(r => r.id !== id);
    setSavedReports(updated);
    localStorage.setItem('iadapta_reports', JSON.stringify(updated));
  };
  const handleChange = e => setForm(f => ({
    ...f,
    [e.target.name]: e.target.value
  }));
  const toggleLimitacion = val => {
    setForm(f => {
      const current = f.limitaciones || [];
      if (current.includes(val)) {
        return {
          ...f,
          limitaciones: current.filter(v => v !== val)
        };
      } else {
        if (current.length >= 3) return f;
        return {
          ...f,
          limitaciones: [...current, val]
        };
      }
    });
  };
  const handleDragOver = e => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = e => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = e => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  const handleFileSelect = e => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  const handleFile = selectedFile => {
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Str = reader.result;

      // Compresión inmediata al cargar
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_SIZE = 800;
        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const optimized = canvas.toDataURL('image/jpeg', 0.6); // 60% calidad para ligereza total
        setBase64(optimized.split(',')[1]);
      };
    };
    reader.readAsDataURL(selectedFile);
  };
  const removeFile = () => {
    setFile(null);
    setPreview(null);
    setBase64(null);
  };
  const calcScore = () => {
    let pts = 60;
    if (form.tipoBanyo === 'ducha') pts += 10;
    if (form.iluminacion === 'buena') pts += 10;else if (form.iluminacion === 'media') pts += 5;
    if (form.puertas === 'ancha') pts += 10;else if (form.puertas === 'estandar') pts += 5;
    if (form.ascensor === 'no') pts -= 10;
    if (form.anchoAscensor === 'estrecha' || form.puertas === 'estrecha') pts -= 15;
    if (form.nivelMovilidad === 'asistencia' || form.nivelMovilidad === 'encamado') pts -= 15;
    if (form.destrezaManos === 'temblor' || form.destrezaManos === 'no-funcional') pts -= 5;
    if (form.caidas === 'si') pts -= 15;
    if (form.percepcionSeguridad && parseInt(form.percepcionSeguridad) < 5) pts -= 10;
    return Math.max(0, Math.min(pts, 100));
  };
  const getRecommendations = sc => {
    const all = [];

    // Lógica de Espacios Críticos
    if (form.puertas === 'estrecha' || form.ascensor === 'si' && form.anchoAscensor === 'estrecha') {
      all.push({
        cond: true,
        icon: '⚠️',
        prio: 'Alta',
        text: 'AVISO DE ACCESIBILIDAD PRIORITARIO: Tus pasos de puerta o el acceso al ascensor son reducidos (≤ 60 cm). Antes de comprar cualquier silla o andador, asegúrate de que el ancho total del producto no supere los 55 cm para garantizar un paso seguro y sin colisiones.'
      });
    }
    if (form.caidas === 'si') {
      const fear = parseInt(form.percepcionSeguridad) || 5;
      let mobilityAdvice = '';
      let link = {
        text: 'Ver ayudas a la marcha',
        id: '15'
      };
      if (fear <= 3) {
        mobilityAdvice = ' Dada la frecuencia de caídas y tu baja seguridad, es fundamental valorar el uso de un andador (rollator) que proporcione una base de apoyo estable.';
        link = {
          text: 'Ver andadores recomendados',
          id: '15'
        };
      } else {
        mobilityAdvice = ' Debido a los tropiezos recientes, el uso de unas muletas ergonómicas con apoyo de antebrazo te proporcionará el apoyo extra necesario sin sobrecargar tus muñecas.';
        link = {
          text: 'Ver muletas ergonómicas',
          id: '17'
        };
      }
      const prod = PRODUCT_CATALOG[link.id];
      all.push({
        cond: true,
        icon: '🚨',
        prio: 'Alta',
        text: `ALERTA DE SEGURIDAD: Al haber sufrido caídas recientemente, el riesgo de recidiva es muy alto. Es URGENTE eliminar alfombras y mejorar la iluminación.${mobilityAdvice}`,
        linkText: link.text,
        linkUrl: getAmazonLink(prod.query, prod.url)
      });
    }
    if (form.percepcionSeguridad && parseInt(form.percepcionSeguridad) < 5) {
      all.push({
        cond: true,
        icon: '😟',
        prio: 'Media',
        text: 'ATENCIÓN MULTIDISCIPLINAR: Una baja percepción de seguridad (miedo a caer) provoca una reducción de la actividad que debilita los músculos y aumenta el riesgo real de caída. Te recomendamos consultar con un equipo de profesionales (Terapeuta Ocupacional, Fisioterapeuta y Psicólogo) para realizar un entrenamiento integral de equilibrio, fuerza y gestión del miedo.'
      });
    }
    if (form.convivencia === 'solo' && form.caidas === 'si') {
      all.push({
        cond: true,
        icon: '🏠',
        prio: 'Alta',
        text: 'SEGURIDAD DOMICILIARIA: Al vivir solo y haber tenido caídas, es IMPRESCINDIBLE contar con un sistema de teleasistencia o un dispositivo de detección de caídas. Esto garantiza que, en caso de incidente, el aviso a los servicios de emergencia o familiares sea automático e inmediato.'
      });
    }
    if (form.limitaciones && form.limitaciones.includes('fatiga')) {
      all.push({
        cond: true,
        icon: '🫁',
        prio: 'Media',
        text: 'GESTIÓN DE LA ENERGÍA: Al identificar la fatiga como limitación principal, es vital aplicar técnicas de simplificación de tareas. Realiza las actividades sentado (higiene, cocina) y planifica periodos de descanso breves pero frecuentes para evitar el agotamiento que aumenta el riesgo de caídas.'
      });
    }
    if (form.ascensor === 'no') {
      all.push({
        cond: true,
        icon: '🏢',
        prio: 'Alta',
        text: 'Al no disponer de ascensor, la accesibilidad exterior es crítica. Te recomendamos valorar con la comunidad de vecinos o propietarios la instalación de soluciones como un ascensor, salvaescaleras o rampas normativas para garantizar una entrada y salida del hogar segura y sin barreras.'
      });
    }

    // Lógica de Baño
    if (form.tipoBanyo === 'banera') {
      const prod = PRODUCT_CATALOG['1'];
      all.push({
        cond: true,
        icon: '🚿',
        prio: 'Alta',
        text: 'Al disponer de bañera, el riesgo de caída al intentar salvar el borde es elevado. Te recomendamos el uso de una Tabla de Bañera. Este dispositivo permite realizar la entrada y salida sentado, eliminando la necesidad de mantener el equilibrio a una sola pierna mientras se supera el obstáculo.',
        linkText: 'Ver tabla de bañera recomendada',
        linkUrl: getAmazonLink(prod.query, prod.url)
      });
    } else if (form.tipoBanyo === 'ducha') {
      const prod = PRODUCT_CATALOG['2'];
      all.push({
        cond: true,
        icon: '🚿',
        prio: 'Media',
        text: 'Contar con ducha es un gran paso, pero para una higiene segura y sin fatiga, es fundamental realizarla en sedestación. Un asiento o banqueta de ducha te proporcionará la estabilidad necesaria y evitará resbalones por cansancio durante el aseo.',
        linkText: 'Ver asiento de ducha',
        linkUrl: getAmazonLink(prod.query, prod.url)
      });
    }

    // Otras recomendaciones
    if (form.iluminacion !== 'buena' && form.iluminacion !== '') {
      all.push({
        cond: true,
        icon: '💡',
        prio: 'Media',
        text: 'Consejo Técnico: Una iluminación deficiente es precursora de tropiezos. Instala luces automáticas con sensor de movimiento cerca del suelo en los trayectos nocturnos para asegurar una visibilidad clara sin necesidad de buscar interruptores.'
      });
    }
    if (form.movilidad === 'baston' || form.movilidad === 'andador') {
      const prod = PRODUCT_CATALOG['16'];
      all.push({
        cond: true,
        icon: '🦯',
        prio: 'Alta',
        text: 'Seguridad en la Marcha: Es vital retirar todas las alfombras y obstáculos. Verifica que las conteras de tu ayuda técnica no estén gastadas; sustituirlas por modelos antideslizantes de base ancha mejorará drásticamente tu estabilidad.',
        linkText: 'Ver conteras antideslizantes',
        linkUrl: getAmazonLink(prod.query, prod.url)
      });
    }
    if (form.destrezaManos === 'fina' || form.destrezaManos === 'fuerza' || form.destrezaManos === 'temblor') {
      const prod = PRODUCT_CATALOG['9'];
      all.push({
        cond: true,
        icon: '🍴',
        prio: 'Media',
        text: 'AUTONOMÍA EN ALIMENTACIÓN: Al detectar dificultades en la destreza manual, el uso de cubiertos con mango engrosado y platos con reborde facilitará tu independencia durante las comidas, reduciendo el esfuerzo y la frustración.',
        linkText: 'Ver cubiertos adaptados',
        linkUrl: getAmazonLink(prod.query, prod.url)
      });
    }
    return all;
  };
  const getPositiveFindings = () => {
    const positives = [];
    if (form.tipoBanyo === 'ducha') positives.push({
      icon: '✅',
      text: 'Dispones de plato de ducha, lo que facilita enormemente el acceso y reduce el riesgo de tropiezos comparado con una bañera.'
    });
    if (form.iluminacion === 'buena') positives.push({
      icon: '✅',
      text: 'La buena iluminación detectada es fundamental para la seguridad visual y la prevención de caídas.'
    });
    if (form.puertas === 'ancha') positives.push({
      icon: '✅',
      text: 'Tus puertas anchas garantizan un paso fluido y son compatibles con la mayoría de ayudas técnicas.'
    });
    if (form.nivelMovilidad === 'independiente') positives.push({
      icon: '✅',
      text: 'Tu nivel de independencia actual es un gran activo; las adaptaciones ayudarán a preservarlo por más tiempo.'
    });
    return positives;
  };
  const isQuestionnaireComplete = () => {
    const requiredFields = ['nombre', 'email', 'edad', 'tipo', 'ascensor', 'tipoBanyo', 'iluminacion', 'puertas', 'movilidad', 'nivelMovilidad', 'destrezaManos', 'caidas', 'percepcionSeguridad', 'convivencia'];
    const basicComplete = requiredFields.every(field => form[field] !== '');
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email || '');
    const limitationsComplete = form.limitaciones && form.limitaciones.length > 0;
    return basicComplete && emailValid && limitationsComplete;
  };
  const prioBadge = {
    Alta: 'bg-red-100 text-red-700',
    Media: 'bg-amber-100 text-amber-700',
    Info: 'bg-brand-100 text-brand-700'
  };
  const handleAnalyze = async e => {
    e.preventDefault();
    if (!isQuestionnaireComplete()) {
      setAiError("Por favor, completa todas las preguntas del cuestionario antes de realizar el análisis por IA.");
      return;
    }
    setStep('loading');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setAiError('');
    setAiResponse('');
    const sc = calcScore();

    // Guardar automáticamente todas las respuestas y el email en Firebase Firestore
    if (window.firebaseDB && window.firebaseAddDoc && window.firebaseCollection) {
      window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, "respuestas_cuestionarios"), {
        email: form.email,
        nombre: form.nombre,
        edad: parseInt(form.edad) || null,
        tipo: form.tipo,
        ascensor: form.ascensor,
        anchoAscensor: form.anchoAscensor || null,
        largoAscensor: form.largoAscensor || null,
        tipoBanyo: form.tipoBanyo,
        iluminacion: form.iluminacion || null,
        puertas: form.puertas || null,
        movilidad: form.movilidad || null,
        nivelMovilidad: form.nivelMovilidad || null,
        destrezaManos: form.destrezaManos || null,
        caidas: form.caidas,
        percepcionSeguridad: parseInt(form.percepcionSeguridad) || 5,
        convivencia: form.convivencia,
        limitaciones: form.limitaciones || [],
        notas: form.notas || '',
        score: sc,
        fecha: new Date().toISOString()
      }).then(() => {
        console.log("Respuestas del cuestionario guardadas con éxito en Firebase Firestore.");
      }).catch(dbErr => {
        console.error("Error al guardar en Firebase Firestore:", dbErr);
      });
    }
    if (base64) {
      try {
        const response = await fetch('/api/analyze?t=' + Date.now(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            base64: base64,
            mimeType: 'image/jpeg',
            answers: form
          })
        });
        const textResponse = await response.text();
        let data;
        try {
          data = JSON.parse(textResponse);
        } catch (jsonErr) {
          console.error("Error al parsear JSON:", textResponse);
          throw new Error("El servidor no respondió en formato JSON. Respuesta técnica: " + textResponse.substring(0, 150));
        }
        if (data.error) throw new Error(data.error);
        if (data.text) {
          let formatted = data.text.replace(/^[#]{2,3}\s?(.*?)$/gm, '<h3 class="text-xl font-bold text-indigo-900 mt-6 mb-3 border-b border-indigo-100 pb-2">$1</h3>');
          formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          formatted = formatted.replace(/^\*\s/gm, '• ');
          const disclaimerText = "Este análisis ha sido generado mediante Inteligencia Artificial (modelo Gemini 2.0 Flash) en fase de pruebas. La información proporcionada es orientativa y puede contener errores. Debe ser validada por un profesional cualificado antes de realizar cualquier cambio estructural.";
          if (formatted.includes(disclaimerText)) {
            formatted = formatted.replace(disclaimerText, `<div class="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 text-amber-800 italic text-base leading-relaxed">${disclaimerText}</div>`);
          }
          setAiResponse(formatted);
          setStep('results');
          saveToHistory(formatted, sc);
        } else {
          throw new Error('No se pudo generar una respuesta.');
        }
      } catch (err) {
        console.error(err);
        setAiError(err.message || 'Error al procesar la imagen con la IA.');
        setStep('results');
      }
    } else {
      setStep('results');
    }
    setScore(sc);
    setTimeout(() => setRingOffset(283 - 283 * sc / 100), 100);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 200);
  };
  const reset = () => {
    setStep('form');
    setScore(0);
    setRingOffset(283);
    const emptyForm = {
      nombre: '',
      email: '',
      edad: '',
      tipo: '',
      ascensor: '',
      anchoAscensor: '',
      largoAscensor: '',
      tipoBanyo: '',
      iluminacion: '',
      puertas: '',
      movilidad: '',
      nivelMovilidad: '',
      destrezaManos: '',
      caidas: '',
      percepcionSeguridad: 5,
      convivencia: '',
      limitaciones: [],
      notas: ''
    };
    setForm(emptyForm);
    localStorage.removeItem('iadapta_draft');
    setFile(null);
    setPreview(null);
    setBase64(null);
    setAiResponse('');
    setAiError('');
  };
  const scoreColor = score >= 75 ? '#22c55e' : score >= 45 ? '#f59e0b' : '#ef4444';
  const scoreLabel = score >= 75 ? 'Buena accesibilidad' : score >= 45 ? 'Accesibilidad mejorable' : 'Accesibilidad limitada';
  const fieldClass = "w-full border-2 border-brand-200 rounded-xl px-4 py-3 text-lg text-gray-800 bg-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all appearance-none";
  const labelClass = "block text-base font-bold text-brand-800 mb-2";
  return /*#__PURE__*/React.createElement("section", {
    id: "analyzer-full",
    ref: topRef,
    className: `pt-36 pb-24 px-4 ${isStandalone ? 'pt-36' : ''} bg-gradient-to-b from-sky-50 to-white min-h-screen`
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-14"
  }, isStandalone && /*#__PURE__*/React.createElement("button", {
    onClick: () => window.close(),
    className: "mb-8 inline-flex items-center gap-2 text-sky-600 font-bold hover:text-sky-800 transition-colors"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-5 h-5 rotate-180",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2.5",
    d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
  })), "Cerrar ventana"), /*#__PURE__*/React.createElement("span", {
    className: "inline-block bg-sky-100 text-sky-700 rounded-full px-5 py-2 text-base font-bold uppercase tracking-widest mb-4"
  }, "Inteligencia Artificial"), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-4xl sm:text-5xl font-bold text-brand-900 mb-4"
  }, "Valoraci\xF3n de la estancia"), /*#__PURE__*/React.createElement("div", {
    className: "section-divider w-24 mx-auto mb-6"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed"
  }, "El primer paso para lograr un hogar seguro es saber qu\xE9 elementos limitan la autonom\xEDa. Sube una fotograf\xEDa de cualquier estancia (el ba\xF1o, la cocina o el acceso a la vivienda) o completa nuestro cuestionario manual. Nuestro sistema analizar\xE1 el espacio para detectar posibles riesgos y te ofrecer\xE1 recomendaciones pr\xE1cticas y productos de apoyo espec\xEDficos para mejorar tu calidad de vida."), savedReports.length > 0 && step === 'form' && /*#__PURE__*/React.createElement("div", {
    className: "mb-10 p-6 bg-white border-2 border-indigo-100 rounded-3xl shadow-sm text-left"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.History, null), " Mis Informes Guardados"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-4"
  }, savedReports.map(report => /*#__PURE__*/React.createElement("div", {
    key: report.id,
    onClick: () => loadFromHistory(report),
    className: "p-4 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-2xl cursor-pointer transition-all group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-bold text-indigo-800"
  }, report.date), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold px-2 py-1 bg-white text-indigo-600 rounded-lg shadow-sm"
  }, "Puntuaci\xF3n: ", report.score, "/100")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-indigo-600 group-hover:text-indigo-800 transition-colors"
  }, "Click para ver detalles del informe")))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (window.confirm('¿Estás seguro de que deseas eliminar todo el historial de informes?')) {
        localStorage.removeItem('iadapta_reports');
        setSavedReports([]);
      }
    },
    className: "mt-4 text-xs text-red-500 hover:text-red-700 underline"
  }, "Borrar todo el historial"))), step === 'form' && /*#__PURE__*/React.createElement("div", {
    className: "anim-fade-up"
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: handleAnalyze,
    className: "bg-white rounded-3xl border border-brand-100 shadow-xl p-8 md:p-10 anim-scale-in",
    noValidate: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-10"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-brand-900 mb-4 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Brain, null), " An\xE1lisis Visual"), !file ? /*#__PURE__*/React.createElement("div", {
    className: `border-3 border-dashed rounded-2xl p-10 text-center transition-all ${isDragging ? 'border-brand-500 bg-brand-50' : 'border-gray-300 hover:border-brand-400 bg-gray-50'}`,
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-12 h-12 text-gray-400 mx-auto mb-4",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-lg font-semibold text-gray-700 mb-2"
  }, "Arrastra aqu\xED una foto de tu estancia"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mb-4"
  }, "o pulsa para seleccionarla desde tu dispositivo"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap justify-center gap-4"
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*",
    onChange: handleFileSelect,
    className: "hidden",
    id: "file-upload"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "file-upload",
    className: "inline-block px-6 py-3 bg-white border-2 border-brand-200 text-brand-700 font-bold rounded-xl cursor-pointer hover:bg-brand-50 transition-colors shadow-sm"
  }, "Seleccionar Archivo"), /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*",
    capture: "environment",
    onChange: handleFileSelect,
    className: "hidden",
    id: "camera-upload"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "camera-upload",
    className: "inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-bold rounded-xl cursor-pointer hover:bg-brand-700 transition-colors shadow-lg"
  }, /*#__PURE__*/React.createElement(Icons.Brain, {
    className: "w-5 h-5 text-white"
  }), "Hacer Foto"))) : /*#__PURE__*/React.createElement("div", {
    className: "relative border border-brand-200 rounded-2xl p-4 bg-brand-50 flex flex-col items-center"
  }, /*#__PURE__*/React.createElement("img", {
    src: preview,
    alt: "Vista previa",
    className: "max-h-64 rounded-xl shadow-md mb-4 object-contain"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-brand-800"
  }, file.name), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: removeFile,
    className: "mt-2 text-red-600 hover:text-red-800 text-sm font-bold underline"
  }, "Quitar imagen"))), /*#__PURE__*/React.createElement("hr", {
    className: "my-10 border-brand-100"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-brand-900 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Check, null), " Cuestionario Manual"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      if (window.confirm('¿Deseas borrar todas las respuestas introducidas?')) reset();
    },
    className: "text-xs font-bold text-brand-400 hover:text-red-500 transition-colors flex items-center gap-1 bg-brand-50 px-3 py-1.5 rounded-lg border border-brand-100"
  }, /*#__PURE__*/React.createElement(Icons.Refresh, {
    className: "w-3.5 h-3.5"
  }), " Limpiar borrador")), /*#__PURE__*/React.createElement("div", {
    className: "grid sm:grid-cols-2 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sm:col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: labelClass
  }, "Tu Nombre"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "nombre",
    value: form.nombre,
    onChange: handleChange,
    placeholder: "Ej: Mar\xEDa Garc\xEDa",
    className: fieldClass,
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "sm:col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: labelClass
  }, "Correo Electr\xF3nico"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    name: "email",
    value: form.email || '',
    onChange: handleChange,
    placeholder: "Ej: maria@correo.com",
    className: fieldClass,
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "sm:col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: labelClass
  }, "Edad"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "edad",
    value: form.edad,
    onChange: handleChange,
    placeholder: "Ej: 75",
    className: fieldClass,
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: labelClass
  }, "Tipo de vivienda"), /*#__PURE__*/React.createElement("select", {
    name: "tipo",
    value: form.tipo,
    onChange: handleChange,
    className: fieldClass,
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 Selecciona \u2014"), /*#__PURE__*/React.createElement("option", {
    value: "piso"
  }, "Piso"), /*#__PURE__*/React.createElement("option", {
    value: "casa"
  }, "Casa"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: labelClass
  }, "\xBFDispone de ascensor?"), /*#__PURE__*/React.createElement("select", {
    name: "ascensor",
    value: form.ascensor,
    onChange: handleChange,
    className: fieldClass
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 Selecciona \u2014"), /*#__PURE__*/React.createElement("option", {
    value: "si"
  }, "S\xED"), /*#__PURE__*/React.createElement("option", {
    value: "no"
  }, "No"), /*#__PURE__*/React.createElement("option", {
    value: "no-precisa"
  }, "No precisa (p. baja)"))), form.ascensor === 'si' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "anim-fade-in"
  }, /*#__PURE__*/React.createElement("label", {
    className: labelClass
  }, "Ancho de puerta del ascensor"), /*#__PURE__*/React.createElement("select", {
    name: "anchoAscensor",
    value: form.anchoAscensor,
    onChange: handleChange,
    className: fieldClass
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 Selecciona \u2014"), /*#__PURE__*/React.createElement("option", {
    value: "estrecha"
  }, "< 60 cm (Estrecha)"), /*#__PURE__*/React.createElement("option", {
    value: "estandar"
  }, "60-70 cm (Est\xE1ndar)"), /*#__PURE__*/React.createElement("option", {
    value: "ancha"
  }, "> 70 cm (Ancha)"))), /*#__PURE__*/React.createElement("div", {
    className: "anim-fade-in"
  }, /*#__PURE__*/React.createElement("label", {
    className: labelClass
  }, "Largo del interior del ascensor"), /*#__PURE__*/React.createElement("select", {
    name: "largoAscensor",
    value: form.largoAscensor,
    onChange: handleChange,
    className: fieldClass
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 Selecciona \u2014"), /*#__PURE__*/React.createElement("option", {
    value: "estrecho"
  }, "< 80 cm (Estrecho)"), /*#__PURE__*/React.createElement("option", {
    value: "medio"
  }, "80-95 cm"), /*#__PURE__*/React.createElement("option", {
    value: "grande"
  }, "> 95 cm")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: labelClass
  }, "\xBFTiene ba\xF1era o ducha?"), /*#__PURE__*/React.createElement("select", {
    name: "tipoBanyo",
    value: form.tipoBanyo,
    onChange: handleChange,
    className: fieldClass,
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 Selecciona \u2014"), /*#__PURE__*/React.createElement("option", {
    value: "banera"
  }, "Ba\xF1era"), /*#__PURE__*/React.createElement("option", {
    value: "ducha"
  }, "Ducha"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: labelClass
  }, "Ancho de puertas de la casa"), /*#__PURE__*/React.createElement("select", {
    name: "puertas",
    value: form.puertas,
    onChange: handleChange,
    className: fieldClass
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 Selecciona \u2014"), /*#__PURE__*/React.createElement("option", {
    value: "estrecha"
  }, "\u2264 60 cm (Estrecha)"), /*#__PURE__*/React.createElement("option", {
    value: "estandar"
  }, "60-70 cm (Est\xE1ndar)"), /*#__PURE__*/React.createElement("option", {
    value: "ancha"
  }, "> 70 cm (Ancha)"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: labelClass
  }, "Iluminaci\xF3n general"), /*#__PURE__*/React.createElement("select", {
    name: "iluminacion",
    value: form.iluminacion,
    onChange: handleChange,
    className: fieldClass
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 Selecciona \u2014"), /*#__PURE__*/React.createElement("option", {
    value: "buena"
  }, "Buena (luz natural + artificial)"), /*#__PURE__*/React.createElement("option", {
    value: "media"
  }, "Media (algunas zonas oscuras)"), /*#__PURE__*/React.createElement("option", {
    value: "mala"
  }, "Insuficiente / deficiente"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: labelClass
  }, "Ayuda t\xE9cnica que usas"), /*#__PURE__*/React.createElement("select", {
    name: "movilidad",
    value: form.movilidad,
    onChange: handleChange,
    className: fieldClass
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 Selecciona \u2014"), /*#__PURE__*/React.createElement("option", {
    value: "ninguna"
  }, "Ninguna"), /*#__PURE__*/React.createElement("option", {
    value: "baston"
  }, "Bast\xF3n"), /*#__PURE__*/React.createElement("option", {
    value: "andador"
  }, "Andador"), /*#__PURE__*/React.createElement("option", {
    value: "silla"
  }, "Silla de ruedas"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: labelClass
  }, "\xBFCa\xEDdas en los \xFAltimos 12 meses?"), /*#__PURE__*/React.createElement("select", {
    name: "caidas",
    value: form.caidas,
    onChange: handleChange,
    className: fieldClass,
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 Selecciona \u2014"), /*#__PURE__*/React.createElement("option", {
    value: "si"
  }, "S\xED, he tenido alg\xFAn tropiezo o ca\xEDda"), /*#__PURE__*/React.createElement("option", {
    value: "no"
  }, "No, ninguna"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: labelClass
  }, "Seguridad al caminar (1-10)"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    name: "percepcionSeguridad",
    min: "1",
    max: "10",
    value: form.percepcionSeguridad || '5',
    onChange: handleChange,
    className: `flex-1 h-2 rounded-lg appearance-none cursor-pointer accent-current ${(form.percepcionSeguridad || 5) <= 3 ? 'text-red-500' : (form.percepcionSeguridad || 5) <= 6 ? 'text-amber-500' : 'text-green-500'}`,
    style: {
      backgroundColor: '#e5e7eb'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: `w-12 h-12 flex items-center justify-center font-bold rounded-xl text-xl border-2 shadow-sm transition-colors ${(form.percepcionSeguridad || 5) <= 3 ? 'bg-red-50 text-red-700 border-red-200' : (form.percepcionSeguridad || 5) <= 6 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-green-50 text-green-700 border-green-200'}`
  }, form.percepcionSeguridad || '5')), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between mt-2 text-xs font-bold uppercase tracking-tighter"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "Inseguro (1)"), /*#__PURE__*/React.createElement("span", {
    className: "text-green-600"
  }, "Muy Seguro (10)"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: labelClass
  }, "Situaci\xF3n de convivencia"), /*#__PURE__*/React.createElement("select", {
    name: "convivencia",
    value: form.convivencia,
    onChange: handleChange,
    className: fieldClass,
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 Selecciona \u2014"), /*#__PURE__*/React.createElement("option", {
    value: "solo"
  }, "Vivo solo/a"), /*#__PURE__*/React.createElement("option", {
    value: "familia"
  }, "Vivo acompa\xF1ado/a (familia)"), /*#__PURE__*/React.createElement("option", {
    value: "ayuda"
  }, "Cuento con ayuda profesional diaria"))), /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-2 relative"
  }, /*#__PURE__*/React.createElement("label", {
    className: labelClass
  }, "Principales limitaciones (m\xE1ximo 3)"), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setLimitacionesOpen(!limitacionesOpen),
    className: `${fieldClass} flex justify-between items-center text-left w-full h-[58px]`
  }, /*#__PURE__*/React.createElement("span", {
    className: `truncate mr-4 ${form.limitaciones.length === 0 ? 'text-gray-400' : 'text-gray-800'}`
  }, form.limitaciones.length === 0 ? '— Selecciona —' : form.limitaciones.map(l => {
    const labels = {
      dolor: 'Dolor',
      equilibrio: 'Equilibrio',
      debilidad: 'Debilidad',
      fatiga: 'Fatiga',
      vision: 'Visión',
      temblor: 'Temblores',
      otra: 'Otra'
    };
    return labels[l];
  }).join(', ')), /*#__PURE__*/React.createElement(Icons.ChevronDown, {
    className: `w-5 h-5 shrink-0 transition-transform ${limitacionesOpen ? 'rotate-180' : ''}`
  })), limitacionesOpen && /*#__PURE__*/React.createElement("div", {
    className: "absolute z-[60] w-full mt-2 bg-white border-2 border-brand-100 rounded-2xl shadow-2xl overflow-hidden anim-fade-in py-2"
  }, [{
    val: 'dolor',
    label: 'Dolor articular / Reuma'
  }, {
    val: 'equilibrio',
    label: 'Falta de equilibrio'
  }, {
    val: 'debilidad',
    label: 'Debilidad en un lado'
  }, {
    val: 'fatiga',
    label: 'Fatiga / Cansancio'
  }, {
    val: 'vision',
    label: 'Problemas de visión'
  }, {
    val: 'temblor',
    label: 'Temblores / Parkinson'
  }, {
    val: 'otra',
    label: 'Otra limitación'
  }].map(opt => /*#__PURE__*/React.createElement("button", {
    key: opt.val,
    type: "button",
    onClick: () => toggleLimitacion(opt.val),
    className: "w-full flex items-center gap-3 px-6 py-3.5 hover:bg-brand-50 transition-colors text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${form.limitaciones?.includes(opt.val) ? 'border-brand-500 bg-brand-500 text-white' : 'border-gray-200 bg-white'}`
  }, form.limitaciones?.includes(opt.val) && /*#__PURE__*/React.createElement(Icons.Check, {
    className: "w-3.5 h-3.5"
  })), /*#__PURE__*/React.createElement("span", {
    className: `font-bold text-sm ${form.limitaciones?.includes(opt.val) ? 'text-brand-900' : 'text-gray-600'}`
  }, opt.label))), /*#__PURE__*/React.createElement("div", {
    className: "p-3 border-t border-gray-100 mt-2 bg-gray-50 flex justify-end"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.preventDefault();
      setLimitacionesOpen(false);
    },
    className: "text-xs font-black text-brand-600 uppercase tracking-widest px-4 py-2 hover:bg-white rounded-lg transition-colors"
  }, "Cerrar selecci\xF3n")))), limitacionesOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[55]",
    onClick: () => setLimitacionesOpen(false)
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: labelClass
  }, "Nivel de movilidad"), /*#__PURE__*/React.createElement("select", {
    name: "nivelMovilidad",
    value: form.nivelMovilidad,
    onChange: handleChange,
    className: fieldClass
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 Selecciona \u2014"), /*#__PURE__*/React.createElement("option", {
    value: "independiente"
  }, "Independiente total"), /*#__PURE__*/React.createElement("option", {
    value: "supervision"
  }, "Requiere supervisi\xF3n"), /*#__PURE__*/React.createElement("option", {
    value: "asistencia"
  }, "Requiere asistencia f\xEDsica"), /*#__PURE__*/React.createElement("option", {
    value: "encamado"
  }, "Encamado / Gran dependencia"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: labelClass
  }, "Uso de las manos y agarre"), /*#__PURE__*/React.createElement("select", {
    name: "destrezaManos",
    value: form.destrezaManos,
    onChange: handleChange,
    className: fieldClass,
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 Selecciona \u2014"), /*#__PURE__*/React.createElement("option", {
    value: "funcional"
  }, "Funcional (sin problemas)"), /*#__PURE__*/React.createElement("option", {
    value: "fina"
  }, "Dificultad en pinza fina (botones, llaves)"), /*#__PURE__*/React.createElement("option", {
    value: "fuerza"
  }, "Falta de fuerza (agarre grueso)"), /*#__PURE__*/React.createElement("option", {
    value: "temblor"
  }, "Temblor que interfiere"), /*#__PURE__*/React.createElement("option", {
    value: "no-funcional"
  }, "No funcional (requiere ayuda total)")))), /*#__PURE__*/React.createElement("div", {
    className: "mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-base text-gray-500 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Shield, null), " Tus respuestas se guardan de forma segura y confidencial."), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center sm:items-end w-full sm:w-auto mt-4 sm:mt-0"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: !isQuestionnaireComplete(),
    className: `px-10 py-4 font-bold text-xl rounded-2xl shadow-lg transition-all w-full sm:w-auto ${isQuestionnaireComplete() ? 'bg-brand-600 hover:bg-brand-700 text-white btn-pulse' : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70'}`
  }, !isQuestionnaireComplete() ? 'Completa el cuestionario' : 'Analizar'), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-3 text-center sm:text-right max-w-xs"
  }, "* El an\xE1lisis por IA se encuentra en fase beta, por lo que puede contener errores. El resultado es una orientaci\xF3n general. Consulte siempre con un profesional cualificado."))))), step === 'loading' && /*#__PURE__*/React.createElement("div", {
    className: "text-center py-20 anim-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-20 h-20 border-4 border-brand-200 border-t-brand-600 rounded-full anim-spin mx-auto mb-6"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-brand-800 mb-2"
  }, file ? 'Gemini está analizando la imagen...' : 'Analizando tu hogar…'), /*#__PURE__*/React.createElement("p", {
    className: "text-lg text-gray-500"
  }, "Aplicando criterios de accesibilidad universal")), step === 'results' && /*#__PURE__*/React.createElement("div", {
    ref: resultRef,
    className: "anim-scale-in"
  }, (aiResponse || aiError) && /*#__PURE__*/React.createElement("div", {
    className: `rounded-3xl border shadow-xl p-8 md:p-10 mb-8 ${aiError ? 'bg-red-50 border-red-200' : 'bg-gradient-to-br from-indigo-50 to-white border-indigo-100'}`
  }, /*#__PURE__*/React.createElement("h3", {
    className: `font-display text-2xl font-bold mb-4 flex items-center gap-3 ${aiError ? 'text-red-800' : 'text-indigo-900'}`
  }, /*#__PURE__*/React.createElement(Icons.Brain, null), " ", aiError ? 'Error en el Análisis IA' : `Informe de Accesibilidad para ${form.nombre || 'el usuario'}`), aiError ? /*#__PURE__*/React.createElement("p", {
    className: "text-red-700"
  }, aiError) : (() => {
    return /*#__PURE__*/React.createElement("div", {
      className: "prose prose-indigo max-w-none text-gray-700 text-lg ai-report-content"
    }, aiResponse.split(/\n\n+/).map((paragraph, pIdx) => {
      if (!paragraph.trim()) return null;
      const productRegex = /\[\[PRODUCTO?[:\s]*(\d+)\]\]/gi;
      const matches = [...paragraph.matchAll(productRegex)];
      const productIds = [...new Set(matches.map(m => m[1]))];
      const cleanText = paragraph.replace(productRegex, '').trim();
      return /*#__PURE__*/React.createElement("div", {
        key: pIdx,
        className: "mb-8"
      }, /*#__PURE__*/React.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: marked.parse(cleanText)
        }
      }), productIds.length > 0 && /*#__PURE__*/React.createElement("div", {
        className: "flex flex-col gap-4 mt-6 no-print"
      }, productIds.map(id => {
        const p = PRODUCT_CATALOG[id];
        if (!p) return null;
        return /*#__PURE__*/React.createElement("div", {
          key: id,
          className: "bg-white border border-brand-100 rounded-2xl p-4 shadow-sm flex items-center gap-4 anim-scale-in"
        }, /*#__PURE__*/React.createElement("img", {
          src: p.img,
          alt: p.name,
          className: "w-20 h-20 object-contain rounded-lg bg-brand-50"
        }), /*#__PURE__*/React.createElement("div", {
          className: "flex-1"
        }, /*#__PURE__*/React.createElement("h4", {
          className: "font-bold text-brand-900 text-lg"
        }, p.name), /*#__PURE__*/React.createElement("p", {
          className: "text-sm text-brand-500 mb-2"
        }, "Producto t\xE9cnico recomendado profesionalmente."), /*#__PURE__*/React.createElement("a", {
          href: getAmazonLink(p.query, p.url),
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-block bg-accent-coral text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-opacity-90 transition-all"
        }, "Ver en Amazon")));
      })));
    }));
  })(), /*#__PURE__*/React.createElement("div", {
    className: "mt-10 flex justify-center no-print"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => window.print(),
    className: "flex items-center gap-3 px-8 py-4 bg-brand-800 text-white font-bold rounded-2xl hover:bg-brand-900 transition-all shadow-xl"
  }, /*#__PURE__*/React.createElement(Icons.Download, null), "Descargar Informe en PDF"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-3xl border border-brand-100 shadow-xl p-8 md:p-12 mb-8 text-center"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-2xl font-bold text-brand-900 mb-8"
  }, "Puntuaci\xF3n del Cuestionario"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row items-center justify-center gap-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-44 h-44"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    className: "w-full h-full -rotate-90"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "45",
    fill: "none",
    stroke: "#dbeafe",
    strokeWidth: "8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "45",
    fill: "none",
    stroke: scoreColor,
    strokeWidth: "8",
    strokeLinecap: "round",
    strokeDasharray: "283",
    strokeDashoffset: ringOffset,
    style: {
      transition: 'stroke-dashoffset 1.6s ease'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex flex-col items-center justify-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-4xl font-bold",
    style: {
      color: scoreColor
    }
  }, score), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-gray-500"
  }, "/ 100"))), /*#__PURE__*/React.createElement("div", {
    className: "text-left"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold mb-2",
    style: {
      color: scoreColor
    }
  }, scoreLabel), /*#__PURE__*/React.createElement("p", {
    className: "text-lg text-gray-600 max-w-sm leading-relaxed"
  }, score >= 75 ? 'Tu hogar tiene una buena base de accesibilidad. Revisa las recomendaciones para optimizarlo.' : score >= 45 ? 'Hay áreas de mejora importantes. Abordar las prioridades altas reducirá el riesgo de caídas significativamente.' : 'El hogar presenta barreras relevantes. Te recomendamos una evaluación presencial con terapeuta ocupacional.')))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-3xl border border-brand-100 shadow-xl p-8 md:p-10 mb-8"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-2xl font-bold text-brand-900 mb-6"
  }, "Puntos fuertes detectados"), getPositiveFindings().length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 italic"
  }, "No se han identificado puntos fuertes espec\xEDficos en este an\xE1lisis.") : /*#__PURE__*/React.createElement("ul", {
    className: "space-y-3"
  }, getPositiveFindings().map((p, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "flex gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 font-medium"
  }, /*#__PURE__*/React.createElement("span", {
    className: "shrink-0"
  }, p.icon), p.text)))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-3xl border border-brand-100 shadow-xl p-8 md:p-10 mb-8"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-2xl font-bold text-brand-900 mb-6"
  }, "Recomendaciones del cuestionario"), getRecommendations(score).length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "text-lg text-green-700 font-semibold"
  }, "\xA1Excelente! No se detectaron barreras significativas.") : /*#__PURE__*/React.createElement("ul", {
    className: "space-y-4"
  }, getRecommendations(score).map((r, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "flex gap-4 p-4 sm:p-6 rounded-2xl bg-gray-50 border border-gray-100"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl shrink-0 mt-1"
  }, r.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: `inline-block text-xs font-bold uppercase tracking-widest rounded-full px-3 py-1 mb-2 ${prioBadge[r.prio]}`
  }, "Prioridad ", r.prio), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-800 text-base leading-relaxed"
  }, r.text), r.linkUrl && /*#__PURE__*/React.createElement("a", {
    href: r.linkUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "inline-flex items-center gap-1.5 mt-3 text-brand-600 font-bold hover:text-brand-800 transition-colors bg-brand-50 px-3 py-1.5 rounded-lg border border-brand-100"
  }, "Ver producto recomendado", /*#__PURE__*/React.createElement("svg", {
    className: "w-4 h-4",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
  })))))))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row gap-4 justify-center no-print"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: reset,
    className: "px-8 py-4 bg-white border-2 border-brand-300 text-brand-700 font-bold text-lg rounded-2xl hover:bg-brand-50 transition-all"
  }, "Nuevo an\xE1lisis"), /*#__PURE__*/React.createElement("button", {
    onClick: () => window.location.href = 'mailto:iadaptato@gmail.com?subject=Solicitud%20de%20Evaluaci%C3%B3n%20Presencial',
    className: "px-8 py-4 bg-brand-600 text-white font-bold text-lg rounded-2xl hover:bg-brand-700 shadow-lg transition-all"
  }, "Solicitar evaluaci\xF3n presencial")))));
};
function App() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Navbar, {
    currentPage: "analyzer"
  }), /*#__PURE__*/React.createElement("main", {
    id: "main-content"
  }, /*#__PURE__*/React.createElement(SectionAnalyzer, {
    isTeaser: false,
    isStandalone: false
  })), /*#__PURE__*/React.createElement(Footer, {
    currentPage: "analyzer"
  }), /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();