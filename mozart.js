class Mozart {
  constructor(name) {
    this.name               = name;
    Mozart.index[this.name] = this;
    this.function_methods   = [];
    this.object_methods     = [];
    return this;
  }

  function_method(name, fn) { this.function_methods.push(fn); }
  object_method(name, obj)  { this.object_methods.push([name, obj]); }

  acts(obj)   { this.object_method("acts", obj); }
  routes(obj) { this.object_method("routes", obj); }
  config(obj) { this.object_method("config", obj); }
  events(fn)  { this.function_method("events", fn); }

  _$(selector) {
    if (selector) {
      return document.querySelectorAll(`[data-component~='${this.name}'] ${selector}`)
    }
    return { foo: "bar" }
  }

  init() {
    var self = this;

    this.function_methods.forEach(function_method => {
      function_method(this._$.bind(this));
    });

    this.object_methods.forEach(object_method => {
      var name, object;
      [name, object] = object_method;

      for (var sub_method in object) {
        this[name][sub_method] = (args) => {
          object[sub_method].call(this, this._$.bind(this), args);
        }
      }
    });
  }
};

Mozart.index = {};

Mozart.init = () => {
  for (var component_name in Mozart.index) {
    var component = Mozart.index[component_name];
    component.init();
  }
}
