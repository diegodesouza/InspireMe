Template.postItem.helpers({
  ownPost: function() {
    return this.userId == Meteor.userId();
  },
  commentsCount: function() {
    // return comments that belong to the post
    return Comments.find({postId: this._id}).count();
  }
});
