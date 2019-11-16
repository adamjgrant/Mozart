doc({
  attach_id: "methods-added",
  tests: [
    test("Mozart can be extended and is given proper methods", () => {
      class Component extends Mozart {};

      var m = {}
      m.contacts = new Component;

      return [
        assert("Component is a function", typeof(Component), "function")
        , assert("instance of class has 'acts' method", typeof(m.contacts.acts), "function")
        , assert("instance of class has 'routes' method", typeof(m.contacts.routes), "function")
        , assert("instance of class has 'events' method", typeof(m.contacts.events), "function")
        , assert("instance of class has 'config' method", typeof(m.contacts.config), "function")
      ]
    })
  ]
});
