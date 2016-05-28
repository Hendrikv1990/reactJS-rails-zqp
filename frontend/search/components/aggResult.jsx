const React = require('react');
const ReactBootstrap = require('react-bootstrap')
const SearchActions = require('../actions/search_actions.js');
const ListGroupItem = ReactBootstrap.ListGroupItem;

var AggResult = React.createClass({
  onAggChange: function(){
    SearchActions.ToggleSelectedAgg(this.props.aggName, this.props.aggResult.key)
  },
  getResult: function(result){
    var r = "";
   switch (result){
      case 1: 
         r = "Yes";
         break;
      case 0: 
          r="No";
          break;
      default:
          r=result;
    }
    return r

  },
  render: function() {
    return (
      <div className="agg-result">
        <ListGroupItem>
         <div className="row">
           <div className="col-xs-10">
              <input type="checkbox" checked={ this.props.isSelected } onChange={this.onAggChange} />
              {this.getResult(this.props.aggResult.key)}
            </div>
            <div className="col-xs-2">
             <span className="badge">{this.props.aggResult.count}</span>
            </div>
          </div>
        </ListGroupItem>
      </div>
    );
  }
});

module.exports = React.createFactory(AggResult);
