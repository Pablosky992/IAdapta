(function() {
const {
  Icons,
  Navbar,
  Footer,
  CookieBanner
} = window;
window.AppConfig = {
  AMAZON_AFFILIATE_ID: ""
};

// --- CLOUD SYNC HELPERS ---
const initDeviceId = () => {
  let deviceId = localStorage.getItem('daily_challenge_device_id');
  if (!deviceId) {
    deviceId = 'anon_' + Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('daily_challenge_device_id', deviceId);
  }
  return deviceId;
};
const getEmailHash = async email => {
  const cleanEmail = email.trim().toLowerCase();
  if (!window.crypto || !window.crypto.subtle) {
    let hash = 0;
    for (let i = 0; i < cleanEmail.length; i++) {
      hash = (hash << 5) - hash + cleanEmail.charCodeAt(i);
      hash |= 0;
    }
    return 'hash_' + Math.abs(hash).toString(16);
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(cleanEmail);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};
const getPinHash = async pin => {
  const cleanPin = pin.trim();
  if (!window.crypto || !window.crypto.subtle) {
    let hash = 0;
    for (let i = 0; i < cleanPin.length; i++) {
      hash = (hash << 5) - hash + cleanPin.charCodeAt(i);
      hash |= 0;
    }
    return 'pin_' + Math.abs(hash).toString(16);
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(cleanPin);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};
const getPushSubscriptionSilently = async () => {
  if (localStorage.getItem('daily_challenge_notifications_enabled') === 'true' && 'Notification' in window && Notification.permission === 'granted' && 'serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      let subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array('BMYMyTsyO73fZSOP6B5HJP0Ii2YNFx4aFg4kIMaB830gpOv7vYhNF0xi7g9HhK50CZAPsezb9sDHcKVQxEBMS-k')
        });
      }
      return subscription ? JSON.stringify(subscription) : '';
    } catch (err) {
      console.error("Failed to silently fetch/subscribe push token:", err);
    }
  }
  return '';
};
const syncCloudProgress = async onSyncSuccess => {
  if (window.firebaseDB && window.firebaseDoc && window.firebaseGetDoc && window.firebaseSetDoc) {
    const deviceId = localStorage.getItem('daily_challenge_device_id');
    const linked = localStorage.getItem('daily_challenge_email') || '';
    if (!linked || !deviceId) return;
    try {
      const docRef = window.firebaseDoc(window.firebaseDB, "daily_challenge_streaks", deviceId);
      const docSnap = await window.firebaseGetDoc(docRef);
      let pushSubscriptionStr = '';
      try {
        pushSubscriptionStr = await getPushSubscriptionSilently();
      } catch (e) {
        console.error("Silent push fetch failed in syncCloudProgress", e);
      }
      if (docSnap.exists()) {
        const dbData = docSnap.data();
        const dbHistory = dbData.history || [];
        const localHistory = JSON.parse(localStorage.getItem('daily_challenge_history') || '[]');

        // Merge unique history dates
        const mergedHistory = Array.from(new Set([...localHistory, ...dbHistory])).sort();

        // Recalculate streak
        const calculateStreak = historyList => {
          if (!historyList || historyList.length === 0) return 0;
          const uniqueDates = [...new Set(historyList)].sort((a, b) => new Date(b) - new Date(a));
          const todayStr = new Date().toISOString().split('T')[0];
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          if (uniqueDates[0] !== todayStr && uniqueDates[0] !== yesterdayStr) {
            return 0;
          }
          let currentStreak = 0;
          let checkDate = new Date(uniqueDates[0]);
          for (let i = 0; i < 365; i++) {
            const checkStr = checkDate.toISOString().split('T')[0];
            if (uniqueDates.includes(checkStr)) {
              currentStreak++;
              checkDate.setDate(checkDate.getDate() - 1);
            } else {
              break;
            }
          }
          return currentStreak;
        };
        const newStreak = calculateStreak(mergedHistory);
        const lastDate = mergedHistory[mergedHistory.length - 1] || '';

        // Update localStorage
        localStorage.setItem('daily_challenge_history', JSON.stringify(mergedHistory));
        localStorage.setItem('daily_challenge_streak', newStreak.toString());
        if (lastDate) {
          localStorage.setItem('daily_challenge_last_date', lastDate);
        }
        if (dbData.notifications_enabled) {
          localStorage.setItem('daily_challenge_notifications_enabled', 'true');
        }
        if (onSyncSuccess) {
          onSyncSuccess(mergedHistory, newStreak);
        }

        // Write back merged state to Firestore
        const updatePayload = {
          email: linked,
          streak: newStreak,
          last_date: lastDate,
          history: mergedHistory,
          updated_at: new Date().toISOString()
        };
        if (localStorage.getItem('daily_challenge_notifications_enabled') === 'true') {
          updatePayload.notifications_enabled = true;
          if (pushSubscriptionStr) {
            updatePayload.push_subscription = pushSubscriptionStr;
          }
        }
        await window.firebaseSetDoc(docRef, updatePayload, {
          merge: true
        });
      } else {
        // Write local progress if Firestore doc doesn't exist yet
        const currentStreak = parseInt(localStorage.getItem('daily_challenge_streak') || '0');
        const last = localStorage.getItem('daily_challenge_last_date') || '';
        const h = JSON.parse(localStorage.getItem('daily_challenge_history') || '[]');
        const insertPayload = {
          email: linked,
          streak: currentStreak,
          last_date: last,
          history: h,
          updated_at: new Date().toISOString()
        };
        if (localStorage.getItem('daily_challenge_notifications_enabled') === 'true') {
          insertPayload.notifications_enabled = true;
          if (pushSubscriptionStr) {
            insertPayload.push_subscription = pushSubscriptionStr;
          }
        }
        await window.firebaseSetDoc(docRef, insertPayload, {
          merge: true
        });
      }
    } catch (err) {
      console.error("Cloud sync failed", err);
    }
  }
};
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
const {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo
} = React;

// --- ICONS ---
// --- ICONS ---
// --- STREAK CALENDAR MODAL ---
const StreakCalendarModal = function StreakCalendarModal({
  isOpen,
  onClose,
  history
}) {
  const {
    useState,
    useMemo
  } = React;
  if (!isOpen) return null;
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const [linkedEmail, setLinkedEmail] = useState(localStorage.getItem('daily_challenge_email') || '');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [isLinking, setIsLinking] = useState(false);
  const [showRestore, setShowRestore] = useState(false);
  const [restoreEmail, setRestoreEmail] = useState('');
  const [restorePin, setRestorePin] = useState('');
  const [isRestoring, setIsRestoring] = useState(false);
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const daysInMonth = useMemo(() => {
    return new Date(year, month + 1, 0).getDate();
  }, [year, month]);
  const firstDayIndex = useMemo(() => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  }, [year, month]);
  const calendarDays = useMemo(() => {
    const list = [];
    for (let i = 0; i < firstDayIndex; i++) {
      list.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      list.push({
        day: i,
        dateStr
      });
    }
    return list;
  }, [year, month, daysInMonth, firstDayIndex]);
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  const totalCompletions = useMemo(() => {
    return history.filter(date => {
      const d = new Date(date);
      return d.getFullYear() === year && d.getMonth() === month;
    }).length;
  }, [history, year, month]);
  const todayStr = new Date().toISOString().split('T')[0];
  const handleLink = async () => {
    if (!email.trim() || !email.includes('@')) {
      alert("Por favor, introduce un correo electrónico válido.");
      return;
    }
    if (pin.length !== 4 || isNaN(pin)) {
      alert("El PIN debe ser de exactamente 4 números.");
      return;
    }
    setIsLinking(true);
    try {
      const emailHash = await getEmailHash(email);
      const pinHash = await getPinHash(pin);
      if (window.firebaseDB && window.firebaseDoc && window.firebaseGetDoc && window.firebaseSetDoc) {
        const docRef = window.firebaseDoc(window.firebaseDB, "daily_challenge_streaks", emailHash);
        const docSnap = await window.firebaseGetDoc(docRef);
        const localStreak = parseInt(localStorage.getItem('daily_challenge_streak') || '0');
        const localLastDate = localStorage.getItem('daily_challenge_last_date') || '';
        if (docSnap.exists()) {
          const dbData = docSnap.data();
          const confirmLoad = window.confirm(`Ya existe una racha guardada con este correo en la nube (${dbData.streak} días).\n\n¿Quieres DESCARGAR tu progreso anterior de la nube (Aceptar) o SOBRESCRIBIRLO con tu racha actual de ${localStreak} días (Cancelar)?`);
          if (confirmLoad) {
            localStorage.setItem('daily_challenge_device_id', emailHash);
            localStorage.setItem('daily_challenge_email', email.trim().toLowerCase());
            localStorage.setItem('daily_challenge_history', JSON.stringify(dbData.history || []));
            localStorage.setItem('daily_challenge_streak', (dbData.streak || 0).toString());
            if (dbData.last_date) {
              localStorage.setItem('daily_challenge_last_date', dbData.last_date);
            } else {
              localStorage.removeItem('daily_challenge_last_date');
            }
            if (dbData.notifications_enabled) {
              localStorage.setItem('daily_challenge_notifications_enabled', 'true');
            }
            alert("¡Progreso descargado y vinculado con éxito!");
            window.location.reload();
            return;
          }
        }
        let pushSubscriptionStr = '';
        try {
          pushSubscriptionStr = await getPushSubscriptionSilently();
        } catch (e) {
          console.error("Silent push fetch failed in handleLink", e);
        }
        const linkPayload = {
          email: email.trim().toLowerCase(),
          pin_hash: pinHash,
          streak: localStreak,
          last_date: localLastDate,
          history: history,
          updated_at: new Date().toISOString()
        };
        if (localStorage.getItem('daily_challenge_notifications_enabled') === 'true') {
          linkPayload.notifications_enabled = true;
          if (pushSubscriptionStr) {
            linkPayload.push_subscription = pushSubscriptionStr;
          }
        }
        await window.firebaseSetDoc(docRef, linkPayload, {
          merge: true
        });
        localStorage.setItem('daily_challenge_device_id', emailHash);
        localStorage.setItem('daily_challenge_email', email.trim().toLowerCase());
        setLinkedEmail(email.trim().toLowerCase());
        alert("¡Copia de seguridad en la nube vinculada con éxito!");
      } else {
        alert("La conexión con la nube no está lista. Inténtalo de nuevo en unos segundos.");
      }
    } catch (e) {
      console.error(e);
      alert("Hubo un error al guardar en la nube: " + e.message);
    } finally {
      setIsLinking(false);
    }
  };
  const handleRestore = async () => {
    if (!restoreEmail.trim() || !restoreEmail.includes('@')) {
      alert("Por favor, introduce un correo electrónico válido.");
      return;
    }
    if (restorePin.length !== 4 || isNaN(restorePin)) {
      alert("El PIN debe ser de exactamente 4 números.");
      return;
    }
    setIsRestoring(true);
    try {
      const emailHash = await getEmailHash(restoreEmail);
      const pinHash = await getPinHash(restorePin);
      if (window.firebaseDB && window.firebaseDoc && window.firebaseGetDoc) {
        const docRef = window.firebaseDoc(window.firebaseDB, "daily_challenge_streaks", emailHash);
        const docSnap = await window.firebaseGetDoc(docRef);
        if (docSnap.exists()) {
          const dbData = docSnap.data();
          if (dbData.pin_hash === pinHash) {
            localStorage.setItem('daily_challenge_device_id', emailHash);
            localStorage.setItem('daily_challenge_email', restoreEmail.trim().toLowerCase());
            localStorage.setItem('daily_challenge_history', JSON.stringify(dbData.history || []));
            localStorage.setItem('daily_challenge_streak', (dbData.streak || 0).toString());
            if (dbData.last_date) {
              localStorage.setItem('daily_challenge_last_date', dbData.last_date);
            } else {
              localStorage.removeItem('daily_challenge_last_date');
            }
            if (dbData.notifications_enabled) {
              localStorage.setItem('daily_challenge_notifications_enabled', 'true');
            }
            alert("¡Racha recuperada con éxito!");
            window.location.reload();
          } else {
            alert("El PIN de seguridad introducido es incorrecto.");
          }
        } else {
          alert("No se encontró ningún registro para el correo electrónico introducido.");
        }
      } else {
        alert("La conexión con la nube no está lista. Inténtalo en unos segundos.");
      }
    } catch (e) {
      console.error(e);
      alert("Hubo un error al recuperar los datos: " + e.message);
    } finally {
      setIsRestoring(false);
    }
  };
  const handleUnlink = async () => {
    const confirmUnlink = window.confirm("¿Seguro que quieres desvincular tu correo? Los nuevos progresos se guardarán de forma local anónima en este dispositivo y ya no se actualizarán en tu correo.");
    if (confirmUnlink) {
      try {
        if (window.firebaseDB && window.firebaseDoc && window.firebaseSetDoc) {
          const emailHash = await getEmailHash(linkedEmail);
          const docRef = window.firebaseDoc(window.firebaseDB, "daily_challenge_streaks", emailHash);

          // Wiping the email field from the database to guarantee GDPR compliance
          await window.firebaseSetDoc(docRef, {
            email: "",
            updated_at: new Date().toISOString()
          }, {
            merge: true
          });
        }
      } catch (e) {
        console.error("Error al desvincular correo en la nube:", e);
      }
      localStorage.removeItem('daily_challenge_email');
      const randomId = 'anon_' + Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('daily_challenge_device_id', randomId);
      setLinkedEmail('');
      alert("Correo desvinculado con éxito.");
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[150] flex items-center justify-center bg-brand-900/60 backdrop-blur-sm p-4 anim-fade-in",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl border border-brand-100 overflow-hidden anim-scale-in",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-900 text-white p-6 relative"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
  }, /*#__PURE__*/React.createElement(Icons.X, {
    className: "w-4 h-4"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 bg-accent-coral rounded-xl flex items-center justify-center text-white"
  }, /*#__PURE__*/React.createElement(Icons.Calendar, {
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-xl font-bold"
  }, "Calendario de Racha"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-brand-300"
  }, "Historial de entrenamiento mental")))), /*#__PURE__*/React.createElement("div", {
    className: "p-6 max-h-[85vh] overflow-y-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-6"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: prevMonth,
    className: "p-2 rounded-xl hover:bg-brand-50 text-brand-900 transition-colors"
  }, /*#__PURE__*/React.createElement(Icons.ChevronLeft, {
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("h4", {
    className: "font-display text-lg font-bold text-brand-900"
  }, monthNames[month], " ", year), /*#__PURE__*/React.createElement("button", {
    onClick: nextMonth,
    disabled: year >= new Date().getFullYear() && month >= new Date().getMonth(),
    className: "p-2 rounded-xl hover:bg-brand-50 text-brand-900 transition-colors disabled:opacity-30 disabled:pointer-events-none"
  }, /*#__PURE__*/React.createElement(Icons.ChevronRight, {
    className: "w-5 h-5"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-7 gap-2 text-center text-xs font-bold text-brand-400 uppercase mb-4"
  }, /*#__PURE__*/React.createElement("span", null, "L"), /*#__PURE__*/React.createElement("span", null, "M"), /*#__PURE__*/React.createElement("span", null, "X"), /*#__PURE__*/React.createElement("span", null, "J"), /*#__PURE__*/React.createElement("span", null, "V"), /*#__PURE__*/React.createElement("span", null, "S"), /*#__PURE__*/React.createElement("span", null, "D")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-7 gap-2 text-center"
  }, calendarDays.map((item, idx) => {
    if (!item) {
      return /*#__PURE__*/React.createElement("div", {
        key: `empty-${idx}`,
        className: "aspect-square"
      });
    }
    const {
      day,
      dateStr
    } = item;
    const isCompleted = history.includes(dateStr);
    const isToday = dateStr === todayStr;
    const isFuture = dateStr > todayStr;
    return /*#__PURE__*/React.createElement("div", {
      key: dateStr,
      className: `aspect-square rounded-full flex flex-col items-center justify-center text-xs font-bold transition-all relative
                        ${isCompleted ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 scale-105' : isToday ? 'bg-brand-50 text-brand-900 ring-2 ring-brand-900' : isFuture ? 'text-gray-300 pointer-events-none' : 'bg-red-50 text-red-400 hover:bg-red-100/50'}`,
      title: isCompleted ? 'Entrenado' : isFuture ? 'Futuro' : 'No entrenado'
    }, /*#__PURE__*/React.createElement("span", null, day), isCompleted && /*#__PURE__*/React.createElement("span", {
      className: "absolute bottom-1 w-1 h-1 bg-white rounded-full"
    }), !isCompleted && !isFuture && !isToday && /*#__PURE__*/React.createElement("span", {
      className: "absolute bottom-1 w-1.5 h-1.5 bg-red-400 rounded-full"
    }));
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 pt-4 border-t border-brand-50 grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-50/50 p-3.5 rounded-2xl text-center border border-brand-50"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-brand-400 font-bold uppercase tracking-wider block mb-1"
  }, "D\xEDas Completados"), /*#__PURE__*/React.createElement("span", {
    className: "text-xl font-bold text-brand-900 flex items-center justify-center gap-1.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-2.5 h-2.5 rounded-full bg-emerald-500"
  }), " ", totalCompletions)), /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-50/50 p-3.5 rounded-2xl text-center border border-brand-50"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-brand-400 font-bold uppercase tracking-wider block mb-1"
  }, "Racha Actual"), /*#__PURE__*/React.createElement("span", {
    className: "text-xl font-bold text-brand-900 flex items-center justify-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icons.Flame, {
    className: "w-5 h-5 text-accent-coral"
  }), " ", localStorage.getItem('daily_challenge_streak') || 0))), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 pt-4 border-t border-brand-50 text-center"
  }, linkedEmail ? /*#__PURE__*/React.createElement("div", {
    className: "bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2"
  }, /*#__PURE__*/React.createElement(Icons.Shield, {
    className: "w-4 h-4 text-emerald-600"
  }), /*#__PURE__*/React.createElement("span", null, "Copia de seguridad activa")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-emerald-950 mb-3"
  }, "Tu progreso se est\xE1 guardando autom\xE1ticamente en la nube y est\xE1 vinculado a: ", /*#__PURE__*/React.createElement("strong", null, linkedEmail)), /*#__PURE__*/React.createElement("button", {
    onClick: handleUnlink,
    className: "text-xs text-red-600 font-bold hover:underline"
  }, "Desvincular correo")) : /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-50/50 border border-brand-100 rounded-2xl p-4 text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 text-brand-700 font-bold text-xs uppercase tracking-wider mb-1.5"
  }, /*#__PURE__*/React.createElement(Icons.Shield, {
    className: "w-4 h-4 text-brand-500"
  }), /*#__PURE__*/React.createElement("span", null, "Copia en la nube (Recomendado)")), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-gray-500 leading-tight mb-3"
  }, "Vincula tu correo y crea un PIN de 4 n\xFAmeros para no perder tu racha si cambias de m\xF3vil."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 mb-3"
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    placeholder: "ejemplo@correo.com",
    value: email,
    onChange: e => setEmail(e.target.value),
    className: "w-full px-3 py-2 rounded-xl border border-brand-200 text-xs focus:border-accent-coral focus:outline-none"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "PIN de seguridad (4 n\xFAmeros)",
    value: pin,
    onChange: e => setPin(e.target.value.replace(/\D/g, '')),
    maxLength: "4",
    className: "w-full px-3 py-2 rounded-xl border border-brand-200 text-xs focus:border-accent-coral focus:outline-none text-center font-bold tracking-widest"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: handleLink,
    disabled: isLinking,
    className: "w-full py-2 bg-brand-900 hover:bg-brand-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm disabled:opacity-50"
  }, isLinking ? 'Guardando...' : 'Guardar copia de seguridad'), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] text-gray-400 leading-tight mt-3"
  }, "Al vincular tu racha, aceptas que IAdapta guarde tu correo electr\xF3nico para la copia de seguridad y para el env\xEDo ocasional de boletines informativos y consejos de salud. Podr\xE1s darte de baja cuando lo desees.")), /*#__PURE__*/React.createElement("div", {
    className: "w-full mt-4 text-center"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowRestore(!showRestore),
    className: "text-[10px] text-brand-500 font-bold hover:text-brand-700 hover:underline"
  }, showRestore ? 'Ocultar recuperación' : '¿Cambiaste de móvil o perdiste tu racha? Recupérala aquí'), showRestore && /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-50/50 border border-brand-100 rounded-2xl p-4 text-left mt-2 space-y-2 animate-fadeIn"
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    placeholder: "Tu correo vinculado",
    value: restoreEmail,
    onChange: e => setRestoreEmail(e.target.value),
    className: "w-full px-3 py-2 rounded-xl border border-brand-200 text-xs focus:border-accent-coral focus:outline-none"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "PIN de 4 n\xFAmeros",
    value: restorePin,
    onChange: e => setRestorePin(e.target.value.replace(/\D/g, '')),
    maxLength: "4",
    className: "w-full px-3 py-2 rounded-xl border border-brand-200 text-xs focus:border-accent-coral focus:outline-none text-center font-bold tracking-widest"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: handleRestore,
    disabled: isRestoring,
    className: "w-full py-2 bg-accent-coral hover:bg-accent-coral/90 text-white rounded-xl text-xs font-bold transition-all shadow-sm disabled:opacity-50"
  }, isRestoring ? 'Recuperando...' : 'Restaurar progreso')))))));
};

// --- REUSABLE GAME HEADER ---
const GameHeader = function GameHeader({
  title,
  subtitle,
  onBack,
  onRestart,
  onLevels,
  isStandalone
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col mb-8 relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 w-full"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    className: "inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors bg-white px-5 py-2.5 rounded-xl shadow-sm border border-brand-100 group"
  }, /*#__PURE__*/React.createElement(Icons.ArrowLeft, {
    className: "w-5 h-5 group-hover:-translate-x-1 transition-transform"
  }), /*#__PURE__*/React.createElement("span", null, "Volver")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onRestart,
    className: "text-brand-500 hover:text-brand-700 p-2.5 flex items-center gap-2 text-sm font-bold bg-white rounded-xl shadow-sm border border-brand-100 transition-all hover:scale-105 active:scale-95",
    title: "Reiniciar este nivel"
  }, /*#__PURE__*/React.createElement(Icons.Refresh, {
    className: "w-5 h-5"
  }), /*#__PURE__*/React.createElement("span", null, "Reiniciar")), /*#__PURE__*/React.createElement("button", {
    onClick: onLevels,
    className: "text-brand-500 hover:text-brand-700 p-2.5 flex items-center gap-2 text-sm font-bold bg-white rounded-xl shadow-sm border border-brand-100 transition-all hover:scale-105 active:scale-95",
    title: "Ir al selector de niveles"
  }, /*#__PURE__*/React.createElement(Icons.List, {
    className: "w-5 h-5"
  }), /*#__PURE__*/React.createElement("span", null, "Niveles")))), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-4xl font-bold text-brand-900 mb-2"
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center gap-3"
  }, subtitle));
};
const StarRating = function StarRating({
  stars
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex gap-1 justify-center my-6"
  }, [1, 2, 3, 4, 5].map(i => /*#__PURE__*/React.createElement(Icons.Star, {
    key: i,
    className: `w-10 h-10 ${i <= stars ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`
  })));
};
const ShareButtons = function ShareButtons({
  game,
  score,
  time
}) {
  const motivationalText = score && score.includes('racha') ? '🔥 ¡Mi cerebro está que arde!' : '🧠 ¡Entrenando mi agudeza mental!';
  const text = `🏆 ${motivationalText}\n\nHe superado el ${game}\n✨ ${score || '¡Objetivo conseguido!'}\n⏱️ Tiempo: ${time ? `${time}s` : '---'}\n\nEntrena tú también en:`;

  // Use production URL as fallback for local testing to avoid Facebook errors
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:';
  const url = isLocal ? 'https://iadapta.es' : window.location.href.split('?')[0];
  const shareTwitter = () => {
    const twitterText = `${text} ${url}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`, '_blank');
  };
  const shareFacebook = () => {
    // Note: Facebook ignores the 'quote' parameter for most URLs now. 
    // The description and image must be set via <meta> OG tags in the HTML.
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
  };
  const shareWhatsApp = () => {
    const waText = `${text} ${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`, '_blank');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center gap-4 mt-8 pt-8 border-t border-brand-100"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-bold text-brand-400 uppercase tracking-widest"
  }, "Compartir resultado"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: shareWhatsApp,
    title: "Compartir en WhatsApp",
    className: "w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
  }, /*#__PURE__*/React.createElement(Icons.WhatsApp, {
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: shareTwitter,
    title: "Compartir en Twitter",
    className: "w-12 h-12 bg-[#1DA1F2] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
  }, /*#__PURE__*/React.createElement(Icons.Twitter, {
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: shareFacebook,
    title: "Compartir en Facebook",
    className: "w-12 h-12 bg-[#4267B2] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
  }, /*#__PURE__*/React.createElement(Icons.Facebook, {
    className: "w-6 h-6"
  }))));
};

// --- GAME CONFIG ---
const ORDER_LEVELS = [{
  id: 1,
  count: 6,
  cols: 'grid-cols-3'
}, {
  id: 2,
  count: 12,
  cols: 'grid-cols-3 sm:grid-cols-4'
}, {
  id: 3,
  count: 20,
  cols: 'grid-cols-4 sm:grid-cols-5'
}, {
  id: 4,
  count: 36,
  cols: 'grid-cols-6'
}, {
  id: 5,
  count: 50,
  cols: 'grid-cols-5 sm:grid-cols-10'
}];

