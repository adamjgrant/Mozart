var attachees = document.querySelectorAll("article[data-attach]"),
    total_test_stats = {
      total: 0
      , passing: 0
      , failing: 0
    };

attachees.forEach(attachee => {
  attachee.innerHTML = `
    <div class="text">
      ${attachee.innerHTML}
      <div data-component="test_container"></div>
    </div>
  `;

  attachee.innerHTML += ` <pre><code></code></pre> `;

  function escapeHTML(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  doc_fetchers = [];

  ["html", "js", "css"].forEach(extension => {
    doc_fetchers.push(new Promise((resolve, reject) => {
      ((extension, attachee, resolve, reject) => {
        var pre_content = "",
            request = new XMLHttpRequest();

        request.open("GET", `docs/${attachee.dataset.attach}/index.${extension}`, true);
        request.onload = function() {
          if (this.status >= 200 && this.status < 400) {
            pre_content += this.response;
            var code = document.createElement("code");
            code.innerHTML = escapeHTML(pre_content);
            code.removeAttribute("hidden");
            code.classList.add(extension == "js" ? "javascript" : extension);
            attachee.querySelector("pre").appendChild(code);
            resolve();
          }
          else { return resolve(); }
        }
        request.send();
      })(extension, attachee, resolve, reject);
    }));
  });

  var script = document.createElement("script");
  script.src = `docs/${attachee.dataset.attach}/tests.js`
  document.body.appendChild(script);
});

Promise.all(doc_fetchers).then(() => {
  hljs.initHighlighting();
});


var assert,
    doc,
    body,
    test;

assert      = (message, actual, expected) => {
  try {
    expected = typeof(expected) == "object" ? JSON.stringify(expected) : expected;
    actual   = typeof(actual) == "object" ? JSON.stringify(actual) : actual;

    refresh_total_test_counts(actual == expected);
    return [actual == expected, actual, expected, message];
  }
  catch (e) {
    return [false, undefined, undefined, e];
  }
}

test        = (term, assertions, sandbox) => {
  if (sandbox) {
    document.getElementById("test-sandbox").innerHTML = sandbox;
  }

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
  var body        = document.querySelector(`article[data-attach="${config.attach_id}"] [data-component="test_container"]`);
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
  body.innerHTML += test_results;
}

var show_tests = document.getElementById("show-tests"),
    toggle_tests = (force) => {
      var test_containers = document.querySelectorAll("[data-component='test_container']"),
          test_results    = document.getElementById("test_results");

      if (show_tests.checked || force === true) {
        test_results.removeAttribute("hidden");
        test_containers.forEach(test_container => {
          test_container.removeAttribute("hidden");
        });
        localStorage.setItem("show-tests", true);
      }
      else {
        test_results.setAttribute("hidden", true);
        test_containers.forEach(test_container => {
          test_container.setAttribute("hidden", true);
        });
        localStorage.setItem("show-tests", false);
      }
    }

var refresh_total_test_counts = (pass) => {
  if (pass) {
    total_test_stats.passing += 1;
  } else {
    total_test_stats.failing += 1;
  }
  total_test_stats.total += 1;
  refresh_total_test_display();
};

var refresh_total_test_display = () => {
  var results = document.getElementById("test_results"),
      parts   = results.querySelectorAll("span");

  Object.keys(total_test_stats).forEach((key, index) => {
    parts[index].innerHTML = total_test_stats[key];
  });
}

show_tests.addEventListener("click", toggle_tests);
if (localStorage.getItem("show-tests") == "true") show_tests.checked = true;
toggle_tests();

var test_sandbox = document.createElement("div")
test_sandbox.id = "test-sandbox";
test_sandbox.style.width = test_sandbox.style.height = 0;
test_sandbox.style.overflow = "hidden";
document.body.append(test_sandbox);
