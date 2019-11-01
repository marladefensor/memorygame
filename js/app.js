/*
 * Create a list that holds all of your cards
 */
let timer = false;
let time = 00;
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
  // create HTML for each of the items
  // <div class="card">
  //     <div class="front"></div>
  //     <div class="back"></div>
  // </div>
  for (let item of items) {
    let list = document.getElementById('deck');
    let newListItem = document.createElement('div');
    newListItem.classList.add('card');
    let front = document.createElement('div');
    front.classList.add('front');
    newListItem.appendChild(front);
    let back = document.createElement('div');
    back.classList.add('back');
    back.innerHTML = `<i class="${item}"></i>`;
    newListItem.appendChild(back);
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

let matches = []; //temporary array to hold possibly matched items
let matched = []; // array to hold all the matched items

document.addEventListener('click', (event) => {
  event.preventDefault();
  setTimer();
  if (event.target.parentElement.classList.value == 'card') {
    let card = event.target.parentElement;
    console.log(card.classList.value);
    card.classList.add('flip');
    matchList(card);
    moveUp();
  }
})

// reloads the page if the restart icon is pressed
let restart = document.getElementById('restart');

restart.addEventListener('click', () => {
  window.location.reload(true);
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
    // console.log(arr1);
    // console.log(arr2.lastChild);
    matched.push(arr1.innerHTML);
    matched.push(arr2.innerHTML);
    setTimeout(function() {arr1.lastChild.classList.add('match')},350);
    setTimeout(function() {arr2.lastChild.classList.add('match')},350);
    // arr1.classList.remove('flip');
    // arr2.classList.remove('flip');
    // setTimeout(function() {arr1.lastChild.classList.add('animated','rubberBand')},350);
    // setTimeout(function() {arr2.lastChild.classList.add('animated','rubberBand')},350);

    // setTimeout(function() {arr1.classList.remove('flip')},350);
    // setTimeout(function() {arr2.classList.remove('flip')},350);
    // arr1.lastChild.classList.add('animated','rubberBand');
    // arr2.lastChild.classList.add('animated','rubberBand');

  }
  else{
    setTimeout(function() {arr1.lastChild.classList.add('wrong')},500);
    setTimeout(function() {arr2.lastChild.classList.add('wrong')},500);
    setTimeout(function() {arr1.lastChild.classList.remove('wrong')},1300);
    setTimeout(function() {arr2.lastChild.classList.remove('wrong')},1300);
    setTimeout(function() {arr1.classList.toggle('flip')},1000);
    setTimeout(function() {arr2.classList.toggle('flip')},1000);
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

  min = String(min).padStart(2, "0");
  hours = String(hours).padStart(2, "0");
  secs = String(secs).padStart(2, "0");
  return `${hours}:${min}:${secs}`;
}

// increments the moves number when a card is selected, changes star rating
function moveUp() {
  let moves = document.getElementById('moves');
  // console.log('moves: ', moves.innerHTML);
  moves.innerHTML = parseFloat(moves.innerHTML) + 1;
  // console.log('after moves: ', moves.innerHTML);
  if (parseFloat(moves.innerHTML) > 30) {
    document.getElementById('third').innerHTML = '<i class="far fa-star"></i>';
  }
  if(parseFloat(moves.innerHTML) > 40) {
    document.getElementById('second').innerHTML = '<i class="far fa-star"></i>';
  }
  if(parseFloat(moves.innerHTML) > 50) {
    document.getElementById('first').innerHTML = '<i class="far fa-star"></i>';
  }
}

// makes modal visible when the player wins the game
function win(){
  let final = finalTime(Math.floor(time/1000));
  let modal = document.getElementById('modalWin');
  let first = document.getElementById('first').innerHTML;
  let second = document.getElementById('second').innerHTML;
  let third = document.getElementById('third').innerHTML;
  document.getElementById('modal-content').innerHTML =
    `<p><strong>you win!</strong></p>
    <p> star rating: ${first}${second}${third}</p>
    <p> score: ${parseFloat(document.getElementById('moves').innerHTML)+1}</p>
    <p> time: ${final}</p>
    <button id="tryAgain">try again?</button>`;

  document.getElementById('tryAgain').addEventListener('click',  () => {
    window.location.href = window.location.href;});

  modal.style.display = "block";
}
