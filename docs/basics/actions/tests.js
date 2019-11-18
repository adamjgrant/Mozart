doc({
  attach_id: "basics/actions",
  tests: [
    test("Actions", () => {
      class Component extends Mozart {};
      var m = Component.index;
      new Component("actionguy"); 
      var iexist = false;

      m.actionguy.acts({
        iexist(_$, args) {
          iexist = true;
        }
      });

      Mozart.init();
      m.actionguy.act.iexist();
      
      return [
        assert("Action can be called from the outside", iexist, true)
      ]
    })
  ]
});
