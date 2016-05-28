const React = require('react');
const Jumbotron = require('react-bootstrap/lib/Jumbotron');
const _ = require('underscore');
const helper = require('../methods/overviewHelper');

const descriptionListItem = require('./descriptionListItem');
const formBase = require('../client/formBase');

//  integrating reflux
const formStore = require('../insertForm/stores/form_store');
const refStore = require('../insertForm/stores/ref_store');

var Overviewer = React.createClass({
  getInitialState() {
    return {
      outputs: {},
      toUpdate: {}
    };
  },
  componentDidMount() {
    this.unsubscribe = [
      formStore.listen(this.onFormStoreChange)
    ];
  },
  componentWillUnmount() {
    this.unsubscribe.forEach(current => current());
  },
  onFormStoreChange(data) {
    if(data.type === "onValueChanged") {
      //console.log("store has changed :", data);

      this.setState({
        outputs: data.outputs,
        toUpdate: data.toUpdate
      });
    }
  },
  renderChildren() {
    var outputs = this.state.outputs;
    var toUpdate = this.state.toUpdate;
    var buff = helper.extractValues(outputs, toUpdate);
    return _.flatten(buff);
  },
  orderChildren(arr) {
    var inputs = _.flatten(formBase.map(function(el) {
      return el.inputs;
    }));

    var findIndex = function(current) {
      return inputs.findIndex(function(element) {
        return current.props.id == element.id ? true : false;
      });
    }

    return arr.sort(function(a, b) {
      return findIndex(a) < findIndex(b) ? -1 : 1 ;
    });
  },
  render() {
    return (
      <aside>
        <header>Projektvorschau</header>
        <Jumbotron>
          <dl>
            {this.renderChildren()}
          </dl>
        </Jumbotron>
      </aside>
    );
  }
});

module.exports = React.createFactory(Overviewer);
