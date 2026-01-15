// ===== LOADING SCREEN =====
document.addEventListener('DOMContentLoaded', function() {
    const loading = document.getElementById('loading');
    
    // Hide loading screen after page loads
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 1500);
    
    // Initialize all features
    initializeThemeToggle();
    initializeMobileMenu();
    initializeScrollAnimations();
    initializeTextAnimations();
    initializeGrowthChart();
    initializeAffirmationGenerator();
    initializeMeditationPlayer();
    initializeFloatingElements();
});

// ===== THEME TOGGLE =====
// ===== UNIFIED THEME TOGGLE =====
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (!themeToggle) return;
    
    // UNIFIED storage key
    const THEME_KEY = 'bloome-theme';
    const savedTheme = sessionStorage.getItem(THEME_KEY) || 'light';
    
    // Apply saved theme
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        sessionStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
        
        // Rotation animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

// ===== MOBILE MENU =====
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    mobileMenuToggle.addEventListener('click', () => {
        const isActive = mobileMenuToggle.classList.toggle('active');
        mainNav.classList.toggle('active', isActive);
        
        // Add aria attributes for accessibility
        mobileMenuToggle.setAttribute('aria-expanded', isActive.toString());
    });
    
    // Close mobile menu when clicking on nav links
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !mainNav.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay * 1000);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with reveal-on-scroll class
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ===== TEXT ANIMATIONS =====
function initializeTextAnimations() {
    const splitTextElement = document.querySelector('.animate-text-split');
    
    if (splitTextElement) {
        const text = splitTextElement.textContent;
        splitTextElement.innerHTML = '';
        
        // Split text into individual characters
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.1}s`;
            splitTextElement.appendChild(span);
        });
    }
    
    // Add wavy animation to wavy-text elements
    const wavyTexts = document.querySelectorAll('.wavy-text');
    wavyTexts.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = 'wavy 1s ease-in-out';
            }, 10);
        });
    });
}

// ===== GROWTH CHART ANIMATION =====
function initializeGrowthChart() {
    const growthChart = document.getElementById('growth-chart');
    
    if (growthChart) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateGrowthBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(growthChart);
    }
}

function animateGrowthBars() {
    const growthBars = document.querySelectorAll('.growth-bar');
    
    growthBars.forEach((bar, index) => {
        const fill = bar.querySelector('.growth-bar-fill');
        const valueSpan = bar.querySelector('.growth-bar-value');
        const targetValue = parseInt(bar.dataset.value);
        
        setTimeout(() => {
            // Animate the fill bar
            fill.style.width = `${targetValue}%`;
            
            // Animate the percentage counter
            animateCounter(valueSpan, 0, targetValue, 2000, '%');
        }, index * 300);
    });
}

function animateCounter(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(start + (end - start) * easeOutCubic);
        
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ===== AFFIRMATION GENERATOR =====
function initializeAffirmationGenerator() {
    const affirmations = [
        "You are capable of amazing things.",
        "Your potential is limitless.",
        "You deserve love and happiness.",
        "Every day brings new opportunities.",
        "You are stronger than you think.",
        "Your journey is unique and beautiful.",
        "You have the power to create change.",
        "You are worthy of your dreams.",
        "Your inner light shines bright.",
        "You are exactly where you need to be.",
        "Your kindness makes a difference.",
        "You are growing and learning every day.",
        "Your voice matters and should be heard.",
        "You are a source of joy and inspiration.",
        "Your courage will guide you forward.",
        "You radiate positivity and peace.",
        "Your heart is full of endless possibilities.",
        "You are creating a beautiful life story.",
        "Your presence brings light to others.",
        "You are blooming in your own perfect time."
    ];
    
    const affirmationBox = document.getElementById('affirmation-box');
    const generateButton = document.getElementById('generate-affirmation');
    
    if (affirmationBox && generateButton) {
        generateButton.addEventListener('click', () => {
            // Add loading state
            generateButton.disabled = true;
            generateButton.querySelector('.btn-text').textContent = 'Generating...';
            
            // Remove active class temporarily
            affirmationBox.classList.remove('active');
            
            setTimeout(() => {
                // Get random affirmation
                const randomIndex = Math.floor(Math.random() * affirmations.length);
                const newAffirmation = affirmations[randomIndex];
                
                // Update content with fade effect
                affirmationBox.style.opacity = '0';
                
                setTimeout(() => {
                    affirmationBox.textContent = `"${newAffirmation}"`;
                    affirmationBox.style.opacity = '1';
                    affirmationBox.classList.add('active');
                    
                    // Reset button
                    generateButton.disabled = false;
                    generateButton.querySelector('.btn-text').textContent = 'Generate New Affirmation';
                }, 300);
            }, 800);
        });
    }
}

// ===== MEDITATION PLAYER =====
function initializeMeditationPlayer() {
    const meditationButton = document.getElementById('meditation-button');
    const calmAudio = document.getElementById('calm-audio');
    const floatingLotus = document.getElementById('floating-lotus');
    
    // Create a more accessible audio experience with web audio API fallback
    let audioContext;
    let isPlaying = false;
    
    // Fallback audio files (using data URIs for demo)
    const sounds = [
        { name: 'Bell', frequency: 528 }, // Healing frequency
        { name: 'Ocean', frequency: 396 }, // Liberating frequency  
        { name: 'Forest', frequency: 741 }  // Awakening frequency
    ];
    
    function playTone(frequency, duration = 2000) {
       try {
            if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        } catch (error) {
            console.log('Audio context not supported');
            return;
        }
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        // Create a gentle fade in and out
        const now = audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.3, now + 0.1);
        gainNode.gain.linearRampToValueAtTime(0.3, now + duration/1000 - 0.1);
        gainNode.gain.linearRampToValueAtTime(0, now + duration/1000);
        
        oscillator.start(now);
        oscillator.stop(now + duration/1000);
    }
    
    if (meditationButton) {
        meditationButton.addEventListener('click', async () => {
            if (isPlaying) return;
            
            isPlaying = true;
            meditationButton.disabled = true;
            meditationButton.querySelector('.btn-text').textContent = 'Playing...';
            
            // Add visual feedback
            meditationButton.classList.add('playing');
            
            try {
                // Try to play the audio element first
                if (calmAudio && calmAudio.canPlayType) {
                    await calmAudio.play();
                } else {
                    // Fallback to generated tone
                    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
                    playTone(randomSound.frequency, 3000);
                }
                
                // Add lotus animation
                if (floatingLotus) {
                    floatingLotus.style.animation = 'none';
                    setTimeout(() => {
                        floatingLotus.style.animation = 'heartbeat 0.5s ease-in-out 6, sparkle 3s ease-in-out';
                    }, 10);
                }
                
                setTimeout(() => {
                    isPlaying = false;
                    meditationButton.disabled = false;
                    meditationButton.querySelector('.btn-text').textContent = 'Listen to a Calming Sound';
                    meditationButton.classList.remove('playing');
                }, 3000);
                
            } catch (error) {
                console.log('Audio playback failed, using visual feedback only');
                // Provide visual-only feedback if audio fails
                setTimeout(() => {
                    isPlaying = false;
                    meditationButton.disabled = false;
                    meditationButton.querySelector('.btn-text').textContent = 'Listen to a Calming Sound';
                    meditationButton.classList.remove('playing');
                }, 2000);
            }
        });
    }
    
    // Add click effect to floating lotus
    if (floatingLotus) {
        floatingLotus.addEventListener('click', () => {
            floatingLotus.style.transform = 'scale(1.3) rotate(360deg)';
            floatingLotus.style.filter = 'hue-rotate(90deg)';
            
            setTimeout(() => {
                floatingLotus.style.transform = '';
                floatingLotus.style.filter = '';
            }, 600);
            
            // Create floating hearts effect
            createFloatingHearts(floatingLotus);
        });
    }
}

// ===== FLOATING ELEMENTS =====
function initializeFloatingElements() {
    createFloatingPetals();
    
    // Add parallax effect to existing floating shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.floating-shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

function createFloatingPetals() {
    const heroSection = document.querySelector('.page-hero');
    const container = heroSection?.querySelector('.floating-elements-container');
    
    if (!container) return;
    
    // Create floating petals periodically
    setInterval(() => {
        if (document.visibilityState === 'visible') {
            createPetal(container);
        }
    }, 3000);
    
    // Create initial petals
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createPetal(container), i * 600);
    }
}

function createPetal(container) {
    const petal = document.createElement('div');
    const petalTypes = ['🌸', '🌺', '🌼', '🌻', '🌷'];
    const randomType = petalTypes[Math.floor(Math.random() * petalTypes.length)];
    
    petal.textContent = randomType;
    petal.className = 'floating-petal';
    petal.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 20 + 20}px;
        left: ${Math.random() * 100}%;
        bottom: -50px;
        pointer-events: none;
        z-index: 1;
        animation: floatUp ${Math.random() * 5 + 8}s linear forwards;
        transform: rotate(${Math.random() * 360}deg);
        opacity: ${Math.random() * 0.7 + 0.3};
    `;
    
    container.appendChild(petal);
    
    // Remove petal after animation
    setTimeout(() => {
        if (petal.parentNode) {
            petal.parentNode.removeChild(petal);
        }
    }, 13000);
}

