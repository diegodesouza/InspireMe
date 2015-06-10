// check that the userId specified owns the post
ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;

  console.log(userId);
  console.log(doc);
  console.log(doc.userId);
};
