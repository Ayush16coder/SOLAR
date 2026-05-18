'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { motion, Variants } from 'framer-motion';
import { 
  GitBranch, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  Zap, 
  Activity, 
  Terminal as TerminalIcon,
  Box as Github,
  Server,
  Cloud,
  ChevronRight
} from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', damping: 25, stiffness: 200 }
  }
};

export default function DashboardPage() {
  return (
    <MainLayout>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-8 space-y-8"
      >
        {/* Hero: Deployment Pulse */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center space-x-3">
              <span>System Pulse</span>
              <motion.div 
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1.5 h-1.5 rounded-full bg-accent-blue shadow-[0_0_8px_var(--color-accent-blue)]"
              />
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 text-xs font-mono text-text-muted bg-surface-secondary border border-border-subtle px-3 py-1.5 rounded-full">
                <div className="flex items-center space-x-2">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.8, 1],
                      opacity: [1, 0, 1]
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-1.5 h-1.5 rounded-full bg-success"
                  ></motion.div>
                  <span>Sync Latency: 42ms</span>
                </div>
                <div className="w-px h-3 bg-border-muted"></div>
                <span>Uptime: 99.99%</span>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-3 py-1.5 rounded bg-surface-tertiary border border-border-muted text-xs font-bold text-text-primary hover:border-text-muted transition-all shadow-lg shadow-black/10"
              >
                System Metrics
              </motion.button>
            </div>
          </div>

          {/* Real-time Graph Visual Placeholder */}
          <div className="h-[200px] w-full bg-surface-secondary border border-border-muted rounded-xl relative overflow-hidden group shadow-2xl shadow-black/20">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)]"></div>
              {/* Fake grid lines */}
              <div className="absolute inset-0 grid grid-cols-12 gap-px border-border-subtle/50">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="border-r border-border-muted/30"></div>
                ))}
              </div>
            </div>
            
            {/* Fake Waveform / Activity */}
            <div className="absolute inset-x-0 bottom-0 h-32 flex items-end px-12 space-x-1.5">
               {Array.from({ length: 48 }).map((_, i) => {
                 const height = Math.floor(Math.random() * 60) + 20;
                 return (
                   <motion.div 
                    key={i} 
                    initial={{ height: 0 }}
                    animate={{ 
                      height: [`${height}%`, `${height + (Math.random() * 20 - 10)}%`, `${height}%`] 
                    }}
                    transition={{ 
                      height: {
                        repeat: Infinity,
                        duration: 2 + Math.random() * 2,
                        ease: "easeInOut",
                        delay: i * 0.02
                      }
                    }}
                    className="flex-1 bg-gradient-to-t from-accent-blue/40 via-accent-blue/20 to-transparent rounded-t-sm hover:from-accent-blue/80 transition-all cursor-help relative group/bar" 
                   >
                     <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-surface-primary border border-border-muted px-1.5 py-0.5 rounded text-[8px] font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20">
                       {Math.floor(height * 123)} reqs
                     </div>
                   </motion.div>
                 );
               })}
            </div>

            <div className="absolute top-6 left-8 flex items-center space-x-12">
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -2 }}
              >
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1.5 opacity-60">Global Requests</div>
                <div className="text-3xl font-mono font-bold text-text-primary tracking-tight">12.4k<span className="text-sm text-text-muted ml-1 font-normal">/sec</span></div>
              </motion.div>
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -2 }}
              >
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1.5 opacity-60">Build Success Rate</div>
                <div className="text-3xl font-mono font-bold text-text-primary tracking-tight">99.8<span className="text-sm text-text-muted ml-1 font-normal">%</span></div>
              </motion.div>
            </div>
            
            {/* Animated Glow Cursor */}
            <motion.div 
              animate={{ 
                x: [0, 400, 200, 600, 0],
                y: [0, 100, 50, 150, 0]
              }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute w-32 h-32 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none"
            />
          </div>
        </motion.section>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content: Activity & Deployments */}
          <div className="xl:col-span-2 space-y-8">
            {/* Active Deployments */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider flex items-center space-x-2">
                <Zap size={14} />
                <span>Active Deployments</span>
              </h2>
              
              <div className="space-y-3">
                {[
                  { name: 'solar-core-api', env: 'production', status: 'ready', branch: 'main', time: '2m ago', url: 'api.solar.dev' },
                  { name: 'solar-dashboard-web', env: 'staging', status: 'building', branch: 'feat/ui-overhaul', time: '12s ago', url: 'stg.solar.dev' },
                ].map((dep) => (
                  <motion.div 
                    key={dep.name} 
                    whileHover={{ scale: 1.01, borderColor: 'var(--color-border-muted)' }}
                    className="bg-surface-secondary border border-border-subtle rounded-lg p-4 flex items-center justify-between hover:border-border-muted transition-all group cursor-pointer shadow-lg shadow-black/5"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-md border border-border-muted flex items-center justify-center ${dep.status === 'ready' ? 'bg-success/10' : 'bg-accent-blue/10'}`}>
                        {dep.status === 'ready' ? (
                          <CheckCircle2 size={18} className="text-success" />
                        ) : (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                          >
                            <Activity size={18} className="text-accent-blue" />
                          </motion.div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-text-primary">{dep.name}</span>
                          <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${dep.env === 'production' ? 'bg-accent-violet/10 text-accent-violet' : 'bg-text-muted/10 text-text-muted'}`}>
                            {dep.env}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 mt-1">
                          <div className="flex items-center space-x-1 text-[11px] text-text-muted">
                            <GitBranch size={10} />
                            <span>{dep.branch}</span>
                          </div>
                          <span className="text-[11px] text-text-muted">•</span>
                          <span className="text-[11px] text-text-muted">{dep.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded hover:bg-surface-tertiary text-text-muted hover:text-text-primary transition-colors">
                        <ExternalLink size={16} />
                      </button>
                      <ChevronRight size={16} className="text-text-muted" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Sync Stream Terminal */}
            <motion.div variants={itemVariants} className="space-y-4">
               <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider flex items-center space-x-2">
                <TerminalIcon size={14} />
                <span>Live Event Stream</span>
              </h2>
              <div className="bg-[#000000] rounded-lg border border-border-muted p-4 font-mono text-xs leading-relaxed overflow-hidden relative group shadow-2xl">
                <div className="absolute top-2 right-4 text-[10px] text-text-muted font-bold uppercase flex items-center space-x-2">
                  <motion.div 
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-1.5 h-1.5 rounded-full bg-success"
                  />
                  <span>Websocket Connected</span>
                </div>
                <div className="space-y-1">
                  {[
                    { time: '14:22:01', tag: 'SYNC', msg: 'Push detected on solar-os/core (main)', color: 'text-success' },
                    { time: '14:22:02', tag: 'BUILD', msg: 'Triggered production build on Vercel (id: dep_81726)', color: 'text-accent-blue' },
                    { time: '14:22:05', tag: 'INFRA', msg: 'EKS Cluster us-east-1 autoscaling: +2 nodes added', color: 'text-warning' },
                  ].map((line, i) => (
                    <motion.div 
                      key={i}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.2 }}
                      className="flex space-x-4"
                    >
                      <span className="text-text-muted shrink-0">{line.time}</span>
                      <span className={`${line.color} shrink-0`}>[{line.tag}]</span>
                      <span className="text-text-secondary">{line.msg}</span>
                    </motion.div>
                  ))}
                  <div className="flex space-x-4 opacity-50">
                    <span className="text-text-muted shrink-0">14:22:08</span>
                    <span className="text-text-muted shrink-0">[LOGS]</span>
                    <span className="text-text-secondary italic">Worker thread initialized successfully...</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-2 border-t border-border-muted pt-2 text-text-muted">
                  <motion.span 
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  >_</motion.span>
                  <span className="italic">Listening for incoming synchronization events...</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Infrastructure Topology */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider flex items-center space-x-2">
            <Cloud size={14} />
            <span>Ecosystem Topology</span>
          </h2>
          <div className="bg-surface-secondary border border-border-subtle rounded-lg p-6 space-y-6 h-[460px] flex flex-col items-center justify-center relative overflow-hidden shadow-xl group">
            {/* Visual Nodes and Connections */}
            <div className="relative w-full h-full flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-accent-blue)" stopOpacity="0" />
                    <stop offset="50%" stopColor="var(--color-accent-blue)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="var(--color-accent-blue)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Connection Paths */}
                <motion.path
                  d="M 50% 120 L 30% 240"
                  stroke="var(--color-border-muted)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                <motion.path
                  d="M 50% 120 L 70% 240"
                  stroke="var(--color-border-muted)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ duration: 1.5, delay: 0.6 }}
                />
                <motion.path
                  d="M 30% 240 L 50% 360"
                  stroke="var(--color-border-muted)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                />
                <motion.path
                  d="M 70% 240 L 50% 360"
                  stroke="var(--color-border-muted)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />

                {/* Animated Pulse on Paths */}
                <motion.circle r="2" fill="var(--color-accent-blue)">
                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    path="M 50% 120 L 30% 240"
                  />
                </motion.circle>
                <motion.circle r="2" fill="var(--color-accent-violet)">
                  <animateMotion
                    dur="4s"
                    repeatCount="indefinite"
                    path="M 50% 120 L 70% 240"
                  />
                </motion.circle>
              </svg>

              <div className="relative z-10 flex flex-col items-center justify-between h-full py-8 w-full">
                {/* GitHub Node */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', delay: 0.4 }}
                  whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(255,255,255,0.1)' }}
                  className="w-14 h-14 rounded-2xl bg-surface-tertiary border border-border-muted flex items-center justify-center text-text-primary shadow-2xl cursor-pointer group/node"
                >
                  <Github size={28} />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/node:opacity-100 transition-opacity bg-surface-primary border border-border-muted px-2 py-1 rounded text-[10px] font-bold whitespace-nowrap">
                    Source Control
                  </div>
                </motion.div>

                <div className="flex items-center justify-around w-full">
                  {/* Vercel Node */}
                  <motion.div 
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'spring', delay: 0.6 }}
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 rounded-2xl bg-surface-tertiary border border-border-muted flex items-center justify-center text-text-primary cursor-pointer group/node"
                  >
                    <Server size={28} className="text-accent-blue" />
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/node:opacity-100 transition-opacity bg-surface-primary border border-border-muted px-2 py-1 rounded text-[10px] font-bold whitespace-nowrap">
                      Edge Network
                    </div>
                  </motion.div>

                  {/* AWS Node */}
                  <motion.div 
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'spring', delay: 0.6 }}
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 rounded-2xl bg-surface-tertiary border border-border-muted flex items-center justify-center text-text-primary cursor-pointer group/node"
                  >
                    <Cloud size={28} className="text-accent-violet" />
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/node:opacity-100 transition-opacity bg-surface-primary border border-border-muted px-2 py-1 rounded text-[10px] font-bold whitespace-nowrap">
                      Cloud Compute
                    </div>
                  </motion.div>
                </div>

                {/* Production Node */}
                <motion.div 
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: 'spring', delay: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 rounded-2xl bg-surface-tertiary border border-border-muted flex items-center justify-center text-text-primary cursor-pointer group/node"
                >
                  <Zap size={28} className="text-success" />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/node:opacity-100 transition-opacity bg-surface-primary border border-border-muted px-2 py-1 rounded text-[10px] font-bold whitespace-nowrap">
                    Live Environment
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-4 inset-x-6"
            >
              <div className="bg-surface-primary/60 backdrop-blur-md border border-border-muted rounded-lg p-3 shadow-2xl">
                <div className="flex items-center justify-between text-[10px] font-bold text-text-muted uppercase mb-2">
                  <span>Connected Infrastructure</span>
                  <span className="text-success flex items-center space-x-1">
                    <span className="w-1 h-1 rounded-full bg-success animate-pulse"></span>
                    <span>All Systems Active</span>
                  </span>
                </div>
                <div className="flex space-x-2">
                  {['GH', 'VC', 'AWS', 'SL'].map((label, i) => (
                    <motion.div 
                      key={label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.4 + (i * 0.1) }}
                      whileHover={{ scale: 1.1, backgroundColor: 'var(--color-surface-secondary)' }}
                      className="w-8 h-8 rounded border border-border-muted flex items-center justify-center text-[8px] font-bold text-text-muted bg-surface-primary cursor-help"
                    >
                      {label}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </MainLayout>
  );
}
