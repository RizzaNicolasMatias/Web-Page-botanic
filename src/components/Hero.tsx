"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, MessageCircle, Truck, Sparkles, ShieldCheck } from "lucide-react";
import { SITE_CONFIG, SiteConfig } from "@/data/products";
import { getWhatsAppUrl } from "@/lib/utils";
import { BotanicalBranchSvg } from "./BotanicalSvgs";

export function Hero({ siteConfig = SITE_CONFIG }: { siteConfig?: SiteConfig }) {
  const prefersReducedMotion = useReducedMotion();

  const whatsappUrl = getWhatsAppUrl(
    siteConfig.whatsappNumber,
    `¡Hola ${siteConfig.name}! Estoy viendo su página web y quería asesoramiento para elegir plantas 🌿`
  );

  const initialAnim = prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2] to-[#EFF3EE]/70">
      <BotanicalBranchSvg className="w-72 h-72 md:w-96 md:h-96 text-[#3A5A40]/15 absolute -top-10 -right-12 pointer-events-none rotate-12" />
      <BotanicalBranchSvg className="w-64 h-64 text-[#C85A32]/10 absolute bottom-0 -left-16 pointer-events-none -rotate-45" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <motion.div
            initial={initialAnim}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF3EE] border border-[#3A5A40]/20 text-[#1B3B2B] text-xs sm:text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Vivero en {siteConfig.city} · Envíos por Uber</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1B3B2B] tracking-tight leading-[1.1]">
              Un pequeño jardín pensado para dar vida a{" "}
              <span className="italic font-normal text-[#C85A32]">tu rincón favorito.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#1C241E]/80 max-w-2xl leading-relaxed">
              Cultivamos y seleccionamos plantas de interior, exterior, cítricos tucumanos,
              suculentas y macetas artesanales. Mirá los precios reales, filtrá según la luz de tu
              casa y hacé tu pedido directo por WhatsApp en un clic.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#catalogo"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#1B3B2B] hover:bg-[#28523d] text-white font-semibold text-base shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3B2B]"
              >
                <span>Ver catálogo y precios</span>
                <ArrowDownRight className="w-5 h-5" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white hover:bg-[#EFF3EE] text-[#1B3B2B] border-2 border-[#1B3B2B]/20 font-semibold text-base transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3B2B]"
              >
                <MessageCircle className="w-5 h-5 text-[#C85A32]" />
                <span>Escribinos por WhatsApp</span>
              </a>
            </div>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#1C241E]/85">
              <div className="flex items-center gap-2.5 bg-white/70 px-3.5 py-2.5 rounded-2xl border border-[#1B3B2B]/10">
                <Truck className="w-5 h-5 text-[#C85A32] shrink-0" />
                <span>
                  <strong>Envíos rápidos con Uber</strong> en S.M. de Tucumán y Yerba Buena
                </span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/70 px-3.5 py-2.5 rounded-2xl border border-[#1B3B2B]/10">
                <ShieldCheck className="w-5 h-5 text-[#3A5A40] shrink-0" />
                <span>
                  <strong>Trasplante sin cargo</strong> al llevar planta + maceta
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[4/5] rounded-t-[140px] rounded-b-[36px] overflow-hidden shadow-xl border-4 border-white bg-[#EFF3EE]">
                <Image
                  src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1000&q=85"
                  alt="Ejemplar de Monstera Deliciosa en maceta artesanal dentro de Piccolo Giardino"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B3B2B]/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#C85A32] text-xs font-semibold uppercase tracking-wider mb-1.5">
                    Favorita de la semana
                  </span>
                  <p className="font-serif text-xl font-semibold">
                    Monstera Deliciosa · Maceta N° 22
                  </p>
                  <p className="text-xs text-white/90">
                    Aclimatada en nuestro vivero, lista para tu living.
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-3 absolute -bottom-5 -left-6 bg-white px-4 py-3 rounded-2xl shadow-lg border border-[#1B3B2B]/10 max-w-[240px]">
                <div className="w-10 h-10 rounded-full bg-[#EFF3EE] text-[#1B3B2B] flex items-center justify-center font-serif font-bold text-lg shrink-0">
                  🌱
                </div>
                <p className="text-xs text-[#1C241E] leading-snug">
                  <strong>¿Dudas con la luz?</strong> Te mandamos foto real antes de despachar tu Uber.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}