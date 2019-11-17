doc({
  attach_id: "basics/create-a-component",
  tests: [
    test("Mozart function", () => {
      class Component extends Mozart {};

      return [
        assert("Mozart Function exists", typeof(Mozart), "function")
        , assert("Subclassed Component function exists", typeof(Component), "function")
      ]
    })
  ]
});
