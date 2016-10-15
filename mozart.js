var Mozart = {
  Component: function(config, parents) {
    parents = parents || {}
    this.config = $.extend(true, {}, parents["config"], config);
  }
};

// Table      = new Mozart.Component({api: { foo: function() {} }})
// ChildTable = new Mozart.Component({api: { bar: function() {} }}, Table)
