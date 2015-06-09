Template.postItem.helpers({
  message: function() {
    return Posts.findOne({postId: this._id})
  }
});
