// ===== APPLICATION STATE =====
const AppState = {
    isLoading: true,
    currentAffirmationIndex: 0,
    isTyping: false,
    mobileMenuActive: false,
    observers: []
};

// ===== AFFIRMATIONS DATA =====
const affirmations = [
    "I am capable of achieving my dreams.",
    "I radiate positivity and attract abundance.", 
    "I am grateful for all the good in my life.",
    "I choose peace and happiness every day.",
    "I am constantly growing and evolving.",
    "I trust in my ability to overcome challenges.",
    "I deserve love, success, and happiness.",
    "I am in control of my thoughts and emotions."
];

// ===== UTILITY FUNCTIONS =====
const Utils = {
    // Debounce function for performance optimization
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Smooth scroll to element
    smoothScrollTo: (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            const headerHeight = document.querySelector('.site-header').offsetHeight;
            const elementPosition = element.offsetTop - headerHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    },

    // Validate email format
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Generate random delay for animations
    getRandomDelay: (min = 100, max = 500) => {
        return Math.random() * (max - min) + min;
    }
};

// ===== LOADING SCREEN MANAGER =====
const LoadingManager = {
    init: () => {
        window.addEventListener('load', LoadingManager.hideLoading);
        // Fallback timeout in case something goes wrong
        setTimeout(LoadingManager.hideLoading, 3000);
    },

    hideLoading: () => {
        if (AppState.isLoading) {
            const loadingScreen = document.getElementById('loading');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                AppState.isLoading = false;
            }
        }
    }
};

// ===== NAVIGATION MANAGER =====
const NavigationManager = {
    init: () => {
        NavigationManager.setupMobileMenu();
        NavigationManager.setupSmoothScrolling();
        NavigationManager.setupScrollHeader();
    },

    setupMobileMenu: () => {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mainNav = document.getElementById('main-nav');

        if (mobileMenuToggle && mainNav) {
            mobileMenuToggle.addEventListener('click', () => {
                AppState.mobileMenuActive = !AppState.mobileMenuActive;
                
                mobileMenuToggle.classList.toggle('active', AppState.mobileMenuActive);
                mainNav.classList.toggle('active', AppState.mobileMenuActive);
            });

            // Close menu when clicking on nav links
            const navLinks = mainNav.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    AppState.mobileMenuActive = false;
                    mobileMenuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                });
            });
        }
    },

    setupSmoothScrolling: () => {
        // Handle anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                
                if (targetId) {
                    Utils.smoothScrollTo(targetId);
                }
            });
        });
    },

    setupScrollHeader: () => {
        const header = document.querySelector('.site-header');
        let lastScrollTop = 0;

        const handleScroll = Utils.throttle(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scroll class for styling
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScrollTop = scrollTop;
        }, 100);

        window.addEventListener('scroll', handleScroll);
    }
};

// ===== AFFIRMATION TYPING MANAGER =====
const AffirmationManager = {
    init: () => {
        const affirmationElement = document.getElementById('affirmation-text');
        if (affirmationElement) {
            AffirmationManager.startTypingCycle();
        }
    },

    startTypingCycle: () => {
        if (!AppState.isTyping) {
            AffirmationManager.typeAffirmation();
        }
    },

    typeAffirmation: () => {
        AppState.isTyping = true;
        const affirmationElement = document.getElementById('affirmation-text');
        const currentAffirmation = affirmations[AppState.currentAffirmationIndex];
        let charIndex = 0;

        affirmationElement.textContent = '';

        const typeChar = () => {
            if (charIndex < currentAffirmation.length) {
                affirmationElement.textContent += currentAffirmation.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 70);
            } else {
                setTimeout(AffirmationManager.eraseAffirmation, 2500);
            }
        };

        typeChar();
    },

    eraseAffirmation: () => {
        const affirmationElement = document.getElementById('affirmation-text');
        const currentText = affirmationElement.textContent;
        let charIndex = currentText.length;

        const eraseChar = () => {
            if (charIndex > 0) {
                affirmationElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(eraseChar, 30);
            } else {
                AppState.currentAffirmationIndex = (AppState.currentAffirmationIndex + 1) % affirmations.length;
                setTimeout(() => {
                    AppState.isTyping = false;
                    AffirmationManager.typeAffirmation();
                }, 500);
            }
        };

        eraseChar();
    }
};

