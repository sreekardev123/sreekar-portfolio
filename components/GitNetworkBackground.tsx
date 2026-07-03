"use client";

import React, { useRef, useEffect } from "react";

export default function GitNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Configuration
    const nodeCount = 40;
    const maxDistance = 150;
    const connectionCount = 2; // max connections per node
    
    // State
    const nodes: Node[] = [];
    const lines: Line[] = [];
    const pulses: Pulse[] = [];
    const mouse = { x: -1000, y: -1000, radius: 200 };

    // Resize handler
    const resize = () => {
      // Find parent section
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth;
      height = parent?.clientHeight || window.innerHeight;
      
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener("resize", resize);
    setTimeout(resize, 10);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    class Node {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 1.5; // Faster movement
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 2 + 1.5; // Slightly larger nodes
      }

      update() {
        this.baseX += this.vx;
        this.baseY += this.vy;

        if (this.baseX < 0 || this.baseX > width) this.vx *= -1;
        if (this.baseY < 0 || this.baseY > height) this.vy *= -1;

        const dx = mouse.x - this.baseX;
        const dy = mouse.y - this.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const pushX = forceDirectionX * force * 50; // stronger push
          const pushY = forceDirectionY * force * 50;
          
          this.x += ((this.baseX - pushX) - this.x) * 0.1;
          this.y += ((this.baseY - pushY) - this.y) * 0.1;
        } else {
          this.x += (this.baseX - this.x) * 0.05;
          this.y += (this.baseY - this.y) * 0.05;
        }
      }

      draw() {
        if (!ctx) return;
        
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let opacity = 0.4;
        if (distance < mouse.radius) {
          opacity = 0.4 + (1 - distance / mouse.radius) * 0.6;
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${opacity})`;
        ctx.fill();
        
        if (distance < mouse.radius) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 245, 255, ${opacity * 0.3})`;
          ctx.fill();
        }
      }
    }

    // Initialization
    const init = () => {
      // Create nodes dynamically based on screen size (more nodes for larger screens)
      const calculatedNodeCount = Math.floor((width * height) / 15000); 
      for (let i = 0; i < calculatedNodeCount; i++) {
        nodes.push(new Node());
      }
    };

    // Animation Loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw nodes
      nodes.forEach(node => {
        node.update();
        node.draw();
      });

      // Draw lines dynamically in the animation loop so they connect as nodes move
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            let opacity = 1 - distance / 200;
            opacity *= 0.4; // Base opacity
            
            const midX = (nodes[i].x + nodes[j].x) / 2;
            const midY = (nodes[i].y + nodes[j].y) / 2;
            const mdx = mouse.x - midX;
            const mdy = mouse.y - midY;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            
            if (mDist < mouse.radius) {
              opacity += (1 - mDist / mouse.radius) * 0.5;
            }

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    // We must call resize FIRST before init to set width/height
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto">
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(13,17,23,0) 0%, rgba(13,17,23,0.95) 100%)",
          zIndex: 1
        }}
      />
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ opacity: 1 }}
      />
    </div>
  );
}
