doc({
  attach_id: "basics/actions",
  tests: [
    test("Actions", () => {
      navbar.a.ping = (q) => {
          return ["pong", q("li").length];
      }

      let navbar2 = new Component("navbar2");
      navbar2.a = {
          ping: (q) => { return "pong" },
          pong: (q) => { return "ping" }
      }

      let navbar3 = new Component("navbar3");
      navbar3.a.first_ping = (q) => "first_pong";
      navbar3.a = {
          ping: (q) => { return "pong" },
          pong: (q) => { return "ping" }
      }
      
      return [
        assert("action function responds", navbar.a.ping()[0], "pong"),
        assert("action function employs the scoped selector", navbar.a.ping()[1], 2),
        assert("actions can be assigned with an entire object", [navbar2.a.ping(), navbar2.a.pong()], ["pong", "ping"]),
        assert("single and entire object declaration work gracefully", [
            navbar3.a.first_ping(),
            navbar3.a.ping(),
            navbar3.a.pong()
          ], [
            "first_pong",
            "pong",
            "ping"
          ]
        )
      ]
    }, `
      <nav data-component="navbar">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </nav>
    `)
  ]
});
