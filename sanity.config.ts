"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";

export default defineConfig({
  basePath: "/studio",
  projectId: projectId || "placeholder",
  dataset: dataset || "production",
  title: "Piccolo Giardino — Panel de Administración",
  schema,
  plugins: [
    structureTool({
      title: "Catálogo y Vivero",
    }),
    visionTool({ defaultApiVersion: apiVersion, title: "Consultas GROQ" }),
  ],
});