// ===== GLOBAL VARIABLES =====
let breathingInterval;
let breathingActive = false;
let currentQuoteIndex = 0;

// ===== YOGA POSES DATA =====
const yogaPoses = [
    {
        name: "Mountain Pose (Tadasana)",
        difficulty: "Beginner",
        benefits: ["🏔️ Grounding", "💪 Posture", "🧘‍♀️ Focus"],
        description: "This foundational pose improves posture, strengthens thighs, knees, and ankles, and firms the abdomen and buttocks. It also helps to alleviate sciatica and increase body awareness.",
        instructions: [
            "Stand with feet hip-width apart",
            "Ground through all four corners of your feet",
            "Engage your leg muscles and lift your kneecaps",
            "Lengthen your spine and relax your shoulders"
        ],
        image: "https://images.unsplash.com/photo-1573030472493-272ce12d8a1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHw3fHx5b2dhJTIwcG9zZXxlbnwwfHx8fDE3MDIxMzkxNzd8MA&ixlib=rb-4.0.3&q=80&w=1080"
    },
    {
        name: "Downward Dog (Adho Mukha Svanasana)",
        difficulty: "Beginner",
        benefits: ["🐕 Strength", "🌊 Flexibility", "🧠 Circulation"],
        description: "A fundamental yoga pose that stretches the entire body while building strength in the arms and legs. It's an excellent pose for improving circulation and energizing the body.",
        instructions: [
            "Start on hands and knees",
            "Tuck toes under and lift hips up",
            "Straighten legs and press hands firmly down",
            "Create an inverted V-shape with your body"
        ],
        image: "https://images.unsplash.com/photo-1506629905496-c1bb9bb7bce4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxkb3duLXdhcmQtZG9nLXlvZ2F8ZW58MHx8fHwxNzAyMTM5MjEwfDA&ixlib=rb-4.0.3&q=80&w=1080"
    },
    {
        name: "Warrior I (Virabhadrasana I)",
        difficulty: "Intermediate",
        benefits: ["⚔️ Strength", "💖 Heart Opening", "🦵 Stability"],
        description: "A powerful standing pose that builds strength and stability while opening the heart and hips. This pose cultivates focus, determination, and inner warrior spirit.",
        instructions: [
            "Step left foot back about 4 feet",
            "Turn left foot out 45 degrees",
            "Bend right knee over right ankle",
            "Reach arms overhead and hold"
        ],
        image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwyfHx3YXJyaW9yLXBvc2UteW9nYXxlbnwwfHx8fDE3MDIxMzkyMjB8MA&ixlib=rb-4.0.3&q=80&w=1080"
    },
    {
        name: "Tree Pose (Vrikshasana)",
        difficulty: "Intermediate",
        benefits: ["🌳 Balance", "🧘‍♀️ Focus", "💪 Core Strength"],
        description: "A balancing pose that improves concentration and strengthens the legs and core. It teaches patience, focus, and the art of finding stillness within movement.",
        instructions: [
            "Stand on left foot, place right foot on inner thigh",
            "Avoid placing foot on the side of the knee",
            "Bring palms together at heart center",
            "Find a focal point and breathe steadily"
        ],
        image: "https://images.unsplash.com/photo-1573030472493-272ce12d8a1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwzfHx0cmVlLXBvc2UteW9nYXxlbnwwfHx8fDE3MDIxMzkyMzB8MA&ixlib=rb-4.0.3&q=80&w=1080"
    },
    {
        name: "Crow Pose (Bakasana)",
        difficulty: "Advanced",
        benefits: ["🔥 Arm Strength", "⚡ Core Power", "🧠 Mental Focus"],
        description: "An advanced arm balance that requires significant upper body strength and mental focus. This pose builds confidence and teaches the importance of finding balance through breath.",
        instructions: [
            "Squat down with feet close together",
            "Place palms flat on the ground",
            "Rest knees on your upper arms",
            "Shift weight forward and lift toes off ground"
        ],
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjcm93LXBvc2UteW9nYXxlbnwwfHx8fDE3MDIxMzkyNDB8MA&ixlib=rb-4.0.3&q=80&w=1080"
    },
    {
        name: "Camel Pose (Ustrasana)",
        difficulty: "Advanced",
        benefits: ["💖 Heart Opening", "🌊 Back Flexibility", "✨ Energy Boost"],
        description: "A deep backbend that opens the heart and throat chakras while strengthening the back muscles. This pose is incredibly energizing and emotionally releasing.",
        instructions: [
            "Kneel with shins parallel",
            "Place hands on lower back",
            "Slowly arch back, opening the chest",
            "Reach for heels if comfortable"
        ],
        image: "https://images.unsplash.com/photo-1573030472493-272ce12d8a1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHw1fHxjYW1lbC1wb3NlLXlvZ2F8ZW58MHx8fHwxNzAyMTM5MjUwfDA&ixlib=rb-4.0.3&q=80&w=1080"
    }
];

