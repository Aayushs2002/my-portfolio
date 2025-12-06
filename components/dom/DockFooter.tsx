'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Home, User, Code, Send, LucideIcon } from 'lucide-react';

export default function DockFooter({ visible = true }: { visible?: boolean }) {
  const mouseX = useMotionValue(Infinity);

  const navLinks = [
    { icon: Home, href: '#', label: 'Home' },
    { icon: User, href: '#about', label: 'About' },
    { icon: Code, href: '#projects', label: 'Projects' },
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:hello@example.com', label: 'Contact' },
  ];

  return (
    <motion.div 
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: 150 }}
      animate={{ y: visible ? 0 : 150 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex h-16 items-end gap-2 rounded-2xl bg-zinc-900/80 px-4 pb-3 backdrop-blur-md border border-white/10 shadow-2xl"
      >
        {navLinks.map((link, i) => (
          <DockIcon key={i} mouseX={mouseX} icon={link.icon} href={link.href} />
        ))}
        
        {/* Separator */}
        <div className="w-px h-8 bg-white/10 mx-2 self-center" />
        
        {socialLinks.map((link, i) => (
          <DockIcon key={i} mouseX={mouseX} icon={link.icon} href={link.href} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function DockIcon({ mouseX, icon: Icon, href }: { mouseX: MotionValue; icon: LucideIcon; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ width }}
      className="aspect-square w-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 border border-white/5"
    >
      <Icon size={20} className="text-white" />
    </motion.a>
  );
}
