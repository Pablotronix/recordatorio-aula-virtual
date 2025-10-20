// Background script - Service Worker para Chrome Extension V3

// Estado global
let settings = {
  enabled: false,
  interval: 30,
  platform: 'auto'
};

// Inicialización
chrome.runtime.onInstalled.addListener(async () => {
  console.log('Extensión Recordatorio Aula Virtual instalada');
  
  // Cargar configuración inicial
  await loadSettings();
  
  // Crear alarma inicial si está habilitada
  if (settings.enabled) {
    await createAlarm();
  }
});

// Escuchar mensajes del popup y content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case 'updateSettings':
      handleUpdateSettings(message.settings);
      break;
    case 'showTestNotification':
      showNotification('🔔 Notificación de prueba', 'La extensión está funcionando correctamente!');
      break;
    case 'userActivity':
      handleUserActivity(message.data);
      break;
    case 'getSettings':
      sendResponse(settings);
      break;
  }
  return true; // Importante para respuestas asíncronas
});

// Manejar alarmas
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'activityReminder' && settings.enabled) {
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
    console.log('Configuración cargada:', settings);
  } catch (error) {
    console.error('Error cargando configuración:', error);
  }
}

// Actualizar configuración
async function handleUpdateSettings(newSettings) {
  console.log('Actualizando configuración:', newSettings);
  
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
    
    console.log(`Alarma creada para cada ${settings.interval} minutos`);
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
          console.log('No se pudo comunicar con el content script:', error);
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

// Mostrar notificación
async function showNotification(title, message, options = {}) {
  try {
    const notificationOptions = {
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: title,
      message: message,
      ...options
    };
    
    await chrome.notifications.create('activityReminder', notificationOptions);
    console.log('Notificación mostrada:', title);
  } catch (error) {
    console.error('Error mostrando notificación:', error);
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
  console.log('Actividad del usuario detectada:', data);
  // Aquí se podría implementar lógica para rastrear la actividad
  // y ajustar los recordatorios en consecuencia
}