var playerNumber = 1;
var goInProgress = false;
var player1score = 0;
var player2score = 0;

// TODO: store decks server-side based on browser session details
var playerDecks = [['bicycle', 'euro', 'apple', 'android', 'twitter'], ['fort-awesome', 'pagelines', 'drupal', 'ambulance', 'star-o']];
// TODO: store card definitions in json file server-side, only dealing with card id's when making requests to/from server
var cardValues = {
  'bicycle': [1, 4, 1, 5],
  'euro': [5, 1, 1, 3],
  'apple': [1, 3, 3, 5],
  'android': [6, 1, 1, 2],
  'twitter': [2, 3, 1, 5],
  'pagelines': [2, 1, 4, 4],
  'drupal': [1, 5, 4, 1],
  'ambulance': [3, 5, 2, 1],
  'star-o' : [2, 1, 6, 1],
  'fort-awesome': [4, 2, 4, 3],
  'anchor': [2, 1, 2, 6]
};

$('td').on('click', function() {
  if (goInProgress) return;
  if ($(this).find('.card').length) return;

  goInProgress = true;
  placeCard($(this))
});

// TODO: dedupe
playerDecks[0].forEach(function(card) {
  var cardDiv = makeCardDiv(1, card)
  $('#player1-deck').append(cardDiv);
});
playerDecks[1].forEach(function(card) {
  var cardDiv = makeCardDiv(2, card)
  $('#player2-deck').append(cardDiv);
});

$('.deck').on('click', '.card', function() {
  var card = $(this);
  if (card.is('.selected')) return;

  var deck = card.closest('.deck');
  if (deck.prop('id') === 'player' + playerNumber + '-deck') {
    deck.find('.card').removeClass('selected');
    card.addClass('selected');
  }
});

function makeCardDiv(playerNumber, card) {
  // TODO: templating
  var cardDiv = $('<div>', {
    'class': 'card player' + playerNumber,
    'data-card': card,
    'data-player': playerNumber
  });

  var cardValue = cardValues[card];
  var icon = $('<i>', {
    'class': 'fa fa-' + card
  });
  var values = $('<div>', {
    'class': 'values'
  }).append($('<span>', {
    'class': 'values-value values-north'
  }).text(cardValue[0]))
  .append($('<span>', {
    'class': 'values-value values-west'
  }).text(cardValue[3]))
  .append($('<span>', {
    'class': 'values-value values-east'
  }).text(cardValue[1]))
  .append($('<span>', {
    'class': 'values-value values-south'
  }).text(cardValue[2]));

  var back = $('<div>', {
    'class': 'back face'
  }).append($('<i>', {
    'class': 'fa fa-smile-o'
  }))
  .appendTo(cardDiv);

  var front = $('<div>', {
    'class': 'front face'
  }).append(values.clone())
  .append(icon.clone())
  .appendTo(cardDiv);

  return cardDiv;
}

function placeCard(cell) {
  var deck = $('#player' + playerNumber + '-deck');
  deck.removeClass('active');
  var card = deck.find('.card.selected').removeClass('selected').addClass('used').data('card');
  var cardDiv = makeCardDiv(playerNumber, card);

  cell.html(cardDiv);

  var cardValue = cardValues[card];
  var westCard = cell.closest('td').prev('td').find('.card');
  var eastCard = cell.closest('td').next('td').find('.card');
  var column = cell.closest('td').prev('td').length ? (cell.closest('td').next('td').length ? 1 : 2) : 0;
  var northCard = cell.closest('tr').prev('tr').find('td').eq(column).find('.card');
  var southCard = cell.closest('tr').next('tr').find('td').eq(column).find('.card');

  [[westCard, 1, 3], [eastCard, 3, 1], [northCard, 2, 0], [southCard, 0, 2]].forEach(function(cardArr) {
    var adjacentCard = cardArr[0];
    var adjacentValue = cardArr[1];
    var thisCardValue = cardArr[2];
    console.log("adjacentValue", adjacentValue);
    console.log('thisCardValue', thisCardValue);
    if (adjacentCard.length) {
      console.log("parseInt(adjacentCard.attr('data-player')", parseInt(adjacentCard.attr('data-player')));
      console.log('playerNumber', playerNumber);
      console.log("adjacentCard.data('card')", adjacentCard.data('card'));
      console.log("cardValues[adjacentCard.data('card')][adjacentValue]", cardValues[adjacentCard.data('card')][adjacentValue]);
      if ((parseInt(adjacentCard.attr('data-player')) !== playerNumber) && (cardValues[adjacentCard.data('card')][adjacentValue] < cardValue[thisCardValue])) {
        if (playerNumber === 1) {
          adjacentCard.removeClass('player2').addClass('player1').attr('data-player', '1');
        } else {
          adjacentCard.removeClass('player1').addClass('player2').attr('data-player', '2');
        }
      }
    }
  });
  goInProgress = false;

  playerNumber = (playerNumber === 1 ? 2 : 1);
  var nextPlayerDeck = $('#player' + playerNumber + '-deck');
  nextPlayerDeck.addClass('active');
  nextPlayerDeck.find('.card:not(.used):eq(0)').addClass('selected');
  update();
}

function update() {
  player1score = $('.card.player1:not(.used)').length;
  player2score = $('.card.player2:not(.used)').length;
  $('#player1score').text(player1score);
  $('#player2score').text(player2score);
  if ($('#board .card').length === 9) {
    if (player1score > player2score) {
      alert('Player 1 wins')
    } else if (player2score > player1score) {
      alert('Player 2 wins');
    } else {
      alert('Draw');
    }
  }
}


// Start game
$('#player' + playerNumber + '-deck').addClass('active').find('.card:not(.used):eq(0)').addClass('selected');
update();