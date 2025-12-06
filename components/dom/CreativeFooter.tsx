'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
export default function CreativeFooter() {
  const socialLinks = [
    { name: 'Github', icon: Github, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@example.com' },
  ];

  return (
    <footer className="relative py-32 bg-zinc-950 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/10 pointer-events-none" />
      
      <div className="container mx-auto px-8 relative z-10 flex flex-col items-center text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-16"
        >
          Ready to create something amazing?
        </motion.h2>

        {/* Magnetic Button */}
        <MagneticButton>
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-white text-black flex items-center justify-center cursor-pointer group relative overflow-hidden">
            <div className="absolute inset-0 bg-purple-500 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full ease-out" />
            <span className="relative z-10 text-xl md:text-2xl font-medium group-hover:text-white transition-colors duration-300">
              Get in Touch
            </span>
          </div>
        </MagneticButton>
  
        {/* Social Links */}
        <div className="flex gap-6 mt-24">
          {socialLinks.map((link, index) => (
            <motion.a 
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-300"
            >
              <link.icon size={24} />
            </motion.a>
          ))}
        </div>

        <div className="mt-16 text-zinc-500 text-sm">
          <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
