/**
 * Debug utilities for development
 */

class DebugUtils {
    constructor() {
        this.enabled = true;
        this.logs = [];
    }

    log(message, data = null) {
        if (!this.enabled) return;
        
        const timestamp = new Date().toISOString();
        const logEntry = { timestamp, message, data };
        this.logs.push(logEntry);
        
        console.log(`[DEBUG ${timestamp}] ${message}`, data || '');
    }

    error(message, error = null) {
        if (!this.enabled) return;
        
        const timestamp = new Date().toISOString();
        const logEntry = { timestamp, message, error, type: 'error' };
        this.logs.push(logEntry);
        
        console.error(`[ERROR ${timestamp}] ${message}`, error || '');
    }

    warn(message, data = null) {
        if (!this.enabled) return;
        
        const timestamp = new Date().toISOString();
        const logEntry = { timestamp, message, data, type: 'warn' };
        this.logs.push(logEntry);
        
        console.warn(`[WARN ${timestamp}] ${message}`, data || '');
    }

    getLogs() {
        return this.logs;
    }

    clearLogs() {
        this.logs = [];
    }

    enable() {
        this.enabled = true;
    }

    disable() {
        this.enabled = false;
    }

    checkDOMReady() {
        this.log('DOM Ready State:', document.readyState);
        this.log('Total pages found:', document.querySelectorAll('.page').length);
        this.log('Navigation dots found:', document.querySelectorAll('.nav-dot').length);
    }

    checkModulesLoaded() {
        const modules = ['ScrollController', 'PageManager', 'ProjectsComponent', 'NavigationComponent'];
        modules.forEach(module => {
            try {
                if (window[module] || window.smolikjaApp) {
                    this.log(`✅ ${module} available`);
                } else {
                    this.warn(`⚠️ ${module} not found in global scope`);
                }
            } catch (e) {
                this.error(`❌ Error checking ${module}:`, e);
            }
        });
    }

    inspectScrollBehavior() {
        const container = document.querySelector('.page-container');
        if (container) {
            this.log('Page container scroll properties:', {
                scrollTop: container.scrollTop,
                scrollHeight: container.scrollHeight,
                clientHeight: container.clientHeight,
                scrollSnapType: getComputedStyle(container).scrollSnapType
            });
        } else {
            this.error('Page container not found');
        }
    }

    testPageNavigation() {
        this.log('Testing page navigation...');
        
        try {
            if (window.smolikjaApp && window.smolikjaApp.getScrollController()) {
                const controller = window.smolikjaApp.getScrollController();
                this.log('Current page:', controller.getCurrentPage());
                this.log('Total pages:', controller.getTotalPages());
                
                // Test navigation
                setTimeout(() => {
                    this.log('Testing next page...');
                    controller.nextPage();
                }, 2000);
            } else {
                this.warn('ScrollController not accessible');
            }
        } catch (e) {
            this.error('Error testing navigation:', e);
        }
    }
}

// Initialize debug utils
const debug = new DebugUtils();

// Export for global access
window.debug = debug;

// Auto-run basic checks when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    debug.log('🔧 Debug utilities loaded');
    debug.checkDOMReady();
    
    // Delayed checks to allow modules to load
    setTimeout(() => {
        debug.checkModulesLoaded();
        debug.inspectScrollBehavior();
    }, 1000);
});

// Export for module use
export { DebugUtils, debug };
