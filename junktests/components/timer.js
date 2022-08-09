import Component from "../../mozart.js";

let timer = new Component("timer")

timer.store.value = 0;
timer.increment_by_one_second = function() {
  this.store.value++;
  this.q(".display").innerHTML = this.store.value;
}

export default timer;