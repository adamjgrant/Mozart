class Mozart {
  constructor(name) {
    this.name               = name;
    Mozart.index[this.name] = this;
    this.function_methods   = [];
    this.object_methods     = [];
    return this;
  }

  function_method(fn) { this.function_methods.push(fn); }
  object_method(obj) { this.object_methods.push(obj); }

  acts(obj) { this.object_method(obj); }
  routes(obj) { this.object_method(obj); }
  config(obj) { this.object_method(obj); }
  events(fn) { this.function_method(fn); }

  _$(selector) {
    return document.querySelectorAll(`[data-component~='${this.name}'] ${selector}`)
  }

  init() {
    this.function_methods.forEach(function_method => {
      function_method(this._$.bind(this));
    });
  }
};

Mozart.index = {};

Mozart.init = () => {
  for (const component_name in Mozart.index) {
    var component = Mozart.index[component_name];
    component.init();
  }
}
