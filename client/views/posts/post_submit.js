Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      title: $(e.target).find('[name=title]').val(),
      message: $(e.target).find('[name=message]').val()
    };

    Meteor.call('postInsert', post, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);

      // this is what i get with console.log()
      // console.log(result);(Object {_id: "8niQx9Nuys6Fqk6F8"})
      // console.log(result._id);(8niQx9Nuys6Fqk6F8)

      Router.go('postPage', {_id: result._id});
    });
  }
});
