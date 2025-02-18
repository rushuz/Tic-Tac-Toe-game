let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let winSound = document.querySelector("#winSound");

let turnO = true; // True for 'O', False for 'X'
let gameOver = false; // Flag to check if game is over

const winpatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Function to start confetti effect
const startConfetti = () => {
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }, // Starts from the middle-top
    });
};

// Function to check for a winner or a draw
const checkWinner = () => {
    for (let pattern of winpatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            setTimeout(() => {
                alert(`🎉 Congratulations! Player ${pos1} Wins! 🎊`);
                startConfetti(); // Trigger confetti
                winSound.play(); // Play winning sound
                reset.innerText = "New Game"; // Change button text
            }, 300);

            // Disable all boxes after a win
            boxes.forEach((box) => (box.disabled = true));
            gameOver = true;
            return;
        }
    }

    // Check if all boxes are filled (Draw Condition)
    if (![...boxes].some((box) => box.innerText === "")) {
        setTimeout(() => {
            alert("😔 Better luck next time! It's a Draw!");
            reset.innerText = "New Game"; // Change button text
        }, 300);
        gameOver = true;
    }
};

// Adding event listeners to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!gameOver && box.innerText === "") { // Prevent overwriting & only allow play if game is active
            box.classList.add("flip"); // Add flip animation
            
            setTimeout(() => {
                box.innerText = turnO ? "O" : "X";
                box.classList.add(turnO ? "O" : "X"); // Add O or X class for color
                box.disabled = true; // Disable clicked box
                turnO = !turnO;
                checkWinner(); // Check for winner or draw
            }, 300); // Delay to match flip animation
        }
    });
});

// Reset/New Game Button
reset.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
        box.classList.remove("O", "X"); // Remove O or X class
        box.classList.remove("flip"); // Remove flip effect
    });
    turnO = true;
    gameOver = false;
    reset.innerText = "Reset Game"; // Reset button text
});
