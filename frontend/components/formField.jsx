const React = require('react');

const assigner = require('../methods/assigner');

//const inputWithLabel = require('../components/formInputWithLabel');


var el = React.createClass({
  render() {
    return(
      <div>
        {this.props.inputs.map(function(object, i){
          object.key = i;
          var buff = assigner(object);
          return buff;
        })}
      </div>
    );
  }
});

module.exports = React.createFactory(el);
