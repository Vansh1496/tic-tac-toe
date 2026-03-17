let str = document.querySelector(".start")
let gameStart = true
let correctSeq = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let player1 = [];
let player2 = [];
let player; 
let winner = document.querySelector(".winner")
let btns = document.querySelectorAll(".pad")
let restart = document.querySelector(".restart")
let gameBoard = document.querySelector(".gameBoard")
let children = gameBoard.children;

let scoreX = 0
let scoreO = 0

let scoreboardX = document.querySelector(".scoreBoardX")
let scoreboardO = document.querySelector(".scoreBoardO")

let scoreXText = document.querySelector("#scoreX")
let scoreOText = document.querySelector("#scoreO")

str.addEventListener("click",() => {
    window.gameStart = true
    if(gameStart == true){
        for (btn of btns){
            btn.classList.add("highlight")
            btn.addEventListener("click" , btnPress)
        }
    }
    scoreboardO.classList.add("turn")
})

restart.addEventListener("click",() => {
    for(btn of btns){
        btn.innerText = ""
        player1 = [];
        player2 = [];
        window.gameStart = false
        btn.addEventListener("click" , btnPress)
        winner.innerText = ""
        btn.classList.remove("winning")
        scoreboardO.classList.remove("winning")
        scoreboardX.classList.remove("winning")
    }
    
})

function btnPress(){
    let btn1 = this
    if(btn1.innerText != ""){
        return
    }
    btn1.classList.add("userPress")
    setTimeout(function () {
        btn1.classList.remove("userPress")
    } , 500)
    console.log(btn1)
    if(window.player == 1){
        scoreboardX.classList.remove("turn")
        scoreboardO.classList.add("turn")
        btn1.innerText = "X"
        window.player = 2
        player1.push(parseInt(btn1.dataset.value))
        console.log(player1)
    } else{
        scoreboardX.classList.add("turn")
        scoreboardO.classList.remove("turn")
        btn1.innerText = "O"
        window.player = 1
        player2.push(parseInt(btn1.dataset.value))
        console.log(player2)
    }
    check()
}

function check(){
    for(let i = 0 ; i < correctSeq.length ; i+=1){
        result1 = correctSeq[i].every(num => player1.includes(num));
        result2 = correctSeq[i].every(num => player2.includes(num));
        if(result1){
            winner.innerText = "player X win"
            scoreboardX.classList.add("winning")
            scoreboardO.classList.remove("turn")
            setTimeout(() => {
                scoreboardX.classList.remove("winning")
            },6000)
            for (btn of btns){
                btn.removeEventListener("click" , btnPress)
            }
            blinkingWinner(correctSeq[i])
            scoreX++
            scoreXText.innerText = scoreX
            gameStart = false
            break
        }
        else if(result2){
            winner.innerText = "player O win"
            scoreboardO.classList.add("winning")
            scoreboardX.classList.remove("turn")
            setTimeout(() => {
                scoreboardO.classList.remove("winning")
            },6000)
            for (btn of btns){
                btn.removeEventListener("click" , btnPress)
            }
            blinkingWinner(correctSeq[i])
            scoreO++
            scoreOText.innerText = scoreO
            gameStart = false
            break
        }
        else if(((player1.length + player2.length) == 9) && (!(result1) && !(result2))){
            winner.innerText = "match draw"
            for (btn of btns){
                btn.removeEventListener("click" , btnPress)
            }   
            gameStart = false
        }
    }
}

function blinkingWinner(arr){
    for(let i = 0 ; i < 3 ; i+=1 ){
        let ans = document.querySelector(`[data-value="${arr[i]}"]`)
        ans.classList.add("winning")
        setTimeout(() => {
            ans.classList.remove("winning")
        },6000)
    }
}