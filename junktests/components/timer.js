import Component from "../../mozart.js";

let timer = new Component("timer")

timer.store.value = 0;
timer.increment_by_one_second = function() {
  timer.store.value++;
  this.q(".display").innerHTML = timer.store.value;
}

export default timer;