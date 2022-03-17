const Player = (name, symbol) => {
    let rowScore = [0, 0, 0];
    let colScore = [0, 0, 0];
    let diagScore = [0, 0];
    
    const updateScore = (rowPos, colPos, diagPos) => {
        rowScore[rowPos]++;
        colScore[colPos]++;
        if(diagPos === 'Both') {
            diagScore[0]++;
            diagScore[1]++;
        } else if(diagPos != 'None') {
            diagScore[diagPos]++;
        }
        if(rowScore[rowPos] === 3 || colScore[colPos] === 3 || diagScore[diagPos] === 3) {
            return "Winner";
        } else {
            return "No Winner Yet";
        }
    }
    const resetScore = () => {
        for(let i = 0; i < 3; i++) {
            rowScore[i] = 0;
            colScore[i] = 0;
        }
        diagScore[0] = 0;
        diagScore[1] = 0;
    }
    return {name, symbol, updateScore, resetScore};
}

const GameBoard = (() => {
    let gameboard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let gameStart = false;
    const beginBtn = document.querySelector('button');
    const gameContainer = document.querySelector('.container');
    const squares = document.querySelectorAll('.row>div');
    const winScreen = document.querySelector('.winscreen');
    const winner = document.querySelector('.winner');
    const playerOne = Player('Player One', 'O');
    const playerTwo = Player('Player Two', 'X');
    squares.forEach((element, index) => {
        element.addEventListener('click', () => {
            if(gameStart) {
                handleTurn(element, index);
            }
        })
    })
    let currTurn = playerTwo;
    const toggleTurn = () => {
        if(currTurn == playerTwo) {
            currTurn = playerOne;
        } else {
            currTurn = playerTwo;
        }
    }
    const startGame = () => {
        winScreen.classList.add('hidden');
        squares.forEach((element) => {
            if(element.hasChildNodes()) {
                element.removeChild(element.lastChild);
            }
        })
        gameStart = true;
    }
    const handleTurn = (element, index) => {
        if(gameboard[index] == 0) {
            gameboard[index] = currTurn.symbol;
            addImage(element);
            let rowPos = Math.floor(index/3);
            let colPos = index % 3;
            let diagPos = index === 4 ? "Both" : index % 4 === 0 ? 0 : index % 2 === 0 ? 1 : "None";
            let roundResult = currTurn.updateScore(rowPos, colPos, diagPos);
            if(roundResult === 'Winner') {
                endGame();
            } else {
                toggleTurn();
            }
        }
    }
    const addImage = (element) => {
        const img = document.createElement('img');
        img.src = `./img/${currTurn.symbol}.png`;
        element.appendChild(img);
    }
    const endGame = () => {
        gameboard.splice(0, gameboard.length);
        for(let i = 0; i < 10; i++) {
            gameboard.push(0);
        }
        winner.textContent = currTurn.name;
        winScreen.classList.remove('hidden');
        gameContainer.classList.add('blur');
        playerOne.resetScore();
        playerTwo.resetScore();
        currTurn = playerTwo;
        gameStart = false;
        beginBtn.classList.remove('hidden');
    }
    return {startGame};
})();

(function main() {
    const beginBtn = document.querySelector('button');
    beginBtn.addEventListener('click', () => {
        beginBtn.classList.add('hidden');
        GameBoard.startGame();
    })
})();