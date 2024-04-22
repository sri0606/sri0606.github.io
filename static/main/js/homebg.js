// Array of background images
var bgImages = [
    'url("static/main/images/homebg1.jpg")',
    'url("static/main/images/homebg2.jpg")',
    'url("static/main/images/homebg3.jpg")',
    'url("static/main/images/homebg4.png")',
    'url("static/main/images/homebg5.jpg")',
    // Add more images as needed
  ];
  
  // Get the .right-column-home element
  var element1 = document.querySelector('.right-column-home');
  
  // Function to change the background image
  function changeBgImage() {
    // Get a random index
    var index = Math.floor(Math.random() * bgImages.length);
  
    // Set the background image
    element1.style.backgroundImage = bgImages[index];
  }
  
  // Change the background image every 5 seconds (5000 milliseconds)
  setInterval(changeBgImage, 60000);