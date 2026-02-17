import React, { useState, useEffect } from 'react';
import { SectionType } from '../types';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  currentSection: SectionType;
  onNavigate: (section: SectionType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'INTRO', value: SectionType.INTRO },
    { label: 'CHARACTERS', value: SectionType.CHARACTERS },
    { label: 'WORLD', value: SectionType.WORLD },
    { label: 'SOCIAL', value: SectionType.SOCIAL },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="text-2xl font-serif text-white cursor-pointer tracking-widest hover:text-tianhua-gold transition-colors"
          onClick={() => onNavigate(SectionType.INTRO)}
        >
          TIANHUA
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => onNavigate(item.value)}
              className={`text-sm tracking-[0.2em] transition-all duration-300 relative group ${
                currentSection === item.value ? 'text-tianhua-gold' : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-2 left-0 h-[1px] bg-tianhua-gold transition-all duration-300 ${
                currentSection === item.value ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 border-b border-white/10 p-6 flex flex-col space-y-4">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                onNavigate(item.value);
                setIsMobileMenuOpen(false);
              }}
              className={`text-left text-sm tracking-[0.2em] py-2 ${
                currentSection === item.value ? 'text-tianhua-gold' : 'text-gray-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;