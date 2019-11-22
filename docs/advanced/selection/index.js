// OPTION 1
// ========

m.lookup.acts({
  blink_green(_$, args) {
    // args.element isn't the component, but if you pass this
    // in, Mozart will find it.
    var me = _$.me(args.element);
    me.classList.add("blink");
  }
});
m.lookup.acts({
  blink_green(_$, args) {
    var me = _$.me();
    me.classList.add("blink");
    // This will work fine as long as there is only one
    // "lookup" component. Otherwise, you'll get an array
    // of the components back.
  }
});

// OPTION 2
// ========
// But maybe this is a collection of lookup components
// and we're executing this action from some event
// on the specific component we want to blink.

m.lookup.events(_$ => {
  _$(".validate").addEventListener("click", (e) => {
    _$.act.blink_green({ element: e.target });
  });
});

m.lookup.acts({
  blink_green(_$, args) {
    // args.element isn't the component, but if you pass this
    // in, Mozart will find it.
    var me = _$.me(args.element);
    me.classList.add("blink");
  }
});

// OPTION 3
// ========
// And here's another way where the component itself is the
// element being clicked.

m.lookup.events(_$ => {
  var lookups      = _$.me(),
      clickHandler = (e) => _$.act.blink_green({ element: e });

  // This weird syntax is to prevent variable hoisting.
  // If you're using jQuery, you probably don't need to do this.
  lookups.forEach(lookup => (clickHandler)(lookup));
});

m.lookup.acts({
  blink_green(_$, args) {
    // args.element isn't the component, but if you pass this
    // in, Mozart will find it.
    var me = _$.me(args.element);
    me.classList.add("blink");
  }
});
