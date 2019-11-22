doc({
  attach_id: "advanced/selection",
  tests: [
    test("_$.me finds the parent component or components", () => {

      class Component extends Mozart {};
      Component.register(["single", "multiple", "multiple_two"]);
      var m = Component.index;

      var single_el,
          multiple_el,
          multiple_two_el;

      m.single.acts({
        get_element(_$, args) { single_el = _$.me(); }
      });

      m.multiple.acts({
        get_element(_$, args) { multiple_el = _$.me(); }
      });

      m.multiple_two.acts({
        get_element(_$, args) { multiple_two_el = _$.me(args.child); },
        return_element(_$, args) { return _$.me(args.child); }
      });

      Mozart.init();

      m.single.act.get_element();
      m.multiple.act.get_element();

      var child = document.querySelectorAll("[data-component='multiple_two']")[1].querySelector("span");
      m.multiple_two.act.get_element({ child: child });

      var child_parent = { id: undefined },
          child2       = document.querySelectorAll("[data-component='multiple_two']")[2]
      child_parent = m.multiple_two.act.return_element({ child: child2 });

      return [
        assert("_$.me() returns one component when only one exists", typeof(single_el), "object") 
        , assert("_$.me() returns all components when only multiple exist", multiple_el.length, 3)
        , assert("_$.me(element) returns the right component parent", multiple_two_el.id, 2)
        , assert("If this child actually is the component, return that", child_parent.id, 3)
      ]
    }, `
      <div data-component="single"></div>

      <div data-component="multiple"></div>
      <div data-component="multiple"></div>
      <div data-component="multiple"></div>

      <div data-component="multiple_two" id="1"></div>
      <div data-component="multiple_two" id="2"><span></span></div>
      <div data-component="multiple_two" id="3"></div>
    `)
  ]
});
