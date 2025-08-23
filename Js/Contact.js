// BLOOMÉ Contact Page JavaScript
// Enhanced with wellness-focused interactivity and animations

document.addEventListener('DOMContentLoaded', function() {
    // ===== INITIALIZATION =====
    initializeApp();
    
    function initializeApp() {
        setupLoadingScreen();
        setupMobileMenu();
        setupThemeToggle();
        setupContactForm();
        setupInteractiveElements();
        setupMemoryGame();
        setupHeartInteraction();
        setupNewsletterForm();
        setupScrollEffects();
        setupBusinessHours();
        showWelcomeToast();
    }

    // ===== LOADING SCREEN =====
    function setupLoadingScreen() {
        const loading = document.getElementById('loading');
        
        // Simulate loading time for better UX
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }, 2000);
    }

    // ===== MOBILE MENU =====
    function setupMobileMenu() {
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const mainNav = document.getElementById('main-nav');
        
        if (mobileToggle && mainNav) {
            mobileToggle.addEventListener('click', () => {
                mainNav.classList.toggle('active');
                
                // Animate hamburger menu
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = mainNav.classList.contains('active') ? 'rotate(45deg) translate(6px, 6px)' : '';
                spans[1].style.opacity = mainNav.classList.contains('active') ? '0' : '1';
                spans[2].style.transform = mainNav.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : '';
            });
        }
    }

    // ===== THEME TOGGLE =====
    function setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        
        // Check for saved theme or default to light
        const savedTheme = localStorage.getItem('bloomeTheme') || 'light';
        if (savedTheme === 'dark') {
            body.classList.add('dark-theme');
            themeToggle.textContent = '☀️';
        }
        
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const isDark = body.classList.contains('dark-theme');
            themeToggle.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('bloomeTheme', isDark ? 'dark' : 'light');
            
            // Theme change animation
            themeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 300);
        });
    }

    // ===== CONTACT FORM =====
    function setupContactForm() {
        const form = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submit-btn');
        const successMessage = document.getElementById('success-message');
        const sendAnotherBtn = document.getElementById('send-another');
        
        form.addEventListener('submit', handleFormSubmit);
        sendAnotherBtn.addEventListener('click', resetForm);
        
        // Add ripple effect to submit button
        submitBtn.addEventListener('click', createRippleEffect);
        
        function handleFormSubmit(e) {
            e.preventDefault();
            
            // Show loading state
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.btn-icon');
            
            btnText.textContent = 'Sending...';
            btnIcon.textContent = '✨';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showSuccessMessage();
                resetFormState();
            }, 2000);
        }
        
        function showSuccessMessage() {
            successMessage.classList.add('show');
            playSuccessSound();
        }
        
        function resetForm() {
            successMessage.classList.remove('show');
            form.reset();
            // Clear form validation states
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.style.borderColor = '';
            });
        }
        
        function resetFormState() {
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.btn-icon');
            
            btnText.textContent = 'Send Message';
            btnIcon.textContent = '🚀';
            submitBtn.disabled = false;
        }
        
        function createRippleEffect(e) {
            const rect = submitBtn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('div');
            ripple.className = 'btn-ripple';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            submitBtn.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    }

    // ===== INTERACTIVE ELEMENTS =====
    function setupInteractiveElements() {
        // Method cards interaction
        const methodCards = document.querySelectorAll('.method-card');
        methodCards.forEach(card => {
            card.addEventListener('click', () => {
                const method = card.dataset.method;
                scrollToSection(method === 'form' ? 'form-container' : 'form-container');
                showToast(`Let's ${card.querySelector('h4').textContent.toLowerCase()}! 🌸`);
            });
        });
        
        // Flower interactions in hero
        const flowers = document.querySelectorAll('.flower');
        flowers.forEach(flower => {
            flower.addEventListener('click', () => {
                flower.style.transform = 'scale(1.5) rotate(360deg)';
                setTimeout(() => {
                    flower.style.transform = '';
                }, 500);
                createFloatingEmoji(flower.textContent);
            });
        });
        
        // Map overlay interaction
        const mapOverlay = document.getElementById('map-overlay');
        if (mapOverlay) {
            mapOverlay.addEventListener('click', () => {
                mapOverlay.classList.add('hidden');
                showToast('Explore our wellness oasis! 🗺️');
            });
        }
        
        // Directions button
        const directionsBtn = document.getElementById('get-directions');
        if (directionsBtn) {
            directionsBtn.addEventListener('click', () => {
                // In a real app, this would open Google Maps
                showToast('Opening directions... 🚗');
                window.open('https://maps.google.com', '_blank');
            });
        }
    }

    // ===== MEMORY GAME =====
    function setupMemoryGame() {
        const gameBoard = document.getElementById('game-board');
        const movesElement = document.getElementById('moves');
        const timerElement = document.getElementById('timer');
        const matchesElement = document.getElementById('matches');
        const resetBtn = document.getElementById('reset-game');
        const gameCompletion = document.getElementById('game-completion');
        const playAgainBtn = document.getElementById('play-again');
        const wellnessTip = document.getElementById('wellness-tip');
        const finalTime = document.getElementById('final-time');
        const finalMoves = document.getElementById('final-moves');
        
        let gameState = {
            cards: [],
            flippedCards: [],
            moves: 0,
            matches: 0,
            timer: 0,
            gameStarted: false,
            gameInterval: null
        };
        
        const emojis = ['🧘‍♀️', '🌱', '💖', '🌸', '🦋', '✨', '🌿', '💫'];
        const wellnessTips = [
            "Take 3 deep breaths - inhale peace, exhale stress! 🌬️",
            "Remember: Progress over perfection, always! 🌱",
            "Your mind is a garden - tend it with kindness! 🌻",
            "Every moment is a fresh start! ✨",
            "You are stronger than you think! 💪",
            "Mindfulness is a gift you give yourself! 🎁"
        ];
        
        resetBtn.addEventListener('click', initializeGame);
        playAgainBtn.addEventListener('click', () => {
            gameCompletion.classList.remove('show');
            initializeGame();
        });
        
        initializeGame();
        
        function initializeGame() {
            gameState = {
                cards: [],
                flippedCards: [],
                moves: 0,
                matches: 0,
                timer: 0,
                gameStarted: false,
                gameInterval: null
            };
            
            clearInterval(gameState.gameInterval);
            updateUI();
            createCards();
        }
        
        function createCards() {
            const cardPairs = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
            gameBoard.innerHTML = '';
            
            cardPairs.forEach((emoji, index) => {
                const card = document.createElement('div');
                card.className = 'memory-card';
                card.dataset.emoji = emoji;
                card.dataset.index = index;
                card.addEventListener('click', () => flipCard(card));
                gameBoard.appendChild(card);
                gameState.cards.push(card);
            });
        }
        
        function flipCard(card) {
            if (card.classList.contains('flipped') || 
                card.classList.contains('matched') || 
                gameState.flippedCards.length === 2) {
                return;
            }
            
            if (!gameState.gameStarted) {
                startTimer();
                gameState.gameStarted = true;
            }
            
            card.classList.add('flipped');
            gameState.flippedCards.push(card);
            
            if (gameState.flippedCards.length === 2) {
                gameState.moves++;
                updateUI();
                setTimeout(checkMatch, 600);
            }
        }
        
        function checkMatch() {
            const [card1, card2] = gameState.flippedCards;
            
            if (card1.dataset.emoji === card2.dataset.emoji) {
                card1.classList.add('matched');
                card2.classList.add('matched');
                gameState.matches++;
                
                if (gameState.matches === emojis.length) {
                    setTimeout(gameComplete, 500);
                }
            } else {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
            }
            
            gameState.flippedCards = [];
            updateUI();
        }
        
        function startTimer() {
            gameState.gameInterval = setInterval(() => {
                gameState.timer++;
                updateUI();
            }, 1000);
        }
        
        function updateUI() {
            movesElement.textContent = gameState.moves;
            matchesElement.textContent = `${gameState.matches}/${emojis.length}`;
            
            const minutes = Math.floor(gameState.timer / 60);
            const seconds = gameState.timer % 60;
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        function gameComplete() {
            clearInterval(gameState.gameInterval);
            finalTime.textContent = gameState.timer;
            finalMoves.textContent = gameState.moves;
            
            const randomTip = wellnessTips[Math.floor(Math.random() * wellnessTips.length)];
            wellnessTip.textContent = randomTip;
            
            gameCompletion.classList.add('show');
            playSuccessSound();
        }
    }

    // ===== HEART INTERACTION =====
    function setupHeartInteraction() {
        const hearts = document.querySelectorAll('.heart-button');
        const messageDisplay = document.getElementById('message-display');
        const loveCounter = document.getElementById('love-counter');
        
        const heartMessages = {
            'Gratitude': 'Gratitude transforms what we have into enough ✨',
            'Love': 'Love yourself first, everything else falls into place 💕',
            'Peace': 'Inner peace begins the moment you choose not to react 🕊️',
            'Joy': 'Joy is not in things, it is in us 🌈',
            'Hope': 'Hope is the heartbeat of the soul 💗'
        };
        
        let loveCount = 247;
        
        hearts.forEach(heart => {
            heart.addEventListener('click', () => {
                const message = heart.dataset.message;
                messageDisplay.textContent = heartMessages[message];
                
                loveCount++;
                loveCounter.textContent = loveCount;
                
                // Heart animation
                heart.style.transform = 'scale(1.5) rotate(20deg)';
                setTimeout(() => {
                    heart.style.transform = '';
                }, 300);
                
                createFloatingEmoji(heart.textContent);
                playHeartSound();
            });
        });
    }

    // ===== NEWSLETTER FORM =====
    function setupNewsletterForm() {
        const newsletterForm = document.getElementById('newsletter-form');
        const newsletterInput = document.getElementById('newsletter-email');
        
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterInput.value;
            
            if (email) {
                showToast('Welcome to our blooming community! 🌸');
                newsletterInput.value = '';
                
                // Add sparkle animation to button
                const sparkle = document.querySelector('.btn-sparkle');
                sparkle.style.animation = 'sparkle 0.5s ease-in-out';
                setTimeout(() => {
                    sparkle.style.animation = 'sparkle 2s ease-in-out infinite';
                }, 500);
            }
        });
    }

    // ===== SCROLL EFFECTS =====
    function setupScrollEffects() {
        const scrollIndicator = document.getElementById('scroll-indicator');
        
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                scrollToSection('contact-methods');
            });
        }
        
        // Parallax effect for floating elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const floatingShapes = document.querySelectorAll('.floating-shape');
            
            floatingShapes.forEach((shape, index) => {
                const speed = 0.2 + (index * 0.1);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
        
        // Intersection Observer for fade-in animations
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
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.method-card, .info-card, .memory-game');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // ===== BUSINESS HOURS =====
    function setupBusinessHours() {
        const currentStatus = document.getElementById('current-status');
        const statusDot = currentStatus?.querySelector('.status-dot');
        const statusText = currentStatus?.querySelector('.status-text');
        
        if (!currentStatus) return;
        
        function updateBusinessStatus() {
            const now = new Date();
            const day = now.getDay(); // 0 = Sunday, 6 = Saturday
            const hour = now.getHours();
            
            let isOpen = false;
            
            // Business hours logic
            if (day >= 1 && day <= 5) { // Monday - Friday
                isOpen = hour >= 8 && hour < 20;
            } else if (day === 6) { // Saturday
                isOpen = hour >= 9 && hour < 18;
            } else if (day === 0) { // Sunday
                isOpen = hour >= 10 && hour < 16;
            }
            
            if (isOpen) {
                statusDot.style.background = 'var(--success-color)';
                statusText.textContent = "We're currently open!";
                statusText.style.color = 'var(--success-color)';
                currentStatus.style.background = 'rgba(0, 184, 148, 0.1)';
            } else {
                statusDot.style.background = 'var(--danger-color)';
                statusText.textContent = "We're currently closed";
                statusText.style.color = 'var(--danger-color)';
                currentStatus.style.background = 'rgba(225, 112, 85, 0.1)';
            }
        }
        
        updateBusinessStatus();
        // Update every minute
        setInterval(updateBusinessStatus, 60000);
    }

    // ===== UTILITY FUNCTIONS =====
    function scrollToSection(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    function showToast(message, duration = 3000) {
        const toast = document.getElementById('toast-notification');
        const toastMessage = toast.querySelector('.toast-message');
        
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }
    
    function createFloatingEmoji(emoji) {
        const floatingEmoji = document.createElement('div');
        floatingEmoji.textContent = emoji;
        floatingEmoji.style.cssText = `
            position: fixed;
            font-size: 2rem;
            pointer-events: none;
            z-index: 9999;
            animation: floatUp 3s ease-out forwards;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight}px;
        `;
        
        // Add floating animation
        const floatUpKeyframes = `
            @keyframes floatUp {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-200px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        
        if (!document.querySelector('#floatUpAnimation')) {
            const style = document.createElement('style');
            style.id = 'floatUpAnimation';
            style.textContent = floatUpKeyframes;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(floatingEmoji);
        
        setTimeout(() => {
            floatingEmoji.remove();
        }, 3000);
    }
    
    function playSuccessSound() {
        // Create a simple success sound using Web Audio API
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            const AudioContextClass = AudioContext || webkitAudioContext;
            const audioContext = new AudioContextClass();
            
            // Create a simple success melody
            const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
            
            frequencies.forEach((freq, index) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
                gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
                
                oscillator.start(audioContext.currentTime + index * 0.1);
                oscillator.stop(audioContext.currentTime + index * 0.1 + 0.3);
            });
        }
    }
    
    function playHeartSound() {
        // Create a gentle heart sound
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            const AudioContextClass = AudioContext || webkitAudioContext;
            const audioContext = new AudioContextClass();
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.01);
            gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        }
    }
    
    function showWelcomeToast() {
        setTimeout(() => {
            showToast('Welcome to BLOOMÉ! 🌸 We\'re so happy you\'re here!', 4000);
        }, 3000);
    }

    // ===== ADVANCED INTERACTIONS =====
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'm':
                    e.preventDefault();
                    scrollToSection('form-container');
                    showToast('Quick navigation: Contact form! ⚡');
                    break;
                case 'g':
                    e.preventDefault();
                    scrollToSection('memory-game');
                    showToast('Quick navigation: Memory game! 🎮');
                    break;
                case 't':
                    e.preventDefault();
                    document.getElementById('theme-toggle').click();
                    break;
            }
        }
        
        // Easter egg: Konami code for special animation
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        if (!window.konamiProgress) window.konamiProgress = 0;
        
        if (e.code === konamiCode[window.konamiProgress]) {
            window.konamiProgress++;
            if (window.konamiProgress === konamiCode.length) {
                triggerKonamiEasterEgg();
                window.konamiProgress = 0;
            }
        } else {
            window.konamiProgress = 0;
        }
    });
    
    function triggerKonamiEasterEgg() {
        showToast('🎉 You found the secret! Welcome to the wellness warrior club! 🧘‍♀️');
        
        // Create rainbow animation
        const body = document.body;
        body.style.animation = 'rainbow 2s ease-in-out';
        
        // Add rainbow keyframes if not exists
        if (!document.querySelector('#rainbowAnimation')) {
            const style = document.createElement('style');
            style.id = 'rainbowAnimation';
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    25% { filter: hue-rotate(90deg); }
                    50% { filter: hue-rotate(180deg); }
                    75% { filter: hue-rotate(270deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            body.style.animation = '';
        }, 2000);
        
        // Cascade floating emojis
        const celebrationEmojis = ['🎉', '✨', '🌈', '🦄', '💖', '🌸', '🎊'];
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const randomEmoji = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
                createFloatingEmoji(randomEmoji);
            }, i * 100);
        }
    }
    
    // Form validation enhancement
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select');
    formInputs.forEach(input => {
        // Real-time validation
        input.addEventListener('input', validateInput);
        input.addEventListener('blur', validateInput);
        
        function validateInput() {
            const value = input.value.trim();
            let isValid = true;
            
            // Basic validation rules
            if (input.hasAttribute('required') && !value) {
                isValid = false;
            }
            
            if (input.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
            }
            
            if (input.type === 'tel' && value) {
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                isValid = phoneRegex.test(value.replace(/\s+/g, ''));
            }
            
            // Visual feedback
            if (value && !isValid) {
                input.style.borderColor = 'var(--danger-color)';
                input.style.background = 'rgba(225, 112, 85, 0.1)';
            } else if (value && isValid) {
                input.style.borderColor = 'var(--success-color)';
                input.style.background = 'rgba(0, 184, 148, 0.1)';
            } else {
                input.style.borderColor = '';
                input.style.background = '';
            }
        }
    });
    
    // Auto-save form data
    const formData = {};
    formInputs.forEach(input => {
        // Load saved data
        const saved = localStorage.getItem(`bloome_form_${input.name}`);
        if (saved && input.type !== 'password') {
            input.value = saved;
        }
        
        // Save data on change
        input.addEventListener('input', () => {
            if (input.value.trim()) {
                localStorage.setItem(`bloome_form_${input.name}`, input.value);
            } else {
                localStorage.removeItem(`bloome_form_${input.name}`);
            }
        });
    });
    
    // Accessibility enhancements
    document.addEventListener('focus', (e) => {
        if (e.target.matches('button, input, textarea, select')) {
            e.target.style.outline = '3px solid var(--primary-color)';
            e.target.style.outlineOffset = '2px';
        }
    }, true);
    
    document.addEventListener('blur', (e) => {
        if (e.target.matches('button, input, textarea, select')) {
            e.target.style.outline = '';
            e.target.style.outlineOffset = '';
        }
    }, true);
    
    // Performance monitoring
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`🌸 BLOOMÉ loaded in ${loadTime}ms - Optimized for wellness!`);
        }
    });
    
    // Service worker registration for offline functionality
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('🌸 BLOOMÉ Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('🌸 BLOOMÉ Service Worker registration failed:', error);
            });
    }
    
    // Memory cleanup on page unload
    window.addEventListener('beforeunload', () => {
        // Clear any running intervals
        if (window.gameInterval) {
            clearInterval(window.gameInterval);
        }
        
        // Clean up audio contexts
        if (window.audioContext) {
            window.audioContext.close();
        }
    });

    // ===== FINAL TOUCH =====
    console.log(`
    🌸 Welcome to BLOOMÉ Contact Page! 🌸
    
    Hidden features:
    • Press Ctrl/Cmd + M to jump to contact form
    • Press Ctrl/Cmd + G to jump to memory game
    • Press Ctrl/Cmd + T to toggle theme
    • Try the Konami code for a surprise! ↑↑↓↓←→←→BA
    
    Built with wellness and love 💖
    `);
});

// ===== GLOBAL ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('🌸 BLOOMÉ Error:', e.error);
    // Could send error reports to analytics service
});

// ===== WELLNESS QUOTES ROTATION =====
const wellnessQuotes = [
    "Take time to nurture your soul 🌱",
    "Breathe in peace, breathe out love ✨",
    "Your mental health is a priority 💖",
    "Progress, not perfection 🌸",
    "You are worthy of love and happiness 🦋",
    "Every day is a fresh start 🌅",
    "Be gentle with yourself 🌿"
];

function showRandomQuote() {
    const randomQuote = wellnessQuotes[Math.floor(Math.random() * wellnessQuotes.length)];
    // You could display this in a subtle notification or update UI element
    console.log(`🌸 Daily Wellness Reminder: ${randomQuote}`);
}

// Show a wellness quote every 5 minutes
setInterval(showRandomQuote, 300000);