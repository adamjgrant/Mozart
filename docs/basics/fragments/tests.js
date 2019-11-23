doc({
  attach_id: "basics/fragments",
  tests: [
    test("Document fragments can be spawned", () => {
      class Component extends Mozart {};
      Component.register("registration");
      var m = Component.index,
          sandbox = document.getElementById("test-sandbox"),
          outside_element = m.registration.template(),
          inside_element = _$.template();

      sandbox.appendChild(fragment);

      return [
        assert("Template element could be created outside the scope", outside_element.id, "registration")
        , assert("Template element could be created inside the scope", inside_element.id, "registration")
      ]
    }, `
      <template data-template="registration">
        <div data-component="registration" id="registration></div>
      <template>
    `)
  ]
});
