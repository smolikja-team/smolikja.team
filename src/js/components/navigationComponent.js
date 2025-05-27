/**
 * Navigation Component - Handles navigation dots and page indicators
 */
export class NavigationComponent {
    constructor(scrollController) {
        this.scrollController = scrollController;
        this.navDots = [];
        this.init();
    }

    init() {
        this.setupNavigationDots();
        this.bindEvents();
    }

    setupNavigationDots() {
        const navContainer = document.querySelector('.nav-dots');
        if (!navContainer) return;

        this.navDots = Array.from(navContainer.querySelectorAll('.nav-dot'));
        
        // Add click handlers to navigation dots
        this.navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.scrollController.goToPage(index);
            });
        });
    }

    bindEvents() {
        // Listen for page changes to update active dot
        document.addEventListener('pageChanged', (event) => {
            this.updateActiveDot(event.detail.currentPage);
        });
    }

    updateActiveDot(activeIndex) {
        this.navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }

    highlightDot(index) {
        if (this.navDots[index]) {
            this.navDots[index].classList.add('highlight');
            setTimeout(() => {
                this.navDots[index].classList.remove('highlight');
            }, 300);
        }
    }
}
