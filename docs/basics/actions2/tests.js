import Component from "../../../mozart.js";
let dropdown_button = new Component("dropdown_button");

dropdown_button.assign({
  open() { return "open" },
  close() { return "close" }
})

doc({
    attach_id: "basics/actions2",
    tests: [
        test("Actions", () => {

            return [
               assert("Methods can be added by assignment", [dropdown_button.open(), dropdown_button.close()], ["open", "close"])
            ]
        }, `
    `)
    ]
});