// Módulo para el reproductor de música
const musicPlayer = (() => {
  // Selectores de elementos del DOM
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

  // Estado del reproductor
  let musicIndex = 0;
  let isPlaying = false;
  const music = new Audio();
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

  // Función para cargar una canción
  const loadSong = (song) => {
    music.src = song.path;
    elements.title.textContent = song.displayName;
    elements.artist.textContent = song.artist;
    elements.image.src = song.cover;
    elements.background.src = song.cover;
  };

  // Función para reproducir una canción
  const playSong = () => {
    isPlaying = true;
    elements.playBtn.classList.replace("fa-play", "fa-pause");
    elements.playBtn.setAttribute("title", "Pause");
    music.play();
  };

  // Función para pausar una canción
  const pauseSong = () => {
    isPlaying = false;
    elements.playBtn.classList.replace("fa-pause", "fa-play");
    elements.playBtn.setAttribute("title", "Play");
    music.pause();
  };

  // Función para cambiar de canción
  const changeSong = (direction) => {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadSong(songs[musicIndex]);
    playSong();
  };

  // Función para actualizar la barra de progreso
  const updateProgressBar = () => {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    elements.progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
    elements.durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    elements.currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
  };

  // Función para establecer la barra de progreso al hacer clic
  const setProgressBar = (e) => {
    const width = elements.playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
  };

  // Función para alternar entre reproducir y pausar
  const togglePlay = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  };

  // Inicialización del reproductor de música
  const init = () => {
    loadSong(songs[musicIndex]);
    elements.playBtn.addEventListener("click", togglePlay);
    elements.prevBtn.addEventListener("click", () => changeSong(-1));
    elements.nextBtn.addEventListener("click", () => changeSong(1));
    music.addEventListener("ended", () => changeSong(1));
    music.addEventListener("timeupdate", updateProgressBar);
    elements.playerProgress.addEventListener("click", setProgressBar);
  };

  // Retorno de métodos públicos
  return {
    init,
  };
})();

// Inicialización del reproductor de música
musicPlayer.init();
