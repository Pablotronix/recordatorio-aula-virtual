// Background script - Service Worker para Chrome Extension V3

// Log con timestamp
function logWithTime(...args) {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  const ms = String(now.getMilliseconds()).padStart(3, '0');
  const prefix = `[${hh}:${mm}:${ss}.${ms}]`;
  console.log(prefix, ...args);
}

// Estado global
let settings = {
  enabled: false,
  interval: 30,
  platform: 'auto'
};

// Inicialización
chrome.runtime.onInstalled.addListener(async () => {
  logWithTime('Extensión Recordatorio Aula Virtual instalada');
  
  // Cargar configuración inicial
  await loadSettings();
  
  // Crear alarma inicial si está habilitada
  if (settings.enabled) {
    await createAlarm();
  }
});

// Escuchar mensajes del popup y content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  logWithTime('📨 Mensaje recibido:', message.action);
  
  switch (message.action) {
    case 'updateSettings':
      handleUpdateSettings(message.settings);
      sendResponse({ success: true });
      break;
    case 'showTestNotification':
      showNotification('🔔 Notificación de prueba', 'La extensión está funcionando correctamente!')
        .then(() => sendResponse({ success: true }))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true; // Mantener el canal abierto para respuesta asíncrona
    case 'userActivity':
      handleUserActivity(message.data);
      sendResponse({ success: true });
      break;
    case 'getSettings':
      sendResponse(settings);
      break;
  }
  return true; // Importante para respuestas asíncronas
});

// Manejar alarmas
chrome.alarms.onAlarm.addListener(async (alarm) => {
  logWithTime('⏰ Alarma disparada:', alarm.name, 'Settings enabled:', settings.enabled);
  
  if (alarm.name.startsWith('activityReminder') && settings.enabled) {
    logWithTime('🔔 Mostrando recordatorio de actividad...');
    await showActivityReminder();
  }
});

// Cargar configuración desde storage
async function loadSettings() {
  try {
    const result = await chrome.storage.sync.get(['enabled', 'interval', 'platform']);
    settings = {
      enabled: result.enabled || false,
      interval: result.interval || 30,
      platform: result.platform || 'auto'
    };
    logWithTime('Configuración cargada:', settings);
  } catch (error) {
    console.error('Error cargando configuración:', error);
  }
}

// Actualizar configuración
async function handleUpdateSettings(newSettings) {
  logWithTime('Actualizando configuración:', newSettings);
  
  settings = { ...settings, ...newSettings };
  
  // Manejar alarmas según el estado
  if (settings.enabled) {
    await createAlarm();
  } else {
    await chrome.alarms.clear('activityReminder');
  }
}

// Crear alarma de recordatorio
async function createAlarm() {
  try {
    // Limpiar alarma existente
    await chrome.alarms.clear('activityReminder');
    
    // Crear nueva alarma
    await chrome.alarms.create('activityReminder', {
      delayInMinutes: settings.interval,
      periodInMinutes: settings.interval
    });
    
    logWithTime(`Alarma creada para cada ${settings.interval} minutos`);
  } catch (error) {
    console.error('Error creando alarma:', error);
  }
}

// Mostrar recordatorio de actividad
async function showActivityReminder() {
  try {
    // Verificar si hay una tab activa con aula virtual
    const tabs = await chrome.tabs.query({ active: true });
    
    if (tabs.length > 0) {
      const activeTab = tabs[0];
      const isEducationalSite = await isEducationalPlatform(activeTab.url);
      
      if (isEducationalSite) {
        await showNotification(
          '🎓 Recordatorio de Actividad',
          'Es hora de hacer clic en un enlace para mantener tu sesión activa en el aula virtual.',
          {
            requireInteraction: true,
            buttons: [
              { title: 'Ir al aula virtual' },
              { title: 'Posponer 5 min' }
            ]
          }
        );
        
        // Enviar mensaje al content script para resaltar enlaces
        try {
          await chrome.tabs.sendMessage(activeTab.id, {
            action: 'highlightLinks',
            platform: settings.platform
          });
        } catch (error) {
          logWithTime('No se pudo comunicar con el content script:', error);
        }
      }
    }
  } catch (error) {
    console.error('Error mostrando recordatorio:', error);
  }
}

