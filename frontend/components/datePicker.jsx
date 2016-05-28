const React = require('react');
const inputAction = require('../insertForm/actions/input_actions');
const helper = require('../methods/datePickerHelper').initComponent;

var datePicker = React.createClass({
  contextTypes: {
    updateRef: React.PropTypes.func
  },
  setRef(el) {
    var data = {
      key: this.props.id,
      value: el
    };
    if(this.props.parent)
      data.parent = this.props.parent
    this.context.updateRef(data)
  },
    componentWillMount() {
      this.control = this.renderControl();
    },
    optionsBuilder(val) {
      var arr = val === helper.dateLabels[0]
        ? helper.years
        : helper.months;
      var res = [];
      arr.forEach(function(el, i) {
        res.push(<option
          key = {i}
          value= {el}>
          {el}
        </option>);
      });
      return res;
    },
    renderControl() {
      var res = helper.dateLabels.map((current, index) => {
        var ref = {ref: index == 0 ? this.setRef : undefined}
        return (<span
          key= {Math.random()}>
          <label
            key= {Math.random()}
            htmlFor= {this.props.id+current}
            {...ref}>
            <h5>{current}</h5>
          </label>
          <select
            id = {this.props.id+current}
            name = {current}
            key = {Math.random()}
            onChange = {this.onChangeHandler.bind(this, current)}>
            {this.optionsBuilder(current)}
          </select>
        </span>)
      });
      return res ;
    },
    onChangeHandler(index, event) {
      var arr = this.props.parent ? this.props.parent : [];
      arr.push(this.props.id);
      var data = {
        id: this.props.id,
        parent: this.props.parent,
        value: {[index]:event.currentTarget.value}
      }
      /*var data = {
        changes: {
          [index]: event.target.value
        },
        parent: arr
      };*/
      inputAction.valueChanged(data);
    },
    render() {
      return (
        <div
          className= "form-group"
          key = {this.props.id}>
          <label
            className= "col-lg-2 control-label">
            {this.props.labelText}
          </label>
          <div
            className= "col-lg-10">
            {this.control}
          </div>
        </div>
      );}
  });

module.exports = React.createFactory(datePicker);
