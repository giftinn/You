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

const targetDate = new Date("2025-10-09T00:00:00").getTime(); 

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

const letterContent = `
I don’t even know where to start this, but please let me tell you how much I miss you.

We should have been six months by now, right? It hurts knowing we can’t celebrate that together anymore. All I can do is hold onto the memories we made.

Thank you for once being the best part of my days. Honestly, I can’t hold it in anymore — I miss you so much. Every day feels so quiet. There are no notifications from you anymore, even though they used to be the thing I looked forward to the most.

I know we probably can’t be together again. I understand that. But please let me express how much I miss you through this. Maybe you don’t like it, and maybe it makes things complicated… but at least I hope you can accept this small, simple gift from me.
thank you for opened this gift, i still love you. 
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
