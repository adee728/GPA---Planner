// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }
    
    init() {
        this.setTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        
        if (theme === 'dark') {
            this.themeIcon.className = 'fas fa-moon';
        } else {
            this.themeIcon.className = 'fas fa-sun';
        }
        
        try {
            localStorage.setItem('theme', theme);
        } catch (e) {
            console.log('localStorage not available');
        }
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add a nice transition effect to the toggle button
        this.themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.themeToggle.style.transform = 'scale(1)';
        }, 150);
    }
}

// Feature Card Interactions
class FeatureManager {
    constructor() {
        this.featureCards = document.querySelectorAll('.feature-card');
        this.init();
    }
    
    init() {
        this.featureCards.forEach(card => {
            card.addEventListener('click', (e) => this.handleFeatureClick(e, card));
            card.addEventListener('touchstart', (e) => this.handleTouchStart(e, card));
        });
    }
    
    handleFeatureClick(e, card) {
        e.preventDefault();
        
        // Remove clicked class from all cards
        this.featureCards.forEach(c => c.classList.remove('clicked'));
        
        // Add clicked class to current card
        card.classList.add('clicked');
        
        // Add click animation
        card.classList.add('click-animation');
        
        // Get feature type
        const featureType = card.dataset.feature;
        
        // Simulate navigation or action
        this.simulateFeatureAction(featureType);
        
        // Remove clicked class after animation
        setTimeout(() => {
            card.classList.remove('clicked', 'click-animation');
        }, 300);
        
        // Add haptic feedback for mobile devices
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
    
    handleTouchStart(e, card) {
        // Add touch feedback
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 100);
    }
    
    simulateFeatureAction(featureType) {
        const actions = {
            'gpa-calculator': 'Opening GPA Calculator...',
            'cgpa-calculator': 'Opening CGPA Calculator...',
            'gpa-planner': 'Opening GPA Planner...',
            'percentage-gpa': 'Opening Percentage to GPA Converter...'
        };
        
        console.log(actions[featureType] || 'Opening feature...');
        
        // Here you would typically navigate to the respective page
        // For demo purposes, we'll just show a brief visual feedback
        this.showToast(actions[featureType] || 'Feature activated!');
    }
    
    showToast(message) {
        // Create toast element
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 120px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--card-background);
            color: var(--text-primary);
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--border-color);
            z-index: 1000;
            font-size: 14px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 100);
        
        // Hide and remove toast
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
    }
}

// Bottom Navigation
class NavigationManager {
    constructor() {
        this.navItems = document.querySelectorAll('.nav-item');
        this.init();
    }
    
    init() {
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleNavClick(e, item));
        });
    }
    
    handleNavClick(e, clickedItem) {
        e.preventDefault();
        
        // Remove active class from all items
        this.navItems.forEach(item => item.classList.remove('active'));
        
        // Add active class to clicked item
        clickedItem.classList.add('active');
        
        // Get navigation type
        const navType = clickedItem.dataset.nav;
        
        // Add click animation
        clickedItem.style.transform = 'scale(0.9)';
        setTimeout(() => {
            clickedItem.style.transform = 'scale(1)';
        }, 150);
        
        // Handle navigation
        this.handleNavigation(navType);
        
        // Add haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
    }
    
    handleNavigation(navType) {
        const pages = {
            'home': 'Dashboard',
            'custom': 'Custom Calculator',
            'templates': 'Templates',
            'statistics': 'Statistics',
            'settings': 'Settings'
        };
        
        console.log(`Navigating to: ${pages[navType]}`);
        
        // Here you would typically handle page navigation
        // For demo purposes, we'll just log and show visual feedback
        if (navType !== 'home') {
            this.showNavigationFeedback(pages[navType]);
        }
    }
    
    showNavigationFeedback(pageName) {
        // Create a subtle page transition effect
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--primary-gradient);
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 18px;
            font-weight: 600;
        `;
        overlay.textContent = `Loading ${pageName}...`;
        
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.style.opacity = '0.9';
        }, 50);
        
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 300);
        }, 1000);
    }
}

// Scroll Effects
class ScrollManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Add scroll-based animations
        this.observeElements();
        
        // Add smooth scrolling behavior
        this.addSmoothScroll();
    }
    
    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe cards for fade-in animation
        const cards = document.querySelectorAll('.welcome-card, .scenario-card, .feature-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
    
    addSmoothScroll() {
        // Add smooth scrolling for any internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// PWA-like Features
class PWAManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Add install prompt handling
        this.handleInstallPrompt();
        
        // Add network status handling
        this.handleNetworkStatus();
        
        // Add visibility change handling
        this.handleVisibilityChange();
    }
    
    handleInstallPrompt() {
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Show install button or notification
            console.log('App can be installed');
        });
        
        window.addEventListener('appinstalled', () => {
            console.log('App was installed');
            deferredPrompt = null;
        });
    }
    
    handleNetworkStatus() {
        const updateNetworkStatus = () => {
            if (!navigator.onLine) {
                this.showOfflineMessage();
            }
        };
        
        window.addEventListener('online', () => {
            console.log('Back online');
        });
        
        window.addEventListener('offline', updateNetworkStatus);
    }
    
    handleVisibilityChange() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                console.log('App hidden');
            } else {
                console.log('App visible');
                // Refresh data or update UI when app becomes visible
            }
        });
    }
    
    showOfflineMessage() {
        const offlineMsg = document.createElement('div');
        offlineMsg.style.cssText = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: #ef4444;
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 12px;
            z-index: 1000;
            animation: slideDown 0.3s ease;
        `;
        offlineMsg.textContent = 'You are currently offline';
        
        document.body.appendChild(offlineMsg);
        
        setTimeout(() => {
            if (document.body.contains(offlineMsg)) {
                document.body.removeChild(offlineMsg);
            }
        }, 3000);
    }
}

