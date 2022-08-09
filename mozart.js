class Component {
    constructor(name) {
      let ThisProxyComponent = new Proxy(
        {
            name: undefined,
            scoped_selector(el) {
                let scoped_query = `[data-component~="${this.name}"]`;
                if (el) scoped_query += ` ${el}`;
                const elements = document.querySelectorAll(scoped_query);
                return elements.length > 1 ? Array.from(elements) : elements[0];
            },

            q(...args)     { return this.scoped_selector.apply(this, args); },
            get me()       { return this.scoped_selector(); },
            register(name) { this.name = name; },
        }, 
        {
            set(obj, prop, value) { return obj[prop] = value; },
            get(obj, prop) { return obj[prop]; }
        }
      );
      ThisProxyComponent.register(name);
      return ThisProxyComponent;
    }
}

export default Component;