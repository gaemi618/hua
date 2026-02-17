import React, { useState } from 'react';
import { APP_TITLE, APP_SUBTITLE } from '../constants';
import { Fingerprint } from 'lucide-react';

interface IntroOverlayProps {
  onEnter: () => void;
}

const IntroOverlay: React.FC<IntroOverlayProps> = ({ onEnter }) => {
  const [isFading, setIsFading] = useState(false);

  const handleEnter = () => {
    setIsFading(true);
    setTimeout(() => {
      onEnter();
    }, 1500); // Wait for animation
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="max-w-2xl px-6 text-center space-y-8 relative">
        {/* Mysterious decorative line */}
        <div className="h-20 w-[1px] bg-gradient-to-b from-transparent via-tianhua-gold to-transparent mx-auto absolute -top-32 left-1/2 transform -translate-x-1/2"></div>

        <p className="text-gray-500 font-serif tracking-widest text-sm animate-pulse">
          WARNING: OBSESSION & REDEMPTION
        </p>

        <h1 className="text-4xl md:text-6xl font-display text-white tracking-widest leading-tight">
          <span className="block text-gray-700 blur-[2px] hover:blur-0 transition-all duration-700 select-none">
            TRUTH
          </span>
          <span className="block text-tianhua-gold scale-110 transform my-4">
            IS A
          </span>
          <span className="block text-gray-700 blur-[2px] hover:blur-0 transition-all duration-700 select-none">
            TRAP
          </span>
        </h1>

        <div className="py-12">
          <button 
            onClick={handleEnter}
            className="group relative inline-flex flex-col items-center gap-4 transition-all duration-500 hover:scale-105"
          >
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:border-tianhua-gold group-hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all bg-black/50 backdrop-blur-sm">
              <Fingerprint className="text-white/50 group-hover:text-tianhua-gold transition-colors" size={32} />
            </div>
            <span className="text-xs uppercase tracking-[0.3em] text-gray-500 group-hover:text-white transition-colors">
              Touch to Break the Illusion
            </span>
          </button>
        </div>

        <p className="text-xs text-gray-800 font-mono absolute bottom-[-100px] left-0 right-0">
          모든 것은 거짓말로부터 시작되었다.
        </p>
      </div>
    </div>
  );
};

export default IntroOverlay;