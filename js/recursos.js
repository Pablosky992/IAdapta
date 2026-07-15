(function() {
const {
  Icons,
  Navbar,
  Footer,
  CookieBanner
} = window;
const {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo
} = React;

// --- SUB-NAVIGATION PILLS FOR TOOLS ---
const ResourceSubNav = function ResourceSubNav({
  currentView,
  onViewChange
}) {
  const tabs = [{
    id: 'math',
    title: 'Generador de Fichas',
    shortTitle: 'Fichas',
    icon: /*#__PURE__*/React.createElement(Icons.FileText, {
      className: "w-4 h-4"
    }),
    color: 'bg-brand-900 border-brand-900'
  }, {
    id: 'ramp',
    title: 'Calculadora de Rampas',
    shortTitle: 'Rampas',
    icon: /*#__PURE__*/React.createElement(Icons.TrendingUp, {
      className: "w-4 h-4"
    }),
    color: 'bg-emerald-600 border-emerald-600'
  }, {
    id: 'circle',
    title: 'Calculadora de Círculo',
    shortTitle: 'Círculo',
    icon: /*#__PURE__*/React.createElement(Icons.Circle, {
      className: "w-4 h-4"
    }),
    color: 'bg-accent-coral border-accent-coral'
  }, {
    id: 'pao',
    title: 'Buscador PAO',
    shortTitle: 'Buscador PAO',
    icon: /*#__PURE__*/React.createElement(Icons.Search, {
      className: "w-4 h-4"
    }),
    color: 'bg-blue-900 border-blue-900'
  }, {
    id: '3dprint',
    title: 'Impresión 3D',
    shortTitle: 'Modelos 3D',
    icon: /*#__PURE__*/React.createElement(Icons.Lightbulb, {
      className: "w-4 h-4"
    }),
    color: 'bg-orange-500 border-orange-500'
  }, {
    id: 'chatbot',
    title: 'Consultor de TO',
    shortTitle: 'Chatbot',
    icon: /*#__PURE__*/React.createElement(Icons.MessageSquare, {
      className: "w-4 h-4"
    }),
    color: 'bg-indigo-600 border-indigo-600'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-6xl mx-auto mb-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between gap-4 flex-wrap border-b border-brand-100 pb-5"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onViewChange('menu'),
    className: "inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors bg-white px-4 py-2.5 rounded-xl shadow-sm border border-brand-100 group text-sm"
  }, /*#__PURE__*/React.createElement(Icons.ArrowLeft, {
    className: "w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
  }), /*#__PURE__*/React.createElement("span", null, "Volver a Recursos")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar whitespace-nowrap"
  }, tabs.map(tab => {
    const isActive = currentView === tab.id;
    return /*#__PURE__*/React.createElement("button", {
      key: tab.id,
      onClick: () => onViewChange(tab.id),
      className: `inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all border-2
                  ${isActive ? `${tab.color} text-white shadow-md shadow-brand-900/10 scale-105` : 'bg-white border-brand-50 text-brand-500 hover:text-brand-900 hover:border-brand-200 hover:bg-brand-50/30'}`
    }, tab.icon, /*#__PURE__*/React.createElement("span", {
      className: "hidden md:inline"
    }, tab.title), /*#__PURE__*/React.createElement("span", {
      className: "md:hidden"
    }, tab.shortTitle));
  }))));
};

// --- MARKDOWN PARSER HELPERS FOR CHATBOT ---
const parseInlineMarkdown = text => {
  if (!text) return '';
  const regex = /(\[.*?\]\(.*?\))|(\*\*.*?\*\*)/g;
  const parts = text.split(regex);
  return parts.map((part, index) => {
    if (!part) return null;
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const linkText = part.substring(1, part.indexOf(']'));
      const url = part.substring(part.indexOf('](') + 2, part.length - 1);
      const isInternal = !url.startsWith('http') || url.includes('iadapta.es') || url.includes('localhost');
      return /*#__PURE__*/React.createElement("a", {
        key: index,
        href: url,
        target: isInternal ? "_self" : "_blank",
        rel: "noopener noreferrer",
        className: "text-indigo-600 font-bold hover:underline inline-flex items-center gap-0.5 bg-indigo-50/50 px-2 py-0.5 rounded-lg border border-indigo-100/40"
      }, linkText, isInternal ? ' 🔗' : ' ↗️');
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return /*#__PURE__*/React.createElement("strong", {
        key: index,
        className: "font-bold text-brand-900"
      }, part.slice(2, -2));
    }
    return part;
  });
};
const renderMessageText = text => {
  if (!text) return null;
  const paragraphs = text.split('\n\n');
  return paragraphs.map((paragraph, pIdx) => {
    let content = paragraph.trim();
    if (!content) return null;

    // Detect and extract product codes [[PRODUCTO:ID]]
    const productRegex = /\[\[PRODUCTO?[:\s]*(\d+)\]\]/gi;
    const matches = [...content.matchAll(productRegex)];
    const productIds = [...new Set(matches.map(m => m[1]))];
    const cleanText = content.replace(productRegex, '').trim();
    if (!cleanText && productIds.length > 0) {
      return /*#__PURE__*/React.createElement("div", {
        key: pIdx,
        className: "mb-4"
      }, renderProductCards(productIds));
    }
    let renderedElement = null;
    if (cleanText.startsWith('### ')) {
      renderedElement = /*#__PURE__*/React.createElement("h4", {
        className: "font-display text-lg font-bold text-brand-900 mt-4 mb-2"
      }, cleanText.replace('### ', ''));
    } else if (cleanText.startsWith('## ')) {
      renderedElement = /*#__PURE__*/React.createElement("h3", {
        className: "font-display text-xl font-bold text-brand-900 mt-5 mb-3"
      }, cleanText.replace('## ', ''));
    } else {
      const lines = cleanText.split('\n');
      const isList = lines.every(line => line.trim().startsWith('* ') || line.trim().startsWith('- '));
      if (isList) {
        renderedElement = /*#__PURE__*/React.createElement("ul", {
          className: "list-disc pl-5 my-2 space-y-1.5 text-base text-gray-850 leading-relaxed text-left"
        }, lines.map((line, lIdx) => {
          const cleanLine = line.trim().replace(/^[\*\-]\s+/, '');
          return /*#__PURE__*/React.createElement("li", {
            key: lIdx
          }, parseInlineMarkdown(cleanLine));
        }));
      } else {
        const subLines = cleanText.split('\n');
        renderedElement = /*#__PURE__*/React.createElement("p", {
          className: "text-base text-gray-850 leading-relaxed mb-3.5 text-left"
        }, subLines.map((line, lIdx) => /*#__PURE__*/React.createElement(React.Fragment, {
          key: lIdx
        }, lIdx > 0 && /*#__PURE__*/React.createElement("br", null), parseInlineMarkdown(line))));
      }
    }
    return /*#__PURE__*/React.createElement("div", {
      key: pIdx,
      className: "mb-4"
    }, renderedElement, productIds.length > 0 && renderProductCards(productIds));
  });
};
const renderProductCards = ids => {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3 my-3"
  }, ids.map(id => {
    const p = window.PRODUCT_CATALOG[id];
    if (!p) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: id,
      className: "bg-white border border-brand-100 rounded-2xl p-4 shadow-sm flex items-center gap-4 animate-scale-in text-left"
    }, /*#__PURE__*/React.createElement("img", {
      src: p.img,
      alt: p.name,
      className: "w-16 h-16 object-contain rounded-lg bg-brand-50 shrink-0"
    }), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 min-w-0"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "font-bold text-brand-900 text-sm truncate"
    }, p.name), /*#__PURE__*/React.createElement("p", {
      className: "text-[10px] text-brand-500 mb-2 font-medium"
    }, "Recomendado profesionalmente"), /*#__PURE__*/React.createElement("a", {
      href: window.getAmazonLink(p.query, p.url),
      target: "_blank",
      rel: "noopener noreferrer",
      className: "inline-flex items-center gap-1 bg-accent-coral hover:bg-opacity-90 text-white px-3 py-1.5 rounded-xl font-bold text-xs transition-all active:scale-95"
    }, /*#__PURE__*/React.createElement("span", null, "Ver en Amazon"), /*#__PURE__*/React.createElement(Icons.ArrowRight, {
      className: "w-3.5 h-3.5"
    }))));
  }));
};

