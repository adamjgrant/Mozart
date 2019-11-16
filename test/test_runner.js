var assert,
    doc,
    body,
    tests,
    test;

body        = document.getElementById("body");
assert      = (message, actual, expected) => [actual == expected, actual, expected, message]; 
test        = (term, assertions) => {
  return {
    term: term,
    results: assertions.map(assertion => {
      var passed, actual, expected, message
      [passed, actual, expected, message] = assertion;

      definition  = `${passed ? "🟢 PASS" : "🔴 FAIL"} ${message}`;
      description = passed ? undefined : `Expected ${expected}, got ${actual}`; 
      return [definition, description]
    })
  }
}

doc = (config) => {
  if (config.heading) {
    body.innerHTML += `<h${config.heading.level}>${config.heading.text}</h${config.heading.level}>`;
  }
  
  if (config.tests) {
    var test_results = config.tests.map(test => {
      var results = test.results.map(result => {
        var definition, description;
        [definition, description] = result;

        return `<dl>
          <dt>${definition}</dt>
          <dd>${description || ""}<dd>
        </dl>`
      }).join("");

      return `<h1>${test.term}</h1>${results}`
    }).join("");
    body.innerHTML += `<div class="tests">${test_results}</div>`
  }
}
