'use client';

import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import AIPanel from './AIPanel';
import CommandPalette from './CommandPalette';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-surface-primary selection:bg-accent-blue/30 selection:text-text-primary">
      {/* Global Command Palette */}
      <CommandPalette />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Scrollable Workspace */}
        <main className="flex-1 overflow-y-auto bg-surface-primary/50">
          {children}
        </main>
      </div>

      {/* Context-aware AI Panel */}
      <AIPanel />
    </div>
  );
}