function createFloatingHearts(target) {
    const hearts = ['💖', '💝', '💕', '💗', '💓'];
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
            
            heart.textContent = randomHeart;
            heart.style.cssText = `
                position: absolute;
                font-size: 20px;
                pointer-events: none;
                z-index: 1000;
                animation: heartFloat 2s ease-out forwards;
                left: ${target.offsetLeft + Math.random() * 100 - 50}px;
                top: ${target.offsetTop}px;
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2000);
        }, i * 100);
    }
}

// ===== ADDITIONAL ANIMATIONS =====
// Add CSS for animations that need to be added dynamically
const additionalStyles = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes heartFloat {
        0% {
            transform: translateY(0) scale(0);
            opacity: 1;
        }
        50% {
            transform: translateY(-50px) scale(1.2);
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100px) scale(0.8);
            opacity: 0;
        }
    }
    
    @keyframes wavy {
        0%, 100% { transform: translateY(0); }
        25% { transform: translateY(-10px); }
        50% { transform: translateY(0); }
        75% { transform: translateY(-5px); }
    }
    
    .meditation-button.playing {
        animation: pulse 1s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;

// Add the additional styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll animations
const optimizedScrollHandler = debounce(() => {
    // Your scroll handling code here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.classList.contains('floating-lotus')) {
            e.preventDefault();
            e.target.click();
        }
    }
});

// Respect reduced motion preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.log('An error occurred:', e.error);
    // Graceful degradation - ensure core functionality still works
});



// ===== CLEANUP =====
window.addEventListener('beforeunload', () => {
    // Clean up any ongoing animations or intervals
    if (audioContext && audioContext.state !== 'closed') {
        audioContext.close();
    }
});