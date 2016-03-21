$.component = function(selector, fn) {
  var $selector = $("[data-component~='" + selector + "']"),
  getInScope = function(scoped_selector) {
    return $selector.find(scoped_selector);
  };
  return fn.call(this, getInScope); 
}
