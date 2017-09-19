# Triad x3

Poor-mans version of Triple Triad from FF VIII.
http://finalfantasy.wikia.com/wiki/Triple_Triad


## Running

```
npm i
npm start
```

Visit http://localhost:3000

## How to Play

See rules in http://finalfantasy.wikia.com/wiki/Triple_Triad.
The game is local 2 player only (currently).

Default rules:

- Open (Can see each others cards)
- Each player has a fixed set of 5 cards each

Same, Same Wall, Plus, Random & Hidden are *not* currently implemented.
Player decks with more than 5 cards is *not* currently implemented.

## Contributing

All UI code is in `/public/javascripts/app.js`. No frameworks or libraries other than jQuery & fort awesome are used.

The main server files are `bin/www` (for starting the server) and `app.js` (the express app).
The server doesn't have any logic currently. It just serves static files from public.

## Possible Future Features

See https://github.com/david-martin/triad-x3/issues & below:

- Player names
- Player colour selection
- Success fade out & scale css
- Player colour win message
- Grid size selector
- Ipad Safari support
- keyboard support
- Statistics report on finish
- special cards e.g. flip all for 2 seconds, show all recently flipped
- Add more cards
- Allow custom card styles
- Start new game when finished
- Players 2-4
- Time attack 1 player
- Time attack high score
- Remote multiplayer
- Remember player on refresh

![Screenshot](screenshot.png)
