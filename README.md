Based on
 - [Scoped Component pattern](https://gist.github.com/adamjgrant/599530dab67db17c5b2d) ([Example Usage](http://codepen.io/ajkochanowicz/pen/pyeqpO))
 - [Amadeus](http://getkickstart.com/amadeus/)

# How to use

## As the component author

1. Pick a name for your component. For this guide, we'll use "filter table".
2.

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
