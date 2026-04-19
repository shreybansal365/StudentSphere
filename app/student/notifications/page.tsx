"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Loader2, 
  Satellite, 
  Search, 
  User, 
  Bell, 
  ShieldAlert,
  Clock,
  ChevronRight
} from "lucide-react";

export default function NotificationReceiver() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Real-time updates for notifications with chronological ordering
  useEffect(() => {
    const notificationsRef = collection(db, "notifications");
    const q = query(notificationsRef, orderBy("timestamp", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotifications(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredNotifications = notifications.filter((notification) => {
    const title = notification.title?.toLowerCase() || "";
    const message = notification.message?.toLowerCase() || "";
    const instructor = notification.instructor?.toLowerCase() || "";

    return (
      title.includes(searchQuery.toLowerCase()) ||
      message.includes(searchQuery.toLowerCase()) ||
      instructor.includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10 font-mono">
      {/* Header telemetry */}
      <div className="max-w-5xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <div className="flex items-center space-x-3 text-[#0096FF] animate-pulse">
              <Satellite size={20} />
              <span className="text-xs font-black tracking-[0.3em] uppercase">Active Satellite Link</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
              SATELLITE_FEED
            </h1>
            <p className="text-gray-500 text-xs lowercase">monitoring institutional broadcasts in real-time...</p>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-[#0096FF]/5 blur-xl group-hover:bg-[#0096FF]/10 transition-all duration-500 rounded-full"></div>
            <div className="relative flex items-center bg-white/5 border border-white/10 px-6 py-3 rounded-full focus-within:border-[#0096FF]/50 transition-all">
              <Search className="text-gray-500 mr-3" size={18} />
              <input
                type="text"
                placeholder="FILTER_FEED..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-48 md:w-64 placeholder:text-gray-600 uppercase tracking-widest"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="animate-spin text-[#0096FF]" size={48} />
            <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">Synchronizing Data Nodes...</span>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 border border-dashed border-white/5 rounded-[3rem]"
          >
            <ShieldAlert className="mx-auto text-gray-800 mb-6" size={64} />
            <p className="text-gray-500 text-sm uppercase tracking-widest">No Incoming Transmissions Found</p>
          </motion.div>
        ) : (
          <div className="space-y-6 pb-24">
            <AnimatePresence mode="popLayout">
              {filteredNotifications.map((notification, i) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0096FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] blur"></div>
                  <div className="relative glass-card bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2rem] hover:border-[#0096FF]/30 transition-all duration-300">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center space-x-3">
                          <span className="w-2 h-2 rounded-full bg-[#0096FF] shadow-[0_0_10px_#0096FF]"></span>
                          <span className="text-[10px] text-gray-500 uppercase tracking-tighter font-black">Broadcast_ID: {notification.id.slice(0, 8)}</span>
                        </div>
                        
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-[#0096FF] transition-colors">{notification.title}</h3>
                        
                        <p className="text-gray-400 text-sm leading-relaxed max-w-3xl font-sans">
                          {notification.message}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                          <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 text-[10px] uppercase tracking-wider text-gray-400">
                            <User size={12} className="text-[#0096FF]" />
                            <span>Origin: {notification.instructor}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 text-[10px] uppercase tracking-wider text-gray-400">
                            <Clock size={12} />
                            <span>
                              {notification.timestamp?.toDate ? 
                                new Date(notification.timestamp.toDate()).toLocaleDateString() : 
                                "RECENT"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="hidden md:flex flex-col items-center justify-center border-l border-white/5 pl-8">
                        <ChevronRight className="text-gray-700 group-hover:text-[#0096FF] transition-colors" size={32} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Decorative HUD Element */}
      <div className="fixed bottom-10 right-10 pointer-events-none opacity-20 hidden lg:block text-right">
        <p className="text-[10px] uppercase tracking-[0.5em] text-[#0096FF]">Signal Strength: 100%</p>
        <p className="text-[10px] uppercase tracking-[0.5em] text-gray-600">Encryption: AES-256</p>
      </div>
    </div>
  );
}
