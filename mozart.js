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

Mozart.prototype._$ = function(selector) { return this._$$(selector)[0] || []; }

Mozart.prototype._$$ = function(selector) { return $$(this.scope + " " + selector); }

Mozart.prototype.set_api = function(apis) {
  // Bind API functions
  for (var api_key in apis) {
    var api_fn = apis[api_key];
    this.api[api_key] = function(options) {
      api_fn.call(this, this._$.bind(this), options);
    }.bind(this)
  }
};

Mozart.prototype.set_routes = function(routes) {
  // Interpolate routes
  for (var route_key in routes) {
    // var api_fn = apis[api_key];
    // this.api[api_key] = function(options) {
    //   api_fn.call(this, this._$.bind(this), options);
    // }.bind(this)
  }

  // String.prototype.interpolate = function (o) {
  //   return this.replace(/#\{(.+?)\}/g,
  //     function (a, b) {
  //       var r = o[b];
  //       return typeof r === 'string' || typeof r === 'number' ? r : a;
  //     }
  //   );
  // };

};

Mozart.prototype.set_events = function() {

};

// Initialize all components. Don't call this until after all your component code.
// Allows any cross talk between components to happen only when all components have loaded.
// TODO: I think this only has to happen for events.
Mozart.init = function() {
  // Find all components
  for (var component_name in window["m$"]) {
    var component = m$[component_name];
    if (!component instanceof Mozart) { return; }
    component.scope = '[data-component~="' + component_name + '"]';
  }
}

// Use jQuery if it's here, otherwise make $ a shorthand
// $$ is for an array
window["$$"] = function(selector) {
  return document.querySelectorAll(selector);
};

// $ (if not jQuery) is the first result of $$.
if (typeof(jQuery) == "undefined") {
  window["$"] = function(selector) {
    var elements = [].slice.call($$(selector));
    return (elements ? elements[0] : []);
  }.bind(this)
}
