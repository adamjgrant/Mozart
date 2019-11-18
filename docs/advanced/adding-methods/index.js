class Component extends Mozart {
  transactions(fn) {
    super.add_function_method("transactions", fn);
  }

  calculations(obj) {
    super.add_object_method("calculations", super.functional_object(obj));
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
