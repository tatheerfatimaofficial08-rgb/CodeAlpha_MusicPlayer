# Melodia - CodeAlpha Music Player

Melodia is a simple web-based music player interface developed as part of the CodeAlpha Frontend Development Internship.

The project is designed to provide a clean and modern music-player experience using basic frontend technologies: HTML, CSS, and JavaScript.

The application includes a music library, recently played section, playlists, music cards, audio controls, volume controls, progress tracking, search input, and a dark/light theme.

---

## Project Overview

Melodia is a browser-based music player where users can view available songs, select a song, and control music playback through an interactive player at the bottom of the page.

The project focuses on practicing:

- HTML page structure
- CSS styling and layout
- JavaScript DOM manipulation
- JavaScript event handling
- Audio element control
- Working with local image and audio assets
- Creating an interactive user interface

---

## Main Features

### 1. Home Page

The home page contains the main sections of the music player.

It includes:

- Welcome section
- Recently Played section
- Made for You section
- Music cards
- Navigation sidebar
- Bottom music player

---

### 2. Sidebar Navigation

The left sidebar contains the main navigation options:

- Home
- Search
- Your Library

It also contains a playlist section with:

- Liked Songs
- Recently Played

A plus button is also provided for the playlist area.

---

### 3. Search Bar

A search bar is available at the top of the application.

It contains:

- Search icon
- Text input
- Placeholder text

The search area is designed to allow users to look for music within the application.

---

### 4. Recently Played

The Recently Played section displays songs that have been recently selected or played.

Each song card contains:

- Song cover image
- Song title
- Artist name

---

### 5. Made for You

The Made for You section displays multiple music cards.

Each card contains:

- Cover image
- Song title
- Artist name

The music cards are generated and displayed using JavaScript.

---

## Music Player

The music player is fixed at the bottom of the page.

It contains information about the currently selected song and several playback controls.

### Current Song Information

The player displays:

- Song cover
- Song title
- Artist name
- Like button

If no song is selected, the player displays a default message.

---

## Playback Controls

The music player includes the following controls:

- Previous song
- Play/Pause
- Next song
- Shuffle
- Repeat

These controls are connected to the audio player through JavaScript.

---

## Progress Bar

The player includes a progress bar that allows the user to see the current position of the song.

It displays:

- Current playback time
- Progress slider
- Total song duration

The progress bar is connected to the HTML audio element.

---

## Volume Controls

The bottom player also contains volume controls.

Users can:

- Increase volume
- Decrease volume
- Mute/unmute the audio

The volume slider allows more precise volume control.

---

## Theme Toggle

Melodia includes a theme toggle button.

The interface supports:

- Dark theme
- Light theme

The theme is changed by adding or removing the `light-theme` class from the page using JavaScript.

---

## Like Button

A heart button is included in the music player.

It allows the interface to represent the liked state of the currently selected song.

---

## Music and Image Assets

The project uses local assets instead of external music and image URLs.

All assets are stored inside the `assets` folder.

The project contains separate folders for:

- Audio files
- Song cover images

---

## Technologies Used

### HTML5

HTML is used to create the structure of the application.

It is used for:

- Sidebar
- Navigation
- Search bar
- Music sections
- Music cards
- Player controls
- Audio element

---

### CSS3

CSS is used to design and style the application.

It is responsible for:

- Page layout
- Sidebar design
- Music cards
- Buttons
- Search bar
- Music player
- Dark theme
- Light theme
- Spacing
- Typography
- Colors
- Hover and visual effects

---

### JavaScript

JavaScript is used to make the application interactive.

It handles:

- Creating music cards
- Selecting songs
- Audio playback
- Play and pause
- Previous and next controls
- Volume control
- Mute control
- Progress bar
- Theme switching
- Like button
- Shuffle and repeat controls
- User interactions

---

## Project Structure

```text
CodeAlpha_MusicPlayer/
│
├── assets/
│   │
│   ├── audio/
│   │   ├── song1.mp3
│   │   ├── song2.mp3
│   │   ├── song3.mp3
│   │   ├── song4.mp3
│   │   ├── song5.mp3
│   │   └── song6.mp3
│   │
│   └── images/
│       ├── song1.png
│       ├── song2.png
│       ├── song3.png
│       ├── song4.png
│       ├── song5.png
│       └── song6.png
│
├── index.html
├── style.css
├── script.js
└── README.md