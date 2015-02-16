var React = require('react');

var NavItem = require('../elements/NavItem');
var FlashMessages = require('../elements/FlashMessages');

var Layout = React.createClass({
	displayName: 'Layout',
	propTypes: {
		pageTitle: React.PropTypes.string,
		navLinks: React.PropTypes.array,
		section: React.PropTypes.string,
		enquirySubmitted: React.PropTypes.bool,
		messages: React.PropTypes.any, // can be obj-literal, false, undefined
		user: React.PropTypes.object
	},
	getDefaultProps: function() {
		return {
			pageTitle: 'My Site'
		};
	},
	/*
	 *  Provide an additional layer of logic around FlashMessage for
	 *  if EnquirySubmitted is true then we create a success message json shape and pass it to <FlashMessage />
	 *   **note** .props.messages is empty if form was submitted
	 *  Otherwise, check if there are error messages in .props.message, if so render those
	 *  if .props.message is false then there are no messages and if undefined means the page-route doesn't support message interface
	 */
	getFlashMessage: function() {
		// our return stub
		var messageSet = {};

		// if enquirySubmitted then it was successful so build a flash message json-struct
		if(this.props.enquirySubmitted) {
			var messages = {
				'success': [
					{'title': 'Message Submitted', 'detail': 'Thank you for contacting'}
				]
			}
			return messages;
		// if there was no submission and this is a new page render or with errors
		// construct our error message or return an empty message object (convert the false||undefined)
		} else {
			if(this.props.messages === false || typeof(this.props.messages) === 'undefined'){
				return {};
			} else {
				return this.props.messages;
			}
		}
	},
	render: function () {
		var navLinks = this.props.navLinks.map(function(item) {
			var isSelected = (this.props.section === item.key);
			return (<NavItem key={item.key} href={item.href} label={item.label} selected={isSelected} />);
		}, this);
		// instead of just handing off the props.message, do some logic/handling
		var messages = this.getFlashMessage();
		return (
			<html>
				<head>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<title>{this.props.pageTitle}</title>
					<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
					<link href="/styles/site.min.css" rel="stylesheet" />
					
				</head>
				<body>
					<div id="header">
						<div className="container">
							<div role="navigation" className="navbar navbar-default">
								<div className="container-fluid">
									<div className="navbar-header">
										<button type="button" data-toggle="collapse" data-target=".navbar-collapse" className="navbar-toggle">
											<span className="sr-only">Toggle navigation</span>
											<span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span>
										</button>
										<a href="/" className="navbar-brand">AppleParrotPeach</a>
									</div>
									<div className="collapse navbar-collapse">
										<ul className="nav navbar-nav navbar-left">
											{navLinks}
										</ul>
										<ul className="nav navbar-nav navbar-right">
											{(this.props.user)?
											<li><a href="/keystone/signout">Sign Out</a></li>
											:
											<li><a href="/keystone/signin">Sign In</a></li>
											}
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="body">
					<FlashMessages messages={messages} />
					{this.props.children}
					</div>
					<div className="container">
						<div id="footer">
							<p>Powered by <a href="http://keystonejs.com" target="_blank">KeystoneJS</a>.</p>
						</div>
					</div>
				</body>
			</html>
		);
	}
});

module.exports = Layout;