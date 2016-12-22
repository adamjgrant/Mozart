describe("Mozart class", function() {
  it("Mozart is defined", function() {
    expect(Mozart).to.be.a('function');
  });

  it("m$ is defined", function() {
    expect(Mozart.init).to.be.a('function');
  });
});

describe("_$ scoped jQuery", function() {
});
