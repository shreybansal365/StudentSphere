"use client";
import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Terminal, Shield, Cpu, Zap, ChevronRight, Globe } from "lucide-react";

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-[#0096FF] selection:text-black">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="border-l-4 border-[#0096FF] pl-8 mb-20"
        >
          <div className="flex items-center space-x-3 text-[#0096FF] mb-4">
            <Terminal size={20} />
            <span className="text-xs font-black tracking-[0.4em] uppercase">System_Genesis</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic">
            PROJECT_<span className="text-[#0096FF]">SPHERE</span>
          </h1>
          <p className="text-gray-500 mt-4 text-sm md:text-lg max-w-2xl lowercase leading-relaxed">
            architecting the decentralized campus nervous system. from zero-trust identity matrices to autonomous intelligence.
          </p>
        </motion.div>

        {/* Vision Matrix */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32"
        >
          <motion.div variants={itemVariants} className="glass-card bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:border-[#0096FF]/30 transition-all duration-500">
            <h2 className="text-3xl font-bold mb-6 italic uppercase tracking-tight flex items-center gap-4">
              <Shield className="text-[#0096FF]" />
              The Paradigm
            </h2>
            <p className="text-gray-400 leading-relaxed font-sans">
              StudentSphere is not just a portal; it is a centralized ecosystem designed to streamline and enhance student life through high-fidelity engineering. We integrate academic tools, event management, and real-time synchronization into a single, secure platform.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:border-[#0096FF]/30 transition-all duration-500">
            <h2 className="text-3xl font-bold mb-6 italic uppercase tracking-tight flex items-center gap-4">
              <Cpu className="text-[#0096FF]" />
              Intelligence
            </h2>
            <p className="text-gray-400 leading-relaxed font-sans">
              From batch-specific broadcasts and event RSVPs to an AI-powered context-aware assistant, we empower students to stay organized and informed. Built with a user-centric directive, it redefines the academic interaction experience.
            </p>
          </motion.div>
        </motion.div>

        {/* Technical Specs Timeline */}
        <div className="space-y-24 mb-32">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col md:flex-row gap-12 items-center"
          >
            <div className="flex-1">
              <span className="text-[#0096FF] text-[10px] font-black tracking-widest uppercase mb-4 block">Core_Logic_Node_01</span>
              <h3 className="text-4xl font-black uppercase italic mb-6">Zero-Trust Identity</h3>
              <p className="text-gray-400 font-sans leading-relaxed">
                Implementing surgical institutional verification. Our Autonomous Faculty Oracle ensures that every identity is verified against real university registries, bypassing legacy constraints for high-fidelity security.
              </p>
            </div>
            <div className="flex-1 w-full bg-white/5 border border-white/10 p-8 rounded-[2rem] group hover:border-[#0096FF]/50 transition-all">
              <div className="flex items-center justify-between mb-8">
                <Globe className="text-[#0096FF]" />
                <span className="text-[10px] text-gray-600">ENCRYPTION_ACTIVE</span>
              </div>
              <div className="space-y-4">
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2 }}
                    className="h-full bg-[#0096FF]"
                  />
                </div>
                <div className="flex justify-between text-[10px] uppercase text-gray-500">
                  <span>Identity_Locked</span>
                  <span>100% Verified</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col md:flex-row-reverse gap-12 items-center"
          >
            <div className="flex-1">
              <span className="text-[#0096FF] text-[10px] font-black tracking-widest uppercase mb-4 block">Core_Logic_Node_02</span>
              <h3 className="text-4xl font-black uppercase italic mb-6">Data Synchronization</h3>
              <p className="text-gray-400 font-sans leading-relaxed text-right md:text-left">
                Harnessing high-speed edge scraping to bridge the gap between legacy university portals and modern interfaces. Real-time attendance, timetables, and marks are synchronized directly into your personal matrix.
              </p>
            </div>
            <div className="flex-1 w-full bg-white/5 border border-white/10 p-8 rounded-[2rem] group hover:border-[#0096FF]/50 transition-all">
               <Zap className="text-yellow-500 mb-6" />
               <pre className="text-[10px] text-green-500/70 overflow-hidden leading-tight">
                 {`[SYNC_STATUS]: ACTIVE
[UPLINK_STRENGTH]: STABLE
[DATA_RESOLUTION]: HIGH_FIDELITY
[PARSING_BUFFER]: 0.12ms
------------------------------
READY_FOR_INITIALIZATION...`}
               </pre>
            </div>
          </motion.div>
        </div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-center bg-[#0096FF] p-20 rounded-[4rem] text-black relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8">
              INITIALIZE_SYSTEM
            </h2>
            <a 
              href="/sign-in"
              className="inline-flex items-center space-x-4 bg-black text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
            >
              <span>Uplink_Now</span>
              <ChevronRight size={20} />
            </a>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        </motion.div>
      </main>

      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};

export default AboutPage;
