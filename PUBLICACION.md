# 📤 Guía de Publicación en Chrome Web Store

Esta guía te ayudará a publicar tu extensión "Recordatorio Aula Virtual" en la Chrome Web Store.

## 📋 Requisitos Previos

### 1. Cuenta de Desarrollador de Chrome Web Store
- **Costo único**: $5 USD
- **Registro**: https://chrome.google.com/webstore/devconsole/
- Ya tienes acceso con tu cuenta `pablotronix@gmail.com` ✅

### 2. Iconos de la Extensión ⚠️ IMPORTANTE

**Necesitas crear los iconos antes de publicar:**

1. Abre el archivo `icon-generator.html` en tu navegador:
   ```bash
   open icon-generator.html
   ```

2. Haz clic en "Descargar Todos"

3. Guarda los 4 archivos en la carpeta `icons/`:
   - `icon16.png` (16x16)
   - `icon32.png` (32x32)
   - `icon48.png` (48x48)
   - `icon128.png` (128x128)

**Alternativamente**, puedes crear tus propios iconos profesionales con:
- Figma, Canva, Adobe Illustrator
- https://www.canva.com/
- https://favicon.io/

## 🎯 Paso 1: Preparar el Paquete

### Opción A: Crear ZIP desde terminal (Recomendado)

```bash
# Ir a la carpeta del proyecto
cd "/Users/pablocutino/Documents/Repositorios Proyectos Personales/Extensión Chrome - Recordatorio Aula virtual"

# Crear archivo ZIP excluyendo archivos innecesarios
zip -r recordatorio-aula-virtual.zip . \
  -x "*.git*" \
  -x "*.DS_Store" \
  -x "icon-generator.html" \
  -x "PUBLICACION.md" \
  -x "SENCE-CONFIG.md" \
  -x "README.md"
```

### Opción B: Crear ZIP manualmente

1. **Selecciona SOLO estos archivos y carpetas:**
   - ✅ `manifest.json`
   - ✅ `background.js`
   - ✅ `content.js`
   - ✅ `popup.html`
   - ✅ `popup.js`
   - ✅ `icons/` (con los 4 PNG dentro)
   - ✅ `LICENSE`

2. **NO incluyas:**
   - ❌ `.git/`
   - ❌ `.gitignore`
   - ❌ `README.md`
   - ❌ `SENCE-CONFIG.md`
   - ❌ `PUBLICACION.md`
   - ❌ `icon-generator.html`
   - ❌ `.DS_Store`

3. **Comprimir:**
   - Click derecho → "Comprimir" (macOS)
   - Renombra a `recordatorio-aula-virtual.zip`

## 📦 Paso 2: Verificar el Paquete

Antes de subir, verifica que:

```bash
# Ver contenido del ZIP
unzip -l recordatorio-aula-virtual.zip

# Debe mostrar:
# manifest.json
# background.js
# content.js
# popup.html
# popup.js
# icons/icon16.png
# icons/icon32.png
# icons/icon48.png
# icons/icon128.png
# LICENSE
```

## 🚀 Paso 3: Subir a Chrome Web Store

### En el Developer Dashboard

1. **Ir a**: https://chrome.google.com/webstore/devconsole/

2. **Hacer clic en**: "Nuevo elemento" (botón azul)

3. **Subir el ZIP**: Arrastra `recordatorio-aula-virtual.zip`

4. **Completar formulario**:

#### 📝 Información del elemento

**Nombre del producto**:
```
Recordatorio Aula Virtual
```

**Descripción breve** (132 caracteres máx):
```
Mantén tu actividad en aulas virtuales con recordatorios automáticos. Optimizado para Aula Digital SENCE.
```

**Descripción detallada**:
```
🔔 Recordatorio Aula Virtual

Extensión diseñada para estudiantes que necesitan mantener actividad constante en plataformas de aulas virtuales educativas.

✨ CARACTERÍSTICAS PRINCIPALES:
• Recordatorios configurables cada 5-120 minutos
• Detección automática de plataformas educativas
• Resaltado automático de enlaces relevantes
• Notificaciones inteligentes
• Soporte optimizado para Aula Digital SENCE 🇨🇱

🎯 OPTIMIZADO PARA:
• Aula Digital SENCE (auladigital.sence.cl)
• Moodle
• Blackboard
• Canvas
• Google Classroom
• Plataformas educativas genéricas

🔧 FUNCIONALIDADES:
• Configura el intervalo de recordatorios
• Detecta automáticamente módulos SCORM
• Identifica tareas, foros, evaluaciones
• Resalta enlaces para mantener actividad
• Rastreo local de actividad (sin envío de datos)

🔒 PRIVACIDAD:
• No recopila datos personales
• Configuración guardada localmente
• Sin envío a servidores externos
• Código abierto en GitHub

💡 IDEAL PARA:
• Estudiantes de cursos SENCE
• Capacitaciones online
• Educación a distancia
• Plataformas LMS

Esta extensión te ayuda a mantener tu sesión activa recordándote hacer clic en enlaces periódicamente. Perfecta para plataformas que contabilizan horas efectivas solo con actividad visible.

Úsala responsablemente y siempre participa activamente en tus cursos.
```

**Categoría**:
```
Productividad
```

**Idioma**:
```
Español
```

