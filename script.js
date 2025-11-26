// Function to update the current date and time
const updateTime = () => {
  const now = new Date();
  const options = { timeZone: 'America/Los_Angeles', hour12: false };
  const currentTime = now.toLocaleTimeString('en-US', options);
  const currentDate = now.toLocaleDateString('en-US', { ...options, month: 'short', day: '2-digit', year: 'numeric' });

  const timeElement = document.getElementById('current-time');
  const dateElement = document.getElementById('current-date');

  if (timeElement) timeElement.textContent = currentTime;
  if (dateElement) dateElement.textContent = currentDate.toUpperCase();
};

// Function to type out text character by character
const typeText = (element, callback) => {
  if (!element) {
    console.error('Element not found');
    if (callback) callback();
    return;
  }

  console.log('Starting to type:', element.innerHTML);
  const html = element.innerHTML;
  element.innerHTML = '';
  element.style.visibility = 'visible';

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  const nodes = Array.from(tempDiv.childNodes);

  let nodeIndex = 0;
  let charIndex = 0;

  const type = () => {
    if (nodeIndex < nodes.length) {
      const node = nodes[nodeIndex];
      if (node.nodeType === Node.TEXT_NODE) {
        if (charIndex < node.length) {
          element.appendChild(document.createTextNode(node.textContent[charIndex]));
          charIndex++;
        } else {
          nodeIndex++;
          charIndex = 0;
        }
      } else {
        element.appendChild(node.cloneNode(true));
        nodeIndex++;
      }
      setTimeout(type, 30);
    } else {
      console.log('Finished typing:', html);
      element.classList.remove('typing');
      if (callback) {
        setTimeout(callback, 500);
      }
    }
  };

  element.classList.add('typing');
  type();
};

// Initialize the date-time update and typing effect
window.addEventListener('load', () => {
  console.log('Page loaded');
  updateTime();
  setInterval(updateTime, 1000);

  const elementsToType = document.querySelectorAll('.type-effect');
  console.log('Elements to type:', elementsToType.length);

  let index = 0;
  const typeNextElement = () => {
    if (index < elementsToType.length) {
      const element = elementsToType[index];
      if (element) {
        element.style.visibility = 'hidden';
        typeText(element, () => {
          index++;
          typeNextElement();
        });
      } else {
        console.error('Element at index', index, 'not found');
        index++;
        typeNextElement();
        }
    } else {
      console.log('All elements typed');
    }
  };

  typeNextElement();
});
