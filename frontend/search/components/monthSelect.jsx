const React = require('react');
const ReactBootstrap = require('react-bootstrap')

const DropdownButton = ReactBootstrap.DropdownButton;
const MenuItem = ReactBootstrap.MenuItem;
const InputGroup = ReactBootstrap.InputGroup;

const MENUITEMS = ['Any Month', 'Januar', 'Februar','Marz', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

var MonthSelect = React.createClass({
  getDefaultProps: function() {
    return {
      id: 1,
      selectedItem: 1
    };
  },
  getMenuItemTitle: function(id){
    return MENUITEMS[id];
  },
  handleOnSelect: function(value, e){
    this.props.onSelect(value, this.props.id)
  },
  render: function() {
    var menuItems = MENUITEMS.map(function(mi, i) {
      return (
        <MenuItem key={i} eventKey={i}>{mi}</MenuItem>
      );
    }.bind(this));
    return (
        <DropdownButton
          id = {this.props.id}
          onSelect={this.handleOnSelect}
          title= {this.getMenuItemTitle(this.props.selectedItem)}>
          {menuItems}
        </DropdownButton>
    );
  }
});

module.exports = React.createFactory(MonthSelect);
