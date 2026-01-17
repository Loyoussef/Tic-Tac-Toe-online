function gameBoard (){
    let GameBoard = ['','','','','','','','',''];

    function cellUpdate (index, value){
       if (GameBoard[index] === ''){
            GameBoard[index] = value;
            return 'Valid move';
        }else {
            console.log('Cell already occupied');
        }
    }
    function boardReset (){     
        for (let i = 0; i < GameBoard.length; i++){
                GameBoard[i] = '';
            }
    }

    function getBoard(){
        return GameBoard;
    }

    return {cellUpdate, boardReset, getBoard};
};


function createPlayer(name, marker){
  
    function getName(){
        return name;
    }
    function getMarker(){
        return marker;
    }
    return {getName, getMarker};
}

const displayController = (function () {

    function renderBoard(board) {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    }

    function displayPlayers(p1Name, p1Marker, p2Name, p2Marker) {
       document.getElementById("player1-name").textContent = p1Name;
       document.getElementById("player1-marker").textContent = p1Marker;
       document.getElementById("player2-name").textContent = p2Name;
       document.getElementById("player2-marker").textContent = p2Marker;
       document.getElementById("player1-score").textContent = 0;
       document.getElementById("player2-score").textContent = 0;
    }

    function resetScore (){
        document.getElementById("player1-score").textContent = 0;
        document.getElementById("player2-score").textContent = 0;
    }

    function displayWinner (player){
        if (player === "Draw"){
             setTimeout(() => {
            document.getElementById('winner-name').textContent = "Draw !";
        }, 500);
        setTimeout(() => {
            document.getElementById('winner-name').textContent = "";
        }, 2000);
            return;
        }else if (player === ""){
            return;
        }else{
        setTimeout(() => {
            document.getElementById('winner-name').textContent = "Winner is " + player + "!";
        }, 500);
        setTimeout(() => {
            document.getElementById('winner-name').textContent = "";
        }, 2000);
        }
    }

    function updateScore (player){
        let score = document.getElementById(player + "-score").textContent;
        score++;
        document.getElementById(player + "-score").textContent = score;
    }

    return {renderBoard, displayPlayers, updateScore, resetScore, displayWinner};
})();
  

const game = (function (){
    
    const board = gameBoard();

    function getPlayerData(){
    let p1Name = prompt("Please enter your name:", " ");
    let p1Marker = prompt("Please enter your marker (X or O):", " ");
    let p2Name = prompt("Please enter your name:", " ");
    let p2Marker = prompt("Please enter your marker (X or O):", " ");

    displayController.displayPlayers(p1Name,p1Marker, p2Name, p2Marker);
    
    const p1 = createPlayer(p1Name, p1Marker);
    const p2 = createPlayer(p2Name, p2Marker);

    return [p1, p2];
    }

    const [p1, p2] = getPlayerData();
    
    let currentPlayer = p1;
    
    function switchPlayer (){
        if (currentPlayer === p1){
            currentPlayer = p2;
        } else {
            currentPlayer = p1;
        }
    }

    function checkWin(){
        let WinConditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];


        for (let i = 0; i < WinConditions.length; i++){
            let [a,b,c] = WinConditions[i];
            if (board.getBoard()[a] === currentPlayer.getMarker() &&
                board.getBoard()[b] === currentPlayer.getMarker() &&
                board.getBoard()[c] === currentPlayer.getMarker()){
                return "Win";
            }
        }
       
    }

    function playRound (index){
        
        let moveResult = board.cellUpdate((index), currentPlayer.getMarker());

        if (moveResult == 'Valid move'){
            displayController.renderBoard(board.getBoard());
            const isFull = board.getBoard().every(cell => cell !== '');
            
              let result = checkWin();
               if (result === "Win" ){
                    displayController.renderBoard(board.getBoard());
                    displayController.displayWinner(currentPlayer.getName());
                    displayController.updateScore(currentPlayer.getName() == p1.getName() ? "player1" : "player2");
                    board.boardReset();
                    displayController.renderBoard(board.getBoard());
                    return;
                  }else if ( isFull ){
                    displayController.renderBoard(board.getBoard()); 
                    displayController.displayWinner("Draw");
                    board.boardReset(); 
                    displayController.renderBoard(board.getBoard());
                    switchPlayer();
                    return;
                }
                switchPlayer();
        } 
    } 

    function gameReset(){
        board.boardReset();
        displayController.renderBoard(board.getBoard());
        displayController.resetScore();
        displayController.displayWinner("");
        getPlayerData();
    }    


    const resetBtn = document.getElementById("restartbtn");
    resetBtn.addEventListener("click", gameReset);

    const cells = document.querySelectorAll('.cell');
            cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
               playRound(index);
            });
        });
        return {getPlayerData,gameReset};
})();