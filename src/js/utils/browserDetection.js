/**
 * Unified Browser Detection and Feature Support
 * Centralizes all browser-specific logic to minimize scattered implementations
 */

export class BrowserDetection {
    constructor() {
        this.features = this.detectFeatures();
        this.browser = this.detectBrowser();
        this.device = this.detectDevice();
    }

    /**
     * Modern feature detection instead of browser sniffing
     * Uses progressive enhancement approach
     */
    detectFeatures() {
        return {
            // Video support
            webm: this.supportsVideoFormat('video/webm'),
            mp4: this.supportsVideoFormat('video/mp4'),
            
            // Modern CSS features
            dvh: CSS.supports('height', '100dvh'),
            gridGap: CSS.supports('gap', '1rem'),
            
            // Modern APIs
            intersectionObserver: 'IntersectionObserver' in window,
            resizeObserver: 'ResizeObserver' in window,
            connection: 'connection' in navigator,
            visualViewport: 'visualViewport' in window,
            
            // Touch support
            touch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
            
            // Reduced motion preference
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        };
    }

    /**
     * Minimal browser detection for critical compatibility issues only
     */
    detectBrowser() {
        const ua = navigator.userAgent;
        
        // Only detect browsers that need special handling
        return {
            // Safari needs playsinline for videos
            safari: /Safari/.test(ua) && !/Chrome/.test(ua),
            // iOS Safari has specific viewport issues
            mobileSafari: /iPad|iPhone|iPod/.test(ua) && /Safari/.test(ua) && !/CriOS/.test(ua),
            // Firefox has different scrollbar syntax
            firefox: /Firefox/.test(ua)
        };
    }

    /**
     * Device detection for performance optimization
     */
    detectDevice() {
        return {
            mobile: window.innerWidth < 768,
            tablet: window.innerWidth >= 768 && window.innerWidth < 1024,
            desktop: window.innerWidth >= 1024,
            highDPI: window.devicePixelRatio > 1.5,
            slowConnection: this.isSlowConnection()
        };
    }

    /**
     * Check video format support
     */
    supportsVideoFormat(mimeType) {
        const video = document.createElement('video');
        return video.canPlayType && video.canPlayType(mimeType) !== '';
    }

    /**
     * Detect slow connection for adaptive loading
     */
    isSlowConnection() {
        if (!this.features.connection) return false;
        
        const connection = navigator.connection;
        return connection.saveData || 
               connection.effectiveType === 'slow-2g' || 
               connection.effectiveType === '2g' ||
               connection.effectiveType === '3g';
    }

    /**
     * Get optimal video resolution based on device and connection
     */
    getOptimalVideoResolution(availableResolutions = ['480p', '720p', '1080p', '2160p']) {
        const { mobile, tablet, desktop, highDPI } = this.device;
        const { slowConnection } = this.device;
        
        if (slowConnection) return availableResolutions[0]; // Lowest
        
        if (mobile) return highDPI ? '720p' : '480p';
        if (tablet) return highDPI ? '1080p' : '720p';
        if (desktop) return highDPI ? '2160p' : '1080p';
        
        return '1080p'; // Default fallback
    }

    /**
     * Get preferred video format based on browser support
     */
    getPreferredVideoFormat() {
        // WebM is more efficient but not universally supported
        if (this.features.webm) return 'webm';
        return 'mp4'; // Universal fallback
    }

    /**
     * Check if we need special mobile Safari handling
     */
    needsMobileSafariWorkarounds() {
        return this.browser.mobileSafari;
    }

    /**
     * Get appropriate CSS units for viewport height
     */
    getViewportHeightUnit() {
        return this.features.dvh ? 'dvh' : 'vh';
    }

    /**
     * Apply browser-specific CSS classes to document
     */
    applyCSSClasses() {
        const classList = document.documentElement.classList;
        
        // Feature classes
        Object.entries(this.features).forEach(([feature, supported]) => {
            classList.toggle(`supports-${feature}`, supported);
            classList.toggle(`no-${feature}`, !supported);
        });

        // Browser classes (minimal)
        Object.entries(this.browser).forEach(([browser, detected]) => {
            if (detected) classList.add(browser);
        });

        // Device classes
        Object.entries(this.device).forEach(([device, detected]) => {
            if (detected) classList.add(device);
        });
    }
}

// Export singleton instance
export const browserDetection = new BrowserDetection();
