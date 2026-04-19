"use client"
import React, { useState } from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const [mujLogoClicks, setMujLogoClicks] = useState(0);

  const handleMujLogoClick = () => {
    setMujLogoClicks((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount === 3) {
        window.location.href = "https://muj.manipal.edu"; 
      }
      return newCount;
    });
  };

  return (
    <div className="bg-black text-gray-500 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#0096FF]/5 blur-[100px] pointer-events-none" />

      <footer className="py-20 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-16 items-start">
          {/* Left Side: Logo & System Statement */}
          <div className="flex flex-col items-center md:items-start space-y-8">
            <div className="p-4 bg-white rounded-[2rem] shadow-[0_0_30px_rgba(255,255,255,0.2)] group cursor-pointer" onClick={handleMujLogoClick}>
                <img
                    src="/muj.svg"
                    alt="MUJ_LOGO"
                    className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-black text-white tracking-tighter italic">
                STUDENT<span className="text-[#0096FF]">SPHERE</span>
              </h2>
              <p className="text-xs font-mono text-gray-400 max-w-sm mt-3 leading-relaxed uppercase tracking-widest">
                Centralized_Academic_Nervous_System.
              </p>
            </div>
          </div>

          {/* Right Side: Neural Social Command & Telemetry */}
          <div className="flex flex-col items-center md:items-end space-y-12">
            <div className="text-center md:text-right space-y-8">
              <h3 className="text-[9px] font-mono font-black text-[#0096FF] uppercase tracking-[0.6em] mb-4">
                CONNECT_WITH_THE_CORE
              </h3>
              
              <div className="grid grid-cols-1 gap-6">
                <a
                  href="mailto:shreybansal365@gmail.com"
                  className="group relative flex flex-col items-center md:items-end"
                >
                  <span className="text-[8px] font-mono text-gray-700 uppercase tracking-widest mb-1">PRIMARY_MAIL</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs font-mono text-gray-300 group-hover:text-[#0096FF] transition-colors uppercase italic font-black tracking-tighter">shreybansal365@gmail.com</span>
                    <div className="h-2 w-2 bg-[#0096FF]/20 rounded-full border border-[#0096FF]/40 group-hover:animate-ping" />
                  </div>
                </a>

                <a
                  href="tel:+919773828948"
                  className="group relative flex flex-col items-center md:items-end"
                >
                  <span className="text-[8px] font-mono text-gray-700 uppercase tracking-widest mb-1">PRIMARY_LINE</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs font-mono text-gray-300 group-hover:text-[#0096FF] transition-colors font-black tracking-widest">+91 9773828948</span>
                    <div className="h-2 w-2 bg-[#0096FF]/20 rounded-full border border-[#0096FF]/40 group-hover:animate-ping" />
                  </div>
                </a>
              </div>
            </div>

            {/* Sub-System Traces (Socials) */}
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              {[
                { icon: <FaYoutube />, href: "https://www.youtube.com/@MUJaipur" },
                { icon: <FaFacebookF />, href: "https://www.facebook.com/manipal.university.jaipur/" },
                { icon: <FaTwitter />, href: "https://x.com/jaipur_manipal" },
                { icon: <FaLinkedin />, href: "https://www.linkedin.com/school/manipal-university-jaipur/" },
                { icon: <FaInstagram />, href: "https://www.instagram.com/jaipurmanipal/" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white hover:border-[#0096FF]/50 hover:bg-[#0096FF]/20 transition-all duration-500 shadow-[0_0_15px_rgba(0,150,255,0.1)] group"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[8px] font-mono tracking-[0.4em] text-gray-700 uppercase">
          <p>© {currentYear} MANIPAL UNIVERSITY JAIPUR • [ NODE_STATUS: OPERATIONAL ]</p>
          <div className="mt-6 md:mt-0 flex items-center space-x-2">
            <span className="text-gray-600 uppercase">MADE WITH</span>
            <motion.span 
              animate={{ 
                scale: [1, 1.2, 1],
                filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1,
                ease: "easeInOut"
              }}
              className="px-1 inline-block"
            >
              ❤️
            </motion.span>
            <span className="text-gray-600 uppercase">BY</span>
            <span className="text-white font-black italic text-sm tracking-tight hover:text-[#0096FF] transition-colors cursor-default">SHREY BANSAL</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;