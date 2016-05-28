const React = require('react');
const ReactBootstrap = require('react-bootstrap')
const SearchActions = require('../actions/search_actions.js');
const Pagination = ReactBootstrap.Pagination;


var ResultsPagination = React.createClass({
  handleSelect: function(eventKey) {
    SearchActions.ChangePage(eventKey)
  },
  render: function() {
    if (this.props.searchinfo === undefined || this.props.searchinfo.total_pages ===undefined ) return <div />
    return (
      <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={this.props.searchinfo.total_pages}
        maxButtons={10}
        activePage={this.props.searchinfo.current_page}
        onSelect={this.handleSelect} />
    );
  }
});

module.exports = React.createFactory(ResultsPagination);
