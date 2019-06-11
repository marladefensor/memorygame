/*
 * Create a list that holds all of your cards
 */
const cards = ['fa-diamond','fa-diamond','fa-paper-plane-o','fa-paper-plane-o','fa-anchor','fa-anchor',
              'fa-bolt','fa-bolt','fa-cube','fa-cube','fa-leaf','fa-leaf','fa-bicycle','fa-bicycle',
              'fa-bomb','fa-bomb'];
console.log(cards.length);
console.log(cards);

// console.log(shuffle(cards));
display(cards);
console.log(document.getElementById('deck'));

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function display(array) {
  let items = shuffle(cards);
  console.log(items);
  for (let item of items) {
    let list = document.getElementById('deck');
    let newListItem = document.createElement('li');
    newListItem.classList.add('card');
    newListItem.innerHTML = `<i class="fa ${item}"></i>`;
    list.appendChild(newListItem);
  }
}

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

let listed = document.getElementsByClassName('card');
console.log(listed);
let matches = [];
document.addEventListener('click', (event) => {
  event.preventDefault();
  let card = event.target;
  console.log(card);
  card.classList.add('open','show');
  matches.push(card);
  console.log(matches[0].innerHTML);
  if(matches.length == 2) {
    if (matches[0].innerHTML == matches[1].innerHTML) {
      matches[0].classList.add('match');
      matches[1].classList.add('match');
    }
    matches[0].classList.remove('open','show');
    matches[1].classList.remove('open','show');
    matches = [];
  }
})
