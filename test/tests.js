(function() {
/*
 * MOZART DOCUMENTATION AND TEST SCRIPT
 *
 * The purpose of this file is to serve both as a test runner and to document the features of Mozart at the same time.
 */

// Basics
// ======

doc({
  heading: {
    text: "Basics",
    level: 1
  }
});

doc({
  heading: {
    text: "Creating a new Component",
    level: 2
  },
  tests: [
    test("Mozart function exists", [ 
      assert("Function exists", typeof(Mozart), "function")
      , assert("basic test", "foo", "bar")
    ])
  ]
});


/* Proof of concept tests */

// test("Defining a new component decorates it appropriately", () => {
//   var m = {},
//       result = [];

//   m.new_component = new Mozart;

//   result = [ 
//     assert(typeof(m.new_component), "object", "foo")
//     , assert(typeof(m.new_component.acts), "function")
//     , assert(typeof(m.new_component.events), "function")
//   ];

//   return result;
// });

})();
