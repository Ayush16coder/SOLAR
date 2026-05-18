'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Editor from '@monaco-editor/react';
import { io, Socket } from 'socket.io-client';
import api from '@/lib/api';
import MainLayout from '@/components/layout/MainLayout';
import MonitoringPanel from '@/components/monitoring/MonitoringPanel';
import { 
  Folder, 
  File, 
  ChevronRight, 
  ChevronDown, 
  Save, 
  GitBranch, 
  Play, 
  Sparkles,
  Search,
  Settings,
  MoreHorizontal,
  History,
  Terminal as TerminalIcon,
  Plus
} from 'lucide-react';

export default function EditorPage() {
  const { projectId } = useParams();
  const [fileTree, setFileTree] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | undefined>(undefined);
  const [fileContent, setFileContent] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [showMonitoring, setShowMonitoring] = useState(true);
  const editorRef = useRef(null);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001');
    setSocket(newSocket);
    newSocket.emit('join', `project:${projectId}`);

    newSocket.on('event', (event: any) => {
      if (event.type === 'CODE_CHANGED' && event.sender !== newSocket.id) {
        if (selectedFile === event.path) {
          setFileContent(event.content);
        }
      }
    });

    const fetchTree = async () => {
      try {
        const { data: project } = await api.get(`/workspaces/projects/${projectId}`);
        const [owner, repo] = project.repoUrl.split('github.com/')[1].split('/');
        const { data: tree } = await api.get(`/fs/tree`, {
          params: { workspaceId: project.workspaceId, owner, repo }
        });
        setFileTree(tree);
      } catch (err) {
        console.error('Failed to fetch tree', err);
      }
    };

    fetchTree();
    return () => { newSocket.disconnect(); };
  }, [projectId]);

  const handleFileClick = async (file: any) => {
    if (file.type === 'blob') {
      setSelectedFile(file.path);
      try {
        const { data: project } = await api.get(`/workspaces/projects/${projectId}`);
        const [owner, repo] = project.repoUrl.split('github.com/')[1].split('/');
        const { data: content } = await api.get(`/fs/file`, {
          params: { workspaceId: project.workspaceId, owner, repo, path: file.path }
        });
        setFileContent(content);
      } catch (err) {
        console.error('Failed to fetch file content', err);
      }
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value === undefined) return;
    setFileContent(value);
    if (socket && selectedFile) {
      socket.emit('code_change', {
        room: `project:${projectId}`,
        data: { path: selectedFile, content: value }
      });
    }
  };

  const handleSave = async () => {
    if (!selectedFile) return;
    try {
      const { data: project } = await api.get(`/workspaces/projects/${projectId}`);
      const [owner, repo] = project.repoUrl.split('github.com/')[1].split('/');
      await api.post(`/fs/file`, {
        workspaceId: project.workspaceId,
        owner,
        repo,
        path: selectedFile,
        content: fileContent,
        message: `Update ${selectedFile} via Solar IDE`
      });
      alert('Changes synchronized with GitHub');
    } catch (err) {
      alert('Sync failed');
    }
  };

  return (
    <MainLayout>
      <div className="flex h-full overflow-hidden bg-surface-primary">
        {/* Explorer Sidebar */}
        <aside className="w-64 border-r border-border-subtle flex flex-col bg-surface-primary">
          <div className="h-10 flex items-center justify-between px-4 border-b border-border-subtle bg-surface-secondary/50">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Explorer</span>
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:text-text-primary text-text-muted transition-colors"><Search size={14} /></button>
              <button className="p-1 hover:text-text-primary text-text-muted transition-colors"><Plus size={14} /></button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            {fileTree.map((item) => (
              <div
                key={item.path}
                className={`flex items-center space-x-2 p-1.5 px-3 rounded-md cursor-pointer transition-all group ${selectedFile === item.path ? 'bg-accent-blue/10 text-accent-blue' : 'hover:bg-surface-secondary text-text-secondary hover:text-text-primary'}`}
                style={{ paddingLeft: `${(item.path.split('/').length - 1) * 12 + 12}px` }}
                onClick={() => handleFileClick(item)}
              >
                {item.type === 'tree' ? <Folder size={14} className="text-text-muted group-hover:text-text-secondary" /> : <File size={14} className="text-text-muted group-hover:text-text-secondary" />}
                <span className="text-xs truncate font-medium">{item.path.split('/').pop()}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-10 bg-surface-secondary border-b border-border-subtle flex items-center justify-between px-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-[11px] font-medium text-text-secondary">
                <File size={12} />
                <span>{selectedFile || 'Select a file to begin'}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button onClick={handleSave} className="flex items-center space-x-2 text-[11px] font-bold text-text-muted hover:text-text-primary transition-colors">
                <Save size={14} />
                <span>Sync</span>
              </button>
              <div className="h-4 w-px bg-border-muted mx-1"></div>
              <button className="flex items-center space-x-2 text-[11px] font-bold text-text-muted hover:text-text-primary transition-colors">
                <GitBranch size={14} />
                <span>main</span>
              </button>
              <button className="flex items-center space-x-2 bg-accent-blue hover:bg-blue-600 text-white px-3 py-1 rounded text-[11px] font-bold transition-all shadow-lg shadow-accent-blue/20">
                <Play size={12} />
                <span>Deploy</span>
              </button>
              <button className="p-1 text-text-muted hover:text-text-primary transition-colors"><MoreHorizontal size={14} /></button>
            </div>
          </header>

          <div className="flex-1 relative bg-[#0D0D0E]">
            <Editor
              height="100%"
              theme="vs-dark"
              path={selectedFile}
              value={fileContent}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily: 'var(--font-mono)',
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: !selectedFile,
                automaticLayout: true,
                padding: { top: 16 },
                cursorSmoothCaretAnimation: 'on',
                smoothScrolling: true,
                renderLineHighlight: 'all',
                scrollbar: {
                   vertical: 'hidden',
                   horizontal: 'hidden'
                }
              }}
            />
          </div>

          {/* Monitoring Panel Toggle */}
          <div className="h-8 bg-surface-secondary border-t border-border-subtle flex items-center px-4 justify-between">
             <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setShowMonitoring(!showMonitoring)}
                  className={`flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${showMonitoring ? 'text-accent-blue' : 'text-text-muted hover:text-text-secondary'}`}
                >
                  <TerminalIcon size={12} />
                  <span>Output & Logs</span>
                </button>
                <button className="flex items-center space-x-2 text-[10px] font-bold text-text-muted hover:text-text-secondary uppercase tracking-wider">
                  <History size={12} />
                  <span>Timeline</span>
                </button>
             </div>
             <div className="flex items-center space-x-3 text-[10px] text-text-muted font-mono">
                <span>UTF-8</span>
                <span>TypeScript</span>
                <span className="text-success">Connected</span>
             </div>
          </div>

          {showMonitoring && (
            <div className="h-64 border-t border-border-subtle">
              <MonitoringPanel projectId={projectId as string} socket={socket} />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
