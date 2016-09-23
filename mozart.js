// Constructor
var Mozart = {
  init: function(_components) {
    var components = [];

    var format_component_as_class_and_instance = function(index, _component) {
      component_class = component_instance = _component;

      if (typeof(_component) != "string") {
        for (key in _component) {
          component_class = key;
          component_instance = _component[key];
        }
      }
      else if (typeof(_component) != "object" && typeof(_component) != "string") {
        console.error(_component, "not a valid init object. Must be a string or {class:instance}")
      }

      components.push({ class: component_class, instance: component_instance });
    }

    $.each(_components, format_component_as_class_and_instance);
    $.each(components, function(index, _component) {
      var component = new this.Component(_component["class"])
      component.set_scope("events");
    }.bind(this));
  },

  parameterize: function(str, dashes) {
    var separator = dashes ? "-" : "_"
    return str.toLowerCase().replace(/[^a-z0-9]+/g,separator).replace(/(^-|-$)/g,'');
  },

  Component: function(name) {
    this.html_name = Mozart.parameterize(name, true);
    this.js_name   = Mozart.parameterize(name);
    this.variable  = this.get_variable();
    this.variable  = $.extend(true, {
      config: {},
      router: this.get_router(),
      api:    this.set_api()
    }, this.variable);
    this._$ = function(fn) { return this.setScope(fn) };
  }
}

Mozart.Component.prototype.get_variable = function() {
  variable = window[this.js_name];
  if (!variable) {
    return console.error("Could not find the base component variable " + this.js_name)
  }
  else {
    return window[this.js_name];
  }
};

Mozart.Component.prototype.get_router = function() {
  // Override user config for router with whatever the user defines
  this.variable.router = $.extend(true,
    {
      base_url: "/",
      base_name: name
    },
    this.variable.router
  );
  root_url = this.variable.router.base_url + this.js_name;

  return {
    index: {
      url: root_url + ".json",
      method: "GET"
    },
    show: {
      url: root_url + "/:id.json",
      method: "GET"
    },
    destroy: {
      url: root_url + "/:id.json",
      method: "DELETE"
    },
    update: {
      url: root_url + "/:id",
      method: "PUT"
    },
    new: {
      url: root_url + "/new.json",
      method: "GET"
    },
    create: {
      url: root_url + "/:id",
      method: "POST"
    }
  }
};

Mozart.Component.prototype.set_api = function() {
  var api = $.extend(true, {
    index: function(_$) {
      $.get(this.variable.router.index);
    }
  }, this.variable.api);
  // for (key in api) { this.set_scope(api[key]); }

  return api
};

Mozart.Component.prototype.set_scope = function(fn_name_or_function) {
  var selector = [""].concat((this.html_name).split(" ")).reduce(function(a, b) {
        return a + '[data-component~="' + b + '"]';
      }),
      // TODO: _$ also needs .api, .router. and .config
      _$ = function(scoped_selector) { return $(selector + " " + scoped_selector); };

  _$.api    = this.variable.api
  _$.router = this.variable.router
  var fn = typeof(fn_name_or_function) == "function" ? fn_name_or_function : this.variable[fn_name_or_function];
  return (fn === undefined ? _$ : fn.call(this, _$));
};
