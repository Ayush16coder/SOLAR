'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Sparkles, 
  Bot, 
  Brain, 
  Cpu, 
  Zap, 
  Terminal, 
  Settings2, 
  ChevronRight,
  ShieldCheck,
  Code2,
  Plus
} from 'lucide-react';

const agents = [
  { name: 'DevOps Architect', status: 'idle', task: 'Monitoring infra...', model: 'Claude 3.5 Sonnet' },
  { name: 'Debug Assistant', status: 'active', task: 'Analyzing build dep_91a...', model: 'GPT-4o' },
  { name: 'Security Guard', status: 'active', task: 'Scanning dependencies...', model: 'Gemini 1.5 Pro' },
];

export default function AIPage() {
  return (
    <MainLayout>
      <div className="p-8 space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center space-x-3">
              <Sparkles className="text-accent-blue" />
              <span>AI Orchestration</span>
            </h1>
            <p className="text-sm text-text-muted mt-1 text-balance max-w-lg">Manage autonomous agents and multi-model routing policies for your entire development lifecycle.</p>
          </div>
          <div className="flex items-center space-x-3">
             <button className="px-3 py-1.5 rounded bg-surface-secondary border border-border-muted text-xs font-bold text-text-secondary hover:text-text-primary transition-all flex items-center space-x-2">
                <Settings2 size={14} />
                <span>Routing Policies</span>
             </button>
             <button className="px-3 py-1.5 rounded bg-accent-blue text-white text-xs font-bold hover:bg-blue-600 transition-all flex items-center space-x-2">
                <Brain size={14} />
                <span>Deploy New Agent</span>
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Agents */}
          <div className="lg:col-span-2 space-y-4">
             <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider flex items-center space-x-2">
                <Bot size={14} />
                <span>Autonomous Agents</span>
             </h2>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agents.map((agent) => (
                  <div key={agent.name} className="bg-surface-secondary border border-border-subtle rounded-xl p-5 hover:border-border-muted transition-all group">
                     <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-surface-tertiary border border-border-muted flex items-center justify-center">
                           <Bot size={20} className={agent.status === 'active' ? 'text-accent-blue animate-pulse' : 'text-text-muted'} />
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${agent.status === 'active' ? 'bg-success/10 text-success border-success/20' : 'bg-text-muted/10 text-text-muted border-border-muted'}`}>
                           {agent.status.toUpperCase()}
                        </span>
                     </div>
                     <div className="space-y-1">
                        <div className="text-sm font-bold text-text-primary">{agent.name}</div>
                        <div className="text-xs text-text-muted">{agent.task}</div>
                     </div>
                     <div className="mt-4 pt-4 border-t border-border-subtle flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                           <Cpu size={12} className="text-text-muted" />
                           <span className="text-[10px] font-mono text-text-muted">{agent.model}</span>
                        </div>
                        <ChevronRight size={14} className="text-text-muted group-hover:text-text-primary transition-colors" />
                     </div>
                  </div>
                ))}
                
                <div className="border border-dashed border-border-muted rounded-xl p-5 flex flex-col items-center justify-center space-y-2 opacity-50 hover:opacity-100 hover:border-accent-blue transition-all cursor-pointer group">
                   <div className="w-10 h-10 rounded-lg border border-dashed border-border-muted flex items-center justify-center group-hover:text-accent-blue group-hover:border-accent-blue">
                      <Plus size={20} />
                   </div>
                   <span className="text-xs font-bold text-text-muted group-hover:text-text-primary">Create custom agent</span>
                </div>
             </div>

             {/* Recent AI Logs */}
             <div className="mt-8 space-y-4">
                <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider flex items-center space-x-2">
                  <Terminal size={14} />
                  <span>Agent Decision Stream</span>
                </h2>
                <div className="bg-[#000000] rounded-xl border border-border-muted p-4 font-mono text-[11px] leading-relaxed">
                   <div className="space-y-2">
                      <div className="flex space-x-4">
                        <span className="text-text-muted">14:30:12</span>
                        <span className="text-accent-blue">[DEBUG]</span>
                        <span className="text-text-secondary italic">Analyzing logs for <span className="text-text-primary">solar-core-api</span>... Found <span className="text-error">ConnectionTimeoutError</span></span>
                      </div>
                      <div className="flex space-x-4 ml-18">
                        <span className="text-success">[ACTION]</span>
                        <span className="text-text-secondary italic">Updating RDS security group rules to allow inbound traffic from EKS pods.</span>
                      </div>
                      <div className="flex space-x-4">
                        <span className="text-text-muted">14:32:45</span>
                        <span className="text-accent-violet">[ARCH]</span>
                        <span className="text-text-secondary italic">Optimizing <span className="text-text-primary">Docker-compose</span> for multi-stage build performance.</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Model Statistics & Controls */}
          <div className="space-y-6">
             <div className="bg-surface-secondary border border-border-subtle rounded-xl p-6 space-y-6">
                <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider flex items-center space-x-2">
                   <Zap size={14} />
                   <span>Inference Engine</span>
                </h2>
                
                <div className="space-y-4">
                   {[
                     { name: 'GPT-4o', usage: '42%', color: 'bg-accent-blue' },
                     { name: 'Claude 3.5', usage: '28%', color: 'bg-accent-violet' },
                     { name: 'Gemini 1.5', usage: '15%', color: 'bg-success' },
                     { name: 'Llama 3 (Self-hosted)', usage: '15%', color: 'bg-warning' },
                   ].map((model) => (
                     <div key={model.name} className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-bold uppercase">
                           <span className="text-text-primary">{model.name}</span>
                           <span className="text-text-muted">{model.usage}</span>
                        </div>
                        <div className="w-full h-1 bg-surface-tertiary rounded-full overflow-hidden">
                           <div className={`h-full ${model.color}`} style={{ width: model.usage }}></div>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="pt-4 border-t border-border-subtle space-y-3">
                   <div className="flex items-center justify-between text-xs">
                      <span className="text-text-muted">Tokens this month</span>
                      <span className="text-text-primary font-bold">12.4M / 50M</span>
                   </div>
                   <div className="flex items-center justify-between text-xs">
                      <span className="text-text-muted">Cost Efficiency</span>
                      <span className="text-success font-bold">+18% vs last month</span>
                   </div>
                </div>
             </div>

             {/* AI Capabilities Cards */}
             <div className="bg-accent-blue/5 border border-accent-blue/20 rounded-xl p-6 space-y-4">
                <div className="flex items-center space-x-2">
                   <ShieldCheck size={16} className="text-accent-blue" />
                   <span className="text-xs font-bold uppercase tracking-wider text-accent-blue">AI Security Analysis</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                   Solar AI is currently monitoring <span className="text-text-primary font-bold">12 production repositories</span> for vulnerabilities and suspicious activity.
                </p>
                <button className="w-full py-2 rounded bg-accent-blue/20 text-accent-blue border border-accent-blue/20 text-[10px] font-bold uppercase hover:bg-accent-blue/30 transition-all">
                   View Security Dashboard
                </button>
             </div>

             <div className="bg-surface-secondary border border-border-subtle rounded-xl p-6 space-y-4">
                <div className="flex items-center space-x-2">
                   <Code2 size={16} className="text-text-primary" />
                   <span className="text-xs font-bold uppercase tracking-wider text-text-primary">DevOps Autopilot</span>
                </div>
                <div className="flex items-center justify-between">
                   <span className="text-xs text-text-muted">Autonomous PR Reviews</span>
                   <div className="w-8 h-4 bg-accent-blue rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 w-3 h-3 rounded-full bg-white shadow-sm"></div>
                   </div>
                </div>
                <div className="flex items-center justify-between">
                   <span className="text-xs text-text-muted">Self-healing Infrastructure</span>
                   <div className="w-8 h-4 bg-surface-tertiary rounded-full relative">
                      <div className="absolute left-0.5 top-0.5 w-3 h-3 rounded-full bg-text-muted shadow-sm"></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
