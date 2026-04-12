"use client"
import React, { useState } from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

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
    <div className="bg-black text-gray-500 border-t border-gray-800">
      <footer className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-12 items-center">
          {/* Left Side: Logo & Statement */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <img
              src="/muj.svg"
              alt="Manipal University Jaipur Logo"
              className="h-16 w-auto bg-white p-2 rounded-xl object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={handleMujLogoClick}
            />
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold text-white tracking-tight">
                StudentSphere
              </h2>
              <p className="text-sm text-gray-400 max-w-xs mt-1">
                The centralized academic nervous system for Manipal University Jaipur.
              </p>
            </div>
          </div>

          {/* Right Side: Connections & Socials */}
          <div className="flex flex-col items-center md:items-end space-y-6">
            <div className="text-center md:text-right">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-widest mb-3">
                Connect with the Core
              </h3>
              <div className="flex flex-col items-center md:items-end space-y-2">
                <a
                  href="mailto:shreybansal365@gmail.com"
                  className="flex items-center text-gray-400 hover:text-[#0096FF] transition-colors group"
                >
                  <FaEnvelope className="mr-3 group-hover:scale-110 transition-transform" size={18} />
                  <span>shreybansal365@gmail.com</span>
                </a>
                <a
                  href="tel:+911413999100"
                  className="flex items-center text-gray-400 hover:text-[#0096FF] transition-colors group"
                >
                  <FaPhone className="mr-3 group-hover:scale-110 transition-transform" size={18} />
                  <span>+91 141-3999100</span>
                </a>
              </div>
            </div>

            <div className="flex space-x-5">
              {[
                { icon: FaYoutube, href: "https://www.youtube.com/@MUJaipur" },
                { icon: FaFacebookF, href: "https://www.facebook.com/manipal.university.jaipur/" },
                { icon: FaTwitter, href: "https://x.com/jaipur_manipal" },
                { icon: FaLinkedin, href: "https://www.linkedin.com/school/manipal-university-jaipur/" },
                { icon: FaInstagram, href: "https://www.instagram.com/jaipurmanipal/" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 p-3 rounded-full hover:bg-[#0096FF] hover:text-black transition-all duration-300 transform hover:-translate-y-1"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-xs tracking-widest text-gray-600">
          <p>© {currentYear} MANIPAL UNIVERSITY JAIPUR. ALL RIGHTS RESERVED.</p>
          <p className="mt-4 md:mt-0 font-medium">
            MADE WITH <span className="text-red-500 animate-pulse">❤️</span> BY <span className="text-gray-300">SHREY BANSAL</span>
          </p>
        </div>
      </footer>
    </div>
                
      </footer>
    </div>
  );
};

export default Footer;