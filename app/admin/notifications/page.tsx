"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy
} from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Loader2, 
  Trash2, 
  Edit3, 
  Radio, 
  Send, 
  Save, 
  X,
  AlertTriangle,
  Terminal,
  Activity
} from "lucide-react";

export default function NotificationReceiver() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newInstructor, setNewInstructor] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Add new notification
  const handleAddNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newMessage || !newInstructor) return;
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "notifications"), {
        title: newTitle,
        message: newMessage,
        instructor: newInstructor,
        timestamp: new Date(),
        type: "official"
      });
      resetForm();
    } catch (error) {
      console.error("Broadcast failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit existing notification
  const handleEditNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId || !newTitle || !newMessage || !newInstructor) return;
    
    setIsSubmitting(true);
    try {
      await updateDoc(doc(db, "notifications", editId), {
        title: newTitle,
        message: newMessage,
        instructor: newInstructor,
      });
      resetForm();
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete notification
  const handleDeleteNotification = async (id: string) => {
    if (!confirm("Confirm data node destruction?")) return;
    await deleteDoc(doc(db, "notifications", id));
  };

  // Reset input fields
  const resetForm = () => {
    setNewTitle("");
    setNewMessage("");
    setNewInstructor("");
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10 font-mono">
      {/* Header with Terminal telemetry */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <div className="flex items-center space-x-3 text-[#0096FF] animate-pulse">
              <Radio size={20} />
              <span className="text-xs font-black tracking-[0.3em] uppercase">Privileged Command Uplink</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
              ADVISORY_CENTER
            </h1>
            <p className="text-gray-500 text-xs lowercase">authorizing global campus broadcasts...</p>
          </div>
          
          <div className="flex items-center space-x-4 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
            <Activity size={16} className="text-green-500" />
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Network_Status: Operational</span>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Command Input Module */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-card bg-white/5 border border-white/10 p-8 rounded-[2.5rem] relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-full h-1 ${editId ? "bg-yellow-500" : "bg-[#0096FF]"} opacity-30`}></div>
            
            <h2 className="text-2xl font-black mb-8 tracking-tight flex items-center space-x-3 italic">
              <Terminal size={24} className={editId ? "text-yellow-500" : "text-[#0096FF]"} />
              <span>{editId ? "EDIT_ADVISORY" : "NEW_BROADCAST"}</span>
            </h2>

            <form onSubmit={editId ? handleEditNotification : handleAddNotification} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest pl-2">ADVISORY_TITLE</label>
                <input
                  type="text"
                  placeholder="INPUT_SUBJECT..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-[#0096FF]/50 outline-none transition-all placeholder:text-gray-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest pl-2">MESSAGE_DATA</label>
                <textarea
                  placeholder="TYPE_DETAILS..."
                  rows={4}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-[#0096FF]/50 outline-none transition-all placeholder:text-gray-700 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest pl-2">AUTHOR_CREDENTIALS</label>
                <input
                  type="text"
                  placeholder="ENTER_INSTRUCTOR_NAME..."
                  value={newInstructor}
                  onChange={(e) => setNewInstructor(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-[#0096FF]/50 outline-none transition-all placeholder:text-gray-700"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 py-4 flex items-center justify-center space-x-3 font-black rounded-full transition-all uppercase tracking-widest text-sm shadow-xl ${
                    editId 
                      ? "bg-yellow-500 text-black hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]" 
                      : "bg-[#0096FF] text-white hover:shadow-[0_0_20px_rgba(0,150,255,0.3)]"
                  } disabled:opacity-50`}
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      {editId ? <Save size={18} /> : <Send size={18} />}
                      <span>{editId ? "SYNC_CHANGES" : "AUTHORIZE_BROADCAST"}</span>
                    </>
                  )}
                </button>
                
                {editId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="p-4 bg-white/5 border border-white/10 text-white rounded-full hover:bg-red-500/20 hover:border-red-500/50 transition-all"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="p-8 bg-red-500/5 border border-red-500/10 rounded-[2.5rem] flex items-start space-x-4">
            <AlertTriangle className="text-red-500 shrink-0 mt-1" size={20} />
            <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-tighter">
              CAUTION: ALL BROADCASTS ARE CRYPTOGRAPHICALLY SIGNED. UNAUTHORIZED MISUSE OF THE ADVISORY_CENTER WILL LOG IP TELEMETRY AND MAY RESULT IN ACCESS REVOCATION.
            </p>
          </div>
        </div>

        {/* Global Feed Module */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-500">Live_Registry</h3>
            <span className="text-[10px] bg-white/5 px-3 py-1 rounded-full border border-white/5">{notifications.length} NODES_ACTIVE</span>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="animate-spin text-gray-700" size={32} />
            </div>
          ) : (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar pb-20">
              <AnimatePresence mode='popLayout'>
                {notifications.map((notification) => (
                  <motion.div 
                    key={notification.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-card bg-white/5 border border-white/5 p-6 rounded-2xl hover:border-white/20 transition-all group"
                  >
                    <div className="flex justify-between gap-4">
                      <div className="space-y-3 flex-1 min-w-0">
                        <div className="flex items-center space-x-3">
                          <span className={`w-1.5 h-1.5 rounded-full ${notification.id === editId ? "bg-yellow-500 animate-pulse" : "bg-[#0096FF]"}`}></span>
                          <span className="text-[10px] text-gray-600 uppercase tracking-tighter">NODE_REF: {notification.id.slice(0, 8)}</span>
                        </div>
                        <h4 className="font-bold text-lg truncate group-hover:text-[#0096FF] transition-colors">{notification.title}</h4>
                        <p className="text-sm text-gray-400 font-sans line-clamp-2">{notification.message}</p>
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest italic font-black">SIG: {notification.instructor}</p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => {
                            setEditId(notification.id);
                            setNewTitle(notification.title);
                            setNewMessage(notification.message);
                            setNewInstructor(notification.instructor);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="p-3 bg-white/5 text-gray-400 rounded-xl hover:bg-yellow-500/20 hover:text-yellow-500 transition-all"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteNotification(notification.id)}
                          className="p-3 bg-white/5 text-gray-400 rounded-xl hover:bg-red-500/20 hover:text-red-500 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
