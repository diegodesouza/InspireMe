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
  waitOn: function() {
    return [
      Meteor.subscribe('posts'),
      Meteor.subscribe('comments', this.params._id),
      Meteor.subscribe('notifications')
    ];
  },
  data: function() {
    return Posts.findOne({_id: this.params._id});
  }
});

Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  waitOn: function() {
      return Meteor.subscribe('posts');
    },
  data: function() {
    return Posts.findOne({_id: this.params._id});
  }
});

Router.route('/submit', {
  name: 'postSubmit'
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

Router.onBeforeAction('dataNotFound', {
  only: 'postPage'
});

Router.onBeforeAction(requireLogin, {
  only: 'postSubmit'
});

Router.onBeforeAction(function() {
  clearErrors();
  this.next();
});
