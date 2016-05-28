const React = require('react');
const utilities = require('../methods/utilities');
const inputFocused = (require('../insertForm/actions/ref_action')).inputFocused;


var el = React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.updating;
  },
  focusInput(key, event) {
    inputFocused({'key': key});
  },
  render() {
    var value = utilities.formatValue(this.props.value);
    if(!!value) {
      return <span key= {this.props.id}>
        <dt>{this.props.id}</dt>
          <dd>{value}
            <span onClick={this.focusInput.bind(this, this.props.id)}>¡O¡</span>
          </dd>
        </span>;
    }
    else return null;
  }
});

module.exports = React.createFactory(el);
