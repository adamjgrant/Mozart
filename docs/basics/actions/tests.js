doc({
    attach_id: "basics/actions",
    tests: [
        test("Actions", () => {
            let navbar = new Component("navbar");

            navbar.act.ping = (q) => {
                return ["pong", q("li").length];
            }

            let navbar2 = new Component("navbar2");
            navbar2.act = {
                ping: (q) => { return "pong" },
                pong: (q) => { return "ping" }
            }

            let navbar3 = new Component("navbar3");
            navbar3.act.first_ping = (q) => "first_pong";
            navbar3.act = {
                ping: (q) => { return "pong" },
                pong: (q) => { return "ping" }
            }

            return [
                assert("action function responds", navbar.act.ping()[0], "pong"),
                assert("action function employs the scoped selector", navbar.act.ping()[1], 2),
                assert("actions can be assigned with an entire object", [navbar2.act.ping(), navbar2.act.pong()], ["pong", "ping"]),
                assert("single and entire object declaration work gracefully", [
                    navbar3.act.first_ping(),
                    navbar3.act.ping(),
                    navbar3.act.pong()
                ], [
                    "first_pong",
                    "pong",
                    "ping"
                ])
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