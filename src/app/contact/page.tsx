import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import * as motion from "motion/react-client";

export default function ContactPage() {
    const contactInfo = [
        {
            icon: <Phone className="w-6 h-6 text-amber-700" />,
            label: "Call Us",
            value: "+91 9989411965",
            href: "tel:+919989411965",
        },
        {
            icon: <MessageCircle className="w-6 h-6 text-green-600" />,
            label: "WhatsApp",
            value: "+91 9989411965",
            href: "https://wa.me/919989411965",
        },
        {
            icon: <Mail className="w-6 h-6 text-amber-700" />,
            label: "Email",
            value: "rkcd26hyd@gmail.com",
            href: "mailto:rkcd26hyd@gmail.com",
        },
        {
            icon: <MapPin className="w-6 h-6 text-amber-700" />,
            label: "Address",
            value: "Splendour Apartments, Gajularamaram",
            href: "#",
        },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <section className="py-24 bg-[#fcfaf8]">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-serif text-stone-900 mb-8 text-center">Contact Us</h1>
                        <div className="w-24 h-1 bg-amber-700 mx-auto rounded-full mb-16"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div className="space-y-8">
                                <h2 className="text-3xl font-serif text-stone-900">Get in Touch</h2>
                                <p className="text-stone-600 text-lg leading-relaxed">
                                    Have a question about our products or want to request a custom design? We'd love to hear from you. Reach out to us through any of the following channels.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {contactInfo.map((info, idx) => (
                                        <a
                                            key={idx}
                                            href={info.href}
                                            className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow group"
                                        >
                                            <div className="mb-4">{info.icon}</div>
                                            <h3 className="text-sm font-medium text-stone-400 uppercase tracking-wider mb-1">{info.label}</h3>
                                            <p className="text-stone-900 font-medium group-hover:text-amber-700 transition-colors">{info.value}</p>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
                                <h3 className="text-2xl font-serif text-stone-900 mb-6 text-center">Quick WhatsApp Order</h3>
                                <p className="text-stone-600 mb-8 text-center">
                                    The fastest way to get in touch or place an order is via WhatsApp.
                                </p>
                                <a
                                    href="https://wa.me/919989411965"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white px-8 py-5 rounded-2xl text-xl font-medium transition-all hover:scale-[1.02] shadow-lg shadow-green-600/20"
                                >
                                    <MessageCircle className="w-6 h-6" /> Message on WhatsApp
                                </a>

                                <div className="mt-12 p-6 bg-amber-50 rounded-2xl border border-amber-100">
                                    <h4 className="font-medium text-amber-900 mb-2">Business Hours</h4>
                                    <p className="text-sm text-amber-800/80">
                                        We are available to chat and take orders every day from 9:00 AM to 9:00 PM.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
