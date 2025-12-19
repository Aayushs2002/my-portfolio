'use client';

import { motion } from 'framer-motion';
import { 
  Code2, Globe, Palette, Database, Server, 
  Layout, Terminal, GitBranch, Box, Layers, Zap, 
} from 'lucide-react';

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: Code2, color: "#61DAFB" },
      { name: "Next.js", icon: Globe, color: "#000000" },
      { name: "Three.js", icon: Box, color: "#000000" },
      { name: "Tailwind", icon: Palette, color: "#38B2AC" },
      { name: "Framer Motion", icon: Zap, color: "#FF0055" },
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: Server, color: "#339933" },
      { name: "PostgreSQL", icon: Database, color: "#336791" },
      { name: "Prisma", icon: Layers, color: "#2D3748" },
      { name: "GraphQL", icon: Layout, color: "#E10098" },
      { name: "Express.js", icon: Terminal, color: "#FCC624" },
      { name: "Laravel", icon:  Server, color: "#E10098" },
    ]
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "TypeScript", icon: Code2, color: "#3178C6" },
      { name: "Git", icon: GitBranch, color: "#F05032" },
      { name: "Docker", icon: Box, color: "#2496ED" },
      { name: "Linux", icon: Terminal, color: "#FCC624" },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Technical Arsenal
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            A curated collection of tools and technologies I use to build the future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl -z-10 blur-sm" />
              <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full hover:border-white/20 transition-colors">
                <h3 className="text-2xl font-bold mb-8 text-center text-zinc-200">{category.title}</h3>
                
                <div className="flex flex-wrap justify-center gap-6">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      animate={{ 
                        y: [0, -10, 0],
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2 + categoryIndex * 0.5
                      }}
                      className="group/skill relative"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/skill:bg-white/10 transition-colors cursor-pointer relative z-10">
                        <skill.icon size={32} className="text-zinc-400 group-hover/skill:text-white transition-colors" />
                      </div>
                      
                      {/* Glow Effect */}
                      <div 
                        className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover/skill:opacity-50 transition-opacity duration-500 -z-10"
                        style={{ backgroundColor: skill.color }}
                      />
                      
                      {/* Tooltip */}
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/skill:opacity-100 transition-opacity text-sm text-zinc-400 whitespace-nowrap">
                        {skill.name}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
