Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      title: $(e.target).find('[name=title]').val(),
      message: $(e.target).find('[name=message]').val()
    };
    // question to why we assign post._id on inserting
    post._id = Posts.insert(post);
    Router.go('postPage', post);
  }

  Meteor.call('post', post, function(error, result) {
    // display the error to the user and abort
    if (error)
      return alert(error.reason);

    Router.go('postPage', {_id: result._id});
  });
});
