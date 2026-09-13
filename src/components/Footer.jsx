
const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white py-12 md:py-16 px-4 sm:px-6 md:px-12 border-t border-white/10 select-none relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col space-y-8 sm:space-y-12">
        
        {/* Top Section: Brand & Quick Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8 pb-8 sm:pb-12 border-b border-white/10">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="text-2xl font-black text-[#00f0ff] tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(0,240,255,0.8)]">
              ABDELRAHMAN<span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
            </div>
            <p className="text-[11px] sm:text-xs font-mono text-white/50 tracking-wider sm:tracking-widest uppercase">
             // BUILD â€¢ LEARN â€¢ SHIP â€¢ REPEAT &bull; 2026
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 text-xs font-mono uppercase tracking-wider sm:tracking-widest text-white/70">
            <a href="#home" className="hover:text-[#00f0ff] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#00f0ff] transition-colors">About</a>
            <a href="#experience" className="hover:text-[#00f0ff] transition-colors">Experience</a>
            <a href="#expertise" className="hover:text-[#00f0ff] transition-colors">Expertise</a>
            <a href="#skills" className="hover:text-[#00f0ff] transition-colors">Skills</a>
            <a href="#projects" className="hover:text-[#00f0ff] transition-colors">Projects</a>
            <a href="#contact" className="hover:text-[#00f0ff] transition-colors">Contact</a>
          </nav>
        </div>

        {/* Middle Section: Socials & External Profiles */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 text-xs font-mono text-white/60">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* GitHub Icon */}
            <a 
              href="https://github.com/AbdoHesham"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Profile"
              className="text-white/60 hover:text-[#00f0ff] transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-label="GitHub"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            <span className="text-white/20 font-mono text-sm">//</span>

            {/* LinkedIn Icon */}
            <a 
              href="https://www.linkedin.com/in/abdelrahman-hesham-969991163/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn Profile"
              className="text-white/60 hover:text-[#00f0ff] transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-label="LinkedIn"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>

          <div className="text-white/40 tracking-wider sm:tracking-widest uppercase break-words">
            LOCATION: FAYOUM, EGYPT
          </div>
        </div>

        {/* Bottom Copyright & Cinematic Tagline */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 pt-6 border-t border-white/5 text-[10px] sm:text-[11px] font-mono text-white/40 uppercase tracking-wider sm:tracking-widest">
          <p>&copy; {new Date().getFullYear()} Abdelrahman Hesham. All Rights Reserved.</p>
          <p className="text-[#00f0ff]/80">STREAMING WORLDWIDE &bull; BUILT WITH REACT & GSAP</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;