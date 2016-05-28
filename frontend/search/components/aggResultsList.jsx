const React = require('react');
const AggResult = require('./aggResult.jsx');
const ReactBootstrap = require('react-bootstrap')
const SearchParamsStore = require('../stores/search_params_store.js');

const ListGroup = ReactBootstrap.ListGroup;

var AggResultsList = React.createClass({
  getInitialState: function() {
    return {
            selectedAggs: []
          };
  },
  onStoreChange: function(data){
    if (data.selectedAggs[this.props.aggName] !== undefined){
      this.setState({
        selectedAggs: data.selectedAggs[this.props.aggName]
      })
    }else {
      this.setState({
        selectedAggs:[]
      })
    }
  },
  isSelected: function(ar){
    if(this.state.selectedAggs.indexOf(ar.key)>=0){
      return true
    }else{
      return false
    }
  },
  componentDidMount: function() {
      this.unsubscribe = SearchParamsStore.listen(this.onStoreChange);
    },
  componentWillUnmount: function() {
    this.unsubscribe();
  },
  render: function() {
    var aggresultslist = this.props.aggResults.map(function(ar, i) {
      return (
        <AggResult aggName={this.props.aggName} aggResult={ar} isSelected={this.isSelected(ar)} key={i}> </AggResult>
      );
    }.bind(this));
    return (
      <div className="aggResult">
        <ListGroup>
          {aggresultslist}
        </ListGroup>
      </div>
    );
  }
});

module.exports = React.createFactory(AggResultsList);
