// Dark Mode Theme Toggle
function initThemeToggle() {
    const themeToggles = document.querySelectorAll('.theme-toggle');

    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply saved theme or system preference
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Toggle theme on button click
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Announce theme change for screen readers
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = `Theme changed to ${newTheme} mode`;
            document.body.appendChild(announcement);
            setTimeout(() => announcement.remove(), 1000);
        });
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
}

// Initialize theme toggle as early as possible
initThemeToggle();

// Meditation Timer
let timerInterval;
let timeLeft = 300; // 5 minutes in seconds
let isPaused = false;

function setTimer(minutes) {
    timeLeft = minutes * 60;
    updateTimerDisplay();
    pauseTimer();
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

function startTimer() {
    if (timerInterval) return; // Already running

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            pauseTimer();
            playCompletionSound();
            showNotification('Meditation Complete', 'Your meditation session is complete. 🧘‍♀️');
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    pauseTimer();
    timeLeft = 300;
    updateTimerDisplay();
}

// Play a gentle completion sound
function playCompletionSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 528; // Healing frequency
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 2);
    } catch (e) {
        console.log('Audio not supported');
    }
}

// Show browser notification if permitted
function showNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body, icon: '/assets/logo.png' });
    } else {
        alert(body);
    }
}

// Request notification permission
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Request notification permission when timer section is visible
    const meditationSection = document.getElementById('meditation');
    if (meditationSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                requestNotificationPermission();
                observer.disconnect();
            }
        });
        observer.observe(meditationSection);
    }

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        // Create overlay element
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);

        function toggleMobileMenu() {
            const isOpen = navLinks.classList.contains('active');
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            overlay.classList.toggle('active');
            mobileMenuToggle.setAttribute('aria-expanded', !isOpen);
            document.body.style.overflow = isOpen ? '' : 'hidden';
        }

        function closeMobileMenu() {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            overlay.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        overlay.addEventListener('click', closeMobileMenu);

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    // Smooth scroll for anchor links
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

    // Rotating quotes
    const quoteTextElement = document.querySelector('.quote-text');
    const quoteAuthorElement = document.querySelector('.quote-author');

    if (quoteTextElement && quoteAuthorElement) {
        const quotes = [
            { text: "The present moment is the only time over which we have dominion.", author: "Thích Nhất Hạnh" },
            { text: "Mindfulness isn't difficult, we just need to remember to do it.", author: "Sharon Salzberg" },
            { text: "The best way to capture moments is to pay attention. This is how we cultivate mindfulness.", author: "Jon Kabat-Zinn" },
            { text: "In today's rush, we all think too much, seek too much, want too much and forget about the joy of just being.", author: "Eckhart Tolle" },
            { text: "Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.", author: "Oprah Winfrey" }
        ];

        let currentQuoteIndex = 0;

        function rotateQuote() {
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            const quote = quotes[currentQuoteIndex];

            // Fade out
            quoteTextElement.style.opacity = '0';
            quoteAuthorElement.style.opacity = '0';

            setTimeout(() => {
                quoteTextElement.textContent = `"${quote.text}"`;
                quoteAuthorElement.textContent = `— ${quote.author}`;
                // Fade in
                quoteTextElement.style.opacity = '1';
                quoteAuthorElement.style.opacity = '1';
            }, 300);
        }

        // Add transition for fade effect
        quoteTextElement.style.transition = 'opacity 0.3s ease';
        quoteAuthorElement.style.transition = 'opacity 0.3s ease';

        setInterval(rotateQuote, 10000); // Change quote every 10 seconds
    }

    // Scroll to top button
    createScrollToTopButton();

    // Reading progress indicator for blog posts
    createReadingProgressIndicator();

    // Lazy load images with IntersectionObserver
    setupLazyLoading();
});

