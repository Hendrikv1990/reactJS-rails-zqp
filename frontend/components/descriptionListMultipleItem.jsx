const React = require('react');
const _ = require('underscore');
const utilities = require('../methods/utilities');
const ListGroup = require('react-bootstrap/lib/ListGroup');

const ListGroupItem = require('react-bootstrap/lib/ListGroupItem');

const inputFocused = (require('../insertForm/actions/ref_action')).inputFocused;


var el = React.createClass({
  shouldComponentUpdate(nextProps) {
    return nextProps.updating;
  },
  renderChildren() {
    if(this.props.value.length) {
      return _.map(this.props.value, function(val, index) {
        var res = <ListGroupItem key={index}>{val}</ListGroupItem>;
        return res;
      });
    }
    else return null;
  },
  render() {
    if(this.props.value.length) {
      return <span>
        <dt>{this.props.id}</dt>
        <dd>
          <ListGroup componentClass="ul">
            {this.renderChildren()}
          </ListGroup>
        </dd>
      </span>
    }
    else return null;
  }
});


module.exports = React.createFactory(el);
