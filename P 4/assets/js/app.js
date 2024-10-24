// Constants defining trophies and monster images
const trophies = ['🍓', '🌽', '🧱', '🐴', '🏆'];
const monsterImages = [
  'assets/img/horns_skull.png',
  'assets/img/fire_horns.png',
  'assets/img/green_blob.png',
  'assets/img/pink_monster.png',
  'assets/img/red_zombie.png'
];

// Keep track of clicks to award trophies
let clickCount = 0;

window.addEventListener('load', function () {
  const playfield = document.getElementById('playfield');
  const trophyContainer = document.getElementById('trophies');
  trophyContainer.innerHTML = ""; // Initialize empty trophy container

  // Add monsters to the playfield
  monsterImages.forEach((imageUrl) => {
    const monster = createMonsterElement(imageUrl);
    playfield.appendChild(monster);

    // Add click event listener to handle user clicks
    monster.addEventListener('click', function () {
      handleMonsterClick(monster);
    });
  });
});

// Function to create a monster <img> element
function createMonsterElement(imageUrl) {
  const monster = document.createElement('img');
  monster.src = imageUrl;
  monster.classList.add('playfield_item');
  // Set random position within playfield
  monster.style.position = 'absolute';
  monster.style.top = randomIntBetween(0, 90) + "%";
  monster.style.left = randomIntBetween(0, 90) + "%";
  return monster;
}

// Function to handle the click on a monster
function handleMonsterClick(monster) {
  clickCount++; // Increment click count

  // Relocate the monster to a new random position
  monster.style.top = randomIntBetween(0, 90) + "%";
  monster.style.left = randomIntBetween(0, 90) + "%";

  // Check if a trophy needs to be awarded
  awardTrophy(clickCount);
}

// Function to award trophies based on the number of clicks
function awardTrophy(clickCount) {
  const trophyContainer = document.getElementById('trophies');

  // Award a trophy at specific click milestones
  switch (clickCount) {
    case 10:
      addTrophyToDOM('🍓');
      break;
    case 50:
      addTrophyToDOM('🌽');
      break;
    case 100:
      addTrophyToDOM('🧱');
      break;
    case 150:
      addTrophyToDOM('🐴');
      break;
    case 250:
      addTrophyToDOM('🏆');
      alert("Congratulations! You've earned the final trophy!"); // Fun message
      break;
  }
}

// Helper function to add a trophy to the DOM
function addTrophyToDOM(trophy) {
  const trophyContainer = document.getElementById('trophies');
  const trophyElement = document.createElement('span');
  trophyElement.innerHTML = trophy;
  trophyContainer.appendChild(trophyElement);
}

// Function to generate a random integer between two values (inclusive)
function randomIntBetween(lower, upper) {
  return Math.round(lower + (upper - lower) * Math.random());
}
