# 🔍 Instrucciones de Debug - Recordatorio Aula Virtual

## ⚠️ La extensión no muestra notificaciones

### **Paso 1: Recarga la extensión**
1. Ve a `chrome://extensions/`
2. Busca "Recordatorio Aula Virtual"
3. Haz clic en el ícono **⟳ Recargar**

### **Paso 2: Abre la consola del Service Worker**
1. En `chrome://extensions/`
2. Click en **"service worker"** (enlace azul debajo de la extensión)
3. Se abre DevTools

### **Paso 3: Prueba la notificación**
1. Abre el popup de la extensión (click en el ícono)
2. Click en **"Probar Notificación"**
3. **Observa la consola del Service Worker**

**¿Qué deberías ver?**
```
📨 Mensaje recibido: showTestNotification
✅ Notificación mostrada: 🔔 Notificación de prueba ID: activityReminder...
```

**Si ves un error ❌:**
- Ve a **Preferencias del Sistema** → **Notificaciones** → **Google Chrome**
- Activa las notificaciones

### **Paso 4: Verifica la alarma**
En la consola del Service Worker, escribe:
```javascript
chrome.alarms.getAll().then(console.log)
```

**Deberías ver:**
```javascript
[{ name: "activityReminder", scheduledTime: ..., periodInMinutes: 5 }]
```

### **Paso 5: Fuerza una alarma de prueba (1 minuto)**
En la consola del Service Worker:
```javascript
chrome.alarms.create('activityReminder-test', { delayInMinutes: 0.1 })
```

Espera 6 segundos y deberías recibir una notificación.

### **Problemas comunes:**

#### ❌ No aparece "service worker"
- La extensión no está cargada correctamente
- Recarga la extensión

#### ❌ Error: "Cannot read property 'create' of undefined"
- Los permisos no están bien configurados
- Verifica `manifest.json`

#### ❌ Notificación no visible pero sin errores
- Problema de permisos del sistema
- **macOS**: Preferencias → Notificaciones → Chrome → Activar
- **Windows**: Configuración → Sistema → Notificaciones → Chrome

#### ❌ La alarma no se dispara
- Chrome necesita mínimo 1 minuto
- Intervalos muy cortos (<5 min) pueden ser inestables
- **Solución**: Cambia a 10-15 minutos para pruebas

### **Comandos útiles en consola del Service Worker:**

```javascript
// Ver configuración actual
chrome.storage.sync.get(['enabled', 'interval', 'platform'], console.log)

// Ver todas las alarmas
chrome.alarms.getAll().then(console.log)

// Crear alarma de prueba inmediata
chrome.alarms.create('test', { when: Date.now() + 5000 })

// Probar notificación directamente
chrome.notifications.create({
  type: 'basic',
  iconUrl: 'icons/icon128.png',
  title: 'Prueba',
  message: 'Funciona!'
})
```

### **Si nada funciona:**

1. **Elimina la extensión completamente**
2. **Cierra Chrome**
3. **Abre Chrome de nuevo**
4. **Carga la extensión otra vez**
5. **Acepta los permisos**

---

## ✅ La extensión funciona correctamente cuando:

1. ✅ Ves "service worker" activo
2. ✅ Los logs aparecen en la consola
3. ✅ "Probar Notificación" muestra la notificación
4. ✅ `chrome.alarms.getAll()` muestra la alarma
5. ✅ Después del intervalo, recibes notificación automática

