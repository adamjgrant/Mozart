import Component from "../../../mozart.js";

doc({
    attach_id: "basics/methods-added",
    tests: [
        test("Component allows methods to be added", () => {
            let dropdown_button = new Component("dropdown_button");
            let index = 0;
            let arr = [1, 2];
            let the_value = 0

            dropdown_button.assign({
                get method_one() {
                    let result = arr[index];
                    index++;
                    return result;
                },

                i_talk_to_method_b() {
                    return this.method_b();
                },

                method_b() {
                    return "hello";
                },

                set make_it_one(value) {
                    the_value = value;
                },

                get_one() {
                    return the_value;
                }
            })
            
            dropdown_button.make_it_one = 1

            return [
                assert("Get method returns dynamic results", [dropdown_button.method_one, dropdown_button.method_one], [1, 2]),
                assert("Set method sets value as one", dropdown_button.get_one(), 1),
                assert("One method can talk to another", dropdown_button.i_talk_to_method_b(), "hello")
            ]
        }, `
        `)
    ]
});