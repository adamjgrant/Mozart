doc({
    attach_id: "basics/methods-added",
    tests: [
        test("Component returns node elements", () => {
            let navbar = new Component("navbar");
            const one_element = navbar.me;

            let navbar2 = new Component("navbar2");
            const two_elements = navbar2.me;

            return [
                assert("Navbar element returned", navbar.me instanceof HTMLElement, true),
                assert("Navbar2 elements returned", [].concat(navbar.me).map(el => el instanceof HTMLElement), [true, true]),
            ]
        })
    ]
});