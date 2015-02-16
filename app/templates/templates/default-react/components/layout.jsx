var React = require('react');

var Layout = React.createClass({
	render: function () {
		return (<html>{this.props.children}</html>);
	}
});

module.exports = Layout;