/**
 * Page Manager - Handles individual page components and their lifecycle
 */
export class PageManager {
    constructor() {
        this.pages = new Map();
        this.homePageTimer = null;
        this.init();
    }

    init() {
        this.registerPages();
        this.setupPageObserver();
        this.setupScrollArrowClick();
    }

    registerPages() {
        const pageElements = document.querySelectorAll('.page');
        
        pageElements.forEach((element) => {
            const pageName = element.dataset.pageName;
            if (pageName) {
                this.pages.set(pageName, {
                    element: element,
                    isActive: false,
                    hasLoaded: false
                });
            }
        });
    }

    setupPageObserver() {
        document.addEventListener('pageChanged', (event) => {
            const { pageName } = event.detail;
            this.activatePage(pageName);
        });
    }

    setupScrollArrowClick() {
        const scrollArrow = document.querySelector('.scroll-arrow');
        if (scrollArrow) {
            scrollArrow.addEventListener('click', () => {
                // Trigger navigation to next page
                document.dispatchEvent(new CustomEvent('scrollArrowClicked'));
            });
        }
    }

    activatePage(pageName) {
        // Update body class for HomePage detection
        document.body.classList.toggle('on-homepage', pageName === 'home');
        
        // Deactivate all pages
        this.pages.forEach((page, name) => {
            page.isActive = (name === pageName);
            page.element.classList.toggle('active', page.isActive);
            
            if (page.isActive && !page.hasLoaded) {
                this.loadPage(name);
            }
        });

        // Handle HomePage specific logic
        if (pageName === 'home') {
            this.handleHomePageActivation();
        } else {
            this.clearHomePageTimer();
        }
    }

    loadPage(pageName) {
        const page = this.pages.get(pageName);
        if (!page || page.hasLoaded) return;

        // Mark as loaded
        page.hasLoaded = true;

        // Trigger page-specific loading logic
        switch(pageName) {
            case 'home':
                this.loadHomePage(page);
                // Start the timer for HomePage if it's the active page
                if (page.isActive) {
                    this.handleHomePageActivation();
                }
                break;
            case 'projects':
                this.loadProjectsPage(page);
                break;
            // Add more pages as needed
        }

        // Dispatch custom event for page loading
        document.dispatchEvent(new CustomEvent('pageLoaded', {
            detail: { pageName, element: page.element }
        }));
    }

    loadHomePage(page) {
        // Home page specific loading logic
        const video = page.element.querySelector('.background-video');
        if (video) {
            video.play().catch(console.warn);
        }
    }

    loadProjectsPage(page) {
        // Projects page specific loading logic
        const projectItems = page.element.querySelectorAll('.project-item');
        projectItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-in');
            }, index * 100);
        });
    }

    handleHomePageActivation() {
        // Clear any existing timer
        this.clearHomePageTimer();
        
        // Hide scroll indicator initially
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.classList.remove('show-after-delay');
        }
        
        // Show scroll indicator after 10 seconds
        this.homePageTimer = setTimeout(() => {
            if (scrollIndicator) {
                scrollIndicator.classList.add('show-after-delay');
            }
        }, 10000); // 10 seconds
    }

    clearHomePageTimer() {
        if (this.homePageTimer) {
            clearTimeout(this.homePageTimer);
            this.homePageTimer = null;
        }
        
        // Hide scroll indicator when leaving HomePage
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.classList.remove('show-after-delay');
        }
    }

    getPage(pageName) {
        return this.pages.get(pageName);
    }

    getAllPages() {
        return Array.from(this.pages.keys());
    }
}
