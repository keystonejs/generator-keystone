/**
 * @file React Component to handle the flash message
 */
var React = require('react');
var _ = require('underscore');
var cx = require('classnames');

var FlashMessage  = React.createClass({
	displayName: 'FlashMessage',
	propTypes: {
		typeKey: React.PropTypes.string,  // matches up the class name: could be `error`, `warning`, `success`, `info`
		title: React.PropTypes.string,    // The message title from server validation
		list: React.PropTypes.array,      // an array of strings for each validation message
		detail: React.PropTypes.string    // if no list provided there could just be a blog of text instead
	},
	getMessageContent: function() {
		// check if detail or list set
		// if detail return a simple p tag
		// if list return a <ul><li*></ul>
		if(this.props.detail){
			return (<p>{this.props.detail}</p>);
		} else if (this.props.list) {
			// map and return list items
			var items = this.props.list.map(function(item, ctr){
				return (<li key={ctr}>{item}</li>);
			});
			return (<ul>{items}</ul>);
		}
	},
	render: function() {
		var messageContent = this.getMessageContent();
		var messageClassName = cx({
			'alert': true,
			'alert-danger': (this.props.typeKey === 'error'),
			'alert-warning': (this.props.typeKey === 'warning'),
			'alert-success': (this.props.typeKey === 'success'),
			'alert-info': (this.props.typeKey === 'info')
		});
		return (
			<div className={messageClassName}>
				<h4>{this.props.title}</h4>
				<p>{messageContent}</p>
			</div>
		);
	}
});

module.exports = FlashMessage;