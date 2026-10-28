<div align="center">

# 🌿 Piccolo Giardino

### Un pequeño jardín pensado para dar vida a tu rincón favorito.

Catálogo online de un vivero tucumano: mirá las plantas, filtrá según la luz de tu casa y pedí por WhatsApp en un clic.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-animaciones-C85A32?style=for-the-badge)
![Hecho en Tucumán](https://img.shields.io/badge/Hecho_en-Tucumán_🇦🇷-3A5A40?style=for-the-badge)

</div>

---

## 🌱 ¿De qué va esto?

Piccolo Giardino es una web para un vivero de **San Miguel de Tucumán**. No hay pasarela de pago ni registro de usuarios: el cliente arma su pedido, y con un botón se genera un **mensaje de WhatsApp listo para enviar** con la lista, las cantidades y el total. Simple, rápido y como se vende de verdad en un vivero.

> 🛵 Los envíos se hacen en el día con **Uber Flash / Uber Envíos** por San Miguel de Tucumán, Yerba Buena y Tafí Viejo. También se puede retirar en el local.

## ✨ Qué tiene

| | |
|---|---|
| 🪴 **Catálogo con fotos y precios** | Tarjetas con etiquetas (nuevo, oferta, pet-friendly, poca luz) y estado de stock |
| 🔎 **Buscador y filtros** | Por categoría, luz, riego, interior/exterior, mascotas y orden por precio |
| 🛒 **Pedido por WhatsApp** | Carrito lateral que genera el mensaje automático con el total en pesos argentinos |
| 💾 **Carrito que no se pierde** | Se guarda en el navegador si el cliente recarga la página |
| 🔍 **Vista de detalle** | Modal con galería, descripción, cuidados y tamaño de maceta |
| 🎞️ **Animaciones suaves** | Entrada del hero, scroll reveal, filtros animados y microinteracciones |
| 📚 **Guía de cuidados** | Consejos de riego, luz, sustrato y plagas |
| 💬 **Confianza** | Sobre nosotros, cómo comprar, testimonios y preguntas frecuentes |
| 📍 **Contacto** | Mapa de Google Maps, horarios y redes |
| 🔗 **SEO local** | Metadata, Open Graph y datos estructurados de `GardenStore` |
| ♿ **Accesible** | Navegación por teclado, contraste cuidado y respeto de `prefers-reduced-motion` |
| 📱 **Mobile-first** | Pensada para clientes que entran desde el celular |

## 🧰 Tecnologías

- **[Next.js](https://nextjs.org/)** (App Router) con **TypeScript**
- **[Tailwind CSS v4](https://tailwindcss.com/)** para los estilos
- **[Motion](https://motion.dev/)** para las animaciones
- **[Lucide](https://lucide.dev/)** para los iconos
- **Playfair Display** + **Plus Jakarta Sans** con `next/font`
- Fotos de **[Unsplash](https://unsplash.com/)** (de ejemplo)

## 🚀 Probalo en tu compu

Necesitás [Node.js](https://nodejs.org/) (versión LTS).

```bash
# 1. Cloná el repositorio
git clone https://github.com/RizzaNicolasMatias/Web-Page-botanic.git
cd Web-Page-botanic

# 2. Instalá las dependencias
npm install

# 3. Arrancá el servidor de desarrollo
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) y listo. 🌿

> Si el puerto 3000 está ocupado, Next te avisa en la terminal qué puerto usa.

## ✏️ Cómo cambiar productos, precios y datos

**Todo el contenido vive en un solo archivo:** `src/data/products.ts`. No hace falta tocar el diseño.

- **Productos:** agregá, editá o borrá objetos de la lista `PRODUCTS` (nombre, precio, fotos, stock, cuidados, etc.).
- **Datos del negocio:** en `SITE_CONFIG` cambiás el nombre, WhatsApp, dirección, horarios, Instagram, email y mapa.
- **Fotos propias:** guardalas en la carpeta `public/` y poné su ruta en el campo `images` del producto (por ejemplo `/fotos/monstera.jpg`).

> ⚠️ Los datos de contacto que vienen cargados (WhatsApp, dirección, email) son **de ejemplo**. Reemplazalos por los reales antes de publicar.

## 🗂️ Estructura

```
src/
├── app/
│   ├── layout.tsx        # Tipografías, metadata y SEO local
│   ├── page.tsx          # Página principal y lógica del carrito
│   └── globals.css       # Paleta de colores y estilos base
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── CategoriesSection.tsx
│   ├── CatalogSection.tsx
│   ├── ProductDetailModal.tsx
│   ├── CartDrawer.tsx
│   ├── StoreSections.tsx # Cuidados, nosotros, envíos, FAQ, contacto y footer
│   └── BotanicalSvgs.tsx # Ilustraciones de hojas en SVG
├── data/
│   └── products.ts       # Productos y datos del negocio
└── lib/
    └── utils.ts          # Formato de pesos y links de WhatsApp
```

## 🎨 Paleta

| Color | Hex | Uso |
|---|---|---|
| 🟤 Crema | `#FAF7F2` | Fondo general |
| 🌿 Salvia | `#EFF3EE` | Secciones y tarjetas |
| 🌲 Verde bosque | `#1B3B2B` | Títulos y botones |
| 🫒 Verde oliva | `#3A5A40` | Detalles |
| 🧡 Terracota | `#C85A32` | Acento y llamadas a la acción |

## 🌍 Publicarlo gratis

La forma más fácil es **[Vercel](https://vercel.com/)**: subí el proyecto a GitHub, entrá a Vercel con tu cuenta, elegí **Add New → Project**, seleccioná el repositorio y pulsá **Deploy**. En un minuto tenés un link público.

## 🗺️ Próximas ideas

- [ ] Fotos reales del vivero y de cada planta
- [ ] Blog de cuidados y consejos de temporada
- [ ] Reseñas reales de clientes
- [ ] Pagos online (Mercado Pago)
- [ ] Panel simple para editar productos sin tocar código

## 👤 Autor

Hecho con 💚 por **[Nicolás Rizza](https://github.com/RizzaNicolasMatias)** en San Miguel de Tucumán.

---

<div align="center">

🌱 *Cada planta empieza siendo un proyecto pequeño.*

</div>
