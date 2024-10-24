/**
 * This variable represents the entire list of race data. It calls the 
 * `fetchFormula1Data()` function that builds a (random) datastructure. You are
 * supposed to work with this variable in your project.
 * 
 * WARNING: do not change or delete this code
 */
const racedata = fetchFormula1Data();

/**
 * Initializes the app. This function is called when the page is fully loaded
 * (the window load event).
 */
function init() {
  //TODO initialize the application here
}
// REgister the `init` function on the load event (when the DOM is ready). 
window.addEventListener('load', init);

/**
 * Initializes the app. This function is called when the page is fully loaded
 * (the window load event).
 */
function init() {
  displayDriverOverview();
  populateDriverDropdown();
  document.getElementById('submit').addEventListener('click', handleAddLapTime);
}

/**
 * Displays an overview of the drivers and their total race time.
 */
function displayDriverOverview() {
  const lapsTableBody = document.getElementById('laps');
  lapsTableBody.innerHTML = ''; // Clear any existing rows

  racedata.forEach(driver => {
    const totalTime = driver.laps.reduce((sum, lap) => sum + lap, 0);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${driver.driver}</td>
      <td class="time">${formatTime(totalTime)}</td>
    `;
    lapsTableBody.appendChild(row);
  });

  updateFastestLap();
}

/**
 * Populates the dropdown with driver names.
 */
function populateDriverDropdown() {
  const driverDropdown = document.getElementById('driver');
  driverDropdown.innerHTML = ''; // Clear existing options

  racedata.forEach(driver => {
    const option = document.createElement('option');
    option.value = driver.carNumber;
    option.text = driver.driver;
    driverDropdown.appendChild(option);
  });
}

/**
 * Handles adding a new lap time for the selected driver.
 */
function handleAddLapTime() {
  const userInput = getUserInput();
  const selectedDriver = racedata.find(driver => driver.carNumber === userInput.carNumber);

  if (selectedDriver && !isNaN(userInput.lapTime)) {
    selectedDriver.laps.push(userInput.lapTime);
    displayDriverOverview(); // Refresh the overview to reflect new lap times
  } else {
    alert('Please provide a valid lap time.');
  }
}

/**
 * Updates the fastest lap section with the fastest lap time and driver.
 */
function updateFastestLap() {
  let fastestTime = Infinity;
  let fastestDriver = null;

  racedata.forEach(driver => {
    driver.laps.forEach(lap => {
      if (lap < fastestTime) {
        fastestTime = lap;
        fastestDriver = driver.driver;
      }
    });
  });

  if (fastestDriver !== null) {
    const fastestRow = document.getElementById('fastest');
    fastestRow.innerHTML = `
      <td>${fastestDriver}</td>
      <td class="time">${formatTime(fastestTime)}</td>
    `;
  }
}

/**
 * Formats time in seconds to `mm:ss.sss` format.
 * @param {number} timeInSeconds The time in seconds.
 * @returns {string} The formatted time string.
 */
function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = (timeInSeconds % 60).toFixed(3);
  
  return minutes > 0 ? `${minutes}:${seconds.padStart(6, '0')}` : `${seconds}`;
}
