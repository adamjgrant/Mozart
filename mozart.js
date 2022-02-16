class Component {
    constructor(name) {
        this.actions = {};
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
    }

    get act() {
        let handler = {
            get: function(obj, prop) {
                const thing = this.actions[prop];
                const valid = typeof(thing) === "function";
                return valid ? thing.bind(this) : `${this.private.enum.errors.INVALID_ACTION}: "${prop}"`;
            }.bind(this),

            set: function(obj, prop, value) {
                return this.private.bootstrap_action_function.call(this, prop, value);
            }.bind(this)
        };

        let p = new Proxy(this.actions, handler);

        return p;
    }

    set act(obj) {
        // Alternative method of assignment using 
        // component.a = {b: (scoped_selector) => {}} instead of component.a.b = (scoped_selector) => {}
        // TODO: There may be a more native way to do this.
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            this.act[key] = value;
        });
    }

    // TODO: Events

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