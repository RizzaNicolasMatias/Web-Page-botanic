import React from "react";
import { getStoreData } from "@/data/products";
import { StoreClient } from "@/components/StoreClient";

export const revalidate = 10; // Revalida automáticamente cada 10 segundos además del Webhook instantáneo

export default async function HomePage() {
  const { products, categories, siteConfig } = await getStoreData();

  return (
    <StoreClient
      products={products}
      categories={categories}
      siteConfig={siteConfig}
    />
  );
}