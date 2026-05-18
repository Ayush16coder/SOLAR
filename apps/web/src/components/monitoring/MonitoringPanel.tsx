'use client';

import { useEffect, useState } from 'react';
import { Terminal, Activity, Zap, ShieldCheck } from 'lucide-react';
import api from '@/lib/api';

export default function MonitoringPanel({ projectId, socket }: { projectId: string; socket: any }) {
  const [logs, setLogs] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>({ cpu: 0, memory: 0, responseTime: 0 });
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    if (!socket) return;

    // Listen for real-time logs
    socket.on('event', (event: any) => {
      if (event.type === 'LOG_ENTRY') {
        setLogs((prev) => [event, ...prev].slice(0, 100));
      }
      if (event.type === 'AI_LOG_ANALYSIS') {
        // Find the log and attach analysis
        setLogs((prev) => prev.map(l => l.id === event.logId ? { ...l, aiAnalysis: event.analysis } : l));
      }
    });

    const fetchInitialData = async () => {
      try {
        const [metricsRes, healthRes] = await Promise.all([
          api.get(`/monitoring/metrics/${projectId}`),
          api.get(`/monitoring/health/${projectId}`),
        ]);
        setMetrics(metricsRes.data[0]);
        setHealth(healthRes.data);
      } catch (err) {
        console.error('Failed to fetch monitoring data', err);
      }
    };

    fetchInitialData();
  }, [projectId, socket]);

  return (
    <div className="h-64 bg-[#1e1e1e] border-t border-gray-800 flex overflow-hidden">
      {/* Metrics Section */}
      <div className="w-64 border-r border-gray-800 p-4 space-y-4 overflow-y-auto">
        <div className="flex items-center space-x-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
          <Activity size={14} />
          <span>Real-time Metrics</span>
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          <div className="bg-[#252526] p-2 rounded">
            <div className="text-[10px] text-gray-500 uppercase">CPU Usage</div>
            <div className="text-lg font-mono text-blue-400">{metrics.cpu}%</div>
            <div className="w-full bg-gray-800 h-1 mt-1 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full" style={{ width: `${metrics.cpu}%` }}></div>
            </div>
          </div>
          <div className="bg-[#252526] p-2 rounded">
            <div className="text-[10px] text-gray-500 uppercase">Memory</div>
            <div className="text-lg font-mono text-green-400">{metrics.memory}MB</div>
          </div>
        </div>

        {health && (
          <div className="pt-4 border-t border-gray-800">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-500">Health Score</span>
              <span className="text-green-500 font-bold">{health.score}</span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-gray-400">
              <ShieldCheck size={12} className="text-green-500" />
              <span>System Operational</span>
            </div>
          </div>
        )}
      </div>

      {/* Logs Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-8 bg-[#252526] border-b border-gray-800 flex items-center px-4 space-x-4">
          <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <Terminal size={12} />
            <span>Unified Logs</span>
          </div>
          <div className="flex space-x-2">
             <span className="text-[10px] bg-blue-900/50 text-blue-400 px-1 rounded">All</span>
             <span className="text-[10px] text-gray-500 hover:text-gray-300 cursor-pointer">Build</span>
             <span className="text-[10px] text-gray-500 hover:text-gray-300 cursor-pointer">Runtime</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto font-mono text-[11px] p-2 space-y-1 bg-black/20">
          {logs.length === 0 && <div className="text-gray-600 italic">Waiting for logs...</div>}
          {logs.map((log) => (
            <div key={log.id} className="group border-b border-gray-800/30 pb-1">
              <div className="flex items-start space-x-2">
                <span className="text-gray-600 shrink-0">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                <span className={`shrink-0 font-bold ${log.level === 'ERROR' ? 'text-red-500' : 'text-blue-500'}`}>{log.level}</span>
                <span className="text-gray-500 shrink-0">[{log.source}]</span>
                <span className="text-gray-300 break-all">{log.message}</span>
              </div>
              {log.aiAnalysis && (
                <div className="mt-1 ml-10 p-2 bg-blue-900/20 border-l-2 border-blue-500 text-blue-300 rounded-r">
                  <div className="flex items-center space-x-1 mb-1 font-bold text-[9px] uppercase">
                    <Zap size={10} />
                    <span>Solar AI Insight</span>
                  </div>
                  {log.aiAnalysis}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
