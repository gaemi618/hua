import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SOCIAL_POSTS, CHARACTERS } from '../constants';
import { Heart, MessageCircle, Share2, Bookmark, Grid, User, X, MoreHorizontal, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { SocialPost, Comment } from '../types';

interface Story {
  id: number;
  image: string;
  type: 'image'; // could extend to video later
  duration: number; // in seconds
  timeAgo: string;
}

const STORIES: Story[] = [
  {
    id: 1,
    image: 'https://i.postimg.cc/mrHvtrZY/inseu1.png', // inseu1
    type: 'image',
    duration: 5,
    timeAgo: '10h'
  },
  {
    id: 2,
    image: 'https://i.postimg.cc/TPDzpP2r/inseu2.png', // inseu2
    type: 'image',
    duration: 5,
    timeAgo: '6h'
  },
  {
    id: 3,
    image: 'https://i.postimg.cc/N0H350Gb/inseu3.png', // inseu3
    type: 'image',
    duration: 5,
    timeAgo: '2h'
  },
  {
    id: 4,
    image: 'https://i.postimg.cc/k4Pk8dD1/inseu4.png', // inseu4
    type: 'image',
    duration: 5,
    timeAgo: '1h'
  }
];

const SocialFeed: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState('');
  const [isFollowed, setIsFollowed] = useState(false);
  
  // Story States
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);
  const [likedStories, setLikedStories] = useState<number[]>([]);
  
  const commentSectionRef = useRef<HTMLDivElement>(null);
  const storyTimerRef = useRef<number | null>(null);
  
  const tianhua = CHARACTERS.find(c => c.id === 'tianhua')!;
  // Use socialImage if available, otherwise fallback to main image
  const profileImage = tianhua.socialImage || tianhua.image;

  // --- Story Logic ---
  
  const startStoryTimer = useCallback(() => {
    if (storyTimerRef.current) clearInterval(storyTimerRef.current);
    
    const duration = STORIES[currentStoryIndex].duration * 1000;
    const interval = 50; // update every 50ms
    const step = 100 / (duration / interval);

    setStoryProgress(0);

    storyTimerRef.current = window.setInterval(() => {
      setStoryProgress(prev => {
        if (prev >= 100) {
          handleNextStory();
          return 100;
        }
        return prev + step;
      });
    }, interval);
  }, [currentStoryIndex]);

  const handleNextStory = useCallback(() => {
    if (currentStoryIndex < STORIES.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setStoryProgress(0);
    } else {
      closeStory();
    }
  }, [currentStoryIndex]);

  const handlePrevStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setStoryProgress(0);
    } else {
      setStoryProgress(0); // Reset current story if it's the first one
    }
  }, [currentStoryIndex]);

  const openStory = () => {
    setIsStoryOpen(true);
    setCurrentStoryIndex(0);
    setStoryProgress(0);
  };

  const closeStory = () => {
    setIsStoryOpen(false);
    if (storyTimerRef.current) clearInterval(storyTimerRef.current);
    setStoryProgress(0);
  };

  const handleStoryLike = () => {
    const currentStoryId = STORIES[currentStoryIndex].id;
    setLikedStories(prev => {
      if (prev.includes(currentStoryId)) {
        return prev.filter(id => id !== currentStoryId);
      } else {
        return [...prev, currentStoryId];
      }
    });
  };

  useEffect(() => {
    if (isStoryOpen) {
      startStoryTimer();
    } else {
      if (storyTimerRef.current) clearInterval(storyTimerRef.current);
    }
    return () => {
      if (storyTimerRef.current) clearInterval(storyTimerRef.current);
    };
  }, [isStoryOpen, currentStoryIndex, startStoryTimer]);


  // --- Post Modal Logic ---

  useEffect(() => {
    if (selectedPost) {
      setIsLiked(false);
      setCommentInput('');
      // Use the specific comments for this post
      setComments(selectedPost.initialComments || []);
    }
  }, [selectedPost]);

  useEffect(() => {
    if (commentSectionRef.current) {
      commentSectionRef.current.scrollTop = commentSectionRef.current.scrollHeight;
    }
  }, [comments]);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleFollow = () => {
    setIsFollowed(!isFollowed);
  };

  const handleMessage = () => {
    window.open('https://share.crack.wrtn.ai/w7vlt0', '_blank', 'noopener,noreferrer');
  };

  const handlePostComment = () => {
    if (!commentInput.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      user: 'guest_user',
      text: commentInput,
      time: 'Just now',
      isOfficial: false
    };

    setComments(prev => [...prev, newComment]);
    setCommentInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePostComment();
    }
  };

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16 px-4">
        {/* Profile Picture with Story Trigger */}
        <div className="relative group cursor-pointer" onClick={openStory}>
          <div className="w-24 h-24 md:w-36 md:h-36 rounded-full p-[3px] bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 animate-[spin_4s_linear_infinite] group-hover:animate-none transition-all">
            <div className="w-full h-full rounded-full bg-black p-[2px]">
               <img 
                 src={profileImage} 
                 alt="Profile" 
                 className="w-full h-full rounded-full object-cover border border-white/10"
               />
            </div>
          </div>
          <div className="absolute bottom-1 right-1 bg-blue-500 rounded-full p-1 border-2 border-black z-10">
             <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
          </div>
          <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <span className="text-white text-xs font-bold bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">View Story</span>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <h2 className="text-2xl text-white font-light tracking-wide">celestial_hua</h2>
            <div className="flex gap-2">
               <button 
                 onClick={handleFollow}
                 className={`px-6 py-1.5 text-sm font-semibold rounded transition-all duration-200 ${
                   isFollowed 
                     ? 'bg-transparent border border-white/30 text-white hover:border-white/60' 
                     : 'bg-white text-black hover:bg-gray-200'
                 }`}
               >
                 {isFollowed ? 'Following' : 'Follow'}
               </button>
               <button 
                 onClick={handleMessage}
                 className="px-6 py-1.5 bg-white/10 text-white text-sm font-semibold rounded hover:bg-white/20 transition-colors"
               >
                 Message
               </button>
            </div>
            <MoreHorizontal className="text-white hidden md:block cursor-pointer" />
          </div>

          <div className="flex justify-center md:justify-start gap-8 text-white text-sm md:text-base">
            <div className="text-center md:text-left">
              <span className="font-bold block md:inline mr-1">6</span> 
              <span className="text-gray-400 md:text-white">posts</span>
            </div>
            <div className="text-center md:text-left">
              <span className="font-bold block md:inline mr-1">2.4M</span>
              <span className="text-gray-400 md:text-white">followers</span>
            </div>
            <div className="text-center md:text-left">
              <span className="font-bold block md:inline mr-1">0</span>
              <span className="text-gray-400 md:text-white">following</span>
            </div>
          </div>

          <div className="text-sm text-gray-300 max-w-md mx-auto md:mx-0 font-serif leading-relaxed">
            <p className="font-bold text-white mb-1">후천화 (后天花)</p>
            <p>Chairman of Tianhua Garden 🏰</p>
            <p>Living in a world of beautiful lies.</p>
            <p className="text-blue-400 cursor-pointer">www.tianhuagarden.com</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-t border-white/10 mb-8 flex justify-center gap-12 text-xs font-bold tracking-widest text-gray-500 uppercase">
        <button className="flex items-center gap-2 py-4 border-t border-white text-white">
          <Grid size={12} /> Posts
        </button>
        <button className="flex items-center gap-2 py-4 hover:text-gray-300 transition-colors">
          <User size={12} /> Tagged
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-1 md:gap-4">
        {SOCIAL_POSTS.map((post) => (
          <div 
            key={post.id} 
            className="aspect-square relative group cursor-pointer bg-white/5 overflow-hidden"
            onClick={() => setSelectedPost(post)}
          >
            <img 
              src={post.image} 
              alt={`Post ${post.id}`} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold">
              <div className="flex items-center gap-1">
                <Heart size={20} fill="white" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle size={20} fill="white" />
                <span>{post.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Story Viewer Overlay */}
      {isStoryOpen && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
          {/* Mobile-like container */}
          <div className="relative w-full h-full md:max-w-[450px] md:h-[90vh] md:rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl">
            
            {/* Story Image */}
            <img 
              src={STORIES[currentStoryIndex].image} 
              alt="Story" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />

            {/* Progress Bars */}
            <div className="absolute top-4 left-2 right-2 flex gap-1 z-20">
              {STORIES.map((story, index) => (
                <div key={story.id} className="h-0.5 flex-1 bg-white/30 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-white transition-all duration-100 ease-linear"
                     style={{ 
                       width: index < currentStoryIndex ? '100%' : 
                              index === currentStoryIndex ? `${storyProgress}%` : '0%' 
                     }}
                   />
                </div>
              ))}
            </div>

            {/* Header */}
            <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-20">
              <div className="flex items-center gap-3">
                 <img src={profileImage} className="w-8 h-8 rounded-full border border-white/50" alt="Avatar" />
                 <div>
                   <p className="text-white text-sm font-semibold flex items-center gap-2">
                     celestial_hua 
                     <span className="text-gray-300 font-normal text-xs">{STORIES[currentStoryIndex].timeAgo}</span>
                   </p>
                 </div>
              </div>
              <button onClick={closeStory} className="text-white hover:opacity-70">
                <X size={24} />
              </button>
            </div>

            {/* Navigation Click Areas */}
            <div className="absolute inset-0 z-10 flex">
              <div className="w-1/3 h-full cursor-pointer" onClick={handlePrevStory}></div>
              <div className="w-2/3 h-full cursor-pointer" onClick={handleNextStory}></div>
            </div>

            {/* Footer Input */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center gap-3">
               <div className="flex-1 relative">
                 <input 
                   type="text" 
                   placeholder="Send message..." 
                   className="w-full bg-transparent border border-white/50 rounded-full py-2.5 px-4 text-white text-sm placeholder-white/70 focus:outline-none focus:border-white"
                   onFocus={() => {
                     // Optionally pause story on focus
                     if (storyTimerRef.current) clearInterval(storyTimerRef.current);
                   }}
                   onBlur={() => {
                     // Resume story
                     if (isStoryOpen) startStoryTimer();
                   }}
                   onClick={(e) => e.stopPropagation()}
                 />
               </div>
               <button 
                 onClick={(e) => {
                   e.stopPropagation();
                   handleStoryLike();
                 }}
                 className="text-white hover:scale-110 transition-transform active:scale-90"
               >
                 <Heart 
                   size={28} 
                   fill={likedStories.includes(STORIES[currentStoryIndex].id) ? "#ef4444" : "none"} 
                   className={likedStories.includes(STORIES[currentStoryIndex].id) ? "text-red-500" : "text-white"}
                 />
               </button>
               <button className="text-white hover:scale-110 transition-transform">
                 <Send size={24} />
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedPost(null)}>
          <button className="absolute top-6 right-6 text-white" onClick={() => setSelectedPost(null)}>
            <X size={32} />
          </button>
          
          <div 
            className="bg-black border border-white/10 rounded-sm w-full max-w-4xl max-h-[80vh] flex flex-col md:flex-row overflow-hidden shadow-2xl animate-[fadeIn_0.2s_ease-out]"
            onClick={e => e.stopPropagation()}
          >
            {/* Image Side */}
            <div className="bg-black flex items-center justify-center md:w-[60%] h-[40vh] md:h-[80vh] bg-neutral-900">
              <img 
                src={selectedPost.image} 
                alt="Post" 
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Content Side */}
            <div className="flex flex-col md:w-[40%] h-[40vh] md:h-auto border-t md:border-t-0 md:border-l border-white/10 bg-[#000000]">
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 to-purple-500 p-[1.5px]">
                  <img src={profileImage} className="w-full h-full rounded-full object-cover border border-black" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white hover:underline cursor-pointer">celestial_hua</p>
                  {selectedPost.location && (
                    <p className="text-xs text-gray-400">{selectedPost.location}</p>
                  )}
                </div>
                <MoreHorizontal size={16} className="text-white cursor-pointer" />
              </div>

              {/* Comments Area */}
              <div ref={commentSectionRef} className="flex-1 p-4 overflow-y-auto text-sm space-y-4 hide-scrollbar">
                {/* Original Caption */}
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                     <img src={profileImage} className="w-full h-full object-cover" />
                   </div>
                   <div>
                     <p>
                       <span className="font-bold text-white mr-2">celestial_hua</span>
                       <span className="text-gray-300 font-serif leading-relaxed">{selectedPost.caption}</span>
                     </p>
                     <p className="text-gray-500 text-xs mt-1">{selectedPost.date}</p>
                   </div>
                </div>
                
                {/* Dynamic Comments List */}
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 animate-[fadeIn_0.3s_ease-out]">
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${comment.isOfficial ? 'bg-blue-900' : 'bg-green-700'}`}>
                       {comment.user.substring(0, 2).toUpperCase()}
                     </div>
                     <div>
                       <p>
                         <span className="font-bold text-white mr-2">{comment.user}</span>
                         <span className="text-gray-300">{comment.text}</span>
                       </p>
                       <div className="flex gap-3 mt-1 text-gray-500 text-xs font-semibold">
                         <span>{comment.time}</span>
                         <span className="cursor-pointer hover:text-gray-300">Reply</span>
                         {comment.isOfficial && <span className="text-blue-400">Pinned</span>}
                       </div>
                     </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-white/10 space-y-3 bg-black">
                <div className="flex justify-between text-white">
                  <div className="flex gap-4">
                    <button 
                      onClick={handleLike}
                      className={`transition-transform active:scale-75 duration-200 ${isLiked ? 'text-red-500' : 'text-white hover:text-gray-400'}`}
                    >
                      <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
                    </button>
                    <button className="hover:text-gray-400 transition-colors">
                      <MessageCircle size={24} />
                    </button>
                    <button className="hover:text-gray-400 transition-colors">
                      <Share2 size={24} />
                    </button>
                  </div>
                  <button className="hover:text-gray-400 transition-colors">
                    <Bookmark size={24} />
                  </button>
                </div>
                <p className="text-sm font-bold text-white">
                  {isLiked ? 'You and others' : selectedPost.likes} likes
                </p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wide">{selectedPost.date}</p>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10 flex items-center gap-3 bg-black">
                <input 
                  type="text" 
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a comment..." 
                  className="bg-transparent text-sm text-white focus:outline-none flex-1 placeholder-gray-500"
                />
                <button 
                  onClick={handlePostComment}
                  disabled={!commentInput.trim()}
                  className="text-blue-500 text-sm font-semibold hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SocialFeed;