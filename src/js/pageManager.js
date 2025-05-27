/**
 * Page Manager - Handles individual page components and their lifecycle
 */
export class PageManager {
    constructor() {
        this.pages = new Map();
        this.init();
    }

    init() {
        this.registerPages();
        this.setupPageObserver();
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

    activatePage(pageName) {
        // Deactivate all pages
        this.pages.forEach((page, name) => {
            page.isActive = (name === pageName);
            page.element.classList.toggle('active', page.isActive);
            
            if (page.isActive && !page.hasLoaded) {
                this.loadPage(name);
            }
        });
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

    getPage(pageName) {
        return this.pages.get(pageName);
    }

    getAllPages() {
        return Array.from(this.pages.keys());
    }
}
