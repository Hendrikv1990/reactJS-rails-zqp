const React = require('react');
const Aggregation = require('./aggregation.jsx');
const NestedResultList = require('./nestedResultList.jsx');

var AggsList = React.createClass({
  render: function() {
    var aggslist = this.props.aggs.map(function(a) {
      if (a["nested"]){
        return (
            <NestedResultList key={a.name} aggResults={a.results} aggName={a.name}></NestedResultList>
          ) 
      }else{
        return (
            <Aggregation agg={a} key={a.name}> </Aggregation>
          )
      }
      return agg;
    });
    return (
      <div className="aggsList list-group">
        {aggslist}
      </div>
    );
  }
});

module.exports = React.createFactory(AggsList);
