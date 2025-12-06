'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { useRef } from 'react';

export default function Contact() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} id="contact" className="py-32 relative overflow-hidden">
      {/* Animated Background Gradients */}
      <motion.div 
        className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] -z-10"
        style={{ y }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-8 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-bold tracking-wider text-purple-400 uppercase mb-4 block">
              Contact
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
              Let&apos;s Work <br /> Together
            </h2>
            <p className="text-xl text-zinc-400 mb-12 leading-relaxed max-w-lg">
              I&apos;m always open to discussing product design work or partnership opportunities.
              Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4 text-zinc-300">
                <div className="p-3 rounded-full bg-white/5 border border-white/10">
                  <Mail size={20} />
                </div>
                <span>hello@example.com</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-300">
                <div className="p-3 rounded-full bg-white/5 border border-white/10">
                  <MapPin size={20} />
                </div>
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-300">
                <div className="p-3 rounded-full bg-white/5 border border-white/10">
                  <Phone size={20} />
                </div>
                <span>+1 (555) 000-0000</span>
              </div>
            </div>

            <div className="flex gap-4">
              {[Github, Linkedin, Twitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <form className="p-8 md:p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-zinc-300">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-all text-white placeholder-zinc-600"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-zinc-300">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-all text-white placeholder-zinc-600"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-zinc-300">Subject</label>
                  <input 
                    type="text" 
                    id="subject"
                    className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-all text-white placeholder-zinc-600"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-zinc-300">Message</label>
                  <textarea 
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-all text-white placeholder-zinc-600 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <span>Send Message</span>
                  <Send size={18} />
                </motion.button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
