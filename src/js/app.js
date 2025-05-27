/**
 * Main Application Entry Point
 */
import { ScrollController } from './scrollController.js';
import { PageManager } from './pageManager.js';
import { ProjectsComponent } from './components/projectsComponent.js';
import { NavigationComponent } from './components/navigationComponent.js';

class App {
    constructor() {
        this.scrollController = null;
        this.pageManager = null;
        this.projectsComponent = null;
        this.navigationComponent = null;
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.initializeApp.bind(this));
        } else {
            this.initializeApp();
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

            // Handle initial page load based on URL hash
            this.handleInitialNavigation();

            // Setup global error handling
            this.setupErrorHandling();

            console.log('smolikja team portfolio initialized successfully');
        } catch (error) {
            console.error('Failed to initialize application:', error);
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
}

// Initialize the application
const app = new App();

// Expose app instance for debugging (remove in production)
window.smolikjaApp = app;
