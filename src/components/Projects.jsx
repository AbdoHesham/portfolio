import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Authentic Project Data based on Sanjit's CV
const projectsData = [
  {
    title: "AI Resume Checker & Optimizer (MERN)",
    category: "Full-Stack & GenAI",
    description: "Parses PDF resumes using Google Gemini with structured output & Zod validation to generate an ATS score (0-100), AI rewrite of weak bullets, diff comparisons, and ATS-friendly PDF export.",
    tags: ["React 19", "Tailwind CSS v4", "Node.js", "Express.js", "MongoDB", "Gemini API", "Zod", "JWT"],
    url: "https://ai-resume-checker-frontend-pawm.onrender.com",
    episode: "01 / 06"
  },
  {
    title: "Sentix – AI Emotion Analysis",
    category: "NLP & Deep Learning",
    description: "NLP web application that classifies text into six emotion categories using a trained Bidirectional GRU deep learning model, with confidence scores, probability charts, and Render deployment.",
    tags: ["Python", "FastAPI", "TensorFlow/Keras", "Bi-GRU", "NumPy", "Pydantic", "Render"],
    url: "https://sentix-ai-emotion-analysis.onrender.com",
    episode: "02 / 06"
  },
  {
    title: "RAG Knowledge Assistant",
    category: "RAG & Vector Search",
    description: "AI-powered document Q&A system using RAG, configurable chunking (1200/180 overlap), 768-dim embeddings, PostgreSQL pgvector vector search, and reranking with source attribution.",
    tags: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Alembic", "Docker", "Ollama"],
    url: "https://rag-knowledge-frontend.onrender.com",
    episode: "03 / 06"
  },
  {
    title: "Learnify – AI-Powered Personalized Learning",
    category: "EdTech & GenAI",
    description: "Full-stack AI learning platform with React/TypeScript frontend and FastAPI backend, generating personalized study paths and quizzes via OpenAI API with JWT authentication.",
    tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "OpenAI API", "JWT"],
    url: "https://github.com/sanjit2005/Learnify",
    episode: "04 / 06"
  },
  {
    title: "FANTA – AI Voice Assistant",
    category: "Real-Time Audio & AI",
    description: "Personal AI voice assistant with real-time two-way voice interaction, using LiveKit for low-latency audio streaming over WebSockets with STT + TTS command execution pipelines.",
    tags: ["Python", "LiveKit", "SpeechRecognition", "WebSockets", "STT + TTS"],
    url: "https://github.com/sanjit2005/fanta-1",
    episode: "05 / 06"
  },
  {
    title: "PiggyPlanet – Smart Savings Mobile App",
    category: "Mobile & Gamification",
    description: "Mobile savings app for kids (8-18) built with Ionic 7 and Angular 17, featuring goal tracking, custom Canvas scratch-card reward system, and parental-approval workflow.",
    tags: ["Ionic 7", "Angular 17", "TypeScript", "Lottie-web", "Canvas"],
    url: "https://github.com/sanjit2005/Piggyplanet",
    episode: "06 / 06"
  }
];

