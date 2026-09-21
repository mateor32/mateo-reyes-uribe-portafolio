import type { PortfolioItem } from "@/types";

// TODO: reemplazar con tu información real.
// Todos los datos de este archivo son de ejemplo.

// TODO: las imágenes todavía no existen. Coloca un archivo por proyecto en
// public/images/portfolio/ con el nombre indicado en `imageUrl`, o cambia la
// ruta. Mientras falten, next/image devolverá 404 en esas cards.

/**
 * Proyectos del portafolio.
 *
 * `repoUrl` y `liveUrl` son opcionales: omite el que no aplique y la card
 * simplemente no mostrará ese enlace.
 */
export const portfolioItems: PortfolioItem[] = [
  {
    id: "dashboard-analitica",
    title: "Panel de Analítica",
    shortDescription:
      "Dashboard en tiempo real para métricas de producto, con gráficos interactivos.",
    longDescription:
      "Panel de control construido con Next.js y TypeScript que agrupa las métricas de uso de un producto SaaS. Incluye filtros por rango de fechas, comparación entre periodos y gráficos interactivos renderizados en el cliente. El mayor reto fue mantener la interfaz fluida con series de varios miles de puntos: se resolvió agregando los datos en el servidor y virtualizando las tablas.",
    imageUrl: "/images/portfolio/panel-analitica.jpg",
    repoUrl: "https://github.com/tu-usuario/panel-analitica",
    liveUrl: "https://panel-analitica.vercel.app",
  },
  {
    id: "tienda-online",
    title: "Tienda Online",
    shortDescription:
      "E-commerce con catálogo filtrable, carrito persistente y pasarela de pago.",
    longDescription:
      "Tienda construida sobre Next.js con renderizado estático del catálogo y revalidación incremental. El carrito vive en el almacenamiento local y se sincroniza al iniciar sesión. Se trabajó especialmente el rendimiento de las fichas de producto: imágenes optimizadas, carga diferida y una puntuación de 98 en Lighthouse para móvil.",
    imageUrl: "/images/portfolio/tienda-online.jpg",
    repoUrl: "https://github.com/tu-usuario/tienda-online",
    liveUrl: "https://tienda-demo.vercel.app",
  },
  {
    id: "app-tareas",
    title: "Gestor de Tareas",
    shortDescription:
      "Aplicación de tareas con tableros arrastrables y atajos de teclado.",
    longDescription:
      "Gestor de tareas estilo kanban con columnas personalizables y reordenamiento mediante arrastrar y soltar. Toda la aplicación es navegable por teclado y compatible con lectores de pantalla, incluidas las operaciones de arrastre, que cuentan con una alternativa accesible basada en atajos.",
    imageUrl: "/images/portfolio/gestor-tareas.jpg",
    repoUrl: "https://github.com/tu-usuario/gestor-tareas",
  },
  {
    id: "sitio-restaurante",
    title: "Sitio para Restaurante",
    shortDescription:
      "Sitio de una página con carta digital, galería y reservas por WhatsApp.",
    longDescription:
      "Landing de una sola página para un restaurante local, con carta digital navegable por categorías, galería de fotos y un botón de reservas que abre una conversación de WhatsApp con el mensaje precargado. Sin backend: todo el contenido se edita desde archivos de datos, igual que en este portafolio.",
    imageUrl: "/images/portfolio/sitio-restaurante.jpg",
    liveUrl: "https://restaurante-demo.vercel.app",
  },
  {
    id: "sistema-diseno",
    title: "Sistema de Diseño",
    shortDescription:
      "Librería de componentes React documentada y publicada como paquete.",
    longDescription:
      "Sistema de diseño con más de cuarenta componentes accesibles, tokens de color y tipografía, y documentación interactiva. Se publica como paquete npm privado y se consume desde tres aplicaciones internas, lo que redujo a la mitad el tiempo de arranque de cada nueva pantalla.",
    imageUrl: "/images/portfolio/sistema-diseno.jpg",
    repoUrl: "https://github.com/tu-usuario/sistema-diseno",
    liveUrl: "https://sistema-diseno-docs.vercel.app",
  },
  {
    id: "blog-tecnico",
    title: "Blog Técnico",
    shortDescription:
      "Blog en MDX con búsqueda instantánea y resaltado de sintaxis.",
    longDescription:
      "Blog personal escrito en MDX y generado estáticamente. Incluye búsqueda instantánea sobre un índice creado en tiempo de compilación, resaltado de sintaxis en el servidor para no enviar el resaltador al navegador, y feed RSS. Los artículos se escriben como archivos Markdown dentro del repositorio.",
    imageUrl: "/images/portfolio/blog-tecnico.jpg",
    repoUrl: "https://github.com/tu-usuario/blog-tecnico",
    liveUrl: "https://blog-demo.vercel.app",
  },
];
