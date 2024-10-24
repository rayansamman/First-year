// Step 1: Prompt the user for their name and duration in minutes
const userName = window.prompt("What is your name?", "Harry Potter");
const durationInMinutes = parseInt(window.prompt("Enter the duration in minutes:", "100"));

// Step 2: Calculate hours and minutes
const hours = Math.floor(durationInMinutes / 60); // Calculate hours
const minutes = durationInMinutes % 60; // Calculate remaining minutes

// Step 3: Write the output to the document
document.write("Hello " + userName + "<br>"); // Output the greeting
document.write(hours + " hours and " + minutes + " minutes"); // Output the duration
