var playerNumber = 1;
$('td').on('click', function() {
  $(this).html('<div class="card player' + playerNumber + '"></div">');
  playerNumber = (playerNumber == 1 ? 2 : 1);
});