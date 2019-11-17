class Component extends Mozart {
  transactions(fn) {
    this.function_method(fn);
  }

  calculations(obj) {
    this.object_method(obj);
  }
};

var m = Component.index;
new Component("accountant");

m.accountant.transactions(_$ =>  {
  // ...
})

m.accountant.calculations({
  add: (_$, args) {
    // ...
  }
})
