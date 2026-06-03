const { Icons, Navbar, Footer, CookieBanner, AdSenseBlock } = window;

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

    const getEmailHash = async (email) => {
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

    const getPinHash = async (pin) => {
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
      if (localStorage.getItem('daily_challenge_notifications_enabled') === 'true' && 
          'Notification' in window && Notification.permission === 'granted' && 
          'serviceWorker' in navigator) {
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

    const syncCloudProgress = async (onSyncSuccess) => {
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
            const calculateStreak = (historyList) => {
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

            await window.firebaseSetDoc(docRef, updatePayload, { merge: true });
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

            await window.firebaseSetDoc(docRef, insertPayload, { merge: true });
          }
        } catch (err) {
          console.error("Cloud sync failed", err);
        }
      }
    };

    function urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }

    const { useState, useEffect, useCallback, useRef, useMemo } = React;

    // --- ICONS ---
    // --- ICONS ---
    // --- STREAK CALENDAR MODAL ---
    const StreakCalendarModal = function StreakCalendarModal({ isOpen, onClose, history }) {
      const { useState, useMemo } = React;
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

      const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];

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
          list.push({ day: i, dateStr });
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
              const confirmLoad = window.confirm(
                `Ya existe una racha guardada con este correo en la nube (${dbData.streak} días).\n\n¿Quieres DESCARGAR tu progreso anterior de la nube (Aceptar) o SOBRESCRIBIRLO con tu racha actual de ${localStreak} días (Cancelar)?`
              );

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

            await window.firebaseSetDoc(docRef, linkPayload, { merge: true });

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
              }, { merge: true });
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

      return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-brand-900/60 backdrop-blur-sm p-4 anim-fade-in" onClick={onClose}>
          <div 
            className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl border border-brand-100 overflow-hidden anim-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-brand-900 text-white p-6 relative">
              <button 
                onClick={onClose} 
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
              >
                <Icons.X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-coral rounded-xl flex items-center justify-center text-white">
                  <Icons.Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">Calendario de Racha</h3>
                  <p className="text-xs text-brand-300">Historial de entrenamiento mental</p>
                </div>
              </div>
            </div>

            {/* Calendar Body */}
            <div className="p-6 max-h-[85vh] overflow-y-auto">
              {/* Navigation */}
              <div className="flex justify-between items-center mb-6">
                <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-brand-50 text-brand-900 transition-colors">
                  <Icons.ChevronLeft className="w-5 h-5" />
                </button>
                <h4 className="font-display text-lg font-bold text-brand-900">
                  {monthNames[month]} {year}
                </h4>
                <button 
                  onClick={nextMonth} 
                  disabled={year >= new Date().getFullYear() && month >= new Date().getMonth()}
                  className="p-2 rounded-xl hover:bg-brand-50 text-brand-900 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                >
                  <Icons.ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-brand-400 uppercase mb-4">
                <span>L</span>
                <span>M</span>
                <span>X</span>
                <span>J</span>
                <span>V</span>
                <span>S</span>
                <span>D</span>
              </div>

              {/* Grid of Days */}
              <div className="grid grid-cols-7 gap-2 text-center">
                {calendarDays.map((item, idx) => {
                  if (!item) {
                    return <div key={`empty-${idx}`} className="aspect-square"></div>;
                  }

                  const { day, dateStr } = item;
                  const isCompleted = history.includes(dateStr);
                  const isToday = dateStr === todayStr;
                  const isFuture = dateStr > todayStr;

                  return (
                    <div 
                      key={dateStr}
                      className={`aspect-square rounded-full flex flex-col items-center justify-center text-xs font-bold transition-all relative
                        ${isCompleted 
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 scale-105' 
                          : isToday 
                            ? 'bg-brand-50 text-brand-900 ring-2 ring-brand-900' 
                            : isFuture 
                              ? 'text-gray-300 pointer-events-none' 
                              : 'bg-red-50 text-red-400 hover:bg-red-100/50'}`}
                      title={isCompleted ? 'Entrenado' : isFuture ? 'Futuro' : 'No entrenado'}
                    >
                      <span>{day}</span>
                      {isCompleted && (
                        <span className="absolute bottom-1 w-1 h-1 bg-white rounded-full"></span>
                      )}
                      {!isCompleted && !isFuture && !isToday && (
                        <span className="absolute bottom-1 w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Stats Summary */}
              <div className="mt-6 pt-4 border-t border-brand-50 grid grid-cols-2 gap-4">
                <div className="bg-brand-50/50 p-3.5 rounded-2xl text-center border border-brand-50">
                  <span className="text-[10px] text-brand-400 font-bold uppercase tracking-wider block mb-1">Días Completados</span>
                  <span className="text-xl font-bold text-brand-900 flex items-center justify-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div> {totalCompletions}
                  </span>
                </div>
                <div className="bg-brand-50/50 p-3.5 rounded-2xl text-center border border-brand-50">
                  <span className="text-[10px] text-brand-400 font-bold uppercase tracking-wider block mb-1">Racha Actual</span>
                  <span className="text-xl font-bold text-brand-900 flex items-center justify-center gap-1.5">
                    <Icons.Flame className="w-5 h-5 text-accent-coral" /> {localStorage.getItem('daily_challenge_streak') || 0}
                  </span>
                </div>
              </div>

              {/* Cloud Sync Section */}
              <div className="mt-6 pt-4 border-t border-brand-50 text-center">
                {linkedEmail ? (
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 text-left">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
                      <Icons.Shield className="w-4 h-4 text-emerald-600" />
                      <span>Copia de seguridad activa</span>
                    </div>
                    <p className="text-xs text-emerald-950 mb-3">
                      Tu progreso se está guardando automáticamente en la nube y está vinculado a: <strong>{linkedEmail}</strong>
                    </p>
                    <button 
                      onClick={handleUnlink}
                      className="text-xs text-red-600 font-bold hover:underline"
                    >
                      Desvincular correo
                    </button>
                  </div>
                ) : (
                  <div className="bg-brand-50/50 border border-brand-100 rounded-2xl p-4 text-left">
                    <div className="flex items-center gap-1.5 text-brand-700 font-bold text-xs uppercase tracking-wider mb-1.5">
                      <Icons.Shield className="w-4 h-4 text-brand-500" />
                      <span>Copia en la nube (Recomendado)</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-tight mb-3">
                      Vincula tu correo y crea un PIN de 4 números para no perder tu racha si cambias de móvil.
                    </p>
                    <div className="space-y-2 mb-3">
                      <input 
                        type="email"
                        placeholder="ejemplo@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-brand-200 text-xs focus:border-accent-coral focus:outline-none"
                      />
                      <input 
                        type="text"
                        placeholder="PIN de seguridad (4 números)"
                        value={pin}
                        onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                        maxLength="4"
                        className="w-full px-3 py-2 rounded-xl border border-brand-200 text-xs focus:border-accent-coral focus:outline-none text-center font-bold tracking-widest"
                      />
                    </div>
                    <button 
                      onClick={handleLink}
                      disabled={isLinking}
                      className="w-full py-2 bg-brand-900 hover:bg-brand-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm disabled:opacity-50"
                    >
                      {isLinking ? 'Guardando...' : 'Guardar copia de seguridad'}
                    </button>
                    
                    {/* Consentimiento legal RGPD */}
                    <p className="text-[9px] text-gray-400 leading-tight mt-3">
                      Al vincular tu racha, aceptas que IAdapta guarde tu correo electrónico para la copia de seguridad y para el envío ocasional de boletines informativos y consejos de salud. Podrás darte de baja cuando lo desees.
                    </p>
                  </div>
                )}

                {/* Restore Section */}
                <div className="w-full mt-4 text-center">
                  <button 
                    onClick={() => setShowRestore(!showRestore)} 
                    className="text-[10px] text-brand-500 font-bold hover:text-brand-700 hover:underline"
                  >
                    {showRestore ? 'Ocultar recuperación' : '¿Cambiaste de móvil o perdiste tu racha? Recupérala aquí'}
                  </button>
                  {showRestore && (
                    <div className="bg-brand-50/50 border border-brand-100 rounded-2xl p-4 text-left mt-2 space-y-2 animate-fadeIn">
                      <input 
                        type="email" 
                        placeholder="Tu correo vinculado" 
                        value={restoreEmail}
                        onChange={(e) => setRestoreEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-brand-200 text-xs focus:border-accent-coral focus:outline-none"
                      />
                      <input 
                        type="text" 
                        placeholder="PIN de 4 números" 
                        value={restorePin}
                        onChange={(e) => setRestorePin(e.target.value.replace(/\D/g, ''))}
                        maxLength="4"
                        className="w-full px-3 py-2 rounded-xl border border-brand-200 text-xs focus:border-accent-coral focus:outline-none text-center font-bold tracking-widest"
                      />
                      <button 
                        onClick={handleRestore}
                        disabled={isRestoring}
                        className="w-full py-2 bg-accent-coral hover:bg-accent-coral/90 text-white rounded-xl text-xs font-bold transition-all shadow-sm disabled:opacity-50"
                      >
                        {isRestoring ? 'Recuperando...' : 'Restaurar progreso'}
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      );
    };

    // --- REUSABLE GAME HEADER ---
    const GameHeader = function GameHeader({ title, subtitle, onBack, onRestart, onLevels, isStandalone }) {
      return (
        <div className="flex flex-col mb-8 relative">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 w-full">
            <button 
              onClick={onBack} 
              className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors bg-white px-5 py-2.5 rounded-xl shadow-sm border border-brand-100 group"
            >
              <Icons.ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Volver</span>
            </button>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={onRestart} 
                className="text-brand-500 hover:text-brand-700 p-2.5 flex items-center gap-2 text-sm font-bold bg-white rounded-xl shadow-sm border border-brand-100 transition-all hover:scale-105 active:scale-95"
                title="Reiniciar este nivel"
              >
                <Icons.Refresh className="w-5 h-5" />
                <span>Reiniciar</span>
              </button>
              <button 
                onClick={onLevels} 
                className="text-brand-500 hover:text-brand-700 p-2.5 flex items-center gap-2 text-sm font-bold bg-white rounded-xl shadow-sm border border-brand-100 transition-all hover:scale-105 active:scale-95"
                title="Ir al selector de niveles"
              >
                <Icons.List className="w-5 h-5" />
                <span>Niveles</span>
              </button>
            </div>
          </div>
          
          <h2 className="font-display text-4xl font-bold text-brand-900 mb-2">{title}</h2>
          {subtitle && (
            <div className="flex items-center justify-center gap-3">
              {subtitle}
            </div>
          )}
        </div>
      );
    };

    const StarRating = function StarRating({ stars }) {
      return (
        <div className="flex gap-1 justify-center my-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Icons.Star key={i} className={`w-10 h-10 ${i <= stars ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
          ))}
        </div>
      );
    };

    const ShareButtons = function ShareButtons({ game, score, time }) {
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
      
      return (
        <div className="flex flex-col items-center gap-4 mt-8 pt-8 border-t border-brand-100">
          <p className="text-sm font-bold text-brand-400 uppercase tracking-widest">Compartir resultado</p>
          <div className="flex gap-4">
            <button onClick={shareWhatsApp} title="Compartir en WhatsApp" className="w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
              <Icons.WhatsApp className="w-6 h-6" />
            </button>
            <button onClick={shareTwitter} title="Compartir en Twitter" className="w-12 h-12 bg-[#1DA1F2] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
              <Icons.Twitter className="w-6 h-6" />
            </button>
            <button onClick={shareFacebook} title="Compartir en Facebook" className="w-12 h-12 bg-[#4267B2] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
              <Icons.Facebook className="w-6 h-6" />
            </button>
          </div>
        </div>
      );
    };

    // --- GAME CONFIG ---
    const ORDER_LEVELS = [
      { id: 1, count: 6, cols: 'grid-cols-3' },
      { id: 2, count: 12, cols: 'grid-cols-3 sm:grid-cols-4' },
      { id: 3, count: 20, cols: 'grid-cols-4 sm:grid-cols-5' },
      { id: 4, count: 36, cols: 'grid-cols-6' },
      { id: 5, count: 50, cols: 'grid-cols-5 sm:grid-cols-10' }
    ];

    // --- LEVELS CONFIG FOR WORD SEARCH ---
    const WORDSEARCH_LEVELS = [
      { id: 1, name: 'Fácil', rows: 10, cols: 8, wordCount: 6, directions: [0, 1], hints: 1 },
      { id: 2, name: 'Medio', rows: 12, cols: 10, wordCount: 10, directions: [0, 1, 2], hints: 1 },
      { id: 3, name: 'Difícil', rows: 15, cols: 10, wordCount: 14, directions: [0, 1, 2, 3, 4], hints: 1 },
      { id: 4, name: 'Muy Difícil', rows: 18, cols: 12, wordCount: 18, directions: [0, 1, 2, 3, 4, 5, 6, 7], hints: 1 },
      { id: 5, name: '¿Imposible?', rows: 20, cols: 12, wordCount: 22, directions: [0, 1, 2, 3, 4, 5, 6, 7], hints: 2 }
    ];

    const VISUAL_LEVELS = [
      { id: 1, name: 'Básico', size: 5, rounds: 5 },
      { id: 2, name: 'Intermedio', size: 8, rounds: 5 },
      { id: 3, name: 'Avanzado', size: 10, rounds: 5 },
      { id: 4, name: 'Experto', size: 12, rounds: 5 },
      { id: 5, name: 'Lince', size: 15, rounds: 5 }
    ];

    const INTRUDER_CATEGORIES = [
      { name: 'Cocina', items: ['🍽️', '🍴', '🥄', '🔪', '☕', '🍳', '🍯', '🥣', '🥤', '🧂', '🍞', '🥗', '🥘', '🍲'], intruders: ['🔨', '✂️', '👟', '☂️', '🚲'] },
      { name: 'Ropa', items: ['👕', '👖', '👗', '👢', '👚', '👔', '🎩', '🧣', '🧤', '🧥', '🧦', '🎒', '👠', '👒'], intruders: ['🍎', '🍄', '🚗', '🎸', '📱'] },
      { name: 'Herramientas', items: ['🔧', '🔨', '⚙️', '✂️', '⛏️', '🔩', '📏', '⚒️', '🛠️', '🖌️', '🔦', '🖇️', '📐', '🔨'], intruders: ['☂️', '🍦', '🍕', '🎀', '🎈'] },
      { name: 'Frutas', items: ['🍎', '🍐', '🍌', '🍇', '🍊', '🍓', '🍍', '🍉', '🍒', '🍑', '🥝', '🥑', '🥥', '🍋'], intruders: ['🚪', '🚗', '👞', '📻', '💻'] },
      { name: 'Deportes', items: ['⚽', '🏀', '🎾', '🏐', '🎱', '🏓', '🏸', '⚾', '⛳', '🏈', '🛹', '⛸️', '🏹', '🎣'], intruders: ['🎸', '🍔', '🛋️', '🛀', '📖'] },
      { name: 'Música', items: ['🎸', '🎹', '🎺', '🎻', '🔔', '🎷', '🎤', '🥁', '🪕', '🪗', '📻', '🎧', '🎼', '🎻'], intruders: ['🍕', '✂️', '🚲', '☂️', '📦'] },
      { name: 'Baño', items: ['🚿', '🛀', '🚽', '💧', '🚰', '🗑️', '🛁', '🧼', '🧻', '🧴', '🧖', '🦷', '🪥', '🧺'], intruders: ['🚲', '🍔', '🚁', '🎸', '⚽'] },
      { name: 'Transporte', items: ['🚗', '🚲', '🚌', '🚆', '✈️', '⛵', '🏍️', '🚁', '🚜', '🚒', '🚑', '🚕', '🚂', '🚀'], intruders: ['🍦', '🛏️', '🎈', '🍄', '📚'] },
      { name: 'Animales', items: ['🐶', '🐱', '🐭', '🐹', '🐰', '🐸', '🐻', '🦁', '🐯', '🐼', '🐷', '🐨', '🐘', '🦒'], intruders: ['📱', '🍕', '👟', '🔨', '🏠'] },
      { name: 'Electrónica', items: ['💻', '📱', '⌨️', '🖱️', '🎧', '📺', '⌚', '📷', '🕹️', '🔌', '🔋', '📟', '🔦', '📻'], intruders: ['🍄', '🥕', '👞', '📦', '🖼️'] }
    ];

    const INTRUDER_LEVELS = [
      { id: 1, name: 'Básico', count: 4, rounds: 5 },
      { id: 2, name: 'Intermedio', count: 6, rounds: 5 },
      { id: 3, name: 'Avanzado', count: 8, rounds: 6 },
      { id: 4, name: 'Experto', count: 10, rounds: 8 },
      { id: 5, name: 'Maestro', count: 12, rounds: 10 }
    ];


    // --- SECTION COGNITIVE ---
    const SectionCognitive = function SectionCognitive({ isTeaser, navigateTo, isStandalone, isPWA, setShowInstaller }) {
      const { useState, useEffect, useCallback, useMemo } = React;

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
        return Array.from({ length: 7 }, (_, i) => {
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
          syncCloudProgress((mergedHistory) => {
            setHistory(mergedHistory);
          });
        }, 1000);
      }, []);


      const icons = ['🧠', '💡', '🌟', '🧩', '🚀', '🌈', '💎', '🎨', '🍎', '⚽', '🎸', '🍦', '🏠'];

      const initGame = useCallback((levelIdx) => {
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

      const handleFlip = (index) => {
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
              if (timeTaken < baseTime * 0.6) s = 5;
              else if (timeTaken < baseTime * 0.8) s = 4;
              else if (timeTaken > baseTime * 1.5) s = 2;
              setStars(s);

              setTimeout(() => {
                setGameFinished(true);
                if (window.confetti) window.confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
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

      const openStandalone = (gameType) => {
        const baseUrl = window.location.href.split('?')[0];
        window.open(`${baseUrl}?page=${gameType}`, '_blank');
      };

      if (isTeaser) {
        return (
          <section id="cognitive" className={`pt-36 pb-24 px-4 bg-white ${isStandalone ? 'pt-36' : ''}`}>
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                {isStandalone && (
                  <div className="mb-12 flex justify-center">
                    <img src="assets/iadapta_logo.png" alt="IAdapta" className="h-16 object-contain" />
                  </div>
                )}

                <span className="inline-block bg-brand-100 text-brand-700 rounded-full px-5 py-2 text-base font-bold uppercase tracking-widest mb-4">Entrena tu Mente</span>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-900 mb-6">Estimulación Cognitiva: Entrena tu Mente</h2>
                <div className="section-divider w-24 mx-auto mb-8"></div>
                
                <div className="space-y-6 mb-12">
                  <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                    Mantener la mente activa es tan vital como el ejercicio físico para preservar la autonomía. Fortalecer nuestra reserva cognitiva permite al cerebro adaptarse mejor al paso del tiempo, mejorando nuestra agilidad mental y bienestar diario.
                  </p>
                  <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                    Estos son algunos ejercicios prácticos diseñados para estimular la atención y la memoria:
                  </p>
                </div>

                {/* LOGIN/REGISTER CALL TO ACTION BOX */}
                {!linkedEmail ? (
                  <div className="max-w-xl mx-auto mb-10 bg-brand-50 border border-brand-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm anim-fade-up">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center shrink-0">
                        <Icons.User className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-900 text-sm">¿Quieres guardar tu racha?</h4>
                        <p className="text-xs text-gray-500">Inicia sesión o regístrate para sincronizar tu progreso en la nube.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsCalendarOpen(true)}
                      className="px-5 py-2.5 bg-brand-900 text-white font-bold text-xs rounded-xl shadow-md hover:bg-brand-800 transition-all whitespace-nowrap"
                    >
                      Iniciar sesión / Registrarse
                    </button>
                  </div>
                ) : (
                  <div className="max-w-xl mx-auto mb-10 bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm anim-fade-up">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-900 text-sm">Sesión iniciada correctamente</h4>
                        <p className="text-xs text-gray-500">Progreso guardado en la nube como: <strong className="font-bold text-emerald-700">{linkedEmail}</strong></p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsCalendarOpen(true)}
                      className="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-xs rounded-xl transition-all whitespace-nowrap"
                    >
                      Gestionar cuenta
                    </button>
                  </div>
                )}

                {/* HORIZONTAL DAILY CHALLENGE CARD */}
                <div 
                  onClick={() => navigateTo('challenge')}
                  className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-brand-100 flex flex-col md:flex-row mb-16 cursor-pointer group hover:shadow-brand-900/10 transition-all hover:-translate-y-1 duration-500 text-left"
                >
                  <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                    <img src="daily_challenge_banner.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Reto Diario" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10"></div>
                  </div>
                  <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div 
                          onClick={(e) => { e.stopPropagation(); setIsCalendarOpen(true); }}
                          className="flex items-center gap-3 cursor-pointer hover:opacity-85 transition-opacity"
                          title="Ver calendario de racha"
                        >
                           <div className="w-10 h-10 bg-accent-coral text-white rounded-xl flex items-center justify-center shadow-lg">
                             <Icons.Flame className="w-6 h-6" />
                           </div>
                           <div className="flex flex-col">
                             <span className="text-brand-400 font-bold uppercase tracking-widest text-[10px] leading-tight">Desafío Diario</span>
                             <span className="text-accent-coral font-bold text-xs flex items-center gap-1">
                               {history.length > 0 ? `${localStorage.getItem('daily_challenge_streak') || 0} días de racha` : '¡Empieza hoy!'}
                               <Icons.Calendar className="w-3.5 h-3.5 inline text-accent-coral/75" />
                             </span>
                           </div>
                        </div>

                        {!linkedEmail ? (
                          <div 
                            onClick={(e) => { e.stopPropagation(); setIsCalendarOpen(true); }}
                            className="inline-flex items-center gap-2 bg-brand-50 hover:bg-brand-100 border border-brand-100 px-3.5 py-1.5 rounded-xl text-xs font-bold text-brand-900 cursor-pointer transition-all hover:scale-102 active:scale-98 self-start sm:self-auto"
                            title="Vincular cuenta en la nube (Recomendado)"
                          >
                            <Icons.Cloud className="w-4 h-4 text-brand-500" />
                            <span>Vincular Correo (Copia)</span>
                          </div>
                        ) : (
                          <div 
                            onClick={(e) => { e.stopPropagation(); setIsCalendarOpen(true); }}
                            className="inline-flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 px-3.5 py-1.5 rounded-xl text-xs font-bold text-emerald-800 cursor-pointer transition-all hover:scale-102 active:scale-98 animate-fade-in self-start sm:self-auto"
                            title="Gestionar copia de seguridad en la nube"
                          >
                            <Icons.Cloud className="w-4 h-4 text-emerald-600 animate-pulse" />
                            <span>Copia Activa: {linkedEmail.length > 22 ? linkedEmail.substring(0, 19) + '...' : linkedEmail}</span>
                          </div>
                        )}
                      </div>
                      <h3 className="font-display text-3xl font-bold text-brand-900 mb-3">Reto Diario IAdapta</h3>
                      <p className="text-gray-600 text-lg mb-8 max-w-xl">Supera 3 juegos rápidos cada día para mantener tu racha y fortalecer tu mente. ¡La dificultad sube cada día!</p>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                      <div 
                        onClick={(e) => { e.stopPropagation(); setIsCalendarOpen(true); }}
                        className="flex gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                        title="Ver calendario de racha"
                      >
                        {weekDays.map((day, i) => {
                          const isCompleted = history.includes(weekDates[i]);
                          const isToday = weekDates[i] === new Date().toISOString().split('T')[0];
                          return (
                            <div key={i} className="flex flex-col items-center gap-1">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-sm
                                ${isCompleted ? 'bg-emerald-500 text-white shadow-emerald-500/20' : isToday ? 'bg-brand-900 text-white ring-4 ring-brand-100' : 'bg-brand-50 text-brand-300'}`}>
                                {isCompleted ? <Icons.Check className="w-5 h-5" /> : day}
                              </div>
                              <span className={`text-[10px] font-bold ${isToday ? 'text-brand-900' : 'text-brand-400'}`}>{day}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="lg:ml-auto">
                         <button className="px-8 py-3 bg-brand-900 text-white rounded-xl font-bold flex items-center gap-2 group-hover:bg-accent-coral transition-colors shadow-lg">
                           <span>Empezar Desafío</span>
                           <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                         </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bloque de anuncios - Entre Reto Diario y Juegos */}
                <div className="mb-16 overflow-hidden rounded-xl bg-gray-50/50 min-h-[100px] flex flex-col items-center justify-center">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Publicidad</span>
                  <AdSenseBlock slot="9272607554" />
                </div>
                {isStandalone && (
                  <div className="mt-10 mb-16 pt-10 border-t border-brand-100 text-center flex flex-col items-center gap-4">
                    <p className="text-gray-400 text-sm mb-2 font-medium uppercase tracking-widest">¿Quieres ver más recursos?</p>
                    <a 
                      href="https://www.iadapta.es/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-900 transition-all bg-white px-8 py-4 rounded-2xl shadow-sm border border-brand-100 hover:shadow-md active:scale-95 group"
                    >
                      <Icons.Brain className="w-5 h-5" />
                      <span>Ir a la web de IAdapta</span>
                      <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-10 mb-16">

                  {/* Game 1 Teaser */}
                  <div 
                    onClick={() => navigateTo('memory')}
                    className="bg-white rounded-[2.5rem] overflow-hidden border border-brand-50 shadow-xl hover:shadow-2xl transition-all group flex flex-col cursor-pointer"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img src="memory_game_thumbnail.png" alt="Juego de Memoria" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-6 flex items-center gap-3">
                        <div className="w-12 h-12 bg-brand-600 text-white rounded-xl flex items-center justify-center text-2xl shadow-lg border border-brand-400/30">
                          <Icons.Brain />
                        </div>
                        <span className="text-white font-bold text-lg">Memoria</span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="font-display text-2xl font-bold text-brand-900 mb-4">Memoriza sus parejas</h3>
                      <p className="text-gray-600 text-lg mb-8 flex-1 leading-relaxed">
                        Un clásico ejercicio de memoria episódica y concentración. Supera los 5 niveles de dificultad creciente.
                      </p>
                      <button className="w-full py-4 bg-brand-900 text-white rounded-2xl font-bold text-lg group-hover:bg-brand-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-brand-900/20">
                        Jugar ahora
                        <Icons.ArrowRight />
                      </button>
                    </div>
                  </div>

                  {/* Game 2 Teaser */}
                  <div 
                    onClick={() => navigateTo('order')}
                    className="bg-white rounded-[2.5rem] overflow-hidden border border-sky-50 shadow-xl hover:shadow-2xl transition-all group flex flex-col cursor-pointer"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img src="order_game_thumbnail.png" alt="Juego de Orden" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-sky-900/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-6 flex items-center gap-3">
                        <div className="w-12 h-12 bg-sky-600 text-white rounded-xl flex items-center justify-center text-2xl shadow-lg border border-sky-400/30">
                          <Icons.List />
                        </div>
                        <span className="text-white font-bold text-lg">Atención</span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="font-display text-2xl font-bold text-brand-900 mb-4">En orden</h3>
                      <p className="text-gray-600 text-lg mb-8 flex-1 leading-relaxed">
                        Entrena la atención sostenida y el rastreo visual tocando los números en orden lo más rápido posible.
                      </p>
                      <button className="w-full py-4 bg-sky-900 text-white rounded-2xl font-bold text-lg group-hover:bg-sky-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-sky-900/20">
                        Jugar ahora
                        <Icons.ArrowRight />
                      </button>
                    </div>
                  </div>

                  {/* Game 3 Teaser */}
                  <div 
                    onClick={() => navigateTo('wordsearch')}
                    className="bg-white rounded-[2.5rem] overflow-hidden border border-emerald-50 shadow-xl hover:shadow-2xl transition-all group flex flex-col cursor-pointer"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img src="word_search_thumbnail.png" alt="Sopa de Letras" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-6 flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center text-2xl shadow-lg border border-emerald-400/30">
                          <Icons.Search />
                        </div>
                        <span className="text-white font-bold text-lg">Rastreo</span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="font-display text-2xl font-bold text-brand-900 mb-4">Sopa de Letras</h3>
                      <p className="text-gray-600 text-lg mb-8 flex-1 leading-relaxed">
                        Estimula el rastreo visual y la atención semántica buscando palabras relacionadas con la vida diaria.
                      </p>
                      <button className="w-full py-4 bg-emerald-900 text-white rounded-2xl font-bold text-lg group-hover:bg-emerald-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-900/20">
                        Jugar ahora
                        <Icons.ArrowRight />
                      </button>
                    </div>
                  </div>

                  {/* Game 4 Teaser */}
                  <div 
                    onClick={() => navigateTo('math')}
                    className="bg-white rounded-[2.5rem] overflow-hidden border border-amber-50 shadow-xl hover:shadow-2xl transition-all group flex flex-col cursor-pointer"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img src="mental_math_thumbnail.png" alt="Cálculo Mental" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-6 flex items-center gap-3">
                        <div className="w-12 h-12 bg-amber-600 text-white rounded-xl flex items-center justify-center text-2xl shadow-lg border border-amber-400/30">
                          <Icons.Calculator />
                        </div>
                        <span className="text-white font-bold text-lg">Cálculo</span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="font-display text-2xl font-bold text-brand-900 mb-4">Cálculo Mental</h3>
                      <p className="text-gray-600 text-lg mb-8 flex-1 leading-relaxed">
                        Desafía tu agilidad numérica con operaciones rápidas diseñadas para mantener tu mente activa y precisa.
                      </p>
                      <button className="w-full py-4 bg-amber-900 text-white rounded-2xl font-bold text-lg group-hover:bg-amber-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-amber-900/20">
                        Jugar ahora
                        <Icons.ArrowRight />
                      </button>
                    </div>
                  </div>

                  {/* Game 5: Agudeza Visual */}
                  <div 
                    onClick={() => navigateTo('visual')}
                    className="bg-white rounded-[2.5rem] overflow-hidden border border-brand-50 shadow-xl hover:shadow-2xl transition-all group flex flex-col cursor-pointer"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img src="visual_game_thumbnail.png" alt="Agudeza Visual" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-6 flex items-center gap-3">
                        <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-2xl shadow-lg border border-indigo-400/30">
                          <Icons.Search />
                        </div>
                        <span className="text-white font-bold text-lg">Agudeza</span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="font-display text-2xl font-bold text-brand-900 mb-4">Agudeza Visual</h3>
                      <p className="text-gray-600 text-lg mb-8 flex-1 leading-relaxed">
                        Entrena tu velocidad de procesamiento y atención selectiva encontrando el elemento discordante.
                      </p>
                      <button className="w-full py-4 bg-indigo-900 text-white rounded-2xl font-bold text-lg group-hover:bg-indigo-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-900/20">
                        Jugar ahora
                        <Icons.ArrowRight />
                      </button>
                    </div>
                  </div>

                  {/* Game 6: El Intruso */}
                  <div 
                    onClick={() => navigateTo('intruder')}
                    className="bg-white rounded-[2.5rem] overflow-hidden border border-rose-50 shadow-xl hover:shadow-2xl transition-all group flex flex-col cursor-pointer"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img src="intruder_game_thumbnail.png" alt="El Intruso" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-6 flex items-center gap-3">
                        <div className="w-12 h-12 bg-rose-600 text-white rounded-xl flex items-center justify-center text-2xl shadow-lg border border-rose-400/30">
                          <Icons.Search />
                        </div>
                        <span className="text-white font-bold text-lg">Categorización</span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="font-display text-2xl font-bold text-brand-900 mb-4">El Intruso</h3>
                      <p className="text-gray-600 text-lg mb-8 flex-1 leading-relaxed">
                        Entrena el razonamiento lógico y la categorización semántica identificando el objeto que no encaja en el grupo.
                      </p>
                      <button className="w-full py-4 bg-rose-900 text-white rounded-2xl font-bold text-lg group-hover:bg-rose-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-rose-900/20">
                        Jugar ahora
                        <Icons.ArrowRight />
                      </button>
                    </div>
                  </div>

                  {/* Game 7: Sudoku */}
                  <div 
                    onClick={() => navigateTo('sudoku')}
                    className="bg-white rounded-[2.5rem] overflow-hidden border border-indigo-50 shadow-xl hover:shadow-2xl transition-all group flex flex-col cursor-pointer"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img src="sudoku_game_thumbnail.png" alt="Sudoku" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-6 flex items-center gap-3">
                        <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-2xl shadow-lg border border-indigo-400/30">
                          <Icons.Puzzle />
                        </div>
                        <span className="text-white font-bold text-lg">Lógica</span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="font-display text-2xl font-bold text-brand-900 mb-4">Sudoku</h3>
                      <p className="text-gray-600 text-lg mb-8 flex-1 leading-relaxed">
                        Ejercita el razonamiento lógico y la concentración rellenando la cuadrícula con números del 1 al 9.
                      </p>
                      <button className="w-full py-4 bg-indigo-900 text-white rounded-2xl font-bold text-lg group-hover:bg-indigo-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-900/20">
                        Jugar ahora
                        <Icons.ArrowRight />
                      </button>
                    </div>
                  </div>

                </div>

                {/* Consejo de la TO */}
                {!isStandalone && (
                  <div className="bg-emerald-50 border-l-4 border-emerald-500 p-8 rounded-r-3xl shadow-sm text-left max-w-3xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">💡</span>
                      <h4 className="font-display text-xl font-bold text-emerald-800 uppercase tracking-wide">El Consejo del Terapeuta Ocupacional</h4>
                    </div>
                    <p className="text-emerald-900 italic text-xl leading-relaxed">
                      "El cerebro se fortalece con la novedad. No te limites a lo que ya dominas: intenta aprender algo nuevo cada día, por pequeño que sea. El aprendizaje continuo es la mejor herramienta para mantener una mente joven y resiliente."
                    </p>
                  </div>
                )}

                {/* Streak Calendar Modal */}
                <StreakCalendarModal 
                  isOpen={isCalendarOpen} 
                  onClose={() => setIsCalendarOpen(false)} 
                  history={history} 
                />
              </div>
            </div>
          </section>
        );
      }

      const gridCols = level === 0 ? 'grid-cols-2' : level === 1 ? 'grid-cols-2 sm:grid-cols-4' : level === 2 ? 'grid-cols-3 sm:grid-cols-4' : level === 3 ? 'grid-cols-4' : 'grid-cols-5';

      return (
        <section className={`pt-36 pb-20 px-4 min-h-screen bg-brand-50 flex flex-col items-center ${isStandalone ? 'pt-36' : ''}`}>
          <div className="max-w-4xl w-full">
            <div className="flex justify-start mb-8">
              <button 
                onClick={() => navigateTo('cognitive')} 
                className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors bg-white px-5 py-2.5 rounded-xl shadow-sm border border-brand-100 group"
              >
                <Icons.ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Volver</span>
              </button>
            </div>

            {!gameStarted ? (
              <div className="max-w-2xl mx-auto">
                <h2 className="font-display text-4xl font-bold text-brand-900 mb-8 text-center">Memoriza las Parejas</h2>
                <div className="bg-white rounded-[3rem] border border-brand-100 shadow-2xl p-10 anim-scale-in text-center">
                  <div className="text-6xl mb-6">🧠</div>
                  <h3 className="text-2xl font-bold text-brand-900 mb-6">Selecciona la dificultad</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {levelSequence.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => initGame(idx)}
                        className="group p-6 rounded-2xl border-2 border-brand-50 hover:border-brand-500 hover:bg-brand-50 transition-all flex flex-col items-center gap-2"
                      >
                        <span className="text-brand-900 font-bold text-xl">Nivel {idx + 1}</span>
                        <span className="text-brand-500 text-sm font-medium">
                          {idx === 0 ? 'Muy Fácil (2 parejas)' : 
                           idx === 1 ? 'Fácil (4 parejas)' : 
                           idx === 2 ? 'Medio (6 parejas)' : 
                           idx === 3 ? 'Difícil (8 parejas)' : 'Experto (12 parejas)'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-5xl mx-auto w-full">
                <GameHeader 
                  title="Juego de Memoria"
                  subtitle={(
                    <>
                      <span className="bg-brand-900 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">Nivel {level + 1}</span>
                      <span className="text-brand-600 font-bold uppercase tracking-widest">Memoriza las Parejas</span>
                    </>
                  )}
                  onBack={() => navigateTo('cognitive')}
                  onRestart={() => initGame(level)}
                  onLevels={() => setGameStarted(false)}
                  isStandalone={isStandalone}
                />

                <div className="bg-white rounded-3xl border border-brand-100 shadow-2xl p-6 sm:p-10 relative">
                  <h2 className="font-display text-4xl font-bold text-brand-900 mb-2">Memoria</h2>
                  <p className="text-brand-600 font-bold mb-8 uppercase tracking-widest">Nivel {level + 1}: Encuentra las parejas</p>

                  {!gameFinished ? (
                    <div className={`grid ${gridCols} gap-3 sm:gap-4 max-w-2xl mx-auto`}>
                      {cards.map((card, index) => {
                        const isFlipped = flipped.includes(index) || matched.includes(card.name);
                        return (
                          <div
                            key={card.id}
                            onClick={() => handleFlip(index)}
                            className={`relative cursor-pointer transition-all duration-500 preserve-3d aspect-square ${isFlipped ? 'rotate-y-180' : ''}`}
                          >
                            {/* Front (Hidden) */}
                            <div className="absolute inset-0 bg-brand-100 rounded-2xl flex items-center justify-center border-2 border-brand-200 shadow-inner backface-hidden text-3xl font-bold text-brand-300">
                              ?
                            </div>
                            {/* Back (Revealed) */}
                            <div className="absolute inset-0 bg-white border-4 border-brand-400 rounded-2xl flex items-center justify-center rotate-y-180 backface-hidden text-4xl sm:text-5xl shadow-md">
                              {card.icon}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 anim-scale-in">
                      <div className="text-6xl mb-6">🧠✨</div>
                      <h3 className="text-3xl font-bold text-brand-900 mb-2">¡Increíble memoria!</h3>
                      <StarRating stars={stars} />
                      <p className="text-xl text-gray-600 mb-4">Has completado el nivel {level + 1} en <span className="font-bold text-brand-700">{finalTime}s</span>.</p>
                      
                      <ShareButtons game="Juego de Memoria" time={finalTime} />
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <button
                          onClick={() => setGameStarted(false)}
                          className="px-8 py-4 bg-brand-100 text-brand-700 rounded-2xl font-bold text-lg hover:bg-brand-200 transition-all"
                        >
                          Cambiar Dificultad
                        </button>
                        <button
                          onClick={nextLevel}
                          className="px-10 py-5 bg-brand-900 text-white rounded-2xl font-bold text-xl hover:bg-brand-800 shadow-xl transition-all btn-pulse"
                        >
                          {level < levelSequence.length - 1 ? 'Siguiente Nivel' : 'Reiniciar Desafío'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      );
    };


    // --- GAMES ---
    const SectionWordSearch = function SectionWordSearch({ isStandalone, navigateTo }) {
      const { useState, useEffect, useCallback, useRef } = React;
      
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
        const { rows, cols, wordCount, directions } = currentLevel;
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
              if (dirType === 0) { dr = 0; dc = 1; }
              else if (dirType === 1) { dr = 1; dc = 0; }
              else if (dirType === 2) { dr = 1; dc = 1; }
              else if (dirType === 3) { dr = 0; dc = -1; }
              else if (dirType === 4) { dr = -1; dc = 0; }
              else if (dirType === 5) { dr = -1; dc = -1; }
              else if (dirType === 6) { dr = 1; dc = -1; }
              else if (dirType === 7) { dr = -1; dc = 1; }

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
                  cells.push({ r: rr, c: cc });
                }
                placedWords.push({ word, cells });
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

      const startGame = (idx) => {
        setLevelIdx(idx);
        setGameStarted(true);
      };

      const getCellFromEvent = (e) => {
        const touch = e.touches ? e.touches[0] : e;
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target && target.dataset.r !== undefined) {
          return { r: parseInt(target.dataset.r), c: parseInt(target.dataset.c) };
        }
        return null;
      };

      const handleStart = (e) => {
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
          setSelection({ start: cell, end: cell, isDragging: true });
        }
      };

      const handleMove = (e) => {
        if (!selection || !selection.isDragging || gameStatus !== 'playing') return;
        const cell = getCellFromEvent(e);
        if (cell) {
          const dr = Math.abs(cell.r - selection.start.r);
          const dc = Math.abs(cell.c - selection.start.c);
          if (dr === 0 || dc === 0 || dr === dc) {
            setSelection(prev => ({ ...prev, end: cell }));
          }
        }
      };

      const handleEnd = () => {
        if (!selection || gameStatus !== 'playing') return;
        if (selection.isDragging) {
          if (selection.start.r === selection.end.r && selection.start.c === selection.end.c) {
            setSelection({ ...selection, isDragging: false, isFirstClick: true });
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
            window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.7 }, colors: ['#10b981', '#3b82f6', '#f59e0b', '#E87D55'] });
          }
          if (newFound.length === wordsToFind.length) {
            setGameStatus('won');
            const timeTaken = (Date.now() - startTime) / 1000;
            setTimeElapsed(timeTaken.toFixed(0));
            
            // Star logic for WordSearch
            const baseTime = wordsToFind.length * 15; // 15s per word average
            let s = 3;
            if (timeTaken < baseTime * 0.6) s = 5;
            else if (timeTaken < baseTime * 0.9) s = 4;
            else if (timeTaken > baseTime * 1.5) s = 2;
            
            // Penalty for hints
            if (hintsUsed.length > 0) s = Math.max(1, s - hintsUsed.length);
            setStars(s);

            if (window.confetti) {
              setTimeout(() => { window.confetti({ particleCount: 200, spread: 160, origin: { y: 0.6 } }); }, 500);
            }
          }
        }
        setSelection(null);
      };

      const isCellSelected = (r, c) => {
        if (!selection) return false;
        const { start, end } = selection;
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
        const remainingIndices = wordsToFind
          .map((w, i) => i)
          .filter(i => !foundWords.some(fw => fw.word === wordsToFind[i].word) && !hintsUsed.includes(i));
        
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

      return (
        <section className={`py-20 px-4 min-h-screen bg-brand-50 flex flex-col items-center ${isStandalone ? 'pt-32' : ''}`}>
          <div className="max-w-6xl w-full">
            {!gameStarted ? (
              <div className="max-w-2xl mx-auto">
                <div className="flex justify-start mb-8">
                  <button 
                    onClick={() => navigateTo('cognitive')} 
                    className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors bg-white px-5 py-2.5 rounded-xl shadow-sm border border-brand-100 group"
                  >
                    <Icons.ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Volver</span>
                  </button>
                </div>
                <h2 className="font-display text-4xl font-bold text-brand-900 mb-8 text-center">Sopa de Letras</h2>
                <div className="bg-white rounded-[3rem] border border-brand-100 shadow-2xl p-10 anim-scale-in text-center">
                  <div className="text-6xl mb-6">🔍</div>
                  <h3 className="text-2xl font-bold text-brand-900 mb-6">Selecciona la dificultad</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {WORDSEARCH_LEVELS.map((level, idx) => (
                      <button
                        key={level.id}
                        onClick={() => startGame(idx)}
                        className="group p-6 rounded-2xl border-2 border-brand-50 hover:border-brand-500 hover:bg-brand-50 transition-all flex flex-col items-center gap-2"
                      >
                        <span className="text-brand-900 font-bold text-xl">{level.name}</span>
                        <span className="text-brand-500 text-sm font-medium">Nivel {level.id}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <GameHeader 
                  title="Sopa de Letras"
                  subtitle={(
                    <>
                      <span className="bg-brand-900 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">Nivel {currentLevel.id}</span>
                      <span className="text-brand-600 font-bold uppercase tracking-widest">{currentLevel.name}</span>
                    </>
                  )}
                  onBack={() => navigateTo('cognitive')}
                  onRestart={generateGrid}
                  onLevels={() => setGameStarted(false)}
                  isStandalone={isStandalone}
                />

                <div className="flex flex-col lg:flex-row gap-8 items-start justify-center mb-24">
                  <div 
                    className="bg-white p-3 rounded-3xl shadow-2xl border-8 border-brand-100 select-none touch-none grid gap-1 w-full max-w-[420px] relative"
                    style={{ gridTemplateColumns: `repeat(${currentLevel.cols}, minmax(0, 1fr))` }}
                    onMouseDown={handleStart} onMouseMove={handleMove} onMouseUp={handleEnd} onMouseLeave={handleEnd}
                    onTouchStart={handleStart} onTouchMove={handleMove} onTouchEnd={handleEnd}
                  >
                    {grid.map((row, r) => row.map((letter, c) => {
                      const selected = isCellSelected(r, c);
                      const found = isCellFound(r, c);
                      const hinted = isCellHinted(r, c);
                      return (
                        <div key={`${r}-${c}`} data-r={r} data-c={c}
                          className={`flex items-center justify-center aspect-square text-base min-[380px]:text-lg sm:text-2xl font-bold rounded-lg transition-all duration-200
                            ${found ? 'bg-emerald-500 text-white shadow-sm scale-95' : 
                              selected ? 'bg-brand-600 text-white shadow-lg scale-105 z-10' : 
                              hinted ? 'bg-amber-100 text-amber-700 border-2 border-amber-400 animate-pulse' : 'text-brand-900 hover:bg-brand-50'}`}
                        >
                          {letter}
                        </div>
                      );
                    }))}
                  </div>

                  <div className="flex flex-col gap-6 w-full lg:max-w-[320px]">
                    <div className="bg-white p-6 rounded-3xl shadow-xl border border-brand-100">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display text-xl font-bold text-brand-900 flex items-center gap-2">Ayudas</h3>
                        <span className="text-brand-500 font-bold">{currentLevel.hints - hintsUsed.length} restantes</span>
                      </div>
                      <button 
                        onClick={useHint}
                        disabled={hintsUsed.length >= currentLevel.hints || gameStatus !== 'playing'}
                        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                          ${hintsUsed.length >= currentLevel.hints ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-amber-100 text-amber-700 hover:bg-amber-200 active:scale-95'}`}
                      >
                        <Icons.Lightbulb /> Pedir Pista
                      </button>
                    </div>

                    <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-brand-100 flex-1">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-display text-2xl font-bold text-brand-900 flex items-center gap-2"><Icons.List /> Palabras</h3>
                        <span className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm font-bold">{foundWords.length}/{wordsToFind.length}</span>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 max-h-[350px] sm:max-h-[550px] overflow-y-auto pr-2 pb-12 custom-scrollbar">
                        {wordsToFind.map((w, i) => (
                          <div key={i} className={`text-base font-semibold py-2 px-3 rounded-xl transition-all duration-300 border ${foundWords.some(fw => fw.word === w.word) ? 'text-emerald-700 line-through bg-emerald-50 border-emerald-100' : 'text-brand-700 bg-white border-brand-50 shadow-sm'}`}>{w.word}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {gameStatus === 'won' && (
                  <div className="fixed inset-0 z-[60] bg-brand-900/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-10 shadow-2xl max-w-sm w-full text-center anim-scale-in border border-brand-100">
                      <div className="text-7xl mb-6">🔍✨</div>
                      <h3 className="text-3xl font-bold text-brand-900 mb-2">¡Nivel Completado!</h3>
                      
                      <StarRating stars={stars} />
                      
                      <p className="text-xl text-gray-600 mb-6">Has encontrado todo en <span className="font-bold text-brand-700">{timeElapsed}s</span>.</p>
                      
                      <ShareButtons game="Sopa de Letras" time={timeElapsed} />
                      
                      <div className="flex flex-col gap-3 mt-8">
                        <button onClick={() => setGameStarted(false)} className="w-full py-3 bg-brand-100 text-brand-700 rounded-xl font-bold hover:bg-brand-200 transition-all">Cambiar Nivel</button>
                        <button onClick={nextLevel} className="w-full py-4 bg-brand-900 text-white rounded-xl font-bold text-xl hover:bg-brand-800 shadow-lg transition-all btn-pulse">
                          {levelIdx < WORDSEARCH_LEVELS.length - 1 ? 'Siguiente Nivel' : 'Reiniciar Desafío'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      );
    };

    // --- SECTION MATH GAME ---

    const SectionMathGame = function SectionMathGame({ isStandalone, navigateTo }) {
      const { useState, useEffect, useCallback, useRef } = React;
      
      const LEVELS = [
        { id: 1, name: 'Básico', ops: ['+', '-'], range: 10, count: 10 },
        { id: 2, name: 'Intermedio', ops: ['+', '-'], range: 50, count: 10 },
        { id: 3, name: 'Tablas', ops: ['*'], range: 10, count: 10 },
        { id: 4, name: 'Avanzado', ops: ['+', '-', '*'], range: 20, count: 10 },
        { id: 5, name: 'Experto', ops: ['+', '-', '*'], range: 50, count: 10 }
      ];

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

      const generateQuestions = useCallback((lvlIdx) => {
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
          newQs.push({ q, ans });
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

      const startGame = (idx) => {
        setLevelIdx(idx);
        setGameStarted(true);
      };

      const checkAnswer = (val) => {
        if (gameStatus !== 'playing' || feedback) return false;
        const target = questions[currentQIdx].ans;
        const correct = parseInt(val) === target;
        
        if (correct) {
          setFeedback('correct');
          if (window.confetti) {
             window.confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 }, colors: ['#10b981'] });
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
              if (t < baseTime * 0.6) s = 5;
              else if (t < baseTime * 0.9) s = 4;
              else if (t > baseTime * 1.5) s = 2;
              setStars(s);

              if (window.confetti) window.confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
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

      const handleSubmit = (e) => {
        if (e) e.preventDefault();
      };

      const nextLevel = () => {
        if (levelIdx < LEVELS.length - 1) {
          setLevelIdx(levelIdx + 1);
        } else {
          setLevelIdx(0);
        }
      };

      return (
        <section className={`py-20 px-4 min-h-screen bg-brand-50 flex flex-col items-center ${isStandalone ? 'pt-32' : ''}`}>
          <div className="max-w-xl w-full text-center">
            {!gameStarted ? (
              <div className="max-w-2xl mx-auto">
                <div className="flex justify-start mb-8">
                  <button 
                    onClick={() => navigateTo('cognitive')} 
                    className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors bg-white px-5 py-2.5 rounded-xl shadow-sm border border-brand-100 group"
                  >
                    <Icons.ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Volver</span>
                  </button>
                </div>
                <h2 className="font-display text-4xl font-bold text-brand-900 mb-8">Cálculo Mental</h2>
                <div className="bg-white rounded-[3rem] border border-brand-100 shadow-2xl p-10 anim-scale-in">
                  <div className="text-6xl mb-6">🧮</div>
                  <h3 className="text-2xl font-bold text-brand-900 mb-6">Selecciona la dificultad</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {LEVELS.map((level, idx) => (
                      <button
                        key={level.id}
                        onClick={() => startGame(idx)}
                        className="group p-5 rounded-2xl border-2 border-brand-50 hover:border-brand-500 hover:bg-brand-50 transition-all flex items-center justify-between px-8"
                      >
                        <div className="text-left">
                          <span className="text-brand-900 font-bold text-xl block">{level.name}</span>
                          <span className="text-brand-500 text-sm font-medium">Operaciones: {level.ops.join(', ')}</span>
                        </div>
                        <Icons.ArrowRight className="text-brand-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <GameHeader 
                  title="Cálculo Mental"
                  subtitle={(
                    <>
                      <span className="bg-brand-900 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">Nivel {levelIdx + 1}</span>
                      <span className="text-brand-600 font-bold uppercase tracking-widest">{LEVELS[levelIdx].name}</span>
                    </>
                  )}
                  onBack={() => navigateTo('cognitive')}
                  onRestart={() => generateQuestions(levelIdx)}
                  onLevels={() => setGameStarted(false)}
                  isStandalone={isStandalone}
                />

                <div className="bg-white rounded-[3rem] shadow-2xl border-8 border-brand-100 p-8 sm:p-12 relative overflow-hidden">
                  {gameStatus === 'playing' ? (
                    <div className="space-y-8">
                      <div className="flex justify-between items-center px-4 mb-4">
                        <span className="text-brand-400 font-bold">Pregunta {currentQIdx + 1} de {questions.length}</span>
                        <div className="w-32 h-2 bg-brand-100 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-600 transition-all duration-500" style={{ width: `${(currentQIdx / questions.length) * 100}%` }}></div>
                        </div>
                      </div>

                      <div className="py-8">
                        <div className={`text-6xl sm:text-8xl font-display font-bold text-brand-900 transition-all duration-300 ${feedback === 'correct' ? 'text-emerald-500 scale-110' : feedback === 'wrong' ? 'text-red-500 animate-shake' : ''}`}>
                          {questions[currentQIdx]?.q}
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="relative max-w-[240px] mx-auto">
                        <input
                          type="number"
                          autoFocus
                          value={userAnswer}
                          onChange={(e) => {
                            setUserAnswer(e.target.value);
                            checkAnswer(e.target.value);
                          }}
                          placeholder="?"
                          className={`w-full text-center text-5xl font-bold py-4 rounded-2xl border-4 transition-all focus:outline-none
                            ${feedback === 'correct' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 
                              feedback === 'wrong' ? 'border-red-500 bg-red-50 text-red-700' : 
                              'border-brand-200 focus:border-brand-600 bg-white text-brand-900'}`}
                        />
                        <button type="submit" className="hidden">Enviar</button>
                      </form>
                      
                      <p className="text-brand-400 text-sm font-medium">La respuesta se validará automáticamente</p>
                    </div>
                  ) : (
                    <div className="text-center py-8 anim-scale-in">
                      <div className="text-7xl mb-6">🧮✨</div>
                      <h3 className="text-3xl font-bold text-brand-900 mb-2">¡Nivel Completado!</h3>
                      
                      <StarRating stars={stars} />
                      
                      <p className="text-xl text-gray-600 mb-6">Has resuelto todo en <span className="font-bold text-brand-700">{totalTime}s</span>.</p>
                      
                      <ShareButtons game="Cálculo Mental" time={totalTime} />
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                        <button onClick={nextLevel} className="px-10 py-5 bg-brand-900 text-white rounded-2xl font-bold text-xl hover:bg-brand-800 shadow-xl transition-all btn-pulse">
                          {levelIdx < LEVELS.length - 1 ? 'Siguiente Nivel' : 'Reiniciar Desafío'}
                        </button>
                        <button onClick={() => setGameStarted(false)} className="px-8 py-4 bg-brand-100 text-brand-700 rounded-2xl font-bold text-lg hover:bg-brand-200 transition-all">Cambiar nivel</button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      );
    };

    // --- SECTION ORDER GAME ---

    const SectionOrderGame = function SectionOrderGame({ isStandalone, navigateTo }) {
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
        const nums = Array.from({ length: currentLevel.count }, (_, i) => i + 1);
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

      const startGame = (idx) => {
        setLevelIndex(idx);
        setGameStarted(true);
      };

      // Cleanup
      React.useEffect(() => {
        return () => { if (hintTimerRef.current) clearTimeout(hintTimerRef.current); };
      }, []);

      React.useEffect(() => {
        initLevel();
      }, [initLevel]);

      const handleNumberClick = (num) => {
        if (status !== 'playing') return;
        if (num === nextNumber) {
          if (num === currentLevel.count) {
            setStatus('won');
            const timeTaken = (Date.now() - startTime) / 1000;
            setFinalTime(timeTaken.toFixed(2));
            
            // Star logic for Order
            const baseTime = currentLevel.count * 1.5; // 1.5s per number average
            let s = 3;
            if (timeTaken < baseTime * 0.5) s = 5;
            else if (timeTaken < baseTime * 0.7) s = 4;
            else if (timeTaken > baseTime * 1.5) s = 2;
            setStars(s);

            if (window.confetti) window.confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
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

      return (
        <section className={`py-20 px-4 min-h-screen bg-brand-50 flex flex-col items-center ${isStandalone ? 'pt-32' : ''}`}>
          <div className="max-w-4xl w-full text-center">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
              <button 
                onClick={() => navigateTo('cognitive')} 
                className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors bg-white px-5 py-2.5 rounded-xl shadow-sm border border-brand-100 group"
              >
                <Icons.ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Volver</span>
              </button>
              {isStandalone && (
                <button onClick={() => window.close()} className="text-brand-400 text-sm font-bold hover:text-brand-600 transition-colors">
                  Cerrar App
                </button>
              )}
            </div>

            {!gameStarted ? (
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="font-display text-4xl font-bold text-brand-900 mb-8">Juego de Orden</h2>
                <div className="bg-white rounded-[3rem] border border-brand-100 shadow-2xl p-10 anim-scale-in">
                  <div className="text-6xl mb-6">🔢</div>
                  <h3 className="text-2xl font-bold text-brand-900 mb-6">Selecciona la dificultad</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ORDER_LEVELS.map((level, idx) => (
                      <button
                        key={level.id}
                        onClick={() => startGame(idx)}
                        className="group p-6 rounded-2xl border-2 border-brand-50 hover:border-brand-500 hover:bg-brand-50 transition-all flex flex-col items-center gap-2"
                      >
                        <span className="text-brand-900 font-bold text-xl">Nivel {level.id}</span>
                        <span className="text-brand-500 text-sm font-medium">Encontrar {level.count} números</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <GameHeader 
                  title="En Orden"
                  subtitle={<p className="text-brand-600 font-bold mb-0 uppercase tracking-widest">Nivel {currentLevel.id}: Encuentra del 1 al {currentLevel.count}</p>}
                  onBack={() => navigateTo('cognitive')}
                  onRestart={initLevel}
                  onLevels={() => setGameStarted(false)}
                  isStandalone={isStandalone}
                />

                {status === 'won' ? (
                  <div className="bg-white rounded-3xl p-10 shadow-2xl anim-scale-in border border-brand-100 max-w-2xl mx-auto">
                    <div className="text-6xl mb-6">🏆✨</div>
                    <h3 className="text-3xl font-bold text-brand-900 mb-2">¡Nivel Completado!</h3>
                    
                    <StarRating stars={stars} />
                    
                    <p className="text-xl text-gray-600 mb-6">Has ordenado todo en <span className="font-bold text-brand-700">{finalTime}s</span>.</p>
                    
                    <ShareButtons game="Juego de Orden" time={finalTime} />
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                      <button onClick={() => setGameStarted(false)} className="px-8 py-3 bg-brand-100 text-brand-700 font-bold rounded-xl hover:bg-brand-200 transition-all">Cambiar Nivel</button>
                      <button onClick={nextLevel} className="px-8 py-3 bg-brand-900 text-white font-bold rounded-xl hover:bg-brand-800 shadow-lg transition-all btn-pulse">
                        {levelIndex < ORDER_LEVELS.length - 1 ? 'Siguiente Nivel' : 'Reiniciar Desafío'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={`grid ${currentLevel.cols} gap-3 sm:gap-4 max-w-2xl mx-auto`}>
                    {numbers.map((num) => {
                      const isPast = num < nextNumber;
                      const isCurrent = num === nextNumber;
                      return (
                        <button
                          key={num}
                          onClick={() => handleNumberClick(num)}
                          className={`aspect-square flex items-center justify-center text-xl sm:text-2xl font-bold rounded-2xl transition-all
                            ${isPast ? 'bg-emerald-500 text-white shadow-inner opacity-50 scale-95 pointer-events-none' : 
                              isCurrent && showHint ? 'bg-white text-brand-900 shadow-lg border-4 border-brand-400 target-number' : 
                              'bg-white text-brand-700 hover:border-brand-200 border-2 border-brand-50 hover:shadow-md active:scale-95 active:bg-red-50'}`}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      );
    };

    // --- SECTION DAILY CHALLENGE ---

    const SectionDailyChallenge = function SectionDailyChallenge({ isStandalone, navigateTo }) {
      const { useState, useEffect, useCallback, useMemo, useRef } = React;
      
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
        return ((d + 6) % 7) + 1;
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

            window.firebaseSetDoc(docRef, completionPayload, { merge: true })
              .catch(err => console.error("Cloud sync failed on completion", err));
          }
        }
        
        const finalT = (Date.now() - startTime) / 1000;
        setTotalTime(finalT.toFixed(0));

        // Star calculation for the whole challenge
        const baseThreshold = 50 + (difficultyFactor * 5);
        let s = 3;
        if (finalT < baseThreshold * 0.7) s = 5;
        else if (finalT < baseThreshold) s = 4;
        else if (finalT > baseThreshold * 1.5) s = 2;
        setStars(s);

        setStep(4);
        if (window.confetti) {
          window.confetti({ particleCount: 200, spread: 160, origin: { y: 0.6 } });
          
          // Extra celebration for milestones
          if (newStreak >= 7) {
            setTimeout(() => {
              window.confetti({ 
                particleCount: 300, 
                spread: 200, 
                origin: { y: 0.5 }, 
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
                origin: { y: 0.4 }
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
              }, { merge: true });
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
      const MathSubGame = ({ onComplete }) => {
        const [qIdx, setQIdx] = useState(0);
        const [ans, setAns] = useState('');
        const [feedback, setFeedback] = useState(null);
        const count = 5 + Math.floor(difficultyFactor / 2);
        const range = difficultyFactor * 10;
        
        const qData = useMemo(() => {
          const qs = [];
          for(let i=0; i<count; i++){
            const a = Math.floor(Math.random() * range) + 1;
            const b = Math.floor(Math.random() * range) + 1;
            qs.push({ q: `${a} + ${b}`, a: a + b });
          }
          return qs;
        }, [count, range]);

        const checkAnswer = (val) => {
          if (feedback) return false;
          const target = qData[qIdx].a;
          if(parseInt(val) === target) {
            setFeedback('correct');
            setTimeout(() => {
              if(qIdx < count - 1) {
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

        const submit = (e) => {
          if(e) e.preventDefault();
          if(!checkAnswer(ans)) {
            setFeedback('wrong');
            setTimeout(() => setFeedback(null), 800);
          }
        };

        return (
          <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-8 border-brand-100 anim-scale-in max-w-lg mx-auto w-full text-center">
            <span className="text-brand-400 font-bold uppercase tracking-widest text-sm mb-4 block">Reto: Cálculo</span>
            <div className="text-6xl font-bold text-brand-900 mb-8 py-4">{qData[qIdx].q}</div>
            <form onSubmit={submit}>
              <input type="number" autoFocus value={ans} 
                onChange={e => {
                  setAns(e.target.value);
                  checkAnswer(e.target.value);
                }} 
                placeholder="?" 
                className={`w-full text-center text-4xl font-bold py-4 rounded-2xl border-4 transition-all focus:outline-none ${feedback === 'correct' ? 'border-emerald-500 bg-emerald-50' : feedback === 'wrong' ? 'border-red-500 bg-red-50' : 'border-brand-200 focus:border-brand-600'}`} 
              />
            </form>
          </div>
        );
      };

      // Game 2: Mini Order
      const OrderSubGame = ({ onComplete }) => {
        const count = 6 + difficultyFactor;
        const [next, setNext] = useState(1);
        const [nums, setNums] = useState([]);
        
        useEffect(() => {
          const n = Array.from({ length: count }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
          setNums(n);
        }, [count]);

        const click = (n) => {
          if (n === next) {
            if (n === count) onComplete();
            else setNext(next + 1);
          }
        };

        return (
          <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-8 border-brand-100 anim-scale-in max-w-lg mx-auto w-full text-center">
            <span className="text-brand-400 font-bold uppercase tracking-widest text-sm mb-4 block">Reto: Orden Numérico</span>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {nums.map(n => (
                <button key={n} onClick={() => click(n)} 
                  className={`aspect-square flex items-center justify-center text-xl font-bold rounded-xl transition-all ${n < next ? 'bg-emerald-500 text-white opacity-50 scale-90' : 'bg-white border-2 border-brand-100 text-brand-900 shadow-sm'}`}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="text-brand-400 text-sm">Pulsa los números en orden del 1 al {count}</p>
          </div>
        );
      };

      // Game 3: Mini Visual
      const VisualSubGame = ({ onComplete }) => {
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

        const handleCorrect = (i) => {
          if (i === targetIdx) {
            setFoundIdx(i);
            setTimeout(onComplete, 500);
          }
        };

        return (
          <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-8 border-brand-100 anim-scale-in max-w-lg mx-auto w-full text-center">
            <span className="text-brand-400 font-bold uppercase tracking-widest text-sm mb-4 block">Reto: Agudeza Visual</span>
            <h3 className="text-xl font-bold text-brand-900 mb-6">Busca la letra <span className="text-accent-coral text-3xl mx-2">{targetChar}</span></h3>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
              {grid.map((l, i) => (
                <button key={i} onClick={() => handleCorrect(i)} 
                  className={`aspect-square rounded-lg flex items-center justify-center text-xl font-bold transition-all duration-200
                    ${foundIdx === i ? 'bg-emerald-500 text-white scale-110' : 'bg-brand-50 text-brand-700 hover:bg-brand-100 active:bg-brand-200'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        );
      };

      // Game 4: Mini Memory
      const MemorySubGame = ({ onComplete }) => {
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

        const handleFlip = (index) => {
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

        return (
          <div className="bg-white rounded-[3rem] p-8 shadow-2xl border-8 border-brand-100 anim-scale-in max-w-lg mx-auto w-full text-center">
            <span className="text-brand-400 font-bold uppercase tracking-widest text-sm mb-4 block">Reto: Memoria</span>
            <div className="grid grid-cols-3 gap-3">
              {cards.map((card, i) => (
                <div key={card.id} onClick={() => handleFlip(i)} className={`relative aspect-square cursor-pointer transition-all duration-500 preserve-3d ${flipped.includes(i) || matched.includes(card.name) ? 'rotate-y-180' : ''}`}>
                  <div className="absolute inset-0 bg-brand-100 rounded-2xl flex items-center justify-center border-2 border-brand-200 backface-hidden text-2xl font-bold text-brand-300">?</div>
                  <div className="absolute inset-0 bg-white border-4 border-brand-400 rounded-2xl flex items-center justify-center rotate-y-180 backface-hidden text-3xl shadow-md">{card.icon}</div>
                </div>
              ))}
            </div>
            <p className="text-brand-400 text-sm mt-6">Encuentra las {pairsCount} parejas</p>
          </div>
        );
      };

      // Game 5: Mini WordSearch
      const WordSearchSubGame = ({ onComplete }) => {
        const size = 8;
        const [grid, setGrid] = useState([]);
        const [wordsToFind, setWordsToFind] = useState([]);
        const [foundWords, setFoundWords] = useState([]);
        const [selection, setSelection] = useState(null);
        const pool = ['SOL', 'MAR', 'LUNA', 'CASA', 'MESA', 'ROPA', 'VIDA', 'PAZ', 'LUZ', 'AGUA', 'RADIO', 'RELOJ', 'PAN', 'SAL', 'FUEGO', 'AIRE', 'FLOR', 'TIEMPO', 'LUZ', 'MANO'];

        useEffect(() => {
          const selected = pool.sort(() => Math.random() - 0.5).slice(0, 3 + Math.floor(difficultyFactor/3));
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
              for(let i=0; i<word.length; i++) {
                const rr = isVert ? r+i : r;
                const cc = isVert ? c : c+i;
                if(newGrid[rr][cc] !== '' && newGrid[rr][cc] !== word[i]) {
                  fits = false;
                  break;
                }
              }
              
              if(fits) {
                const cells = [];
                for(let i=0; i<word.length; i++) {
                  const rr = isVert ? r+i : r;
                  const cc = isVert ? c : c+i;
                  newGrid[rr][cc] = word[i];
                  cells.push({r: rr, c: cc});
                }
                placed.push({word, cells});
                success = true;
              }
            }
          });
          
          const letters = 'ABCDE';
          for(let r=0; r<size; r++) {
            for(let c=0; c<size; c++) {
              if(newGrid[r][c] === '') newGrid[r][c] = letters[Math.floor(Math.random() * letters.length)];
            }
          }
          setGrid(newGrid);
          setWordsToFind(placed);
          setFoundWords([]);
        }, [difficultyFactor]);

        const getCellFromEvent = (e) => {
          const touch = e.touches ? e.touches[0] : e;
          const target = document.elementFromPoint(touch.clientX, touch.clientY);
          if (target && target.dataset.r !== undefined) {
            return { r: parseInt(target.dataset.r), c: parseInt(target.dataset.c) };
          }
          return null;
        };

        const handleStart = (e) => {
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
            setSelection({ start: cell, end: cell, isDragging: true });
          }
        };

        const handleMove = (e) => {
          if (!selection || !selection.isDragging) return;
          const cell = getCellFromEvent(e);
          if (cell) {
            const dr = Math.abs(cell.r - selection.start.r);
            const dc = Math.abs(cell.c - selection.start.c);
            if (dr === 0 || dc === 0 || dr === dc) {
              setSelection(prev => ({ ...prev, end: cell }));
            }
          }
        };

        const handleEnd = () => {
          if (!selection) return;
          if (selection.isDragging) {
            if (selection.start.r === selection.end.r && selection.start.c === selection.end.c) {
              setSelection({ ...selection, isDragging: false, isFirstClick: true });
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
              if (window.confetti) window.confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
              setTimeout(onComplete, 800);
            }
          } else {
            setSelection(null); // Clear if no match
          }
        };

        const isCellSelected = (r, c) => {
          if (!selection) return false;
          const { start, end } = selection;
          const dr = Math.sign(end.r - start.r);
          const dc = Math.sign(end.c - start.c);
          const len = Math.max(Math.abs(end.r - start.r), Math.abs(end.c - start.c)) + 1;
          for (let i = 0; i < len; i++) {
            if (start.r + i * dr === r && start.c + i * dc === c) return true;
          }
          return false;
        };

        const isCellFound = (r, c) => foundWords.some(fw => fw.cells.some(cell => cell.r === r && cell.c === c));

        return (
          <div className="bg-white rounded-[3rem] p-6 sm:p-8 shadow-2xl border-8 border-brand-100 anim-scale-in max-w-lg mx-auto w-full text-center select-none touch-none">
            <span className="text-brand-400 font-bold uppercase tracking-widest text-sm mb-4 block">Reto: Rastreo</span>
            <div 
              className="grid grid-cols-8 gap-1 mb-6 bg-brand-50 p-2 rounded-2xl border border-brand-100 cursor-pointer"
              onMouseDown={handleStart} onMouseMove={handleMove} onMouseUp={handleEnd} onMouseLeave={handleEnd}
              onTouchStart={handleStart} onTouchMove={handleMove} onTouchEnd={handleEnd}
            >
              {grid.map((row, r) => row.map((char, c) => {
                const selected = isCellSelected(r, c);
                const found = isCellFound(r, c);
                return (
                  <div key={`${r}-${c}`} data-r={r} data-c={c}
                    className={`aspect-square flex items-center justify-center text-sm sm:text-base font-bold rounded-md transition-all duration-150
                      ${found ? 'bg-emerald-500 text-white shadow-sm' : selected ? 'bg-brand-600 text-white shadow-md scale-105 z-10' : 'text-brand-900 bg-white shadow-sm hover:bg-brand-50'}`}
                  >
                    {char}
                  </div>
                );
              }))}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {wordsToFind.map(w => (
                <div key={w.word} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${foundWords.some(fw => fw.word === w.word) ? 'bg-emerald-100 text-emerald-700 line-through' : 'bg-brand-100 text-brand-700'}`}>{w.word}</div>
              ))}
            </div>
            <p className="text-[10px] text-brand-400 mt-6 font-bold">Desliza sobre las letras para marcar las palabras</p>
          </div>
        );
      };

      // Game 6: Mini Intruder
      const IntruderSubGame = ({ onComplete }) => {
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

        const handleSelect = (idx) => {
          if (correctIdx !== null) return;
          if (idx === targetIdx) {
            setCorrectIdx(idx);
            setTimeout(onComplete, 800);
          }
        };

        return (
          <div className="bg-white rounded-[3rem] p-8 shadow-2xl border-8 border-brand-100 anim-scale-in max-w-lg mx-auto w-full text-center">
            <span className="text-brand-400 font-bold uppercase tracking-widest text-sm mb-4 block">Reto: Razonamiento</span>
            <h3 className="text-xl font-bold text-brand-900 mb-6">¿Cuál NO pertenece al grupo?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {items.map((item, i) => (
                <button key={i} onClick={() => handleSelect(i)} 
                  className={`aspect-square flex items-center justify-center text-5xl rounded-2xl transition-all duration-300
                    ${correctIdx === i ? 'bg-emerald-500 text-white scale-110 shadow-lg' : 'bg-brand-50 hover:bg-brand-100 border-2 border-brand-100 hover:border-brand-300'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        );
      };

      // Random selection logic for the daily challenge
      const dailyGames = useMemo(() => {
        const todayStr = new Date().toISOString().split('T')[0];
        let seed = 0;
        for (let i = 0; i < todayStr.length; i++) seed += todayStr.charCodeAt(i);
        
        const pool = ['math', 'order', 'visual', 'memory', 'wordsearch', 'intruder'];
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
        switch(gameId) {
          case 'math': return <MathSubGame onComplete={onComplete} />;
          case 'order': return <OrderSubGame onComplete={onComplete} />;
          case 'visual': return <VisualSubGame onComplete={onComplete} />;
          case 'memory': return <MemorySubGame onComplete={onComplete} />;
          case 'wordsearch': return <WordSearchSubGame onComplete={onComplete} />;
          case 'intruder': return <IntruderSubGame onComplete={onComplete} />;
          default: return null;
        }
      };

      return (
        <section className={`pt-36 pb-20 px-4 min-h-screen bg-brand-50 flex flex-col items-center ${isStandalone ? 'pt-36' : ''}`}>
          <div className="max-w-4xl w-full">
            <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-3 mb-8 sm:mb-12">
              <button onClick={() => navigateTo('cognitive')} className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors bg-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-sm border border-brand-100 group text-sm sm:text-base">
                <Icons.ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Volver</span>
              </button>
              <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-6">
                <div 
                  onClick={() => setIsCalendarOpen(true)}
                  className="flex items-center gap-1.5 sm:gap-2 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl shadow-sm border border-brand-100 cursor-pointer hover:opacity-85 transition-opacity"
                  title="Ver calendario de racha"
                >
                  <Icons.Flame className="text-accent-coral w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="font-bold text-brand-900 text-sm sm:text-base">{streak} días</span>
                </div>
                {alreadyDoneToday && (
                  <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-600 font-bold bg-emerald-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl border border-emerald-100 text-xs sm:text-base">
                    <Icons.CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="whitespace-nowrap">¡Hoy Completado!</span>
                  </div>
                )}
              </div>
            </div>

            {step === 0 ? (
              <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-brand-100 text-center anim-scale-in max-w-2xl mx-auto">
                <div className="relative h-48 sm:h-64 rounded-[2.5rem] overflow-hidden mb-8 shadow-xl border-4 border-white anim-float">
                  <img src="daily_challenge_hero.jpg" className="w-full h-full object-cover" alt="Reto Diario" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 to-transparent"></div>
                </div>
                <h2 className="font-display text-4xl font-bold text-brand-900 mb-6 uppercase tracking-tight">Reto Diario IAdapta</h2>
                <p className="text-xl text-brand-600 mb-6 leading-relaxed">Completa los 3 ejercicios de hoy para mantener tu racha. Hoy es <span className="font-bold text-brand-900 underline decoration-accent-coral decoration-4 underline-offset-4">{new Intl.DateTimeFormat('es-ES', { weekday: 'long' }).format(new Date())}</span>, la dificultad es de <span className="font-bold text-brand-900">{difficultyFactor}/7</span>.</p>
                
                {/* Bloque de Inicio de Sesión / Confirmación */}
                <div className="mb-8 flex justify-center">
                  {!linkedEmail ? (
                    <button 
                      onClick={() => setIsCalendarOpen(true)}
                      className="px-6 py-3.5 bg-brand-50 hover:bg-brand-100 text-brand-900 border border-brand-200 rounded-2xl font-bold text-sm shadow-sm transition-all hover:scale-102 active:scale-98 flex items-center gap-2.5 group"
                    >
                      <Icons.User className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
                      <span>Iniciar sesión / Registrarse</span>
                    </button>
                  ) : (
                    <div className="px-5 py-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-2.5 shadow-sm anim-scale-in">
                      <Icons.CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-bold text-emerald-800">Sesión iniciada: <span className="underline decoration-emerald-500/30">{linkedEmail}</span></span>
                      <button 
                        onClick={() => setIsCalendarOpen(true)}
                        className="ml-3 px-3 py-1 bg-white hover:bg-brand-50 text-brand-900 border border-brand-100 rounded-lg text-xs font-bold transition-all"
                      >
                        Gestionar
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-10">
                  {dailyGames.map((g, i) => (
                    <div key={i} className="bg-brand-50 p-4 rounded-2xl border border-brand-100">
                      <p className="text-[10px] text-brand-400 font-bold uppercase mb-1">Juego {i+1}</p>
                      <p className="text-xs font-bold text-brand-900">{g === 'math' ? 'Cálculo' : g === 'order' ? 'Orden' : g === 'visual' ? 'Agudeza' : g === 'memory' ? 'Memoria' : g === 'wordsearch' ? 'Rastreo' : g === 'intruder' ? 'Intruso' : 'Juego'}</p>
                    </div>
                  ))}
                </div>

                <button onClick={startChallenge} className="w-full sm:w-auto px-12 py-5 bg-brand-900 text-white rounded-2xl font-bold text-2xl hover:bg-brand-800 shadow-xl transition-all hover:scale-105 active:scale-95 btn-pulse">
                  Empezar Desafío
                </button>
              </div>
            ) : step >= 1 && step <= 3 ? (
              <div className="w-full">
                <div className="max-w-lg mx-auto mb-6 flex justify-between items-center px-4">
                  <div className="flex gap-2">
                    {[1, 2, 3].map(s => (
                      <div key={s} className={`w-3 h-3 rounded-full ${step >= s ? 'bg-brand-900' : 'bg-brand-200'}`}></div>
                    ))}
                  </div>
                  <span className="text-brand-400 font-bold text-xs uppercase tracking-widest">Paso {step} de 3</span>
                </div>
                {renderCurrentGame(dailyGames[step-1], () => {
                  if (step < 3) setStep(step + 1);
                  else completeChallenge();
                })}
              </div>
            ) : (
              <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-brand-100 text-center anim-scale-in max-w-2xl mx-auto">
                <div className="text-7xl mb-6">🏆✨</div>
                <h2 className="font-display text-4xl font-bold text-brand-900 mb-2">¡Reto Completado!</h2>
                <p className="text-emerald-600 font-bold mb-4 uppercase tracking-widest">Día superado con éxito</p>
                <StarRating stars={stars} />
                
                {streak >= 7 && (
                  <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mb-8 anim-scale-in">
                    <p className="text-amber-600 font-bold text-xl mb-1">
                      {streak >= 30 ? '¡MAESTRO DE LA MENTE! 👑' : streak >= 20 ? '¡HÁBITO DE ACERO! 💪' : '¡SEMANA PERFECTA! ⭐'}
                    </p>
                    <p className="text-amber-800 italic">
                      {streak >= 30 ? 'Has alcanzado los 30 días. ¡Tu agudeza mental está en otro nivel!' : 
                       streak >= 20 ? 'Casi un mes de constancia. Estás transformando tu cerebro día a día.' : 
                       'Una semana completa de entrenamiento. ¡Tu constancia es admirable!'}
                    </p>
                  </div>
                )}

                <div 
                  onClick={() => setIsCalendarOpen(true)}
                  className="bg-brand-50 rounded-2xl p-4 mb-8 inline-flex items-center gap-3 border border-brand-100 cursor-pointer hover:opacity-85 transition-opacity"
                  title="Ver calendario de racha"
                >
                  <div className="w-12 h-12 bg-accent-coral text-white rounded-xl flex items-center justify-center text-2xl shadow-lg animate-bounce">
                    <Icons.Flame />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-brand-400 uppercase leading-none mb-1 flex items-center gap-1">
                      Tu racha actual
                      <Icons.Calendar className="w-3 h-3 text-brand-400" />
                    </p>
                    <p className="text-2xl font-bold text-brand-900">{streak} días seguidos</p>
                  </div>
                </div>

                {streak >= 3 && !hasPromptedNotif && !localStorage.getItem('daily_challenge_notifications_enabled') && (
                  <div className="bg-brand-50 border border-brand-100 rounded-3xl p-6 mb-8 text-left anim-scale-in max-w-xl mx-auto">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white border border-brand-100 rounded-2xl flex items-center justify-center text-brand-900 text-2xl flex-shrink-0 shadow-sm animate-pulse">
                        🔔
                      </div>
                      <div className="flex-1">
                        <h4 className="font-display font-bold text-lg text-brand-900 mb-1">¡Mantén tu racha de {streak} días! 🏆</h4>
                        <p className="text-xs text-brand-600 mb-4 leading-relaxed">Llevas una constancia estupenda. ¿Quieres recibir un aviso discreto en este dispositivo si se te olvida entrenar algún día?</p>
                        <div className="flex gap-3">
                          <button 
                            onClick={enableNotifications} 
                            className="px-4 py-2 bg-brand-900 text-white rounded-xl font-bold text-xs hover:bg-brand-800 transition-all cursor-pointer"
                          >
                            Sí, avisarme
                          </button>
                          <button 
                            onClick={declineNotifications} 
                            className="px-4 py-2 bg-white border border-brand-200 text-brand-700 rounded-xl font-bold text-xs hover:bg-brand-50 transition-all cursor-pointer"
                          >
                            No, gracias
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div 
                    onClick={() => setIsCalendarOpen(true)}
                    className="bg-brand-50 p-6 rounded-3xl border border-brand-100 cursor-pointer hover:bg-brand-100/55 transition-colors"
                    title="Ver calendario de racha"
                  >
                    <p className="text-brand-400 text-xs font-bold uppercase mb-1 flex items-center justify-center gap-1">
                      Racha Actual
                      <Icons.Calendar className="w-3 h-3 text-brand-400" />
                    </p>
                    <p className="text-4xl font-bold text-brand-900 flex items-center justify-center gap-2"><Icons.Flame className="text-accent-coral" /> {streak}</p>
                  </div>
                  <div className="bg-brand-50 p-6 rounded-3xl border border-brand-100">
                    <p className="text-brand-400 text-xs font-bold uppercase mb-1">Tiempo Total</p>
                    <p className="text-4xl font-bold text-brand-900">{totalTime}s</p>
                  </div>
                </div>

                <ShareButtons game="Reto Diario IAdapta" score={`${streak} días de racha imparable`} time={totalTime} />

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                  <button onClick={() => navigateTo('cognitive')} className="px-10 py-4 bg-brand-100 text-brand-700 rounded-xl font-bold hover:bg-brand-200 transition-all">Volver al Gimnasio</button>
                  <button onClick={() => window.location.reload()} className="px-10 py-4 bg-brand-900 text-white rounded-xl font-bold hover:bg-brand-800 shadow-lg transition-all">Cerrar</button>
                </div>

              </div>
            )}
            {/* Streak Calendar Modal */}
            <StreakCalendarModal 
              isOpen={isCalendarOpen} 
              onClose={() => setIsCalendarOpen(false)} 
              history={challengeHistory} 
            />
          </div>
        </section>
      );
    };

    // --- SECTION VISUAL GAME ---

    const SectionVisualGame = function SectionVisualGame({ isStandalone, navigateTo }) {
      const { useState, useEffect, useCallback, useMemo } = React;
      
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

      const initRound = useCallback((forcedIdx) => {
        const idx = forcedIdx !== undefined ? forcedIdx : levelIdx;
        const level = VISUAL_LEVELS[idx];
        const total = level.size * level.size;
        const tIdx = Math.floor(Math.random() * total);
        
        // Dynamic target selection to avoid mismatch and add variety
        const pairs = [
          ['A', 'V'], ['Q', 'O'], ['E', 'F'], ['M', 'N'], ['O', 'D'], 
          ['W', 'M'], ['C', 'G'], ['S', '5'], ['B', '8'], ['Z', '2'],
          ['D', '0'], ['P', 'R'], ['K', 'X'], ['U', 'V'], ['T', 'Y']
        ];
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

      const startGame = (idx) => {
        setLevelIdx(idx);
        setRound(0);
        setGameStarted(true);
        setGameStatus('playing');
        setStartTime(Date.now());
        initRound(idx);
      };

      const handleCellClick = (idx) => {
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
              if (time < baseTime * 0.6) s = 5;
              else if (time < baseTime * 0.9) s = 4;
              else if (time > baseTime * 1.5) s = 2;
              setStars(s);

              if (window.confetti) window.confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
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

      return (
        <section className={`pt-36 pb-20 px-4 min-h-screen bg-brand-50 flex flex-col items-center ${isStandalone ? 'pt-36' : ''}`}>
          <div className="max-w-4xl w-full">
            {!gameStarted ? (
              <div className="max-w-2xl mx-auto text-center">
                <div className="flex justify-start mb-8">
                  <button onClick={() => navigateTo('cognitive')} className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors bg-white px-5 py-2.5 rounded-xl shadow-sm border border-brand-100 group">
                    <Icons.ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Volver</span>
                  </button>
                </div>
                <h2 className="font-display text-4xl font-bold text-brand-900 mb-8">Agudeza Visual</h2>
                <div className="bg-white rounded-[3rem] border border-brand-100 shadow-2xl p-10 anim-scale-in">
                  <div className="text-6xl mb-6">🔍</div>
                  <h3 className="text-2xl font-bold text-brand-900 mb-6">Selecciona la dificultad</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {VISUAL_LEVELS.map((lvl, idx) => (
                      <button key={lvl.id} onClick={() => startGame(idx)} className="group p-6 rounded-2xl border-2 border-brand-50 hover:border-brand-500 hover:bg-brand-50 transition-all flex flex-col items-center gap-2">
                        <span className="text-brand-900 font-bold text-xl">{lvl.name}</span>
                        <span className="text-brand-500 text-sm font-medium">Cuadrícula {lvl.size}x{lvl.size}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <GameHeader 
                  title="Agudeza Visual"
                  subtitle={(
                    <>
                      <span className="bg-brand-900 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">Nivel {currentLevel.id}</span>
                      <span className="text-brand-600 font-bold uppercase tracking-widest">Ronda {round + 1} de {currentLevel.rounds}</span>
                    </>
                  )}
                  onBack={() => navigateTo('cognitive')}
                  onRestart={() => startGame(levelIdx)}
                  onLevels={() => setGameStarted(false)}
                  isStandalone={isStandalone}
                />

                <div className="flex flex-col items-center gap-8">
                  {gameStatus === 'playing' ? (
                    <div className="bg-white p-2 sm:p-4 rounded-3xl shadow-2xl border-4 sm:border-8 border-brand-100 w-full max-w-[500px]">
                      <div className="mb-4 sm:mb-6 text-center">
                        <p className="text-brand-600 font-bold mb-1 sm:mb-2 uppercase tracking-widest text-xs sm:text-sm">Busca el carácter diferente:</p>
                        <span className="text-accent-coral text-3xl sm:text-4xl font-bold">{currentTarget}</span>
                      </div>
                      <div className={`grid ${currentLevel.size > 10 ? 'gap-0.5 sm:gap-1' : 'gap-1.5 sm:gap-2'}`} style={{ gridTemplateColumns: `repeat(${currentLevel.size}, 1fr)` }}>
                        {grid.map((l, i) => (
                          <button key={i} onClick={() => handleCellClick(i)} 
                            className={`aspect-square rounded-md sm:rounded-lg flex items-center justify-center font-bold transition-all duration-200
                              ${currentLevel.size > 10 ? 'text-[10px] sm:text-sm' : currentLevel.size > 8 ? 'text-xs sm:text-base' : 'text-lg sm:text-xl'}
                              ${correctIdx === i ? 'bg-emerald-500 text-white scale-110 z-10' : 'bg-brand-50 text-brand-700 hover:bg-brand-200 active:scale-90'}`}
                          >
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-brand-100 text-center anim-scale-in max-w-lg w-full">
                      <div className="text-7xl mb-6">🔍✨</div>
                      <h3 className="text-3xl font-bold text-brand-900 mb-2">¡Vista de Lince!</h3>
                      <StarRating stars={stars} />
                      <p className="text-xl text-gray-600 mb-6">Has completado el nivel en <span className="font-bold text-brand-700">{finalTime}s</span>.</p>
                      <ShareButtons game="Agudeza Visual" time={finalTime} />
                      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                        <button onClick={() => setGameStarted(false)} className="px-8 py-3 bg-brand-100 text-brand-700 font-bold rounded-xl hover:bg-brand-200 transition-all">Cambiar Nivel</button>
                        <button onClick={nextLevel} className="px-8 py-3 bg-brand-900 text-white font-bold rounded-xl hover:bg-brand-800 shadow-lg transition-all btn-pulse">
                          {levelIdx < VISUAL_LEVELS.length - 1 ? 'Siguiente Nivel' : 'Volver al Inicio'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      );
    };

    // --- SECTION INTRUDER GAME ---

    const SectionIntruderGame = function SectionIntruderGame({ isStandalone, navigateTo }) {
      const { useState, useEffect, useCallback, useMemo } = React;
      
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

      const startGame = (idx) => {
        setLevelIdx(idx);
        setRound(0);
        setGameStarted(true);
        setGameStatus('playing');
        setStartTime(Date.now());
      };

      useEffect(() => {
        if (gameStarted && round === 0) initRound();
      }, [gameStarted, levelIdx, initRound]);

      const handleSelect = (idx) => {
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
              if (time < baseTime * 0.7) s = 5;
              else if (time < baseTime * 1.0) s = 4;
              else if (time > baseTime * 1.6) s = 2;
              setStars(s);

              if (window.confetti) window.confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
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

      return (
        <section className={`pt-36 pb-20 px-4 min-h-screen bg-brand-50 flex flex-col items-center ${isStandalone ? 'pt-36' : ''}`}>
          <div className="max-w-4xl w-full">
            {!gameStarted ? (
              <div className="max-w-2xl mx-auto text-center">
                <div className="flex justify-start mb-8">
                  <button onClick={() => navigateTo('cognitive')} className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors bg-white px-5 py-2.5 rounded-xl shadow-sm border border-brand-100 group">
                    <Icons.ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Volver</span>
                  </button>
                </div>
                <h2 className="font-display text-4xl font-bold text-brand-900 mb-8">El Intruso</h2>
                <div className="bg-white rounded-[3rem] border border-brand-100 shadow-2xl p-10 anim-scale-in">
                  <div className="text-6xl mb-6">🕵️‍♂️</div>
                  <h3 className="text-2xl font-bold text-brand-900 mb-6">Selecciona la dificultad</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {INTRUDER_LEVELS.map((lvl, idx) => (
                      <button key={lvl.id} onClick={() => startGame(idx)} className="group p-6 rounded-2xl border-2 border-brand-50 hover:border-brand-500 hover:bg-brand-50 transition-all flex flex-col items-center gap-2">
                        <span className="text-brand-900 font-bold text-xl">{lvl.name}</span>
                        <span className="text-brand-500 text-sm font-medium">{lvl.count} elementos - {lvl.rounds} rondas</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <GameHeader 
                  title="El Intruso"
                  subtitle={(
                    <>
                      <span className="bg-rose-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">Nivel {currentLevel.id}</span>
                      <span className="text-brand-600 font-bold uppercase tracking-widest">Ronda {round + 1} de {currentLevel.rounds}</span>
                    </>
                  )}
                  onBack={() => navigateTo('cognitive')}
                  onRestart={() => startGame(levelIdx)}
                  onLevels={() => setGameStarted(false)}
                  isStandalone={isStandalone}
                />

                <div className="flex flex-col items-center gap-8">
                  {gameStatus === 'playing' ? (
                    <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-8 border-brand-100 anim-scale-in max-w-2xl w-full text-center">
                      <h3 className="text-2xl font-bold text-brand-900 mb-8">¿Cuál es el intruso?</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {items.map((item, i) => (
                          <button key={i} onClick={() => handleSelect(i)} 
                            className={`aspect-square flex items-center justify-center text-6xl rounded-[2rem] transition-all duration-300
                              ${correctIdx === i ? 'bg-emerald-500 text-white scale-110 shadow-xl rotate-6' : 'bg-brand-50 hover:bg-brand-100 border-4 border-brand-100 hover:border-brand-300 hover:-translate-y-1'}`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-brand-100 text-center anim-scale-in max-w-xl w-full">
                      <div className="text-7xl mb-6">🎖️</div>
                      <h3 className="text-4xl font-bold text-brand-900 mb-2">¡Nivel Completado!</h3>
                      <p className="text-brand-500 font-bold uppercase tracking-widest mb-8">{currentLevel.name}</p>
                      
                      <div className="flex justify-center gap-4 mb-8">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Icons.Star key={s} className={`w-10 h-10 ${s <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                        ))}
                      </div>

                      <div className="bg-brand-50 p-8 rounded-3xl mb-8">
                        <p className="text-brand-400 text-sm font-bold uppercase mb-2">Tiempo Total</p>
                        <p className="text-5xl font-bold text-brand-900">{finalTime}s</p>
                      </div>

                      <ShareButtons game="El Intruso" time={finalTime} />

                      <div className="flex flex-col gap-3 mt-8">
                        <button onClick={nextLevel} className="w-full py-5 bg-brand-900 text-white rounded-2xl font-bold text-xl hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/20">
                          {levelIdx < INTRUDER_LEVELS.length - 1 ? 'Siguiente Nivel' : 'Finalizar'}
                        </button>
                        <button onClick={() => setGameStarted(false)} className="w-full py-4 text-brand-600 font-bold hover:bg-brand-50 rounded-xl transition-all">
                          Cambiar Dificultad
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      );
    };

    // --- SECTION SUDOKU GAME ---
    const SectionSudokuGame = function SectionSudokuGame({ isStandalone, navigateTo }) {
      const { useState, useEffect, useCallback, useMemo } = React;

      const LEVELS = useMemo(() => [
        { id: 1, name: 'Básico', clues: 49, desc: 'Ideal para empezar y mantener activa la mente' },
        { id: 2, name: 'Intermedio', clues: 36, desc: 'Un reto moderado para tu capacidad lógica' },
        { id: 3, name: 'Avanzado', clues: 27, desc: 'Para expertos en concentración y razonamiento' }
      ], []);

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

      const generateSudoku = useCallback((difficultyIdx) => {
        const base = [
          [5, 3, 4, 6, 7, 8, 9, 1, 2],
          [6, 7, 2, 1, 9, 5, 3, 4, 8],
          [1, 9, 8, 3, 4, 2, 5, 6, 7],
          [8, 5, 9, 7, 6, 1, 4, 2, 3],
          [4, 2, 6, 8, 5, 3, 7, 9, 1],
          [7, 1, 3, 9, 2, 4, 8, 5, 6],
          [9, 6, 1, 5, 3, 7, 2, 8, 4],
          [2, 8, 7, 4, 1, 9, 6, 3, 5],
          [3, 4, 5, 2, 8, 6, 1, 7, 9]
        ];

        const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const shuffledDigits = [...digits].sort(() => Math.random() - 0.5);
        const map = {};
        digits.forEach((d, i) => { map[d] = shuffledDigits[i]; });

        let grid = base.map(row => row.map(val => map[val]));

        const shuffleRows = (arr) => {
          const res = [...arr];
          const shuffleBlock = (r1, r2, r3) => {
            const block = [res[r1], res[r2], res[r3]];
            block.sort(() => Math.random() - 0.5);
            res[r1] = block[0]; res[r2] = block[1]; res[r3] = block[2];
          };
          shuffleBlock(0, 1, 2);
          shuffleBlock(3, 4, 5);
          shuffleBlock(6, 7, 8);
          return res;
        };
        grid = shuffleRows(grid);

        const transpose = (arr) => arr[0].map((_, colIdx) => arr.map(row => row[colIdx]));
        grid = transpose(grid);
        grid = shuffleRows(grid);
        grid = transpose(grid);

        if (Math.random() > 0.5) grid = transpose(grid);

        const sol = grid.map(row => [...row]);

        const visibleClues = LEVELS[difficultyIdx].clues;
        const hideCount = 81 - visibleClues;
        
        const indices = Array.from({ length: 81 }, (_, i) => i);
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

      const startGame = (idx) => {
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
          const bc = (b % 3) * 3;
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

      const inputDigit = useCallback((digit) => {
        if (gameStatus !== 'playing' || !selectedCell) return;
        const { r, c } = selectedCell;
        if (initialBoard[r][c]) return;

        const newBoard = board.map((row, ri) =>
          row.map((val, ci) => (ri === r && ci === c ? digit : val))
        );
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
            if (time < 180) s = 5;
            else if (time < 300) s = 4;
            else if (time > 480) s = 2;
          } else if (levelIdx === 1) {
            if (time < 300) s = 5;
            else if (time < 600) s = 4;
            else if (time > 900) s = 2;
          } else {
            if (time < 600) s = 5;
            else if (time < 1000) s = 4;
            else if (time > 1500) s = 2;
          }
          s = Math.max(2, s - Math.floor(hintsUsed / 2));
          setStars(s);

          if (window.confetti) window.confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        }
      }, [board, selectedCell, initialBoard, solution, gameStatus, secondsElapsed, levelIdx, hintsUsed]);

      useEffect(() => {
        const handleKeyDown = (e) => {
          if (!gameStarted || gameStatus !== 'playing' || !selectedCell) return;
          const { r, c } = selectedCell;
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
        setSelectedCell({ r, c });
      };

      const handleHint = () => {
        if (gameStatus !== 'playing' || !selectedCell || hintsUsed >= 3) return;
        const { r, c } = selectedCell;
        if (initialBoard[r][c]) {
          setFeedbackMessage({ type: 'info', text: 'Esta celda ya está fijada desde el inicio.' });
          return;
        }

        const correctVal = solution[r][c];
        setHintsUsed(prev => prev + 1);

        const newBoard = board.map((row, ri) =>
          row.map((val, ci) => (ri === r && ci === c ? correctVal : val))
        );
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
          if (window.confetti) window.confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
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
            setFeedbackMessage({ type: 'error', text: 'Hay números incorrectos y celdas vacías en el tablero.' });
          } else {
            setFeedbackMessage({ type: 'info', text: 'Todo lo que has completado hasta ahora está correcto. ¡Sigue así!' });
          }
        } else {
          if (hasErrors) {
            setFeedbackMessage({ type: 'error', text: 'El Sudoku está completo pero contiene errores. Revisa las celdas marcadas.' });
          }
        }
      };

      const handleResetBoard = () => {
        if (window.confirm('¿Deseas vaciar todos tus números y reiniciar el Sudoku?')) {
          const resetB = board.map((row, ri) =>
            row.map((val, ci) => (initialBoard[ri][ci] ? val : 0))
          );
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

      return (
        <section className={`pt-36 pb-20 px-4 min-h-screen bg-brand-50 flex flex-col items-center ${isStandalone ? 'pt-36' : ''}`}>
          <div className="max-w-4xl w-full">
            {!gameStarted ? (
              <div className="max-w-2xl mx-auto text-center">
                <div className="flex justify-start mb-8">
                  <button onClick={() => navigateTo('cognitive')} className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-800 transition-colors bg-white px-5 py-2.5 rounded-xl shadow-sm border border-brand-100 group">
                    <Icons.ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Volver</span>
                  </button>
                </div>
                <h2 className="font-display text-4xl font-bold text-brand-900 mb-8 text-center">Sudoku</h2>
                {hasSave ? (
                  <div className="bg-white rounded-[3rem] border border-brand-100 shadow-2xl p-10 anim-scale-in text-center">
                    <div className="text-6xl mb-6">💾</div>
                    <h3 className="text-2xl font-bold text-brand-900 mb-2">Partida en Curso</h3>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm leading-relaxed">
                      Tienes una partida de Sudoku guardada. ¿Deseas continuar jugando o empezar una nueva desde el principio?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                      <button
                        onClick={loadSavedGame}
                        className="flex-1 py-4 px-6 bg-brand-900 text-white font-bold rounded-2xl hover:bg-brand-850 shadow-md hover:shadow-xl active:scale-95 transition-all uppercase tracking-wider text-sm"
                      >
                        Continuar Partida
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('¿Seguro que deseas empezar una nueva partida? Esto borrará tu progreso guardado.')) {
                            localStorage.removeItem('iadapta_sudoku_save');
                            setHasSave(false);
                          }
                        }}
                        className="py-4 px-6 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-2xl active:scale-95 transition-all uppercase tracking-wider text-sm border border-gray-200"
                      >
                        Nueva Partida
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-[3rem] border border-brand-100 shadow-2xl p-10 anim-scale-in">
                    <div className="text-6xl mb-6">🧩</div>
                    <h3 className="text-2xl font-bold text-brand-900 mb-6">Selecciona la dificultad</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {LEVELS.map((level, idx) => (
                        <button
                          key={level.id}
                          onClick={() => startGame(idx)}
                          className="group p-5 rounded-2xl border-2 border-brand-50 hover:border-brand-500 hover:bg-brand-50 transition-all flex items-center justify-between px-8 animate-fade-in"
                        >
                          <div className="text-left">
                            <span className="text-brand-900 font-bold text-xl block">{level.name}</span>
                            <span className="text-brand-500 text-sm font-medium">{level.desc}</span>
                          </div>
                          <Icons.ArrowRight className="text-brand-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <GameHeader 
                  title="Sudoku"
                  subtitle={(
                    <div className="flex flex-wrap items-center gap-3 justify-center">
                      <span className="bg-brand-900 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">Nivel {levelIdx + 1}</span>
                      <span className="text-brand-600 font-bold uppercase tracking-widest">{LEVELS[levelIdx].name}</span>
                      <span className="bg-brand-50 text-brand-700 border border-brand-200 px-3 py-1 rounded-full text-sm font-bold tabular-nums">
                        ⏱️ {Math.floor(secondsElapsed / 60)}:{(secondsElapsed % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                  )}
                  onBack={() => navigateTo('cognitive')}
                  onRestart={() => generateSudoku(levelIdx)}
                  onLevels={() => setGameStarted(false)}
                  isStandalone={isStandalone}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Instructions and Helpers */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-3xl p-6 border border-brand-100 shadow-xl text-left">
                      <h4 className="font-bold text-brand-900 text-lg mb-3 flex items-center gap-2">
                        <span>💡</span> ¿Cómo jugar?
                      </h4>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">
                        Completa la cuadrícula de modo que cada fila, columna y recuadro de 3x3 contenga los números del 1 al 9 sin repetirse.
                      </p>
                      <ul className="text-gray-500 text-xs space-y-2 list-disc pl-4 leading-normal">
                        <li>Selecciona una celda en el tablero.</li>
                        <li>Pulsa un número del teclado numérico o usa tu teclado físico.</li>
                        <li>Los números iniciales son oscuros y no se pueden cambiar.</li>
                        <li>Los números incorrectos o duplicados se destacarán automáticamente en color rojo.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Center Column: The Sudoku Grid and Keyboard */}
                  <div className="lg:col-span-8 flex flex-col items-center">
                    {gameStatus === 'playing' ? (
                      <div className="w-full max-w-[458px] flex flex-col items-center space-y-6">
                        
                        {/* Board */}
                        <div className="w-full bg-brand-900 border-4 border-brand-900 rounded-[2rem] shadow-2xl overflow-hidden">
                          <div className="grid grid-cols-3 gap-[4px] bg-brand-900">
                            {Array.from({ length: 9 }).map((_, b) => {
                              const blockRow = Math.floor(b / 3);
                              const blockCol = b % 3;
                              return (
                                <div key={b} className="grid grid-cols-3 gap-[1px] bg-brand-300">
                                  {Array.from({ length: 9 }).map((_, i) => {
                                    const r = blockRow * 3 + Math.floor(i / 3);
                                    const c = blockCol * 3 + (i % 3);
                                    const val = board[r][c];
                                    const isInitial = initialBoard[r][c];
                                    const isSelected = selectedCell && selectedCell.r === r && selectedCell.c === c;
                                    const isSameRowOrCol = selectedCell && (
                                      selectedCell.r === r || 
                                      selectedCell.c === c || 
                                      (Math.floor(selectedCell.r / 3) === Math.floor(r / 3) && Math.floor(selectedCell.c / 3) === Math.floor(c / 3))
                                    );
                                    const isSameValue = activeValue && val !== 0 && activeValue === val;
                                    const isConflict = showConflicts && !isInitial && checkConflicts(r, c, val);
                                    
                                    const blockIndex = b;
                                    const isPartOfCompletedGroup = completedRows.includes(r) || completedCols.includes(c) || completedBlocks.includes(blockIndex);

                                    let cellBg = 'bg-white';
                                    if (isSelected) cellBg = 'bg-accent-coral/20 ring-4 ring-accent-coral/50 ring-inset relative z-10';
                                    else if (isPartOfCompletedGroup) cellBg = 'bg-emerald-100/80';
                                    else if (isSameValue) cellBg = 'bg-amber-100';
                                    else if (isSameRowOrCol) cellBg = 'bg-sky-50/60';
                                    else if (isInitial) cellBg = 'bg-gray-50';

                                    if (isConflict) cellBg = 'bg-red-50';

                                    let cellText = isInitial ? 'text-brand-900 font-extrabold' : 'text-sky-700 font-bold';
                                    if (isPartOfCompletedGroup) cellText = isInitial ? 'text-emerald-950 font-extrabold' : 'text-emerald-700 font-black';
                                    if (isConflict) cellText = 'text-red-500 font-black';

                                    return (
                                      <button
                                        key={`${r}-${c}`}
                                        onClick={() => handleCellClick(r, c)}
                                        className={`aspect-square w-full flex items-center justify-center text-xl sm:text-2xl transition-all focus:outline-none select-none ${cellBg} ${cellText}`}
                                      >
                                        {val !== 0 ? val : ''}
                                      </button>
                                    );
                                  })}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Feedback Banner */}
                        {feedbackMessage && (
                          <div className={`w-full p-4 rounded-2xl text-sm font-bold border ${
                            feedbackMessage.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' :
                            feedbackMessage.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                            'bg-blue-50 border-blue-200 text-blue-700'
                          }`}>
                            {feedbackMessage.text}
                          </div>
                        )}

                        {/* Keyboard */}
                        <div className="w-full space-y-4">
                          <div className="flex justify-between items-center px-2 text-xs font-bold text-brand-400">
                            <span>Pistas: {hintsUsed} / 3</span>
                            <span>Pulsa para introducir número</span>
                          </div>

                          <div className="grid grid-cols-5 gap-2.5">
                            {[1, 2, 3, 4, 5].map(num => (
                              <button
                                key={num}
                                onClick={() => inputDigit(num)}
                                className="h-14 sm:h-16 bg-white hover:bg-brand-50 border-2 border-brand-100 rounded-2xl flex items-center justify-center font-black text-xl sm:text-2xl text-brand-900 shadow-md active:scale-95 transition-all"
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                          
                          <div className="grid grid-cols-5 gap-2.5">
                            {[6, 7, 8, 9].map(num => (
                              <button
                                key={num}
                                onClick={() => inputDigit(num)}
                                className="h-14 sm:h-16 bg-white hover:bg-brand-50 border-2 border-brand-100 rounded-2xl flex items-center justify-center font-black text-xl sm:text-2xl text-brand-900 shadow-md active:scale-95 transition-all"
                              >
                                {num}
                              </button>
                            ))}
                            <button
                              onClick={() => inputDigit(0)}
                              className="h-14 sm:h-16 bg-brand-50 hover:bg-brand-100 border-2 border-brand-100 rounded-2xl flex items-center justify-center font-bold text-xs sm:text-sm text-brand-700 shadow-md active:scale-95 transition-all uppercase"
                              title="Borrar número de la celda seleccionada"
                            >
                              Borrar
                            </button>
                          </div>

                          {/* Utility Buttons */}
                          <div className="grid grid-cols-3 gap-2.5 pt-4">
                            <button
                              onClick={handleVerify}
                              className="py-3.5 bg-brand-900 text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-brand-850 active:scale-95 shadow-md transition-all uppercase"
                            >
                              Comprobar
                            </button>
                            <button
                              onClick={handleHint}
                              disabled={hintsUsed >= 3 || !selectedCell}
                              className="py-3.5 bg-amber-500 text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-amber-600 active:scale-95 shadow-md transition-all disabled:opacity-50 uppercase"
                              title="Revelar número de la celda seleccionada"
                            >
                              Pista
                            </button>
                            <button
                              onClick={handleResetBoard}
                              className="py-3.5 bg-gray-100 text-gray-500 rounded-xl font-bold text-xs sm:text-sm hover:bg-gray-200 active:scale-95 border border-gray-200 transition-all uppercase"
                            >
                              Reiniciar
                            </button>
                          </div>
                        </div>

                      </div>
                    ) : (
                      <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-brand-100 text-center anim-scale-in max-w-xl w-full">
                        <div className="text-7xl mb-6">🎖️</div>
                        <h3 className="text-4xl font-bold text-brand-900 mb-2">¡Sudoku Completado!</h3>
                        <p className="text-brand-500 font-bold uppercase tracking-widest mb-8">{LEVELS[levelIdx].name}</p>
                        
                        <div className="flex justify-center gap-4 mb-8">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Icons.Star key={s} className={`w-10 h-10 ${s <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                          ))}
                        </div>

                        <div className="bg-brand-50 p-8 rounded-3xl mb-8 flex justify-around">
                          <div>
                            <p className="text-brand-400 text-sm font-bold uppercase mb-2">Tiempo</p>
                            <p className="text-4xl font-bold text-brand-900">{finalTime}s</p>
                          </div>
                          <div className="border-l border-brand-200 h-16 my-auto"></div>
                          <div>
                            <p className="text-brand-400 text-sm font-bold uppercase mb-2">Pistas</p>
                            <p className="text-4xl font-bold text-brand-900">{hintsUsed}/3</p>
                          </div>
                        </div>

                        <ShareButtons game="Sudoku" time={finalTime} />

                        <div className="flex flex-col gap-3 mt-8">
                          <button onClick={nextLevel} className="w-full py-5 bg-brand-900 text-white rounded-2xl font-bold text-xl hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/20">
                            {levelIdx < LEVELS.length - 1 ? 'Siguiente Nivel' : 'Finalizar'}
                          </button>
                          <button onClick={() => setGameStarted(false)} className="w-full py-4 text-brand-600 font-bold hover:bg-brand-50 rounded-xl transition-all">
                            Cambiar Dificultad
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </>
            )}
          </div>
        </section>
      );
    };

    // --- SECTION RESOURCES FOR PROFESSIONALS ---

    // --- APP ---
    function App() {
      const { useState, useEffect, useCallback, useMemo } = React;
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
        window.addEventListener('pwa-installed', () => { setInstallable(false); checkPWA(); });
        
        if (window.deferredPrompt) {
          setInstallable(true);
        }
      }, [checkPWA]);

      const syncPageFromUrl = useCallback(() => {
        const params = new URLSearchParams(window.location.search);
        const pageParam = params.get('page');
        let newPage = 'cognitive';
        
        if (pageParam === 'memory') newPage = 'memory';
        else if (pageParam === 'order') newPage = 'order';
        else if (pageParam === 'wordsearch') newPage = 'wordsearch';
        else if (pageParam === 'math') newPage = 'math';
        else if (pageParam === 'challenge') newPage = 'challenge';
        else if (pageParam === 'visual') newPage = 'visual';
        else if (pageParam === 'intruder') newPage = 'intruder';
        else if (pageParam === 'sudoku') newPage = 'sudoku';
        else if (pageParam === 'games') newPage = 'cognitive';

        setCurrentPage(newPage);
        document.title = "IAdapta | Gimnasio Cerebral";
      }, []);

      useEffect(() => {
        syncPageFromUrl();
        window.addEventListener('popstate', syncPageFromUrl);
        return () => window.removeEventListener('popstate', syncPageFromUrl);
      }, [syncPageFromUrl]);

      const navigateTo = useCallback((page, section = null) => {
        const localPages = ['cognitive', 'memory', 'order', 'wordsearch', 'math', 'visual', 'intruder', 'challenge', 'sudoku', 'games'];
        
        if (localPages.includes(page)) {
          const urlPage = page === 'cognitive' || page === 'games' ? 'games' : page;
          window.history.pushState({ page }, '', '?page=' + urlPage);
          setCurrentPage(page === 'games' ? 'cognitive' : page);
          window.scrollTo({ top: 0, behavior: 'instant' });
        } else {
          let target = 'index.html';
          if (page === 'resources') target = 'recursos.html';
          else if (page === 'guides') target = 'guias.html';
          else if (page === 'cv') target = 'cv.html';
          else if (page === 'analyzer') target = 'valoracion-estancia.html';
          
          if (section) {
            target += '?section=' + section;
          }
          window.location.href = target;
        }
      }, []);

      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get('page');
      const isStandalone = (isInApp && sessionStorage.getItem('allowWebInApp') !== 'true') || ['memory', 'order', 'wordsearch', 'math', 'visual', 'intruder', 'challenge', 'sudoku'].includes(pageParam);

      return (
        <>
          {showInstaller && (
            <div className="fixed inset-x-0 bottom-0 z-[100] p-4 anim-slide-up">
              <div className="bg-white rounded-[2rem] p-6 max-w-lg mx-auto shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.3)] border-t-4 border-brand-900 text-center">
                <div className="flex items-center gap-4 mb-5 text-left">
                  <div className="w-12 h-12 bg-brand-50 text-brand-900 rounded-xl flex items-center justify-center text-xl">
                    <Icons.Download />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold text-brand-900">¿Instalar IAdapta?</h3>
                    <p className="text-xs text-gray-500 leading-tight">Acceso rápido desde tu inicio y juego sin conexión.</p>
                  </div>
                  <button onClick={() => setShowInstaller(false)} className="p-2 text-gray-300">
                    <Icons.X />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => {
                      if (window.deferredPrompt) {
                        window.deferredPrompt.prompt();
                        setShowInstaller(false);
                      } else {
                        alert("Nota de sistema:\n\nPara instalar la App:\n1. Toca los 3 puntos (⋮) o compartir en tu navegador.\n2. Elige 'Añadir a pantalla de inicio'.");
                        setShowInstaller(false);
                      }
                    }}
                    className="py-3.5 bg-brand-900 text-white rounded-xl font-bold text-sm hover:bg-brand-800 transition-all active:scale-95 shadow-lg shadow-brand-900/20"
                  >
                    Instalar Ahora
                  </button>
                  <button onClick={() => setShowInstaller(false)} className="py-3.5 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all">
                    Más tarde
                  </button>
                </div>
              </div>
            </div>
          )}
          {!isStandalone && <Navbar currentPage="cognitive" />}
          <main id="main-content">
            {currentPage === 'cognitive' && (
              <SectionCognitive isTeaser={true} navigateTo={navigateTo} isStandalone={isStandalone} isPWA={isPWA} setShowInstaller={setShowInstaller} />
            )}
            {currentPage === 'memory' && (
              <SectionCognitive isTeaser={false} navigateTo={navigateTo} isStandalone={isStandalone} />
            )}
            {currentPage === 'order' && (
              <SectionOrderGame isStandalone={isStandalone} navigateTo={navigateTo} />
            )}
            {currentPage === 'wordsearch' && (
              <SectionWordSearch isStandalone={isStandalone} navigateTo={navigateTo} />
            )}
            {currentPage === 'math' && (
              <SectionMathGame isStandalone={isStandalone} navigateTo={navigateTo} />
            )}
            {currentPage === 'visual' && (
              <SectionVisualGame isStandalone={isStandalone} navigateTo={navigateTo} />
            )}
            {currentPage === 'intruder' && (
              <SectionIntruderGame isStandalone={isStandalone} navigateTo={navigateTo} />
            )}
            {currentPage === 'sudoku' && (
              <SectionSudokuGame isStandalone={isStandalone} navigateTo={navigateTo} />
            )}
            {currentPage === 'challenge' && (
              <SectionDailyChallenge isStandalone={isStandalone} navigateTo={navigateTo} />
            )}
          </main>
          {!isStandalone && <Footer currentPage="cognitive" />}
          {!isStandalone && <CookieBanner />}
        </>
      );
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);