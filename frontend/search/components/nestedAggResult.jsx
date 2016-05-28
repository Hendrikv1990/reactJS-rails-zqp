const React = require('react');
const ReactBootstrap = require('react-bootstrap')
const SearchActions = require('../actions/search_actions.js');
const ListGroupItem = ReactBootstrap.ListGroupItem;
// const OrganizationList = require('./organizationList.jsx');
const ToggleOpenCloseIcon = require('./toggleOpenCloseIcon.jsx')

const ListGroup = ReactBootstrap.ListGroup;
const Collapse = ReactBootstrap.Collapse;

var NestedAggResult = React.createClass({
  getInitialState: function() {
    return {
            open: false
          };
  },
  onOrgClick: function(e){ 
    e.stopPropagation()
    this.setState({ open: !this.state.open })
  },
  onOrgSelected: function(e){
    e.stopPropagation()
    SearchActions.ToggleSelectedAgg(this.props.aggName, this.props.aggResult.key)
  },
  hasChildren: function(){
    return this.props.aggResult.children.length > 0
  },
  isSelected: function() {
    if (this.props.selectedAggs.indexOf(this.props.aggResult.key) >=0) {
      return true
    } else{
      return false
    }
  },
  render: function() {
    var childAggResultsList
    if (this.hasChildren()){
      var icon = <ToggleOpenCloseIcon open={this.state.open}></ToggleOpenCloseIcon>

      childAggResultsList = this.props.aggResult.children.map(function(ar) {
        return (
          <NestedAggResult aggResult={ar} aggName={this.props.aggName} selectedAggs = {this.props.selectedAggs} key={ar.key}></NestedAggResult>
          );}.bind(this));

          childAggResultsList = (
          <Collapse in={this.state.open}>
            <div className="list-group">
              {childAggResultsList}
            </div>
          </Collapse>
        )
    }
    return (
      <div className="list-group-item agg-result nested-agg-result" >
        <div className="row">
          <div className="col-xs-10">
            {icon}
            {" "}
            <input type="checkbox" checked={this.isSelected()} onChange={this.onOrgSelected} />
            {" "}
            <span onClick={this.onOrgClick}>
             {this.props.aggResult.name}
            </span>
          </div>
          <div className="col-xs-2">
            <span className="badge">{this.props.aggResult.count}</span>
          </div>
        </div>
         {childAggResultsList}
      </div>
    );
  }
});

module.exports = React.createFactory(NestedAggResult);

