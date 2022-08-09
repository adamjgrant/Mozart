import Component from "../../mozart.js";

let timer = new Component("timer")

timer.update_display = (value = 0) => {
    console.log(["This is", this]);
    console.log(timer.q(".display"), value);
    console.log(timer.me);
}

timer.update_display();

export default timer;