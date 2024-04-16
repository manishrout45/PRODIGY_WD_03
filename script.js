document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');
    const confetti = document.querySelector('.confetti');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (cell, index) => {
        if (gameState[index] !== '' || !gameActive) return;

        gameState[index] = currentPlayer;
        cell.innerText = currentPlayer;

        if (checkWin()) {
            status.innerText = `${currentPlayer} wins!`;
            gameActive = false;
            showWinningLine();
            startConfetti();
            return;
        }

        if (!gameState.includes('')) {
            status.innerText = "It's a draw!";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.innerText = `${currentPlayer}'s turn`;
    };

    const checkWin = () => {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    };

    const showWinningLine = () => {
        winningConditions.forEach(condition => {
            const [a, b, c] = condition;
            if (
                gameState[a] === currentPlayer &&
                gameState[b] === currentPlayer &&
                gameState[c] === currentPlayer
            ) {
                cells[a].classList.add('winning-cell');
                cells[b].classList.add('winning-cell');
                cells[c].classList.add('winning-cell');
            }
        });
    };

    const startConfetti = () => {
        for (let i = 0; i < 100; i++) {
            const confettiPiece = document.createElement('div');
            confettiPiece.classList.add('confetti-piece');
            confettiPiece.style.left = `${Math.random() * 100}%`;
            confettiPiece.style.animationDelay = `${Math.random() * 2}s`;
            confetti.appendChild(confettiPiece);
        }
        setTimeout(() => {
            confetti.innerHTML = '';
        }, 5000);
    };

    const resetGame = () => {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        status.innerText = `${currentPlayer}'s turn`;
        cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('winning-cell');
        });
    
       
        confetti.innerHTML = '';
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(cell, index));
    });

    resetButton.addEventListener('click', resetGame);
});
