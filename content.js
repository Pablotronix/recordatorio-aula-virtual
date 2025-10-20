// Content Script - Se ejecuta en las páginas del aula virtual

// Estado del content script
let isHighlighting = false;
let highlightedElements = [];
let settings = {};
let activityTracker = {
  lastActivity: Date.now(),
  clickCount: 0,
  linksFound: []
};

// Inicialización
(function() {
  console.log('Content script cargado en:', window.location.href);
  
  // Cargar configuración
  loadSettings();
  
  // Detectar plataforma y configurar
  const platform = detectPlatform();
  setupActivityTracking();
  findRelevantLinks();
  
  // Escuchar mensajes del background y popup
  chrome.runtime.onMessage.addListener(handleMessage);
  
  // Rastrear actividad del usuario
  setupUserActivityListeners();
})();

// Cargar configuración desde el background
async function loadSettings() {
  try {
    const response = await chrome.runtime.sendMessage({ action: 'getSettings' });
    settings = response || {};
    console.log('Configuración cargada en content script:', settings);
  } catch (error) {
    console.error('Error cargando configuración:', error);
  }
}

// Detectar tipo de plataforma educativa
function detectPlatform() {
  const url = window.location.href.toLowerCase();
  const title = document.title.toLowerCase();
  
  // Detectar específicamente Aula Digital SENCE
  if (url.includes('auladigital.sence.cl')) {
    return 'sence';
  } else if (url.includes('moodle') || title.includes('moodle')) {
    return 'moodle';
  } else if (url.includes('blackboard') || title.includes('blackboard')) {
    return 'blackboard';
  } else if (url.includes('canvas') || title.includes('canvas')) {
    return 'canvas';
  } else if (url.includes('classroom') || url.includes('aula')) {
    return 'classroom';
  }
  
  return 'generic';
}

// Manejar mensajes del runtime
function handleMessage(message, sender, sendResponse) {
  switch (message.action) {
    case 'highlightLinks':
      highlightRelevantLinks();
      break;
    case 'detectPlatform':
      sendResponse({ platform: detectPlatform() });
      break;
    case 'findLinks':
      sendResponse({ links: findRelevantLinks() });
      break;
    case 'removeHighlights':
      removeHighlights();
      break;
  }
  return true;
}

// Encontrar enlaces relevantes según la plataforma
function findRelevantLinks() {
  const platform = detectPlatform();
  let selectors = [];
  
  switch (platform) {
    case 'sence':
      // Selectores específicos para Aula Digital SENCE (basado en Moodle)
      selectors = [
        'a[href*="mod/"]',           // Enlaces a módulos
        'a[href*="course/view"]',    // Enlaces de curso
        'a[href*="quiz/"]',          // Cuestionarios
        'a[href*="assign/"]',        // Tareas
        'a[href*="forum/"]',         // Foros
        'a[href*="resource/"]',      // Recursos
        'a[href*="page/"]',          // Páginas
        'a[href*="scorm/"]',         // SCORM (común en SENCE)
        '.activity-link',            // Actividades generales
        '.course-content a',         // Contenido del curso
        '.section a',                // Enlaces en secciones
        '.activityinstance a',       // Instancias de actividad
        'a.aalink',                  // Enlaces de actividad
        '.activity a'                // Enlaces en actividades
      ];
      break;
    
    case 'moodle':
      selectors = [
        'a[href*="mod/"]',           // Enlaces a módulos
        'a[href*="course/view"]',    // Enlaces de curso
        'a[href*="quiz/"]',          // Cuestionarios
        'a[href*="assign/"]',        // Tareas
        'a[href*="forum/"]',         // Foros
        '.activity-link',            // Actividades generales
        '.course-content a'          // Contenido del curso
      ];
      break;
      
    case 'blackboard':
      selectors = [
        'a[href*="content/"]',
        'a[href*="assessment/"]',
        'a[href*="discussion/"]',
        '.bb-content-frame a',
        '.course-menu a'
      ];
      break;
      
    case 'canvas':
      selectors = [
        'a[href*="assignments/"]',
        'a[href*="quizzes/"]',
        'a[href*="discussion_topics/"]',
        'a[href*="modules/"]',
        '.course-menu a',
        '.module-item-title a'
      ];
      break;
      
    default:
      selectors = [
        'a[href*="curso"]',
        'a[href*="modulo"]',
        'a[href*="leccion"]',
        'a[href*="tarea"]',
        'a[href*="examen"]',
        'a[href*="actividad"]',
        '.content a',
        '.lesson a',
        '.module a'
      ];
  }
  
  const links = [];
  selectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (el.textContent.trim() && isValidLink(el)) {
        links.push({
          element: el,
          text: el.textContent.trim(),
          href: el.href,
          type: getLinkType(el)
        });
      }
    });
  });
  
  activityTracker.linksFound = links;
  console.log(`Encontrados ${links.length} enlaces relevantes`);
  return links;
}

