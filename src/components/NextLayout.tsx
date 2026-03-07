"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Instagram, Mail, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans bg-[#fcfaf8] text-stone-900">
            {/* Top Banner */}
            <div className="bg-amber-700 text-white text-xs py-2 text-center tracking-wider">
                FREE SHIPPING ON ORDERS OVER ₹2000 | ELEGANT DECOR FOR EVERY OCCASION
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="h-16 w-16 shrink-0 rounded-full overflow-hidden bg-white border border-amber-200 flex items-center justify-center shadow-md">
                            <img
                                src="/logo.png"
                                alt="Radhe Krishna Creations & Decor Logo"
                                className="h-full w-full object-contain p-1"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/150x150/ffffff/78350f?text=RK';
                                }}
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-serif text-2xl font-bold text-amber-900 tracking-tight leading-none uppercase">
                                Radhe Krishna
                            </span>
                            <span className="font-serif text-sm text-amber-700 hidden sm:block mt-1 tracking-widest uppercase">
                                Creations & Decor
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-amber-700",
                                    pathname === link.path
                                        ? "text-amber-700 border-b-2 border-amber-700 pb-1"
                                        : "text-stone-600"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <a
                            href="https://wa.me/919989411965"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                        >
                            <MessageCircle className="w-4 h-4" />
                            <span>WhatsApp Us</span>
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-stone-600"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Nav */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-stone-200 shadow-lg py-4 px-4 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={cn(
                                    "text-lg font-medium py-2 border-b border-stone-100",
                                    pathname === link.path ? "text-amber-700" : "text-stone-600"
                                )}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a
                            href="https://wa.me/919989411965"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-xl text-base font-medium mt-4"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <MessageCircle className="w-5 h-5" />
                            <span>Order on WhatsApp</span>
                        </a>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-stone-900 text-stone-300 py-16">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-12 w-12 shrink-0 rounded-full overflow-hidden bg-white flex items-center justify-center">
                                <img
                                    src="/logo.png"
                                    alt="Radhe Krishna Creations & Decor Logo"
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/150x150/ffffff/78350f?text=Logo';
                                    }}
                                />
                            </div>
                            <h3 className="font-serif text-2xl text-white">
                                Radhe Krishna Creations & Decor
                            </h3>
                        </div>
                        <p className="text-stone-400 mb-6 max-w-sm">
                            Elegant Decor for Every Occasion. 🌸 Handcrafted candles, festive decor, and pooja decorations designed with love.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-700 transition-colors text-white">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="mailto:rkcd26hyd@gmail.com" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-700 transition-colors text-white">
                                <Mail className="w-5 h-5" />
                            </a>
                            <a href="tel:+919989411965" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-700 transition-colors text-white">
                                <Phone className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link href="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
                            <li><Link href="/products" className="hover:text-amber-500 transition-colors">Shop All</Link></li>
                            <li><Link href="/about" className="hover:text-amber-500 transition-colors">Our Story</Link></li>
                            <li><Link href="/contact" className="hover:text-amber-500 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">Contact</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <span className="mt-1">📍</span>
                                <span>Splendour Apartments,<br />Gajularamaram</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span>📞</span>
                                <span>+91 9989411965</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span>✉️</span>
                                <span>rkcd26hyd@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="container mx-auto px-4 mt-12 pt-8 border-t border-stone-800 text-sm text-stone-500 flex flex-col md:flex-row justify-between items-center">
                    <p>&copy; {new Date().getFullYear()} Radhe Krishna Creations & Decor. All rights reserved.</p>
                    <Link href="/admin" className="mt-4 md:mt-0 hover:text-stone-300">Admin Login</Link>
                </div>
            </footer>
        </div>
    );
}