// ===== INSPIRATIONAL QUOTES =====
const inspirationalQuotes = [
    {
        text: "Yoga is not about touching your toes. It is about what you learn on the way down.",
        author: "Judith Hanson Lasater"
    },
    {
        text: "The success of yoga does not lie in the ability to attain the perfect posture but in how it contributes to healing the fragmentation in our whole being.",
        author: "T.K.V. Desikachar"
    },
    {
        text: "Yoga is a way of life that takes every breath as a new beginning.",
        author: "Amit Ray"
    },
    {
        text: "The body benefits from movement, and the mind benefits from stillness.",
        author: "Sakyong Mipham"
    },
    {
        text: "Yoga is not a work-out, it is a work-in. And this is the point of spiritual practice; to make us teachable; to open up our hearts and focus our awareness.",
        author: "Rolf Gates"
    },
    {
        text: "The rhythm of the body, the melody of the mind, and the harmony of the soul is hidden in the dance of yoga.",
        author: "B.K.S. Iyengar"
    }
];

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeLoading();
    initializeNavigation();
    initializeAnimations();
    initializeHeroText();
    initializeFloatingElements();
    initializeBreathingExercise();
    initializeProgressChart();
    initializePoseOfTheDay();
    initializeQuoteRotation();
    initializeScrollReveal();
    initializeThemeToggle();
    initializeVideoThumbnails();
});

// ===== LOADING SCREEN =====
function initializeLoading() {
    const loading = document.getElementById('loading');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function() {
            mobileToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !mainNav.contains(e.target)) {
                mobileToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    }
}

