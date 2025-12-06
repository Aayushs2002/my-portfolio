'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    text: "The attention to detail is mind-blowing. Truly a master of their craft.",
    author: "Sarah Johnson",
    role: "Product Designer"
  },
  {
    text: "Delivered beyond our expectations. The 3D elements are buttery smooth.",
    author: "Mike Chen",
    role: "CTO, TechStart"
  },
  {
    text: "A rare combination of technical expertise and creative vision.",
    author: "Emily Davis",
    role: "Art Director"
  },
  {
    text: "Fast, reliable, and incredibly talented. Would hire again in a heartbeat.",
    author: "Alex Thompson",
    role: "Founder"
  },
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-zinc-950 overflow-hidden">
      <h2 className="text-center text-4xl font-bold text-white mb-16">What People Say</h2>
      
      <div className="relative flex w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10" />
        
        <motion.div
          className="flex gap-8 px-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <div 
              key={i} 
              className="w-[400px] flex-shrink-0 p-8 rounded-2xl bg-zinc-900/50 border border-white/10 backdrop-blur-sm"
            >
              <p className="text-lg text-zinc-300 mb-6 leading-relaxed">&quot;{t.text}&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                <div>
                  <div className="font-bold text-white">{t.author}</div>
                  <div className="text-sm text-zinc-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
