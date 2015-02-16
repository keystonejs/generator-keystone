// Include NPM modules
var React = require('react');

// Include React Components
var Layout = require('./layout');

var Post = React.createClass({
	render: function () {
		return (<Layout><p>Hello Posts</p></Layout>);
	}
});

module.exports = Post;