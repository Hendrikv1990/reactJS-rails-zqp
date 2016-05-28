"use strict";
const React = require("react");
//const ReactDOM = require("react-dom");

const Panel = require('react-bootstrap/lib/Panel');
const Accordion = require('react-bootstrap/lib/Accordion');

const formField = require('../components/formField');
const overviewer = require('../components/overviewer');
const comment = require('../components/commentInput');

//const formBase = require('./formBase');

const refAction = require('../insertForm/actions/ref_action');
const submitAction = (require('../insertForm/actions/input_actions')).submit;

const formStore = require('../insertForm/stores/form_store');
const refStore = require('../insertForm/stores/ref_store');

const requests = require('./requests');

var formController = React.createClass({
  getInitialState() {
    return {
      activePanel: 0
    };
  },
  childContextTypes: {
    updateRef: React.PropTypes.func
  },
  getChildContext() {
    return {
      updateRef: (data) => {
        refAction.referringInput(data);
      }
    };
  },
  componentDidMount() {
    this.unsubscribe = [
      formStore.listen(this.onSubmit),
      refStore.listen(this.onRefStoreChanged)
    ];
  },
  componentWillUnmount() {
    this.unsubscribe.forEach(current => current());
  },
  onRefStoreChanged(data) {
    this.setState({activePanel: data.value});
  },
  onSubmit(data) {
    if(data.type === "onSubmit") {
      /*$.ajax({
        type: 'POST',
        url: '/admin/projects',
        data: {project: data.res}
      }).done(function(res) {
        console.log("something happened");
      });*/
    }
  },
  switchPanel(index, event) {
    this.setState({activePanel: index});
  },
  builder() {
    console.log("form :", this.props.form);
    var _this = this;
    return this.props.form.map(function(panel, i) {
       return <Panel header={panel.legend} key={i} eventKey={i} onClick={_this.switchPanel.bind(_this, i)}>
        {formField(panel)}
        <div>{comment(panel)}</div>
      </Panel>;
    });
  },
  handleSubmit(event) {
    event.preventDefault();
    submitAction();
  },
  render() {
    return (
      <section>
          <form onSubmit= {this.handleSubmit}>
            <Accordion defaultActiveKey={0} activeKey={this.state.activePanel}>
              {this.builder()}
            </Accordion>
            <div>
              <button>Projekt speichern</button>
            </div>
          </form>
          {overviewer()}
      </section>
    );
  }
});

module.exports = formController;
