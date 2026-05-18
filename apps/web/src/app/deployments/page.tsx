'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Zap, 
  History, 
  Filter, 
  GitPullRequest, 
  ExternalLink, 
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

const deployments = [
  { id: 'dep_91a28', project: 'solar-dashboard-web', env: 'production', branch: 'main', status: 'ready', creator: 'Alex Rivera', time: '14m ago' },
  { id: 'dep_881b2', project: 'solar-core-api', env: 'production', branch: 'main', status: 'ready', creator: 'GitHub Action', time: '1h ago' },
  { id: 'dep_77c19', project: 'solar-dashboard-web', env: 'staging', branch: 'feat/ai-panel', status: 'error', creator: 'Alex Rivera', time: '3h ago' },
  { id: 'dep_66d01', project: 'solar-docs', env: 'production', branch: 'main', status: 'ready', creator: 'System', time: '5h ago' },
  { id: 'dep_55e22', project: 'solar-core-api', env: 'preview', branch: 'fix/auth-leak', status: 'ready', creator: 'Sarah Chen', time: '1d ago' },
];

export default function DeploymentPage() {
  return (
    <MainLayout>
      <div className="p-8 space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">Deployments</h1>
            <p className="text-sm text-text-muted text-balance max-w-lg mt-1">Track every build, preview, and production rollout across your entire ecosystem.</p>
          </div>
          <div className="flex items-center space-x-3">
             <div className="flex bg-surface-secondary border border-border-muted rounded-md p-0.5">
                <button className="px-3 py-1.5 text-[11px] font-bold bg-surface-tertiary text-text-primary rounded shadow-sm">List View</button>
                <button className="px-3 py-1.5 text-[11px] font-bold text-text-muted hover:text-text-secondary transition-colors">Pipeline View</button>
             </div>
             <button className="p-2 rounded bg-surface-secondary border border-border-muted text-text-muted hover:text-text-primary transition-all">
                <Filter size={16} />
             </button>
          </div>
        </header>

        {/* Active Pipeline visualization (simplified) */}
        <div className="bg-surface-secondary border border-border-subtle rounded-xl p-6 overflow-hidden relative group">
           <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                 <div className="w-8 h-8 rounded bg-accent-blue/10 flex items-center justify-center">
                    <Zap size={16} className="text-accent-blue animate-pulse" />
                 </div>
                 <div>
                    <div className="text-xs font-bold text-text-primary">Active Rollout: solar-dashboard-web</div>
                    <div className="text-[10px] text-text-muted">Initiated by manual trigger • <span className="text-accent-blue">Step 2/4: Containerizing</span></div>
                 </div>
              </div>
              <div className="flex items-center space-x-4">
                 <div className="text-right">
                    <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Elapsed Time</div>
                    <div className="text-xs font-mono font-bold text-text-primary">01:42s</div>
                 </div>
                 <button className="px-3 py-1.5 rounded bg-error/10 text-error border border-error/20 text-[10px] font-bold uppercase hover:bg-error/20 transition-all">
                    Cancel Rollout
                 </button>
              </div>
           </div>

           {/* Pipeline Steps */}
           <div className="flex items-center space-x-2 relative px-4">
              <div className="flex-1 h-1 bg-accent-blue rounded-full relative">
                 <div className="absolute -top-1.5 left-0 w-4 h-4 rounded-full bg-accent-blue border-4 border-surface-secondary"></div>
                 <div className="absolute -bottom-6 left-0 text-[10px] font-bold text-accent-blue uppercase">Source</div>
              </div>
              <div className="flex-1 h-1 bg-accent-blue/30 rounded-full relative">
                 <div className="absolute -top-1.5 left-0 w-4 h-4 rounded-full bg-accent-blue border-4 border-surface-secondary shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                 <div className="absolute -bottom-6 left-0 text-[10px] font-bold text-text-primary uppercase">Build</div>
              </div>
              <div className="flex-1 h-1 bg-surface-tertiary rounded-full relative">
                 <div className="absolute -top-1.5 left-0 w-4 h-4 rounded-full bg-surface-tertiary border-4 border-surface-secondary"></div>
                 <div className="absolute -bottom-6 left-0 text-[10px] font-bold text-text-muted uppercase">Deploy</div>
              </div>
              <div className="flex-1 h-1 bg-surface-tertiary rounded-full relative">
                 <div className="absolute -top-1.5 left-0 w-4 h-4 rounded-full bg-surface-tertiary border-4 border-surface-secondary"></div>
                 <div className="absolute -bottom-6 left-0 text-[10px] font-bold text-text-muted uppercase">Verify</div>
              </div>
           </div>
        </div>

        {/* Deployment History */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider flex items-center space-x-2">
            <History size={14} />
            <span>Rollout History</span>
          </h2>

          <div className="bg-surface-secondary border border-border-subtle rounded-xl overflow-hidden shadow-2xl shadow-black/20">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-tertiary/50 border-b border-border-subtle">
                  <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Deployment</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Environment</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Commit</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Initiated By</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Completed</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/50">
                {deployments.map((dep) => (
                  <tr key={dep.id} className="hover:bg-surface-tertiary/30 transition-all group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                         <div className={`w-8 h-8 rounded border border-border-muted flex items-center justify-center ${dep.status === 'ready' ? 'bg-success/5 text-success' : 'bg-error/5 text-error'}`}>
                            {dep.status === 'ready' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                         </div>
                         <div>
                            <div className="text-sm font-bold text-text-primary">{dep.project}</div>
                            <div className="text-[10px] font-mono text-text-muted uppercase">{dep.id}</div>
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${dep.env === 'production' ? 'bg-accent-violet/10 text-accent-violet border-accent-violet/20' : 'bg-text-muted/10 text-text-muted border-border-muted'}`}>
                          {dep.env.toUpperCase()}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center space-x-2">
                          <GitPullRequest size={12} className="text-text-muted" />
                          <span className="text-xs font-mono text-text-secondary">{dep.branch}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-text-secondary">
                       {dep.creator}
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center space-x-2 text-xs text-text-muted">
                          <Clock size={12} />
                          <span>{dep.time}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button className="p-1.5 rounded hover:bg-surface-primary text-text-muted hover:text-text-primary transition-colors">
                             <ExternalLink size={16} />
                          </button>
                          <button className="p-1.5 rounded hover:bg-surface-primary text-text-muted hover:text-text-primary transition-colors">
                             <MoreVertical size={16} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="bg-surface-tertiary/20 p-4 border-t border-border-subtle flex items-center justify-center">
               <button className="text-xs font-bold text-accent-blue hover:text-blue-400 transition-colors flex items-center space-x-2">
                  <span>View All Deployments</span>
                  <ArrowRight size={14} />
               </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
