"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { REGISTER_URL } from "@/lib/Constants";

const NAV_LINKS = [
  { label: "Quest Trail", href: "/#quest-trail" },
  { label: "Prizes", href: "/#prizes" },
  { label: "Schedule", href: "/#schedule" },
  { label: "Rules", href: "/#rules" },
  { label: "Play & Win 🎮", href: "/game" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Image src="/logo.png" alt="SynaptIQ Logo" width={80} height={80} className="hidden sm:block rounded-full" />
          <a href="#" className="font-display text-3xl md:text-4xl tracking-wider text-accent-gold uppercase">
            CodeHunt 3.0
          </a>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium hover:text-accent-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={REGISTER_URL}
            className="px-6 py-2.5 bg-accent-gold text-background font-bold tracking-wide rounded hover:bg-accent-gold/90 transition-transform hover:scale-105 active:scale-95"
          >
            REGISTER
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 right-0 bg-background border-b border-white/10 shadow-xl"
          >
            <div className="flex flex-col p-6 gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium py-2 border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={REGISTER_URL}
                onClick={() => setIsOpen(false)}
                className="mt-4 px-6 py-3 bg-accent-gold text-background font-bold text-center rounded"
              >
                REGISTER NOW
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
