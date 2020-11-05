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

const simonCommands = [
  {
    command: "press the up key",
    type: "keydown",
    timeDuration: 2,
    score: 1,
    answer: 38
  },
  {
    command: "click button #1",
    type: "click",
    timeDuration: 2,
    score: 3,
    answer: "1"
  },
  {
    command: "type 'string' in the input bar",
    type: "input type",
    timeDuration: 5,
    score: 5,
    answer: "string"
  }
];

//const randomIndex = randomIndexGen;
const simon = simonCommands[randomIndexGen(simonCommands.length)]

/****
STATE
****/

const state = {
  score : null,
  simonSays: null,
  timer: null,
  answer: null,
  type: null
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

/**Init Activated**/
init();
/**Init Activated**/

/***
INIT
***/
function init(){
  // adding inital value of our state
  console.log('hello world');
  state.score = "score";
  state.timer = 5;
  state.simonSays = simon.command;
  state.type = simon.type;
  state.answer = simon.answer;
}

/*****
RENDER
*****/
function render(evt){
  console.log('rendering');
  if(evt.srcElement === document.querySelector("button#yes")){
    console.log("yes");
    overlayPrompt.style.display = "none";
    countdown.style.display = "flex"
    timer(state.timer);
  }else if(evt.srcElement === document.querySelector("button#no")){
    console.log("no");
  }else{
    return "";
  };

 
  input.style.display = "inline-block";
  renderBtns();
};

function gameStart(evt){
  // game logic along with render() goes here
  console.log("game started");
  render(evt);
  gameLogic(evt);
};

function gameLogic(evt){
  console.log("logic is running");
  console.log(state.type);
  console.log(state.answer);

  if(state.type === "input type"){
    inputVal(evt);
  }else if(state.type === "keydown"){
    keyEvent(evt)
  }else if(state.type === "click"){
    clickLogic(evt);
  }else{
    gameStart(evt);
  }
  
  
};

function timer(time){
  var timer = setInterval(function(){
    document.querySelector(".countdown h1").innerText = time;
    time--;
    if (time < 0) {
      clearInterval(timer);
      overlay.style.display = "none";
    }
    // rendering first question after countdown
    if(overlay.style.display === "none"){
      console.log("it worked!");
      simonCmdElm.innerText = state.simonSays;
      scoreElm.innerText = state.score;
    }
  }, 1000);
};

function renderBtns(){
  const btns = document.querySelector('.btns')
  const max = 7;
  for(let i = 0; i<=max; i++){
    let btnsElm = document.createElement('button');
    btnsElm.innerText = i;
    btns.appendChild(btnsElm);
    btns.style.display = "block";
  };
};

function clickLogic(evt){
  btns.addEventListener('click', function(evt){
    console.log("click logic working");
    console.log(evt.target.innerText, state.answer, state.type);
    if(evt.target.innerText === state.answer){
      state.score = simon.score;
      scoreElm.innerText = state.score;
      nextRound()
    }else{
      loseRound()
    };
  });
};

function inputVal(evt){
  input.addEventListener('input', function(evt){
    console.log(input.value, state.answer, state.type);
    if(input.value === simon.answer && input.value === state.answer){
      console.log(evt);
      state.score = simon.score;
      scoreElm.innerText = state.score;
      input.value = "";
      nextRound()
    }else{
      loseRound()
    };
  })
};

function keyEvent(evt){
  window.addEventListener('keydown', function(evt){
    console.log(evt.keyCode, state.answer, state.type);
    if(evt.keyCode === state.answer){
      console.log("good job you get a point");
      state.score = simon.score;
      scoreElm.innerText = state.score;
      nextRound()
    }else{
      loseRound()
    }
  });
};

function loseRound(){
  console.log("you lost the round");
  console.log(loseContent);
  overlay.style.display = "block";
  overlayPrompt.style.display = "block";
  startContent.style.display = "none";
  loseContent.style.display = "block";
  document.querySelector('.timer').style.display = "none";
  loseContent.addEventListener('click', evt => {
    if(evt.srcElement === document.querySelector("button#restart-btn")){
      // console.log("yes");
      // overlayPrompt.style.display = "none";
      // countdown.style.display = "flex"
      // timer(state.timer);
      init();
      overlayPrompt.style.display = "none";
      document.querySelector('.timer').style.display = "block";
    timer(state.timer);
    }else{
      gameOver(evt);
    };
  });
}

function nextRound(evt){
  // state should reset like init??
  // update round 1 state to round 2 stuff.
  let newSimonCmd = simonCommands[randomIndexGen(simonCommands.length)];
  // simonCmdElm.innerText = "";
  // simon.command = newSimonCmd;
  // simonCmdElm.innerText = simon.command;
  // return simon.command;
  console.log("next round state", state.type);
  console.log("next round state", state.answer);
  console.log("next round state", state.score);
  state.simonSays = newSimonCmd.command;
  state.type = newSimonCmd.type;
  state.answer = newSimonCmd.answer;
  simonCmdElm.innerText = state.simonSays;
  state.score = simon.score;
  scoreElm.innerText = state.score;
  console.log("next round state", state.type);
  console.log("next round state", state.answer);
  console.log("next round state", state.score);
}

function gameOver(evt){
  startContent.style.display = "none";
  loseContent.style.display = "none";
  document.querySelector('.game-over').style.display = "block";
  // const gameOver = document.createElement('div');
  // const h2GameOver = document.createElement('h2');
  // const scoreCopy =document.createElement('h1');
  // const retryBtn = document.createElement('button');
  // retryBtn.innerText = "Retry";
  // retryBtn.id = "retry-btn"
  // gameOver.className = "game-over";
  // h2GameOver.innerHTML = `You have failed King Simon.<br/>Here is your total score`;
  // scoreCopy.innerText = state.score;
  // gameOver.appendChild(h2GameOver);
  // gameOver.appendChild(scoreCopy);
  // gameOver.appendChild(retryBtn);
  // overlayPrompt.appendChild(gameOver);
  document.querySelector("div.game-over").addEventListener('click', evt => {
    console.log(evt.srcElement);
    if(evt.srcElement === document.querySelector("button#retry-btn")){
      // console.log("yes");
      // overlayPrompt.style.display = "none";
      // countdown.style.display = "flex"
      // timer(state.timer);
      loseContent.style.display = "none";
      overlayPrompt.style.display = "none";
      init();
      timer(state.timer);
      document.querySelector('.timer').style.display = "block";
    }else{
      console.log("why this no work?");
    }
  });
}

function retry(evt){

}

function randomIndexGen(len){
  return Math.floor(Math.random() * len);
};

overlayPrompt.addEventListener('click', gameStart);
