"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaInstagram, FaGlobe, FaCogs, FaUsers, FaUniversity, FaHeadset } from "react-icons/fa";
import Navbar from "../components/Navbar";

interface Contact {
  name: string;
  email?: string;
  instagram?: string;
  link?: string;
}

const contacts: Record<string, Contact[]> = {
  clubs: [
    { name: "Student Council", email: "student.council@muj.manipal.edu" },
    { name: "Coding Society", email: "coding@muj.manipal.edu" },
    { name: "Robotics Club", email: "robotics@muj.manipal.edu" },
    { name: "Debate Society", email: "debate@muj.manipal.edu" },
    { name: "Cultural Committee", email: "cultural@muj.manipal.edu" },
    { name: "Sports Council", email: "sports@muj.manipal.edu" },
  ],
  admin: [
    { name: "Director's Office", email: "director@muj.manipal.edu" },
    { name: "Registrar", email: "registrar@muj.manipal.edu" },
    { name: "Chief Warden", email: "warden@muj.manipal.edu" },
  ],
  support: [
    { name: "IT Helpdesk", email: "it.support@muj.manipal.edu" },
    { name: "Student Welfare", email: "welfare@muj.manipal.edu" },
    { name: "Campus Security", email: "security@muj.manipal.edu" },
  ],
};

const tabs = [
  { name: "CLUBS_MATRIX", id: "clubs", icon: FaUsers },
  { name: "INSTITUTIONAL_ADMIN", id: "admin", icon: FaUniversity },
  { name: "SUPPORT_UPLINK", id: "support", icon: FaHeadset },
];

const ContactPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("clubs");

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-[#0096FF] selection:text-black">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        {/* Header Telemetry */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-3 text-[#0096FF] mb-4">
            <FaCogs className="animate-spin-slow" />
            <span className="text-xs font-black tracking-[0.4em] uppercase">Communication_Uplink</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-4">
            COMMUNICATIONS_<span className="text-[#0096FF]">MATRIX</span>
          </h1>
          <p className="text-gray-500 text-sm lowercase max-w-xl mx-auto">
            accessing institutional directory. selecting the appropriate frequency for peer, administrative, or support inquiries.
          </p>
        </motion.div>

        {/* Matrix Switcher */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-8 py-4 rounded-full border transition-all duration-300 uppercase tracking-widest text-[10px] font-black ${
                  activeTab === tab.id 
                    ? "bg-[#0096FF] text-black border-[#0096FF] shadow-[0_0_20px_#0096FF66]" 
                    : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                <Icon />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Data Node Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="wait">
            {contacts[activeTab]?.map((contact: Contact, index) => (
              <motion.div
                key={`${activeTab}-${index}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group glass-card bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:border-[#0096FF]/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[8px] text-gray-700 uppercase font-black">DIR_ENTRY_{index + 1}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0096FF]"></div>
                  {contact.name}
                </h3>

                <div className="space-y-4">
                  {contact.email && (
                    <a 
                      href={`mailto:${contact.email}`} 
                      className="flex items-center space-x-3 text-sm text-gray-400 hover:text-[#0096FF] transition-colors font-sans"
                    >
                      <FaEnvelope className="text-[#0096FF]" />
                      <span className="truncate">{contact.email}</span>
                    </a>
                  )}
                  {contact.instagram && (
                    <a 
                      href={contact.instagram} 
                      target="_blank" 
                      className="flex items-center space-x-3 text-sm text-gray-400 hover:text-pink-500 transition-colors font-sans"
                    >
                      <FaInstagram className="text-pink-500" />
                      <span>Instagram Portal</span>
                    </a>
                  )}
                  {contact.link && (
                    <a 
                      href={contact.link} 
                      target="_blank" 
                      className="flex items-center space-x-3 text-sm text-gray-400 hover:text-green-500 transition-colors font-sans"
                    >
                      <FaGlobe className="text-green-500" />
                      <span>Official Link</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Decorative Matrix Static */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0096FF]/10 to-transparent"></div>
    </div>
  );
};

export default ContactPage;
