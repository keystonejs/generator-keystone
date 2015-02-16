// Include NPM modules
var React = require('react');

// Include React Components
var Layout = require('./layout');

var Index = React.createClass({
	render: function(){
		return (<Layout><p>Hello Index</p></Layout>);		
	}

});

module.exports = Index;
