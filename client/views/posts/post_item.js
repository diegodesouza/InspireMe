//don't need this, since the postPage data is set in the router.js
Template.postItem.helpers({
  message: function() {
    return Posts.findOne({postId: this._id})
  }
});