// Validar si es un enlace útil
function isValidLink(element) {
  const text = element.textContent.trim().toLowerCase();
  const href = element.href || '';
  
  // Excluir enlaces no útiles
  const excludePatterns = [
    'logout', 'salir', 'cerrar sesión',
    'help', 'ayuda', 'soporte',
    'profile', 'perfil',
    'settings', 'configuración'
  ];
  
  const isExcluded = excludePatterns.some(pattern => 
    text.includes(pattern) || href.toLowerCase().includes(pattern)
  );
  
  return !isExcluded && text.length > 2 && href.length > 0;
}

// Determinar tipo de enlace
function getLinkType(element) {
  const text = element.textContent.toLowerCase();
  const href = element.href.toLowerCase();
  
  // Para SENCE y Moodle
  if (href.includes('scorm')) {
    return 'scorm';
  } else if (href.includes('quiz') || text.includes('examen') || text.includes('quiz') || text.includes('cuestionario')) {
    return 'quiz';
  } else if (href.includes('assign') || text.includes('tarea') || text.includes('entrega')) {
    return 'assignment';
  } else if (href.includes('forum') || text.includes('foro') || text.includes('discusión')) {
    return 'forum';
  } else if (href.includes('resource') || text.includes('recurso') || text.includes('archivo')) {
    return 'resource';
  } else if (href.includes('page') || text.includes('página')) {
    return 'page';
  } else if (href.includes('mod/') || text.includes('módulo')) {
    return 'module';
  }
  
  return 'content';
}

// Resaltar enlaces relevantes
function highlightRelevantLinks() {
  if (isHighlighting) {
    removeHighlights();
    return;
  }
  
  const links = findRelevantLinks();
  
  links.forEach((linkData, index) => {
    const element = linkData.element;
    
    // Guardar estilos originales
    const originalStyle = {
      backgroundColor: element.style.backgroundColor,
      border: element.style.border,
      boxShadow: element.style.boxShadow,
      position: element.style.position,
      zIndex: element.style.zIndex
    };
    
    // Aplicar resaltado
    element.style.backgroundColor = '#ffeb3b';
    element.style.border = '2px solid #ff9800';
    element.style.boxShadow = '0 0 10px rgba(255, 152, 0, 0.5)';
    element.style.position = 'relative';
    element.style.zIndex = '1000';
    
    // Agregar número
    const badge = document.createElement('span');
    badge.textContent = (index + 1).toString();
    badge.style.cssText = `
      position: absolute;
      top: -8px;
      right: -8px;
      background: #f44336;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      font-size: 12px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1001;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    `;
    
    element.style.position = 'relative';
    element.appendChild(badge);
    
    highlightedElements.push({
      element,
      originalStyle,
      badge
    });
  });
  
  isHighlighting = true;
  
  // Mostrar mensaje informativo
  showInfoMessage(`Se encontraron ${links.length} enlaces para mantener actividad`);
  
  // Remover resaltado automáticamente después de 10 segundos
  setTimeout(removeHighlights, 10000);
}

// Remover resaltados
function removeHighlights() {
  highlightedElements.forEach(({ element, originalStyle, badge }) => {
    // Restaurar estilos originales
    Object.keys(originalStyle).forEach(prop => {
      element.style[prop] = originalStyle[prop];
    });
    
    // Remover badge
    if (badge && badge.parentNode) {
      badge.parentNode.removeChild(badge);
    }
  });
  
  highlightedElements = [];
  isHighlighting = false;
  
  // Remover mensaje informativo
  const infoMsg = document.getElementById('aula-virtual-info-message');
  if (infoMsg) {
    infoMsg.remove();
  }
}

// Mostrar mensaje informativo
function showInfoMessage(text) {
  // Remover mensaje anterior si existe
  const existing = document.getElementById('aula-virtual-info-message');
  if (existing) {
    existing.remove();
  }
  
  const message = document.createElement('div');
  message.id = 'aula-virtual-info-message';
  message.textContent = text;
  message.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    max-width: 300px;
    animation: slideIn 0.3s ease-out;
  `;
  
  // Agregar animación CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(message);
  
  // Remover después de 5 segundos
  setTimeout(() => {
    if (message.parentNode) {
      message.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => message.remove(), 300);
    }
  }, 5000);
}

// Configurar rastreo de actividad
function setupActivityTracking() {
  // Rastrear clics en enlaces
  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      activityTracker.lastActivity = Date.now();
      activityTracker.clickCount++;
      
      // Informar al background script
      chrome.runtime.sendMessage({
        action: 'userActivity',
        data: {
          type: 'link_click',
          url: e.target.href,
          text: e.target.textContent.trim(),
          timestamp: Date.now()
        }
      });
      
      console.log('Clic en enlace detectado:', e.target.textContent.trim());
    }
  });
}

// Configurar listeners de actividad del usuario
function setupUserActivityListeners() {
  const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
  
  events.forEach(event => {
    document.addEventListener(event, () => {
      activityTracker.lastActivity = Date.now();
    }, { passive: true });
  });
}