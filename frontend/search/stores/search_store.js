const Reflux = require('reflux');
const SearchActions = require('../actions/search_actions.js');
const backend = require('../backend.js');

var SearchStore = Reflux.createStore({
// this will set up listeners to all publishers in SearchActiions, using onKeyname (or keyname) as callbacks
  listenables: [SearchActions],
  init: function(){
    this.data = this.getInitialState();
    this.trigger(this.data)
  },
  getInitialState: function() {
    return  {
      projects: [],
      aggs: [], 
      searchInfo: {},
      organizations: [],
      tag_categories: [],
      last_executed: "simple"
    };
  },
  onExecuteSearch: function(searchParams){
    backend.postJSON('projects/search.json?', 
    {
      search_params: {
        search_term: searchParams.searchTerm,
        aggs: searchParams.selectedAggs
      },
      page: searchParams.page
    }).then(this.onExecuteSearchCompleted)
    .catch( this.onExecuteSearchFailed );
  },
  onExecuteSearchCompleted: function(data) {
    this.data.last_executed = "simple";
    this.data.projects = data.projects;
    this.data.aggs = data.aggs;
    this.data.searchInfo = data.result;
    this.trigger(this.data);
  },
  onExecuteSearchFailed: function(data){
  },
  onExecuteAdvancedSearch: function(searchParams){
     backend.postJSON('projects/advanced_search.json?', 
    {
      search_params: {
        search_terms: searchParams.advancedSearchTerms,
        aggs: searchParams.selectedAggs,
        has_publications: searchParams.hasPublications,
        fromMonth: searchParams.fromMonth,
        fromYear: searchParams.fromYear,
        toMonth: searchParams.toMonth,
        toYear: searchParams.toYear
      },
      page: searchParams.page
    }).then(this.onExecuteAdvancedSearchCompleted)
    .catch( this.onExecuteSearchFailed );
  },
  onExecuteAdvancedSearchCompleted: function(data){
    this.data.last_executed = "advanced";
    this.data.projects = data.projects;
    this.data.aggs = data.aggs;
    this.data.searchInfo = data.result;
    this.trigger(this.data);
  },
  onFilterSearch: function(searchParams){
    if(this.data.last_executed == "advanced"){
      this.onExecuteAdvancedSearch(searchParams)
    }else {
      this.onExecuteSearch(searchParams)
    }
  },
  onTrigger: function(){
    this.trigger(this.data);
  }
});
module.exports = SearchStore;
