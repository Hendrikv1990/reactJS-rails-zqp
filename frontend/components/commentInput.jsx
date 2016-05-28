const React = require('react');
const inputActions = require('../insertForm/actions/input_actions');
const Fade = require('react-bootstrap/lib/Fade');

var comment = React.createClass({
  getInitialState() {
    return {
      open: false
    };
  },
  onChangeHandler(event) {
    inputActions.commentChanged({
      key: this.props.legend,
      value: event.currentTarget.value
    });
  },
  toggleInput(event) {
    this.setState({open: !this.state.open});
  },
  render() {
    return(
    <div>
      <input type="button" onClick={this.toggleInput}value="add comment"/>
      <Fade in={this.state.open}>
        <textarea
          onChange={this.onChangeHandler}></textarea>
      </Fade>
    </div>);
  }
});


module.exports = React.createFactory(comment);
