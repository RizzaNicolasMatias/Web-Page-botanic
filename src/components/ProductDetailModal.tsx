"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Sun,
  Droplets,
  Home,
  PawPrint,
  Check,
  Plus,
  Minus,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { Product, SITE_CONFIG } from "@/data/products";
import { formatARS, getWhatsAppUrl } from "@/lib/utils";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setActiveImage(0);
    setQuantity(1);
    setJustAdded(false);
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (product) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  const handleAdd = () => {
    if (product.stock === "agotado") return;
    onAddToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const whatsappDirectUrl = getWhatsAppUrl(
    SITE_CONFIG.whatsappNumber,
    `¡Hola Piccolo Giardino! Estoy viendo la ficha de *${product.name}* (${formatARS(
      product.price
    )}) y quería pedirles una foto de los ejemplares disponibles.`
  );

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-product-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      >
        {/* Fondo oscuro con blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1C241E]/65 backdrop-blur-xs"
        />

        {/* Contenedor del Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 bg-[#FAF7F2] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#1B3B2B]/15"
        >
          {/* Botón Cerrar */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar detalle del producto"
            className="sticky top-4 float-right mr-4 mt-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#1B3B2B] shadow-md flex items-center justify-center transition-transform hover:scale-105"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-5 sm:p-8 clear-both grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Galería de Fotos */}
            <div className="md:col-span-6 space-y-3">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[#1B3B2B]/10">
                <Image
                  src={product.images[activeImage] || product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2.5">
                  {product.images.map((imgUrl, idx) => (
                    <button
                      key={imgUrl}
                      type="button"
                      onClick={() => setActiveImage(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImage === idx
                          ? "border-[#C85A32] scale-105"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={imgUrl}
                        alt={`${product.name} vista ${idx + 1}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Información y Cuidados */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div>
                  <h2
                    id="modal-product-title"
                    className="font-serif text-2xl sm:text-3xl font-bold text-[#1B3B2B]"
                  >
                    {product.name}
                  </h2>
                  {product.scientificName && (
                    <p className="text-sm italic text-[#3A5A40] mt-0.5">
                      {product.scientificName}
                    </p>
                  )}
                </div>

                {/* Precio */}
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-bold text-[#1C241E]">
                    {formatARS(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#1C241E]/50 line-through">
                      {formatARS(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Tamaño de maceta */}
                <div className="bg-white px-4 py-2.5 rounded-2xl border border-[#1B3B2B]/10 text-xs sm:text-sm text-[#1C241E]">
                  <strong>Presentación / Maceta:</strong> {product.potSize}
                </div>

                <p className="text-sm text-[#1C241E]/85 leading-relaxed">
                  {product.description}
                </p>

                {/* Grilla de Características Rápidas */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div className="bg-[#EFF3EE] p-3 rounded-2xl flex items-center gap-2.5">
                    <Sun className="w-5 h-5 text-[#C85A32] shrink-0" />
                    <div className="text-xs">
                      <span className="text-[#1C241E]/60 block">Luz ideal</span>
                      <strong className="text-[#1B3B2B] capitalize">{product.light}</strong>
                    </div>
                  </div>

                  <div className="bg-[#EFF3EE] p-3 rounded-2xl flex items-center gap-2.5">
                    <Droplets className="w-5 h-5 text-[#3A5A40] shrink-0" />
                    <div className="text-xs">
                      <span className="text-[#1C241E]/60 block">Frecuencia riego</span>
                      <strong className="text-[#1B3B2B] capitalize">{product.water}</strong>
                    </div>
                  </div>

                  <div className="bg-[#EFF3EE] p-3 rounded-2xl flex items-center gap-2.5">
                    <Home className="w-5 h-5 text-[#1B3B2B] shrink-0" />
                    <div className="text-xs">
                      <span className="text-[#1C241E]/60 block">Ubicación</span>
                      <strong className="text-[#1B3B2B] capitalize">
                        {product.environment === "ambos"
                          ? "Interior o Exterior"
                          : product.environment}
                      </strong>
                    </div>
                  </div>

                  <div className="bg-[#EFF3EE] p-3 rounded-2xl flex items-center gap-2.5">
                    <PawPrint className="w-5 h-5 text-[#C85A32] shrink-0" />
                    <div className="text-xs">
                      <span className="text-[#1C241E]/60 block">Mascotas</span>
                      <strong className="text-[#1B3B2B]">
                        {product.petFriendly ? "Segura (Pet-Friendly)" : "Tóxica si se ingiere"}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Consejos de cuidado del vivero */}
                <div className="bg-white p-4 rounded-2xl border border-[#1B3B2B]/10 space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#3A5A40] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
                    Consejos de Piccolo Giardino
                  </h3>
                  <ul className="text-xs sm:text-sm text-[#1C241E]/85 space-y-1.5 list-disc list-inside">
                    {product.careTips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Controles de Cantidad y Compra */}
              <div className="pt-4 border-t border-[#1B3B2B]/10 space-y-3">
                {product.stock !== "agotado" && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#1B3B2B]/20 rounded-full bg-white px-2 py-1">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        aria-label="Disminuir cantidad"
                        className="p-2 text-[#1B3B2B] hover:text-[#C85A32]"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold text-sm">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        aria-label="Aumentar cantidad"
                        className="p-2 text-[#1B3B2B] hover:text-[#C85A32]"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleAdd}
                      className={`flex-1 py-3.5 px-5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                        justAdded
                          ? "bg-emerald-700 text-white"
                          : "bg-[#1B3B2B] hover:bg-[#28523d] text-white"
                      }`}
                    >
                      {justAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>¡Agregado a tu pedido!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>
                            Agregar ({formatARS(product.price * quantity)})
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-full bg-[#EFF3EE] hover:bg-[#e1e9df] text-[#1B3B2B] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#C85A32]" />
                  <span>Consultar solo por este producto en WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}