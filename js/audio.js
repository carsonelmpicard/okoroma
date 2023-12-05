class AudioPlayer {
    constructor(audioId, cardId) {
        this.audio = document.getElementById(audioId);
        this.card = document.getElementById(cardId);
        this.isPlaying = false;

        this.initPlayer();
    }

    initPlayer() {
        // Elements for time display
        this.currentTimeDisplay = document.createElement("span");
        this.currentTimeDisplay.className = "current-time";
        this.currentTimeDisplay.textContent = "00:00";

        this.totalDurationDisplay = document.createElement("span");
        this.totalDurationDisplay.className = "total-duration";
        this.totalDurationDisplay.textContent = "00:00";

        // SVG for play and pause buttons
        const playSVGPath = "M0,0 L0,12 L9,6 z"; // Triangle shape
        const pauseSVGPath = "M0,0 H3 V12 H0 z M6,0 H9 V12 H6 z"; // Two vertical rectangles

        // Create SVG element
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.setAttribute("viewBox", "0 0 12 12");
        this.svg.setAttribute("class", "play-pause-btn");
        this.path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.path.setAttribute("d", playSVGPath);
        this.svg.appendChild(this.path);

        // Play/Pause toggle
        this.svg.onclick = () => this.togglePlayPause();

        // Scrubber
        this.scrubber = document.createElement("input");
        this.scrubber.type = "range";
        this.scrubber.className = "scrubber";
        this.scrubber.min = 0;
        this.scrubber.max = 100;
        this.scrubber.value = 0;
        this.scrubber.oninput = (e) => this.scrub(e.target.value);

        // Append elements to the card
        this.card.appendChild(this.svg);
        this.card.appendChild(this.currentTimeDisplay);
        this.card.appendChild(this.scrubber);
        this.card.appendChild(this.totalDurationDisplay);

        // Load audio metadata to get duration
        this.audio.onloadedmetadata = () => {
            this.totalDurationDisplay.textContent = this.formatTime(this.audio.duration);
        };

        this.audio.ontimeupdate = () => this.updateScrubber();
    }

    togglePlayPause() {
        const playSVGPath = "M0,0 L0,12 L9,6 z"; // Triangle shape
        const pauseSVGPath = "M0,0 H3 V12 H0 z M6,0 H9 V12 H6 z"; // Two vertical rectangles

        if (this.isPlaying) {
            this.audio.pause();
            this.path.setAttribute("d", playSVGPath);
        } else {
            this.audio.play();
            this.path.setAttribute("d", pauseSVGPath);
        }
        this.isPlaying = !this.isPlaying;
    }

    updateScrubber() {
        const percent = (this.audio.currentTime / this.audio.duration) * 100;
        this.scrubber.value = percent;
        this.currentTimeDisplay.textContent = this.formatTime(this.audio.currentTime);
    }

    scrub(value) {
        const scrubTime = (value / 100) * this.audio.duration;
        this.audio.currentTime = scrubTime;
    }

    formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

new AudioPlayer("voa-1", "voa-1-card");
