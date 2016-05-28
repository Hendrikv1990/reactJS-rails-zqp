const Reflux = require('reflux');
const AutocompleteActions = require('../actions/autocomplete_actions.js');
const backend = require('../backend.js');

var AutocompleteStore = Reflux.createStore({
// this will set up listeners to all publishers in SearchActiions, using onKeyname (or keyname) as callbacks
  listenables: [AutocompleteActions],
  init: function(){
    this.data = this.getInitialState();
  },
  getInitialState: function() {
    return  {
      searchTerm:"",
      dataSource: []
    };
  },
  getSuggestions: function(){
    backend.fetch('projects/autocomplete.json?search_term=' + this.data.searchTerm)
    .then(this.ongetSuggestionsCompleted )
    .catch( this.ongetSuggestionsFailed );
  },
  onSearchTermChanged: function(searchTerm){
    this.data.searchTerm = searchTerm
    this.getSuggestions()
   
  },
  ongetSuggestionsCompleted: function(data) {
    this.data.dataSource = data;
    console.log("autocomplete completed")
    this.trigger(this.data);
  },
  onAutoCompleteFailed: function(data){
  }
 

});
module.exports = AutocompleteStore;
