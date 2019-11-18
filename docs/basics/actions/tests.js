doc({
  attach_id: "basics/actions",
  tests: [
    test("Actions", () => {
      class Component extends Mozart {};
      var m = Component.index;
      new Component("actionguy");

      m.actionguy.acts({
        iexist(_$, args) {
          return "I exist";
        }
      });

      Mozart.init();
      
      return [
        assert("Action can be called from the outside", m.actionguy.act.iexist(), "I exist")
      ]
    })
  ]
});
