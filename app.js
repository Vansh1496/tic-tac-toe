let player1 = []
let player2 = []
let playerAI = []

let scoreX = 0
let scoreO = 0

const scoreBoardX = document.querySelector("#scoreX")
const scoreBoardO = document.querySelector("#scoreO")

let winning = false

let board = [ "" , "" , "" , "" , "" , "" , "" , "" , "" ]

const winPatterns = [
	[0,1,2],[3,4,5],[6,7,8],
	[0,3,6],[1,4,7],[2,5,8],
	[0,4,8],[2,4,6]
];

const popup = document.getElementById("modePopup");

const playAI = document.querySelector("#playAI");
const playFrd = document.querySelector("#playFriend");
const restart = document.querySelector(".restart")

const winnerName = document.querySelector(".winner")
let turn = document.querySelector("#turn")
let AI = false
let isAITurn = false
playAI.addEventListener("click",() => {
    diffBox.style.display = "block";
    
})

let difficulty = "easy"; // default
const diffBox = document.getElementById("difficultyBox");
const diffBtns = document.querySelectorAll(".diff");


diffBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        AI = true
        currentPlayer = "X"
        // popup.style.display = "none";
        console.log("AI")
        for(pad of btns){
            pad.classList.add("aiBoard")
        }
        turn.innerText = "YOU"
        difficulty = btn.dataset.level;
        console.log("Selected:", difficulty);
        diffBox.style.display = "none"; // hide after select
        popup.style.display = "none";
        gameStart()

    });
});

playFrd.addEventListener("click",() => {
    AI = false
    popup.style.display = "none";
    console.log("Frd")
	for(pad of btns){
		pad.classList.add("highlight")
	}
    turn.innerText = "X "
    gameStart()
})

restart.addEventListener("click" , () => {
	AI = false
	winning = false
	player1 = []
	player2 = []
	playerAI = []
	popup.style.display = "flex";
	diffBox.style.display = "none";
	btns.forEach((pad, index) => {
        pad.innerText = ""
        pad.onclick = () => btnpress(pad, index);
        pad.classList.remove("winning" , "aiBoard" , "highlight")
    });
	board = [ "" , "" , "" , "" , "" , "" , "" , "" , "" ]
	currentPlayer = "X";
    winnerName.innerText = "";
    turn.innerText = "X"
    winning = false
})

//

btns = document.querySelectorAll(".pad")

function gameStart(){
    if(AI){
        userplay()
        console.log("AI is playing")
        

    } else{
        userplay()
        console.log("Your frd id playing")
    }
}

function userplay(){
    btns.forEach((pad, index) => {
        pad.addEventListener("click", () => btnpress(pad, index));
    });
}
let currentPlayer = "X";
function togglePlayer(){
  	currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function btnpress(pad,index){
    console.log(pad.innerText + " " + isAITurn + " " + winning)
    if(pad.innerText != "" || isAITurn || winning == true) return
    console.log("btn is pressed")
    if(currentPlayer === "X"){
        pad.classList.remove("O")
        pad.classList.add("X")
        turn.innerText = AI ? "AI 🤖" : "O"
        player1.push(index)
    } else {
        pad.classList.remove("X")
        pad.classList.add("O")
        turn.innerText = "X"
        player2.push(index)
    }
    pad.innerText = currentPlayer
    console.log(currentPlayer)
    board[index] = currentPlayer
    let result = check1(board);

    if (result) {
        if (result.winner === "draw") {
            
            winnerName.innerText = "Match Draw 🤝";
        } else {
            winnerName.innerText = result.winner + " wins 🎉";
            console.log("draw")
            if(result.winner === "O") {
                scoreO++
                scoreBoardO.innerText = scoreO
            } else {
                scoreX++
                scoreBoardX.innerText = scoreX
            }
            // highlight winning boxes
            result.pattern.forEach(i => {
                btns[i].classList.add("winning");
            });
        }

        winning = true;
        return;
    }
    turnX = false

    if(AI){
        console.log(winning)
        isAITurn = true
		setTimeout(() => {
            turn.innerText = "YOU"
            if(!winning && ((player1.length + playerAI.length) !== 9)){
                let bestMove;

                if (difficulty === "easy") {
                    // random move
                    let empty = board
                        .map((v, i) => v === "" ? i : null)
                        .filter(v => v !== null);

                    bestMove = empty[Math.floor(Math.random() * empty.length)];

                } else if (difficulty === "medium") {
                    // 50% random, 50% smart
                    if (Math.random() < 0.5) {
                        let empty = board
                            .map((v, i) => v === "" ? i : null)
                            .filter(v => v !== null);

                        bestMove = empty[Math.floor(Math.random() * empty.length)];
                    } else {
                        bestMove = minimax(board, "O").index;
                    }

                } else {
                    // hard = full AI
                    bestMove = minimax(board, "O").index;
                }

				board[bestMove] = "O";
				btns[bestMove].innerText = "O";
                btns[bestMove].classList.remove("X")
                btns[bestMove].classList.add("O")
				playerAI.push(bestMove);
			}
            isAITurn = false;
            let result = check1(board);

            if (result) {
                if (result.winner === "draw") {
                    winnerName.innerText = "Match Draw 🤝";
                } else {
                    winnerName.innerText = result.winner + " wins 🎉";

                    // highlight winning boxes
                    result.pattern.forEach(i => {
                        btns[i].classList.add("winning");
                    });
                }

                winning = true;
                return;
            }
			
        },500)
		return;
    } 
    if(!AI){
        togglePlayer();
    }
}

function check1(board) {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return {
                winner: board[a],   // "X" ya "O"
                pattern: pattern
            };
        }
    }

    // draw check
    if (!board.includes("")) {
        return { winner: "draw" };
    }

    return null; // game abhi chal raha hai
}


function blinkingWinner(arr){
    console.log("blinkingWinner")
    for(let i = 0 ; i < 3 ; i+=1 ){
        let ans = document.querySelector(`[data-value="${arr[i]}"]`)
        ans.classList.add("winning")
        setTimeout(() => {
            ans.classList.remove("winning")
        },6000)
    }
}




// TIC TAC TOE algorithm

function minimax(newBoard, player){

  const availSpots = newBoard
    .map((val, i) => val === "" ? i : null)
    .filter(v => v !== null);

  // win check
  if(checkWinner(newBoard, "X")) return { score: -10 };
  if(checkWinner(newBoard, "O")) return { score: 10 };
  if(availSpots.length === 0) return { score: 0 };

  let moves = [];

  for(let i = 0; i < availSpots.length; i++){
    let move = {};
    move.index = availSpots[i];

    newBoard[availSpots[i]] = player;

    if(player === "O"){
      let result = minimax(newBoard, "X");
      move.score = result.score;
    } else {
      let result = minimax(newBoard, "O");
      move.score = result.score;
    }

    newBoard[availSpots[i]] = "";
    moves.push(move);
  }

  let bestMove;

  if(player === "O"){
    let bestScore = -Infinity;
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

function checkWinner(board, player){
  return winPatterns.some(pattern => {
    return pattern.every(i => board[i] === player);
  });
}


