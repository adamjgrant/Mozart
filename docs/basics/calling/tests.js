import Component from "../../../mozart.js";
let timer = new Component("timer");
let alarm = new Component("alarm");

timer.talk_to_alarm = function() {
    return alarm.get_status();
}

alarm.get_status = function() {
    return "all good"
}

doc({
    attach_id: "basics/calling",
    tests: [
        test("Cross component communication", () => {

            return [
                assert("action function responds", timer.talk_to_alarm(), "all good"),
            ]
        }, `
    `)
    ]
});