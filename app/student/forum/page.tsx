"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaFilter, FaFire, FaClock, FaCheckCircle, FaUserGraduate, FaMicrophone, FaStop } from "react-icons/fa";
import { db, auth } from "../../../lib/firebase";
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  addDoc, 
  serverTimestamp, 
  updateDoc, 
  doc, 
  incrementArray 
} from "firebase/firestore";
import Link from "next/link";
import Stnav from "../../components/Stnav";
import NeuralBackground from "../../components/NeuralBackground";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  timestamp: any;
  votes: number;
  isOfficial?: boolean;
}

const PostCard = ({ post }: { post: Post }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 md:p-8 rounded-[2rem] hover:border-[#0096FF]/40 transition-all duration-300 relative group overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
        <FaUserGraduate size={80} />
      </div>

      <div className="flex items-center space-x-3 mb-4">
        <div className="text-[10px] font-mono text-[#0096FF] border border-[#0096FF]/30 px-3 py-1 rounded-full uppercase tracking-widest">
          {post.category}
        </div>
        {post.isOfficial && (
          <div className="flex items-center space-x-1 text-[10px] font-mono text-green-500 bg-green-500/10 px-3 py-1 rounded-full uppercase tracking-widest">
            <FaCheckCircle /> <span>OFFICIAL_BROADCAST</span>
          </div>
        )}
      </div>

      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#0096FF] transition-colors line-clamp-1 italic">
        {post.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 font-medium">
        {post.content}
      </p>

      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <div className="flex items-center space-x-4">
           <div className="text-xs font-mono text-gray-500">
             BY: <span className="text-white">{post.author.split('@')[0]}</span>
           </div>
           <div className="text-[10px] text-gray-600 font-mono">
             {post.timestamp?.toDate().toLocaleDateString() || "SYNCING..."}
           </div>
        </div>
        <div className="flex items-center space-x-2 text-[#0096FF]">
            <FaFire className="animate-pulse" />
            <span className="font-black text-lg">{post.votes || 0}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function StudentForum() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [isPosting, setIsPosting] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "GENERAL" });

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("VOICE_PROTOCOL_NOT_SUPPORTED_IN_THIS_GRID");
      return;
    }
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setNewPost(prev => ({ ...prev, content: prev.content + " " + transcript }));
    };
    recognition.start();
  };

  useEffect(() => {
    const q = query(collection(db, "forum_posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
      setPosts(postData);
    });
    return () => unsubscribe();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;
    
    try {
      await addDoc(collection(db, "forum_posts"), {
        ...newPost,
        author: auth.currentUser?.email || "Anonymous",
        votes: 0,
        timestamp: serverTimestamp(),
        isOfficial: false
      });
      setIsPosting(false);
      setNewPost({ title: "", content: "", category: "GENERAL" });
    } catch (err) {
      console.error(err);
    }
  };

  const filteredPosts = filter === "ALL" ? posts : posts.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Stnav />
      <NeuralBackground />
      
      <main className="flex-1 p-6 md:p-12 relative z-10 overflow-y-auto mt-16 md:mt-0">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0">
            <div>
              <p className="text-[#0096FF] font-mono text-xs tracking-[0.4em] mb-4">NEURAL_HUB_DASHBOARD</p>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
                STUDENT <span className="text-[#0096FF] italic">FORUM</span>
              </h1>
            </div>
            
            <button 
              onClick={() => setIsPosting(true)}
              className="px-8 py-4 bg-[#0096FF] text-black font-black rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(0,150,255,0.4)] flex items-center"
            >
              <FaPlus className="mr-3" /> INITIATE_THREAD
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
             <div className="p-1 glass-card rounded-full flex items-center space-x-1">
                {["ALL", "GENERAL", "ACADEMICS", "EVENTS"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-6 py-2 rounded-full text-[10px] font-mono tracking-widest transition-all ${filter === f ? "bg-[#0096FF] text-black" : "hover:bg-white/5 text-gray-400"}`}
                  >
                    {f}
                  </button>
                ))}
             </div>
          </div>

          {/* New Post Modal */}
          <AnimatePresence>
            {isPosting && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
              >
                <motion.div 
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  className="bg-[#0a0a0a] border border-white/10 p-10 rounded-[3rem] max-w-xl w-full"
                >
                   <h2 className="text-3xl font-black text-white mb-8 tracking-tighter italic uppercase underline decoration-[#0096FF]">CREATE_NEW_THREAD</h2>
                   <form onSubmit={handleCreatePost} className="space-y-6">
                      <input 
                        placeholder="THREAD_TITLE"
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl font-mono text-sm focus:border-[#0096FF] outline-none transition-colors"
                        value={newPost.title}
                        onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      />
                      <select 
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl font-mono text-sm focus:border-[#0096FF] outline-none appearance-none"
                        value={newPost.category}
                        onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                      >
                         <option value="GENERAL">GENERAL</option>
                         <option value="ACADEMICS">ACADEMICS</option>
                         <option value="EVENTS">EVENTS</option>
                      </select>
                      <div className="relative">
                        <textarea 
                          placeholder="INPUT_NEURAL_DATA_HERE..."
                          rows={6}
                          className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl font-mono text-xs focus:border-[#0096FF] outline-none transition-all resize-none pr-16"
                          value={newPost.content}
                          onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                        />
                        <button 
                          type="button"
                          onClick={startVoiceInput}
                          className={`absolute bottom-6 right-6 p-4 rounded-xl transition-all ${isListening ? "bg-red-500 animate-pulse" : "bg-white/5 text-[#0096FF] hover:bg-[#0096FF]/10"}`}
                        >
                          {isListening ? <FaStop /> : <FaMicrophone />}
                        </button>
                      </div>
                      <div className="flex space-x-4">
                        <button type="submit" className="flex-1 py-4 bg-[#0096FF] text-black font-black rounded-full hover:shadow-[0_0_20px_rgba(0,150,255,0.4)] transition-all">PUBLISH_STREAM</button>
                        <button type="button" onClick={() => setIsPosting(false)} className="flex-1 py-4 glass-card font-black rounded-full hover:bg-red-500 transition-all">ABORT</button>
                      </div>
                   </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
