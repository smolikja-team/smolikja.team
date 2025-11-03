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

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProjectLink {
  href: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  secondaryDescription?: string;
  secondaryLink?: ProjectLink;
  images: ProjectImage[];
}
