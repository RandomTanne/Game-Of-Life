let board = [];
const directions = [
    [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]
];
const size = 100;
const pixleSize = 1000/size;

function createBoard() {
    for(let i = 0; i < size; i++) {
        arr = [];
        for(let j = 0; j < size; j++) {
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
                ctx.clearRect(i*pixleSize, j*pixleSize, pixleSize, pixleSize);
            } else {
                ctx.fillRect(i*pixleSize, j*pixleSize, pixleSize, pixleSize);
            }
        }
    }
    ctx.stroke();
}

function simulation() {
    setInterval(() => {
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                neighbours = 0;
                for(const direction of directions) {
                    const x = i + direction[0];
                    const y = j + direction[1];

                    if(x >= 0 && x < board.length && y >= 0 && y < board[i].length) {
                        neighbours += board[x][y];
                    }
                }
                if(neighbours < 2 || neighbours > 3) {
                    board[i][j] = 0;
                } else if(neighbours == 3) {
                    board[i][j] = 1;
                }
            }    
        }
        draw();
    }, 1)
}

function setup() {
    createBoard();
    simulation();
}

window.addEventListener('load', function () {
    setup();
})