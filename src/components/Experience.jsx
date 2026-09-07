import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    gsap.fromTo(
      card,
      { y: 60, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    card.addEventListener('mousemove', handleMouseMove);
    return () => card.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full bg-[#050505] text-white py-16 md:py-24 px-4 sm:px-6 md:px-12 flex flex-col justify-center select-none overflow-hidden border-t border-white/5"
    >
      {/* Background Cinematic Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] max-w-full h-[500px] bg-[#00f0ff]/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-8 md:space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded bg-black/80 backdrop-blur-xl border border-[#00f0ff]/40 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider sm:tracking-widest text-white shadow-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping"></span>
              <span className="text-[#00f0ff] font-bold">02</span>
              <span className="text-white/40">|</span>
              <span>INTERNSHIP EXPERIENCE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight break-words">
              ENGINEERING EXPERIENCE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#38bdf8] to-[#0284c7] drop-shadow-[0_0_25px_rgba(0,240,255,0.35)]">
                FROM CODE TO PRODUCTION.
              </span>
            </h2>
          </div>
          <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed max-w-xs">
            Hands-on software engineering experience across frontend development, backend services, APIs, debugging, and collaborative Agile development.
          </p>
        </div>

        {/* Experience Bento Card */}
        <div
          ref={cardRef}
          className="w-full p-6 sm:p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] shadow-2xl relative group hover:border-[#00f0ff]/60 transition-all duration-500 overflow-hidden"
        >
          {/* Mouse Spotlight */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(0,240,255,0.18), transparent 70%)'
            }}
          ></div>

          <div className="relative z-10 space-y-6 sm:space-y-8">
            {/* Header: Company, Role & Duration */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <div className="inline-block text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase text-[#00f0ff] bg-[#00f0ff]/10 px-2.5 py-1 rounded border border-[#00f0ff]/20 mb-2">
                  THEEDUCODE PLATFORM
                </div>
                <h3 className="text-xl sm:text-2xl md:text-4xl font-black text-white tracking-tight">
                  Eduniketan Pvt. Ltd.
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-[#00f0ff] font-mono font-medium mt-1">
                  Junior Software Architect
                </p>
              </div>

              <div className="flex flex-row sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-1">
                <span className="text-xs sm:text-sm font-mono text-white/90 bg-white/5 border border-white/10 px-3 sm:px-4 py-1.5 rounded-full">
                  Nov 2025 – May 2026
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-white/40 mt-1 sm:mt-1.5 tracking-wider">
                  6 MONTHS DURATION
                </span>
              </div>
            </div>

            {/* Responsibilities & Achievements */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-white/50">
                // KEY RESPONSIBILITIES & PRODUCTION IMPACT
              </h4>

              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base text-white/80 font-light leading-relaxed">
                <li className="flex items-start gap-2.5 sm:gap-3.5">
                  <span className="text-[#00f0ff] font-bold text-lg leading-none mt-0.5">&#8250;</span>
                  <span>
                    Contributed to the development of production software across frontend and backend workflows, working with <strong className="text-white font-medium">APIs, application logic, debugging, and reusable components</strong> for the TheEduCode platform.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3.5">
                  <span className="text-[#00f0ff] font-bold text-lg leading-none mt-0.5">&#8250;</span>
                  <span>
                    Worked on frontend interfaces while collaborating with developers and designers to integrate functionality, troubleshoot issues, and improve the overall application experience.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3.5">
                  <span className="text-[#00f0ff] font-bold text-lg leading-none mt-0.5">&#8250;</span>
                  <span>
                    Used Git for version control, participated in code reviews and Agile development, and contributed to technical documentation and maintainable code.
                  </span>
                </li>
              </ul>
            </div>

            {/* Tech Badges */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
              {['Python', 'Node.js', 'TypeScript', 'Git', 'Agile & Code Reviews', 'Component Architecture'].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded bg-white/[0.04] border border-white/10 text-[11px] sm:text-xs font-mono text-white/80 group-hover:border-[#00f0ff]/30 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
