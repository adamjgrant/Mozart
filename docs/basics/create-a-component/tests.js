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
      };

      var funcs2 = {
        acts: "not found",
        events: "not found",
        routes: "not found",
      };

      var dumb_and_dumber = [undefined, undefined];

      Component.register("check_functions");

      m.check_functions.routes({ foo: "bar" });

      m.check_functions.events(_$ => {
        funcs.acts = typeof(_$.acts);
        funcs.routes = typeof(_$.routes);
      });

      m.check_functions.acts({
        start: (_$, args) => {
          funcs2.acts = typeof(_$.acts);
          funcs2.routes = typeof(_$.routes);
        }
      });

      Component.register(["dumb", "dumber"]);

      Component.register("just_me");

      var element;

      Component.register("scoper");

      m.scoper.acts({
        test(_$, args) {
          element = [_$(".twin")].flat()[0];
        }
      });

      Mozart.init();

      m.check_functions.acts.start();

      dumb_and_dumber[0] = typeof(m.dumb);
      dumb_and_dumber[1] = typeof(m.dumber);

      m.scoper.act.test();

      return [
        assert("Mozart Function exists", typeof(Mozart), "function")
        , assert("Subclassed Component function exists", typeof(Component), "function")
        , assert("_$ has acts method from events", funcs.acts, "object")
        , assert("_$ has routes method from events", funcs.routes, "object")
        , assert("_$ has acts method from acts", funcs2.acts, "object")
        , assert("_$ has routes method from acts", funcs2.routes, "object")
        , assert("Multiple components can be created by passing in an Array", dumb_and_dumber, ["object", "object"])
        , assert("A single component can be created by passing in a String", typeof(m.just_me), "object")
        , assert("Subcomponent elements are found only if in the component", element.id, "real")
      ]
    }, `
      <span class="twin" id="imposter"></span>
      <div data-component="scoper">
        <span class="twin" id="real"></span>
      </div>
    `)
  ]
});
