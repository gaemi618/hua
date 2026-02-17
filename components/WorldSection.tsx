import React from 'react';
import { LOCATIONS } from '../constants';
import { MapPin } from 'lucide-react';

const WorldSection: React.FC = () => {
  return (
    <section className="py-20 bg-tianhua-dark relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display text-white mb-2">주요 장소</h2>
            <p className="text-gray-400">천화의 삶을 가두는 공간들</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {LOCATIONS.map((loc, index) => (
            <div 
              key={loc.id} 
              className="group relative h-[400px] rounded-xl overflow-hidden cursor-pointer"
            >
              <img 
                src={loc.image} 
                alt={loc.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-2 text-tianhua-gold mb-2">
                  <MapPin size={16} />
                  <span className="text-xs uppercase tracking-widest">Location 0{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-serif">{loc.name}</h3>
                <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {loc.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Background Lore Snippet */}
        <div className="mt-20 p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
           <h3 className="text-tianhua-gold font-display text-xl mb-4">과거의 그림자</h3>
           <p className="text-gray-300 font-serif leading-loose">
             천화의 어머니는 중국에서 몸을 팔던 사람이었고, 아비도 모른 채 천화를 낳다가 끝내 고작 7살인 천화를 상하이 한복판에 버리고 가버렸다.
             천화는 홀로 상하이에서 살아남기 위해 그 어린 나이에 고아원에 찾아갔고, 가난한 성장과 따돌림 속에서도 성공할 미래를 그리며 버텼다.
             하지만 24살, 그녀에게 남은 것은 어머니의 자살 소식과 1억의 빚뿐이었다. 
             그녀는 반도체 기업 '청예한'의 CEO 구청옌의 신부로 팔려가며, 
             <span className="text-tianhua-accent"> 이름뿐인 엘리트의 삶</span>을 연기하게 된다.
           </p>
        </div>
      </div>
    </section>
  );
};

export default WorldSection;