// var assert = require("chai").assert,
//     expect = require("chai").expect,
//     mocha  = require("mocha"),
//     $      = require("jquery");
//
//
//
//
//
//

describe("Mozart class", function() {
  it("is defined", function() {
    expect(Mozart).to.be.a('object');
    expect(Mozart.init).to.be.a('function');
  });
});

describe("Mozart 1st Class Instance Variable", function() {
  var _$_outside_api,
      _$_outside_event,
      _$_outside_router;
      
  window.test_component = {};

  test_component.events = function(_$) {
    _$("p").click(function() { return "foo"; });
    _$_outside_event = _$;
    _$_outside_router = _$.router;
  };

  test_component.api = function(_$) {
    _$_outside_api = _$;
  }

  Mozart.init([
    "test-component"
  ]);

  it("defines a scoped jQuery (_$)", function() {
    expect(_$_outside_event).to.be.a('function');
    expect(_$_outside_api).to.be.a('function');
  });

  it("defines a router if one is not present", function() {
    expect(_$_outside_router).to.be.a('object');
  });
});
