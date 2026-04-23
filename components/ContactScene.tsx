"use client";

import React from "react";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Torus, Sphere } from "@react-three/drei";
import * as THREE from "three";

function MailIcon() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={1.5} floatIntensity={0.8} rotationIntensity={0.3}>
      <group ref={groupRef}>
        {/* Envelope body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 1.3, 0.1]} />
          <meshStandardMaterial
            color="#00f5ff"
            transparent
            opacity={0.15}
            wireframe
          />
        </mesh>
        {/* Solid back */}
        <mesh position={[0, 0, -0.05]}>
          <boxGeometry args={[2, 1.3, 0.01]} />
          <meshStandardMaterial color="#00f5ff" transparent opacity={0.08} />
        </mesh>

        {/* V flap top */}
        <mesh position={[0, 0.2, 0.06]} rotation={[0, 0, 0]}>
          <boxGeometry args={[1.8, 0.8, 0.01]} />
          <meshStandardMaterial color="#7c3aed" transparent opacity={0.2} />
        </mesh>

        {/* Glow core */}
        <pointLight position={[0, 0, 0.5]} intensity={1.5} color="#00f5ff" distance={3} />
      </group>
    </Float>
  );
}

function OrbitRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * speed;
      ref.current.rotation.z = state.clock.getElapsedTime() * speed * 0.6;
    }
  });
  return (
    <Torus ref={ref} args={[radius, 0.015, 8, 60]}>
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </Torus>
  );
}

function GlowBall({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (ref.current) {
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2 + position[0]) * 0.2;
      ref.current.scale.setScalar(scale);
    }
  });
  return (
    <Float speed={2} floatIntensity={1}>
      <Sphere ref={ref} args={[0.08, 16, 16]} position={position}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </Sphere>
    </Float>
  );
}

export default React.memo(function ContactScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#00f5ff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#7c3aed" />

      <MailIcon />
      <OrbitRing radius={1.8} speed={0.4} color="#00f5ff" />
      <OrbitRing radius={2.4} speed={-0.25} color="#7c3aed" />

      <GlowBall position={[-2, 0.8, 0]} color="#00f5ff" />
      <GlowBall position={[2, -0.5, 0.2]} color="#7c3aed" />
      <GlowBall position={[0.5, 1.5, -0.5]} color="#f59e0b" />
      <GlowBall position={[-1.2, -1.2, 0.3]} color="#ec4899" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
});
