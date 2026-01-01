// Stopwatch variables
let startTime;
let difference = 0;
let tInterval;
let running = false;
let lapCounter = 0;
let lapTimes = [];
let soundEnabled = true;
let lastMilestone = 0;

// DOM Elements
const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const lapBtn = document.getElementById('lapBtn');
const statusText = document.getElementById('statusText');
const lapList = document.getElementById('lapList');
const lapContainer = document.getElementById('lapContainer');
const soundToggle = document.getElementById('soundToggle');
const themeToggle = document.getElementById('themeToggle');
const fullscreenToggle = document.getElementById('fullscreenToggle');

// Create background particles
function createParticles() {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
        document.body.appendChild(particle);
    }
}

// Sound effects using Web Audio API
function createBeep(frequency, duration, volume = 0.1) {
    if (!soundEnabled) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// Format time function
function getFormattedTime(timeMs) {
    const ms = Math.floor((timeMs % 1000) / 10);
    const seconds = Math.floor((timeMs / 1000) % 60);
    const minutes = Math.floor((timeMs / (1000 * 60)) % 60);
    const hours = Math.floor((timeMs / (1000 * 60 * 60)) % 24);

    if (hours > 0) {
        return (
            (hours < 10 ? "0" + hours : hours) + ":" +
            (minutes < 10 ? "0" + minutes : minutes) + ":" +
            (seconds < 10 ? "0" + seconds : seconds) + "." +
            (ms < 10 ? "0" + ms : ms)
        );
    }

    return (
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + "." +
        (ms < 10 ? "0" + ms : ms)
    );
}

// Check for milestones
function checkMilestones(timeMs) {
    const minutes = Math.floor(timeMs / (1000 * 60));
    const milestones = [1, 5, 10, 15, 30, 60];

    for (const milestone of milestones) {
        if (minutes >= milestone && milestone > lastMilestone) {
            lastMilestone = milestone;
            showMilestonePopup(milestone);
            createBeep(800, 0.2, 0.15);
            break;
        }
    }
}

// Show milestone popup
function showMilestonePopup(minutes) {
    const popup = document.createElement('div');
    popup.className = 'milestone-popup';
    popup.textContent = `🎉 ${minutes} minute${minutes > 1 ? 's' : ''} reached!`;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 3000);
}

// Update display
function updateTime() {
    const now = new Date().getTime();
    difference = now - startTime;
    display.textContent = getFormattedTime(difference);
    checkMilestones(difference);
}

// Analyze lap times
function analyzeLapTimes() {
    if (lapTimes.length < 2) return;

    const times = lapTimes.map(lap => lap.time);
    const fastest = Math.min(...times);
    const slowest = Math.max(...times);

    lapList.querySelectorAll('li').forEach((li, index) => {
        li.classList.remove('fastest', 'slowest');
        // Correctly reference lapTime based on prepended order (most recent at top)
        const lapTime = lapTimes[lapTimes.length - 1 - index].time; 
        if (lapTime === fastest) li.classList.add('fastest');
        if (lapTime === slowest) li.classList.add('slowest');
    });
}

// Start/Stop functionality
startPauseBtn.addEventListener('click', () => {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 10);
        running = true;

        startPauseBtn.innerHTML = 'STOP';
        startPauseBtn.style.fontSize = '1.2em';
        startPauseBtn.style.fontWeight = 'bold';
        startPauseBtn.classList.add('pause');
        statusText.textContent = 'Running...';

        display.classList.add('running');
        document.querySelector('.status-container').classList.add('running');

        lapBtn.style.display = 'flex'; // Show lap button when running
        lapBtn.disabled = false;

        createBeep(600, 0.1);
    } else {
        // Reset functionality combined with stop
        clearInterval(tInterval);
        running = false;
        difference = 0;
        lapCounter = 0;
        lapTimes = [];
        lastMilestone = 0;

        display.textContent = "00:00.00";
        display.classList.remove('running', 'paused');
        document.querySelector('.status-container').classList.remove('running', 'paused');

        lapList.innerHTML = "";
        lapContainer.classList.remove('visible'); // Hide lap container when reset

        startPauseBtn.innerHTML = 'START';
        startPauseBtn.style.fontSize = '1.2em';
        startPauseBtn.style.fontWeight = 'bold';
        startPauseBtn.classList.remove('pause');
        statusText.textContent = 'Ready to start';

        lapBtn.style.display = 'none'; // Hide lap button when stopped/reset
        lapBtn.disabled = true;

        createBeep(300, 0.15);
    }
});

// Lap functionality
lapBtn.addEventListener('click', () => {
    if (running) {
        lapCounter++;
        const lapTime = difference;
        const lapTimeFormatted = getFormattedTime(lapTime);

        // Calculate split time
        // The split time is the difference between the current lap time and the previous total time.
        const previousTotalTime = lapTimes.length > 0 ? lapTimes[lapTimes.length - 1].time : 0;
        const splitTime = lapTime - previousTotalTime;
        const splitFormatted = getFormattedTime(splitTime);

        lapTimes.push({ time: lapTime, split: splitTime });

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="lap-number">Lap ${lapCounter}</span>
            <div>
                <span class="lap-time">${lapTimeFormatted}</span>
                <span class="lap-delta">(+${splitFormatted})</span>
            </div>
        `;
        lapList.prepend(listItem); // Add new lap to the top of the list
        lapContainer.classList.add('visible'); // Make lap container visible

        analyzeLapTimes();
        createBeep(500, 0.1);
    }
});

// Sound toggle
soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggle.innerHTML = soundEnabled ? 'volume_up' : 'volume_off';
    createBeep(400, 0.1);
});

// Theme toggle
themeToggle.addEventListener('click', () => {
    const currentBackground = document.body.style.background;
    if (currentBackground.includes('rgb(26, 26, 26)') || currentBackground === '') { // Default dark theme
        document.body.style.background = 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)'; // Blue theme
    } else {
        document.body.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'; // Back to default dark
    }
    createBeep(450, 0.1);
});

// Fullscreen toggle
fullscreenToggle.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fullscreenToggle.innerHTML = 'fullscreen_exit';
    } else {
        document.exitFullscreen();
        fullscreenToggle.innerHTML = 'fullscreen';
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'Space':
            e.preventDefault();
            startPauseBtn.click();
            break;
        case 'KeyL':
            e.preventDefault();
            if (!lapBtn.disabled) lapBtn.click();
            break;
        case 'KeyS':
            e.preventDefault();
            soundToggle.click();
            break;
    }
});

// Initialize
createParticles();
lapBtn.style.display = 'none'; // Ensure lap button is hidden on load
lapBtn.disabled = true;

// Add tooltips for keyboard shortcuts
startPauseBtn.title = 'Start/Stop (Space)';
lapBtn.title = 'Record Lap (L)';
soundToggle.title = 'Toggle Sound (S)';