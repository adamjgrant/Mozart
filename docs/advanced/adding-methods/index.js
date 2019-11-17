class Component extends Mozart {
  transactions(args) {
    return this.function_method(args);
  }

  calculations(args) {
    return this.object_method(args);
  }
};

var m = Component.index;
m.accountant = new Component;

m.accountant.transactions(_$ =>  {
  // ...
})

m.accountant.calculations({
  add: (_$, args) {
    // ...  
  }
})
