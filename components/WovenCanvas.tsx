"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function WovenCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    let width = container.clientWidth || 350;
    let height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 4.2;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio to 2 for performance
    container.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    // Color Palette: Cyan and Purple
    const colorsList = [
      new THREE.Color("#00f5d4"), // Cyan
      new THREE.Color("#9b5de5"), // Purple
      new THREE.Color("#00bbf9"), // Ocean Blue
      new THREE.Color("#f15bb5"), // Hot Pink
    ];

    // --- Torus Knot Particle Setup ---
    const particleCount = 25000; // Optimized count for 60fps on mobile
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    
    // Generate torus knot shape geometry to pull points from
    const torusKnot = new THREE.TorusKnotGeometry(1.2, 0.35, 180, 24);
    const torusPositions = torusKnot.attributes.position;
    const torusCount = torusPositions.count;

    for (let i = 0; i < particleCount; i++) {
      const idx = i % torusCount;
      const x = torusPositions.getX(idx) + (Math.random() - 0.5) * 0.05;
      const y = torusPositions.getY(idx) + (Math.random() - 0.5) * 0.05;
      const z = torusPositions.getZ(idx) + (Math.random() - 0.5) * 0.05;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Select random brand color
      const color = colorsList[Math.floor(Math.random() * colorsList.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom Canvas round particle shader/material style
    const material = new THREE.PointsMaterial({
      size: 0.016,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Mouse movement tracker (relative to the container bounding box)
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;

      // Normalized coordinates (-1.5 to 1.5 range)
      targetMouse.x = (clientX / rect.width) * 3.0 - 1.5;
      targetMouse.y = -(clientY / rect.height) * 3.0 + 1.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const mouseWorld = new THREE.Vector3();
    const velocityVec = new THREE.Vector3();
    const currentPos = new THREE.Vector3();
    const originalPos = new THREE.Vector3();

    const animate = () => {
      const frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation (lerp)
      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;

      mouseWorld.set(mouse.x, mouse.y, 0);

      const posArr = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        currentPos.set(posArr[ix], posArr[iy], posArr[iz]);
        originalPos.set(originalPositions[ix], originalPositions[iy], originalPositions[iz]);
        velocityVec.set(velocities[ix], velocities[iy], velocities[iz]);

        const dist = currentPos.distanceTo(mouseWorld);

        // Repel force if mouse is close
        if (dist < 1.0) {
          const force = (1.0 - dist) * 0.08;
          const direction = new THREE.Vector3().subVectors(currentPos, mouseWorld).normalize();
          velocityVec.add(direction.multiplyScalar(force));
        }

        // Return force back to original mesh layout position
        const returnForce = new THREE.Vector3()
          .subVectors(originalPos, currentPos)
          .multiplyScalar(0.015);
        velocityVec.add(returnForce);

        // Damping/Friction
        velocityVec.multiplyScalar(0.88);

        posArr[ix] += velocityVec.x;
        posArr[iy] += velocityVec.y;
        posArr[iz] += velocityVec.z;

        velocities[ix] = velocityVec.x;
        velocities[iy] = velocityVec.y;
        velocities[iz] = velocityVec.z;
      }
      
      geometry.attributes.position.needsUpdate = true;

      // Gentle continuous rotation
      points.rotation.y = elapsedTime * 0.12;
      points.rotation.x = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    const animateId = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animateId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full min-h-[350px]" />;
}
