/******************************************************************************
 * Programming Basics Weekly Assignment - 80s Extravaganza
 * ----------------------------------------------------------------------------
 * Instructions:
 * - This is the starter code for your project.
 * - You are required to complete the tasks as per the guidelines and 
 *   instructions provided.
 * 
 * Good luck!
 ******************************************************************************/
// This is the dataset of quirky music videos that you are required to use in 
// this assignment. 
// For more details, see the `dataset.js` file
const database = quirkyVideoDatabaseObject;

window.addEventListener('load', onWindowLoad);

/**
 * Event handler callback for the window load event (when the DOM is ready).
 */
function onWindowLoad() {const videos = database.videos;

  // Sort videos by title
  videos.sort((a, b) => a.title.localeCompare(b.title));

  // Add all videos to DOM
  videos.forEach(video => {
    addVideoToDOM(video);
  });

  // Calculate and display the total airtime
  const totalDuration = calculateTotalDuration(videos);
  document.getElementById('airtime').innerText = formatDuration(totalDuration);
  
  // Add event listener for adding a new video
  document.getElementById('add-button').addEventListener('click', function() {
    addNewVideo();
  });
}

/**
 * Adds a new video to the playlist based on user input
 */
function addNewVideo() {
  // Get input values
  const videoId = document.getElementById('video-id').value.trim();
  const artist = document.getElementById('artist').value.trim();
  const title = document.getElementById('title').value.trim();
  const duration = document.getElementById('duration').value.trim();

  // Validate inputs
  if (!isValidInput(videoId, artist, title, duration)) {
    alert('Please provide valid input for all fields.');
    return;
  }

  // Create new video object
  const newVideo = {
    artist: artist,
    title: title,
    duration: parseInt(duration, 10),
    videoId: videoId
  };

  // Add to database and DOM
  database.videos.push(newVideo);
  addVideoToDOM(newVideo);

  // Update the airtime
  const totalDuration = calculateTotalDuration(database.videos);
  document.getElementById('airtime').innerText = formatDuration(totalDuration);

  // Clear input fields
  document.getElementById('video-id').value = '';
  document.getElementById('artist').value = '';
  document.getElementById('title').value = '';
  document.getElementById('duration').value = '';
}

/**
 * Validate user inputs
 */
function isValidInput(videoId, artist, title, duration) {
  if (videoId.length !== 11) return false;
  if (artist.length < 3) return false;
  if (title.length < 3) return false;
  if (isNaN(duration) || parseInt(duration) <= 0) return false;
  return true;
}

/**
 * Adds a video element to the DOM
 */
function addVideoToDOM(video) {
  const playlistDiv = document.getElementById('playlist');

  // Create the video card element
  const videoCard = document.createElement('article');
  videoCard.className = 'card m-2 p-2';

  // Set the inner HTML to create the video card structure
  videoCard.innerHTML = `
    <div class="media">
      <div class="media-left">
        <p class="image is-64x64">
          <img src="https://img.youtube.com/vi/${video.videoId}/0.jpg">
        </p>
      </div>
      <div class="media-content">
        <div class="content">
          <a href="https://youtu.be/${video.videoId}" target="_blank">
            <strong>${video.artist}</strong> - ${video.title}
          </a>
        </div>
      </div>
      <div class="media-right">
        <span class="has-text-grey-light">${formatDuration(video.duration)}</span>
      </div>
    </div>
  `;
  playlistDiv.appendChild(videoCard);
}

/**
 * Calculate total duration of videos
 */
function calculateTotalDuration(videos) {
  return videos.reduce((total, video) => total + video.duration, 0);
}

/**
 * Format seconds to 'hours:minutes:seconds'
 */
function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return (hours > 0 ? hours + ':' : '') + 
         (minutes < 10 && hours > 0 ? '0' : '') + minutes + 
         ':' + (secs < 10 ? '0' : '') + secs;
}