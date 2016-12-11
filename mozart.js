// Returns _$ with proper context and _$.api
var _$_decorated = function(context) {
  var decorated = context._$.bind(context);
  decorated.api = context.api;
  return decorated;
}

String.prototype.interpolate = function (o) {
  return this.replace(/#\{(.+?)\}/g,
    function (a, b) {
      var r = o[b];
      return typeof r === 'string' || typeof r === 'number' ? r : a;
    }
  );
};

Object.deepExtend = function(destination, source) {
  for (var property in source) {
    if (source[property] && source[property].constructor &&
     source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      arguments.callee(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
};

// Mandatory object for storing your components
//    var m$.my_component = new Mozart();
window["m$"] = {}

// Create a new component with
//    var m$.my_component = new Mozart();
var Mozart = function() {
  this.scope = undefined;

  this.api    = {};
  this.routes = {};
  this.events = {};
};

Mozart.prototype._$ = function(selector) {
  var subscope = selector ? " " + selector : "";
  return $(this.scope + subscope);
}

Mozart.prototype.set_api = function(apis) {
  // Bind API functions
  for (var api_key in apis) {
    var self = this;
    this.api[api_key] = function(options) {
      this.api_fn.call(self, _$_decorated(self), options);
    }.bind({api_fn: apis[api_key]});
  }
};

Mozart.prototype.set_routes = function(routes) {
  // Interpolate routes
  for (var route_key in routes) {
    var route_data = JSON.parse(JSON.stringify(routes[route_key]));
    this.routes[route_key] = function(options) {
      route_data.url = route_data.url.interpolate(options)
      route_data.data = route_data.data || {}
      route_data.data = Object.deepExtend(route_data.data, options["data"]);
      return route_data;
    }.bind(this)
  }
};

Mozart.prototype.set_events = function(fn) { this.events = fn; }

// Initialize all components. Don't call this until after all your component code.
// Allows any cross talk between components to happen only when all components have loaded.
Mozart.init = function() {
  // Find all components
  for (var component_name in window["m$"]) {
    var component = m$[component_name],
        _$ = _$_decorated(component);

    if (!component instanceof Mozart) { return; }
    component.scope = '[data-component~="' + component_name + '"]';
    component.events.call(component, _$);
  }
}

// $ (if not jQuery) is just a thin wrapper around doc.qSA
if (typeof(jQuery) == "undefined") {
  window["$"] = function(selector) {
    return [].slice.call(
      document.querySelectorAll(selector)
    );
  }.bind(this)
}
