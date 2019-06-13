/*
 * Create a list that holds all of your cards
 */
let timer = false;
let time = 0;
const cards = ['far fa-gem','far fa-gem','far fa-paper-plane','far fa-paper-plane','fas fa-anchor','fas fa-anchor',
              'fas fa-bolt','fas fa-bolt','fas fa-cube','fas fa-cube','fas fa-leaf','fas fa-leaf','fas fa-bicycle','fas fa-bicycle',
              'fas fa-bomb','fas fa-bomb'];

display(cards);
console.log(cards);

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
    newListItem.innerHTML = `<i class="${item}"></i>`;
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
  setTimer();
  if (event.target.classList.value == 'card') {
    let card = event.target;
    console.log(card.classList.value);
    card.classList.add('open','show');
    matchList(card);
    moveUp();
  }
})

// reloads the page if the restart icon is pressed
let restart = document.getElementById('restart');

restart.addEventListener('click', (event) => {
  event.preventDefault();
  document.location.reload(true);
})

// checks if the two cards selected matches, if all cards are matched, win function is called
function matchList(card) {
  matches.push(card);
  if (matches.length == 2) {
    check(matches[0],matches[1]);
  }
  if (matched.length == 16) {
    win();
  }
}

// checks if the two cards selected matched, if not, cards are turned over
function check(arr1,arr2) {
  if (arr1.innerHTML == arr2.innerHTML) {
    arr1.classList.add('match');
    arr2.classList.add('match');
    matched.push(arr1.innerHTML);
    matched.push(arr2.innerHTML);
    arr1.classList.add('animated','rubberBand');
    arr2.classList.add('animated','rubberBand');

  }
  else{
    setTimeout(function() {arr1.classList.remove('open','show')},1200);
    setTimeout(function() {arr1.classList.add('animated','wobble')},500);
    setTimeout(function() {arr1.classList.remove('animated','wobble')},1200);
    // setTimeout(function() {arr1.classList.add('transform')},1000);
    setTimeout(function() {arr2.classList.remove('open','show')},1200);
    setTimeout(function() {arr2.classList.add('animated','wobble')},500);
    setTimeout(function() {arr2.classList.remove('animated','wobble')},1200);
    // setTimeout(function() {arr2.classList.add('transform')},1000);
  }
  matches = [];
}

// starts the timer up
function setTimer() {
  if (timer == false) {
    timer = true;
    let start = Date.now();
    setInterval(function() {
      time = Date.now() - start;
    },1000);
  }
}

// converts final time from seconds to a timer format
// time conversion found on: https://www.codespeedy.com/convert-seconds-to-hh-mm-ss-format-in-javascript/
function finalTime(totalSecs) {
  let hours = Math.floor(totalSecs/3600);
  totalSecs %= 3600;
  let min = Math.floor(totalSecs/60);
  let secs = totalSecs % 60;
  return `${hours}:${min}:${secs}`;
}

// increments the moves number when a card is selected, changes star rating
function moveUp() {
  let moves = document.getElementById('moves');
  // console.log('moves: ', moves.innerHTML);
  moves.innerHTML = parseFloat(moves.innerHTML) + 1;
  // console.log('after moves: ', moves.innerHTML);
  if (parseFloat(moves.innerHTML) > 40) {
    document.getElementById('third').innerHTML = '<i class="far fa-star"></i>';
  }
  else if(parseFloat(moves.innerHTML) > 60) {
    document.getElementById('second').innerHTML = '<i class="far fa-star"></i>';
  }
  else if(parseFloat(moves.innerHTML) > 80) {
    document.getElementById('first').innerHTML = '<i class="far fa-star"></i>';
  }
}

// makes modal visible when the player wins the game
function win(){
  let final = finalTime(Math.floor(time/1000));
  let modal = document.getElementById('modalWin');
  document.getElementById('modal-content').innerHTML =
    `<p>You win!</p>
    <p> Your star rating is: PUT HERE</p>
    <p> Score: ${document.getElementById('moves').innerHTML}</p>
    <p> Time: ${final}</p>
    <p id="tryAgain">Try Again?</p>`;

  document.getElementById('tryAgain').addEventListener('click',  (event) => {
    event.preventDefault();
    document.location.reload(true);});

  modal.style.display = "block";
  // setTimeout(alert(`You win!!\nYour score is: ${document.getElementById('moves').innerHTML}`),4000);
}
