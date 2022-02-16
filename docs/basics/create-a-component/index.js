let navbar = new Component("navbar");

navbar.a.set_first_menu_item_active = (q) => {
    q("li").forEach(li => li.classList.remove("active"));
    q("li")[0].first.classList.add("active");
}