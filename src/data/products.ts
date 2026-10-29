import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export type ProductCategory =
  | "interior"
  | "exterior"
  | "frutales"
  | "suculentas"
  | "macetas"
  | "insumos";

export type LightLevel = "sol" | "semisombra" | "sombra";
export type WaterLevel = "poco" | "medio" | "mucho";
export type EnvironmentType = "interior" | "exterior" | "ambos";
export type StockStatus = "disponible" | "pocas_unidades" | "agotado";
export type ProductBadge = "nuevo" | "oferta" | "poca_luz" | "pet_friendly" | "agotado";

export interface Product {
  id: string;
  name: string;
  scientificName?: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  badges: ProductBadge[];
  stock: StockStatus;
  images: string[];
  shortDescription: string;
  description: string;
  potSize: string;
  light: LightLevel;
  water: WaterLevel;
  environment: EnvironmentType;
  petFriendly: boolean;
  careTips: string[];
  featured?: boolean;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  city: string;
  address: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  instagramUser: string;
  instagramUrl: string;
  email: string;
  hours: string[];
  shippingInfo: string;
  googleMapsEmbed: string;
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  description: string;
  image: string;
}

/* =========================================================
   DATOS DE RESPALDO AUTOMÁTICO (FALLBACK SI SANITY FALLA)
   ========================================================= */
