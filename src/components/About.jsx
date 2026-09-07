import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // --- Cinematic Stagger Entrance on Scroll ---
    gsap.fromTo(
      cardRefs.current,
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // --- Interactive Magnetic Mouse Spotlight per Bento Card ---
    const cards = cardRefs.current;
    const handleMouseMove = (e, card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    cards.forEach((card) => {
      if (!card) return;
      const listener = (e) => handleMouseMove(e, card);
      card.addEventListener('mousemove', listener);
      return () => card.removeEventListener('mousemove', listener);
    });

  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] text-white py-20 md:py-32 px-4 sm:px-6 md:px-12 flex flex-col justify-center select-none overflow-hidden"
    >
      {/* Background Cinematic Cyan Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] max-w-full h-[500px] bg-[#00f0ff]/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[500px] max-w-full h-[500px] bg-[#0284c7]/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-12 md:space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-[#00f0ff]/40 text-[10px] sm:text-xs font-mono uppercase tracking-wider sm:tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping"></span>
            <span className="text-[#00f0ff] font-bold">01</span>
            <span className="text-white/40">|</span>
            <span>ABOUT THE DEVELOPER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter text-white break-words">
            ABOUT THE DEVELOPER<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#38bdf8] to-[#0284c7] drop-shadow-[0_0_30px_rgba(0,240,255,0.4)]">
              BUILDING WITH PURPOSE.
            </span>
          </h2>
        </div>

        {/* Bento Grid Layout with Interactive Mouse Light Tracking */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Card 1: Bio & Academic Core (Span 7) */}
          <div
            ref={addToRefs}
            className="md:col-span-7 p-6 sm:p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative group hover:border-[#00f0ff]/60 transition-all duration-500 overflow-hidden"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(0,240,255,0.15), transparent 70%)'
              }}
            ></div>

            <div className="absolute top-0 right-0 p-6 sm:p-8 text-white/5 font-mono text-5xl sm:text-7xl font-black pointer-events-none">
              01
            </div>
            
            <div className="space-y-4 sm:space-y-5 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#00f0ff] font-bold">Cast & Background</h3>
              <p className="text-base sm:text-lg md:text-xl font-medium text-white/90 leading-relaxed">
                I am <span className="text-white font-bold drop-shadow">Sanjit</span>, a Full Stack Developer / Engineer focused on building scalable applications, backend systems, and AI-powered solutions.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-white/60 font-light leading-relaxed">
                My experience spans full-stack development, RESTful APIs, backend services, databases, AI/ML, and modern application architecture. I work with Python, FastAPI, Node.js, Nest.js, React, Angular, PostgreSQL, MongoDB, and modern AI tools and frameworks. I enjoy solving complex problems and turning ideas into practical, reliable software.
              </p>
            </div>
            
            <div className="pt-6 sm:pt-8 flex flex-wrap gap-1.5 sm:gap-2 relative z-10">
              <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-white/80">Full Stack Engineer</span>
              <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-white/80">Backend Development</span>
              <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-white/80">REST APIs</span>
              <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-white/80">Generative AI</span>
              <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-white/80">Database Architecture</span>
              <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-white/80">DSA & OOP</span>
            </div>
          </div>

          {/* Card 2: Education & Certifications (Span 5) */}
          <div
            ref={addToRefs}
            className="md:col-span-5 p-6 sm:p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative group hover:border-[#00f0ff]/60 transition-all duration-500 overflow-hidden"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(0,240,255,0.15), transparent 70%)'
              }}
            ></div>

            <div className="absolute top-0 right-0 p-6 sm:p-8 text-white/5 font-mono text-5xl sm:text-7xl font-black pointer-events-none">
              02
            </div>
            
            <div className="space-y-4 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#00f0ff] font-bold">Education & Credentials</h3>
              <ul className="space-y-3 text-xs md:text-sm text-white/80 font-light">
                <li className="flex items-start gap-2 sm:gap-2.5">
                  <span className="text-[#00f0ff] font-bold">&#8250;</span>
                  <div>
                    <span className="text-white font-semibold">Lovely Professional University</span> — BCA (2023 – 2026)
                    <div className="text-white/50 text-[10px] sm:text-[11px] font-mono">Punjab | CGPA: 8.10</div>
                  </div>
                </li>
                <li className="flex items-start gap-2 sm:gap-2.5">
                  <span className="text-[#00f0ff] font-bold">&#8250;</span>
                  <div>
                    <span className="text-white font-semibold">K.V Masjid Moth Delhi</span> — Senior Secondary CBSE (2023)
                    <div className="text-white/50 text-[10px] sm:text-[11px] font-mono">Delhi | Percentage: 63.4%</div>
                  </div>
                </li>
                <li className="flex items-start gap-2 sm:gap-2.5 pt-1 border-t border-white/10">
                  <span className="text-[#00f0ff] font-bold">&#8250;</span>
                  <div>
                    <strong className="text-white">Oracle Certified Foundations Associate</strong> — Agentic AI, Oracle University (Jul 2026)
                  </div>
                </li>
                <li className="flex items-start gap-2 sm:gap-2.5">
                  <span className="text-[#00f0ff] font-bold">&#8250;</span>
                  <div>
                    <strong className="text-white">Binary Blitz Hackathon</strong> — Coding Ninjas, LPU (Mar 2024)
                  </div>
                </li>
                <li className="flex items-start gap-2 sm:gap-2.5">
                  <span className="text-[#00f0ff] font-bold">&#8250;</span>
                  <div>
                    <strong className="text-white">Responsive Web Designing</strong> — freeCodeCamp.org (Feb 2024)
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="pt-4 font-mono text-xs text-white/40 relative z-10">
              // ACADEMIC & CERTIFIED CREDENTIALS
            </div>
          </div>

          {/* Card 3: Technical Ecosystem (Span 12) */}
          <div
            ref={addToRefs}
            className="md:col-span-12 p-6 sm:p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:border-[#00f0ff]/60 transition-all duration-500 overflow-hidden relative group"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(0,240,255,0.15), transparent 70%)'
              }}
            ></div>

            <div className="space-y-2 text-left relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#00f0ff] font-bold">Production Tech Stack</h3>
              <p className="text-sm sm:text-base md:text-lg font-semibold text-white">Full-stack, AI integration, and database architectures</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 relative z-10">
              {['Python', 'FastAPI', 'Node.js', 'Nest.js', 'React', 'Angular 17', 'PostgreSQL', 'MySQL', 'Docker', 'TypeScript', 'MongoDB'].map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded bg-white/[0.04] border border-white/10 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-white shadow-inner hover:bg-[#00f0ff]/20 hover:border-[#00f0ff]/40 hover:scale-105 transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;