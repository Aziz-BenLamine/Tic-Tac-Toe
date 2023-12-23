const GameBoard = (() => {
    let gameBoard = ["", "", "",
        "", "", "",
        "", "", ""];

    const render = () => {
        let boardHTML = "";
        gameBoard.forEach((element, index) => {
            boardHTML += `<div class="square" id="square-${index}">${gameBoard[index]}</div>`;
        });
        document.querySelector("#gameboard").innerHTML = boardHTML;
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", Game.handleClick);
        });
    }

    const update = (index, value) => {
        gameBoard[index] = value;
        render();
    }

    const getGameboard = () => gameBoard;

    return {
        render,
        update,
        getGameboard
    };
})();

function checkForWin(board, mark) {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (board[i * 3] === mark && board[i * 3 + 1] === mark && board[i * 3 + 2] === mark) {
            return true;
        }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
        if (board[i] === mark && board[i + 3] === mark && board[i + 6] === mark) {
            return true;
        }
    }

    // Check diagonals
    if (board[0] === mark && board[4] === mark && board[8] === mark) {
        return true;
    }

    if (board[2] === mark && board[4] === mark && board[6] === mark) {
        return true;
    }

    return false;
}

const createPlayer = (name, mark) => {
    return {
        name,
        mark,
    };
}

const Game = (() => {
    let players = [];
    let currentPlayer;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
        ];
        currentPlayer = 0;
        gameOver = false;
        GameBoard.render();
    };

    const handleClick = (event) => {
        if (!gameOver) {
            let index = parseInt(event.target.id.split("-")[1]);
            if (GameBoard.getGameboard()[index] !== "") {
                return;
            }
            GameBoard.update(index, players[currentPlayer].mark);

            if (checkForWin(GameBoard.getGameboard(), players[currentPlayer].mark)) {
                gameOver = true;
                alert(`${players[currentPlayer].name} WON !`)
            }
            currentPlayer = (currentPlayer === 0 ? 1 : 0);
        }
    }

    const restart = () => {
        for (let i = 0; i < 9; i++) {
            GameBoard.update(i, "");
            currentPlayer = 0;
        }

    }

    return {
        start,
        handleClick,
        restart
    };
})();

const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", () => {
    Game.restart();
})
const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
    Game.start();
});
