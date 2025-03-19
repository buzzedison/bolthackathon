import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Group } from 'three';
import { sponsors, judges } from '../data/sections';

// Main 3D scene container - simplified for performance
export default function InteractiveScene() {
  const isMobile = useRef(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => {
      isMobile.current = window.innerWidth < 768;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative">
      {/* Fixed canvas with reduced 3D elements */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0
        }}
        dpr={1} // Reduced for performance
        gl={{ 
          antialias: false,
          alpha: true,
          depth: true,
          powerPreference: "default",
        }}
      >
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[0, 5, 5]} intensity={0.5} />
        <MinimalScene isMobile={isMobile} />
      </Canvas>

      {/* Regular HTML content for sponsors/judges sections */}
      <div className="relative z-10">
        {/* First screen - Title only */}
        <div className="h-screen w-full flex items-center justify-center">
          <div className="invisible">WORLDS LARGEST HACKATHON</div>
        </div>
        
        {/* Sponsors Section */}
        <div className="min-h-screen w-full flex items-center justify-center py-16">
          <div className="w-[90%] max-w-[900px] mx-auto bg-black/90 text-white p-6 rounded-xl border border-[#4cc9f0]/20 shadow-lg shadow-blue-900/20">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center text-[#4cc9f0]">OUR SPONSORS</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
              {sponsors.map((sponsor, index) => {
                const colors = ["4cc9f0", "4361ee", "3a0ca3", "7209b7", "f72585", "480ca8"];
                const color1 = colors[index % colors.length];
                const color2 = colors[(index + 2) % colors.length];
                
                return (
                  <a 
                    key={`sponsor-${sponsor.id}`}
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 hover:bg-white/10 rounded-lg w-full aspect-video flex items-center justify-center cursor-pointer p-3 border border-white/10 hover:border-[#4cc9f0]/40 hover:shadow-lg hover:shadow-blue-900/10 transform hover:scale-105 transition-all"
                    style={{
                      background: `linear-gradient(135deg, #${color1}20, #${color2}20)`,
                    }}
                  >
                    <div className="bg-gradient-to-r from-[#4cc9f0] to-[#f72585] bg-clip-text text-transparent text-lg md:text-xl font-bold text-center">
                      {sponsor.name}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Judges Section */}
        <div className="min-h-screen w-full flex items-center justify-center py-16">
          <div className="w-[90%] max-w-[1000px] mx-auto bg-black/90 text-white p-6 rounded-xl border border-[#f72585]/20 shadow-lg shadow-pink-900/20 max-h-[90vh] overflow-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center text-[#f72585]">MEET THE JUDGES</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {judges.map((judge, index) => {
                const colors = ["4cc9f0", "4361ee", "7209b7", "f72585"];
                const bgColor = colors[index % colors.length];
                return (
                  <div 
                    key={`judge-${judge.id}`} 
                    className="flex flex-col items-center hover:bg-white/5 p-4 rounded-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-[#f72585]/30 hover:shadow-lg hover:shadow-pink-900/20"
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 shadow-lg overflow-hidden">
                      <img 
                        src={`https://via.placeholder.com/300x300/${bgColor}/FFFFFF?text=${judge.name.split(' ').map(part => part[0]).join('')}`}
                        alt={judge.name}
                        className="w-full h-full object-cover"
                        loading="eager" 
                      />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-1 text-white text-center">{judge.name}</h3>
                    {judge.title && (
                      <h4 className="text-sm md:text-base text-[#4cc9f0] mb-2 font-medium text-center">{judge.title}</h4>
                    )}
                    <p className="text-xs md:text-sm text-gray-300 text-center leading-relaxed">
                      {judge.bio}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simplified minimal scene with just particles and title
function MinimalScene({ isMobile }: { isMobile: React.MutableRefObject<boolean> }) {
  const particleCount = isMobile.current ? 50 : 100; // Reduced count
  const particlesRef = useRef<THREE.Points>(null);
  const titleRef = useRef<Group>(null);
  const positions = useRef<Float32Array>(new Float32Array(particleCount * 3));
  
  // Generate particle positions once
  useEffect(() => {
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions.current[i3] = (Math.random() - 0.5) * 20;
      positions.current[i3 + 1] = (Math.random() - 0.5) * 20;
      positions.current[i3 + 2] = (Math.random() - 0.5) * 20;
    }
  }, [particleCount]);
  
  // Simple animation for particles and title
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
    
    if (titleRef.current) {
      titleRef.current.position.y = 2 + Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
    
    // Listen to scroll for simple parallax
    if (typeof window !== 'undefined') {
      const scrollY = window.scrollY;
      const scrollProgress = scrollY / (window.innerHeight * 2);
      
      if (titleRef.current) {
        titleRef.current.position.y = 2 - scrollProgress * 4;
        titleRef.current.rotation.x = scrollProgress * Math.PI * 0.1;
        titleRef.current.position.z = -scrollProgress * 2;
      }
    }
  });
  
  return (
    <>
      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions.current}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#4cc9f0"
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>
      
      {/* Title */}
      <group ref={titleRef} position={[0, 2, 0]}>
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
          <Text
            fontSize={0.7}
            position={[0, 0, 0]}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            SCROLL TO EXPLORE
          </Text>
        </Float>
      </group>
    </>
  );
} 