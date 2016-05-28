const React = require('react');
const NestedAggResult = require('./nestedAggResult.jsx');
const ReactBootstrap = require('react-bootstrap');
const SearchParamsStore = require('../stores/search_params_store.js');

const ListGroup = ReactBootstrap.ListGroup;
const Collapse = ReactBootstrap.Collapse;
const ToggleOpenCloseIcon = require('./toggleOpenCloseIcon.jsx')
const aggNames =  require('../constants.js').aggNames;


var NestedResultList = React.createClass({
  getInitialState: function() {
    return {
            open: false,
            selectedAggs: []
          };
  },
  onAggClick: function() {
    this.setState({ open: !this.state.open })
  },
  getDisplayName: function(aggName){
    var dname = aggNames[aggName];
    if (dname === undefined){
      dname=aggName
    }
    return dname
  },
  onStoreChange: function(data){
    if (data.selectedAggs[this.props.aggName] !== undefined){
      this.setState({selectedAggs: data.selectedAggs[this.props.aggName]})
    } else {
      this.setState({selectedAggs: []})
    }
  },
  componentDidMount: function() {
    this.unsubscribe = SearchParamsStore.listen(this.onStoreChange);
  },
  componentWillUnmount: function() {
    this.unsubscribe();
  },
  render: function() {
    var dName = this.getDisplayName(this.props.aggName);
    var aggResultsList = this.props.aggResults.map(function(agg) {
      return (
        <NestedAggResult aggResult={agg} aggName={this.props.aggName} key={agg.key} selectedAggs={this.state.selectedAggs}> </NestedAggResult>
      );
    }.bind(this));
    var icon 
    if (this.props.aggResults.length > 0){
      icon = <ToggleOpenCloseIcon open={this.state.open}></ToggleOpenCloseIcon>
    }
    return (
      <div className = "aggregation list-group-item">
        <div onClick={ this.onAggClick }>
         {icon}
         {" "}
         {dName}
        </div>
         <Collapse in={this.state.open}>
            <div className="aggresults-list">
              <div className="list-group">
                {aggResultsList}
              </div>
            </div>
          </Collapse>
      </div>
    );
  }
});

module.exports = React.createFactory(NestedResultList);
