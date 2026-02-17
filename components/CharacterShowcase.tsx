import React, { useState } from 'react';
import { CHARACTERS } from '../constants';
import { Character } from '../types';
import { Lock, Unlock, Sparkles, AlertCircle } from 'lucide-react';

const CharacterCard: React.FC<{ character: Character; isHero?: boolean }> = ({ character, isHero = false }) => {
  const [showInner, setShowInner] = useState(false);
  const [easterEggFound, setEasterEggFound] = useState(false);

  // 이스터에그: 후천화의 이미지를 클릭했을 때
  const handleImageClick = (e: React.MouseEvent) => {
    if (character.id === 'tianhua') {
      // 이미지의 특정 영역을 누른 효과를 내기 위해 단순 클릭으로 구현
      setEasterEggFound(true);
      setTimeout(() => setEasterEggFound(false), 3000);
    }
  };

  return (
    <div className={`relative group ${isHero ? 'md:col-span-2 mb-12' : ''}`}>
      <div className={`glass-panel rounded-xl overflow-hidden transition-all duration-500 hover:border-tianhua-gold/30 ${isHero ? 'border-tianhua-gold/20 bg-tianhua-purple/5' : ''}`}>
        <div className={`grid ${isHero ? 'md:grid-cols-2' : 'grid-cols-1'} gap-0`}>
          
          {/* Image Side */}
          <div className="relative overflow-hidden cursor-pointer" onClick={handleImageClick}>
             {/* Height adjustment based on Hero status */}
            <div className={`${isHero ? 'h-[500px] md:h-[600px]' : 'h-[400px]'} w-full`}>
              <img 
                src={character.image} 
                alt={character.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[30%] group-hover:grayscale-0"
              />
            </div>
            <div className={`absolute inset-0 bg-gradient-to-t ${character.color} opacity-30 mix-blend-multiply`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
            
            {/* Identity Tag */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className={`text-xs tracking-[0.3em] uppercase mb-2 ${isHero ? 'text-tianhua-gold' : 'text-gray-500'}`}>
                {isHero ? 'The Protagonist' : 'Supporting Role'}
              </p>
              <h3 className={`font-display text-white ${isHero ? 'text-4xl md:text-5xl' : 'text-2xl'}`}>
                {character.name}
              </h3>
              <p className="text-gray-400 text-sm tracking-wider mt-2 font-serif">{character.role}</p>
            </div>

            {/* Easter Egg Overlay for Tianhua */}
            {easterEggFound && character.id === 'tianhua' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out] z-20">
                <div className="text-center p-6 border border-tianhua-gold/50 rounded-lg">
                  <Sparkles className="text-tianhua-gold mx-auto mb-2" size={24} />
                  <p className="text-tianhua-gold font-serif italic">"어딜 만지는 거야? ...조금 더 해도 돼."</p>
                  <p className="text-xs text-gray-500 mt-2 tracking-widest">[SECRET UNLOCKED]</p>
                </div>
              </div>
            )}
            
            {/* Click hint for Tianhua */}
            {character.id === 'tianhua' && !easterEggFound && (
              <div className="absolute top-4 right-4 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="text-[10px] text-white/50 border border-white/20 px-2 py-1 rounded-full">Click Me</span>
              </div>
            )}
          </div>

          {/* Info Side */}
          <div className="p-6 md:p-8 flex flex-col justify-between relative bg-black/20">
             {/* Background Pattern */}
             <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>

             <div className="relative z-10 space-y-6">
               <div className="flex flex-wrap gap-2 mb-4">
                  {character.tags.map(tag => (
                    <span key={tag} className={`px-3 py-1 text-xs border rounded-full ${isHero ? 'border-tianhua-gold/30 text-tianhua-gold/80 bg-tianhua-gold/5' : 'border-white/10 text-gray-500 bg-white/5'}`}>
                      {tag}
                    </span>
                  ))}
               </div>

               {character.details && (
                 <>
                   <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm uppercase tracking-widest font-bold ${showInner ? 'text-red-500 animate-pulse' : 'text-gray-400'}`}>
                           {showInner ? '/// DEPTHS OF MIND ///' : 'SURFACE PERSONA'}
                        </h4>
                        {character.id === 'tianhua' && (
                           <button 
                             onClick={() => setShowInner(!showInner)}
                             className="text-xs flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                           >
                             {showInner ? <Unlock size={14}/> : <Lock size={14}/>}
                             <span>{showInner ? '본성 숨기기' : '본성 확인하기'}</span>
                           </button>
                        )}
                      </div>
                      
                      <p className={`leading-relaxed font-serif text-lg transition-all duration-500 ${showInner ? 'text-red-200' : 'text-gray-300'}`}>
                        {showInner ? character.details.personality.inner : character.details.personality.surface}
                      </p>
                      
                      <div className="pt-4 border-t border-white/5">
                        <p className="font-display italic text-2xl text-white/20">"</p>
                        <p className={`-mt-4 pl-6 italic text-sm ${showInner ? 'text-red-400' : 'text-gray-400'}`}>
                           {showInner && character.details.quotes[1] ? character.details.quotes[1] : character.details.quotes[0]}
                        </p>
                      </div>
                   </div>
                 </>
               )}
             </div>

             {/* Stats/Details Footer */}
             {character.details && (
               <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5 relative z-10 text-xs text-gray-500 font-mono">
                  <div>
                    <span className="block text-gray-700 mb-1">LIKES</span>
                    <span className="text-gray-400">{character.details.likes.join(', ')}</span>
                  </div>
                  <div>
                    <span className="block text-gray-700 mb-1">DISLIKES</span>
                    <span className="text-gray-400">{character.details.dislikes.join(', ')}</span>
                  </div>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CharacterShowcase: React.FC = () => {
  const tianhua = CHARACTERS.find(c => c.id === 'tianhua');
  const others = CHARACTERS.filter(c => c.id !== 'tianhua');

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center space-y-6 mb-20">
        <h2 className="text-4xl md:text-5xl font-display text-white">등장인물</h2>
        <p className="text-gray-400 max-w-2xl mx-auto font-serif italic">
          거짓으로 얽힌 인연, 그리고 파멸의 기록
        </p>
      </div>

      {/* Main Protagonist Section */}
      {tianhua && <CharacterCard character={tianhua} isHero={true} />}

      {/* Supporting Cast Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {others.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>
    </section>
  );
};

export default CharacterShowcase;