// Scroll to top button
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18,15 12,9 6,15"></polyline>
        </svg>
    `;
    document.body.appendChild(scrollBtn);

    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(107, 70, 193, 0.4);
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 997;
        }

        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .scroll-to-top:hover {
            background: var(--secondary-color);
            transform: translateY(-3px);
        }

        @media (max-width: 768px) {
            .scroll-to-top {
                bottom: 85px;
                right: 20px;
                width: 44px;
                height: 44px;
            }
        }
    `;
    document.head.appendChild(style);

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }, { passive: true });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Reading progress indicator for blog posts
function createReadingProgressIndicator() {
    const postContent = document.querySelector('.post-content');
    if (!postContent) return;

    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);

    const style = document.createElement('style');
    style.textContent = `
        .reading-progress {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: var(--gradient-1);
            width: 0%;
            z-index: 1001;
            transition: width 0.1s ease-out;
        }
    `;
    document.head.appendChild(style);

    window.addEventListener('scroll', () => {
        const postRect = postContent.getBoundingClientRect();
        const postTop = window.scrollY + postRect.top;
        const postHeight = postContent.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        // Calculate progress
        const scrollDistance = scrollY - postTop + windowHeight;
        const totalDistance = postHeight + windowHeight;
        const progress = Math.min(Math.max((scrollDistance / totalDistance) * 100, 0), 100);

        progressBar.style.width = `${progress}%`;
    }, { passive: true });
}

// Enhanced lazy loading for images
function setupLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        return;
    }

    // Fallback for older browsers
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Search functionality
let searchIndex = null;

async function loadSearchIndex() {
    if (searchIndex) return searchIndex;

    try {
        const response = await fetch('/search-index.json');
        searchIndex = await response.json();
        return searchIndex;
    } catch (error) {
        console.error('Failed to load search index:', error);
        return [];
    }
}

function initSearch() {
    const searchToggles = document.querySelectorAll('.search-toggle');
    const searchModal = document.getElementById('search-modal');
    const searchClose = document.querySelector('.search-close');
    const searchOverlay = document.querySelector('.search-modal-overlay');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (!searchToggles.length || !searchModal) return;

    function openSearch() {
        searchModal.classList.add('active');
        searchModal.setAttribute('aria-hidden', 'false');
        searchToggles.forEach(btn => btn.setAttribute('aria-expanded', 'true'));
        document.body.style.overflow = 'hidden';
        setTimeout(() => searchInput.focus(), 100);
        loadSearchIndex(); // Preload index
    }

    function closeSearch() {
        searchModal.classList.remove('active');
        searchModal.setAttribute('aria-hidden', 'true');
        searchToggles.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
        document.body.style.overflow = '';
        searchInput.value = '';
        searchResults.innerHTML = '<p class="search-hint">Start typing to search...</p>';
    }

    searchToggles.forEach(btn => btn.addEventListener('click', openSearch));
    searchClose.addEventListener('click', closeSearch);
    searchOverlay.addEventListener('click', closeSearch);

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            closeSearch();
        }
        // Ctrl/Cmd + K to open search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (searchModal.classList.contains('active')) {
                closeSearch();
            } else {
                openSearch();
            }
        }
    });

    // Debounce search input
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => performSearch(e.target.value), 150);
    });
}

async function performSearch(query) {
    const searchResults = document.getElementById('search-results');

    if (!query || query.trim().length < 2) {
        searchResults.innerHTML = '<p class="search-hint">Start typing to search...</p>';
        return;
    }

    const index = await loadSearchIndex();
    const searchTerm = query.toLowerCase().trim();

    const results = index.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(searchTerm);
        const excerptMatch = item.excerpt.toLowerCase().includes(searchTerm);
        const categoryMatch = item.category && item.category.toLowerCase().includes(searchTerm);
        const tagsMatch = item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        return titleMatch || excerptMatch || categoryMatch || tagsMatch;
    });

    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-no-results">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <p>No articles found for "<strong>${escapeHtml(query)}</strong>"</p>
                <p style="font-size: 0.875rem; margin-top: 0.5rem;">Try different keywords or browse our <a href="/blog/" style="color: var(--primary-color);">blog</a></p>
            </div>
        `;
        return;
    }

    const resultsHTML = results.slice(0, 10).map(item => `
        <a href="${item.url}" class="search-result-item">
            <h4>${highlightMatch(item.title, searchTerm)}</h4>
            <p>${highlightMatch(item.excerpt.substring(0, 150) + '...', searchTerm)}</p>
            <div class="search-result-meta">
                ${item.category ? `<span class="search-result-category">${item.category}</span>` : ''}
                <span>${item.date}</span>
            </div>
        </a>
    `).join('');

    searchResults.innerHTML = resultsHTML;
}

function highlightMatch(text, term) {
    if (!term) return escapeHtml(text);
    const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
    return escapeHtml(text).replace(regex, '<mark style="background: rgba(107, 70, 193, 0.2); padding: 0 2px; border-radius: 2px;">$1</mark>');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Initialize search when DOM is ready
document.addEventListener('DOMContentLoaded', initSearch);


