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
