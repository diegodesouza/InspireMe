PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5,
  limit: function () {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: {submitted: -1}, limit: this.limit()};
  },
  waitOn: function() {
    return Meteor.subscribe('posts', this.findOptions());
  },
  data: function() {
    return {posts: Posts.find({}, this.findOptions())};
  }
});

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('notifications');
  }
});

Router.route('/posts/:_id', {
  name: 'postPage',
  waitOn: function() {
    return [
      Meteor.subscribe('posts'),
      Meteor.subscribe('comments', this.params._id)
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

Router.route('/:postsLimit?', {
  name: 'postsList',
  controller: PostsListController
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
