describe("Mozart class", function() {
  it("Mozart is defined", function() {
    expect(Mozart).to.be.a('function');
  });

  it("m$ is defined", function() {
    expect(Mozart.init).to.be.a('function');
  });
});

describe("_$ scoped jquery", function() {
  var $h1 = undefined;

  it("you know.", function() {
    m$.test = new Mozart;

    m$.test.api({
      thing: function(_$, options) {
        $h1 = _$("h1");
      }
    });

    Mozart.init();
    m$.test.api.thing();
    expect($h1.__proto__.jquery).to.be.a("String");
  });
});
