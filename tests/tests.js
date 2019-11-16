/*
 * MOZART DOCUMENTATION AND TEST SCRIPT
 *
 * The purpose of this file is to serve both as a test runner and to document the features of Mozart at the same time.
 */

// Basics
// ======

doc({
  attach_id: "create-a-component",
  tests: [
    test("Mozart function", () => {
      var m = {};

      class mComponent extends Mozart {};

      return [ 
        assert("Function exists", typeof(Mozart), "function")
        , assert("mComponent function exists", typeof(mComponent), "function")
      ]
    })
  ] 
}); 

// doc({
//   attach_id: "default-methods",
//   sandbox: "<data-component='my_component'><button>Click</button></div>",
//   tests: [
//     test("m variable exists and is properly scoped", function() { 

//       class mComponent extends Mozart {};



//       return [
//         assert("", "", "")
//       ]
//     })
//   ]
// });

/*
 * TEST TEMPLATE
 */

// doc({
//   attach_id: "",
//   tests: [
//     test("", () => {
//       return [
//         assert("", "", "")
//       ]
//     })
//   ]
// });
