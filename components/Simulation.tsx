import React, { useState, useEffect, useRef } from 'react';
import { CHARACTERS } from '../constants';
import { Send, User } from 'lucide-react';

interface Message {
  id: number;
  sender: 'user' | 'tianhua';
  text: string;
}

const Simulation: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'tianhua', text: '...누구시죠? 여긴 함부로 들어올 수 있는 곳이 아닐 텐데.' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const tianhua = CHARACTERS.find(c => c.id === 'tianhua')!;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: 'user',
      text: inputText
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulated simple logic for response
    setTimeout(() => {
      let responseText = "흐음... 글쎄요. 그런 말은 흥미롭지 않네요.";
      const lowerInput = newMsg.text.toLowerCase();

      if (lowerInput.includes('도와') || lowerInput.includes('구원') || lowerInput.includes('사랑')) {
        responseText = "도와준다고...? 하, 당신이 뭘 안다고 그런 소릴 지껄여? ...하지만, 정말이라면 증명해봐요.";
      } else if (lowerInput.includes('안녕') || lowerInput.includes('반가워')) {
        responseText = "만나서 반가워요. 후천화라고 해요. 차라도 한 잔 내올까요?";
      } else if (lowerInput.includes('예쁘') || lowerInput.includes('아름다')) {
        responseText = "어머, 칭찬 고마워요. 당연한 사실이지만, 듣기 나쁘진 않네. (웃으며 머리카락을 꼰다)";
      }

      const replyMsg: Message = {
        id: Date.now() + 1,
        sender: 'tianhua',
        text: responseText
      };
      
      setMessages(prev => [...prev, replyMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section className="py-20 px-4 md:px-0">
      <div className="max-w-4xl mx-auto bg-black/40 border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[600px] shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-tianhua-purple to-indigo-900 p-4 flex items-center gap-4">
          <div className="relative">
            <img 
              src={tianhua.image} 
              alt="Avatar" 
              className="w-12 h-12 rounded-full border-2 border-white/30 object-cover"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-black"></div>
          </div>
          <div>
            <h3 className="text-white font-bold">후천화 (Hou Tianhua)</h3>
            <p className="text-purple-200 text-xs flex items-center gap-1">
              <span>Online</span> • <span>Roleplay Preview</span>
            </p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-[fadeIn_0.3s_ease-out]`}
            >
              <div 
                className={`max-w-[80%] rounded-2xl p-4 text-sm md:text-base leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-tianhua-purple text-white rounded-br-none' 
                    : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/5'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="flex justify-start animate-pulse">
               <div className="bg-white/10 text-gray-400 rounded-2xl rounded-bl-none px-4 py-2 text-xs border border-white/5">
                 후천화님이 입력 중...
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black/60 border-t border-white/10 flex gap-2">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="그녀에게 말을 걸어보세요..."
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-tianhua-gold/50 transition-colors placeholder-gray-500"
          />
          <button 
            onClick={handleSend}
            className="bg-tianhua-gold text-black rounded-full p-3 hover:bg-yellow-500 transition-colors disabled:opacity-50"
            disabled={!inputText.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Simulation;