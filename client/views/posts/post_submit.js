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
});
