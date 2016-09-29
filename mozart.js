window.m$ = {}
// Constructor
var Mozart = {
  init: function(_components) {
    var components = [];

    var format_component_as_class_and_instance = function(index, _component) {
      var component_class = _component,
          component_instance = _component;

      if (typeof(_component) == "object") {
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
      var component = new this.Component(_component)
      component.set_scope("events");
      component.set_scope("ready");
    }.bind(this));
  },

  initialized: [],

  parameterize: function(str, dashes) {
    var separator = dashes ? "-" : "_"
    return str.toLowerCase().replace(/[^a-z0-9]+/g,separator).replace(/(^-|-$)/g,'');
  },

  Component: function(class_and_instance) {
    var initialize = function(name, origin) {
      this.js_name   = Mozart.parameterize(name);
      m$[this.js_name]        = m$[this.js_name] || {};
      m$[this.js_name].config = m$[this.js_name].config || {};

      default_variable = {
        config: {
          router: this.get_router(),
          api: this.get_api()
        },
        router: {},
        api: {}
      };
      default_variable        = origin ? m$[origin] : default_variable
      m$[this.js_name]        = $.extend(true, {}, default_variable, m$[this.js_name]);
      default_variable.router = this.set_router(origin);
      this.set_api(origin);
      m$[this.js_name]        = $.extend(true, {}, default_variable, m$[this.js_name]);
      this._$                 = function(fn) { return this.set_scope(fn) };
      Mozart.initialized.push(name);
    }.bind(this);

    if (class_and_instance['class'] == class_and_instance['instance']) {
      initialize(class_and_instance['class']);
    }
    else if (Mozart.initialized.indexOf(class_and_instance['class']) == -1) {
      initialize(class_and_instance['class']);
      initialize(class_and_instance['instance'], class_and_instance['class']);
    }
    else {
      initialize(class_and_instance['instance'], class_and_instance['class']);
    }
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
  variable = m$[this.js_name];
  if (!variable) {
    return console.error("Could not find the base component variable " + this.js_name)
  }
  else {
    return m$[this.js_name];
  }
};

Mozart.Component.prototype.get_router = function() {
  router = $.extend(true, {},
    {
      base_url: "/",
      name: this.js_name
    },
    m$[this.js_name].config["router"]
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
  var methods = ["index", "show", "destroy", "update", "new", "create"],
      default_api = {};

      $.each(methods, function(index, method) {
        default_api[method] = function(_$, options) {
          return $.ajax(m$[this.js_name].router[method].call(this, options))
        }.bind(this);
      }.bind(this));

  var api = $.extend(true, {}, default_api, m$[this.js_name].config.api);
  return api;
};

Mozart.Component.prototype.set_api = function() {
  var decorate = function() {
    var api = {},
        _$ = this.set_scope();

    $.each(m$[this.js_name].config.api, function(api_key, value) {
      api[api_key] = function(options) {
        // _$.api = this;
        return m$[this.js_name].config.api[api_key].call(this, _$, options)
      }.bind(this);
    }.bind(this));

    m$[this.js_name].api = api;
  }.bind(this);
  // Calls twice to nest the api on the _$ within each api call itself.
  decorate();
  decorate();
};

Mozart.Component.prototype.set_router = function() {
  var routes = {};
  $.each(m$[this.js_name].config.router.routes, function(route_key, value) {
    routes[route_key] = function(options) {
      router_config = m$[this.js_name].config.router;
      options = $.extend(true, {}, {
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
  var component_name = this.js_name,
      selector = [""].concat((component_name).split(" ")).reduce(function(a, b) {
        return a + '[data-component~="' + b + '"]';
      }),
      _$ = function(scoped_selector) {
        if ($(scoped_selector).data("component") == component_name) {
          return $(selector)
        }
        else {
          return $(selector).find(scoped_selector);
        }
      }

  _$.api      = m$[this.js_name].api;
  _$.router   = m$[this.js_name].router;
  _$.selector = selector;
  _$.store    = m$['store'] ? m$.store[this.js_name] : {};
  _$.set      = function(key, value) {
    m$[this.js_name][key] = value;
  }.bind(this);
  _$.set_api   = function(obj) {
    m$[this.js_name].config.api = $.extend(true, {}, m$[this.js_name].config.api, obj);
    this.set_api();
  }.bind(this);
  var fn = typeof(fn_name_or_function) == "function" ? fn_name_or_function : m$[this.js_name][fn_name_or_function];
  return (fn === undefined ? _$ : $(document).ready(function() {
    fn.call($(selector), _$) }.bind($(selector))
  ));
};
