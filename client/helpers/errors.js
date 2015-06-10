// Local (client-only) collection
Errors = new Meteor.Collection(null);

throwError = function(message) {
  Errors.insert({messsage: message});
};

clearErrors = function() {
  Errors.remove({seen: true});
};
