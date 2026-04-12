"use client";

import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from '@/lib/firebase';
import { motion } from "framer-motion";
import { FaCalendarAlt, FaRobot, FaTasks, FaGraduationCap, FaChartLine, FaBell, FaComments, FaSyncAlt } from 'react-icons/fa';
import Link from 'next/link';
import NeuralBackground from "../components/NeuralBackground";
import AttendanceCombat from "../components/AttendanceCombat";
import GPAMatrix from "../components/GPAMatrix";
import DiagnosticOnboarding from "../components/DiagnosticOnboarding";
import { fetchStudentAcademicBundle } from "@/lib/student-data";
import { buildAttendanceInsights } from "@/lib/academic";

const Page: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [attendanceStats, setAttendanceStats] = useState({ attended: 0, total: 0 });
  const [marks, setMarks] = useState<any[]>([]);
  
  // SLCM Vault States
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [slcmPassword, setSlcmPassword] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState("");

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchUserData = async (uid: string) => {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser(userData);
        
        // Process intelligence for the Dashboard
        const bundle = await fetchStudentAcademicBundle(uid);
        if (bundle) {
          const insights = buildAttendanceInsights(bundle.slcmAttendance, bundle.attendanceRecords);
          const total = insights.reduce((acc, ins) => acc + ins.totalClasses, 0);
          const attended = insights.reduce((acc, ins) => acc + ins.attendedClasses, 0);
          setAttendanceStats({ attended, total });
          setMarks(bundle.marks);
        }
      }
      setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        fetchUserData(currentUser.uid);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  const handleSyncSLCM = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.username || !slcmPassword) return;
    setIsSyncing(true);
    setSyncStatus("Waking up invisible browser...");

    try {
      const res = await fetch("/api/slcm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slcmId: user.username, password: slcmPassword }),
      });
      
      const data = await res.json();
      
      if (!data.success) {
        setSyncStatus("Error: " + (data.error || "Invalid Credentials or MUJ SLCM is down."));
        setIsSyncing(false);
        return;
      }
      
      setSyncStatus("Data extracted! Securely saving to your profile...");
      
      const userRef = doc(db, "users", auth.currentUser!.uid);
      const { setDoc } = await import("firebase/firestore");
      await setDoc(userRef, {
            slcmScrapeTime: new Date().toISOString(),
            slcmTimetableHTML: data.timetableData,
            slcmAttendanceHTML: data.attendanceData
      }, { merge: true });
      
      setSyncStatus("Successfully Synced! Refreshing intelligence...");
      setTimeout(() => window.location.reload(), 1500);
      setIsSyncing(false);
    } catch (err) {
      setSyncStatus("Critical Failure: API Pipeline broke.");
      setIsSyncing(false);
    }
  };

  const dashboardModules = [
    { name: "Attendance", path: "/student/attendance", icon: <FaChartLine />, color: "text-purple-500", desc: "Live Analytics" },
    { name: "Timetable", path: "/student/timetable", icon: <FaCalendarAlt />, color: "text-blue-500", desc: "Logic Schedules" },
    { name: "Assignments", path: "/student/assignments", icon: <FaTasks />, color: "text-green-500", desc: "Task Management" },
    { name: "Academic Hub", path: "/student/marks", icon: <FaGraduationCap />, color: "text-yellow-500", desc: "Performance Meta" },
    { name: "Neural Hub", path: "/student/forum", icon: <FaComments />, color: "text-[#0096FF]", desc: "Collaborative Feed" },
    { name: "SphereAI", path: "/student/chatbot", icon: <FaRobot />, color: "text-cyan-500", desc: "Intelligence Core" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center text-white space-y-4">
        <div className="w-12 h-12 border-t-2 border-[#0096FF] rounded-full animate-spin" />
        <p className="font-mono text-xs tracking-widest text-[#0096FF] animate-pulse">INITIATING_DASHBOARD_PROTOCOL...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 sm:px-12 relative overflow-hidden">
      <DiagnosticOnboarding />
      <NeuralBackground />
      
      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Welcome Section */}
        <motion.div 
          className="w-full text-left mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-10"
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
        >
          <div>
            <p className="text-[#0096FF] font-mono text-[10px] tracking-[0.4em] mb-4 uppercase">User_Session_Active</p>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-2">
                HELLO, <span className="text-[#0096FF] italic">{user?.name?.split(' ')[0] || "STUDENT"}</span>
            </h1>
          </div>
          <div className="mt-8 md:mt-0">
             <button onClick={() => setShowSyncModal(true)} className="px-8 py-4 glass-card rounded-full font-black text-xs hover:border-[#0096FF]/50 transition-all flex items-center group">
                <FaSyncAlt className="mr-3 group-hover:rotate-180 transition-transform duration-500" /> SYNC_SLCM_NODES
             </button>
          </div>
        </motion.div>

        {/* Intelligence Grid: Combat Strategist & GPA Matrix */}
        <div className="w-full mb-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AttendanceCombat currentAttendance={0} totalClasses={attendanceStats.total} attendedClasses={attendanceStats.attended} />
            <GPAMatrix marks={marks} />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
          {dashboardModules.map((mod, index) => (
            <Link href={mod.path} key={index}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-6 rounded-[2rem] h-full flex flex-col items-center text-center hover:border-[#0096FF]/50 hover:shadow-[0_0_20px_rgba(0,150,255,0.1)] transition-all cursor-pointer group"
              >
                <div className={`mb-4 text-2xl ${mod.color} group-hover:scale-110 transition-transform duration-300`}>
                  {mod.icon}
                </div>
                <h3 className="text-sm font-bold mb-1 tracking-tight text-white/90">{mod.name}</h3>
                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{mod.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>
        {/* SLCM Sync Card Trigger */}
        <motion.div 
          className="mt-12 w-full max-w-3xl bg-gray-900 border border-blue-900 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between shadow-[0_0_20px_rgba(0,150,255,0.1)] relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
           <div className="mb-4 md:mb-0">
             <h3 className="text-2xl font-black text-white">Sync MUJ Portal</h3>
             <p className="text-gray-400 text-sm mt-1">Automatically extract your real timetable and attendance from SLCM.</p>
           </div>
           <button onClick={() => setShowSyncModal(true)} className="bg-[#0096FF] text-black px-8 py-3 rounded-xl font-bold hover:bg-[#007acc] transition shadow-lg">
             Connect Account
           </button>
        </motion.div>

        {/* Sync Modal Popup */}
        {showSyncModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
              <button 
                onClick={() => { setShowSyncModal(false); setSyncStatus(""); }} 
                className="absolute top-4 right-6 text-gray-400 hover:text-white text-3xl"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-[#0096FF] mb-2">Link SLCM Account</h2>
              <p className="text-xs text-gray-500 mb-6 italic">Your credentials are never stored permanently. They are used once by our robotic browser to securely sync your academic data.</p>
              
              <form onSubmit={handleSyncSLCM} className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-1">Username</label>
                  <p className="text-xs text-gray-500 mb-2">Automatically sourced from your profile</p>
                  <input type="text" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-500 cursor-not-allowed focus:outline-none" readOnly value={user?.username || ""} />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-2">SLCM Password</label>
                  <input type="password" className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-[#0096FF] focus:outline-none" required value={slcmPassword} onChange={e=>setSlcmPassword(e.target.value)} placeholder="••••••••" />
                </div>
                <button type="submit" disabled={isSyncing} className="w-full bg-[#0096FF] text-black font-bold text-lg rounded-lg py-3 mt-4 hover:bg-[#007acc] transition disabled:opacity-50">
                  {isSyncing ? 'Scraping Portal (≈ 15 secs)...' : 'Extract Data'}
                </button>
              </form>
              
              {syncStatus && (
                <div className={`mt-6 p-4 rounded-xl text-center text-sm font-bold ${syncStatus.includes('Error') || syncStatus.includes('Critical') ? 'bg-red-900/50 text-red-500' : 'bg-green-900/50 text-green-500'}`}>
                  {syncStatus}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
