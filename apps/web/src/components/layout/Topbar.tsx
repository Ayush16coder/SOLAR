'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Command, Globe, User, ChevronDown, Activity } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="h-14 border-b border-border-subtle bg-surface-primary flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <motion.div 
          whileTap={{ scale: 0.995 }}
          className="relative group"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-text-secondary transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search projects, logs, infrastructure..." 
            className="w-full h-9 bg-surface-secondary border border-border-muted rounded-md pl-10 pr-12 text-sm text-text-primary focus:outline-none focus:border-text-muted focus:ring-1 focus:ring-border-muted transition-all placeholder:text-text-muted"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1 px-1.5 py-0.5 rounded border border-border-muted bg-surface-tertiary text-[10px] font-bold text-text-muted">
            <Command size={10} />
            <span>K</span>
          </div>
        </motion.div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-6">
        {/* Live Sync Status */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center space-x-2 px-3 py-1 rounded-full bg-success/5 border border-success/20 hidden md:flex shadow-[0_0_15px_rgba(34,197,94,0.05)]"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [1, 0.6, 1],
              filter: ["blur(0px)", "blur(1px)", "blur(0px)"]
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.6)]"
          />
          <span className="text-[10px] font-bold text-success uppercase tracking-widest">Live Sync Active</span>
        </motion.div>

        <div className="flex items-center space-x-2">
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: 'var(--color-surface-secondary)' }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg text-text-muted hover:text-text-primary transition-all relative"
          >
            <Bell size={18} />
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface-primary"
            ></motion.span>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: 'var(--color-surface-secondary)' }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg text-text-muted hover:text-text-primary transition-all"
          >
            <Globe size={18} />
          </motion.button>
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-3 pl-6 border-l border-border-subtle">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-xs font-medium text-text-primary">Alex Rivera</span>
            <span className="text-[10px] text-text-muted">Engineering Lead</span>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 group"
          >
            <div className="w-8 h-8 rounded-full bg-surface-tertiary border border-border-muted overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center text-xs font-bold text-white">
                AR
              </div>
            </div>
            <ChevronDown size={14} className="text-text-muted group-hover:text-text-secondary transition-colors" />
          </motion.button>
        </div>
      </div>
    </header>
  );
}
