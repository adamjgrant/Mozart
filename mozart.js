class Component {
    constructor(name) {
        let native_methods = {
            name: undefined,
            store: {},
            assign(obj) {
                // Rejiggering native methods so they work with Object.defineProperty
                let _native_methods = {}
                for (let key in native_methods) {
                    let val = native_methods[key];
                    _native_methods[key] = { value: val, writable: true }
                }
                Object.defineProperties(obj, _native_methods);

                for (let key in obj) {
                    let prop_descriptor = Object.getOwnPropertyDescriptor(obj, key);
                    if (!!prop_descriptor['get']) {
                      Object.defineProperty(ThisProxyComponent, key, { get() { 
                        return obj[key] 
                    } });
                    }
                    else if (!!prop_descriptor['set']) {
                      Object.defineProperty(ThisProxyComponent, key, { set(...args) { 
                        return obj[key] = args[0] 
                    } });
                    }
                    else if (!!prop_descriptor.value && typeof(prop_descriptor.value) === "function") {
                      ThisProxyComponent[key] = (...args) => obj[key].apply(obj, args);
                    }
                    else {
                      // Assuming at this point it's a non-computed value.
                      ThisProxyComponent[key] = obj[key];
                    }
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
                    console.error(`Value ${value} was not a function on ${ThisProxyComponent.name} component. Type of ${value} is ${typeof(value)}`);
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

