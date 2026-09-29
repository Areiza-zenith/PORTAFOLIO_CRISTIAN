# Portafolio - Cristian Fabian Areiza (Entrega 2)

Sitio web tipo portafolio hecho con HTML, CSS, JavaScript y jQuery.
Esta es la segunda versión: toma la página de la Entrega 1 e implementa mejoras de interacción con el usuario.

## Cómo verlo

No necesita instalar nada ni un servidor.

1. Descargue o clone el repositorio: `git clone https://github.com/Areiza-zenith/PORTAFOLIO_CRISTIAN.git`
2. Abra `index.html` con doble clic en cualquier navegador (Chrome, Firefox, Edge o Safari).

También se puede ver en línea: https://areiza-zenith.github.io/PORTAFOLIO_CRISTIAN/

jQuery está incluido en la carpeta `lib/`, así que la página funciona incluso sin internet
(sin internet solo cambia la tipografía por Arial y no carga la foto de perfil).

## Archivos

| Archivo | Contenido |
|---|---|
| `index.html` | Estructura y contenido de la página |
| `style.css` | Colores (tema claro y oscuro), distribución y diseño adaptable |
| `script.js` | Interactividad con jQuery |
| `lib/jquery-3.7.1.min.js` | Librería jQuery |

## Mejoras de la versión 2

- Menú adaptable a celular con botón hamburguesa.
- Resaltado en el menú de la sección que se está viendo y desplazamiento suave.
- Cambio entre modo oscuro y modo claro, recordado con `localStorage`.
- Filtro de proyectos por tecnología.
- Ventana modal para el detalle de cada proyecto (reemplaza el `alert()`), se cierra con Esc o clic afuera.
- Formulario de contacto con validación en tiempo real y contador de caracteres.
- Botón para copiar el correo y botón para volver arriba.
- Accesibilidad: foco visible, enlace "Saltar al contenido", atributos ARIA y respeto por la preferencia de movimiento reducido.
