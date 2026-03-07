import { motion } from "motion/react";
import { Heart, Star, ShieldCheck } from "lucide-react";
import SEO from "@/src/components/SEO";

export default function About() {
  return (
    <div className="min-h-screen bg-[#fcfaf8] py-16">
      <SEO 
        title="About Us" 
        description="Learn more about Radhe Krishna Creations & Decor, our story, and our passion for handcrafted decor." 
        keywords="about us, handmade decor, festive decor items, pooja decoration" 
      />
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif text-stone-900 mb-4"
          >
            Our Story
          </motion.h1>
          <div className="w-24 h-1 bg-amber-700 mx-auto rounded-full mb-6"></div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-stone-500 max-w-2xl mx-auto text-lg"
          >
            Bringing elegance and tradition to your home through handcrafted decor.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-3xl overflow-hidden shadow-xl"
          >
            <img 
              src="https://picsum.photos/seed/about/800/800" 
              alt="Our Workshop" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-serif text-stone-900">Radhe Krishna Creations & Decor</h2>
            <p className="text-stone-600 leading-relaxed">
              Founded with a passion for art and tradition, Radhe Krishna Creations & Decor is dedicated to crafting beautiful, high-quality decorative items that add a touch of elegance to every occasion.
            </p>
            <p className="text-stone-600 leading-relaxed">
              From hand-poured scented candles to intricate pooja decorations and festive wall hangings, each piece in our collection is thoughtfully designed and meticulously crafted by skilled artisans.
            </p>
            <p className="text-stone-600 leading-relaxed">
              We believe that decor is more than just ornamentation; it's a way to express your style, celebrate your traditions, and create a warm, welcoming atmosphere in your home.
            </p>
          </motion.div>
        </div>

        <div className="bg-white rounded-3xl p-12 shadow-sm border border-stone-100 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-stone-900 mb-4">Our Values</h2>
            <div className="w-16 h-1 bg-amber-700 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-700">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-stone-900">Crafted with Love</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Every item is made with genuine care and attention to detail, ensuring a personal touch in every piece.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-700">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-stone-900">Unique Designs</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                We blend traditional motifs with modern aesthetics to create decor that stands out.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-700">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-stone-900">Premium Quality</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                We use only the finest materials to ensure our products are not only beautiful but durable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
