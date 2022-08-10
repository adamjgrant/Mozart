import Component from "../../../mozart.js";
doc({
    attach_id: "basics/create-a-component",
    tests: [
        test("Mozart basics", () => {
            let dropdown_button = new Component("dropdown_button");

            return [ 
                assert("dropdown_button component exists", typeof(dropdown_button), "object"),
                assert("dropdown_button has query_selector", !!dropdown_button.q, true),
                assert("dropdown_button has store", !!dropdown_button.store, true),
                assert("dropdown_button element found", dropdown_button.me.dataset.test, "123")
            ]
        },`
        <button data-component="dropdown_button" data-test="123">
            <span class="title">Open Menu</span>
            <ul>
                <li>
                    <a href="/home">Home</a>
                </li>
                <li>
                    <a href="/blog">Blog</a>
                </li>
                <li>
                    <a href="/about">About</a>
                </li>
            </ul>
        </button>
        `)
    ]
});