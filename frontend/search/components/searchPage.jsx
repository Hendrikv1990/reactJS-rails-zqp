const React = require('react');
const SearchBox = require('./searchBox.jsx');
const ProjectList = require('./projectList.jsx');
const AggsList = require('./aggsList.jsx');
const NestedResultList = require('./nestedResultList.jsx');
const SearchInfo = require('./searchInfo.jsx');
const SearchStore = require('../stores/search_store.js');
const SearchParamsStore = require('../stores/search_params_store.js');
const ResultsPagination = require('./resultsPagination.jsx');
const ReactBootstrap = require('react-bootstrap')
const Panel = ReactBootstrap.Panel;

const AdvancedSearch = require('./advancedSearch.jsx');


var SearchPage = React.createClass({
  getInitialState: function() {
    return {
            projects: [],
            aggs: [], 
            searchInfo: undefined,
            organizations:[],
            tag_categories:[],
            showAdvancedSearch: true
          };
  },
  onStoreChange: function(data){
    this.setState({
      projects: data.projects,
      aggs: data.aggs,
      searchInfo: data.searchInfo,
      organizations: data.organizations,
      tag_categories: data.tag_categories
    }, this.onStateUpdated);
  },
  onStateUpdated: function(){
   
  },
  componentDidMount: function() {
      this.unsubscribe = SearchStore.listen(this.onStoreChange);
    },
  componentWillUnmount: function() {
    this.unsubscribe();
  },
  handleAdvanceSearchToggle: function(){
    this.setState({
      showAdvancedSearch: !this.state.showAdvancedSearch
    })
  },
  formstyle: function(){
    return {
      width:'810px',
      marginLeft:'auto',
      marginRight:'auto',
      display:'center'    
    }
  },
  render: function() {
    return (
      <div className="searchPage">
        <div className="row">
          <div className="col-md-7">
            <SearchBox  />
          </div>
          <div className="col-md-2">
            <a href="#" onClick={this.handleAdvanceSearchToggle}>
               Advanced Search
              <span className="glyphicon glyphicon-menu-down">
              </span>
            </a>
          </div>
          <div className="col-md-12">
            <Panel collapsible expanded={this.state.showAdvancedSearch}>
              <div style={this.formstyle()}>
                <AdvancedSearch />
              </div>
            </Panel>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 col-md-3 col-lg-2">
            <div className="panel panel-default">
              <div className="panel-heading">
                Filters
              </div>
              <AggsList aggs={this.state.aggs}></AggsList>
            </div>
          </div>
          <div className="col-sm-8 col-md-9 col-lg-10">
            <div className="panel panel-default">
              <div className="panel-heading">
                Search Results
                <SearchInfo searchinfo={this.state.searchInfo}></SearchInfo>
              </div>
              <ProjectList projects={this.state.projects}> </ProjectList>
              <div className="panel-footer text-center">
                <ResultsPagination searchinfo={this.state.searchInfo}></ResultsPagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = React.createFactory(SearchPage);
