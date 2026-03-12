import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, CheckCircle2, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import * as motion from "motion/react-client";
import { getProductBySlug, type TinaProduct } from "@/src/lib/tina";
import ProductCarousel from "@/src/components/ProductCarousel";
import { siteConfig } from "@/src/config/site";

import AddToCartButton from "@/src/components/AddToCartButton";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    if (!product) return { title: "Product Not Found" };
    return {
        title: `${product.title} | ${siteConfig.name}`,
        description: product.description,
    };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const whatsappMessage = `Hi, I want to order this product:

*${product.title}*
Price: ₹${product.price}
Link: https://radhekrishnadecor.com/products/${product.slug}`;

    const whatsappUrl = `https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="min-h-screen bg-[#fcfaf8] py-12">
            <div className="container mx-auto px-4">
                <Link href="/products" className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-700 transition-colors mb-8 font-medium">
                    <ArrowLeft className="w-4 h-4" /> Back to Collection
                </Link>

                <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Product Images Carousel */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative lg:h-full overflow-hidden"
                        >
                            <ProductCarousel images={product.images} title={product.title} />
                            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium text-stone-800 shadow-sm z-10">
                                {product.category}
                            </div>
                        </motion.div>

                        {/* Product Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="p-8 md:p-12 flex flex-col justify-center"
                        >
                            <div className="mb-8">
                                <h1 className="text-3xl md:text-5xl font-serif text-stone-900 mb-4 leading-tight">
                                    {product.title}
                                </h1>
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-3xl font-medium text-amber-700">₹{product.price}</span>
                                    <span className="text-sm text-stone-500 bg-stone-100 px-3 py-1 rounded-full">Tax included</span>
                                </div>
                                <div className="w-24 h-1 bg-stone-200 rounded-full mb-8"></div>
                                <p className="text-stone-600 text-lg leading-relaxed mb-8">
                                    {product.description}
                                </p>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                <div className="flex items-center gap-3 text-stone-600">
                                    <CheckCircle2 className="w-5 h-5 text-amber-600" />
                                    <span className="text-sm font-medium">Handcrafted Quality</span>
                                </div>
                                <div className="flex items-center gap-3 text-stone-600">
                                    <ShieldCheck className="w-5 h-5 text-amber-600" />
                                    <span className="text-sm font-medium">Premium Materials</span>
                                </div>
                                <div className="flex items-center gap-3 text-stone-600">
                                    <Truck className="w-5 h-5 text-amber-600" />
                                    <span className="text-sm font-medium">Safe Delivery</span>
                                </div>
                            </div>

                            {/* Order Button */}
                            <div className="mt-auto">
                                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-6">
                                    <h3 className="font-medium text-amber-900 mb-2">Ready to order?</h3>
                                    <p className="text-sm text-amber-800/80 mb-6">
                                        Add to your cart to order multiple items at once, or order this single piece directly on WhatsApp.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <AddToCartButton
                                            product={product}
                                            className="flex-1 flex items-center justify-center gap-3 bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all hover:shadow-lg hover:shadow-amber-700/20"
                                        />
                                        <a
                                            href={whatsappUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all hover:shadow-lg hover:shadow-green-600/20"
                                        >
                                            <MessageCircle className="w-6 h-6" /> Direct Order
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
