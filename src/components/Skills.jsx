import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    "title": "Languages",
    "desc": "Languages and markup for maintainable, responsive web applications.",
    "tag": "LANGUAGES",
    "skills": [
      "JavaScript (ES6+)",
      "TypeScript",
      "HTML5",
      "CSS3",
      "SCSS/Sass",
      "JSON"
    ]
  },
  {
    "title": "Frameworks & State",
    "desc": "Angular applications with reactive data flows and predictable state.",
    "tag": "FRAMEWORKS",
    "skills": [
      "Angular (8-17)",
      "AngularJS",
      "RxJS",
      "NgRx",
      "Ionic",
      "jQuery"
    ]
  },
  {
    "title": "UI & Design",
    "desc": "Translating Figma and PSD designs into responsive, pixel-accurate interfaces.",
    "tag": "UI & DESIGN",
    "skills": [
      "Angular Material",
      "Tailwind CSS",
      "Bootstrap",
      "PrimeNG",
      "Figma",
      "Adobe XD"
    ]
  },
  {
    "title": "Architecture",
    "desc": "Reusable components, API integration, and scalable frontend architecture.",
    "tag": "ARCHITECTURE",
    "skills": [
      "RESTful APIs",
      "State Management",
      "Nx Monorepos",
      "Reusable Components",
      "Performance Optimization",
      "Cross-Browser Compatibility"
    ]
  },
  {
    "title": "Enterprise Delivery",
    "desc": "Modernizing ERP applications and coordinating features through release.",
    "tag": "DELIVERY",
    "skills": [
      "ERP Applications",
      "AngularJS Migration",
      "Agile/Scrum",
      "UAT",
      "Release Coordination"
    ]
  },
  {
    "title": "Tools & Leadership",
    "desc": "Guiding frontend teams through clear communication and code reviews.",
    "tag": "TEAM & TOOLS",
    "skills": [
      "Git",
      "Azure DevOps",
      "Nx",
      "Code Reviews",
      "Technical Mentoring",
      "Team Leadership",
      "Problem-Solving",
      "Time Management"
    ]
  }
];

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const bgRefs = useRef([]);
  const textRefs = useRef([]);

  const handleScroll = (e) => {
    if (window.innerWidth >= 769) return;
    const container = e.target;
    const center = container.scrollLeft + container.offsetWidth / 2;
    
    let activeIdx = 0;
    let minDiff = Infinity;
    
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(cardCenter - center);
      if (diff < minDiff) {
        minDiff = diff;
        activeIdx = i;
      }
    });

    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.to(card, { scale: i === activeIdx ? 1 : 0.9, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      }
    });

    bgRefs.current.forEach((bg, i) => {
      if (bg) gsap.to(bg, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, overwrite: "auto" });
    });
    
    textRefs.current.forEach((txt, i) => {
      if (txt) gsap.to(txt, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, overwrite: "auto" });
    });
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const updateCards = (p) => {
          cardsRef.current.forEach((card, i) => {
            if (!card) return;
            const offset = i - p;
            
            const radius = 1800; 
            const angleSpread = 18; 
            
            const angle = offset * angleSpread;
            const rad = angle * Math.PI / 180;
            
            const x = Math.sin(rad) * radius;
            const y = radius - (Math.cos(rad) * radius); 
            const z = -Math.abs(offset) * 50; 
            
            const scale = Math.max(0.4, 1 - Math.abs(offset) * 0.15);
            const rotateZ = angle; 
            
            const opacity = Math.max(0.1, 1 - Math.abs(offset) * 0.3);
            const zIndex = Math.round(100 - Math.abs(offset) * 10);

            gsap.set(card, {
              x: x,
              y: y,
              z: z,
              scale: scale,
              rotationZ: rotateZ,
              rotationY: 0, 
              opacity: opacity,
              zIndex: zIndex,
            });
          });

          bgRefs.current.forEach((bg, i) => {
              if (!bg) return;
              const itemOpacity = Math.max(0, 1 - Math.abs(i - p));
              gsap.set(bg, { opacity: itemOpacity });
              
              if (textRefs.current[i]) {
                  gsap.set(textRefs.current[i], { opacity: itemOpacity });
              }
          });
        };

        updateCards(0);

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%", 
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress * (skillCategories.length - 1);
            updateCards(p);
          }
        });
      });

      mm.add("(max-width: 768px)", () => {
        cardsRef.current.forEach((card, i) => {
           if (card) {
             gsap.set(card, { clearProps: "x,y,z,rotation,scale,opacity,position" });
             gsap.set(card, { scale: i === 0 ? 1 : 0.9 });
           }
        });
        
        bgRefs.current.forEach((bg, i) => {
           if (bg) gsap.set(bg, { clearProps: "all", opacity: i === 0 ? 1 : 0 });
        });
        
        textRefs.current.forEach((txt, i) => {
           if (txt) gsap.set(txt, { clearProps: "all", opacity: i === 0 ? 1 : 0 });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="skills"
      ref={sectionRef} 
      className="relative w-full h-screen bg-[#0b0b0b] text-white overflow-hidden flex items-center justify-center md:[perspective:1000px] select-none"
    >
      {/* Dynamic Dark Background Vignettes */}
      {skillCategories.map((_, i) => (
        <div 
          key={i}
          ref={el => bgRefs.current[i] = el}
          className="absolute inset-0 z-0 pointer-events-none opacity-0 bg-gradient-to-tr from-black via-[#041419] to-black"
        />
      ))}

      {/* Massive Background Typography (Cyan & White Outline) */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        {skillCategories.map((_, i) => (
          <h1 
            key={`text-${i}`}
            ref={el => textRefs.current[i] = el}
            className="absolute text-[22vw] md:text-[18vw] font-black uppercase text-transparent leading-none tracking-tighter mix-blend-overlay"
            style={{ 
               WebkitTextStroke: `2px ${i % 2 === 0 ? 'rgba(0,240,255,0.3)' : 'rgba(255,255,255,0.15)'}`,
               opacity: 0 
            }}
          >
            SKILLS
          </h1>
        ))}
      </div>

      {/* Carousel Container */}
      <div 
        className="relative w-full h-full flex md:items-center md:justify-center z-10 md:[transform-style:preserve-3d] overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center px-[8vw] sm:px-[10vw] md:px-0 gap-4 md:gap-0 touch-pan-x"
        onScroll={handleScroll}
      >
        {skillCategories.map((category, i) => (
          <div 
            key={i}
            ref={el => cardsRef.current[i] = el}
            className="md:absolute relative shrink-0 snap-center w-[84vw] sm:w-[360px] md:w-[440px] h-[430px] sm:h-[460px] md:h-[540px] rounded-2xl sm:rounded-[32px] p-6 sm:p-8 md:p-10 bg-[#141414]/95 backdrop-blur-2xl border border-white/15 flex flex-col justify-between overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.9)] hover:border-[#00f0ff]/80 transition-colors duration-500"
          >
            {/* Inner Cyan Glossy Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00f0ff]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
            
            {/* Top Card Metadata */}
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase text-[#00f0ff] bg-[#00f0ff]/10 px-2.5 sm:px-3 py-1 rounded border border-[#00f0ff]/20">
                {category.tag}
              </span>
              <span className="text-xs font-mono text-white/40">
                [ 0{i + 1} / 06 ]
              </span>
            </div>

            {/* Middle Title & Description */}
            <div className="space-y-3 sm:space-y-4 relative z-10 my-auto">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight group-hover:text-[#00f0ff] transition-colors duration-300">
                {category.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-white/70 font-light leading-relaxed">
                {category.desc}
              </p>
            </div>

            {/* Bottom Skill Badges */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 sm:pt-4 border-t border-white/10 relative z-10">
              {category.skills.map((skill, sIdx) => (
                <span 
                  key={sIdx}
                  className="text-[11px] sm:text-xs font-mono text-white/80 bg-white/5 border border-white/10 px-2.5 sm:px-3 py-1 rounded group-hover:border-[#00f0ff]/30 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Bottom Glow Accent */}
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-[#00f0ff] group-hover:shadow-[0_0_15px_#00f0ff] transition-all" />
          </div>
        ))}
      </div>

    </section>
  );
};

export default Skills;