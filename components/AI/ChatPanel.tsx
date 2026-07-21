'use client';

import { useState, useRef, useEffect } from 'react';
import Button from '@/components/Shared/Button';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export default function ChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: 'Hello! I am the portfolio AI assistant. Ask me anything about this developer.' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'This is a mocked response. Connect a backend (like OpenAI) to provide real answers based on the profile data.'
      }]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          top: 'var(--space-xl)',
          right: 'calc(var(--space-xl) + 140px)', // Offset from minimap
          zIndex: 90,
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(10px)',
        }}
      >
        💬 Chat with AI
      </Button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 'var(--space-xl)',
        right: 'var(--space-xl)',
        width: '320px',
        height: '450px',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        zIndex: 110,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 0 20px rgba(0, 245, 255, 0.1)',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '1rem',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3 style={{ margin: 0, color: 'var(--neon-cyan)', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
          AI ASSISTANT
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        padding: '1rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              background: msg.sender === 'user' ? 'rgba(0, 245, 255, 0.1)' : 'rgba(26, 26, 46, 0.5)',
              border: `1px solid ${msg.sender === 'user' ? 'var(--neon-cyan)' : 'var(--border-subtle)'}`,
              padding: '0.6rem 0.8rem',
              borderRadius: 'var(--radius-md)',
              maxWidth: '85%',
              fontSize: '0.85rem',
              color: 'var(--text-primary)',
              lineHeight: 1.4,
            }}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} style={{ padding: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          style={{
            flex: 1,
            background: 'rgba(0,0,0,0.2)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.5rem',
            color: 'white',
            outline: 'none',
          }}
        />
        <Button type="submit" variant="primary" size="sm">SEND</Button>
      </form>
    </div>
  );
}