// Verificar si es una plataforma educativa
function isEducationalPlatform(url) {
  if (!url) return false;
  
  const educationalKeywords = [
    'auladigital.sence.cl',      // Aula Digital SENCE (prioridad)
    'moodle', 'blackboard', 'canvas', 'classroom', 'aula',
    'educativa', 'universidad', 'campus', 'virtual',
    'elearning', 'lms', 'brightspace', 'schoology',
    'sence', 'capacitacion', 'capacitación'
  ];
  
  const urlLower = url.toLowerCase();
  return educationalKeywords.some(keyword => urlLower.includes(keyword));
}

// Reproducir sonido de campana usando offscreen document (con comprobaciones seguras)
async function playBellSound() {
  try {
    // Detectar si la API offscreen está disponible y si ya hay un documento offscreen
    let hasOffscreen = false;

    try {
      if (chrome.offscreen && typeof chrome.offscreen.hasDocument === 'function') {
        hasOffscreen = await chrome.offscreen.hasDocument();
      }
    } catch (err) {
      // No todos los navegadores/versión exponen hasDocument; seguiremos intentando crear uno
      hasOffscreen = false;
    }

    // Crear offscreen document si no existe
    if (!hasOffscreen) {
      try {
        await chrome.offscreen.createDocument({
          url: 'offscreen.html',
          reasons: ['AUDIO_PLAYBACK'],
          justification: 'Reproducir sonido de campana en notificaciones'
        });
        logWithTime('📄 Offscreen document creado');
      } catch (createError) {
        logWithTime('ℹ️ No se pudo crear offscreen document:', createError);
      }
    }

    // Enviar mensaje para reproducir sonido al runtime de forma segura
    await new Promise((resolve) => {
      try {
        chrome.runtime.sendMessage({ action: 'playBellSound' }, (resp) => {
          // La respuesta no es crítica; resolvemos de todos modos
          resolve(resp);
        });
      } catch (sendErr) {
        logWithTime('ℹ️ Error enviando mensaje para reproducir sonido:', sendErr);
        resolve();
      }
    });

    logWithTime('🔔 Intento de reproducir sonido enviado (offscreen/runtime)');
  } catch (error) {
    logWithTime('ℹ️ No se pudo reproducir sonido:', error && error.message ? error.message : error);
  }
}

// Mostrar notificación
async function showNotification(title, message, options = {}) {
  try {
    // Reproducir sonido de campana
    await playBellSound();
    
    const notificationOptions = {
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: title,
      message: message,
      priority: 2,
      requireInteraction: false,
      silent: false, // Asegurar que no sea silenciosa
      ...options
    };
    
    const notificationId = await chrome.notifications.create('activityReminder' + Date.now(), notificationOptions);
    logWithTime('✅ Notificación mostrada:', title, 'ID:', notificationId);
    return notificationId;
  } catch (error) {
    console.error('❌ Error mostrando notificación:', error);
    // Mostrar alerta como fallback
    alert('⚠️ Error de notificaciones. Verifica permisos en Configuración del Sistema > Notificaciones > Chrome');
  }
}

// Manejar clics en notificaciones
chrome.notifications.onClicked.addListener(async (notificationId) => {
  if (notificationId === 'activityReminder') {
    // Enfocar en la tab del aula virtual
    const tabs = await chrome.tabs.query({});
    const educationalTab = tabs.find(tab => isEducationalPlatform(tab.url));
    
    if (educationalTab) {
      await chrome.tabs.update(educationalTab.id, { active: true });
      await chrome.windows.update(educationalTab.windowId, { focused: true });
    }
  }
});

// Manejar botones de notificación
chrome.notifications.onButtonClicked.addListener(async (notificationId, buttonIndex) => {
  if (notificationId === 'activityReminder') {
    if (buttonIndex === 0) {
      // Ir al aula virtual
      const tabs = await chrome.tabs.query({});
      const educationalTab = tabs.find(tab => isEducationalPlatform(tab.url));
      
      if (educationalTab) {
        await chrome.tabs.update(educationalTab.id, { active: true });
        await chrome.windows.update(educationalTab.windowId, { focused: true });
      }
    } else if (buttonIndex === 1) {
      // Posponer 5 minutos
      await chrome.alarms.clear('activityReminder');
      await chrome.alarms.create('activityReminder', {
        delayInMinutes: 5
      });
    }
  }
  
  // Limpiar notificación
  await chrome.notifications.clear(notificationId);
});

// Manejar actividad del usuario
function handleUserActivity(data) {
  logWithTime('Actividad del usuario detectada:', data);
  // Aquí se podría implementar lógica para rastrear la actividad
  // y ajustar los recordatorios en consecuencia
}