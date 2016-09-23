// var assert = require("chai").assert,
//     expect = require("chai").expect,
//     mocha  = require("mocha"),
//     $      = require("jquery");
//
// expect(Mozart.init).to.be.a('function');
//
// // 1st Class INSTANCE VARIABLE
//
// var test_component = {},
//     _$_outside_api,
//     _$_outside_event,
//     _$_outside_router;
//
// test_component.events = function(_$) {
//   _$("p").click(function() { return "foo"; });
//   _$_outside_event = _$;
//   _$_outside_router = _$.router;
// };
//
// test_component.api = function(_$) {
//   _$_outside_api = _$;
//
//   return {
//     create: function(blah) {}
//   }
// }
//
// Mozart.init([
//   "test-component"
// ]);
//
// expect(_$_outside_event).to.be.a('function');
// expect(_$_outside_api).to.be.a('function');
// expect(_$_outside_router).to.be.a('object');

describe("foo", function() {
  it("does stuff", function() {
    expect({}).to.be.a("object");
  });
});
