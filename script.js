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


const game = (function (){
    
    const board = gameBoard();
    const p1 = createPlayer('Player 1','X');
    const p2 = createPlayer('Player 2','O');
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
            const isFull = board.getBoard().every(cell => cell !== '');
            console.log(board.getBoard());
              let result = checkWin();

               if (result === "Win" ){
                    console.log(currentPlayer.getName() + ' wins!');
                    board.boardReset();
                    return;
                  }else if ( isFull ){
                    console.log("Draw !");
                    board.boardReset();
                    switchPlayer();
                    return;
                }
                switchPlayer();
                
        } 
} 
        return {playRound};
})();



game.playRound(0);
game.playRound(1);
game.playRound(2);
game.playRound(3);
game.playRound(4);
game.playRound(5);
game.playRound(6);
game.playRound(7);
game.playRound(8);
