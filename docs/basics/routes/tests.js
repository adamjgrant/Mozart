doc({
  attach_id: "basics/routes",
  tests: [
    test("Routes are generated correctly", () => {
      var params = {};

      class Component extends Mozart {};
      new Component("image_resizer");
      var m = Component.index;

      m.image_resizer.routes({
        resize: {
          type: "PUSH",
          url: "/resizer/resize"
        },

        retrieve: {
          type: "GET",
          url: "/resizer/#{image_id}"
        }
      })

      m.image_resizer.acts({
        resize: (_$, args) => {
          params = _$.routes.retrieve({ image_id: 2, foo: "bar" })
        }
      })

      params.data = params.data || {};

      Mozart.init();
      m.image_resizer.act.resize();

      return [
        assert("Routes set an object when called", Object.keys(params).length, 2)
        , assert("Routes interpolates a url string", params.url, "/resizer/2")
        , assert("Routes puts noninterpolated items in the data key", params.data['foo'], "bar")
        , assert("Routes removes interpolated items in the data key", params.data['image_id'], undefined)
      ]
    })
  ]
});