export const SITE_CONFIG: SiteConfig = {
  name: "Piccolo Giardino",
  tagline: "Vivero Boutique & Refugio Botánico en Tucumán",
  city: "San Miguel de Tucumán, Tucumán",
  address: "Av. Mate de Luna 2850, San Miguel de Tucumán",
  whatsappNumber: "5493815550192",
  whatsappDisplay: "+54 9 381 555-0192",
  instagramUser: "piccologiardino.tuc",
  instagramUrl: "https://instagram.com/piccologiardino.tuc",
  email: "hola@piccologiardino.com.ar",
  hours: [
    "Lunes a Sábados: 9:00 a 13:00 hs y 17:00 a 20:30 hs",
    "Domingos y Feriados: 10:00 a 13:30 hs",
  ],
  shippingInfo:
    "Enviamos en el día a todo San Miguel de Tucumán, Yerba Buena y Tafí Viejo mediante Uber Flash / Uber Envíos. También podés retirar sin cargo por nuestro vivero.",
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56964.26946958176!2d-65.25263565!3d-26.83149595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94223792d6c56903%3A0xf88d5b92b5c56527!2sSan%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses-419!2sar!4v1710000000000!5m2!1ses-419!2sar",
};

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "interior",
    name: "Plantas de Interior",
    description: "Follajes tropicales que purifican y llenan de vida tu casa.",
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "exterior",
    name: "Plantas de Exterior",
    description: "Especies resistentes al sol tucumano para balcones y jardines.",
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "frutales",
    name: "Árboles Frutales",
    description: "Cítricos certificados y frutales listos para maceta o tierra.",
    image:
      "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "suculentas",
    name: "Suculentas y Cactus",
    description: "Pequeñas joyas botánicas de bajo mantenimiento.",
    image:
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "macetas",
    name: "Macetas Artesanales",
    description: "Barro cocido, cerámica esmaltada y fibrocemento.",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "insumos",
    name: "Sustratos y Herramientas",
    description: "Tierra fértil, humus, fertilizantes orgánicos y accesorios.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "monstera-deliciosa",
    name: "Monstera Deliciosa (Costilla de Adán)",
    scientificName: "Monstera deliciosa",
    category: "interior",
    price: 24500,
    originalPrice: 28000,
    badges: ["oferta", "nuevo"],
    stock: "disponible",
    images: [
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription: "La reina del interior por sus hojas fenestradas y porte tropical.",
    description:
      "Cultivada bajo media sombra en nuestro vivero de Tucumán, esta Monstera ya presenta hojas grandes y saludables con sus clásicas aberturas. Es ideal para livings luminosos sin sol directo.",
    potSize: "Maceta de cultivo N° 22 (5 litros) — Altura aprox. 65 cm",
    light: "semisombra",
    water: "medio",
    environment: "interior",
    petFriendly: false,
    careTips: [
      "Ubicar cerca de una ventana luminosa evitando el sol directo de la siesta.",
      "Regar solo cuando los primeros 4 cm del sustrato estén secos.",
      "Limpiar sus hojas con un paño húmedo una vez al mes para que respire mejor.",
    ],
    featured: true,
  },
  {
    id: "calathea-orbifolia",
    name: "Calathea Orbifolia",
    scientificName: "Goeppertia orbifolia",
    category: "interior",
    price: 19800,
    badges: ["pet_friendly", "poca_luz"],
    stock: "pocas_unidades",
    images: [
      "https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription: "Hojas redondeadas con pinceladas plateadas; 100% segura para mascotas.",
    description:
      "Una planta de colección que mueve sus hojas suavemente entre el día y la noche. Al no ser tóxica, es la compañera perfecta si convivís con perros o gatos curiosos.",
    potSize: "Maceta N° 18 — Altura aprox. 40 cm",
    light: "sombra",
    water: "mucho",
    environment: "interior",
    petFriendly: true,
    careTips: [
      "Agradece la humedad ambiental (ideal pulverizar sus hojas en días secos).",
      "Mantener el sustrato ligeramente húmedo pero nunca encharcado.",
      "Tolera rincones con luz media o baja.",
    ],
    featured: true,
  },
  {
    id: "sansevieria-zeylanica",
    name: "Sansevieria (Lengua de Suegra)",
    scientificName: "Dracaena trifasciata",
    category: "interior",
    price: 14200,
    badges: ["poca_luz"],
    stock: "disponible",
    images: [
      "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1620127252536-03bdfcf6d5c3?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription: "Todoterreno, escultural y purificadora de aire. Casi indestructible.",
    description:
      "Perfecta para quienes recién empiezan o tienen poco tiempo. Se adapta tanto a dormitorios con poca luz como a galerías luminosas y necesita muy pocos riegos.",
    potSize: "Maceta N° 18 — Altura aprox. 55 cm",
    light: "sombra",
    water: "poco",
    environment: "ambos",
    petFriendly: false,
    careTips: [
      "En invierno regar cada 15 o 20 días; en verano cada 7 a 10 días.",
      "Usar sustrato con muy buen drenaje para cuidar sus raíces.",
    ],
  },
  {
    id: "ficus-pandurata",
    name: "Ficus Pandurata (Lyrata)",
    scientificName: "Ficus lyrata",
    category: "interior",
    price: 32000,
    badges: ["nuevo"],
    stock: "disponible",
    images: [
      "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription: "El árbol de interior favorito de los arquitectos y diseñadores.",
    description:
      "Ejemplar bien ramificado, aclimatado en Tucumán para no sufrir cambios bruscos al llegar a tu hogar. Sus hojas en forma de violín visten cualquier rincón.",
    potSize: "Maceta N° 24 (7 litros) — Altura aprox. 95 cm",
    light: "semisombra",
    water: "medio",
    environment: "interior",
    petFriendly: false,
    careTips: [
      "Necesita mucha luz natural indirecta y evitar corrientes de aire frío o aire acondicionado directo.",
      "Girar la maceta un cuarto de vuelta cada mes para que crezca derecho.",
    ],
    featured: true,
  },
  {
    id: "limonero-4-estaciones",
    name: "Limonero 4 Estaciones Injertado",
    scientificName: "Citrus × limon",
    category: "frutales",
    price: 26500,
    badges: ["pet_friendly", "nuevo"],
    stock: "disponible",
    images: [
      "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription: "El clásico orgullo tucumano, certificado y apto para maceta grande o jardín.",
    description:
      "Plantín injertado de rápida entrada en producción. Da flores perfumadas de azahar y limones jugosos durante casi todo el año. Se adapta excelente a balcones soleados o jardines.",
    potSize: "Envase forestal de 10 litros — Altura aprox. 1,20 m",
    light: "sol",
    water: "medio",
    environment: "exterior",
    petFriendly: true,
    careTips: [
      "Requiere al menos 5 a 6 horas de sol directo por día.",
      "Abonar en primavera y fin del verano con humus de lombriz o fertilizante para cítricos.",
    ],
    featured: true,
  },
  {
    id: "kinoto-dulce",
    name: "Kinoto (Kumquat) en Producción",
    scientificName: "Citrus japonica",
    category: "frutales",
    price: 25900,
    badges: ["pet_friendly"],
    stock: "pocas_unidades",
    images: [
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription: "Frutal compacto y muy ornamental, ideal para patios, terrazas y balcones.",
    description:
      "De porte arbustivo y crecimiento lento, el Kinoto es el frutal que mejor vive en maceta. Sus frutos naranjas se comen con cáscara o son ideales para almíbar casero.",
    potSize: "Envase de 10 litros — Altura aprox. 1,00 m",
    light: "sol",
    water: "medio",
    environment: "exterior",
    petFriendly: true,
    careTips: [
      "Pleno sol para lograr una floración y fructificación abundante.",
      "Riego regular en primavera y verano, cuidando que drene bien.",
    ],
  },
  {
    id: "lavanda-dentata",
    name: "Lavanda Dentata Aromática",
    scientificName: "Lavandula dentata",
    category: "exterior",
    price: 8900,
    badges: ["pet_friendly", "oferta"],
    originalPrice: 10500,
    stock: "disponible",
    images: [
      "https://images.unsplash.com/photo-1565011523534-747a8601f10a?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription: "Perfume relajante, flores violetas casi todo el año y atracción de mariposas.",
    description:
      "La variedad Dentata es la que mejor resiste la humedad del verano tucumano. Ideal para canteros soleados, bordes de galería o macetas de barro.",
    potSize: "Maceta N° 16 — Altura aprox. 35 cm",
    light: "sol",
    water: "poco",
    environment: "exterior",
    petFriendly: true,
    careTips: [
      "Mucho sol directo y sustrato suelto con algo de arena o perlita.",
      "Podar suavemente las flores secas para mantener la mata compacta.",
    ],
  },
  {
    id: "jazmin-del-cabo",
    name: "Jazmín del Cabo (Gardenia)",
    scientificName: "Gardenia jasminoides",
    category: "exterior",
    price: 16500,
    badges: ["nuevo"],
    stock: "disponible",
    images: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription: "Follaje verde brillante y flores blancas de perfume inconfundible.",
    description:
      "Un clásico infaltable en los patios de Tucumán. Prefiere el sol suave de la mañana y la media sombra durante las horas más fuertes del verano.",
    potSize: "Maceta N° 20 — Altura aprox. 50 cm",
    light: "semisombra",
    water: "mucho",
    environment: "exterior",
    petFriendly: false,
    careTips: [
      "Requiere sustrato ácido (con pinocha o turba) para mantener sus hojas bien verdes.",
      "Riego frecuente en verano sin mojar las flores abiertas.",
    ],
  },
  {
    id: "trio-suculentas-coleccion",
    name: "Trío de Suculentas en Maceta de Barro",
    scientificName: "Echeveria & Haworthia spp.",
    category: "suculentas",
    price: 12500,
    badges: ["pet_friendly", "oferta"],
    originalPrice: 14800,
    stock: "disponible",
    images: [
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription: "Tres variedades seleccionadas ya plantadas en maceta de terracota artesanal.",
    description:
      "Listas para regalar o decorar escritorios y balcones. Incluye variedades no tóxicas con piedritas decorativas de río en la superficie.",
    potSize: "3 Macetas N° 10 de barro cocido incluidas",
    light: "sol",
    water: "poco",
    environment: "ambos",
    petFriendly: true,
    careTips: [
      "Darles sol de la mañana o mucha claridad junto a una ventana.",
      "Regar solo cuando la tierra esté completamente seca.",
    ],
    featured: true,
  },
  {
    id: "maceta-terracota-toscana",
    name: "Maceta Terracota Artesanal 'Toscana'",
    category: "macetas",
    price: 15900,
    badges: ["nuevo", "pet_friendly"],
    stock: "disponible",
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription: "Horneada a mano en barro natural poroso que cuida la salud de las raíces.",
    description:
      "Su porosidad natural permite que el sustrato respire y evita el exceso de humedad. Incluye plato de base haciendo juego y orificio de drenaje.",
    potSize: "Diámetro 24 cm × Alto 22 cm (Con plato incluido)",
    light: "sol",
    water: "poco",
    environment: "ambos",
    petFriendly: true,
    careTips: [
      "Si querés que armemos tu planta directamente en esta maceta sin costo extra, avisános en el pedido de WhatsApp.",
    ],
  },
  {
    id: "sustrato-premium-piccolo",
    name: "Sustrato Orgánico Multiuso (Bolsa 20 L)",
    category: "insumos",
    price: 9500,
    badges: ["pet_friendly"],
    stock: "disponible",
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription: "Mezcla aireada con compost orgánico, humus de lombriz, perlita y corteza.",
    description:
      "Nuestra receta propia formulada en el vivero. No se apelmaza con los riegos, nutre de forma natural durante 6 meses y asegura un drenaje impecable.",
    potSize: "Bolsa cerrada de 20 Litros (Rinde 4 a 5 macetas medianas)",
    light: "sol",
    water: "medio",
    environment: "ambos",
    petFriendly: true,
    careTips: [
      "Listo para usar directamente en trasplantes de interior, exterior y huerta.",
    ],
  },
  {
    id: "kit-herramientas-jardin",
    name: "Set de 3 Herramientas Mango de Madera + Fertilizante",
    category: "insumos",
    price: 18200,
    badges: ["agotado"],
    stock: "agotado",
    images: [
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription: "Pala ancha, pala de trasplante y rastrillo de acero + humus líquido orgánico.",
    description:
      "Herramientas ergonómicas de acero inoxidable con mango de fresno barnizado, acompañadas de un bioestimulante orgánico de 500 ml.",
    potSize: "Estuche de lienzo reutilizable",
    light: "sol",
    water: "poco",
    environment: "ambos",
    petFriendly: true,
    careTips: [
      "Limpiar y secar las herramientas luego de cada uso para conservar el filo y la madera.",
    ],
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Lucía Aráoz",
    neighborhood: "Barrio Norte, S.M. de Tucumán",
    text: "Pedí una Monstera y dos macetas de barro a las 10 de la mañana. Me mandaron fotos reales por WhatsApp para elegir la planta exacta y a las 11:30 ya la tenía en casa con Uber. ¡Impecable!",
    rating: 5,
  },
  {
    id: 2,
    name: "Martín Padilla",
    neighborhood: "Yerba Buena",
    text: "Se nota el amor que le ponen al vivero. Compré un limonero 4 estaciones y el sustrato que preparan ellos; ya está lleno de flores. Además te explican súper claro cómo regarlo.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sofía Colombres",
    neighborhood: "Centro, S.M. de Tucumán",
    text: "Tengo dos gatos en departamento y el filtro 'Pet-Friendly' de la página me salvó. Elegí dos Calatheas preciosas que llegaron súper protegidas.",
    rating: 5,
  },
];

export const FAQS = [
  {
    question: "¿Cómo funcionan los envíos mediante Uber en Tucumán?",
    answer:
      "Una vez que confirmamos tu pedido por WhatsApp y el pago por transferencia o Mercado Pago, embalamos tus plantas con protección especial para que no se muevan y coordinamos el envío mediante Uber Flash / Uber Envíos en el horario que te quede cómodo. Te compartimos el link de seguimiento en tiempo real.",
  },
  {
    question: "¿Puedo pedir que me entreguen la planta ya trasplantada en la maceta que elija?",
    answer:
      "¡Sí, totalmente gratis! Si comprás una planta y una maceta en Piccolo Giardino, nosotros hacemos el trasplante con drenaje y sustrato nutritivo sin costo adicional para que la recibas lista para lucirse.",
  },
  {
    question: "¿Qué medios de pago aceptan?",
    answer:
      "Aceptamos transferencia bancaria (con 10% de descuento), Mercado Pago (dinero en cuenta o tarjetas), y efectivo si retirás personalmente por nuestro vivero en San Miguel de Tucumán.",
  },
  {
    question: "¿Las fotos del catálogo son ilustrativas o puedo ver la planta antes del envío?",
    answer:
      "Cada planta es un ser vivo único. Las medidas y portes son los publicados, y apenas nos enviás tu pedido por WhatsApp te mandamos foto o video de los ejemplares disponibles en el vivero para que elijas el que más te guste.",
  },
  {
    question: "¿Qué hago si no sé qué planta conviene para la luz de mi casa?",
    answer:
      "Podés usar los filtros de nuestro catálogo ('Poca luz', 'Semisombra' o 'Sol') o escribirnos por WhatsApp enviando una foto del rincón donde querés ponerla. Te asesoramos sin compromiso.",
  },
];

/* =========================================================
   CONSULTAS GROQ A SANITY CON RESPALDO AUTOMÁTICO
   ========================================================= */
const PRODUCTS_GROQ_QUERY = `*[_type == "product"] | order(featured desc, _createdAt desc) {
  "id": coalesce(slug.current, _id),
  name,
  scientificName,
  category,
  price,
  originalPrice,
  badges,
  stock,
  images,
  externalImages,
  shortDescription,
  description,
  potSize,
  light,
  water,
  environment,
  petFriendly,
  careTips,
  featured
}`;

const CATEGORIES_GROQ_QUERY = `*[_type == "category"] | order(order asc) {
  id,
  name,
  description,
  image,
  externalImage
}`;

const SITE_SETTINGS_GROQ_QUERY = `*[_type == "siteSettings"][0] {
  name,
  tagline,
  city,
  address,
  whatsappNumber,
  whatsappDisplay,
  instagramUser,
  instagramUrl,
  email,
  hours,
  shippingInfo,
  googleMapsEmbed
}`;

export async function getStoreData(): Promise<{
  products: Product[];
  categories: CategoryInfo[];
  siteConfig: SiteConfig;
}> {
  if (!client) {
    return {
      products: PRODUCTS,
      categories: CATEGORIES,
      siteConfig: SITE_CONFIG,
    };
  }

  try {
    const [rawProducts, rawCategories, rawSettings] = await Promise.all([
      client.fetch(PRODUCTS_GROQ_QUERY, {}, { next: { tags: ["sanity-content"], revalidate: 10 } }),
      client.fetch(CATEGORIES_GROQ_QUERY, {}, { next: { tags: ["sanity-content"], revalidate: 10 } }),
      client.fetch(SITE_SETTINGS_GROQ_QUERY, {}, { next: { tags: ["sanity-content"], revalidate: 10 } }),
    ]);

    // Mapear productos de Sanity convirtiendo imágenes con @sanity/image-url
    const products: Product[] =
      Array.isArray(rawProducts) && rawProducts.length > 0
        ? rawProducts.map((p: Record<string, unknown>) => {
            const uploadedUrls = Array.isArray(p.images)
              ? p.images
                  .map((img) => {
                    try {
                      return urlFor(img).width(900).quality(85).auto("format").url();
                    } catch {
                      return null;
                    }
                  })
                  .filter((u): u is string => Boolean(u))
              : [];

            const externalUrls = Array.isArray(p.externalImages)
              ? (p.externalImages as string[]).filter(Boolean)
              : [];

            const finalImages =
              uploadedUrls.length > 0
                ? uploadedUrls
                : externalUrls.length > 0
                ? externalUrls
                : ["https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=900&q=80"];

            return {
              id: String(p.id || ""),
              name: String(p.name || "Planta sin nombre"),
              scientificName: p.scientificName ? String(p.scientificName) : undefined,
              category: (p.category as ProductCategory) || "interior",
              price: Number(p.price ?? 0),
              originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
              badges: Array.isArray(p.badges) ? (p.badges as ProductBadge[]) : [],
              stock: (p.stock as StockStatus) || "disponible",
              images: finalImages,
              shortDescription: String(p.shortDescription || ""),
              description: String(p.description || ""),
              potSize: String(p.potSize || ""),
              light: (p.light as LightLevel) || "semisombra",
              water: (p.water as WaterLevel) || "medio",
              environment: (p.environment as EnvironmentType) || "interior",
              petFriendly: Boolean(p.petFriendly),
              careTips: Array.isArray(p.careTips) ? (p.careTips as string[]) : [],
              featured: Boolean(p.featured),
            };
          })
        : PRODUCTS;

    // Mapear categorías de Sanity
    const categories: CategoryInfo[] =
      Array.isArray(rawCategories) && rawCategories.length > 0
        ? rawCategories.map((c: Record<string, unknown>) => {
            let imageUrl =
              "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=900&q=80";
            if (c.image) {
              try {
                imageUrl = urlFor(c.image).width(900).quality(80).auto("format").url();
              } catch {
                // Usa respaldo si falla
              }
            } else if (typeof c.externalImage === "string" && c.externalImage) {
              imageUrl = c.externalImage;
            }

            return {
              id: (c.id as ProductCategory) || "interior",
              name: String(c.name || ""),
              description: String(c.description || ""),
              image: imageUrl,
            };
          })
        : CATEGORIES;

    // Mapear datos del vivero (siteSettings)
    const siteConfig: SiteConfig = rawSettings
      ? {
          name: rawSettings.name || SITE_CONFIG.name,
          tagline: rawSettings.tagline || SITE_CONFIG.tagline,
          city: rawSettings.city || SITE_CONFIG.city,
          address: rawSettings.address || SITE_CONFIG.address,
          whatsappNumber: rawSettings.whatsappNumber || SITE_CONFIG.whatsappNumber,
          whatsappDisplay: rawSettings.whatsappDisplay || SITE_CONFIG.whatsappDisplay,
          instagramUser: rawSettings.instagramUser || SITE_CONFIG.instagramUser,
          instagramUrl: rawSettings.instagramUrl || SITE_CONFIG.instagramUrl,
          email: rawSettings.email || SITE_CONFIG.email,
          hours:
            Array.isArray(rawSettings.hours) && rawSettings.hours.length > 0
              ? rawSettings.hours
              : SITE_CONFIG.hours,
          shippingInfo: rawSettings.shippingInfo || SITE_CONFIG.shippingInfo,
          googleMapsEmbed: rawSettings.googleMapsEmbed || SITE_CONFIG.googleMapsEmbed,
        }
      : SITE_CONFIG;

    return { products, categories, siteConfig };
  } catch (error) {
    console.warn("Usando catálogo local de respaldo (Sanity aún sin datos o sin conexión):", error);
    return {
      products: PRODUCTS,
      categories: CATEGORIES,
      siteConfig: SITE_CONFIG,
    };
  }
}