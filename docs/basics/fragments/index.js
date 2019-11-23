class Component extends Mozart {};
Component.register("registration");
var m = Component.index;

m.registration.events(_$ => {
  var fragment = _$.template()
  document.body.appendChild(fragment);
});

// Or elsewhere, outside the component

var fragment = m.registration.template();
document.body.appendChild(fragment);
