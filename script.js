

var playerRed = "R";
var playerYellow = "Y";
var currplayer = playerRed;

var gameover = false;
var board;
var currcolumn;

var rows = 6;
var columns = 7;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    currcolumn = [5,5,5,5,5,5,5];
    
    for (let r= 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            //JS
            row.push('');

            //HTML
            // <div id="0.0" class="tile"></div
            let tile = document.createElement("div");
            tile.id = r.toString() + "," + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click",setpiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setpiece() {
    if (gameover) {
        return;
    }

    let coords = this.id.split(":"); //"0.0" -> ["0","0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currcolumn[c];
    if (r < 0) {
        return;
    }

    board[r][c] = currplayer;
    let tile = document.getElementById(r.toString() + ":" + c.toString());
    if (currplayer == playerRed) {
        tile.classList.add("Red.piece");
        currplayer = playerYellow;
    }
    else {
        tile.classList.add("Yellow.piece");
        currplayer = playerRed;
    }

    r -=1; //updating the row height for the column
    currcolumn[c] = r; //update the array

    checkwinner();
}


function checkwinner() {
    //horizontally
    for (let r = 0; r < rows; r++) {
        for ( let c = 0; c < columns - 3; c++) {
            if (board[r][c] != '') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3] && board [r][c] != '') {
                    setwinner(r, c);
                    return;
                }
            }
        }
    }

    //vertically
    for (let c = 0; c < columns; c++) {
        for (let r=0; r < rows-3; r++) {
            if (board[r][c] != '') {
                if (board[r][c] == board[r+1][c] && board[r=1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c] && board[r][c] != '') {
                    setwinner(r, c);
                    return;
                }
            }
        }
    }

    //anti diagonally
    for(let r=0; r < rows-3; r++){
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != '') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setwinner(r, c);
                    return;
                }
            }
        }
    }

    //diagonally
    for(let r=3; r < rows; r++){
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != '') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setwinner(r, c);
                    return;
                }
            }
        }
    }
}

function setwinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins";
    } else {
        winner.innerText = "Yellow Wins"
    }

    gameover = true;
}