import Component from "../../../mozart.js";
doc({
    attach_id: "advanced/storing-data",
    tests: [
        test("Mozart basics", () => {
            let dropdown_button = new Component("dropdown_button");

            dropdown_button.store.marco = "polo";

            dropdown_button.assign({
                get marco() {
                    return this.store.marco;
                }
            })

            return [ 
                assert("dropdown_button has store", !!dropdown_button.store, true),
                assert("dropdown_button store readout", dropdown_button.store.marco, "polo"),
                assert("dropdown_button store accessible from function", dropdown_button.marco, "polo"),
            ]
        },`
        `)
    ]
});