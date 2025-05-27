/**
 * Configuration file for the smolikja team portfolio
 * Customize settings here instead of modifying core files
 */

export const config = {
    // Animation settings
    animations: {
        fadeInDuration: 1000,           // Duration for fade-in animations (ms)
        scrollThrottleDelay: 1000,      // Delay between scroll events (ms)
        pageTransitionDuration: 800,    // Page transition duration (ms)
        projectAnimationDelay: 100      // Delay between project card animations (ms)
    },

    // Scroll behavior
    scrolling: {
        smoothScrolling: true,          // Enable smooth scrolling
        snapScrolling: true,            // Enable scroll snapping
        keyboardNavigation: true,       // Enable keyboard navigation
        touchNavigation: true,          // Enable touch/swipe navigation
        mouseWheelNavigation: true      // Enable mouse wheel navigation
    },

    // Navigation
    navigation: {
        showDots: true,                 // Show navigation dots
        showTooltips: true,             // Show tooltips on navigation dots
        autoHideNavigation: false       // Auto-hide navigation on mobile
    },

    // Projects
    projects: {
        autoLoad: true,                 // Auto-load projects on page visit
        animateOnScroll: true,          // Animate projects when scrolling into view
        showPlaceholders: true,         // Show placeholder images for projects
        enableModal: false              // Enable modal for project details
    },

    // Performance
    performance: {
        lazyLoadImages: true,           // Enable lazy loading for images
        preloadNextPage: false,         // Preload next page content
        debounceScrollEvents: true      // Debounce scroll events for performance
    },

    // Debug
    debug: {
        enabled: false,                 // Enable debug mode (set to false for production)
        logLevel: 'info',               // Log level: 'error', 'warn', 'info', 'debug'
        showPerformanceMetrics: false   // Show performance metrics in console
    },

    // Responsive breakpoints
    breakpoints: {
        mobile: 480,                    // Mobile breakpoint (px)
        tablet: 768,                    // Tablet breakpoint (px)
        desktop: 1024                   // Desktop breakpoint (px)
    },

    // Theme colors (used for project placeholders)
    colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#f093fb',
        gradients: [
            ['667eea', '764ba2'],
            ['f093fb', '4facfe'],
            ['43e97b', '38f9d7'],
            ['fa709a', 'fee140'],
            ['a8edea', 'fed6e3'],
            ['d299c2', 'fef9d7']
        ]
    },

    // Video settings
    video: {
        autoplay: true,                 // Auto-play background video
        muted: true,                    // Mute background video
        loop: true,                     // Loop background video
        playsinline: true               // Play inline on mobile devices
    },

    // SEO and meta
    meta: {
        siteName: 'smolikja team',
        description: 'Modern portfolio website showcasing innovative projects and design',
        keywords: ['portfolio', 'web design', 'development', 'projects'],
        author: 'smolikja team',
        language: 'cs'
    },

    // Social links (for future use)
    social: {
        github: '',
        linkedin: '',
        twitter: '',
        email: 'contact@smolikja.team'
    }
};

// Utility function to get config value with fallback
export function getConfig(key, fallback = null) {
    const keys = key.split('.');
    let value = config;
    
    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            return fallback;
        }
    }
    
    return value;
}

// Utility function to update config at runtime
export function updateConfig(key, value) {
    const keys = key.split('.');
    let current = config;
    
    for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (!(k in current) || typeof current[k] !== 'object') {
            current[k] = {};
        }
        current = current[k];
    }
    
    current[keys[keys.length - 1]] = value;
}

// Make config available globally for debugging
if (typeof window !== 'undefined') {
    window.portfolioConfig = config;
}

export default config;
