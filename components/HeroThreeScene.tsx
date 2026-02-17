'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function OrbitalSystem() {
  const groupRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);

  const arcPointsA = useMemo(() => {
    const points: number[] = [];
    const segments = 120;
    const radius = 1.92;

    for (let i = 0; i <= segments; i += 1) {
      const t = (i / segments) * Math.PI * 2;
      points.push(Math.cos(t) * radius, Math.sin(t) * radius, Math.sin(t * 1.6) * 0.06);
    }

    return new Float32Array(points);
  }, []);

  const arcPointsB = useMemo(() => {
    const points: number[] = [];
    const segments = 120;
    const radius = 2.18;

    for (let i = 0; i <= segments; i += 1) {
      const t = (i / segments) * Math.PI * 2;
      points.push(Math.cos(t) * radius, Math.sin(t) * radius, Math.cos(t * 1.35) * 0.08);
    }

    return new Float32Array(points);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || !shellRef.current || !ringARef.current || !ringBRef.current) return;

    groupRef.current.rotation.z += delta * 0.056;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.175) * 0.08;
    ringARef.current.rotation.z += delta * 0.154;
    ringBRef.current.rotation.z -= delta * 0.126;
    shellRef.current.rotation.x += delta * 0.042;
    shellRef.current.rotation.y += delta * 0.056;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={shellRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[0.92, 1]} />
        <meshBasicMaterial color="#E5E7EB" wireframe transparent opacity={0.35} />
      </mesh>

      <mesh ref={ringARef} rotation={[0.9, 0.25, 0.15]}>
        <torusGeometry args={[1.38, 0.018, 8, 140]} />
        <meshBasicMaterial color="#E2E8F0" transparent opacity={0.34} />
      </mesh>

      <mesh ref={ringBRef} rotation={[1.22, -0.28, -0.1]}>
        <torusGeometry args={[1.66, 0.014, 8, 160]} />
        <meshBasicMaterial color="#CBD5E1" transparent opacity={0.3} />
      </mesh>

      <lineLoop rotation={[0.28, 0.12, 0.2]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[arcPointsA, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#FFFFFF" transparent opacity={0.22} />
      </lineLoop>

      <lineLoop rotation={[0.72, -0.24, -0.12]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[arcPointsB, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#CBD5E1" transparent opacity={0.17} />
      </lineLoop>
    </group>
  );
}

function DustField() {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const total = 168;
    const positions = new Float32Array(total * 3);

    for (let i = 0; i < total; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.2 + Math.random() * 0.9;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.32;
    }

    return positions;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.z -= delta * 0.028;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#FFFFFF" size={0.01} transparent opacity={0.34} sizeAttenuation />
    </points>
  );
}

export function HeroThreeScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 4.8], fov: 34 }}
      className="h-full w-full"
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[1.6, 2, 2]} intensity={0.32} color="#E2E8F0" />
      <directionalLight position={[-2, -1, 1]} intensity={0.2} color="#FFFFFF" />
      <OrbitalSystem />
      <DustField />
    </Canvas>
  );
}
