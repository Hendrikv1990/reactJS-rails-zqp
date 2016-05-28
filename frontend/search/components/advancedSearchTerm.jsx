const React = require('react');
const ReactBootstrap = require('react-bootstrap')

const DropdownButton = ReactBootstrap.DropdownButton;
const MenuItem = ReactBootstrap.MenuItem;
const InputGroup = ReactBootstrap.InputGroup;
const SearchActions = require('../actions/search_actions.js');

var AdvancedSearchTerm = React.createClass({
  inputStyle: function(){
    return {
      width: "300px"
    }
  },
  handleCriteriaSelect: function (value, event) {
    SearchActions.UpdateAdvancedSearchTerm(this.props.index, 'criteria', value)
  },
  handleFieldSelect: function(value, event) {
    SearchActions.UpdateAdvancedSearchTerm(this.props.index, 'field', value)
  },
  handleSearchChange: function(event){
    SearchActions.UpdateAdvancedSearchTerm(this.props.index, 'searchTerm', event.target.value)
  },
  handleRemoveSearchTerm: function(){
    SearchActions.RemoveAdvancedSearchTerm(this.props.index)
  },
  render: function() {
    return (
     <div className="form-group form-inline">
        <span>Search on: </span>
        <DropdownButton
          onSelect={this.handleFieldSelect}
          id="selField"
          title={this.props.searchTerm.field}>
          <MenuItem eventKey="All Fields">All Fields</MenuItem>
          <MenuItem eventKey="Title">Title</MenuItem>
          <MenuItem eventKey="Sponsor">Sponsor</MenuItem>
          <MenuItem eventKey="Description">Description</MenuItem>
          <MenuItem eventKey="Organization">Organization</MenuItem>
          <MenuItem eventKey="Project Category">Project Category</MenuItem>
        </DropdownButton>
        <span> Matching: </span>
        <DropdownButton
          onSelect={this.handleCriteriaSelect}
          id="selCriteria"
          title={this.props.searchTerm.criteria}>
          <MenuItem eventKey="All">All of these words</MenuItem>
          <MenuItem eventKey="Any">Any of these words</MenuItem>
          <MenuItem eventKey="None">None of these words</MenuItem>
          <MenuItem eventKey="Exact">This exact phrase</MenuItem>
        </DropdownButton>
        <span> of these words: </span> 
        <input type="text" className="form-control" style={this.inputStyle()} aria-label="..." defaultValue={this.props.searchTerm.searchTerm} onBlur={this.handleSearchChange} />
        <a href="#" onClick={this.handleRemoveSearchTerm}>
          <span className="glyphicon glyphicon-remove"></span>
        </a>
    </div>
    );
  }
});

module.exports = React.createFactory(AdvancedSearchTerm);

