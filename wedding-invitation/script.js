/**
 * LUXURY WEDDING INVITATION SCRIPT - FINAL FIX UPGRADE
 * Functionality: Cinematic Intro, Countdown, Music Player, Scroll Reveal
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. OPENING CINEMATIC ANIMATION
    const openingOverlay = document.getElementById('opening-overlay');
    const unveilBtn = document.getElementById('unveil-btn');
    const mainContent = document.getElementById('main-content');
    const heroSection = document.getElementById('hero');

    unveilBtn.addEventListener('click', () => {
        // Fade out overlay
        openingOverlay.classList.add('fade-out');
        
        // Show main content
        mainContent.classList.remove('hidden');
        
        // Trigger initial hero animation
        setTimeout(() => {
            heroSection.classList.add('active');
            // Hide overlay completely to prevent interaction issues
            setTimeout(() => {
                openingOverlay.style.display = 'none';
            }, 1500);
        }, 100);

        // Start music
        playMusic();
    });

    // 2. MUSIC PLAYER LOGIC
    const music = document.getElementById('bg-music');
    const cdToggle = document.getElementById('cd-toggle');
    const cdIcon = document.getElementById('cd-icon');
    let isPlaying = false;

    // Use relative path for Audio object if needed, but here we use <source>
    // Just in case, let's ensure the source is correct
    const audioSource = music.querySelector('source');
    if (audioSource && !audioSource.src.startsWith('http')) {
        audioSource.src = './music/song.mp3';
        music.load();
    }

    function playMusic() {
        music.play().then(() => {
            isPlaying = true;
            cdIcon.classList.add('cd-rotate');
        }).catch(err => {
            console.warn("Autoplay blocked or audio path error:", err);
            isPlaying = false;
            cdIcon.classList.remove('cd-rotate');
        });
    }

    function pauseMusic() {
        music.pause();
        isPlaying = false;
        cdIcon.classList.remove('cd-rotate');
    }

    cdToggle.addEventListener('click', () => {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });

    // 3. COUNTDOWN TIMER LOGIC
    // Set target date: October 24, 2026 16:00:00
    const weddingDate = new Date('October 24, 2026 16:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (distance < 0) {
            if (daysEl) {
                const grid = document.querySelector('.timer-grid');
                if (grid) grid.innerHTML = "<h3 style='font-family: Playfair Display; font-style: italic; font-size: 2rem;'>Our Journey Has Begun!</h3>";
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysEl) daysEl.innerText = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.innerText = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.innerText = seconds.toString().padStart(2, '0');
    };

    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // 4. SCROLL REVEAL ANIMATIONS
    const revealElements = document.querySelectorAll('.section-reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 5. PARALLAX & EXTRA POLISH
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Hero background parallax
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg && scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }

        // Venue image parallax
        const venueImg = document.querySelector('.venue-img');
        if (venueImg) {
            const rect = venueImg.parentElement.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const shift = (window.innerHeight - rect.top) * 0.1;
                venueImg.style.transform = `scale(1.1) translateY(${shift - 50}px)`;
            }
        }
    });

});
