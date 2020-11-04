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

const randomIndex = randomIndexGen(simonCommands.length);
const simon = simonCommands[randomIndex]

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
  keyEvent(evt)
  clickLogic(evt);
  inputVal(evt);
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
    if(evt.target.innerText === state.answer){
      state.score = simon.score;
      scoreElm.innerText = state.score;
      nextRound()
    }else{
      console.log('incorrect mofo');
    };
  });
};

function inputVal(evt){
  input.addEventListener('input', function(evt){
    if(input.value === simon.answer && input.value === state.answer){
      console.log(evt);
      state.score = simon.score;
      scoreElm.innerText = state.score;
      input.value = "";
      nextRound()
    }else{
      console.log("wrong");
    };
  })
};

function keyEvent(evt){
  window.addEventListener('keydown', function(evt){
    if(evt.keyCode === state.answer){
      console.log("good job you get a point");
      state.score = simon.score;
      scoreElm.innerText = state.score;
      nextRound()
    }else{
      console.log("no point");
    }
  });
};

function nextRound(){
  simonCmdElm.innerText = "";
  simonCmdElm.innerText = simonCommands[randomIndexGen(simonCommands.length)].command;
}

function randomIndexGen(len){
  return Math.floor(Math.random() * len);
};

overlayPrompt.addEventListener('click', gameStart);
