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
    type: "key press down",
    timeDuration: 2
  },
  {
    command: "click button A",
    type: "click",
    timeDuration: 2
  },
  {
    command: "type 'string' in the input bar",
    type: "input value",
    timeDuration: 5
  }
];

/****
STATE
****/

const state = {
  score : null,
  simonSays: null,
  timer: null
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


init();

function init(){
  console.log('hello world');
  state.timer = 5;
}

function render(){
  console.log('rendering');
};

function gameStart(){
  console.log('game starting');
};

overlayPrompt.addEventListener('click', gameStart);

function gameStart(evt){
  if(evt.srcElement === document.querySelector("button#yes")){
    console.log("yes");
    overlayPrompt.style.display = "none";
    countdown.style.display = "flex"
    document.querySelector(".countdown h1").innerText = state.timer;
  }else if(evt.srcElement === document.querySelector("button#no")){
    console.log("no");
  }else{
    return "";
  };
}


