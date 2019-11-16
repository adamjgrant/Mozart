var attachees = document.querySelectorAll("article[data-attach]");

attachees.forEach(attachee => {
  attachee.innerHTML = `
    <div class="text">
      ${attachee.innerHTML}
      <div class="test_container"></div>
    </div>
  `;

  attachee.innerHTML += `
    <pre class="code"></pre>
  `;

  function escapeHTML(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  var pre_content = "";
  ["html", "js"].forEach(extension => {
    ((extension, attachee) => {
      var request = new XMLHttpRequest();
      request.open("GET", `/docs/code/${attachee.dataset.attach}.${extension}`, true);
      request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          pre_content += this.response;
          attachee.querySelector("pre.code").innerHTML += escapeHTML(pre_content);
        }
        else { return }
      }
      request.send();
    })(extension, attachee);
  });

}); 

var assert,
    doc,
    body,
    tests,
    test;

assert      = (message, actual, expected) => [actual == expected, actual, expected, message]; 
test        = (term, assertions) => {
  return {
    term: term,
    results: assertions().map(assertion => {
      var passed, actual, expected, message
      [passed, actual, expected, message] = assertion;

      definition  = `${passed ? "🟢 PASS" : "🔴 FAIL"} ${message}`;
      description = passed ? undefined : `Expected ${expected}, got ${actual}`; 
      return [definition, description]
    })
  }
}

doc = (config) => {
  var body        = document.querySelector(`article[data-attach="${config.attach_id}"] .test_container`);
  var test_results = config.tests.map(test => {
    var results = test.results.map(result => {
      var definition, description;
      [definition, description] = result;

      return `<dl>
        <dt>${definition}</dt>
        <dd>${description || ""}<dd>
      </dl><div class="testing_sandbox" id="test_${config.attach_id}">${config.sandbox || ""}</div>`
    }).join("");

    return `<h1>${test.term}</h1>${results}`
  }).join("");
  body.innerHTML += test_results;
}
