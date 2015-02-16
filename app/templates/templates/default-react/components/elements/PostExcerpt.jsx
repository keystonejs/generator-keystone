/**
 *  @file:  Component used to render a blog post excerpt which displays a readmore button
 *  
 */
// Include NPM modules
var React = require('react');

// Include mixin
var Mixins = require('../../mixins');
var CategoryInlineLinkList = require('./CategoryInlineLinkList');

var PostExcerpt = React.createClass({
	displayName: 'PostExcerpt',
	mixins: [Mixins],
	propTypes: {
		image: React.PropTypes.object,      // contains the blog posts image info/meta
		title: React.PropTypes.string,      // title of the post
		categories: React.PropTypes.array,  // an array of all the categories associated to post
		content: React.PropTypes.object,    // the content object (text of blog post key/namespace as html/markdown)
		author: React.PropTypes.object,     // the author name defined by the user associated to post
		slug: React.PropTypes.string        // the url slug that will be handed off to our mixin.getRouteUrl
	},
	render: function(){
		return (
			<div className="post">
				<h2><a href={this.getRouteUrl('post', this.props.slug)}>{this.props.title}</a></h2>
				<CategoryInlineLinkList categories={this.props.categories} prefix={'Posted in '} autoLink={true} cssClass={'lead text-muted'} />
				<p dangerouslySetInnerHTML={{__html: this.props.content.brief.html}}></p>
				<p className="read-more"><a href={this.getRouteUrl('post', this.props.slug)}>Read more...</a></p>
			</div>			
		);		
	}
});

module.exports = PostExcerpt;
