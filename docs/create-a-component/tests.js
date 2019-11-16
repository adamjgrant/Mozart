doc({
  attach_id: "create-a-component",
  tests: [
    test("Mozart function", () => {
      var m = {};

      class mComponent extends Mozart {};

      return [ 
        assert("Function exists", typeof(Mozart), "function")
        , assert("mComponent function exists", typeof(mComponent), "function")
      ]
    })
  ] 
}); 
