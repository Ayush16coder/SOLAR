'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Settings, 
  Users, 
  Shield, 
  Key, 
  CreditCard, 
  Bell, 
  Globe, 
  ChevronRight,
  Database,
  Lock,
  Plus
} from 'lucide-react';

const tabs = [
  { name: 'General', icon: Settings },
  { name: 'Team Members', icon: Users },
  { name: 'Security & SSO', icon: Shield },
  { name: 'API Keys', icon: Key },
  { name: 'Infrastructure', icon: Database },
  { name: 'Billing', icon: CreditCard },
];

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="flex h-full bg-surface-primary">
        {/* Sub-navigation */}
        <aside className="w-64 border-r border-border-subtle p-4 space-y-1 overflow-y-auto">
          <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-4 mb-4">Workspace Settings</div>
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all group ${tab.name === 'Security & SSO' ? 'bg-surface-secondary text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary/50'}`}
            >
              <tab.icon size={16} className={tab.name === 'Security & SSO' ? 'text-accent-blue' : 'text-text-muted group-hover:text-text-secondary'} />
              <span>{tab.name}</span>
            </button>
          ))}
        </aside>

        {/* Settings Content */}
        <main className="flex-1 overflow-y-auto p-12 max-w-4xl">
           <header className="mb-10">
              <h1 className="text-3xl font-bold tracking-tight text-text-primary">Security & SSO</h1>
              <p className="text-text-muted mt-2">Manage enterprise security protocols, single sign-on, and audit logs.</p>
           </header>

           <div className="space-y-12">
              {/* SSO Section */}
              <section className="space-y-6">
                 <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-text-primary">Single Sign-On (SSO)</h2>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-accent-violet/10 text-accent-violet border border-accent-violet/20 uppercase tracking-wider">Enterprise Plan</span>
                 </div>
                 
                 <div className="grid grid-cols-1 gap-4">
                    <div className="bg-surface-secondary border border-border-subtle rounded-xl p-6 flex items-center justify-between group hover:border-border-muted transition-all">
                       <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded border border-border-muted bg-surface-tertiary flex items-center justify-center">
                             <Globe size={24} className="text-text-muted" />
                          </div>
                          <div>
                             <div className="font-bold text-text-primary">SAML / Okta</div>
                             <div className="text-xs text-text-muted mt-0.5 text-balance max-w-sm">Configure SAML 2.0 to allow your team to sign in via Okta, Google Workspace, or Azure AD.</div>
                          </div>
                       </div>
                       <button className="px-4 py-2 rounded bg-surface-tertiary border border-border-muted text-xs font-bold text-text-primary hover:border-text-muted transition-all">Configure</button>
                    </div>
                 </div>
              </section>

              {/* API Security */}
              <section className="space-y-6">
                 <h2 className="text-xl font-bold text-text-primary">API Security & Auth</h2>
                 
                 <div className="space-y-4">
                    <div className="bg-surface-secondary border border-border-subtle rounded-xl p-6 space-y-6">
                       <div className="flex items-center justify-between">
                          <div className="space-y-1">
                             <div className="text-sm font-bold text-text-primary flex items-center space-x-2">
                                <Lock size={14} className="text-success" />
                                <span>Two-Factor Authentication (2FA)</span>
                             </div>
                             <p className="text-xs text-text-muted">Enforce 2FA for all members of this workspace.</p>
                          </div>
                          <div className="w-10 h-5 bg-accent-blue rounded-full relative">
                             <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"></div>
                          </div>
                       </div>

                       <div className="pt-6 border-t border-border-subtle flex items-center justify-between">
                          <div className="space-y-1">
                             <div className="text-sm font-bold text-text-primary">Session Duration</div>
                             <p className="text-xs text-text-muted">How long a user can remain logged in before being prompted to re-authenticate.</p>
                          </div>
                          <select className="bg-surface-tertiary border border-border-muted rounded px-3 py-1.5 text-xs text-text-primary focus:outline-none focus:border-text-muted">
                             <option>24 Hours</option>
                             <option>7 Days</option>
                             <option>30 Days</option>
                          </select>
                       </div>
                    </div>
                 </div>
              </section>

              {/* Audit Logs */}
              <section className="space-y-6">
                 <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-text-primary">Audit Logs</h2>
                    <button className="text-xs font-bold text-accent-blue hover:text-blue-400 transition-colors flex items-center space-x-1">
                       <span>Export Logs</span>
                       <ChevronRight size={14} />
                    </button>
                 </div>
                 
                 <div className="bg-surface-secondary border border-border-subtle rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-border-subtle bg-surface-tertiary/30 flex items-center justify-between text-[10px] font-bold text-text-muted uppercase tracking-widest">
                       <span>Recent Activity</span>
                       <span>Viewing last 50 events</span>
                    </div>
                    <div className="divide-y divide-border-subtle">
                       {[
                         { event: 'DEPLOY_TRIGGERED', user: 'Alex Rivera', resource: 'solar-core-api', time: '12m ago' },
                         { event: 'SECRET_UPDATED', user: 'Sarah Chen', resource: 'DATABASE_URL', time: '1h ago' },
                         { event: 'MEMBER_INVITED', user: 'Alex Rivera', resource: 'john@company.com', time: '3h ago' },
                         { event: 'WAF_CONFIG_CHANGED', user: 'System', resource: 'Cloudflare', time: '5h ago' },
                       ].map((log, i) => (
                         <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-surface-tertiary/30 transition-all cursor-pointer">
                            <div className="flex items-center space-x-4">
                               <div className="text-xs font-mono text-accent-blue">[{log.event}]</div>
                               <div className="text-sm text-text-secondary">
                                  <span className="text-text-primary font-bold">{log.user}</span>
                                  <span className="mx-2 text-text-muted">modified</span>
                                  <span className="text-text-primary font-mono bg-surface-tertiary px-1.5 py-0.5 rounded text-[11px]">{log.resource}</span>
                               </div>
                            </div>
                            <span className="text-[10px] text-text-muted font-mono">{log.time}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </section>

              {/* Danger Zone */}
              <section className="pt-12 border-t border-border-subtle space-y-6">
                 <h2 className="text-xl font-bold text-error">Danger Zone</h2>
                 <div className="bg-error/5 border border-error/20 rounded-xl p-6 flex items-center justify-between">
                    <div className="space-y-1">
                       <div className="text-sm font-bold text-text-primary">Delete Workspace</div>
                       <p className="text-xs text-text-muted">Permanently delete this workspace and all associated data. This action is irreversible.</p>
                    </div>
                    <button className="px-4 py-2 rounded bg-error text-white text-xs font-bold hover:bg-red-600 transition-all shadow-lg shadow-error/20">Delete Workspace</button>
                 </div>
              </section>
           </div>
        </main>
      </div>
    </MainLayout>
  );
}
