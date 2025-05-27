/**
 * Final UX Verification Script
 * This script provides comprehensive verification of all UX requirements
 */

class UXVerifier {
    constructor() {
        this.results = [];
        this.init();
    }

    init() {
        this.createUI();
        this.runVerification();
    }

    createUI() {
        // Create a floating verification panel
        const panel = document.createElement('div');
        panel.id = 'ux-verifier';
        panel.innerHTML = `
            <div style="position: fixed; top: 20px; left: 20px; z-index: 10000; 
                        background: rgba(0,0,0,0.9); color: white; padding: 20px; 
                        border-radius: 8px; font-family: monospace; min-width: 350px;
                        border: 2px solid #4caf50;">
                <h3 style="margin: 0 0 15px 0;">🔍 UX Requirements Verification</h3>
                <div id="verification-results"></div>
                <div style="margin-top: 15px;">
                    <button id="run-verification" style="background: #4caf50; color: white; 
                            border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
                        Run Verification
                    </button>
                    <button id="close-verifier" style="background: #f44336; color: white; 
                            border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-left: 10px;">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        // Add event listeners
        document.getElementById('run-verification').addEventListener('click', () => {
            this.runVerification();
        });
        
        document.getElementById('close-verifier').addEventListener('click', () => {
            panel.remove();
        });
    }

    checkRequirement(description, checkFunction) {
        try {
            const result = checkFunction();
            this.results.push({
                description,
                passed: result,
                status: result ? '✅' : '❌'
            });
        } catch (error) {
            this.results.push({
                description,
                passed: false,
                status: '❌',
                error: error.message
            });
        }
    }

    runVerification() {
        this.results = [];

        // Requirement 1: Scrollbar should be hidden
        this.checkRequirement('Scrollbar is hidden', () => {
            const container = document.querySelector('.page-container');
            const style = window.getComputedStyle(container);
            return style.scrollbarWidth === 'none' || 
                   style.getPropertyValue('-ms-overflow-style') === 'none';
        });

        // Requirement 2: Navigation dots hidden on HomePage
        this.checkRequirement('Navigation dots hidden on HomePage', () => {
            const isOnHomePage = document.body.classList.contains('on-homepage');
            const nav = document.querySelector('.page-navigation');
            const style = window.getComputedStyle(nav);
            return isOnHomePage && (style.opacity === '0' || style.visibility === 'hidden');
        });

        // Requirement 3: Scroll arrow initially hidden
        this.checkRequirement('Scroll arrow initially hidden', () => {
            const indicator = document.querySelector('.scroll-indicator');
            const style = window.getComputedStyle(indicator);
            const hasDelayClass = indicator.classList.contains('show-after-delay');
            return !hasDelayClass && (style.opacity === '0' || style.visibility === 'hidden');
        });

        // Requirement 4: Page manager has timer functionality
        this.checkRequirement('Timer functionality exists', () => {
            const pageManager = window.app?.pageManager;
            return pageManager && 
                   typeof pageManager.handleHomePageActivation === 'function' &&
                   typeof pageManager.clearHomePageTimer === 'function' &&
                   'homePageTimer' in pageManager;
        });

        // Requirement 5: Scroll arrow has click handler
        this.checkRequirement('Scroll arrow clickable', () => {
            const arrow = document.querySelector('.scroll-arrow');
            let eventFired = false;
            
            const handler = () => { eventFired = true; };
            document.addEventListener('scrollArrowClicked', handler);
            arrow.click();
            document.removeEventListener('scrollArrowClicked', handler);
            
            return eventFired;
        });

        // Requirement 6: CSS classes exist and work
        this.checkRequirement('CSS classes properly defined', () => {
            const indicator = document.querySelector('.scroll-indicator');
            indicator.classList.add('show-after-delay');
            const style = window.getComputedStyle(indicator);
            const isVisible = style.opacity === '1';
            indicator.classList.remove('show-after-delay');
            return isVisible;
        });

        this.displayResults();
    }

    displayResults() {
        const container = document.getElementById('verification-results');
        const passedCount = this.results.filter(r => r.passed).length;
        const totalCount = this.results.length;
        
        let html = `<div style="margin-bottom: 10px; font-weight: bold;">
                        Results: ${passedCount}/${totalCount} passed
                    </div>`;
        
        this.results.forEach(result => {
            html += `<div style="margin: 5px 0; padding: 5px; 
                           background: ${result.passed ? 'rgba(76,175,80,0.2)' : 'rgba(244,67,54,0.2)'};
                           border-radius: 3px;">
                        ${result.status} ${result.description}
                        ${result.error ? `<br><small style="color: #ff9800;">Error: ${result.error}</small>` : ''}
                    </div>`;
        });

        // Add timer test section
        html += `<div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #333;">
                    <strong>🕒 Timer Test (Manual)</strong><br>
                    <small>To test the 10-second timer:</small><br>
                    <small>1. Scroll to HomePage</small><br>
                    <small>2. Wait 10 seconds</small><br>
                    <small>3. Verify scroll arrow appears</small><br>
                    <button id="simulate-timer" style="background: #ff9800; color: white; 
                            border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer; margin-top: 5px;">
                        Simulate Timer (Show Arrow)
                    </button>
                </div>`;
        
        container.innerHTML = html;

        // Add timer simulation button
        const simulateBtn = document.getElementById('simulate-timer');
        if (simulateBtn) {
            simulateBtn.addEventListener('click', () => {
                const indicator = document.querySelector('.scroll-indicator');
                indicator.classList.add('show-after-delay');
                simulateBtn.textContent = '✅ Arrow Shown!';
                simulateBtn.style.background = '#4caf50';
            });
        }
    }
}

// Initialize the UX verifier when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new UXVerifier();
    });
} else {
    new UXVerifier();
}
