import Component from "../../mozart.js";

let timer = new Component("timer")

timer.value = 0;
timer.increment_by_one_second = () => {
  timer.value++;
  timer.q(".display").innerHTML = timer.value;
}

export default timer;