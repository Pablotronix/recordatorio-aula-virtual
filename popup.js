// Variables globales para el estado
let isEnabled = false;
let currentInterval = 30;
let detectedPlatform = 'auto';

// Inicializar popup
document.addEventListener('DOMContentLoaded', async () => {
  await loadSettings();
  setupEventListeners();
  updateStatus();
  detectCurrentPlatform();
});

// Cargar configuración guardada
async function loadSettings() {
  try {
    const result = await chrome.storage.sync.get([
      'enabled',
      'interval',
      'platform'
    ]);
    
    isEnabled = result.enabled || false;
    currentInterval = result.interval || 30;
    detectedPlatform = result.platform || 'auto';
    
    // Actualizar UI
    document.getElementById('enabled').checked = isEnabled;
    document.getElementById('interval').value = currentInterval;
    document.getElementById('platform').value = detectedPlatform;
  } catch (error) {
    console.error('Error cargando configuración:', error);
  }
}

// Guardar configuración
async function saveSettings() {
  try {
    await chrome.storage.sync.set({
      enabled: isEnabled,
      interval: currentInterval,
      platform: detectedPlatform
    });
    
    // Notificar al background script
    await chrome.runtime.sendMessage({
      action: 'updateSettings',
      settings: {
        enabled: isEnabled,
        interval: currentInterval,
        platform: detectedPlatform
      }
    });
  } catch (error) {
    console.error('Error guardando configuración:', error);
  }
}

// Configurar event listeners
function setupEventListeners() {
  // Toggle de activación
  document.getElementById('enabled').addEventListener('change', async (e) => {
    isEnabled = e.target.checked;
    await saveSettings();
    updateStatus();
  });
  
  // Cambio de intervalo
  document.getElementById('interval').addEventListener('change', async (e) => {
    currentInterval = parseInt(e.target.value);
    await saveSettings();
  });
  
  // Cambio de plataforma
  document.getElementById('platform').addEventListener('change', async (e) => {
    detectedPlatform = e.target.value;
    await saveSettings();
  });
  
  // Botón de prueba
  document.getElementById('testButton').addEventListener('click', () => {
    testNotification();
  });
}

// Actualizar estado visual
function updateStatus() {
  const statusElement = document.getElementById('status');
  
  if (isEnabled) {
    statusElement.textContent = `Estado: Activo (cada ${currentInterval} min)`;
    statusElement.className = 'status active';
  } else {
    statusElement.textContent = 'Estado: Inactivo';
    statusElement.className = 'status inactive';
  }
}

// Detectar plataforma actual
async function detectCurrentPlatform() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (tab && tab.url) {
      const url = tab.url.toLowerCase();
      let platform = 'generic';
      
      // Detectar específicamente Aula Digital SENCE
      if (url.includes('auladigital.sence.cl')) {
        platform = 'sence';
      } else if (url.includes('moodle')) {
        platform = 'moodle';
      } else if (url.includes('blackboard')) {
        platform = 'blackboard';
      } else if (url.includes('canvas')) {
        platform = 'canvas';
      } else if (url.includes('classroom') || url.includes('aula')) {
        platform = 'generic';
      }
      
      // Actualizar selector si está en auto
      if (detectedPlatform === 'auto') {
        document.getElementById('platform').value = platform;
        detectedPlatform = platform;
        await saveSettings();
      }
      
      // Enviar información de la tab al content script
      await chrome.tabs.sendMessage(tab.id, {
        action: 'detectPlatform',
        platform: platform
      });
    }
  } catch (error) {
    console.log('No se pudo detectar la plataforma:', error);
  }
}

// Probar notificación
async function testNotification() {
  try {
    // Reproducir sonido de campana antes de enviar el mensaje
    playBellSound();
    
    await chrome.runtime.sendMessage({
      action: 'showTestNotification'
    });
    
    // Feedback visual
    const button = document.getElementById('testButton');
    const originalText = button.textContent;
    button.textContent = '✓ Enviada!';
    button.style.background = 'rgba(76, 175, 80, 0.4)';
    
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '';
    }, 2000);
  } catch (error) {
    console.error('Error enviando notificación de prueba:', error);
  }
}

// Reproducir sonido de campana
function playBellSound() {
  try {
    const audio = new Audio();
    audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE';
    audio.volume = 0.7;
    audio.play().catch(e => console.log('No se pudo reproducir sonido:', e));
    console.log('🔔 Sonido de campana reproducido desde popup');
  } catch (error) {
    console.log('Error reproduciendo campana:', error);
  }
}