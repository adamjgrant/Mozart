import Component from "./mozart.js";
import index from "./components/index/index.js";
import contact from "./components/contact/contact.js";

let form = new Component();

form.attach({
    submit() {
        const [name, email] = this.fields;
        // Defer remaining implementation to the components
        // "contact" and "index"
        const contactIndex = index.createContact({ name, email });
        contact.showContactAtIndex({ index: contactIndex });
        this.clear();
    },

    get fields() {
        return this.q("input").map(input => input.value);
    },

    clear() {
        this.q("input").forEach(input => input.value = "");
    }
})

form.q(".submit").addEventListener("click", form.submit);