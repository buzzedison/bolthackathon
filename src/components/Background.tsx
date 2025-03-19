import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { random } from 'maath';

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
}

export default function Background() {
  const ref = useRef<THREE.Points>(null);
  const particlesRef = useRef<Particle[]>([]);
  const trophyPointsRef = useRef<THREE.BufferGeometry>(null);
  
  // Generate trophy points
  const generateTrophyPoints = () => {
    const points: number[] = [];
    const numPoints = 2000;
    
    for (let i = 0; i < numPoints; i++) {
      // Base of the trophy
      if (i < numPoints * 0.3) {
        const angle = (i / (numPoints * 0.3)) * Math.PI * 2;
        const radius = 0.3;
        const y = -0.5;
        points.push(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        );
      }
      // Cup part
      else {
        const t = (i - numPoints * 0.3) / (numPoints * 0.7);
        const angle = t * Math.PI * 2;
        const y = t * 1 - 0.5;
        const radius = 0.2 + Math.sin(t * Math.PI) * 0.2;
        points.push(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        );
      }
    }
    
    return new Float32Array(points);
  };

  // Initialize trophy points
  const trophyPoints = useMemo(() => {
    const positions = generateTrophyPoints();
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  // Initialize particles for fireworks
  const initParticles = () => {
    const particles: Particle[] = [];
    const numParticles = 100;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        position: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          Math.random() * 0.1,
          (Math.random() - 0.5) * 0.1
        ),
        life: 0,
        maxLife: 1 + Math.random()
      });
    }

    return particles;
  };

  useEffect(() => {
    particlesRef.current = initParticles();
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Rotate the entire scene
    ref.current.rotation.y += delta * 0.2;

    // Update particles
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    const particles = particlesRef.current;

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      particle.life += delta;

      if (particle.life > particle.maxLife) {
        // Reset particle
        particle.position.set(0, 0, 0);
        particle.velocity.set(
          (Math.random() - 0.5) * 0.1,
          Math.random() * 0.1,
          (Math.random() - 0.5) * 0.1
        );
        particle.life = 0;
        particle.maxLife = 1 + Math.random();
      }

      // Update position
      particle.position.add(particle.velocity);
      particle.velocity.y -= delta * 0.1; // Gravity

      // Update buffer geometry
      const index = i * 3;
      positions[index] = particle.position.x;
      positions[index + 1] = particle.position.y;
      positions[index + 2] = particle.position.z;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <>
      <color attach="background" args={['#000']} />
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref} positions={trophyPoints.attributes.position.array} stride={3} frustumCulled={false}>
          <PointMaterial
            transparent
            color="#ffd700"
            size={0.005}
            sizeAttenuation={true}
            depthWrite={false}
          />
        </Points>
      </group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </>
  );
}