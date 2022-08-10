import Component from "../../../mozart.js";
import timer from "../timer.js";

let controls = new Component("controls");

controls.assign({
    start() {
        this.store.interval = setInterval(timer.increment_by_one_second, 1000);
    },

    stop() {
        window.clearInterval(this.store.interval);
    }
});

controls.q(".start").addEventListener("click", controls.start);
controls.q(".stop").addEventListener("click", controls.stop);

export default controls;