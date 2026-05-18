'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Terminal, 
  Zap, 
  Box, 
  Settings, 
  LayoutDashboard, 
  Cpu, 
  Activity,
  ArrowRight,
  Command as CommandIcon
} from 'lucide-react';

const commands = [
  { id: 'dashboard', name: 'Go to Dashboard', icon: LayoutDashboard, shortcut: 'G D', category: 'Navigation' },
  { id: 'projects', name: 'View Projects', icon: Box, shortcut: 'G P', category: 'Navigation' },
  { id: 'deployments', name: 'Recent Deployments', icon: Zap, shortcut: 'G R', category: 'Navigation' },
  { id: 'infra', name: 'Infrastructure Topology', icon: Cpu, shortcut: 'G I', category: 'Infrastructure' },
  { id: 'logs', name: 'Open Live Logs', icon: Terminal, shortcut: 'G L', category: 'Monitoring' },
  { id: 'settings', name: 'System Settings', icon: Settings, shortcut: 'G S', category: 'General' },
  { id: 'deploy-new', name: 'Create New Deployment', icon: Zap, shortcut: 'N D', category: 'Actions', highlight: true },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      // Handle command execution here
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[100]"
          />

          {/* Palette */}
          <div className="fixed inset-0 flex items-start justify-center pt-[15vh] z-[101] pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl bg-surface-secondary border border-border-muted rounded-xl shadow-2xl overflow-hidden pointer-events-auto"
              onKeyDown={handleKeyDown}
            >
              <div className="flex items-center px-4 py-4 border-b border-border-subtle bg-surface-tertiary/50">
                <Search size={20} className="text-text-muted mr-3" />
                <input
                  autoFocus
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-text-muted text-base"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div className="flex items-center space-x-1 ml-4 px-1.5 py-1 rounded bg-surface-primary border border-border-muted text-[10px] font-bold text-text-muted">
                  <CommandIcon size={10} />
                  <span>K</span>
                </div>
              </div>

              <div className="max-h-[400px] overflow-y-auto p-2 custom-scrollbar">
                {filteredCommands.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-text-muted text-sm italic">No commands found for "{query}"</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredCommands.map((cmd, index) => {
                      const isSelected = index === selectedIndex;
                      return (
                        <motion.div
                          key={cmd.id}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`relative flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer transition-all ${
                            isSelected ? 'bg-accent-blue/10' : 'hover:bg-surface-tertiary'
                          }`}
                        >
                          {isSelected && (
                            <motion.div
                              layoutId="command-highlight"
                              className="absolute inset-0 border border-accent-blue/30 rounded-lg pointer-events-none"
                              initial={false}
                              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                          
                          <div className="flex items-center space-x-4 relative z-10">
                            <div className={`p-2 rounded-md ${
                              cmd.highlight ? 'bg-accent-blue/20 text-accent-blue' : 'bg-surface-primary text-text-muted'
                            } ${isSelected && !cmd.highlight ? 'text-text-primary' : ''}`}>
                              <cmd.icon size={18} />
                            </div>
                            <div>
                              <p className={`text-sm font-medium ${isSelected ? 'text-text-primary' : 'text-text-secondary'}`}>
                                {cmd.name}
                              </p>
                              <p className="text-[10px] text-text-muted uppercase tracking-widest mt-0.5">
                                {cmd.category}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 relative z-10">
                            {isSelected && (
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center space-x-1 text-accent-blue text-[10px] font-bold"
                              >
                                <span>Execute</span>
                                <ArrowRight size={12} />
                              </motion.div>
                            )}
                            <div className="flex items-center space-x-1 font-mono text-[10px] text-text-muted bg-surface-primary px-1.5 py-0.5 rounded border border-border-muted">
                              {cmd.shortcut.split(' ').map((s, i) => (
                                <span key={i}>{s}</span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="px-4 py-2 bg-surface-tertiary/50 border-t border-border-subtle flex items-center justify-between text-[10px] text-text-muted font-bold uppercase tracking-tighter">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <span className="px-1 py-0.5 rounded bg-surface-primary border border-border-muted">↑↓</span>
                    <span>Navigate</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="px-1 py-0.5 rounded bg-surface-primary border border-border-muted">Enter</span>
                    <span>Select</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="px-1 py-0.5 rounded bg-surface-primary border border-border-muted">Esc</span>
                    <span>Close</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-accent-blue">
                  <Activity size={10} />
                  <span>Solar OS v0.4.2</span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
