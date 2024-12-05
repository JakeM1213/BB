const scrollContainer = document.getElementById("scrollContainer");
const content = document.getElementById("content");
const titleContainer = document.querySelector('.title-container');

// Web Audio API setup for honk and siren sounds
let honkAudio = new Audio("./Audio/honk.mp3");
let sirenAudio = new Audio("./Audio/siren.mp3");
honkAudio.load();
sirenAudio.load();

let isPlaying = false;
let sirenTriggered = false;

// Play sounds on user interaction
document.body.addEventListener('click', () => {
  playSounds();
});

function playSounds() {
  if (isPlaying) return;
  isPlaying = true;

  sirenAudio.play().catch(error => console.error("Error playing sirenAudio: ", error));
  setTimeout(() => {
    honkAudio.play().catch(error => console.error("Error playing honkAudio: ", error));
  }, 10000);

  setTimeout(() => fadeOutAudio(sirenAudio, 5000), 5000);
  setTimeout(() => fadeOutAudio(honkAudio, 5000), 15000);
  setTimeout(() => (isPlaying = false), 20000);
}

function fadeOutAudio(audio, duration) {
  const fadeInterval = 50;
  const fadeStep = audio.volume / (duration / fadeInterval);
  const fadeOut = setInterval(() => {
    if (audio.volume > 0.05) {
      audio.volume -= fadeStep;
    } else {
      clearInterval(fadeOut);
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 1;
    }
  }, fadeInterval);
}

// Cryptic messages
const crypticMessages = [
  "Why can’t you just listen for once?!",
  "Does anyone have a lighter?",
  "Can you buzz apartment #13?",
  "Keep it down!",
  "I can't believe you got with him",
  "I'm calling an Uber"
];

let lastMessageIndex = -1;

function showCrypticMessage(scrollDepth) {
  const messageIndex = Math.floor(scrollDepth / 1000) - 1;

  if (messageIndex > lastMessageIndex && messageIndex < crypticMessages.length) {
    lastMessageIndex = messageIndex;

    const message = document.createElement("div");
    message.classList.add("crypticMessage");
    message.innerText = crypticMessages[messageIndex];
    message.style.top = `${scrollDepth + window.innerHeight / 2}px`;
    message.style.left = `${Math.random() * (window.innerWidth - 200)}px`;
    content.appendChild(message);

    setTimeout(() => message.remove(), 7000);
  }
}

// Infinite scrolling and effects
function addMoreContent() {
  const newContent = document.createElement('div');
  newContent.style.height = '200vh';
  newContent.style.background = 'transparent';
  content.appendChild(newContent);
}

// Cursor ripple effect
document.addEventListener("mousemove", (e) => {
  createRipple(e.clientX, e.clientY);
});

function createRipple(x, y) {
  const ripple = document.createElement("div");
  ripple.classList.add("ripple");
  ripple.style.width = ripple.style.height = `${Math.random() * 50 + 50}px`;
  ripple.style.left = `${x - 25}px`;
  ripple.style.top = `${y - 25}px`;
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 1000);
}

// Creepy effects
function triggerCreepyEffect() {
  const randomObject = document.createElement("div");
  randomObject.classList.add("randomObject");
  randomObject.style.left = `${Math.random() * window.innerWidth}px`;
  randomObject.style.top = `${scrollContainer.scrollTop + Math.random() * window.innerHeight}px`;
  content.appendChild(randomObject);
  setTimeout(() => randomObject.remove(), 5000);
}

function generateWhiteDots() {
  setInterval(triggerCreepyEffect, 1500);
}

generateWhiteDots();

// Pop-up windows
const imageList = [
  "./Images/IMG_0395 2.jpg",
  "./Images/IMG_0423 2.jpg",
  "./Images/Bar-3.jpg",
  "./Images/IMG_0426 2.png",
  "./Images/IMG_1207.png"
];

function triggerPopUpWindow() {
  const popup = document.createElement("div");
  popup.classList.add("popupWindow");

  const randomImage = imageList[Math.floor(Math.random() * imageList.length)];
  popup.style.left = `${Math.random() * (window.innerWidth - 200)}px`;
  popup.style.top = `${scrollContainer.scrollTop + Math.random() * (window.innerHeight - 200)}px`;
  popup.innerHTML = `
    <p style="color: white; font-size: 1rem;">Click to open image</p>
    <img class="popupContent" style="display: none;" src="${randomImage}" width="320" height="240" alt="Sample Image">`;

  popup.addEventListener('click', () => {
    const content = popup.querySelector('.popupContent');
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
  });

  content.appendChild(popup);
  setTimeout(() => popup.remove(), 10000);
}

function generatePopUpWindows() {
  setInterval(triggerPopUpWindow, 10000);
}

generatePopUpWindows();

// Scroll event listener
scrollContainer.addEventListener("scroll", debounce(() => {
  const scrollDepth = scrollContainer.scrollTop;
  const scrollBottom = scrollContainer.scrollTop + scrollContainer.clientHeight;
  const containerHeight = scrollContainer.scrollHeight;

  if (scrollBottom >= containerHeight - 300) addMoreContent();
  if (scrollDepth > 10) titleContainer.style.opacity = '0';
  else titleContainer.style.opacity = '1';

  if (scrollDepth > 2000 && !sirenTriggered) {
    triggerSirenEffect();
    triggerCreepyEffect();
  }

  showCrypticMessage(scrollDepth);
}, 100));

// Debounce function
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Siren effect
function triggerSirenEffect() {
  if (sirenTriggered) return;
  sirenTriggered = true;

  const siren = document.createElement("div");
  siren.classList.add("sirenEffect");
  document.body.appendChild(siren);

  setTimeout(() => fadeOutSiren(siren), 5000);
}

function fadeOutSiren(siren) {
  siren.style.opacity = '0';
  setTimeout(() => {
    siren.remove();
    sirenTriggered = false; // Reset for next trigger
  }, 3000);
}

// Random cryptic text flood
function floodCrypticText() {
  const randomTexts = ["3f5f8~*^^404", "bzZ#z~r", "!@%$", "xYZ*&%9", "~404~$$!"];

  for (let i = 0; i < 20; i++) {
    const text = document.createElement('div');
    text.classList.add('crypticFlood');
    text.innerText = randomTexts[Math.floor(Math.random() * randomTexts.length)];
    text.style.left = `${Math.random() * window.innerWidth}px`;
    text.style.top = `${Math.random() * window.innerHeight}px`;
    document.body.appendChild(text);
    setTimeout(() => text.remove(), 5000);
  }
}

setTimeout(floodCrypticText, 10000);
