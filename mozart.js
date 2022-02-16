class Component {
    constructor(name) {
        this.actions = {};
        this.name = name;
    }

    q(el) {
        const scoped_selector = `[data-component~="${this.name}"] ${el}`;
        const elements = document.querySelectorAll(scoped_selector);
        return elements.length > 1 ? elements : elements[0];
    }

    get a() {
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

    set a(obj) {
        // Alternative method of assignment using 
        // component.a = {b: (q) => {}} instead of component.a.b = (q) => {}
        // TODO: There may be a more native way to do this.
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            this.a[key] = value;
        });
    }

    // TODO: Events

    get private() {
        return {
            bootstrap_action_function: (prop, fn) => {
                return this.actions[prop] = () => {
                    return fn.call(this, this.q.bind(this));
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