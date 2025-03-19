import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sponsors, judges } from '../data/sections';
import { Rocket, ArrowRight, Zap, Code, Sparkle } from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function SponsorsAndJudges() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sponsorsRef = useRef<HTMLDivElement>(null);
  const judgesRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const sponsorCardsRef = useRef<HTMLDivElement>(null);
  const judgeCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create animations when component mounts
    const ctx = gsap.context(() => {
      // Animate title with enhanced effect
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.9,
        rotateX: 20,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      // Create staggered entrance for sponsor cards with 3D rotation
      gsap.from('.sponsor-card', {
        y: 60,
        opacity: 0,
        scale: 0.8,
        rotateY: 15,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sponsorsRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });

      // Create staggered entrance for judge cards with 3D rotation
      gsap.from('.judge-card', {
        y: 60,
        opacity: 0,
        scale: 0.8,
        rotateY: -15,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: judgesRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });

      // More dramatic entrance for CTA section
      const ctaTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });
      
      ctaTimeline
        .from(ctaRef.current, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        })
        .from('.cta-gradient', {
          opacity: 0,
          scale: 0.5,
          duration: 1.2,
          ease: "power2.out"
        }, "-=0.5")
        .from('.cta-content', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, "-=0.8")
        .from('.cta-particle', {
          opacity: 0,
          scale: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, "-=0.5");

      // Parallax scrolling effect for sections
      gsap.to(sponsorsRef.current, {
        y: (i, el) => -el.getBoundingClientRect().top * 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: sponsorsRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5
        }
      });

      gsap.to(judgesRef.current, {
        y: (i, el) => -el.getBoundingClientRect().top * 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: judgesRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5
        }
      });

      // Subtle hover animation for the CTA button
      const ctaButton = document.querySelector('.cta-button');
      if (ctaButton) {
        ctaButton.addEventListener('mouseenter', () => {
          gsap.to('.cta-button', {
            scale: 1.05,
            y: -5,
            boxShadow: "0 15px 30px rgba(247, 37, 133, 0.4)",
            duration: 0.3,
            ease: 'back.out(1.7)'
          });
          gsap.to('.cta-arrow', {
            x: 5,
            duration: 0.3,
            ease: 'power2.out'
          });
          gsap.to('.cta-button-bg', {
            opacity: 1,
            duration: 0.3
          });
        });
        
        ctaButton.addEventListener('mouseleave', () => {
          gsap.to('.cta-button', {
            scale: 1,
            y: 0,
            boxShadow: "0 5px 15px rgba(247, 37, 133, 0.2)",
            duration: 0.3,
            ease: 'power2.out'
          });
          gsap.to('.cta-arrow', {
            x: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
          gsap.to('.cta-button-bg', {
            opacity: 0.8,
            duration: 0.3
          });
        });
      }

      // Animate logo hover effects
      const sponsorCards = document.querySelectorAll('.sponsor-card');
      sponsorCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            scale: 1.03,
            boxShadow: "0 15px 30px rgba(76, 201, 240, 0.3)",
            duration: 0.3,
            ease: 'back.out(1.7)'
          });
          
          const cardBg = card.querySelector('.card-bg');
          if (cardBg) {
            gsap.to(cardBg, {
              opacity: 1,
              duration: 0.3
            });
          }
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
            duration: 0.3,
            ease: 'power2.out'
          });
          
          const cardBg = card.querySelector('.card-bg');
          if (cardBg) {
            gsap.to(cardBg, {
              opacity: 0,
              duration: 0.3
            });
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert(); // Clean up animations on unmount
  }, []);

  return (
    <div ref={sectionRef} className="py-20 max-w-6xl mx-auto px-4 md:px-8 perspective-1000">
      <div className="relative mb-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#4cc9f0]/10 to-transparent blur-3xl opacity-30 transform -translate-y-1/2 rounded-full"></div>
        <h1 
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-center shimmer-effect bg-clip-text text-transparent bg-gradient-to-r from-[#4cc9f0] to-[#4361ee]"
          style={{ backgroundSize: '200% auto' }}
        >
          Our Incredible Partners
        </h1>
      </div>
      
      {/* Sponsors Section */}
      <div ref={sponsorsRef} className="mb-32 transform-style-preserve-3d">
        <div className="relative mb-12">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#4cc9f0]/10 to-[#4361ee]/10 blur-2xl opacity-30 transform rounded-full"></div>
          <h2 className="text-4xl font-bold text-center shimmer-effect bg-clip-text text-transparent bg-gradient-to-r from-[#4cc9f0] to-[#4361ee]"
              style={{ backgroundSize: '200% auto' }}>
            SPONSORS
          </h2>
        </div>
        <div ref={sponsorCardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sponsors.map((sponsor) => (
            <a 
              key={`sponsor-${sponsor.id}`}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="sponsor-card perspective-1000 bg-gradient-to-br from-black/90 to-[#120128]/90 backdrop-blur-md rounded-xl w-full aspect-video flex items-center justify-center p-6 border border-[#4cc9f0]/20 shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] group overflow-hidden relative"
            >
              <div className="card-bg absolute inset-0 -z-10 bg-gradient-to-r from-[#4cc9f0]/5 to-[#4361ee]/5 opacity-0 transition-opacity duration-300"></div>
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-[200%] h-40 bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-45 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></div>
              </div>
              {sponsor.logo ? (
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name} 
                  className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-105 rounded-md z-10"
                />
              ) : (
                <div className="text-2xl font-bold text-white/80 bg-clip-text text-transparent bg-gradient-to-r from-[#4cc9f0] to-[#f72585] transition-all duration-300 group-hover:scale-105">
                  {sponsor.name}
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
      
      {/* Judges Section */}
      <div ref={judgesRef} className="mb-40 transform-style-preserve-3d">
        <div className="relative mb-12">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#f72585]/10 to-[#4361ee]/10 blur-2xl opacity-30 transform rounded-full"></div>
          <h2 className="text-4xl font-bold text-center shimmer-effect bg-clip-text text-transparent bg-gradient-to-r from-[#f72585] to-[#4361ee]"
              style={{ backgroundSize: '200% auto' }}>
            JUDGES
          </h2>
        </div>
        <div ref={judgeCardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {judges.map((judge) => (
            <div 
              key={`judge-${judge.id}`} 
              className="judge-card perspective-1000 bg-gradient-to-br from-black/90 to-[#120128]/90 backdrop-blur-md p-8 rounded-xl border border-[#f72585]/20 shadow-lg shadow-pink-900/20 hover:shadow-xl hover:shadow-pink-500/30 transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center group overflow-hidden relative"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#f72585]/5 to-[#4361ee]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#4cc9f0]/20 to-[#f72585]/20 p-1 mb-5 shadow-lg shadow-pink-500/10 overflow-hidden group-hover:shadow-pink-500/30 transition-all duration-300 relative">
                {judge.photo ? (
                  <img 
                    src={judge.photo} 
                    alt={judge.name} 
                    className="w-full h-full object-cover rounded-full transition-all duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center rounded-full bg-gray-800">
                    <span className="text-gray-400">Photo</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-[#f72585]/20 via-transparent to-[#4cc9f0]/20 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold mb-1 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#f72585] group-hover:to-[#4361ee] transition-all duration-300">{judge.name}</h3>
              {judge.title && (
                <h4 className="text-md text-[#4cc9f0] mb-3 font-medium">{judge.title}</h4>
              )}
              <p className="text-sm text-gray-300 text-center leading-relaxed">
                {judge.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Final CTA Section */}
      <div 
        ref={ctaRef} 
        className="relative py-20 px-6 md:px-12 rounded-3xl overflow-hidden border border-white/10 transform-style-preserve-3d"
      >
        {/* Background gradients */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#120128] to-black"></div>
        <div className="cta-gradient absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-r from-[#f72585]/30 to-purple-500/30 blur-3xl rounded-full"></div>
        <div className="cta-gradient absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-r from-[#4cc9f0]/30 to-blue-500/30 blur-3xl rounded-full"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i}
              className="cta-particle absolute w-2 h-2 rounded-full bg-white/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 5}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="cta-content inline-flex items-center mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Sparkle className="w-4 h-4 mr-2 text-yellow-400" />
            <span className="text-sm text-gray-300">Limited spots available</span>
          </div>
          
          <h2 className="cta-content text-4xl md:text-5xl font-bold mb-6 shimmer-effect bg-clip-text text-transparent bg-gradient-to-r from-[#4cc9f0] via-[#f72585] to-[#4361ee]" style={{ backgroundSize: '200% auto' }}>
            Ready to Code, Create & Conquer?
          </h2>
          
          <p className="cta-content text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Join thousands of developers pushing the boundaries of innovation. 
            Build mind-blowing projects, win incredible prizes, and launch your next big idea.
          </p>
          
          <div className="cta-content flex flex-wrap gap-6 justify-center">
            <a 
              href="#register" 
              className="cta-button relative group bg-gradient-to-r from-[#f72585] to-[#4361ee] text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg shadow-pink-600/20 flex items-center space-x-3 transition-all duration-300 overflow-hidden"
            >
              <div className="cta-button-bg absolute inset-0 bg-gradient-to-r from-[#f72585] via-[#4361ee] to-[#f72585] opacity-0 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              <Rocket className="w-6 h-6 relative z-10" />
              <span className="relative z-10">Register Now - It's Free</span>
              <ArrowRight className="w-5 h-5 cta-arrow relative z-10 transition-all duration-300" />
            </a>
            
            <a 
              href="#faq" 
              className="cta-content bg-white/5 backdrop-blur-sm border border-white/10 text-white px-6 py-4 rounded-full font-medium flex items-center space-x-2 hover:bg-white/10 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              <Code className="w-5 h-5 relative z-10" />
              <span className="relative z-10">View Challenges</span>
            </a>
          </div>
          
          <div className="cta-content mt-10 flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-2 text-[#f72585]" />
              <span>Registration closes in 7 days</span>
            </div>
            <div className="hidden md:block">•</div>
            <div>48 hour competition window</div>
            <div className="hidden md:block">•</div>
            <div>Global, virtual participation</div>
          </div>
        </div>
      </div>
    </div>
  );
} 