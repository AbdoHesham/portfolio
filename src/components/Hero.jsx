import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import characterImg from '../assets/character.png';

const Hero = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const spotlightRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const contentRef = useRef(null);

  const developerRoles = [
    'THINK DEEPLY // BUILD PRECISELY',
    'SOLVE THE HARD PROBLEMS',
    'ENGINEERED FOR WHAT’S NEXT',
    'ALWAYS BUILDING // ALWAYS LEARNING'
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    if (!section || !card || !content) return;

    // --- GSAP CINEMATIC ENTRANCE ANIMATION ---
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      section.querySelector('header'),
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
    .fromTo(
      content.querySelectorAll('.hero-anim-item'),
      { y: 50, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, stagger: 0.12 },
      "-=0.7"
    )
    .fromTo(
      card,
      { scale: 0.75, opacity: 0, rotationY: 35, rotationX: -15 },
      { scale: 1, opacity: 1, rotationY: 0, rotationX: 0, duration: 1.4, ease: "back.out(1.2)" },
      "-=0.9"
    );

    // --- MOUSE PHYSICS & SPOTLIGHT TRACKING ---
    gsap.set([cursorDotRef.current, cursorRingRef.current], {
      scale: 0.5,
      opacity: 0,
      transformOrigin: "50% 50%"
    });

    const xToDot = gsap.quickTo(cursorDotRef.current, "x", { duration: 0.05, ease: "power2.out" });
    const yToDot = gsap.quickTo(cursorDotRef.current, "y", { duration: 0.05, ease: "power2.out" });
    
    const xToRing = gsap.quickTo(cursorRingRef.current, "x", { duration: 0.15, ease: "power3.out" });
    const yToRing = gsap.quickTo(cursorRingRef.current, "y", { duration: 0.15, ease: "power3.out" });

    const xTilt = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3.out" });
    const yTilt = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3.out" });
    const glareX = gsap.quickTo(glareRef.current, "x", { duration: 0.3, ease: "power2.out" });
    const glareY = gsap.quickTo(glareRef.current, "y", { duration: 0.3, ease: "power2.out" });

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dotSize = 12;
      const ringSize = 48;

      // Update Spotlight position instantly via inline style
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      }

      // Update Custom Cursor coordinates
      xToDot(x - dotSize / 2);
      yToDot(y - dotSize / 2);
      xToRing(x - ringSize / 2);
      yToRing(y - ringSize / 2);

      // Card 3D Perspective Calculations
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
      const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;

      const rotateX = -((y - cardCenterY) / (cardRect.height / 2)) * 16;
      const rotateY = ((x - cardCenterX) / (cardRect.width / 2)) * 16;

      xTilt(rotateY);
      yTilt(rotateX);

      // Holographic Glare mapping
      glareX((x - cardRect.left) - cardRect.width / 2);
      glareY((y - cardRect.top) - cardRect.height / 2);
    };

    const handleMouseEnter = () => {
      gsap.to([cursorDotRef.current, cursorRingRef.current], {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to([cursorDotRef.current, cursorRingRef.current], {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: "power2.inOut"
      });
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
      xTilt(0);
      yTilt(0);
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseenter", handleMouseEnter);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseenter", handleMouseEnter);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen lg:h-screen bg-[#050505] overflow-hidden flex flex-col justify-between select-none lg:cursor-none"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
      `}</style>

      {/* 1. Cinematic Background Gradient & Marquee */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/90 to-[#050505] z-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-10">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...developerRoles, ...developerRoles].map((role, idx) => (
              <span key={idx} className="text-[14vw] font-black text-[#00f0ff] mx-8 uppercase tracking-tighter">
                {role} &bull;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Direct Mouse Tracking Spotlight Beam (Glows wherever you move) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] transition-opacity duration-300 hidden lg:block"
        style={{
          background: 'radial-gradient(circle, rgba(0,240,255,0.3) 0%, rgba(0,240,255,0.08) 40%, transparent 70%)'
        }}
      ></div>

      {/* 3. Main Content Layer */}
      <div ref={contentRef} className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 min-h-full flex flex-col justify-between pt-28 pb-10 sm:pb-12">
        
        {/* Top Netflix Cinematic Badge */}
        <div className="hero-anim-item flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-[#00f0ff]/40 text-[10px] sm:text-xs font-mono uppercase tracking-wider sm:tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping shrink-0"></span>
            <span className="text-[#00f0ff] font-bold tracking-wider">FULL-STACK ENGINEERING</span>
            <span className="text-white/40 hidden sm:inline">|</span>
            <span className="text-white/80 hidden sm:inline">FRONTEND • BACKEND • SYSTEMS</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/50 tracking-wider">
            <span className="px-2 py-0.5 border border-white/20 rounded bg-black/40">Bachelor of Computer Applications</span>
            <span className="px-2 py-0.5 border border-white/20 rounded bg-black/40">2023 – 2026</span>
          </div>
        </div>

        {/* Main Center Cinematic Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-8 my-auto py-6 lg:py-0">
          
          {/* Left Side: Developer Story & Description */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-4 sm:space-y-5 text-left">
            <h1 className="hero-anim-item text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white leading-[0.95] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] break-words">
              SANJIT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#38bdf8] to-[#0284c7] drop-shadow-[0_0_35px_rgba(0,240,255,0.6)]">
                FULL-STACK Developer / Engineer
              </span>
            </h1>

            <div className="hero-anim-item flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-[#00f0ff] font-bold">
              <span className="px-2 py-0.5 bg-[#00f0ff]/10 border border-[#00f0ff]/30 rounded text-[#00f0ff]">AI & ML • BACKEND </span>
              <span className="text-white/40">•</span>
              <span>REST APIs • DATABASES</span>
              <span className="text-white/40">•</span>
              <span className="text-white/70">React • Node.js • FastAPI • PostgreSQL • MongoDB</span>
            </div>

            <p className="hero-anim-item text-xs sm:text-sm md:text-base text-white/80 font-light leading-relaxed max-w-md drop-shadow">
              I build full-stack applications, scalable backend services, and AI-powered systems — combining modern frontend development with REST APIs, databases, authentication, and machine learning.
            </p>

            {/* Action Button Set */}
            <div className="hero-anim-item flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <a
                href="#projects"
                className="px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-[#00f0ff] hover:text-black transition-all duration-300 shadow-[0_10px_35px_rgba(0,240,255,0.4)] flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                View Projects
              </a>
              <a
                href="#contact"
                className="px-6 sm:px-8 py-3 sm:py-3.5 bg-neutral-900/80 text-white border border-white/20 font-bold text-xs uppercase tracking-widest rounded hover:bg-neutral-800 hover:border-[#00f0ff]/60 hover:text-[#00f0ff] transition-all duration-300 shadow-xl backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Contact Me
              </a>
            </div>
          </div>

          {/* Center: Interactive 3D Holographic Tilt Developer Poster Frame */}
          <div className="lg:col-span-4 flex justify-center perspective-[1200px] w-full">
            <div 
              ref={cardRef}
              className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform max-w-full"
            >
              {/* Cinematic Cyan Neon Back Glow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-[#00f0ff]/60 via-[#0284c7]/40 to-[#0369a1]/20 rounded-3xl blur-3xl opacity-90 group-hover:opacity-100 animate-pulse duration-1000"></div>
              
              {/* Poster Card with Glossy Sheen */}
              <div className="relative w-[280px] sm:w-[320px] max-w-[calc(100vw-48px)] p-3 sm:p-3.5 bg-[#141414]/90 backdrop-blur-2xl rounded-2xl border border-[#00f0ff]/40 shadow-[0_0_30px_rgba(0,240,255,0.25)] overflow-hidden mx-auto">
                
                {/* Dynamic Specular Glare Layer */}
                <div 
                  ref={glareRef}
                  className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform-gpu z-40"
                ></div>

                {/* Cinematic Cyber Developer Identity Card */}
                <div className="w-full h-[360px] sm:h-[410px] md:h-[430px] rounded-xl bg-gradient-to-b from-[#04161d] via-[#091114] to-[#05090b] border border-[#00f0ff]/30 p-4 sm:p-5 md:p-6 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-500">
                  {/* Subtle Grid Accent */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                  {/* Top Identification Header */}
                  <div className="relative z-10 w-full flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 bg-[#00f0ff] text-black font-mono text-[9px] md:text-[10px] font-black tracking-widest rounded shadow-[0_0_15px_rgba(0,240,255,0.6)] uppercase">
                        FEATURED DEV
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_10px_#00f0ff]"></span>
                    </div>
                    <div className="text-[10px] font-mono tracking-widest uppercase text-white/50">
                      IDENTITY // 01
                    </div>
                  </div>

                  {/* Character Image Container */}
                  <div className="relative z-10 my-auto w-full flex items-center justify-center py-1">
                    <div className="relative w-full max-w-[190px] sm:max-w-[230px] md:max-w-[245px] h-[180px] sm:h-[215px] md:h-[230px] rounded-xl bg-gradient-to-b from-[#00f0ff]/10 via-[#041d26]/30 to-transparent border border-[#00f0ff]/25 flex items-end justify-center overflow-hidden shadow-[inset_0_0_20px_rgba(0,240,255,0.08),0_10px_25px_rgba(0,0,0,0.5)]">
                      {/* Subtle Ambient Radial Glow Behind Character */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,240,255,0.22)_0%,rgba(0,240,255,0.05)_55%,transparent_75%)] pointer-events-none"></div>

                      {/* Character Transparent PNG */}
                      <img 
                        src={characterImg} 
                        alt="Sanjit - Full Stack Developer" 
                        className="relative z-10 max-h-full w-auto object-contain object-bottom drop-shadow-[0_8px_25px_rgba(0,240,255,0.35)] filter transition-transform duration-500 group-hover:scale-105 pointer-events-none select-none"
                      />
                    </div>
                  </div>

                  {/* Identity Bottom Section */}
                  <div className="relative z-10 text-center space-y-2 pt-1">
                    <div className="space-y-0.5">
                      <h4 className="text-lg md:text-xl font-black text-white tracking-widest uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        SANJIT
                      </h4>
                      <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#00f0ff] font-bold">
                        FULL STACK DEVELOPER / ENGINEER
                      </p>
                    </div>

                    {/* Subtle Divider Underneath */}
                    <div className="w-full pt-1 flex items-center gap-2">
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-[#00f0ff]/20"></div>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]/60 shadow-[0_0_6px_#00f0ff]"></span>
                      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#00f0ff]/40 to-[#00f0ff]/20"></div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Side: Technical Specs & Stack */}
          <div className="hero-anim-item lg:col-span-3 flex flex-col items-start lg:items-end space-y-4 text-left lg:text-right w-full lg:w-auto">
            <div className="p-4 sm:p-5 bg-black/80 backdrop-blur-2xl border border-white/15 rounded-xl shadow-2xl w-full sm:max-w-xs">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#00f0ff] font-bold mb-2">CORE CAPABILITIES</h3>
              <p className="text-xs text-white/80 leading-relaxed font-light whitespace-pre-line">
                Full-Stack Development
Backend & REST APIs
AI / ML Integration
Database & Vector Search
Authentication & Security
Docker
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Cinematic Ticker */}
        <div className="hero-anim-item flex items-center justify-between sm:justify-end text-[9px] sm:text-[10px] font-mono text-white/50 tracking-widest uppercase gap-2 sm:gap-3">
          <span>BUILD &bull; LEARN &bull; SHIP &bull; REPEAT</span>
          <span className="w-8 sm:w-12 h-1 bg-[#00f0ff] rounded-full inline-block shadow-[0_0_10px_#00f0ff]"></span>
        </div>
      </div>

      {/* 4. Ultra Pro Max Custom Precision Cursor Suite */}
      <div
        ref={cursorDotRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-3 h-3 bg-[#00f0ff] rounded-full shadow-[0_0_15px_#00f0ff] hidden lg:block"
      ></div>

      <div
        ref={cursorRingRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-12 h-12 border border-[#00f0ff]/60 rounded-full flex items-center justify-center backdrop-blur-[1px] hidden lg:block"
      ></div>

      {/* --- NETFLIX-THEMED DEVELOPER NAVBAR --- */}
      <header className="absolute top-0 inset-x-0 z-50 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-5 sm:py-6 flex items-center justify-between pointer-events-auto">
        <a href="#home" className="text-2xl font-black text-[#00f0ff] tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(0,240,255,0.8)]">
          SANJIT<span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-white/80">
          <a href="#home" className="hover:text-[#00f0ff] transition-colors">Home</a>
          <a href="#about" className="hover:text-[#00f0ff] transition-colors">About</a>
          <a href="#experience" className="hover:text-[#00f0ff] transition-colors">Experience</a>
          <a href="#expertise" className="hover:text-[#00f0ff] transition-colors">Expertise</a>
          <a href="#skills" className="hover:text-[#00f0ff] transition-colors">Skills</a>
          <a href="#projects" className="hover:text-[#00f0ff] transition-colors">Projects</a>
          <a href="#contact" className="hover:text-[#00f0ff] transition-colors">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="px-4 sm:px-5 py-2 rounded bg-[#00f0ff] hover:bg-[#38bdf8] text-black font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.7)] hover:scale-105 active:scale-95"
          >
            Hire Me
          </a>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg bg-black/80 border border-white/20 text-[#00f0ff] hover:border-[#00f0ff] transition-colors focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#0d0d0d]/98 backdrop-blur-2xl border-b border-[#00f0ff]/30 shadow-[0_20px_40px_rgba(0,0,0,0.9)] py-5 px-6 flex flex-col gap-3">
            <nav className="flex flex-col gap-2 text-xs font-mono uppercase tracking-widest text-white/90">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About', href: '#about' },
                { name: 'Experience', href: '#experience' },
                { name: 'Expertise', href: '#expertise' },
                { name: 'Skills', href: '#skills' },
                { name: 'Projects', href: '#projects' },
                { name: 'Contact', href: '#contact' },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded hover:bg-[#00f0ff]/10 hover:text-[#00f0ff] transition-colors border-l-2 border-transparent hover:border-[#00f0ff]"
                >
                  {item.name}
                </a>
              ))}
            </nav>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span>SANJIT // PORTFOLIO</span>
              <span className="text-[#00f0ff] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping"></span>
                AVAILABLE
              </span>
            </div>
          </div>
        )}
      </header>
    </section>
  );
};

export default Hero;