// ===== HERO TEXT ANIMATION =====
function initializeHeroText() {
    const titleElement = document.querySelector('.animate-text-split');
    
    if (titleElement) {
        const text = titleElement.textContent;
        titleElement.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.1}s`;
            titleElement.appendChild(span);
        });
    }
}

// ===== FLOATING ELEMENTS =====
function initializeFloatingElements() {
    const container = document.querySelector('.floating-elements-container');
    
    if (container) {
        function createFloatingElement() {
            const types = ['petal', 'leaf', 'bubble'];
            const type = types[Math.floor(Math.random() * types.length)];
            const element = document.createElement('div');
            element.className = `floating-${type}`;
            
            const size = Math.random() * 20 + 10;
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            element.style.left = `${Math.random() * 100}%`;
            element.style.animationDuration = `${Math.random() * 3 + 5}s`;
            element.style.animationDelay = `${Math.random() * 2}s`;
            
            container.appendChild(element);
            
            setTimeout(() => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            }, 8000);
        }
        
        // Create floating elements periodically
        setInterval(createFloatingElement, 1500);
        
        // Create initial elements
        for (let i = 0; i < 5; i++) {
            setTimeout(createFloatingElement, i * 300);
        }
    }
}

// ===== BREATHING EXERCISE =====
function initializeBreathingExercise() {
    const startButton = document.getElementById('start-breathing');
    const breathCircle = document.querySelector('.breath-circle');
    const breathPhase = document.getElementById('breath-phase');
    const breathCount = document.getElementById('breath-count');
    
    if (startButton && breathCircle && breathPhase && breathCount) {
        startButton.addEventListener('click', function() {
            if (!breathingActive) {
                startBreathingExercise();
            } else {
                stopBreathingExercise();
            }
        });
    }
    
    function startBreathingExercise() {
        breathingActive = true;
        startButton.querySelector('.btn-text').textContent = 'Stop Exercise';
        startButton.querySelector('.btn-icon').textContent = '⏹️';
        
        let currentPhase = 'inhale';
        let count = 4;
        let cycles = 0;
        const totalCycles = 6; // 3 minutes roughly
        
        function updateBreathing() {
            breathCount.textContent = count;
            
            if (currentPhase === 'inhale') {
                breathPhase.textContent = 'Breathe In';
                breathCircle.className = 'breath-circle inhale';
            } else if (currentPhase === 'hold') {
                breathPhase.textContent = 'Hold';
                breathCircle.className = 'breath-circle inhale';
            } else {
                breathPhase.textContent = 'Breathe Out';
                breathCircle.className = 'breath-circle exhale';
            }
            
            count--;
            
            if (count < 0) {
                if (currentPhase === 'inhale') {
                    currentPhase = 'hold';
                    count = 4;
                } else if (currentPhase === 'hold') {
                    currentPhase = 'exhale';
                    count = 6;
                } else {
                    currentPhase = 'inhale';
                    count = 4;
                    cycles++;
                }
            }
            
            if (cycles >= totalCycles) {
                stopBreathingExercise();
                showBreathingComplete();
                return;
            }
        }
        
        updateBreathing();
        breathingInterval = setInterval(updateBreathing, 1000);
    }
    
    function stopBreathingExercise() {
        breathingActive = false;
        clearInterval(breathingInterval);
        startButton.querySelector('.btn-text').textContent = 'Start Breathing Exercise';
        startButton.querySelector('.btn-icon').textContent = '🧘‍♀️';
        breathPhase.textContent = 'Press Start';
        breathCount.textContent = '';
        breathCircle.className = 'breath-circle';
    }
    
    function showBreathingComplete() {
        breathPhase.textContent = 'Complete! 🌟';
        breathCount.textContent = '';
        
        setTimeout(() => {
            breathPhase.textContent = 'Press Start';
        }, 3000);
    }
}

// ===== PROGRESS CHART =====
function initializeProgressChart() {
    const chartBars = document.querySelectorAll('.chart-bar');
    
    function animateChart() {
        chartBars.forEach((bar, index) => {
            const value = parseInt(bar.getAttribute('data-value'));
            const label = bar.getAttribute('data-label').toLowerCase();
            const fill = bar.querySelector('.chart-bar-fill');
            const valueElement = bar.querySelector('.chart-bar-value');
            
            setTimeout(() => {
                fill.style.height = `${value}%`;
                fill.classList.add(label);
                
                // Animate the percentage counter
                let currentValue = 0;
                const increment = value / 50;
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= value) {
                        currentValue = value;
                        clearInterval(counter);
                    }
                    valueElement.textContent = `${Math.round(currentValue)}%`;
                }, 40);
            }, index * 200);
        });
    }
    
    // Animate when chart comes into view
    const chartWrapper = document.querySelector('.chart-wrapper');
    if (chartWrapper) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateChart();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(chartWrapper);
    }
}

// ===== POSE OF THE DAY =====
function initializePoseOfTheDay() {
    const generateButton = document.getElementById('generate-pose');
    
    if (generateButton) {
        generateButton.addEventListener('click', function() {
            generateRandomPose();
        });
        
        // Set initial random pose
        generateRandomPose();
    }
}

function generateRandomPose() {
    const randomIndex = Math.floor(Math.random() * yogaPoses.length);
    const pose = yogaPoses[randomIndex];
    
    const poseCard = document.getElementById('pose-card');
    const poseImage = document.getElementById('pose-image');
    const poseDifficulty = document.getElementById('pose-difficulty');
    const poseName = document.getElementById('pose-name');
    const poseBenefits = document.getElementById('pose-benefits');
    const poseDescription = document.getElementById('pose-description');
    const poseInstructions = document.getElementById('pose-instructions');
    
    // Add transition effect
    poseCard.style.opacity = '0.5';
    poseCard.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        // Update content
        poseImage.src = pose.image;
        poseImage.alt = pose.name;
        poseDifficulty.textContent = pose.difficulty;
        poseName.textContent = pose.name;
        poseDescription.textContent = pose.description;
        
        // Update benefits
        poseBenefits.innerHTML = pose.benefits.map(benefit => 
            `<span class="benefit-tag">${benefit}</span>`
        ).join('');
        
        // Update instructions
        const instructionsList = poseInstructions.querySelector('ol');
        instructionsList.innerHTML = pose.instructions.map(instruction => 
            `<li>${instruction}</li>`
        ).join('');
        
        // Set difficulty class
        poseDifficulty.className = `pose-difficulty ${pose.difficulty.toLowerCase()}`;
        
        // Restore appearance
        poseCard.style.opacity = '1';
        poseCard.style.transform = 'scale(1)';
    }, 300);
}

// ===== QUOTE ROTATION =====
function initializeQuoteRotation() {
    const quotesContainer = document.getElementById('inspirational-quotes');
    
    if (quotesContainer && inspirationalQuotes.length > 0) {
        function createQuoteCard(quote, index) {
            const card = document.createElement('div');
            card.className = 'quote-card';
            card.innerHTML = `
                <p>"${quote.text}"</p>
                <span class="quote-author">- ${quote.author}</span>
            `;
            return card;
        }
        
        function rotateQuotes() {
            const currentCard = quotesContainer.querySelector('.quote-card.active');
            if (currentCard) {
                currentCard.classList.remove('active');
            }
            
            currentQuoteIndex = (currentQuoteIndex + 1) % inspirationalQuotes.length;
            
            setTimeout(() => {
                quotesContainer.innerHTML = '';
                const newCard = createQuoteCard(inspirationalQuotes[currentQuoteIndex], currentQuoteIndex);
                quotesContainer.appendChild(newCard);
                
                setTimeout(() => {
                    newCard.classList.add('active');
                }, 100);
            }, 400);
        }
        
        // Initialize first quote
        const firstCard = createQuoteCard(inspirationalQuotes[0], 0);
        quotesContainer.appendChild(firstCard);
        setTimeout(() => firstCard.classList.add('active'), 100);
        
        // Rotate quotes every 6 seconds
        setInterval(rotateQuotes, 6000);
    }
}

// ===== SCROLL REVEAL ANIMATION =====
function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, delay * 1000);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== THEME TOGGLE =====
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('bloome-theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-theme');
            
            if (body.classList.contains('dark-theme')) {
                themeToggle.textContent = '☀️';
                localStorage.setItem('bloome-theme', 'dark');
            } else {
                themeToggle.textContent = '🌙';
                localStorage.setItem('bloome-theme', 'light');
            }
        });
    }
}

// ===== VIDEO THUMBNAILS =====
function initializeVideoThumbnails() {
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const videoType = this.getAttribute('data-video-type');
            openVideoModal(videoType);
        });
    });
}

function openVideoModal(videoType) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <button class="video-modal-close">&times;</button>
            <div class="video-placeholder">
                <h3>Video Coming Soon!</h3>
                <p>This ${videoType} yoga flow video will be available soon. Thank you for your patience! 🧘‍♀️</p>
                <div class="video-preview">
                    <div class="video-preview-icon">📹</div>
                    <p>In the meantime, try following along with the pose instructions below.</p>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.video-modal-content');
    modalContent.style.cssText = `
        background: var(--white);
        border-radius: var(--border-radius);
        padding: 3rem;
        max-width: 600px;
        width: 90%;
        position: relative;
        text-align: center;
        box-shadow: var(--shadow-heavy);
    `;
    
    const closeButton = modal.querySelector('.video-modal-close');
    closeButton.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1.5rem;
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: var(--text-secondary);
        transition: var(--transition);
    `;
    
    const videoPreview = modal.querySelector('.video-preview');
    videoPreview.style.cssText = `
        margin: 2rem 0;
        padding: 2rem;
        background: var(--bg-secondary);
        border-radius: 15px;
    `;
    
    const previewIcon = modal.querySelector('.video-preview-icon');
    previewIcon.style.cssText = `
        font-size: 3rem;
        margin-bottom: 1rem;
        display: block;
    `;
    
    document.body.appendChild(modal);
    
    // Close modal events
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Add CSS for modal animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        .video-modal {
            animation: fadeIn 0.3s ease;
        }
        
        .video-modal-content {
            animation: slideInUp 0.4s ease;
        }
        
        @keyframes slideInUp {
            from { 
                opacity: 0;
                transform: translateY(50px);
            }
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .chart-bar-fill.animate {
            transition: height 2s ease, width 2s ease;
        }
        
        /* Mobile responsive adjustments for chart */
        @media (max-width: 768px) {
            .chart-bar-fill.animate {
                transition: width 2s ease;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== HEADER SCROLL EFFECT =====
function initializeHeaderScroll() {
    const header = document.querySelector('.site-header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.transform = currentScrollY > lastScrollY ? 'translateY(-100%)' : 'translateY(0)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// ===== EASTER EGG =====
function initializeEasterEgg() {
    let konamiCode = [];
    const correctCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        
        if (konamiCode.length > correctCode.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(correctCode)) {
            triggerSpecialAnimation();
            konamiCode = [];
        }
    });
    
    function triggerSpecialAnimation() {
        // Create rainbow effect on logo
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.style.animation = 'logoRainbow 2s ease infinite';
        }
        
        // Add rainbow animation CSS
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes logoRainbow {
                0% { filter: hue-rotate(0deg) saturate(1.5); }
                25% { filter: hue-rotate(90deg) saturate(1.5); }
                50% { filter: hue-rotate(180deg) saturate(1.5); }
                75% { filter: hue-rotate(270deg) saturate(1.5); }
                100% { filter: hue-rotate(360deg) saturate(1.5); }
            }
        `;
        document.head.appendChild(rainbowStyle);
        
        // Show special message
        showSpecialMessage("🌈 Namaste! You've unlocked the secret rainbow chakra! 🧘‍♀️✨");
        
        // Reset after animation
        setTimeout(() => {
            logo.style.animation = 'logoShimmer 4s ease-in-out infinite';
            document.head.removeChild(rainbowStyle);
        }, 4000);
    }
    
    function showSpecialMessage(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            font-weight: 600;
            z-index: 10001;
            box-shadow: var(--shadow-heavy);
            animation: bounceIn 0.5s ease;
        `;
        
        const bounceStyle = document.createElement('style');
        bounceStyle.textContent = `
            @keyframes bounceIn {
                0% { transform: translate(-50%, -50%) scale(0); }
                50% { transform: translate(-50%, -50%) scale(1.1); }
                100% { transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(bounceStyle);
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
                document.head.removeChild(bounceStyle);
            }, 500);
        }, 3000);
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src || img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Throttle scroll events
    let scrollTimeout;
    const originalScroll = window.onscroll;
    window.onscroll = function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            if (originalScroll) originalScroll();
        }, 16);
    };
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function enhanceAccessibility() {
    // Add focus indicators
    const focusableElements = document.querySelectorAll('button, a, input, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Announce dynamic content changes
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(announcer);
    
    window.announceChange = function(message) {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    };
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('BLOOMÉ Error:', e.error);
    // Could implement error reporting here
});

// ===== INITIALIZE ON LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeSmoothScrolling();
    initializeHeaderScroll();
    initializeEasterEgg();
    optimizePerformance();
    enhanceAccessibility();
    
    // Show welcome message for first-time visitors
    if (!localStorage.getItem('bloome-visited')) {
        setTimeout(() => {
            showSpecialMessage("🌸 Welcome to BLOOMÉ! Find your flow and bloom into your best self! 🌸");
            localStorage.setItem('bloome-visited', 'true');
        }, 2000);
    }
});

// ===== UTILITY FUNCTIONS =====
function showSpecialMessage(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        font-weight: 500;
        z-index: 10001;
        box-shadow: var(--shadow-heavy);
        animation: slideInRight 0.5s ease;
        max-width: 300px;
    `;
    
    const slideStyle = document.createElement('style');
    slideStyle.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(slideStyle);
    
    document.body.appendChild(notification);
    
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            document.head.removeChild(slideStyle);
        }, 500);
    }, 4000);
    
    // Click to dismiss
    notification.addEventListener('click', function() {
        this.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
            document.head.removeChild(slideStyle);
        }, 500);
    });
}

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        yogaPoses,
        inspirationalQuotes,
        generateRandomPose,
        showSpecialMessage
    };
}