// --- LEVELS CONFIG FOR WORD SEARCH ---
const WORDSEARCH_LEVELS = [{
  id: 1,
  name: 'Fácil',
  rows: 10,
  cols: 8,
  wordCount: 6,
  directions: [0, 1],
  hints: 1
}, {
  id: 2,
  name: 'Medio',
  rows: 12,
  cols: 10,
  wordCount: 10,
  directions: [0, 1, 2],
  hints: 1
}, {
  id: 3,
  name: 'Difícil',
  rows: 15,
  cols: 10,
  wordCount: 14,
  directions: [0, 1, 2, 3, 4],
  hints: 1
}, {
  id: 4,
  name: 'Muy Difícil',
  rows: 18,
  cols: 12,
  wordCount: 18,
  directions: [0, 1, 2, 3, 4, 5, 6, 7],
  hints: 1
}, {
  id: 5,
  name: '¿Imposible?',
  rows: 20,
  cols: 12,
  wordCount: 22,
  directions: [0, 1, 2, 3, 4, 5, 6, 7],
  hints: 2
}];
const VISUAL_LEVELS = [{
  id: 1,
  name: 'Básico',
  size: 5,
  rounds: 5
}, {
  id: 2,
  name: 'Intermedio',
  size: 8,
  rounds: 5
}, {
  id: 3,
  name: 'Avanzado',
  size: 10,
  rounds: 5
}, {
  id: 4,
  name: 'Experto',
  size: 12,
  rounds: 5
}, {
  id: 5,
  name: 'Lince',
  size: 15,
  rounds: 5
}];
const INTRUDER_CATEGORIES = [{
  name: 'Cocina',
  items: ['🍽️', '🍴', '🥄', '🔪', '☕', '🍳', '🍯', '🥣', '🥤', '🧂', '🍞', '🥗', '🥘', '🍲'],
  intruders: ['🔨', '✂️', '👟', '☂️', '🚲']
}, {
  name: 'Ropa',
  items: ['👕', '👖', '👗', '👢', '👚', '👔', '🎩', '🧣', '🧤', '🧥', '🧦', '🎒', '👠', '👒'],
  intruders: ['🍎', '🍄', '🚗', '🎸', '📱']
}, {
  name: 'Herramientas',
  items: ['🔧', '🔨', '⚙️', '✂️', '⛏️', '🔩', '📏', '⚒️', '🛠️', '🖌️', '🔦', '🖇️', '📐', '🔨'],
  intruders: ['☂️', '🍦', '🍕', '🎀', '🎈']
}, {
  name: 'Frutas',
  items: ['🍎', '🍐', '🍌', '🍇', '🍊', '🍓', '🍍', '🍉', '🍒', '🍑', '🥝', '🥑', '🥥', '🍋'],
  intruders: ['🚪', '🚗', '👞', '📻', '💻']
}, {
  name: 'Deportes',
  items: ['⚽', '🏀', '🎾', '🏐', '🎱', '🏓', '🏸', '⚾', '⛳', '🏈', '🛹', '⛸️', '🏹', '🎣'],
  intruders: ['🎸', '🍔', '🛋️', '🛀', '📖']
}, {
  name: 'Música',
  items: ['🎸', '🎹', '🎺', '🎻', '🔔', '🎷', '🎤', '🥁', '🪕', '🪗', '📻', '🎧', '🎼', '🎻'],
  intruders: ['🍕', '✂️', '🚲', '☂️', '📦']
}, {
  name: 'Baño',
  items: ['🚿', '🛀', '🚽', '💧', '🚰', '🗑️', '🛁', '🧼', '🧻', '🧴', '🧖', '🦷', '🪥', '🧺'],
  intruders: ['🚲', '🍔', '🚁', '🎸', '⚽']
}, {
  name: 'Transporte',
  items: ['🚗', '🚲', '🚌', '🚆', '✈️', '⛵', '🏍️', '🚁', '🚜', '🚒', '🚑', '🚕', '🚂', '🚀'],
  intruders: ['🍦', '🛏️', '🎈', '🍄', '📚']
}, {
  name: 'Animales',
  items: ['🐶', '🐱', '🐭', '🐹', '🐰', '🐸', '🐻', '🦁', '🐯', '🐼', '🐷', '🐨', '🐘', '🦒'],
  intruders: ['📱', '🍕', '👟', '🔨', '🏠']
}, {
  name: 'Electrónica',
  items: ['💻', '📱', '⌨️', '🖱️', '🎧', '📺', '⌚', '📷', '🕹️', '🔌', '🔋', '📟', '🔦', '📻'],
  intruders: ['🍄', '🥕', '👞', '📦', '🖼️']
}];
const INTRUDER_LEVELS = [{
  id: 1,
  name: 'Básico',
  count: 4,
  rounds: 5
}, {
  id: 2,
  name: 'Intermedio',
  count: 6,
  rounds: 5
}, {
  id: 3,
  name: 'Avanzado',
  count: 8,
  rounds: 6
}, {
  id: 4,
  name: 'Experto',
  count: 10,
  rounds: 8
}, {
  id: 5,
  name: 'Maestro',
  count: 12,
  rounds: 10
}];

