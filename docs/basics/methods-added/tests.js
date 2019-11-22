doc({
  attach_id: "basics/methods-added",
  tests: [
    test("Mozart can be extended and is given proper methods", () => {
      class Component extends Mozart {};

      var m = Component.index;
      new Component("contacts");

      Mozart.init();

      return [
        assert("Component is a function", typeof(Component), "function")
        , assert("instance of class has 'acts' method", typeof(m.contacts.acts), "function")
        , assert("instance of class has 'routes' method", typeof(m.contacts.routes), "function")
        , assert("instance of class has 'events' method", typeof(m.contacts.events), "function")
      ]
    })
  ]
});
