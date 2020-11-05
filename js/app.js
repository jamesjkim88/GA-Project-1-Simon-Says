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
  answer: randomIndex.toString()
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
  randomIndex: null
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
  state.score = 0;
  state.timer = 5;
  state.simonSays = simon.command;
  state.answer = simon.answer;
  state.randomIndex = randomIndexGen;
  console.log(state.simonSays);
  console.log(state.answer);
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

  if(evt.srcElement === document.querySelector("button#restart-btn")){
    console.log("restart");
    overlayPrompt.style.display = "none";
    countdown.style.display = "flex"
    timer(state.timer);
  }

  renderBtns();
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
  for(let i = 0; i<=max; i++){
    let btnsElm = document.createElement('button');
    btnsElm.innerText = i;
    btns.appendChild(btnsElm);
    btns.style.display = "block";
  };
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
  clickLogic(evt);
};

function clickLogic(evt){
  btns.addEventListener('click', function(evt){
    console.log("click logic working");
    console.log(evt.target.innerText, state.answer);
    if(evt.target.innerText === state.answer){
      state.score += simon.score;
      scoreElm.innerText = state.score;
      nextRound()
    }else{
      loseRound()
    };
  });
};

function nextRound(evt){
  // update round 1 state to round 2 stuff.
  let randoNum = randomIndexGen(max);
  state.answer = randoNum.toString();
  state.simonSays = `Click button #${state.answer}`;
  console.log(state.score);
  scoreElm.innerHTML = state.score;
  simonCmdElm.innerText = state.simonSays;
  console.log("next round state", state.type);
  console.log("next round state", state.answer);
  console.log("next round state", state.score);
  randoNum = randomIndexGen(max);
  gameStart(evt);
}

function loseRound(evt){
  console.log("you lost the round");
  overlay.style.display = "block";
  overlayPrompt.style.display = "block";
  startContent.style.display = "none";
  loseContent.style.display = "block";
  document.querySelector('.timer').style.display = "none";
  loseContent.addEventListener('click', evt => {
    if(evt.srcElement === document.querySelector("button#restart-btn")){
      init();
      gameStart(evt)
      overlayPrompt.style.display = "none";
      document.querySelector('.timer').style.display = "block";
    timer(state.timer);
    }else{
      gameOver(evt);
    };
  });
}

function gameOver(evt){
  startContent.style.display = "none";
  loseContent.style.display = "none";
  document.querySelector('.game-over').style.display = "block";
  document.querySelector("div.game-over").addEventListener('click', evt => {
    console.log(evt.srcElement);
    if(evt.srcElement === document.querySelector("button#retry-btn")){
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


/*
Old stuff
function inputVal(evt){
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

  // if(state.type === "input type"){
  //   inputVal(evt);
  // }else if(state.type === "keydown"){
  //   keyEvent(evt)
  // }else if(state.type === "click"){
  //   clickLogic(evt);
  // }else{
  //   gameStart(evt);
  // }

  // const simonCommands = [
//   {
//     command: "press the up key",
//     type: "keydown",
//     timeDuration: 2,
//     score: 1,
//     answer: 38
//   },
//   {
//     command: "click button #1",
//     type: "click",
//     timeDuration: 2,
//     score: 3,
//     answer: "1"
//   },
//   {
//     command: "type 'string' in the input bar",
//     type: "input type",
//     timeDuration: 5,
//     score: 5,
//     answer: "string"
//   }
// ];
*/