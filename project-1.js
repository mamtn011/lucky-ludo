(function () {
  // Dom selection
  const p1score = document.getElementById("p1score");
  const p2score = document.getElementById("p2score");
  const playingFor = document.querySelector("p span");
  const form = document.querySelector("form");
  const dice = document.querySelector(".dice span");
  const input = document.getElementById("tScore");
  const valid = document.querySelector(".valid");
  const p1btn = document.getElementById("p1btn");
  const p2btn = document.getElementById("p2btn");
  const resetBtn = document.getElementById("reset");
  const winer = document.querySelectorAll(".winer");
  const toss = document.querySelector("#toss");
  const tossMsg = document.querySelector(".tossMsg");
  const players = document.querySelectorAll(".player");
  // required variables and their default value
  let winingScore = Math.floor(Math.random() * (40 - 20) + 20);
  let player1 = 0;
  let player2 = 0;
  let gameOver = false;
  let p1ScrInc = false;
  let p2ScrInc = false;
  dice.textContent = 0;
  // default wining score showing in dom
  playingFor.textContent = winingScore;

  // function for player button enable and disable
  function plsBtnEnDis(pl1, pl2) {
    pl1.setAttribute("disabled", "disabled");
    pl2.removeAttribute("disabled");
  }
  // function player buttons disabled by default
  const disableBtn = () => {
    p1btn.setAttribute("disabled", "disabled");
    p2btn.setAttribute("disabled", "disabled");
  };
  disableBtn();
  // function for operation after wining
  function winner(pScore, wScore, i) {
    if (pScore === wScore) {
      gameOver = true;
      reset();
      winer[i].textContent = "Congratulation! You have won the game!";
    }
  }
  // function for reset
  function reset() {
    player1 = 0;
    player2 = 0;
    gameOver = false;
    p1ScrInc = false;
    p2ScrInc = false;
    p1score.textContent = player1;
    p2score.textContent = player2;
    input.value = "";
    valid.textContent = "";
    dice.textContent = 0;
    disableBtn();
    toss.removeAttribute("disabled");
    tossMsg.textContent = `Toss before start playing`;
    winer.forEach((winer) => (winer.textContent = ""));
  }
  // Function for form handler
  function formHandler() {
    if (input.value) {
      winingScore = Number(input.value);
      playingFor.textContent = input.value;
      reset();
    } else {
      valid.textContent =
        "You didn't submit any wining score. You can submit a valid wining score. Otherwise you have to play for default wining score!";
      playingFor.textContent = winingScore;
      disableBtn();
    }
  }
  // Function for event on player-1 button
  function pl1EvtFunc() {
    if (!gameOver) {
      let a = Math.floor(Math.random() * (7 - 1) + 1);
      dice.textContent = a;
      if (a === 6) {
        p1ScrInc = true;
        if (winingScore >= player1 + a) {
          plsBtnEnDis(p2btn, p1btn);
        } else {
          plsBtnEnDis(p1btn, p2btn);
        }
      } else {
        plsBtnEnDis(p1btn, p2btn);
      }
      if (winingScore >= player1 + a && p1ScrInc) player1 += a;
      winner(player1, winingScore, 0);
      p1score.textContent = player1;
    }
  }
  // Function for event on player-2 button
  function pl2EvtFunc() {
    if (!gameOver) {
      let a = Math.floor(Math.random() * (7 - 1) + 1);
      dice.textContent = a;
      if (a === 6) {
        p2ScrInc = true;
        if (winingScore >= player2 + a) {
          plsBtnEnDis(p1btn, p2btn);
        } else {
          plsBtnEnDis(p2btn, p1btn);
        }
      } else {
        plsBtnEnDis(p2btn, p1btn);
      }
      if (winingScore >= player2 + a && p2ScrInc) player2 += a;
      winner(player2, winingScore, 1);
      p2score.textContent = player2;
    }
  }
  // Function for toss event handler
  function tossHandler() {
    const i = Math.floor(Math.random() * 2);
    players[i].removeAttribute("disabled");
    tossMsg.textContent = `Player ${i + 1} won the toss`;
    toss.setAttribute("disabled", "disabled");
    winer.forEach((winer) => (winer.textContent = ""));
    valid.textContent = "";
  }

  // event handler for toss button
  toss.addEventListener("click", tossHandler);
  // event handler for reset button
  resetBtn.addEventListener("click", () => {
    reset();
    winingScore = Math.floor(Math.random() * (40 - 20) + 20);
    playingFor.textContent = winingScore;
  });
  // event handler for form submition
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    formHandler();
  });
  // event handler for player-1 button
  p1btn.addEventListener("click", pl1EvtFunc);
  // event handler for player-2 button
  p2btn.addEventListener("click", pl2EvtFunc);
})();
