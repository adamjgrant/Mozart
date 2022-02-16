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
    let _ = this;
    let handler = {
      get: function(obj, prop) {
        const thing = _.actions[prop];
        const valid = typeof(thing) === "function";
        return valid ? thing.bind(_) : `${_.private.enum.errors.INVALID_ACTION}: "${prop}"`;
      },
      
      set: function(obj, prop, value) {
        _.private.bootstrap_action_function.call(_, prop, value);
      }
    };
    
    let p = new Proxy(this.actions, handler);
    
    return p;
  }
  
  // TODO: Events
  
  get private() {
    let _ = this;
    return {
      bootstrap_action_function: (prop, fn) => {
        _.actions[prop] = () => {
          return fn.call(_, _.q.bind(_));
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

let foo = new Component("foo");

foo.a.something = (q) => {
  return q("bar");
}

foo.a.something();

foo.a.doesntexist;