// --- SECTION COGNITIVE ---
const SectionCognitive = function SectionCognitive({
  isTeaser,
  navigateTo,
  isStandalone,
  isPWA,
  setShowInstaller
}) {
  const {
    useState,
    useEffect,
    useCallback,
    useMemo
  } = React;

  // Card sequence for levels (pairs)
  const levelSequence = useMemo(() => [2, 4, 6, 8, 12.5], []); // Pairs count (12.5 means 25 cards total, last one can be a special)
  const [level, setLevel] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [stars, setStars] = useState(0);
  const weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  const weekDates = useMemo(() => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - (day === 0 ? 6 : day - 1);
    const monday = new Date(now.setDate(diff));
    return Array.from({
      length: 7
    }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d.toISOString().split('T')[0];
    });
  }, []);
  const [history, setHistory] = useState([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [linkedEmail, setLinkedEmail] = useState('');
  useEffect(() => {
    setLinkedEmail(localStorage.getItem('daily_challenge_email') || '');
  }, [isCalendarOpen]);
  useEffect(() => {
    initDeviceId();
    const h = JSON.parse(localStorage.getItem('daily_challenge_history') || '[]');
    const last = localStorage.getItem('daily_challenge_last_date');
    if (h.length === 0 && last) {
      h.push(last);
      localStorage.setItem('daily_challenge_history', JSON.stringify(h));
    }
    setHistory(h);

    // Silent cloud sync after 1 second
    setTimeout(() => {
      syncCloudProgress(mergedHistory => {
        setHistory(mergedHistory);
      });
    }, 1000);
  }, []);
  const icons = ['🧠', '💡', '🌟', '🧩', '🚀', '🌈', '💎', '🎨', '🍎', '⚽', '🎸', '🍦', '🏠'];
  const initGame = useCallback(levelIdx => {
    const pairsCount = Math.floor(levelSequence[levelIdx]);
    let gameIcons = icons.slice(0, pairsCount);
    let gameCards = [...gameIcons, ...gameIcons].map((icon, index) => ({
      id: index,
      icon,
      name: icon
    }));

    // Shuffle
    gameCards.sort(() => Math.random() - 0.5);
    setCards(gameCards);
    setFlipped([]);
    setMatched([]);
    setGameFinished(false);
    setLevel(levelIdx);
    setGameStarted(true);
    setStartTime(Date.now());
    setStars(0);
  }, [levelSequence]);
  useEffect(() => {
    if (!isTeaser && gameStarted) {
      // Re-init if needed? Usually handled by setGameStarted
    }
  }, [isTeaser, gameStarted]);
  const handleFlip = index => {
    if (flipped.length === 2 || matched.includes(cards[index].name) || flipped.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].name === cards[second].name) {
        setMatched([...matched, cards[first].name]);
        setFlipped([]);
        if (matched.length + 1 === Math.floor(levelSequence[level])) {
          const timeTaken = (Date.now() - startTime) / 1000;
          setFinalTime(timeTaken.toFixed(1));

          // Star logic for Memory
          const pairs = Math.floor(levelSequence[level]);
          const baseTime = pairs * 4; // 4s per pair average
          let s = 3;
          if (timeTaken < baseTime * 0.6) s = 5;else if (timeTaken < baseTime * 0.8) s = 4;else if (timeTaken > baseTime * 1.5) s = 2;
          setStars(s);
          setTimeout(() => {
            setGameFinished(true);
            if (window.confetti) window.confetti({
              particleCount: 150,
              spread: 70,
              origin: {
                y: 0.6
              }
            });
          }, 600);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };
  const nextLevel = () => {
    if (level < levelSequence.length - 1) {
      initGame(level + 1);
    } else {
      initGame(0); // Reset or finish
    }
  };
  const openStandalone = gameType => {
    const baseUrl = window.location.href.split('?')[0];
    window.open(`${baseUrl}?page=${gameType}`, '_blank');
  };
  if (isTeaser) {
    return /*#__PURE__*/React.createElement("section", {
      id: "cognitive",
      className: `pt-36 pb-24 px-4 bg-white ${isStandalone ? 'pt-36' : ''}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "max-w-5xl mx-auto"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-center mb-16"
    }, isStandalone && /*#__PURE__*/React.createElement("div", {
      className: "mb-12 flex justify-center"
    }, /*#__PURE__*/React.createElement("img", {
      src: "assets/iadapta_logo.png",
      alt: "IAdapta",
      className: "h-16 object-contain"
    })), /*#__PURE__*/React.createElement("span", {
      className: "inline-block bg-brand-100 text-brand-700 rounded-full px-5 py-2 text-base font-bold uppercase tracking-widest mb-4"
    }, "Entrena tu Mente"), /*#__PURE__*/React.createElement("h2", {
      className: "font-display text-4xl sm:text-5xl font-bold text-brand-900 mb-6"
    }, "Estimulaci\xF3n Cognitiva: Entrena tu Mente"), /*#__PURE__*/React.createElement("div", {
      className: "section-divider w-24 mx-auto mb-8"
    }), /*#__PURE__*/React.createElement("div", {
      className: "space-y-6 mb-12"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xl sm:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto"
    }, "Mantener la mente activa es tan vital como el ejercicio f\xEDsico para preservar la autonom\xEDa. Fortalecer nuestra reserva cognitiva permite al cerebro adaptarse mejor al paso del tiempo, mejorando nuestra agilidad mental y bienestar diario."), /*#__PURE__*/React.createElement("p", {
      className: "text-lg text-gray-500 max-w-2xl mx-auto"
    }, "Estos son algunos ejercicios pr\xE1cticos dise\xF1ados para estimular la atenci\xF3n y la memoria:")), !linkedEmail ? /*#__PURE__*/React.createElement("div", {
      className: "max-w-xl mx-auto mb-10 bg-brand-50 border border-brand-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm anim-fade-up"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3 text-left"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-10 h-10 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center shrink-0"
    }, /*#__PURE__*/React.createElement(Icons.User, {
      className: "w-5 h-5"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
      className: "font-bold text-brand-900 text-sm"
    }, "\xBFQuieres guardar tu racha?"), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-500"
    }, "Inicia sesi\xF3n o reg\xEDstrate para sincronizar tu progreso en la nube."))), /*#__PURE__*/React.createElement("button", {
      onClick: () => setIsCalendarOpen(true),
      className: "px-5 py-2.5 bg-brand-900 text-white font-bold text-xs rounded-xl shadow-md hover:bg-brand-800 transition-all whitespace-nowrap"
    }, "Iniciar sesi\xF3n / Registrarse")) : /*#__PURE__*/React.createElement("div", {
      className: "max-w-xl mx-auto mb-10 bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm anim-fade-up"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3 text-left"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0"
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
      className: "font-bold text-brand-900 text-sm"
    }, "Sesi\xF3n iniciada correctamente"), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-500"
    }, "Progreso guardado en la nube como: ", /*#__PURE__*/React.createElement("strong", {
      className: "font-bold text-emerald-700"
    }, linkedEmail)))), /*#__PURE__*/React.createElement("button", {
      onClick: () => setIsCalendarOpen(true),
      className: "px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-xs rounded-xl transition-all whitespace-nowrap"
    }, "Gestionar cuenta")), /*#__PURE__*/React.createElement("div", {
      onClick: () => navigateTo('challenge'),
      className: "bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-brand-100 flex flex-col md:flex-row mb-16 cursor-pointer group hover:shadow-brand-900/10 transition-all hover:-translate-y-1 duration-500 text-left"
    }, /*#__PURE__*/React.createElement("div", {
      className: "md:w-1/3 h-48 md:h-auto relative overflow-hidden"
    }, /*#__PURE__*/React.createElement("img", {
      src: "daily_challenge_banner.jpg",
      className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000",
      alt: "Reto Diario"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10"
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 p-8 md:p-10 flex flex-col justify-between"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4"
    }, /*#__PURE__*/React.createElement("div", {
      onClick: e => {
        e.stopPropagation();
        setIsCalendarOpen(true);
      },
      className: "flex items-center gap-3 cursor-pointer hover:opacity-85 transition-opacity",
      title: "Ver calendario de racha"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-10 h-10 bg-accent-coral text-white rounded-xl flex items-center justify-center shadow-lg"
    }, /*#__PURE__*/React.createElement(Icons.Flame, {
      className: "w-6 h-6"
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-brand-400 font-bold uppercase tracking-widest text-[10px] leading-tight"
    }, "Desaf\xEDo Diario"), /*#__PURE__*/React.createElement("span", {
      className: "text-accent-coral font-bold text-xs flex items-center gap-1"
    }, history.length > 0 ? `${localStorage.getItem('daily_challenge_streak') || 0} días de racha` : '¡Empieza hoy!', /*#__PURE__*/React.createElement(Icons.Calendar, {
      className: "w-3.5 h-3.5 inline text-accent-coral/75"
    })))), !linkedEmail ? /*#__PURE__*/React.createElement("div", {
      onClick: e => {
        e.stopPropagation();
        setIsCalendarOpen(true);
      },
      className: "inline-flex items-center gap-2 bg-brand-50 hover:bg-brand-100 border border-brand-100 px-3.5 py-1.5 rounded-xl text-xs font-bold text-brand-900 cursor-pointer transition-all hover:scale-102 active:scale-98 self-start sm:self-auto",
      title: "Vincular cuenta en la nube (Recomendado)"
    }, /*#__PURE__*/React.createElement(Icons.Cloud, {
      className: "w-4 h-4 text-brand-500"
    }), /*#__PURE__*/React.createElement("span", null, "Vincular Correo (Copia)")) : /*#__PURE__*/React.createElement("div", {
      onClick: e => {
        e.stopPropagation();
        setIsCalendarOpen(true);
      },
      className: "inline-flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 px-3.5 py-1.5 rounded-xl text-xs font-bold text-emerald-800 cursor-pointer transition-all hover:scale-102 active:scale-98 animate-fade-in self-start sm:self-auto",
      title: "Gestionar copia de seguridad en la nube"
    }, /*#__PURE__*/React.createElement(Icons.Cloud, {
      className: "w-4 h-4 text-emerald-600 animate-pulse"
    }), /*#__PURE__*/React.createElement("span", null, "Copia Activa: ", linkedEmail.length > 22 ? linkedEmail.substring(0, 19) + '...' : linkedEmail))), /*#__PURE__*/React.createElement("h3", {
      className: "font-display text-3xl font-bold text-brand-900 mb-3"
    }, "Reto Diario IAdapta"), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-600 text-lg mb-8 max-w-xl"
    }, "Supera 3 juegos r\xE1pidos cada d\xEDa para mantener tu racha y fortalecer tu mente. \xA1La dificultad sube cada d\xEDa!")), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center gap-6"
    }, /*#__PURE__*/React.createElement("div", {
      onClick: e => {
        e.stopPropagation();
        setIsCalendarOpen(true);
      },
      className: "flex gap-2 cursor-pointer hover:opacity-80 transition-opacity",
      title: "Ver calendario de racha"
    }, weekDays.map((day, i) => {
      const isCompleted = history.includes(weekDates[i]);
      const isToday = weekDates[i] === new Date().toISOString().split('T')[0];
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: "flex flex-col items-center gap-1"
      }, /*#__PURE__*/React.createElement("div", {
        className: `w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-sm
                                ${isCompleted ? 'bg-emerald-500 text-white shadow-emerald-500/20' : isToday ? 'bg-brand-900 text-white ring-4 ring-brand-100' : 'bg-brand-50 text-brand-300'}`
      }, isCompleted ? /*#__PURE__*/React.createElement(Icons.Check, {
        className: "w-5 h-5"
      }) : day), /*#__PURE__*/React.createElement("span", {
        className: `text-[10px] font-bold ${isToday ? 'text-brand-900' : 'text-brand-400'}`
      }, day));
    })), /*#__PURE__*/React.createElement("div", {
      className: "lg:ml-auto"
    }, /*#__PURE__*/React.createElement("button", {
      className: "px-8 py-3 bg-brand-900 text-white rounded-xl font-bold flex items-center gap-2 group-hover:bg-accent-coral transition-colors shadow-lg"
    }, /*#__PURE__*/React.createElement("span", null, "Empezar Desaf\xEDo"), /*#__PURE__*/React.createElement(Icons.ArrowRight, {
      className: "w-5 h-5 group-hover:translate-x-1 transition-transform"
    })))))), isStandalone && /*#__PURE__*/React.createElement("div", {
      className: "mt-10 mb-16 pt-10 border-t border-brand-100 text-center flex flex-col items-center gap-4"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-gray-400 text-sm mb-2 font-medium uppercase tracking-widest"
    }, "\xBFQuieres ver m\xE1s recursos?"), /*#__PURE__*/React.createElement("a", {
      href: "https://www.iadapta.es/",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-900 transition-all bg-white px-8 py-4 rounded-2xl shadow-sm border border-brand-100 hover:shadow-md active:scale-95 group"
    }, /*#__PURE__*/React.createElement(Icons.Brain, {
      className: "w-5 h-5"
    }), /*#__PURE__*/React.createElement("span", null, "Ir a la web de IAdapta"), /*#__PURE__*/React.createElement(Icons.ArrowRight, {
      className: "w-5 h-5 group-hover:translate-x-1 transition-transform"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "grid sm:grid-cols-2 xl:grid-cols-3 gap-10 mb-16"
    }, /*#__PURE__*/React.createElement("div", {
      onClick: () => navigateTo('memory'),
      className: "bg-white rounded-[2.5rem] overflow-hidden border border-brand-50 shadow-xl hover:shadow-2xl transition-all group flex flex-col cursor-pointer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative h-56 overflow-hidden"
    }, /*#__PURE__*/React.createElement("img", {
      src: "memory_game_thumbnail.png",
      alt: "Juego de Memoria",
      className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-4 left-6 flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-12 h-12 bg-brand-600 text-white rounded-xl flex items-center justify-center text-2xl shadow-lg border border-brand-400/30"
    }, /*#__PURE__*/React.createElement(Icons.Brain, null)), /*#__PURE__*/React.createElement("span", {
      className: "text-white font-bold text-lg"
    }, "Memoria"))), /*#__PURE__*/React.createElement("div", {
      className: "p-8 flex flex-col flex-1"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "font-display text-2xl font-bold text-brand-900 mb-4"
    }, "Memoriza sus parejas"), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-600 text-lg mb-8 flex-1 leading-relaxed"
    }, "Un cl\xE1sico ejercicio de memoria epis\xF3dica y concentraci\xF3n. Supera los 5 niveles de dificultad creciente."), /*#__PURE__*/React.createElement("button", {
      className: "w-full py-4 bg-brand-900 text-white rounded-2xl font-bold text-lg group-hover:bg-brand-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-brand-900/20"
    }, "Jugar ahora", /*#__PURE__*/React.createElement(Icons.ArrowRight, null)))), /*#__PURE__*/React.createElement("div", {
      onClick: () => navigateTo('order'),
      className: "bg-white rounded-[2.5rem] overflow-hidden border border-sky-50 shadow-xl hover:shadow-2xl transition-all group flex flex-col cursor-pointer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative h-56 overflow-hidden"
    }, /*#__PURE__*/React.createElement("img", {
      src: "order_game_thumbnail.png",
      alt: "Juego de Orden",
      className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-gradient-to-t from-sky-900/60 to-transparent"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-4 left-6 flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-12 h-12 bg-sky-600 text-white rounded-xl flex items-center justify-center text-2xl shadow-lg border border-sky-400/30"
    }, /*#__PURE__*/React.createElement(Icons.List, null)), /*#__PURE__*/React.createElement("span", {
      className: "text-white font-bold text-lg"
    }, "Atenci\xF3n"))), /*#__PURE__*/React.createElement("div", {
      className: "p-8 flex flex-col flex-1"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "font-display text-2xl font-bold text-brand-900 mb-4"
    }, "En orden"), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-600 text-lg mb-8 flex-1 leading-relaxed"
    }, "Entrena la atenci\xF3n sostenida y el rastreo visual tocando los n\xFAmeros en orden lo m\xE1s r\xE1pido posible."), /*#__PURE__*/React.createElement("button", {
      className: "w-full py-4 bg-sky-900 text-white rounded-2xl font-bold text-lg group-hover:bg-sky-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-sky-900/20"
    }, "Jugar ahora", /*#__PURE__*/React.createElement(Icons.ArrowRight, null)))), /*#__PURE__*/React.createElement("div", {
      onClick: () => navigateTo('wordsearch'),
      className: "bg-white rounded-[2.5rem] overflow-hidden border border-emerald-50 shadow-xl hover:shadow-2xl transition-all group flex flex-col cursor-pointer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative h-56 overflow-hidden"
    }, /*#__PURE__*/React.createElement("img", {
      src: "word_search_thumbnail.png",
      alt: "Sopa de Letras",
      className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-4 left-6 flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center text-2xl shadow-lg border border-emerald-400/30"
    }, /*#__PURE__*/React.createElement(Icons.Search, null)), /*#__PURE__*/React.createElement("span", {
      className: "text-white font-bold text-lg"
    }, "Rastreo"))), /*#__PURE__*/React.createElement("div", {
      className: "p-8 flex flex-col flex-1"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "font-display text-2xl font-bold text-brand-900 mb-4"
    }, "Sopa de Letras"), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-600 text-lg mb-8 flex-1 leading-relaxed"
    }, "Estimula el rastreo visual y la atenci\xF3n sem\xE1ntica buscando palabras relacionadas con la vida diaria."), /*#__PURE__*/React.createElement("button", {
      className: "w-full py-4 bg-emerald-900 text-white rounded-2xl font-bold text-lg group-hover:bg-emerald-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-900/20"
    }, "Jugar ahora", /*#__PURE__*/React.createElement(Icons.ArrowRight, null)))), /*#__PURE__*/React.createElement("div", {
      onClick: () => navigateTo('math'),
      className: "bg-white rounded-[2.5rem] overflow-hidden border border-amber-50 shadow-xl hover:shadow-2xl transition-all group flex flex-col cursor-pointer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative h-56 overflow-hidden"
    }, /*#__PURE__*/React.createElement("img", {
      src: "mental_math_thumbnail.png",
      alt: "C\xE1lculo Mental",
      className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-gradient-to-t from-amber-900/60 to-transparent"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-4 left-6 flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-12 h-12 bg-amber-600 text-white rounded-xl flex items-center justify-center text-2xl shadow-lg border border-amber-400/30"
    }, /*#__PURE__*/React.createElement(Icons.Calculator, null)), /*#__PURE__*/React.createElement("span", {
      className: "text-white font-bold text-lg"
    }, "C\xE1lculo"))), /*#__PURE__*/React.createElement("div", {
      className: "p-8 flex flex-col flex-1"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "font-display text-2xl font-bold text-brand-900 mb-4"
    }, "C\xE1lculo Mental"), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-600 text-lg mb-8 flex-1 leading-relaxed"
    }, "Desaf\xEDa tu agilidad num\xE9rica con operaciones r\xE1pidas dise\xF1adas para mantener tu mente activa y precisa."), /*#__PURE__*/React.createElement("button", {
      className: "w-full py-4 bg-amber-900 text-white rounded-2xl font-bold text-lg group-hover:bg-amber-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-amber-900/20"
    }, "Jugar ahora", /*#__PURE__*/React.createElement(Icons.ArrowRight, null)))), /*#__PURE__*/React.createElement("div", {
      onClick: () => navigateTo('visual'),
      className: "bg-white rounded-[2.5rem] overflow-hidden border border-brand-50 shadow-xl hover:shadow-2xl transition-all group flex flex-col cursor-pointer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative h-56 overflow-hidden"
    }, /*#__PURE__*/React.createElement("img", {
      src: "visual_game_thumbnail.png",
      alt: "Agudeza Visual",
      className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-4 left-6 flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-2xl shadow-lg border border-indigo-400/30"
    }, /*#__PURE__*/React.createElement(Icons.Search, null)), /*#__PURE__*/React.createElement("span", {
      className: "text-white font-bold text-lg"
    }, "Agudeza"))), /*#__PURE__*/React.createElement("div", {
      className: "p-8 flex flex-col flex-1"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "font-display text-2xl font-bold text-brand-900 mb-4"
    }, "Agudeza Visual"), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-600 text-lg mb-8 flex-1 leading-relaxed"
    }, "Entrena tu velocidad de procesamiento y atenci\xF3n selectiva encontrando el elemento discordante."), /*#__PURE__*/React.createElement("button", {
      className: "w-full py-4 bg-indigo-900 text-white rounded-2xl font-bold text-lg group-hover:bg-indigo-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-900/20"
    }, "Jugar ahora", /*#__PURE__*/React.createElement(Icons.ArrowRight, null)))), /*#__PURE__*/React.createElement("div", {
      onClick: () => navigateTo('intruder'),
      className: "bg-white rounded-[2.5rem] overflow-hidden border border-rose-50 shadow-xl hover:shadow-2xl transition-all group flex flex-col cursor-pointer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative h-56 overflow-hidden"
    }, /*#__PURE__*/React.createElement("img", {
      src: "intruder_game_thumbnail.png",
      alt: "El Intruso",
      className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-gradient-to-t from-rose-900/60 to-transparent"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-4 left-6 flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-12 h-12 bg-rose-600 text-white rounded-xl flex items-center justify-center text-2xl shadow-lg border border-rose-400/30"
    }, /*#__PURE__*/React.createElement(Icons.Search, null)), /*#__PURE__*/React.createElement("span", {
      className: "text-white font-bold text-lg"
    }, "Categorizaci\xF3n"))), /*#__PURE__*/React.createElement("div", {
      className: "p-8 flex flex-col flex-1"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "font-display text-2xl font-bold text-brand-900 mb-4"
    }, "El Intruso"), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-600 text-lg mb-8 flex-1 leading-relaxed"
    }, "Entrena el razonamiento l\xF3gico y la categorizaci\xF3n sem\xE1ntica identificando el objeto que no encaja en el grupo."), /*#__PURE__*/React.createElement("button", {
      className: "w-full py-4 bg-rose-900 text-white rounded-2xl font-bold text-lg group-hover:bg-rose-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-rose-900/20"
    }, "Jugar ahora", /*#__PURE__*/React.createElement(Icons.ArrowRight, null)))), /*#__PURE__*/React.createElement("div", {
      onClick: () => navigateTo('sudoku'),
      className: "bg-white rounded-[2.5rem] overflow-hidden border border-indigo-50 shadow-xl hover:shadow-2xl transition-all group flex flex-col cursor-pointer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative h-56 overflow-hidden"
    }, /*#__PURE__*/React.createElement("img", {
      src: "sudoku_game_thumbnail.png",
      alt: "Sudoku",
      className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-4 left-6 flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-2xl shadow-lg border border-indigo-400/30"
    }, /*#__PURE__*/React.createElement(Icons.Puzzle, null)), /*#__PURE__*/React.createElement("span", {
      className: "text-white font-bold text-lg"
    }, "L\xF3gica"))), /*#__PURE__*/React.createElement("div", {
      className: "p-8 flex flex-col flex-1"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "font-display text-2xl font-bold text-brand-900 mb-4"
    }, "Sudoku"), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-600 text-lg mb-8 flex-1 leading-relaxed"
    }, "Ejercita el razonamiento l\xF3gico y la concentraci\xF3n rellenando la cuadr\xEDcula con n\xFAmeros del 1 al 9."), /*#__PURE__*/React.createElement("button", {
      className: "w-full py-4 bg-indigo-900 text-white rounded-2xl font-bold text-lg group-hover:bg-indigo-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-900/20"
    }, "Jugar ahora", /*#__PURE__*/React.createElement(Icons.ArrowRight, null)))), /*#__PURE__*/React.createElement("div", {
      onClick: () => navigateTo('wordbuilder'),
      className: "bg-white rounded-[2.5rem] overflow-hidden border border-amber-50 shadow-xl hover:shadow-2xl transition-all group flex flex-col cursor-pointer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative h-56 overflow-hidden"
    }, /*#__PURE__*/React.createElement("img", {
      src: "word_builder_thumbnail.png",
      alt: "Formar Palabras",
      className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-gradient-to-t from-amber-950/60 to-transparent"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-4 left-6 flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-12 h-12 bg-amber-600 text-white rounded-xl flex items-center justify-center text-2xl shadow-lg border border-amber-400/30"
    }, /*#__PURE__*/React.createElement(Icons.BookOpen, null)), /*#__PURE__*/React.createElement("span", {
      className: "text-white font-bold text-lg"
    }, "Lenguaje"))), /*#__PURE__*/React.createElement("div", {
      className: "p-8 flex flex-col flex-1"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "font-display text-2xl font-bold text-brand-900 mb-4"
    }, "Formar Palabras"), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-600 text-lg mb-8 flex-1 leading-relaxed"
    }, "Ordena las letras desordenadas para descubrir la palabra secreta. Entrena la memoria sem\xE1ntica y el acceso al l\xE9xico."), /*#__PURE__*/React.createElement("button", {
      className: "w-full py-4 bg-amber-900 text-white rounded-2xl font-bold text-lg group-hover:bg-amber-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-amber-900/20"
    }, "Jugar ahora", /*#__PURE__*/React.createElement(Icons.ArrowRight, null)))), /*#__PURE__*/React.createElement("div", {
      onClick: () => navigateTo('simon'),
      className: "bg-white rounded-[2.5rem] overflow-hidden border border-rose-50 shadow-xl hover:shadow-2xl transition-all group flex flex-col cursor-pointer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative h-56 overflow-hidden"
    }, /*#__PURE__*/React.createElement("img", {
      src: "simon_game_thumbnail.png",
      alt: "Secuencia de Colores",
      className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-gradient-to-t from-rose-950/60 to-transparent"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-4 left-6 flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-12 h-12 bg-rose-600 text-white rounded-xl flex items-center justify-center text-2xl shadow-lg border border-rose-400/30"
    }, /*#__PURE__*/React.createElement(Icons.Brain, null)), /*#__PURE__*/React.createElement("span", {
      className: "text-white font-bold text-lg"
    }, "Memoria de Secuencia"))), /*#__PURE__*/React.createElement("div", {
      className: "p-8 flex flex-col flex-1"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "font-display text-2xl font-bold text-brand-900 mb-4"
    }, "Secuencia de Colores"), /*#__PURE__*/React.createElement("p", {
      className: "text-gray-600 text-lg mb-8 flex-1 leading-relaxed"
    }, "Observa la secuencia de luces y sonidos y rep\xEDtela en el mismo orden exacto. Entrena la atenci\xF3n y la memoria de trabajo."), /*#__PURE__*/React.createElement("button", {
      className: "w-full py-4 bg-rose-900 text-white rounded-2xl font-bold text-lg group-hover:bg-rose-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-rose-900/20"
    }, "Jugar ahora", /*#__PURE__*/React.createElement(Icons.ArrowRight, null))))), !isStandalone && /*#__PURE__*/React.createElement("div", {
      className: "bg-emerald-50 border-l-4 border-emerald-500 p-8 rounded-r-3xl shadow-sm text-left max-w-3xl mx-auto"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3 mb-4"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-3xl"
    }, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("h4", {
      className: "font-display text-xl font-bold text-emerald-800 uppercase tracking-wide"
    }, "El Consejo del Terapeuta Ocupacional")), /*#__PURE__*/React.createElement("p", {
      className: "text-emerald-900 italic text-xl leading-relaxed"
    }, "\"El cerebro se fortalece con la novedad. No te limites a lo que ya dominas: intenta aprender algo nuevo cada d\xEDa, por peque\xF1o que sea. El aprendizaje continuo es la mejor herramienta para mantener una mente joven y resiliente.\"")), /*#__PURE__*/React.createElement(StreakCalendarModal, {
      isOpen: isCalendarOpen,
      onClose: () => setIsCalendarOpen(false),
      history: history
    }))));
  }
  const gridCols = level === 0 ? 'grid-cols-2' : level === 1 ? 'grid-cols-2 sm:grid-cols-4' : level === 2 ? 'grid-cols-3 sm:grid-cols-4' : level === 3 ? 'grid-cols-4' : 'grid-cols-5';
  return /*#__PURE__*/React.createElement("section", {
    className: `pt-36 pb-20 px-4 min-h-screen bg-brand-50 flex flex-col items-center ${isStandalone ? 'pt-36' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-start mb-8"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigateTo('cognitive'),
    className: "inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors bg-white px-5 py-2.5 rounded-xl shadow-sm border border-brand-100 group"
  }, /*#__PURE__*/React.createElement(Icons.ArrowLeft, {
    className: "w-5 h-5 group-hover:-translate-x-1 transition-transform"
  }), /*#__PURE__*/React.createElement("span", null, "Volver"))), !gameStarted ? /*#__PURE__*/React.createElement("div", {
    className: "max-w-2xl mx-auto"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-4xl font-bold text-brand-900 mb-8 text-center"
  }, "Memoriza las Parejas"), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] border border-brand-100 shadow-2xl p-10 anim-scale-in text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl mb-6"
  }, "\uD83E\uDDE0"), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-brand-900 mb-6"
  }, "Selecciona la dificultad"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-4"
  }, levelSequence.map((_, idx) => /*#__PURE__*/React.createElement("button", {
    key: idx,
    onClick: () => initGame(idx),
    className: "group p-6 rounded-2xl border-2 border-brand-50 hover:border-brand-500 hover:bg-brand-50 transition-all flex flex-col items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-brand-900 font-bold text-xl"
  }, "Nivel ", idx + 1), /*#__PURE__*/React.createElement("span", {
    className: "text-brand-500 text-sm font-medium"
  }, idx === 0 ? 'Muy Fácil (2 parejas)' : idx === 1 ? 'Fácil (4 parejas)' : idx === 2 ? 'Medio (6 parejas)' : idx === 3 ? 'Difícil (8 parejas)' : 'Experto (12 parejas)')))))) : /*#__PURE__*/React.createElement("div", {
    className: "max-w-5xl mx-auto w-full"
  }, /*#__PURE__*/React.createElement(GameHeader, {
    title: "Juego de Memoria",
    subtitle: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "bg-brand-900 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest"
    }, "Nivel ", level + 1), /*#__PURE__*/React.createElement("span", {
      className: "text-brand-600 font-bold uppercase tracking-widest"
    }, "Memoriza las Parejas")),
    onBack: () => navigateTo('cognitive'),
    onRestart: () => initGame(level),
    onLevels: () => setGameStarted(false),
    isStandalone: isStandalone
  }), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-3xl border border-brand-100 shadow-2xl p-6 sm:p-10 relative"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-4xl font-bold text-brand-900 mb-2"
  }, "Memoria"), /*#__PURE__*/React.createElement("p", {
    className: "text-brand-600 font-bold mb-8 uppercase tracking-widest"
  }, "Nivel ", level + 1, ": Encuentra las parejas"), !gameFinished ? /*#__PURE__*/React.createElement("div", {
    className: `grid ${gridCols} gap-3 sm:gap-4 max-w-2xl mx-auto`
  }, cards.map((card, index) => {
    const isFlipped = flipped.includes(index) || matched.includes(card.name);
    return /*#__PURE__*/React.createElement("div", {
      key: card.id,
      onClick: () => handleFlip(index),
      className: `relative cursor-pointer transition-all duration-500 preserve-3d aspect-square ${isFlipped ? 'rotate-y-180' : ''}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-brand-100 rounded-2xl flex items-center justify-center border-2 border-brand-200 shadow-inner backface-hidden text-3xl font-bold text-brand-300"
    }, "?"), /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-white border-4 border-brand-400 rounded-2xl flex items-center justify-center rotate-y-180 backface-hidden text-4xl sm:text-5xl shadow-md"
    }, card.icon));
  })) : /*#__PURE__*/React.createElement("div", {
    className: "text-center py-12 anim-scale-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl mb-6"
  }, "\uD83E\uDDE0\u2728"), /*#__PURE__*/React.createElement("h3", {
    className: "text-3xl font-bold text-brand-900 mb-2"
  }, "\xA1Incre\xEDble memoria!"), /*#__PURE__*/React.createElement(StarRating, {
    stars: stars
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-gray-600 mb-4"
  }, "Has completado el nivel ", level + 1, " en ", /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-brand-700"
  }, finalTime, "s"), "."), /*#__PURE__*/React.createElement(ShareButtons, {
    game: "Juego de Memoria",
    time: finalTime
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row gap-4 justify-center mt-8"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setGameStarted(false),
    className: "px-8 py-4 bg-brand-100 text-brand-700 rounded-2xl font-bold text-lg hover:bg-brand-200 transition-all"
  }, "Cambiar Dificultad"), /*#__PURE__*/React.createElement("button", {
    onClick: nextLevel,
    className: "px-10 py-5 bg-brand-900 text-white rounded-2xl font-bold text-xl hover:bg-brand-800 shadow-xl transition-all btn-pulse"
  }, level < levelSequence.length - 1 ? 'Siguiente Nivel' : 'Reiniciar Desafío')))))));
};

// --- GAMES ---
const SectionWordSearch = function SectionWordSearch({
  isStandalone,
  navigateTo
}) {
  const {
    useState,
    useEffect,
    useCallback,
    useRef
  } = React;
  const WORD_LIST = ['DUCHA', 'COMER', 'CAMINADOR', 'SILLA', 'MOVIL', 'TELEFONO', 'DORMIR', 'JUGAR', 'ASEO', 'VESTIR', 'COCINAR', 'PASEAR', 'LLAVES', 'GAFAS', 'RELOJ', 'PASTILLA', 'SOPA', 'AGUA', 'RADIO', 'LIBRO', 'CUIDADO', 'AYUDA', 'VASO', 'PLATO', 'CAMA', 'SOFA', 'MESA', 'ROPA', 'ZAPATOS', 'BAÑO', 'COCINA', 'PASILLO', 'ESPEJO', 'TIEMPO', 'LUZ', 'MANO', 'PIE', 'SALUD'];
  const [gameStarted, setGameStarted] = useState(false);
  const [levelIdx, setLevelIdx] = useState(0);
  const [grid, setGrid] = useState([]);
  const [wordsToFind, setWordsToFind] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [selection, setSelection] = useState(null);
  const [gameStatus, setGameStatus] = useState('playing');
  const [startTime, setStartTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [stars, setStars] = useState(0);
  const [hintsUsed, setHintsUsed] = useState([]); // indices of words hinted

  const currentLevel = WORDSEARCH_LEVELS[levelIdx];
  const generateGrid = useCallback(() => {
    if (!gameStarted) return;
    const {
      rows,
      cols,
      wordCount,
      directions
    } = currentLevel;
    let newGrid = [];
    let placedWords = [];
    const uniqueWordList = Array.from(new Set(WORD_LIST));
    let success = false;
    let retries = 0;
    while (!success && retries < 25) {
      retries++;
      newGrid = Array(rows).fill(0).map(() => Array(cols).fill(''));
      placedWords = [];

      // Shuffle and pick unique words
      const pool = [...uniqueWordList].sort(() => Math.random() - 0.5).slice(0, wordCount);
      pool.forEach(word => {
        let placed = false;
        let attempts = 0;
        while (!placed && attempts < 150) {
          attempts++;
          const dirType = directions[Math.floor(Math.random() * directions.length)];
          let dr, dc;

          // 0:H, 1:V, 2:D, 3:HR, 4:VR, 5:DR, 6:D2, 7:D2R
          if (dirType === 0) {
            dr = 0;
            dc = 1;
          } else if (dirType === 1) {
            dr = 1;
            dc = 0;
          } else if (dirType === 2) {
            dr = 1;
            dc = 1;
          } else if (dirType === 3) {
            dr = 0;
            dc = -1;
          } else if (dirType === 4) {
            dr = -1;
            dc = 0;
          } else if (dirType === 5) {
            dr = -1;
            dc = -1;
          } else if (dirType === 6) {
            dr = 1;
            dc = -1;
          } else if (dirType === 7) {
            dr = -1;
            dc = 1;
          }
          const r = Math.floor(Math.random() * rows);
          const c = Math.floor(Math.random() * cols);
          const endR = r + (word.length - 1) * dr;
          const endC = c + (word.length - 1) * dc;
          if (endR < 0 || endR >= rows || endC < 0 || endC >= cols) continue;
          let fits = true;
          for (let i = 0; i < word.length; i++) {
            const rr = r + i * dr;
            const cc = c + i * dc;
            if (newGrid[rr][cc] !== '' && newGrid[rr][cc] !== word[i]) {
              fits = false;
              break;
            }
          }
          if (fits) {
            const cells = [];
            for (let i = 0; i < word.length; i++) {
              const rr = r + i * dr;
              const cc = c + i * dc;
              newGrid[rr][cc] = word[i];
              cells.push({
                r: rr,
                c: cc
              });
            }
            placedWords.push({
              word,
              cells
            });
            placed = true;
          }
        }
      });
      if (placedWords.length === wordCount) {
        success = true;
      }
    }
    const letters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (newGrid[r][c] === '') {
          newGrid[r][c] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }
    setGrid(newGrid);
    setWordsToFind(placedWords);
    setFoundWords([]);
    setHintsUsed([]);
    setGameStatus('playing');
    setStartTime(Date.now());
  }, [currentLevel, gameStarted]);
  useEffect(() => {
    if (gameStarted) generateGrid();
  }, [generateGrid, gameStarted]);
  const startGame = idx => {
    setLevelIdx(idx);
    setGameStarted(true);
  };
  const getCellFromEvent = e => {
    const touch = e.touches ? e.touches[0] : e;
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (target && target.dataset.r !== undefined) {
      return {
        r: parseInt(target.dataset.r),
        c: parseInt(target.dataset.c)
      };
    }
    return null;
  };
  const handleStart = e => {
    if (gameStatus !== 'playing') return;
    const cell = getCellFromEvent(e);
    if (!cell) return;
    if (selection && selection.isFirstClick) {
      const dr = Math.abs(cell.r - selection.start.r);
      const dc = Math.abs(cell.c - selection.start.c);
      if (dr === 0 || dc === 0 || dr === dc) {
        validateSelection(selection.start, cell);
      } else {
        setSelection(null);
      }
    } else {
      setSelection({
        start: cell,
        end: cell,
        isDragging: true
      });
    }
  };
  const handleMove = e => {
    if (!selection || !selection.isDragging || gameStatus !== 'playing') return;
    const cell = getCellFromEvent(e);
    if (cell) {
      const dr = Math.abs(cell.r - selection.start.r);
      const dc = Math.abs(cell.c - selection.start.c);
      if (dr === 0 || dc === 0 || dr === dc) {
        setSelection(prev => ({
          ...prev,
          end: cell
        }));
      }
    }
  };
  const handleEnd = () => {
    if (!selection || gameStatus !== 'playing') return;
    if (selection.isDragging) {
      if (selection.start.r === selection.end.r && selection.start.c === selection.end.c) {
        setSelection({
          ...selection,
          isDragging: false,
          isFirstClick: true
        });
      } else {
        validateSelection(selection.start, selection.end);
      }
    }
  };
  const validateSelection = (start, end) => {
    const dr = Math.sign(end.r - start.r);
    const dc = Math.sign(end.c - start.c);
    const len = Math.max(Math.abs(end.r - start.r), Math.abs(end.c - start.c)) + 1;

    // Find if there is a word in wordsToFind that matches this path exactly
    const match = wordsToFind.find(w => {
      if (w.cells.length !== len) return false;
      // Check forward path
      let forwardMatch = true;
      let backwardMatch = true;
      for (let i = 0; i < len; i++) {
        const pr = start.r + i * dr;
        const pc = start.c + i * dc;
        if (pr !== w.cells[i].r || pc !== w.cells[i].c) {
          forwardMatch = false;
        }
        if (pr !== w.cells[len - 1 - i].r || pc !== w.cells[len - 1 - i].c) {
          backwardMatch = false;
        }
      }
      return forwardMatch || backwardMatch;
    });
    if (match && !foundWords.some(fw => fw.word === match.word)) {
      const newFound = [...foundWords, match];
      setFoundWords(newFound);
      if (window.confetti) {
        window.confetti({
          particleCount: 100,
          spread: 70,
          origin: {
            y: 0.7
          },
          colors: ['#10b981', '#3b82f6', '#f59e0b', '#E87D55']
        });
      }
      if (newFound.length === wordsToFind.length) {
        setGameStatus('won');
        const timeTaken = (Date.now() - startTime) / 1000;
        setTimeElapsed(timeTaken.toFixed(0));

        // Star logic for WordSearch
        const baseTime = wordsToFind.length * 15; // 15s per word average
        let s = 3;
        if (timeTaken < baseTime * 0.6) s = 5;else if (timeTaken < baseTime * 0.9) s = 4;else if (timeTaken > baseTime * 1.5) s = 2;

        // Penalty for hints
        if (hintsUsed.length > 0) s = Math.max(1, s - hintsUsed.length);
        setStars(s);
        if (window.confetti) {
          setTimeout(() => {
            window.confetti({
              particleCount: 200,
              spread: 160,
              origin: {
                y: 0.6
              }
            });
          }, 500);
        }
      }
    }
    setSelection(null);
  };
  const isCellSelected = (r, c) => {
    if (!selection) return false;
    const {
      start,
      end
    } = selection;
    const dr = Math.sign(end.r - start.r);
    const dc = Math.sign(end.c - start.c);
    const len = Math.max(Math.abs(end.r - start.r), Math.abs(end.c - start.c)) + 1;
    for (let i = 0; i < len; i++) {
      if (start.r + i * dr === r && start.c + i * dc === c) return true;
    }
    return false;
  };
  const isCellFound = (r, c) => foundWords.some(fw => fw.cells.some(cell => cell.r === r && cell.c === c));
  const isCellHinted = (r, c) => {
    return hintsUsed.some(idx => {
      const word = wordsToFind[idx];
      return word.cells[0].r === r && word.cells[0].c === c;
    });
  };
  const useHint = () => {
    if (hintsUsed.length >= currentLevel.hints || gameStatus !== 'playing') return;
    const remainingIndices = wordsToFind.map((w, i) => i).filter(i => !foundWords.some(fw => fw.word === wordsToFind[i].word) && !hintsUsed.includes(i));
    if (remainingIndices.length > 0) {
      const randomIdx = remainingIndices[Math.floor(Math.random() * remainingIndices.length)];
      setHintsUsed([...hintsUsed, randomIdx]);
    }
  };
  const nextLevel = () => {
    if (levelIdx < WORDSEARCH_LEVELS.length - 1) {
      setLevelIdx(levelIdx + 1);
    } else {
      setLevelIdx(0);
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    className: `py-20 px-4 min-h-screen bg-brand-50 flex flex-col items-center ${isStandalone ? 'pt-32' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl w-full"
  }, !gameStarted ? /*#__PURE__*/React.createElement("div", {
    className: "max-w-2xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-start mb-8"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigateTo('cognitive'),
    className: "inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors bg-white px-5 py-2.5 rounded-xl shadow-sm border border-brand-100 group"
  }, /*#__PURE__*/React.createElement(Icons.ArrowLeft, {
    className: "w-5 h-5 group-hover:-translate-x-1 transition-transform"
  }), /*#__PURE__*/React.createElement("span", null, "Volver"))), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-4xl font-bold text-brand-900 mb-8 text-center"
  }, "Sopa de Letras"), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] border border-brand-100 shadow-2xl p-10 anim-scale-in text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl mb-6"
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-brand-900 mb-6"
  }, "Selecciona la dificultad"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-4"
  }, WORDSEARCH_LEVELS.map((level, idx) => /*#__PURE__*/React.createElement("button", {
    key: level.id,
    onClick: () => startGame(idx),
    className: "group p-6 rounded-2xl border-2 border-brand-50 hover:border-brand-500 hover:bg-brand-50 transition-all flex flex-col items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-brand-900 font-bold text-xl"
  }, level.name), /*#__PURE__*/React.createElement("span", {
    className: "text-brand-500 text-sm font-medium"
  }, "Nivel ", level.id)))))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GameHeader, {
    title: "Sopa de Letras",
    subtitle: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "bg-brand-900 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest"
    }, "Nivel ", currentLevel.id), /*#__PURE__*/React.createElement("span", {
      className: "text-brand-600 font-bold uppercase tracking-widest"
    }, currentLevel.name)),
    onBack: () => navigateTo('cognitive'),
    onRestart: generateGrid,
    onLevels: () => setGameStarted(false),
    isStandalone: isStandalone
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col lg:flex-row gap-8 items-start justify-center mb-24"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-3 rounded-3xl shadow-2xl border-8 border-brand-100 select-none touch-none grid gap-1 w-full max-w-[420px] relative",
    style: {
      gridTemplateColumns: `repeat(${currentLevel.cols}, minmax(0, 1fr))`
    },
    onMouseDown: handleStart,
    onMouseMove: handleMove,
    onMouseUp: handleEnd,
    onMouseLeave: handleEnd,
    onTouchStart: handleStart,
    onTouchMove: handleMove,
    onTouchEnd: handleEnd
  }, grid.map((row, r) => row.map((letter, c) => {
    const selected = isCellSelected(r, c);
    const found = isCellFound(r, c);
    const hinted = isCellHinted(r, c);
    return /*#__PURE__*/React.createElement("div", {
      key: `${r}-${c}`,
      "data-r": r,
      "data-c": c,
      className: `flex items-center justify-center aspect-square text-base min-[380px]:text-lg sm:text-2xl font-bold rounded-lg transition-all duration-200
                            ${found ? 'bg-emerald-500 text-white shadow-sm scale-95' : selected ? 'bg-brand-600 text-white shadow-lg scale-105 z-10' : hinted ? 'bg-amber-100 text-amber-700 border-2 border-amber-400 animate-pulse' : 'text-brand-900 hover:bg-brand-50'}`
    }, letter);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-6 w-full lg:max-w-[320px]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-6 rounded-3xl shadow-xl border border-brand-100"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-xl font-bold text-brand-900 flex items-center gap-2"
  }, "Ayudas"), /*#__PURE__*/React.createElement("span", {
    className: "text-brand-500 font-bold"
  }, currentLevel.hints - hintsUsed.length, " restantes")), /*#__PURE__*/React.createElement("button", {
    onClick: useHint,
    disabled: hintsUsed.length >= currentLevel.hints || gameStatus !== 'playing',
    className: `w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                          ${hintsUsed.length >= currentLevel.hints ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-amber-100 text-amber-700 hover:bg-amber-200 active:scale-95'}`
  }, /*#__PURE__*/React.createElement(Icons.Lightbulb, null), " Pedir Pista")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-6 rounded-[2rem] shadow-xl border border-brand-100 flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-display text-2xl font-bold text-brand-900 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.List, null), " Palabras"), /*#__PURE__*/React.createElement("span", {
    className: "bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm font-bold"
  }, foundWords.length, "/", wordsToFind.length)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 lg:grid-cols-1 gap-2 max-h-[350px] sm:max-h-[550px] overflow-y-auto pr-2 pb-12 custom-scrollbar"
  }, wordsToFind.map((w, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `text-base font-semibold py-2 px-3 rounded-xl transition-all duration-300 border ${foundWords.some(fw => fw.word === w.word) ? 'text-emerald-700 line-through bg-emerald-50 border-emerald-100' : 'text-brand-700 bg-white border-brand-50 shadow-sm'}`
  }, w.word)))))), gameStatus === 'won' && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[60] bg-brand-900/40 backdrop-blur-sm flex items-center justify-center p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-3xl p-10 shadow-2xl max-w-sm w-full text-center anim-scale-in border border-brand-100"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-7xl mb-6"
  }, "\uD83D\uDD0D\u2728"), /*#__PURE__*/React.createElement("h3", {
    className: "text-3xl font-bold text-brand-900 mb-2"
  }, "\xA1Nivel Completado!"), /*#__PURE__*/React.createElement(StarRating, {
    stars: stars
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-gray-600 mb-6"
  }, "Has encontrado todo en ", /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-brand-700"
  }, timeElapsed, "s"), "."), /*#__PURE__*/React.createElement(ShareButtons, {
    game: "Sopa de Letras",
    time: timeElapsed
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3 mt-8"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setGameStarted(false),
    className: "w-full py-3 bg-brand-100 text-brand-700 rounded-xl font-bold hover:bg-brand-200 transition-all"
  }, "Cambiar Nivel"), /*#__PURE__*/React.createElement("button", {
    onClick: nextLevel,
    className: "w-full py-4 bg-brand-900 text-white rounded-xl font-bold text-xl hover:bg-brand-800 shadow-lg transition-all btn-pulse"
  }, levelIdx < WORDSEARCH_LEVELS.length - 1 ? 'Siguiente Nivel' : 'Reiniciar Desafío')))))));
};

// --- SECTION MATH GAME ---

