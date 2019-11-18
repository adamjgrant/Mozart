class Mozart {
  constructor(name) {
    this.name               = name;
    Mozart.index[this.name] = this;
    this.function_methods   = [];
    this.object_methods     = [{ priv: [] }];
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
      ((obj, _obj, key) => {
        var _fn = args => { return fn.call(this, obj, args, key); }
        if (key == "priv") {
          _obj.priv = _obj.priv || {};
          _obj.priv[key] = _fn;
        }
        else _obj[key] = _fn;
      })(obj, _obj, key);
    }

    return _obj;
  }

  acts(obj) {
    var _obj = this.parse_object(obj, (obj, args, key) => {
      var _$ = this.scoped_selector();
      obj[key](_$, args);
    });

    this.add_object_method("act", _obj);
    this.add_object_method("acts", _obj);
  }

  act(obj) { return this.acts(obj); }

  routes(obj) {
    var _obj = this.parse_object(obj, (obj, args, key) => {
      var __obj = JSON.parse(JSON.stringify(obj[key]));
      __obj.url = obj[key].url.interpolate(args);
      __obj.data = args;

      Object.keys(args).forEach(_key => {
        if (!!obj[key].url.match(_key)) {
          delete __obj.data[_key];
        }
      });

      return __obj;
    });

    this.add_object_method("route", _obj);
    this.add_object_method("routes", _obj);
  }

  route(obj) { return this.routes(obj); }

  config(obj) {
    this.add_object_method("config", obj);
  }

  events(fn)  {
    this.add_function_method("events", fn);
    this.add_function_method("event", fn);
  }

  event(fn) { return this.events(fn); }

  scoped_selector() {
    var scoped_selector = (selector) => {
      var selector_string = `[data-component~='${this.name}'] ${selector}`;
      if (typeof(jQuery) == "function") return $(selector_string);
      var selector_array = document.querySelectorAll(selector);
      return (selector_array.length == 1 ? selector_array[0] : selector_array);
    }

    var remove_empty_priv = (obj) => {
      var key = Object.keys(obj)[0];
      if (key != "priv" || obj[key].length) {
        return obj;
      }
    }

    var all_obj_methods_pub_and_priv = this.object_methods.filter(remove_empty_priv).map(object_method => {
      if (Object.keys(object_method)[0] != "priv") return object_method;
      else { return object_method.priv; }
    });

    console.log(all_obj_methods_pub_and_priv);
    all_obj_methods_pub_and_priv.forEach(object_method => {
      var name, object;
      [name, object] = object_method;
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
