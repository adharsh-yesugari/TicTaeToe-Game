let boxes = document.querySelectorAll(".box");
let button = document.querySelector("#reset-btn");
let messageContainer = document.querySelector(".winner__container");
let message = document.querySelector("#message");
let newGameBtn = document.querySelector("#new__game__btn");
let resetBtn = document.querySelector("#reset__btn");

let playerX = true;
let count = 0;

//Winning Patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

// ResetButton condition
const resetGame = () =>{
    playerX = true;
    for(let box of boxes) {
        box.innerText = "";
        enableDiv(box);
    }
    messageContainer.classList.add("hide");
}

// Disable Boxes Condition
const disableBoxes = () => {
    for(let box of boxes) {
        disableDiv(box);
    }
}

// EnableBoxes Condition
function enableDiv(element) {
    element.classList.remove("disabled");
}

// Disable div Condition
function disableDiv(element) {
    element.classList.add('disabled');
}


// Assigning X or O and checking for Draw Condition
boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
        if(playerX) {
            box.innerText = "X";
            playerX = false;
        } else {
            box.innerText = "O";
            playerX = true;
        }
        count++;
        disableDiv(box);
        let isWinner = checkWinner();
        if(count === 9 && !isWinner) {
            draw("Game Draw");
        }
    });
});

// Display Winner Function
const showWinner = (winner) => {
    message.innerText = `Congo!! Winner ${winner}`;
    messageContainer.classList.remove("hide");
    disableBoxes();
}

//Display Draw Condition
const draw = (winner) => {
    message.innerText = `${winner}`;
    messageContainer.classList.remove("hide");
    disableBoxes();
}

// Check Winner Condition
const checkWinner = () => {
    for(let pattern of winPatterns) {
        let positionValue1 = boxes[pattern[0]].innerText;
        let positionValue2 = boxes[pattern[1]].innerText;
        let positionValue3 = boxes[pattern[2]].innerText;
        if(positionValue1 != "" && positionValue2 != "" && positionValue3 != "" ) {
            if(positionValue1 === positionValue2 && positionValue3 === positionValue1) {
                showWinner(positionValue1);
            } 
        }
    }
}

// New Game Button Function
newGameBtn.addEventListener("click", resetGame);

// Reset Button Function
resetBtn.addEventListener("click", resetGame);