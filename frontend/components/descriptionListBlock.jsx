const React = require('react');
const _ = require('underscore');
const ListGroup = require('react-bootstrap/lib/ListGroup');
const ListGroupItem = require('react-bootstrap/lib/ListGroupItem');
const utilities = require('../methods/utilities');


var descrBlock = React.createClass({
  shouldComponentUpdate(nextProps) {
    return nextProps.updating;
  },

  renderBlock() {
    return _.map(this.props.blocks, (block, index) => {
      return (<ListGroup key={index}>{this.renderChildren(block, index)}
      </ListGroup>)
    });
  },
  renderChildren(children, blockIndex) {
    if(children != undefined) {
      return utilities.mapObject(children, (val, key) => {
      var value =utilities.formatValue(val);
        if(!!value)
          return <ListGroupItem key={blockIndex.toString()+"-"+key}>{value}</ListGroupItem>
        else return null;
    });
    }
    else return null;
  },
  render() {
    var buff = this.renderBlock();
    return (<span key={this.props.id}>
      <dt>{this.props.id}</dt>
      <dd>{buff}</dd>
    </span>);
  }
});

module.exports = React.createFactory(descrBlock);
