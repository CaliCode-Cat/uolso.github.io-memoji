
var cards = document.querySelectorAll('.card');
var cardFront = document.querySelectorAll('.card__front');
var cardBack = document.querySelectorAll('.card__back');
var cardFrontArray = Array.prototype.slice.call(cardFront);
var cardBackArray = Array.prototype.slice.call(cardBack);
var cardsArray = Array.prototype.slice.call(cards);
var popupVictory = document.querySelector('.result-window--victory');
var popupFail = document.querySelector('.result-window--fail');
var popupResults = document.querySelectorAll('.result-window');
var popupResultsArray = Array.prototype.slice.call(popupResults);
var popupButtons = document.querySelectorAll('.result-window__button');
var popupButtonsArray = Array.prototype.slice.call(popupButtons);
var countOfClicks;
//var allEmojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨', '🐯','🐮', '🐷', '🐸', '🐙','🐵','🐞', '🐟', '🐊', '🐓'];
var srcs = ['img/bear.png', 'img/beetle.png', 'img/cat.png', 'img/chicken.png', 'img/coala.png', 'img/cow.png', 'img/crocodile.png',
'img/dog.png', 'img/field_mouse.png', 'img/fish.png', 'img/frog.png', 'img/monkey.png', 'img/mouse.png',
'img/osminog.png', 'img/panda.png', 'img/pig.png', 'img/rabbit.png', 'img/tiger.png'];
//TIMER
var timerSecond = document.querySelector('.timer-second');
var timerMinute = document.querySelector('.timer-minute');

    
var minuteAmount;
var secondAmount;
var specialVar;

function setTime(a, b) {
  minuteAmount = a;
  if (minuteAmount < 10) {timerMinute.textContent = '0' + minuteAmount;}
  else {timerMinute.textContent = '' + minuteAmount;}
  secondAmount = b;
  if (secondAmount < 10) {timerSecond.textContent = '0' + secondAmount;}
  else {timerSecond.textContent = '' + secondAmount;}

  secondAmountTotal = minuteAmount * 60 + secondAmount;
}

setTime(1, 0)
var timer;

function countTime() {
  var greenCards = 0;//new
  cardBackArray.forEach(function(card) {//
    if (card.classList.contains('card__back--green')) {//
      greenCards += 1;//
    }
  });

  if (secondAmountTotal < 0 && minuteAmount < 0) {
    if (greenCards < cardBackArray.length) {
      popupFail.classList.remove('result-window--closed');//!!!!!!! at the second game it shows up all time
      clearInterval(timer);
      greenCards = 0;
      redList = [];
      flippedItem = 0;
    }
    clearInterval(timer); //return false
  } else {
    if (greenCards == cardBackArray.length) {
      popupVictory.classList.remove('result-window--closed');
      clearInterval(timer);
      greenCards = 0;
    }
        
    if (minuteAmount < 10) {
        timerMinute.textContent = '0' + minuteAmount;
    } else {
          timerMinute.textContent = '' + minuteAmount;
    }
        
    specialVar = secondAmountTotal - minuteAmount*60;
        

    if (specialVar < 10) {
      if (specialVar == 0) {
            minuteAmount -= 1;
      }
      timerSecond.textContent = '0' + specialVar;
    } else {timerSecond.textContent = '' + specialVar;}

        secondAmountTotal -= 1;
  }
      
}
    

function startTimer() {
  timer = setInterval(countTime, 1000)
}
//TIMER OVER


function pickEmojisRandomly(dataList, totalCardAmount, oneTypeCardAmount) { //!!!! checking if cardAmount%2===0
  var cardIndex;
  var criteria;
  var thisGameArray = []; 
  var thisGameIndexes = [];

  var gameRange = [];
  var card;
  var cardPosition;
  var finalArray = [];
  
  for (var j=1; j<=(totalCardAmount/oneTypeCardAmount); j++) {
    criteria = false;

    if (thisGameIndexes.length>0) {
      while (!criteria) {
        cardIndex = Math.floor(Math.random()*dataList.length);
        for (var i = 0; i < thisGameIndexes.length; i++) {
          if(cardIndex != thisGameIndexes[i]) {
            criteria = true;
          } else {
            criteria = false;
            break;
          }
        }
      }
    } else {cardIndex = Math.floor(Math.random()*dataList.length);}
    thisGameIndexes.push(cardIndex);
  }
  
  for (var i = 0; i < thisGameIndexes.length; i++) {
    thisGameArray[i] = dataList[thisGameIndexes[i]];
  }

  for (var i = 0; i<totalCardAmount; i++) {
    gameRange.push(i);
  }
  
  for  (var i = 0; i < thisGameArray.length; i++) {
    card = thisGameArray[i];
    for (var j = 1; j <= oneTypeCardAmount; j++) {
      cardPosition =  Math.floor(Math.random()*gameRange.length);
      while(gameRange[cardPosition] === null) {
        cardPosition =  Math.floor(Math.random()*gameRange.length);
      }
      gameRange[cardPosition] = null;
      finalArray[cardPosition] = card;
    }
  }
  
  return finalArray;
}


