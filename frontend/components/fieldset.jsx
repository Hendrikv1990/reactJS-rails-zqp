const React = require('react');
const _ = require('underscore');
const DOM = React.DOM;

const inputWithLabel = require('../components/formInputWithLabel');

var el = React.createClass({
  getDefaultProps() {
    return {
      text: "this is the defaultText"
    };
  },
  render() {
    return (
      <fieldset>
        <legend>
          {this.props.legend}
        </legend>
        {this.props.inputs.map(function(object, i){
          object.key = i;
          var buff = inputWithLabel(object);
          return buff;
        })}
      </fieldset>
    );
  }
});

module.exports = React.createFactory(el);
