import Link from "next/link";
import { ArrowRight, MessageCircle, Instagram, Heart, Sparkles, Star, ShieldCheck } from "lucide-react";
import * as motion from "motion/react-client";
import { getHomepageData, getProducts } from "@/src/lib/tina";
import Image from "next/image";

import AddToCartButton from "@/src/components/AddToCartButton";

export default async function Home() {
    const data = await getHomepageData();
    const allProducts = await getProducts();
    const featuredProducts = allProducts.filter((p: any) => p.featured === "true" || p.featured === true).slice(0, 6);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-stone-900">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero-bg.png"
                        alt="Handcrafted Indian Decor"
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-transparent" />
                </div>

                <div className="relative z-10 container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-3xl mx-auto"
                    >
                        <span className="text-amber-500 font-medium tracking-widest uppercase text-sm mb-6 block">
                            Radhe Krishna Creations & Decor
                        </span>
                        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
                            {data.heroHeadline}
                        </h1>
                        <p className="text-lg md:text-xl text-stone-300 mb-10 font-light max-w-2xl mx-auto">
                            {data.heroDescription}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/products"
                                className="bg-amber-700 hover:bg-amber-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all hover:scale-105 flex items-center gap-2 w-full sm:w-auto justify-center"
                            >
                                View Products <ArrowRight className="w-5 h-5" />
                            </Link>
                            <a
                                href="https://wa.me/919989411965"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full text-lg font-medium transition-all hover:scale-105 flex items-center gap-2 w-full sm:w-auto justify-center"
                            >
                                <MessageCircle className="w-5 h-5" /> Order via WhatsApp
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-24 bg-[#fcfaf8]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">{data.featuredSectionTitle}</h2>
                        <div className="w-24 h-1 bg-amber-700 mx-auto rounded-full"></div>
                        <p className="text-stone-500 mt-6 max-w-2xl mx-auto">
                            Discover our most loved pieces, carefully curated to add a touch of elegance to your home.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {featuredProducts.map((product: any, index: number) => (
                            <motion.div
                                key={product.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col h-full"
                            >
                                <Link href={`/products/${product.slug}`} className="relative aspect-[4/3] overflow-hidden block">
                                    <Image
                                        src={product.image || 'https://placehold.co/600x400/ffffff/78350f?text=Product'}
                                        alt={product.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-stone-800 shadow-sm">
                                        {product.category}
                                    </div>
                                </Link>
                                <div className="p-6 flex flex-col flex-grow">
                                    <Link href={`/products/${product.slug}`} className="block mb-2">
                                        <h3 className="text-xl font-serif text-stone-900 group-hover:text-amber-700 transition-colors">
                                            {product.title}
                                        </h3>
                                    </Link>
                                    <p className="text-stone-500 text-sm mb-4 line-clamp-2 flex-grow">
                                        {product.description}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
                                        <span className="text-lg font-medium text-stone-900">₹{product.price}</span>
                                        <div className="flex items-center gap-2">
                                            <AddToCartButton
                                                product={product}
                                                className="p-2 bg-amber-50 text-amber-700 hover:bg-amber-700 hover:text-white rounded-full transition-all border border-amber-100 shadow-sm"
                                            />
                                            <a
                                                href={`https://wa.me/919989411965?text=Hi%20I%20want%20to%20order%20this%20product:%0A%0A*${encodeURIComponent(product.title)}*%0APrice:%20%E2%82%B9${product.price}%0ALink:%20https://radhekrishnadecor.com/products/${product.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-full transition-colors"
                                            >
                                                <MessageCircle className="w-4 h-4" /> Order
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 text-amber-700 font-medium hover:text-amber-800 transition-colors border-b border-amber-700 pb-1"
                        >
                            View All Products <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-stone-900 text-stone-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">{data.aboutHeadline}</h2>
                        <div className="w-24 h-1 bg-amber-700 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Heart className="w-8 h-8 text-amber-500" />,
                                title: "Handcrafted Products",
                                desc: "Every item is made with love and attention to detail.",
                            },
                            {
                                icon: <Sparkles className="w-8 h-8 text-amber-500" />,
                                title: "Perfect for Festivals",
                                desc: "Elevate your celebrations with our festive collections.",
                            },
                            {
                                icon: <Star className="w-8 h-8 text-amber-500" />,
                                title: "Unique Designs",
                                desc: "Exclusive decorative pieces you won't find anywhere else.",
                            },
                            {
                                icon: <ShieldCheck className="w-8 h-8 text-amber-500" />,
                                title: "High Quality",
                                desc: "Premium materials ensuring durability and elegance.",
                            },
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="bg-stone-800/50 p-8 rounded-2xl border border-stone-700/50 text-center hover:bg-stone-800 transition-colors"
                            >
                                <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-medium text-white mb-3">{feature.title}</h3>
                                <p className="text-stone-400 text-sm leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WhatsApp CTA */}
            <section className="py-24 bg-amber-50 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                        <MessageCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-6">
                        {data.ctaHeadline}
                    </h2>
                    <p className="text-lg text-stone-600 mb-10">
                        {data.ctaText}
                    </p>
                    <a
                        href="https://wa.me/919989411965"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white px-10 py-5 rounded-full text-xl font-medium transition-all hover:scale-105 shadow-lg shadow-green-600/20"
                    >
                        <MessageCircle className="w-6 h-6" /> Chat with us on WhatsApp
                    </a>
                </div>
            </section>
        </div>
    );
}
