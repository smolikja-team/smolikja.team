/**
 * Main Application Entry Point
 */
import { ScrollController } from './scrollController.js';
import { PageManager } from './pageManager.js';
import { ProjectsComponent } from './components/projectsComponent.js';
import { NavigationComponent } from './components/navigationComponent.js';
import { VideoLoader } from './components/videoLoader.js';
import { browserDetection } from './utils/browserDetection.js';

class App {
    constructor() {
        this.scrollController = null;
        this.pageManager = null;
        this.projectsComponent = null;
        this.navigationComponent = null;
        this.videoLoader = null;
        this.browserDetection = browserDetection;
        
        this.init();
    }

    init() {
        // Apply browser detection CSS classes immediately
        this.browserDetection.applyCSSClasses();
        
        // Update CSS custom properties based on detection
        this.updateCSSProperties();
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.initializeApp.bind(this));
        } else {
            this.initializeApp();
        }
    }

    updateCSSProperties() {
        const root = document.documentElement;
        
        // Set viewport height unit
        const vhUnit = this.browserDetection.getViewportHeightUnit();
        root.style.setProperty('--viewport-height', `100${vhUnit}`);
        
        // Set scroll padding for mobile Safari
        if (this.browserDetection.needsMobileSafariWorkarounds()) {
            root.style.setProperty('--scroll-padding', 'max(2rem, calc(2rem + env(safe-area-inset-bottom)))');
        }
    }

    initializeApp() {
        try {
            // Set initial body class for HomePage
            document.body.classList.add('on-homepage');
            
            // Initialize core components
            this.pageManager = new PageManager();
            this.scrollController = new ScrollController();
            this.projectsComponent = new ProjectsComponent();
            this.navigationComponent = new NavigationComponent(this.scrollController);
            this.videoLoader = new VideoLoader();

            // Optimize video loading
            this.optimizeVideoElements();

            // Handle initial page load based on URL hash
            this.handleInitialNavigation();

            // Setup global error handling
            this.setupErrorHandling();

            console.log('smolikja team portfolio initialized successfully');
        } catch (error) {
            console.error('Failed to initialize application:', error);
        }
    }
    
    /**
     * Enhance video elements with optimized sources
     */
    optimizeVideoElements() {
        // Find background video in HomePage
        const backgroundVideo = document.querySelector('.background-video');
        if (backgroundVideo) {
            // Clear existing sources
            backgroundVideo.innerHTML = '';
            
            // Enhance with VideoLoader
            this.videoLoader.enhanceVideo(backgroundVideo, {
                baseDir: 'https://smolikja.team/assets/portfolio-web/loop2x/',
                fileName: 'team-logo',
                resolutions: ['480p', '720p', '1080p'],
                formats: ['webm', 'mp4']
            });
        }
    }

    handleInitialNavigation() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const pages = document.querySelectorAll('.page');
            const targetPageIndex = Array.from(pages).findIndex(
                page => page.dataset.pageName === hash
            );
            
            if (targetPageIndex !== -1) {
                this.scrollController.goToPage(targetPageIndex);
            }
        }
    }

    setupErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
        });
    }

    // Public API methods for debugging/testing
    getScrollController() {
        return this.scrollController;
    }

    getPageManager() {
        return this.pageManager;
    }

    getProjectsComponent() {
        return this.projectsComponent;
    }

    getNavigationComponent() {
        return this.navigationComponent;
    }
    
    getVideoLoader() {
        return this.videoLoader;
    }
}

// Initialize the application
const app = new App();

// Only expose app instance in development mode
if (process.env.NODE_ENV !== 'production') {
    window.smolikjaApp = app;
}
