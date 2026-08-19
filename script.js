// ================================
// MUSIC PLAYER DATA
// ================================

const songs = [
    {
        id: 1,
        title: "Midnight Drive",
        artist: "Velvet Echo",
        audio: "assets/audio/song1.mp3",
        cover: "assets/images/song1.png"
    },
    {
        id: 2,
        title: "Golden Hour",
        artist: "Nova Lane",
        audio: "assets/audio/song2.mp3",
        cover: "assets/images/song2.png"
    },
    {
        id: 3,
        title: "Ocean Lights",
        artist: "The Coastline",
        audio: "assets/audio/song3.mp3",
        cover: "assets/images/song3.png"
    },
    {
        id: 4,
        title: "Afterglow",
        artist: "Luna Miles",
        audio: "assets/audio/song4.mp3",
        cover: "assets/images/song4.png"
    },
    {
        id: 5,
        title: "City Dreams",
        artist: "Neon Avenue",
        audio: "assets/audio/song5.mp3",
        cover: "assets/images/song5.png"
    },
    {
        id: 6,
        title: "Slow Motion",
        artist: "Aria Wells",
        audio: "assets/audio/song6.mp3",
        cover: "assets/images/song6.png"
    }
];


// ================================
// GET HTML ELEMENTS
// ================================

const songList = document.getElementById("song-list");
const recentSongs = document.getElementById("recent-songs");

const currentTitle = document.getElementById("current-title");
const currentArtist = document.getElementById("current-artist");
const currentCover = document.getElementById("current-cover");

const audioPlayer = document.getElementById("audio-player");

const playButton = document.getElementById("play-button");
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");

const volumeControl = document.getElementById("volume-control");
const muteButton = document.getElementById("mute-button");

const shuffleButton = document.getElementById("shuffle-button");
const repeatButton = document.getElementById("repeat-button");

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    if (document.body.classList.contains("light-theme")) {
        themeToggle.textContent = "☾";
    } else {
        themeToggle.textContent = "☼";
    }

});

const progressBar = document.getElementById("progress-bar");
const currentTimeDisplay = document.getElementById("current-time");
const totalTimeDisplay = document.getElementById("total-time");

const likeButton = document.getElementById("like-button");



// ================================
// PLAYER STATE
// ================================

let currentSongIndex = 0;
let recentlyPlayed = [];

let previousVolume = 1;

let isShuffleOn = false;
let isRepeatOn = false;


// ================================
// FORMAT TIME
// Example: 75 seconds → 1:15
// ================================

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = Math.floor(seconds % 60);

    return minutes + ":" + remainingSeconds.toString().padStart(2, "0");
}


// ================================
// CREATE ALL SONG CARDS
// ================================

function renderSongs() {

    songList.innerHTML = "";

    songs.forEach((song, index) => {

        const songCard = document.createElement("div");

        songCard.className = "song-card";

        songCard.innerHTML = `
            <img
                class="song-cover"
                src="${song.cover}"
                alt="${song.title} cover"
                onerror="this.style.display='none'"
            >

            <h3>${song.title}</h3>

            <p>${song.artist}</p>
        `;

        songCard.addEventListener("click", () => {

            selectSong(index);

            playCurrentSong();

        });

        songList.appendChild(songCard);
    });
}


// ================================
// SELECT SONG
// ================================

function selectSong(index) {

    currentSongIndex = index;

    const song = songs[currentSongIndex];

    currentTitle.textContent = song.title;

    currentArtist.textContent = song.artist;

    currentCover.innerHTML = `
        <img
            src="${song.cover}"
            alt="${song.title} cover"
            style="
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 7px;
            "
            onerror="this.style.display='none'"
        >
    `;

    addToRecentlyPlayed(index);

    loadSong(index);
}


// ================================
// LOAD SONG
// ================================

function loadSong(index) {

    const song = songs[index];

    audioPlayer.src = song.audio;

    audioPlayer.load();

    currentTitle.textContent = song.title;

    currentArtist.textContent = song.artist;

    progressBar.value = 0;

    currentTimeDisplay.textContent = "0:00";

    totalTimeDisplay.textContent = "0:00";

    playButton.textContent = "▶";
}


// ================================
// PLAY CURRENT SONG
// ================================

function playCurrentSong() {

    audioPlayer.play()
        .then(() => {

            playButton.textContent = "❚❚";

        })
        .catch((error) => {

            console.log("Audio could not play:", error);

        });
}


// ================================
// PLAY / PAUSE BUTTON
// ================================

playButton.addEventListener("click", () => {

    if (audioPlayer.paused) {

        playCurrentSong();

    } else {

        audioPlayer.pause();

        playButton.textContent = "▶";
    }
});


// ================================
// PREVIOUS BUTTON
// ================================

previousButton.addEventListener("click", () => {

    currentSongIndex--;

    if (currentSongIndex < 0) {

        currentSongIndex = songs.length - 1;
    }

    selectSong(currentSongIndex);

    playCurrentSong();
});


