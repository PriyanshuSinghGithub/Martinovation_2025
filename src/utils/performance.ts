// Performance monitoring utilities for Three.js scenes

export class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 60;
  private fpsCallback?: (fps: number) => void;

  constructor(callback?: (fps: number) => void) {
    this.fpsCallback = callback;
  }

  update() {
    this.frameCount++;
    const currentTime = performance.now();
    
    if (currentTime >= this.lastTime + 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
      this.frameCount = 0;
      this.lastTime = currentTime;
      
      if (this.fpsCallback) {
        this.fpsCallback(this.fps);
      }
    }
  }

  getFPS() {
    return this.fps;
  }
}

// Device capability detection
export const getDeviceCapabilities = () => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  if (!gl) {
    return { 
      webgl: false, 
      maxTextureSize: 0, 
      particleCount: 500,
      quality: 'low'
    };
  }

  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  const renderer = gl.getParameter(gl.RENDERER);
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Determine optimal settings based on device
  let particleCount = 2000;
  let quality = 'high';
  
  if (isMobile) {
    particleCount = 800;
    quality = 'medium';
  } else if (maxTextureSize < 4096) {
    particleCount = 1200;
    quality = 'medium';
  }

  return {
    webgl: true,
    maxTextureSize,
    particleCount,
    quality,
    isMobile,
    renderer: renderer?.toString() || 'unknown'
  };
};

// Adaptive quality settings
export const getAdaptiveSettings = (fps: number) => {
  if (fps < 30) {
    return {
      particleCount: 800,
      antialias: false,
      shadowMap: false,
      quality: 'low'
    };
  } else if (fps < 45) {
    return {
      particleCount: 1200,
      antialias: false,
      shadowMap: true,
      quality: 'medium'
    };
  } else {
    return {
      particleCount: 2000,
      antialias: true,
      shadowMap: true,
      quality: 'high'
    };
  }
};