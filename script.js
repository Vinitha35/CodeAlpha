const songs = [
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    src: "Perfect .mp3",
    cover: "musicpic.jpg"
  },
  {
    title: "A Thousand Years",
    artist: "Christina Perri",
    src: "A Thousand Years.mp3",
    cover: "musicpic.jpg"
  },
   {
    title: "I Wanna Be Yours", 
    artist: "Arctic Monkeys",
    src: "I Wanna Be Yours.mp3",
    cover: "musicpic.jpg"
  }
];

let index = 0;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playlist = document.getElementById("playlist");

function loadSong(i){
  index = i;
  audio.src = songs[i].src;
  title.textContent = songs[i].title;
  artist.textContent = songs[i].artist;
  cover.src = songs[i].cover;
  highlightActive();
}

function playSong(){
  audio.play();
  playBtn.textContent = "⏸";
}
function pauseSong(){
  audio.pause();
  playBtn.textContent = "▶";
}
playBtn.addEventListener("click",()=> audio.paused ? playSong() : pauseSong());

prevBtn.addEventListener("click",()=>{ index=(index-1+songs.length)%songs.length; loadSong(index); playSong(); });
nextBtn.addEventListener("click",()=>{ index=(index+1)%songs.length; loadSong(index); playSong(); });

audio.addEventListener("timeupdate",()=>{
  progressBar.value = audio.currentTime;
  currentTimeEl.textContent = format(audio.currentTime);
});
audio.addEventListener("loadedmetadata",()=>{
  progressBar.max = audio.duration;
  durationEl.textContent = format(audio.duration);
});
progressBar.addEventListener("input",()=>audio.currentTime = progressBar.value);

audio.addEventListener("ended",()=>nextBtn.click());

function format(sec){
  let m = Math.floor(sec/60);
  let s = Math.floor(sec%60).toString().padStart(2,"0");
  return `${m}:${s}`;
}

function buildPlaylist(){
  songs.forEach((s,i)=>{
    let div = document.createElement("div");
    div.className="song";
    div.textContent = `${s.title} — ${s.artist}`;
    div.onclick=()=>{ loadSong(i); playSong(); };
    playlist.appendChild(div);
  });
}
function highlightActive(){
  document.querySelectorAll(".song").forEach(e=>e.classList.remove("active"));
  playlist.children[index].classList.add("active");
}

buildPlaylist();
loadSong(0);
