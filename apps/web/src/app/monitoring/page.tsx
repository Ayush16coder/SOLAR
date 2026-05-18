'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Activity, 
  BarChart3, 
  Clock, 
  Zap, 
  ShieldCheck, 
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Server
} from 'lucide-react';

export default function MonitoringPage() {
  return (
    <MainLayout>
      <div className="p-8 space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center space-x-3">
              <Activity className="text-success" />
              <span>Real-time Monitoring</span>
            </h1>
            <p className="text-sm text-text-muted mt-1">Live observability and performance tracking for global deployments.</p>
          </div>
          <div className="flex items-center space-x-3">
             <div className="flex items-center space-x-2 text-[10px] font-bold text-text-muted uppercase px-3 py-1.5 rounded bg-surface-secondary border border-border-muted">
                <span>Refresh:</span>
                <span className="text-text-primary">Auto (1s)</span>
             </div>
             <button className="px-3 py-1.5 rounded bg-surface-tertiary border border-border-muted text-xs font-bold text-text-primary hover:border-text-muted transition-all">Configure Alerts</button>
          </div>
        </header>

        {/* High-level Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-surface-secondary border border-border-subtle rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                 <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Average Latency</div>
                 <TrendingUp size={14} className="text-success" />
              </div>
              <div className="flex items-baseline space-x-2">
                 <span className="text-3xl font-mono font-bold text-text-primary">42.8<span className="text-lg text-text-muted ml-1">ms</span></span>
                 <span className="text-xs text-success font-bold">-12%</span>
              </div>
              <div className="h-12 w-full bg-surface-tertiary/50 rounded flex items-end px-2 pb-1 space-x-0.5">
                 {Array.from({ length: 24 }).map((_, i) => (
                   <div key={i} className="flex-1 bg-accent-blue/30 rounded-t-sm" style={{ height: `${Math.random() * 80 + 20}%` }}></div>
                 ))}
              </div>
           </div>

           <div className="bg-surface-secondary border border-border-subtle rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                 <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Request Volume</div>
                 <Zap size={14} className="text-accent-blue" />
              </div>
              <div className="flex items-baseline space-x-2">
                 <span className="text-3xl font-mono font-bold text-text-primary">12.4k<span className="text-lg text-text-muted ml-1">rpm</span></span>
                 <span className="text-xs text-accent-blue font-bold">+8%</span>
              </div>
              <div className="h-12 w-full bg-surface-tertiary/50 rounded flex items-end px-2 pb-1 space-x-0.5">
                 {Array.from({ length: 24 }).map((_, i) => (
                   <div key={i} className="flex-1 bg-accent-violet/30 rounded-t-sm" style={{ height: `${Math.random() * 80 + 20}%` }}></div>
                 ))}
              </div>
           </div>

           <div className="bg-surface-secondary border border-border-subtle rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                 <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Error Rate</div>
                 <AlertTriangle size={14} className="text-error" />
              </div>
              <div className="flex items-baseline space-x-2">
                 <span className="text-3xl font-mono font-bold text-text-primary">0.02<span className="text-lg text-text-muted ml-1">%</span></span>
                 <span className="text-xs text-success font-bold">-0.01%</span>
              </div>
              <div className="h-12 w-full bg-surface-tertiary/50 rounded flex items-end px-2 pb-1 space-x-0.5">
                 {Array.from({ length: 24 }).map((_, i) => (
                   <div key={i} className="flex-1 bg-error/20 rounded-t-sm" style={{ height: `${Math.random() * 20 + 5}%` }}></div>
                 ))}
              </div>
           </div>
        </div>

        {/* Advanced Metrics */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
           <div className="bg-surface-secondary border border-border-subtle rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                 <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider flex items-center space-x-2">
                    <BarChart3 size={14} />
                    <span>Response Time Distribution (P99)</span>
                 </h2>
                 <button className="text-[10px] font-bold text-accent-blue uppercase hover:underline">View Heatmap</button>
              </div>
              <div className="h-64 w-full bg-surface-tertiary/20 rounded-lg border border-border-muted/30 relative flex flex-col justify-end p-6">
                 {/* Fake Chart Lines */}
                 <div className="absolute inset-0 grid grid-rows-4 gap-px pointer-events-none opacity-10">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="border-b border-white"></div>
                    ))}
                 </div>
                 <div className="flex items-end justify-between h-48 space-x-2 relative z-10">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-accent-blue/40 to-accent-blue/80 rounded-t shadow-[0_0_10px_rgba(59,130,246,0.2)]" style={{ height: `${Math.random() * 70 + 30}%` }}></div>
                    ))}
                 </div>
                 <div className="flex justify-between mt-4 text-[10px] font-mono text-text-muted uppercase">
                    <span>14:00</span>
                    <span>14:15</span>
                    <span>14:30</span>
                    <span>14:45</span>
                    <span>15:00</span>
                 </div>
              </div>
           </div>

           <div className="bg-surface-secondary border border-border-subtle rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                 <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider flex items-center space-x-2">
                    <Server size={14} />
                    <span>Service Health Matrix</span>
                 </h2>
                 <span className="text-[10px] font-bold text-success flex items-center space-x-1 uppercase">
                    <ShieldCheck size={12} />
                    <span>All Systems Operational</span>
                 </span>
              </div>
              
              <div className="space-y-4">
                 {[
                   { name: 'API Gateway', region: 'Global', status: 'Healthy', uptime: '100%' },
                   { name: 'Auth Service', region: 'us-east-1', status: 'Healthy', uptime: '99.99%' },
                   { name: 'Sync Engine', region: 'us-west-2', status: 'Degraded', uptime: '98.4%' },
                   { name: 'DB Proxy', region: 'eu-central-1', status: 'Healthy', uptime: '100%' },
                   { name: 'AI Orchestrator', region: 'Global', status: 'Healthy', uptime: '100%' },
                 ].map((service) => (
                   <div key={service.name} className="flex items-center justify-between p-3 rounded bg-surface-tertiary/50 border border-border-subtle group hover:border-border-muted transition-all cursor-pointer">
                      <div className="flex items-center space-x-4">
                         <div className={`w-2 h-2 rounded-full ${service.status === 'Healthy' ? 'bg-success shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-warning animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.4)]'}`}></div>
                         <div>
                            <div className="text-xs font-bold text-text-primary">{service.name}</div>
                            <div className="text-[10px] text-text-muted uppercase tracking-tighter">{service.region}</div>
                         </div>
                      </div>
                      <div className="text-right">
                         <div className="text-[11px] font-mono text-text-secondary">{service.uptime}</div>
                         <div className="text-[9px] text-text-muted uppercase font-bold group-hover:text-text-primary transition-colors">Metrics <ArrowUpRight size={8} className="inline ml-0.5" /></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </MainLayout>
  );
}
