var assert = require("chai").assert,
    expect = require("chai").expect,
    $      = require("jquery"),
    Mozart = require("./mozart");

// Our test component

var test_component = {};
test_component.events = function(_$) {
  _$.click(function($) { return "foo"; });
};

expect(Mozart.init).to.be.a('function');

// 1st Class INSTANCE VARIABLE
Mozart.init([
  "test-component"
]);

// Instance variable has prototype functions
expect(test_component.api).to.be.a('function');

phantom.exit();