// Performance Manager
class PerformanceManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Optimize images
        this.optimizeImages();
        
        // Add lazy loading
        this.addLazyLoading();
        
        // Monitor performance
        this.monitorPerformance();
    }
    
    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading="lazy" for better performance
            img.loading = 'lazy';
            
            // Add error handling
            img.addEventListener('error', function() {
                this.style.display = 'none';
                // Show fallback icon
                const fallback = this.getAttribute('onerror');
                if (fallback) {
                    this.outerHTML = fallback.replace('this.innerHTML=', '').replace(/'/g, '');
                }
            });
        });
    }
    
    addLazyLoading() {
        // Implement intersection observer for lazy loading
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }
    
    monitorPerformance() {
        // Log performance metrics
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
            }
        });
    }
}

// Accessibility Manager
class AccessibilityManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Add keyboard navigation
        this.addKeyboardNavigation();
        
        // Add focus management
        this.addFocusManagement();
        
        // Add ARIA labels
        this.addAriaLabels();
    }
    
    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Handle escape key
            if (e.key === 'Escape') {
                // Close any open modals or menus
                document.activeElement.blur();
            }
            
            // Handle tab navigation for cards
            if (e.key === 'Enter' || e.key === ' ') {
                const focusedElement = document.activeElement;
                if (focusedElement.classList.contains('feature-card')) {
                    e.preventDefault();
                    focusedElement.click();
                }
            }
        });
    }
    
    addFocusManagement() {
        // Add focus styles
        const style = document.createElement('style');
        style.textContent = `
            .feature-card:focus,
            .nav-item:focus,
            .theme-toggle:focus {
                outline: 2px solid var(--primary-color);
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
        
        // Make cards focusable
        document.querySelectorAll('.feature-card').forEach(card => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
        });
        
        document.querySelectorAll('.nav-item').forEach(item => {
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
        });
    }
    
    addAriaLabels() {
        // Add ARIA labels for better screen reader support
        document.getElementById('themeToggle').setAttribute('aria-label', 'Toggle dark/light theme');
        
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            const title = card.querySelector('h3').textContent;
            card.setAttribute('aria-label', `${title} - Click to open`);
        });
        
        document.querySelectorAll('.nav-item').forEach(item => {
            const label = item.querySelector('span').textContent;
            item.setAttribute('aria-label', `Navigate to ${label}`);
        });
    }
}

// Main App Initialization
class GPACalculatorApp {
    constructor() {
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }
    
    initializeApp() {
        console.log('Initializing GPA Calculator App...');
        
        try {
            // Initialize all managers
            this.themeManager = new ThemeManager();
            this.featureManager = new FeatureManager();
            this.navigationManager = new NavigationManager();
            this.scrollManager = new ScrollManager();
            this.pwaManager = new PWAManager();
            this.performanceManager = new PerformanceManager();
            this.accessibilityManager = new AccessibilityManager();
            
            console.log('App initialized successfully!');
            
            // Add welcome animation
            this.playWelcomeAnimation();
            
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }
    
    playWelcomeAnimation() {
        // Add a subtle welcome animation
        const cards = document.querySelectorAll('.welcome-card, .scenario-card, .feature-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

// Initialize the app
const app = new GPACalculatorApp();