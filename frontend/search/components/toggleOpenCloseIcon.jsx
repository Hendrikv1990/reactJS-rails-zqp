const React = require('react');

var ToggleOpenCloseIcon = React.createClass({
  iconClass: function(){
    if (this.props.open){
      return "glyphicon glyphicon-minus"
    }else {
      return "glyphicon glyphicon-plus"
    }
  },
  render: function() {
    return (
      <span className={this.iconClass()}></span>
    );
  }
});

module.exports = React.createFactory(ToggleOpenCloseIcon);

