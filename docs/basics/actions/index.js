// init.js
class Component extends Mozart {};

// For larger projects, you might be better off looping through
// your components to create them like this
components = [
  "timer",
  "controls",
  "notifier"
]

components.each(component => Component.new(component));
var m = Component.index;

// notifer/actions.js
m.notifier.acts({
  msg_alert(_$, args) {
    // Show the alert with args.msg
  }
});

// timer/actions.js
m.timer.acts({
  start(_$, args) {
    var duration = m.controls.config.duration;
    setTimeout(_$.act.complete, duration);
  },

  complete(_$, args) {
    m.notifier.act.msg_alert({
      message: "Timer complete"
    });
    m.controls.act.reset();
  }
});

// controls/actions.js
m.controls.acts({
  start(_$, args) {
    m.timer.act.start();
    _$("button.start").disabled();
  }

  reset(_$, args) {
    _$("button.start").enabled();
  }
});

// controls/events.js
m.controls.events(_$ => {
  _$("button.start").click(_$.act.start);
});
