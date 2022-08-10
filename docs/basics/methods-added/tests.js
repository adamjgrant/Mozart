// doc({
//     attach_id: "basics/methods-added",
//     tests: [
//         test("Component returns node elements", () => {
//             let navbar = new Component("element");
//             const one_element = navbar.me;

//             let navbar2 = new Component("element2");
//             const two_elements = [].concat(navbar2.me);

//             return [
//                 assert("Navbar element returned", one_element instanceof HTMLElement, true),
//                 assert("Navbar2 elements returned", two_elements.map(el => el instanceof HTMLElement), [true, true]),
//             ]
//         }, `
//           <nav data-component="element"></nav> 
//           <nav data-component="element2"></nav> 
//           <nav data-component="element2"></nav> 
//         `)
//     ]
// });