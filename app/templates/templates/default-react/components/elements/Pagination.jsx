/**
 *  @file: the container component to handle creating a pagination (translates all props into pagination buttons)
 *  
 */
// Include NPM modules
var React = require('react');
var cx = require('classnames');

var Mixins = require('../../mixins');
var PaginationButton = require('./PaginationButton');

var Pagination = React.createClass({
	displayName: 'Pagination',
	mixins: [Mixins],
	propTypes: {
		totalPages: React.PropTypes.number,
		// an array of integers? (might change if you hit a threshold for `...`)
		pages: React.PropTypes.array,
		// false if no next page, otherwise number
		previousPage: React.PropTypes.node,
		// false if no next page, otherwise number
		nextPage: React.PropTypes.node,
		// current page always a number
		currentPage: React.PropTypes.number	
	},
	getPaginationButtons: function() {
		return this.props.pages.map(function(page, ctr) {
			var pageUrlSlug = page;
			// keystone can return a '...' as part of the max pagination set (default 10), 
			// in this case the jade template would link the `...` to which ever side so 1 or totalPages
			// so ['...', 56, 57] would have '...' link to page 1
			// in ['...', 57, 58, '...'] there would be a link to page 1 and total pages
			if (page === '...') {
				pageUrlSlug = ((ctr)? this.props.totalPages:1);
			}
			var pageClass = cx({
				active: (page === this.props.currentPage)
			});
			return (<PaginationButton key={'paginationButton-' + pageUrlSlug} pageClass={pageClass} pageUrlSlug={pageUrlSlug} pageButtonLabel={page} />);	
		}, this);
	},
	getPreviousButton: function() {
		var page = ((this.props.previousPage === false)? 1 : this.props.previousPage); 
		var pageClass = (this.props.previousPage === false)? 'disabled':'';
		return (
			<PaginationButton key={'paginationPrevButton'} pageClass={pageClass} 
				pageUrlSlug={page} pageButtonGlyphIconClass={'glyphicon glyphicon-chevron-left'} />
		);	
	},
	getNextButton: function() {
		var page = ((this.props.nextPage === false)? 1 : this.props.nextPage); 
		var pageClass = (this.props.nextPage === false)? 'disabled':'';
		return (
			<PaginationButton key={'paginationNextButton'} pageClass={pageClass} 
				pageUrlSlug={page} pageButtonGlyphIconClass={'glyphicon glyphicon-chevron-right'} />
		);	
	},
	render: function(){
		var renderPreviousButton = this.getPreviousButton();
		var renderNextButton = this.getNextButton();
		var paginationButtons = this.getPaginationButtons();
		return (
			
			<ul className="pagination">
			    {renderPreviousButton} 
				{paginationButtons}
				{renderNextButton} 
			</ul>
			
		);		
	}
});

module.exports = Pagination;
