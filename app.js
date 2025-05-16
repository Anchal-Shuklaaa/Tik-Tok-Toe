let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#rst-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // player O starts
let count = 0; // to track number of moves

const WinPatterns = [
    [0, 1, 2],  // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],  // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],  // diagonals
    [2, 4, 6]
];

// Reset game function
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Disable all boxes (buttons)
const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

// Enable and clear all boxes
const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Show winner message and disable board
const showWinner = (winner) => {
    msg.innerText = `Congratulations!...winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Show draw message and disable board
const gameDraw = () => {
    msg.innerText = `Game was Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Check if someone won
const checkWinner = () => {
    for(let pattern of WinPatterns){
        let [a, b, c] = pattern;
        let valA = boxes[a].innerText;
        let valB = boxes[b].innerText;
        let valC = boxes[c].innerText;

        if(valA !== "" && valA === valB && valB === valC){
            showWinner(valA);
            return true;
        }
    }
    return false;
};

// Click event on each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(box.innerText !== "") return;  // Prevent clicking an already filled box

        box.innerText = turnO ? "O" : "X";
        box.disabled = true;
        count++;
        if(checkWinner()) return;  // If winner found, stop further moves

        if(count === 9){
            gameDraw(); // If all boxes filled and no winner, draw
        }

        turnO = !turnO;  // Toggle turn
    });
});

// Button event listeners
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
