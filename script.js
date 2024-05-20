board = [];

function createBoard(size) {
    board = [];
    for(let i = 0; i < size; i++) {
        arr = [];
        for(let j = 0; j < size; j++) {
            arr.push((Math.floor(Math.random() * 2)))
        }
        board.push(arr);
    }
    board = board;
}

function draw() {
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();    
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++) {
            if(board[i][j] == 0) {
                ctx.clearRect(i*10, j*10, 10, 10);
            } else {
                ctx.fillRect(i*10, j*10, 10, 10);
            }
        }
    }
    ctx.stroke();
}

function simulation() {
    setInterval(() => {
        for(let i = 1; i < board.length - 1; i++) {
            for(let j = 1; j < board[i].length - 1; j++) {
                neighbours = 0;
                neighbours += board[i-1][j-1];
                neighbours += board[i-1][j];
                neighbours += board[i-1][j+1];
                neighbours += board[i][j-1];
                neighbours += board[i][j+1];
                neighbours += board[i+1][j-1];
                neighbours += board[i+1][j];
                neighbours += board[i][j+1];
                if(neighbours < 2) {
                    board[i][j] = 0;
                } else if(neighbours == 3) {
                    board[i][j] = 1;
                } else if(neighbours > 3) {
                    board[i][j] = 0;
                }
            }    
        }
        draw();
    }, 1)
}

function setup() {
    size = 300;
    createBoard(size);
    canvas = document.getElementById("canvas");
    simulation();
}

window.addEventListener('load', function () {
    setup();
})