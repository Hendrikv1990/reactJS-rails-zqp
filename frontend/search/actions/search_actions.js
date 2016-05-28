const Reflux = require('reflux');


var SearchActions = Reflux.createActions([
  "ToggleSelectedAgg",
  "Search",
  "ChangePage",
  "UpdateAdvancedSearchTerm",
  "Trigger",
  "ExecuteSearch",
  "AddAdvancedSearchTerm",
  "RemoveAdvancedSearchTerm",
  "AdvancedSearch",
  "ExecuteAdvancedSearch",
  "FilterSearch",
  "ToggleHasPublications",
  "UpdateDateRange",
  "SaveSearch"
]);

// this creates 'load', 'load.completed' and 'load.failed'
// SearchActions.Search = Reflux.createAction(
//   {asyncResult: true}
// );



// SearchActions.Search.listen( function(searchTerm) {
//   backend.fetch('projects.json?search_term='+ searchTerm)
//    .then( this.completed )
//    .catch( this.failed );
// });

module.exports = SearchActions;
