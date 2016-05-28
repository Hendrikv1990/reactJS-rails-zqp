const React = require('react');
const _ = require('underscore');
const assigner = require('../methods/assigner');

const replicaDeleted = require('../insertForm/actions/input_actions').replicaDeleted;

var replicator = React.createClass({
  getInitialState() {
    return {
      count: 1,
      replica: [true]
    };
  },
  incrementCount() {
    let buff = this.state.replica;
    buff.push(true);
    this.setState({replica: buff});
  },
  deleteReplica(i, event) {
    let buff = this.state.replica;
    buff.splice(i,1);
    this.setState({replica:buff});
    replicaDeleted({
      id: this.props.id,
      index: i
    });
  },
  refReplica(i, ref) {
    this._replicaList[i]= ref;
  },
  buildReplica(i) {
    let data = _. chain(this.props).omit('children').clone().value();
    data.multipleIndex = i;
    data.key = i;
    return (
      <div key={i}>{assigner(data)}
        <input type="button" value="delete" onClick={this.deleteReplica.bind(this, i)}/>
      </div>
    )
  },
  renderElements() {
    return _.map(this.state.replica, (val, index) => this.buildReplica(index));
  },
  render() {
    return (
      <div className="wrapper">
        <label>
          <div>
            {this.renderElements()}
          </div>
        </label>
        <input type="button"
          onClick= {this.incrementCount}
          value="add element"/>
      </div>
    );
  }
});


module.exports = React.createFactory(replicator);
