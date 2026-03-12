"use client";

import React, { useEffect, useRef } from "react";
import { X, ShoppingBag, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/src/context/CartContext";
import Image from "next/image";
import * as motion from "motion/react-client";
import { siteConfig } from "@/src/config/site";

export default function CartSidebar() {
    const {
        items,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        totalPrice,
        totalItems,
        address,
        setAddress
    } = useCart();
    const [step, setStep] = React.useState<"cart" | "address">("cart");
    const sidebarRef = useRef<HTMLDivElement>(null);

    // Reset step when cart closes
    useEffect(() => {
        if (!isCartOpen) {
            setTimeout(() => setStep("cart"), 300);
        }
    }, [isCartOpen]);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsCartOpen(false);
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [setIsCartOpen]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node) && isCartOpen) {
                setIsCartOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isCartOpen, setIsCartOpen]);

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    };

    const isAddressValid = () => {
        return (
            address.country &&
            address.state &&
            address.city &&
            address.pincode &&
            address.addressLine1 &&
            address.addressLine2 &&
            address.mobile
        );
    };

    const handleCheckout = () => {
        if (!isAddressValid()) return;

        const businessNumber = siteConfig.phone;
        let message = `*New Order from ${siteConfig.name}*\n\n`;
        message += `*Customer Details:*\n`;
        message += `Mobile: ${address.mobile}\n`;
        message += `Address: ${address.addressLine1}, ${address.addressLine2}, ${address.city}, ${address.state} - ${address.pincode}, ${address.country}\n`;
        if (address.landmark) message += `Landmark: ${address.landmark}\n`;
        message += `\n*Order Items:*\n`;

        items.forEach((item, index) => {
            message += `${index + 1}. *${item.product.title}*\n`;
            message += `   Qty: ${item.quantity}\n`;
            message += `   Price: ₹${item.product.price} each\n\n`;
        });

        message += `*Total Amount: ₹${totalPrice}*\n\n`;
        message += `Please confirm the order and share payment details.`;

        const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
            />

            {/* Sidebar */}
            <motion.div
                ref={sidebarRef}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            >
                {/* Header */}
                <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-amber-50/50">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="w-6 h-6 text-amber-700" />
                        <h2 className="text-xl font-serif font-bold text-stone-900">
                            {step === "cart" ? "Your Cart" : "Shipping Details"}
                        </h2>
                        {step === "cart" && (
                            <span className="bg-amber-700 text-white text-xs px-2 py-0.5 rounded-full font-sans">
                                {totalItems}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 hover:bg-white rounded-full transition-colors text-stone-400 hover:text-stone-900 shadow-sm"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-grow overflow-y-auto p-6 space-y-6">
                    {step === "cart" ? (
                        items.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                                <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center">
                                    <ShoppingBag className="w-10 h-10 text-stone-400" />
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-stone-900">Your cart is empty</p>
                                    <p className="text-sm text-stone-500">Add some beautiful decor to get started!</p>
                                </div>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="mt-4 text-amber-700 font-medium border-b border-amber-700 pb-0.5 hover:text-amber-800 transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={item.product.slug} className="flex gap-4 group">
                                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-100">
                                        <Image
                                            src={item.product.image || "/placeholder.png"}
                                            alt={item.product.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-grow flex flex-col justify-between py-1">
                                        <div>
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className="font-medium text-stone-900 line-clamp-1">{item.product.title}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item.product.slug)}
                                                    className="text-stone-300 hover:text-red-500 transition-colors p-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-amber-700 font-medium">₹{item.product.price}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                                                <button
                                                    onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                                                    className="p-1.5 hover:bg-stone-100 text-stone-600 transition-colors"
                                                >
                                                    <Minus className="w-3.5 h-3.5" />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                                                    className="p-1.5 hover:bg-stone-100 text-stone-600 transition-colors"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    ) : (
                        /* Address Form */
                        <form className="space-y-4 pb-8">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-stone-700">Country*</label>
                                <select
                                    name="country"
                                    value={address.country}
                                    onChange={handleAddressChange}
                                    className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all bg-white"
                                >
                                    <option value="">Please enter your country</option>
                                    <option value="India">India</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-stone-700">State*</label>
                                    <input
                                        type="text"
                                        name="state"
                                        placeholder="Choose state"
                                        value={address.state}
                                        onChange={handleAddressChange}
                                        className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-sans"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-stone-700">City*</label>
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="Choose city"
                                        value={address.city}
                                        onChange={handleAddressChange}
                                        className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-sans"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-stone-700">Pincode/Zipcode*</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    placeholder="Please enter your Pincode"
                                    value={address.pincode}
                                    onChange={handleAddressChange}
                                    className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-sans"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-stone-700">Flat, House no., Building*</label>
                                <input
                                    type="text"
                                    name="addressLine1"
                                    placeholder="Flat, House no., Building, Company, Apartment"
                                    value={address.addressLine1}
                                    onChange={handleAddressChange}
                                    className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-sans"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-stone-700">Area, Colony, Street, Village*</label>
                                <input
                                    type="text"
                                    name="addressLine2"
                                    placeholder="Area, Colony, Street, Sector, Village"
                                    value={address.addressLine2}
                                    onChange={handleAddressChange}
                                    className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-sans"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-stone-700">Landmark</label>
                                <input
                                    type="text"
                                    name="landmark"
                                    placeholder="near post-office, hospital, school, bank"
                                    value={address.landmark}
                                    onChange={handleAddressChange}
                                    className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-sans"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-stone-700">Mobile Number*</label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    placeholder="Please enter your mobile number"
                                    value={address.mobile}
                                    onChange={handleAddressChange}
                                    className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-sans"
                                />
                            </div>
                        </form>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-6 border-t border-stone-100 bg-stone-50 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-stone-500">{step === "cart" ? "Subtotal" : "Total to Pay"}</span>
                            <span className="text-2xl font-serif font-bold text-stone-900">₹{totalPrice}</span>
                        </div>

                        {step === "cart" ? (
                            <button
                                onClick={() => setStep("address")}
                                className="w-full bg-amber-700 hover:bg-amber-800 text-white py-4 rounded-xl font-medium flex items-center justify-center gap-3 shadow-lg shadow-amber-700/20 transition-all hover:scale-[1.02] active:scale-95"
                            >
                                Proceed to Shipping
                            </button>
                        ) : (
                            <div className="space-y-3">
                                <button
                                    onClick={handleCheckout}
                                    disabled={!isAddressValid()}
                                    className={`w-full py-4 rounded-xl font-medium flex items-center justify-center gap-3 transition-all ${isAddressValid()
                                        ? "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20 hover:scale-[1.02] active:scale-95"
                                        : "bg-stone-200 text-stone-400 cursor-not-allowed"
                                        }`}
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Checkout via WhatsApp
                                </button>
                                <button
                                    onClick={() => setStep("cart")}
                                    className="w-full text-stone-500 hover:text-stone-800 text-sm font-medium transition-colors"
                                >
                                    Back to Cart
                                </button>
                            </div>
                        )}

                        {step === "cart" && (
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="w-full text-stone-500 hover:text-stone-800 text-sm font-medium transition-colors"
                            >
                                Continue Shopping
                            </button>
                        )}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
