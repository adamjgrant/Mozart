# Mozart
## A pattern for dependency-free AJAX applications

Imagine you're building this application

![UI Example](http://cdn.everything.io/mozart/UI.png)

Just a little app to show users on the left, details on the right, and a form
above to add another user.

### Components

The Mozart pattern defines each logical unit as a "component"

~~~html
<header data-component="form">...</header>
<main>
  <aside data-component="list">...</aside>
  <div data-component="details">...</aside>
</main>
~~~

This makes a hard distinction between all the classes and ids we'll use and top-level
components.

### Styling

This also allows us to scope behaviors and styles. We can get away with simple
classes like `.title` and `.name` instead of `.user_form--title` and
`.user_form--name`, or not rely on classes at all.

#### HTML

~~~html
<header data-component="form">
  <h1>Create User</h1>
  <form>
    <label>Name</label>
    <input type="text" />

    <label>Email</label>
    <input type="email" />

    <button>Create</button>
  </form>
</header>
~~~

#### SCSS

~~~scss
[data-component="form"] {
  label { width: 20%; }

  input { width: 80%; }

  button {
    background: blue;
    color: white;
  }
}
~~~

### Javascript

But the behavior-driven patterns are where this pattern really shines.

Each component needs to talk to each other, make API calls to the backend, and
update the page without refresh. Typically this is where a developer will install
Angular, React, Ember, etc...despite their application being simple enough to
lean on native JavaScript or jQuery.

Let's make the user form save data, clear itself out, and update the user list.

Looking at the form component, we'll divide this out into Mozart's three
concerns: `api`, `events`, and `routes`

#### form.js

~~~javascript
m$.form = new Mozart();
~~~

#### form_routes.js

~~~javascript
m$.form.set_routes(
  {
    create: {
      method: "POST",
      url: "/users/"
    },

    index: {           
      method: "GET",
      url: "/users/"
    },

    show: {
      method: "GET",
      url: "/users/#{user_id}"
    }
  }
);
~~~

Notice the `#{user_id}`. That's not native javascript. Mozart will automatically
replace that part of the string (interpolation) based on the `options` passed to
the route when it is called.

#### form_api.js

~~~javascript
// This example uses jQuery, but you don't have to.
// More on that later.

m$.form.set_api(
  {
    new_user: function(_$, options) {
      $.ajax(_$.routes.create({
          data: {
            name: options.name,
            email: options.email
          }
        })
        .done(function(user) {
          m$.alert.api({ msg: "User created.", type: "success" });
          m$.list.api.add_row({ user: user });
          _$.api.clear_form();
        })
        .fail(function() {
          m$.alert.api({ msg: "Could not create user.", type: "error" });
        });
    },

    clear_form: function(_$, options) {
      _$("input[type='text'], input[type='search']").val("");
    }
  }
);
~~~

When `m$.form.api.new_user` is called, it will post the data to our pre-defined
route.

When it's finished, we'll call to another component (not outlined here) called
`alert`. We can call to any component from any component.

Below that, we call to the list component's api which will handle modifying its
dom to include the new user.

On the last line of `done`, we use `_$` instead of `m$` to call the component's
own api function, `clear_form`.

We'll look at `_$` in more detail coming up.

#### form_events.js

~~~javascript
m$.form.set_events(function(_$) {
  _$("button").click(function() {
    var name = _$("input[type='text']"),
        email = _$("input[type='email']");

    _$.api.new_user({
      name: name,
      email: email
    });
  });
});
~~~

Now that we have our routes and api set up, we just need to bind this behavior
to an event.

Inside components, Mozart gives us `_$` which is really just your app's jQuery
library but scoped to the component.

So `_$("button")` is the same as `$("[data-component~='form'] button")`

`_$` is also decorated with `_$.api` and `_$.routes` which just call to the
component's own `.api` and `.routes` without having to hold on to your `this`
within functions.

So `_$.api.create_user` is the same as `m$.form.api.create_user`

## What else?

- You only need **one JS file**. It's Just **under 3kb unminified** and **barely over 1kb minified**.
- **Zero dependencies** but works seamlessly with jQuery.
- ECMAScript 5, 6, and 7 compatible.
- Works in all modern browsers and probably slightly older ones too.
- Used in production on [paste.lol](http://paste.lol)
