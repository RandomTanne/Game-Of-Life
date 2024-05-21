let board = [];
const directions = [
    [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]
];
const speed = 100;
const pixelNumber = 100;
const canvasSize = 1000;
const pixelSize = canvasSize/pixelNumber;

function createBoard() {
    for(let i = 0; i < pixelNumber; i++) {
        let arr = [];
        for(let j = 0; j < pixelNumber; j++) {
            arr.push((Math.floor(Math.random() * 2)))
        }
        board.push(arr);
    }
}

function draw() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();    
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++) {
            if(board[i][j] == 0) {
                ctx.clearRect(i*pixelSize, j*pixelSize, pixelSize, pixelSize);
            } else {
                ctx.fillRect(i*pixelSize, j*pixelSize, pixelSize, pixelSize);
            }
        }
    }
    ctx.stroke();
}

function simulation() {
    setInterval(() => {
        const newBoard = board.map(arr => [...arr]);
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                let neighbours = 0;
                for(const direction of directions) {
                    const x = i + direction[0];
                    const y = j + direction[1];

                    if(x >= 0 && x < board.length && y >= 0 && y < board[i].length) {
                        neighbours += board[x][y];
                    }
                }
                if (board[i][j] == 1 && (neighbours < 2 || neighbours > 3)) {
                    newBoard[i][j] = 0;
                } else if (board[i][j] == 0 && neighbours == 3) {
                    newBoard[i][j] = 1;
                }
            }    
        }
        board = newBoard;
        draw();
    }, speed)
}

function setup() {
    const canvas = document.getElementById("canvas");
    canvas.height = canvasSize;
    canvas.width = canvasSize;
    createBoard();
    simulation();
}

window.addEventListener('load', function () {
    setup();
})