import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

interface SceneConfig {
  particleCount?: number;
  enableMouseInteraction?: boolean;
  enableAutoRotation?: boolean;
}

export const useThreeScene = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  config: SceneConfig = {}
) => {
  const {
    particleCount = 2000,
    enableMouseInteraction = true,
    enableAutoRotation = true
  } = config;

  const sceneRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    objects: THREE.Object3D[];
    animationId?: number;
    mouseX: number;
    mouseY: number;
    isVisible: boolean;
  }>({
    objects: [],
    mouseX: 0,
    mouseY: 0,
    isVisible: true
  });

  // Intersection Observer for performance optimization
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
  }, [canvasRef]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!enableMouseInteraction) return;
    
    sceneRef.current.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    sceneRef.current.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  }, [enableMouseInteraction]);

  const handleResize = useCallback(() => {
    const { camera, renderer } = sceneRef.current;
    if (!camera || !renderer) return;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, []);

  const animate = useCallback(() => {
    const { scene, camera, renderer, objects, isVisible } = sceneRef.current;
    if (!scene || !camera || !renderer) return;

    sceneRef.current.animationId = requestAnimationFrame(animate);

    // Skip rendering if not visible for performance
    if (!isVisible) return;

    // Auto-rotation
    if (enableAutoRotation) {
      objects.forEach((obj, index) => {
        if (obj.type === 'Points') {
          obj.rotation.x += 0.0005;
          obj.rotation.y += 0.001;
        } else if (obj.geometry?.type === 'TorusGeometry') {
          obj.rotation.x += 0.01;
          obj.rotation.y += 0.01;
        } else if (obj.geometry?.type === 'SphereGeometry') {
          obj.rotation.y += 0.005;
        }
      });
    }

    // Mouse interaction
    if (enableMouseInteraction) {
      const { mouseX, mouseY } = sceneRef.current;
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
    }

    renderer.render(scene, camera);
  }, [enableAutoRotation, enableMouseInteraction]);

  const addObject = useCallback((object: THREE.Object3D) => {
    const { scene } = sceneRef.current;
    if (scene) {
      scene.add(object);
      sceneRef.current.objects.push(object);
    }
  }, []);

  const cleanup = useCallback(() => {
    if (sceneRef.current.animationId) {
      cancelAnimationFrame(sceneRef.current.animationId);
    }
    
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', handleResize);
    
    const { renderer, objects } = sceneRef.current;
    
    // Dispose of all objects
    objects.forEach(obj => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach(mat => mat.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });
    
    if (renderer) {
      renderer.dispose();
    }
  }, [handleMouseMove, handleResize]);

  return {
    sceneRef,
    addObject,
    animate,
    handleMouseMove,
    handleResize,
    cleanup
  };
};