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
    'data-card': card
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

function checkCardCapture(player, card) {
  if (player === 1 && card.hasClass('player2')) {
    card.removeClass('player2').addClass('player1');
  } else if (player === 2 && card.hasClass('player1')) {
    card.removeClass('player1').addClass('player2');
  }
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

  // TODO: get card values from card definitions based on card id's
  if (westCard && (parseInt(westCard.find('.values-east:eq(0)').text(), 10) < cardValue[3])) {
    checkCardCapture(playerNumber, westCard);
  }
  if (eastCard && (parseInt(eastCard.find('.values-west:eq(0)').text(), 10) < cardValue[1])) {
    checkCardCapture(playerNumber, eastCard);
  }
  if (northCard && (parseInt(northCard.find('.values-south:eq(0)').text(), 10) < cardValue[0])) {
    checkCardCapture(playerNumber, northCard);
  }
  if (southCard && (parseInt(southCard.find('.values-north:eq(0)').text(), 10) < cardValue[2])) {
    checkCardCapture(playerNumber, southCard);
  }
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