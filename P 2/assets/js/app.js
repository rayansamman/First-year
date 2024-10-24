// Prove that JavaScript is working in your browser. You may delete this.
console.log('JavaScript is working!');



const username = prompt('Please enter your name');
document.querySelector('#username').innerHTML = username;

const age = prompt('Please enter your age');
// Write the age to the DOM
document.querySelector('#age').innerHTML = age;

let cardClass, adviceText;
if (age < 18) {
  // Build the sorry message
  cardClass = 'has-background-grey-light';
  adviceText = `Sorry ${username}, you are not old enough to get a proper advice from us`;

} else {
  // Prompt for height and weight and build the advice
  const height = prompt('Please enter your height (in m, ie. 1.96)');
  const weight = prompt('Please enter your weight (in kg, ie. 89.3)');
  // Write user input to the DOM
  document.querySelector('#height').innerHTML = height;
  document.querySelector('#weight').innerHTML = weight;

  const bmi = weight / (height * height);
  const result = `Your BMI is: ${bmi}`;

  // Start with under weight
  cardClass = 'has-background-warning';
  let conclusion = 'You are under weight';
  let advice = 'Start with a personal trainer';
  if (bmi >= 18.5) {
    cardClass = 'has-background-success';
    conclusion = 'You have a normal weight';
    advice = 'Start with any programme';
  }
  if (bmi >= 25) {
    cardClass = 'has-background-warning';
    conclusion = 'You are slightly over weight';
    advice = 'Start with cardio training';
  }
  if (bmi >= 30) {
    cardClass = 'has-background-danger';
    conclusion = 'You are obese';
    advice = 'Start with a personal trainer';
  }

  adviceText = result + '<br/>' + conclusion + '<br/>' + advice;
}

// Write the outcome to the DOM
document.querySelector('#advice-card').className = 'box ' + cardClass;
document.querySelector('#advice-text').innerHTML = adviceText;