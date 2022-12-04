// Animate the text by typing it out one character at a time
const animateText = (element) => {
    // Get the text to animate
    let text = element.innerText;
  
    // Clear the element's text
    element.innerText = "";
  
    // Create a cursor element
    let cursor = document.createElement("span");
    cursor.classList.add("cursor");
    cursor.innerText = "|";
  
    // Append the cursor to the element
    element.appendChild(cursor);
  
    // Create a sound element
    let audio = new Audio("type.mp3");
    audio.volume = 0.25;
  
    // Animate the text one character at a time, including whitespace characters
    let i = 0;
    let interval = setInterval(() => {
      if (i < text.length) {
        // Move the cursor to the end of the text
        cursor.remove();
  
        // Add a non-breaking space character for each whitespace character
        let char = text[i];
        if (char === " ") {
          char = "&nbsp;";
        }
        element.innerHTML += char;
  
        element.appendChild(cursor);
  
        // Play the sound
        audio.currentTime = 0;
        audio.play();
  
        i++;
      } else {
        // Remove the cursor
        cursor.remove();
        clearInterval(interval);
        element.removeAttribute("style");
      }
    }, 75);
  };
  
  // Select all elements with the class "animate-text"
  let elements = document.querySelectorAll(".animate-text");
  
  // Animate the text for each element
  elements.forEach((element) => animateText(element));  
  
  

// Select all elements with the class "animate-text"
// let elements = document.querySelectorAll(".animate-text");

// Animate the text for each element
// elements.forEach((element) => animateText(element));

window.addEventListener("load", async () => {
    // Select all elements that contain text
    let elements = document.querySelectorAll("body *");
  
    // Animate the text in each element one after another
    let delay = 500;
    for (const element of elements) {
      // Wait for the animation to complete
      await new Promise((resolve) => {
        setTimeout(() => {
          animateText(element);
          resolve();
        }, delay);
      });
  
      // Increase the delay by 500ms for each element
      delay += 500;
    }
  });
  
  
  
