'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import MicroLoading from '@/components/layout/MicroLoading';
import { 
  Box, 
  Box as Github,
  Plus, 
  Layers, 
  Search, 
  MoreHorizontal, 
  ExternalLink, 
  GitBranch, 
  Clock,
  Zap,
  Globe,
  ChevronDown
} from 'lucide-react';

const projects = [
  { id: '1', name: 'solar-core-api', repo: 'solar-os/core', provider: 'Vercel', branch: 'main', status: 'active', updated: '2m ago' },
  { id: '2', name: 'solar-dashboard-web', repo: 'solar-os/dashboard', provider: 'Railway', branch: 'feat/ui', status: 'active', updated: '1h ago' },
  { id: '3', name: 'solar-docs', repo: 'solar-os/docs', provider: 'Netlify', branch: 'main', status: 'active', updated: '5h ago' },
  { id: '4', name: 'solar-auth-proxy', repo: 'solar-os/auth', provider: 'AWS', branch: 'staging', status: 'building', updated: '12s ago' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', damping: 25, stiffness: 200 }
  }
};

export default function ProjectsPage() {
  return (
    <MainLayout>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-8 space-y-8"
      >
        <motion.header variants={cardVariants} className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">Projects</h1>
            <p className="text-sm text-text-muted mt-1">Manage and synchronize all your repositories and ecosystems.</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 bg-accent-blue hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-bold transition-all shadow-lg shadow-accent-blue/20"
          >
            <Plus size={18} />
            <span>Create New Project</span>
          </motion.button>
        </motion.header>

        {/* Filter Bar */}
        <motion.div variants={cardVariants} className="flex items-center justify-between bg-surface-secondary border border-border-subtle rounded-lg p-3">
           <div className="flex items-center space-x-4 flex-1">
              <div className="relative group w-64">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-blue transition-colors" size={14} />
                 <input 
                   type="text" 
                   placeholder="Search projects..." 
                   className="w-full bg-surface-primary border border-border-muted rounded-md pl-10 pr-4 py-1.5 text-xs text-text-primary focus:outline-none focus:border-accent-blue transition-all"
                 />
              </div>
              <div className="h-4 w-px bg-border-muted"></div>
              <div className="flex items-center space-x-2">
                 <span className="text-[10px] font-bold text-text-muted uppercase">Provider:</span>
                 <select className="bg-surface-primary border border-border-muted rounded px-2 py-1 text-[10px] font-bold text-text-primary focus:outline-none cursor-pointer">
                    <option>All Providers</option>
                    <option>Vercel</option>
                    <option>AWS</option>
                 </select>
              </div>
           </div>
           <div className="flex items-center space-x-2 text-[10px] font-bold text-text-muted">
              <span>Sort by:</span>
              <button className="text-text-primary flex items-center space-x-1 hover:text-accent-blue transition-colors">
                 <span>Recently Updated</span>
                 <ChevronDown size={10} />
              </button>
           </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
           {projects.map((project) => (
             <motion.div 
               key={project.id} 
               variants={cardVariants}
               whileHover={{ 
                 y: -4, 
                 borderColor: 'var(--color-border-muted)',
                 boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
               }}
               className="bg-surface-secondary border border-border-subtle rounded-xl p-6 transition-all group relative overflow-hidden cursor-pointer"
             >
                {/* Status Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 transition-all ${
                  project.status === 'building' 
                    ? 'bg-accent-blue animate-pulse shadow-[0_0_10px_var(--color-accent-blue)]' 
                    : 'bg-success opacity-20 group-hover:opacity-100'
                }`}></div>
                
                <div className="flex justify-between items-start mb-6">
                   <motion.div 
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="w-10 h-10 rounded-lg bg-surface-tertiary border border-border-muted flex items-center justify-center text-text-primary shadow-lg"
                   >
                      {project.provider === 'Vercel' ? <Layers size={20} /> : <Box size={20} />}
                   </motion.div>
                   <div className="flex items-center space-x-2">
                      <button className="p-1.5 rounded hover:bg-surface-tertiary text-text-muted hover:text-text-primary transition-colors opacity-0 group-hover:opacity-100"><ExternalLink size={16} /></button>
                      <button className="p-1.5 rounded hover:bg-surface-tertiary text-text-muted hover:text-text-primary transition-colors"><MoreHorizontal size={16} /></button>
                   </div>
                </div>

                <div className="space-y-4">
                   <div>
                      <h3 className="text-lg font-bold text-text-primary group-hover:text-accent-blue transition-colors">
                        <Link href={`/editor/${project.id}`}>{project.name}</Link>
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                         <Github size={12} className="text-text-muted" />
                         <span className="text-xs text-text-muted font-mono opacity-60">{project.repo}</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4 py-4 border-y border-border-subtle/50">
                      <div className="space-y-1">
                         <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-60">Primary Branch</div>
                         <div className="flex items-center space-x-1.5 text-xs text-text-secondary">
                            <GitBranch size={12} className="text-accent-violet" />
                            <span>{project.branch}</span>
                         </div>
                      </div>
                      <div className="space-y-1">
                         <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-60">Active Hosting</div>
                         <div className="flex items-center space-x-1.5 text-xs text-text-secondary">
                            <Globe size={12} className="text-accent-blue" />
                            <span>{project.provider}</span>
                         </div>
                      </div>
                   </div>

                   <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2 text-[10px] text-text-muted">
                         <Clock size={12} />
                         <span>Updated {project.updated}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                         {project.status === 'building' ? (
                           <MicroLoading size="sm" text="building" />
                         ) : (
                           <div className="flex items-center space-x-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">{project.status}</span>
                           </div>
                         )}
                      </div>
                   </div>
                </div>
             </motion.div>
           ))}

           {/* Create Project Card */}
           <motion.div 
             variants={cardVariants}
             whileHover={{ 
               scale: 1.01,
               borderColor: 'var(--color-accent-blue)',
               backgroundColor: 'var(--color-surface-secondary)'
             }}
             className="border-2 border-dashed border-border-muted rounded-xl p-6 flex flex-col items-center justify-center space-y-4 opacity-50 hover:opacity-100 transition-all cursor-pointer group bg-surface-primary/20"
           >
              <motion.div 
                whileHover={{ rotate: 90 }}
                className="w-12 h-12 rounded-full border border-dashed border-border-muted flex items-center justify-center group-hover:text-accent-blue group-hover:border-accent-blue transition-colors"
              >
                 <Plus size={24} />
              </motion.div>
              <div className="text-center">
                 <div className="text-sm font-bold text-text-primary">Connect Repository</div>
                 <p className="text-[11px] text-text-muted mt-1">Import from GitHub, GitLab, or Bitbucket</p>
              </div>
           </motion.div>
        </div>
      </motion.div>
    </MainLayout>
  );
}
