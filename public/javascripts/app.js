var cards = ['cardf00', 'cardf00', 'card0f0', 'card0f0', 'card00f', 'card00f'];

$('td').each(function(index) {
  console.log('index', index);
  $(this).html('<div id="' + makeid() + '" class="card ' + cards[index] + ' off"></div>');
});

var playerNumber = 1;
var playerGo = 1;
var goInProgress = false;
var cardIds = []
$('.card').on('click', function() {
  if (goInProgress) return;
  if (!$(this).hasClass('off')) return;

  goInProgress = true;
  console.log('goInProgress');
  $(this).removeClass('off');
  cardIds[playerGo -1] = $(this).attr('id');
  if (playerGo === 2) {
    checkForMatch();
  } else {
    playerGo = 2;
    goInProgress = false;
  }
});

function checkForMatch() {
  console.log('cardIds', cardIds);
  if ($('#' + cardIds[0]).prop('class') === $('#' + cardIds[1]).prop('class')) {
    console.log('match flashing');
    $('#' + cardIds[0]).addClass('flash');
    $('#' + cardIds[1]).addClass('flash');
  }
  setTimeout(function() {
    if ($('#' + cardIds[0]).prop('class') === $('#' + cardIds[1]).prop('class')) {
      console.log('removing match', cardIds[0]);
      $('#' + cardIds[0]).remove();
      $('#' + cardIds[1]).remove();
    } else {
      playerNumber = (playerNumber === 1 ? 2 : 1);
    }
    playerGo = 1;
    goInProgress = false;
    $('.card').addClass('off');
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