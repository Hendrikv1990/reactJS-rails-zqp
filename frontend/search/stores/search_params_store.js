const Reflux = require('reflux');
const SearchActions = require('../actions/search_actions.js');
const backend = require('../backend.js');
// const backend = require('../backend.js');

var SearchParamsStore = Reflux.createStore({
// this will set up listeners to all publishers in SearchActiions, using onKeyname (or keyname) as callbacks
  listenables: [SearchActions],
  init: function(){
    this.data = this.getInitialState();
    this.trigger(this.data)
  },
  getInitialState: function() {
    return  {
      selectedAggs:{},
      searchTerm: "",
      advancedSearchTerms: [
       this.getDefaultAdvancedSearchTerm()
      ],
      hasPublications: false,
      fromYear: "",
      fromMonth: 0,
      toYear: "",
      toMonth: 0,
      page: 1
    };
  },
  getDefaultAdvancedSearchTerm: function(){
    return  {
          field: "All Fields",
          criteria: "All",
          searchTerm: ""
        }
  },
  onSearch:function(searchTerm){
    //reset search filters
    this.data.searchTerm = searchTerm
    this.data.selectedAggs={}
    this.data.page = 1
    this.trigger(this.data)
    SearchActions.ExecuteSearch(this.data)
  },
  onAdvancedSearch: function(){
    this.data.selectedAggs={}
    this.data.page = 1
    if (this.data.hasPublications){
      this.addSelectedAgg("has_publications", 1);
    }
    this.trigger(this.data)
    SearchActions.ExecuteAdvancedSearch(this.data)
  },
  onToggleSelectedAgg:function(name, key){
    if (this.data.selectedAggs[name] === undefined){
      this.data.selectedAggs[name] = [];
    }
    if (this.data.selectedAggs[name].indexOf(key)==-1){
      this.addSelectedAgg(name, key);
    }else{
      this.removeSelectedAgg(name, key);
    }
    this.data.page = 1;
    this.trigger(this.data);
    SearchActions.FilterSearch(this.data);
  },
  addSelectedAgg: function(name, key){
    if (this.data.selectedAggs[name] === undefined){
      this.data.selectedAggs[name] = [];
    }
    if (this.data.selectedAggs[name].indexOf(key)==-1){
      this.data.selectedAggs[name].push(key);
    }
  },
  removeSelectedAgg: function(name, key){
    var aggs = this.data.selectedAggs[name].filter(function(agg){
      return agg !== key;
    });
    this.data.selectedAggs[name] = aggs;
  },
  onAddAggCompleted: function(new_message) {
  },
  onAddAggFailed: function(new_message) {
  },
  onChangePage: function(page){
    if(page !== this.data.page){
      this.data.page=page;
      this.trigger(this.data);
      SearchActions.FilterSearch(this.data);
    }
  },
  onUpdateAdvancedSearchTerm: function(index, field, value){
    this.data.advancedSearchTerms[index][field] = value;
    this.trigger(this.data);
  },
  onAddAdvancedSearchTerm: function(){
    this.data.advancedSearchTerms.push(this.getDefaultAdvancedSearchTerm());
    this.trigger(this.data);
  },
  onRemoveAdvancedSearchTerm: function(index){
    delete this.data.advancedSearchTerms[index]
    this.trigger(this.data);
  },
  onToggleHasPublications: function(){
    this.data.hasPublications = !this.data.hasPublications
    this.trigger(this.data);
  },
  onUpdateDateRange: function(field, value){
    this.data[field] = value;
    this.trigger(this.data);
  },
  onTrigger: function(){
    this.trigger(this.data);
  },
  onSaveSearch: function(){
    backend.postJSON('project_search', 
    {
      search_params: {
        search_terms: this.data.advancedSearchTerms,
        aggs: this.data.selectedAggs,
        has_publications: this.data.hasPublications,
        fromMonth: this.data.fromMonth,
        fromYear: this.data.fromYear,
        toMonth: this.data.toMonth,
        toYear: this.data.toYear
      },
    }).then(this.onSaveSearchCompleted)
    .catch( this.onSaveSearchFailed );
  },
  onSaveSearchCompleted: function(){
    console.log("save completed")
  },
  onSaveSearchFailed: function(){
    console.log("save failed")
  }

});
module.exports = SearchParamsStore;
