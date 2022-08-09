class Component {
    constructor(name) {
        this.name = name;
    }

    scoped_selector(el) {
        let scoped_query = `[data-component~="${this.name}"]`;
        if (el) scoped_query += ` ${el}`;
        const elements = document.querySelectorAll(scoped_query);
        return elements.length > 1 ? Array.from(elements) : elements[0];
    }

    get me() {
        return this.scoped_selector();
    }

    node(...args) {
        // TODO: return cloned node of template.
        // TODO: The user will need to define this, so maybe we make this a private function?
    }

    set act(obj) {
        // Alternative method of assignment using 
        // component.a = {b: (scoped_selector) => {}} instead of component.a.b = (scoped_selector) => {}
        // TODO: There may be a more native way to do this.
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            this[key] = value;
        });
    }

    // TODO: Events

    // TODO: Bar externals from accessing the this.act.private namespace

    set components(obj) {
        // TODO: Allow  object assignment of sub components
    }

    get private() {
        return {
            bootstrap_action_function: (prop, fn) => {
                return this.actions[prop] = () => {
                    return fn.call(this, this.scoped_selector.bind(this));
                }
            },

            enum: {
                errors: {
                    INVALID_ACTION: "Invalid action name"
                }
            }
        }
    }
}