/**
 * Scroll Controller - Manages page navigation and scroll snapping
 */
export class ScrollController {
    constructor() {
        this.currentPageIndex = 0;
        this.pages = [];
        this.isScrolling = false;
        this.scrollTimeout = null;
        this.throttleDelay = 1000; // Prevent rapid scrolling
        
        this.init();
    }

    init() {
        this.setupPages();
        this.bindEvents();
        this.updateActiveState();
    }

    setupPages() {
        this.pages = document.querySelectorAll('.page');
        this.totalPages = this.pages.length;
    }

    bindEvents() {
        // Mouse wheel events
        document.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
        
        // Touch events for mobile
        let touchStartY = 0;
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchStartY - touchEndY;
            
            if (Math.abs(deltaY) > 50) { // Minimum swipe distance
                if (deltaY > 0) {
                    this.nextPage();
                } else {
                    this.previousPage();
                }
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', this.handlePopState.bind(this));
        
        // Handle scroll arrow clicks
        document.addEventListener('scrollArrowClicked', () => {
            this.nextPage();
        });
    }

    handleWheel(event) {
        event.preventDefault();
        
        if (this.isScrolling) return;
        
        const delta = event.deltaY;
        
        if (delta > 0) {
            this.nextPage();
        } else {
            this.previousPage();
        }
    }

    handleKeyboard(event) {
        switch(event.key) {
            case 'ArrowDown':
            case 'PageDown':
                event.preventDefault();
                this.nextPage();
                break;
            case 'ArrowUp':
            case 'PageUp':
                event.preventDefault();
                this.previousPage();
                break;
            case 'Home':
                event.preventDefault();
                this.goToPage(0);
                break;
            case 'End':
                event.preventDefault();
                this.goToPage(this.totalPages - 1);
                break;
        }
    }

    handlePopState(event) {
        const state = event.state;
        if (state && typeof state.pageIndex === 'number') {
            this.currentPageIndex = state.pageIndex;
            this.scrollToCurrentPage();
            this.updateActiveState();
        }
    }

    nextPage() {
        if (this.currentPageIndex < this.totalPages - 1) {
            this.goToPage(this.currentPageIndex + 1);
        }
    }

    previousPage() {
        if (this.currentPageIndex > 0) {
            this.goToPage(this.currentPageIndex - 1);
        }
    }

    goToPage(index) {
        if (index < 0 || index >= this.totalPages || this.isScrolling) return;
        
        this.currentPageIndex = index;
        this.scrollToCurrentPage();
        this.updateActiveState();
        this.updateURL();
    }

    scrollToCurrentPage() {
        this.isScrolling = true;
        
        const targetPage = this.pages[this.currentPageIndex];
        targetPage.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });

        // Reset scrolling flag after animation
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;
        }, this.throttleDelay);
    }

    updateActiveState() {
        this.pages.forEach((page, index) => {
            page.classList.toggle('active', index === this.currentPageIndex);
        });

        // Dispatch custom event for other components
        document.dispatchEvent(new CustomEvent('pageChanged', {
            detail: { 
                currentPage: this.currentPageIndex,
                totalPages: this.totalPages,
                pageName: this.pages[this.currentPageIndex]?.dataset.pageName || 'unknown'
            }
        }));
    }

    updateURL() {
        const pageName = this.pages[this.currentPageIndex]?.dataset.pageName || '';
        const url = pageName ? `#${pageName}` : '';
        
        history.pushState(
            { pageIndex: this.currentPageIndex }, 
            '', 
            url
        );
    }

    // Public API methods
    getCurrentPage() {
        return this.currentPageIndex;
    }

    getTotalPages() {
        return this.totalPages;
    }

    getPageName(index = this.currentPageIndex) {
        return this.pages[index]?.dataset.pageName || '';
    }
}
