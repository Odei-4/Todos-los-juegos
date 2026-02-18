const boardElement = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let board = ["","","","","","","","",""];
let currentPlayer = "X";
let gameActive = true;

function crearTablero(){
    boardElement.innerHTML = "";
    board.forEach((_, index)=>{
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.addEventListener("click", manejarClick);
        boardElement.appendChild(cell);
    });
}

function manejarClick(e){
    const index = e.target.dataset.index;

    if(board[index] !== "" || !gameActive) return;

    hacerMovimiento(index, currentPlayer);

    if(verificarGanador()){
        terminarJuego(currentPlayer + " Irabazten du");
        return;
    }

    if(!board.includes("")){
        terminarJuego("Empate");
        return;
    }

    cambiarTurno();

    if(document.getElementById("modo").value === "cpu" && currentPlayer === "O"){
        setTimeout(movimientoCPU, 500);
    }
}

function hacerMovimiento(index, jugador){
    board[index] = jugador;
    boardElement.children[index].textContent = jugador;
}

function cambiarTurno(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = "Txanda: " + currentPlayer;
}

function verificarGanador(){
    const combinaciones = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    return combinaciones.some(comb=>{
        const [a,b,c] = comb;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function terminarJuego(mensaje){
    statusText.textContent = mensaje;
    gameActive = false;
}

function movimientoCPU(){
    let libres = board
        .map((val, idx)=> val === "" ? idx : null)
        .filter(v => v !== null);

    if(libres.length === 0) return;

    const randomIndex = libres[Math.floor(Math.random()*libres.length)];
    hacerMovimiento(randomIndex, "O");

    if(verificarGanador()){
        terminarJuego("🤖 Makina irabazten du");
        return;
    }

    if(!board.includes("")){
        terminarJuego("Empate");
        return;
    }

    cambiarTurno();
}

resetBtn.addEventListener("click", ()=>{
    board = ["","","","","","","","",""];
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Txanda: X";
    crearTablero();
});

crearTablero();
statusText.textContent = "Txanda: X";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}
