import Component from "mozart.js";
let dropdown_button = new Component("dropdown_button");

dropdown_button.attach({
  open() {
    // ...
    this.change_title("Click again to close");
  },

  close() {
    // ...
    this.change_title("Open menu")
  },

  change_title(title) {
    this.q(".title").innerHTML = title;
  }
});