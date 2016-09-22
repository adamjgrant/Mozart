// Constructor
Mozart = {
  init: function(_components) {
    var components = [];

    var format_component_as_class_and_instance = function(index, _component) {
      component_class = component_instance = _component;

      if (typeof(_component) != "String") {
        for (key in _component) {
          component_class = key;
          component_instance = _component[key];
        }
      }
      else if (typeof(_component) != "object") {
        console.error(_component, "not a valid init object. Must be a string or {class:instance}")
      }

      components.push { class: component_class, instance: component_instance };
    }

    $.each(_components, format_component_as_class_and_instance);
    $.each(components, function(component) {
      var html_name = this.parameterize(this.scope(component["class"]), true),
          js_name = this.parameterize(this.scope(component["class"]), false),
          component_function = window[js_name],
          component_selectors = [html_name];

      // if (component["instance"]) {
      //   component_selectors.push(this.parameterize(this.scope(component["instance"]), true));
      // }

      component_function(component_selectors, component_function.events);
    }.bind(this));
  },

  scope: function(selectors, fn) {
    var selector = [""].concat((selectors).split(" ")).reduce(function(a, b) {
          return a + '[data-component~="' + b + '"]';
        }),
        $selector = $(selector),
        _$ = function(scoped_selector) {
          return $selector.find(scoped_selector);
        };

    return (fn === undefined ? $selector : fn.call(this, _$));
  },

  parameterize: function(str, dashes) {
    var separator = dashes ? "-" : "_"
    return str.toLowerCase().replace(/[^a-z0-9]+/g,separator).replace(/(^-|-$)/g,'');
  },

  Component: function() {}
}
Mozart.Component.prototype.api = function() {};

if (typeof(module) == "object") {
  module.exports = Mozart;
}

$.component = function(selectors, fn) {
}
