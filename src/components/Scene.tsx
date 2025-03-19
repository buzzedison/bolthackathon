import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import Background from './Background';

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
      }}
    >
      <Background />
      <Preload all />
    </Canvas>
  );
}