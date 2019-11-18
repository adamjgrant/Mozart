doc({
  attach_id: "basics/create-a-component",
  tests: [
    test("Mozart function", () => {
      class Component extends Mozart {};
      var m = Component.index;
      var funcs = {
        acts: "not found",
        events: "not found",
        routes: "not found",
        config: "not found"
      };

      var funcs2 = {
        acts: "not found",
        events: "not found",
        routes: "not found",
        config: "not found"
      };

      new Component("check_functions");

      m.check_functions.routes({ foo: "bar" });
      m.check_functions.config({ foo: "bar" });

      m.check_functions.events(_$ => {
        funcs.acts = typeof(_$.acts);
        funcs.routes = typeof(_$.routes);
        funcs.config = typeof(_$.config);
      });

      m.check_functions.acts({
        start: (_$, args) => {
          funcs2.acts = typeof(_$.acts);
          funcs2.routes = typeof(_$.routes);
          funcs2.config = typeof(_$.config);
        }
      });

      Mozart.init();

      m.check_functions.acts.start();

      return [
        assert("Mozart Function exists", typeof(Mozart), "function")
        , assert("Subclassed Component function exists", typeof(Component), "function")
        , assert("_$ has acts method from events", funcs.acts, "object")
        , assert("_$ has routes method from events", funcs.routes, "object")
        , assert("_$ has config method from events", funcs.routes, "object")
        , assert("_$ has acts method from acts", funcs2.acts, "object")
        , assert("_$ has routes method from acts", funcs2.routes, "object")
        , assert("_$ has config method from acts", funcs2.routes, "object")
      ]
    })
  ]
});
