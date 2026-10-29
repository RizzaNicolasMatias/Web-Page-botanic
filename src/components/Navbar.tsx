"use client";

import React, { useState, useEffect } from "react";
import { Sprout, ShoppingBag, Menu, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SITE_CONFIG, SiteConfig } from "@/data/products";
import { getWhatsAppUrl } from "@/lib/utils";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  siteConfig?: SiteConfig;
}

const NAV_LINKS = [
  { label: "Categorías", href: "#categorias" },
  { label: "Catálogo", href: "#catalogo" },
  { label: "Cuidados", href: "#cuidados" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Envíos Uber", href: "#envios" },
  { label: "Preguntas", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar({
  cartCount,
  onOpenCart,
  siteConfig = SITE_CONFIG,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappUrl = getWhatsAppUrl(
    siteConfig.whatsappNumber,
    `¡Hola ${siteConfig.name}! Quería hacerles una consulta sobre sus plantas 🌿`
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#1B3B2B]/10 py-3"
          : "bg-[#FAF7F2]/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B3B2B] rounded-lg"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#1B3B2B] text-[#FAF7F2] flex items-center justify-center shadow-sm group-hover:bg-[#3A5A40] transition-colors">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1B3B2B] block leading-none">
              {siteConfig.name}
            </span>
            <span className="text-[11px] uppercase tracking-widest text-[#3A5A40] font-medium block mt-0.5">
              Tucumán
            </span>
          </div>
        </a>

        <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#1C241E]/85 hover:text-[#1B3B2B] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#C85A32] hover:after:w-full after:transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B3B2B] rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Ver mi pedido, ${cartCount} productos seleccionados`}
            className="relative inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#EFF3EE] hover:bg-[#e1e9df] text-[#1B3B2B] font-medium text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3B2B]"
          >
            <ShoppingBag className="w-4 h-4 text-[#1B3B2B]" />
            <span className="hidden sm:inline">Mi Pedido</span>
            <motion.span
              key={cartCount}
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              className={`min-w-5 h-5 px-1.5 rounded-full text-xs font-bold flex items-center justify-center ${
                cartCount > 0
                  ? "bg-[#C85A32] text-white"
                  : "bg-[#1B3B2B]/15 text-[#1B3B2B]"
              }`}
            >
              {cartCount}
            </motion.span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1B3B2B] hover:bg-[#28523d] text-white text-sm font-medium shadow-sm transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3B2B]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
            className="lg:hidden p-2.5 rounded-xl bg-[#EFF3EE] text-[#1B3B2B] hover:bg-[#e1e9df] focus-visible:outline-2 focus-visible:outline-[#1B3B2B]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-[#FAF7F2] border-b border-[#1B3B2B]/15"
          >
            <nav className="px-4 pt-3 pb-6 space-y-1 flex flex-col">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-base font-medium text-[#1C241E] hover:bg-[#EFF3EE] hover:text-[#1B3B2B] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-[#1B3B2B]/10">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1B3B2B] text-white font-medium text-sm shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}