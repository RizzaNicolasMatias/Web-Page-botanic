"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Sun,
  Droplets,
  Home,
  PawPrint,
  SlidersHorizontal,
  Plus,
  Check,
  Eye,
  MessageCircle,
  RotateCcw,
} from "lucide-react";
import {
  PRODUCTS,
  CATEGORIES,
  SITE_CONFIG,
  Product,
  CategoryInfo,
  SiteConfig,
  ProductCategory,
  LightLevel,
  WaterLevel,
  EnvironmentType,
} from "@/data/products";
import { formatARS, getWhatsAppUrl } from "@/lib/utils";

interface CatalogSectionProps {
  selectedCategory: ProductCategory | "todas";
  onSelectCategory: (cat: ProductCategory | "todas") => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  products?: Product[];
  categories?: CategoryInfo[];
  siteConfig?: SiteConfig;
}

const BADGE_STYLES: Record<string, { label: string; className: string }> = {
  nuevo: { label: "Nuevo", className: "bg-[#1B3B2B] text-white" },
  oferta: { label: "Oferta", className: "bg-[#C85A32] text-white" },
  poca_luz: {
    label: "Poca luz",
    className: "bg-[#EFF3EE] text-[#1B3B2B] border border-[#1B3B2B]/20",
  },
  pet_friendly: {
    label: "🐾 Pet-Friendly",
    className: "bg-amber-100 text-amber-950 border border-amber-300",
  },
  agotado: {
    label: "Agotado",
    className: "bg-stone-600 text-white",
  },
};

const STOCK_LABELS = {
  disponible: { label: "Disponible", dot: "bg-emerald-600", text: "text-emerald-800" },
  pocas_unidades: { label: "Pocas unidades", dot: "bg-amber-500", text: "text-amber-800" },
  agotado: { label: "Sin stock", dot: "bg-stone-400", text: "text-stone-500" },
};

