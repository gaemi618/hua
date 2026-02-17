import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import CharacterShowcase from './components/CharacterShowcase';
import WorldSection from './components/WorldSection';
import SocialFeed from './components/SocialFeed';
import IntroOverlay from './components/IntroOverlay';
import { SectionType } from './types';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<SectionType>(SectionType.INTRO);
  const [hasEntered, setHasEntered] = useState(false);

  const scrollToSection = (section: SectionType) => {
    setCurrentSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update current section on scroll
  useEffect(() => {
    if (!hasEntered) return;
    
    const handleScroll = () => {
      const sections = Object.values(SectionType);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -100 && rect.top < window.innerHeight / 2) {
            setCurrentSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasEntered]);

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-tianhua-purple selection:text-white">
      
      {!hasEntered && <IntroOverlay onEnter={() => setHasEntered(true)} />}

      <div className={`transition-opacity duration-1000 ${hasEntered ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        <Navigation currentSection={currentSection} onNavigate={scrollToSection} />

        <main>
          <div id={SectionType.INTRO}>
            <HeroSection onScrollDown={() => scrollToSection(SectionType.CHARACTERS)} />
          </div>

          <div id={SectionType.CHARACTERS} className="bg-gradient-to-b from-black to-tianhua-dark min-h-screen border-t border-white/5">
            <CharacterShowcase />
          </div>

          <div id={SectionType.WORLD} className="bg-tianhua-dark min-h-screen">
            <WorldSection />
          </div>

          <div id={SectionType.SOCIAL} className="bg-gradient-to-b from-tianhua-dark to-black min-h-screen flex flex-col justify-center">
            <div className="text-center mb-8 pt-20">
               <h2 className="text-3xl md:text-4xl font-display text-white mb-2">Secret Feed</h2>
               <p className="text-gray-400">@celestial_hua</p>
            </div>
            <SocialFeed />
          </div>
        </main>

        <footer className="py-12 border-t border-white/10 bg-black text-center">
          <p className="text-tianhua-gold font-display text-xl mb-4">거짓의 덫, 진실의 패악</p>
          <p className="text-gray-600 text-xs uppercase tracking-widest">
            © 2024 Hou Tianhua Archive. All rights reserved.<br/>
            Beware of the beautiful lies.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;