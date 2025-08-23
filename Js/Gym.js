
    document.addEventListener('DOMContentLoaded', () => {
      // --- Theme Toggle (consistent with other pages) ---
      const themeToggle = document.querySelector('.theme-toggle');
      const body = document.body;

      themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        themeToggle.textContent = body.classList.contains('dark-theme') ? '☀️' : '🌙';
      });

      // --- Hero Section Text Split Animation (consistent) ---
      const heroTitle = document.querySelector('.animate-text-split');
      if (heroTitle) {
        heroTitle.innerHTML = heroTitle.textContent
          .split('')
          .map((char, index) => `<span style="animation-delay: ${0.05 * index}s;">${char}</span>`)
          .join('');
      }

      // --- Floating Elements in Hero Section (consistent) ---
      const elementsContainer = document.querySelector('.floating-elements-container');
      const elementTypes = ['petal', 'leaf', 'bubble'];
      const numberOfElements = 25; // More elements for more fun!

      function createFloatingElement() {
        const type = elementTypes[Math.floor(Math.random() * elementTypes.length)];
        const element = document.createElement('div');
        element.classList.add(`floating-${type}`);
        const size = Math.random() * 15 + 10; // Size 10-25px
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        element.style.animationDuration = `${Math.random() * 5 + 5}s`;
        element.style.animationDelay = `${Math.random() * 3}s`;

        elementsContainer.appendChild(element);

        element.addEventListener('animationiteration', () => {
          element.style.left = `${Math.random() * 100}%`;
          element.style.top = `${Math.random() * 100}%`;
        });
      }

      for (let i = 0; i < numberOfElements; i++) {
        createFloatingElement();
      }

      // --- General Reveal on Scroll (for multiple sections) ---
      const revealElements = document.querySelectorAll('.reveal-on-scroll');

      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (entry.target.classList.contains('chart-wrapper')) {
              animateChartBars();
            }
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
      });

      revealElements.forEach(el => {
        revealObserver.observe(el);
      });

      // --- Video Thumbnail Click Handler (Placeholder for actual video) ---
      const videoThumbnails = document.querySelectorAll('.video-thumbnail');
      videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
          const videoId = thumbnail.dataset.videoId;
          alert(`Simulating playing video: ${videoId}\n(In a real scenario, this would open a modal with an embedded video.)`);
          // You could replace the alert with actual modal logic, e.g.:
          // const modal = document.createElement('div');
          // modal.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
          // document.body.appendChild(modal);
          // (add styling and close button for modal)
        });
      });

      // --- Breathing Guide Animation ---
      const breathCircle = document.querySelector('.breath-circle');
      const inhaleExhaleText = document.querySelector('.inhale-exhale');
      const startBreathingButton = document.querySelector('.start-breathing-button');
      const breathingAudio = document.getElementById('breathing-audio');
      let breathingInterval;
      let isBreathingActive = false;

      function startBreathingExercise() {
        if (isBreathingActive) return;

        isBreathingActive = true;
        startBreathingButton.textContent = 'Stop Breathing Exercise';
        breathingAudio.loop = true;
        breathingAudio.play();

        let phase = 'inhale';
        inhaleExhaleText.textContent = 'Inhale...';
        breathCircle.classList.add('breathing-in');

        breathingInterval = setInterval(() => {
          if (phase === 'inhale') {
            phase = 'exhale';
            inhaleExhaleText.textContent = 'Exhale...';
            breathCircle.classList.remove('breathing-in');
            breathCircle.classList.add('breathing-out');
          } else {
            phase = 'inhale';
            inhaleExhaleText.textContent = 'Inhale...';
            breathCircle.classList.remove('breathing-out');
            breathCircle.classList.add('breathing-in');
          }
        }, 4000); // 4 seconds for each phase
      }

      function stopBreathingExercise() {
        if (!isBreathingActive) return;

        isBreathingActive = false;
        clearInterval(breathingInterval);
        breathingAudio.pause();
        breathingAudio.currentTime = 0; // Reset audio
        startBreathingButton.textContent = 'Start Breathing Exercise';
        inhaleExhaleText.textContent = 'Press Start';
        breathCircle.classList.remove('breathing-in', 'breathing-out');
        breathCircle.style.transform = 'scale(1)'; // Reset to original size
      }

      startBreathingButton.addEventListener('click', () => {
        if (isBreathingActive) {
          stopBreathingExercise();
        } else {
          startBreathingExercise();
        }
      });


      // --- Workout Progress Chart Animation ---
      const chartBars = document.querySelectorAll('.chart-bar');

      function animateChartBars() {
        chartBars.forEach((bar, index) => {
          const value = parseInt(bar.dataset.value);
          const height = value; // Use value directly as percentage for height
          setTimeout(() => {
            bar.style.height = `${height}%`;
            bar.querySelector('.chart-bar-value').textContent = `${value}%`;
            bar.classList.add('animate'); // Trigger value opacity
          }, 200 * index + 500); // Staggered animation with slight delay
        });
      }

      // --- Pose of the Day Generator ---
      const poseImage = document.getElementById('pose-image');
      const poseName = document.getElementById('pose-name');
      const poseDescription = document.getElementById('pose-description');
      const generatePoseButton = document.querySelector('.generate-pose-button');

      const yogaPoses = [{
        name: "Mountain Pose (Tadasana)",
        description: "This foundational pose improves posture, strengthens thighs, knees, and ankles, and firms the abdomen and buttocks. It also helps to alleviate sciatica.",
        image: "https://images.unsplash.com/photo-1573030472493-272ce12d8a1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHw3fHx5b2dhJTIwcG9zZXxlbnwwfHx8fDE3MDIxMzkxNzd8MA&ixlib=rb-4.0.3&q=80&w=1080"
      }, {
        name: "Downward-Facing Dog (Adho Mukha Svanasana)",
        description: "Stretches the shoulders, hamstrings, calves, arches, and hands. Strengthens the arms and legs. Relieves stress and mild depression.",
        image: "https://images.unsplash.com/photo-1549576402-f3dc84e7235b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxNXx8eW9n pintorwcyUyMHN0cmV0Y2h8ZW5mDB8fHx8MTcwMjEzOTU4NHww&ixlib=rb-4.0.3&q=80&w=1080"
      }, {
        name: "Tree Pose (Vrksasana)",
        description: "Improves balance and stability in the legs and core. Strengthens ankles and tones the abdominal muscles. Helps to calm and center the mind.",
        image: "https://images.unsplash.com/photo-1552196563-549079dd21a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxMXx8eW9nYSUyMHRyZWUlMjBwb3NlfGVufDB8fHx8MTcwMjEzOTE3M3ww&ixlib=rb-4.0.3&q=80&w=1080"
      }, {
        name: "Warrior II (Virabhadrasana II)",
        description: "Strengthens and stretches the legs and ankles. Stretches the groins, chest, and lungs. Improves stamina and relieves backaches.",
        image: "https://images.unsplash.com/photo-1571439223396-e260848ce1ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHw0fHx5b2dhJTIwaW50ZXJtZWRpYXRlfGVufDB8fHx8MTcwMjEzOTE2N3ww&ixlib=rb-4.0.3&q=80&w=1080"
      }, {
        name: "Child's Pose (Balasana)",
        description: "Gently stretches the hips, thighs, and ankles. Relieves stress and fatigue. Calms the brain and helps to relieve back and neck pain when done with head and torso supported.",
        image: "https://images.unsplash.com/photo-1550478051-d4cf351172a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHw0fHx5b2dhJTIwY2hpbGRzJTIwcG9zZXxlbnwwfHx8fDE3MDIxMzkxODB8MA&ixlib=rb-4.0.3&q=80&w=1080"
      }, ];

      let currentPoseIndex = 0;

      function updatePoseOfTheDay() {
        const pose = yogaPoses[currentPoseIndex];
        poseImage.src = pose.image;
        poseImage.alt = pose.name;
        poseName.textContent = pose.name;
        poseDescription.textContent = pose.description;

        // Animate the pose card on update
        const poseCard = document.querySelector('.pose-card');
        poseCard.classList.remove('is-visible');
        setTimeout(() => {
            poseCard.classList.add('is-visible');
        }, 100);
      }

      generatePoseButton.addEventListener('click', () => {
        currentPoseIndex = (currentPoseIndex + 1) % yogaPoses.length;
        updatePoseOfTheDay();
      });

      // Initial load of pose of the day
      updatePoseOfTheDay();

    });