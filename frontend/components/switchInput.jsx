const React = require('react');
const _ = require('underscore');
const assigner = require('../methods/assigner');
const FormInputWithLabel = require('./formInputWithLabel');
const Fade = require('react-bootstrap/lib/Fade');

const controlChanged = require('../insertForm/actions/input_actions').controlChanged;


var switchInput = React.createClass({
  getInitialState() {
    var current = this.props.inputs[0].id;
    return {
      current: current
    };
  },
  componentWillMount() {
    this.control = this.renderControl();
  },
  setCurrent(currentId, event) {
    this.setState({current: currentId});
    var parent = this.props.parent ? this.props.parent.concat(this.props.id) : [this.props.id];
    controlChanged({
      changes: {
        current: currentId
      },
      parent: parent
    });
  },
  renderControl() {
    return this.props.inputs.map((current, index) => {
      var settings = {
        type:"radio",
        name: "switch-"+this.props.id,
        key: "radio-"+index,
        onChange: this.setCurrent.bind(this, current.id),
        defaultChecked: (this.state.current == current.id)
      }
      return <label key={index}
        className="col-lg-2 control-label"> {current.name}
        <input {...settings}/>
      </label>
    });
  },
  renderChildren() {
    return this.props.inputs.map((current, index) => {
      current.key = index;
      return <Fade in={this.state.current == current.id} key={index}>
        <div className="col-lg-10">
          {assigner(current)}
        </div>
      </Fade>
    });
  },
  render() {
    return (
      <div className="switch wrapper form-group">
        <span>
          {this.control}
        </span>
        <span>
          {this.renderChildren()}
        </span>
      </div>
    );
  }
});

module.exports = React.createFactory(switchInput);
