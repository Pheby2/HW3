const rElement = document.getElementById("r");
const gElement = document.getElementById("g");
const bElement = document.getElementById("b");
const colorDisplayElement = document.getElementById("color-display");

const levels = Array.from(document.getElementsByClassName("mode"));

let gameLevel = levels.find((level) => {
    const classList = Array.from(level.classList);
    classList.includes("selected")
    return classList.includes("selected")
}).innerHTML;

let squares = getSquares(gameLevel);

levels.forEach((level) => {
   level.addEventListener("click", function () {
      levels.forEach((mode) => mode.classList.remove("selected"))
      this.classList.add("selected");
   

      gameLevel = this.innerHTML;
      squares = getSquares(gameLevel);
      
   });
}); 

const startButton =document.getElementById("reset");

      startButton.addEventListener("click", function () {
         this.innerHTML = "New Colors";
         // assign each individual square a background color
         for (let i = 0; i < squares.length; i = i + 1) {
            const red = Math.floor(Math.random() * 256);
            const green = Math.floor(Math.random() * 256);
            const blue = Math.floor(Math.random() * 256);

            const rgbString = "rgb(" + red + "," + green + "," + blue + ")";

            const square = squares[i];

            square.dataset.rgb_value = JSON.stringify([red, green, blue]);
            square.style.backgroundColor = rgbString;   
         }

         //assign the header a random rgb value from one of the square values.
         const randomSquareIndex = Math.floor(Math.random() * 6);
         const headerColorSquare =  squares[randomSquareIndex];
         setHeaderRgbBackgroundColor(headerColorSquare);
         console.log(headerColorSquare);
      }); 

      function setHeaderRgbBackgroundColor(squareElement) {
         const setHeaderElementBackgroundColor = (rgbValues, element) => {
            const [r, g, b] = rgbValues
            const rgbString = `rgb( ${r}, ${g}, ${b} )`
            element.style.backgroundColor = rgbString;
            element.innerHTML = rgbValues.find(rgbValue => {
               return rgbValue > 0;
            })
         };
          const rgbString = squareElement.dataset.rgb_value;
          colorDisplayElement.dataset.rgb_value = rgbString;
          const [red, green, blue] = JSON.parse(rgbString);
          //console.table({red, green, blue});


          const redBackground = [red, 0, 0];
          const greenBackground = [0, green, 0];
          const blueBackground = [0, 0, blue];


          setHeaderElementBackgroundColor(redBackground, rElement);
          setHeaderElementBackgroundColor(greenBackground, gElement);
          setHeaderElementBackgroundColor(blueBackground, bElement);
      }



   //add eventlistener to squares so that it either disapperas or changes every square's color
   squares.forEach(square => {
      square.addEventListener("click", function(){
        const headerRgbValue = colorDisplayElement.dataset.rgb_value;
        const squareRgbValue = this.dataset.rgb_value; 

        if (headerRgbValue == squareRgbValue) {
         setSquareBackgroundAfterWin(headerRgbValue)
        } else {
           this.classList.add("hidden");
        }
      })
   })

   function setSquareBackgroundAfterWin(headerRgbString) {
      const [r, g, b] = JSON.parse(headerRgbString);
      const rgbString = `rgb( ${r}, ${g}, ${b} )`

      squares.forEach(sq => {
         sq.classList.remove("hidden");
         sq.style.backgroundColor = rgbString;
      })
   }

  

   //to change square in levels
   function getSquares(level) {
      const tiles = Array.from(document.getElementsByClassName("square"));
      tiles.forEach((sq) => sq.classList.remove("hidden"));
  
       if (level === "Easy") {
          const hiddenSquares = tiles.slice(3, tiles.length);
          const squares = tiles.slice(0,3);

          hiddenSquares.forEach((sq)  => sq.classList.add("hidden"));
          return squares;
       }

       return tiles;
       
   }
   