// ================================
// NEXT BUTTON
// ================================

nextButton.addEventListener("click", () => {

    playNextSong();
});


// ================================
// PLAY NEXT SONG FUNCTION
// ================================

function playNextSong() {

    if (isShuffleOn) {

        let randomIndex;

        do {

            randomIndex = Math.floor(
                Math.random() * songs.length
            );

        } while (
            randomIndex === currentSongIndex &&
            songs.length > 1
        );

        currentSongIndex = randomIndex;

    } else {

        currentSongIndex++;

        if (currentSongIndex >= songs.length) {

            currentSongIndex = 0;
        }
    }

    selectSong(currentSongIndex);

    playCurrentSong();
}


// ================================
// SONG ENDED
// ================================

audioPlayer.addEventListener("ended", () => {

    if (isRepeatOn) {

        audioPlayer.currentTime = 0;

        playCurrentSong();

    } else {

        playNextSong();
    }
});


// ================================
// WHEN SONG DURATION IS LOADED
// ================================

audioPlayer.addEventListener("loadedmetadata", () => {

    totalTimeDisplay.textContent =
        formatTime(audioPlayer.duration);

    progressBar.max = audioPlayer.duration;
});


// ================================
// UPDATE PROGRESS BAR
// THIS MAKES THE CIRCLE MOVE
// ================================

audioPlayer.addEventListener("timeupdate", () => {

    progressBar.value = audioPlayer.currentTime;

    currentTimeDisplay.textContent =
        formatTime(audioPlayer.currentTime);

    totalTimeDisplay.textContent =
        formatTime(audioPlayer.duration);
});


// ================================
// SEEK / MOVE THROUGH SONG
// ================================

progressBar.addEventListener("input", () => {

    audioPlayer.currentTime = progressBar.value;
});


// ================================
// VOLUME CONTROL
// ================================

volumeControl.addEventListener("input", () => {

    const volume = Number(volumeControl.value);

    audioPlayer.volume = volume;

    if (volume === 0) {

        muteButton.textContent = "🔇";

    } else {

        muteButton.textContent = "🔊";

        previousVolume = volume;
    }
});


// ================================
// MUTE / UNMUTE
// ================================

muteButton.addEventListener("click", () => {

    if (audioPlayer.volume > 0) {

        previousVolume = audioPlayer.volume;

        audioPlayer.volume = 0;

        volumeControl.value = 0;

        muteButton.textContent = "🔇";

    } else {

        audioPlayer.volume = previousVolume;

        volumeControl.value = previousVolume;

        muteButton.textContent = "🔊";
    }
});


// ================================
// SHUFFLE BUTTON
// ================================

shuffleButton.addEventListener("click", () => {

    isShuffleOn = !isShuffleOn;

    if (isShuffleOn) {

        shuffleButton.style.opacity = "1";

    } else {

        shuffleButton.style.opacity = "0.6";
    }
});


// ================================
// REPEAT BUTTON
// ================================

repeatButton.addEventListener("click", () => {

    isRepeatOn = !isRepeatOn;

    if (isRepeatOn) {

        repeatButton.style.opacity = "1";

    } else {

        repeatButton.style.opacity = "0.6";
    }
});


// ================================
// RECENTLY PLAYED
// ================================

function addToRecentlyPlayed(index) {

    recentlyPlayed = recentlyPlayed.filter(
        songIndex => songIndex !== index
    );

    recentlyPlayed.unshift(index);

    recentlyPlayed = recentlyPlayed.slice(0, 4);

    renderRecentlyPlayed();
}


// ================================
// DISPLAY RECENTLY PLAYED
// ================================

function renderRecentlyPlayed() {

    recentSongs.innerHTML = "";

    recentlyPlayed.forEach(index => {

        const song = songs[index];

        const songCard = document.createElement("div");

        songCard.className = "song-card";

        songCard.innerHTML = `
            <img
                class="song-cover"
                src="${song.cover}"
                alt="${song.title} cover"
                onerror="this.style.display='none'"
            >

            <h3>${song.title}</h3>

            <p>${song.artist}</p>
        `;

        songCard.addEventListener("click", () => {

            selectSong(index);

            playCurrentSong();

        });

        recentSongs.appendChild(songCard);
    });
}


// ================================
// LIKE BUTTON
// ================================

likeButton.addEventListener("click", () => {

    if (likeButton.textContent === "♡") {

        likeButton.textContent = "♥";

    } else {

        likeButton.textContent = "♡";
    }
});


// ================================
// AUDIO PLAYING EVENT
// ================================

audioPlayer.addEventListener("play", () => {

    playButton.textContent = "❚❚";
});


// ================================
// AUDIO PAUSED EVENT
// ================================

audioPlayer.addEventListener("pause", () => {

    playButton.textContent = "▶";
});


// ================================
// START APPLICATION
// ================================

renderSongs();

selectSong(0);