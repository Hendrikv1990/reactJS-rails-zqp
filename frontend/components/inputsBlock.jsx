const React = require('react');
const ListGroup = require('react-bootstrap/lib/ListGroup');
const ListGroupItem = require('react-bootstrap/lib/ListGroupItem');
const FormInputWithLabel = require('./formInputWithLabel');
const assigner = require('../methods/assigner');

const _ = require("underscore");

var inputsBlock = React.createClass({
  getInitialState() {
    return {
      replica: [true]
    }
  },
  addBlock() {
    let buff = this.state.replica;
    buff.push(true);
    this.setState({replica:buff});
  },
  renderChildren(blockIndex) {
    return this.props.inputs.map((input, index) => {
      //1. get the data for the child without "block"
      let data = _.chain(input).omit('block').clone().value();
      data.key= index;
      let bl;
      //2. if it has already a block, get it
      if(this.props.block) {
        bl = _.chain(this.props.block).clone().value();;
      }
      // otherwise get the on from the input
      else {
        bl = _.chain(input.block).clone().initial().value();
      }
      if(bl.length && _.last(bl).id == this.props.id && !_.last(bl).index) {
        _.last(bl).index = blockIndex;
      }
      else {
        bl.push({
          index: blockIndex,
          id: this.props.id
        });
      }
      data.block = bl;
      return (<span key={index} className="block_item">{assigner(data)}</span>);
    })
  },
  renderBlock() {
    return this.state.replica.map(( repl, index) => {
      return (<ListGroupItem key={index} header={index.toString()}>
        {this.renderChildren(index)}
      </ListGroupItem>);
    });
  },
  render() {
    return (
      <div className="form-group">
        <span>
          <label> {this.props.labelText}
            <ListGroup componentClass="ul"> {this.renderBlock()}</ListGroup>
          </label>
        </span>
        <br/>
        <span className="addBlock-control">
          <input type= "button"
            onClick= {this.addBlock}
            value="add block"/>
        </span>
      </div>
    );
  }
});

module.exports = React.createFactory(inputsBlock);
