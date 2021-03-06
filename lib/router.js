Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return Meteor.subscribe('notifications');
  }
});

PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5,
  postsLimit: function () {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.postsLimit()};
  },
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions());
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var self = this;
    return {
      posts: this.posts(),
      ready: this.postsSub.ready,
      nextPath: function() {
        if (self.posts().count === self.postsLimit())
          return self.nexPath();
      }
    };
  }
});

NewPostsListController = PostsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newPosts.path({postsLimit: this.limit + this.increment});
  }
});

BestPostsListController = PostsListController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestPosts.path({postsLimit: this.limit + this.increment});
  }
});

Router.route('/posts/:slug', {
  name: 'postPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singlePost', this.params.slug),
      Meteor.subscribe('comments', this.params._id)
    ];
  },
  data: function() {
    return Posts.findOne({slug: this.params.slug});
  }
});

Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  waitOn: function() {
      return Meteor.subscribe('singlePost');
  },
  data: function() {
    return Posts.findOne( this.params._id);
  }
});

Router.route('/new/:postsLimit?', {
  name: 'newPosts',
  controller: NewPostsListController
});

Router.route('/best/:postsLiimit?', {
  name: 'bestPosts',
  controller: BestPostsListController
});

Router.route('/submit', {
  name: 'postSubmit'
});

Router.route('/', {
  name: 'home',
  controller: NewPostsListController
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
