'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Search, 
  Download, 
  Trash2, 
  Play, 
  Pause, 
  Settings,
  Filter,
  ArrowDownCircle,
  Zap,
  Bot
} from 'lucide-react';

const mockLogs = [
  { id: 1, time: '14:40:01', level: 'INFO', source: 'K8S-CLUSTER', msg: 'Pulling image "solar-os/api:latest" from AWS ECR...' },
  { id: 2, time: '14:40:05', level: 'INFO', source: 'K8S-CLUSTER', msg: 'Successfully pulled image. Initializing container...' },
  { id: 3, time: '14:40:08', level: 'DEBUG', source: 'CORE-API', msg: 'Connected to Redis at cache.solar.internal:6379' },
  { id: 4, time: '14:40:12', level: 'INFO', source: 'CORE-API', msg: 'HTTP Server listening on port 3001' },
  { id: 5, time: '14:42:15', level: 'WARN', source: 'WAF', msg: 'Detected 42 requests from unknown IP range 192.168.0.x' },
  { id: 6, time: '14:45:02', level: 'ERROR', source: 'DB-SYNC', msg: 'Failed to replicate binlog to secondary slave: connection timeout' },
  { id: 7, time: '14:45:03', level: 'AI-INSIGHT', source: 'SOLAR-AI', msg: 'Replication failure detected. AI suggests checking VPC peering latency between regions.' },
];

