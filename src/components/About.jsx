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
                I am <span className="text-white font-bold drop-shadow">Abdelrahman Hesham</span>, a Senior Front-End Engineer based in Fayoum, Egypt, currently leading frontend development for enterprise ERP and HR applications at Microtec.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-white/60 font-light leading-relaxed">
                I have delivered 10+ production applications across logistics, healthcare, real estate, and AI-powered SaaS. I specialize in Angular and TypeScript, translate Figma and PSD designs into responsive interfaces, integrate RESTful APIs, and manage state with RxJS and NgRx. I own frontend architecture, modernize legacy AngularJS systems, and mentor developers through code reviews.
              </p>
            </div>
            
            <div className="pt-6 sm:pt-8 flex flex-wrap gap-1.5 sm:gap-2 relative z-10">
              <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-white/80">Angular Engineering</span>
              <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-white/80">Frontend Architecture</span>
              <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-white/80">REST APIs</span>
              <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-white/80">Technical Mentoring</span>
              <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-white/80">State Management</span>
              <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-white/80">ERP Migration</span>
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
                <li><strong className="text-white">Cairo University</strong><div>Computer Software Engineering Diploma | Oct 2021 - Jun 2022</div></li>
                <li><strong className="text-white">Information Technology Institute (ITI)</strong><div>.NET Full Stack Track | Sep 2020 - Jan 2021</div></li>
                <li><strong className="text-white">Fayoum University</strong><div>Bachelor of Arts | Sep 2013 - Jun 2017</div></li>
                <li><strong className="text-white">Udemy</strong><div>The Complete Angular Course: Beginner to Advanced | 2022</div></li>
                <li><strong className="text-white">Senior Steps</strong><div>Full Stack Development Diploma | May 2020</div></li>
              </ul>
            </div>
            
            <div className="pt-4 font-mono text-xs text-white/40 relative z-10">
              Arabic: Native | English: Professional Working Proficiency
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
              <p className="text-sm sm:text-base md:text-lg font-semibold text-white">Enterprise Angular applications, reusable components, and responsive interfaces</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 relative z-10">
              {['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Ionic', 'SCSS', 'Angular Material', 'Tailwind CSS', 'PrimeNG', 'Nx'].map((tech, idx) => (
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