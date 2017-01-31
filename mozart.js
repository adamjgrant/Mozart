// Returns _$ with proper context and _$.api
var _$_decorated = function(context) {
  // TODO: The _$ between two api functions are different instances.
  // So if a user makes their own _$.foo = "blah", _$.foo in another
  // fn of the same api will not exist.
  var decorated      = context._$.bind(context);
  decorated.api      = context.api;
  decorated.routes   = context.routes;
  decorated.here = function(nodeScope, selector) {
    parent_component_name = context.scope.split("\"")[1];

    var setParentScope = function(node) {
      if (node.dataset.component == parent_component_name) {
        return node
      }
      else {
        parentScope = node.parentNode;
        return setParentScope(parentScope);
      }
    }
    context.nodeScope = setParentScope(nodeScope);
    return decorated.call(context, selector);
  }
  return decorated;
}

// $ (if not jQuery) is just a thin wrapper around doc.qSA
if (typeof(jQuery) == "undefined") {
  window["$"] = function(selector) {
    return [].slice.call(
      document.querySelectorAll(selector)
    );
  }.bind(this)
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
  this.scope     = undefined;
  this.nodeScope = undefined;
};

Mozart.prototype._$ = function(selector) {
  if (selector instanceof Mozart) { return $(this.scope) } // TODO handle Node Scope being set.
  var subscope = selector ? " " + selector : "";
  if (this.nodeScope) {
    return typeof(jQuery) == "undefined" ? this.nodeScope.querySelectorAll(selector) : $(selector).find(selector);
  }
  else {
    return $(this.scope + subscope);
  }
};

Mozart.prototype.api = function(apis) {
  // Bind API functions
  for (var api_key in apis) {
    var self = this;
    this.api[api_key] = function(options) {
      return this.api_fn.call(self, _$_decorated(self), options);
    }.bind({api_fn: apis[api_key]});
  }
};

Mozart.prototype.routes = function(routes) {
  // Interpolate routes
  for (var route_key in routes) {
    var route_data = JSON.parse(JSON.stringify(routes[route_key]));
    this.routes[route_key] = function(options) {
      var _route_data = JSON.parse(JSON.stringify(route_data));
      _route_data.url = route_data.url.interpolate(options)
      _route_data.data = route_data.data || {}
      _route_data.data = Object.deepExtend(_route_data.data, options["data"]);
      return _route_data;
    }.bind(this)
  }
};

Mozart.prototype.events = function(fn) { this.events = fn; }

// Initialize all components. Don't call this until after all your component code.
// Allows any cross talk between components to happen only when all components have loaded.
Mozart.init = function() {
  // Find all components
  var component_events = []
  for (var component_name in window["m$"]) {
    var component = m$[component_name],
        _$ = _$_decorated(component);

    if (!component instanceof Mozart) { return; }
    component.scope = '[data-component~="' + component_name + '"]';
    component_events.push([component, _$]);
  }

  component_events.forEach(function(component_context) {
    component_context[0].events.call(component_context[0], component_context[1]);
  });
}

Mozart.clone = function(template_element) {
  // TODO: template_element could be a jQuery element. Let's make sure we scrub
  // it to work as a native DOM element.
  var parser = new DOMParser,
      parent = document.createElement("div");

  if (!template_element) { return console.error("No <template> element provided"); }
  if (typeof(template_element) !== "object") {
    return console.error("Element to clone expected to be a <template> element. Was a " + typeof(template_element));
  }

  parent.append(document.importNode(template_element.content, true));
  // TODO Leverage DocumentFragment.cloneNode? Might not need some of the above.
  var copy = parser.parseFromString(parent.innerHTML, "text/xml").documentElement;
  var div = document.createElement('div');
  div.appendChild(copy);
  copy = div.childNodes[0];

  return (typeof(jQuery) == "undefined") ? copy : $(copy);
}
