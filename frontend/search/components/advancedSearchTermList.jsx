const React = require('react');
const ReactBootstrap = require('react-bootstrap')
const AdvancedSearchTerm = require('./advancedSearchTerm.jsx');


var AdvancedSearchTermList = React.createClass({
  render: function() {
    var searchTermList = this.props.searchTerms.map(function(st,i) {
      return (
        <AdvancedSearchTerm index={i} searchTerm={st} key={i}> </AdvancedSearchTerm>
      );
    });
    return (
     <div className="advanced-search">
        {searchTermList}
    </div>
    );
  }
});

module.exports = React.createFactory(AdvancedSearchTermList);

