Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', {
  name: 'postsList',
  waitOn: function() {
    return Meteor.subscribe('posts');
  }
});

Router.route('/posts/:_id', {
  name: 'postPage',
  data: function() {
    return Posts.findOne(this.params._id);
  }
});

