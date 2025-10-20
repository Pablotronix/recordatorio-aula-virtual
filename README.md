# 🔔 Recordatorio Aula Virtual - Extensión Chrome

Una extensión de Chrome diseñada para ayudar a estudiantes a mantener su actividad en plataformas de aulas virtuales mediante recordatorios automáticos para hacer clic en enlaces.

## 🎯 Optimizado para Aula Digital SENCE

**¡Especialmente configurado para [Aula Digital SENCE](https://auladigital.sence.cl/)!** 🇨🇱

Esta extensión detecta automáticamente cuando estás en la plataforma de SENCE y optimiza la detección de enlaces y módulos SCORM. Ver [Guía específica para SENCE](./SENCE-CONFIG.md).

## 💡 Propósito

Muchas plataformas educativas solo contabilizan las horas efectivas conectadas cuando el estudiante tiene alguna actividad (como hacer clic en enlaces). Esta extensión envía recordatorios configurables cada 30-40 minutos para ayudar a los estudiantes a mantener su sesión activa.

## ✨ Características

- **Recordatorios configurables**: Intervalo personalizable entre 5 y 120 minutos
- **Detección automática de plataformas**: Soporte para Moodle, Blackboard, Canvas y aulas virtuales genéricas
- **Resaltado de enlaces**: Destaca automáticamente los enlaces relevantes para hacer clic
- **Notificaciones inteligentes**: Solo muestra recordatorios cuando estás en una plataforma educativa
- **Interfaz intuitiva**: Popup moderno y fácil de usar
- **Modo de prueba**: Función para probar las notificaciones

## 🚀 Instalación

### Instalación desde archivos (Modo desarrollador)

1. **Descarga o clona este repositorio** en tu computadora

2. **Abre Chrome** y navega a `chrome://extensions/`

3. **Activa el "Modo de desarrollador"** (toggle en la esquina superior derecha)

4. **Haz clic en "Cargar extensión sin empaquetar"**

5. **Selecciona la carpeta** donde descargaste/clonaste este proyecto

6. **¡Listo!** Verás el ícono de la extensión en la barra de herramientas

### Configuración inicial

1. **Haz clic en el ícono** de la extensión en la barra de herramientas
2. **Activa los recordatorios** con el toggle
3. **Configura el intervalo** deseado (recomendado: 30-40 minutos)
4. **Selecciona tu plataforma** o deja en "Detección automática"

## 🔧 Uso

### Configuración básica

- **Activar/Desactivar**: Usa el toggle para encender o apagar los recordatorios
- **Intervalo**: Ajusta cada cuántos minutos quieres recibir recordatorios
- **Plataforma**: Selecciona tu plataforma educativa específica o usa detección automática

### Durante una sesión de estudio

1. **Abre tu aula virtual** en Chrome
2. **La extensión detectará automáticamente** que estás en una plataforma educativa
3. **Recibirás notificaciones** según el intervalo configurado
4. **Haz clic en la notificación** para ser dirigido al aula virtual
5. **Los enlaces relevantes se resaltarán** automáticamente para facilitar la navegación

### Funciones adicionales

- **Botón "Probar Notificación"**: Verifica que las notificaciones funcionan
- **Posponer**: En las notificaciones, puedes posponer 5 minutos más
- **Estado visual**: El popup muestra claramente si está activo/inactivo

## 🏫 Plataformas Soportadas

### ⭐ Soporte Premium:
- **Aula Digital SENCE** 🇨🇱 - Detección optimizada de módulos SCORM, evaluaciones y recursos
  - Ver [guía específica para SENCE](./SENCE-CONFIG.md)

### Detección automática para:
- **Moodle** - Detecta módulos, cursos, tareas, foros
- **Blackboard** - Identifica contenido, evaluaciones, discusiones
- **Canvas** - Reconoce tareas, quizzes, módulos
- **Google Classroom** - Soporte básico para aulas de Google
- **Plataformas genéricas** - Detecta palabras clave educativas

### Tipos de enlaces detectados:
- 📚 Módulos y lecciones
- 🎓 Módulos SCORM (especialmente para SENCE)
- 📝 Tareas y evaluaciones
- 💬 Foros y discusiones
- 📊 Quizzes y exámenes
- 📖 Contenido del curso
- 📄 Páginas y recursos

## ⚙️ Configuración Avanzada

### Personalización de intervalos
- **Mínimo**: 5 minutos (para estudios intensivos)
- **Recomendado**: 30-40 minutos (balance óptimo)
- **Máximo**: 120 minutos (sesiones largas)

### Permisos explicados
- **Storage**: Guardar tus preferencias de configuración
- **Notifications**: Mostrar recordatorios de actividad
- **Alarms**: Programar recordatorios en intervalos regulares
- **ActiveTab**: Detectar cuando estás en una plataforma educativa

## 🛠️ Desarrollo

### Estructura del proyecto
```
/
├── manifest.json          # Configuración de la extensión
├── popup.html             # Interfaz de configuración
├── popup.js               # Lógica del popup
├── background.js          # Service worker (gestión de alarmas)
├── content.js             # Script que se ejecuta en las páginas
├── icons/                 # Iconos de la extensión
└── README.md             # Esta documentación
```

### Tecnologías utilizadas
- **Chrome Extension Manifest V3**
- **Vanilla JavaScript** (sin dependencias)
- **Chrome APIs**: Storage, Notifications, Alarms, Tabs
- **CSS3** con efectos modernos

### Para desarrolladores

1. **Clona el repositorio**:
   ```bash
   git clone [URL_DEL_REPO]
   cd extension-recordatorio-aula-virtual
   ```

2. **Carga en Chrome** en modo desarrollador

3. **Realiza cambios** en los archivos

4. **Recarga la extensión** en `chrome://extensions/`

## 🔒 Privacidad y Seguridad

- ✅ **No recopila datos personales**
- ✅ **Toda la configuración se guarda localmente**
- ✅ **No envía información a servidores externos**
- ✅ **Solo actúa en páginas de aulas virtuales**
- ✅ **Código fuente abierto y auditable**

## 🐛 Solución de Problemas

### Las notificaciones no aparecen
1. Verifica que la extensión esté activada
2. Comprueba que los permisos de notificaciones estén habilitados
3. Asegúrate de estar en una plataforma educativa detectada

### La extensión no detecta mi plataforma
1. Cambia de "Detección automática" a "Genérica"
2. Verifica que la URL contenga palabras como "aula", "campus", "educativa"
3. Reporta el problema con la URL para añadir soporte

### Los enlaces no se resaltan
1. Algunas plataformas tienen estructuras complejas
2. Prueba refrescando la página después de recibir una notificación
3. El resaltado se quita automáticamente después de 10 segundos

## 📝 Registro de Cambios

### Versión 1.0
- ✨ Primera versión funcional
- 🎯 Soporte para Moodle, Blackboard, Canvas
- 🔔 Sistema de notificaciones configurable
- 🎨 Interfaz moderna y intuitiva
- 📱 Resaltado automático de enlaces

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! 

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o sugerencias:

1. **Revisa la sección de solución de problemas** más arriba
2. **Abre un issue** en el repositorio de GitHub
3. **Incluye información específica**: versión de Chrome, plataforma educativa, mensaje de error (si hay)

## 🎓 Uso Responsable

Esta extensión está diseñada para ayudar a los estudiantes a mantener su presencia en aulas virtuales de manera legítima. Úsala de forma responsable y siempre participa activamente en tus clases y actividades educativas.

---

**¡Buena suerte con tus estudios! 📚✨**