class Component {
    constructor(name) {
      let ThisProxyComponent = new Proxy({ 
            name: undefined,
            scoped_selector(el) {
                let scoped_query = `[data-component~="${this.name}"]`;
                if (el) scoped_query += ` ${el}`;
                const elements = document.querySelectorAll(scoped_query);
                return elements.length > 1 ? Array.from(elements) : elements[0];
            },
            // Alias for scoped_selector
            q(...args) { return this.scoped_selector.apply(this, args); },
            get me() {
                return this.scoped_selector();
            },
            register(name) {
                this.name = name;
            },
        }, 
        {
            set(obj, prop, value) {
                // TODO we may need this split.
                if (obj.hasOwnProperty(prop)) {
                    obj[prop] = value;
                }
                else if (typeof(value) === "function") {
                    obj[prop] = value
                }
                return true;
            },
        
            get(obj, prop) { 
                return obj[prop];
            }
      });
      ThisProxyComponent.register(name);
      return ThisProxyComponent;
    }
}

// class Component {

//     node(...args) {
//         // TODO: return cloned node of template.
//         // TODO: The user will need to define this, so maybe we make this a private function?
//     }

//     // TODO: Events

//     // TODO: Bar externals from accessing the this.act.private namespace

//     set components(obj) {
//         // TODO: Allow  object assignment of sub components
//     }

// }

export default Component;