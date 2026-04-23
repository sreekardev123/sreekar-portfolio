"use client";

import React from "react";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null!);
  const count = 20;

  const points = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 4;
      const y = (i / count) * 4 - 2;
      arr.push({
        a: new THREE.Vector3(Math.cos(t) * 0.8, y, Math.sin(t) * 0.8),
        b: new THREE.Vector3(Math.cos(t + Math.PI) * 0.8, y, Math.sin(t + Math.PI) * 0.8),
        t,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {points.map((p, i) => {
        const progress = i / count;
        const color = new THREE.Color().lerpColors(
          new THREE.Color("#00f5ff"),
          new THREE.Color("#7c3aed"),
          progress
        );

        return (
          <group key={i}>
            {/* Sphere A */}
            <mesh position={p.a}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
            {/* Sphere B */}
            <mesh position={p.b}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
            {/* Cross bar */}
            {i % 2 === 0 && (
              <mesh position={[0, p.a.y, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 1.6, 8]} />
                <meshStandardMaterial
                  color={color}
                  transparent
                  opacity={0.4}
                  emissive={color}
                  emissiveIntensity={0.3}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

function FloatingCode() {
  const snippets = ["</>", "{ }", "=>", "[]", "npm", "git"];
  const positions: [number, number, number][] = [
    [-2, 1.5, -1],
    [2, -0.5, -1],
    [-1.5, -1.5, 0],
    [2.2, 1.2, 0],
    [-2.2, 0.2, 0.5],
    [1.8, -1.8, -0.5],
  ];

  return (
    <>
      {snippets.map((s, i) => (
        <Float
          key={s}
          speed={1 + i * 0.3}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <mesh position={positions[i]}>
            <planeGeometry args={[0.7, 0.35]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#00f5ff" : "#7c3aed"}
              transparent
              opacity={0.15}
              side={THREE.DoubleSide}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function GlowSphere() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (ref.current) {
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.05;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial
        color="#00f5ff"
        emissive="#00f5ff"
        emissiveIntensity={2}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

export default React.memo(function AboutScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#00f5ff" />
      <pointLight position={[-3, -3, -3]} intensity={1} color="#7c3aed" />
      <directionalLight position={[0, 5, 0]} intensity={1} />

      <DNAHelix />
      <FloatingCode />
      <GlowSphere />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
});
