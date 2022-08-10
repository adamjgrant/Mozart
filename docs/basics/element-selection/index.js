// From the context of a component
this.q(".title");
// Equivalent to
document.querySelector("[data-component='dropdown_button'] .title");

// You can also select an element from another component's scope.
import timer from "../components/timer.js";
let start_button = timer.q(".start");
// Equivalent to
let start_button = document.querySelector("[data-component='timer'] .start");