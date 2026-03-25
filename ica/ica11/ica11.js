// Complete variable definitions and random functions

const customName = document.getElementById("custom-name");
const generateBtn = document.querySelector(".generate");
const story = document.querySelector(".story");

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// Raw text strings

const characters = ["the hat man", "a drag queen", "some dude"];

const places = ["a dark corner", "the top of a moving bullet train", "the titanic, mid sink"];

const events = [
    "started spontaneously Irish dancing", 
    "did a backflip", 
    "did the thing.."
];

// Partial return random string function

function returnRandomStoryString() {
    const randomCharacter = randomValueFromArray(characters);
    const randomPlace = randomValueFromArray(places);
    const randomEvent = randomValueFromArray(events);

    storyText = `It was 94 Fahrenheit outside, so ${randomCharacter} took a trip to ${randomPlace}. On the way, however, they ran into Bob, then ${randomEvent}. Deciding they wanted to gome home rather than continuing on to ${randomPlace}, they left the scene without a word. Bob was confused and just stood there, primarily because ${randomCharacter} had blown up 8 years prior. uhhhhhhhhh 300 pounds.`

  return storyText;
}

// Event listener and partial generate function definition

generateBtn.addEventListener("click", generateStory);

function generateStory() {

  let newStory = returnRandomStoryString();
  
  if (customName.value !== "") {
    const name = customName.value;
    newStory = newStory.replace("Bob", name);
  }

  
  if (document.getElementById("uk").checked) {
    const weight = `${Math.round(300/14)} stone`;
    const temperature = `${Math.round((94-32) * (5/9))} Celsius`;
    newStory = newStory.replace("300 pounds", weight);
    newStory = newStory.replace("94 Fahrenheit", temperature);
  }

  // TODO: replace "" with the correct expression
  story.textContent = newStory;
  story.style.visibility = "visible";
}