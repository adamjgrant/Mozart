// counter/events.js
m.counter.events(_$ => {
  _$(".reset").click(_$.act.reset_counter)
})

// counter/actions.js
m.counter.acts({
  reset_counter(_$, args) { _$.config.counter = 0; }
})
