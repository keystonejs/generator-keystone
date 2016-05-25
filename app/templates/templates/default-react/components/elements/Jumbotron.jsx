/**
 *  @file: a component that houses all the html to display the jumbotron html, little reason to decouple this out into
 * 	additional component elements (could if we wanted)
 *  *NOTE* this could be componentized more, but opted to keep it simple and just have the html contained inside of a single component
 */

// Include NPM modules
var React = require('react');

var Jumbotron = React.createClass({
	displayName: 'Jumbotron',
	render: function(){
		var signinStyle = {marginRight: '10px'};
		return (
			<div className="container">
				<div className="jumbotron"><img src="/images/logo.svg" width="160" />
					<h1>Welcome</h1>
					<p>This is your new <a href='http://keystonejs.com' target='_blank'>KeystoneJS</a> website.</p>
					<p>
						It includes the latest versions of
						<a href='http://getbootstrap.com/' target='_blank'>Bootstrap</a>
						and <a href='http://www.jquery.com/' target='_blank'>jQuery</a>.
					</p>
					<p>Visit the <a href='http://keystonejs.com/guide' target='_blank'>Getting Started</a> guide to learn how to customise it.</p>
					<hr />
					<p>We have created a default Admin user for you with the email <strong><%= adminLogin %></strong> and the password <strong><%= adminPassword %></strong>.</p>
					<p><a href="/keystone/signin" style={signinStyle} className="btn btn-lg btn-primary">Sign in</a> to use the Admin UI.</p>
					<hr />
					<p>
					Remember to <a href='https://github.com/keystonejs/keystone' target='_blank'>Star KeystoneJS on GitHub</a> and
					<a href='https://twitter.com/keystonejs' target='_blank'>follow @keystonejs</a> on twitter for updates.
					</p>
				</div>
			</div>
		);		
	}
});

module.exports = Jumbotron;
