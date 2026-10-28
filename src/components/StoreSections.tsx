"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Droplets,
  Sun,
  Sprout,
  Bug,
  Truck,
  MessageCircle,
  CreditCard,
  MapPin,
  Clock,
  ChevronDown,
  Star,
  Send,
  ShoppingBag,
} from "lucide-react";
import { SITE_CONFIG, TESTIMONIALS, FAQS } from "@/data/products";
import { formatARS, getWhatsAppUrl } from "@/lib/utils";
import { MonsteraLeafSvg } from "./BotanicalSvgs";

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/* =========================================================
   6. GUÍA DE CUIDADOS BOTÁNICOS
   ========================================================= */
export function CareGuideSection() {
  const tips = [
    {
      icon: Droplets,
      title: "El secreto del riego",
      description:
        "Más plantas sufren por exceso de agua que por falta. Tocá la tierra con el dedo: si los primeros 3 cm están húmedos, esperá unos días más antes de volver a regar.",
    },
    {
      icon: Sun,
      title: "La luz en Tucumán",
      description:
        "En verano el sol del mediodía tucumano es muy intenso. Las plantas de interior prefieren mucha claridad cerca de ventanas o galerías techadas, sin sol directo de 11 a 17 hs.",
    },
    {
      icon: Sprout,
      title: "Sustrato aireado",
      description:
        "Usá siempre tierra suelta con humus de lombriz, perlita y corteza. Un buen drenaje evita que las raíces se asfixien y estimula hojas nuevas todo el año.",
    },
    {
      icon: Bug,
      title: "Prevención orgánica",
      description:
        "Limpiá el polvo de las hojas y rociá jabón potásico con aceite de Neem una vez al mes para mantener alejadas cochinillas y pulgones de forma 100% natural.",
    },
  ];

  return (
    <section id="cuidados" className="py-16 md:py-24 bg-[#FAF7F2] relative overflow-hidden">
      <MonsteraLeafSvg className="w-48 h-48 text-[#3A5A40]/10 absolute -bottom-10 right-6 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32] block mb-2">
            Aprendé con nosotros
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B3B2B] mb-3">
            Guía Rápida de Cuidados
          </h2>
          <p className="text-sm sm:text-base text-[#1C241E]/80">
            Cuatro pilares simples para que tus plantas crezcan sanas en el clima de San Miguel de
            Tucumán.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white p-6 rounded-3xl border border-[#1B3B2B]/10 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EFF3EE] text-[#1B3B2B] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#C85A32]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1B3B2B] mb-2">{tip.title}</h3>
                <p className="text-sm text-[#1C241E]/80 leading-relaxed">{tip.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   7. SOBRE NOSOTROS
   ========================================================= */
export function AboutSection() {
  return (
    <section id="nosotros" className="py-16 md:py-24 bg-[#1B3B2B] text-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden border-4 border-[#FAF7F2]/15 shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=80"
              alt="Interior del vivero Piccolo Giardino en San Miguel de Tucumán"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-5"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32] block">
              Nuestra Historia
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Nacimos en Tucumán por amor al oficio del jardín.
            </h2>
            <p className="text-base text-[#FAF7F2]/85 leading-relaxed">
              <strong>Piccolo Giardino</strong> empezó como un pequeño invernadero familiar en San
              Miguel de Tucumán con una idea simple: que comprar una planta no sea solo llevarse una
              maceta, sino aprender a acompañarla para que dure años.
            </p>
            <p className="text-base text-[#FAF7F2]/85 leading-relaxed">
              Aclimatamos cada ejemplar al sol y la humedad de nuestra provincia, preparamos
              nuestros propios sustratos orgánicos y trabajamos con alfareros locales para ofrecer
              macetas nobles de barro y cerámica.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#FAF7F2]/15">
              <div>
                <span className="font-serif text-3xl font-bold text-[#C85A32] block">+400</span>
                <span className="text-xs text-[#FAF7F2]/75">Especies todo el año</span>
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-[#C85A32] block">100%</span>
                <span className="text-xs text-[#FAF7F2]/75">Aclimatadas en Tucumán</span>
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-[#C85A32] block">En el día</span>
                <span className="text-xs text-[#FAF7F2]/75">Envíos con Uber</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   8. CÓMO COMPRAR Y ENVÍOS MEDIANTE UBER
   ========================================================= */
export function HowToBuySection() {
  const steps = [
    {
      step: "01",
      icon: ShoppingBag,
      title: "Armá tu pedido en el catálogo",
      description:
        "Agregá las plantas, macetas y tierras a tu pedido web. El sistema suma el total automáticamente sin pedirte tarjeta ni contraseñas.",
    },
    {
      step: "02",
      icon: MessageCircle,
      title: "Confirmamos por WhatsApp",
      description:
        "Al tocar 'Enviar pedido', se abre nuestro WhatsApp con tu lista. Te mandamos fotos reales de las plantas en stock para que elijas la tuya.",
    },
    {
      step: "03",
      icon: CreditCard,
      title: "Pago fácil y sin vueltas",
      description:
        "Abonás por transferencia bancaria (10% OFF), Mercado Pago o en efectivo al retirar por nuestro vivero.",
    },
    {
      step: "04",
      icon: Truck,
      title: "Envío por Uber o retiro en local",
      description:
        "Despachamos en el día mediante Uber Flash / Uber Envíos a todo San Miguel de Tucumán, Yerba Buena y Tafí Viejo, o retirás sin cargo.",
    },
  ];

  return (
    <section id="envios" className="py-16 md:py-24 bg-[#EFF3EE]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32] block mb-2">
            Simple, Rápido y Seguro
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B3B2B] mb-3">
            Cómo comprar y envíos por Uber
          </h2>
          <p className="text-sm sm:text-base text-[#1C241E]/80">
            Recibí tus plantas en el día sin moverte de tu casa o pasá a visitar nuestro vivero.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white p-6 rounded-3xl border border-[#1B3B2B]/10 relative"
              >
                <span className="font-serif text-4xl font-bold text-[#1B3B2B]/10 absolute top-4 right-5">
                  {item.step}
                </span>
                <div className="w-11 h-11 rounded-2xl bg-[#1B3B2B] text-white flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1B3B2B] mb-2">{item.title}</h3>
                <p className="text-sm text-[#1C241E]/80 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   9. TESTIMONIOS DE CLIENTES
   ========================================================= */
export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32] block mb-2">
            Comunidad Botánica
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B3B2B]">
            Lo que dicen nuestros clientes en Tucumán
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-3xl border border-[#1B3B2B]/10 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-[#1C241E]/85 italic leading-relaxed">
                  “{t.text}”
                </p>
              </div>
              <div className="pt-3 border-t border-[#1B3B2B]/10">
                <p className="font-bold text-sm text-[#1B3B2B]">{t.name}</p>
                <p className="text-xs text-[#3A5A40]">{t.neighborhood}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   10. PREGUNTAS FRECUENTES EN ACORDEÓN
   ========================================================= */
export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#EFF3EE]/60 border-t border-[#1B3B2B]/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32] block mb-2">
            Dudas comunes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B3B2B]">
            Preguntas Frecuentes
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="bg-white rounded-2xl border border-[#1B3B2B]/10 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-semibold text-[#1B3B2B] hover:bg-[#FAF7F2] transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C85A32] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-[#1C241E]/80 leading-relaxed border-t border-[#1B3B2B]/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   11. CONTACTO + MAPA EMBEBIDO + HORARIOS
   ========================================================= */
export function ContactSection() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `¡Hola ${SITE_CONFIG.name}! Soy ${
      name.trim() || "un cliente"
    }.\n\nConsulta: ${message.trim()}`;
    window.open(getWhatsAppUrl(SITE_CONFIG.whatsappNumber, text), "_blank");
  };

  return (
    <section id="contacto" className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Información y Formulario */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32] block mb-2">
                Visitanos o Escribinos
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B3B2B] mb-2">
                Contacto y Ubicación
              </h2>
              <p className="text-sm sm:text-base text-[#1C241E]/80">
                Estamos en {SITE_CONFIG.city}. Escribinos para asesoramiento personalizado o
                pedidos mayoristas y de paisajismo.
              </p>
            </div>

            <div className="space-y-3 bg-white p-5 rounded-3xl border border-[#1B3B2B]/10 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C85A32] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1B3B2B] block">Dirección del vivero</strong>
                  <span className="text-[#1C241E]/80">{SITE_CONFIG.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#3A5A40] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1B3B2B] block">Horarios de atención</strong>
                  {SITE_CONFIG.hours.map((h) => (
                    <span key={h} className="text-[#1C241E]/80 block">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <InstagramIcon className="w-5 h-5 text-[#C85A32] shrink-0" />
                <div>
                  <strong className="text-[#1B3B2B] block">Instagram</strong>
                  <a
                    href={SITE_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C85A32] hover:underline font-medium"
                  >
                    @{SITE_CONFIG.instagramUser}
                  </a>
                </div>
              </div>
            </div>

            {/* Formulario rápido a WhatsApp */}
            <form
              onSubmit={handleWhatsAppSubmit}
              className="bg-white p-6 rounded-3xl border border-[#1B3B2B]/10 space-y-4"
            >
              <h3 className="font-serif text-xl font-bold text-[#1B3B2B]">
                Envianos una consulta rápida
              </h3>
              <div>
                <label htmlFor="contact-name" className="text-xs font-semibold text-[#1B3B2B] block mb-1">
                  Tu nombre
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Valentina"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#1B3B2B]/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3B2B]"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="text-xs font-semibold text-[#1B3B2B] block mb-1"
                >
                  ¿En qué podemos ayudarte?
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hola! Quería saber qué plantas me recomiendan para un balcón que recibe sol a la mañana..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#1B3B2B]/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3B2B]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full bg-[#1B3B2B] hover:bg-[#28523d] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Abrir consulta en WhatsApp</span>
              </button>
            </form>
          </div>

          {/* Mapa de Google Maps */}
          <div className="lg:col-span-6 h-96 lg:h-auto min-h-[380px] rounded-3xl overflow-hidden border border-[#1B3B2B]/15 shadow-sm bg-[#EFF3EE]">
            <iframe
              title="Ubicación de Piccolo Giardino en San Miguel de Tucumán"
              src={SITE_CONFIG.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   12. FOOTER COMPLETO
   ========================================================= */
export function Footer() {
  return (
    <footer className="bg-[#142C20] text-[#FAF7F2]/85 pt-14 pb-24 md:pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          <div className="md:col-span-2 space-y-3">
            <span className="font-serif text-2xl font-bold text-white block">
              {SITE_CONFIG.name}
            </span>
            <p className="text-sm text-[#FAF7F2]/70 max-w-sm leading-relaxed">
              {SITE_CONFIG.tagline}. Plantas de interior, exterior, frutales, suculentas, macetas y
              sustratos con envíos por Uber en {SITE_CONFIG.city}.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#C85A32] mb-3">
              Secciones
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#categorias" className="hover:text-white">
                  Categorías
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-white">
                  Catálogo y Precios
                </a>
              </li>
              <li>
                <a href="#cuidados" className="hover:text-white">
                  Guía de Cuidados
                </a>
              </li>
              <li>
                <a href="#envios" className="hover:text-white">
                  Envíos con Uber
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#C85A32] mb-3">
              Contacto
            </h3>
            <ul className="space-y-2 text-sm text-[#FAF7F2]/75">
              <li>{SITE_CONFIG.address}</li>
              <li>WhatsApp: {SITE_CONFIG.whatsappDisplay}</li>
              <li>Instagram: @{SITE_CONFIG.instagramUser}</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF7F2]/60 gap-2">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name} — San Miguel de Tucumán, Argentina.
          </p>
          <p>Diseñado con amor por las plantas 🌿</p>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   13. BOTÓN FLOTANTE DE WHATSAPP + BARRA RÁPIDA EN MÓVIL
   ========================================================= */
export function FloatingActions({
  cartCount,
  cartTotal,
  onOpenCart,
}: {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
}) {
  const whatsappUrl = getWhatsAppUrl(
    SITE_CONFIG.whatsappNumber,
    "¡Hola Piccolo Giardino! Quería hacerles una consulta rápida 🌿"
  );

  return (
    <>
      {/* Barra inferior en celular cuando hay productos en el pedido */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 left-4 right-20 sm:hidden z-40">
          <button
            type="button"
            onClick={onOpenCart}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#1B3B2B] text-white shadow-xl flex items-center justify-between text-xs font-semibold border border-white/15"
          >
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#C85A32] text-white flex items-center justify-center font-bold">
                {cartCount}
              </span>
              <span>Ver mi pedido</span>
            </span>
            <span className="font-bold text-sm">{formatARS(cartTotal)}</span>
          </button>
        </div>
      )}

      {/* Botón Flotante de WhatsApp siempre visible */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp a Piccolo Giardino"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl flex items-center justify-center transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3B2B]"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </>
  );
}