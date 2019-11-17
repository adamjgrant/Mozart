class Mozart {
  constructor(name) {
    Mozart.index[name]    = this;
    this.function_methods = [];
    this.object_methods   = [];
  }

  function_method(fn) {
    this.function_methods.push(fn);
  }

  object_method(obj) {
    this.object_methods.push(obj);
  }

  acts(obj) {
    this.object_method(obj);
  }

  routes(obj) {
    this.object_method(obj);
  }

  config(obj) {
    this.object_method(obj);
  }

  events(fn) {
    this.function_method(fn);
  }
};

Mozart.index = {
  init: () => {
    return "Implementation Missing";
  }
};
