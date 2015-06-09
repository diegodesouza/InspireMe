Template.postPage.helpers({
  message: function() {
    return Posts.findOne({}, {message: 1});
  }
});


