/*
// Constants
     - simon says commands array of objects

// State
    - score
    - user's answers/input/submit

// Cached Elements
    - header for 'Simon Says...'
    - header for the score
    - input
    - buttons

// functions used
  init() {
    load the opening page with a 'ready' prompt with black overlay
    if clicked yes -> gameStart();
    if clicked no -> wait at 'ready' page till clicked 'yes'
  }

  gameStart(){
    loads the game page with
      - 'Simon Says' header
      - along with ways to answer simon's commands
      if answer is correct -> continue the game
      if answer is incorrect -> gameOver();
  }

  gameOver(){
    loads game over page with black overlay and retry prompt
    calculates total score
  }

  render(){
    will change the view of the state variable being changed
  }


*/

/********
CONSTANTS
********/




const max = 4;
const randomIndex = randomIndexGen(max);
const simon = {
  command: `Click button #${randomIndex}`,
  score: 1,
  answer: randomIndex.toString(),
  roundTime: 3
}


//const simon = simonCommands[randomIndexGen(4)]

/****
STATE
****/

const state = {
  score : null,
  simonSays: null,
  timer: null,
  answer: null,
  randomIndex: null,
  roundTime: null,
  maxScore: null
}

/**************
CACHED ELEMENTS
**************/

const container = document.querySelector('.container');
const simonHeaderELm = document.getElementById('simon-header');
const simonCmdElm = document.getElementById('simon-command');
const scoreElm = document.getElementById('score')
const buttons = document.querySelectorAll('button');
const overlay = document.getElementById('overlay');
const overlayPrompt = document.querySelector('.overlay-prompt');
const countdown = document.querySelector('.countdown');
const btns = document.querySelector('.btns');
const input = document.querySelector('input');
const startContent = document.querySelector('.start');
const loseContent = document.querySelector('.lose-round');
const timerElm = document.querySelector('.timer');
const youWinElm = document.querySelector('.you-win');

/**Init Activated**/
init();
/**Init Activated**/

/***
INIT
***/
function init(){
  // adding inital value of our state
  state.score = 0;
  state.timer = 5;
  state.roundTime = simon.roundTime;
  state.simonSays = simon.command;
  state.answer = simon.answer;
  state.randomIndex = randomIndexGen;
  state.maxScore = 20;
}

/*****
RENDER
*****/
function render(evt){
    overlayPrompt.style.display = "none";
    countdown.style.display = "flex"
    timer(state.timer);
    renderBtns();
 
  if(evt.srcElement === document.querySelector("button#restart-btn")){
    overlayPrompt.style.display = "none";
    countdown.style.display = "flex"
    timer(state.timer);
  }

  //document.querySelector('.round-time').innerText = `You got ${state.roundTime} sec left`;
  
};

function timer(time){
  var timer = setInterval(function(){
    document.querySelector(".countdown h1").innerText = time;
    time--;
    if (time < 0) {
      clearInterval(timer);
      overlay.style.display = "none";
      //roundTimer(state.roundTime);
    }
    if(overlay.style.display === "none"){
      simonCmdElm.innerText = state.simonSays;
      scoreElm.innerText = state.score;
    }
  }, 1000);
};

function roundTimer(time){
  const timer = setInterval(function(){
    document.querySelector(".round-time").innerText = time;
    time--;
    if (time < 0) {
      clearInterval(timer)
      loseRound();
    }
  }, 1000);
};

function renderBtns(){
  const btns = document.querySelector('.btns')
  for(let i = 0; i<=max; i++){
    let btnsElm = document.createElement('button');
    btnsElm.innerText = i;
    btns.appendChild(btnsElm);
    btns.style.display = "block";
  };
};

function gameStart(evt){
  console.log(evt.target);
    if(evt.srcElement === document.querySelector("button#yes")){
      render(evt);
    }else{
      document.querySelector('.hide').style.display = 'block';
    }
};

function gamePlay(evt){
  if(evt.target.innerText === state.answer){
    state.score += simon.score;
    scoreElm.innerText = state.score;
    if(state.score === state.maxScore){
      console.log("gg its over");
      youWin();
    }
    nextRound();
  }else{
    loseRound();
  };
}

function nextRound(){
  let randoNum = randomIndexGen(max);
  state.answer = randoNum.toString();
  state.simonSays = `Click button #${state.answer}`;
  console.log(state.score);
  scoreElm.innerHTML = state.score;
  simonCmdElm.innerText = state.simonSays;
  state.roundTime = simon.roundTime;
  // clearInterval(roundTimer(state.roundTime));
  // roundTimer(state.roundTime);
}

function loseRound(){
  console.log("you lost the round");
  overlay.style.display = "block";
  overlayPrompt.style.display = "block";
  startContent.style.display = "none";
  loseContent.style.display = "block";
  document.querySelector('.timer').style.display = "none";
  document.querySelector('.game-over').style.display = "none";
}

function gameOver(){
  startContent.style.display = "none";
  loseContent.style.display = "none";
  youWinElm.style.display = "none";
  document.querySelector('.game-over h1').innerText = state.score;
  document.querySelector('.game-over').style.display = "block";
}

function youWin(){
  overlay.style.display = "block";
  overlayPrompt.style.display = "block";
  timerElm.style.display = "none";
  startContent.style.display = "none";
  loseContent.style.display = "none";
  document.querySelector('.game-over').style.display = "none";
  youWinElm.style.display = "block";
}

function randomIndexGen(len){
  return Math.floor(Math.random() * len);
};

function restartGame(evt){
  if(evt.srcElement === document.querySelector("button#restart-btn")){
    init();
    gamePlay(evt)
    overlayPrompt.style.display = "none";
    timerElm.innerText = "";
    timerElm.style.display = "block";
  timer(state.timer);
  }else{
    gameOver();
  };
}


btns.addEventListener('click', gamePlay);
overlayPrompt.addEventListener('click', gameStart);

loseContent.addEventListener('click', restartGame);

document.querySelector("div.game-over").addEventListener('click', evt => {
  if(evt.srcElement === document.querySelector("button.retry-btn")){
    init();
    gamePlay(evt)
    loseContent.style.display = "none";
    overlayPrompt.style.display = "none";
    timerElm.innerText = "";
    timer(state.timer);
    timerElm.style.display = "block";
    document.querySelector('.you-win').style.display = "none";
  }
});

document.querySelector("div.you-win").addEventListener('click', evt => {
  console.log(evt.srcElement);
  if(evt.srcElement === document.querySelector("button#retry-btn1")){
    init();
    gamePlay(evt)
    loseContent.style.display = "none";
    overlayPrompt.style.display = "none";
    timerElm.innerText = "";
    timer(state.timer);
    timerElm.style.display = "block";
  }
});