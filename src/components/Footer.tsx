import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              {/* Logo */}
              <Image src="/logo.png" alt="SynaptIQ Logo" width={80} height={80} className="rounded-full shadow-lg" />
              <span className="font-display text-3xl tracking-wider text-off-white uppercase">
                CodeHunt 3.0
              </span>
            </div>
            <p className="text-foreground/60 text-sm max-w-sm leading-relaxed mb-6">
              Approved by AICTE, New Delhi &middot; Recognized by Government of Karnataka & Affiliated to VTU, Belagavi
            </p>
          </div>

          <div>
            <h4 className="font-bold text-off-white mb-4 uppercase tracking-widest text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:testsansmofficial@gmail.com" className="flex items-start gap-3 text-foreground/70 hover:text-accent-gold transition-colors">
                  <Mail size={18} className="shrink-0 mt-0.5" />
                  <span>testsansmofficial@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-foreground/70">
                  <Phone size={18} className="shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <a href="tel:+917022032851" className="hover:text-accent-gold transition-colors">+91 70220 32851</a>
                    <a href="tel:+919902658373" className="hover:text-accent-gold transition-colors">+91 99026 58373</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-off-white mb-4 uppercase tracking-widest text-sm">Venue</h4>
            <div className="flex items-start gap-3 text-foreground/70">
              <MapPin size={18} className="shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                AIEMS Bidadi, Near Toyota Kirloskar Motors, Industrial Town, Kenchanahalli, Karnataka
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-sm text-foreground/50">
          <p>&copy; {new Date().getFullYear()} SynaptIQ AI&ML Club. All rights reserved.</p>
          <a
            href="#"
            className="flex items-center gap-2 mt-4 md:mt-0 hover:text-off-white transition-colors uppercase tracking-widest font-bold"
          >
            Back to Top
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
