import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Categorías",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "Código de Categoría",
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
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Nombre Visible",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción Corta",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Foto de la Categoría (Subir desde tu PC o celular)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "externalImage",
      title: "URL de Imagen Externa (Opcional si no subiste foto arriba)",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Orden de aparición (1 al 6)",
      type: "number",
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
      media: "image",
    },
  },
});