#### 🖼️ Recursos gráficos

**Icono de la tienda** (128x128):
- Usa `icons/icon128.png`

**Capturas de pantalla** (1280x800 o 640x400):
- **Mínimo**: 1 screenshot
- **Recomendado**: 3-5 screenshots
- Muestra:
  1. Popup de configuración
  2. Notificación en acción
  3. Enlaces resaltados en SENCE
  4. Interfaz de configuración

**Imagen promocional pequeña** (440x280) - OPCIONAL:
- Banner con logo y texto "Recordatorio Aula Virtual"

**Imagen marquesina** (1400x560) - OPCIONAL:
- Banner grande para destacar en la tienda

#### 🔐 Privacidad

**Justificación de permisos**:

```
storage: Guardar configuración del usuario (intervalo, plataforma)
notifications: Mostrar recordatorios de actividad
alarms: Programar recordatorios periódicos
activeTab: Detectar plataforma educativa actual
host_permissions: Detectar y resaltar enlaces en aulas virtuales
```

**Política de privacidad** (URL requerida):

Puedes crear una página simple en GitHub Pages:
```
https://pablotronix.github.io/recordatorio-aula-virtual/privacy-policy.html
```

O usar esta plantilla:
```
Esta extensión no recopila, almacena ni transmite datos personales.
Toda la configuración se guarda localmente en el navegador del usuario.
No se conecta a servidores externos.
```

#### 📊 Distribución

**Visibilidad**:
- ✅ Público (recomendado)
- ⬜ No listado (solo con link directo)
- ⬜ Privado (solo para tu organización)

**Regiones**:
- ✅ Todos los países (o solo Chile si prefieres)

## 🎨 Paso 4: Crear Screenshots (IMPORTANTE)

### Opción A: Usando la extensión

1. Carga la extensión en Chrome (modo desarrollador)
2. Abre Aula Digital SENCE
3. Toma screenshots de:
   - Popup de configuración (Cmd+Shift+4 en Mac)
   - Notificación activa
   - Enlaces resaltados
   - Estado de la extensión

### Opción B: Usar herramientas de diseño

Crea mockups en:
- Figma: https://www.figma.com/
- Canva: https://www.canva.com/

**Tamaños requeridos**:
- Screenshots: 1280x800 px (o 640x400 px)
- Formato: PNG o JPG

## ✅ Paso 5: Revisión y Publicación

1. **Revisar todo**: Verifica textos, imágenes, permisos

2. **Guardar borrador**: Guarda antes de enviar

3. **Enviar para revisión**: Click en "Enviar para revisión"

4. **Proceso de revisión**:
   - Tiempo: 1-3 días hábiles (puede ser más rápido)
   - Google revisa la extensión
   - Puede pedir cambios o aprobar directamente

5. **Publicación**:
   - Una vez aprobada, estará disponible en la tienda
   - Los usuarios podrán instalarla

## 🔄 Actualizaciones Futuras

Para actualizar la extensión:

1. **Incrementa la versión** en `manifest.json`:
   ```json
   "version": "1.1"
   ```

2. **Crea nuevo ZIP** con los cambios

3. **Sube en la sección "Paquete"** del dashboard

4. **Describe los cambios** en "Notas de la versión"

5. **Enviar para revisión**

## 💰 Consideraciones de Pago

- **Tarifa única**: $5 USD (ya pagado si tienes cuenta)
- **No hay tarifa por extensión**: Puedes publicar múltiples extensiones
- **Extensión gratuita**: No cobras a usuarios
- **Monetización** (opcional): Puedes agregar donaciones o versión premium después

## 📞 Soporte

**Si la revisión es rechazada**:
1. Lee cuidadosamente el motivo
2. Corrige los problemas indicados
3. Actualiza el ZIP
4. Vuelve a enviar

**Políticas importantes**:
- No usar logos de Google/Chrome sin permiso
- No hacer spam de keywords
- Descripción honesta de funcionalidades
- Respetar privacidad del usuario

## 🎯 Checklist Final

Antes de publicar, verifica:

- [ ] Iconos creados (16, 32, 48, 128 px)
- [ ] ZIP creado y verificado
- [ ] Screenshots tomados (mínimo 1)
- [ ] Descripción completa
- [ ] Categoría seleccionada
- [ ] Permisos justificados
- [ ] Probado en Chrome
- [ ] Sin errores en consola
- [ ] Funciona en SENCE

## 📚 Recursos Útiles

- **Dashboard**: https://chrome.google.com/webstore/devconsole/
- **Documentación**: https://developer.chrome.com/docs/webstore/
- **Políticas**: https://developer.chrome.com/docs/webstore/program-policies/
- **Calidad**: https://developer.chrome.com/docs/webstore/best_practices/

---

## 🚀 Comando Rápido para Crear ZIP

```bash
cd "/Users/pablocutino/Documents/Repositorios Proyectos Personales/Extensión Chrome - Recordatorio Aula virtual"

# Crear ZIP optimizado
zip -r recordatorio-aula-virtual.zip \
  manifest.json \
  background.js \
  content.js \
  popup.html \
  popup.js \
  icons/ \
  LICENSE

# Verificar contenido
unzip -l recordatorio-aula-virtual.zip
```

¡Buena suerte con la publicación! 🎉
