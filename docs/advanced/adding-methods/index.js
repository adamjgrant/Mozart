class Component extends Mozart {
  transactions(fn) {
    super.function_method(fn);
  }

  calculations(obj) {
    super.object_method(obj);
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

Mozart.init();
