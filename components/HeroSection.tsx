import React from 'react';
import { ChevronDown } from 'lucide-react';
import { APP_TITLE, APP_SUBTITLE } from '../constants';

interface HeroSectionProps {
  onScrollDown: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollDown }) => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-black">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover opacity-30 scale-105 grayscale hover:grayscale-0 transition-all duration-[5s]"
          poster="https://picsum.photos/seed/shanghai_rain_dark/1920/1080"
        >
            {/* Fallback image if video not available, simulated with img tag for now */}
            <img src="https://picsum.photos/seed/shanghai_rain_dark/1920/1080" alt="Background" className="w-full h-full object-cover" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-tianhua-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto space-y-10">
        <div className="inline-block animate-[fadeIn_2s_ease-out]">
          <span className="text-red-700/80 font-bold tracking-[0.5em] text-xs md:text-sm uppercase border-b border-red-900/30 pb-2 mb-4 block">
            The Protagonist: 后天花
          </span>
        </div>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl text-white mb-2 tracking-tighter leading-none drop-shadow-2xl mix-blend-screen">
          <span className="block text-white/90">거짓의 덫,</span>
          <span className="block mt-4 text-tianhua-purple/90 font-display italic">
            진실의 패악
          </span>
        </h1>

        <p className="text-gray-500 text-sm md:text-lg font-mono tracking-widest uppercase opacity-80">
          {APP_SUBTITLE}
        </p>

        <p className="text-gray-400 mt-12 max-w-xl mx-auto leading-relaxed text-sm md:text-base font-light border-l-2 border-tianhua-gold/20 pl-6 text-left">
          "사랑받고 싶어서 나를 팔았어. 그게 잘못이야?"<br/><br/>
          세상 모든 것이 거짓인 여자 <strong className="text-tianhua-gold font-serif">후천화</strong>.<br/>
          그녀의 지옥 같은 천국에 오신 것을 환영합니다.
        </p>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={onScrollDown}
        className="absolute bottom-10 z-10 text-white/30 hover:text-red-500 transition-colors duration-500 animate-pulse cursor-pointer group"
      >
        <span className="text-[10px] uppercase tracking-widest mb-2 block group-hover:text-white transition-colors">Start the Story</span>
        <ChevronDown size={24} className="mx-auto" />
      </button>
    </section>
  );
};

export default HeroSection;