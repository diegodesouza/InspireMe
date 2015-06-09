Posts = new Mongo.Collection('posts');

Posts.allow({
  insert: function(userId, doc) {
    // only allow inserting posts if logged in
    return !! userId;
  }
});

