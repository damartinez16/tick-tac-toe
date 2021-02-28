/*----- constants -----*/
const colorLookUp = {
    null: 'white',
    '1': 'beige',
    '-1': 'lightcoral'
};
const winningComb = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], 
    [1,4,7], [2,5,8], [0,4,8], [2,4,6]];


 /*----- app's state (variables) -----*/
let board, turn, winner;

 /*----- cached element references -----*/
const msgEl = document.getElementById('msg');
const btn = document.querySelector('button');
const squares = [...document.querySelectorAll('.grid > div')];

/*----- event listeners -----*/
// This creates an event listener for all elements in squares array.
for (var i = 0; i < squares.length; i++)
{
    squares[i].addEventListener('click', handleClick);
}

btn.addEventListener('click', init);



/*----- functions -----*/
init();

function handleClick(evt) {
const idx = parseInt(evt.target.id.replace('s',''));
if (board[idx] || winner) return;
    board[idx] = turn;
    turn *= -1;
    winner = getWinner();
    render();
} 

function getWinner() {
    for (let i = 0; i < winningComb.length; i++) {
        if (Math.abs(board[winningComb[i][0]]
            + board[winningComb[i][1]]
            + board[winningComb[i][2]]) === 3)
            return board[winningComb[i][0]]; 
    }
    if (board.includes(null)) return null;
    return 'T';
}

function render() {
    board.forEach(function(sq, idx) {
        squares[idx].style.background = colorLookUp[sq];
    });
    if (winner === 'T') {
        msgEl.innerHTML = `IT'S A TIE!`;
    } else if (winner) {
        msgEl.innerHTML = `CONGRATS ${colorLookUp[winner].toUpperCase()}!`;
    } else {
        msgEl.innerHTML = `${colorLookUp[turn].toUpperCase()}'S TURN`;
    }
}

function init() {
    board = [null,null,null,null,null,null,null,null,null];
    turn = 1;
    winner = null;
    render();
}