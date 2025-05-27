import { browserDetection } from '../utils/browserDetection.js';

/**
 * VideoLoader Component - Optimizes video loading based on device capabilities
 * Now uses centralized browser detection for better maintainability
 */
export class VideoLoader {
    constructor() {
        this.detection = browserDetection;
        
        // Listen for screen size changes to update device detection
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleResize() {
        // Update device detection on resize
        this.detection.device = this.detection.detectDevice();
    }

    /**
     * Loads the best video source based on device capabilities
     * @param {HTMLVideoElement} videoElement - The video element to enhance
     * @param {Object} options - Configuration options
     * @param {string} options.baseDir - Base directory for video assets
     * @param {string} options.fileName - Base file name without extension
     * @param {Array<string>} options.resolutions - Available resolutions (e.g., ['480p', '720p', '1080p'])
     * @param {Array<string>} options.formats - Available formats (e.g., ['webm', 'mp4'])
     * @param {boolean} options.lazy - Whether to lazy load the video (default: true)
     * @returns {Promise<boolean>} - Success status
     */
    enhanceVideo(videoElement, options) {
        if (!videoElement) {
            console.error('VideoLoader: No video element provided');
            return false;
        }

        const defaultOptions = {
            baseDir: 'https://smolikja.team/assets/portfolio-web/loop2x/',
            fileName: 'team-logo',
            resolutions: ['480p', '720p', '1080p', '2160p'],
            formats: ['webm', 'mp4'],
            lazy: true
        };

        const config = { ...defaultOptions, ...options };
        
        // Use centralized detection for optimal settings
        const optimalResolution = this.detection.getOptimalVideoResolution(config.resolutions);
        const preferredFormat = this.detection.getPreferredVideoFormat();
        
        // Create sources in order of preference
        const formats = preferredFormat === 'webm' ? ['webm', 'mp4'] : ['mp4'];
        
        formats.forEach(format => {
            if (config.formats.includes(format)) {
                const source = document.createElement('source');
                source.type = format === 'webm' ? 'video/webm' : 'video/mp4';
                source.src = `${config.baseDir}${config.fileName}-${optimalResolution}.${format}`;
                videoElement.appendChild(source);
            }
        });
        
        // Apply mobile Safari specific attributes if needed
        if (this.detection.needsMobileSafariWorkarounds()) {
            videoElement.setAttribute('playsinline', 'true');
            videoElement.setAttribute('webkit-playsinline', 'true');
        }
        
        // Add loading attribute for lazy loading if supported
        if (config.lazy && 'loading' in HTMLImageElement.prototype) {
            videoElement.setAttribute('loading', 'lazy');
        }
        
        // Optimize preload based on connection
        if (this.detection.device.slowConnection) {
            videoElement.preload = 'none';
        } else {
            videoElement.preload = 'metadata';
        }
        
        return true;
    }
}