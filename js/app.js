/*
 * Create a list that holds all of your cards
 */
const cards = ['fa-diamond','fa-diamond','fa-paper-plane-o','fa-paper-plane-o','fa-anchor','fa-anchor',
              'fa-bolt','fa-bolt','fa-cube','fa-cube','fa-leaf','fa-leaf','fa-bicycle','fa-bicycle',
              'fa-bomb','fa-bomb'];
// console.log(cards.length);
// console.log(cards);

// console.log(shuffle(cards));
display(cards);
// console.log(document.getElementById('deck'));

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function display(array) {
  let items = shuffle(cards);
  // console.log(items);
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
let matches = []; //temporary array to hold possibly matched items
let matched = []; // array to hold all the matched items

document.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.classList.value == 'card') {
    let card = event.target;
    // console.log(card.classList.value);
    card.classList.add('open','show');
    matchList(card);
    moveUp();
  }
})

let restart = document.getElementById('restart');

restart.addEventListener('click', (event) => {
  event.preventDefault();
  if ()
})

function matchList(card) {
  matches.push(card);
  if (matches.length == 2) {
    check(matches[0],matches[1]);
  }
  if (matched.length == 16) {
    win();
  }
}

function check(arr1,arr2) {
  if (arr1.innerHTML == arr2.innerHTML) {
    arr1.classList.add('match');
    arr2.classList.add('match');
    matched.push(arr1.innerHTML);
    matched.push(arr2.innerHTML);
  }
  setTimeout(function() {arr1.classList.remove('open','show')},1000);
  setTimeout(function() {arr2.classList.remove('open','show')},1000);
  matches = [];
}

function moveUp() {
  let moves = document.getElementById('moves');
  // console.log('moves: ', moves.innerHTML);
  moves.innerHTML = parseFloat(moves.innerHTML) + 1;
  // console.log('after moves: ', moves.innerHTML);
}

function win(){
  alert(`You win!!\nYour score is: ${document.getElementById('moves').innerHTML}`);
}
