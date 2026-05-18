'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { Send, Bot, User, Sparkles } from 'lucide-react';

export default function AIChatPanel() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Hello! I am your Solar AI assistant. How can I help you with your deployment today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: 'human', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const { data } = await api.post('/ai/chat', { messages: newMessages });
      setMessages([...newMessages, { role: 'assistant', content: data }]);
    } catch (err) {
      console.error('AI Chat failed', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-l border-gray-800 w-80">
      <div className="p-4 border-b border-gray-800 flex items-center space-x-2">
        <Sparkles size={18} className="text-blue-400" />
        <span className="font-bold text-sm uppercase tracking-wider">AI Assistant</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.filter(m => m.role !== 'system').map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'human' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-2 rounded text-xs ${msg.role === 'human' ? 'bg-blue-600' : 'bg-gray-800'}`}>
              <div className="flex items-center space-x-1 mb-1 opacity-50">
                {msg.role === 'human' ? <User size={10} /> : <Bot size={10} />}
                <span>{msg.role === 'human' ? 'You' : 'Solar AI'}</span>
              </div>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-xs text-gray-500 italic animate-pulse">Thinking...</div>}
      </div>

      <div className="p-4 border-t border-gray-800">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
            placeholder="Ask AI for help..."
            className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-xs focus:outline-none focus:border-blue-500 resize-none"
            rows={2}
          />
          <button 
            onClick={sendMessage}
            className="absolute right-2 bottom-2 p-1 bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            <Send size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
