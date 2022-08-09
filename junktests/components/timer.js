import Component from "../../mozart.js";

let timer = new Component("timer")

timer.update_display = (value = 0) => {
    return this;
    console.log(this.q(".display"), value);
    return "foo";
}

console.log(timer.update_display());