Template.postPage.helpers({
  data: function() {
    return Posts.findOne({}, {message: 1});
  }
});


