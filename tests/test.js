describe("Mozart class", function() {
  it("is defined", function() {
    expect(Mozart).to.be.a('object');
    expect(Mozart.init).to.be.a('function');
  });
});

describe("Mozart 1st Class Instance Variable", function() {
  var _$_outside_event,
      _$_router_outside_event;

  window.test_component_without_api = {};
  window.test_component_without_router = {};
  window.test_component_with_everything = {};

  test_component_without_api.events = function(_$) {
    _$("p").click(function() { return "foo"; });
    _$_outside_event = _$;
    _$_router_outside_event = _$.router;
    _$_api_outside_event = _$.api;
  };

  test_component_with_everything.events = function(_$) {
    $("p").click(function() { return "foo" })
  };

  test_component_with_everything.config = {
    api: {
      show: function(_$, options) {
        $.get(_$.router.show(options));
      }
    },
    router: {
      base_url: "/custom_base/",
      name: "custom_name",
      routes: {
        show: {
          url: "#{base_url}#{name}/#{id}.json",
          method: "GET"
        }
      }
    }
  }

  Mozart.init([
    "test-component-without-router",
    "test-component-without-api",
    "test_component_with_everything"
  ]);

  it("defines a scoped jQuery (_$)", function() {
    expect(_$_outside_event).to.be.a('function');
  });

  it("sees a component variables", function() {
    expect(test_component_without_api).to.be.a('object');
    expect(test_component_without_router).to.be.a('object');
  });

  it("defines a router if one is not present", function() {
    expect(_$_router_outside_event).to.be.a('object');
  });

  it("defines an api if one is not present", function() {
    expect(_$_api_outside_event).to.be.a('object')
  });

  it("sets a router object with default functions for interpolating", function() {
    expect(test_component_with_everything.router.index).to.be.a('function');
  });
});

describe("2nd class Mozart instance variable", function() {

});