// --- CHATBOT COMPONENT ---
const ChatbotComponent = function ChatbotComponent() {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);
  const chatContainerRef = useRef(null);

  // Load sessions from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('iadapta_chatbot_sessions');
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
        console.error("Error parsing sessions", e);
        createNewSession();
      }
    } else {
      createNewSession();
    }
  }, []);

  // Save sessions to LocalStorage when changed
  const saveSessions = updated => {
    setSessions(updated);
    localStorage.setItem('iadapta_chatbot_sessions', JSON.stringify(updated));
  };
  const createNewSession = () => {
    const newSession = {
      id: Date.now().toString(),
      title: 'Nueva consulta...',
      messages: [],
      date: new Date().toLocaleDateString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setSessions(prev => {
      const updated = [newSession, ...prev];
      localStorage.setItem('iadapta_chatbot_sessions', JSON.stringify(updated));
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
          return {
            ...s,
            title: newTitle.trim()
          };
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
  const downloadConversation = () => {
    if (!activeSession || activeSession.messages.length === 0) return;
    let content = `# Consulta de Terapia Ocupacional - IAdapta\n`;
    content += `Título: ${activeSession.title}\n`;
    content += `Fecha: ${activeSession.date}\n`;
    content += `=========================================\n\n`;
    activeSession.messages.forEach(msg => {
      const role = msg.sender === 'user' ? 'Terapeuta Ocupacional' : 'Consultor Clínico IA';
      content += `[${role}]:\n${msg.text}\n\n`;
      content += `-----------------------------------------\n\n`;
    });
    content += `Generado automáticamente por IAdapta (https://iadapta.es) - Consultor Clínico en Terapia Ocupacional.\n`;
    const blob = new Blob([content], {
      type: 'text/plain;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const filename = `consulta_to_${activeSession.title.toLowerCase().replace(/[^a-z0-9]/gi, '_')}.txt`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
  const isLimitReached = userQuestionsCount >= 6;
  const isLimitNear = userQuestionsCount === 5;

  // Scroll to bottom on new messages (internal chat container scroll only)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);
  const handleSendMessage = async textToSend => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;
    setErrorMsg('');
    if (!textToSend) setInput('');
    const userMsg = {
      sender: 'user',
      text
    };
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
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: activeSessionMessages
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error al comunicarse con el consultor.');
      }
      const botMsg = {
        sender: 'bot',
        text: data.text
      };
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
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] shadow-2xl border border-brand-100 overflow-hidden flex flex-col md:flex-row h-[850px] relative anim-scale-in text-left"
  }, /*#__PURE__*/React.createElement("aside", {
    className: `w-80 border-r border-brand-100 bg-brand-50/30 flex flex-col shrink-0 transition-transform duration-300 z-40 md:relative md:translate-x-0 absolute inset-y-0 left-0 bg-white
        ${showSidebarMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 border-b border-brand-100 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-display text-lg font-bold text-brand-900"
  }, "Historial de Chats"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowSidebarMobile(false),
    className: "md:hidden p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
  }, /*#__PURE__*/React.createElement(Icons.X, {
    className: "w-5 h-5"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "p-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      createNewSession();
      setShowSidebarMobile(false);
    },
    className: "w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-md shadow-indigo-600/10 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 text-sm"
  }, /*#__PURE__*/React.createElement(Icons.Plus, {
    className: "w-4 h-4"
  }), "Nuevo Chat")), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 overflow-y-auto px-3 pb-4 space-y-1.5 custom-scrollbar"
  }, sessions.map(s => {
    const isActive = s.id === activeSessionId;
    return /*#__PURE__*/React.createElement("div", {
      key: s.id,
      onClick: () => {
        setActiveSessionId(s.id);
        setErrorMsg('');
        setShowSidebarMobile(false);
      },
      className: `group p-4 rounded-2xl cursor-pointer transition-all flex items-center justify-between border-2
                  ${isActive ? 'bg-indigo-50/50 border-indigo-100 text-indigo-900' : 'bg-white border-transparent text-gray-600 hover:bg-brand-50/40 hover:text-brand-900'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1 min-w-0 pr-2"
    }, /*#__PURE__*/React.createElement("p", {
      className: "font-bold text-xs truncate leading-snug"
    }, s.title), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] text-gray-400 block mt-1 font-medium"
    }, s.date)), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-0.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 shrink-0 transition-opacity"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: e => renameSession(s.id, e),
      className: "p-1.5 rounded-lg text-gray-300 hover:text-indigo-600 hover:bg-indigo-50/80 transition-all",
      title: "Renombrar conversaci\xF3n"
    }, /*#__PURE__*/React.createElement(Icons.Edit, {
      className: "w-4 h-4"
    })), /*#__PURE__*/React.createElement("button", {
      onClick: e => deleteSession(s.id, e),
      className: "p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50/80 transition-all",
      title: "Eliminar conversaci\xF3n"
    }, /*#__PURE__*/React.createElement(Icons.Trash, {
      className: "w-4 h-4"
    }))));
  }))), showSidebarMobile && /*#__PURE__*/React.createElement("div", {
    onClick: () => setShowSidebarMobile(false),
    className: "fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 md:hidden animate-fade-in"
  }), /*#__PURE__*/React.createElement("section", {
    className: "flex-1 flex flex-col h-full bg-white relative"
  }, /*#__PURE__*/React.createElement("header", {
    className: "px-6 py-4 border-b border-brand-100 flex items-center justify-between bg-white/80 backdrop-blur-sm relative z-10 shrink-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowSidebarMobile(true),
    className: "md:hidden p-2 text-gray-500 hover:text-gray-800 rounded-xl hover:bg-gray-100 shrink-0"
  }, /*#__PURE__*/React.createElement(Icons.Menu, {
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl shrink-0 font-bold"
  }, "\uD83D\uDCAC"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display font-bold text-brand-900 text-base sm:text-lg"
  }, "Consultor en Terapia Ocupacional"), /*#__PURE__*/React.createElement("span", {
    className: "w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse",
    title: "Conectado"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] sm:text-xs text-gray-400 font-medium"
  }, "Asistente Sanitario T\xE9cnico Especializado"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, messages.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: downloadConversation,
    className: "flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 hover:text-indigo-900 border border-indigo-100 rounded-xl font-bold text-xs transition-all hover:scale-[1.02] active:scale-95 shadow-sm",
    title: "Descargar conversaci\xF3n en TXT"
  }, /*#__PURE__*/React.createElement(Icons.Download, {
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, "Descargar Chat")), /*#__PURE__*/React.createElement("div", {
    className: "hidden sm:block text-right"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] bg-brand-50 text-brand-600 px-3 py-1 rounded-full font-bold uppercase tracking-wider"
  }, "Beta Cl\xEDnico")))), /*#__PURE__*/React.createElement("div", {
    ref: chatContainerRef,
    className: "flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 custom-scrollbar relative"
  }, messages.length === 0 ?
  /*#__PURE__*/
  /* Welcome / Onboarding Screen */
  React.createElement("div", {
    className: "max-w-2xl mx-auto text-center py-8 sm:py-12 space-y-8 animate-fade-in flex flex-col items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-block p-6 bg-indigo-50 text-indigo-600 rounded-full text-4xl shadow-sm border border-indigo-100"
  }, "\uD83C\uDFE5"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-display text-2xl font-black text-brand-900 mb-3"
  }, "Consultor Cl\xEDnico en Terapia Ocupacional"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 text-sm leading-relaxed max-w-lg mx-auto text-center mb-6"
  }, "Este chatbot est\xE1 dise\xF1ado como una herramienta de apoyo para terapeutas y profesionales sanitarios. Resuelve dudas cl\xEDnicas, propone tratamientos y aconseja sobre productos de apoyo de forma formal y t\xE9cnica."), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-100/70 border border-slate-200 rounded-2xl p-5 text-left max-w-lg mx-auto text-xs leading-relaxed text-gray-600"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-[10px] text-indigo-600 uppercase tracking-wider block mb-2"
  }, "Ejemplo de consulta t\xE9cnica:"), /*#__PURE__*/React.createElement("p", {
    className: "italic font-medium text-gray-750"
  }, "\"Paciente de 72 a\xF1os con hemiparesia izquierda tras sufrir un ictus hace 3 meses. Presenta dificultades en AVD de alimentaci\xF3n y vestido debido a rigidez en miembro superior. \xBFQu\xE9 pautas de tratamiento, principios de econom\xEDa articular y productos de apoyo me recomiendas para mejorar su autonom\xEDa?\""))), /*#__PURE__*/React.createElement("div", {
    className: "bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-left max-w-lg mx-auto flex gap-3 text-amber-900 text-xs leading-relaxed"
  }, /*#__PURE__*/React.createElement(Icons.Warning, {
    className: "w-5 h-5 text-amber-600 shrink-0"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    className: "font-bold block mb-0.5"
  }, "Uso Profesional Exclusivo:"), "Las respuestas son de car\xE1cter orientativo y basadas en IA. Deben ser contrastadas siempre bajo criterio profesional y juicio cl\xEDnico propio."))) :
  /*#__PURE__*/
  /* Render active conversation */
  React.createElement("div", {
    className: "max-w-3xl mx-auto space-y-6"
  }, messages.map((msg, index) => {
    const isUser = msg.sender === 'user';
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: `flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`
    }, /*#__PURE__*/React.createElement("div", {
      className: `flex gap-3 max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-sm font-bold shadow-sm border
                        ${isUser ? 'bg-brand-900 text-white border-brand-900/10' : 'bg-indigo-100 text-indigo-700 border-indigo-200/40'}`
    }, isUser ? 'TO' : '🩺'), /*#__PURE__*/React.createElement("div", {
      className: `p-4 sm:p-5 rounded-2xl shadow-sm border
                        ${isUser ? 'bg-brand-900 text-white border-brand-900/10 rounded-tr-none' : 'bg-white text-gray-850 border-gray-150 rounded-tl-none'}`
    }, isUser ? /*#__PURE__*/React.createElement("p", {
      className: "text-base whitespace-pre-wrap leading-relaxed"
    }, msg.text) : renderMessageText(msg.text))));
  }), isLoading && /*#__PURE__*/React.createElement("div", {
    className: "flex justify-start animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 max-w-[85%] flex-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200/40 text-indigo-700 shrink-0 flex items-center justify-center text-sm font-bold shadow-sm"
  }, "\uD83E\uDE7A"), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-white border border-gray-150 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 bg-indigo-500 rounded-full animate-bounce",
    style: {
      animationDelay: '0ms'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 bg-indigo-500 rounded-full animate-bounce",
    style: {
      animationDelay: '150ms'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 bg-indigo-500 rounded-full animate-bounce",
    style: {
      animationDelay: '300ms'
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-400 font-medium font-mono"
  }, "El Consultor est\xE1 analizando el caso...")))), errorMsg && /*#__PURE__*/React.createElement("div", {
    className: "max-w-lg mx-auto bg-red-50 border border-red-200 rounded-2xl p-4 text-red-900 text-xs flex gap-3 leading-relaxed animate-shake"
  }, /*#__PURE__*/React.createElement(Icons.AlertCircle, {
    className: "w-5 h-5 text-red-500 shrink-0"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    className: "font-bold block mb-0.5"
  }, "Error de Conexi\xF3n:"), errorMsg, /*#__PURE__*/React.createElement("button", {
    onClick: () => handleSendMessage(),
    className: "mt-2 text-red-700 font-bold hover:underline block"
  }, "Reintentar env\xEDo"))))), /*#__PURE__*/React.createElement("footer", {
    className: "p-4 border-t border-brand-100 bg-white relative z-10 shrink-0"
  }, isLimitReached ? /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl mx-auto p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center gap-3 text-indigo-950 text-xs sm:text-sm animate-fade-in text-left"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xl"
  }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 leading-relaxed"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "font-bold block text-indigo-900 mb-0.5"
  }, "L\xEDmite de sesi\xF3n alcanzado (6/6 consultas):"), "Para mantener la precisi\xF3n cl\xEDnica y evitar que se mezclen intervenciones, te aconsejamos iniciar una nueva conversaci\xF3n."), /*#__PURE__*/React.createElement("button", {
    onClick: () => createNewSession(),
    className: "bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold text-xs transition-all shrink-0 hover:scale-[1.02] active:scale-95 shadow-md shadow-indigo-600/10"
  }, "Nuevo Chat")) : /*#__PURE__*/React.createElement(React.Fragment, null, isLimitNear && /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl mx-auto mb-3 px-4 py-2 bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold rounded-xl flex items-center gap-2 animate-pulse text-left"
  }, /*#__PURE__*/React.createElement("span", null, "\u26A0\uFE0F"), /*#__PURE__*/React.createElement("span", null, "Te queda 1 \xFAltima pregunta disponible para esta sesi\xF3n.")), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      handleSendMessage();
    },
    className: "max-w-3xl mx-auto flex gap-3 items-end"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 relative bg-brand-50/40 border border-brand-100 rounded-2xl focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all"
  }, /*#__PURE__*/React.createElement("textarea", {
    value: input,
    onChange: e => setInput(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    rows: "2",
    placeholder: "Escribe tu consulta sobre el caso cl\xEDnico...",
    disabled: isLoading,
    className: "w-full pl-4 pr-4 py-3 bg-transparent border-0 outline-none text-base text-gray-800 resize-none font-sans placeholder:text-gray-400 focus:ring-0 leading-relaxed max-h-32"
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isLoading || !input.trim(),
    className: "w-12 h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/10 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all shrink-0",
    title: "Enviar mensaje"
  }, /*#__PURE__*/React.createElement(Icons.Send, {
    className: "w-5 h-5"
  })))), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-gray-400 text-center mt-2.5 max-w-lg mx-auto font-medium leading-normal"
  }, "Ofrece soluciones formales de Terapia Ocupacional. El consultor te formular\xE1 preguntas de refinamiento."))));
};