const Projects = () => {
  const containerRef = useRef(null);
  const folderBackRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);
  const mobileCarouselRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Set initial origins (Centered in viewport)
      gsap.set([folderBackRef.current, folderFrontRef.current], { 
        xPercent: -50, 
        yPercent: -50 
      });
      gsap.set(folderFrontRef.current, { transformOrigin: "bottom center" });
      
      const getGridPos = (index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        return { row, col };
      };

      cardsRef.current.forEach((card) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.85,
          x: 0,
          y: 0,
        });
      });

      let mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 1024px)",
        isTablet: "(min-width: 768px) and (max-width: 1023px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        let { isDesktop, isTablet, isMobile } = context.conditions;

        if (isDesktop || isTablet) {
          let floatTween;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 50%", 
              end: "bottom 50%",
              toggleActions: "play reverse play reverse",
              onEnter: () => { if (floatTween) floatTween.kill(); },
              onEnterBack: () => { if (floatTween) floatTween.kill(); },
              onLeave: () => { if (floatTween) floatTween.kill(); },
              onLeaveBack: () => { if (floatTween) floatTween.kill(); }
            },
            onComplete: () => {
              floatTween = gsap.to(cardsRef.current, {
                y: "+=6",
                rotation: "+=0.5",
                duration: 3.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                stagger: { amount: 1.5, from: "random" }
              });
            }
          });

          // 1. Folder opens with smooth rotation
          tl.to(folderFrontRef.current, {
            rotationX: -130,
            duration: 1.2,
            ease: "power3.inOut"
          });

          // 2. Cards rise up collectively
          tl.to(cardsRef.current, {
            y: -140,
            scale: 0.9,
            zIndex: 70,
            duration: 0.6,
            stagger: 0.04,
            ease: "back.out(1.2)"
          }, "-=0.6");

          const getCardScale = () => {
            if (isTablet) return 0.82;
            if (window.innerWidth < 1280) return 0.90;
            return 1;
          };

          const targetGapX = 16;
          const targetGapY = 16;

          // 3. Cards magically spread out: 3 columns on Desktop, 2 columns on Tablet
          tl.to(cardsRef.current, {
            x: (i) => {
              const sample = cardsRef.current.find(c => c && c.offsetWidth > 0);
              const baseW = sample?.offsetWidth || 335;
              const scale = getCardScale();
              const stepX = (baseW * scale) + targetGapX;
              if (isTablet) {
                const col = i % 2;
                return (col - 0.5) * stepX;
              } else {
                const { col } = getGridPos(i);
                return (col - 1) * stepX;
              }
            },
            y: (i) => {
              const sample = cardsRef.current.find(c => c && c.offsetHeight > 0);
              const baseH = sample?.offsetHeight || 295;
              const scale = getCardScale();
              const stepY = (baseH * scale) + targetGapY;
              if (isTablet) {
                const row = Math.floor(i / 2);
                return (row - 1) * stepY;
              } else {
                const { row } = getGridPos(i);
                return (row - 0.5) * stepY;
              }
            },
            rotation: () => gsap.utils.random(-1.5, 1.5),
            scale: getCardScale,
            duration: 1.4,
            stagger: { amount: 0.4, from: "center" },
            ease: "expo.out"
          }, "-=0.2");
        }

        if (isMobile) {
          const cardW = Math.min(window.innerWidth * 0.84, 340);
          const gap = 20;
          
          mobileCardsRef.current.forEach((card, i) => {
            gsap.set(card, {
              x: -(i * (cardW + gap)), 
              y: 0,
              scale: 0.4,
              opacity: 0,
              rotation: gsap.utils.random(-15, 15)
            });
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
            }
          });

          tl.to(folderFrontRef.current, {
            rotationX: -130,
            duration: 0.8,
            ease: "power3.inOut"
          });

          tl.to(mobileCardsRef.current, {
            y: -100,
            opacity: 1,
            scale: 0.85,
            duration: 0.6,
            stagger: 0.05,
            ease: "back.out(1.2)"
          }, "-=0.4");

          tl.to(mobileCardsRef.current, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: (i) => i === 0 ? 1 : 0.92,
            opacity: (i) => i === 0 ? 1 : 0.5,
            duration: 0.8,
            stagger: 0.08,
            ease: "expo.out",
            onComplete: () => {
              if (mobileCarouselRef.current) {
                mobileCarouselRef.current.style.overflowX = 'auto';
                mobileCarouselRef.current.style.pointerEvents = 'auto';
              }
            }
          }, "-=0.2");
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="bg-[#0b0b0b] min-h-[100svh] md:min-h-[170vh] relative font-sans overflow-hidden text-white w-full flex items-center justify-center py-24 md:py-40 select-none">
      
      {/* Background Netflix Cinematic Title Watermark */}
      <div className="absolute top-10 left-0 w-full flex items-start justify-center pointer-events-none z-0">
        <h1 className="text-[14vw] sm:text-[17vw] md:text-[20vw] font-black text-white/[0.03] tracking-tighter leading-none whitespace-nowrap uppercase">
          PROJECTS
        </h1>
      </div>

      {/* Ambient Cyan Glow behind folder */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] bg-[#00f0ff]/15 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Main Perspective Container */}
      <div className="mt-12 relative w-full max-w-7xl h-full flex items-center justify-center perspective-[2000px] z-10">
        
        {/* Origin Container */}
        <div className="relative w-0 h-0 transform-style-3d">
          
          {/* Folder Back */}
          <div 
            ref={folderBackRef}
            className="absolute w-[80vw] md:w-[28vw] max-w-[340px] aspect-video bg-[#141414] rounded-[24px] border border-[#00f0ff]/40 shadow-[0_20px_50px_rgba(0,240,255,0.25)] flex items-center justify-center"
            style={{ zIndex: 5 }}
          >
            <div className="absolute -top-6 left-6 w-32 h-8 bg-[#1f1f1f] rounded-t-xl border-t border-[#00f0ff]/30" />
            <div className="relative z-10 text-[#00f0ff] font-mono font-black text-2xl tracking-widest uppercase opacity-60">
              ARCHIVE_SLOTS
            </div>
          </div>

          {/* Desktop Project Cards */}
          {projectsData.map((project, i) => (
            <div 
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="hidden md:block absolute w-[80vw] md:w-[30vw] lg:w-[27vw] max-w-[335px] h-[295px] will-change-transform"
              style={{ zIndex: 10 + i }}
            >
              <div className="w-full h-full rounded-[20px] overflow-hidden border border-white/15 bg-[#141414]/95 backdrop-blur-2xl shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-all duration-500 group hover:scale-[1.03] hover:border-[#00f0ff] hover:shadow-[0_25px_60px_rgba(0,240,255,0.3)] hover:-translate-y-1.5 relative z-10 p-5 flex flex-col justify-between">
                
                {/* Top Card Header */}
                <div className="flex items-center justify-between shrink-0">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#00f0ff] bg-[#00f0ff]/10 px-2.5 py-0.5 rounded border border-[#00f0ff]/20">
                    {project.episode}
                  </span>
                  <a
                    href={project.url || "#"}
                    target={project.url && project.url !== "#" ? "_blank" : undefined}
                    rel={project.url && project.url !== "#" ? "noopener noreferrer" : undefined}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!project.url || project.url === "#") {
                        e.preventDefault();
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#00f0ff]/10 hover:bg-[#00f0ff] text-[#00f0ff] hover:text-black font-mono text-[9px] font-bold tracking-wider uppercase border border-[#00f0ff]/30 hover:border-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.1)] hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer z-20"
                  >
                    CLICK ME
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>

                {/* Middle Title & Description */}
                <div className="space-y-1 my-auto py-0.5">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                    {project.category}
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white tracking-tight group-hover:text-[#00f0ff] transition-colors duration-300 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-[11px] text-white/70 font-light leading-snug line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Tech Tags */}
                <div className="flex flex-wrap gap-1 pt-2 border-t border-white/10 shrink-0 pr-4">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[9px] font-mono text-white/70 bg-white/5 px-2 py-0.5 rounded group-hover:border-[#00f0ff]/30 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Cyan Glowing Corner Accent */}
                <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-[#00f0ff] group-hover:shadow-[0_0_12px_#00f0ff] transition-all" />
              </div>
            </div>
          ))}

          {/* Folder Front Flap */}
          <div 
            ref={folderFrontRef}
            className="absolute w-[80vw] md:w-[28vw] max-w-[340px] aspect-video pointer-events-none will-change-transform"
            style={{ zIndex: 60 }}
          >
            <div className="absolute bottom-0 w-full h-[85%] bg-[#1c1c1c] rounded-b-[24px] rounded-t-md shadow-[0_-5px_20px_rgba(0,0,0,0.8)] flex flex-col justify-end p-6 border-t border-[#00f0ff]/40">
              <div className="w-20 h-1.5 bg-white/20 rounded-full mx-auto mb-2" />
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Swipeable Carousel */}
      <div 
        ref={mobileCarouselRef}
        className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-full h-auto py-8 flex items-center gap-5 px-[8vw] sm:px-[10vw] pointer-events-none z-[100] snap-x snap-mandatory overflow-x-hidden hide-scrollbar"
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        {projectsData.map((project, i) => (
          <div 
            key={`mob-${i}`}
            ref={el => mobileCardsRef.current[i] = el}
            className="shrink-0 w-[84vw] sm:w-[340px] max-w-[340px] h-[360px] sm:h-[370px] snap-center will-change-transform relative z-10"
          >
            <div className="w-full h-full rounded-[20px] sm:rounded-[24px] overflow-hidden border border-white/15 bg-[#141414] p-4 sm:p-5 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
              <div className="flex items-center justify-between shrink-0">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-0.5 rounded">
                  {project.episode}
                </span>
                <a
                  href={project.url || "#"}
                  target={project.url && project.url !== "#" ? "_blank" : undefined}
                  rel={project.url && project.url !== "#" ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!project.url || project.url === "#") {
                      e.preventDefault();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#00f0ff]/10 hover:bg-[#00f0ff] text-[#00f0ff] hover:text-black font-mono text-[9px] font-bold tracking-wider uppercase border border-[#00f0ff]/30 hover:border-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.1)] transition-all duration-300"
                >
                  CLICK ME
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
              <div className="space-y-1.5 my-auto py-1">
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                  {project.category}
                </div>
                <h3 className="text-base sm:text-lg font-black text-white">{project.title}</h3>
                <p className="text-[11px] sm:text-xs text-white/70 font-light leading-relaxed">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-1 pt-2 border-t border-white/10 shrink-0">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[9px] font-mono text-white/60 bg-white/5 px-1.5 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Projects;