const SectionMathGame = function SectionMathGame({
  isStandalone,
  navigateTo
}) {
  const {
    useState,
    useEffect,
    useCallback,
    useRef
  } = React;
  const LEVELS = [{
    id: 1,
    name: 'Básico',
    ops: ['+', '-'],
    range: 10,
    count: 10
  }, {
    id: 2,
    name: 'Intermedio',
    ops: ['+', '-'],
    range: 50,
    count: 10
  }, {
    id: 3,
    name: 'Tablas',
    ops: ['*'],
    range: 10,
    count: 10
  }, {
    id: 4,
    name: 'Avanzado',
    ops: ['+', '-', '*'],
    range: 20,
    count: 10
  }, {
    id: 5,
    name: 'Experto',
    ops: ['+', '-', '*'],
    range: 50,
    count: 10
  }];
  const [gameStarted, setGameStarted] = useState(false);
  const [levelIdx, setLevelIdx] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct', 'wrong'
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'finished'
  const [startTime, setStartTime] = useState(Date.now());
  const [totalTime, setTotalTime] = useState(0);
  const [stars, setStars] = useState(0);
  const generateQuestions = useCallback(lvlIdx => {
    if (!gameStarted) return;
    const lvl = LEVELS[lvlIdx];
    const newQs = [];
    for (let i = 0; i < lvl.count; i++) {
      const op = lvl.ops[Math.floor(Math.random() * lvl.ops.length)];
      let a, b, q, ans;
      if (op === '+') {
        a = Math.floor(Math.random() * lvl.range) + 1;
        b = Math.floor(Math.random() * lvl.range) + 1;
        ans = a + b;
        q = `${a} + ${b}`;
      } else if (op === '-') {
        a = Math.floor(Math.random() * lvl.range) + 1;
        b = Math.floor(Math.random() * a) + 1; // avoid negative
        ans = a - b;
        q = `${a} - ${b}`;
      } else if (op === '*') {
        a = Math.floor(Math.random() * lvl.range) + 1;
        b = Math.floor(Math.random() * 10) + 1;
        ans = a * b;
        q = `${a} × ${b}`;
      }
      newQs.push({
        q,
        ans
      });
    }
    setQuestions(newQs);
    setCurrentQIdx(0);
    setUserAnswer('');
    setFeedback(null);
    setGameStatus('playing');
    setStartTime(Date.now());
  }, [gameStarted]);
  useEffect(() => {
    if (gameStarted) generateQuestions(levelIdx);
  }, [levelIdx, generateQuestions, gameStarted]);
  const startGame = idx => {
    setLevelIdx(idx);
    setGameStarted(true);
  };
  const checkAnswer = val => {
    if (gameStatus !== 'playing' || feedback) return false;
    const target = questions[currentQIdx].ans;
    const correct = parseInt(val) === target;
    if (correct) {
      setFeedback('correct');
      if (window.confetti) {
        window.confetti({
          particleCount: 30,
          spread: 40,
          origin: {
            y: 0.8
          },
          colors: ['#10b981']
        });
      }
      setTimeout(() => {
        if (currentQIdx < questions.length - 1) {
          setCurrentQIdx(prev => prev + 1);
          setUserAnswer('');
          setFeedback(null);
        } else {
          setGameStatus('finished');
          const t = ((Date.now() - startTime) / 1000).toFixed(1);
          setTotalTime(t);

          // Star logic for Math
          const baseTime = LEVELS[levelIdx].count * 3;
          let s = 3;
          if (t < baseTime * 0.6) s = 5;else if (t < baseTime * 0.9) s = 4;else if (t > baseTime * 1.5) s = 2;
          setStars(s);
          if (window.confetti) window.confetti({
            particleCount: 150,
            spread: 100,
            origin: {
              y: 0.6
            }
          });
        }
      }, 600);
      return true;
    } else if (val.length >= String(target).length) {
      // Wrong answer reached max length
      setFeedback('wrong');
      setTimeout(() => {
        setUserAnswer('');
        setFeedback(null);
      }, 600);
      return false;
    }
    return false;
  };
  const handleSubmit = e => {
    if (e) e.preventDefault();
  };
  const nextLevel = () => {
    if (levelIdx < LEVELS.length - 1) {
      setLevelIdx(levelIdx + 1);
    } else {
      setLevelIdx(0);
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    className: `py-20 px-4 min-h-screen bg-brand-50 flex flex-col items-center ${isStandalone ? 'pt-32' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-xl w-full text-center"
  }, !gameStarted ? /*#__PURE__*/React.createElement("div", {
    className: "max-w-2xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-start mb-8"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigateTo('cognitive'),
    className: "inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors bg-white px-5 py-2.5 rounded-xl shadow-sm border border-brand-100 group"
  }, /*#__PURE__*/React.createElement(Icons.ArrowLeft, {
    className: "w-5 h-5 group-hover:-translate-x-1 transition-transform"
  }), /*#__PURE__*/React.createElement("span", null, "Volver"))), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-4xl font-bold text-brand-900 mb-8"
  }, "C\xE1lculo Mental"), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] border border-brand-100 shadow-2xl p-10 anim-scale-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl mb-6"
  }, "\uD83E\uDDEE"), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-brand-900 mb-6"
  }, "Selecciona la dificultad"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 gap-3"
  }, LEVELS.map((level, idx) => /*#__PURE__*/React.createElement("button", {
    key: level.id,
    onClick: () => startGame(idx),
    className: "group p-5 rounded-2xl border-2 border-brand-50 hover:border-brand-500 hover:bg-brand-50 transition-all flex items-center justify-between px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-left"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-brand-900 font-bold text-xl block"
  }, level.name), /*#__PURE__*/React.createElement("span", {
    className: "text-brand-500 text-sm font-medium"
  }, "Operaciones: ", level.ops.join(', '))), /*#__PURE__*/React.createElement(Icons.ArrowRight, {
    className: "text-brand-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all"
  })))))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GameHeader, {
    title: "C\xE1lculo Mental",
    subtitle: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "bg-brand-900 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest"
    }, "Nivel ", levelIdx + 1), /*#__PURE__*/React.createElement("span", {
      className: "text-brand-600 font-bold uppercase tracking-widest"
    }, LEVELS[levelIdx].name)),
    onBack: () => navigateTo('cognitive'),
    onRestart: () => generateQuestions(levelIdx),
    onLevels: () => setGameStarted(false),
    isStandalone: isStandalone
  }), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] shadow-2xl border-8 border-brand-100 p-8 sm:p-12 relative overflow-hidden"
  }, gameStatus === 'playing' ? /*#__PURE__*/React.createElement("div", {
    className: "space-y-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center px-4 mb-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-brand-400 font-bold"
  }, "Pregunta ", currentQIdx + 1, " de ", questions.length), /*#__PURE__*/React.createElement("div", {
    className: "w-32 h-2 bg-brand-100 rounded-full overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full bg-brand-600 transition-all duration-500",
    style: {
      width: `${currentQIdx / questions.length * 100}%`
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "py-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: `text-6xl sm:text-8xl font-display font-bold text-brand-900 transition-all duration-300 ${feedback === 'correct' ? 'text-emerald-500 scale-110' : feedback === 'wrong' ? 'text-red-500 animate-shake' : ''}`
  }, questions[currentQIdx]?.q)), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "relative max-w-[240px] mx-auto"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    autoFocus: true,
    value: userAnswer,
    onChange: e => {
      setUserAnswer(e.target.value);
      checkAnswer(e.target.value);
    },
    placeholder: "?",
    className: `w-full text-center text-5xl font-bold py-4 rounded-2xl border-4 transition-all focus:outline-none
                            ${feedback === 'correct' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : feedback === 'wrong' ? 'border-red-500 bg-red-50 text-red-700' : 'border-brand-200 focus:border-brand-600 bg-white text-brand-900'}`
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "hidden"
  }, "Enviar")), /*#__PURE__*/React.createElement("p", {
    className: "text-brand-400 text-sm font-medium"
  }, "La respuesta se validar\xE1 autom\xE1ticamente")) : /*#__PURE__*/React.createElement("div", {
    className: "text-center py-8 anim-scale-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-7xl mb-6"
  }, "\uD83E\uDDEE\u2728"), /*#__PURE__*/React.createElement("h3", {
    className: "text-3xl font-bold text-brand-900 mb-2"
  }, "\xA1Nivel Completado!"), /*#__PURE__*/React.createElement(StarRating, {
    stars: stars
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-gray-600 mb-6"
  }, "Has resuelto todo en ", /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-brand-700"
  }, totalTime, "s"), "."), /*#__PURE__*/React.createElement(ShareButtons, {
    game: "C\xE1lculo Mental",
    time: totalTime
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row gap-4 justify-center mt-10"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: nextLevel,
    className: "px-10 py-5 bg-brand-900 text-white rounded-2xl font-bold text-xl hover:bg-brand-800 shadow-xl transition-all btn-pulse"
  }, levelIdx < LEVELS.length - 1 ? 'Siguiente Nivel' : 'Reiniciar Desafío'), /*#__PURE__*/React.createElement("button", {
    onClick: () => setGameStarted(false),
    className: "px-8 py-4 bg-brand-100 text-brand-700 rounded-2xl font-bold text-lg hover:bg-brand-200 transition-all"
  }, "Cambiar nivel")))))));
};

// --- SECTION ORDER GAME ---

const SectionOrderGame = function SectionOrderGame({
  isStandalone,
  navigateTo
}) {
  const [gameStarted, setGameStarted] = React.useState(false);
  const [levelIndex, setLevelIndex] = React.useState(0);
  const [numbers, setNumbers] = React.useState([]);
  const [nextNumber, setNextNumber] = React.useState(1);
  const [status, setStatus] = React.useState('playing'); // playing, won
  const [startTime, setStartTime] = React.useState(Date.now());
  const [finalTime, setFinalTime] = React.useState(0);
  const [stars, setStars] = React.useState(0);

  // Hint Logic: Show visual cue only after 15 seconds
  const [showHint, setShowHint] = React.useState(false);
  const hintTimerRef = React.useRef(null);
  const startHintTimer = React.useCallback(() => {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    setShowHint(false);
    hintTimerRef.current = setTimeout(() => {
      setShowHint(true);
    }, 15000);
  }, []);
  const currentLevel = ORDER_LEVELS[levelIndex];
  const initLevel = React.useCallback(() => {
    if (!gameStarted) return;
    const nums = Array.from({
      length: currentLevel.count
    }, (_, i) => i + 1);
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    setNumbers(nums);
    setNextNumber(1);
    setStatus('playing');
    setStartTime(Date.now());
    startHintTimer();
  }, [currentLevel.count, startHintTimer, gameStarted]);
  const startGame = idx => {
    setLevelIndex(idx);
    setGameStarted(true);
  };

  // Cleanup
  React.useEffect(() => {
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, []);
  React.useEffect(() => {
    initLevel();
  }, [initLevel]);
  const handleNumberClick = num => {
    if (status !== 'playing') return;
    if (num === nextNumber) {
      if (num === currentLevel.count) {
        setStatus('won');
        const timeTaken = (Date.now() - startTime) / 1000;
        setFinalTime(timeTaken.toFixed(2));

        // Star logic for Order
        const baseTime = currentLevel.count * 1.5; // 1.5s per number average
        let s = 3;
        if (timeTaken < baseTime * 0.5) s = 5;else if (timeTaken < baseTime * 0.7) s = 4;else if (timeTaken > baseTime * 1.5) s = 2;
        setStars(s);
        if (window.confetti) window.confetti({
          particleCount: 150,
          spread: 70,
          origin: {
            y: 0.6
          }
        });
        if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
      } else {
        setNextNumber(num + 1);
        startHintTimer();
      }
    }
  };
  const nextLevel = () => {
    if (levelIndex < ORDER_LEVELS.length - 1) {
      setLevelIndex(levelIndex + 1);
    } else {
      setLevelIndex(0); // Reset
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    className: `py-20 px-4 min-h-screen bg-brand-50 flex flex-col items-center ${isStandalone ? 'pt-32' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl w-full text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigateTo('cognitive'),
    className: "inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors bg-white px-5 py-2.5 rounded-xl shadow-sm border border-brand-100 group"
  }, /*#__PURE__*/React.createElement(Icons.ArrowLeft, {
    className: "w-5 h-5 group-hover:-translate-x-1 transition-transform"
  }), /*#__PURE__*/React.createElement("span", null, "Volver")), isStandalone && /*#__PURE__*/React.createElement("button", {
    onClick: () => window.close(),
    className: "text-brand-400 text-sm font-bold hover:text-brand-600 transition-colors"
  }, "Cerrar App")), !gameStarted ? /*#__PURE__*/React.createElement("div", {
    className: "max-w-2xl mx-auto text-center"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-4xl font-bold text-brand-900 mb-8"
  }, "Juego de Orden"), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] border border-brand-100 shadow-2xl p-10 anim-scale-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl mb-6"
  }, "\uD83D\uDD22"), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-brand-900 mb-6"
  }, "Selecciona la dificultad"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-4"
  }, ORDER_LEVELS.map((level, idx) => /*#__PURE__*/React.createElement("button", {
    key: level.id,
    onClick: () => startGame(idx),
    className: "group p-6 rounded-2xl border-2 border-brand-50 hover:border-brand-500 hover:bg-brand-50 transition-all flex flex-col items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-brand-900 font-bold text-xl"
  }, "Nivel ", level.id), /*#__PURE__*/React.createElement("span", {
    className: "text-brand-500 text-sm font-medium"
  }, "Encontrar ", level.count, " n\xFAmeros")))))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GameHeader, {
    title: "En Orden",
    subtitle: /*#__PURE__*/React.createElement("p", {
      className: "text-brand-600 font-bold mb-0 uppercase tracking-widest"
    }, "Nivel ", currentLevel.id, ": Encuentra del 1 al ", currentLevel.count),
    onBack: () => navigateTo('cognitive'),
    onRestart: initLevel,
    onLevels: () => setGameStarted(false),
    isStandalone: isStandalone
  }), status === 'won' ? /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-3xl p-10 shadow-2xl anim-scale-in border border-brand-100 max-w-2xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl mb-6"
  }, "\uD83C\uDFC6\u2728"), /*#__PURE__*/React.createElement("h3", {
    className: "text-3xl font-bold text-brand-900 mb-2"
  }, "\xA1Nivel Completado!"), /*#__PURE__*/React.createElement(StarRating, {
    stars: stars
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-gray-600 mb-6"
  }, "Has ordenado todo en ", /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-brand-700"
  }, finalTime, "s"), "."), /*#__PURE__*/React.createElement(ShareButtons, {
    game: "Juego de Orden",
    time: finalTime
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row gap-4 justify-center mt-10"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setGameStarted(false),
    className: "px-8 py-3 bg-brand-100 text-brand-700 font-bold rounded-xl hover:bg-brand-200 transition-all"
  }, "Cambiar Nivel"), /*#__PURE__*/React.createElement("button", {
    onClick: nextLevel,
    className: "px-8 py-3 bg-brand-900 text-white font-bold rounded-xl hover:bg-brand-800 shadow-lg transition-all btn-pulse"
  }, levelIndex < ORDER_LEVELS.length - 1 ? 'Siguiente Nivel' : 'Reiniciar Desafío'))) : /*#__PURE__*/React.createElement("div", {
    className: `grid ${currentLevel.cols} gap-3 sm:gap-4 max-w-2xl mx-auto`
  }, numbers.map(num => {
    const isPast = num < nextNumber;
    const isCurrent = num === nextNumber;
    return /*#__PURE__*/React.createElement("button", {
      key: num,
      onClick: () => handleNumberClick(num),
      className: `aspect-square flex items-center justify-center text-xl sm:text-2xl font-bold rounded-2xl transition-all
                            ${isPast ? 'bg-emerald-500 text-white shadow-inner opacity-50 scale-95 pointer-events-none' : isCurrent && showHint ? 'bg-white text-brand-900 shadow-lg border-4 border-brand-400 target-number' : 'bg-white text-brand-700 hover:border-brand-200 border-2 border-brand-50 hover:shadow-md active:scale-95 active:bg-red-50'}`
    }, num);
  })))));
};

// --- SECTION DAILY CHALLENGE ---

