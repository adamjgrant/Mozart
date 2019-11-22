// You only need to do this once for the project.
// Any component you create is a object of m
class Component extends Mozart {};
var m = Component.index;

// <-- For each component you create
new Component("contacts");
// Now you have these methods available.
m.contacts.acts({});
m.contacts.routes({});
m.contacts.events(_$ => {});
// -->

// Run this once after you've defined all your components.
Mozart.init();
