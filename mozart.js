class Mozart {
  constructor(name) {
    this.name               = name;
    Mozart.index[this.name] = this;
    this.function_methods   = [];
    this.object_methods     = [];
    return this;
  }

  add_function_method(name, fn) {
    this.function_methods.push(fn);
    this[name] = fn;
  }
  add_object_method(name, obj)  {
    this.object_methods.push([name, obj]);
    this[name] = obj;
  }

  parse_object(obj, fn) {
    var _obj = {};
    for (var key in obj) {
      _obj[key] = args => {
        return fn(args, key);
      }
    }
    return _obj;
  }

  acts(obj) {
    var _obj = this.parse_object(obj, (args, key) => {
      var _$ = this.scoped_selector();
      obj[key](_$, args);
    });
    this.add_object_method("act", _obj);
    this.add_object_method("acts", _obj);
  }

  routes(obj) {
    var _obj = this.parse_object(obj, (args, key) => {
      var __obj = JSON.parse(JSON.stringify(obj[key]));
      __obj.url = obj[key].url.interpolate(args);
      return __obj;
    });

    this.add_object_method("route", _obj);
    this.add_object_method("routes", _obj);
  }

  config(obj) {
    this.add_object_method("config", obj);
  }

  events(fn)  {
    this.add_function_method("events", fn);
    this.add_function_method("event", fn);
  }

  scoped_selector() {
    var scoped_selector = (selector) => {
      var selector_array = document.querySelectorAll(`[data-component~='${this.name}'] ${selector}`);
      return (selector_array.length == 1 ? selector_array[0] : selector_array);
    }

    this.object_methods.forEach(object_method => {
      var name, object;
      [name, object] = object_method
      scoped_selector[name] = object;
    });

    return scoped_selector;
  }

  init() {
    this.function_methods.forEach(function_method => {
      var _$ = this.scoped_selector();
      function_method(_$);
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

String.prototype.interpolate = function(o) {
  return this.replace(/#\{(.+?)\}/g,
    function (a, b) {
      var r = o[b];
      return typeof r === 'string' || typeof r === 'number' ? r : a;
    }
  );
};
