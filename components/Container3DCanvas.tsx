"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Container3DProps {
  containerCount?: number;
  isHighCube?: boolean;
  commodityType?: "rice" | "dryfruits" | "sugar" | "coffee";
  className?: string;
}

export default function Container3DCanvas({
  containerCount = 1,
  isHighCube = false,
  commodityType = "rice",
  className = "w-full h-44 sm:h-52",
}: Container3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const containerGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef(0);
  const isVisibleRef = useRef(true);

  // Commodity color highlights
  const commodityColors: Record<string, number> = {
    rice: 0x800020, // Vivid Monagrow Maroon
    dryfruits: 0x8a3324, // Warm Russet
    sugar: 0x1f4e5b, // Deep Port Teal
    coffee: 0x3d2314, // Roasted Espresso
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 200;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(4.2, 2.8, 5.0);
    camera.lookAt(0, 0.2, 0);

    // 2. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Lighting setup (Port & Maritime Sun)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e6, 2.2);
    sunLight.position.set(5, 8, 4);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0xa5c4d4, 1.2);
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);

    const underGlow = new THREE.PointLight(0xe9c46a, 0.6, 6);
    underGlow.position.set(0, -1, 0);
    scene.add(underGlow);

    // 4. Ground Shadow Catcher
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.25 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.65;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // 5. Build 3D Container Model
    const containerGroup = new THREE.Group();
    scene.add(containerGroup);
    containerGroupRef.current = containerGroup;

    const buildContainer = (x: number, y: number, z: number, colorHex: number) => {
      const boxG = new THREE.Group();
      boxG.position.set(x, y, z);

      const length = isHighCube ? 3.6 : 3.0;
      const heightBox = isHighCube ? 1.4 : 1.25;
      const widthBox = 1.25;

      // Main container body
      const bodyMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        roughness: 0.35,
        metalness: 0.45,
      });

      const bodyGeo = new THREE.BoxGeometry(length, heightBox, widthBox);
      const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
      bodyMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
      boxG.add(bodyMesh);

      // Corrugated Ribs / Panels on side
      const ribCount = 14;
      const ribMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorHex).multiplyScalar(0.85),
        roughness: 0.4,
        metalness: 0.5,
      });

      for (let i = 0; i < ribCount; i++) {
        const posX = -length / 2 + 0.2 + (i * (length - 0.4)) / (ribCount - 1);
        const ribGeo = new THREE.BoxGeometry(0.04, heightBox - 0.1, 0.05);
        
        // Front rib
        const ribFront = new THREE.Mesh(ribGeo, ribMat);
        ribFront.position.set(posX, 0, widthBox / 2 + 0.015);
        boxG.add(ribFront);

        // Back rib
        const ribBack = new THREE.Mesh(ribGeo, ribMat);
        ribBack.position.set(posX, 0, -widthBox / 2 - 0.015);
        boxG.add(ribBack);
      }

      // Corner casting blocks (Steel reinforced corner points)
      const cornerMat = new THREE.MeshStandardMaterial({
        color: 0x222222,
        roughness: 0.6,
        metalness: 0.8,
      });
      const cornerGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);

      const corners = [
        [-length / 2, -heightBox / 2, -widthBox / 2],
        [length / 2, -heightBox / 2, -widthBox / 2],
        [-length / 2, heightBox / 2, -widthBox / 2],
        [length / 2, heightBox / 2, -widthBox / 2],
        [-length / 2, -heightBox / 2, widthBox / 2],
        [length / 2, -heightBox / 2, widthBox / 2],
        [-length / 2, heightBox / 2, widthBox / 2],
        [length / 2, heightBox / 2, widthBox / 2],
      ];

      corners.forEach(([cx, cy, cz]) => {
        const cMesh = new THREE.Mesh(cornerGeo, cornerMat);
        cMesh.position.set(cx, cy, cz);
        boxG.add(cMesh);
      });

      // Stencil / Logo Plate on side
      const canvasText = document.createElement("canvas");
      canvasText.width = 512;
      canvasText.height = 128;
      const ctx = canvasText.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.fillRect(0, 0, 512, 128);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 44px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("MONAGROW GLOBAL", 256, 52);
        ctx.font = "bold 24px sans-serif";
        ctx.fillStyle = "#e9c46a";
        ctx.fillText(isHighCube ? "40FT HIGH CUBE · BULK FREIGHT" : "20FT DRY CONTAINER · FOOD GRADE", 256, 94);
      }

      const textTex = new THREE.CanvasTexture(canvasText);
      const textMat = new THREE.MeshBasicMaterial({
        map: textTex,
        transparent: true,
      });
      const textPlane = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 0.5), textMat);
      textPlane.position.set(0, 0.1, widthBox / 2 + 0.045);
      boxG.add(textPlane);

      return boxG;
    };

    // Build single or stacked containers based on quantity
    const color = commodityColors[commodityType] || 0x800020;
    if (containerCount >= 2) {
      containerGroup.add(buildContainer(0, -0.1, 0, color));
      containerGroup.add(buildContainer(0.2, 1.3, -0.15, 0x1f4e5b));
    } else {
      containerGroup.add(buildContainer(0, 0.1, 0, color));
    }

    // 6. Floating Ambient Grains / Trade Dust Particles
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = Math.random() * 4 - 0.5;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe9c46a,
      size: 0.06,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 7. Mouse move & Scroll Listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x * 0.45;
      mouseRef.current.targetY = y * 0.3;
    };

    const handleScroll = () => {
      const scrollPos = window.scrollY || window.pageYOffset;
      scrollRef.current = scrollPos * 0.001;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    container.addEventListener("mousemove", handleMouseMove);

    // 8. Visibility check via IntersectionObserver
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    });
    observer.observe(container);

    // 9. Resize Listener
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 200;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 10. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      if (containerGroupRef.current) {
        // Base subtle float + mouse rotation + scroll rotation
        const baseRotY = -0.45 + mouseRef.current.x + Math.sin(elapsedTime * 0.6) * 0.08 + scrollRef.current;
        const baseRotX = 0.12 - mouseRef.current.y + Math.cos(elapsedTime * 0.7) * 0.04;

        containerGroupRef.current.rotation.y = baseRotY;
        containerGroupRef.current.rotation.x = baseRotX;
        containerGroupRef.current.position.y = Math.sin(elapsedTime * 1.2) * 0.06;
      }

      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.04;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [containerCount, isHighCube, commodityType]);

  return (
    <div className={`relative overflow-hidden cursor-grab active:cursor-grabbing ${className}`}>
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-medium text-emerald-300 border border-emerald-500/30 select-none pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>Live 3D Cargo</span>
      </div>
      <div className="absolute bottom-2 left-2 text-[10px] text-stone-500 select-none pointer-events-none">
        Hover to rotate in 3D
      </div>
    </div>
  );
}
