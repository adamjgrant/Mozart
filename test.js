var assert = require("chai").assert,
    expect = require("chai").expect,
    $      = require("jquery"),
    Mozart = require("./mozart");

expect(Mozart.init).to.be.a('function');

// 1st Class INSTANCE VARIABLE

var test_component = {},
    _$_outside;

test_component.events = function(_$) {
  _$.click(function() { return "foo"; });
  _$_outside
};

Mozart.init([
  "test-component"
]);

expect(_$_outside).to.be.a('function');

phantom.exit();
