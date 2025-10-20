# 🎓 Configuración para Aula Digital SENCE

Esta extensión ha sido optimizada específicamente para funcionar con **Aula Digital SENCE** (https://auladigital.sence.cl/).

## 🎯 Características específicas para SENCE

La extensión detecta automáticamente cuando estás en Aula Digital SENCE y activa funcionalidades especiales:

### ✅ Tipos de enlaces detectados en SENCE:

1. **Módulos SCORM** - Contenido interactivo común en cursos SENCE
2. **Cuestionarios y evaluaciones** - Actividades de evaluación
3. **Tareas y entregas** - Trabajos para entregar
4. **Foros de discusión** - Espacios de participación
5. **Recursos y archivos** - Materiales del curso
6. **Páginas de contenido** - Lecciones y material teórico
7. **Actividades interactivas** - Cualquier actividad del curso

## 🚀 Cómo usar con SENCE

### 1. Instalación inicial
- Carga la extensión en Chrome (modo desarrollador)
- Abre https://auladigital.sence.cl/
- Haz clic en el ícono de la extensión

### 2. Configuración recomendada para SENCE

**Intervalo sugerido:** 30-35 minutos
- SENCE requiere actividad continua para contabilizar horas
- Un intervalo de 30-35 min es óptimo para mantener la sesión activa
- Puedes ajustarlo según tus necesidades (5-120 min disponibles)

**Plataforma:** Selecciona "Aula Digital SENCE" o deja en "Detección automática"

### 3. Durante tu curso SENCE

1. **Inicia sesión** en Aula Digital SENCE con tu ClaveÚnica
2. **Entra a tu curso** activo
3. **Activa la extensión** desde el popup
4. La extensión:
   - ✅ Detectará automáticamente que estás en SENCE
   - ✅ Identificará todos los enlaces relevantes del curso
   - ✅ Te recordará hacer clic cada 30-35 minutos
   - ✅ Resaltará los enlaces cuando recibas la notificación

### 4. Al recibir una notificación

Cuando aparezca el recordatorio:
1. **Haz clic en la notificación** para ir al aula virtual
2. Los **enlaces se resaltarán automáticamente** en amarillo
3. **Haz clic en cualquier enlace resaltado**:
   - Módulos del curso
   - Recursos
   - Foros
   - Páginas de contenido
   - Evaluaciones
4. El resaltado desaparecerá después de 10 segundos

## 🔍 Elementos específicos detectados en SENCE

La extensión busca estos patrones en Aula Digital SENCE:

```javascript
// URLs detectadas:
- /mod/scorm/     → Módulos SCORM (muy común en SENCE)
- /mod/quiz/      → Cuestionarios
- /mod/assign/    → Tareas
- /mod/forum/     → Foros
- /mod/resource/  → Recursos y archivos
- /mod/page/      → Páginas de contenido
- /course/view    → Vista del curso
```

## ⚙️ Configuración avanzada para SENCE

### Intervalos recomendados según tipo de curso:

**Cursos intensivos (varias horas al día):**
- Intervalo: 25-30 minutos
- Mayor frecuencia para cursos que requieren mucha participación

**Cursos estándar (2-4 horas al día):**
- Intervalo: 30-35 minutos (recomendado)
- Balance óptimo entre recordatorios y estudio

**Cursos extensos (estudio prolongado):**
- Intervalo: 35-40 minutos
- Para sesiones largas sin interrupciones constantes

### Tips para maximizar las horas en SENCE:

1. ✅ **Mantén la pestaña abierta** - No cierres el navegador
2. ✅ **Responde a los recordatorios** - Haz clic cuando te lo indique
3. ✅ **Navega por el contenido** - Explora módulos, recursos, foros
4. ✅ **Participa activamente** - Lee materiales, haz evaluaciones
5. ⚠️ **No uses autorefresh** - SENCE puede detectarlo como inactivo

## 🔒 Privacidad y seguridad

- ✅ **No recopila datos** de tu sesión SENCE
- ✅ **No accede a tu ClaveÚnica**
- ✅ **No modifica contenido** del curso
- ✅ **Solo detecta enlaces** públicos en la página
- ✅ **Funciona localmente** en tu navegador

## 🐛 Solución de problemas en SENCE

### La extensión no detecta SENCE
**Solución:** 
- Verifica que estés en https://auladigital.sence.cl/
- Cambia manualmente a "Aula Digital SENCE" en el selector de plataforma
- Refresca la página después de activar la extensión

### No encuentro enlaces para hacer clic
**Solución:**
- Asegúrate de estar **dentro de un curso** (no en la página principal)
- Los enlaces solo aparecen en las secciones de contenido del curso
- Navega a "Mi curso" o "Contenido del curso"

### Las notificaciones no aparecen
**Solución:**
- Verifica que los permisos de notificaciones estén activados
- Revisa que la extensión esté habilitada (toggle en verde)
- Prueba con el botón "Probar Notificación"

### Los enlaces no se resaltan
**Solución:**
- Espera 1-2 segundos después de recibir la notificación
- Refresca la página si no aparecen
- El resaltado dura 10 segundos automáticamente

## 📊 Estadísticas de uso

La extensión rastrea localmente (sin enviar datos):
- Cantidad de clics en enlaces
- Última actividad registrada
- Enlaces encontrados en cada página

## ⚠️ Importante

Esta extensión es una **herramienta de apoyo** para:
- Recordarte mantener actividad en el aula
- Facilitar la navegación del curso
- Ayudarte a aprovechar el tiempo de estudio

**NO es un sustituto de:**
- Participación real en el curso
- Lectura de materiales
- Realización de evaluaciones
- Aprendizaje activo

## 📞 Soporte específico para SENCE

Si tienes problemas específicos con Aula Digital SENCE:

1. Verifica que estés usando la versión más reciente de Chrome
2. Revisa que no tengas otras extensiones que interfieran
3. Limpia caché y cookies de auladigital.sence.cl si es necesario
4. Reporta problemas en el repositorio de GitHub

---

**¡Éxito con tus cursos SENCE! 📚✨**

Recuerda: Esta extensión te ayuda a mantener la actividad, pero el aprendizaje depende de tu participación activa y compromiso con el curso.
