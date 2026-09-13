import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    "company": "Microtec",
    "role": "Senior Front-End Developer",
    "dates": "Jul 2025 - Present",
    "mode": "Hybrid | Full-Time",
    "highlights": [
      "Acting frontend lead for enterprise ERP and HR applications using Angular, TypeScript, and RxJS.",
      "Own frontend architecture, coding standards, technical decisions, and implementation quality.",
      "Mentor developers through guidance and code reviews; coordinate priorities, dependencies, and blockers.",
      "Work with Backend, QA, Business Analysts, and Product teams from requirements through UAT and release."
    ]
  },
  {
    "company": "Widebot.ai",
    "role": "Senior Front-End Engineer",
    "dates": "Jul 2024 - Jul 2025",
    "mode": "Hybrid | Full-Time",
    "highlights": [
      "Developed the Angular frontend of an AI-powered SaaS platform using the AQL large language model for MENA enterprises and governments.",
      "Converted Figma and PSD designs into components, integrated RESTful APIs, and resolved critical UI issues."
    ]
  },
  {
    "company": "AHBS",
    "role": "Senior Front-End Engineer",
    "dates": "Jul 2023 - Jul 2024",
    "mode": "Hybrid | Full-Time",
    "highlights": [
      "Built three Angular admin dashboards for healthcare and real estate clients, including Dot Care Plus and AWP Real Estate.",
      "Led an AngularJS ERP migration to Angular 14 and implemented notifications and promo-code management."
    ]
  },
  {
    "company": "BetaHubs",
    "role": "Senior Front-End Engineer",
    "dates": "Oct 2022 - Oct 2023",
    "mode": "Remote | Part-Time",
    "highlights": [
      "Delivered Next Driven, a POS application for restaurants, shops, and coffee shops, covering cashier and purchasing workflows.",
      "Collaborated with backend teams on RESTful API design and integration."
    ]
  },
  {
    "company": "MCshippers",
    "role": "Front-End Developer",
    "dates": "Jan 2022 - Jul 2023",
    "mode": "Remote | Full-Time",
    "highlights": [
      "Launched the MCshippers portal serving 1,000+ registered users and built its admin panel and ERP operations.",
      "Delivered Round Hire, an employment and recruitment application, as the sole frontend contributor."
    ]
  },
  {
    "company": "HAWK Technology",
    "role": "Front-End Developer",
    "dates": "Feb 2021 - Aug 2021",
    "mode": "Remote | Part-Time",
    "highlights": [
      "Built Legal House, a legal consultation portal for corporate and individual clients.",
      "Redesigned the Education Faculty website for Fayoum University with a responsive layout."
    ]
  },
  {
    "company": "Freelance",
    "role": "Front-End Developer",
    "dates": "Feb 2020 - Jul 2024",
    "mode": "Remote",
    "highlights": [
      "Delivered 4+ admin panels and mobile-companion applications for clients in Egypt and Turkey.",
      "Projects included Hunter stock advisory admin, Synk admin, and the GETX Ionic market application with an Angular admin panel."
    ]
  }
];

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
              <span>PROFESSIONAL EXPERIENCE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight break-words">
              ENGINEERING EXPERIENCE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#38bdf8] to-[#0284c7] drop-shadow-[0_0_25px_rgba(0,240,255,0.35)]">
                FROM CODE TO PRODUCTION.
              </span>
            </h2>
          </div>
          <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed max-w-xs">
            5+ years delivering production Angular applications across enterprise software, AI-powered SaaS, healthcare, logistics, and real estate.
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

          <div className="relative z-10 space-y-10">
            {experienceData.map((job) => (
              <article key={job.company} className="border-b border-white/10 pb-8 last:border-0 last:pb-0">
                <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">{job.company}</h3>
                    <p className="text-sm text-[#00f0ff] mt-1">{job.role}</p>
                  </div>
                  <div className="text-xs font-mono text-white/60 sm:text-right">
                    <p>{job.dates}</p><p className="mt-1">{job.mode}</p>
                  </div>
                </div>
                <ul className="list-disc pl-5 space-y-2 text-sm text-white/80 leading-relaxed">
                  {job.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
