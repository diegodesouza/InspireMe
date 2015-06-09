Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) {return ownsDocument(userId, post); },
  remove: function(userId, post) {return ownsDocument(userId, post); }
});

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
      submitted: new Date()
    });

    var postId = Posts.insert(post);

    return {
      _id: postId
    };
  }
});
