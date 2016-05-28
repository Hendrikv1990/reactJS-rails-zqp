const React = require('react');
const ListGroup = require('react-bootstrap/lib/ListGroup');
const ListGroupItem = require('react-bootstrap/lib/ListGroupItem');

const FormInputWithLabel = require('./formInputWithLabel');

var mi = React.createClass({


  renderChildren() {
    return this.props.inputs.map((current, index) =>{
      current.key = index;
      if(this.props.multipleIndex !== undefined)
        current.multipleIndex = this.props.multipleIndex;
      if(this.props.nested!== undefined)
        current.nested = this.props.elementType
      return <div key={index}>{FormInputWithLabel(current)}</div>;
    })
  },
  render() {
    return (
      <div className="form-group">
        <label> {this.props.labelText}
          <ListGroup componentClass="ul">
            {this.renderChildren()}
          </ListGroup>
        </label>
      </div>
    );
  }
});


module.exports = React.createFactory(mi);
