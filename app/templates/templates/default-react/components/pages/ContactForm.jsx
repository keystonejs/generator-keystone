/**
 * @file a React Component that represents a page for the keystone front-end application
 */

var React = require('react');
var cx = require('classnames');

var ContactForm = React.createClass({
	displayName: 'ContactForm',
	propTypes: {
		validationErrors: React.PropTypes.object,   // an object that contains validation errors
		formData: React.PropTypes.object,           // an object with all the form fields previously posted data
		enquiryTypes: React.PropTypes.array         // an array with objects {value:'',label:''} to make select menu
	},
	getCSSClasses: function() {
		var classes = {};
		classes.name = cx({'form-group':true, 'has-error': ('name' in this.props.validationErrors)});
		classes.email = cx({'form-group':true, 'has-error': ('email' in this.props.validationErrors)});
		classes.message = cx({'form-group':true, 'has-error': ('message' in this.props.validationErrors)});
		return classes;
	},
	enquiryTypeOptions: function() {
		// stub in a basic empty option
		this.props.enquiryTypes.unshift({value:'', label:'(select one)'});
		var options = this.props.enquiryTypes.map(function(option, ctr) {
			var isSelected = false;
			if(this.props.formData.enquiryType === option.value){
				isSelected = true;
			}
			return (<option key={ctr + '-' + option.value} value={option.value}>{option.label}</option>);
		}, this);
		return options;
	},
	render: function() {
		// get the field classes (indicate if form validation error)
		var fieldClasses = this.getCSSClasses();
		// create a local variable so we can access property key easier in .jsx
		var fullName = this.props.formData['name.full'];
		var enquiryTypeOptions = this.enquiryTypeOptions();
		// if form was already posted successfully, display a return link and hide form
		if(this.props.enquirySubmitted){
			return (
				<div>
					<div className="container">
						<p>Return to <a href="/">home</a></p>
					</div>
				</div>
			);
		// else render contact form
		} else {
			return (
				<div>
					<div className="container">
						<h1>Contact Us</h1>
					</div>
					<div className="container">
						<div className="row">
							<div className="col-sm-8 col-md-6">
								<h3>Thanks for getting in touch.</h3>
							
								<form method="post">
									<input type="hidden" name="action" value="contact" />
									<div className={fieldClasses.name}>
										<label>Name</label>
										<input type="text" name="name.full"  className="form-control" defaultValue={fullName} />
									</div>
									<div className={fieldClasses.email}>
										<label>Email</label>
										<input type="email" name="email" className="form-control" defaultValue={this.props.formData.email} />
									</div>
									<div className="form-group">
										<label>Phone</label>
										<input type="text" name="phone" placeholder="(optional)" className="form-control" defaultValue={this.props.formData.phone} />
									</div>
									<div className="form-group">
										<label>What are you contacting us about?</label>
										<select name="enquiryType" className="form-control" defaultValue={this.props.formData.enquiryType}>
											{enquiryTypeOptions}
										</select>
									</div>
									<div className={fieldClasses.message}>
										<label>Message</label>
										<textarea name="message" placeholder="Leave us a message..." rows="4" className="form-control" defaultValue={this.props.formData.message} ></textarea>
									</div>
									<div className="form-actions">
										<button type="submit" className="btn btn-primary">Send</button>
									</div>
								</form>
					
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
});

module.exports = ContactForm;