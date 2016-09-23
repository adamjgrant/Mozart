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
    $.each(components, function(index, component) {
      var html_name = this.parameterize(component["class"], true),
          js_name = this.parameterize(component["class"], false),
          component_selectors = html_name;

      if (!window[js_name]) { console.error("Could not find the base component variable " + js_name) }

      // In case the user didn't define one or more of these
      $.each(["events", "api", "config"], function(index, prop) {
        window[js_name][prop] = window[js_name][prop] || {}
      });

      var router = this.create_router_for(js_name, window[js_name].config["router"]);

      // Call the events and api functions for the component to push in the _$
      this.set_scope(component_selectors, window[js_name].events, window[js_name], router);
      this.set_scope(component_selectors, window[js_name].api, window[js_name], router);
    }.bind(this));
  },

  create_router_for: function(name, config) {
    config = $.extend(true,
      {
        base_url: "/",
        base_name: name
      },
      config
    );
    root_url = config.base_url + name;

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
  },

  set_scope: function(selectors, fn, component_js, router) {
    var selector = [""].concat((selectors).split(" ")).reduce(function(a, b) {
          return a + '[data-component~="' + b + '"]';
        }),

        // TODO: _$ also needs .api, .router. and .config
        _$ = function(scoped_selector) { return $(selector + " " + scoped_selector); };

        _$.api    = component_js.api
        _$.router = router

    return (fn === undefined ? _$ : fn.call(this, _$));
  },

  parameterize: function(str, dashes) {
    var separator = dashes ? "-" : "_"
    return str.toLowerCase().replace(/[^a-z0-9]+/g,separator).replace(/(^-|-$)/g,'');
  }
}
