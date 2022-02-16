class Component {
  constructor() {
    this.actions = {};
    this.name = "f";
  }
  
  q(el) {
    // return `The element passed in was ${el}`;
    // TODO: Return querySelector scoped to component
    // const parent_component = document.querySelector(this.name);
    return `${this.name} ${el}`;
  }

  get a() {
    let _ = this;
    let handler = {
      get: function(obj, prop) {
        const thing = _.actions[prop];
        const valid = typeof(thing) === "function";
        return valid ? thing(_.q) : `${_.private.enum.errors.INVALID_ACTION}: "${prop}"`;
      },
      
      set: function(obj, prop, value) {
        console.log(`${prop} ${value}`);
        _.private.bootstrap_action_function(prop, value);
      }
    };
    
    let p = new Proxy(this.actions, handler);
    
    return p;
  }
  
  get private() {
    let _ = this;
    return {
      bootstrap_action_function: (prop, value) => {
        _.actions[prop] = value;
      },
      
      enum: {
        errors: {
          INVALID_ACTION: "Invalid action name"
        }
      }
    }
  }
}

let foo = new Component();

foo.a.something = (q) => {
  return q("foo");
}

foo.a.something;

foo.a.doesntexist;