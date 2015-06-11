if (Posts.find().count() === 0) {
  var now = new Date().getTime();

  // create two users

  var diegoId = Meteor.users.insert({
    profile: {name: "Diego De Souza"}
  });
  var diego = Meteor.users.findOne(diegoId);

  var jackId = Meteor.users.insert({
    profile: {name: "Jack Lumber"}
  });
  var jack = Meteor.users.findOne(jackId);

  var inspirational = Posts.insert({
    title: 'Inspirational',
    userId: diego._id,
    username: diego.profile.name,
    message: "This is a cool message i typed",
    submitted: now - 7 * 3600 * 1000
  });

  Posts.insert({
    title: "Something to be remembered",
    userId: diego._id,
    username: diego.profile.name,
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    submitted: now - 7 * 3600 * 1000
  });

  Posts.insert({
    title: "Something to be forgotten",
    userId: diego._id,
    username: diego.profile.name,
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    submitted: now - 7 * 3600 * 1000
  });
for (var i = 0; i < 20; i++) {
  Posts.insert({
    title: "Something to be remembered" + 1,
    userId: jack._id,
    username: jack.profile.name,
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' + 1,
    submitted: now - 7 * 3600 * 1000
  });
}
  Comments.insert({
    postId: inspirational,
    userId: diego._id,
    username: diego.profile.name,
    submitted: now - 5 * 3600 * 1000,
    body: 'This is an interesting post, thanks for sharing'
  });


  Comments.insert({
    postId: inspirational,
    userId: jack._id,
    username: jack.profile.name,
    submitted: now - 5 * 3600 * 1000,
    body: 'This is an important point, thanks for sharing'
  });
}
