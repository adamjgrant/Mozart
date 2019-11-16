doc({
  attach_id: "events",
  tests: [
    test("Events are scoped", function() {
      var button = [];
      class Component extends Mozart {};
      var generator = new Component;
      generator.events(_$ => { button = _$("button"); });

      Mozart.init();
      
      return [
        assert("Button can be selected with scoped selector", button.length, 1)
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
