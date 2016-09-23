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

      components.push({ class: component_class, instance: component_instance });
    }

    $.each(_components, format_component_as_class_and_instance);
    $.each(components, function(index, component) {
      var html_name = this.parameterize(component["class"], true),
          js_name = this.parameterize(component["class"], false),
          component_selectors = html_name;

      // Push _$ through to the component's events function
      // TODO: Not sure this is the best way to go. Race condition with user's event
      // function being defined. Maybe we need to rethink syntax.
      $(document).ready(function() {
        this.scope(component_selectors, window[js_name].events);
      });
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
