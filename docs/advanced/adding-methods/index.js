class Component extends Mozart {
  transactions(fn) {
    super.function_method("transactions", fn);
  }

  calculations(obj) {
    super.object_method("calculations", obj);
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
