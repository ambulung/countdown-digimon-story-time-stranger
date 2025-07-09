import './style.css'; // Import the CSS file

// Get references to the HTML elements
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const countdownContainer = document.getElementById('countdown-container');
const releaseDateDisplay = document.getElementById('release-date-display'); // Element for formatted date
const releaseInfo = document.getElementById('release-info'); // Parent of releaseDateDisplay

// Set the target date for Digimon: Time Stranger release
// Month is 0-indexed, so October is 9.
// We set it to 00:00:00 on October 2, 2025.
const releaseDate = new Date('October 2, 2025 00:00:00').getTime();

// Function to format the date as DD/MM/YYYY
function formatReleaseDate(timestamp) {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Display the formatted release date
releaseDateDisplay.textContent = formatReleaseDate(releaseDate);


function updateCountdown() {
  const now = new Date().getTime();
  const distance = releaseDate - now;

  // Check if the countdown is over
  if (distance < 0) {
    clearInterval(countdownInterval); // Stop the interval
    countdownContainer.innerHTML = '<h2>🎉 THE DIGITAL WORLD AWAITS! 🎉</h2>';
    releaseInfo.id = 'release-message'; // Change ID to apply new 'out now' styles
    releaseInfo.textContent = 'DIGIMON: TIME STRANGER IS OUT NOW! GO PLAY!';
    return;
  }

  // Calculate time units
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the results, ensuring two digits (e.g., 05 instead of 5)
  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

// Call the function once immediately to avoid a 1-second delay before first display
updateCountdown();

// Update the countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);