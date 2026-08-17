// ================================
// Music player data
// ================================

const songs = [
    {
        id: 1,
        title: "Midnight Drive",
        artist: "Velvet Echo",
        audio: "assets/audio/song1.mp3",
        cover: "assets/images/song1.jpg"
    },
    {
        id: 2,
        title: "Golden Hour",
        artist: "Nova Lane",
        audio: "assets/audio/song2.mp3",
        cover: "assets/images/song2.jpg"
    },
    {
        id: 3,
        title: "Ocean Lights",
        artist: "The Coastline",
        audio: "assets/audio/song3.mp3",
        cover: "assets/images/song3.jpg"
    },
    {
        id: 4,
        title: "Afterglow",
        artist: "Luna Miles",
        audio: "assets/audio/song4.mp3",
        cover: "assets/images/song4.jpg"
    },
    {
        id: 5,
        title: "City Dreams",
        artist: "Neon Avenue",
        audio: "assets/audio/song5.mp3",
        cover: "assets/images/song5.jpg"
    },
    {
        id: 6,
        title: "Slow Motion",
        artist: "Aria Wells",
        audio: "assets/audio/song6.mp3",
        cover: "assets/images/song6.jpg"
    }
];


// ================================
// Get elements from the page
// ================================

const songList = document.getElementById("song-list");
const recentSongs = document.getElementById("recent-songs");

const currentTitle = document.getElementById("current-title");
const currentArtist = document.getElementById("current-artist");
const currentCover = document.getElementById("current-cover");


// ================================
// Player state
// ================================

let currentSongIndex = 0;
let recentlyPlayed = [];


// ================================
// Create song cards
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
        });

        songList.appendChild(songCard);
    });
}


// ================================
// Select a song
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
            style="width: 100%; height: 100%; object-fit: cover; border-radius: 7px;"
            onerror="this.style.display='none'"
        >
    `;

    addToRecentlyPlayed(index);
}


// ================================
// Recently played
// ================================

function addToRecentlyPlayed(index) {

    recentlyPlayed = recentlyPlayed.filter(
        songIndex => songIndex !== index
    );

    recentlyPlayed.unshift(index);

    recentlyPlayed = recentlyPlayed.slice(0, 4);

    renderRecentlyPlayed();
}


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
        });

        recentSongs.appendChild(songCard);
    });
}


// ================================
// Start the application
// ================================

renderSongs();

selectSong(0);