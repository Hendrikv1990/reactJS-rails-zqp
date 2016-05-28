const React = require('react');
const Project = require('./project.jsx');
const UserStore = require('../stores/user_store.js');
const UserActions = require('../actions/user_actions.js');
var ProjectList = React.createClass({
  getInitialState: function() {
    return {
            bookmarks: [],
            logged_in: false
          };
  },
  onStoreChange: function(data){
    this.setState({
      bookmarks: data.bookmarks,
      logged_in: data.logged_in
    }, this.onStateUpdated);
  },
  comoponentWillMount: function(){
    // UserActions.Trigger;
  },
  is_bookmarked:function(project_id){
    return (this.state.bookmarks.indexOf(project_id) > -1)
  },
  onStateUpdated: function(){

  },
  componentDidMount: function() {
    this.unsubscribe = UserStore.listen(this.onStoreChange);
  },
  componentWillUnmount: function() {
    this.unsubscribe();
  },
  render: function() {
    var projlist
    if (this.state.logged_in){
      projlist = this.props.projects.map(function(p) {
        return (
          <Project project={p} key={p.id} is_bookmarked={this.is_bookmarked(p.id)}> </Project>
        );
      }.bind(this));
    } else {
      projlist = this.props.projects.map(function(p) {
        return (
          <Project project={p} key={p.id}> </Project>
        );
      }.bind(this));
    }
    return (
      <ul className="list-group">
        {projlist}
      </ul>
    );
  }
});

module.exports = React.createFactory(ProjectList);
