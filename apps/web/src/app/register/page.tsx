'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Globe, Sparkles, ShieldCheck, Zap, Box as Github, UserPlus, Mail, Lock, User, Loader2 } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading('email');
    // Mock registration delay
    setTimeout(() => {
      router.push('/dashboard');
      setIsLoading(null);
    }, 1500);
  };

  const handleOAuthLogin = async (provider: string) => {
    setIsLoading(provider);
    // Mock OAuth delay
    setTimeout(() => {
      router.push('/dashboard');
      setIsLoading(null);
    }, 1500);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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

  return (
    <div className="flex min-h-screen bg-surface-primary selection:bg-accent-blue/30 overflow-hidden relative">
      {/* Background Visuals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-blue/20 blur-[120px] rounded-full"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-violet/10 blur-[120px] rounded-full"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* Left Column: Branding & Features */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-16 relative z-10"
      >
        <motion.div variants={itemVariants}>
           <Link href="/" className="flex items-center space-x-3 mb-12 group">
              <motion.div 
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-10 h-10 rounded bg-accent-blue flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-accent-blue/20"
              >
                S
              </motion.div>
              <span className="text-2xl font-bold tracking-tighter text-text-primary">SOLAR</span>
           </Link>
           
           <h1 className="text-6xl font-bold tracking-tight text-text-primary leading-[1.1] mb-8">
             Build the future <span className="text-accent-blue">together.</span>
           </h1>
           <p className="text-xl text-text-secondary max-w-lg leading-relaxed">
             Join thousands of developers orchestrating the next generation of AI-driven infrastructure.
           </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8">
           {[
             { icon: Zap, color: 'text-accent-blue', title: 'Universal Deploy', desc: 'Vercel, AWS, Netlify, or your own K8s cluster.' },
             { icon: Globe, color: 'text-accent-violet', title: 'Global Sync', desc: 'Real-time synchronization across teams and repos.' },
             { icon: Sparkles, color: 'text-success', title: 'AI Orchestration', desc: 'Intelligent agents that debug and provision infra.' },
             { icon: ShieldCheck, color: 'text-warning', title: 'Enterprise Security', desc: 'RBAC, audit logs, and secrets management.' }
           ].map((feature, i) => (
             <motion.div key={i} variants={itemVariants} className="space-y-2">
                <div className="flex items-center space-x-2 text-text-primary font-bold">
                   <feature.icon size={18} className={feature.color} />
                   <span>{feature.title}</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">{feature.desc}</p>
             </motion.div>
           ))}
        </div>
      </motion.div>

      {/* Right Column: Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-xl space-y-8 bg-surface-secondary border border-border-subtle p-10 rounded-2xl shadow-2xl shadow-black/50"
        >
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary">Create your organization</h2>
            <p className="text-sm text-text-muted">Start your 14-day free trial. No credit card required.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 bg-surface-primary border border-border-muted rounded-md pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:border-accent-blue transition-all"
                    placeholder="Alex Rivera"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">Organization Name</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full h-11 bg-surface-primary border border-border-muted rounded-md pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:border-accent-blue transition-all"
                    placeholder="solar-dev"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 bg-surface-primary border border-border-muted rounded-md pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:border-accent-blue transition-all"
                    placeholder="alex@solar.dev"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 bg-surface-primary border border-border-muted rounded-md pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:border-accent-blue transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isLoading !== null}
              type="submit" 
              className="w-full h-12 bg-accent-blue hover:bg-blue-600 text-white rounded-md font-bold transition-all shadow-lg shadow-accent-blue/20 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading === 'email' ? <Loader2 size={18} className="animate-spin" /> : (
                <>
                  <UserPlus size={18} />
                  <span>Create Account</span>
                </>
              )}
            </motion.button>
          </form>

          <div className="relative">
             <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border-muted"></div></div>
             <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                <span className="bg-surface-secondary px-4 text-text-muted">Or sign up with</span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <motion.button 
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               disabled={isLoading !== null}
               onClick={() => handleOAuthLogin('github')}
               className="h-11 border border-border-muted rounded-md flex items-center justify-center space-x-2 text-sm font-medium text-text-primary hover:bg-surface-tertiary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
             >
                {isLoading === 'github' ? <Loader2 size={18} className="animate-spin" /> : (
                  <>
                    <Github size={18} />
                    <span>GitHub</span>
                  </>
                )}
             </motion.button>
             <motion.button 
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               disabled={isLoading !== null}
               onClick={() => handleOAuthLogin('google')}
               className="h-11 border border-border-muted rounded-md flex items-center justify-center space-x-2 text-sm font-medium text-text-primary hover:bg-surface-tertiary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
             >
                {isLoading === 'google' ? <Loader2 size={18} className="animate-spin" /> : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"/></svg>
                    <span>Google</span>
                  </>
                )}
             </motion.button>
          </div>

          <p className="text-center text-xs text-text-muted">
            Already have an account? <Link href="/login" className="text-accent-blue font-bold hover:text-blue-400 transition-colors">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
