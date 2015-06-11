Template.header.helpers({
  activeRouteClass: function(/* route names */) {
    var args = Array.prototype.slice.call(arguments, 0);
    // pop will get rid of the hash added
    args.pop();

    var active = _.any(args, function(name) {
      return Router.current() && Router.current().route.getName() === name;
    });

    return active && 'active';
  }
});
