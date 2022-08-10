import Component from "../../../mozart.js";
doc({
    attach_id: "advanced/self-selection",
    tests: [
        test("Mozart basics", () => {
            let dropdown_button = new Component("dropdown_button");

            return [ 
                assert("dropdown_button element found", dropdown_button.me.dataset.test, "123")
            ]
        },`
        <button data-component="dropdown_button" data-test="123">
        </button>
        `)
    ]
});