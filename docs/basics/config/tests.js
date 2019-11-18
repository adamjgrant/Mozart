doc({
  attach_id: "basics/config",
  tests: [
    test("Configuration is set with all the behind the scenes magic.", () => {
      class Component extends Mozart {};
      var m = Component.index;

      new Component("configurator");

      m.configurator.config({ foo: "bar" })

      var what_is_foo = "";

      m.configurator.events(_$ => {
        what_is_foo = _$.config.foo;
      });

      Mozart.init();

      return [
        assert("Config foo should be set to bar", what_is_foo, "bar")
      ]
    })
  ]
});
