var ColorThief = require("./color-thief");
var colorThief = new ColorThief();
var input = document.getElementById("input");
var file = document.getElementById('file');
var header = document.getElementById('header');
var display = document.getElementById("display");
var cardDisplay = document.getElementById("carddisplay");
var cardDiv = document.getElementById("cardDiv");
var image = new Image();

input.addEventListener("keypress", renderURLdisplay);
file.addEventListener('change', renderFileDisplay);

function renderURLdisplay (e) {
  if (e.which === 13) {
    e.preventDefault();
    // clear out card divs from a previous request
    while (cardDiv.firstChild) {
      cardDiv.removeChild(cardDiv.firstChild);
    }
    while(display.firstChild) {
      display.removeChild(display.firstChild);
    }
    var url = `https://glacial-plateau-98693.herokuapp.com/${input.value}`;
    image.crossOrigin = "Anonymous";
    image.src = url;
    image.className = "ui fluid image";
    image.onload = function() {
      var palette = [];
      var maincolor = colorThief.getColor(image);
      var colors = colorThief.getPalette(image, 8);
      // print the original image
      display.appendChild(image);

      // push the colorThief responses into an array
      palette.push(maincolor);
      for (var x = 0; x < colors.length; x++) {
        palette.push(colors[x]);
      }
      // iterate through the array of colors, and print the palette to the div
      for (var x = 0; x < palette.length; x++) {
        var rgb = palette[x].toString();
        var card = document.createElement("div");
        card.setAttribute("class", "card");
        card.setAttribute("style", `background-color: rgb(${rgb})`);
        cardDiv.appendChild(card);
        var p = document.createElement("p");
        p.className = "rgb";
        p.textContent = `(${rgb})`;
        card.appendChild(p);
      }
    };
  }
}

function renderFileDisplay () {
  // clear out card divs from a previous request
  while (cardDiv.firstChild) {
    cardDiv.removeChild(cardDiv.firstChild);
  }
  while(display.firstChild) {
    display.removeChild(display.firstChild);
  }
  if (file.files.length) {
    window.URL = window.URL || window.webkitURL;  
    var imgfiles = file.files;

    for (var i = 0; i < imgfiles.length; i++) {
      image.src = window.URL.createObjectURL(imgfiles[i]);
    }
  
      image.className = "ui fluid image";
      image.onload = function() {
        var palette = [];
        var maincolor = colorThief.getColor(image);
        var colors = colorThief.getPalette(image, 8);
        // print the original image
        display.appendChild(image);
    
        // push the colorThief responses into an array
        palette.push(maincolor);
        for (var x = 0; x < colors.length; x++) {
          palette.push(colors[x]);
        }
        // iterate through the array of colors, and print the palette to the div
        for (var x = 0; x < palette.length; x++) {
          var rgb = palette[x].toString();
          var card = document.createElement("div");
          card.setAttribute("class", "card");
          card.setAttribute("style", `background-color: rgb(${rgb})`);
          cardDiv.appendChild(card);
          var p = document.createElement("p");
          p.className = "rgb";
          p.textContent = `(${rgb})`;
          card.appendChild(p);
        }
      };
  }
}