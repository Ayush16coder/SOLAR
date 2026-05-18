'use client';

import React, { useState } from 'react';
import { Sparkles, Send, X, Bot, Terminal, ShieldAlert, Cpu, Code2, Zap } from 'lucide-react';

const suggestions = [
  { label: 'Analyze build failure', icon: ShieldAlert },
  { label: 'Optimize Docker config', icon: Code2 },
  { label: 'Scale EKS cluster', icon: Cpu },
  { label: 'Check API latency', icon: Zap },
];

export default function AIPanel() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return (
    <button 
      onClick={() => setIsOpen(true)}
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-accent-blue text-white shadow-lg flex items-center justify-center hover:scale-105 transition-all z-50"
    >
      <Sparkles size={20} />
    </button>
  );

  return (
    <aside className="w-[360px] h-screen bg-surface-primary border-l border-border-subtle flex flex-col shrink-0 z-50">
      {/* Header */}
      <div className="p-4 border-b border-border-subtle flex items-center justify-between bg-surface-secondary">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded bg-accent-blue/20 flex items-center justify-center">
            <Sparkles size={14} className="text-accent-blue" />
          </div>
          <span className="text-sm font-bold uppercase tracking-wider text-text-primary">Solar AI Assistant</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-text-primary transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-surface-primary/50">
        <div className="flex space-x-3">
          <div className="w-8 h-8 rounded border border-border-muted bg-surface-secondary flex items-center justify-center shrink-0">
            <Bot size={16} className="text-accent-blue" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="text-[10px] font-bold text-text-muted uppercase tracking-tight">Solar AI • Just now</div>
            <div className="text-sm text-text-secondary leading-relaxed bg-surface-tertiary/50 p-3 rounded-md border border-border-subtle">
              Infrastructure analysis complete. I detected a memory leak in your <span className="text-accent-blue font-mono">auth-service</span> staging environment. 
              <br/><br/>
              Would you like me to analyze the heap dump or suggest a memory limit adjustment for your K8s pod?
            </div>
          </div>
        </div>

        {/* Action Suggestion */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-text-muted uppercase tracking-tight mb-2">Suggested Actions</div>
          <div className="grid grid-cols-1 gap-2">
            {suggestions.map((item) => (
              <button key={item.label} className="flex items-center space-x-3 p-3 rounded-md border border-border-muted bg-surface-secondary hover:bg-surface-tertiary hover:border-text-muted transition-all group text-left">
                <item.icon size={16} className="text-text-muted group-hover:text-accent-blue transition-colors" />
                <span className="text-xs font-medium text-text-secondary group-hover:text-text-primary">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border-subtle bg-surface-secondary">
        <div className="relative">
          <textarea 
            placeholder="Ask anything about your stack..." 
            className="w-full h-24 bg-surface-primary border border-border-muted rounded-md p-3 pr-10 text-sm text-text-primary focus:outline-none focus:border-accent-blue transition-all resize-none placeholder:text-text-muted"
          />
          <button className="absolute right-2 bottom-2 p-1.5 rounded bg-accent-blue text-white hover:bg-blue-600 transition-colors">
            <Send size={14} />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px] text-text-muted px-1 font-mono">
          <div className="flex items-center space-x-2">
            <Terminal size={12} />
            <span>Multi-model Routing Active</span>
          </div>
          <span>GPT-4o / Claude 3.5</span>
        </div>
      </div>
    </aside>
  );
}
