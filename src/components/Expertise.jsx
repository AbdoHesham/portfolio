import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  {
    "number": "01",
    "title": "Frontend Engineering",
    "text": "Building responsive Angular and Ionic interfaces with TypeScript, Angular Material, Tailwind CSS, Bootstrap, and PrimeNG. Translating Figma and PSD designs into reusable components.",
    "tag": "ANGULAR & UI",
    "gradient": "from-[#04161d] via-[#091114] to-[#05090b]"
  },
  {
    "number": "02",
    "title": "State & API Integration",
    "text": "Integrating RESTful APIs and managing application state with RxJS and NgRx across enterprise dashboards, logistics platforms, and AI-powered SaaS.",
    "tag": "RXJS & NGRX",
    "gradient": "from-[#04161d] via-[#091114] to-[#05090b]"
  },
  {
    "number": "03",
    "title": "Architecture & Migration",
    "text": "Owning frontend architecture and coding standards for enterprise ERP and HR applications. Migrating legacy AngularJS systems to Angular for maintainability and scalability.",
    "tag": "ENTERPRISE SYSTEMS",
    "gradient": "from-[#04161d] via-[#091114] to-[#05090b]"
  },
  {
    "number": "04",
    "title": "Technical Leadership",
    "text": "Mentoring developers, reviewing code, and coordinating frontend priorities with Backend, QA, Business Analysts, and Product teams through sprint planning, UAT, and release.",
    "tag": "TEAM & DELIVERY",
    "gradient": "from-[#04161d] via-[#091114] to-[#05090b]"
  }
];

const Expertise = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current;
    if (!cards.length) return;

    cards.forEach((card, index) => {
      if (index === cards.length - 1) return; // Keep the top-most card fully focused

      gsap.to(card, {
        scale: 0.92 - index * 0.025,
        y: -15 - index * 8,
        filter: "blur(6px)",
        opacity: 0.4,
        scrollTrigger: {
          trigger: card,
          start: `top ${90 + index * 20}px`,
          end: "bottom top",
          scrub: true,
        }
      });
    });

    // Magnetic mouse highlight per card
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

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="expertise"
      ref={containerRef}
      className="relative w-full bg-[#050505] text-white py-16 md:py-20 px-4 sm:px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Cinematic Cyan Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[450px] max-w-full h-[450px] bg-[#00f0ff]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-8 md:space-y-12">
        
        {/* Compact Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black/80 backdrop-blur-xl border border-[#00f0ff]/40 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider sm:tracking-widest text-white shadow-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping"></span>
              <span className="text-[#00f0ff] font-bold">03</span>
              <span className="text-white/40">|</span>
              <span>CORE COMPETENCIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight break-words">
              TECHNICAL EXPERTISE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#38bdf8] to-[#0284c7] drop-shadow-[0_0_25px_rgba(0,240,255,0.35)]">
                WHAT I BUILD & HOW I BUILD IT.
              </span>
            </h2>
          </div>
          <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed max-w-xs">
            Building enterprise Angular interfaces, modernizing legacy systems, and guiding frontend teams from requirements to release.
          </p>
        </div>

        {/* Compact 1-on-1 Gradient Stacking Container */}
        <div className="relative flex flex-col gap-6 sm:gap-8 pb-16 sm:pb-20">
          {expertiseData.map((item, index) => (
            <div
              key={index}
              ref={addToRefs}
              className={`sticky w-full p-5 sm:p-6 md:p-8 rounded-2xl bg-gradient-to-br ${item.gradient} backdrop-blur-2xl border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.85)] flex flex-col justify-between min-h-[200px] sm:min-h-[230px] md:min-h-[250px] transform-gpu transition-all overflow-hidden group hover:border-[#00f0ff]/50`}
              style={{
                zIndex: index + 1,
                top: `${80 + index * 14}px`
              }}
            >
              {/* Dynamic Mouse Spotlight Highlight */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background: 'radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(0,240,255,0.18), transparent 70%)'
                }}
              ></div>

              {/* Cyan Accent Stripe */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent z-10"></div>

              {/* Card Header Top */}
              <div className="flex items-center justify-between w-full mb-3 sm:mb-4 relative z-10">
                <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest text-[#00f0ff] px-2 sm:px-2.5 py-0.5 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/25">
                  {item.tag}
                </span>
                <span className="text-xl sm:text-2xl md:text-3xl font-mono font-black text-white/20">
                  {item.number}
                </span>
              </div>

              {/* Card Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-center my-auto relative z-10">
                <div className="lg:col-span-5">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug group-hover:text-[#00f0ff] transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>

              {/* Subtle Cyan Corner Dot */}
              <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-[#00f0ff] group-hover:shadow-[0_0_10px_#00f0ff] z-10 transition-all"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Expertise;