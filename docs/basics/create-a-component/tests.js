doc({
    attach_id: "basics/create-a-component",
    tests: [
        test("Mozart basics", () => {
            let navbar = new Component("navbar");
            navbar.a.set_first_menu_item_active = (q) => {
                q("li").forEach(li => li.classList.remove("active"));
                q("li")[0].first.classList.add("active");
            }

            return [
                assert("navbar exists", typeof(navbar), "object")
            ]
        }, `
        <nav data-component="navbar">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </nav>
      `),
    ]
});