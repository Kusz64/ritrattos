# Estudio de Retratos Personalizados — Plan del sitio

Mi opinión sobre tu documento: está muy bien planteado. Es claro, ordenado y realista, y cubre lo que de verdad importa (emoción en el inicio, portafolio que vende, formulario que funciona, confianza legal). Lo construyo completo tal como lo pides, con dos ajustes menores que explico al final.

## Páginas

- **Inicio** — título emotivo + subtítulo, botón principal "Encargar un Retrato", botón secundario discreto "Ver Certificados y Diplomas", muestra de 3 piezas destacadas y 3-4 testimonios cortos con la foto del retrato.
- **Portafolio** — cuadrícula con filtros: Todos, Mascotas, Personas, Digital, Certificados y Diplomas. Comparador antes/después deslizable en las piezas destacadas. Cada imagen con texto descriptivo para buscadores y carga diferida.
- **Proceso** — 3 pasos (subes tu foto → apruebas el boceto → recibes tu obra) con tiempos estimados en cada uno.
- **Encargar** — formulario real (ver abajo).
- **Términos y Privacidad** — tratamiento de las fotos, plazos de entrega, reembolsos y cómo se coordina el pago.

Menú y pie de página comunes en todas las páginas.

## Formulario de pedido (funciona de verdad)

- Datos de contacto, estilo (óleo / digital / certificado o diploma), tamaño, mensaje.
- Subida de fotos en alta calidad guardadas en almacenamiento real, con límite de tamaño y validación de formato (JPG, PNG, WEBP, HEIC). Vista previa y posibilidad de quitar una foto antes de enviar.
- Cada pedido queda guardado para que puedas consultarlo.
- Correo automático de confirmación al cliente y aviso al estudio con el detalle y enlaces a las fotos.
- Aviso de privacidad visible junto al formulario, con casilla de aceptación.

## Estilo visual

Paleta cálida minimalista (crema, tierra, dorado sutil), títulos en serif refinada y texto en sans-serif limpia. Diseño pensado primero para móvil. Sin animaciones pesadas.

## Buscadores y rendimiento

- Título y descripción propios en cada página, con palabras clave de retratos al óleo y retratos de mascotas.
- Un solo título principal por página, estructura de encabezados jerárquica.
- sitemap.xml y robots.txt.
- Datos estructurados de negocio local y de producto en las piezas del portafolio.
- Espacio preparado para pegar los códigos de Google Search Console y Google Analytics.
- Imágenes en formato ligero y carga diferida.

## Detalles técnicos

- TanStack Start con rutas propias por página (`/`, `/portafolio`, `/proceso`, `/encargar`, `/legal`).
- Lovable Cloud para base de datos (tabla `orders` con RLS y permisos explícitos), almacenamiento privado de fotos con subida firmada, y envío de correos transaccionales.
- Validación con Zod en el navegador y de nuevo en el servidor antes de guardar.
- Tokens de color y tipografía definidos en `src/styles.css`; sin colores fijos en los componentes.
- Datos estructurados JSON-LD por página; `sitemap.xml` y `robots.txt` servidos desde rutas públicas.

## Dos cosas a tener en cuenta

1. **Contenido real**: usaré imágenes de muestra generadas y textos de ejemplo para el portafolio y los testimonios. Cuando me pases tus fotos, testimonios y datos (ciudad, correo, precios) los reemplazo.
2. **Correo y dominio**: para que los correos salgan a tu nombre habrá que configurar tu dominio de envío; te guío cuando lleguemos a ese paso.
