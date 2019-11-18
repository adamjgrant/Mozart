doc({
  attach_id: "advanced/jquery",
  tests: [
    test("jQuery is used when included", () => {
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      var jquery_exists = "not found";
      var jq_fn = "not found";

      class Component extends Mozart {};
      var m = Component.index;
      new Component("jquery_tester");

      m.jquery_tester.act({
        go(_$, args) {
          jquery_exists = typeof(jQuery);
          jq_fn = typeof(_$("i").click);
        }
      });

      m.jquery_tester.act.go();

      return [
        assert("jQuery exists", jquery_exists, "function")
        , assert("jQuery is defined as _$", jq_fn, "function")
      ]
    }, `<div data-component="jquery_tester"><i></i></div>`)
  ]
});
