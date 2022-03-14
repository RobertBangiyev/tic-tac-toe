const Player = (name, symbol) => {
    let score = 0;
    const updateScore = () => {
        score++;
    };
    const resetScore = () => {
        score = 0;
    }
    const getScore = () => score;
    return {name, symbol, updateScore, resetScore, getScore};
}

const gameBoard = (() => {
    let gameboard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const beginBtn = document.querySelector('button');
    const squares = document.querySelectorAll('.row>div');
    const computerPlayer = Player('Computer', 'O');
    const userPlayer = Player('Player', 'X');
    let currTurn = userPlayer;
    const toggleTurn = () => {
        if(currTurn == userPlayer) {
            currTurn = computerPlayer;
        } else {
            currTurn = userPlayer;
        }
    }
    const startGame = () => {
        console.log(squares);
        handleGame();
        if(computerPlayer.getScore() == 5 || userPlayer.getScore() == 5) {
            endGame();
        }
    }
    const handleGame = () => {
        squares.forEach((element, index) => {
            element.addEventListener('click', () => {
                handleTurn(element, index);
            })
        })
    }
    const handleTurn = (element, index) => {
        console.log(index);
        if(gameboard[index] == 0) {
            gameboard[index] = currTurn.symbol;
            addImage(element);
            toggleTurn();
        }
    }
    const addImage = (element) => {
        const img = document.createElement('img');
        img.src = `./img/${currTurn.symbol}.png`;
        element.appendChild(img);
    }
    const endGame = () => {
        gameboard.splice(0, gameboard.length);

        beginBtn.classList.remove('hidden');
    }
    return {startGame};
})();

(function main() {
    const beginBtn = document.querySelector('button');
    beginBtn.addEventListener('click', () => {
        beginBtn.classList.add('hidden');
        gameBoard.startGame();
    })
})();