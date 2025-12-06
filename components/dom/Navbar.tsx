'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Navbar({ visible = true }: { visible?: boolean }) {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -150 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-10 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-xl pointer-events-auto"
    >
      <a href="#" className="text-2xl font-bold tracking-tighter hover:text-accent transition-colors">
        PORTFOLIO
      </a>
      
      <div className="hidden md:flex gap-8 border-l border-white/10 pl-8">
        <a href="#about" className="text-base font-medium hover:text-accent transition-colors">About</a>
        <a href="#projects" className="text-base font-medium hover:text-accent transition-colors">Projects</a>
        <a href="#contact" className="text-base font-medium hover:text-accent transition-colors">Contact</a>
      </div>

      <div className="flex gap-4 border-l border-white/10 pl-6">
        <a href="#" className="hover:text-accent transition-colors"><Github size={18} /></a>
        <a href="#" className="hover:text-accent transition-colors"><Twitter size={18} /></a>
        <a href="#" className="hover:text-accent transition-colors"><Linkedin size={18} /></a>
      </div>
    </motion.nav>
  );
}
