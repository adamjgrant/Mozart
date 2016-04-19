$.component = function(selectors, fn) {
  var selector = [""].concat((selectors).split(" ")).reduce(function(a, b) {
        return a + '[data-component~="' + b + '"]';
      }),
      $selector = $(selector),
      getInScope = function(scoped_selector) {
        return $selector.find(scoped_selector);
      };

  return (fn === undefined ? $selector : fn.call(this, getInScope));
}
