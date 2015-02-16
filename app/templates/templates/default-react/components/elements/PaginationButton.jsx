/**
 *
 *  @file React PaginationButton acts as the low level (li + a) element factory for pagination
 *  
 */
// Include NPM modules
var React = require('react');

var Mixins = require('../../mixins');

var PaginationButton = React.createClass({
	displayName: 'PaginationButton',
	mixins: [Mixins],
	propTypes: {
		pageClass: React.PropTypes.string,                 // className to place on the anchor <li> (disable or other?)
		pageUrlSlug: React.PropTypes.node,                 // the anchor url slug (passed into getPageUrl mixin to create app url)
		pageButtonLabel: React.PropTypes.node,             // the anchor button label
		pageButtonGlyphIconClass: React.PropTypes.string   // key to matchup the bootstrap glyph class (goes onto a <span>)

	},
	/*
	 *  returns a react button/action that displays a node 
	 *  button or will use a bootstrap glyph-icon 
	 */
	getActionRender: function() {
		var actionRender = null;
		// displays a button with text
		if(this.props.pageButtonLabel){
			actionRender = (
				<li className={this.props.pageClass}>
					<a href={this.getPageUrl('blog', this.props.pageUrlSlug)} >{this.props.pageButtonLabel}</a>
				</li>);	
		}
		// Display a Span with a bootstrap icon class
		if(this.props.pageButtonGlyphIconClass){
			// pass `pageClass` as `disabled` to prevent usage using css-class
			actionRender = (
				<li className={this.props.pageClass}>
					<a href={this.getPageUrl('blog', this.props.pageUrlSlug)}>
						<span className={this.props.pageButtonGlyphIconClass}></span>
					</a>
				</li>
			);
		}
		return actionRender;
	},
	render: function(){
		var actionRender = this.getActionRender();
		return actionRender;			
	}
});

module.exports = PaginationButton;
