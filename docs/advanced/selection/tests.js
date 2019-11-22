doc({
  attach_id: "advanced/selection",
  tests: [
    test("_$.me finds the parent component or components", () => {

      class Component extends Mozart {};
      var m = Component.index;
      new Component(["single", "multiple", "multiple_two"]);

      return [
        assert("_$.me() returns one component when only one exists", "", "")
        , assert("_$.me() returns all components when only multiple exist", "", "")
        , assert("_$.me(element) returns the right component parent", "", "")
      ]
    })
  ]
});
