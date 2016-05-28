const React = require('react');


var SearchInfo = React.createClass({
  resultsShowing: function() {
    if(this.props.searchinfo.total_count < this.props.searchinfo.per_page){
      return this.props.searchinfo.total_count
    } else{
      return this.props.searchinfo.per_page
    }
  },
  render: function() {
    if (this.props.searchinfo === undefined || this.props.searchinfo.total_pages ===undefined ) return <div />
    return (
      <div className="searchInfo pull-right">
        <span className="label label-default">
          Page
          {' '}
          {this.props.searchinfo.current_page}
          {' '}
          of
          {' '}
          {this.props.searchinfo.total_pages}
        </span>
        {' '}
        <span className="label label-default">
          Displaying
          {' '}
          {this.resultsShowing()}
          {' '}
          of
          {' '}
          {this.props.searchinfo.total_count}
          {' '}
          Results
        </span>
        {' '}
        <span className="label label-default">
          in {this.props.searchinfo.took} seconds
        </span>
      </div>
    );
  }
});

module.exports = React.createFactory(SearchInfo);

