import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { ArrowDown } from 'lucide-react';
import { getDeviceCapabilities, PerformanceMonitor } from '../utils/performance';
import '../styles/hero.css';

// Dynamic constants based on device capabilities
const deviceCaps = getDeviceCapabilities();
const PARTICLE_COUNT = deviceCaps.particleCount;
const ANIMATION_SPEEDS = {
  particles: { x: 0.0005, y: 0.001 },
  torus: { x: 0.01, y: 0.01 },
  sphere: { y: 0.005 }
};
const COLORS = {
  cyan: [0.0, 0.83, 1.0],
  purple: [0.48, 0.17, 0.75],
  gold: [1.0, 0.84, 0.0]
};

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    particles?: THREE.Points;
    torus?: THREE.Mesh;
    sphere?: THREE.Mesh;
    animationId?: number;
    mouseX: number;
    mouseY: number;
    isVisible: boolean;
    performanceMonitor?: PerformanceMonitor;
  }>({ mouseX: 0, mouseY: 0, isVisible: true });

  const [titleText, setTitleText] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const fullTitle = 'U.M.U. TechFest 2025: Genesis of Tomorrow';

  // Memoize typewriter effect
  const typewriterEffect = useCallback(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullTitle.length) {
        setTitleText(fullTitle.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [fullTitle]);

  // Optimized particle generation
  const createParticles = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
      // More efficient position generation
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;

      // Optimized color assignment
      const colorIndex = Math.floor(Math.random() * 3);
      const color = colorIndex === 0 ? COLORS.cyan :
        colorIndex === 1 ? COLORS.purple : COLORS.gold;

      colors[i] = color[0];
      colors[i + 1] = color[1];
      colors[i + 2] = color[2];
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, []);

  // Throttled mouse move handler
  const handleMouseMove = useCallback((event: MouseEvent) => {
    sceneRef.current.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    sceneRef.current.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  }, []);

  // Optimized resize handler
  const handleResize = useCallback(() => {
    const { camera, renderer } = sceneRef.current;
    if (!camera || !renderer) return;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, []);

  // Animation loop with performance optimizations
  const animate = useCallback(() => {
    const { scene, camera, renderer, particles, torus, sphere, isVisible, performanceMonitor } = sceneRef.current;
    if (!scene || !camera || !renderer) return;

    sceneRef.current.animationId = requestAnimationFrame(animate);

    // Skip rendering if not visible for performance
    if (!isVisible) return;

    // Update performance monitor
    if (performanceMonitor) {
      performanceMonitor.update();
    }

    // Batch rotations for better performance
    if (particles) {
      particles.rotation.x += ANIMATION_SPEEDS.particles.x;
      particles.rotation.y += ANIMATION_SPEEDS.particles.y;
    }

    if (torus) {
      torus.rotation.x += ANIMATION_SPEEDS.torus.x;
      torus.rotation.y += ANIMATION_SPEEDS.torus.y;
    }

    if (sphere) {
      sphere.rotation.y += ANIMATION_SPEEDS.sphere.y;
    }

    // Smooth camera movement with lerp (only on desktop for better mobile performance)
    if (!deviceCaps.isMobile) {
      const { mouseX, mouseY } = sceneRef.current;
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
    }

    renderer.render(scene, camera);
  }, []);

  // Intersection Observer for performance
  useEffect(() => {
    if (!canvasRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        sceneRef.current.isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current || !deviceCaps.webgl) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: deviceCaps.quality === 'high' && window.devicePixelRatio < 2,
      powerPreference: 'high-performance'
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Performance monitoring
    const performanceMonitor = new PerformanceMonitor();

    // Create particles with device-appropriate count
    const particlesMaterial = new THREE.PointsMaterial({
      size: deviceCaps.isMobile ? 0.03 : 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(createParticles, particlesMaterial);
    scene.add(particles);

    // Create geometries with adaptive complexity
    const torusSegments = deviceCaps.quality === 'high' ? [16, 100] :
      deviceCaps.quality === 'medium' ? [12, 80] : [8, 60];
    const torusGeometry = new THREE.TorusGeometry(1.5, 0.4, torusSegments[0], torusSegments[1]);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x00D4FF,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    const sphereSegments = deviceCaps.quality === 'high' ? 32 :
      deviceCaps.quality === 'medium' ? 24 : 16;
    const sphereGeometry = new THREE.SphereGeometry(0.8, sphereSegments, sphereSegments);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x7B2CBF,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      particles,
      torus,
      sphere,
      mouseX: 0,
      mouseY: 0,
      isVisible: true,
      performanceMonitor
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Start animation and mark as loaded
    animate();
    setIsLoaded(true);

    // Cleanup function
    return () => {
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }

      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Dispose of Three.js resources
      renderer.dispose();
      createParticles.dispose();
      particlesMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
    };
  }, [createParticles, handleMouseMove, handleResize, animate]);

  // Start typewriter effect
  useEffect(typewriterEffect, [typewriterEffect]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* WebGL Canvas */}
      {deviceCaps.webgl && (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
        />
      )}

      {/* Fallback background for non-WebGL devices */}
      {!deviceCaps.webgl && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A2540] via-[#1A1A1A] to-[#7B2CBF] opacity-80" />
      )}

      {/* Loading indicator */}
      {!isLoaded && deviceCaps.webgl && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0A2540]">
          <div className="w-12 h-12 border-4 border-[#00D4FF] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto h-full flex flex-col justify-center">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 glow-purple leading-tight">
            {titleText}
            <span className="inline-block w-1 h-12 md:h-16 bg-[#7B2CBF] ml-2 animate-pulse"></span>
          </h1>

          <p className="text-xl md:text-3xl mb-8 text-[#231c25] glow-cyan">
            Nov 3-7 | Ignite Innovation at UMU
          </p>
        </div>



        {/* Arrow and Register button at bottom */}
        <div className="flex flex-col items-center pb-10 space-y-6">
          <div className="animate-bounce">
            <ArrowDown className="w-8 h-8 text-[#00D4FF]" />
          </div>

          <a
            href="#events"
            className="px-8 py-4 border-2 border-[#FFD700] text-[#FFD700] rounded-lg font-semibold uppercase tracking-wide hover:bg-[#FFD700] hover:text-[#0A2540] transition-all duration-300 transform hover:scale-105"
          >
            Register Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
