// Variables to hold the score and the current dice values
let score1 = 0;
let score2 = 0;

// Roll Dice Button
const rollDiceBtn = document.getElementById("rollDiceBtn");
const resetBtn = document.getElementById("resetBtn");

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function showDiceValue(diceElement, value) {
    diceElement.textContent = value;
    diceElement.classList.remove("spin");
    void diceElement.offsetWidth; // Trick to restart animation
    diceElement.classList.add("spin");
}

rollDiceBtn.addEventListener("click", function () {
    // Roll dice for both players with a delay to simulate dice spinning
    let dice1Value = rollDice();
    let dice2Value = rollDice();

    // Update the dice elements with the rolled values
    const dice1 = document.getElementById("dice1");
    const dice2 = document.getElementById("dice2");

    setTimeout(() => {
        showDiceValue(dice1, dice1Value);
        showDiceValue(dice2, dice2Value);

        // Update the scores
        score1 += dice1Value;
        score2 += dice2Value;

        // Display the updated scores
        document.getElementById("score1").textContent = score1;
        document.getElementById("score2").textContent = score2;

        // Check if there is a winner
        if (score1 >= 20) {
            document.getElementById("winner").textContent = "Player 1 Wins!";
            rollDiceBtn.disabled = true;
        } else if (score2 >= 20) {
            document.getElementById("winner").textContent = "Player 2 Wins!";
            rollDiceBtn.disabled = true;
        }
    }, 800); // Simulate dice rolling delay
});

// Reset the game
resetBtn.addEventListener("click", function () {
    score1 = 0;
    score2 = 0;
    document.getElementById("score1").textContent = score1;
    document.getElementById("score2").textContent = score2;
    document.getElementById("dice1").textContent = "1";
    document.getElementById("dice2").textContent = "1";
    document.getElementById("winner").textContent = "";
    rollDiceBtn.disabled = false;
});
