const React = require('react');
const AggResultsList = require('./aggResultsList.jsx');
const ReactBootstrap = require('react-bootstrap')
const ToggleOpenCloseIcon = require('./toggleOpenCloseIcon.jsx')
const Collapse = ReactBootstrap.Collapse;
const aggNames =  require('../constants.js').aggNames;

var Aggregation = React.createClass({
  getInitialState: function() {
    return {
            open: false,
          };
  },
  onAggClick: function(){
    this.setState({ open: !this.state.open })
  },
  getDisplayName: function(aggName){
    var dname = aggNames[aggName];
    if (dname === undefined){
      dname=aggName
    }
    return dname
  },
  render: function() {
    var dName = this.getDisplayName(this.props.agg.name);
    return (
    <div className="list-group-item aggregation">
      <div onClick={ this.onAggClick }>
       <ToggleOpenCloseIcon open={this.state.open}></ToggleOpenCloseIcon>
        {" "}
        {dName}
      </div>
      <Collapse in={this.state.open}>
        <div>
          <AggResultsList aggName={this.props.agg.name} aggResults={this.props.agg.results}></AggResultsList>
        </div>
      </Collapse>
    </div>
    );
  }
});

module.exports = React.createFactory(Aggregation);
