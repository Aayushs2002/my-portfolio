'use client';

import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { X, ExternalLink, Github, MonitorPlay } from 'lucide-react';
import { stopLenis, startLenis } from './SmoothScroll';
import HolographicCard from './HolographicCard';

const projects = [
  {
    title: 'Project Alpha',
    category: 'Dashboard',
    description: 'A futuristic dashboard with real-time data visualization. Built for high-performance monitoring.',
    longDescription: 'Project Alpha is a comprehensive dashboard solution designed for monitoring complex systems in real-time. It features advanced data visualization techniques, customizable widgets, and a responsive design that works seamlessly across devices.',
    tags: ['Next.js', 'Three.js', 'Tailwind', 'WebSocket'],
    color: 'from-blue-500 to-cyan-500',
    demoUrl: 'https://threejs.org/examples/webgl_geometry_cube.html', // Placeholder
  },
  {
    title: 'Project Beta',
    category: 'E-commerce',
    description: 'E-commerce platform with 3D product configurator. Revolutionizing the shopping experience.',
    longDescription: 'Project Beta integrates a powerful 3D product configurator directly into the e-commerce flow, allowing users to customize products in real-time before purchasing. It includes a robust backend for inventory management and secure payment processing.',
    tags: ['React', 'R3F', 'Stripe', 'Zustand'],
    color: 'from-purple-500 to-pink-500',
    demoUrl: 'https://threejs.org/examples/webgl_materials_car.html', // Placeholder
  },
  {
    title: 'Project Gamma',
    category: 'Experience',
    description: 'Immersive storytelling experience using WebGL. A journey through digital space.',
    longDescription: 'Project Gamma is an award-winning immersive web experience that takes users on a narrative journey through a digital universe. Utilizing advanced WebGL techniques, it delivers stunning visuals and interactive elements that engage users on a deep level.',
    tags: ['WebGL', 'GLSL', 'GSAP', 'React'],
    color: 'from-amber-500 to-orange-500',
    demoUrl: 'https://threejs.org/examples/webgl_water.html', // Placeholder
  },
  {
    title: 'Project Delta',
    category: 'SaaS',
    description: 'AI-powered productivity tool for teams. Automate your workflow.',
    longDescription: 'Project Delta leverages the power of artificial intelligence to help teams streamline their workflows. From automated scheduling to intelligent document processing, it reduces manual overhead and boosts overall productivity.',
    tags: ['Next.js', 'OpenAI', 'PostgreSQL', 'Prisma'],
    color: 'from-emerald-500 to-teal-500',
    demoUrl: 'https://threejs.org/examples/webgl_points_waves.html', // Placeholder
  },
];

function ProjectCard({ project, index, onClick }: { project: typeof projects[0], index: number, onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-[60vh] w-[40vw] min-w-[400px] rounded-3xl cursor-pointer bg-zinc-900/50 backdrop-blur-sm border border-white/10"
    >
      <div 
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-0 rounded-3xl overflow-hidden"
      >
        {/* Card Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
        
        <div className="absolute inset-0 p-8 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="px-4 py-1 rounded-full border border-white/10 text-xs font-medium text-zinc-300 uppercase tracking-wider bg-black/20 backdrop-blur-md">
              {project.category}
            </span>
            <div className="p-2 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink size={20} />
            </div>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-white mb-4">
              {project.title}
            </h3>
            <p className="text-zinc-400 text-lg line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {project.description}
            </p>
            <div className="flex gap-2 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs text-zinc-500">#{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ onOpen, onClose }: { onOpen?: () => void, onClose?: () => void }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);

  const handleProjectClick = (project: typeof projects[0]) => {
    // Save current scroll position
    const scrollY = window.scrollY;
    setSavedScrollPosition(scrollY);
    
    setSelectedProject(project);
    onOpen?.();
    // Stop Lenis smooth scroll
    stopLenis();
    // Lock background scroll - multiple approaches for maximum compatibility
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    // Prevent touch scrolling on mobile
    document.body.style.touchAction = 'none';
  };

  const handleClose = () => {
    setSelectedProject(null);
    onClose?.();
    // Restore Lenis smooth scroll
    startLenis();
    // Restore background scroll
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.documentElement.style.height = '';
    document.body.style.height = '';
    document.body.style.touchAction = '';
    
    // Restore scroll position after a brief delay to ensure styles are applied
    setTimeout(() => {
      window.scrollTo(0, savedScrollPosition);
    }, 0);
  };

  return (
    <section ref={targetRef} id="projects" className="relative h-[300vh] bg-zinc-950 perspective-1000">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-16 px-24 items-center perspective-1000">
          <div className="flex flex-col justify-center min-w-[400px]">
            <h2 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500 mb-6">
              Selected <br /> Works
            </h2>
            <p className="text-xl text-zinc-400 max-w-xs">
              A collection of projects that push the boundaries of web technology.
            </p>
          </div>

          {projects.map((project, index) => (
            <motion.div key={index} layoutId={`card-${index}`}>
              <ProjectCard project={project} index={index} onClick={() => handleProjectClick(project)} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {selectedProject && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-[59] bg-black/50"
              onClick={handleClose}
            />

            {/* Modal with zoom animation */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 200,
                mass: 1
              }}
              className="fixed inset-0 z-[60] bg-zinc-950 overflow-y-auto overscroll-contain"
              style={{ 
                WebkitOverflowScrolling: 'touch',
              }}
              onWheel={(e) => {
                // Stop propagation to prevent any parent scroll
                e.stopPropagation();
              }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="min-h-screen p-8 md:p-20"
              >
              <button 
                onClick={handleClose}
                className="fixed top-8 right-8 p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-50 backdrop-blur-md border border-white/10"
              >
                <X size={24} color="white" />
              </button>

              <div className="max-w-6xl mx-auto mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                    <span className={`text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r ${selectedProject.color} mb-4 block`}>
                      {selectedProject.category}
                    </span>
                    <h2 className="text-6xl md:text-8xl font-bold mb-8 text-white">{selectedProject.title}</h2>
                    
                    <div className={`w-full h-[400px] rounded-3xl bg-gradient-to-br ${selectedProject.color} opacity-20 mb-12 relative overflow-hidden group`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button 
                            onClick={() => window.open(selectedProject.demoUrl, '_blank')}
                            className="px-8 py-4 rounded-full bg-white text-black font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                          >
                            <MonitorPlay size={20} />
                            Launch Preview
                          </button>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                      <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold mb-6 text-white">Overview</h3>
                        <p className="text-xl text-zinc-400 leading-relaxed mb-8">
                          {selectedProject.longDescription}
                        </p>
                        
                        <h3 className="text-2xl font-bold mb-6 text-white">Technologies</h3>
                        <div className="flex flex-wrap gap-3">
                          {selectedProject.tags.map(tag => (
                            <span key={tag} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <button 
                          className="flex items-center justify-between w-full p-4 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors"
                        >
                          <span>Live Demo</span>
                          <ExternalLink size={20} />
                        </button>
                        <a href="#" className="flex items-center justify-between w-full p-4 rounded-xl border border-white/20 hover:bg-white/5 transition-colors text-white">
                          <span>Source Code</span>
                          <Github size={20} />
                        </a>
                      </div>
                    </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
