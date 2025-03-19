import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Preload, useScroll, ScrollControls, Html, Float, Text, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { Group } from 'three';
import { sponsors, judges } from '../data/sections';

// Main 3D scene container
export default function InteractiveScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      }}
      dpr={[1, 2]} // Optimized pixel ratio
      gl={{ 
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
    >
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 10, 20]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.3} color="#4361ee" />
      <directionalLight position={[-10, -10, -5]} intensity={0.1} color="#f72585" />
      <spotLight position={[0, 5, 0]} intensity={0.5} penumbra={1} color="#4cc9f0" />
      
      <ScrollControls pages={3} damping={0.3} distance={1}>
        <SceneContent />
        <Preload all />
      </ScrollControls>
      <Environment preset="city" />
      <ParticleField />
    </Canvas>
  );
}

function ParticleField() {
  const particleCount = 200;
  const positions = useRef<Float32Array>();
  const meshRef = useRef<THREE.Points>(null);
  
  useEffect(() => {
    if (!positions.current) {
      positions.current = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions.current[i3] = (Math.random() - 0.5) * 25;
        positions.current[i3 + 1] = (Math.random() - 0.5) * 25;
        positions.current[i3 + 2] = (Math.random() - 0.5) * 25;
      }
    }
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.025) * 0.1;
    }
  });

  return positions.current ? (
    <points ref={meshRef}>
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
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  ) : null;
}

function SceneContent() {
  const sceneRef = useRef<Group>(null);
  const sponsorsRef = useRef<Group>(null);
  const judgesRef = useRef<Group>(null);
  const titleRef = useRef<Group>(null);
  const scroll = useScroll();
  const [section, setSection] = useState(0);
  
  // Handle smooth transitions between sections
  useFrame(() => {
    const scrollOffset = scroll.offset;
    
    // Determine current section (0: intro, 1: sponsors, 2: judges)
    const currentSection = Math.floor(scrollOffset * 3);
    if (currentSection !== section) {
      setSection(currentSection);
    }
    
    // Title animation
    if (titleRef.current) {
      titleRef.current.position.y = 2 - scrollOffset * 5;
      titleRef.current.position.z = scrollOffset * -5;
      titleRef.current.scale.setScalar(1 - scrollOffset * 0.5);
      titleRef.current.rotation.x = scrollOffset * Math.PI * 0.2;
    }
    
    // Transition effect for sponsors section
    if (sponsorsRef.current) {
      const sponsorsProgress = Math.max(0, Math.min(1, scrollOffset * 3 - 0.3));
      gsap.to(sponsorsRef.current.position, {
        y: sponsorsProgress * -1.5 + (1 - sponsorsProgress) * -10,
        z: sponsorsProgress * 1 - 4,
        x: sponsorsProgress * Math.sin(scrollOffset * Math.PI) * 0.3,
        duration: 0.7,
        ease: "power3.out"
      });
      gsap.to(sponsorsRef.current.rotation, {
        y: sponsorsProgress * Math.PI * 0.05,
        x: sponsorsProgress * Math.PI * 0.01,
        duration: 0.8,
        ease: "power2.out"
      });
      sponsorsRef.current.scale.setScalar(0.6 + sponsorsProgress * 0.6);
    }
    
    // Transition effect for judges section
    if (judgesRef.current) {
      const judgesProgress = Math.max(0, Math.min(1, scrollOffset * 3 - 1.3));
      gsap.to(judgesRef.current.position, {
        y: judgesProgress * -1 + (1 - judgesProgress) * -10,
        z: judgesProgress * 2 - 7,
        x: judgesProgress * Math.sin(scrollOffset * Math.PI) * -0.3,
        duration: 0.7,
        ease: "power3.out"
      });
      gsap.to(judgesRef.current.rotation, {
        y: judgesProgress * Math.PI * -0.05,
        x: judgesProgress * Math.PI * 0.02,
        duration: 0.8,
        ease: "power2.out"
      });
      judgesRef.current.scale.setScalar(0.6 + judgesProgress * 0.7);
    }
  });

  return (
    <group ref={sceneRef}>
      {/* Title */}
      <group ref={titleRef} position={[0, 2, 0]}>
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <Text
            font="/fonts/Inter-Bold.woff"
            fontSize={0.8}
            position={[0, 0, 0]}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            SCROLL TO EXPLORE
          </Text>
        </Float>
      </group>
      
      {/* Sponsors Section */}
      <group ref={sponsorsRef} position={[0, -10, -4]}>
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
          <SponsorsSection />
        </Float>
      </group>
      
      {/* Judges Section */}
      <group ref={judgesRef} position={[0, -10, -7]}>
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.1}>
          <JudgesSection />
        </Float>
      </group>
    </group>
  );
}

function SponsorsSection() {
  return (
    <group>
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[6.5, 3.5]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.4} />
        <Html
          transform
          position={[0, 0, 0.1]}
          className="w-[650px] h-[350px] pointer-events-auto"
          distanceFactor={1.5}
        >
          <div className="bg-gradient-to-br from-black/90 to-[#120128]/90 backdrop-blur-md text-white p-8 rounded-2xl w-full h-full overflow-auto flex flex-col border border-[#4cc9f0]/20 shadow-xl shadow-blue-900/20">
            <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#4cc9f0] to-[#4361ee]">OUR SPONSORS</h2>
            <div className="grid grid-cols-3 gap-6 place-items-center">
              {sponsors.map((sponsor) => (
                <a 
                  key={`sponsor-${sponsor.id}`}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-white/10 rounded-lg w-full aspect-video flex items-center justify-center transition-all duration-300 cursor-pointer p-4 border border-white/10 hover:border-[#4cc9f0]/40 hover:shadow-lg hover:shadow-blue-900/20 transform hover:scale-105"
                >
                  <div className="text-xl font-bold text-white/80 bg-clip-text text-transparent bg-gradient-to-r from-[#4cc9f0] to-[#f72585]">
                    {sponsor.name}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Html>
      </mesh>
    </group>
  );
}

function JudgesSection() {
  return (
    <group>
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[7, 4.5]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.4} />
        <Html
          transform
          position={[0, 0, 0.1]}
          className="w-[700px] h-[450px] pointer-events-auto"
          distanceFactor={1.5}
        >
          <div className="bg-gradient-to-br from-black/90 to-[#120128]/90 backdrop-blur-md text-white p-8 rounded-2xl w-full h-full overflow-auto border border-[#f72585]/20 shadow-xl shadow-pink-900/20">
            <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#f72585] to-[#4361ee]">MEET THE JUDGES</h2>
            <div className="grid grid-cols-2 gap-8">
              {judges.map((judge) => (
                <div 
                  key={`judge-${judge.id}`} 
                  className="flex flex-col items-center hover:bg-white/5 p-6 rounded-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-[#f72585]/30 hover:shadow-lg hover:shadow-pink-900/20 transform hover:scale-102"
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#4cc9f0]/20 to-[#f72585]/20 p-1 mb-5 shadow-lg shadow-pink-500/10 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-[#4cc9f0]/40 to-[#f72585]/40">
                      <span className="text-white font-bold">{judge.name.split(' ').map(part => part[0]).join('')}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-1 text-white">{judge.name}</h3>
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
        </Html>
      </mesh>
    </group>
  );
} 