"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { TinaProduct } from "@/src/lib/tina";

interface CartItem {
    product: TinaProduct;
    quantity: number;
}

interface AddressDetails {
    country: string;
    state: string;
    city: string;
    pincode: string;
    addressLine1: string;
    addressLine2: string;
    landmark: string;
    mobile: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: TinaProduct) => void;
    removeFromCart: (slug: string) => void;
    updateQuantity: (slug: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    address: AddressDetails;
    setAddress: (address: AddressDetails) => void;
}

const defaultAddress: AddressDetails = {
    country: "",
    state: "",
    city: "",
    pincode: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    mobile: "",
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [address, setAddress] = useState<AddressDetails>(defaultAddress);

    // Load cart and address from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart from localStorage", e);
            }
        }

        const savedAddress = localStorage.getItem("address");
        if (savedAddress) {
            try {
                setAddress(JSON.parse(savedAddress));
            } catch (e) {
                console.error("Failed to parse address from localStorage", e);
            }
        }
    }, []);

    // Save cart and address to localStorage on change
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    useEffect(() => {
        localStorage.setItem("address", JSON.stringify(address));
    }, [address]);

    const addToCart = (product: TinaProduct) => {
        setItems((prev) => {
            const existingItem = prev.find((item) => item.product.slug === product.slug);
            if (existingItem) {
                return prev.map((item) =>
                    item.product.slug === product.slug
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
        setIsCartOpen(true); // Open cart when item is added
    };

    const removeFromCart = (slug: string) => {
        setItems((prev) => prev.filter((item) => item.product.slug !== slug));
    };

    const updateQuantity = (slug: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(slug);
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.product.slug === slug ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => {
        const price = typeof item.product.price === 'string'
            ? parseFloat(item.product.price.replace(/[^0-9.]/g, ''))
            : item.product.price;
        return sum + price * item.quantity;
    }, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
                isCartOpen,
                setIsCartOpen,
                address,
                setAddress,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
