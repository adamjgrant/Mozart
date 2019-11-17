doc({
  attach_id: "advanced/adding-methods",
  tests: [
    test("Function and Object Methods can be added", () => {
      class Component extends Mozart {
        myfunction_method(args) {
          super.function_method(args);
        }

        myobject_method(args) {
          super.object_method(args);
        }
      };

      var m = Component.index;
      new Component("mycomponent");

      var scoped  = "not scoped",
          scoped2 = "not scoped",
          args_present = "not present";

      m.mycomponent.myfunction_method(_$ => {
        if (_$("i").length) { scoped = "scoped" }
      })

      m.mycomponent.myobject_method({
        subfunc: (_$, args) => {
          if (_$("i").length) {  scoped2 = "scoped" }
          if (args.foo == "bar") {  args_present = "present" }
        }
      })

      Mozart.init();

      // m.mycomponent.myobject_method.subfunc({ foo: "bar" })

      return [
        assert("myfunction_method is defined on instance variable and has scoped _$", scoped, "scoped")
        , assert("myobject_method is defined on instance variable and has scoped _$", scoped2, "scoped")
        , assert("myobject_method is defined on instance variable and takes arguments", args_present = "present")
      ]
    }, ` <div data-component="mycomponent"><i></i></div> `)
  ]
});
