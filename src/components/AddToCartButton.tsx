"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/src/context/CartContext";
import { TinaProduct } from "@/src/lib/tina";

export default function AddToCartButton({ product, className }: { product: TinaProduct, className?: string }) {
    const { addToCart } = useCart();

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
            }}
            className={className || "flex items-center gap-2 bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"}
        >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart</span>
        </button>
    );
}
