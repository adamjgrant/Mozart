import Component from "../../../mozart.js";
let dropdown_button = new Component("dropdown_button");

dropdown_button.open = function() { return "open" }
dropdown_button.close = function() { return "close" }

doc({
    attach_id: "basics/actions",
    tests: [
        test("Actions", () => {

            return [
                assert("Methods can be added one-by-one", [dropdown_button.open(), dropdown_button.close()], ["open", "close"])
            ]
        }, `
    `)
    ]
});