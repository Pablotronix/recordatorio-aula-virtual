// Offscreen document para reproducir audio en Manifest V3

// Escuchar mensajes del background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'playBellSound') {
    playBellSound();
    sendResponse({ success: true });
  }
  return true;
});

// Reproducir sonido de campana
function playBellSound() {
  try {
    const audio = new Audio();
    // Base64 de un sonido de campana WAV corto
    audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE';
    audio.volume = 0.7;
    
    audio.play()
      .then(() => console.log('🔔 Sonido de campana reproducido'))
      .catch(error => console.error('Error reproduciendo campana:', error));
  } catch (error) {
    console.error('Error creando audio:', error);
  }
}

console.log('Offscreen document cargado - listo para reproducir sonidos');
