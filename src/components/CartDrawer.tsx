"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  MessageCircle,
  Truck,
  Store,
} from "lucide-react";
import { Product, SITE_CONFIG, SiteConfig } from "@/data/products";
import { formatARS, getWhatsAppUrl } from "@/lib/utils";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  siteConfig?: SiteConfig;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  siteConfig = SITE_CONFIG,
}: CartDrawerProps) {
  const [deliveryMethod, setDeliveryMethod] = useState<"uber" | "retiro">("uber");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const totalAmount = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const buildWhatsAppOrderMessage = () => {
    const lines: string[] = [
      `🌿 *¡Hola ${siteConfig.name}!* Quiero realizar el siguiente pedido desde la web:`,
      "",
    ];

    items.forEach((item) => {
      const subtotal = formatARS(item.product.price * item.quantity);
      lines.push(
        `• *${item.quantity}x* ${item.product.name} — ${subtotal}`
      );
    });

    lines.push("");
    lines.push(`💰 *Total estimado:* ${formatARS(totalAmount)}`);
    lines.push(
      `🛵 *Entrega:* ${
        deliveryMethod === "uber"
          ? "Envío mediante Uber (a cotizar según distancia)"
          : `Retiro en vivero (${siteConfig.address})`
      }`
    );

    if (customerName.trim()) {
      lines.push(`👤 *Nombre:* ${customerName.trim()}`);
    }
    if (deliveryMethod === "uber" && customerAddress.trim()) {
      lines.push(`📍 *Dirección / Barrio en Tucumán:* ${customerAddress.trim()}`);
    }

    lines.push("");
    lines.push("¿Me confirman stock y datos para transferir? ¡Gracias!");

    return lines.join("\n");
  };

  const whatsappCheckoutUrl = getWhatsAppUrl(
    siteConfig.whatsappNumber,
    buildWhatsAppOrderMessage()
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Tu pedido en ${siteConfig.name}`}
          className="fixed inset-0 z-50 overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1C241E]/60 backdrop-blur-xs"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col justify-between"
            >
              <div className="p-5 bg-white border-b border-[#1B3B2B]/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#1B3B2B]" />
                  <h2 className="font-serif text-xl font-bold text-[#1B3B2B]">
                    Tu Pedido Botánico
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar carrito"
                  className="p-2 rounded-full hover:bg-[#EFF3EE] text-[#1C241E]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#EFF3EE] text-[#3A5A40] flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="font-serif text-xl font-bold text-[#1B3B2B]">
                      Tu canasta está vacía
                    </p>
                    <p className="text-sm text-[#1C241E]/70 max-w-xs mx-auto">
                      Explorá el catálogo y agregá las plantas, macetas o sustratos que quieras
                      pedir por WhatsApp.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      {items.map(({ product, quantity }) => (
                        <div
                          key={product.id}
                          className="bg-white p-3.5 rounded-2xl border border-[#1B3B2B]/10 flex gap-3.5 items-center"
                        >
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#EFF3EE] shrink-0">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-bold text-[#1B3B2B] truncate">
                              {product.name}
                            </h3>
                            <p className="text-xs text-[#3A5A40] font-semibold">
                              {formatARS(product.price)} c/u
                            </p>

                            <div className="flex items-center justify-between mt-2">
                              <div className="inline-flex items-center border border-[#1B3B2B]/15 rounded-full bg-[#FAF7F2]">
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                                  aria-label="Restar unidad"
                                  className="p-1.5 text-[#1B3B2B] hover:text-[#C85A32]"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="px-2.5 text-xs font-bold">{quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                                  aria-label="Sumar unidad"
                                  className="p-1.5 text-[#1B3B2B] hover:text-[#C85A32]"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <span className="text-sm font-bold text-[#1C241E]">
                                {formatARS(product.price * quantity)}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(product.id)}
                            aria-label={`Quitar ${product.name} del pedido`}
                            className="p-1.5 text-[#1C241E]/40 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-[#1B3B2B]/10 space-y-3 mt-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#3A5A40] block">
                        ¿Cómo preferís recibirlo?
                      </span>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod("uber")}
                          className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col gap-1 ${
                            deliveryMethod === "uber"
                              ? "border-[#1B3B2B] bg-[#EFF3EE] font-semibold text-[#1B3B2B]"
                              : "border-[#1B3B2B]/15 text-[#1C241E]/75"
                          }`}
                        >
                          <Truck className="w-4 h-4 text-[#C85A32]" />
                          <span>Envío por Uber</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeliveryMethod("retiro")}
                          className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col gap-1 ${
                            deliveryMethod === "retiro"
                              ? "border-[#1B3B2B] bg-[#EFF3EE] font-semibold text-[#1B3B2B]"
                              : "border-[#1B3B2B]/15 text-[#1C241E]/75"
                          }`}
                        >
                          <Store className="w-4 h-4 text-[#3A5A40]" />
                          <span>Retiro en Vivero</span>
                        </button>
                      </div>

                      <div className="space-y-2.5 pt-1">
                        <input
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Tu nombre (opcional)"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1B3B2B]/15 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3B2B]"
                        />

                        {deliveryMethod === "uber" && (
                          <input
                            type="text"
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            placeholder="Barrio o dirección en Tucumán para cotizar el Uber"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1B3B2B]/15 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3B2B]"
                          />
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {items.length > 0 && (
                <div className="p-5 bg-white border-t border-[#1B3B2B]/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#1C241E]/75">Total de productos</span>
                    <span className="font-serif text-2xl font-bold text-[#1B3B2B]">
                      {formatARS(totalAmount)}
                    </span>
                  </div>

                  <a
                    href={whatsappCheckoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-5 rounded-full bg-[#1B3B2B] hover:bg-[#28523d] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <MessageCircle className="w-5 h-5 text-[#C85A32]" />
                    <span>Enviar pedido por WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={onClearCart}
                    className="w-full text-center text-xs text-[#1C241E]/60 hover:text-red-600 py-1"
                  >
                    Vaciar pedido
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}