/**
 * Utility constants for the portfolio application
 */

export const APP_CONFIG = {
  name: 'smolikja team',
  description: 'Professional mobile app development team',
  url: 'https://smolikja.team',
  version: '1.0.1',
} as const;

export const VIDEO_CONFIG = {
  baseUrl: 'https://smolikja.team/assets/loop2x/team-logo-',
  formats: ['webm', 'mp4'] as const,
  resolutions: ['480p', '720p', '1080p', '2160p'] as const,
} as const;

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
} as const;

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;
