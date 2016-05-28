const React = require('react');
const ReactBootstrap = require('react-bootstrap')

const DropdownButton = ReactBootstrap.DropdownButton;
const MenuItem = ReactBootstrap.MenuItem;
const InputGroup = ReactBootstrap.InputGroup;
const AdvancedSearchTermList = require('./advancedSearchTermList.jsx');
const SearchParamsStore = require('../stores/search_params_store.js');
const SearchActions = require('../actions/search_actions.js');
const MonthSelect = require('./monthSelect.jsx')


var AdvancedSearch = React.createClass({
  getInitialState: function() {
    return {
            advancedSearchTerms: [],
            hasPublications: true,
            fromMonth:  0,
            fromYear:  "",
            toMonth:  0,
            toYear:  ""
          };
  },
  onStoreChange: function(data){
    this.setState({
      advancedSearchTerms: data.advancedSearchTerms,
      hasPublications:  data.hasPublications,
      fromMonth:  data.fromMonth,
      fromYear:  data.fromYear,
      toMonth:  data.toMonth,
      toYear:  data.toYear
    }, this.onStateUpdated);
  },
  handleHasPublicationsChanged: function(){
    SearchActions.ToggleHasPublications()
  },
  onStateUpdated: function(){
   
  },
  componentDidMount: function() {
      this.unsubscribe = SearchParamsStore.listen(this.onStoreChange);
      SearchActions.Trigger();
    },
  componentWillUnmount: function(e) {
    e.stopPropagation()
    this.unsubscribe();
  },
  addSearchTerm: function(){
    SearchActions.AddAdvancedSearchTerm();
  },
  handleDateRangeChanged: function(e){
    SearchActions.UpdateDateRange(e.target.id, e.target.value);
  },
  handleDateMonthChanged: function(value, selId){
    SearchActions.UpdateDateRange(selId, value);
  },
  handleSubmit: function(e) {
    e.preventDefault();
    SearchActions.AdvancedSearch();
  },
  handleSearchSave: function(e){
    SearchActions.SaveSearch();
  },
  render: function() {
    return (
    <div className="advanced-search well">
     <form className="search-box" onSubmit={this.handleSubmit}>
        <AdvancedSearchTermList searchTerms={this.state.advancedSearchTerms} />
        <div className = "form-group">
           <a href="#" onClick={this.addSearchTerm}>
              Add Search Term
              <span className="glyphicon glyphicon-plus"></span>
          </a>
        </div>
        <div className="form-group form">
          <label htmlFor="fromMonth" className="col-sm-3">Projects between</label>
          <div className="col-sm-2">
            <MonthSelect id="fromMonth" selectedItem={this.state.fromMonth} onSelect={this.handleDateMonthChanged}></MonthSelect>
          </div>
          <div className="col-sm-2">
            <input type="number" className="form-control" onBlur={this.handleDateRangeChanged} placeholder="year"  defaultvalue={ this.state.fromYear } id="fromYear" />
          </div>
          <div>
            <label htmlFor="toMonth" className="col-sm-1">to</label>
          </div>
          <div className="col-sm-2">
            <MonthSelect id="toMonth" selectedItem={this.state.toMonth} onSelect={this.handleDateMonthChanged}></MonthSelect>
          </div>
          <div className="col-sm-2">
            <input type="number" className="form-control" id="toYear" onBlur={this.handleDateRangeChanged} placeholder="year"  defaultvalue={ this.state.toYear } />
          </div>
        </div>
        <div className="form-group">
          <div>
            <label>
              <input type="checkbox" checked={ this.state.hasPublications } onChange={this.handleHasPublicationsChanged} /> mit Publikation(en)
            </label>
          </div>
        </div>
        <input type="submit" className="btn btn-default" value="Search" />
      </form>
      <input type="button" className="btn btn-default" onClick={ this.handleSearchSave } value="save" />
    </div>
    );
  }
});

module.exports = React.createFactory(AdvancedSearch);