const SectionDailyChallenge = function SectionDailyChallenge({
  isStandalone,
  navigateTo
}) {
  const {
    useState,
    useEffect,
    useCallback,
    useMemo,
    useRef
  } = React;
  const [step, setStep] = useState(0); // 0: Start, 1: Game1, 2: Game2, 3: Game3, 4: Finished
  const [streak, setStreak] = useState(0);
  const [alreadyDoneToday, setAlreadyDoneToday] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [stars, setStars] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [linkedEmail, setLinkedEmail] = useState('');
  const [hasPromptedNotif, setHasPromptedNotif] = useState(localStorage.getItem('daily_challenge_notif_prompted') === 'true');
  const [historyVersion, setHistoryVersion] = useState(0);
  const challengeHistory = useMemo(() => {
    return JSON.parse(localStorage.getItem('daily_challenge_history') || '[]');
  }, [alreadyDoneToday, historyVersion]);

  // Difficulty factor: 1 (Mon) to 7 (Sun)
  const difficultyFactor = useMemo(() => {
    const d = new Date().getDay();
    return (d + 6) % 7 + 1;
  }, []);
  useEffect(() => {
    const lastDate = localStorage.getItem('daily_challenge_last_date');
    const currentStreak = parseInt(localStorage.getItem('daily_challenge_streak') || '0');
    const todayStr = new Date().toISOString().split('T')[0];
    setStreak(currentStreak);
    if (lastDate === todayStr) {
      setAlreadyDoneToday(true);
    }
    setLinkedEmail(localStorage.getItem('daily_challenge_email') || '');
  }, [isCalendarOpen]);
  useEffect(() => {
    setTimeout(() => {
      syncCloudProgress((mergedHistory, newStreak) => {
        setStreak(newStreak);
        setHistoryVersion(v => v + 1);
      });
    }, 1000);
  }, []);
  const completeChallenge = async () => {
    const todayStr = new Date().toISOString().split('T')[0];
    const lastDate = localStorage.getItem('daily_challenge_last_date');
    let newStreak = streak;
    if (lastDate !== todayStr) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      if (lastDate === yesterdayStr) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
      localStorage.setItem('daily_challenge_last_date', todayStr);
      localStorage.setItem('daily_challenge_streak', newStreak.toString());

      // Track history for the week tracker
      const history = JSON.parse(localStorage.getItem('daily_challenge_history') || '[]');
      if (!history.includes(todayStr)) {
        history.push(todayStr);
        localStorage.setItem('daily_challenge_history', JSON.stringify(history));
      }
      setStreak(newStreak);
      setAlreadyDoneToday(true);

      // Silent cloud sync on completion
      if (window.firebaseDB && window.firebaseDoc && window.firebaseSetDoc) {
        const deviceId = localStorage.getItem('daily_challenge_device_id') || initDeviceId();
        const linked = localStorage.getItem('daily_challenge_email') || '';
        const docRef = window.firebaseDoc(window.firebaseDB, "daily_challenge_streaks", deviceId);
        let pushSubscriptionStr = '';
        try {
          pushSubscriptionStr = await getPushSubscriptionSilently();
        } catch (e) {
          console.error("Silent push fetch failed in completeChallenge", e);
        }
        const completionPayload = {
          email: linked,
          streak: newStreak,
          last_date: todayStr,
          history: history,
          updated_at: new Date().toISOString()
        };
        if (localStorage.getItem('daily_challenge_notifications_enabled') === 'true') {
          completionPayload.notifications_enabled = true;
          if (pushSubscriptionStr) {
            completionPayload.push_subscription = pushSubscriptionStr;
          }
        }
        window.firebaseSetDoc(docRef, completionPayload, {
          merge: true
        }).catch(err => console.error("Cloud sync failed on completion", err));
      }
    }
    const finalT = (Date.now() - startTime) / 1000;
    setTotalTime(finalT.toFixed(0));

    // Star calculation for the whole challenge
    const baseThreshold = 50 + difficultyFactor * 5;
    let s = 3;
    if (finalT < baseThreshold * 0.7) s = 5;else if (finalT < baseThreshold) s = 4;else if (finalT > baseThreshold * 1.5) s = 2;
    setStars(s);
    setStep(4);
    if (window.confetti) {
      window.confetti({
        particleCount: 200,
        spread: 160,
        origin: {
          y: 0.6
        }
      });

      // Extra celebration for milestones
      if (newStreak >= 7) {
        setTimeout(() => {
          window.confetti({
            particleCount: 300,
            spread: 200,
            origin: {
              y: 0.5
            },
            colors: ['#E87D55', '#1A3052', '#FFD700']
          });
        }, 800);
      }
      if (newStreak >= 30) {
        setTimeout(() => {
          window.confetti({
            particleCount: 500,
            spread: 360,
            scalar: 2,
            origin: {
              y: 0.4
            }
          });
        }, 1600);
      }
    }
  };
  const startChallenge = () => {
    setStep(1);
    setStartTime(Date.now());
  };
  const enableNotifications = async () => {
    localStorage.setItem('daily_challenge_notif_prompted', 'true');
    setHasPromptedNotif(true);
    if (!('Notification' in window)) {
      alert("Este navegador no soporta notificaciones.");
      return;
    }
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        let pushSubscriptionStr = '';
        if ('serviceWorker' in navigator) {
          try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array('BMYMyTsyO73fZSOP6B5HJP0Ii2YNFx4aFg4kIMaB830gpOv7vYhNF0xi7g9HhK50CZAPsezb9sDHcKVQxEBMS-k')
            });
            pushSubscriptionStr = JSON.stringify(subscription);
          } catch (subErr) {
            console.log("No se pudo registrar la suscripción push nativa (se requiere VAPID), pero el permiso está concedido.", subErr);
          }
        }
        localStorage.setItem('daily_challenge_notifications_enabled', 'true');

        // Guardar estado en Firestore
        const deviceId = localStorage.getItem('daily_challenge_device_id') || initDeviceId();
        if (window.firebaseDB && window.firebaseDoc && window.firebaseSetDoc) {
          const docRef = window.firebaseDoc(window.firebaseDB, "daily_challenge_streaks", deviceId);
          await window.firebaseSetDoc(docRef, {
            notifications_enabled: true,
            push_subscription: pushSubscriptionStr,
            updated_at: new Date().toISOString()
          }, {
            merge: true
          });
        }
        alert("¡Recordatorios activados con éxito! Te avisaremos si olvidas completar tu reto.");
      } else {
        alert("No se concedieron los permisos de notificación.");
      }
    } catch (err) {
      console.error("Error al activar notificaciones:", err);
      alert("Hubo un problema al activar las notificaciones.");
    }
  };
  const declineNotifications = () => {
    localStorage.setItem('daily_challenge_notif_prompted', 'true');
    setHasPromptedNotif(true);
  };

  // Game 1: Mini Math
  const MathSubGame = ({
    onComplete
  }) => {
    const [qIdx, setQIdx] = useState(0);
    const [ans, setAns] = useState('');
    const [feedback, setFeedback] = useState(null);
    const count = 5 + Math.floor(difficultyFactor / 2);
    const range = difficultyFactor * 10;
    const qData = useMemo(() => {
      const qs = [];
      for (let i = 0; i < count; i++) {
        const a = Math.floor(Math.random() * range) + 1;
        const b = Math.floor(Math.random() * range) + 1;
        qs.push({
          q: `${a} + ${b}`,
          a: a + b
        });
      }
      return qs;
    }, [count, range]);
    const checkAnswer = val => {
      if (feedback) return false;
      const target = qData[qIdx].a;
      if (parseInt(val) === target) {
        setFeedback('correct');
        setTimeout(() => {
          if (qIdx < count - 1) {
            setQIdx(qIdx + 1);
            setAns('');
            setFeedback(null);
          } else onComplete();
        }, 600);
        return true;
      } else if (val.length >= String(target).length) {
        setFeedback('wrong');
        setTimeout(() => {
          setAns('');
          setFeedback(null);
        }, 600);
      }
      return false;
    };
    const submit = e => {
      if (e) e.preventDefault();
      if (!checkAnswer(ans)) {
        setFeedback('wrong');
        setTimeout(() => setFeedback(null), 800);
      }
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "bg-white rounded-[3rem] p-10 shadow-2xl border-8 border-brand-100 anim-scale-in max-w-lg mx-auto w-full text-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-brand-400 font-bold uppercase tracking-widest text-sm mb-4 block"
    }, "Reto: C\xE1lculo"), /*#__PURE__*/React.createElement("div", {
      className: "text-6xl font-bold text-brand-900 mb-8 py-4"
    }, qData[qIdx].q), /*#__PURE__*/React.createElement("form", {
      onSubmit: submit
    }, /*#__PURE__*/React.createElement("input", {
      type: "number",
      autoFocus: true,
      value: ans,
      onChange: e => {
        setAns(e.target.value);
        checkAnswer(e.target.value);
      },
      placeholder: "?",
      className: `w-full text-center text-4xl font-bold py-4 rounded-2xl border-4 transition-all focus:outline-none ${feedback === 'correct' ? 'border-emerald-500 bg-emerald-50' : feedback === 'wrong' ? 'border-red-500 bg-red-50' : 'border-brand-200 focus:border-brand-600'}`
    })));
  };

  // Game 2: Mini Order
  const OrderSubGame = ({
    onComplete
  }) => {
    const count = 6 + difficultyFactor;
    const [next, setNext] = useState(1);
    const [nums, setNums] = useState([]);
    useEffect(() => {
      const n = Array.from({
        length: count
      }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
      setNums(n);
    }, [count]);
    const click = n => {
      if (n === next) {
        if (n === count) onComplete();else setNext(next + 1);
      }
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "bg-white rounded-[3rem] p-10 shadow-2xl border-8 border-brand-100 anim-scale-in max-w-lg mx-auto w-full text-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-brand-400 font-bold uppercase tracking-widest text-sm mb-4 block"
    }, "Reto: Orden Num\xE9rico"), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-4 gap-3 mb-4"
    }, nums.map(n => /*#__PURE__*/React.createElement("button", {
      key: n,
      onClick: () => click(n),
      className: `aspect-square flex items-center justify-center text-xl font-bold rounded-xl transition-all ${n < next ? 'bg-emerald-500 text-white opacity-50 scale-90' : 'bg-white border-2 border-brand-100 text-brand-900 shadow-sm'}`
    }, n))), /*#__PURE__*/React.createElement("p", {
      className: "text-brand-400 text-sm"
    }, "Pulsa los n\xFAmeros en orden del 1 al ", count));
  };

  // Game 3: Mini Visual
  const VisualSubGame = ({
    onComplete
  }) => {
    const size = 6 + Math.floor(difficultyFactor / 2);
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z'];
    const [grid, setGrid] = useState([]);
    const [targetIdx, setTargetIdx] = useState(-1);
    const [targetChar, setTargetChar] = useState('');
    const [foundIdx, setFoundIdx] = useState(null);
    useEffect(() => {
      const total = size * size;
      const tIdx = Math.floor(Math.random() * total);
      const t = letters[Math.floor(Math.random() * letters.length)];
      const base = letters[(letters.indexOf(t) + 1) % letters.length];
      const g = Array(total).fill(base);
      g[tIdx] = t;
      setGrid(g);
      setTargetIdx(tIdx);
      setTargetChar(t);
    }, [size]);
    const handleCorrect = i => {
      if (i === targetIdx) {
        setFoundIdx(i);
        setTimeout(onComplete, 500);
      }
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "bg-white rounded-[3rem] p-10 shadow-2xl border-8 border-brand-100 anim-scale-in max-w-lg mx-auto w-full text-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-brand-400 font-bold uppercase tracking-widest text-sm mb-4 block"
    }, "Reto: Agudeza Visual"), /*#__PURE__*/React.createElement("h3", {
      className: "text-xl font-bold text-brand-900 mb-6"
    }, "Busca la letra ", /*#__PURE__*/React.createElement("span", {
      className: "text-accent-coral text-3xl mx-2"
    }, targetChar)), /*#__PURE__*/React.createElement("div", {
      className: "grid gap-2",
      style: {
        gridTemplateColumns: `repeat(${size}, 1fr)`
      }
    }, grid.map((l, i) => /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => handleCorrect(i),
      className: `aspect-square rounded-lg flex items-center justify-center text-xl font-bold transition-all duration-200
                    ${foundIdx === i ? 'bg-emerald-500 text-white scale-110' : 'bg-brand-50 text-brand-700 hover:bg-brand-100 active:bg-brand-200'}`
    }, l))));
  };

  // Game 4: Mini Memory
  const MemorySubGame = ({
    onComplete
  }) => {
    const pairsCount = 3 + Math.floor(difficultyFactor / 2);
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const icons = ['🧠', '💡', '🌟', '🧩', '🚀', '🌈', '💎', '🎨', '🍎', '⚽', '🎸', '🍦'];
    useEffect(() => {
      let gameIcons = icons.slice(0, pairsCount);
      let gameCards = [...gameIcons, ...gameIcons].map((icon, index) => ({
        id: index,
        icon,
        name: icon
      })).sort(() => Math.random() - 0.5);
      setCards(gameCards);
    }, [pairsCount]);
    const handleFlip = index => {
      if (flipped.length === 2 || matched.includes(cards[index].name) || flipped.includes(index)) return;
      const newFlipped = [...flipped, index];
      setFlipped(newFlipped);
      if (newFlipped.length === 2) {
        if (cards[newFlipped[0]].name === cards[newFlipped[1]].name) {
          const newMatched = [...matched, cards[newFlipped[0]].name];
          setMatched(newMatched);
          setFlipped([]);
          if (newMatched.length === pairsCount) setTimeout(onComplete, 600);
        } else {
          setTimeout(() => setFlipped([]), 1000);
        }
      }
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "bg-white rounded-[3rem] p-8 shadow-2xl border-8 border-brand-100 anim-scale-in max-w-lg mx-auto w-full text-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-brand-400 font-bold uppercase tracking-widest text-sm mb-4 block"
    }, "Reto: Memoria"), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-3 gap-3"
    }, cards.map((card, i) => /*#__PURE__*/React.createElement("div", {
      key: card.id,
      onClick: () => handleFlip(i),
      className: `relative aspect-square cursor-pointer transition-all duration-500 preserve-3d ${flipped.includes(i) || matched.includes(card.name) ? 'rotate-y-180' : ''}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-brand-100 rounded-2xl flex items-center justify-center border-2 border-brand-200 backface-hidden text-2xl font-bold text-brand-300"
    }, "?"), /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-white border-4 border-brand-400 rounded-2xl flex items-center justify-center rotate-y-180 backface-hidden text-3xl shadow-md"
    }, card.icon)))), /*#__PURE__*/React.createElement("p", {
      className: "text-brand-400 text-sm mt-6"
    }, "Encuentra las ", pairsCount, " parejas"));
  };

  // Game 5: Mini WordSearch
  const WordSearchSubGame = ({
    onComplete
  }) => {
    const size = 8;
    const [grid, setGrid] = useState([]);
    const [wordsToFind, setWordsToFind] = useState([]);
    const [foundWords, setFoundWords] = useState([]);
    const [selection, setSelection] = useState(null);
    const pool = ['SOL', 'MAR', 'LUNA', 'CASA', 'MESA', 'ROPA', 'VIDA', 'PAZ', 'LUZ', 'AGUA', 'RADIO', 'RELOJ', 'PAN', 'SAL', 'FUEGO', 'AIRE', 'FLOR', 'TIEMPO', 'LUZ', 'MANO'];
    useEffect(() => {
      const selected = pool.sort(() => Math.random() - 0.5).slice(0, 3 + Math.floor(difficultyFactor / 3));
      const newGrid = Array(size).fill(0).map(() => Array(size).fill(''));
      const placed = [];
      selected.forEach(word => {
        let success = false;
        let attempts = 0;
        while (!success && attempts < 50) {
          attempts++;
          const isVert = Math.random() > 0.5;
          const r = Math.floor(Math.random() * (isVert ? size - word.length + 1 : size));
          const c = Math.floor(Math.random() * (isVert ? size : size - word.length + 1));
          let fits = true;
          for (let i = 0; i < word.length; i++) {
            const rr = isVert ? r + i : r;
            const cc = isVert ? c : c + i;
            if (newGrid[rr][cc] !== '' && newGrid[rr][cc] !== word[i]) {
              fits = false;
              break;
            }
          }
          if (fits) {
            const cells = [];
            for (let i = 0; i < word.length; i++) {
              const rr = isVert ? r + i : r;
              const cc = isVert ? c : c + i;
              newGrid[rr][cc] = word[i];
              cells.push({
                r: rr,
                c: cc
              });
            }
            placed.push({
              word,
              cells
            });
            success = true;
          }
        }
      });
      const letters = 'ABCDE';
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (newGrid[r][c] === '') newGrid[r][c] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
      setGrid(newGrid);
      setWordsToFind(placed);
      setFoundWords([]);
    }, [difficultyFactor]);
    const getCellFromEvent = e => {
      const touch = e.touches ? e.touches[0] : e;
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target && target.dataset.r !== undefined) {
        return {
          r: parseInt(target.dataset.r),
          c: parseInt(target.dataset.c)
        };
      }
      return null;
    };
    const handleStart = e => {
      const cell = getCellFromEvent(e);
      if (!cell) return;
      if (selection && selection.isFirstClick) {
        const dr = Math.abs(cell.r - selection.start.r);
        const dc = Math.abs(cell.c - selection.start.c);
        if (dr === 0 || dc === 0 || dr === dc) {
          validateSelection(selection.start, cell);
        } else {
          setSelection(null);
        }
      } else {
        setSelection({
          start: cell,
          end: cell,
          isDragging: true
        });
      }
    };
    const handleMove = e => {
      if (!selection || !selection.isDragging) return;
      const cell = getCellFromEvent(e);
      if (cell) {
        const dr = Math.abs(cell.r - selection.start.r);
        const dc = Math.abs(cell.c - selection.start.c);
        if (dr === 0 || dc === 0 || dr === dc) {
          setSelection(prev => ({
            ...prev,
            end: cell
          }));
        }
      }
    };
    const handleEnd = () => {
      if (!selection) return;
      if (selection.isDragging) {
        if (selection.start.r === selection.end.r && selection.start.c === selection.end.c) {
          setSelection({
            ...selection,
            isDragging: false,
            isFirstClick: true
          });
        } else {
          validateSelection(selection.start, selection.end);
          setSelection(null);
        }
      }
    };
    const validateSelection = (start, end) => {
      const dr = Math.sign(end.r - start.r);
      const dc = Math.sign(end.c - start.c);
      const len = Math.max(Math.abs(end.r - start.r), Math.abs(end.c - start.c)) + 1;
      let wordStr = '';
      for (let i = 0; i < len; i++) {
        const r = start.r + i * dr;
        const c = start.c + i * dc;
        wordStr += grid[r][c];
      }
      const match = wordsToFind.find(w => w.word === wordStr && !foundWords.some(fw => fw.word === w.word));
      if (match) {
        const newFound = [...foundWords, match];
        setFoundWords(newFound);
        setSelection(null); // Clear after match
        if (newFound.length === wordsToFind.length) {
          if (window.confetti) window.confetti({
            particleCount: 30,
            spread: 50,
            origin: {
              y: 0.8
            }
          });
          setTimeout(onComplete, 800);
        }
      } else {
        setSelection(null); // Clear if no match
      }
    };
    const isCellSelected = (r, c) => {
      if (!selection) return false;
      const {
        start,
        end
      } = selection;
      const dr = Math.sign(end.r - start.r);
      const dc = Math.sign(end.c - start.c);
      const len = Math.max(Math.abs(end.r - start.r), Math.abs(end.c - start.c)) + 1;
      for (let i = 0; i < len; i++) {
        if (start.r + i * dr === r && start.c + i * dc === c) return true;
      }
      return false;
    };
    const isCellFound = (r, c) => foundWords.some(fw => fw.cells.some(cell => cell.r === r && cell.c === c));
    return /*#__PURE__*/React.createElement("div", {
      className: "bg-white rounded-[3rem] p-6 sm:p-8 shadow-2xl border-8 border-brand-100 anim-scale-in max-w-lg mx-auto w-full text-center select-none touch-none"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-brand-400 font-bold uppercase tracking-widest text-sm mb-4 block"
    }, "Reto: Rastreo"), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-8 gap-1 mb-6 bg-brand-50 p-2 rounded-2xl border border-brand-100 cursor-pointer",
      onMouseDown: handleStart,
      onMouseMove: handleMove,
      onMouseUp: handleEnd,
      onMouseLeave: handleEnd,
      onTouchStart: handleStart,
      onTouchMove: handleMove,
      onTouchEnd: handleEnd
    }, grid.map((row, r) => row.map((char, c) => {
      const selected = isCellSelected(r, c);
      const found = isCellFound(r, c);
      return /*#__PURE__*/React.createElement("div", {
        key: `${r}-${c}`,
        "data-r": r,
        "data-c": c,
        className: `aspect-square flex items-center justify-center text-sm sm:text-base font-bold rounded-md transition-all duration-150
                      ${found ? 'bg-emerald-500 text-white shadow-sm' : selected ? 'bg-brand-600 text-white shadow-md scale-105 z-10' : 'text-brand-900 bg-white shadow-sm hover:bg-brand-50'}`
      }, char);
    }))), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap justify-center gap-2"
    }, wordsToFind.map(w => /*#__PURE__*/React.createElement("div", {
      key: w.word,
      className: `px-4 py-2 rounded-full text-xs font-bold transition-all ${foundWords.some(fw => fw.word === w.word) ? 'bg-emerald-100 text-emerald-700 line-through' : 'bg-brand-100 text-brand-700'}`
    }, w.word))), /*#__PURE__*/React.createElement("p", {
      className: "text-[10px] text-brand-400 mt-6 font-bold"
    }, "Desliza sobre las letras para marcar las palabras"));
  };

  // Game 6: Mini Intruder
  const IntruderSubGame = ({
    onComplete
  }) => {
    const count = 4 + Math.floor(difficultyFactor / 2);
    const [items, setItems] = useState([]);
    const [targetIdx, setTargetIdx] = useState(-1);
    const [correctIdx, setCorrectIdx] = useState(null);
    const generateChallenge = useCallback(() => {
      const cat = INTRUDER_CATEGORIES[Math.floor(Math.random() * INTRUDER_CATEGORIES.length)];
      const pool = [...cat.items].sort(() => Math.random() - 0.5).slice(0, count - 1);
      const intruder = cat.intruders[Math.floor(Math.random() * cat.intruders.length)];
      const finalItems = [...pool, intruder].sort(() => Math.random() - 0.5);
      setItems(finalItems);
      setTargetIdx(finalItems.indexOf(intruder));
      setCorrectIdx(null);
    }, [count]);
    useEffect(() => {
      generateChallenge();
    }, [generateChallenge]);
    const handleSelect = idx => {
      if (correctIdx !== null) return;
      if (idx === targetIdx) {
        setCorrectIdx(idx);
        setTimeout(onComplete, 800);
      }
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "bg-white rounded-[3rem] p-8 shadow-2xl border-8 border-brand-100 anim-scale-in max-w-lg mx-auto w-full text-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-brand-400 font-bold uppercase tracking-widest text-sm mb-4 block"
    }, "Reto: Razonamiento"), /*#__PURE__*/React.createElement("h3", {
      className: "text-xl font-bold text-brand-900 mb-6"
    }, "\xBFCu\xE1l NO pertenece al grupo?"), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 sm:grid-cols-3 gap-4"
    }, items.map((item, i) => /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => handleSelect(i),
      className: `aspect-square flex items-center justify-center text-5xl rounded-2xl transition-all duration-300
                    ${correctIdx === i ? 'bg-emerald-500 text-white scale-110 shadow-lg' : 'bg-brand-50 hover:bg-brand-100 border-2 border-brand-100 hover:border-brand-300'}`
    }, item))));
  };
  const WordBuilderSubGame = ({
    onComplete
  }) => {
    const words = ['COCINA', 'RELOJ', 'SALUD', 'VESTIR', 'PASEAR', 'LIBRO', 'DUCHA', 'PLATO'];
    const [targetWord] = useState(() => words[Math.floor(Math.random() * words.length)]);
    const [scrambled, setScrambled] = useState([]);
    const [userWord, setUserWord] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
      const letters = targetWord.split('');
      let shuffled = [...letters];
      let attempts = 0;
      while (shuffled.join('') === targetWord && attempts < 10) {
        shuffled.sort(() => Math.random() - 0.5);
        attempts++;
      }
      setScrambled(shuffled.map((char, index) => ({
        id: index,
        char,
        used: false
      })));
    }, [targetWord]);
    const handleSelectTile = tile => {
      if (tile.used || isSuccess) return;
      const newUserWord = [...userWord, tile];
      setUserWord(newUserWord);
      const newScrambled = scrambled.map(t => t.id === tile.id ? {
        ...t,
        used: true
      } : t);
      setScrambled(newScrambled);
      if (newUserWord.length === targetWord.length) {
        const formed = newUserWord.map(t => t.char).join('');
        if (isWordValidAnagram(formed, targetWord)) {
          setIsSuccess(true);
          setTimeout(onComplete, 800);
        } else {
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
            setUserWord([]);
            setScrambled(newScrambled.map(t => ({
              ...t,
              used: false
            })));
          }, 650);
        }
      }
    };
    const handleRemoveLetter = indexToRemove => {
      if (isSuccess) return;
      const tile = userWord[indexToRemove];
      if (!tile) return;
      setUserWord(userWord.filter((_, idx) => idx !== indexToRemove));
      setScrambled(scrambled.map(t => t.id === tile.id ? {
        ...t,
        used: false
      } : t));
      setIsError(false);
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "bg-white rounded-[3rem] p-8 shadow-2xl border-8 border-brand-100 anim-scale-in max-w-lg mx-auto w-full text-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-brand-400 font-bold uppercase tracking-widest text-sm mb-2 block"
    }, "Reto: Agilidad L\xE9xica"), /*#__PURE__*/React.createElement("h3", {
      className: "text-xl font-bold text-brand-900 mb-6"
    }, "Ordena las letras para formar la palabra"), /*#__PURE__*/React.createElement("div", {
      className: `flex flex-wrap justify-center gap-2 mb-6 min-h-[56px] items-center p-3 rounded-2xl transition-all duration-300 ${isError ? 'bg-red-50 ring-4 ring-red-300' : isSuccess ? 'bg-emerald-50 ring-4 ring-emerald-300' : 'bg-brand-50 border border-brand-100'}`
    }, Array.from({
      length: targetWord.length
    }).map((_, idx) => {
      const tile = userWord[idx];
      return /*#__PURE__*/React.createElement("button", {
        key: idx,
        onClick: () => handleRemoveLetter(idx),
        disabled: !tile || isSuccess,
        className: `w-10 h-12 rounded-xl flex items-center justify-center font-bold text-xl transition-all
                      ${tile ? isSuccess ? 'bg-emerald-500 text-white shadow-md' : isError ? 'bg-red-500 text-white shadow-md' : 'bg-brand-900 text-white shadow-md cursor-pointer' : 'bg-white border border-dashed border-brand-200 text-transparent pointer-events-none'}`
      }, tile ? tile.char : '');
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap justify-center gap-2"
    }, scrambled.map(tile => /*#__PURE__*/React.createElement("button", {
      key: tile.id,
      onClick: () => handleSelectTile(tile),
      disabled: tile.used || isSuccess,
      className: `w-10 h-12 rounded-xl flex items-center justify-center font-bold text-xl shadow-sm transition-all
                    ${tile.used ? 'bg-gray-100 text-gray-300 border border-gray-200 opacity-40 pointer-events-none scale-90' : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 active:scale-95 cursor-pointer'}`
    }, tile.char))));
  };
  const SimonSubGame = ({
    onComplete
  }) => {
    const [sequence] = useState(() => [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4), Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)]);
    const [userIndex, setUserIndex] = useState(0);
    const [activePad, setActivePad] = useState(null);
    const [isSimonTurn, setIsSimonTurn] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const playPadAnimation = useCallback(padId => {
      setActivePad(padId);
      playSimonTone(SIMON_PADS[padId].freq, 400);
      setTimeout(() => setActivePad(null), 400);
    }, []);
    useEffect(() => {
      setIsSimonTurn(true);
      sequence.forEach((padId, index) => {
        setTimeout(() => {
          playPadAnimation(padId);
          if (index === sequence.length - 1) {
            setTimeout(() => setIsSimonTurn(false), 500);
          }
        }, (index + 1) * 600);
      });
    }, [sequence, playPadAnimation]);
    const handlePadClick = padId => {
      if (isSimonTurn || isSuccess) return;
      playPadAnimation(padId);
      if (padId === sequence[userIndex]) {
        if (userIndex + 1 === sequence.length) {
          setIsSuccess(true);
          setTimeout(onComplete, 800);
        } else {
          setUserIndex(prev => prev + 1);
        }
      } else {
        playSimonTone(150, 450, 'error');
        setTimeout(() => {
          setUserIndex(0);
          setIsSimonTurn(true);
          sequence.forEach((pId, idx) => {
            setTimeout(() => {
              playPadAnimation(pId);
              if (idx === sequence.length - 1) {
                setTimeout(() => setIsSimonTurn(false), 500);
              }
            }, (idx + 1) * 600);
          });
        }, 800);
      }
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "bg-white rounded-[3rem] p-8 shadow-2xl border-8 border-brand-100 anim-scale-in max-w-lg mx-auto w-full text-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-brand-400 font-bold uppercase tracking-widest text-sm mb-2 block"
    }, "Reto: Secuencia de Colores"), /*#__PURE__*/React.createElement("h3", {
      className: "text-xl font-bold text-brand-900 mb-4"
    }, "Repite el patr\xF3n de 4 colores"), /*#__PURE__*/React.createElement("div", {
      className: "mb-6"
    }, isSuccess ? /*#__PURE__*/React.createElement("div", {
      className: "py-2 px-6 bg-emerald-500 text-white rounded-full font-bold text-base inline-flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("span", null, "\xA1Secuencia Correcta!"), " \u2728") : isSimonTurn ? /*#__PURE__*/React.createElement("div", {
      className: "inline-flex items-center gap-2 bg-brand-900 text-white px-5 py-2 rounded-full text-xs font-bold animate-pulse"
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"
    }), /*#__PURE__*/React.createElement("span", null, "Memoriza la secuencia...")) : /*#__PURE__*/React.createElement("div", {
      className: "inline-flex items-center gap-2 bg-emerald-500 text-white px-5 py-2 rounded-full text-xs font-bold"
    }, /*#__PURE__*/React.createElement("span", null, "\xA1Tu turno! (", userIndex, "/4)"))), /*#__PURE__*/React.createElement("div", {
      className: "relative w-56 h-56 mx-auto grid grid-cols-2 gap-3 p-3 bg-brand-900 rounded-full shadow-xl border-4 border-brand-800"
    }, SIMON_PADS.map(pad => {
      const isActive = activePad === pad.id;
      return /*#__PURE__*/React.createElement("button", {
        key: pad.id,
        onClick: () => handlePadClick(pad.id),
        disabled: isSimonTurn || isSuccess,
        className: `relative rounded-2xl transition-all duration-150 cursor-pointer active:scale-95 disabled:cursor-not-allowed
                      ${isActive ? pad.bgActive : pad.bgNormal}`
      }, /*#__PURE__*/React.createElement("span", {
        className: "sr-only"
      }, pad.name));
    })));
  };

  // Random selection logic for the daily challenge
  const dailyGames = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    let seed = 0;
    for (let i = 0; i < todayStr.length; i++) seed += todayStr.charCodeAt(i);
    const pool = ['math', 'order', 'visual', 'memory', 'wordsearch', 'intruder', 'wordbuilder', 'simon'];
    const result = [];
    const available = [...pool];
    for (let i = 0; i < 3; i++) {
      const idx = (seed + i * 13) % available.length;
      result.push(available[idx]);
      available.splice(idx, 1);
    }
    return result;
  }, []);
  const renderCurrentGame = (gameId, onComplete) => {
    switch (gameId) {
      case 'math':
        return /*#__PURE__*/React.createElement(MathSubGame, {
          onComplete: onComplete
        });
      case 'order':
        return /*#__PURE__*/React.createElement(OrderSubGame, {
          onComplete: onComplete
        });
      case 'visual':
        return /*#__PURE__*/React.createElement(VisualSubGame, {
          onComplete: onComplete
        });
      case 'memory':
        return /*#__PURE__*/React.createElement(MemorySubGame, {
          onComplete: onComplete
        });
      case 'wordsearch':
        return /*#__PURE__*/React.createElement(WordSearchSubGame, {
          onComplete: onComplete
        });
      case 'intruder':
        return /*#__PURE__*/React.createElement(IntruderSubGame, {
          onComplete: onComplete
        });
      case 'wordbuilder':
        return /*#__PURE__*/React.createElement(WordBuilderSubGame, {
          onComplete: onComplete
        });
      case 'simon':
        return /*#__PURE__*/React.createElement(SimonSubGame, {
          onComplete: onComplete
        });
      default:
        return null;
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    className: `pt-36 pb-20 px-4 min-h-screen bg-brand-50 flex flex-col items-center ${isStandalone ? 'pt-36' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap sm:flex-nowrap justify-between items-center gap-3 mb-8 sm:mb-12"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigateTo('cognitive'),
    className: "inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors bg-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-sm border border-brand-100 group text-sm sm:text-base"
  }, /*#__PURE__*/React.createElement(Icons.ArrowLeft, {
    className: "w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform"
  }), /*#__PURE__*/React.createElement("span", null, "Volver")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center justify-end gap-2 sm:gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setIsCalendarOpen(true),
    className: "flex items-center gap-1.5 sm:gap-2 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl shadow-sm border border-brand-100 cursor-pointer hover:opacity-85 transition-opacity",
    title: "Ver calendario de racha"
  }, /*#__PURE__*/React.createElement(Icons.Flame, {
    className: "text-accent-coral w-5 h-5 sm:w-6 sm:h-6"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-brand-900 text-sm sm:text-base"
  }, streak, " d\xEDas")), alreadyDoneToday && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 sm:gap-2 text-emerald-600 font-bold bg-emerald-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl border border-emerald-100 text-xs sm:text-base"
  }, /*#__PURE__*/React.createElement(Icons.CheckCircle, {
    className: "w-4 h-4 sm:w-5 sm:h-5"
  }), /*#__PURE__*/React.createElement("span", {
    className: "whitespace-nowrap"
  }, "\xA1Hoy Completado!")))), step === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] p-12 shadow-2xl border border-brand-100 text-center anim-scale-in max-w-2xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative h-48 sm:h-64 rounded-[2.5rem] overflow-hidden mb-8 shadow-xl border-4 border-white anim-float"
  }, /*#__PURE__*/React.createElement("img", {
    src: "daily_challenge_hero.jpg",
    className: "w-full h-full object-cover",
    alt: "Reto Diario"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-t from-brand-900/40 to-transparent"
  })), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-4xl font-bold text-brand-900 mb-6 uppercase tracking-tight"
  }, "Reto Diario IAdapta"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-brand-600 mb-6 leading-relaxed"
  }, "Completa los 3 ejercicios de hoy para mantener tu racha. Hoy es ", /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-brand-900 underline decoration-accent-coral decoration-4 underline-offset-4"
  }, new Intl.DateTimeFormat('es-ES', {
    weekday: 'long'
  }).format(new Date())), ", la dificultad es de ", /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-brand-900"
  }, difficultyFactor, "/7"), "."), /*#__PURE__*/React.createElement("div", {
    className: "mb-8 flex justify-center"
  }, !linkedEmail ? /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsCalendarOpen(true),
    className: "px-6 py-3.5 bg-brand-50 hover:bg-brand-100 text-brand-900 border border-brand-200 rounded-2xl font-bold text-sm shadow-sm transition-all hover:scale-102 active:scale-98 flex items-center gap-2.5 group"
  }, /*#__PURE__*/React.createElement(Icons.User, {
    className: "w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform"
  }), /*#__PURE__*/React.createElement("span", null, "Iniciar sesi\xF3n / Registrarse")) : /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-2.5 shadow-sm anim-scale-in"
  }, /*#__PURE__*/React.createElement(Icons.CheckCircle, {
    className: "w-5 h-5 text-emerald-600"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-bold text-emerald-800"
  }, "Sesi\xF3n iniciada: ", /*#__PURE__*/React.createElement("span", {
    className: "underline decoration-emerald-500/30"
  }, linkedEmail)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsCalendarOpen(true),
    className: "ml-3 px-3 py-1 bg-white hover:bg-brand-50 text-brand-900 border border-brand-100 rounded-lg text-xs font-bold transition-all"
  }, "Gestionar"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-4 mb-10"
  }, dailyGames.map((g, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "bg-brand-50 p-4 rounded-2xl border border-brand-100"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-brand-400 font-bold uppercase mb-1"
  }, "Juego ", i + 1), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-bold text-brand-900"
  }, g === 'math' ? 'Cálculo' : g === 'order' ? 'Orden' : g === 'visual' ? 'Agudeza' : g === 'memory' ? 'Memoria' : g === 'wordsearch' ? 'Rastreo' : g === 'intruder' ? 'Intruso' : g === 'wordbuilder' ? 'Palabras' : g === 'simon' ? 'Secuencia' : 'Juego')))), /*#__PURE__*/React.createElement("button", {
    onClick: startChallenge,
    className: "w-full sm:w-auto px-12 py-5 bg-brand-900 text-white rounded-2xl font-bold text-2xl hover:bg-brand-800 shadow-xl transition-all hover:scale-105 active:scale-95 btn-pulse"
  }, "Empezar Desaf\xEDo")) : step >= 1 && step <= 3 ? /*#__PURE__*/React.createElement("div", {
    className: "w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-lg mx-auto mb-6 flex justify-between items-center px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, [1, 2, 3].map(s => /*#__PURE__*/React.createElement("div", {
    key: s,
    className: `w-3 h-3 rounded-full ${step >= s ? 'bg-brand-900' : 'bg-brand-200'}`
  }))), /*#__PURE__*/React.createElement("span", {
    className: "text-brand-400 font-bold text-xs uppercase tracking-widest"
  }, "Paso ", step, " de 3")), renderCurrentGame(dailyGames[step - 1], () => {
    if (step < 3) setStep(step + 1);else completeChallenge();
  })) : /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] p-12 shadow-2xl border border-brand-100 text-center anim-scale-in max-w-2xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-7xl mb-6"
  }, "\uD83C\uDFC6\u2728"), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-4xl font-bold text-brand-900 mb-2"
  }, "\xA1Reto Completado!"), /*#__PURE__*/React.createElement("p", {
    className: "text-emerald-600 font-bold mb-4 uppercase tracking-widest"
  }, "D\xEDa superado con \xE9xito"), /*#__PURE__*/React.createElement(StarRating, {
    stars: stars
  }), streak >= 7 && /*#__PURE__*/React.createElement("div", {
    className: "bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mb-8 anim-scale-in"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-amber-600 font-bold text-xl mb-1"
  }, streak >= 30 ? '¡MAESTRO DE LA MENTE! 👑' : streak >= 20 ? '¡HÁBITO DE ACERO! 💪' : '¡SEMANA PERFECTA! ⭐'), /*#__PURE__*/React.createElement("p", {
    className: "text-amber-800 italic"
  }, streak >= 30 ? 'Has alcanzado los 30 días. ¡Tu agudeza mental está en otro nivel!' : streak >= 20 ? 'Casi un mes de constancia. Estás transformando tu cerebro día a día.' : 'Una semana completa de entrenamiento. ¡Tu constancia es admirable!')), /*#__PURE__*/React.createElement("div", {
    onClick: () => setIsCalendarOpen(true),
    className: "bg-brand-50 rounded-2xl p-4 mb-8 inline-flex items-center gap-3 border border-brand-100 cursor-pointer hover:opacity-85 transition-opacity",
    title: "Ver calendario de racha"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 bg-accent-coral text-white rounded-xl flex items-center justify-center text-2xl shadow-lg animate-bounce"
  }, /*#__PURE__*/React.createElement(Icons.Flame, null)), /*#__PURE__*/React.createElement("div", {
    className: "text-left"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-bold text-brand-400 uppercase leading-none mb-1 flex items-center gap-1"
  }, "Tu racha actual", /*#__PURE__*/React.createElement(Icons.Calendar, {
    className: "w-3 h-3 text-brand-400"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-brand-900"
  }, streak, " d\xEDas seguidos"))), streak >= 3 && !hasPromptedNotif && !localStorage.getItem('daily_challenge_notifications_enabled') && /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-50 border border-brand-100 rounded-3xl p-6 mb-8 text-left anim-scale-in max-w-xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 bg-white border border-brand-100 rounded-2xl flex items-center justify-center text-brand-900 text-2xl flex-shrink-0 shadow-sm animate-pulse"
  }, "\uD83D\uDD14"), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-display font-bold text-lg text-brand-900 mb-1"
  }, "\xA1Mant\xE9n tu racha de ", streak, " d\xEDas! \uD83C\uDFC6"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-brand-600 mb-4 leading-relaxed"
  }, "Llevas una constancia estupenda. \xBFQuieres recibir un aviso discreto en este dispositivo si se te olvida entrenar alg\xFAn d\xEDa?"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: enableNotifications,
    className: "px-4 py-2 bg-brand-900 text-white rounded-xl font-bold text-xs hover:bg-brand-800 transition-all cursor-pointer"
  }, "S\xED, avisarme"), /*#__PURE__*/React.createElement("button", {
    onClick: declineNotifications,
    className: "px-4 py-2 bg-white border border-brand-200 text-brand-700 rounded-xl font-bold text-xs hover:bg-brand-50 transition-all cursor-pointer"
  }, "No, gracias"))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4 mb-10"
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setIsCalendarOpen(true),
    className: "bg-brand-50 p-6 rounded-3xl border border-brand-100 cursor-pointer hover:bg-brand-100/55 transition-colors",
    title: "Ver calendario de racha"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-brand-400 text-xs font-bold uppercase mb-1 flex items-center justify-center gap-1"
  }, "Racha Actual", /*#__PURE__*/React.createElement(Icons.Calendar, {
    className: "w-3 h-3 text-brand-400"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-4xl font-bold text-brand-900 flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Flame, {
    className: "text-accent-coral"
  }), " ", streak)), /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-50 p-6 rounded-3xl border border-brand-100"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-brand-400 text-xs font-bold uppercase mb-1"
  }, "Tiempo Total"), /*#__PURE__*/React.createElement("p", {
    className: "text-4xl font-bold text-brand-900"
  }, totalTime, "s"))), /*#__PURE__*/React.createElement(ShareButtons, {
    game: "Reto Diario IAdapta",
    score: `${streak} días de racha imparable`,
    time: totalTime
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row gap-4 justify-center mt-12"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigateTo('cognitive'),
    className: "px-10 py-4 bg-brand-100 text-brand-700 rounded-xl font-bold hover:bg-brand-200 transition-all"
  }, "Volver al Gimnasio"), /*#__PURE__*/React.createElement("button", {
    onClick: () => window.location.reload(),
    className: "px-10 py-4 bg-brand-900 text-white rounded-xl font-bold hover:bg-brand-800 shadow-lg transition-all"
  }, "Cerrar"))), /*#__PURE__*/React.createElement(StreakCalendarModal, {
    isOpen: isCalendarOpen,
    onClose: () => setIsCalendarOpen(false),
    history: challengeHistory
  })));
};

// --- SECTION VISUAL GAME ---

const SectionVisualGame = function SectionVisualGame({
  isStandalone,
  navigateTo
}) {
  const {
    useState,
    useEffect,
    useCallback,
    useMemo
  } = React;
  const [gameStarted, setGameStarted] = useState(false);
  const [levelIdx, setLevelIdx] = useState(0);
  const [round, setRound] = useState(0);
  const [grid, setGrid] = useState([]);
  const [targetIdx, setTargetIdx] = useState(-1);
  const [correctIdx, setCorrectIdx] = useState(null);
  const [currentTarget, setCurrentTarget] = useState('');
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won'
  const [startTime, setStartTime] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [stars, setStars] = useState(0);
  const currentLevel = VISUAL_LEVELS[levelIdx];
  const initRound = useCallback(forcedIdx => {
    const idx = forcedIdx !== undefined ? forcedIdx : levelIdx;
    const level = VISUAL_LEVELS[idx];
    const total = level.size * level.size;
    const tIdx = Math.floor(Math.random() * total);

    // Dynamic target selection to avoid mismatch and add variety
    const pairs = [['A', 'V'], ['Q', 'O'], ['E', 'F'], ['M', 'N'], ['O', 'D'], ['W', 'M'], ['C', 'G'], ['S', '5'], ['B', '8'], ['Z', '2'], ['D', '0'], ['P', 'R'], ['K', 'X'], ['U', 'V'], ['T', 'Y']];
    // Use level default or pick random from pool for variety
    const pair = idx < pairs.length ? pairs[idx] : pairs[Math.floor(Math.random() * pairs.length)];
    const [target, base] = pair;
    const g = Array(total).fill(base);
    g[tIdx] = target;
    setGrid(g);
    setTargetIdx(tIdx);
    setCorrectIdx(null);
    setCurrentTarget(target);
  }, [levelIdx]);
  const startGame = idx => {
    setLevelIdx(idx);
    setRound(0);
    setGameStarted(true);
    setGameStatus('playing');
    setStartTime(Date.now());
    initRound(idx);
  };
  const handleCellClick = idx => {
    if (gameStatus !== 'playing' || correctIdx !== null) return;
    if (idx === targetIdx) {
      setCorrectIdx(idx);
      setTimeout(() => {
        if (round < currentLevel.rounds - 1) {
          setRound(prev => prev + 1);
          initRound();
        } else {
          const time = (Date.now() - startTime) / 1000;
          setFinalTime(time.toFixed(1));
          setGameStatus('won');

          // Star logic
          const baseTime = currentLevel.rounds * 3.5;
          let s = 3;
          if (time < baseTime * 0.6) s = 5;else if (time < baseTime * 0.9) s = 4;else if (time > baseTime * 1.5) s = 2;
          setStars(s);
          if (window.confetti) window.confetti({
            particleCount: 150,
            spread: 70,
            origin: {
              y: 0.6
            }
          });
        }
      }, 400); // 400ms feedback delay
    }
  };
  const nextLevel = () => {
    if (levelIdx < VISUAL_LEVELS.length - 1) {
      startGame(levelIdx + 1);
    } else {
      setGameStarted(false);
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    className: `pt-36 pb-20 px-4 min-h-screen bg-brand-50 flex flex-col items-center ${isStandalone ? 'pt-36' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl w-full"
  }, !gameStarted ? /*#__PURE__*/React.createElement("div", {
    className: "max-w-2xl mx-auto text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-start mb-8"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigateTo('cognitive'),
    className: "inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors bg-white px-5 py-2.5 rounded-xl shadow-sm border border-brand-100 group"
  }, /*#__PURE__*/React.createElement(Icons.ArrowLeft, {
    className: "w-5 h-5 group-hover:-translate-x-1 transition-transform"
  }), /*#__PURE__*/React.createElement("span", null, "Volver"))), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-4xl font-bold text-brand-900 mb-8"
  }, "Agudeza Visual"), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] border border-brand-100 shadow-2xl p-10 anim-scale-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl mb-6"
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-brand-900 mb-6"
  }, "Selecciona la dificultad"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-4"
  }, VISUAL_LEVELS.map((lvl, idx) => /*#__PURE__*/React.createElement("button", {
    key: lvl.id,
    onClick: () => startGame(idx),
    className: "group p-6 rounded-2xl border-2 border-brand-50 hover:border-brand-500 hover:bg-brand-50 transition-all flex flex-col items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-brand-900 font-bold text-xl"
  }, lvl.name), /*#__PURE__*/React.createElement("span", {
    className: "text-brand-500 text-sm font-medium"
  }, "Cuadr\xEDcula ", lvl.size, "x", lvl.size)))))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GameHeader, {
    title: "Agudeza Visual",
    subtitle: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "bg-brand-900 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest"
    }, "Nivel ", currentLevel.id), /*#__PURE__*/React.createElement("span", {
      className: "text-brand-600 font-bold uppercase tracking-widest"
    }, "Ronda ", round + 1, " de ", currentLevel.rounds)),
    onBack: () => navigateTo('cognitive'),
    onRestart: () => startGame(levelIdx),
    onLevels: () => setGameStarted(false),
    isStandalone: isStandalone
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center gap-8"
  }, gameStatus === 'playing' ? /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-2 sm:p-4 rounded-3xl shadow-2xl border-4 sm:border-8 border-brand-100 w-full max-w-[500px]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-4 sm:mb-6 text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-brand-600 font-bold mb-1 sm:mb-2 uppercase tracking-widest text-xs sm:text-sm"
  }, "Busca el car\xE1cter diferente:"), /*#__PURE__*/React.createElement("span", {
    className: "text-accent-coral text-3xl sm:text-4xl font-bold"
  }, currentTarget)), /*#__PURE__*/React.createElement("div", {
    className: `grid ${currentLevel.size > 10 ? 'gap-0.5 sm:gap-1' : 'gap-1.5 sm:gap-2'}`,
    style: {
      gridTemplateColumns: `repeat(${currentLevel.size}, 1fr)`
    }
  }, grid.map((l, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => handleCellClick(i),
    className: `aspect-square rounded-md sm:rounded-lg flex items-center justify-center font-bold transition-all duration-200
                              ${currentLevel.size > 10 ? 'text-[10px] sm:text-sm' : currentLevel.size > 8 ? 'text-xs sm:text-base' : 'text-lg sm:text-xl'}
                              ${correctIdx === i ? 'bg-emerald-500 text-white scale-110 z-10' : 'bg-brand-50 text-brand-700 hover:bg-brand-200 active:scale-90'}`
  }, l)))) : /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] p-10 shadow-2xl border border-brand-100 text-center anim-scale-in max-w-lg w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-7xl mb-6"
  }, "\uD83D\uDD0D\u2728"), /*#__PURE__*/React.createElement("h3", {
    className: "text-3xl font-bold text-brand-900 mb-2"
  }, "\xA1Vista de Lince!"), /*#__PURE__*/React.createElement(StarRating, {
    stars: stars
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-gray-600 mb-6"
  }, "Has completado el nivel en ", /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-brand-700"
  }, finalTime, "s"), "."), /*#__PURE__*/React.createElement(ShareButtons, {
    game: "Agudeza Visual",
    time: finalTime
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row gap-4 justify-center mt-10"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setGameStarted(false),
    className: "px-8 py-3 bg-brand-100 text-brand-700 font-bold rounded-xl hover:bg-brand-200 transition-all"
  }, "Cambiar Nivel"), /*#__PURE__*/React.createElement("button", {
    onClick: nextLevel,
    className: "px-8 py-3 bg-brand-900 text-white font-bold rounded-xl hover:bg-brand-800 shadow-lg transition-all btn-pulse"
  }, levelIdx < VISUAL_LEVELS.length - 1 ? 'Siguiente Nivel' : 'Volver al Inicio')))))));
};

