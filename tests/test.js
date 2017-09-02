describe("Mozart class", function() {
  it("Mozart is defined", function() {
    expect(Mozart).to.be.a('function');
  });

  it("m$ is defined", function() {
    expect(Mozart.init).to.be.a('function');
  });

  it("keeps api keys separated between components", function() {
    m$.a = new Mozart;
    m$.b = new Mozart;
    var resp_a = ""
    var resp_b = ""

    m$.a.events = function(_$) {
      resp_a = _$.api.test()
    }

    m$.b.events = function(_$) {
      resp_b = _$.api.test()
    }

    m$.a.api({ test: function(_$, options) { return "a" } }) 
    m$.b.api({ test: function(_$, options) { return "b" } })

    Mozart.init();

    expect(resp_a).to.eq("a");
    expect(resp_b).to.eq("b");

    // Reset
    delete m$.a
    delete m$.b
  });

  it("allows calling from between api commands from within an api", function() {
    m$.a = new Mozart

    var resp = "nothing"

    m$.a.api({
      one: function(_$, options) {
        return _$.api.two();
      },
      two: function(_$, options) {
        return "bar"
      },
    });

    m$.a.events = function(_$) {
      resp = _$.api.one()
    }

    Mozart.init()

    expect(resp).to.eq("bar");
  
    delete m$.a
  });

  it("allows passing options from between api commands from within an api", function() {
    m$.a = new Mozart

    var resp = "nothing"

    m$.a.api({
      one: function(_$, options) {
        return _$.api.two({ foo: "bar"});
      },
      two: function(_$, options) {
        return options.foo
      },
    });

    m$.a.events = function(_$) {
      resp = _$.api.one()
    }

    Mozart.init()

    expect(resp).to.eq("bar");
  
    delete m$.a
  });
});

describe("_$ scoped document selector", function() {
});