function createThisArray() {
  var nowEmojis =  pickEmojisRandomly(srcs, 12, 2); //to make textContent invisible for a bit
  for (var i=0; i<cardBack.length; i++) {
    cardBack[i].firstElementChild.src = nowEmojis[i];
  }
  countOfClicks = 0;
}
function restart() {
  for (var i=0; i<cardBack.length; i++) {
    cardBack[i].classList.remove('card__back--red');
    cardBack[i].classList.remove('card__back--green');
    cardBack[i].classList.remove('card__back--flipped');
    cardFront[i].classList.remove('card__front--flipped');
  }
  setTimeout(createThisArray, 400);
  setTime(1, 0);
}

window.onload = createThisArray(); //REPLACE FOR restart()

popupButtonsArray.forEach(function(button, index) {
  button.addEventListener('click', function(evt) {
    evt.preventDefault();
    popupResultsArray[index].classList.add('result-window--closed');
    restart();
  })
})


var flippedList = [];
var redList = [];
var greenList = [];
cardFrontArray.forEach(function(cards, index) {
  cards.addEventListener('click', function(evt) {
    evt.preventDefault();
    
    if(countOfClicks == 0) {
      startTimer();
      countOfClicks = 1;
    }

    var flippedItem = 0;
    for (var i=0; i<cardBackArray.length; i++) {
      if(cardBackArray[i].classList.contains('card__back--flipped')&&!cardBackArray[i].classList.contains('card__back--green')){
        flippedItem = cardBackArray[i];
      }
    }

    if(flippedItem) {
      if ((cardBackArray[index].firstElementChild.src === flippedItem.firstElementChild.src)) {//just added redList check
        if(redList.length==0) {
        flippedItem.classList.add('card__back--green');//flippedItem.style.backgroundColor = 'green';
        cardBackArray[index].classList.add('card__back--green');//cardBackArray[index].style.backgroundColor = 'green';
        flippedItem = 0;}
        else {
          for (var i=0; i<redList.length; i++) {
              if(redList[i].classList.contains('card__back--flipped'))
                {redList[i].classList.remove('card__back--flipped');} 
              else {redList[i].classList.remove('card__front--flipped')}
              redList[i].classList.remove('card__back--red');//redList[i].style.backgroundColor = 'white'; //
            }
            redList = [];
            flippedList = [];
        }
      } else if (cardBackArray[index].firstElementChild.src !== flippedItem.firstElementChild.src) {
          if (redList.length>0) {
            for (var i=0; i<redList.length; i++) {
              if(redList[i].classList.contains('card__back--flipped'))
                {redList[i].classList.remove('card__back--flipped');} 
              else {redList[i].classList.remove('card__front--flipped')}
              redList[i].classList.remove('card__back--red');//redList[i].style.backgroundColor = 'white';
            }
            redList = [];
            flippedList = [];
          } else {
            flippedItem.classList.add('card__back--red');//flippedItem.style.backgroundColor = 'red';
            cardBackArray[index].classList.add('card__back--red');//cardBackArray[index].style.backgroundColor = 'red'; 
            redList.push(flippedItem);
            redList.push(flippedItem.nextElementSibling);
            redList.push(cardBackArray[index]);
            redList.push(cardBackArray[index].nextElementSibling);
          }
      }

    }
    
    if(!cards.classList.contains('card__front--flipped')) {
      cards.classList.add('card__front--flipped');
      cardBackArray[index].classList.add('card__back--flipped');
    } 
  })
})
