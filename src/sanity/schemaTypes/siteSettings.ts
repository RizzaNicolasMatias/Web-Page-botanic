import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Datos del Vivero",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre del Vivero",
      type: "string",
      initialValue: "Piccolo Giardino",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Eslogan o Frase Corta",
      type: "string",
      initialValue: "Vivero Boutique & Refugio Botánico en Tucumán",
    }),
    defineField({
      name: "city",
      title: "Ciudad / Provincia",
      type: "string",
      initialValue: "San Miguel de Tucumán, Tucumán",
    }),
    defineField({
      name: "address",
      title: "Dirección del Local",
      type: "string",
      initialValue: "Av. Mate de Luna 2850, San Miguel de Tucumán",
    }),
    defineField({
      name: "whatsappNumber",
      title: "Número de WhatsApp (Solo números con 549 adelante, sin + ni espacios)",
      description: "Ejemplo para Tucumán: 5493815550192",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whatsappDisplay",
      title: "WhatsApp visible en la web",
      description: "Ejemplo: +54 9 381 555-0192",
      type: "string",
    }),
    defineField({
      name: "instagramUser",
      title: "Usuario de Instagram (sin @)",
      type: "string",
      initialValue: "piccologiardino.tuc",
    }),
    defineField({
      name: "instagramUrl",
      title: "Enlace completo de Instagram",
      type: "url",
      initialValue: "https://instagram.com/piccologiardino.tuc",
    }),
    defineField({
      name: "email",
      title: "Correo Electrónico",
      type: "string",
    }),
    defineField({
      name: "hours",
      title: "Horarios de Atención",
      type: "array",
      of: [{ type: "string" }],
      description: "Agrega un renglón por cada bloque horario",
    }),
    defineField({
      name: "shippingInfo",
      title: "Información de Envíos (Uber / Retiro)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "googleMapsEmbed",
      title: "Link de Mapa Embebido (Google Maps iframe src)",
      type: "url",
    }),
  ],
});