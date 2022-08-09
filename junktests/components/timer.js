import Component from "../../mozart.js";

let timer = new Component("timer")

timer.update_display = function(value = 0) {
    console.log(["This is", this]);
    console.log(timer.q(".display"), value);
}

console.log(timer.update_display());