// --- SECTION INTRUDER GAME ---

const SectionIntruderGame = function SectionIntruderGame({
  isStandalone,
  navigateTo
}) {
  const {
    useState,
    useEffect,
    useCallback,
    useMemo
  } = React;
  const [gameStarted, setGameStarted] = useState(false);
  const [levelIdx, setLevelIdx] = useState(0);
  const [round, setRound] = useState(0);
  const [items, setItems] = useState([]);
  const [targetIdx, setTargetIdx] = useState(-1);
  const [correctIdx, setCorrectIdx] = useState(null);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won'
  const [startTime, setStartTime] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [stars, setStars] = useState(0);
  const currentLevel = INTRUDER_LEVELS[levelIdx];
  const initRound = useCallback(() => {
    const cat = INTRUDER_CATEGORIES[Math.floor(Math.random() * INTRUDER_CATEGORIES.length)];
    const pool = [...cat.items].sort(() => Math.random() - 0.5).slice(0, currentLevel.count - 1);
    const intruder = cat.intruders[Math.floor(Math.random() * cat.intruders.length)];
    const finalItems = [...pool, intruder].sort(() => Math.random() - 0.5);
    setItems(finalItems);
    setTargetIdx(finalItems.indexOf(intruder));
    setCorrectIdx(null);
  }, [levelIdx, currentLevel]);
  const startGame = idx => {
    setLevelIdx(idx);
    setRound(0);
    setGameStarted(true);
    setGameStatus('playing');
    setStartTime(Date.now());
  };
  useEffect(() => {
    if (gameStarted && round === 0) initRound();
  }, [gameStarted, levelIdx, initRound]);
  const handleSelect = idx => {
    if (gameStatus !== 'playing' || correctIdx !== null) return;
    if (idx === targetIdx) {
      setCorrectIdx(idx);
      setTimeout(() => {
        if (round < currentLevel.rounds - 1) {
          setRound(prev => prev + 1);
          initRound();
        } else {
          const time = (Date.now() - startTime) / 1000;
          setFinalTime(time.toFixed(1));
          setGameStatus('won');
          const baseTime = currentLevel.rounds * 3;
          let s = 3;
          if (time < baseTime * 0.7) s = 5;else if (time < baseTime * 1.0) s = 4;else if (time > baseTime * 1.6) s = 2;
          setStars(s);
          if (window.confetti) window.confetti({
            particleCount: 150,
            spread: 70,
            origin: {
              y: 0.6
            }
          });
        }
      }, 600);
    }
  };
  const nextLevel = () => {
    if (levelIdx < INTRUDER_LEVELS.length - 1) {
      startGame(levelIdx + 1);
    } else {
      setGameStarted(false);
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    className: `pt-36 pb-20 px-4 min-h-screen bg-brand-50 flex flex-col items-center ${isStandalone ? 'pt-36' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl w-full"
  }, !gameStarted ? /*#__PURE__*/React.createElement("div", {
    className: "max-w-2xl mx-auto text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-start mb-8"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigateTo('cognitive'),
    className: "inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors bg-white px-5 py-2.5 rounded-xl shadow-sm border border-brand-100 group"
  }, /*#__PURE__*/React.createElement(Icons.ArrowLeft, {
    className: "w-5 h-5 group-hover:-translate-x-1 transition-transform"
  }), /*#__PURE__*/React.createElement("span", null, "Volver"))), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-4xl font-bold text-brand-900 mb-8"
  }, "El Intruso"), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] border border-brand-100 shadow-2xl p-10 anim-scale-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl mb-6"
  }, "\uD83D\uDD75\uFE0F\u200D\u2642\uFE0F"), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-brand-900 mb-6"
  }, "Selecciona la dificultad"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-4"
  }, INTRUDER_LEVELS.map((lvl, idx) => /*#__PURE__*/React.createElement("button", {
    key: lvl.id,
    onClick: () => startGame(idx),
    className: "group p-6 rounded-2xl border-2 border-brand-50 hover:border-brand-500 hover:bg-brand-50 transition-all flex flex-col items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-brand-900 font-bold text-xl"
  }, lvl.name), /*#__PURE__*/React.createElement("span", {
    className: "text-brand-500 text-sm font-medium"
  }, lvl.count, " elementos - ", lvl.rounds, " rondas")))))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GameHeader, {
    title: "El Intruso",
    subtitle: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "bg-rose-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest"
    }, "Nivel ", currentLevel.id), /*#__PURE__*/React.createElement("span", {
      className: "text-brand-600 font-bold uppercase tracking-widest"
    }, "Ronda ", round + 1, " de ", currentLevel.rounds)),
    onBack: () => navigateTo('cognitive'),
    onRestart: () => startGame(levelIdx),
    onLevels: () => setGameStarted(false),
    isStandalone: isStandalone
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center gap-8"
  }, gameStatus === 'playing' ? /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] p-10 shadow-2xl border-8 border-brand-100 anim-scale-in max-w-2xl w-full text-center"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-brand-900 mb-8"
  }, "\xBFCu\xE1l es el intruso?"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
  }, items.map((item, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => handleSelect(i),
    className: `aspect-square flex items-center justify-center text-6xl rounded-[2rem] transition-all duration-300
                              ${correctIdx === i ? 'bg-emerald-500 text-white scale-110 shadow-xl rotate-6' : 'bg-brand-50 hover:bg-brand-100 border-4 border-brand-100 hover:border-brand-300 hover:-translate-y-1'}`
  }, item)))) : /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] p-12 shadow-2xl border border-brand-100 text-center anim-scale-in max-w-xl w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-7xl mb-6"
  }, "\uD83C\uDF96\uFE0F"), /*#__PURE__*/React.createElement("h3", {
    className: "text-4xl font-bold text-brand-900 mb-2"
  }, "\xA1Nivel Completado!"), /*#__PURE__*/React.createElement("p", {
    className: "text-brand-500 font-bold uppercase tracking-widest mb-8"
  }, currentLevel.name), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center gap-4 mb-8"
  }, [1, 2, 3, 4, 5].map(s => /*#__PURE__*/React.createElement(Icons.Star, {
    key: s,
    className: `w-10 h-10 ${s <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-50 p-8 rounded-3xl mb-8"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-brand-400 text-sm font-bold uppercase mb-2"
  }, "Tiempo Total"), /*#__PURE__*/React.createElement("p", {
    className: "text-5xl font-bold text-brand-900"
  }, finalTime, "s")), /*#__PURE__*/React.createElement(ShareButtons, {
    game: "El Intruso",
    time: finalTime
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3 mt-8"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: nextLevel,
    className: "w-full py-5 bg-brand-900 text-white rounded-2xl font-bold text-xl hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/20"
  }, levelIdx < INTRUDER_LEVELS.length - 1 ? 'Siguiente Nivel' : 'Finalizar'), /*#__PURE__*/React.createElement("button", {
    onClick: () => setGameStarted(false),
    className: "w-full py-4 text-brand-600 font-bold hover:bg-brand-50 rounded-xl transition-all"
  }, "Cambiar Dificultad")))))));
};

