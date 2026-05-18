'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  LayoutDashboard, 
  Layers, 
  Terminal, 
  Cpu, 
  Users, 
  Settings, 
  ChevronDown, 
  Plus, 
  Zap,
  Activity,
  Box,
  Box as Github
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: Box },
  { name: 'Deployments', href: '/deployments', icon: Zap },
  { name: 'Infrastructure', href: '/infrastructure', icon: Cpu },
  { name: 'Logs & Events', href: '/logs', icon: Terminal },
  { name: 'Monitoring', href: '/monitoring', icon: Activity },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const navContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const navItemVariants: Variants = {
  hidden: { x: -10, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', damping: 25, stiffness: 200 }
  }
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 25, stiffness: 150 }}
      className="w-[240px] h-screen bg-surface-primary border-r border-border-subtle flex flex-col shrink-0 relative z-50"
    >
      {/* Workspace Switcher */}
      <div className="p-4">
        <motion.button 
          whileHover={{ scale: 1.01, borderColor: 'var(--color-border-muted)' }}
          whileTap={{ scale: 0.99 }}
          className="w-full flex items-center justify-between p-2 rounded-md bg-surface-secondary border border-border-muted hover:border-text-muted transition-colors group"
        >
          <div className="flex items-center space-x-2 overflow-hidden">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-6 h-6 rounded bg-accent-blue flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-lg shadow-accent-blue/20"
            >
              S
            </motion.div>
            <span className="text-sm font-medium text-text-primary truncate">Solar Workspace</span>
          </div>
          <ChevronDown size={14} className="text-text-muted group-hover:text-text-secondary" />
        </motion.button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 custom-scrollbar">
        <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider px-3 mb-2 mt-4 opacity-50">
          Platform
        </div>
        <motion.div
          variants={navContainerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-0.5"
        >
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <motion.div key={item.name} variants={navItemVariants}>
                <Link
                  href={item.href}
                  className={`relative flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-all group ${
                    isActive 
                      ? 'text-accent-blue' 
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-accent-blue/5 border-l-2 border-accent-blue rounded-r-md z-0"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 bg-surface-secondary opacity-0 group-hover:opacity-100 rounded-md z-0"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <item.icon size={18} className={`relative z-10 transition-colors ${isActive ? 'text-accent-blue' : 'text-text-muted group-hover:text-text-secondary'}`} />
                  <span className="relative z-10">{item.name}</span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider px-3 mb-2 mt-8 opacity-50">
          Connected Ecosystems
        </div>
        <div className="px-3 space-y-4 py-2">
          {[
            { name: 'GitHub', icon: Github, color: 'text-white' },
            { name: 'Vercel', icon: Layers, color: 'text-white' }
          ].map((eco) => (
            <motion.div 
              key={eco.name}
              whileHover={{ x: 4 }} 
              className="flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <eco.icon size={16} className="text-text-muted group-hover:text-text-primary transition-colors" />
                <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors">{eco.name}</span>
              </div>
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.4)]"
              />
            </motion.div>
          ))}
        </div>
      </nav>

      {/* Bottom Footer */}
      <div className="p-4 border-t border-border-subtle bg-surface-primary/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <motion.div 
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [1, 0.4, 1],
                boxShadow: [
                  "0 0 0px rgba(34,197,94,0)",
                  "0 0 8px rgba(34,197,94,0.6)",
                  "0 0 0px rgba(34,197,94,0)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-success"
            ></motion.div>
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-tighter">System Nominal</span>
          </div>
          <span className="text-[10px] font-mono text-text-muted opacity-50">v0.4.2</span>
        </div>
        <motion.button 
          whileHover={{ 
            scale: 1.02,
            boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.2)'
          }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center space-x-2 p-2 rounded bg-accent-blue text-white border border-accent-blue/20 hover:bg-accent-blue/90 transition-all text-xs font-bold shadow-lg shadow-accent-blue/10"
        >
          <Plus size={14} />
          <span>New Deployment</span>
        </motion.button>
      </div>
    </motion.aside>
  );
}
