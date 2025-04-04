"use client";

import { useEffect, useState, useRef } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
  blinkWhenComplete?: boolean; // Nova prop para controlar o efeito de piscar
  blinkSpeed?: number; // Velocidade do piscar (opcional)
}

export const TypewriterEffect = ({
  text,
  speed = 30,
  delay = 0,
  className = '',
  cursor = true,
  blinkWhenComplete = false, // Padrão desligado
  blinkSpeed = 500 // Velocidade padrão do piscar
}: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isBlinking, setIsBlinking] = useState(false);
  const animationRef = useRef<NodeJS.Timeout>();
  const currentIndexRef = useRef(0);

  useEffect(() => {
    // Reset completo ao mudar o texto
    setDisplayedText('');
    currentIndexRef.current = 0;
    setIsBlinking(false);
    
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }

    const typeCharacter = () => {
      if (currentIndexRef.current < text.length) {
        setDisplayedText(prev => {
          // Garante que não ultrapasse o tamanho do texto
          if (currentIndexRef.current >= text.length) return prev;
          return prev + text[currentIndexRef.current];
        });
        currentIndexRef.current++;
        animationRef.current = setTimeout(typeCharacter, speed);
      } else if (blinkWhenComplete) {
        // Ativa o efeito de piscar quando terminar
        setIsBlinking(true);
      }
    };

    animationRef.current = setTimeout(typeCharacter, delay);

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [text, speed, delay, blinkWhenComplete]);

  return (
    <span className={`${className} ${isBlinking ? 'animate-pulse' : ''}`}>
      {displayedText}
      {cursor && <span className="ml-1 animate-pulse">|</span>}
    </span>
  );
};