export function CatalogSection({
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
  products = PRODUCTS,
  categories = CATEGORIES,
  siteConfig = SITE_CONFIG,
}: CatalogSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price_asc" | "price_desc">("featured");
  const [lightFilter, setLightFilter] = useState<LightLevel | "todos">("todos");
  const [waterFilter, setWaterFilter] = useState<WaterLevel | "todos">("todos");
  const [envFilter, setEnvFilter] = useState<EnvironmentType | "todos">("todos");
  const [onlyPetFriendly, setOnlyPetFriendly] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleQuickAdd = (product: Product) => {
    if (product.stock === "agotado") return;
    onAddToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId((prev) => (prev === product.id ? null : prev));
    }, 1200);
  };

  const resetAllFilters = () => {
    onSelectCategory("todas");
    setSearchQuery("");
    setSortBy("featured");
    setLightFilter("todos");
    setWaterFilter("todos");
    setEnvFilter("todos");
    setOnlyPetFriendly(false);
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (selectedCategory !== "todas" && product.category !== selectedCategory) return false;

        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchSci = product.scientificName?.toLowerCase().includes(q) ?? false;
          const matchDesc = product.shortDescription.toLowerCase().includes(q);
          if (!matchName && !matchSci && !matchDesc) return false;
        }

        if (lightFilter !== "todos" && product.light !== lightFilter) return false;
        if (waterFilter !== "todos" && product.water !== waterFilter) return false;
        if (
          envFilter !== "todos" &&
          product.environment !== "ambos" &&
          product.environment !== envFilter
        ) {
          return false;
        }
        if (onlyPetFriendly && !product.petFriendly) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.price - b.price;
        if (sortBy === "price_desc") return b.price - a.price;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [
    products,
    selectedCategory,
    searchQuery,
    sortBy,
    lightFilter,
    waterFilter,
    envFilter,
    onlyPetFriendly,
  ]);

  const hasActiveFilters =
    selectedCategory !== "todas" ||
    searchQuery.trim() !== "" ||
    lightFilter !== "todos" ||
    waterFilter !== "todos" ||
    envFilter !== "todos" ||
    onlyPetFriendly;

  return (
    <section id="catalogo" className="py-16 md:py-24 bg-[#EFF3EE]/60 border-y border-[#1B3B2B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32] block mb-2">
            Catálogo Online Actualizado
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B3B2B] mb-3">
            Elegí tus plantas e insumos
          </h2>
          <p className="text-sm sm:text-base text-[#1C241E]/80">
            Filtrá según cuánta luz tenés en casa, si tenés mascotas o tu presupuesto. Armá tu
            pedido y envialo por WhatsApp sin registrarte.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-[#1B3B2B]/10 mb-8 space-y-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => onSelectCategory("todas")}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === "todas"
                  ? "bg-[#1B3B2B] text-white shadow-sm"
                  : "bg-[#FAF7F2] text-[#1C241E] hover:bg-[#EFF3EE]"
              }`}
            >
              Todas ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#1B3B2B] text-white shadow-sm"
                    : "bg-[#FAF7F2] text-[#1C241E] hover:bg-[#EFF3EE]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
            <div className="md:col-span-8 relative">
              <label htmlFor="catalog-search" className="sr-only">
                Buscar planta o producto
              </label>
              <Search className="w-4 h-4 text-[#3A5A40] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="catalog-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre (ej: Monstera, Limonero, Lavanda, Maceta, Sustrato)..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#1B3B2B]/15 text-sm text-[#1C241E] placeholder:text-[#1C241E]/50 focus:outline-none focus:ring-2 focus:ring-[#1B3B2B]"
              />
            </div>

            <div className="md:col-span-4 flex items-center gap-2">
              <label htmlFor="catalog-sort" className="text-xs font-semibold text-[#3A5A40] shrink-0">
                Ordenar:
              </label>
              <select
                id="catalog-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full px-3.5 py-3 rounded-2xl bg-[#FAF7F2] border border-[#1B3B2B]/15 text-sm font-medium text-[#1C241E] focus:outline-none focus:ring-2 focus:ring-[#1B3B2B]"
              >
                <option value="featured">Destacados del vivero</option>
                <option value="price_asc">Precio: menor a mayor</option>
                <option value="price_desc">Precio: mayor a menor</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-[#1B3B2B]/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 bg-[#FAF7F2] px-3.5 py-2 rounded-2xl border border-[#1B3B2B]/10">
              <Sun className="w-4 h-4 text-[#C85A32] shrink-0" />
              <label htmlFor="filter-light" className="text-xs font-semibold text-[#1B3B2B] shrink-0">
                Luz:
              </label>
              <select
                id="filter-light"
                value={lightFilter}
                onChange={(e) => setLightFilter(e.target.value as LightLevel | "todos")}
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#1C241E] focus:outline-none"
              >
                <option value="todos">Cualquier luz</option>
                <option value="sol">☀️ Sol directo</option>
                <option value="semisombra">⛅ Luz indirecta / Semisombra</option>
                <option value="sombra">🌥️ Poca luz / Sombra</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-[#FAF7F2] px-3.5 py-2 rounded-2xl border border-[#1B3B2B]/10">
              <Droplets className="w-4 h-4 text-[#3A5A40] shrink-0" />
              <label htmlFor="filter-water" className="text-xs font-semibold text-[#1B3B2B] shrink-0">
                Riego:
              </label>
              <select
                id="filter-water"
                value={waterFilter}
                onChange={(e) => setWaterFilter(e.target.value as WaterLevel | "todos")}
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#1C241E] focus:outline-none"
              >
                <option value="todos">Cualquier riego</option>
                <option value="poco">💧 Poco riego (fácil)</option>
                <option value="medio">💧💧 Riego moderado</option>
                <option value="mucho">💧💧💧 Riego frecuente</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-[#FAF7F2] px-3.5 py-2 rounded-2xl border border-[#1B3B2B]/10">
              <Home className="w-4 h-4 text-[#1B3B2B] shrink-0" />
              <label htmlFor="filter-env" className="text-xs font-semibold text-[#1B3B2B] shrink-0">
                Espacio:
              </label>
              <select
                id="filter-env"
                value={envFilter}
                onChange={(e) => setEnvFilter(e.target.value as EnvironmentType | "todos")}
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#1C241E] focus:outline-none"
              >
                <option value="todos">Interior y Exterior</option>
                <option value="interior">🏠 Interior</option>
                <option value="exterior">🌳 Exterior / Balcón</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => setOnlyPetFriendly(!onlyPetFriendly)}
              aria-pressed={onlyPetFriendly}
              className={`flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold border transition-all ${
                onlyPetFriendly
                  ? "bg-amber-100 border-amber-400 text-amber-950 shadow-xs"
                  : "bg-[#FAF7F2] border-[#1B3B2B]/10 text-[#1C241E] hover:bg-[#EFF3EE]"
              }`}
            >
              <PawPrint className="w-4 h-4 text-[#C85A32]" />
              <span>Apta para Mascotas</span>
              {onlyPetFriendly && <Check className="w-4 h-4 text-amber-900" />}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm text-[#1C241E]/75 pt-1">
            <span className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#3A5A40]" />
              Mostrando <strong>{filteredProducts.length}</strong> de {products.length} productos
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1 text-[#C85A32] hover:underline font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#1B3B2B]/10 max-w-lg mx-auto">
            <p className="font-serif text-2xl font-bold text-[#1B3B2B] mb-2">
              No encontramos plantas con esa combinación
            </p>
            <p className="text-sm text-[#1C241E]/75 mb-6">
              Probá quitando alguno de los filtros o escribinos por WhatsApp porque todas las
              semanas entran nuevas especies al vivero.
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="px-6 py-3 rounded-full bg-[#1B3B2B] text-white text-sm font-semibold hover:bg-[#28523d] transition-colors"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => {
                const stockInfo = STOCK_LABELS[product.stock] || STOCK_LABELS.disponible;
                const isAdded = addedId === product.id;
                const directConsultUrl = getWhatsAppUrl(
                  siteConfig.whatsappNumber,
                  `¡Hola ${siteConfig.name}! Quería consultar por *${product.name}* (${formatARS(
                    product.price
                  )}) que vi en el catálogo web.`
                );

                return (
                  <motion.article
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.25 }}
                    className="group bg-white rounded-3xl overflow-hidden border border-[#1B3B2B]/10 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
                  >
                    <div
                      onClick={() => onSelectProduct(product)}
                      className="relative aspect-[4/4] bg-[#FAF7F2] overflow-hidden cursor-pointer"
                    >
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />

                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[85%]">
                        {product.badges.map((badge) => {
                          const style = BADGE_STYLES[badge];
                          if (!style) return null;
                          return (
                            <span
                              key={badge}
                              className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-xs ${style.className}`}
                            >
                              {style.label}
                            </span>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        aria-label={`Ver detalles y cuidados de ${product.name}`}
                        className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xs text-[#1B3B2B] text-xs font-semibold shadow-md flex items-center gap-1.5 hover:bg-[#1B3B2B] hover:text-white transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Cuidados y fotos</span>
                      </button>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className={`inline-flex items-center gap-1.5 font-medium ${stockInfo.text}`}>
                            <span className={`w-2 h-2 rounded-full ${stockInfo.dot}`} />
                            {stockInfo.label}
                          </span>
                          <span className="text-[#1C241E]/65 capitalize">
                            {product.light === "sol"
                              ? "☀️ Sol"
                              : product.light === "semisombra"
                              ? "⛅ Semisombra"
                              : "🌥️ Poca luz"}
                          </span>
                        </div>

                        <h3 className="font-serif text-xl font-bold text-[#1B3B2B] leading-snug">
                          <button
                            type="button"
                            onClick={() => onSelectProduct(product)}
                            className="text-left hover:text-[#C85A32] transition-colors focus-visible:outline-2 focus-visible:outline-[#1B3B2B] rounded"
                          >
                            {product.name}
                          </button>
                        </h3>

                        {product.scientificName && (
                          <p className="text-xs italic text-[#3A5A40] mt-0.5">
                            {product.scientificName}
                          </p>
                        )}

                        <p className="text-xs text-[#1C241E]/75 mt-2 line-clamp-2">
                          {product.shortDescription}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#1B3B2B]/10 space-y-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-[#1C241E]">
                            {formatARS(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-[#1C241E]/50 line-through">
                              {formatARS(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-5 gap-2">
                          <button
                            type="button"
                            disabled={product.stock === "agotado"}
                            onClick={() => handleQuickAdd(product)}
                            className={`col-span-4 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3B2B] ${
                              product.stock === "agotado"
                                ? "bg-stone-200 text-stone-500 cursor-not-allowed"
                                : isAdded
                                ? "bg-emerald-700 text-white scale-[0.98]"
                                : "bg-[#1B3B2B] hover:bg-[#28523d] text-white shadow-xs"
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-4 h-4" />
                                <span>¡Agregado!</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4" />
                                <span>
                                  {product.stock === "agotado" ? "Agotado" : "Agregar al pedido"}
                                </span>
                              </>
                            )}
                          </button>

                          <a
                            href={directConsultUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Consultar por ${product.name} en WhatsApp`}
                            title="Consultar directo por WhatsApp"
                            className="col-span-1 rounded-xl bg-[#EFF3EE] hover:bg-[#e1e9df] text-[#1B3B2B] flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#1B3B2B]"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}