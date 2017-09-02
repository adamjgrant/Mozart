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

    m$.a.api({ 
      test: function(_$, options) { return "a" },
      testa: function(_$, options) { return "a2" } 
    }) 

    m$.b.api({ 
      test: function(_$, options) { return "b" },
      testb: function(_$, options) { return "b2" }
    })

    Mozart.init();

    expect(resp_a).to.eq("a");
    expect(resp_b).to.eq("b");
  });
});

describe("_$ scoped document selector", function() {
});
