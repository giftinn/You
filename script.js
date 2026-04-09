let pin="";
const correctPin="1234"; // ganti nanti

function addNumber(num){
  if(pin.length<4){
    pin+=num;
    updateDisplay();
  }
}

function deleteNumber(){
  pin=pin.slice(0,-1);
  updateDisplay();
}

function updateDisplay(){
  let display = pin.split("").map(()=> "•").join(" ");
  document.getElementById("pinDisplay").innerText =
    display + " _".repeat(4-pin.length);
}

function checkPin(){
  const status=document.getElementById("statusText");
  const page=document.getElementById("page1");

  if(pin===correctPin){
    status.innerText="Correct";
    status.style.color="#b76e79";
    setTimeout(()=>{
      goToPage("page2");
    },1000);

  }else{
    status.innerText="Salah";
    status.style.color="#c94c4c";
    page.classList.add("shake");
    setTimeout(()=>{
      page.classList.remove("shake");
    },300);
    pin="";
    updateDisplay();
  }
}

function goToPage(id){
  document.querySelectorAll(".page").forEach(p=>{
    p.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

const targetDate = new Date("2023-05-20T00:00:00").getTime(); 

function updateCountdown(){
  const now = new Date().getTime();
  const distance = now - targetDate; 

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
}

setInterval(updateCountdown,1000);
updateCountdown();

function createHeart(){
  const heart=document.createElement("div");
  heart.classList.add("heart");

  heart.innerHTML="❤";

  heart.style.left=Math.random()*100+"vw";
  heart.style.fontSize=(Math.random()*15+15)+"px";
  heart.style.animationDuration=(Math.random()*4+4)+"s";

  // random pink shade
  const colors=["#ff6f91","#ff8fab","#ffb3c6","#ffc2d1","#ff5c8a"];
  heart.style.color=colors[Math.floor(Math.random()*colors.length)];

  document.body.appendChild(heart);

  setTimeout(()=>{
    heart.remove();
  },8000);
}

/* Lebih rame */
setInterval(createHeart,150);

const letterContent = `
Aku tidak pernah menyesali hari itu.

Semua tawa, semua cerita, semua hal kecil yang mungkin sekarang hanya jadi kenangan.

Dan meskipun waktu berjalan, ada bagian dari diriku yang tetap diam di sana.

Mengingatmu, bukan dengan luka,
tapi dengan rasa yang lebih tenang.
`;

function formatLetter(text){
  return text
    .trim()
    .split("\n\n")
    .map(p => `<p>${p}</p>`)
    .join("");
}

document.getElementById("letterText").innerHTML = formatLetter(letterContent);

let currentAudio = null;
let currentItem = null;

document.querySelectorAll(".music-item").forEach(item => {
  const audioSrc = item.getAttribute("data-audio");
  const audio = new Audio(audioSrc);
  const progressBar = item.querySelector(".progress-bar");
  const durationText = item.querySelector(".duration");

  // Detect duration
  audio.addEventListener("loadedmetadata", () => {
    const minutes = Math.floor(audio.duration / 60);
    const seconds = Math.floor(audio.duration % 60).toString().padStart(2,"0");
    durationText.innerText = `${minutes}:${seconds}`;
  });

  // Update progress
  audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percent + "%";
  });

  item.addEventListener("click", () => {

    // Stop current playing
    if(currentAudio && currentAudio !== audio){
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentItem.querySelector(".progress-bar").style.width = "0%";
    }

    if(audio.paused){
      audio.play();
      currentAudio = audio;
      currentItem = item;
    } else {
      audio.pause();
    }
  });
});