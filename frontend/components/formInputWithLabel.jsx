const React = require('react');
const DOM = React.DOM;

//reflux
const inputAction = require('../insertForm/actions/input_actions');

var FormInputWithLabel = React.createClass({
  contextTypes: {
    updateRef: React.PropTypes.func
  },
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },
  onChangeHandler(event) {
    var value = this.props.inputType == "checkbox"
      ? event.currentTarget.checked
      : event.currentTarget.value;
    var data = {
      id: this.props.id,
      value: value,
      parent: this.props.parent,
      block: this.props.block
    };
    inputAction.valueChanged(data);
  },
  setRef(el) {
    // TODO: redo it, it's shit
    var id = this.props.id;

    var data = {
      key: id,
      value: el
    };
    if(this.props.parent)
      data.parent = this.props.parent;
    this.context.updateRef(data);
  },
  getDefaultProps() {
    return {
      elementType: "input",
      inputType: "text",
      displayName: "FormInputWithLabel"
    };
  },
  render() {
    return    DOM.span({
              className: "form-group",
              key: this.props.id
            },
              DOM.label({
                htmlFor: this.props.id,
                className: "col-lg-2 control-label"
              }, this.props.labelText),
            DOM.span({
              className: "col-lg-10",
            },
              DOM[this.props.elementType]({
                className: "form-control",
                placeholder: this.props.placeholder,
                id: this.props.id,
                required: this.props.required,
                type: "text",
                ref: this.setRef,
                onChange: this.onChangeHandler,
                key: this.props.id,
                type: this.tagType()
            })));
  },
  tagType() {
    return {
      "input": this.props.inputType,
      "textarea": null,
    }[this.props.elementType];
  }
});

module.exports = React.createFactory(FormInputWithLabel);
