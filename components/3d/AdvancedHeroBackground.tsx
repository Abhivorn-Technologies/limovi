"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── 3D Glowing Wave Mesh ─────────────────────────────────────────────────────
function WaveMesh() {
  const ref = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const width = 120;
    const height = 120;
    
    const colorA = new THREE.Color("#005CB9"); // Deep blue
    const colorB = new THREE.Color("#D4AF37"); // Gold
    const colorC = new THREE.Color("#5BABFF"); // Electric blue
    
    for (let i = 0; i < count; i++) {
      // Distribute points in a wide plane
      const x = (Math.random() - 0.5) * width;
      const z = (Math.random() - 0.5) * height;
      const y = 0;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Randomly assign one of the 3 colors
      const r = Math.random();
      const c = r < 0.6 ? colorB : r < 0.85 ? colorA : colorC;
      
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!ref.current) return;
    
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const z = positions[i + 2];
      
      // Complex undulating noise using sine waves
      const y = 
        Math.sin(x * 0.1 + time * 0.4) * 1.5 + 
        Math.sin(z * 0.1 + time * 0.2) * 1.5 + 
        Math.cos((x + z) * 0.05 + time * 0.3) * 2;
                
      positions[i + 1] = y;
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = time * 0.03; // Slowly rotate entire mesh
  });

  return (
    <points ref={ref} position={[0, -8, -25]} rotation={[0.4, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.25} 
        vertexColors 
        transparent 
        opacity={0.65} 
        sizeAttenuation 
        blending={THREE.AdditiveBlending} 
        depthWrite={false} 
      />
    </points>
  );
}

// ─── Floating Bokeh Spheres ───────────────────────────────────────────────────
function BokehSpheres() {
  const groupRef = useRef<THREE.Group>(null);
  
  const spheres = useMemo(() => {
    return Array.from({ length: 25 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30 + 5,
        (Math.random() - 0.5) * 40 - 15
      ],
      scale: Math.random() * 3 + 0.5,
      speed: Math.random() * 0.4 + 0.1,
      isBlue: Math.random() > 0.7
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(time * spheres[i].speed) * 0.02;
        child.position.x += Math.cos(time * spheres[i].speed * 0.8) * 0.01;
      });
      groupRef.current.rotation.y = time * 0.015;
    }
  });

  return (
    <group ref={groupRef}>
      {spheres.map((s, i) => (
        <mesh key={i} position={s.position as [number, number, number]} scale={s.scale}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial 
            color={s.isBlue ? "#005CB9" : "#FFD54F"} 
            transparent 
            opacity={s.isBlue ? 0.08 : 0.05} 
            blending={THREE.AdditiveBlending} 
            depthWrite={false} 
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function AdvancedHeroBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "#081224" }}>
      {/* Underlying CSS gradient so the edges match the site theme */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 80% 70% at 62% 55%, rgba(16,42,86,0.6) 0%, rgba(10,24,46,0.7) 45%, #060B14 100%)",
        zIndex: 1
      }} />
      
      {/* Ambient top-left flare specifically to highlight the dark LIMOVI logo */}
      <div className="absolute top-0 left-0 w-[800px] h-[400px]" style={{
        background: "radial-gradient(ellipse at 10% 10%, rgba(255,255,255,0.08) 0%, rgba(91,171,255,0.04) 40%, transparent 70%)",
        zIndex: 2
      }} />

      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 2, 10], fov: 60 }} dpr={[1, 2]}>
          <fog attach="fog" args={['#050505', 10, 50]} />
          <ambientLight intensity={0.5} />
          
          <WaveMesh />
          <BokehSpheres />
        </Canvas>
      </div>
    </div>
  );
}
