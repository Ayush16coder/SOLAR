'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MicroLoadingProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
}

export default function MicroLoading({ 
  size = 'sm', 
  color = 'var(--color-accent-blue)', 
  text 
}: MicroLoadingProps) {
  const dimensions = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`relative ${dimensions[size]}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-current opacity-20"
          style={{ color }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-current"
          style={{ color }}
        />
      </div>
      {text && (
        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest animate-pulse">
          {text}
        </span>
      )}
    </div>
  );
}
