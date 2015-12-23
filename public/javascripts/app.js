var grid = [3, 3];
var totalCards = grid[0] * grid[1];
var allCardNumbers = [];
var cards = ['bicycle', 'euro', 'apple', 'android', 'twitter', 'pagelines', 'drupal', 'ambulance', 'star-o'];
for (var ti = 0, tl = totalCards/2; ti < tl; ti++) {
  var card = cards[ti];
  allCardNumbers = allCardNumbers.concat([card, card]);
}

allCardNumbers = shuffle(allCardNumbers);
console.log('allCardNumbers', allCardNumbers);

var $table = $('table');
for (var ri = 0; ri < grid[1]; ri++) {
  var row = $('<tr>');
  for (var ci = 0; ci < grid[0]; ci++) {
    // var card = allCardNumbers.splice(0, 1);
    // TODO template
    var cell = $('<td>');
    // var cardDiv = $('<div>', {
    //   'id': makeid(),
    //   'class': 'card',
    //   'data-card': card
    // });
    // cardDiv.append($('<div>', {
    //   'class': 'front face'
    // }).html($('<i>', {
    //   'class': 'fa fa-smile-o'
    // })));
    // cardDiv.append($('<div>', {
    //   'class': 'back face'
    // }).html($('<i>', {
    //   'class': 'fa fa-' + card
    // })));
    // cell.html(cardDiv);
    row.append(cell);
  }
  $table.append(row);
}

function shuffle(o) {
  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};

var playerNumber = 1;
var playerGo = 1;
var goInProgress = false;
var cardIds = []
var player1score = 0;
var player2score = 0;
// $('.card').on('click', function() {
// TODO: placing cards or flipping cards or removing cards
$('td').on('click', function() {
  if (goInProgress) return;

  // TODO: card already flipped, or card already in current place
  // if ($(this).hasClass('flip')) return;
  if ($(this).find('.card').length) return;

  goInProgress = true;
  console.log('goInProgress');
  $(this).addClass('flip');
  cardIds[playerGo -1] = $(this).attr('id');
  // TODO: goes per player
  // if (playerGo === 2) {
    // checkForMatch();
    // TODO: looking for match, or playing out a placement move
    placeCard($(this))
  // } else {
  //   playerGo = 2;
  //   goInProgress = false;
  // }
});

function placeCard(cell) {
  var card = allCardNumbers.splice(0, 1);
  var cardDiv = $('<div>', {
    'id': makeid(),
    'class': 'card flip',
    'data-card': card
  });
  cardDiv.append($('<div>', {
    'class': 'front face'
  }).html($('<i>', {
    'class': 'fa fa-smile-o'
  })));
  cardDiv.append($('<div>', {
    'class': 'back face'
  }).html($('<i>', {
    'class': 'fa fa-' + card
  })));
  cell.html(cardDiv);

  // TODO: what effect does card have?
  goInProgress = false;
  playerNumber = (playerNumber === 1 ? 2 : 1);
  update();
}

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
  $('#player1score').text(player1score);
  $('#player2score').text(player2score);
  // if (!$('.card').length) {
  // TODO: end game  if all cards gone/used up???
  if ($('.card').length === 9) {
    if (player1score > player2score) {
      alert('Player 1 wins')
    } else if (player2score > player1score) {
      alert('Player 2 wins');
    } else {
      alert('Draw');
    }
  }
}

function checkForMatch() {
  console.log('cardIds', cardIds);
  setTimeout(function() {
    if ($('#' + cardIds[0]).data('card') === $('#' + cardIds[1]).data('card')) {
      console.log('match flashing');
      $('#' + cardIds[0] + ',#' + cardIds[1]).addClass('flash');
    }
  }, 200);
  setTimeout(function() {
    if ($('#' + cardIds[0]).data('card') === $('#' + cardIds[1]).data('card')) {
      console.log('removing match', cardIds[0]);
      $('#' + cardIds[0] + ',#' + cardIds[1]).remove();//.addClass('removing');
      if (playerNumber === 1) {
        player1score += 1;
      } else {
        player2score += 1;
      }
      update();
    } else {
      $('.card').removeClass('flip');
      playerNumber = (playerNumber === 1 ? 2 : 1);
      update();
    }
    playerGo = 1;
    goInProgress = false;
  }, 1000);
}

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}