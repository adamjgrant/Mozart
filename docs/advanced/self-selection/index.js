import Component from "mozart.js";
import notifier from "components/notifier";
let list = new Component("list");

list.assign({
  flash_error(message) {
    notifier.error(message) ;
    this.highlight();
  },

  highlight() {
    this.me.style.backgroundColor = "red";
  }
});