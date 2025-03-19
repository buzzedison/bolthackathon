import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Trophy, Globe2, Timer, ChevronDown, Award, Zap, Gem, Star } from 'lucide-react';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const prizesRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;

      // Enhanced parallax effects
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          x: x * 30,
          y: y * 30,
          rotateX: y * 5,
          rotateY: -x * 5,
          duration: 1,
          ease: 'power2.out',
        });
      }

      // Subtle movement for prize cards on mouse move
      gsap.to('.prize-card', {
        x: x * 5,
        y: y * 5,
        rotateX: y * 2,
        rotateY: -x * 2,
        stagger: 0.05,
        duration: 1,
        ease: 'power2.out',
      });

      // Add some parallax to the stats cards
      gsap.to(statsRef.current?.children || [], {
        x: x * 10,
        y: y * 10,
        stagger: 0.03,
        duration: 1,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Initial animations with enhanced sequence
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // More dramatic entrance for title
    tl.fromTo(
      titleRef.current,
      { 
        opacity: 0, 
        y: 100, 
        scale: 0.8,
        rotateX: 30,
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotateX: 0,
        duration: 1.4,
        ease: 'back.out(1.7)'
      }
    )
      .fromTo(
        subtitleRef.current,
        { 
          opacity: 0, 
          y: 50,
          scale: 0.9 
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.2)'
        },
        '-=0.8'
      )
      .fromTo(
        prizesRef.current,
        { 
          opacity: 0, 
          y: 30,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.2)'
        },
        '-=0.3'
      )
      .fromTo(
        '.prize-card',
        { 
          opacity: 0, 
          y: 20,
          scale: 0.9,
          rotateX: 10
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.5, 
          stagger: 0.1,
          ease: 'back.out(1.7)'
        },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { 
          opacity: 0, 
          scale: 0.8,
          y: 20
        },
        { 
          opacity: 1, 
          scale: 1,
          y: 0, 
          duration: 0.8,
          ease: 'back.out(1.7)'
        },
        '-=0.3'
      )
      .fromTo(
        statsRef.current?.children || [],
        { 
          opacity: 0, 
          y: 50,
          scale: 0.8,
          rotation: -5
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.8, 
          stagger: 0.15,
          ease: 'back.out(1.7)'
        },
        '-=0.5'
      )
      .fromTo(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          y: -20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'back.out(1.2)'
        },
        '-=0.2'
      );

    // Enhanced floating animation for stats cards
    gsap.to(statsRef.current?.children || [], {
      y: '10px',
      duration: 2,
      ease: 'sine.inOut',
      stagger: {
        each: 0.3,
        repeat: -1,
        yoyo: true,
      },
    });

    // Enhanced pulsing animation for prize cards with 3D effect
    gsap.to('.prize-card', {
      y: '8px',
      scale: 1.03,
      rotateX: 2,
      duration: 2.5,
      ease: 'sine.inOut',
      stagger: {
        each: 0.2,
        repeat: -1,
        yoyo: true,
      },
    });

    // Create a shimmer effect on titles
    const shimmerTl = gsap.timeline({ repeat: -1 });
    shimmerTl.to('.shimmer-effect', {
      backgroundPosition: '200% center',
      duration: 4,
      ease: 'linear'
    });

    // Scroll listener to create on-scroll effects
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Fade out elements as user scrolls down
      if (scrollPos > 10) {
        gsap.to([titleRef.current, subtitleRef.current, prizesRef.current, ctaRef.current], {
          y: -scrollPos * 0.5,
          opacity: 1 - (scrollPos / (viewportHeight * 0.5)),
          ease: 'power2.out',
          duration: 0.3
        });
      } else {
        gsap.to([titleRef.current, subtitleRef.current, prizesRef.current, ctaRef.current], {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          duration: 0.3
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, isEnter: boolean) => {
    const card = e.currentTarget;
    gsap.to(card, {
      scale: isEnter ? 1.1 : 1,
      rotation: isEnter ? (Math.random() > 0.5 ? 5 : -5) : 0,
      boxShadow: isEnter ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : '0 0 0 0 rgba(0, 0, 0, 0)',
      duration: 0.4,
      ease: 'back.out(1.7)',
    });

    // Enhanced icon animation
    const icon = card.querySelector('svg');
    if (icon) {
      gsap.to(icon, {
        scale: isEnter ? 1.4 : 1,
        rotate: isEnter ? '360deg' : '0deg',
        y: isEnter ? -5 : 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
      });
    }

    // Add glow effect
    const overlay = card.querySelector('.overlay');
    if (overlay) {
      gsap.to(overlay, {
        opacity: isEnter ? 1 : 0,
        duration: 0.3
      });
    }
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>, isEnter: boolean) => {
    const button = e.currentTarget;
    gsap.to(button, {
      scale: isEnter ? 1.1 : 1,
      y: isEnter ? -5 : 0,
      boxShadow: isEnter ? '0 15px 30px rgba(146, 82, 234, 0.4)' : '0 5px 15px rgba(146, 82, 234, 0.2)',
      duration: 0.4,
      ease: 'back.out(1.7)',
    });

    // Enhanced icon animation
    const icon = button.querySelector('svg');
    if (icon) {
      gsap.to(icon, {
        rotate: isEnter ? '360deg' : '0deg',
        scale: isEnter ? 1.2 : 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
      });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white px-4 overflow-hidden perspective-1000 pt-16 md:pt-28">
      {/* Add animated background gradients */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-900/20 to-black/50 pointer-events-none" />
      <div className="absolute w-full h-full -z-10 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '15s', animationDelay: '2s' }}></div>
      </div>
      
      <div className="text-center z-10 max-w-5xl mx-auto transform-style-3d">
        <div className="mb-8 relative mt-12 md:mt-20">
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold mb-6 shimmer-effect bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 animate-gradient-x transform transition-transform duration-300"
            style={{ 
              perspective: '1000px',
              transformStyle: 'preserve-3d',
              backgroundSize: '200% auto'
            }}
          >
            The World's Largest Hackathon
          </h1>
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl mb-8 text-gray-300"
          >
            Join thousands of developers worldwide to compete for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 font-bold animate-pulse">
              {" "}$1M+ in prizes
            </span>
          </p>
        </div>

        {/* Prize Categories */}
        <div ref={prizesRef} className="mb-10 transform-style-preserve-3d">
          <h3 className="text-2xl font-bold mb-6 text-center shimmer-effect bg-clip-text text-transparent bg-gradient-to-r from-[#4cc9f0] to-[#f72585]" style={{ backgroundSize: '200% auto' }}>
            PRIZE CATEGORIES
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="prize-card relative bg-gradient-to-br from-[#4cc9f0]/10 to-[#3a0ca3]/10 p-4 rounded-xl border border-[#4cc9f0]/30 group hover:border-[#4cc9f0]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#4cc9f0]/20 transform-style-preserve-3d">
              <div className="overlay absolute inset-0 bg-gradient-to-br from-[#4cc9f0]/20 to-[#3a0ca3]/20 rounded-xl opacity-0"></div>
              <Award className="h-8 w-8 mx-auto mb-2 text-[#4cc9f0] group-hover:text-[#4cc9f0] transition-all duration-300" />
              <h4 className="font-bold">Grand Prize</h4>
              <p className="text-sm text-gray-300">$250,000</p>
            </div>
            <div className="prize-card relative bg-gradient-to-br from-[#f72585]/10 to-[#7209b7]/10 p-4 rounded-xl border border-[#f72585]/30 group hover:border-[#f72585]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#f72585]/20 transform-style-preserve-3d">
              <div className="overlay absolute inset-0 bg-gradient-to-br from-[#f72585]/20 to-[#7209b7]/20 rounded-xl opacity-0"></div>
              <Zap className="h-8 w-8 mx-auto mb-2 text-[#f72585] group-hover:text-[#f72585] transition-all duration-300" />
              <h4 className="font-bold">Web3</h4>
              <p className="text-sm text-gray-300">$200,000</p>
            </div>
            <div className="prize-card relative bg-gradient-to-br from-[#4361ee]/10 to-[#3a0ca3]/10 p-4 rounded-xl border border-[#4361ee]/30 group hover:border-[#4361ee]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#4361ee]/20 transform-style-preserve-3d">
              <div className="overlay absolute inset-0 bg-gradient-to-br from-[#4361ee]/20 to-[#3a0ca3]/20 rounded-xl opacity-0"></div>
              <Gem className="h-8 w-8 mx-auto mb-2 text-[#4361ee] group-hover:text-[#4361ee] transition-all duration-300" />
              <h4 className="font-bold">AI/ML</h4>
              <p className="text-sm text-gray-300">$200,000</p>
            </div>
            <div className="prize-card relative bg-gradient-to-br from-[#ffbe0b]/10 to-[#fb5607]/10 p-4 rounded-xl border border-[#ffbe0b]/30 group hover:border-[#ffbe0b]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#ffbe0b]/20 transform-style-preserve-3d">
              <div className="overlay absolute inset-0 bg-gradient-to-br from-[#ffbe0b]/20 to-[#fb5607]/20 rounded-xl opacity-0"></div>
              <Star className="h-8 w-8 mx-auto mb-2 text-[#ffbe0b] group-hover:text-[#ffbe0b] transition-all duration-300" />
              <h4 className="font-bold">Community</h4>
              <p className="text-sm text-gray-300">$150,000</p>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-2">Plus additional prizes for industry-specific tracks</p>
        </div>

        <div 
          ref={ctaRef} 
          className="space-y-6"
        >
          <div className="flex justify-center">
            <button 
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40"
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
            >
              <Trophy className="w-6 h-6" />
              <span>Register Now</span>
            </button>
          </div>
          <p className="text-sm text-gray-400 animate-pulse mt-2">Virtual Event • Date TBD</p>
        </div>

        <div 
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto transform-style-preserve-3d"
        >
          <div 
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 transition-all duration-300 cursor-pointer relative group"
            onMouseEnter={(e) => handleCardHover(e, true)}
            onMouseLeave={(e) => handleCardHover(e, false)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Globe2 className="w-8 h-8 text-purple-400 mb-4 mx-auto transition-transform duration-300" />
            <h3 className="text-2xl font-bold mb-2">Global Event</h3>
            <p className="text-gray-400">Connect with developers from over 100+ countries</p>
          </div>
          <div 
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 transition-all duration-300 cursor-pointer relative group"
            onMouseEnter={(e) => handleCardHover(e, true)}
            onMouseLeave={(e) => handleCardHover(e, false)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Trophy className="w-8 h-8 text-yellow-400 mb-4 mx-auto transition-transform duration-300" />
            <h3 className="text-2xl font-bold mb-2">$1M+ Prizes</h3>
            <p className="text-gray-400">Win big with multiple prize categories</p>
          </div>
          <div 
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 transition-all duration-300 cursor-pointer relative group"
            onMouseEnter={(e) => handleCardHover(e, true)}
            onMouseLeave={(e) => handleCardHover(e, false)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Timer className="w-8 h-8 text-pink-400 mb-4 mx-auto transition-transform duration-300" />
            <h3 className="text-2xl font-bold mb-2">48 Hours</h3>
            <p className="text-gray-400">Build something amazing in one weekend</p>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div ref={scrollIndicatorRef} className="absolute bottom-12 left-0 right-0 flex justify-center">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <p className="text-xs text-gray-400">Scroll to discover more</p>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4cc9f0] to-[#4361ee] blur-md opacity-70 rounded-full animate-pulse"></div>
            <div className="bg-gradient-to-r from-[#4cc9f0] to-[#4361ee] p-2 rounded-full relative z-10">
              <ChevronDown className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
}