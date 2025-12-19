'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Omway Technologies Pvt. Ltd.",
    location: "Buddhanagar,Kathmandu",
    period: "2024 - Present",
    description: "Leading the frontend team in building scalable web applications using Next.js and Micro-frontends architecture. Improved site performance by 40%."
  },
  {
    title: "Full Stack Developer",
    company: "Softsaro Pvt. Ltd.",
    location: "Maitighar,Kathmandu",
    period: "2022 - 2024",
    description: "Developed and maintained multiple client projects. Integrated 3D elements using Three.js and optimized backend APIs with Node.js."
  },
  // {
  //   title: "Junior Web Developer",
  //   company: "Digital Agency",
  //   location: "Remote",
  //   period: "2020 - 2021",
  //   description: "Collaborated with designers to implement responsive UI/UX. Gained expertise in React ecosystem and modern CSS frameworks."
  // }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-8 max-w-5xl" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Work Experience
          </h2>
          <p className="text-xl text-zinc-400">
            My professional journey and career milestones.
          </p>
        </motion.div>

        <div className="relative">
          {/* Central Line */}
          <motion.div 
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 origin-top"
            style={{ scaleY }}
          />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-white rounded-full -translate-x-1.5 mt-1.5 shadow-[0_0_20px_rgba(168,85,247,0.5)] z-10">
                  <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-75" />
                </div>

                {/* Content Card */}
                <div className={`flex-1 ml-8 md:ml-0 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <div className={`bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:border-purple-500/30 transition-colors group ${
                    index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                  }`}>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {exp.title}
                    </h3>
                    <div className={`flex flex-wrap gap-4 text-sm text-zinc-400 mb-4 ${
                      index % 2 === 0 ? 'justify-start' : 'md:justify-end justify-start'
                    }`}>
                      <div className="flex items-center gap-1">
                        <Briefcase size={14} />
                        <span>{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    <p className="text-zinc-300 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
                
                {/* Empty spacer for the other side */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
