// image_resizer/routes.js
m.image_resizer.routes({
  resize: {
    type: "PUSH",
    url: "/resizer/resize"
  },

  retrieve: {
    type: "GET",
    url: "/resizer/#{image_id}"
  }
});

// image_resizer/actions.js
m.image_resizer.acts({
  resize: (_$, args) => {
    var params = _$.routes.retrieve({ image_id: args.id, quality: "full" })
    $.ajax(params);
    /*
     *  params = {
     *    type: "GET",
     *    url: "/resizer/2"
     *    data: {
     *      quality: "full"
     *    }
     *  }
     */
  }
});

// image_resizer/events.js
m.image_resizer.events(_$ => {
  _$("img").click(() => {
    _$.act.resize({ id: $(this).dataset.id })
  });
});
