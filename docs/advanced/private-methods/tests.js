doc({
  attach_id: "advanced/private-methods",
  tests: [
    test("Private methods can only be accessed by the component", () => {
      class Component extends Mozart {};
      var m = Component.index;
      new Component("introvert");
      new Component("extrovert");

      var private_called_from_self    = false,
          private_called_from_another = false,
          public_called_from_self     = false,
          public_called_from_another  = false;

      m.introvert.act({
        public_fn_from_self(_$, args) {
          public_called_from_self = true; 
        },

        public_fn_from_another(_$, args) {
          public_called_from_another = true; 
        },

        init(_$, args) {
          _$.act.public_fn_from_self();
          try { _$.act.private_fn_from_self(); }
          catch(e) { console.error("Could not call own private function") }
        },

        priv: {
          private_fn_from_self(_$, args) {
            private_called_from_self = true;
          },
          private_fn_from_another(_$, args) {
            private_called_from_another = true;
          }
        }
      });

      m.extrovert.act({
        init(_$, args) {
          m.introvert.act.public_fn_from_another();
          try { m.introvert.act.private_fn_from_another(); }
          catch(e) { 
            return 0; 
            // As we'd expect, this should not work.
          };
        }
      });

      Mozart.init();

      m.introvert.act.init();
      m.extrovert.act.init();

      return [
        assert("Public function called from self is reachable", public_called_from_self, true) 
        , assert("Public function called from another is reachable", public_called_from_another, true) 
        , assert("Private function called from self is reachable", private_called_from_self, true) 
        , assert("Private function called from another is not reachable", private_called_from_another, false) 
      ]
    })
  ]
});
