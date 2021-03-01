const Game = (function(){
    let _gameboard = [["", "", ""], ["", "", ""], ["", "", ""]];
    let _turn = "X";
    let _win = false;

    function _hasWon(){ //something isn't working here
        if(_gameboard[0] == [_turn, _turn, _turn]
            || _gameboard[1] == [_turn, _turn, _turn]
            || _gameboard[2] == [_turn, _turn, _turn]
            || (_gameboard[0][0] == _turn && _gameboard[1][1] == _turn && _gameboard[2][2] == _turn)
            || (_gameboard[0][2] == _turn && _gameboard[1][1] == _turn && _gameboard[2][0] == _turn)
            || (_gameboard[0][0] == _turn && _gameboard[0][1] == _turn && _gameboard[0][2] == _turn)
            || (_gameboard[1][0] == _turn && _gameboard[1][1] == _turn && _gameboard[1][2] == _turn)
            || (_gameboard[2][0] == _turn && _gameboard[2][1] == _turn && _gameboard[2][2] == _turn)){
                console.log("yes");
                return true;
        }else{
                console.log("no");
                return false;
        }
    }

    function makeMove(e){
        e.target.classList.remove("show-move");
        e.target.classList.add("made-move");
        switch(e.target.className){
            case "grid-item 00":
                _gameboard[0][0] = _turn;
                break;
            case "grid-item 01":
                _gameboard[0][1] = _turn;
                break;
            case "grid-item 02":
                _gameboard[0][2] = _turn;
                break;
            case "grid-item 10":
                _gameboard[1][0] = _turn;
                break;
            case "grid-item 11":
                _gameboard[1][1] = _turn;
                break;
            case "grid-item 12":
                _gameboard[1][2] = _turn;
                break;
            case "grid-item 20":
                _gameboard[2][0] = _turn;
                break;
            case "grid-item 21":
                _gameboard[2][1] = _turn;
                break;
            case "grid-item 22":
                _gameboard[2][2] = _turn;
                break;
        }
        if(_turn == "X"){
            _turn = "O";
        }else{
            _turn = "X";
        }
        if(_hasWon()){
            _win = true;
            squares.forEach(square => square.removeEventListener("mouseover", Game.showMove));
            squares.forEach(square => square.removeEventListener("mouseout", Game.fadeOutMove));
            squares.forEach(square => square.removeEventListener("click", Game.makeMove));
            header.textContent = "We Have A Winner!";
        }
    }

    function showMove(e){
        if(e.target.textContent == ""){
            e.target.classList.add("show-move");
            e.target.textContent = _turn;
        }
    }

    function fadeOutMove(e){
        if(e.target.classList.contains("show-move")){
            e.target.classList.remove("show-move");
        }
        if(!e.target.classList.contains("made-move")){
            e.target.textContent = "";
        }
    }

    function restartGame(){
        _gameboard = [["", "", ""], ["", "", ""], ["", "", ""]];
        squares.forEach(function(square){
            square.textContent = "";
            if(square.classList.contains("made-move")){
                square.classList.remove("made-move");
            }
            _turn = "X"; 
        if(_win == true){
            squares.forEach(square => square.addEventListener("mouseover", Game.showMove));
            squares.forEach(square => square.addEventListener("mouseout", Game.fadeOutMove));
            squares.forEach(square => square.addEventListener("click", Game.makeMove));
            header.textContent = "Tic Tac Toe";
            _win = false;
        }
        });
    }

    return{
        makeMove, showMove, fadeOutMove, restartGame
    };
})();

const squares = document.querySelectorAll(".grid-item");
squares.forEach(square => square.addEventListener("mouseover", Game.showMove));
squares.forEach(square => square.addEventListener("mouseout", Game.fadeOutMove));
squares.forEach(square => square.addEventListener("click", Game.makeMove));
const restartBtn = document.querySelector(".restart-btn");
restartBtn.addEventListener("click", Game.restartGame);
const header = document.querySelector("header");

/* to be added later
const Player = () => {

};
*/