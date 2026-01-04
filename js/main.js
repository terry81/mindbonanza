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
            alert('Meditation session complete! 🧘‍♀️');
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

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
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
            quoteTextElement.textContent = `"${quote.text}"`;
            quoteAuthorElement.textContent = `— ${quote.author}`;
        }

        setInterval(rotateQuote, 10000); // Change quote every 10 seconds
    }

    // ResponsiveVoice - Text to Speech for Blog Posts
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');
    const stopButton = document.getElementById('stopButton');
    const postContent = document.getElementById('postContent');

    // Function to initialize ResponsiveVoice controls
    function initializeAudioControls() {
        if (!playButton || !postContent) {
            console.log('Audio controls not found on this page');
            return;
        }

        // Check if ResponsiveVoice is available
        if (typeof responsiveVoice === 'undefined') {
            console.warn('ResponsiveVoice not loaded yet, retrying...');
            // Retry after a short delay
            setTimeout(initializeAudioControls, 200);
            return;
        }

        console.log('ResponsiveVoice initialized successfully!');

        // Set up the ready callback
        if (responsiveVoice.OnVoiceReady) {
            responsiveVoice.OnVoiceReady = function() {
                console.log('ResponsiveVoice voices are ready');
            };
        }

        playButton.addEventListener('click', function() {
            console.log('Play button clicked');

            // Extract text content from the post, excluding scripts and styles
            const textContent = postContent.innerText || postContent.textContent;

            if (!textContent || textContent.trim().length === 0) {
                console.error('No content to read!');
                alert('No content to read!');
                return;
            }

            console.log('Starting to read article... Text length:', textContent.length);

            // Cancel any existing speech
            if (responsiveVoice.isPlaying()) {
                responsiveVoice.cancel();
            }

            // Start speaking
            responsiveVoice.speak(textContent, "US English Female", {
                pitch: 1,
                rate: 0.9,
                volume: 1,
                onstart: function() {
                    console.log('Audio started playing');
                    playButton.style.display = 'none';
                    pauseButton.style.display = 'inline-block';
                    stopButton.style.display = 'inline-block';
                },
                onend: function() {
                    console.log('Audio finished playing');
                    playButton.style.display = 'inline-block';
                    pauseButton.style.display = 'none';
                    stopButton.style.display = 'none';
                },
                onerror: function(error) {
                    console.error('Audio error:', error);
                    alert('Error playing audio: ' + error);
                    playButton.style.display = 'inline-block';
                    pauseButton.style.display = 'none';
                    stopButton.style.display = 'none';
                }
            });
        });

        pauseButton.addEventListener('click', function() {
            console.log('Pause button clicked');
            if (responsiveVoice.isPlaying()) {
                responsiveVoice.pause();
                pauseButton.innerHTML = '<span class="resume-icon">▶️</span> Resume';
                console.log('Audio paused');
            } else {
                responsiveVoice.resume();
                pauseButton.innerHTML = '<span class="pause-icon">⏸️</span> Pause';
                console.log('Audio resumed');
            }
        });

        stopButton.addEventListener('click', function() {
            console.log('Stop button clicked');
            responsiveVoice.cancel();
            playButton.style.display = 'inline-block';
            pauseButton.style.display = 'none';
            stopButton.style.display = 'none';
            pauseButton.innerHTML = '<span class="pause-icon">⏸️</span> Pause';
        });
    }

    // Initialize audio controls with a small delay to ensure ResponsiveVoice loads
    setTimeout(initializeAudioControls, 100);
});


