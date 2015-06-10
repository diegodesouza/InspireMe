// check that the userId specified owns the post
ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
};
