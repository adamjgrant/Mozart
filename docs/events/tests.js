doc({
  attach_id: "events",
  tests: [
    test("Events are scoped", function() {
      var button = [];
      var was_i_called = "not called";
      class Component extends Mozart {};
      var generator = new Component;
      generator.events(_$ => { 
        was_i_called = "called";
        button = _$("button"); 
      });

      Mozart.init();
      
      return [
        assert("Button can be selected with scoped selector", button.length, 1)
        , assert("Event function is called on Mozart init", was_i_called, "called")
      ]
    })
  ],
  sandbox: `
      <div data-component="generator">
        <p></p>
        <button>generate</button>
      </div>
    `
});
