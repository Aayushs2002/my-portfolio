'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { label: 'Years Experience', value: '3+' },
  { label: 'Projects Completed', value: '20+' },
  { label: 'Happy Clients', value: '10+' },
];

import QuoteRotator from './QuoteRotator';

// ...

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={sectionRef} id="about" className="py-32 px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          {/* Left Column: Text & Stats */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            >
              About Me
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6 text-lg text-zinc-400 leading-relaxed"
            >
              <p>
                I&apos;m a passionate developer who bridges the gap between design and engineering. 
                With a keen eye for detail and a love for clean code, I build digital products 
                that look great and perform even better.
              </p>
              <p>
                My journey started with simple HTML pages and has evolved into building complex 
                3D web applications. I believe in continuous learning and pushing the boundaries 
                of what&apos;s possible on the web.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="text-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-zinc-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Quote Rotator */}
          <div className="relative h-[400px]">
             {/* Decorative background element with parallax */}
            <motion.div 
              className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl -z-10"
              style={{ y }}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-full"
            >
              <QuoteRotator />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
