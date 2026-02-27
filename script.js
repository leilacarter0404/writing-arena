let timer;
let timeLeft = 1200;
let currentRound = 1;
let totalScore = 0;
let sessionScores = [];

function startGame() {

    clearInterval(timer);

    if (currentRound > 6) {
        alert("Tournament already completed.");
        return;
    }

    const genre = document.getElementById("genre").value;
    const difficulty = document.getElementById("difficulty").value;
    const chaos = document.getElementById("chaosMode").checked;

    let chosenPrompt;

    if (currentRound === 6) {
        const index = Math.floor(Math.random() * finalRoundPrompts.length);
        chosenPrompt = finalRoundPrompts[index];
    } else {
        const selectedPrompts = prompts[genre][difficulty];
        const index = Math.floor(Math.random() * selectedPrompts.length);
        chosenPrompt = selectedPrompts[index];
    }

    if (chaos && currentRound !== 6) {
        const chaosIndex = Math.floor(Math.random() * chaosConstraints.length);
        chosenPrompt += " | CHAOS: " + chaosConstraints[chaosIndex];
    }

    document.getElementById("prompt-text").innerText =
        "Round " + currentRound + ": " + chosenPrompt;

    document.getElementById("story").value = "";
    document.getElementById("story").disabled = false;
    document.getElementById("word-count").innerText = "Words: 0";

    timeLeft = currentRound === 6 ? 1200 : 1200;

    timer = setInterval(updateTimer, 1000);
}

function startLightning() {

    clearInterval(timer);

    const index = Math.floor(Math.random() * lightningPrompts.length);
    const chosenPrompt = lightningPrompts[index];

    document.getElementById("prompt-text").innerText =
        "⚡ LIGHTNING ROUND: " + chosenPrompt;

    document.getElementById("story").value = "";
    document.getElementById("story").disabled = false;
    document.getElementById("word-count").innerText = "Words: 0";

    timeLeft = 300; // 5 minutes

    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("timer").innerText =
        minutes + ":" + seconds;

    timeLeft--;

    if (timeLeft < 0) {
        clearInterval(timer);
        document.getElementById("story").disabled = true;
        alert("Time's up! Submit your story.");
    }
}

document.getElementById("story").addEventListener("input", function () {

    const text = this.value.trim();
    const wordCount = text === "" ? 0 : text.split(/\s+/).length;

    document.getElementById("word-count").innerText =
        "Words: " + wordCount;
});

function submitStory() {

    const text = document.getElementById("story").value.trim();
    const wordCount = text === "" ? 0 : text.split(/\s+/).length;

    if (wordCount < 175) {
        alert("Minimum 175 words required.");
        return;
    }

    if (wordCount > 600) {
        alert("Maximum 600 words exceeded.");
        return;
    }

    const roundScore = Math.floor(Math.random() * 10) + 1; // Temporary scoring logic

    totalScore += roundScore;
    sessionScores.push(roundScore);

    currentRound++;

    if (currentRound > 6) {
        endTournament();
    } else {
        alert("Round submitted! Score: " + roundScore + "/10");
    }
}

function endTournament() {

    const summary =
        "Tournament Complete!\n\n" +
        "Round Scores: " + sessionScores.join(", ") + "\n" +
        "Total Score: " + totalScore;

    localStorage.setItem("lastSessionScore", totalScore);

    alert(summary);

    currentRound = 1;
    totalScore = 0;
    sessionScores = [];
}
