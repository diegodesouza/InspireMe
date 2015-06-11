Handlebars.registerHelper('pluralize', function(n, obj) {

  if(n === 1) {
    return '1 ' + obj;
  } else {
    return n + ' ' + obj+ 's';
  }
});
