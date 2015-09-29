import Ember from 'ember';
import Firebase from 'firebase';
import config from '../config/environment';

var Ref = new Firebase(config.firebase);

var auth = Ember.Object.extend({
  authed: false,
  username: '',
  init: function() {
    this.authClient = new window.FirebaseSimpleLogin(Ref, function(error, facebookUser) {
      if (error) {
        alert('Authentication failed: ' + error);
      } else if (facebookUser) {
        this.set('authed', true);
        this.set('username',facebookUser.username);
      } else {
        this.set('authed', false);
      }
    }.bind(this));
  },

  logout: function() {
    this.authClient.logout();
        this.set('authed', false);
  }
});

export default {
  name: 'Auth',
  initialize: function( container, app ) {
    app.register('auth:main', auth, {singleton: true});
    app.inject('controller', 'auth', 'auth:main');
    app.inject('route', 'auth', 'auth:main');
  }
};

