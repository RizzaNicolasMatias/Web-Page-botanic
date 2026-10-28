"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, PRODUCTS, ProductCategory } from "@/data/products";

interface CategoriesSectionProps {
  selectedCategory: ProductCategory | "todas";
  onSelectCategory: (cat: ProductCategory) => void;
}

export function CategoriesSection({
  selectedCategory,
  onSelectCategory,
}: CategoriesSectionProps) {
  const handleCategoryClick = (catId: ProductCategory) => {
    onSelectCategory(catId);
    const catalogEl = document.getElementById("catalogo");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="categorias" className="py-16 md:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32] block mb-2">
              Explorá por sección
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B3B2B]">
              Categorías Destacadas
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#1C241E]/75 max-w-md">
            Tocá cualquier categoría para filtrar automáticamente el catálogo de abajo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, index) => {
            const count = PRODUCTS.filter((p) => p.category === cat.id).length;
            const isActive = selectedCategory === cat.id;

            return (
              <motion.button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className={`group text-left relative h-64 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B3B2B] ${
                  isActive ? "ring-4 ring-[#C85A32]" : ""
                }`}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B3B2B]/90 via-[#1B3B2B]/35 to-transparent transition-opacity group-hover:opacity-95" />

                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 text-[#1B3B2B] flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-5 h-5" />
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="inline-block text-xs font-medium bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full mb-2">
                    {count} {count === 1 ? "producto" : "productos"}
                  </span>
                  <h3 className="font-serif text-2xl font-bold leading-tight mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/85 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}