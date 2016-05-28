const React = require('react');
const inputAction = require('../insertForm/actions/input_actions');

import 'react-widgets/lib/less/react-widgets.less';
const DropdownList = require('react-widgets/lib/DropdownList');

var autocomplete = React.createClass({
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
  onChangeHandler(value) {
    inputAction.valueChanged({
      id: this.props.id,
      value: value,
      parent: this.props.parent
    });
  },
  render() {
    return (
      <div
        className= "form-group autocomplete"
        key= {this.props.id}>
        <label
          className= "col-lg-2 control-label"
          htmlFor= {this.props.id}>
            {this.props.labelText}
        </label>
        <div
          className= "col-lg-10"
          key= {this.props.id}>
          <DropdownList
            ref = {this.setRef}
            data={this.props.dataSource}
            onChange={this.onChangeHandler}
            filter='contains'
            />
        </div>
      </div>
    );}
});

module.exports = React.createFactory(autocomplete);
