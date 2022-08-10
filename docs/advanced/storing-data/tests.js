import Component from "../../../mozart.js";
doc({
    attach_id: "advanced/storing-data",
    tests: [
        test("Mozart basics", () => {
            let dropdown_button = new Component("dropdown_button");

            dropdown_button.store.marco = "polo";
            dropdown_button.store.marco_from_setter = "wowo";

            dropdown_button.assign({
                get marco() {
                    return this.store.marco;
                },

                set set_marco(value) {
                    this.store.marco_from_setter = value;
                },

                marco_as_function() {
                    return this.store.marco;
                }
            })

            dropdown_button.set_marco = "polo";

            return [ 
                assert("dropdown_button has store", !!dropdown_button.store, true),
                assert("dropdown_button store readout", dropdown_button.store.marco, "polo"),
                assert("dropdown_button store accessible from regular function", dropdown_button.marco_as_function, "polo"),
                assert("dropdown_button store accessible from getter function", dropdown_button.marco, "polo"),
                assert("dropdown_button store accessible from setter function", dropdown_button.store.marco_from_setter, "polo"),
                // TODO do a setter too.
            ]
        },`
        `)
    ]
});