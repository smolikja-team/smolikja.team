/**
 * VideoLoader Component - Optimizes video loading based on device capabilities
 */
export class VideoLoader {
    constructor() {
        this.supportsWebP = false;
        this.deviceInfo = {
            width: window.innerWidth,
            height: window.innerHeight,
            pixelRatio: window.devicePixelRatio || 1,
            connection: null
        };
        
        this.init();
    }

    init() {
        // Check WebP support
        this.checkWebPSupport();
        
        // Get connection info if available
        this.checkConnectionInfo();
        
        // Listen for screen size changes
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    async checkWebPSupport() {
        const webP = new Image();
        webP.onload = () => { this.supportsWebP = true; };
        webP.onerror = () => { this.supportsWebP = false; };
        webP.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
    }

    checkConnectionInfo() {
        // Use NetworkInformation API if available
        if ('connection' in navigator) {
            this.deviceInfo.connection = navigator.connection;
        }
    }

    handleResize() {
        this.deviceInfo.width = window.innerWidth;
        this.deviceInfo.height = window.innerHeight;
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
            resolutions: ['480p', '720p', '1080p'],
            formats: ['webm', 'mp4'],
            lazy: true
        };

        const config = { ...defaultOptions, ...options };
        
        // Determine optimal resolution based on screen size
        const optimalResolution = this.getOptimalResolution(config.resolutions);
        
        // Determine optimal format based on browser support
        const optimalFormat = this.supportsWebP ? 'webm' : 'mp4';
        
        // Create source elements
        config.formats.forEach(format => {
            const source = document.createElement('source');
            source.type = format === 'webm' ? 'video/webm' : 'video/mp4';
            
            // Use optimal resolution for current format
            const useResolution = format === optimalFormat ? optimalResolution : config.resolutions[0];
            
            // Set source URL
            source.src = `${config.baseDir}${config.fileName}-${useResolution}.${format}`;
            
            // Add to video element
            videoElement.appendChild(source);
        });
        
        // Add loading attribute for lazy loading if browser supports it
        if (config.lazy && 'loading' in HTMLImageElement.prototype) {
            videoElement.setAttribute('loading', 'lazy');
        }
        
        // Preload metadata only
        videoElement.preload = 'metadata';
        
        return true;
    }
    
    /**
     * Determines the optimal video resolution based on device capabilities
     * @param {Array<string>} availableResolutions 
     * @returns {string} - The optimal resolution
     */
    getOptimalResolution(availableResolutions) {
        // Get screen width
        const screenWidth = this.deviceInfo.width * this.deviceInfo.pixelRatio;
        
        // Sort resolutions by numeric value
        const sortedResolutions = [...availableResolutions].sort((a, b) => {
            const aValue = parseInt(a.replace('p', ''));
            const bValue = parseInt(b.replace('p', ''));
            return aValue - bValue;
        });
        
        // Check connection type if available
        let connectionSpeed = 'fast';
        if (this.deviceInfo.connection) {
            const { effectiveType, saveData } = this.deviceInfo.connection;
            if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
                connectionSpeed = 'slow';
            } else if (effectiveType === '3g') {
                connectionSpeed = 'medium';
            }
        }
        
        // Choose resolution based on screen width and connection
        if (connectionSpeed === 'slow') {
            return sortedResolutions[0]; // Lowest resolution
        } else if (connectionSpeed === 'medium' || screenWidth < 1280) {
            return sortedResolutions[Math.min(1, sortedResolutions.length - 1)]; // Medium resolution
        } else {
            return sortedResolutions[sortedResolutions.length - 1]; // Highest resolution
        }
    }
}