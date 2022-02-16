let index = new Component("index"),
    form = new Component("form"),
    contact = new Component("contact");

index.components = {
    row: new Component("index_row")
}

index.act((find) => {
    return {
        create_item(information) {
            const row = this.components.row.node(information)
            find.me.appendChild(row);
            this.act.read_item(information.id);
        },

        read_item(e) {
            const id = this.act.private.find_item_id(e);
            contact.act.show(id);
        },

        get private() {
            return {
                find_item_id(e) {
                    const id = e.target.dataset.id;
                    e.stopPropagation();
                    return id;
                }
            }
        },
    }
});

index.events((find) => {
    find("a").addEventListener("click", this.act.select_item);
});