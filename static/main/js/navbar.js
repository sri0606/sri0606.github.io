//handler for menu button click
function OnClick() {
  const dropdown = document.getElementById("myDropdown");
  dropdown.classList.toggle("show");

  // If the dropdown is shown, and the window width becomes greater than 650px,
  // hide the dropdown again.
  if (window.innerWidth > 650 && dropdown.classList.contains("show")) {
    dropdown.classList.remove("show");
  }
}


window.onclick = function(event) {
  if (!event.target.matches('.menu-button')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

//if screen is resized to width greater than 650px
document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener("resize", function() {
    if (window.innerWidth > 650) {
      document.getElementById("myDropdown").classList.remove("show");
    }
  });
});


// Select the element
const element = document.querySelector('.my-name');

// Create the observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    // Add the 'active' class to the element when it's in view
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
});

// Observe the element
observer.observe(element);
