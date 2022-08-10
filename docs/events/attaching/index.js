import Component from "mozart.js";
import notifier from "components/notifier";
let list = new Component("list");

list.attach({
  flash_error(message = "Not allowed") {
    notifier.error(message) ;
    this.highlight();
  },

  highlight() {
    this.me.style.backgroundColor = "red";
  }
});

list.q("[disabled]").addEventListener("click", list.flash_error);