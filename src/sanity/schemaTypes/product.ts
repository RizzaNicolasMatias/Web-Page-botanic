import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Productos (Plantas e Insumos)",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre del Producto",
      description: "Ej: Monstera Deliciosa (Costilla de Adán)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Identificador Único (Tocar el botón 'Generate')",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "scientificName",
      title: "Nombre Científico (Opcional)",
      description: "Ej: Monstera deliciosa",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Plantas de Interior", value: "interior" },
          { title: "Plantas de Exterior", value: "exterior" },
          { title: "Árboles Frutales", value: "frutales" },
          { title: "Suculentas y Cactus", value: "suculentas" },
          { title: "Macetas Artesanales", value: "macetas" },
          { title: "Sustratos y Herramientas", value: "insumos" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Precio en Pesos Argentinos (Escribir solo números, sin puntos ni signo $)",
      description: "Ejemplo: 24500 (en la web se verá como $ 24.500)",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "originalPrice",
      title: "Precio Anterior Tachado (Opcional, solo si está en oferta)",
      description: "Ejemplo: 28000",
      type: "number",
    }),
    defineField({
      name: "stock",
      title: "Estado de Stock",
      type: "string",
      initialValue: "disponible",
      options: {
        list: [
          { title: "🟢 Disponible", value: "disponible" },
          { title: "🟡 Pocas unidades", value: "pocas_unidades" },
          { title: "🔴 Agotado (Sin stock)", value: "agotado" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "badges",
      title: "Etiquetas Destacadas en la Tarjeta",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Nuevo", value: "nuevo" },
          { title: "Oferta", value: "oferta" },
          { title: "Poca luz", value: "poca_luz" },
          { title: "🐾 Pet-Friendly", value: "pet_friendly" },
          { title: "Agotado", value: "agotado" },
        ],
      },
    }),
    defineField({
      name: "images",
      title: "Galería de Fotos (Subí una o varias fotos desde tu computadora o celular)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "externalImages",
      title: "URLs de Fotos Externas (Opcional, respaldo automático)",
      type: "array",
      of: [{ type: "url" }],
    }),
    defineField({
      name: "shortDescription",
      title: "Descripción Corta (Se ve en la tarjeta del catálogo)",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción Detallada (Se ve al abrir la ficha del producto)",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "potSize",
      title: "Tamaño de Maceta / Presentación",
      description: "Ej: Maceta de cultivo N° 22 (5 litros) — Altura aprox. 65 cm",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "light",
      title: "Necesidad de Luz",
      type: "string",
      initialValue: "semisombra",
      options: {
        list: [
          { title: "☀️ Sol directo", value: "sol" },
          { title: "⛅ Luz indirecta / Semisombra", value: "semisombra" },
          { title: "🌥️ Poca luz / Sombra", value: "sombra" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "water",
      title: "Frecuencia de Riego",
      type: "string",
      initialValue: "medio",
      options: {
        list: [
          { title: "💧 Poco riego", value: "poco" },
          { title: "💧💧 Riego moderado", value: "medio" },
          { title: "💧💧💧 Riego frecuente", value: "mucho" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "environment",
      title: "Ambiente Ideal",
      type: "string",
      initialValue: "interior",
      options: {
        list: [
          { title: "🏠 Interior", value: "interior" },
          { title: "🌳 Exterior / Balcón", value: "exterior" },
          { title: "🏠🌳 Ambos (Interior y Exterior)", value: "ambos" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "petFriendly",
      title: "🐾 ¿Es segura para mascotas (Pet-Friendly)?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "careTips",
      title: "Consejos de Cuidado (Lista de recomendaciones)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "featured",
      title: "⭐ ¿Destacar primero en el catálogo?",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      price: "price",
      stock: "stock",
      media: "images.0",
    },
    prepare({ title, price, stock, media }) {
      const stockMap: Record<string, string> = {
        disponible: "🟢 Disponible",
        pocas_unidades: "🟡 Pocas unidades",
        agotado: "🔴 Agotado",
      };
      return {
        title,
        subtitle: `$ ${price?.toLocaleString("es-AR") ?? 0} — ${stockMap[stock] || "Disponible"}`,
        media,
      };
    },
  },
});