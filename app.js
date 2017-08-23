//GAME RULES
// - 2 players
// - In each turn, a player rolls a dice as many times as he wishes. Each result gets added to his Current score
// - If the player rolls a 1, his Current score is reset to 0.
// - After that, it's the next player's turn.
// - The player can choose to 'Hold', which means that his Current score gets added to his Total score. After that, it's the next player's turn
// - The first player to reach 100 points on Total score wins the game


// Display rules when player first visits page
alert('Welcome to Pig, the friendly dice-rolling game. Please read the rules carefully: \n \nPig is a 2 player game. The first player to reach a total score of 100 points is the winner. \n \nEach player has a current round score, and a total score. Add to your total score from your current round score by hitting "Hold" - however, when you do this, your turn will end. \n \nIf you roll a 1, your turn will end and your current round score goes back to 0. \n \nGood luck and have fun!');

// Initialize game variables
var scores, roundScore, activePlayer, gamePlaying;

// Invoke the function that initializes the game
init();



// addEventListener is a function that occurs when the ROLL DICE button is clicked, and this function takes an anonymous function as an argument. we can make it an anonymous function because we only need it to happen when someone clicks on the ROLL DICE button. we don't need to reuse it anywhere else in the code.
document.querySelector('.btn-roll').addEventListener('click', function() {
  // only do the following if the game has been initialized
  if (gamePlaying) {
    // if the custom username box isn't hidden when they start the game, then hide it
    if (document.querySelector('.player-input').style.display != 'none') {
      document.querySelector('.player-input').style.display = 'none';
    }

    // #1. Roll a random number between 1 and 6

    var dice = Math.floor(Math.random() * 6) + 1;

    // #2. Display the dice roll

    // make the dice image visible once again
    document.querySelector('.dice').style.display = 'block';
    // change the src of the dice image to the correct dice roll
    document.querySelector('.dice').src = 'dice-' + dice + '.png';

    // add animation to the dice image
    animateDice();

    // #3. Update the current score IF the dice roll was NOT a 1
    if (dice !== 1) {
      // add dice roll to current score
      roundScore += dice;
      // update the current score on screen
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      // update the current player's message
      if (document.querySelector('#custom-name-' + activePlayer).value) {
         document.querySelector('#message-' + activePlayer).textContent = document.querySelector('#custom-name-' + activePlayer).value + ' rolled a ' + dice;
      } else {
         document.querySelector('#message-' + activePlayer).textContent = 'Player ' + (activePlayer + 1) + ' rolled a ' + dice;
      }

      // #4. Do this if player rolled a 1
    } else {
      // update the current player's message
      if (document.querySelector('#custom-name-' + activePlayer).value) {
         document.querySelector('#message-' + activePlayer).textContent = document.querySelector('#custom-name-' + activePlayer).value + ' rolled a ' + dice;
      } else {
         document.querySelector('#message-' + activePlayer).textContent = 'Player ' + (activePlayer + 1) + ' rolled a ' + dice;
      }
      // change turns
      nextPlayer();
    }
  }
});



// addEventListener is a function that occurs when the HOLD button is clicked, and this function takes an anonymous function as an argument. we can make it an anonymous function because we only need it to happen when someone clicks on the HOLD button. we don't need to reuse it anywhere else in the code.
document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    // #1. Add current score to total score & hide dice image
    scores[activePlayer] += roundScore;
    document.querySelector('.dice').style.display = 'none';

    // #2. Update UI to reflect updated total score
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    if (document.querySelector('#custom-name-' + activePlayer).value) {
       document.querySelector('#message-' + activePlayer).textContent = document.querySelector('#custom-name-' + activePlayer).value + ' adds ' + roundScore + ' points!';
    } else {
       document.querySelector('#message-' + activePlayer).textContent = 'Player ' + (activePlayer + 1) + ' adds ' + roundScore + ' points!';
    }

    // #3. Check if player won the game
    if (scores[activePlayer] >= 100) {
      // activePlayer wins and game over
      gamePlaying = false;
      // Update the UI to show the activePlayer has won
      if (document.querySelector('#custom-name-' + activePlayer).value) {
        document.querySelector('#name-' + activePlayer).textContent = document.querySelector('#custom-name-' + activePlayer).value + ' wins!';
      } else {
        document.querySelector('#name-' + activePlayer).textContent = 'Player ' + (activePlayer + 1) + ' wins!';
      }
      // hide the message areas
      document.querySelector('#message-0').style.display = 'none';
      document.querySelector('#message-1').style.display = 'none';

      // add the winner class to the winning player
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      // Update the UI to remove the active class since it is no one's turn anymore
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

    } else {
      nextPlayer();
    }
  }
});



// addEventListener is a function that occurs when the NEW GAME button is clicked, and this function takes an anonymous function as an argument.
document.querySelector('.btn-new').addEventListener('click', function() {
  if (scores[0] > 0 && scores[0] < 100 || scores[1] > 0 && scores[1] < 100) {
    var result = confirm('Are you sure you want to forfeit this game?');
    if (result === true) {
      console.log('received confirmation to start new game...');
      init();
    }
  } else if (scores[0] === 0 && scores[1] === 0) {
    console.log('starting new game...');
    init();
  }
});



document.querySelector('.btn-submit').addEventListener('click', function() {
  if (document.querySelector('#custom-name-0').value && document.querySelector('#custom-name-1').value ) {
    document.querySelector('#name-0').textContent = document.querySelector('#custom-name-0').value;
    document.querySelector('#name-1').textContent = document.querySelector('#custom-name-1').value;
    document.querySelector('.player-input').style.display = 'none';
  } else {
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-input').style.display = 'none';
  }
});



// Initialize everything at the beginning of each game
function init() {

  gamePlaying = true;
  // array to store the total scores of each player
  scores = [0,0];
  // number to store the current round score of the active player
  roundScore = 0;
  // number to store the current active player (either 0 or 1)
  activePlayer = 0;

  // show the custom player name form
  document.querySelector('.player-input').style.display = 'block';

  // hide the dice image
  document.querySelector('.dice').style.display = 'none';
  // set all scores to 0 initially
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  // set the players' names
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  // remove the messages from each player
  document.getElementById('message-0').textContent = '';
  document.getElementById('message-1').textContent = '';

  // remove the winner class from each player
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  // remove the active class from each player
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  // add the active class back to player 1
  document.querySelector('.player-0-panel').classList.add('active');


};



function animateDice() {
    var elem = document.querySelector(".dice");
    var pos = 0;
    var id = setInterval(frame, 1);
    function frame() {
        if (pos == 250) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.top = pos + 'px';
            // elem.style.left = pos + 'px';
        }
    }
}



function nextPlayer() {

  console.log('Next player\'s turn!');

  // If the activePlayer is 0, then change activePlayer to 1. otherwise activePlayer is 1 and should be changed to 0. ? means then, : means else
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  // The current score is reset to 0
  roundScore = 0;
  // Update the UI to show that both current scores are 0
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  // Update the UI to show which player's turn it is by toggling the 'active' class from player 1 to player 2
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  // Hide the image of the dice again until the next player rolls
  // document.querySelector('.dice').style.display = 'none';
};
