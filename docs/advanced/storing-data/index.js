import Component from "./mozart.js";
let widget = new Component("widget");

widget.store.count = 0;

widget.assign({
  update_count() { 
    this.store.count++; 
  },

  show_count() { 
    this.q(".display").innerHTML = this.store.count;
  }
});

const button = widget.q(".add-to-count");
button.addEventListener("click", widget.update_count);