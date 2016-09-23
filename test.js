var assert = require("chai").assert,
    expect = require("chai").expect,
    $      = require("jquery"),
    Mozart = require("./mozart");

expect(Mozart.init).to.be.a('function');

// 1st Class INSTANCE VARIABLE

var test_component = {},
    _$_outside_api,
    _$_outside_event;

test_component.events = function(_$) {
  _$("p").click(function() { return "foo"; });
  _$_outside_event = _$;
};

test_component.api = function(_$) {
  _$_outside_api = _$;

  return {
    create: function(blah) {}
  }
}

Mozart.init([
  "test-component"
]);

expect(_$_outside_event).to.be.a('function');
expect(_$_outside_api).to.be.a('function');

phantom.exit();
