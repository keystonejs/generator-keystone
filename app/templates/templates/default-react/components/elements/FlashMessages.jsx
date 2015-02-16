/**
 * @file React Component to handle the flash messages passed from express/payload
 */
var React = require('react');
var _ = require('underscore');
var cx = require('classnames');

var FlashMessage = require('./FlashMessage');

var FlashMessages  = React.createClass({
	displayName: 'FlashMessages',
	propTypes: {
		messages: React.PropTypes.object  // an object with keys that map for what type of validation/messages sent by server
	},
	getMessages: function() {
		var messages = [];
		// use underscore/lodash to iterator over a message obk with keys
		_.each(this.props.messages, function(message, key) {
			// only buffer the FlashMessage if it has data
			if(message.length > 0) {
				messages.push(<FlashMessage key={key} typeKey={key} {...message[0]} />);
			}
		});
		// return the buffered FlashMessage Components
		return messages;

	},
	render: function() {
		// get our message buffer components
		var messages = this.getMessages();
		return (
			<div id="flash-messages" className="container">
				{messages}
			</div>
		);
	}
});

module.exports = FlashMessages;