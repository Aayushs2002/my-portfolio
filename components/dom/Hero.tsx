'use client';

import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Scene from '@/components/canvas/Scene';
import Hero3D from '@/components/canvas/Hero3D';
import Background from '@/components/canvas/Background';
import { ArrowRight, Sparkles, Code, Zap } from 'lucide-react';
import TextScramble from './TextScramble';
import GlitchText from './GlitchText';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Set initial dimensions
    if (typeof window !== 'undefined') {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }

    // Generate particles on client side only
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
      }))
    );

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const mouseX = useSpring(mousePosition.x, { stiffness: 50, damping: 10 });
  const mouseY = useSpring(mousePosition.y, { stiffness: 50, damping: 10 });

  const rotateX = useTransform(mouseY, [0, dimensions.height], [5, -5]);
  const rotateY = useTransform(mouseX, [0, dimensions.width], [-5, 5]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 3D Scene */}
      <Scene className="absolute inset-0 pointer-events-none">
        <Background />
        <Hero3D />
      </Scene>

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-purple-400/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating orbs with parallax */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
        style={{ y: y1, opacity }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
        style={{ y: y2, opacity }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="container relative z-10 mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center pointer-events-none">

        {/* Left Column: Text Content */}
        <motion.div
          className="text-left pointer-events-auto"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          {/* Animated badge */}
          {/* <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={16} className="text-purple-400" />
            </motion.div>
            <span className="text-sm text-zinc-300">Available for freelance</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
          </motion.div> */}

          {/* Title with enhanced gradient animation */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="text-6xl font-bold tracking-tighter sm:text-8xl mb-4"
          >
            <TextScramble
              text="Full Stack"
              className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200"
            />
            <br />
            <GlitchText
              text="Developer"
              className="text-white/60 inline-flex items-center gap-4"
            />
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block ml-4"
            >
              <Code className="text-purple-400" size={40} />
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.7 }}
            className="mt-6 text-xl text-zinc-400 max-w-lg leading-relaxed"
          >
            I build <span className="text-purple-400 font-semibold">end-to-end digital solutions</span> that seamlessly connect user experience and engineering.
            Specializing in <span className="text-pink-400 font-semibold">full-stack development</span>, scalable system design, and
            robust, high-performance architectures.

          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.9 }}
            className="mt-8 flex gap-4"
          >
            <MagneticButton
              href="#projects"
              className="group px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium relative overflow-hidden shadow-lg shadow-purple-500/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Work
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="group px-8 py-4 rounded-full border-2 border-purple-500/50 text-white font-medium hover:bg-purple-500/10 transition-all backdrop-blur-sm relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Contact Me
                <Zap size={16} className="text-purple-400" />
              </span>
            </MagneticButton>
          </motion.div>

          {/* Scroll indicator with enhanced animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
            className="mt-16 flex items-center gap-3 text-zinc-500 text-sm"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-purple-500/30 flex items-start justify-center p-2"
            >
              <motion.div
                className="w-1.5 h-3 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <span>Scroll to explore</span>
          </motion.div>
        </motion.div>

        {/* Right Column: Placeholder for 3D alignment */}
        <div className="hidden md:block"></div>

      </div>
    </section>
  );
}
