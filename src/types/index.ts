/**
 * Type definitions for the portfolio application
 */

export type Language = 'cs' | 'en';

export type LocalizedString = Record<Language, string>;

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
  alt: LocalizedString;
  width: number;
  height: number;
}

export interface ProjectLink {
  href: string;
  label: LocalizedString;
}

export interface Project {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  secondaryDescription?: LocalizedString;
  secondaryLink?: ProjectLink;
  images: ProjectImage[];
}
