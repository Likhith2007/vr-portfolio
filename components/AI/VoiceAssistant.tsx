'use client';

import { useState } from 'react';
import Button from '@/components/Shared/Button';

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  
  const handleToggle = () => {
    setIsListening(!isListening);
    // Future integration point for Web Speech API / AI backend
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'var(--space-xl)',
        right: 'var(--space-xl)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      {isListening && (
        <div
          className="animate-fade-in"
          style={{
            background: 'var(--glass-bg)',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--neon-cyan)',
            color: 'var(--neon-cyan)',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
          }}
        >
          Listening for commands...
        </div>
      )}
      
      <Button
        variant={isListening ? 'secondary' : 'primary'}
        size="md"
        glowing={isListening}
        onClick={handleToggle}
        style={{
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          padding: 0,
        }}
      >
        {isListening ? '🎙️' : '🎤'}
      </Button>
    </div>
  );
}