// --- SECTION SUDOKU GAME ---
const SectionSudokuGame = function SectionSudokuGame({
  isStandalone,
  navigateTo
}) {
  const {
    useState,
    useEffect,
    useCallback,
    useMemo
  } = React;
  const LEVELS = useMemo(() => [{
    id: 1,
    name: 'Básico',
    clues: 49,
    desc: 'Ideal para empezar y mantener activa la mente'
  }, {
    id: 2,
    name: 'Intermedio',
    clues: 36,
    desc: 'Un reto moderado para tu capacidad lógica'
  }, {
    id: 3,
    name: 'Avanzado',
    clues: 27,
    desc: 'Para expertos en concentración y razonamiento'
  }], []);
  const [gameStarted, setGameStarted] = useState(false);
  const [levelIdx, setLevelIdx] = useState(0);
  const [board, setBoard] = useState(Array(9).fill(null).map(() => Array(9).fill(0)));
  const [initialBoard, setInitialBoard] = useState(Array(9).fill(null).map(() => Array(9).fill(false)));
  const [solution, setSolution] = useState(Array(9).fill(null).map(() => Array(9).fill(0)));
  const [selectedCell, setSelectedCell] = useState(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showConflicts, setShowConflicts] = useState(true);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'finished'
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [stars, setStars] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [hasSave, setHasSave] = useState(false);

  // Check if a saved game exists on mount
  useEffect(() => {
    const saved = localStorage.getItem('iadapta_sudoku_save');
    if (saved) {
      setHasSave(true);
    }
  }, []);

  // Timer Interval
  useEffect(() => {
    if (!gameStarted || gameStatus !== 'playing') return;
    const interval = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameStarted, gameStatus]);

  // Autosave on state changes
  useEffect(() => {
    if (gameStarted && gameStatus === 'playing') {
      const saveState = {
        levelIdx,
        board,
        initialBoard,
        solution,
        hintsUsed,
        secondsElapsed
      };
      localStorage.setItem('iadapta_sudoku_save', JSON.stringify(saveState));
    }
  }, [gameStarted, gameStatus, levelIdx, board, initialBoard, solution, hintsUsed, secondsElapsed]);

  // Clear save on game finished
  useEffect(() => {
    if (gameStatus === 'finished') {
      localStorage.removeItem('iadapta_sudoku_save');
      setHasSave(false);
    }
  }, [gameStatus]);
  const loadSavedGame = useCallback(() => {
    const saved = localStorage.getItem('iadapta_sudoku_save');
    if (!saved) return;
    try {
      const {
        levelIdx: savedLevelIdx,
        board: savedBoard,
        initialBoard: savedInitialBoard,
        solution: savedSolution,
        hintsUsed: savedHintsUsed,
        secondsElapsed: savedSecondsElapsed
      } = JSON.parse(saved);
      setLevelIdx(savedLevelIdx);
      setBoard(savedBoard);
      setInitialBoard(savedInitialBoard);
      setSolution(savedSolution);
      setHintsUsed(savedHintsUsed);
      setSecondsElapsed(savedSecondsElapsed);
      setGameStatus('playing');
      setFeedbackMessage(null);
      setGameStarted(true);
      setHasSave(false);
    } catch (e) {
      console.error("Failed to load saved Sudoku game", e);
      localStorage.removeItem('iadapta_sudoku_save');
      setHasSave(false);
    }
  }, []);
  const generateSudoku = useCallback(difficultyIdx => {
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
    const sol = grid.map(row => [...row]);
    const visibleClues = LEVELS[difficultyIdx].clues;
    const hideCount = 81 - visibleClues;
    const indices = Array.from({
      length: 81
    }, (_, i) => i);
    indices.sort(() => Math.random() - 0.5);
    const initB = Array(9).fill(null).map(() => Array(9).fill(true));
    const currB = grid.map(row => [...row]);
    for (let i = 0; i < hideCount; i++) {
      const idx = indices[i];
      const r = Math.floor(idx / 9);
      const c = idx % 9;
      currB[r][c] = 0;
      initB[r][c] = false;
    }
    setBoard(currB);
    setInitialBoard(initB);
    setSolution(sol);
    setSelectedCell(null);
    setHintsUsed(0);
    setGameStatus('playing');
    setSecondsElapsed(0);
    setFeedbackMessage(null);
  }, [LEVELS]);
  const startGame = idx => {
    setLevelIdx(idx);
    setGameStarted(true);
    generateSudoku(idx);
  };
  const checkConflicts = useCallback((r, c, val) => {
    if (val === 0) return false;
    for (let i = 0; i < 9; i++) {
      if (i !== c && board[r][i] === val) return true;
      if (i !== r && board[i][c] === val) return true;
    }
    const bR = Math.floor(r / 3) * 3;
    const bC = Math.floor(c / 3) * 3;
    for (let i = bR; i < bR + 3; i++) {
      for (let j = bC; j < bC + 3; j++) {
        if ((i !== r || j !== c) && board[i][j] === val) return true;
      }
    }
    return false;
  }, [board]);
  const completedRows = useMemo(() => {
    const completed = [];
    for (let r = 0; r < 9; r++) {
      let correct = true;
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0 || board[r][c] !== solution[r][c]) {
          correct = false;
          break;
        }
      }
      if (correct) completed.push(r);
    }
    return completed;
  }, [board, solution]);
  const completedCols = useMemo(() => {
    const completed = [];
    for (let c = 0; c < 9; c++) {
      let correct = true;
      for (let r = 0; r < 9; r++) {
        if (board[r][c] === 0 || board[r][c] !== solution[r][c]) {
          correct = false;
          break;
        }
      }
      if (correct) completed.push(c);
    }
    return completed;
  }, [board, solution]);
  const completedBlocks = useMemo(() => {
    const completed = [];
    for (let b = 0; b < 9; b++) {
      const br = Math.floor(b / 3) * 3;
      const bc = b % 3 * 3;
      let correct = true;
      for (let r = br; r < br + 3; r++) {
        for (let c = bc; c < bc + 3; c++) {
          if (board[r][c] === 0 || board[r][c] !== solution[r][c]) {
            correct = false;
            break;
          }
        }
        if (!correct) break;
      }
      if (correct) completed.push(b);
    }
    return completed;
  }, [board, solution]);
  const inputDigit = useCallback(digit => {
    if (gameStatus !== 'playing' || !selectedCell) return;
    const {
      r,
      c
    } = selectedCell;
    if (initialBoard[r][c]) return;
    const newBoard = board.map((row, ri) => row.map((val, ci) => ri === r && ci === c ? digit : val));
    setBoard(newBoard);
    setFeedbackMessage(null);
    let complete = true;
    let correct = true;
    for (let ri = 0; ri < 9; ri++) {
      for (let ci = 0; ci < 9; ci++) {
        if (newBoard[ri][ci] === 0) {
          complete = false;
        } else if (newBoard[ri][ci] !== solution[ri][ci]) {
          correct = false;
        }
      }
    }
    if (complete && correct) {
      const time = secondsElapsed;
      setFinalTime(time);
      setGameStatus('finished');
      let s = 3;
      if (levelIdx === 0) {
        if (time < 180) s = 5;else if (time < 300) s = 4;else if (time > 480) s = 2;
      } else if (levelIdx === 1) {
        if (time < 300) s = 5;else if (time < 600) s = 4;else if (time > 900) s = 2;
      } else {
        if (time < 600) s = 5;else if (time < 1000) s = 4;else if (time > 1500) s = 2;
      }
      s = Math.max(2, s - Math.floor(hintsUsed / 2));
      setStars(s);
      if (window.confetti) window.confetti({
        particleCount: 150,
        spread: 80,
        origin: {
          y: 0.6
        }
      });
    }
  }, [board, selectedCell, initialBoard, solution, gameStatus, secondsElapsed, levelIdx, hintsUsed]);
  useEffect(() => {
    const handleKeyDown = e => {
      if (!gameStarted || gameStatus !== 'playing' || !selectedCell) return;
      const {
        r,
        c
      } = selectedCell;
      if (initialBoard[r][c]) return;
      if (e.key >= '1' && e.key <= '9') {
        inputDigit(parseInt(e.key));
      } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
        inputDigit(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, gameStatus, selectedCell, initialBoard, inputDigit]);
  const handleCellClick = (r, c) => {
    setSelectedCell({
      r,
      c
    });
  };
  const handleHint = () => {
    if (gameStatus !== 'playing' || !selectedCell || hintsUsed >= 3) return;
    const {
      r,
      c
    } = selectedCell;
    if (initialBoard[r][c]) {
      setFeedbackMessage({
        type: 'info',
        text: 'Esta celda ya está fijada desde el inicio.'
      });
      return;
    }
    const correctVal = solution[r][c];
    setHintsUsed(prev => prev + 1);
    const newBoard = board.map((row, ri) => row.map((val, ci) => ri === r && ci === c ? correctVal : val));
    setBoard(newBoard);
    let complete = true;
    let correct = true;
    for (let ri = 0; ri < 9; ri++) {
      for (let ci = 0; ci < 9; ci++) {
        if (newBoard[ri][ci] === 0) {
          complete = false;
        } else if (newBoard[ri][ci] !== solution[ri][ci]) {
          correct = false;
        }
      }
    }
    if (complete && correct) {
      const time = secondsElapsed;
      setFinalTime(time);
      setGameStatus('finished');
      let s = Math.max(2, 4 - Math.floor((hintsUsed + 1) / 2));
      setStars(s);
      if (window.confetti) window.confetti({
        particleCount: 150,
        spread: 80,
        origin: {
          y: 0.6
        }
      });
    }
  };
  const handleVerify = () => {
    if (gameStatus !== 'playing') return;
    let hasErrors = false;
    let isComplete = true;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0) {
          isComplete = false;
        } else if (board[r][c] !== solution[r][c]) {
          hasErrors = true;
        }
      }
    }
    if (!isComplete) {
      if (hasErrors) {
        setFeedbackMessage({
          type: 'error',
          text: 'Hay números incorrectos y celdas vacías en el tablero.'
        });
      } else {
        setFeedbackMessage({
          type: 'info',
          text: 'Todo lo que has completado hasta ahora está correcto. ¡Sigue así!'
        });
      }
    } else {
      if (hasErrors) {
        setFeedbackMessage({
          type: 'error',
          text: 'El Sudoku está completo pero contiene errores. Revisa las celdas marcadas.'
        });
      }
    }
  };
  const handleResetBoard = () => {
    if (window.confirm('¿Deseas vaciar todos tus números y reiniciar el Sudoku?')) {
      const resetB = board.map((row, ri) => row.map((val, ci) => initialBoard[ri][ci] ? val : 0));
      setBoard(resetB);
      setSelectedCell(null);
      setFeedbackMessage(null);
    }
  };
  const nextLevel = () => {
    if (levelIdx < LEVELS.length - 1) {
      startGame(levelIdx + 1);
    } else {
      setGameStarted(false);
    }
  };
  const activeValue = selectedCell ? board[selectedCell.r][selectedCell.c] : null;
  return /*#__PURE__*/React.createElement("section", {
    className: `pt-36 pb-20 px-4 min-h-screen bg-brand-50 flex flex-col items-center ${isStandalone ? 'pt-36' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl w-full"
  }, !gameStarted ? /*#__PURE__*/React.createElement("div", {
    className: "max-w-2xl mx-auto text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-start mb-8"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigateTo('cognitive'),
    className: "inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors bg-white px-5 py-2.5 rounded-xl shadow-sm border border-brand-100 group"
  }, /*#__PURE__*/React.createElement(Icons.ArrowLeft, {
    className: "w-5 h-5 group-hover:-translate-x-1 transition-transform"
  }), /*#__PURE__*/React.createElement("span", null, "Volver"))), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-4xl font-bold text-brand-900 mb-8 text-center"
  }, "Sudoku"), hasSave ? /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] border border-brand-100 shadow-2xl p-10 anim-scale-in text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl mb-6"
  }, "\uD83D\uDCBE"), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-brand-900 mb-2"
  }, "Partida en Curso"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 mb-8 max-w-md mx-auto text-sm leading-relaxed"
  }, "Tienes una partida de Sudoku guardada. \xBFDeseas continuar jugando o empezar una nueva desde el principio?"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: loadSavedGame,
    className: "flex-1 py-4 px-6 bg-brand-900 text-white font-bold rounded-2xl hover:bg-brand-850 shadow-md hover:shadow-xl active:scale-95 transition-all uppercase tracking-wider text-sm"
  }, "Continuar Partida"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (window.confirm('¿Seguro que deseas empezar una nueva partida? Esto borrará tu progreso guardado.')) {
        localStorage.removeItem('iadapta_sudoku_save');
        setHasSave(false);
      }
    },
    className: "py-4 px-6 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-2xl active:scale-95 transition-all uppercase tracking-wider text-sm border border-gray-200"
  }, "Nueva Partida"))) : /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] border border-brand-100 shadow-2xl p-10 anim-scale-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl mb-6"
  }, "\uD83E\uDDE9"), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-brand-900 mb-6"
  }, "Selecciona la dificultad"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 gap-3"
  }, LEVELS.map((level, idx) => /*#__PURE__*/React.createElement("button", {
    key: level.id,
    onClick: () => startGame(idx),
    className: "group p-5 rounded-2xl border-2 border-brand-50 hover:border-brand-500 hover:bg-brand-50 transition-all flex items-center justify-between px-8 animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-left"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-brand-900 font-bold text-xl block"
  }, level.name), /*#__PURE__*/React.createElement("span", {
    className: "text-brand-500 text-sm font-medium"
  }, level.desc)), /*#__PURE__*/React.createElement(Icons.ArrowRight, {
    className: "text-brand-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all"
  })))))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GameHeader, {
    title: "Sudoku",
    subtitle: /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap items-center gap-3 justify-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "bg-brand-900 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest"
    }, "Nivel ", levelIdx + 1), /*#__PURE__*/React.createElement("span", {
      className: "text-brand-600 font-bold uppercase tracking-widest"
    }, LEVELS[levelIdx].name), /*#__PURE__*/React.createElement("span", {
      className: "bg-brand-50 text-brand-700 border border-brand-200 px-3 py-1 rounded-full text-sm font-bold tabular-nums"
    }, "\u23F1\uFE0F ", Math.floor(secondsElapsed / 60), ":", (secondsElapsed % 60).toString().padStart(2, '0'))),
    onBack: () => navigateTo('cognitive'),
    onRestart: () => generateSudoku(levelIdx),
    onLevels: () => setGameStarted(false),
    isStandalone: isStandalone
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-4 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-3xl p-6 border border-brand-100 shadow-xl text-left"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-brand-900 text-lg mb-3 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCA1"), " \xBFC\xF3mo jugar?"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 text-sm leading-relaxed mb-4"
  }, "Completa la cuadr\xEDcula de modo que cada fila, columna y recuadro de 3x3 contenga los n\xFAmeros del 1 al 9 sin repetirse."), /*#__PURE__*/React.createElement("ul", {
    className: "text-gray-500 text-xs space-y-2 list-disc pl-4 leading-normal"
  }, /*#__PURE__*/React.createElement("li", null, "Selecciona una celda en el tablero."), /*#__PURE__*/React.createElement("li", null, "Pulsa un n\xFAmero del teclado num\xE9rico o usa tu teclado f\xEDsico."), /*#__PURE__*/React.createElement("li", null, "Los n\xFAmeros iniciales son oscuros y no se pueden cambiar."), /*#__PURE__*/React.createElement("li", null, "Los n\xFAmeros incorrectos o duplicados se destacar\xE1n autom\xE1ticamente en color rojo.")))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-8 flex flex-col items-center"
  }, gameStatus === 'playing' ? /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-[458px] flex flex-col items-center space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-brand-900 border-4 border-brand-900 rounded-[2rem] shadow-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-[4px] bg-brand-900"
  }, Array.from({
    length: 9
  }).map((_, b) => {
    const blockRow = Math.floor(b / 3);
    const blockCol = b % 3;
    return /*#__PURE__*/React.createElement("div", {
      key: b,
      className: "grid grid-cols-3 gap-[1px] bg-brand-300"
    }, Array.from({
      length: 9
    }).map((_, i) => {
      const r = blockRow * 3 + Math.floor(i / 3);
      const c = blockCol * 3 + i % 3;
      const val = board[r][c];
      const isInitial = initialBoard[r][c];
      const isSelected = selectedCell && selectedCell.r === r && selectedCell.c === c;
      const isSameRowOrCol = selectedCell && (selectedCell.r === r || selectedCell.c === c || Math.floor(selectedCell.r / 3) === Math.floor(r / 3) && Math.floor(selectedCell.c / 3) === Math.floor(c / 3));
      const isSameValue = activeValue && val !== 0 && activeValue === val;
      const isConflict = showConflicts && !isInitial && checkConflicts(r, c, val);
      const blockIndex = b;
      const isPartOfCompletedGroup = completedRows.includes(r) || completedCols.includes(c) || completedBlocks.includes(blockIndex);
      let cellBg = 'bg-white';
      if (isSelected) cellBg = 'bg-accent-coral/20 ring-4 ring-accent-coral/50 ring-inset relative z-10';else if (isPartOfCompletedGroup) cellBg = 'bg-emerald-100/80';else if (isSameValue) cellBg = 'bg-amber-100';else if (isSameRowOrCol) cellBg = 'bg-sky-50/60';else if (isInitial) cellBg = 'bg-gray-50';
      if (isConflict) cellBg = 'bg-red-50';
      let cellText = isInitial ? 'text-brand-900 font-extrabold' : 'text-sky-700 font-bold';
      if (isPartOfCompletedGroup) cellText = isInitial ? 'text-emerald-950 font-extrabold' : 'text-emerald-700 font-black';
      if (isConflict) cellText = 'text-red-500 font-black';
      return /*#__PURE__*/React.createElement("button", {
        key: `${r}-${c}`,
        onClick: () => handleCellClick(r, c),
        className: `aspect-square w-full flex items-center justify-center text-xl sm:text-2xl transition-all focus:outline-none select-none ${cellBg} ${cellText}`
      }, val !== 0 ? val : '');
    }));
  }))), feedbackMessage && /*#__PURE__*/React.createElement("div", {
    className: `w-full p-4 rounded-2xl text-sm font-bold border ${feedbackMessage.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : feedbackMessage.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-blue-50 border-blue-200 text-blue-700'}`
  }, feedbackMessage.text), /*#__PURE__*/React.createElement("div", {
    className: "w-full space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center px-2 text-xs font-bold text-brand-400"
  }, /*#__PURE__*/React.createElement("span", null, "Pistas: ", hintsUsed, " / 3"), /*#__PURE__*/React.createElement("span", null, "Pulsa para introducir n\xFAmero")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-5 gap-2.5"
  }, [1, 2, 3, 4, 5].map(num => /*#__PURE__*/React.createElement("button", {
    key: num,
    onClick: () => inputDigit(num),
    className: "h-14 sm:h-16 bg-white hover:bg-brand-50 border-2 border-brand-100 rounded-2xl flex items-center justify-center font-black text-xl sm:text-2xl text-brand-900 shadow-md active:scale-95 transition-all"
  }, num))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-5 gap-2.5"
  }, [6, 7, 8, 9].map(num => /*#__PURE__*/React.createElement("button", {
    key: num,
    onClick: () => inputDigit(num),
    className: "h-14 sm:h-16 bg-white hover:bg-brand-50 border-2 border-brand-100 rounded-2xl flex items-center justify-center font-black text-xl sm:text-2xl text-brand-900 shadow-md active:scale-95 transition-all"
  }, num)), /*#__PURE__*/React.createElement("button", {
    onClick: () => inputDigit(0),
    className: "h-14 sm:h-16 bg-brand-50 hover:bg-brand-100 border-2 border-brand-100 rounded-2xl flex items-center justify-center font-bold text-xs sm:text-sm text-brand-700 shadow-md active:scale-95 transition-all uppercase",
    title: "Borrar n\xFAmero de la celda seleccionada"
  }, "Borrar")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2.5 pt-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleVerify,
    className: "py-3.5 bg-brand-900 text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-brand-850 active:scale-95 shadow-md transition-all uppercase"
  }, "Comprobar"), /*#__PURE__*/React.createElement("button", {
    onClick: handleHint,
    disabled: hintsUsed >= 3 || !selectedCell,
    className: "py-3.5 bg-amber-500 text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-amber-600 active:scale-95 shadow-md transition-all disabled:opacity-50 uppercase",
    title: "Revelar n\xFAmero de la celda seleccionada"
  }, "Pista"), /*#__PURE__*/React.createElement("button", {
    onClick: handleResetBoard,
    className: "py-3.5 bg-gray-100 text-gray-500 rounded-xl font-bold text-xs sm:text-sm hover:bg-gray-200 active:scale-95 border border-gray-200 transition-all uppercase"
  }, "Reiniciar")))) : /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] p-12 shadow-2xl border border-brand-100 text-center anim-scale-in max-w-xl w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-7xl mb-6"
  }, "\uD83C\uDF96\uFE0F"), /*#__PURE__*/React.createElement("h3", {
    className: "text-4xl font-bold text-brand-900 mb-2"
  }, "\xA1Sudoku Completado!"), /*#__PURE__*/React.createElement("p", {
    className: "text-brand-500 font-bold uppercase tracking-widest mb-8"
  }, LEVELS[levelIdx].name), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center gap-4 mb-8"
  }, [1, 2, 3, 4, 5].map(s => /*#__PURE__*/React.createElement(Icons.Star, {
    key: s,
    className: `w-10 h-10 ${s <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-50 p-8 rounded-3xl mb-8 flex justify-around"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-brand-400 text-sm font-bold uppercase mb-2"
  }, "Tiempo"), /*#__PURE__*/React.createElement("p", {
    className: "text-4xl font-bold text-brand-900"
  }, finalTime, "s")), /*#__PURE__*/React.createElement("div", {
    className: "border-l border-brand-200 h-16 my-auto"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-brand-400 text-sm font-bold uppercase mb-2"
  }, "Pistas"), /*#__PURE__*/React.createElement("p", {
    className: "text-4xl font-bold text-brand-900"
  }, hintsUsed, "/3"))), /*#__PURE__*/React.createElement(ShareButtons, {
    game: "Sudoku",
    time: finalTime
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3 mt-8"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: nextLevel,
    className: "w-full py-5 bg-brand-900 text-white rounded-2xl font-bold text-xl hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/20"
  }, levelIdx < LEVELS.length - 1 ? 'Siguiente Nivel' : 'Finalizar'), /*#__PURE__*/React.createElement("button", {
    onClick: () => setGameStarted(false),
    className: "w-full py-4 text-brand-600 font-bold hover:bg-brand-50 rounded-xl transition-all"
  }, "Cambiar Dificultad"))))))));
};

// --- SECTION WORD BUILDER GAME (FORMAR PALABRAS / PALABRAS DESORDENADAS) ---
const WORDBUILDER_LEVELS = [{
  id: 1,
  name: 'Muy Fácil',
  desc: 'Palabras cortas (3 - 4 letras)',
  rounds: 5,
  pool: ['AGUA', 'CAMA', 'SOFA', 'MESA', 'ROPA', 'PAN', 'VASO', 'PIE', 'MANO', 'LUZ', 'SOL', 'SOPA', 'TAZA', 'PATO', 'LUNA', 'CASA', 'BOCA', 'BOTE', 'COLA', 'LOCO', 'ALTO', 'ROCA', 'CARO', 'ARCO', 'SINO', 'ROSA', 'RATO', 'OTRA', 'ROTA', 'LIMA', 'MIRA', 'AMOR', 'ROMA', 'RAMO', 'MORA', 'PELO', 'NUBE', 'LAGO', 'RICO', 'VIDA', 'VINO', 'NIDO']
}, {
  id: 2,
  name: 'Fácil',
  desc: 'Palabras cotidianas (5 letras)',
  rounds: 5,
  pool: ['DUCHA', 'PLATO', 'RADIO', 'RELOJ', 'LIBRO', 'SALUD', 'SUEÑO', 'GAFAS', 'FRUTA', 'AYUDA', 'PASO', 'PLAYA', 'SILLA', 'ARBOL', 'JABON', 'BARCO', 'COBRA', 'CLAVE', 'VERBA', 'CORTO', 'MARCO', 'PADRE', 'PARED', 'TABLA', 'PALTA', 'RATON', 'FORMA', 'CARTA', 'CERRO', 'COSTA', 'DULCE', 'MUNDO', 'CAMPO', 'VERDE', 'NOCHE', 'QUESO', 'CALOR', 'SUELO', 'SABOR']
}, {
  id: 3,
  name: 'Medio',
  desc: 'Palabras medianas (6 letras)',
  rounds: 5,
  pool: ['COCINA', 'VESTIR', 'PASEAR', 'LLAVES', 'TIEMPO', 'JARDIN', 'MUSICA', 'AFECTO', 'RECETA', 'CAMINO', 'ABUELO', 'COMIDA', 'LAPIZ', 'MADRE', 'MADERA', 'CIUDAD', 'CUARTO', 'PUERTA', 'CAMISA', 'MAQUINA', 'CENTRO', 'CORRER', 'CANTAR', 'SALTAR', 'AMIGO', 'REGALO', 'FLORES', 'VERANO', 'MEDICO', 'ABUELA', 'JUEGOS', 'FUTBOL', 'SONIDO', 'DIBUJO', 'CUENTO', 'DIARIO']
}, {
  id: 4,
  name: 'Difícil',
  desc: 'Palabras complejas (7 - 8 letras)',
  rounds: 6,
  pool: ['CUIDADOR', 'ZAPATOS', 'PASILLO', 'ESPEJO', 'PASTILLA', 'TARJETA', 'DESCANSO', 'MEMORIA', 'FAMILIA', 'VENTANA', 'CUADERNO', 'HOSPITAL', 'FAMILIAR', 'PACIENTE', 'GIMNASIO', 'PANTALLA', 'LINTERNA', 'HISTORIA', 'CANCION', 'DESAYUNO', 'CUIDADOS', 'APOYO', 'BIENESTAR', 'ABRAZOS', 'SONRISA', 'SALUDABLE', 'CARTERA', 'RECUERDO']
}, {
  id: 5,
  name: 'Experto',
  desc: 'Desafío léxico (9+ letras)',
  rounds: 6,
  pool: ['CAMINADOR', 'TELEFONO', 'ALIMENTOS', 'MOVILIDAD', 'EJERCICIO', 'AUTONOMIA', 'BIENESTAR', 'MEDICACION', 'ACTIVIDADES', 'REHABILITACION', 'TERAPEUTA', 'ACCESIBILIDAD', 'ESTIMULACION', 'CONCENTRACION', 'PREVENCION', 'INDEPENDENCIA', 'HERRAMIENTAS', 'COMPAÑEROS', 'TRANQUILIDAD', 'COMUNICACION', 'ESPECIALISTA', 'ORGANIZACION', 'APRENDIZAJE', 'SATISFACCION', 'CONVIVENCIA']
}];

// Diccionario completo de palabras reales en español para todos los niveles
const REAL_SPANISH_DICTIONARY = new Set([
// 3 y 4 letras
'AGUA', 'CAMA', 'MACA', 'SOFA', 'FOSA', 'POSA', 'MESA', 'SEMA', 'ROPA', 'PARO', 'PROA', 'RAPO', 'ARPO', 'PAN', 'VASO', 'PIE', 'MANO', 'MONA', 'NOMA', 'LUZ', 'SOL', 'SOPA', 'PASO', 'TAZA', 'PATO', 'TAPO', 'TOPA', 'OPTA', 'POTA', 'APTO', 'LUNA', 'NULA', 'CASA', 'SACA', 'COLA', 'LOCO', 'ALTO', 'TOLA', 'ROCA', 'CARO', 'ARCO', 'ORCA', 'CORA', 'BOCA', 'CABO', 'BOTE', 'BETO', 'SINO', 'ROSA', 'ORAS', 'AROS', 'SORA', 'RASO', 'RATO', 'TROA', 'OTRA', 'ROTA', 'TARO', 'LIMA', 'MILA', 'MIRA', 'AMOR', 'ROMA', 'RAMO', 'MORA', 'ARMO', 'RANO', 'ORNA', 'PELO', 'NUBE', 'LAGO', 'RICO', 'VIDA', 'VINO', 'NIDO', 'FUEGO',
// 5 letras
'DUCHA', 'PLATO', 'PALTO', 'RADIO', 'ARDO', 'DARIO', 'RELOJ', 'LIBRO', 'SALUD', 'SUEÑO', 'SUENO', 'GAFAS', 'FRUTA', 'TRUFA', 'AYUDA', 'PASO', 'POSA', 'SOPA', 'PLAYA', 'SILLA', 'ARBOL', 'BALOR', 'JABON', 'BAJON', 'BARCO', 'COBRA', 'CLAVE', 'VERBA', 'CORTO', 'TROCO', 'MARCO', 'PADRE', 'PARED', 'TABLA', 'PALTA', 'RATON', 'TRANO', 'FORMA', 'CARTA', 'CATAR', 'CERRO', 'CORRE', 'COSTA', 'TACO', 'DULCE', 'MUNDO', 'CAMPO', 'VERDE', 'NOCHE', 'QUESO', 'CALOR', 'SUELO', 'SABOR',
// 6 letras
'COCINA', 'VESTIR', 'SERVIR', 'PASEAR', 'ARAPES', 'LLAVES', 'TIEMPO', 'JARDIN', 'MUSICA', 'AFECTO', 'RECETA', 'CARETO', 'COTREA', 'CAMINO', 'COMANI', 'ABUELO', 'COMIDA', 'LAPIZ', 'MADRE', 'MADERA', 'CIUDAD', 'CUARTO', 'PUERTA', 'CAMISA', 'MAQUINA', 'CENTRO', 'CORRER', 'CANTAR', 'SALTAR', 'AMIGO', 'REGALO', 'FLORES', 'VERANO', 'MEDICO', 'ABUELA', 'JUEGOS', 'FUTBOL', 'SONIDO', 'DIBUJO', 'CUENTO', 'DIARIO',
// 7-8 letras
'CUIDADOR', 'ZAPATOS', 'PASILLO', 'ESPEJO', 'PASTILLA', 'TARJETA', 'DESCANSO', 'CONDENAS', 'MEMORIA', 'FAMILIA', 'VENTANA', 'CUADERNO', 'HOSPITAL', 'FAMILIAR', 'PACIENTE', 'GIMNASIO', 'PANTALLA', 'LINTERNA', 'HISTORIA', 'CANCION', 'DESAYUNO', 'CUIDADOS', 'APOYO', 'BIENESTAR', 'ABRAZOS', 'SONRISA', 'SALUDABLE', 'CARTERA', 'RECUERDO',
// 9+ letras
'CAMINADOR', 'TELEFONO', 'ALIMENTOS', 'MOVILIDAD', 'EJERCICIO', 'AUTONOMIA', 'BIENESTAR', 'MEDICACION', 'ACTIVIDADES', 'REHABILITACION', 'TERAPEUTA', 'ACCESIBILIDAD', 'ESTIMULACION', 'CONCENTRACION', 'PREVENCION', 'INDEPENDENCIA', 'HERRAMIENTAS', 'COMPAÑEROS', 'TRANQUILIDAD', 'COMUNICACION', 'ESPECIALISTA', 'ORGANIZACION', 'APRENDIZAJE', 'SATISFACCION', 'CONVIVENCIA']);

// Helper para verificar palabras válidas (exclusivamente palabras reales en español)
const isWordValidAnagram = (formedStr, targetWord) => {
  if (!formedStr || !targetWord) return false;
  const normalize = str => str.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normFormed = normalize(formedStr);
  const normTarget = normalize(targetWord);

  // 1. Coincidencia directa con la palabra objetivo
  if (normFormed === normTarget) return true;
  const sortedFormed = normFormed.split('').sort().join('');
  const sortedTarget = normTarget.split('').sort().join('');

  // 2. Comprobar que usa exactamente las mismas letras
  if (sortedFormed !== sortedTarget) return false;

  // 3. Buscar exclusivamente en el diccionario de palabras reales en español
  return REAL_SPANISH_DICTIONARY.has(normFormed);
};
const SectionWordBuilderGame = function SectionWordBuilderGame({
  isStandalone,
  navigateTo
}) {
  const {
    useState,
    useEffect,
    useCallback,
    useMemo
  } = React;
  const [gameStarted, setGameStarted] = useState(false);
  const [levelIdx, setLevelIdx] = useState(0);
  const [round, setRound] = useState(0);
  const [targetWord, setTargetWord] = useState('');
  const [scrambled, setScrambled] = useState([]);
  const [userWord, setUserWord] = useState([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing');
  const [roundWords, setRoundWords] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [stars, setStars] = useState(0);
  const [isError, setIsError] = useState(false);
  const currentLevel = WORDBUILDER_LEVELS[levelIdx];
  const shuffleLetters = word => {
    const letters = word.split('');
    let shuffled = [...letters];
    let attempts = 0;
    while (shuffled.join('') === word && attempts < 10) {
      shuffled.sort(() => Math.random() - 0.5);
      attempts++;
    }
    return shuffled.map((char, index) => ({
      id: index,
      char,
      used: false
    }));
  };
  const initRound = useCallback(word => {
    setTargetWord(word);
    setScrambled(shuffleLetters(word));
    setUserWord([]);
    setHintsUsed(0);
    setIsError(false);
  }, []);
  const startGame = idx => {
    setLevelIdx(idx);
    const levelData = WORDBUILDER_LEVELS[idx];
    const pool = [...levelData.pool].sort(() => Math.random() - 0.5);
    const selected = pool.slice(0, levelData.rounds);
    setRoundWords(selected);
    setRound(0);
    setGameStarted(true);
    setGameStatus('playing');
    setStartTime(Date.now());
    initRound(selected[0]);
  };
  const handleSelectScrambled = tile => {
    if (tile.used || gameStatus !== 'playing') return;
    const newUserWord = [...userWord, tile];
    setUserWord(newUserWord);
    const newScrambled = scrambled.map(t => t.id === tile.id ? {
      ...t,
      used: true
    } : t);
    setScrambled(newScrambled);
    if (newUserWord.length === targetWord.length) {
      const formedStr = newUserWord.map(t => t.char).join('');
      if (isWordValidAnagram(formedStr, targetWord)) {
        if (round < currentLevel.rounds - 1) {
          setGameStatus('round_complete');
          setTimeout(() => {
            const nextR = round + 1;
            setRound(nextR);
            setGameStatus('playing');
            initRound(roundWords[nextR]);
          }, 700);
        } else {
          const timeTaken = (Date.now() - startTime) / 1000;
          setFinalTime(timeTaken.toFixed(1));
          setGameStatus('won');
          const baseTime = currentLevel.rounds * 8;
          let s = 3;
          if (timeTaken < baseTime * 0.6) s = 5;else if (timeTaken < baseTime * 0.9) s = 4;else if (timeTaken > baseTime * 1.5) s = 2;
          setStars(s);
          if (window.confetti) window.confetti({
            particleCount: 150,
            spread: 70,
            origin: {
              y: 0.6
            }
          });
        }
      } else {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
          setUserWord([]);
          setScrambled(newScrambled.map(t => ({
            ...t,
            used: false
          })));
        }, 650);
      }
    }
  };
  const handleRemoveUserLetter = indexToRemove => {
    if (gameStatus !== 'playing') return;
    const tileToRemove = userWord[indexToRemove];
    if (!tileToRemove) return;
    setUserWord(userWord.filter((_, idx) => idx !== indexToRemove));
    setScrambled(scrambled.map(t => t.id === tileToRemove.id ? {
      ...t,
      used: false
    } : t));
    setIsError(false);
  };
  const handleClear = () => {
    if (gameStatus !== 'playing') return;
    setUserWord([]);
    setScrambled(scrambled.map(t => ({
      ...t,
      used: false
    })));
    setIsError(false);
  };
  const handleHint = () => {
    if (gameStatus !== 'playing') return;
    const currentLen = userWord.length;
    if (currentLen >= targetWord.length) return;
    const nextNeededChar = targetWord[currentLen];
    const matchingTile = scrambled.find(t => !t.used && t.char === nextNeededChar);
    if (matchingTile) {
      handleSelectScrambled(matchingTile);
      setHintsUsed(prev => prev + 1);
    }
  };
  const nextLevel = () => {
    if (levelIdx < WORDBUILDER_LEVELS.length - 1) {
      startGame(levelIdx + 1);
    } else {
      setGameStarted(false);
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    className: `pt-36 pb-20 px-4 min-h-screen bg-brand-50 flex flex-col items-center ${isStandalone ? 'pt-36' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl w-full"
  }, !gameStarted ? /*#__PURE__*/React.createElement("div", {
    className: "max-w-2xl mx-auto text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-start mb-8"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigateTo('cognitive'),
    className: "inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors bg-white px-5 py-2.5 rounded-xl shadow-sm border border-brand-100 group"
  }, /*#__PURE__*/React.createElement(Icons.ArrowLeft, {
    className: "w-5 h-5 group-hover:-translate-x-1 transition-transform"
  }), /*#__PURE__*/React.createElement("span", null, "Volver"))), /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-4xl font-bold text-brand-900 mb-8"
  }, "Formar Palabras"), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] border border-brand-100 shadow-2xl p-10 anim-scale-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl mb-6"
  }, "\uD83D\uDD24"), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-brand-900 mb-2"
  }, "Selecciona la dificultad"), /*#__PURE__*/React.createElement("p", {
    className: "text-brand-500 font-medium text-sm mb-6"
  }, "Ordena las letras desordenadas para descubrir la palabra secreta"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-4"
  }, WORDBUILDER_LEVELS.map((lvl, idx) => /*#__PURE__*/React.createElement("button", {
    key: lvl.id,
    onClick: () => startGame(idx),
    className: "group p-6 rounded-2xl border-2 border-brand-50 hover:border-brand-500 hover:bg-brand-50 transition-all flex flex-col items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-brand-900 font-bold text-xl"
  }, lvl.name), /*#__PURE__*/React.createElement("span", {
    className: "text-brand-500 text-sm font-medium"
  }, lvl.desc)))))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GameHeader, {
    title: "Formar Palabras",
    subtitle: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "bg-brand-900 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest"
    }, currentLevel.name), /*#__PURE__*/React.createElement("span", {
      className: "text-brand-600 font-bold uppercase tracking-widest"
    }, "Palabra ", round + 1, " de ", currentLevel.rounds)),
    onBack: () => navigateTo('cognitive'),
    onRestart: () => startGame(levelIdx),
    onLevels: () => setGameStarted(false),
    isStandalone: isStandalone
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center gap-8"
  }, gameStatus !== 'won' ? /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-2xl border border-brand-100 w-full max-w-2xl text-center relative anim-scale-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-8"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block bg-teal-50 text-teal-800 font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-2"
  }, "Agilidad L\xE9xica y Memoria Sem\xE1ntica"), /*#__PURE__*/React.createElement("p", {
    className: "text-brand-600 font-medium text-sm"
  }, "Toca las letras en el orden correcto para formar la palabra:")), /*#__PURE__*/React.createElement("div", {
    className: `flex flex-nowrap justify-center gap-1.5 sm:gap-2.5 mb-10 min-h-[70px] items-center p-3 sm:p-5 rounded-3xl w-full max-w-full overflow-x-auto transition-all duration-300 ${isError ? 'bg-red-50 ring-4 ring-red-300' : gameStatus === 'round_complete' ? 'bg-emerald-50 ring-4 ring-emerald-300' : 'bg-brand-50/70 border-2 border-dashed border-brand-200'}`
  }, Array.from({
    length: targetWord.length
  }).map((_, idx) => {
    const tile = userWord[idx];
    const fontSizeClass = targetWord.length > 10 ? 'text-sm sm:text-xl' : targetWord.length > 7 ? 'text-base sm:text-2xl' : 'text-xl sm:text-3xl';
    return /*#__PURE__*/React.createElement("button", {
      key: idx,
      onClick: () => handleRemoveUserLetter(idx),
      disabled: !tile || gameStatus !== 'playing',
      className: `flex-1 shrink min-w-0 max-w-[56px] aspect-[4/5] h-auto rounded-xl sm:rounded-2xl flex items-center justify-center font-display font-bold shadow-md transition-all duration-300 ${fontSizeClass}
                                ${tile ? isError ? 'bg-red-500 text-white scale-105 shadow-red-500/30' : gameStatus === 'round_complete' ? 'bg-emerald-500 text-white scale-105 shadow-emerald-500/30' : 'bg-brand-900 text-white hover:bg-brand-800 active:scale-95 cursor-pointer shadow-brand-900/20' : 'bg-white border-2 border-dashed border-brand-200 text-transparent pointer-events-none'}`,
      title: tile ? 'Toca para quitar esta letra' : ''
    }, tile ? tile.char : '');
  })), gameStatus === 'round_complete' && /*#__PURE__*/React.createElement("div", {
    className: "mb-6 py-2 px-6 bg-emerald-500 text-white rounded-full font-bold text-lg inline-flex items-center gap-2 anim-scale-in shadow-lg shadow-emerald-500/20"
  }, /*#__PURE__*/React.createElement("span", null, "\xA1Correcto!"), " \u2728"), /*#__PURE__*/React.createElement("div", {
    className: "mb-10"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-bold text-brand-400 uppercase tracking-widest mb-4"
  }, "Letras disponibles:"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap justify-center gap-2 sm:gap-3"
  }, scrambled.map(tile => /*#__PURE__*/React.createElement("button", {
    key: tile.id,
    onClick: () => handleSelectScrambled(tile),
    disabled: tile.used || gameStatus !== 'playing',
    className: `w-12 h-14 sm:w-14 sm:h-16 rounded-2xl flex items-center justify-center font-display text-2xl sm:text-3xl font-bold transition-all duration-200 shadow-md
                                ${tile.used ? 'bg-gray-100 text-gray-300 border border-gray-200 shadow-none opacity-40 pointer-events-none scale-90' : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-300 hover:scale-105 active:scale-95 cursor-pointer shadow-amber-200/50'}`
  }, tile.char)))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap justify-center gap-3 pt-6 border-t border-brand-100"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleHint,
    disabled: gameStatus !== 'playing' || userWord.length >= targetWord.length,
    className: "px-5 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center gap-2 disabled:opacity-40",
    title: "Revelar la siguiente letra de la palabra"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCA1 Pista")), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleRemoveUserLetter(userWord.length - 1),
    disabled: gameStatus !== 'playing' || userWord.length === 0,
    className: "px-5 py-3 bg-brand-100 hover:bg-brand-200 text-brand-800 font-bold rounded-xl text-sm transition-all flex items-center gap-2 disabled:opacity-40"
  }, /*#__PURE__*/React.createElement("span", null, "\u232B Borrar")), /*#__PURE__*/React.createElement("button", {
    onClick: handleClear,
    disabled: gameStatus !== 'playing' || userWord.length === 0,
    className: "px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-xl text-sm transition-all border border-gray-200 disabled:opacity-40"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDD04 Limpiar")))) : /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] p-10 shadow-2xl border border-brand-100 text-center anim-scale-in max-w-lg w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-7xl mb-6"
  }, "\uD83D\uDD24\u2728"), /*#__PURE__*/React.createElement("h3", {
    className: "text-3xl font-bold text-brand-900 mb-2"
  }, "\xA1Palabras Completadas!"), /*#__PURE__*/React.createElement(StarRating, {
    stars: stars
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-gray-600 mb-6"
  }, "Has completado el nivel en ", /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-brand-700"
  }, finalTime, "s"), "."), /*#__PURE__*/React.createElement(ShareButtons, {
    game: "Formar Palabras",
    time: finalTime
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row gap-4 justify-center mt-10"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setGameStarted(false),
    className: "px-8 py-3 bg-brand-100 text-brand-700 font-bold rounded-xl hover:bg-brand-200 transition-all"
  }, "Cambiar Nivel"), /*#__PURE__*/React.createElement("button", {
    onClick: nextLevel,
    className: "px-8 py-3 bg-brand-900 text-white font-bold rounded-xl hover:bg-brand-800 shadow-lg transition-all btn-pulse"
  }, levelIdx < WORDBUILDER_LEVELS.length - 1 ? 'Siguiente Nivel' : 'Volver al Inicio')))))));
};

