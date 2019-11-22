doc({
  attach_id: "basics/events",
  tests: [
    test("Events are scoped", function() {
      var button = [],
          number_of_calls = 0;
          was_i_called = "not called";

      class Component extends Mozart {};

      var m = Component.index;
      new Component("generator");

      m.generator.events(_$ => {
        was_i_called = "called";
        button = _$("button");
        number_of_calls++;
      });

      Mozart.init();

      return [
        assert("Button can be selected with scoped selector", typeof(button), "object")
        , assert("Event function is called on Mozart init", was_i_called, "called")
        , assert("Event function is called only once", number_of_calls, 1)
      ]
    }, `
      <div data-component="generator">
        <p></p>
        <button>generate</button>
      </div>
    `)
  ]
});
