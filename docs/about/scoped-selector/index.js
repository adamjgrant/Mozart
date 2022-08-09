import Component from "./mozart.js";
let form = new Component("form");

form.create = function() { /* ... */ }

// Scoped-selection of the create 
// button to call the submit method above.
let create = form.q(".create");
create.addEventListener("click", form.create);