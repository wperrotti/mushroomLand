// Hello, I am Wendy Diaz-Wilson, and this is my whimsical project thus far (:
// Goal: create a mushroom hell, and make the user live the moment over and over again so they want to escape to a new room bwahahaha.

let forrestimg;          // Variable to hold the background forest image
let rabbitimg;           // Variable to hold the rabbit cursor image
let mushroomImgs = [];   // Array to hold different mushroom images
let mushrooms = [];      // Array for mushroom objects
let collectedMushrooms = 0; // Counter for mushrooms collected
let timeLimit = 30;      // Time limit for the game (in seconds)
let startTime;           // Start time of the game

// Sound variables
let laughSound;          // Sound effect for when the rabbit collects a mushroom
let backgroundMusic;     // Background music for the game

// Preload images and sounds before the game starts
function preload() {
  forrestimg = loadImage('forrest.jpeg');               // Load forest background image
  rabbitimg = loadImage('rabbitimg2.png');              // Load rabbit cursor image
  mushroomImgs.push(loadImage('mushroom1.png'));        // Load first mushroom image
  mushroomImgs.push(loadImage('mushroom2.png'));        // Load second mushroom image
  
  // Load sound files
  laughSound = loadSound('short-high-pitched-laugh.mp3');    // Load laugh sound
  backgroundMusic = loadSound('shimmering-object.mp3');      // Load background music
}

function setup() {
  createCanvas(1000, 600); // Set canvas size
  noCursor();              // Hide the default mouse cursor
  startTime = millis();    // Record the start time of the game

  // Play background music on loop as soon as the game starts
  backgroundMusic.loop();

  // Initialize mushrooms with random positions and properties
  for (let i = 0; i < 10; i++) {  // Create 10 mushroom objects
    mushrooms.push({
      x: random(width),          // Random x-coordinate
      y: random(height),         // Random y-coordinate
      img: random(mushroomImgs), // Randomly select a mushroom image
      visible: false,            // Initial visibility is false (hidden)
      timer: random(1000, 3000), // Random interval for appearing/disappearing
      collected: false           // Track if mushroom is collected
    });
  }
}

function draw() {
  image(forrestimg, 0, 0, width, height); // Draw the forest background image
  
  // Display rabbit image at mouse position as a custom cursor
  let bunnyWidth = 200;       // Width of the rabbit image
  let bunnyHeight = 100;      // Height of the rabbit image
  image(rabbitimg, mouseX - bunnyWidth / 2, mouseY - bunnyHeight / 2, bunnyWidth, bunnyHeight);

  // Display mushroom collection count
  textSize(24);               // Set font size for counter text
  fill(255);                  // Set color to white for "Mushrooms Collected: "
  text("Mushrooms Collected:", 20, 30); // Display label at fixed position
  fill(255, 0, 0);            // Set color to red for the number counter
  text(collectedMushrooms, 270, 30); // Display count to the right of label

  // Handle mushroom visibility and interactions
  for (let mushroom of mushrooms) {
    if (!mushroom.collected) {
      // Toggle visibility based on random timer
      if (millis() % mushroom.timer < 50) {
        mushroom.visible = !mushroom.visible;
      }

      // Draw mushroom if visible and not yet collected
      if (mushroom.visible) {
        image(mushroom.img, mushroom.x, mushroom.y, 80, 80); // Draw mushroom at larger size

        // Check if rabbit cursor overlaps with mushroom
        if (dist(mouseX, mouseY, mushroom.x, mushroom.y) < 40) { // Collision detection
          mushroom.collected = true;   // Mark as collected
          mushroom.visible = false;    // Hide mushroom after collection
          collectedMushrooms++;        // Increment mushroom counter

          // Play laugh sound on each collection
          laughSound.play();
        }
      }
    }
  }

  // Check if player has collected enough mushrooms within time limit
  let elapsedTime = (millis() - startTime) / 1000; // Calculate elapsed time in seconds
  if (collectedMushrooms >= 10 && elapsedTime < timeLimit) {
    textSize(32);                // Set larger font size for end message
    fill(255);                   // Set text color to white
    textAlign(CENTER, CENTER);   // Center the message
    text("You've collected enough mushrooms! Next scene!", width / 2, height / 2); // Display message
    backgroundMusic.stop();      // Stop background music
    noLoop();                    // Stop draw loop to end the game
  } else if (elapsedTime >= timeLimit) { // Time limit reached without enough mushrooms
    textSize(32);
    fill(255, 0, 0);             // Set text color to red for time-up message
    textAlign(CENTER, CENTER);   // Center the message
    text("Time's up! Try again!", width / 2, height / 2);
    backgroundMusic.stop();      // Stop background music
    noLoop();                    // Stop draw loop to end the game
  }
}


