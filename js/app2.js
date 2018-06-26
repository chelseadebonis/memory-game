/*
 * Create a list that holds all of your cards
 */

const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];



// Display the cards on the page

const cardGrid = document.querySelector('.deck');

let openCards = [];
let matchedCards = [];


//create cards
for (let i = 0; i < icons.length; i++) {
  const card = document.createElement('li');
  card.classList.add('card');
  card.innerHTML = `<i class='${icons[i]}'></i>"`;
  cardGrid.appendChild(card);
}
//click event for cards
function click(card) {
  card.addEventListener("click", function() {
    const firstCard = this;
    const lastCard = openCards[0];

    //existing opened card
    if (openCards.length === 1) {

      card.classList.add("open", "show", "none");
      openCards.push(this);

    //compare open cards
        if (firstCard.innerHTML === lastCard.innerHTML) {

          //matched cards
          firstCard.classList.add("match");
          lastCard.classList.add("match");

          matchedCards.push(firstCard, lastCard);

          openCards = [];

          //check game over
          isOver();


          } else {

            openCards = [];
            //wait 1000ms then remove class
            setTimeout(function() {
              firstCard.classList.remove("open", "show", "none");
              lastCard.classList.remove("open", "show", "none");
            }, 1000);
        }


    } else   //do not have any open cards

        card.classList.add("open", "show", "none");
        openCards.push(this);


      });
    }

}

function isOver() {
  if(matchedCards.length === icons.length) {
    alert("Game Over!");
  }


}



//add Moves
const movesContainer = document.querySelector(".moves");
let moves = 0;
function addMove() {
  moves++;
  movesContainer.innerHTML = moves;
}




//restart Game

const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", function() {
  //delete all cards
  card.container.innerHTML = "";
  //all to create new cards
  init();
  //reset any related valuables
  matchedCards = [];
});

/*   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
