import Component from "../../../mozart.js";
let timer = new Component("timer");

timer.get_hello = function() {
    return this.q(".hello").innerHTML;
}

timer.get_element_out_of_scope = function() {
    return this.q(".goodbye");
}

doc({
    attach_id: "basics/element-selection",
    tests: [
        test("Selecting an element", () => {
            return [
                assert("Can select scoped element", timer.get_hello(), "hello world"),
                assert("Does not select element out of scope", timer.get_element_out_of_scope(), undefined),
            ]
        }, `
        <div data-component="timer">
          <p class="hello">hello world</p>
        </div>
        <div data-component="not-the-timer">
          <p class="goodbye">You shouldn't see this.</p>
        </div>
    `)
    ]
});