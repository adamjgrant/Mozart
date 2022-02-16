let index = new Component("index"),
    index_row = new Component("index_row"),
    form = new Component("form"),
    contact = new Component("contact");

index.act((find) => {
    return {
        create_item(information) {
            find.me.appendChild(index_row.node(information));
            this.act.select_item(information.id);
        },

        read_item(e) {
            const id = this.act.private.find_item_id(e);
            contact.act.load(id);
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