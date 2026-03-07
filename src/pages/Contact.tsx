import { motion } from "motion/react";
import { Mail, Phone, MapPin, MessageCircle, Instagram } from "lucide-react";
import SEO from "@/src/components/SEO";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#fcfaf8] py-16">
      <SEO 
        title="Contact Us" 
        description="Get in touch with Radhe Krishna Creations & Decor for orders, inquiries, and custom designs." 
        keywords="contact us, handmade decor, festive decor items, pooja decoration" 
      />
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif text-stone-900 mb-4"
          >
            Get in Touch
          </motion.h1>
          <div className="w-24 h-1 bg-amber-700 mx-auto rounded-full mb-6"></div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-stone-500 max-w-2xl mx-auto text-lg"
          >
            We'd love to hear from you. Whether you have a question about our products, want to place a custom order, or just want to say hello.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-10 shadow-sm border border-stone-100"
          >
            <h2 className="text-2xl font-serif text-stone-900 mb-8">Contact Information</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-700 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium text-stone-900 mb-1">Our Location</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    Splendour Apartments,<br />
                    Gajularamaram,<br />
                    Hyderabad, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-700 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium text-stone-900 mb-1">Phone Number</h3>
                  <a href="tel:+919989411965" className="text-stone-500 text-sm hover:text-amber-700 transition-colors">
                    +91 9989411965
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-700 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium text-stone-900 mb-1">Email Address</h3>
                  <a href="mailto:rkcd26hyd@gmail.com" className="text-stone-500 text-sm hover:text-amber-700 transition-colors">
                    rkcd26hyd@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-stone-100">
              <h3 className="font-medium text-stone-900 mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-amber-700 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* WhatsApp CTA */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-stone-900 rounded-3xl p-10 shadow-xl text-white flex flex-col justify-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-700/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-600/20 rounded-full blur-3xl -ml-20 -mb-20"></div>
            
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/20">
                <MessageCircle className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-3xl font-serif mb-4">Chat with us directly</h2>
              <p className="text-stone-300 mb-10 text-lg font-light">
                The fastest way to reach us is through WhatsApp. We're available to answer your questions and take orders.
              </p>
              <a 
                href="https://wa.me/919989411965" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-stone-900 px-8 py-4 rounded-full text-lg font-medium transition-all hover:scale-105 w-full"
              >
                <MessageCircle className="w-6 h-6" /> Open WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
