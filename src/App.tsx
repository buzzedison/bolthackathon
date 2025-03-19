import React, { useState, useEffect, useRef } from 'react';
import Scene from './components/Scene';
import Hero from './components/Hero';
import SponsorsAndJudges from './components/SponsorsAndJudges';

function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  // Handle intersection observer for section transitions
  useEffect(() => {
    // Track which sections are visible in the viewport
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLDivElement;
        
        // Add or remove visible class based on intersection
        if (entry.isIntersecting) {
          target.classList.add('visible');
          
          // Set active section for navigation highlighting
          if (target.id) {
            setActiveSection(target.id);
          }
        } else {
          // Keep elements visible once they've been seen when scrolling down
          if (entry.boundingClientRect.y > 0) {
            target.classList.remove('visible');
          }
        }
      });
    };

    // Create observer with threshold to trigger when section is partially visible
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.15,
      rootMargin: '-10% 0px -10% 0px' // Adjust trigger area slightly
    });

    // Observe all section elements
    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
      sectionsRef.current.push(section as HTMLDivElement);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-black min-h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>
      
      <div className="relative z-10">
        <section id="hero" className="min-h-screen flex items-center justify-center">
          <Hero />
        </section>
        
        <section id="sponsors-judges" className="min-h-screen">
          <SponsorsAndJudges />
        </section>
      </div>
      
      {/* Floating navigation indicator */}
      <div className="fixed bottom-8 right-8 z-50 opacity-70 hover:opacity-100 transition-opacity duration-300">
        <div className="flex flex-col gap-2 items-center">
          <div 
            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === 'hero' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125' 
              : 'bg-white/50'}`}
            onClick={() => {
              document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          <div 
            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === 'sponsors-judges'
              ? 'bg-gradient-to-r from-[#4cc9f0] to-[#f72585] scale-125' 
              : 'bg-white/50'}`}
            onClick={() => {
              document.getElementById('sponsors-judges')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;