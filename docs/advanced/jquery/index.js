// card_game/events.js
m.card_game.events(_$ => {
  // Because we have jQuery we can do this:
  _$("button").click(_$.act.shuffle);

  // Otherwise, we'd need to do this:
  _$("button").addEventListener("click", _$.act.shuffle);
})

// card_game/actions.js
m.card_game.act({
  shuffle() {
    // ...
  }
})
