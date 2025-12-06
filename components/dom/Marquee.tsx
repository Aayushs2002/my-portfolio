'use client';

import { motion } from 'framer-motion';
import { 
  Code2, Globe, Palette, Database, Server, 
  Layout, Box, Layers, Zap,
  Cpu, Wifi, Lock, Smartphone
} from 'lucide-react';

const skills = [
  { name: "React", icon: Code2 },
  { name: "Next.js", icon: Globe },
  { name: "Three.js", icon: Box },
  { name: "Tailwind", icon: Palette },
  { name: "Node.js", icon: Server },
  { name: "PostgreSQL", icon: Database },
  { name: "TypeScript", icon: Code2 },
  { name: "Framer Motion", icon: Zap },
  { name: "Docker", icon: Layers },
  { name: "GraphQL", icon: Layout },
  { name: "WebSockets", icon: Wifi },
  { name: "Cybersecurity", icon: Lock },
  { name: "React Native", icon: Smartphone },
  { name: "System Design", icon: Cpu },
];

export default function Marquee() {
  return (
    <section className="py-10 bg-zinc-950 overflow-hidden border-y border-white/5">
      <div className="relative flex">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

        {/* Marquee Track */}
        <motion.div
          className="flex gap-16 px-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {/* Duplicate list twice to ensure seamless loop */}
          {[...skills, ...skills].map((skill, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 text-zinc-400 whitespace-nowrap group cursor-default"
            >
              <skill.icon size={24} className="group-hover:text-purple-400 transition-colors" />
              <span className="text-xl font-medium group-hover:text-white transition-colors">
                {skill.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
