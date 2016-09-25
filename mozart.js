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
    window[this.js_name].config = window[this.js_name].config || {}
    default_variable = {
      config: {
        router: this.get_router(),
        api: this.get_api()
      },
      router: {},
      api: {}
    };
    window[this.js_name] = $.extend(true, default_variable, window[this.js_name]);
    default_variable.router = this.set_router();
    default_variable.api = this.set_api();
    window[this.js_name] = $.extend(true, default_variable, window[this.js_name]);
    this._$ = function(fn) { return this.set_scope(fn) };
  }
}

String.prototype.interpolate = function (o) {
    return this.replace(/#\{(.+?)\}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

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
  // TODO: This needs to be split out into component.router function and
  // component.config.router object as outlined in the readme.
  router = $.extend(true,
    {
      base_url: "/",
      name: this.js_name
    },
    window[this.js_name].config["router"]
  );

  router.routes = {
    index: {
      url: "#{base_url}#{name}.json",
      method: "GET"
    },
    show: {
      url: "#{base_url}#{name}/#{id}.json",
      method: "GET"
    },
    destroy: {
      url: "#{base_url}#{name}/#{id}.json",
      method: "DELETE"
    },
    update: {
      url: "#{base_url}#{name}/#{id}",
      method: "PUT"
    },
    new: {
      url: "#{base_url}#{name}/new.json",
      method: "GET"
    },
    create: {
      url: "#{base_url}#{name}/#{id}",
      method: "POST"
    }
  }

  return router;
};

Mozart.Component.prototype.get_api = function() {
  // TODO: Like what we're going to do with route, this should be split out into
  // a component.api function and component.config.api object so that _$ can be
  // applied to component.config.api's functions from component.api functions
  var api = $.extend(true, {
    index: function(_$) {
      $.get(this.variable.router.index);
    }
  }, window[this.js_name].api);
  // for (key in api) { this.set_scope(api[key]); }

  return api
};

Mozart.Component.prototype.set_api = function() {};
Mozart.Component.prototype.set_router = function() {
  var routes = {};
  $.each(window[this.js_name].config.router.routes, function(route_key, value) {
    routes[route_key] = function(options) {
      router_config = window[this.js_name].config.router;
      options = $.extend(true, {
        base_url: router_config.base_url,
        name: router_config.name
      }, options);
      return {
        url: value.url.interpolate(options),
        method: value.method
      }
    }.bind(this);
  }.bind(this));
  return routes
};

Mozart.Component.prototype.set_scope = function(fn_name_or_function) {
  var selector = [""].concat((this.html_name).split(" ")).reduce(function(a, b) {
        return a + '[data-component~="' + b + '"]';
      }),
      _$ = function(scoped_selector) { return $(selector + " " + scoped_selector); };

  _$.api    = window[this.js_name].api
  _$.router = window[this.js_name].router
  var fn = typeof(fn_name_or_function) == "function" ? fn_name_or_function : window[this.js_name][fn_name_or_function];
  return (fn === undefined ? _$ : fn.call(this, _$));
};
