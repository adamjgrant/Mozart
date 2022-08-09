class Component {
    constructor(name) {
      let ThisProxyComponent = new Proxy({ 
            name: undefined,
            q: () => "Hello world",
            register(name) {
                this.name = name;
            }
        }, 
        {
            set(obj, prop, value) {
                if (obj.hasOwnProperty(prop)) {
                    obj[prop] = value;
                }
                else if (typeof(value) === "function") {
                    value.prototype.q = () => "Hello world";
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
//     constructor(name) {
//         this.name = name;
//     }

//     scoped_selector(el) {
//         let scoped_query = `[data-component~="${this.name}"]`;
//         if (el) scoped_query += ` ${el}`;
//         const elements = document.querySelectorAll(scoped_query);
//         return elements.length > 1 ? Array.from(elements) : elements[0];
//     }

//     // Alias for scoped_selector
//     q(...args) { return this.scoped_selector.apply(this, args); }

//     get me() {
//         return this.scoped_selector();
//     }

//     node(...args) {
//         // TODO: return cloned node of template.
//         // TODO: The user will need to define this, so maybe we make this a private function?
//     }

//     set act(obj) {
//         Object.keys(obj).forEach(key => {
//             const value = obj[key];
//             this[key] = value;
//         });
//     }

//     // set(obj, prop, value) {
//     //     if (prop === 'age') {
//     //       if (!Number.isInteger(value)) {
//     //         throw new TypeError('The age is not an integer');
//     //       }
//     //       if (value > 200) {
//     //         throw new RangeError('The age seems invalid');
//     //       }
//     //     }
    
//     //     // The default behavior to store the value
//     //     obj[prop] = value;
    
//     //     // Indicate success
//     //     return true;
//     // }

//     // TODO: Events

//     // TODO: Bar externals from accessing the this.act.private namespace

//     set components(obj) {
//         // TODO: Allow  object assignment of sub components
//     }

//     // Private functions

//     #bootstrap_action_function(prop, fn) {
//         return this.actions[prop] = () => {
//             return fn.call(this, this.scoped_selector.bind(this));
//         }
//     }

//     get #enum() {
//         return {
//             errors: {
//                 INVALID_ACTION: "Invalid action name"
//             }
//         }
//     }
// }

// const Component = new Proxy(BaseComponent, {
//     set(obj, prop, value) {
//         console.log("Hit set function", obj, prop, value);
//         // obj[prop] = value.bind(obj);
//         obj[prop] = "bar";
//         return true;
//     },

//     get(obj, prop) { 
//         return obj[prop];
//     }
// })

export default Component;