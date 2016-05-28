const Reflux = require('reflux');
const UserActions = require('../actions/user_actions.js');
const backend = require('../backend.js');

var UserStore = Reflux.createStore({
  listenables: [UserActions],
  init: function(){
    this.getUser();
  },
  getInitialState: function() {
    return  {
      logged_in:false,
      bookmarks: []
    };
  },
  getUser: function(){
    backend.fetch('users.json?')
    .then(this.getUserCompleted )
    .catch( this.getUserFailed );
  },
  getUserCompleted: function(data){
    this.data = data
    this.trigger(this.data)
  },
  onAddBookmark: function(project_id){
    backend.postJSON('users/bookmark.json?', 
    {
      project_id: project_id
    }).then( this.getUser )
    .catch( this.onAddBookmarkFailed );
   },
  onDeleteBookmark: function(project_id){
    backend.delete('users/bookmark.json?', 
    {
      project_id: project_id
    }).then( this.getUser )
    .catch( this.onDeleteBookmarkFailed );
  },
  onAddBookmarkCompleted: function(data) {
   
  },
  onAddBookmarkFailed: function(data){
  },
  onDeleteBookmarkCompleted: function(data) {
   
  },
  onDeleteBookmarkFailed: function(data){
  },
  onTrigger: function(){
    this.trigger(this.data);
  }
});
module.exports = UserStore;
