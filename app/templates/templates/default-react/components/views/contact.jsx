/**
 * @file This react component (contact) serves as the primary entry point for the react app when express hands off the template context.data
 *  unfortunately the file name `contact.xxx` has to match what the server/route express calls thus the file name is not ContactViewContainer.jsx
 */

// Include NPM modules
var React = require('react');

// Include React Components
var Layout = require('../layouts/Layout');
var ContactForm = require('../pages/ContactForm');


var ContactViewContainer = React.createClass({
	displayName: 'ContactViewContainer',
	propTypes: {
		data: React.PropTypes.object,           // the template data context passed from express
		navLinks: React.PropTypes.array,        // an array of nav elements
		section: React.PropTypes.string,        // the selected section
		user: React.PropTypes.object,           // an object that consists of the user name
		/**
		 * message can be `false` or an object-literal 
		 */
		messages: React.PropTypes.oneOfType([
      		React.PropTypes.bool,
      		React.PropTypes.object
    	])
	},
	render: function() {
		return (
			<Layout navLinks={this.props.navLinks} user={this.props.user} section={this.props.section} 
				messages={this.props.messages} enquirySubmitted={this.props.enquirySubmitted}>
				<ContactForm validationErrors={this.props.validationErrors} 
					formData={this.props.formData} 
					enquiryTypes={this.props.enquiryTypes} enquirySubmitted={this.props.enquirySubmitted} />
			</Layout>
		);		
	}

});

module.exports = ContactViewContainer;