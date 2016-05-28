const React = require('react');
import 'react-widgets/lib/less/react-widgets.less';
const Multiselect = require('react-widgets/lib/Multiselect');

const inputAction = require('../insertForm/actions/input_actions');


var el = React.createClass({
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
    var data= {
      id: this.props.id,
      value: value,
      parent: this.props.parent
    }
    inputAction.valueChanged(data);
  },
  render() {
    console.log("multiSelect, props :", this.props);
    return (
      <div className="form-group">
        <label
          htmlFor= {this.props.id}>
          <div
            className="col-lg-10">
            <Multiselect
              id= {this.props.id}
              data={this.props.dataSource}
              valueField='id'
              textField='text'
              ref={this.setRef}
              onChange= {this.onChangeHandler}/>
          </div>
        </label>

      </div>
    );
  }
});


module.exports = React.createFactory(el);
