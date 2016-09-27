# Keeps code organized

Mozart's strategy is to consider each piece of your app as a "component."

Inside each component lives its own private API, routes, events, and a scoped jQuery variable `_$` you can use alongside the normal `$`.

# Convention over configuration

Upon declaration, Mozart automatically sets up an AJAX API ready to use out of the box or customized to your liking.

# Extendible

Components are designed to used in dual layers if desired. This means you write components that inherit from another component's implementation and continue evolving the class or instance component loosely-coupled.

# Plays well with others

Mozart's syntax may look like other frameworks, but it's mutually exclusive to selector libraries like jQuery and UI-binding frameworks like React and Angular. To the contrary, you can use Mozart in harmony with other frameworks.

Based on
 - [Scoped Component pattern](https://gist.github.com/adamjgrant/599530dab67db17c5b2d) ([Example Usage](http://codepen.io/ajkochanowicz/pen/pyeqpO))
 - [Amadeus](http://getkickstart.com/amadeus/)

# How to use

## As the component author

Note, the component's files should be after Mozart itself, much like you would
use jQuery.

1. Pick a name for your component. For this guide, we'll use "filter table".
2. Create an empty `m$` object to hold your components. Define a variable with the name of your component as slugs and set to a variable.

  For example,

      m$.filter_table = {};

3. Set a key of this object to the variable `events`.

  This will be a function that accepts a scoped version of the jQuery `$`

      m$.filter_table.events = function(_$) {
        _$(".title").click(function() {
          // ...  
        });
      }

  This scoped _$ is ignorant to any selector that is not in `[data-component="filter-table"]`
  That means `_$(".title")` is the same as `$("[data-component="filter-table"] .title")`
  `_$` also comes with references to the router and api for the component, to be covered later.

  You can also specify a `.ready` function to execute JavaScript after both jQuery's
  `$(document).ready` and after the component has been initialized.

      m$.filter_table.ready = function(_$) {
        console.log("component is ready");
      }

4. Set a key of the component object to the variable `config`.

  This is a generic object your component can use to store configuration.

  It's also the home for optional router configuration.

      m$.filter_table.config = {}

5. (If needed) In config, we'll create a router.

  This will be an object defining urls and methods for Ajax requests.

      m$.filter_table.config = {
        router: {
          routes: {
            index: {
              url: "#{base_url}#{name}.json",
              method: "GET"
            },
            show: {
              url: "#{base_url}#{name}/#{id}.json",
              method: "GET"
            },
            destroy: {
              url: "#{base_url}#{name}/#{id}.json",
              method: "DELETE"
            },
            update: {
              url: "#{base_url}#{name}/#{id}",
              method: "PUT"
            },
            new: {
              url: "#{base_url}#{name}/new.json",
              method: "GET"
            },
            create: {
              url: "#{base_url}#{name}/#{id}",
              method: "POST"
            }
          }
        }
      }

  As you can see, the `#{}` syntax will let you define where variable and configuration
   elements should go.

  Now (after intialization) if we call (notice the `config` is removed)

      m$.filter_table.router.show({id: 5});

  We'll get

      {
        url: "/test-component/5.json",
        method: "GET"
      }

  This is great for putting directly into $.ajax as such

      $.ajax(m$.filter_table.router.show({id: 5}))
        .done(function(data) {})
        .fail(function(data) {});

  If none of this is defined, it is defined by default following the conventions above.
  We can also edit the name and base url like this

      m$.filter_table.config = {
        router: {
          base_url: "/admin/",
          name: "users"
          routes: {
            ...
            show: {
              url: "#{base_url}#{name}/#{id}.json",
              method: "GET"
            },
            ...
          }
        }
      }

  Now when we run

      m$.filter_table.router.show({id: 5});
      m$.filter_table.router.new();
      m$.filter_table.router.delete({id: 42});     

  We'll get

      {
        url: "/admin/users/5.json",
        method: "GET"
      }

      {
        url: "/admin/users",
        method: "GET",
      }

      {
        url: "/admin/users/42",
        method: "DELETE"
      }

5. Define an api to link business rules with the router

  This structure is similar to router, but allows us to build out simple endpoints
  as business-logic driven functions that call `$.ajax` appropriately.

      m$.filter_table.config.api = {
        refresh_users: function(_$, options) {
          $.ajax(_$.router.index())
            .done(function(users) {
              $.each(users, function(index, user) {
                _$("tr").innerHTML = "..." // Insert user data
              });
            })
            .fail(function(data) {
              // Show an alert via another component's interface
              m$.alert.api({
                message: "Could not refresh users",
                type: "Error"
              })
            });
        }
      }

  As this is business logic driven, this is more likely to be written by the end
  user (next), but it's good to put in some sensible defaults if it's obvious to
  the use case.

## As the component end user

1. Include the all the javascript files for the component in your project.
2. Initialize the component
  Note, the name can be "filter table", "filter-table", "filter_table", or even
  "fiLteR--tABle" if you must.


      Mozart.init(["filter table"])

  If you want to use the component in several different ways under distinctive names,
  include it as such:

      Mozart.init([
        { "filter table": "manager table" },
        { "filter table": "resources panel" }
      ])

  This is probably preferable anyway, as you'll be able to expand on the component's
  functionality via two distinct variable conventions, as you'll see later.

  You can also add in other components and mix and match syntax like

      Mozart.init([
        { "filter table": "manager table" },
        "filter table",
        { "filter table": "resources panel" },
        "my other component",
        "another useful thing"
      ])

  In the above example, `manager_table` will have its own namespace that inherits from `filter_table` but allows you to extend upon it.

3. Set configuration

  Extending a 1st class component like `filter_table` into a 2nd class component like `manger_table` allows us to specify specific business rules without affecting the core `filter_table` code.

  If we're happy with the way filter_table works, but just need to change the object it acts on, we can do that as such:

      m$.manager_table.config.router.name = "managers"

  Now instead of the component calling to

      /filter_table/5.json

  It will call to

      /managers/5.json

  We can also change the base url

      m$.manager_table.config.router = {
        name: "managers",
        base_url: "/admin/"
      }

  To give us

      /admin/managers/5.json

4. Define events

      More documentation coming...
