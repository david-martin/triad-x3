var playerNumber = 1;
var goInProgress = false;
var player1score = 0;
var player2score = 0;
var playerDecks = [['bicycle', 'euro', 'apple', 'android', 'twitter'], ['fort-awesome', 'pagelines', 'drupal', 'ambulance', 'star-o']];

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
  console.log('goInProgress');
  placeCard($(this))
});

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
  var deck = card.closest('.deck');
  if (deck.prop('id') === 'player' + playerNumber + '-deck') {
    deck.find('.card').removeClass('selected');
    card.addClass('selected');
  }
});

function makeCardDiv(playerNumber, card) {
  var cardDiv = $('<div>', {
    'class': 'card player' + playerNumber,
    'data-card': card
  });
  if (playerNumber === 1) {
    cardDiv.addClass('flip')
  }

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

  var front = $('<div>', {
    'class': 'front face'
  }).append(values)
  .append(icon)
  .appendTo(cardDiv);

  var back = $('<div>', {
    'class': 'back face'
  }).append(values.clone())
  .append(icon.clone())
  .appendTo(cardDiv);

  return cardDiv;
}

function placeCard(cell) {
  var deck = $('#player' + playerNumber + '-deck');
  var card = deck.find('.card.selected').removeClass('selected').hide().data('card');
  var cardDiv = makeCardDiv(playerNumber, card);

  cell.html(cardDiv);

  // TODO: what effect does card have?
  var cardValue = cardValues[card];
  var westCard = cell.closest('td').prev('td').find('.card');
  var eastCard = cell.closest('td').next('td').find('.card');
  console.log('west', westCard.length);
  console.log('east', eastCard.length);
  var column = cell.closest('td').prev('td').length ? (cell.closest('td').next('td').length ? 1 : 2) : 0;
  var northCard = cell.closest('tr').prev('tr').find('td').eq(column).find('.card');
  var southCard = cell.closest('tr').next('tr').find('td').eq(column).find('.card');
  console.log('north', northCard.length);
  console.log('south', southCard.length);

  // TODO: dedupe
  if (westCard && (parseInt(westCard.find('.values-east:eq(0)').text(), 10) < cardValue[3])) {
    if (playerNumber === 1 && !westCard.hasClass('flip')) {
      westCard.addClass('flip');
    } else if (playerNumber === 2 && westCard.hasClass('flip')) {
      westCard.removeClass('flip');
    }
  }
  if (eastCard && (parseInt(eastCard.find('.values-west:eq(0)').text(), 10) < cardValue[1])) {
    if (playerNumber === 1 && !eastCard.hasClass('flip')) {
      eastCard.addClass('flip');
    } else if (playerNumber === 2 && eastCard.hasClass('flip')) {
      eastCard.removeClass('flip');
    }
  }
  console.log('northCard', northCard);
  console.log("parseInt(northCard.find('.values-south').text(), 10)", parseInt(northCard.find('.values-south:eq(0)').text(), 10));
  console.log('cardValue[0]', cardValue[0]);
  if (northCard && (parseInt(northCard.find('.values-south:eq(0)').text(), 10) < cardValue[0])) {
    if (playerNumber === 1 && !northCard.hasClass('flip')) {
      northCard.addClass('flip');
    } else if (playerNumber === 2 && northCard.hasClass('flip')) {
      northCard.removeClass('flip');
    }
  }
  if (southCard && (parseInt(southCard.find('.values-north:eq(0)').text(), 10) < cardValue[2])) {
    if (playerNumber === 1 && !southCard.hasClass('flip')) {
      southCard.addClass('flip');
    } else if (playerNumber === 2 && southCard.hasClass('flip')) {
      southCard.removeClass('flip');
    }
  }
  goInProgress = false;

  playerNumber = (playerNumber === 1 ? 2 : 1);
  $('#player' + playerNumber + '-deck .card:visible:eq(0)').addClass('selected');
  update();
}

$('#player' + playerNumber + '-deck .card:visible:eq(0)').addClass('selected');
update();

function update() {
  $('#player').text(playerNumber);
  if (playerNumber === 1) {
    $('body').css({
      'background-color': 'red'
    });
  } else {
    $('body').css({
      'background-color': 'blue'
    });
  }
  player1score = $('#board .card.flip').length;
  player2score = $('#board .card:not(.flip)').length;
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