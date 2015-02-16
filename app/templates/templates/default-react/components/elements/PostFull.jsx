/**
 *  @file: a component that renders a single full post entry
 *  
 */
// Include NPM modules
var React = require('react');
var AuthorByline = require('./AuthorByline');
var CategoryInlineLinkList = require('./CategoryInlineLinkList');

var PostFull = React.createClass({
	displayName: 'PostFull',
	propTypes: {
		title: React.PropTypes.string,         // the title of the post
		authorName: React.PropTypes.object,    // the authors name
		categories: React.PropTypes.array,     // an array of categories associated to post
		content: React.PropTypes.object        // the content object (text of blog post key/namespace as html/markdown)
	},
	render: function(){
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
						<article>
							<p><a href="/blog">&larr; back to the blog</a></p>
							<hr />
							<header>
								<h1>{this.props.title}</h1>
								<h5>
									<CategoryInlineLinkList categories={this.props.categories} prefix={'Posted in '} autoLink={true} cssClass={''} />
									{(this.props.authorName.first)?
									<AuthorByline name={this.props.authorName.first}/> :
									''}
								</h5>
							</header>
							<div className="post" dangerouslySetInnerHTML={{__html: this.props.content.extended.html}}></div>
						</article>
					</div>
				</div>
			</div>			
		);		
	}
});

module.exports = PostFull;