export default function LogsPage() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <MainLayout>
      <div className="flex h-full flex-col bg-surface-primary overflow-hidden">
        {/* Logs Header */}
        <header className="h-14 border-b border-border-subtle bg-surface-secondary flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center space-x-4">
             <div className="flex items-center space-x-2">
                <Terminal size={18} className="text-accent-blue" />
                <h1 className="text-sm font-bold uppercase tracking-wider text-text-primary">Unified Live Stream</h1>
             </div>
             <div className="h-4 w-px bg-border-muted"></div>
             <div className="flex items-center space-x-2 text-[10px] font-bold text-text-muted">
                <motion.div 
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-2 h-2 rounded-full bg-success"
                ></motion.div>
                <span>748.2 KB/s INGEST</span>
             </div>
          </div>

          <div className="flex items-center space-x-3">
             <div className="relative group">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-blue transition-colors" size={14} />
                <input 
                  type="text" 
                  placeholder="Filter logs (grep...)" 
                  className="bg-surface-primary border border-border-muted rounded px-8 py-1.5 text-xs text-text-primary focus:outline-none focus:border-accent-blue w-64 placeholder:text-text-muted transition-all"
                />
             </div>
             <div className="flex bg-surface-primary border border-border-muted rounded p-0.5">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsPaused(!isPaused)}
                  className={`p-1 rounded transition-all ${isPaused ? 'text-accent-blue bg-accent-blue/10' : 'text-text-muted hover:text-text-primary'}`}
                >
                  {isPaused ? <Play size={14} /> : <Pause size={14} />}
                </motion.button>
                <button className="p-1 rounded text-text-muted hover:text-text-primary transition-all"><Download size={14} /></button>
                <button className="p-1 rounded text-text-muted hover:text-text-primary transition-all"><Trash2 size={14} /></button>
             </div>
             <button className="flex items-center space-x-2 px-3 py-1.5 rounded bg-surface-primary border border-border-muted text-xs font-bold text-text-muted hover:text-text-primary transition-all">
                <Filter size={14} />
                <span>Sources</span>
             </button>
          </div>
        </header>

        {/* Logs Terminal Area */}
        <main className="flex-1 overflow-y-auto bg-black/40 p-4 font-mono text-[12px] leading-relaxed selection:bg-accent-blue/40 custom-scrollbar">
           <div className="space-y-1.5">
              <AnimatePresence initial={false} mode="popLayout">
                {mockLogs.map((log, i) => (
                  <motion.div 
                    key={log.id} 
                    initial={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ 
                      type: 'spring', 
                      damping: 20, 
                      stiffness: 150,
                      delay: i * 0.05 
                    }}
                    className={`group flex items-start space-x-4 px-3 py-1 rounded-md transition-all duration-200 border border-transparent ${
                      log.level === 'ERROR' 
                        ? 'bg-error/5 border-error/20' 
                        : log.level === 'AI-INSIGHT' 
                          ? 'bg-accent-blue/10 border-accent-blue/20 my-4 py-4 shadow-lg shadow-accent-blue/5' 
                          : 'hover:bg-white/[0.03] hover:border-white/5'
                    }`}
                  >
                     <span className="text-text-muted shrink-0 w-20 select-none opacity-50">[{log.time}]</span>
                     <div className="flex flex-col flex-1">
                        <div className="flex items-center space-x-4">
                           <span className={`shrink-0 w-24 font-bold flex items-center space-x-1.5 ${
                             log.level === 'ERROR' ? 'text-error' : 
                             log.level === 'WARN' ? 'text-warning' : 
                             log.level === 'AI-INSIGHT' ? 'text-accent-blue' : 
                             'text-accent-violet opacity-80'
                           }`}>
                              {log.level === 'AI-INSIGHT' && <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}><Bot size={14} /></motion.div>}
                              <span className="tracking-tighter">{log.level}</span>
                           </span>
                           <span className="text-text-muted shrink-0 px-2 py-0.5 rounded bg-surface-tertiary/50 border border-border-muted/30 text-[10px] font-bold">
                              {log.source}
                           </span>
                           <span className={`flex-1 transition-colors ${log.level === 'AI-INSIGHT' ? 'text-text-primary font-medium' : 'text-text-secondary group-hover:text-text-primary'}`}>
                              {log.msg}
                           </span>
                        </div>
                        {log.level === 'AI-INSIGHT' && (
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-3 pl-6 border-l border-accent-blue/30 space-y-2"
                          >
                            <div className="text-[10px] text-accent-blue font-bold uppercase tracking-widest">Suggested Action</div>
                            <div className="flex items-center space-x-3">
                               <button className="px-3 py-1 rounded bg-accent-blue text-white text-[10px] font-bold hover:bg-accent-blue/90 transition-all">Check VPC Peering</button>
                               <button className="px-3 py-1 rounded bg-surface-primary border border-border-muted text-[10px] font-bold text-text-secondary hover:text-text-primary transition-all">Ignore</button>
                            </div>
                          </motion.div>
                        )}
                     </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {!isPaused && (
                <div className="flex items-center space-x-3 px-3 py-6">
                   <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div 
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                          className="w-1 h-1 rounded-full bg-accent-blue"
                        />
                      ))}
                   </div>
                   <span className="text-accent-blue/60 text-[11px] font-bold uppercase tracking-widest italic">Syncing live events...</span>
                </div>
              )}
           </div>
           
           {/* Auto-scroll anchor */}
           <div className="h-4"></div>
        </main>

        {/* Logs Footer / Status Bar */}
        <footer className="h-8 border-t border-border-subtle bg-surface-secondary flex items-center justify-between px-6 shrink-0">
           <div className="flex items-center space-x-6 text-[10px] font-bold text-text-muted uppercase tracking-tighter">
              <div className="flex items-center space-x-2">
                 <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="w-1.5 h-1.5 rounded-full bg-success"></motion.div>
                 <span>AWS-US-EAST-1</span>
              </div>
              <div className="flex items-center space-x-2">
                 <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3, delay: 1 }} className="w-1.5 h-1.5 rounded-full bg-success"></motion.div>
                 <span>VERCEL-EDGE</span>
              </div>
              <div className="flex items-center space-x-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-warning"></div>
                 <span>RDS-PRIMARY-LAG: 12ms</span>
              </div>
           </div>
           <motion.button 
            whileHover={{ y: 2 }}
            className="flex items-center space-x-1 text-[10px] font-bold text-accent-blue uppercase tracking-widest hover:text-blue-400 transition-colors"
           >
              <ArrowDownCircle size={12} />
              <span>Scroll to bottom</span>
           </motion.button>
        </footer>
      </div>
    </MainLayout>
  );
}
