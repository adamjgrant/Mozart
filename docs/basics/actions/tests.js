doc({
  attach_id: "basics/actions",
  tests: [
    test("Actions", () => {
      class Component extends Mozart {};
      var m = Component.index;
      new Component("actionguy"); 
      var iexist = false;
      var neighbor_response = "";

      m.actionguy.acts({
        iexist(_$, args) {
          iexist = true;
        },

        value_from_neighbor(_$, args) {
          neighbor_response = _$.act.neighbor();
        },

        neighbor(_$, args) {
          return { "foo": "bar" }
        },
      });

      Mozart.init();
      m.actionguy.act.iexist();
      m.actionguy.act.value_from_neighbor();
      
      return [
        assert("Action can be called from the outside", iexist, true)
        , assert("A value returned from a neighbor function comes back through the caller", neighbor_response, { "foo": "bar" })
      ]
    })
  ]
});
