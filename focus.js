const gamecontain = document.getElementById('gameContain');
const scoreDisplay = document.getElementById('score');
const popSound = document.getElementById('popSound');
const gameOverMessage = document.getElementById('gameOver');
const restartBtn = document.getElementById('restartBtn');

let score = 0;
let bubbleInterval = null;
let floatDuration = 5000; // initial float duration in ms

// Pop bubble handler
function popBubble(event) {
  event.stopPropagation();
  popSound.currentTime = 0;
  popSound.play();

  score++;
  scoreDisplay.textContent = score;

  // Increase speed every 10 points
  if (score % 10 === 0 && floatDuration > 1000) {
    floatDuration -= 500; // speed up by reducing float duration
  }

  gamecontain.removeChild(event.currentTarget);
}

// Create a bubble with animation duration based on floatDuration
function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  // Random horizontal position inside container
  const maxLeft = gamecontain.clientWidth - 80; // 80px bubble width
  const randomLeft = Math.random() * maxLeft;
  bubble.style.left = `${randomLeft}px`;
  bubble.style.bottom = '0px';

  // Set animation duration dynamically
  bubble.style.animation = `floatUp ${floatDuration}ms linear forwards`;

  // Click/tap to pop bubble
  bubble.addEventListener('click', popBubble);
  bubble.addEventListener('touchstart', popBubble);

  // When animation ends, if bubble still exists, game over
  bubble.addEventListener('animationend', () => {
    if (bubble.parentElement) {
      // Bubble reached top without popping -> game over
      endGame();
    }
  });

  gamecontain.appendChild(bubble);
}

// Start bubbles creation interval
function startGame() {
  score = 0;
  floatDuration = 5000;
  scoreDisplay.textContent = score;
  gameOverMessage.style.display = 'none';

  // Clear any leftover bubbles
  const existingBubbles = document.querySelectorAll('.bubble');
  existingBubbles.forEach(bubble => bubble.remove());

  // Start interval to create bubbles
  bubbleInterval = setInterval(createBubble, 800);
}

// Stop game and show game over screen
function endGame() {
  clearInterval(bubbleInterval);

  // Remove remaining bubbles
  const remainingBubbles = document.querySelectorAll('.bubble');
  remainingBubbles.forEach(bubble => bubble.remove());

  gameOverMessage.style.display = 'block';
}

// Restart button handler
restartBtn.addEventListener('click', startGame);

// Start the game for the first time
startGame();
