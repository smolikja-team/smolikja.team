/**
 * Timer and UX Behavior Tests
 */
import { testFramework } from '../test-utils.js';

function runTimerTests() {
    console.log('🕒 Running Timer and UX Tests...');
    
    testFramework.describe('Timer and UX Behavior', () => {
        
        testFramework.test('should hide scrollbar on page load', () => {
            const pageContainer = document.querySelector('.page-container');
            const computedStyle = window.getComputedStyle(pageContainer);
            
            // Check that scrollbar is hidden
            const isScrollbarHidden = 
                computedStyle.scrollbarWidth === 'none' ||
                computedStyle.getPropertyValue('-ms-overflow-style') === 'none';
            
            testFramework.assert(isScrollbarHidden, 'Scrollbar should be hidden');
        });

        testFramework.test('should start with on-homepage body class', () => {
            const hasClass = document.body.classList.contains('on-homepage');
            testFramework.assert(hasClass, 'Body should have on-homepage class initially');
        });

        testFramework.test('should hide navigation dots on HomePage', () => {
            const navigation = document.querySelector('.page-navigation');
            const computedStyle = window.getComputedStyle(navigation);
            
            // When on-homepage class is present, navigation should be hidden
            const isHidden = computedStyle.opacity === '0' || computedStyle.visibility === 'hidden';
            testFramework.assert(isHidden, 'Navigation dots should be hidden on HomePage');
        });

        testFramework.test('should hide scroll arrow initially', () => {
            const scrollIndicator = document.querySelector('.scroll-indicator');
            const computedStyle = window.getComputedStyle(scrollIndicator);
            
            const isHidden = computedStyle.opacity === '0' || computedStyle.visibility === 'hidden';
            testFramework.assert(isHidden, 'Scroll arrow should be hidden initially');
        });

        testFramework.test('should show navigation dots when not on HomePage', () => {
            // Temporarily remove on-homepage class
            document.body.classList.remove('on-homepage');
            
            // Force a style recalculation
            const navigation = document.querySelector('.page-navigation');
            navigation.offsetHeight; // Trigger reflow
            
            const computedStyle = window.getComputedStyle(navigation);
            const isVisible = computedStyle.opacity === '1' && computedStyle.visibility === 'visible';
            
            // Restore on-homepage class
            document.body.classList.add('on-homepage');
            
            testFramework.assert(isVisible, 'Navigation dots should be visible when not on HomePage');
        });

        testFramework.test('should have scroll arrow click handler', () => {
            const scrollArrow = document.querySelector('.scroll-arrow');
            testFramework.assert(scrollArrow !== null, 'Scroll arrow element should exist');
            
            // Test that clicking triggers custom event
            let eventTriggered = false;
            
            const handler = () => { eventTriggered = true; };
            document.addEventListener('scrollArrowClicked', handler);
            
            // Simulate click
            scrollArrow.click();
            
            document.removeEventListener('scrollArrowClicked', handler);
            testFramework.assert(eventTriggered, 'Scroll arrow click should trigger custom event');
        });

        testFramework.test('should apply show-after-delay class correctly', (done) => {
            const scrollIndicator = document.querySelector('.scroll-indicator');
            
            // Remove the class if it exists
            scrollIndicator.classList.remove('show-after-delay');
            
            // Apply the class
            scrollIndicator.classList.add('show-after-delay');
            
            // Check that the class is applied
            setTimeout(() => {
                const hasClass = scrollIndicator.classList.contains('show-after-delay');
                const computedStyle = window.getComputedStyle(scrollIndicator);
                const isVisible = computedStyle.opacity === '1';
                
                testFramework.assert(hasClass, 'show-after-delay class should be applied');
                testFramework.assert(isVisible, 'Scroll indicator should be visible with show-after-delay class');
                
                // Clean up
                scrollIndicator.classList.remove('show-after-delay');
                done();
            }, 100);
        });

        // This test verifies the timer mechanism but doesn't wait 10 seconds
        testFramework.test('should have timer mechanism in PageManager', () => {
            // Access the pageManager instance from the global app
            const pageManager = window.app?.pageManager;
            testFramework.assert(pageManager !== undefined, 'PageManager should be accessible');
            
            // Check that timer property exists
            testFramework.assert(
                'homePageTimer' in pageManager, 
                'PageManager should have homePageTimer property'
            );
            
            // Check that timer methods exist
            testFramework.assert(
                typeof pageManager.handleHomePageActivation === 'function',
                'handleHomePageActivation method should exist'
            );
            
            testFramework.assert(
                typeof pageManager.clearHomePageTimer === 'function',
                'clearHomePageTimer method should exist'
            );
        });

    });
}

// Run the tests immediately when the module loads
runTimerTests();
