Based on
 - [Scoped Component pattern](https://gist.github.com/adamjgrant/599530dab67db17c5b2d) ([Example Usage](http://codepen.io/ajkochanowicz/pen/pyeqpO))
 - [Amadeus](http://getkickstart.com/amadeus/)

# How to use

## As the component author

Note, the component's files should be loaded before Mozart itself.

1. Pick a name for your component. For this guide, we'll use "filter table".
2. Define a variable with the name of your component as slugs and set to a variable.

For example,

    var filter_table = {};

3. Set a key of this object to the variable `events`.

This will be a function that accepts a scoped version of the jQuery `$`

    var filter_table.events = function(_$) {
      _$(".title").click(function() {
        // ...  
      });
    }

This scoped _$ is ignorant to any selector that is not in `[data-component="filter-table"]`
That means `_$(".title")` is the same as `$("[data-component="filter-table"] .title")`
`_$` also comes with references to the router and api for the component, to be covered later.

4. Set a key of the component object to the variable `config`.

This is a generic object your component can use to store configuration.

It's also the home for optional router configuration.

    var filter_table.config = {}

5. (If needed) In config, we'll create a router.

This will be an object defining urls and methods for Ajax requests.

    var filter_table.config = {
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

Now (after intialization) if we call

    test_component.router.show({id: 5});

We'll get

    {
      url: "/test-component/5.json",
      method: "GET"
    }

If none of this is defined, it is defined by default following the conventions above.
We can also edit the name and base url like this

    var filter_table.config = {
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

    test_component.router.show({id: 5});
    test_component.router.new();
    test_component.router.delete({id: 42});     

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

5. Set a key of the component object to the variable `api` (Optional).

This will be an object serving as a library for network requests via `_$.router`.

## As the component end user

1. Include the all the javascript files for the component in your project.
2. Initialize the component

    Mozart.init(["filter table"])

Note, the name can be "filter table", "filter-table", "filter_table", or even
"fiLteR--tABle" if you must.

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
