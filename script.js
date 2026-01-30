const questions = [
  { q: "2x + 5 = 15, x = ?", a: [3,5,7,10], c: 1 },
  { q: "5² = ?", a: [10,20,25,30], c: 2 },
  { q: "√144 = ?", a: [10,12,14,16], c: 1 }
];

let index = 0, score = 0, time = 30, timer;

const menu = document.getElementById("menu");
const game = document.getElementById("game");
const over = document.getElementById("gameOver");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");

const bgMusic = document.getElementById("bgMusic");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

function startGame() {
  menu.classList.remove("active");
  game.classList.add("active");
  bgMusic.play();
  loadQuestion();
  startTimer();
}

function loadQuestion() {
  if (index >= questions.length) return endGame();
  const q = questions[index];
  questionEl.textContent = q.q;
  answersEl.innerHTML = "";
  q.a.forEach((ans,i)=>{
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = ()=>checkAnswer(i);
    answersEl.appendChild(btn);
  });
}

function checkAnswer(i) {
  if (i === questions[index].c) {
    score += 10;
    correctSound.play();
    confetti();
  } else wrongSound.play();

  scoreEl.textContent = "Skor: " + score;
  index++;
  loadQuestion();
}

function startTimer() {
  timer = setInterval(()=>{
    time--;
    timerEl.textContent = "⏱️ " + time;
    if (time <= 0) endGame();
  },1000);
}

function endGame() {
  clearInterval(timer);
  bgMusic.pause();
  game.classList.remove("active");
  over.classList.add("active");
  document.getElementById("finalScore").textContent = "Skor Akhir: " + score;
}

function restartGame() {
  index = score = 0;
  time = 30;
  over.classList.remove("active");
  menu.classList.add("active");
}

function confetti() {
  for(let i=0;i<20;i++){
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random()*100 + "vw";
    c.style.background = `hsl(${Math.random()*360},100%,50%)`;
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),3000);
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else document.exitFullscreen();
}
