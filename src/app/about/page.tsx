import { Heart, Sparkles, Star } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="py-24 bg-[#fcfaf8]">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-serif text-stone-900 mb-8 text-center">Our Story</h1>
                        <div className="w-24 h-1 bg-amber-700 mx-auto rounded-full mb-16"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative aspect-square rounded-3xl overflow-hidden shadow-xl"
                            >
                                <Image
                                    src="https://picsum.photos/seed/story1/800/800"
                                    alt="Our Craftsmanship"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                            <div className="space-y-6">
                                <h2 className="text-3xl font-serif text-stone-900">Crafting Elegance</h2>
                                <p className="text-stone-600 leading-relaxed text-lg">
                                    Radhe Krishna Creations & Decor was born out of a passion for handcrafted beauty and traditional elegance. We believe that every occasion, big or small, deserves to be celebrated with pieces that reflect love and craftsmanship.
                                </p>
                                <p className="text-stone-600 leading-relaxed">
                                    Our journey started with a simple idea: to bring high-quality, handcrafted decor to those who appreciate the finer details. From hand-poured candles to intricate festive decorations, every item in our collection is a testament to our commitment to excellence.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="p-8 bg-white rounded-2xl shadow-sm border border-stone-100">
                                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Heart className="w-6 h-6 text-amber-700" />
                                </div>
                                <h3 className="text-xl font-serif text-stone-900 mb-4">Made with Love</h3>
                                <p className="text-stone-500 text-sm">Every piece is carefully handcrafted with passion and dedication.</p>
                            </div>
                            <div className="p-8 bg-white rounded-2xl shadow-sm border border-stone-100">
                                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Sparkles className="w-6 h-6 text-amber-700" />
                                </div>
                                <h3 className="text-xl font-serif text-stone-900 mb-4">Unique Designs</h3>
                                <p className="text-stone-500 text-sm">Exclusive collections that you won't find anywhere else.</p>
                            </div>
                            <div className="p-8 bg-white rounded-2xl shadow-sm border border-stone-100">
                                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Star className="w-6 h-6 text-amber-700" />
                                </div>
                                <h3 className="text-xl font-serif text-stone-900 mb-4">Premium Quality</h3>
                                <p className="text-stone-500 text-sm">We use only the finest materials to ensure lasting beauty.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
