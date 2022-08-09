class Component {
    constructor(name) {
        let native_methods = {
            name: undefined,
            store: {},
            assign(obj) {
                for (let key in obj) {
                    let val = obj[key];
                    ThisProxyComponent[key] = val;
                }
            },
            q(el) {
                let scoped_query = `[data-component~="${this.name}"]`;
                if (el) scoped_query += ` ${el}`;
                const elements = document.querySelectorAll(scoped_query);
                return elements.length > 1 ? Array.from(elements) : elements[0];
            },

            get me()       { return this.q(); },
            register(name) { this.name = name; },
        }
        let ThisProxyComponent = new Proxy(native_methods,
        {
            set(obj, prop, value) { 
                if (obj.hasOwnProperty(prop)) {
                    return obj[prop] = value; 
                }
                else if (typeof(value) === "function") {
                    let _native_methods = {}
                    for (let key in native_methods) {
                        let val = native_methods[key];
                        _native_methods[key] = { value: val, writable: true }
                    }
                    let _value = Object.defineProperties(value, _native_methods);
                    Object.defineProperty(obj, prop, { value: _value.bind(ThisProxyComponent), writable: true });
                    return true;
                }
                else {
                    console.error(value);
                    throw `${ThisProxyComponent.name}: Value was not a function. Use .store on the component to store new information`;
                }
            },
            get(obj, prop) { return obj[prop]; }
        }
      );
      ThisProxyComponent.register(name);
      return ThisProxyComponent;
    }
}

export default Component;