// --- SECTION SIMON GAME (SECUENCIA DE COLORES) ---
const SIMON_LEVELS = [{
  id: 1,
  name: 'Fácil',
  desc: 'Secuencia pausada (hasta 7 pasos)',
  speed: 750,
  targetRounds: 7,
  isInfinite: false
}, {
  id: 2,
  name: 'Medio',
  desc: 'Velocidad estándar (hasta 10 pasos)',
  speed: 500,
  targetRounds: 10,
  isInfinite: false
}, {
  id: 3,
  name: 'Difícil',
  desc: 'Secuencia rápida (hasta 14 pasos)',
  speed: 350,
  targetRounds: 14,
  isInfinite: false
}, {
  id: 4,
  name: 'Infinito ♾️',
  desc: '¡Sin límite de pasos! Aumenta velocidad',
  speed: 650,
  targetRounds: Infinity,
  isInfinite: true
}];
const SIMON_PADS = [{
  id: 0,
  name: 'Rojo',
  color: 'rose',
  bgNormal: 'bg-rose-500 hover:bg-rose-600 active:bg-rose-400 border-rose-600',
  bgActive: 'bg-rose-300 ring-8 ring-rose-200 scale-105 shadow-[0_0_35px_rgba(244,63,94,0.8)] z-10',
  freq: 261.63
}, {
  id: 1,
  name: 'Verde',
  color: 'emerald',
  bgNormal: 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-400 border-emerald-600',
  bgActive: 'bg-emerald-300 ring-8 ring-emerald-200 scale-105 shadow-[0_0_35px_rgba(16,185,129,0.8)] z-10',
  freq: 329.63
}, {
  id: 2,
  name: 'Azul',
  color: 'sky',
  bgNormal: 'bg-sky-500 hover:bg-sky-600 active:bg-sky-400 border-sky-600',
  bgActive: 'bg-sky-300 ring-8 ring-sky-200 scale-105 shadow-[0_0_35px_rgba(14,165,233,0.8)] z-10',
  freq: 392.00
}, {
  id: 3,
  name: 'Amarillo',
  color: 'amber',
  bgNormal: 'bg-amber-400 hover:bg-amber-500 active:bg-amber-300 border-amber-500',
  bgActive: 'bg-amber-200 ring-8 ring-amber-100 scale-105 shadow-[0_0_35px_rgba(251,191,36,0.8)] z-10',
  freq: 523.25
}];
const playSimonTone = (freq, duration = 350, type = 'normal') => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    if (type === 'error') {
      [130.81, 123.47].forEach(f => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.45);
      });
      return;
    }
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);
    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(0.25, now + 0.015);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + duration / 1000);
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now);
    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.linearRampToValueAtTime(0.08, now + 0.015);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.7 / 1000);
    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(ctx.destination);
    gain2.connect(ctx.destination);
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration / 1000);
    osc2.stop(now + duration / 1000);
  } catch (e) {}
};
const SectionSimonGame = function SectionSimonGame({
  isStandalone,
  navigateTo
}) {
  const {
    useState,
    useEffect,
    useCallback
  } = React;
  const [gameStarted, setGameStarted] = useState(false);
  const [levelIdx, setLevelIdx] = useState(0);
  const [sequence, setSequence] = useState([]);
  const [userIndex, setUserIndex] = useState(0);
  const [activePad, setActivePad] = useState(null);
  const [isSimonTurn, setIsSimonTurn] = useState(false);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [roundCount, setRoundCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [stars, setStars] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const currentLevel = SIMON_LEVELS[levelIdx];
  const getCurrentSpeed = useCallback(stepCount => {
    if (!currentLevel.isInfinite) return currentLevel.speed;
    if (stepCount <= 4) return 650;
    if (stepCount <= 8) return 500;
    if (stepCount <= 12) return 400;
    if (stepCount <= 16) return 320;
    return 240;
  }, [currentLevel]);
  const playPadAnimation = useCallback((padId, speed) => {
    setActivePad(padId);
    playSimonTone(SIMON_PADS[padId].freq, speed * 0.7);
    setTimeout(() => {
      setActivePad(null);
    }, speed * 0.7);
  }, []);
  const playSequence = useCallback((seq, speed) => {
    setIsSimonTurn(true);
    setActivePad(null);
    seq.forEach((padId, index) => {
      setTimeout(() => {
        playPadAnimation(padId, speed);
        if (index === seq.length - 1) {
          setTimeout(() => {
            setIsSimonTurn(false);
          }, speed);
        }
      }, (index + 1) * speed * 1.2);
    });
  }, [playPadAnimation]);
  const startNextRound = useCallback(currentSeq => {
    const nextPad = Math.floor(Math.random() * 4);
    const newSeq = [...currentSeq, nextPad];
    setSequence(newSeq);
    setUserIndex(0);
    setRoundCount(newSeq.length);
    const currentSpeed = getCurrentSpeed(newSeq.length);
    playSequence(newSeq, currentSpeed);
  }, [getCurrentSpeed, playSequence]);
  const startGame = idx => {
    setLevelIdx(idx);
    setGameStarted(true);
    setGameStatus('playing');
    setIsNewRecord(false);
    setStartTime(Date.now());
    const initialPad = Math.floor(Math.random() * 4);
    const initialSeq = [initialPad];
    setSequence(initialSeq);
    setUserIndex(0);
    setRoundCount(1);
    const speed = SIMON_LEVELS[idx].isInfinite ? 650 : SIMON_LEVELS[idx].speed;
    playSequence(initialSeq, speed);
  };
  const handlePadClick = padId => {
    if (isSimonTurn || gameStatus !== 'playing') return;
    const currentSpeed = getCurrentSpeed(sequence.length);
    playPadAnimation(padId, currentSpeed);
    if (padId === sequence[userIndex]) {
      if (userIndex + 1 === sequence.length) {
        if (!currentLevel.isInfinite && sequence.length >= currentLevel.targetRounds) {
          const timeTaken = (Date.now() - startTime) / 1000;
          setFinalTime(timeTaken.toFixed(1));
          setGameStatus('won');
          setStars(levelIdx === 0 ? 3 : levelIdx === 1 ? 4 : 5);
          if (window.confetti) window.confetti({
            particleCount: 150,
            spread: 70,
            origin: {
              y: 0.6
            }
          });
        } else {
          setIsSimonTurn(true);
          setTimeout(() => {
            startNextRound(sequence);
          }, 700);
        }
      } else {
        setUserIndex(prev => prev + 1);
      }
    } else {
      const timeTaken = (Date.now() - startTime) / 1000;
      setFinalTime(timeTaken.toFixed(1));
      setGameStatus('lost');
      playSimonTone(150, 450, 'error');
      if (currentLevel.isInfinite) {
        const stepsCompleted = sequence.length - 1;
        const prevRecord = parseInt(localStorage.getItem('simon_infinite_record') || '0', 10);
        if (stepsCompleted > prevRecord) {
          localStorage.setItem('simon_infinite_record', stepsCompleted.toString());
          setIsNewRecord(true);
          if (window.confetti) window.confetti({
            particleCount: 150,
            spread: 70,
            origin: {
              y: 0.6
            }
          });
        } else {
          setIsNewRecord(false);
        }
        let s = 3;
        if (stepsCompleted >= 15) s = 5;else if (stepsCompleted >= 10) s = 4;else if (stepsCompleted < 5) s = 2;
        setStars(s);
      }
    }
  };
  const nextLevel = () => {
    if (levelIdx < SIMON_LEVELS.length - 1) {
      startGame(levelIdx + 1);
    } else {
      startGame(0);
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    className: `pt-36 pb-20 px-4 min-h-screen bg-brand-50 flex flex-col items-center ${isStandalone ? 'pt-36' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-start mb-8"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigateTo('cognitive'),
    className: "inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors bg-white px-5 py-2.5 rounded-xl shadow-sm border border-brand-100 group"
  }, /*#__PURE__*/React.createElement(Icons.ArrowLeft, {
    className: "w-5 h-5 group-hover:-translate-x-1 transition-transform"
  }), /*#__PURE__*/React.createElement("span", null, "Volver"))), !gameStarted ? /*#__PURE__*/React.createElement("div", {
    className: "max-w-2xl mx-auto"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "font-display text-4xl font-bold text-brand-900 mb-8 text-center"
  }, "Secuencia de Colores"), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] border border-brand-100 shadow-2xl p-10 anim-scale-in text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl mb-6"
  }, "\uD83D\uDD14"), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold text-brand-900 mb-4"
  }, "Selecciona la dificultad"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mb-8 text-lg"
  }, "Memoriza el patr\xF3n de luces y sonidos y rep\xEDtelo en el mismo orden exacto."), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-4"
  }, SIMON_LEVELS.map((lvl, idx) => /*#__PURE__*/React.createElement("button", {
    key: idx,
    onClick: () => startGame(idx),
    className: `group p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 text-center
                          ${lvl.isInfinite ? 'border-amber-400 bg-amber-50/50 hover:bg-amber-100/60 shadow-md' : 'border-brand-50 hover:border-brand-500 hover:bg-brand-50'}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-brand-900 font-bold text-xl"
  }, lvl.name), /*#__PURE__*/React.createElement("span", {
    className: "text-brand-500 text-xs font-medium"
  }, lvl.desc)))))) : /*#__PURE__*/React.createElement("div", {
    className: "max-w-xl mx-auto w-full"
  }, /*#__PURE__*/React.createElement(GameHeader, {
    title: "Secuencia de Colores",
    subtitle: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "bg-brand-900 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest"
    }, "Nivel: ", currentLevel.name), /*#__PURE__*/React.createElement("span", {
      className: "text-brand-600 font-bold uppercase tracking-widest"
    }, currentLevel.isInfinite ? `Paso ${sequence.length} (Récord: ${localStorage.getItem('simon_infinite_record') || 0})` : `Paso ${sequence.length} de ${currentLevel.targetRounds}`)),
    onBack: () => navigateTo('cognitive'),
    onRestart: () => startGame(levelIdx),
    onLevels: () => setGameStarted(false),
    isStandalone: isStandalone
  }), gameStatus === 'playing' ? /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] border border-brand-100 shadow-2xl p-8 text-center anim-scale-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-8"
  }, isSimonTurn ? /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-3 bg-brand-900 text-white px-6 py-2.5 rounded-full text-sm font-bold animate-pulse shadow-md"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-3 h-3 rounded-full bg-amber-400 animate-ping"
  }), /*#__PURE__*/React.createElement("span", null, "Memoriza la secuencia de colores...")) : /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-3 bg-emerald-500 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md shadow-emerald-500/20"
  }, /*#__PURE__*/React.createElement("span", null, "\xA1Tu turno! Repite la secuencia (", userIndex, "/", sequence.length, ")"))), /*#__PURE__*/React.createElement("div", {
    className: "relative w-64 h-64 sm:w-80 sm:h-80 mx-auto grid grid-cols-2 gap-4 p-4 bg-brand-900 rounded-full shadow-2xl border-8 border-brand-800"
  }, SIMON_PADS.map(pad => {
    const isActive = activePad === pad.id;
    return /*#__PURE__*/React.createElement("button", {
      key: pad.id,
      onClick: () => handlePadClick(pad.id),
      disabled: isSimonTurn,
      className: `relative rounded-3xl transition-all duration-200 border-4 cursor-pointer active:scale-95 disabled:cursor-not-allowed
                              ${isActive ? pad.bgActive : pad.bgNormal}`,
      title: pad.name
    }, /*#__PURE__*/React.createElement("span", {
      className: "sr-only"
    }, pad.name));
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 m-auto w-24 h-24 bg-brand-900 border-4 border-brand-700 rounded-full flex flex-col items-center justify-center shadow-xl z-20 pointer-events-none"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white font-display font-bold text-lg"
  }, roundCount), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-brand-300 uppercase tracking-widest font-bold"
  }, "Pasos")))) : gameStatus === 'won' ? /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] p-10 shadow-2xl border border-brand-100 text-center anim-scale-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl mb-6"
  }, "\uD83C\uDFC6"), /*#__PURE__*/React.createElement("h3", {
    className: "text-3xl font-bold text-brand-900 mb-2"
  }, "\xA1Memoria Prodigiosa!"), /*#__PURE__*/React.createElement("p", {
    className: "text-brand-500 font-bold uppercase tracking-widest mb-6"
  }, "Has superado los ", currentLevel.targetRounds, " pasos en nivel ", currentLevel.name), /*#__PURE__*/React.createElement(StarRating, {
    stars: stars
  }), /*#__PURE__*/React.createElement("div", {
    className: "bg-brand-50 p-6 rounded-2xl mb-8 flex justify-around"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-brand-400 text-xs font-bold uppercase mb-1"
  }, "Tiempo Total"), /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-brand-900"
  }, finalTime, "s")), /*#__PURE__*/React.createElement("div", {
    className: "border-l border-brand-200 h-12 my-auto"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-brand-400 text-xs font-bold uppercase mb-1"
  }, "Secuencia"), /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-brand-900"
  }, sequence.length, " pasos"))), /*#__PURE__*/React.createElement(ShareButtons, {
    game: "Secuencia de Colores",
    time: finalTime
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3 mt-8"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: nextLevel,
    className: "w-full py-4 bg-brand-900 text-white rounded-2xl font-bold text-lg hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/20"
  }, levelIdx < SIMON_LEVELS.length - 1 ? 'Siguiente Dificultad' : 'Volver a Jugar'), /*#__PURE__*/React.createElement("button", {
    onClick: () => setGameStarted(false),
    className: "w-full py-3 text-brand-600 font-bold hover:bg-brand-50 rounded-xl transition-all"
  }, "Cambiar Dificultad"))) : /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-[3rem] p-10 shadow-2xl border border-brand-100 text-center anim-scale-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl mb-6"
  }, currentLevel.isInfinite && isNewRecord ? '🎉🏆' : '💥'), /*#__PURE__*/React.createElement("h3", {
    className: "text-3xl font-bold text-brand-900 mb-2"
  }, currentLevel.isInfinite ? isNewRecord ? '¡NUEVO RÉCORD PERSONAL!' : '¡Excelente Intento!' : '¡Error en la secuencia!'), currentLevel.isInfinite && /*#__PURE__*/React.createElement("div", {
    className: "my-4"
  }, /*#__PURE__*/React.createElement(StarRating, {
    stars: stars
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mb-6"
  }, "Alcanzaste ", /*#__PURE__*/React.createElement("strong", {
    className: "text-brand-900 font-bold"
  }, sequence.length - 1, " pasos consecutivos"), " en esta partida."), currentLevel.isInfinite && /*#__PURE__*/React.createElement("div", {
    className: "bg-amber-50 border border-amber-200 p-6 rounded-2xl mb-8 flex justify-around"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-amber-800 text-xs font-bold uppercase mb-1"
  }, "Pasos Logrados"), /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-amber-900"
  }, sequence.length - 1)), /*#__PURE__*/React.createElement("div", {
    className: "border-l border-amber-300 h-12 my-auto"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-amber-800 text-xs font-bold uppercase mb-1"
  }, "R\xE9cord M\xE1ximo"), /*#__PURE__*/React.createElement("p", {
    className: "text-3xl font-bold text-amber-900"
  }, localStorage.getItem('simon_infinite_record') || 0))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3 mt-8"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => startGame(levelIdx),
    className: "w-full py-4 bg-brand-900 text-white rounded-2xl font-bold text-lg hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/20"
  }, currentLevel.isInfinite ? 'Jugar Modo Infinito de Nuevo' : 'Reintentar'), /*#__PURE__*/React.createElement("button", {
    onClick: () => setGameStarted(false),
    className: "w-full py-3 text-brand-600 font-bold hover:bg-brand-50 rounded-xl transition-all"
  }, "Cambiar Dificultad"))))));
};

// --- APP ---
function App() {
  const {
    useState,
    useEffect,
    useCallback,
    useMemo
  } = React;
  const [currentPage, setCurrentPage] = useState('cognitive');
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
  const syncPageFromUrl = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    let newPage = 'cognitive';
    if (pageParam === 'memory') newPage = 'memory';else if (pageParam === 'order') newPage = 'order';else if (pageParam === 'wordsearch') newPage = 'wordsearch';else if (pageParam === 'math') newPage = 'math';else if (pageParam === 'challenge') newPage = 'challenge';else if (pageParam === 'visual') newPage = 'visual';else if (pageParam === 'intruder') newPage = 'intruder';else if (pageParam === 'sudoku') newPage = 'sudoku';else if (pageParam === 'wordbuilder' || pageParam === 'builder') newPage = 'wordbuilder';else if (pageParam === 'simon') newPage = 'simon';else if (pageParam === 'games') newPage = 'cognitive';
    setCurrentPage(newPage);
    document.title = "IAdapta | Gimnasio Cerebral";
  }, []);
  useEffect(() => {
    syncPageFromUrl();
    window.addEventListener('popstate', syncPageFromUrl);
    return () => window.removeEventListener('popstate', syncPageFromUrl);
  }, [syncPageFromUrl]);
  const navigateTo = useCallback((page, section = null) => {
    const localPages = ['cognitive', 'memory', 'order', 'wordsearch', 'math', 'visual', 'intruder', 'challenge', 'sudoku', 'wordbuilder', 'simon', 'games'];
    if (localPages.includes(page)) {
      const urlPage = page === 'cognitive' || page === 'games' ? 'games' : page;
      window.history.pushState({
        page
      }, '', '?page=' + urlPage);
      setCurrentPage(page === 'games' ? 'cognitive' : page);
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    } else {
      let target = 'index.html';
      if (page === 'resources') target = 'recursos.html';else if (page === 'guides') target = 'guias.html';else if (page === 'cv') target = 'cv.html';else if (page === 'analyzer') target = 'valoracion-estancia.html';
      if (section) {
        target += '?section=' + section;
      }
      window.location.href = target;
    }
  }, []);
  const params = new URLSearchParams(window.location.search);
  const pageParam = params.get('page');
  const isStandalone = isInApp && sessionStorage.getItem('allowWebInApp') !== 'true' || ['memory', 'order', 'wordsearch', 'math', 'visual', 'intruder', 'challenge', 'sudoku', 'wordbuilder', 'simon'].includes(pageParam);
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
  }, "\xBFInstalar IAdapta?"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 leading-tight"
  }, "Acceso r\xE1pido desde tu inicio y juego sin conexi\xF3n.")), /*#__PURE__*/React.createElement("button", {
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
        alert("Nota de sistema:\n\nPara instalar la App:\n1. Toca los 3 puntos (⋮) o compartir en tu navegador.\n2. Elige 'Añadir a pantalla de inicio'.");
        setShowInstaller(false);
      }
    },
    className: "py-3.5 bg-brand-900 text-white rounded-xl font-bold text-sm hover:bg-brand-800 transition-all active:scale-95 shadow-lg shadow-brand-900/20"
  }, "Instalar Ahora"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowInstaller(false),
    className: "py-3.5 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all"
  }, "M\xE1s tarde")))), !isStandalone && /*#__PURE__*/React.createElement(Navbar, {
    currentPage: "cognitive"
  }), /*#__PURE__*/React.createElement("main", {
    id: "main-content"
  }, currentPage === 'cognitive' && /*#__PURE__*/React.createElement(SectionCognitive, {
    isTeaser: true,
    navigateTo: navigateTo,
    isStandalone: isStandalone,
    isPWA: isPWA,
    setShowInstaller: setShowInstaller
  }), currentPage === 'memory' && /*#__PURE__*/React.createElement(SectionCognitive, {
    isTeaser: false,
    navigateTo: navigateTo,
    isStandalone: isStandalone
  }), currentPage === 'order' && /*#__PURE__*/React.createElement(SectionOrderGame, {
    isStandalone: isStandalone,
    navigateTo: navigateTo
  }), currentPage === 'wordsearch' && /*#__PURE__*/React.createElement(SectionWordSearch, {
    isStandalone: isStandalone,
    navigateTo: navigateTo
  }), currentPage === 'math' && /*#__PURE__*/React.createElement(SectionMathGame, {
    isStandalone: isStandalone,
    navigateTo: navigateTo
  }), currentPage === 'visual' && /*#__PURE__*/React.createElement(SectionVisualGame, {
    isStandalone: isStandalone,
    navigateTo: navigateTo
  }), currentPage === 'intruder' && /*#__PURE__*/React.createElement(SectionIntruderGame, {
    isStandalone: isStandalone,
    navigateTo: navigateTo
  }), currentPage === 'sudoku' && /*#__PURE__*/React.createElement(SectionSudokuGame, {
    isStandalone: isStandalone,
    navigateTo: navigateTo
  }), currentPage === 'wordbuilder' && /*#__PURE__*/React.createElement(SectionWordBuilderGame, {
    isStandalone: isStandalone,
    navigateTo: navigateTo
  }), currentPage === 'simon' && /*#__PURE__*/React.createElement(SectionSimonGame, {
    isStandalone: isStandalone,
    navigateTo: navigateTo
  }), currentPage === 'challenge' && /*#__PURE__*/React.createElement(SectionDailyChallenge, {
    isStandalone: isStandalone,
    navigateTo: navigateTo
  })), !isStandalone && /*#__PURE__*/React.createElement(Footer, {
    currentPage: "cognitive"
  }), !isStandalone && /*#__PURE__*/React.createElement(CookieBanner, null));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();