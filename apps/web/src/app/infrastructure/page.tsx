'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Cpu, 
  Database, 
  Network, 
  ShieldCheck, 
  ArrowUpRight, 
  DollarSign, 
  BarChart3,
  Globe,
  Plus,
  Zap,
  HardDrive,
  Activity
} from 'lucide-react';

export default function InfrastructurePage() {
  return (
    <MainLayout>
      <div className="p-8 space-y-8">
        <header className="flex justify-between items-end">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">Cloud Infrastructure</h1>
            <p className="text-sm text-text-muted">Global resource distribution and real-time observability.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-3 py-1.5 rounded bg-surface-secondary border border-border-muted text-xs font-bold text-text-secondary hover:text-text-primary transition-all flex items-center space-x-2">
              <DollarSign size={14} />
              <span>Cost Report</span>
            </button>
            <button className="px-3 py-1.5 rounded bg-accent-blue text-white text-xs font-bold hover:bg-blue-600 transition-all flex items-center space-x-2">
              <Plus size={14} />
              <span>Provision Resource</span>
            </button>
          </div>
        </header>

        {/* Global Distribution Map Placeholder */}
        <section className="bg-surface-secondary border border-border-subtle rounded-xl p-6 h-[300px] relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.05),transparent)]"></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Globe size={16} className="text-accent-blue" />
                  <span className="text-xs font-bold uppercase tracking-wider text-text-primary">Global Traffic Distribution</span>
                </div>
                <div className="flex space-x-2">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-success/10 text-success border border-success/20">US-EAST-1</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-accent-violet/10 text-accent-violet border border-accent-violet/20">EU-CENTRAL-1</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-text-muted">
                <Activity size={14} className="text-success" />
                <span>99.998% Uptime</span>
              </div>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-3xl h-32 relative">
                {/* Fake World Map SVG Pattern could go here */}
                <div className="absolute inset-0 flex items-center justify-around opacity-30">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-24 h-24 rounded-full border border-border-muted animate-ping" style={{ animationDelay: `${i * 1}s`, animationDuration: '4s' }}></div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-around">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-accent-blue shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-text-primary">N. Virginia</div>
                  </div>
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-accent-violet shadow-[0_0_15px_rgba(139,92,246,0.5)]"></div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-text-primary">Frankfurt</div>
                  </div>
                  <div className="relative opacity-40">
                    <div className="w-3 h-3 rounded-full bg-text-muted"></div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-text-muted">Singapore</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[
            { label: 'Total Compute', value: '42.8', unit: 'vCPUs', icon: Cpu, color: 'text-accent-blue', trend: '+12%' },
            { label: 'Memory Reserved', value: '156.4', unit: 'GB', icon: Database, color: 'text-accent-violet', trend: '+4%' },
            { label: 'Storage Usage', value: '1.2', unit: 'PB', icon: HardDrive, color: 'text-warning', trend: '+18%' },
            { label: 'Network Throughput', value: '8.4', unit: 'Gbps', icon: Network, color: 'text-success', trend: '-2%' },
          ].map((metric) => (
            <div key={metric.label} className="bg-surface-secondary border border-border-subtle rounded-lg p-5 hover:border-border-muted transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded bg-surface-tertiary border border-border-muted ${metric.color}`}>
                  <metric.icon size={18} />
                </div>
                <span className={`text-[10px] font-bold ${metric.trend.startsWith('+') ? 'text-success' : 'text-error'}`}>
                  {metric.trend}
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{metric.label}</div>
                <div className="text-2xl font-mono font-bold text-text-primary">
                  {metric.value}<span className="text-sm font-medium text-text-muted ml-1">{metric.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Resources Table */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider flex items-center space-x-2">
              <BarChart3 size={14} />
              <span>Provisioned Resources</span>
            </h2>
            <div className="bg-surface-secondary border border-border-subtle rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-tertiary border-b border-border-subtle">
                    <th className="px-6 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider">Resource</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider">Provider</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider">Load</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {[
                    { id: 'i-09182', name: 'api-gateway-cluster', provider: 'AWS (EKS)', status: 'Active', load: '64%' },
                    { id: 'redis-8812', name: 'session-store-master', provider: 'Railway', status: 'Active', load: '22%' },
                    { id: 'db-main', name: 'primary-postgres', provider: 'Supabase', status: 'Healthy', load: '48%' },
                    { id: 'edge-kv', name: 'config-kv-global', provider: 'Cloudflare', status: 'Active', load: '5%' },
                  ].map((row) => (
                    <tr key={row.id} className="hover:bg-surface-tertiary transition-colors group">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-text-primary">{row.name}</div>
                        <div className="text-[10px] font-mono text-text-muted">{row.id}</div>
                      </td>
                      <td className="px-6 py-4 text-xs text-text-secondary">{row.provider}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
                          <span className="text-xs text-text-primary">{row.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-24 h-1.5 bg-border-muted rounded-full overflow-hidden">
                          <div className="bg-accent-blue h-full" style={{ width: row.load }}></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-text-muted hover:text-text-primary opacity-0 group-hover:opacity-100 transition-all">
                          <ArrowUpRight size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Security/Audit */}
          <div className="space-y-6">
            <div className="bg-surface-secondary border border-border-subtle rounded-lg p-6 space-y-6">
              <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider flex items-center space-x-2">
                <ShieldCheck size={14} />
                <span>Security Overview</span>
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded bg-success/10 flex items-center justify-center shrink-0">
                    <ShieldCheck size={16} className="text-success" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-text-primary">WAF Active</div>
                    <div className="text-[10px] text-text-muted mt-0.5">Cloudflare proxying 100% of traffic with zero threats detected.</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded bg-warning/10 flex items-center justify-center shrink-0">
                    <Activity size={16} className="text-warning" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-text-primary">IAM Review Needed</div>
                    <div className="text-[10px] text-text-muted mt-0.5">3 service accounts have unused permissions. AI suggests trimming.</div>
                  </div>
                </div>
              </div>

              <button className="w-full py-2 rounded bg-surface-tertiary border border-border-muted text-xs font-bold text-text-primary hover:border-text-muted transition-all">
                Run Security Audit
              </button>
            </div>

            <div className="bg-accent-violet/5 border border-accent-violet/20 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Zap size={16} className="text-accent-violet" />
                <span className="text-xs font-bold uppercase tracking-wider text-accent-violet">Cost Insight</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                You could save <span className="text-text-primary font-bold">$142/mo</span> by moving your staging Redis instances to <span className="text-text-primary font-bold">Railway Hobby</span> plan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