// --- SECTION RESOURCES ---
const SectionResources = function SectionResources({
  navigateTo,
  isPWA,
  setShowInstaller
}) {
  const [view, setView] = useState('menu'); // 'menu', 'math', 'pao', 'ramp'
  const [difficulty, setDifficulty] = useState('medium');
  const [sheetType, setSheetType] = useState('math'); // 'math', 'wordsearch', 'visual'
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });

    // Sincronizar vista con URL si existe parámetro 'tool'
    const params = new URLSearchParams(window.location.search);
    const tool = params.get('tool');
    if (tool && ['math', 'pao', 'ramp', '3dprint', 'circle', 'chatbot'].includes(tool)) {
      setView(tool);
    } else {
      setView('menu');
    }
  }, []);

  // Escuchar cambios de navegación externa/atrás
  useEffect(() => {
    const handleToolSync = () => {
      const params = new URLSearchParams(window.location.search);
      const tool = params.get('tool');
      if (tool && ['math', 'pao', 'ramp', '3dprint', 'circle', 'chatbot'].includes(tool)) {
        setView(tool);
      } else {
        setView('menu');
      }
    };
    window.addEventListener('popstate', handleToolSync);
    return () => window.removeEventListener('popstate', handleToolSync);
  }, []);
  const updateView = newView => {
    setView(newView);
    const params = new URLSearchParams(window.location.search);
    if (newView === 'menu') {
      params.delete('tool');
    } else {
      params.set('tool', newView);
    }
    window.history.pushState({
      view: newView
    }, '', `?${params.toString()}`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // State for Ramp Calculator
  const [rampHeight, setRampHeight] = useState(''); // en cm
  const [rampLength, setRampLength] = useState(''); // en cm
  const [rampSlope, setRampSlope] = useState(''); // en %

  // State for Circle Calculator
  const [circleDiameter, setCircleDiameter] = useState(''); // en mm
  const [circlePerimeter, setCirclePerimeter] = useState(''); // en mm

  const handleCircleChange = (field, value) => {
    if (value === '') {
      setCircleDiameter('');
      setCirclePerimeter('');
      return;
    }

    // Normalizar punto a coma para visualización consistente en español
    const cleanValue = value.replace('.', ',');
    const parseValue = cleanValue.replace(',', '.');
    if (field === 'd') {
      setCircleDiameter(cleanValue);
      const d = parseFloat(parseValue);
      if (!isNaN(d)) {
        setCirclePerimeter((d * Math.PI).toFixed(2).replace('.', ','));
      } else {
        setCirclePerimeter('');
      }
    } else if (field === 'p') {
      setCirclePerimeter(cleanValue);
      const p = parseFloat(parseValue);
      if (!isNaN(p)) {
        setCircleDiameter((p / Math.PI).toFixed(2).replace('.', ','));
      } else {
        setCircleDiameter('');
      }
    }
  };
  const generateMathPDF = async () => {
    setIsGenerating(true);
    const {
      jsPDF
    } = window.jspdf;
    const doc = new jsPDF();
    let ops = [];
    const count = 20;
    for (let i = 0; i < count; i++) {
      let a, b, op;
      if (difficulty === 'easy') {
        op = Math.random() > 0.5 ? '+' : '-';
        a = Math.floor(Math.random() * 20) + 5;
        b = Math.floor(Math.random() * 10) + 1;
        if (op === '-' && a < b) [a, b] = [b, a];
      } else if (difficulty === 'medium') {
        const type = Math.floor(Math.random() * 3);
        if (type === 0) {
          op = '+';
          a = Math.floor(Math.random() * 80) + 10;
          b = Math.floor(Math.random() * 80) + 10;
        } else if (type === 1) {
          op = '-';
          a = Math.floor(Math.random() * 90) + 20;
          b = Math.floor(Math.random() * 50) + 5;
          if (a < b) [a, b] = [b, a];
        } else {
          op = 'x';
          a = Math.floor(Math.random() * 9) + 2;
          b = Math.floor(Math.random() * 9) + 2;
        }
      } else {
        const type = Math.floor(Math.random() * 4);
        if (type === 0) {
          op = '+';
          a = Math.floor(Math.random() * 800) + 100;
          b = Math.floor(Math.random() * 800) + 100;
        } else if (type === 1) {
          op = '-';
          a = Math.floor(Math.random() * 900) + 100;
          b = Math.floor(Math.random() * 500) + 50;
          if (a < b) [a, b] = [b, a];
        } else if (type === 2) {
          op = 'x';
          a = Math.floor(Math.random() * 50) + 10;
          b = Math.floor(Math.random() * 9) + 2;
        } else {
          op = '/';
          b = Math.floor(Math.random() * 8) + 2;
          a = b * (Math.floor(Math.random() * 20) + 2);
        }
      }
      ops.push(`${a} ${op} ${b} = `);
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(26, 48, 82);
    doc.text("Ficha de Estimulación Cognitiva", 105, 25, {
      align: "center"
    });
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text("IAdapta | Terapia Ocupacional & Accesibilidad", 105, 32, {
      align: "center"
    });
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 45, 120, 45);
    doc.text("Nombre:", 20, 43);
    doc.line(140, 45, 190, 45);
    doc.text("Fecha:", 140, 43);
    doc.setFontSize(18);
    doc.setTextColor(33, 33, 33);
    const col1X = 35;
    const col2X = 115;
    let y = 65;
    ops.forEach((op, index) => {
      const x = index < 10 ? col1X : col2X;
      const currentY = index < 10 ? y + index * 18 : y + (index - 10) * 18;
      doc.text(op, x, currentY);
      doc.setDrawColor(220, 220, 220);
      doc.line(x + (difficulty === 'hard' ? 45 : 35), currentY + 1, x + (difficulty === 'hard' ? 75 : 65), currentY + 1);
    });
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("Recurso gratuito generado en iadapta.es", 105, 285, {
      align: "center"
    });
    doc.save(`Ficha_Matematicas_${difficulty.toUpperCase()}_IAdapta.pdf`);
    setIsGenerating(false);
  };
  const generateWordSearchPDF = async () => {
    setIsGenerating(true);
    const {
      jsPDF
    } = window.jspdf;
    const doc = new jsPDF();
    const size = difficulty === 'easy' ? 8 : difficulty === 'medium' ? 10 : 14;
    const fontSize = difficulty === 'easy' ? 24 : difficulty === 'medium' ? 20 : 16;
    const lineSpacing = difficulty === 'easy' ? 15 : difficulty === 'medium' ? 12 : 10;
    const words = ['MESA', 'SILLA', 'VASO', 'PLATO', 'CAMA', 'CASA', 'ROPA', 'LIBRO', 'AGUA', 'PAN', 'LUZ', 'RADIO', 'RELOJ', 'TIEMPO', 'LUZ', 'MANO', 'PIE', 'OJOS', 'PELO', 'CARA', 'COMER', 'DORMIR', 'PASILLO', 'BAÑO', 'COCINA'].sort(() => Math.random() - 0.5).slice(0, difficulty === 'easy' ? 6 : difficulty === 'medium' ? 10 : 18);
    const grid = Array(size).fill(0).map(() => Array(size).fill(''));
    words.forEach(word => {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 150) {
        attempts++;
        const isVert = Math.random() > 0.5;
        const r = Math.floor(Math.random() * (isVert ? size - word.length + 1 : size));
        const c = Math.floor(Math.random() * (isVert ? size : size - word.length + 1));
        let fits = true;
        for (let i = 0; i < word.length; i++) {
          const rr = isVert ? r + i : r;
          const cc = isVert ? c : c + i;
          if (grid[rr][cc] !== '' && grid[rr][cc] !== word[i]) {
            fits = false;
            break;
          }
        }
        if (fits) {
          for (let i = 0; i < word.length; i++) {
            const rr = isVert ? r + i : r;
            const cc = isVert ? c : c + i;
            grid[rr][cc] = word[i];
          }
          placed = true;
        }
      }
    });
    const letters = 'ABCDE';
    for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) if (grid[r][c] === '') grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(26, 48, 82);
    doc.text("Ficha: Sopa de Letras", 105, 25, {
      align: "center"
    });
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Nivel: ${difficulty.toUpperCase()} | IAdapta Estimulación`, 105, 32, {
      align: "center"
    });

    // Grid drawing
    doc.setFont("courier", "bold");
    doc.setFontSize(fontSize);
    doc.setTextColor(33, 33, 33);
    let currentY = 60;
    grid.forEach(row => {
      doc.text(row.join('  '), 105, currentY, {
        align: "center"
      });
      currentY += lineSpacing;
    });

    // Words list
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Encuentra las siguientes palabras:", 20, currentY + 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const wordListStr = words.join('   -   ');
    doc.text(wordListStr, 20, currentY + 30, {
      maxWidth: 170
    });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("Recurso gratuito generado en iadapta.es | Terapia Ocupacional & Accesibilidad", 105, 285, {
      align: "center"
    });
    doc.save(`Sopa_Letras_${difficulty}_IAdapta.pdf`);
    setIsGenerating(false);
  };
  const generateVisualPDF = async () => {
    setIsGenerating(true);
    const {
      jsPDF
    } = window.jspdf;
    const doc = new jsPDF();
    const fontSize = difficulty === 'easy' ? 28 : difficulty === 'medium' ? 22 : 18;
    const rowCount = difficulty === 'easy' ? 8 : difficulty === 'medium' ? 12 : 16;
    const charsPerRow = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20;
    const spaceBetween = difficulty === 'easy' ? '  ' : ' ';
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(26, 48, 82);
    doc.text("Ficha: Agudeza Visual - Pág 1", 105, 25, {
      align: "center"
    });
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Nivel: ${difficulty.toUpperCase()} | Estimulación Cognitiva`, 105, 32, {
      align: "center"
    });
    const tasks = [{
      q: "1. Busca la letra diferente en cada fila:",
      base: "E",
      target: "F"
    }, {
      q: "2. Localiza el número intruso:",
      base: "8",
      target: "3"
    }, {
      q: "3. Busca la letra minúscula entre mayúsculas:",
      base: "M",
      target: "m"
    }];

    // Task 1
    let currentY = 55;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(26, 48, 82);
    doc.text(tasks[0].q, 20, currentY);
    currentY += 15;
    doc.setFont("courier", "bold");
    doc.setFontSize(fontSize);
    doc.setTextColor(50, 50, 50);
    for (let i = 0; i < rowCount; i++) {
      if (currentY > 275) break;
      const line = Array(charsPerRow).fill(tasks[0].base);
      const tIdx = Math.floor(Math.random() * charsPerRow);
      line[tIdx] = tasks[0].target;
      doc.text(line.join(spaceBetween), 105, currentY, {
        align: "center"
      });
      currentY += fontSize * 0.45 + 5;
    }

    // Footer P1
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("Recurso gratuito generado en iadapta.es | Terapia Ocupacional & Accesibilidad", 105, 285, {
      align: "center"
    });

    // Page 2 for Task 2 and 3
    doc.addPage();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(26, 48, 82);
    doc.text("Ficha: Agudeza Visual - Pág 2", 105, 25, {
      align: "center"
    });
    currentY = 55;
    for (let j = 1; j < tasks.length; j++) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(26, 48, 82);
      doc.text(tasks[j].q, 20, currentY);
      currentY += 15;
      doc.setFont("courier", "bold");
      doc.setFontSize(fontSize);
      doc.setTextColor(50, 50, 50);
      const subRowCount = Math.floor(rowCount / 1.5);
      for (let i = 0; i < subRowCount; i++) {
        if (currentY > 275) break;
        const line = Array(charsPerRow).fill(tasks[j].base);
        const tIdx = Math.floor(Math.random() * charsPerRow);
        line[tIdx] = tasks[j].target;
        doc.text(line.join(spaceBetween), 105, currentY, {
          align: "center"
        });
        currentY += fontSize * 0.45 + 5;
      }
      currentY += 20;
    }

    // Footer P2
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("Recurso gratuito generado en iadapta.es | Terapia Ocupacional & Accesibilidad", 105, 285, {
      align: "center"
    });
    doc.save(`Agudeza_Visual_PRO_${difficulty}_IAdapta.pdf`);
    setIsGenerating(false);
  };
  const generateSudokuPDF = async () => {
    setIsGenerating(true);
    const {
      jsPDF
    } = window.jspdf;
    const doc = new jsPDF();
    const base = [[5, 3, 4, 6, 7, 8, 9, 1, 2], [6, 7, 2, 1, 9, 5, 3, 4, 8], [1, 9, 8, 3, 4, 2, 5, 6, 7], [8, 5, 9, 7, 6, 1, 4, 2, 3], [4, 2, 6, 8, 5, 3, 7, 9, 1], [7, 1, 3, 9, 2, 4, 8, 5, 6], [9, 6, 1, 5, 3, 7, 2, 8, 4], [2, 8, 7, 4, 1, 9, 6, 3, 5], [3, 4, 5, 2, 8, 6, 1, 7, 9]];
    const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const shuffledDigits = [...digits].sort(() => Math.random() - 0.5);
    const map = {};
    digits.forEach((d, i) => {
      map[d] = shuffledDigits[i];
    });
    let grid = base.map(row => row.map(val => map[val]));
    const shuffleRows = arr => {
      const res = [...arr];
      const shuffleBlock = (r1, r2, r3) => {
        const block = [res[r1], res[r2], res[r3]];
        block.sort(() => Math.random() - 0.5);
        res[r1] = block[0];
        res[r2] = block[1];
        res[r3] = block[2];
      };
      shuffleBlock(0, 1, 2);
      shuffleBlock(3, 4, 5);
      shuffleBlock(6, 7, 8);
      return res;
    };
    grid = shuffleRows(grid);
    const transpose = arr => arr[0].map((_, colIdx) => arr.map(row => row[colIdx]));
    grid = transpose(grid);
    grid = shuffleRows(grid);
    grid = transpose(grid);
    if (Math.random() > 0.5) grid = transpose(grid);
    const clues = difficulty === 'easy' ? 49 : difficulty === 'medium' ? 36 : 27;
    const hideCount = 81 - clues;
    const indices = Array.from({
      length: 81
    }, (_, i) => i);
    indices.sort(() => Math.random() - 0.5);
    const board = grid.map(row => [...row]);
    for (let i = 0; i < hideCount; i++) {
      const idx = indices[i];
      const r = Math.floor(idx / 9);
      const c = idx % 9;
      board[r][c] = 0;
    }

    // Draw page 1: Puzzle
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(26, 48, 82);
    doc.text("Ficha: Sudoku", 105, 25, {
      align: "center"
    });
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Nivel: ${difficulty === 'easy' ? 'BÁSICO' : difficulty === 'medium' ? 'INTERMEDIO' : 'AVANZADO'} | IAdapta Estimulación`, 105, 32, {
      align: "center"
    });
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 45, 120, 45);
    doc.text("Nombre:", 20, 43);
    doc.line(140, 45, 190, 45);
    doc.text("Fecha:", 140, 43);
    const xOffset = 51;
    const yOffset = 65;

    // Draw numbers
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(50, 50, 50);
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] !== 0) {
          doc.text(board[r][c].toString(), xOffset + c * 12 + 6, yOffset + r * 12 + 8.5, {
            align: "center"
          });
        }
      }
    }

    // Draw grid lines
    // Thin lines
    doc.setLineWidth(0.25);
    doc.setDrawColor(150, 150, 150);
    for (let i = 0; i <= 9; i++) {
      if (i % 3 !== 0) {
        doc.line(xOffset + i * 12, yOffset, xOffset + i * 12, yOffset + 108);
        doc.line(xOffset, yOffset + i * 12, xOffset + 108, yOffset + i * 12);
      }
    }

    // Thick lines
    doc.setLineWidth(1.2);
    doc.setDrawColor(26, 48, 82);
    for (let i = 0; i <= 9; i++) {
      if (i % 3 === 0) {
        doc.line(xOffset + i * 12, yOffset, xOffset + i * 12, yOffset + 108);
        doc.line(xOffset, yOffset + i * 12, xOffset + 108, yOffset + i * 12);
      }
    }

    // Instructions
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(26, 48, 82);
    doc.text("Instrucciones:", 20, 195);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(80, 80, 80);
    doc.text("Completa la cuadrícula de modo que cada fila, cada columna y cada uno de los 9 bloques de 3x3 contenga los números del 1 al 9 sin repetirse.", 20, 202, {
      maxWidth: 170
    });

    // Footer P1
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text("Recurso gratuito generado en iadapta.es | Terapia Ocupacional & Accesibilidad", 105, 285, {
      align: "center"
    });

    // Draw page 2: Solution
    doc.addPage();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(26, 48, 82);
    doc.text("Solución del Sudoku", 105, 25, {
      align: "center"
    });
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Nivel: ${difficulty === 'easy' ? 'BÁSICO' : difficulty === 'medium' ? 'INTERMEDIO' : 'AVANZADO'} | IAdapta Estimulación`, 105, 32, {
      align: "center"
    });

    // Draw solution numbers
    doc.setFontSize(20);
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const isUserField = board[r][c] === 0;
        if (isUserField) {
          doc.setFont("helvetica", "bold");
          doc.setTextColor(232, 125, 85); // Accent Coral
        } else {
          doc.setFont("helvetica", "normal");
          doc.setTextColor(100, 100, 100);
        }
        doc.text(grid[r][c].toString(), xOffset + c * 12 + 6, yOffset + r * 12 + 8.5, {
          align: "center"
        });
      }
    }

    // Draw solution grid lines
    // Thin lines
    doc.setLineWidth(0.25);
    doc.setDrawColor(180, 180, 180);
    for (let i = 0; i <= 9; i++) {
      if (i % 3 !== 0) {
        doc.line(xOffset + i * 12, yOffset, xOffset + i * 12, yOffset + 108);
        doc.line(xOffset, yOffset + i * 12, xOffset + 108, yOffset + i * 12);
      }
    }

    // Thick lines
    doc.setLineWidth(1.2);
    doc.setDrawColor(26, 48, 82);
    for (let i = 0; i <= 9; i++) {
      if (i % 3 === 0) {
        doc.line(xOffset + i * 12, yOffset, xOffset + i * 12, yOffset + 108);
        doc.line(xOffset, yOffset + i * 12, xOffset + 108, yOffset + i * 12);
      }
    }

    // Solution Info text
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(26, 48, 82);
    doc.text("Nota para el Terapeuta:", 20, 195);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(80, 80, 80);
    doc.text("Los números destacados en color naranja corresponden a las soluciones que el usuario debía averiguar. Los números en gris son las pistas iniciales facilitadas en la ficha del paciente.", 20, 202, {
      maxWidth: 170
    });

    // Footer P2
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text("Recurso gratuito generado en iadapta.es | Terapia Ocupacional & Accesibilidad", 105, 285, {
      align: "center"
    });
    doc.save(`Sudoku_PRO_${difficulty}_IAdapta.pdf`);
    setIsGenerating(false);
  };
  const handleMainAction = () => {
    if (sheetType === 'math') generateMathPDF();else if (sheetType === 'wordsearch') generateWordSearchPDF();else if (sheetType === 'visual') generateVisualPDF();else if (sheetType === 'sudoku') generateSudokuPDF();
  };
  const handleSearch = val => {
    setSearchTerm(val);
    if (val.trim().length < 4) {
      setSearchResults([]);
      return;
    }
    const normalize = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const searchWords = normalize(val).trim().split(/\s+/);
    const filtered = window.CATALOG_DATA.filter(item => {
      const content = normalize(`${item.tD} ${item.cD} ${item.tC} ${item.sC} ${item.gD}`);
      return searchWords.every(word => content.includes(word));
    }).slice(0, 30);
    setSearchResults(filtered);
  };

  // Ramp Calculation Logic
  const handleRampChange = (field, value) => {
    const val = value.replace(',', '.');
    if (field === 'h') setRampHeight(val);
    if (field === 'l') setRampLength(val);
    if (field === 's') setRampSlope(val);

    // React state update is async, so we use the local 'val' for the active field
    setTimeout(() => {
      const h = field === 'h' ? parseFloat(val) : parseFloat(rampHeight);
      const l = field === 'l' ? parseFloat(val) : parseFloat(rampLength);
      const s = field === 's' ? parseFloat(val) : parseFloat(rampSlope);
      if (field === 'h' || field === 'l') {
        if (!isNaN(h) && !isNaN(l) && l !== 0) {
          setRampSlope((h / l * 100).toFixed(2));
        } else if (field === 'h' && !isNaN(h) && !isNaN(s) && s !== 0) {
          setRampLength((h / (s / 100)).toFixed(2));
        }
      } else if (field === 's') {
        if (!isNaN(s) && !isNaN(h) && s !== 0) {
          setRampLength((h / (s / 100)).toFixed(2));
        } else if (!isNaN(s) && !isNaN(l)) {
          setRampHeight((s / 100 * l).toFixed(2));
        }
      }
    }, 0);
  };
  const getCTEStatus = () => {
    const h = parseFloat(rampHeight);
    const l = parseFloat(rampLength);
    const s = parseFloat(rampSlope);
    if (isNaN(h)) return {
      valid: true,
      msg: 'Introduce la altura para validar.'
    };

    // Calcular el mínimo L permitido para esta H
    let minL = h / 0.10;
    let maxS = 10;
    if (minL >= 300) {
      minL = h / 0.08;
      maxS = 8;
    }
    if (minL >= 600) {
      minL = h / 0.06;
      maxS = 6;
    }
    if (isNaN(l) || isNaN(s)) return {
      valid: true,
      msg: `Para esta altura, el mínimo permitido es L = ${minL.toFixed(1)} cm (S = ${maxS}%)`,
      minL,
      maxS
    };
    let currentMaxS = 6;
    if (l < 300) currentMaxS = 10;else if (l < 600) currentMaxS = 8;
    if (s > currentMaxS + 0.01) {
      return {
        valid: false,
        msg: `Incumple CTE: Máximo ${currentMaxS}% para esta longitud. Mínimo permitido: L = ${minL.toFixed(1)} cm`,
        minL,
        maxS: currentMaxS
      };
    }
    return {
      valid: true,
      msg: `Cumple normativa CTE (Máx. permitido: ${currentMaxS}%)`,
      minL,
      maxS: currentMaxS
    };
  };
  const tools = [{
    id: 'math',
    title: 'Generador de Fichas',
    desc: 'Crea hojas de estimulación cognitiva (cálculo, sopas, agudeza) en PDF personalizadas.',
    icon: /*#__PURE__*/React.createElement(Icons.FilePdf, null),
    color: 'bg-brand-900 text-white',
    badge: 'Estimulación',
    image: 'worksheets_generic_bg_1778740651125.png'
  }, {
    id: 'ramp',
    title: 'Calculadora de Rampas',
    desc: 'Calcula pendientes y longitudes según la normativa de accesibilidad (CTE).',
    icon: /*#__PURE__*/React.createElement(Icons.TrendingUp, null),
    color: 'bg-emerald-600 text-white',
    badge: 'Accesibilidad',
    image: 'ramp_calculator_thumb_1778710368417.png'
  }, {
    id: 'circle',
    title: 'Calculadora de Círculo',
    desc: 'Calcula el diámetro a partir del perímetro y viceversa para diseño en milímetros (mm).',
    icon: /*#__PURE__*/React.createElement(Icons.Circle, null),
    color: 'bg-accent-coral text-white',
    badge: 'Medición',
    image: 'circle_calc_thumb.png'
  }, {
    id: 'pao',
    title: 'Buscador PAO (CatSalut)',
    desc: 'Consulta códigos, importes y descripciones de prestaciones ortoprotéticas.',
    icon: /*#__PURE__*/React.createElement(Icons.Search, null),
    color: 'bg-blue-900 text-white',
    badge: 'Gestión',
    image: 'pao_finder_thumb_1778710383483.png'
  }, {
    id: '3dprint',
    title: 'Impresión 3D',
    desc: 'Descubre y descarga modelos 3D de productos de apoyo gratuitos de la comunidad.',
    icon: /*#__PURE__*/React.createElement(Icons.Lightbulb, null),
    color: 'bg-orange-500 text-white',
    badge: 'Tecnología',
    image: '3d_printing_thumb.png'
  }, {
    id: 'chatbot',
    title: 'Consultor de Terapia Ocupacional',
    desc: 'Chatbot experto formal y técnico en tratamientos de TO, productos de apoyo, rehabilitación, geriatría e infantil.',
    icon: /*#__PURE__*/React.createElement(Icons.MessageSquare, null),
    color: 'bg-indigo-600 text-white',
    badge: 'Asistente IA',
    image: 'chatbot_to_thumbnail.jpg'
  }];
  const cte = getCTEStatus();
  return /*#__PURE__*/React.createElement("section", {
    id: "resources",
    className: "pt-36 pb-24 px-4 bg-brand-50/50 min-h-screen"
  }, /*#__PURE__*/React.createElement("div", {
    className: `${view === 'chatbot' ? 'max-w-7xl' : 'max-w-6xl'} mx-auto transition-all duration-300`
  }, view !== 'menu' && /*#__PURE__*/React.createElement(ResourceSubNav, {
    currentView: view,
    onViewChange: updateView
  }), view === 'menu' && /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-16"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block bg-brand-100 text-brand-700 rounded-full px-5 py-2 text-base font-bold uppercase tracking-widest mb-4"
  }, "\xC1rea del Profesional"), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-4xl sm:text-5xl font-bold text-brand-900 mb-6"
  }, "Recursos para Profesionales"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8"
  }, "Bienvenido al espacio de recursos especializados para profesionales de la salud, la ergonom\xEDa y la accesibilidad. Esta suite de herramientas digitales ha sido dise\xF1ada para optimizar tu tiempo y simplificar la gesti\xF3n t\xE9cnica en el d\xEDa a d\xEDa. Desde la validaci\xF3n \xE1gil de normativas arquitect\xF3nicas hasta la creaci\xF3n instant\xE1nea de materiales cognitivos a medida, encuentra aqu\xED el apoyo pr\xE1ctico necesario para potenciar tus intervenciones y centrar toda tu energ\xEDa en el bienestar del usuario."), /*#__PURE__*/React.createElement("div", {
    className: "section-divider w-24 mx-auto mb-8"
  })), view === 'menu' ? /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-3 gap-8 anim-fade-in"
  }, tools.map(tool => /*#__PURE__*/React.createElement("div", {
    key: tool.id,
    onClick: () => updateView(tool.id),
    className: "bg-white rounded-[2.5rem] overflow-hidden border border-brand-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer group flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-48 overflow-hidden relative"
  }, /*#__PURE__*/React.createElement("img", {
    src: tool.image,
    className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
    alt: tool.title
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
  }), /*#__PURE__*/React.createElement("div", {
    className: `absolute top-4 right-4 w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform`
  }, tool.icon)), /*#__PURE__*/React.createElement("div", {
    className: "p-8 flex flex-col items-center text-center flex-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-brand-400 font-bold uppercase tracking-widest text-[10px] mb-3"
  }, tool.badge), /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-xl font-bold text-brand-900 mb-4"
  }, tool.title), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 text-sm leading-relaxed mb-8 flex-1"
  }, tool.desc), /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-2 text-brand-600 font-bold group-hover:gap-3 transition-all text-sm"
  }, "Abrir herramienta", /*#__PURE__*/React.createElement(Icons.ArrowRight, null)))))) : view === 'math' ? /*#__PURE__*/React.createElement("div", {
    className: "anim-scale-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-brand-100 flex flex-col lg:flex-row mb-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 p-8 sm:p-12 lg:p-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 mb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-14 h-14 bg-brand-900 text-white rounded-2xl flex items-center justify-center shadow-lg"
  }, /*#__PURE__*/React.createElement(Icons.FilePdf, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-3xl font-bold text-brand-900"
  }, "Generador de Fichas"), /*#__PURE__*/React.createElement("p", {
    className: "text-brand-500 font-bold uppercase tracking-widest text-xs"
  }, "C\xE1lculo Matem\xE1tico"))), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 text-lg mb-6 leading-relaxed"
  }, "Dise\xF1a sesiones de entrenamiento cognitivo a la medida de cada usuario de forma r\xE1pida y eficaz. Con nuestro generador, dispones de material ilimitado, aleatorio y adaptado a diferentes niveles de complejidad (c\xE1lculo, atenci\xF3n y lenguaje). Una soluci\xF3n pr\xE1ctica para enriquecer tus herramientas terap\xE9uticas sin invertir horas en preparaci\xF3n administrativa."), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 text-lg mb-10 leading-relaxed"
  }, "Selecciona el tipo de actividad y la dificultad para generar un PDF personalizado listo para imprimir."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 mb-10"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-brand-900 text-sm uppercase tracking-wider"
  }, "Tipo de ficha"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-4 gap-3"
  }, [{
    id: 'math',
    label: 'Cálculo',
    icon: /*#__PURE__*/React.createElement(Icons.Calculator, {
      className: "w-4 h-4"
    })
  }, {
    id: 'wordsearch',
    label: 'Sopa Letras',
    icon: /*#__PURE__*/React.createElement(Icons.Search, {
      className: "w-4 h-4"
    })
  }, {
    id: 'visual',
    label: 'Agudeza',
    icon: /*#__PURE__*/React.createElement(Icons.Brain, {
      className: "w-4 h-4"
    })
  }, {
    id: 'sudoku',
    label: 'Sudoku',
    icon: /*#__PURE__*/React.createElement(Icons.Puzzle, {
      className: "w-4 h-4"
    })
  }].map(type => /*#__PURE__*/React.createElement("button", {
    key: type.id,
    onClick: () => setSheetType(type.id),
    className: `py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border-2 ${sheetType === type.id ? 'bg-brand-50 border-brand-900 text-brand-900' : 'bg-white border-gray-100 text-gray-400 hover:border-brand-200'}`
  }, type.icon, type.label)))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 mb-12"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-brand-900 text-sm uppercase tracking-wider"
  }, "Nivel de dificultad"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-3"
  }, [{
    id: 'easy',
    label: 'Básica'
  }, {
    id: 'medium',
    label: 'Media'
  }, {
    id: 'hard',
    label: 'Alta'
  }].map(level => /*#__PURE__*/React.createElement("button", {
    key: level.id,
    onClick: () => setDifficulty(level.id),
    className: `py-4 rounded-2xl font-bold transition-all border-2 ${difficulty === level.id ? 'bg-brand-900 text-white border-brand-900 shadow-lg scale-105' : 'bg-white text-gray-400 border-gray-100 hover:border-brand-200 hover:text-brand-600'}`
  }, level.label)))), /*#__PURE__*/React.createElement("button", {
    onClick: handleMainAction,
    disabled: isGenerating,
    className: "w-full py-5 bg-brand-900 text-white rounded-2xl font-bold text-xl hover:bg-opacity-90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-900/20 disabled:opacity-50 group"
  }, isGenerating ? /*#__PURE__*/React.createElement("div", {
    className: "w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icons.Download, null), "Descargar Ficha PDF"))), /*#__PURE__*/React.createElement("div", {
    className: "lg:w-[45%] bg-brand-900 relative min-h-[400px] flex flex-col justify-end p-8 sm:p-12 lg:p-16 overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: "resources_bg.png",
    className: "absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/40 to-transparent"
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative z-10"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-2xl font-bold text-white mb-8 flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(Icons.Lightbulb, null), "Ventajas Cl\xEDnicas"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-4 mb-10"
  }, ['Material ilimitado y aleatorio.', 'Ahorro crítico de tiempo administrativo.', 'Adaptación al deterioro cognitivo.'].map((item, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "flex items-center gap-3 text-brand-100 font-medium"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-6 h-6 bg-accent-coral/20 text-accent-coral rounded-full flex items-center justify-center shrink-0"
  }, /*#__PURE__*/React.createElement(Icons.Check, null)), item))), /*#__PURE__*/React.createElement("div", {
    className: "p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-brand-200 italic text-lg leading-relaxed"
  }, "\"Automatizar el material de apoyo nos permite centrar toda nuestra energ\xEDa en el paciente.\"")))))) : view === 'ramp' ? /*#__PURE__*/React.createElement("div", {
    className: "anim-scale-in max-w-5xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] shadow-2xl border border-brand-100 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-8 sm:p-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 mb-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg"
  }, /*#__PURE__*/React.createElement(Icons.TrendingUp, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-3xl font-bold text-brand-900"
  }, "Calculadora de Rampas"), /*#__PURE__*/React.createElement("p", {
    className: "text-emerald-600 font-bold uppercase tracking-widest text-xs"
  }, "Cumplimiento CTE Espa\xF1a"))), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 text-lg mb-10 leading-relaxed"
  }, "La accesibilidad f\xEDsica es el primer paso para garantizar la autonom\xEDa en el entorno. Con esta herramienta, puedes verificar en segundos la viabilidad t\xE9cnica de cualquier rampa bajo el marco del CTE de Espa\xF1a. Dise\xF1a con la seguridad de que tus propuestas de adaptaci\xF3n cumplen con los est\xE1ndares legales de seguridad y funcionalidad."), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-3 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-sm font-bold text-brand-900 uppercase tracking-wider"
  }, "Altura (cm)"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: rampHeight,
    onChange: e => handleRampChange('h', e.target.value),
    className: `w-full p-4 rounded-2xl border-2 transition-all text-xl font-bold ${!cte.valid ? 'border-red-100 bg-red-50 text-red-600 focus:border-red-500' : 'border-brand-50 focus:border-emerald-500 bg-brand-50/30'}`,
    placeholder: "Ej: 15"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-sm font-bold text-brand-900 uppercase tracking-wider"
  }, "Longitud (cm)"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: rampLength,
    onChange: e => handleRampChange('l', e.target.value),
    className: `w-full p-4 rounded-2xl border-2 transition-all text-xl font-bold ${!cte.valid ? 'border-red-100 bg-red-50 text-red-600 focus:border-red-500' : 'border-brand-50 focus:border-emerald-500 bg-brand-50/30'}`,
    placeholder: "Ej: 250"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-sm font-bold text-brand-900 uppercase tracking-wider"
  }, "Pendiente (%)"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: rampSlope,
    onChange: e => handleRampChange('s', e.target.value),
    className: `w-full p-4 rounded-2xl border-2 transition-all text-xl font-bold ${!cte.valid ? 'border-red-100 bg-red-50 text-red-600 focus:border-red-500' : 'border-brand-50 focus:border-emerald-500 bg-brand-50/30'}`,
    placeholder: "Ej: 8"
  }))), /*#__PURE__*/React.createElement("div", {
    className: `p-6 rounded-3xl border-2 transition-all flex items-start gap-4 ${cte.valid ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: `p-2 rounded-xl ${cte.valid ? 'bg-emerald-200 text-emerald-700' : 'bg-red-200 text-red-700'}`
  }, cte.valid ? /*#__PURE__*/React.createElement(Icons.Check, null) : /*#__PURE__*/React.createElement(Icons.AlertCircle, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-lg"
  }, cte.valid ? 'Cálculo Correcto' : 'Incumple Normativa'), /*#__PURE__*/React.createElement("p", {
    className: "opacity-80"
  }, cte.msg || 'Introduce dos valores para calcular el tercero.'))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setRampHeight('');
      setRampLength('');
      setRampSlope('');
    },
    className: "w-full py-4 rounded-2xl border-2 border-gray-100 text-gray-400 font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Refresh, null), " Limpiar valores")), /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-50/50 rounded-[2rem] p-8 flex flex-col items-center justify-center min-h-[300px] border border-brand-100"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 400 200",
    className: "w-full h-auto drop-shadow-xl"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: "180",
    x2: "380",
    y2: "180",
    stroke: "#1a3052",
    strokeWidth: "4",
    strokeLinecap: "round"
  }), parseFloat(rampHeight) > 0 && parseFloat(rampLength) > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: `M 50 180 L 350 180 L 350 ${180 - Math.min(100, parseFloat(rampHeight) * 2)} Z`,
    fill: cte.valid ? '#10b981' : '#ef4444',
    fillOpacity: "0.2",
    stroke: cte.valid ? '#10b981' : '#ef4444',
    strokeWidth: "4",
    strokeLinejoin: "round",
    className: "transition-all duration-500"
  }), /*#__PURE__*/React.createElement("text", {
    x: "200",
    y: "195",
    textAnchor: "middle",
    className: "text-[10px] font-bold fill-brand-900"
  }, rampLength, "cm"), /*#__PURE__*/React.createElement("text", {
    x: "360",
    y: 180 - Math.min(50, parseFloat(rampHeight)),
    textAnchor: "start",
    className: "text-[10px] font-bold fill-brand-900"
  }, rampHeight, "cm"), /*#__PURE__*/React.createElement("text", {
    x: "200",
    y: 170 - Math.min(50, parseFloat(rampHeight)),
    textAnchor: "middle",
    className: `text-xs font-black ${cte.valid ? 'fill-emerald-600' : 'fill-red-600'}`
  }, rampSlope, "%")) : /*#__PURE__*/React.createElement("text", {
    x: "200",
    y: "100",
    textAnchor: "middle",
    className: "fill-brand-200 font-bold italic"
  }, "Esperando datos..."))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-900 p-8 text-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(Icons.Lightbulb, {
    className: "text-emerald-400"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium text-brand-100"
  }, /*#__PURE__*/React.createElement("strong", null, "Norma CTE DB-SUA:"), " Pendiente m\xE1x. 10% (L<300cm), 8% (L<600cm), 6% (Resto).")), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-brand-300 font-mono bg-black/20 px-4 py-2 rounded-lg border border-white/5"
  }, "F\xF3rmula: (H / L) * 100"))))) : view === 'circle' ? /*#__PURE__*/React.createElement("div", {
    className: "anim-scale-in max-w-5xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] shadow-2xl border border-brand-100 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-8 sm:p-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 mb-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-14 h-14 bg-accent-coral text-white rounded-2xl flex items-center justify-center shadow-lg"
  }, /*#__PURE__*/React.createElement(Icons.Circle, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-3xl font-bold text-brand-900"
  }, "Calculadora de C\xEDrculo"), /*#__PURE__*/React.createElement("p", {
    className: "text-accent-coral font-bold uppercase tracking-widest text-xs"
  }, "Di\xE1metro y Per\xEDmetro en Mil\xEDmetros"))), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 text-lg mb-10 leading-relaxed"
  }, "Optimiza el proceso de dise\xF1o geom\xE9trico en tus intervenciones. Esta herramienta automatiza el c\xE1lculo de per\xEDmetros y di\xE1metros cil\xEDndricos a partir de una sola medida. Una soluci\xF3n r\xE1pida y funcional pensada para trasladar los datos de las valoraciones cl\xEDnicas directamente al entorno de fabricaci\xF3n digital o personalizaci\xF3n de herramientas de autonom\xEDa."), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-sm font-bold text-brand-900 uppercase tracking-wider"
  }, "Di\xE1metro (mm)"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: circleDiameter,
    onChange: e => handleCircleChange('d', e.target.value),
    className: "w-full p-4 rounded-2xl border-2 border-brand-50 focus:border-accent-coral bg-brand-50/30 transition-all text-xl font-bold",
    placeholder: "Ej: 50"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-sm font-bold text-brand-900 uppercase tracking-wider"
  }, "Per\xEDmetro (mm)"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: circlePerimeter,
    onChange: e => handleCircleChange('p', e.target.value),
    className: "w-full p-4 rounded-2xl border-2 border-brand-50 focus:border-accent-coral bg-brand-50/30 transition-all text-xl font-bold",
    placeholder: "Ej: 157.08"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "p-6 rounded-3xl border-2 border-brand-100 bg-brand-50/30 text-brand-900 flex items-start gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-2 rounded-xl bg-brand-100 text-brand-700"
  }, /*#__PURE__*/React.createElement(Icons.Lightbulb, {
    className: "text-accent-coral"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-lg"
  }, "Informaci\xF3n del C\xE1lculo"), circleDiameter && circlePerimeter ? /*#__PURE__*/React.createElement("p", {
    className: "opacity-80"
  }, "Un c\xEDrculo con un di\xE1metro de ", /*#__PURE__*/React.createElement("strong", null, circleDiameter, " mm"), " tiene un per\xEDmetro de aproximadamente ", /*#__PURE__*/React.createElement("strong", null, circlePerimeter, " mm"), ".") : /*#__PURE__*/React.createElement("p", {
    className: "opacity-80"
  }, "Introduce el di\xE1metro o el per\xEDmetro para calcular autom\xE1ticamente el otro valor."))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setCircleDiameter('');
      setCirclePerimeter('');
    },
    className: "w-full py-4 rounded-2xl border-2 border-gray-100 text-gray-400 font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Refresh, null), " Limpiar valores")), /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-50/50 rounded-[2rem] p-8 flex flex-col items-center justify-center min-h-[300px] border border-brand-100 relative overflow-hidden"
  }, circleDiameter && circlePerimeter ? /*#__PURE__*/React.createElement("div", {
    className: "w-full flex flex-col items-center"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 200",
    className: "w-48 h-48 drop-shadow-xl mb-4"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "100",
    cy: "100",
    r: "80",
    fill: "none",
    stroke: "#e2e8f0",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "100",
    cy: "100",
    r: "80",
    fill: "none",
    stroke: "#E87D55",
    strokeWidth: "4",
    strokeDasharray: "502.65",
    strokeDashoffset: "0",
    className: "transition-all duration-500"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: "100",
    x2: "180",
    y2: "100",
    stroke: "#1A3052",
    strokeWidth: "4",
    strokeDasharray: "4 4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "20",
    cy: "100",
    r: "4",
    fill: "#1A3052"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "180",
    cy: "100",
    r: "4",
    fill: "#1A3052"
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-center space-y-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-bold text-brand-900"
  }, "Di\xE1metro (D): ", /*#__PURE__*/React.createElement("span", {
    className: "text-accent-coral font-mono text-base font-black"
  }, circleDiameter, " mm")), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-bold text-brand-900"
  }, "Per\xEDmetro (P): ", /*#__PURE__*/React.createElement("span", {
    className: "text-brand-900 font-mono text-base font-black"
  }, circlePerimeter, " mm")))) : /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 200",
    className: "w-36 h-36 mx-auto mb-4 opacity-20"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "100",
    cy: "100",
    r: "80",
    fill: "none",
    stroke: "#1A3052",
    strokeWidth: "4",
    strokeDasharray: "6 6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: "100",
    x2: "180",
    y2: "100",
    stroke: "#1A3052",
    strokeWidth: "2"
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-brand-500 font-bold italic text-sm"
  }, "Esperando datos..."))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-900 p-8 text-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(Icons.Circle, {
    className: "text-accent-coral"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium text-brand-100"
  }, /*#__PURE__*/React.createElement("strong", null, "Utilidad de Dise\xF1o:"), " Ideal para dimensionar adaptadores de llaves, engrosadores de cubiertos o cualquier f\xE9rula circular bas\xE1ndose en la medici\xF3n de su contorno.")), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-brand-300 font-mono bg-black/20 px-4 py-2 rounded-lg border border-white/5 whitespace-nowrap"
  }, "F\xF3rmulas: P = \u03C0 \xB7 D  |  D = P / \u03C0"))))) : view === 'pao' ? /*#__PURE__*/React.createElement("div", {
    className: "anim-scale-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] p-8 sm:p-12 shadow-xl border border-brand-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 mb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-lg"
  }, /*#__PURE__*/React.createElement(Icons.Search, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-3xl font-bold text-brand-900"
  }, "Buscador PAO (CatSalut)"), /*#__PURE__*/React.createElement("p", {
    className: "text-blue-500 font-bold uppercase tracking-widest text-xs"
  }, "Prestacions Ortoprot\xE8tiques"))), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 text-lg mb-10 leading-relaxed"
  }, "Optimiza el tiempo dedicado a la gesti\xF3n documental en tus intervenciones. Encuentra r\xE1pidamente las especificaciones, c\xF3digos y descripciones oficiales de los productos de apoyo financiados por el sistema de salud de Catalu\xF1a. Introduce el nombre del recurso o el c\xF3digo t\xE9cnico para verificar los datos necesarios de forma centralizada y sin necesidad de consultar extensos manuales en PDF."), /*#__PURE__*/React.createElement("div", {
    className: "relative mb-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-y-0 left-6 flex items-center pointer-events-none text-blue-500"
  }, /*#__PURE__*/React.createElement(Icons.Search, null)), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Ej: cadira de rodes, caminador, EPL 050...",
    className: "w-full pl-16 pr-8 py-6 bg-white border-2 border-brand-100 rounded-[2rem] focus:ring-8 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-xl shadow-sm placeholder:text-gray-400",
    value: searchTerm,
    onChange: e => handleSearch(e.target.value)
  })), searchResults.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "max-h-[600px] overflow-y-auto custom-scrollbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hidden md:block overflow-x-auto rounded-[2rem] border border-gray-100 shadow-inner bg-gray-50/30"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-left border-collapse"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "sticky top-0 z-10"
  }, /*#__PURE__*/React.createElement("tr", {
    className: "bg-brand-900 text-white"
  }, /*#__PURE__*/React.createElement("th", {
    className: "p-5 font-display text-sm uppercase tracking-widest"
  }, "C\xF3digo PAO"), /*#__PURE__*/React.createElement("th", {
    className: "p-5 font-display text-sm uppercase tracking-widest"
  }, "Producto / Descripci\xF3n"), /*#__PURE__*/React.createElement("th", {
    className: "p-5 font-display text-sm uppercase tracking-widest text-right"
  }, "Importe"), /*#__PURE__*/React.createElement("th", {
    className: "p-5 font-display text-sm uppercase tracking-widest text-center"
  }, "Detalles"))), /*#__PURE__*/React.createElement("tbody", {
    className: "divide-y divide-gray-100 bg-white"
  }, searchResults.map((item, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    className: "hover:bg-blue-50/50 transition-colors group/row hover:relative hover:z-30"
  }, /*#__PURE__*/React.createElement("td", {
    className: "p-5 align-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-50 border border-brand-100 rounded-2xl p-4 text-center group-hover/row:bg-white transition-colors shadow-sm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-xl font-black text-brand-900 tracking-tight block"
  }, item.sC, " ", item.tC))), /*#__PURE__*/React.createElement("td", {
    className: "p-5"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-brand-900 text-lg mb-1"
  }, item.tD), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-brand-500 font-medium uppercase tracking-wider"
  }, item.cD)), /*#__PURE__*/React.createElement("td", {
    className: "p-5 text-right whitespace-nowrap"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-black text-emerald-600 text-xl"
  }, item.p, "\u20AC"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 font-bold uppercase tracking-wide"
  }, "Aportaci\xF3n: ", item.u, "\u20AC")), /*#__PURE__*/React.createElement("td", {
    className: "p-5 text-center align-middle"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSelectedItem(item),
    className: "w-12 h-12 bg-gray-50 border-2 border-gray-100 rounded-2xl flex items-center justify-center text-brand-600 hover:bg-brand-900 hover:text-white transition-all shadow-sm active:scale-95",
    title: "Ver detalles del producto"
  }, /*#__PURE__*/React.createElement(Icons.Search, null)))))))), /*#__PURE__*/React.createElement("div", {
    className: "md:hidden space-y-5"
  }, searchResults.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "bg-white rounded-3xl border border-brand-100 p-7 shadow-md"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-start mb-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-900 text-white px-5 py-2.5 rounded-xl font-mono font-bold text-xl"
  }, item.sC, " ", item.tC), /*#__PURE__*/React.createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-black text-emerald-600 text-2xl"
  }, item.p, "\u20AC"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 font-bold uppercase"
  }, "Usuario: ", item.u, "\u20AC"))), /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-brand-900 text-xl mb-2 leading-tight"
  }, item.tD), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-brand-500 uppercase tracking-wide mb-6 font-medium"
  }, item.cD), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4 pt-5 border-t border-brand-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-50 p-4 rounded-2xl"
  }, /*#__PURE__*/React.createElement("span", {
    className: "block text-[11px] text-brand-400 uppercase font-bold mb-1 tracking-wider"
  }, "Validaci\xF3n Sanitaria"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-brand-800 text-sm"
  }, item.v === 'S' ? 'Necesaria' : 'No requiere')), /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-50 p-4 rounded-2xl"
  }, /*#__PURE__*/React.createElement("span", {
    className: "block text-[11px] text-brand-400 uppercase font-bold mb-1 tracking-wider"
  }, "Periodicidad M\xEDn."), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-brand-800 text-sm"
  }, item.m, " meses"))))))) : searchTerm.length >= 4 ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-5xl mb-4"
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-gray-500"
  }, "No se han encontrado resultados para \"", searchTerm, "\"")) : /*#__PURE__*/React.createElement("div", {
    className: "text-center py-20 bg-blue-50/30 rounded-[2rem] border border-blue-100"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-5xl mb-4 text-blue-200"
  }, "\u2328\uFE0F"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-blue-900/60 font-medium"
  }, "Escribe al menos 4 caracteres para buscar")))) : view === '3dprint' ? /*#__PURE__*/React.createElement("div", {
    className: "anim-scale-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] p-8 sm:p-12 shadow-xl border border-brand-50 mb-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 mb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-14 h-14 bg-orange-500 text-white rounded-2xl flex items-center justify-center shadow-lg"
  }, /*#__PURE__*/React.createElement(Icons.Lightbulb, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-3xl font-bold text-brand-900"
  }, "Impresi\xF3n 3D"), /*#__PURE__*/React.createElement("p", {
    className: "text-orange-500 font-bold uppercase tracking-widest text-xs"
  }, "Productos de Apoyo"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 text-xl text-gray-700 leading-relaxed mb-12 max-w-4xl"
  }, /*#__PURE__*/React.createElement("p", null, "La impresi\xF3n 3D permite que soluciones muy \xFAtiles lleguen a cualquier casa de forma sencilla. Hay much\xEDsima gente compartiendo sus ideas generosamente por internet, lo que hace que hoy sea m\xE1s f\xE1cil que nunca encontrar herramientas que nos ayuden con las tareas del d\xEDa a d\xEDa."), /*#__PURE__*/React.createElement("p", null, "Peque\xF1as piezas, como adaptadores de llaves o mangos para cubiertos, suponen un gran cambio en la autonom\xEDa. Al estar listos para descargar e imprimir, son opciones r\xE1pidas y econ\xF3micas para mejorar el entorno personal sin necesidad de realizar grandes inversiones."), /*#__PURE__*/React.createElement("p", null, "Aqu\xED tienes un recopilatorio de modelos interesantes seleccionados de plataformas como Thingiverse. Son recursos creados por otros usuarios para ayudar a los dem\xE1s; te invitamos a explorar estas ideas y descubrir todo lo que se puede conseguir con esta tecnolog\xEDa.")), /*#__PURE__*/React.createElement("a", {
    href: "https://www.thingiverse.com/Pablosky92/collections/44071207/things",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "block group mb-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-orange-50 rounded-[2rem] overflow-hidden border border-orange-100 shadow-md group-hover:shadow-xl group-hover:border-orange-200 transition-all flex flex-col md:flex-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:w-1/3 h-64 md:h-auto overflow-hidden relative"
  }, /*#__PURE__*/React.createElement("img", {
    src: "3d_printed_objects.png",
    alt: "Objetos impresos en 3D",
    className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-transparent to-black/30"
  })), /*#__PURE__*/React.createElement("div", {
    className: "p-8 md:p-12 flex-1 flex flex-col justify-center bg-white relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 right-0 p-6 opacity-10"
  }, /*#__PURE__*/React.createElement(Icons.Search, {
    className: "w-24 h-24"
  })), /*#__PURE__*/React.createElement("h4", {
    className: "font-display text-2xl font-bold text-brand-900 mb-3 relative z-10 group-hover:text-orange-600 transition-colors"
  }, "Colecci\xF3n Thingiverse"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 mb-6 relative z-10"
  }, "Explora la carpeta con decenas de archivos STL listos para imprimir: adaptadores de ba\xF1o, cubiertos, llaves y m\xE1s soluciones pr\xE1cticas."), /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-2 text-orange-600 font-bold group-hover:gap-3 transition-all relative z-10"
  }, "Abrir colecci\xF3n en Thingiverse", /*#__PURE__*/React.createElement(Icons.ArrowRight, null))))), /*#__PURE__*/React.createElement("div", {
    className: "pt-12 border-t border-brand-100 relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-brand-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Star, {
    className: "w-4 h-4 text-amber-400"
  }), " Material Recomendado")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 mt-8"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://amzn.to/4uxnC1f",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "block group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[2.5rem] p-4 sm:p-6 border-2 border-brand-50 shadow-xl group-hover:border-brand-300 group-hover:shadow-2xl transition-all flex flex-col sm:flex-row items-center gap-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full sm:w-48 h-48 rounded-2xl overflow-hidden shrink-0 bg-gray-50 relative"
  }, /*#__PURE__*/React.createElement("img", {
    src: "pla_filament_product.png",
    alt: "Filamento PLA",
    className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-2 left-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-900 shadow-sm border border-brand-100"
  }, "PLA")), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 text-center sm:text-left pb-4 sm:pb-0"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-display text-2xl font-bold text-brand-900 mb-2 group-hover:text-brand-600 transition-colors"
  }, "Filamento PLA de alta calidad"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mb-6"
  }, "El material ideal para imprimir productos de apoyo: f\xE1cil de usar, resistente y vers\xE1til para todas tus creaciones diarias."), /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center justify-center gap-2 bg-brand-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-800 transition-all shadow-md group-hover:shadow-lg w-full sm:w-auto"
  }, "Ver producto en Amazon", /*#__PURE__*/React.createElement(Icons.ArrowRight, {
    className: "w-5 h-5 group-hover:translate-x-1 transition-transform"
  }))))), /*#__PURE__*/React.createElement("a", {
    href: "https://amzn.to/3RHR3yM",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "block group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[2.5rem] p-4 sm:p-6 border-2 border-brand-50 shadow-xl group-hover:border-brand-300 group-hover:shadow-2xl transition-all flex flex-col sm:flex-row items-center gap-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full sm:w-48 h-48 rounded-2xl overflow-hidden shrink-0 bg-gray-50 relative"
  }, /*#__PURE__*/React.createElement("img", {
    src: "petg_filament_product.png",
    alt: "Filamento PETG",
    className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-2 left-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-900 shadow-sm border border-brand-100"
  }, "PETG")), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 text-center sm:text-left pb-4 sm:pb-0"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-display text-2xl font-bold text-brand-900 mb-2 group-hover:text-brand-600 transition-colors"
  }, "Filamento PETG muy resistente"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mb-6"
  }, "Perfecto para adaptaciones que requieran mayor resistencia a impactos o est\xE9n expuestas a cambios de temperatura."), /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center justify-center gap-2 bg-brand-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-800 transition-all shadow-md group-hover:shadow-lg w-full sm:w-auto"
  }, "Ver producto en Amazon", /*#__PURE__*/React.createElement(Icons.ArrowRight, {
    className: "w-5 h-5 group-hover:translate-x-1 transition-transform"
  }))))), /*#__PURE__*/React.createElement("a", {
    href: "https://amzn.to/4wyJLNI",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "block group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[2.5rem] p-4 sm:p-6 border-2 border-brand-50 shadow-xl group-hover:border-brand-300 group-hover:shadow-2xl transition-all flex flex-col sm:flex-row items-center gap-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full sm:w-48 h-48 rounded-2xl overflow-hidden shrink-0 bg-gray-50 relative"
  }, /*#__PURE__*/React.createElement("img", {
    src: "abs_filament_product.png",
    alt: "Filamento ABS",
    className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-2 left-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-900 shadow-sm border border-brand-100"
  }, "ABS")), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 text-center sm:text-left pb-4 sm:pb-0"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-display text-2xl font-bold text-brand-900 mb-2 group-hover:text-brand-600 transition-colors"
  }, "Filamento ABS para mec\xE1nicas"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mb-6"
  }, "Excelente durabilidad and resistencia al desgaste, ideal para engranajes y piezas que sufran mucha fricci\xF3n continua."), /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center justify-center gap-2 bg-brand-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-800 transition-all shadow-md group-hover:shadow-lg w-full sm:w-auto"
  }, "Ver producto en Amazon", /*#__PURE__*/React.createElement(Icons.ArrowRight, {
    className: "w-5 h-5 group-hover:translate-x-1 transition-transform"
  }))))), /*#__PURE__*/React.createElement("a", {
    href: "https://amzn.to/4eLxH5z",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "block group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[2.5rem] p-4 sm:p-6 border-2 border-brand-50 shadow-xl group-hover:border-brand-300 group-hover:shadow-2xl transition-all flex flex-col sm:flex-row items-center gap-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full sm:w-48 h-48 rounded-2xl overflow-hidden shrink-0 bg-gray-50 relative"
  }, /*#__PURE__*/React.createElement("img", {
    src: "tpu_filament_product.png",
    alt: "Filamento TPU",
    className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-2 left-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-900 shadow-sm border border-brand-100"
  }, "TPU")), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 text-center sm:text-left pb-4 sm:pb-0"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-display text-2xl font-bold text-brand-900 mb-2 group-hover:text-brand-600 transition-colors"
  }, "Filamento TPU flexible"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mb-6"
  }, "Material el\xE1stico tipo goma, fant\xE1stico para crear fundas, protectores antideslizantes o agarraderas ergon\xF3micas."), /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center justify-center gap-2 bg-brand-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-800 transition-all shadow-md group-hover:shadow-lg w-full sm:w-auto"
  }, "Ver producto en Amazon", /*#__PURE__*/React.createElement(Icons.ArrowRight, {
    className: "w-5 h-5 group-hover:translate-x-1 transition-transform"
  }))))))))) : view === 'chatbot' ? /*#__PURE__*/React.createElement("div", {
    className: "anim-scale-in"
  }, /*#__PURE__*/React.createElement(ChatbotComponent, null)) : null), selectedItem && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in",
    onClick: () => setSelectedItem(null)
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white w-full max-w-lg rounded-[3rem] p-8 sm:p-10 shadow-2xl border border-brand-100 relative anim-scale-in",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSelectedItem(null),
    className: "absolute top-6 right-6 w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
  }, /*#__PURE__*/React.createElement(Icons.X, {
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bg-brand-50 text-brand-900 border border-brand-100 px-4 py-1.5 rounded-full font-mono font-bold text-sm"
  }, "C\xF3digo PAO: ", selectedItem.sC, " ", selectedItem.tC)), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-brand-900 mb-2 leading-tight"
  }, selectedItem.tD), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-brand-500 uppercase tracking-wider font-semibold mb-6"
  }, selectedItem.cD), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4 mb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl"
  }, /*#__PURE__*/React.createElement("span", {
    className: "block text-[11px] text-emerald-700 uppercase font-bold mb-1 tracking-wider"
  }, "Importe M\xE1ximo"), /*#__PURE__*/React.createElement("span", {
    className: "font-black text-emerald-600 text-2xl"
  }, selectedItem.p, "\u20AC")), /*#__PURE__*/React.createElement("div", {
    className: "bg-blue-50/50 border border-blue-100 p-5 rounded-2xl"
  }, /*#__PURE__*/React.createElement("span", {
    className: "block text-[11px] text-blue-700 uppercase font-bold mb-1 tracking-wider"
  }, "Aportaci\xF3n Usuario"), /*#__PURE__*/React.createElement("span", {
    className: "font-black text-brand-900 text-2xl"
  }, selectedItem.u, "\u20AC"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 pt-6 border-t border-gray-100"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center py-2.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500 font-medium"
  }, "Validaci\xF3n Sanitaria:"), /*#__PURE__*/React.createElement("span", {
    className: `px-3 py-1 rounded-full text-xs font-bold ${selectedItem.v === 'S' ? 'bg-amber-50 text-amber-800 border border-amber-100' : 'bg-gray-50 text-gray-600 border border-gray-100'}`
  }, selectedItem.v === 'S' ? 'Necesaria (Sí)' : 'No requiere (No)')), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center py-2.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500 font-medium"
  }, "Periodicidad M\xEDnima:"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-brand-900"
  }, selectedItem.m, " meses")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center py-2.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500 font-medium"
  }, "Aportaci\xF3n CatSalut:"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-emerald-600"
  }, selectedItem.s, "\u20AC"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-8"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSelectedItem(null),
    className: "w-full py-4 bg-brand-900 hover:bg-brand-950 text-white rounded-2xl font-bold transition-all shadow-md active:scale-[0.98]"
  }, "Cerrar Detalles")))));
};

// --- APP ---
function App() {
  const [currentPage, setCurrentPage] = useState('resources');
  const [isPWA, setIsPWA] = useState(false);
  const [installable, setInstallable] = useState(false);
  const [showInstaller, setShowInstaller] = useState(false);
  const isInApp = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('browser') === 'true') return false;
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  }, []);
  const checkPWA = useCallback(() => {
    setIsPWA(isInApp);
  }, [isInApp]);
  useEffect(() => {
    checkPWA();
    window.addEventListener('pwa-installable', () => setInstallable(true));
    window.addEventListener('pwa-installed', () => {
      setInstallable(false);
      checkPWA();
    });
    if (window.deferredPrompt) {
      setInstallable(true);
    }
  }, [checkPWA]);
  const navigateTo = useCallback((page, section = null) => {
    if (page === 'resources') {
      setCurrentPage('resources');
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    } else {
      let target = 'index.html';
      if (page === 'cognitive' || page === 'games') target = 'estimulacion-cognitiva.html';else if (page === 'guides') target = 'guias.html';else if (page === 'cv') target = 'cv.html';else if (page === 'analyzer') target = 'valoracion-estancia.html';else if (page === 'contact') target = 'contacto.html';else if (page === 'legal') target = 'aviso-legal.html';
      if (section) {
        target += '?section=' + section;
      }
      window.location.href = target;
    }
  }, []);
  const isStandalone = isInApp && sessionStorage.getItem('allowWebInApp') !== 'true';
  return /*#__PURE__*/React.createElement(React.Fragment, null, showInstaller && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-x-0 bottom-0 z-[100] p-4 anim-slide-up"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[2rem] p-6 max-w-lg mx-auto shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.3)] border-t-4 border-brand-900 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 mb-5 text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 bg-brand-50 text-brand-900 rounded-xl flex items-center justify-center text-xl"
  }, /*#__PURE__*/React.createElement(Icons.Download, null)), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-lg font-bold text-brand-900"
  }, "\xBFInstalar Recursos IAdapta?"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 leading-tight"
  }, "Acceso directo a herramientas profesionales en tu pantalla.")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowInstaller(false),
    className: "p-2 text-gray-300"
  }, /*#__PURE__*/React.createElement(Icons.X, null))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (window.deferredPrompt) {
        window.deferredPrompt.prompt();
        setShowInstaller(false);
      } else {
        alert("Nota de sistema:\n\nPara instalar la App:\n1. Toca compartir o menú en tu navegador.\n2. Selecciona 'Añadir a pantalla de inicio'.");
        setShowInstaller(false);
      }
    },
    className: "py-3.5 bg-brand-900 text-white rounded-xl font-bold text-sm hover:bg-brand-800 transition-all active:scale-95 shadow-lg shadow-brand-900/20"
  }, "Instalar Ahora"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowInstaller(false),
    className: "py-3.5 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all"
  }, "M\xE1s tarde")))), !isStandalone && /*#__PURE__*/React.createElement(Navbar, {
    currentPage: "resources"
  }), /*#__PURE__*/React.createElement("main", {
    id: "main-content"
  }, /*#__PURE__*/React.createElement(SectionResources, {
    navigateTo: navigateTo,
    isPWA: isPWA,
    setShowInstaller: setShowInstaller
  })), !isStandalone && /*#__PURE__*/React.createElement(Footer, {
    currentPage: "resources"
  }), !isStandalone && /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();