// Select DOM elements
const elements = {
  image: document.getElementById("cover"),
  title: document.getElementById("music-title"),
  artist: document.getElementById("music-artist"),
  currentTimeEl: document.getElementById("current-time"),
  durationEl: document.getElementById("duration"),
  progress: document.getElementById("progress"),
  playerProgress: document.getElementById("player-progress"),
  prevBtn: document.getElementById("prev"),
  nextBtn: document.getElementById("next"),
  playBtn: document.getElementById("play"),
  background: document.getElementById("bg-img"),
};

// Create an Audio instance
const music = new Audio();

// Define an array of songs
const songs = [
  {
    path: "assets/1.mp3",
    displayName: "RITMO DE MEDALLO",
    cover: "assets/1.png",
    artist: "Feid Ft Ryan Castro",
  },
  {
    path: "assets/2.mp3",
    displayName: "Le pido a Dios",
    cover: "assets/2.png",
    artist: "Feid",
  },
  {
    path: "assets/3.mp3",
    displayName: "Normal",
    cover: "assets/3.png",
    artist: "Feid",
  },
];

// Initialize variables
let musicIndex = 0;
let isPlaying = false;

// Function to toggle play/pause
function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

// Function to play music
function playMusic() {
  isPlaying = true;
  elements.playBtn.classList.replace("fa-play", "fa-pause");
  elements.playBtn.setAttribute("title", "Pause");
  music.play();
}

// Function to pause music
function pauseMusic() {
  isPlaying = false;
  elements.playBtn.classList.replace("fa-pause", "fa-play");
  elements.playBtn.setAttribute("title", "Play");
  music.pause();
}

// Function to load music
function loadMusic(song) {
  music.src = song.path;
  elements.title.textContent = song.displayName;
  elements.artist.textContent = song.artist;
  elements.image.src = song.cover;
  elements.background.src = song.cover;
}

// Function to change music
function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
}

// Function to update progress bar
function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  elements.progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  elements.durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`;
  elements.currentTimeEl.textContent = `${formatTime(
    currentTime / 60
  )}:${formatTime(currentTime % 60)}`;
}

// Function to set progress bar on click
function setProgressBar(e) {
  const width = elements.playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

// Event listeners
elements.playBtn.addEventListener("click", togglePlay);
elements.prevBtn.addEventListener("click", () => changeMusic(-1));
elements.nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
elements.playerProgress.addEventListener("click", setProgressBar);

// Initial load of the first song
loadMusic(songs[musicIndex]);
