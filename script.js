let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.onclick = () => cellClick(i);
        cell.innerText = board[i];
        
        // تحديد لون النص بناءً على قيمة اللوح
        if (board[i] === 'X') {
            cell.classList.add('x');
        } else if (board[i] === 'O') {
            cell.classList.add('o');
        }
        
        boardElement.appendChild(cell);
    }
}

function startGame() {
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('board').classList.remove('hidden');
    gameActive = true;
    renderBoard();
}

function cellClick(index) {
    if (!gameActive || board[index] !== '') return;

    board[index] = currentPlayer;
    renderBoard();

    if (checkWinner()) {
        displayResult(`${currentPlayer} فاز!`);
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        displayResult('تعادل!');
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // الخطوط الأفقية
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // الخطوط الرأسية
        [0, 4, 8], [2, 4, 6]              // الخطوط القطرية
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
            return true; // يوجد فائز
        }
    }

    return false;
}

function displayResult(result) {
    document.getElementById('resultText').innerText = result;
    document.getElementById('resultModal').classList.remove('hidden');
}

function restartGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    renderBoard();
    document.getElementById('resultModal').classList.add('hidden');
}
