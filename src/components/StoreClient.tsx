"use client";

import React, { useState, useEffect } from "react";
import {
  Product,
  CategoryInfo,
  SiteConfig,
  ProductCategory,
} from "@/data/products";
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

interface StoreClientProps {
  products: Product[];
  categories: CategoryInfo[];
  siteConfig: SiteConfig;
}

export function StoreClient({
  products,
  categories,
  siteConfig,
}: StoreClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "todas">("todas");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("piccolo_giardino_cart");
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch {
      // Ignorar errores de localStorage
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("piccolo_giardino_cart", JSON.stringify(cartItems));
    } catch {
      // Ignorar errores de localStorage
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
      <Navbar
        cartCount={totalItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
        siteConfig={siteConfig}
      />

      <main className="flex-1">
        <Hero siteConfig={siteConfig} />

        <CategoriesSection
          selectedCategory={selectedCategory}
          onSelectCategory={(cat: ProductCategory) => setSelectedCategory(cat)}
          categories={categories}
          products={products}
        />

        <CatalogSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectProduct={(product: Product) => setSelectedProduct(product)}
          onAddToCart={handleAddToCart}
          products={products}
          categories={categories}
          siteConfig={siteConfig}
        />

        <CareGuideSection />
        <AboutSection />
        <HowToBuySection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection siteConfig={siteConfig} />
      </main>

      <Footer siteConfig={siteConfig} />

      <FloatingActions
        cartCount={totalItemsCount}
        cartTotal={totalCartAmount}
        onOpenCart={() => setIsCartOpen(true)}
        siteConfig={siteConfig}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        siteConfig={siteConfig}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        siteConfig={siteConfig}
      />
    </div>
  );
}