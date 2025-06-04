/**
 * Utility functions for browser and device detection
 */

/**
 * Detect if the current browser is Safari
 */
export function isSafari(): boolean {
  if (typeof window === 'undefined') return false;
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

/**
 * Detect if the current device is iOS
 */
export function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

/**
 * Detect user's connection speed
 */
export function getConnectionSpeed(): 'slow' | 'medium' | 'fast' {
  if (typeof window === 'undefined') return 'fast';
  
  if ('connection' in navigator) {
    const connection = (navigator as { connection: { effectiveType: string } }).connection;
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return 'slow';
    } else if (connection.effectiveType === '3g') {
      return 'medium';
    }
  }
  
  return 'fast';
}

/**
 * Check if the browser supports WebM video format
 */
export function supportsWebM(): boolean {
  if (typeof window === 'undefined') return false;
  const video = document.createElement('video');
  return video.canPlayType('video/webm') !== '';
}

/**
 * Get optimal video resolution based on viewport and connection
 */
export function getOptimalVideoResolution(connectionSpeed: string = 'fast'): string {
  if (typeof window === 'undefined') return '1080p';
  
  const width = window.innerWidth;
  const height = window.innerHeight;
  const maxDimension = Math.max(width, height);
  
  // Adjust resolution based on connection speed
  if (connectionSpeed === 'slow') {
    if (maxDimension <= 720) return '480p';
    if (maxDimension <= 1080) return '720p';
    return '1080p'; // Cap at 1080p for slow connections
  }
  
  if (maxDimension <= 480) return '480p';
  if (maxDimension <= 720) return '720p';
  if (maxDimension <= 1080) return '1080p';
  return '2160p';
}
