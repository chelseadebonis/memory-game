/*
 * Create a list that holds all of your cards
 */
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

//global scope
const cardGrid = document.querySelector('.deck');
let openCards = [];
let matchedCards = [];
let clockId;
let moves = 0;
let clockOff = true;
let time = 0;
let restart = document.querySelector('.restart');
let replay = document.querySelector('.modal_button_replay');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close-button');


//shuffle cards
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

let shuffleCards = shuffle(icons);


//create cards
for (let i = 0; i < icons.length; i++) {
  const card = document.createElement('li');
  card.classList.add('card');
  card.innerHTML = `<i class='${icons[i]}'></i>"`;
  cardGrid.appendChild(card);

//click event for the cards
  card.addEventListener('click', function() {
    const firstCard = this;
    const lastCard = openCards[0];
    gameScore();
    if (clockOff) {
            startClock();
            clockOff = false;
        }

//open card
    if (openCards.length === 1) {

      card.classList.add("open", "show");
      openCards.push(this);

    lastCard.addEventListener('click', addMove());

//matched cards
      if (firstCard.innerHTML === lastCard.innerHTML) {

          firstCard.classList.add('match');
          lastCard.classList.add('match');


          matchedCards.push(firstCard, lastCard);

          openCards = [];

          //check if the game over aka call the gameOver function
          gameOver();


      } else {

  //wait 1000ms then remove class, flip cards back over because they do not match

            openCards = [];

            setTimeout(function() {
              firstCard.classList.remove("open", "show");
              lastCard.classList.remove("open", "show");
            }, 1000);
        }
    } else

        card.classList.add("open", "show");
        openCards.push(this);
  });
}


//timer functions

function startClock() {
  clockId = setInterval(() => {
    time++;
    displayTime();
  }, 1000);
}

function displayTime() {
  const clock = document.querySelector('.clock');
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  if (seconds < 10) {
        clock.innerHTML =`${minutes}:0${seconds}`;
    } else {
        clock.innerHTML =`${minutes}:${seconds}`;
  }
}


//game over function

function gameOver() {
  if(matchedCards.length === icons.length) {
    stopClock();
    modalStats();
    toggleModal();
    closeModal();
  }
}


function stopClock() {
  clearInterval(clockId);
}

//query selector for stars
function getStars() {
  stars = document.querySelectorAll('.stars li');
  starCount = 0;
  for (star of stars) {
    if (star.style.display !== 'none') {
      starCount++;
    }
  }
  return starCount;
}

//add moves to implement moves score
function addMove() {
  moves++;
  const movesDisplay = document.querySelector('.moves');
  movesDisplay.innerHTML = moves;
}

function gameScore() {
  if (moves === 16 || moves === 24 || moves === 30) {
    hideStar();
  }
}


//hide star for lower score
function hideStar() {
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    if (star.style.display !== 'none') {
      star.style.display = 'none';
      break;
    }
  }
}

function replayGame() {
  resetGame();
  //toggle modal
}



/*$('.restart').click(function () {
    shuffle(icons);
    $('.card').removeClass('open', 'show', 'match');
    $('.deck').append(cardsArray);
  }*/

//reset game button

restart.addEventListener('click', function() {
  location.reload();
  resetGame();
});

replay.addEventListener('click', function() {
  location.reload();
  resetGame();
});

function resetGame() {
  resetTime();
  resetMoves();
  resetStars();
  shuffleCards();
}

function resetTime() {
  stopClock();
  clockOff = true;
  time = 0;
  displayTime();
}

function resetMoves() {
  moves = 0;
  moves = document.querySelector('.moves').innerHTML;
}

function resetStars() {
  stars = 0;
  const starList = document.querySelectorAll('.stars li');
  for (star of stars) {
    star.style.display = 'inline';
  }
}


//modal functions
function toggleModal() {
  modal.classList.toggle('show-modal');

}

function closeModal() {
  closeButton.addEventListener('click', toggleModal);
}

function modalStats() {
  const timeStat = document.querySelector('.time_stats');
  const clockTime = document.querySelector('.clock').innerHTML;
  const moveStat = document.querySelector('.move_stats');
  const starsStat = document.querySelector('.star_stats');
  const stars = getStars();

  timeStat.innerHTML = `Time = ${clockTime}`;
  moveStat.innerHTML = `Moves = ${moves}`;
  starsStat.innerHTML = `Stars = ${stars}`;
}

/*   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



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