// ===== SCROLL ANIMATIONS MANAGER =====
const ScrollAnimationsManager = {
    init: () => {
        ScrollAnimationsManager.setupIntersectionObserver();
        ScrollAnimationsManager.setupStatsAnimation();
    },

    setupIntersectionObserver: () => {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add staggered animation delay for service cards
                    if (entry.target.classList.contains('service-card')) {
                        const cards = document.querySelectorAll('.service-card');
                        const index = Array.from(cards).indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 0.1}s`;
                    }
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        const fadeInElements = document.querySelectorAll('.fade-in');
        fadeInElements.forEach(element => {
            observer.observe(element);
        });

        AppState.observers.push(observer);
    },

    setupStatsAnimation: () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        const statsObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    ScrollAnimationsManager.animateStatNumber(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, statsObserverOptions);

        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });

        AppState.observers.push(statsObserver);
    },

    animateStatNumber: (element) => {
        const target = parseInt(element.dataset.target);
        const suffix = element.textContent.includes('+') ? '+' : 
                      element.textContent.includes('%') ? '%' : 
                      element.textContent.includes('k') ? 'k+' : '';
        
        let current = 0;
        const increment = target / 60; // Animation duration control
        const duration = 2000; // 2 seconds
        const stepTime = duration / 60;

        const updateCounter = () => {
            current += increment;
            
            if (current < target) {
                element.textContent = Math.floor(current) + suffix;
                setTimeout(updateCounter, stepTime);
            } else {
                element.textContent = target + suffix;
            }
        };

        updateCounter();
    }
};

// ===== NEWSLETTER MANAGER =====
const NewsletterManager = {
    init: () => {
        const form = document.getElementById('newsletter-form');
        if (form) {
            form.addEventListener('submit', NewsletterManager.handleSubmit);
        }
    },

    handleSubmit: async (e) => {
        e.preventDefault();
        
        const emailInput = document.getElementById('newsletter-email');
        const messageDiv = document.getElementById('newsletter-message');
        const submitBtn = e.target.querySelector('.newsletter-btn');
        
        const email = emailInput.value.trim();
        
        // Validate email
        if (!Utils.isValidEmail(email)) {
            NewsletterManager.showMessage('Please enter a valid email address.', 'error', messageDiv);
            return;
        }

        // Show loading state
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await NewsletterManager.simulateSubscription(email);
            
            // Success
            NewsletterManager.showMessage('Thank you for subscribing! Welcome to the BLOOMÉ community.', 'success', messageDiv);
            emailInput.value = '';
            
        } catch (error) {
            // Error
            NewsletterManager.showMessage('Something went wrong. Please try again later.', 'error', messageDiv);
        } finally {
            // Reset button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    },

    simulateSubscription: (email) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() < 0.9) {
                    resolve({ success: true, email });
                } else {
                    reject(new Error('Subscription failed'));
                }
            }, 1500);
        });
    },

    showMessage: (text, type, messageElement) => {
        messageElement.textContent = text;
        messageElement.className = `newsletter-message show ${type}`;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, 5000);
    }
};

// ===== SERVICE INTERACTION MANAGER =====
const ServiceManager = {
    init: () => {
        const serviceButtons = document.querySelectorAll('[data-service]');
        serviceButtons.forEach(button => {
            button.addEventListener('click', ServiceManager.handleServiceClick);
        });
    },

    handleServiceClick: (e) => {
        e.preventDefault();
        const serviceType = e.target.dataset.service;
        
        // Add click animation
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);

        // Show service info (could be expanded to open modals, etc.)
        console.log(`Service clicked: ${serviceType}`);
        
        // For now, just show an alert - could be replaced with modal or navigation
        const serviceName = e.target.closest('.service-card').querySelector('h3').textContent;
        alert(`Learn more about ${serviceName} - Coming Soon!`);
    }
};

// ===== PERFORMANCE MANAGER =====
const PerformanceManager = {
    init: () => {
        PerformanceManager.optimizeImages();
        PerformanceManager.preloadCriticalResources();
    },

    optimizeImages: () => {
        // Add loading="lazy" to images that are not critical
        const images = document.querySelectorAll('img:not([data-critical])');
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    },

    preloadCriticalResources: () => {
        // Preload critical fonts
        const fontPreloads = [
            'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfedw.woff2',
            'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDYbtXK-F2qO0isEw.woff2'
        ];

        fontPreloads.forEach(fontUrl => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            link.href = fontUrl;
            document.head.appendChild(link);
        });
    }
};

// ===== ERROR HANDLER =====
const ErrorHandler = {
    init: () => {
        window.addEventListener('error', ErrorHandler.handleError);
        window.addEventListener('unhandledrejection', ErrorHandler.handlePromiseRejection);
    },

    handleError: (event) => {
        console.error('JavaScript Error:', event.error);
        // In production, you might want to send errors to a logging service
    },

    handlePromiseRejection: (event) => {
        console.error('Unhandled Promise Rejection:', event.reason);
        // Prevent the default browser behavior
        event.preventDefault();
    }
};

// ===== ACCESSIBILITY MANAGER =====
const AccessibilityManager = {
    init: () => {
        AccessibilityManager.setupKeyboardNavigation();
        AccessibilityManager.setupFocusManagement();
        AccessibilityManager.setupReducedMotion();
    },

    setupKeyboardNavigation: () => {
        // Handle Enter key on clickable elements
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const target = e.target;
                if (target.hasAttribute('data-service') || target.classList.contains('btn')) {
                    target.click();
                }
            }

            // Handle Escape key to close mobile menu
            if (e.key === 'Escape' && AppState.mobileMenuActive) {
                const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
                const mainNav = document.getElementById('main-nav');
                
                if (mobileMenuToggle && mainNav) {
                    AppState.mobileMenuActive = false;
                    mobileMenuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                }
            }
        });
    },

    setupFocusManagement: () => {
        // Add focus indicators for keyboard users
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-user');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-user');
        });
    },

    setupReducedMotion: () => {
        // Respect user's motion preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduced-motion');
        }

        prefersReducedMotion.addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('reduced-motion');
            } else {
                document.body.classList.remove('reduced-motion');
            }
        });
    }
};

// ===== ANALYTICS MANAGER =====
const AnalyticsManager = {
    init: () => {
        AnalyticsManager.trackPageView();
        AnalyticsManager.setupEventTracking();
    },

    trackPageView: () => {
        // In production, integrate with your analytics service
        console.log('Page view tracked:', window.location.pathname);
    },

    trackEvent: (eventName, eventData = {}) => {
        // In production, send to your analytics service
        console.log('Event tracked:', eventName, eventData);
    },

    setupEventTracking: () => {
        // Track button clicks
        document.addEventListener('click', (e) => {
            const target = e.target;
            
            if (target.classList.contains('btn-primary')) {
                AnalyticsManager.trackEvent('cta_click', {
                    button_text: target.textContent,
                    location: target.closest('section')?.className || 'unknown'
                });
            }

            if (target.hasAttribute('data-service')) {
                AnalyticsManager.trackEvent('service_interest', {
                    service: target.dataset.service
                });
            }
        });

        // Track form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'newsletter-form') {
                AnalyticsManager.trackEvent('newsletter_signup_attempt');
            }
        });
    }
};

// ===== THEME MANAGER (Optional) =====
const ThemeManager = {
    init: () => {
        ThemeManager.detectSystemTheme();
        ThemeManager.setupThemeToggle();
    },

    detectSystemTheme: () => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (prefersDark.matches) {
            document.body.classList.add('dark-theme');
        }

        prefersDark.addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        });
    },

    setupThemeToggle: () => {
        // Could add a theme toggle button in the future
        // For now, just respect system preferences
    }
};

// ===== MAIN APPLICATION INITIALIZATION =====
const App = {
    init: () => {
        // Initialize all managers
        LoadingManager.init();
        NavigationManager.init();
        AffirmationManager.init();
        ScrollAnimationsManager.init();
        NewsletterManager.init();
        ServiceManager.init();
        PerformanceManager.init();
        ErrorHandler.init();
        AccessibilityManager.init();
        AnalyticsManager.init();
        ThemeManager.init();

        // Setup resize handler
        window.addEventListener('resize', Utils.debounce(App.handleResize, 250));

        // Setup visibility change handler
        document.addEventListener('visibilitychange', App.handleVisibilityChange);

        console.log('BLOOMÉ application initialized successfully! 🌸');
    },

    handleResize: () => {
        // Handle any resize-specific logic
        if (AppState.mobileMenuActive && window.innerWidth > 768) {
            // Close mobile menu on desktop
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            const mainNav = document.getElementById('main-nav');
            
            if (mobileMenuToggle && mainNav) {
                AppState.mobileMenuActive = false;
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        }
    },

    handleVisibilityChange: () => {
        if (document.hidden) {
            // Page is hidden - pause animations, etc.
            console.log('Page hidden - pausing non-critical operations');
        } else {
            // Page is visible - resume operations
            console.log('Page visible - resuming operations');
        }
    },

    // Cleanup function for SPA navigation or testing
    destroy: () => {
        // Remove event listeners
        window.removeEventListener('resize', App.handleResize);
        document.removeEventListener('visibilitychange', App.handleVisibilityChange);
        
        // Disconnect observers
        AppState.observers.forEach(observer => {
            if (observer && observer.disconnect) {
                observer.disconnect();
            }
        });

        // Reset state
        Object.keys(AppState).forEach(key => {
            if (Array.isArray(AppState[key])) {
                AppState[key] = [];
            } else if (typeof AppState[key] === 'boolean') {
                AppState[key] = false;
            } else if (typeof AppState[key] === 'number') {
                AppState[key] = 0;
            }
        });

        console.log('BLOOMÉ application destroyed');
    }
};

// ===== INITIALIZATION =====
// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', App.init);
} else {
    // DOM is already ready
    App.init();
}

// ===== EXPORT FOR POTENTIAL MODULE USAGE =====
// If using as a module, export the App object
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}

// ===== GLOBAL UTILITIES (Optional) =====
// Make some utilities available globally for debugging or external use
window.BloomeUtils = {
    scrollTo: Utils.smoothScrollTo,
    trackEvent: AnalyticsManager.trackEvent,
    showMessage: NewsletterManager.showMessage
};