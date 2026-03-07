import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { MessageCircle, Filter } from "lucide-react";
import type { Product } from "@/src/types";
import { cn } from "@/src/lib/utils";
import SEO from "@/src/components/SEO";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        const uniqueCategories = Array.from(new Set(data.map((p) => p.category)));
        setCategories(["All", ...uniqueCategories]);
      });
  }, []);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#fcfaf8] py-12">
      <SEO 
        title="Products" 
        description="Browse our complete range of handcrafted decor items, perfect for your home or as thoughtful gifts." 
        keywords="handmade decor, festive decor items, pooja decoration, handmade candles, gift decor" 
      />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Our Collection</h1>
          <div className="w-24 h-1 bg-amber-700 mx-auto rounded-full mb-6"></div>
          <p className="text-stone-500 max-w-2xl mx-auto">
            Browse our complete range of handcrafted decor items, perfect for your home or as thoughtful gifts.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <div className="flex items-center gap-2 text-stone-500 mr-4">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wider">Filter:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === category
                  ? "bg-amber-700 text-white shadow-md"
                  : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col h-full"
            >
              <Link to={`/products/${product.id}`} className="relative aspect-[4/3] overflow-hidden block">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-stone-800 shadow-sm">
                  {product.category}
                </div>
              </Link>
              <div className="p-5 flex flex-col flex-grow">
                <Link to={`/products/${product.id}`} className="block mb-2">
                  <h3 className="text-lg font-serif text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                    {product.title}
                  </h3>
                </Link>
                <p className="text-stone-500 text-sm mb-4 line-clamp-2 flex-grow">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
                  <span className="text-lg font-medium text-stone-900">₹{product.price}</span>
                  <a
                    href={`https://wa.me/919989411965?text=Hi%20I%20want%20to%20order%20this%20product:%0A%0A*${encodeURIComponent(product.title)}*%0APrice:%20%E2%82%B9${product.price}%0ALink:%20${encodeURIComponent(window.location.origin + "/products/" + product.id)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-full transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Order
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-stone-500 text-lg">No products found in this category.</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-4 text-amber-700 font-medium hover:underline"
            >
              View all products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
