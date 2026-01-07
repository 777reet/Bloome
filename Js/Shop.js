// BLOOMÉ Shop Page JavaScript
// E-commerce functionality with wellness-focused interactivity

document.addEventListener('DOMContentLoaded', function() {
    // ===== INITIALIZATION =====
    initializeApp();
    
    function initializeApp() {
        setupLoadingScreen();
        setupMobileMenu();
        setupThemeToggle();
        setupProductCards();
        setupShoppingCart();
        setupPetalRain();
        setupScrollAnimations();
        showWelcomeToast();
    }

    // ===== LOADING SCREEN =====
    function setupLoadingScreen() {
        const loading = document.getElementById('loading');
        
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }, 1500);
    }

    // ===== MOBILE MENU =====
    function setupMobileMenu() {
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const mainNav = document.getElementById('main-nav');
        
        if (mobileToggle && mainNav) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                mainNav.classList.toggle('active');
            });
            
            // Close menu when clicking nav links
            const navLinks = mainNav.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                });
            });
        }
    }

    // ===== THEME TOGGLE =====
    function setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        
        if (!themeToggle) return;
        
        // Check for saved theme preference
        const savedTheme = sessionStorage.getItem('bloomeTheme') || 'light';
        if (savedTheme === 'dark') {
            body.classList.add('dark-theme');
            themeToggle.textContent = '☀️';
        }
        
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const isDark = body.classList.contains('dark-theme');
            themeToggle.textContent = isDark ? '☀️' : '🌙';
            sessionStorage.setItem('bloomeTheme', isDark ? 'dark' : 'light');
            
            // Smooth rotation animation
            themeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 300);
        });
    }

    // ===== SHOPPING CART STATE =====
    const cartState = {
        items: [],
        total: 0,
        isOpen: false
    };

    // ===== PRODUCT CARDS =====
    function setupProductCards() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach((card, index) => {
            // Add entrance animation delay
            card.style.animationDelay = `${index * 0.2}s`;
            
            // Setup add to cart buttons
            const addToCartBtn = card.querySelector('.add-to-cart');
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const productName = addToCartBtn.dataset.product;
                    const priceText = card.querySelector('.price').textContent;
                    const price = parseFloat(priceText.replace('₹', ''));
                    const imageUrl = card.querySelector('.product-image img')?.src || '';
                    
                    addToCart({
                        name: productName,
                        price: price,
                        image: imageUrl,
                        id: `product-${index}`
                    });
                    
                    // Button feedback
                    animateButton(addToCartBtn);
                });
            }
            
            // Product card hover effect
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ===== SHOPPING CART =====
    function setupShoppingCart() {
        const cartSummary = document.getElementById('cart-summary');
        const checkoutBtn = document.getElementById('checkout-btn');
        
        if (!cartSummary) return;
        
        // Checkout button
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (cartState.items.length === 0) {
                    showToast('Your cart is empty! Add some wellness products 🌸', 3000);
                    return;
                }
                
                showToast('Processing your order... 🛍️', 2000);
                
                setTimeout(() => {
                    showToast('Thank you for your purchase! Your wellness journey continues 💖', 4000);
                    clearCart();
                    cartSummary.classList.remove('show');
                }, 2000);
            });
        }
        
        // Click outside to close cart
        document.addEventListener('click', (e) => {
            if (cartState.isOpen && 
                !cartSummary.contains(e.target) && 
                !e.target.closest('.add-to-cart')) {
                cartSummary.classList.remove('show');
                cartState.isOpen = false;
            }
        });
    }

    function addToCart(product) {
        // Check if product already exists
        const existingItem = cartState.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
            showToast(`Added another ${product.name} to cart! 🛒`, 2000);
        } else {
            cartState.items.push({
                ...product,
                quantity: 1
            });
            showToast(`${product.name} added to cart! 🌸`, 2000);
        }
        
        updateCartUI();
        
        // Show cart briefly
        const cartSummary = document.getElementById('cart-summary');
        if (cartSummary) {
            cartSummary.classList.add('show');
            cartState.isOpen = true;
            
            // Auto-hide after 3 seconds if more shopping
            setTimeout(() => {
                if (cartState.isOpen) {
                    cartSummary.classList.remove('show');
                    cartState.isOpen = false;
                }
            }, 3000);
        }
        
        // Play success sound
        playSuccessSound();
    }

    function removeFromCart(productId) {
        const index = cartState.items.findIndex(item => item.id === productId);
        
        if (index !== -1) {
            const removedItem = cartState.items[index];
            
            if (removedItem.quantity > 1) {
                removedItem.quantity--;
            } else {
                cartState.items.splice(index, 1);
            }
            
            updateCartUI();
            showToast('Item removed from cart 🗑️', 2000);
        }
    }

    function clearCart() {
        cartState.items = [];
        updateCartUI();
    }

    function updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        
        if (!cartItems || !cartTotal) return;
        
        // Update count
        const totalItems = cartState.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
        if (cartCount) {
            cartCount.textContent = totalItems;
        }
        
        // Update items display
        if (cartState.items.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartTotal.textContent = '₹0';
            return;
        }
        
        cartItems.innerHTML = cartState.items.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">₹${item.price} × ${item.quantity}</p>
                </div>
                <button class="remove-item" data-id="${item.id}" aria-label="Remove ${item.name}">
                    ✕
                </button>
            </div>
        `).join('');
        
        // Calculate total
        const total = cartState.items.reduce((sum, item) => 
            sum + (item.price * (item.quantity || 1)), 0
        );
        cartTotal.textContent = `₹${total.toFixed(2)}`;
        
        // Add event listeners to remove buttons
        const removeButtons = cartItems.querySelectorAll('.remove-item');
        removeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                removeFromCart(btn.dataset.id);
            });
        });
    }

    // ===== PETAL RAIN =====
    function setupPetalRain() {
        const petalRain = document.getElementById('petal-rain');
        if (!petalRain) return;
        
        const petals = ['🌸', '🌺', '🌼', '🌻', '🌷', '💮'];
        
        function createPetal() {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.textContent = petals[Math.floor(Math.random() * petals.length)];
            
            // Random positioning
            petal.style.left = `${Math.random() * 100}%`;
            petal.style.animationDuration = `${Math.random() * 3 + 4}s`;
            petal.style.animationDelay = `${Math.random() * 2}s`;
            petal.style.fontSize = `${Math.random() * 1 + 1.5}rem`;
            
            petalRain.appendChild(petal);
            
            // Remove after animation
            setTimeout(() => {
                if (petal.parentNode) {
                    petal.parentNode.removeChild(petal);
                }
            }, 7000);
        }
        
        // Create petals periodically
        setInterval(() => {
            if (document.visibilityState === 'visible') {
                createPetal();
            }
        }, 800);
        
        // Initial petals
        for (let i = 0; i < 8; i++) {
            setTimeout(() => createPetal(), i * 200);
        }
    }

    // ===== SCROLL ANIMATIONS =====
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe fade-in elements
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => observer.observe(el));
        
        // Parallax effect for floating shapes
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const floatingShapes = document.querySelectorAll('.floating-shape');
                    
                    floatingShapes.forEach((shape, index) => {
                        const speed = 0.3 + (index * 0.1);
                        const yPos = -(scrolled * speed);
                        shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.05}deg)`;
                    });
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        }, { passive: true });
    }

    // ===== UTILITY FUNCTIONS =====
    function animateButton(button) {
        const originalText = button.textContent;
        button.textContent = 'Added! ✓';
        button.style.background = 'linear-gradient(45deg, #00b894, #a8e6cf)';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.disabled = false;
        }, 1500);
        
        // Ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 25px;
            background: rgba(255, 255, 255, 0.5);
            top: 0;
            left: 0;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    function showToast(message, duration = 3000) {
        // Create toast if doesn't exist
        let toast = document.getElementById('toast-notification');
        
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast-notification';
            toast.className = 'toast-notification';
            toast.innerHTML = `
                <div class="toast-content">
                    <span class="toast-icon">✨</span>
                    <span class="toast-message"></span>
                </div>
            `;
            document.body.appendChild(toast);
        }
        
        const toastMessage = toast.querySelector('.toast-message');
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }

    function showWelcomeToast() {
        setTimeout(() => {
            showToast('Welcome to our wellness collection! 🌸', 3000);
        }, 2000);
    }

    function playSuccessSound() {
        try {
            if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
                const AudioContextClass = AudioContext || webkitAudioContext;
                const audioContext = new AudioContextClass();
                
                // Create pleasant chime sound
                const frequencies = [523.25, 659.25]; // C5, E5
                
                frequencies.forEach((freq, index) => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                    oscillator.type = 'sine';
                    
                    gainNode.gain.setValueAtTime(0, audioContext.currentTime + index * 0.1);
                    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + index * 0.1 + 0.01);
                    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + index * 0.1 + 0.2);
                    
                    oscillator.start(audioContext.currentTime + index * 0.1);
                    oscillator.stop(audioContext.currentTime + index * 0.1 + 0.2);
                });
            }
        } catch (error) {
            console.log('Audio context not supported');
        }
    }

    // ===== KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + B to toggle cart
        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
            e.preventDefault();
            const cartSummary = document.getElementById('cart-summary');
            if (cartSummary) {
                cartSummary.classList.toggle('show');
                cartState.isOpen = !cartState.isOpen;
                showToast('Cart toggled! 🛒', 1500);
            }
        }
        
        // Ctrl/Cmd + T for theme
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            document.getElementById('theme-toggle')?.click();
        }
        
        // Escape to close cart
        if (e.key === 'Escape') {
            const cartSummary = document.getElementById('cart-summary');
            if (cartSummary && cartState.isOpen) {
                cartSummary.classList.remove('show');
                cartState.isOpen = false;
            }
        }
    });

    // ===== ACCESSIBILITY ENHANCEMENTS =====
    // Focus management
    document.addEventListener('focus', (e) => {
        if (e.target.matches('button, input, select, a')) {
            e.target.style.outline = '3px solid var(--primary-color)';
            e.target.style.outlineOffset = '2px';
        }
    }, true);
    
    document.addEventListener('blur', (e) => {
        if (e.target.matches('button, input, select, a')) {
            e.target.style.outline = '';
            e.target.style.outlineOffset = '';
        }
    }, true);

    // ===== PRODUCT FILTERING (Future Enhancement) =====
    function setupProductFilters() {
        // This can be expanded for category filtering
        const products = document.querySelectorAll('.product-card');
        
        window.filterProducts = (category) => {
            products.forEach(product => {
                if (category === 'all' || product.dataset.category === category) {
                    product.style.display = 'block';
                    setTimeout(() => {
                        product.style.opacity = '1';
                        product.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    product.style.opacity = '0';
                    product.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        product.style.display = 'none';
                    }, 300);
                }
            });
        };
    }

    setupProductFilters();

    // ===== PERFORMANCE MONITORING =====
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`🌸 BLOOMÉ Shop loaded in ${loadTime}ms`);
        }
    });

    // ===== ANIMATIONS CSS =====
    const additionalStyles = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .toast-notification {
            position: fixed;
            top: 2rem;
            right: -400px;
            background: var(--bg-primary);
            padding: 1rem 1.5rem;
            border-radius: 15px;
            box-shadow: var(--shadow-heavy);
            z-index: 10001;
            transition: right 0.3s ease;
            max-width: 300px;
        }
        
        .toast-notification.show {
            right: 2rem;
        }
        
        .toast-content {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .toast-icon {
            font-size: 1.5rem;
        }
        
        .toast-message {
            color: var(--text-primary);
            font-weight: 500;
        }
        
        @media (max-width: 768px) {
            .toast-notification {
                right: -100%;
                left: 1rem;
                max-width: calc(100% - 2rem);
            }
            
            .toast-notification.show {
                right: auto;
                left: 1rem;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);

    // ===== CLEANUP =====
    window.addEventListener('beforeunload', () => {
        // Save cart state to session storage
        if (cartState.items.length > 0) {
            sessionStorage.setItem('bloomeCart', JSON.stringify(cartState.items));
        }
    });

    // Load cart from session storage
    const savedCart = sessionStorage.getItem('bloomeCart');
    if (savedCart) {
        try {
            const items = JSON.parse(savedCart);
            if (Array.isArray(items) && items.length > 0) {
                cartState.items = items;
                updateCartUI();
                showToast('Welcome back! Your cart has been restored 🛒', 3000);
            }
        } catch (error) {
            console.log('Could not restore cart');
        }
    }

    // ===== CONSOLE MESSAGE =====
    console.log(`
    🌸 Welcome to BLOOMÉ Shop! 🌸
    
    Keyboard shortcuts:
    • Ctrl/Cmd + B - Toggle shopping cart
    • Ctrl/Cmd + T - Toggle theme
    • Escape - Close cart
    
    Built with wellness and love 💖
    `);
});

// ===== GLOBAL ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('🌸 BLOOMÉ Shop Error:', e.error);
});

// ===== REDUCE MOTION SUPPORT =====
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}