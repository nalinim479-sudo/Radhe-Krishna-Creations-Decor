import Link from "next/link";
import { getProducts } from "@/src/lib/tina";
import Image from "next/image";
import * as motion from "motion/react-client";

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="min-h-screen bg-[#fcfaf8] py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Our Collection</h1>
                    <div className="w-24 h-1 bg-amber-700 mx-auto rounded-full"></div>
                    <p className="text-stone-500 mt-6 max-w-2xl mx-auto">
                        Browse our range of handcrafted decor items designed to bring elegance to your home and celebrations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product: any, index: number) => (
                        <motion.div
                            key={product.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col h-full"
                        >
                            <Link href={`/products/${product.slug}`} className="relative aspect-[4/3] overflow-hidden block">
                                <Image
                                    src={product.image}
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
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-lg font-medium text-stone-900">₹{product.price}</span>
                                    <Link
                                        href={`/products/${product.slug}`}
                                        className="text-amber-700 hover:text-amber-800 font-medium text-sm"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
