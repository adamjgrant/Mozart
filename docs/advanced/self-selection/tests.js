doc({
  attach_id: "advanced/adding-methods",
  tests: [
    test("Function and Object Methods can be added", () => {
      class Component extends Mozart {
        myfunction_method(args) {
          super.add_function_method("myfunction_method", args);
        }

        myobject_method(obj) {
          super.add_object_method(
            "myobject_method",
            super.parse_object(obj, (args, key) => {
              var _$ = this.scoped_selector();
              obj[key](_$, args);
            })
          );
        }
      };

      var m = Component.index;
      new Component("mycomponent");

      var scoped  = "not scoped",
          scoped2 = "not scoped",
          args_present = "not present";
          event_decorated_$_acts = undefined;

      m.mycomponent.acts({
        foo() {}
      });

      m.mycomponent.myfunction_method(_$ => {
        if (typeof(_$("i")) == "object") { scoped = "scoped" }
        event_decorated_$_acts = _$.acts;
      });

      m.mycomponent.myobject_method({
        subfunc(_$, args) {
          if (typeof(_$("i")) == "object") {  scoped2 = "scoped" }
          if (args.foo == "bar") {  args_present = "present" }
        }
      });

      Mozart.init();

      m.mycomponent.myobject_method.subfunc({ foo: "bar" })

      return [
        assert("myfunction_method is defined on instance variable and has scoped _$", scoped, "scoped")
        , assert("myobject_method is defined on instance variable and has scoped _$", scoped2, "scoped")
        , assert("myobject_method is defined on instance variable and takes arguments", args_present, "present")
        , assert("scoped _$ inside function method has components obj methods", typeof(event_decorated_$_acts), "object")
      ]
    }, ` <div data-component="mycomponent"><i></i></div> `)
  ]
});
