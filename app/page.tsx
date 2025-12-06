'use client';

import { useState } from 'react';
import Image from "next/image";
import Hero from '@/components/dom/Hero';
import About from '@/components/dom/About';
import Skills from '@/components/dom/Skills';
import Experience from '@/components/dom/Experience';
import Projects from '@/components/dom/Projects';
import Contact from '@/components/dom/Contact';
import Marquee from '@/components/dom/Marquee';
import ScrollProgress from '@/components/dom/ScrollProgress';
import DockFooter from '@/components/dom/DockFooter';
import Testimonials from '@/components/dom/Testimonials';
import SmoothScroll from '@/components/dom/SmoothScroll';

export default function Home() {
  const [isProjectOpen, setIsProjectOpen] = useState(false);

  return (
    <main className="relative w-full">
      <SmoothScroll />
      <ScrollProgress />
      
      {/* Main Content */}
      <div className="relative z-10 bg-zinc-950 pb-32">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects onOpen={() => setIsProjectOpen(true)} onClose={() => setIsProjectOpen(false)} />
        <Testimonials />
        <Contact />
      </div>

      <DockFooter visible={!isProjectOpen} />
    </main>
  );
}
