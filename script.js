// Function to update the current date and time
const updateTime = () => {
  const now = new Date();

  // Convert to PST (UTC-8) considering daylight saving time if applicable
  const offset = -8;
  const pst = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (offset * 3600000));

  const hours = String(pst.getHours()).padStart(2, '0');
  const minutes = String(pst.getMinutes()).padStart(2, '0');
  const seconds = String(pst.getSeconds()).padStart(2, '0');
  const currentTime = `${hours}:${minutes}:${seconds}`;

  const year = pst.getFullYear();
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const month = monthNames[pst.getMonth()];
  const day = String(pst.getDate()).padStart(2, '0');
  const currentDate = `${day} ${month} ${year}`;

  const currentTimeElement = document.getElementById('current-time');
  const currentDateElement = document.getElementById('current-date');

  if (currentTimeElement && currentDateElement) {
    currentTimeElement.innerText = currentTime;
    currentDateElement.innerText = currentDate;
    console.log('Time Updated:', currentTime, currentDate);
  } else {
    console.error('Date or Time element not found');
  }
};

// Function to type out text character by character
const typeText = (element, callback) => {
  const content = element.innerHTML;
  element.innerHTML = '';
  element.style.visibility = 'visible';
  let index = 0;

  const type = () => {
    let char = content.charAt(index);
    if (char === '<') {
      const endTag = content.indexOf('>', index) + 1;
      element.innerHTML += content.substring(index, endTag);
      index = endTag;
    } else {
      element.innerHTML += char;
      index++;
    }

    if (index < content.length) {
      setTimeout(type, 30);
    } else if (callback) {
      callback();
    }
  };

  console.log('Starting to type element:', element);
  type();
};

// Initialize the date-time update and typing effect
window.addEventListener('load', () => {
  // Update time immediately and then every second
  updateTime();
  setInterval(updateTime, 1000);

  const elementsToType = document.querySelectorAll('.type-effect');
  elementsToType.forEach(element => element.style.visibility = 'hidden');

  let index = 0;
  const typeNextElement = () => {
    if (index < elementsToType.length) {
      const currentElement = elementsToType[index];
      console.log('Typing element:', currentElement);
      typeText(currentElement, () => {
        console.log('Finished typing element:', currentElement);
        index++;
        typeNextElement();
      });
    } else {
      console.log('All elements typed.');
    }
  };

  console.log('Starting to type elements');
  typeNextElement();
});
