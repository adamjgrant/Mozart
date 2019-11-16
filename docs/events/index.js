// With jQuery
m.generator.events(_$ => {
  _$("button").click(_$.acts.generate);
});

// Plain JavaScript
m.generator.events(_$ => {
  _$("button")[0].addEventListener("click", _$.acts.generate);
});
