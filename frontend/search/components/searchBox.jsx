const React = require('react');
const ReactDOM = require("react-dom");
const SearchActions = require('../actions/search_actions.js');
const AutocompleteActions = require('../actions/autocomplete_actions.js');
const AutoComplete = require('material-ui/lib/auto-complete');
const AutocompleteStore = require('../stores/autocomplete_store.js');
const TimerMixin = require('react-timer-mixin');

var SearchBox = React.createClass({
  mixins: [TimerMixin],
  getInitialState: function() {
    return {
            dataSource: []
          };
  },
  onStoreChange: function(data){
     if (this.searchTerm == data.searchTerm){
      this.setState({
        dataSource: data.dataSource
      }, this.onStateUpdated);
    }
  },
  onStateUpdated: function(){

  },
  componentDidMount: function() {
      this.unsubscribe = AutocompleteStore.listen(this.onStoreChange);
      this.timeout = undefined;
      this.searchTerm = "";
    },
  componentWillUnmount: function() {
    this.unsubscribe();
  },
  handleUpdateInput: function(searchTerm){
    this.searchTerm= searchTerm;
    this.clearTimeout(this.timeout);
    this.timeout = this.setTimeout(this.doneTyping, 1000);
    
  },
  handleSubmit: function(e){
    e.preventDefault()
    SearchActions.Search(this.searchTerm)
  },
  doneTyping: function(){
    AutocompleteActions.SearchTermChanged(this.searchTerm)
  },
  render: function() {
    return (
      <form className="search-box" onSubmit={this.handleSubmit}>
       <AutoComplete
        hintText="Enter search term"
        filter={AutoComplete.fuzzyFilter}
        dataSource={this.state.dataSource}
        onUpdateInput={this.handleUpdateInput}/>
        <input type="submit" className="btn btn-default" value="Search" />
      </form>
    );
  }
});

module.exports = React.createFactory(SearchBox);

  


