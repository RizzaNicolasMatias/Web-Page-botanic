import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, isSanityConfigured } from "@/sanity/env";
import { PRODUCTS, CATEGORIES, SITE_CONFIG } from "@/data/products";

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "El importador solo está habilitado en modo desarrollo local." },
      { status: 403 }
    );
  }

  if (!isSanityConfigured() || !process.env.SANITY_API_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "Falta configurar NEXT_PUBLIC_SANITY_PROJECT_ID o SANITY_API_WRITE_TOKEN en tu archivo .env.local",
      },
      { status: 400 }
    );
  }

  const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
  });

  try {
    // 1. Cargar Datos del Vivero (siteSettings)
    await writeClient.createOrReplace({
      _id: "siteSettings",
      _type: "siteSettings",
      ...SITE_CONFIG,
    });

    // 2. Cargar las 6 Categorías
    for (let i = 0; i < CATEGORIES.length; i++) {
      const cat = CATEGORIES[i];
      await writeClient.createOrReplace({
        _id: `category-${cat.id}`,
        _type: "category",
        id: cat.id,
        name: cat.name,
        description: cat.description,
        externalImage: cat.image,
        order: i + 1,
      });
    }

    // 3. Cargar los 12 Productos
    for (const prod of PRODUCTS) {
      await writeClient.createOrReplace({
        _id: `product-${prod.id}`,
        _type: "product",
        name: prod.name,
        slug: { _type: "slug", current: prod.id },
        scientificName: prod.scientificName,
        category: prod.category,
        price: prod.price,
        originalPrice: prod.originalPrice,
        badges: prod.badges,
        stock: prod.stock,
        externalImages: prod.images,
        shortDescription: prod.shortDescription,
        description: prod.description,
        potSize: prod.potSize,
        light: prod.light,
        water: prod.water,
        environment: prod.environment,
        petFriendly: prod.petFriendly,
        careTips: prod.careTips,
        featured: Boolean(prod.featured),
      });
    }

    return NextResponse.json({
      ok: true,
      mensaje:
        "¡Importación exitosa! Ya se cargaron los Datos del Vivero, las 6 Categorías y los 12 Productos en tu Sanity Studio (/studio).",
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Error al importar datos a Sanity. Verifica tu SANITY_API_WRITE_TOKEN.",
        detalle: String(err),
      },
      { status: 500 }
    );
  }
}