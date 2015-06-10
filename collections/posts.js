Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) {
    return ownsDocument(userId, post);
  },
  remove: function(userId, post) {
    return ownsDocument(userId, post);
  }
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.message;
  }
});

validatePost = function(post) {
  var errors = {};

  if(!post.title)
    errors.title = "Please fill in a title";

  if(!post.message)
    errors.message = "Please fill in a message";

  return errors;
};

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      message: String
  });

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      username: user.username,
      submitted: new Date(),
      commentsCount: 0
    });

    var postId = Posts.insert(post);

    return {
      _id: postId
    };
  }
});
