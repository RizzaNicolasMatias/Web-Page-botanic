"use client";

import React, { useState, useEffect } from "react";
import { Product, ProductCategory } from "@/data/products";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CategoriesSection } from "@/components/CategoriesSection";
import { CatalogSection } from "@/components/CatalogSection";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { CartDrawer, CartItem } from "@/components/CartDrawer";
import {
  CareGuideSection,
  AboutSection,
  HowToBuySection,
  TestimonialsSection,
  FaqSection,
  ContactSection,
  Footer,
  FloatingActions,
} from "@/components/StoreSections";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "todas">("todas");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Recuperar el carrito guardado si el cliente recarga la página
  useEffect(() => {
    try {
      const saved = localStorage.getItem("piccolo_giardino_cart");
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch {
      // Ignorar errores de lectura de localStorage
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("piccolo_giardino_cart", JSON.stringify(cartItems));
    } catch {
      // Ignorar errores de escritura
    }
  }, [cartItems]);

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartAmount = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. Header fijo */}
      <Navbar cartCount={totalItemsCount} onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-1">
        {/* 2. Hero impactante */}
        <Hero />

        {/* 3. Categorías destacadas */}
        <CategoriesSection
          selectedCategory={selectedCategory}
          onSelectCategory={(cat: ProductCategory) => setSelectedCategory(cat)}
        />

        {/* 4. Catálogo principal con filtros y buscador */}
        <CatalogSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectProduct={(product: Product) => setSelectedProduct(product)}
          onAddToCart={handleAddToCart}
        />

        {/* 6. Guía de cuidados */}
        <CareGuideSection />

        {/* 7. Sobre nosotros */}
        <AboutSection />

        {/* 8. Cómo comprar y envíos con Uber */}
        <HowToBuySection />

        {/* 9. Testimonios de clientes */}
        <TestimonialsSection />

        {/* 10. Preguntas frecuentes en acordeón */}
        <FaqSection />

        {/* 11. Contacto y Mapa */}
        <ContactSection />
      </main>

      {/* 12. Footer completo */}
      <Footer />

      {/* 13. Botón flotante de WhatsApp y barra móvil de pedido */}
      <FloatingActions
        cartCount={totalItemsCount}
        cartTotal={totalCartAmount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 4b. Modal de vista de detalle de producto */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 5. Carrito de pedido simple con envío a WhatsApp */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}