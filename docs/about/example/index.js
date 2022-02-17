export default UI = new Mozart({
    form: {},
    table: {
        index: {
            row: {}
        },
        contact: {}
    }
});

// TODO: Potentially confusing because the keys don't have to be unique
//       but the generated component names in the markup will need to be.
//
//       or you make the scoped selector very strict about targeting in
//       the hierarchy. Side effect is the CSS selectors get very long.

import UI from "./ui";

// TODO: Oh wait, no you can't do this because you have to call .components
//       each time you dip down a level. Hmm...
UI.table.index.act((find) => {
    return {
        create_item(information) {
            const row = this.components.row.node(information);
            find.me.appendChild(row);
            this.act.read_item(information.id);
        },

        read_item(e) {
            const id = this.components.row.act.find_item_id(e);
            UI.table.components.contact.act.show(id);
        }
    }
});

UI.table.index.events((find) => {
    find("a").addEventListener("click", this.act.select_item);
});