m.index.events(_$ => {
  _$("li").click(_$.act.show_contact);
});

// ...

m.form.events(_$ => {
  var name, email;
  [name, email] = _$("input").map(input => input.val());
  _$("button").click(m.index.act.add({ name: name, email: email });
});

// ...

m.index.acts({
  add(_$, args){
    // ...
    _$.act.show_contact({ contact: contact });
  },

  show_contact(_$, args) { 
    // ... 
  }
});
