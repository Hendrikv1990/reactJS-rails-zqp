const React = require('react');
const UserActions = require('../actions/user_actions.js');
var Project = React.createClass({
  addBookmark: function(e){
    e.stopPropagation()
    e.preventDefault()
    UserActions.AddBookmark(this.props.project.id);
  },
  deleteBookmark: function(e){
    e.stopPropagation()
    e.preventDefault()
    UserActions.DeleteBookmark(this.props.project.id);
  },
  render: function() {
    var bookmark
    var tag_categories
    //if undefined do not render bookmarks
    switch(this.props.is_bookmarked) {
    case true:
        bookmark= (<a href="#" onClick={this.deleteBookmark}>
                     <span className='glyphicon glyphicon-remove' title="Remove bookmark"></span>
                  </a>)
        break;
    case false:
        bookmark = (<a href="#" onClick={this.addBookmark} title="Bookmark">
              <span className='glyphicon glyphicon-bookmark'></span>
            </a>)
        break;
    }
    tag_categories = this.props.project.tag_categories.map(function(tc, index) {
        return (
          <div key={index}>{tc.path}</div>
        );
      }.bind(this));
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-md-9">
            <h4>
              <span dangerouslySetInnerHTML={{__html: this.props.project.title_highlighted}}></span><br/>
              <small><span dangerouslySetInnerHTML={{__html: this.props.project.subtitle_highlighted}}></span></small>
            </h4>
           
            <div dangerouslySetInnerHTML={{__html: this.props.project.short_description_highlighted}}></div>
            <div className="tags">
              <h5>Project Categories</h5>
              {tag_categories}
            </div>
          </div>
          <div className="col-md-2">
            {this.props.project.entry_status}
          </div>
          <div className="col-md-1">
            {bookmark}
          </div>
        </div>
      </li>
    );
  }
});

module.exports = React.createFactory(Project);
