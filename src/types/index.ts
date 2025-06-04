/**
 * Type definitions for the portfolio application
 */

export interface VideoConfig {
  baseUrl: string;
  formats: readonly string[];
  resolutions: readonly string[];
}

export interface BrowserCapabilities {
  supportsWebM: boolean;
  isIOS: boolean;
  connectionSpeed: 'slow' | 'medium' | 'fast';
}

export interface VideoState {
  resolution: string;
  error: boolean;
  shouldLoad: boolean;
  loaded: boolean;
  useStaticFallback: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  featured?: boolean;
}

export interface WindowWithObserver extends Window {
  lazyImageObserver?: IntersectionObserver;
}

export interface WrapperElementWithCleanup extends HTMLElement {
  cleanup?: () => void;
}
