"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaCode, FaTerminal, FaFingerprint } from "react-icons/fa";
import Navbar from "../components/Navbar";

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-[#0096FF] selection:text-black">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24 flex flex-col items-center">
        {/* Header Telemetry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-3 text-[#0096FF] mb-4">
            <FaFingerprint className="animate-pulse" />
            <span className="text-xs font-black tracking-[0.4em] uppercase">Identity_Verification</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic mb-4">
            THE_<span className="text-[#0096FF]">ARCHITECT</span>
          </h1>
          <p className="text-gray-500 text-sm lowercase max-w-xl mx-auto italic">
            accessing lead developer credentials. verifying structural sovereignty and UI/UX leadership parameters.
          </p>
        </motion.div>

        {/* Architect Node Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-4xl"
        >
          <div className="group relative">
            {/* Holographic Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#0096FF]/20 via-[#0096FF]/40 to-transparent rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
            
            <div className="relative glass-card bg-white/2 border border-white/10 p-10 md:p-16 rounded-[3rem] overflow-hidden">
               {/* Grid Pattern Overlay */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
               
               <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                  {/* Visual Identity Profile */}
                  <div className="relative shrink-0">
                     <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-[#0096FF] p-2 relative">
                        <div className="w-full h-full rounded-full bg-[#0096FF]/10 flex items-center justify-center border border-[#0096FF]/20 overflow-hidden">
                           <FaTerminal className="text-[#0096FF]/50" size={64} />
                        </div>
                        <div className="absolute inset-0 border-4 border-transparent border-t-[#0096FF] rounded-full animate-spin-slow"></div>
                     </div>
                  </div>

                  {/* Identity Data */}
                  <div className="flex-1 text-center md:text-left space-y-6">
                     <div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-2">Shrey Bansal</h2>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                           <span className="text-[#0096FF] text-[10px] font-black tracking-widest uppercase bg-white/5 border border-white/5 px-4 py-1.5 rounded-full inline-block">
                              Lead_System_Architect
                           </span>
                           <span className="text-gray-500 text-[10px] font-black tracking-widest uppercase bg-white/5 border border-white/5 px-4 py-1.5 rounded-full inline-block">
                              UI/UX_Engineer
                           </span>
                        </div>
                     </div>

                     <p className="text-gray-400 text-lg leading-relaxed font-sans max-w-2xl">
                        Computer Science & Engineering lead at Manipal University Jaipur. Focused on 
                        architecting high-performance, secure, and aesthetically driven digital ecosystems. 
                        StudentSphere serves as the definitive paradigm shift in institutional resource management.
                     </p>

                     <div className="flex justify-center md:justify-start space-x-6">
                        <a 
                          href="https://github.com/shreybansal365" 
                          target="_blank" 
                          className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-[#0096FF]/20 hover:border-[#0096FF]/50 transition-all group/icon"
                        >
                          <FaGithub size={24} className="text-gray-500 group-hover/icon:text-white" />
                        </a>
                        <a 
                          href="https://linkedin.com/" 
                          target="_blank" 
                          className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-[#0077b5]/20 hover:border-[#0077b5]/50 transition-all group/icon"
                        >
                          <FaLinkedin size={24} className="text-gray-500 group-hover/icon:text-[#0077b5]" />
                        </a>
                        <a 
                          href="mailto:shreybansal365@gmail.com" 
                          className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-[#0096FF]/20 hover:border-[#0096FF]/50 transition-all group/icon"
                        >
                          <FaEnvelope size={24} className="text-gray-500 group-hover/icon:text-[#0096FF]" />
                        </a>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Technical Capabilities Matrix */}
        <div className="w-full max-w-4xl mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
           {[
             { label: "Backend_Logic", value: "Firebase_Cloud", icon: FaCode },
             { label: "Identity_Oracle", value: "Zero_Trust", icon: FaFingerprint },
             { label: "UI_High_Fidelity", value: "Framer_GSAP", icon: Zap },
             { label: "Data_Harvesting", value: "Edge_Scraping", icon: Globe }
           ].map((tech, i) => {
             const Icon = tech.icon;
             return (
               <div key={i} className="glass-card bg-white/5 border border-white/5 p-6 rounded-3xl hover:border-white/20 transition-all">
                  <Icon className="text-[#0096FF] mb-4 opacity-50" size={16} />
                  <p className="text-[8px] text-gray-600 uppercase font-black mb-1">{tech.label}</p>
                  <p className="text-xs font-bold tracking-tight">{tech.value}</p>
               </div>
             )
           })}
        </div>
      </main>

      {/* Footer Signature */}
      <footer className="w-full py-10 border-t border-white/5 text-center">
         <p className="text-[10px] text-gray-700 uppercase tracking-[0.5em]">
            Developed by Shrey Bansal — Manipal University Jaipur 2026.
         </p>
      </footer>
    </div>
  );
}
