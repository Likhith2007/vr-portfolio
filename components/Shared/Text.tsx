'use client';

import { useState, useEffect, type HTMLAttributes } from 'react';

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
  effect?: 'typewriter' | 'glitch' | 'none';
  typeSpeed?: number;
  glitchDuration?: number;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4';
  neon?: boolean;
  onComplete?: () => void;
}

export default function Text({
  text,
  effect = 'none',
  typeSpeed = 40,
  glitchDuration = 300,
  as: Tag = 'span',
  neon = false,
  onComplete,
  className = '',
  ...props
}: TextProps) {
  const [displayText, setDisplayText] = useState(effect === 'typewriter' ? '' : text);
  const [isGlitching, setIsGlitching] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (effect !== 'typewriter') return;
    setDisplayText('');
    let index = 0;
    const timer = setInterval(() => {
      index++;
      setDisplayText(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(timer);
        onComplete?.();
      }
    }, typeSpeed);
    return () => clearInterval(timer);
  }, [text, effect, typeSpeed]);

  // Glitch effect
  useEffect(() => {
    if (effect !== 'glitch') return;
    setIsGlitching(true);
    const chars = '!@#$%^&*()_+{}|:<>?';
    let frame = 0;
    const totalFrames = Math.ceil(glitchDuration / 30);

    const timer = setInterval(() => {
      frame++;
      if (frame >= totalFrames) {
        setDisplayText(text);
        setIsGlitching(false);
        clearInterval(timer);
        onComplete?.();
        return;
      }
      // Progressively reveal real characters
      const revealed = Math.floor((frame / totalFrames) * text.length);
      const glitched = text
        .split('')
        .map((char, i) => {
          if (i < revealed) return char;
          if (char === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      setDisplayText(glitched);
    }, 30);

    return () => clearInterval(timer);
  }, [text, effect, glitchDuration]);

  const neonClass = neon ? 'neon-text' : '';
  const glitchClass = isGlitching ? 'animate-glitch' : '';

  return (
    <Tag className={`${neonClass} ${glitchClass} ${className}`} {...props}>
      {displayText}
      {effect === 'typewriter' && displayText.length < text.length && (
        <span className="animate-[neonPulse_0.5s_ease-in-out_infinite] ml-0.5">▌</span>
      )}
    </Tag>
  );
}
