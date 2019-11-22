Component.register(["timer", "controls"]);

// controls/events.js
m.controls.events(_$ => {
  _$(".reset").click(m.timer.act.reset);

  // This would throw an error
  m.timer.act.set_clock({ seconds: 0 });
});

// timer/actions.js
m.timer.acts({
  reset(_$, args) {
    // We can call the private method
    // because it belongs to the component.
    _$.set_clock({ seconds: 0 });
  },

  priv: {
    set_clock(_$, args) {
      // This method calls to another private method below
      _$(".clock").innerHTML = _$.act.format_time(args.seconds);
    },

    format_time(_$, args) {
      // ...
    }
  }
});
