/**
 * @file a React Component that represents a page for the keystone front-end application
 */
var React = require('react');

var PostExcerpt = require('../elements/PostExcerpt');
var CategoryBlockLinkList = require('../elements/CategoryBlockLinkList');
var Pagination = require('../elements/Pagination');

var Posts = React.createClass({
	displayName: 'Posts',
	propTypes: {
		posts: React.PropTypes.object,            // an object that contains `results` which is an array of posts and also several other values for pagination
		categories: React.PropTypes.array,        // an array of categories
		selectedCategory: React.PropTypes.string  // the selectedCategory if a filter/query was selected
	},
	getDefaultProps: function() {
		return {
			selectedCategory: 'AllCategories'
		};
	},
	render: function () {
		var listGroupStyle = {marginRight: '10px'};
		var PostExcerptCollection = this.props.posts.results.map(function(post){
			// using spread - http://facebook.github.io/react/docs/jsx-spread.html
			return (<PostExcerpt key={post._doc.id} {...post._doc} />);
		},this);
		return (
			<div>
				<div className="container">
					<h1>Blog</h1>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-sm-8 col-md-9">
							<h4 className="text-weight-normal">Showing {this.props.posts.total} post.</h4>
							<div className="blog">
								{/* iterator for blog posts */}
								{PostExcerptCollection}
							</div>
						</div>
						<div className="col-sm-4 col-md-3">
							<h2>Categories</h2>
							<div style={listGroupStyle} className="list-group">
								{/* category iterator */}
								<CategoryBlockLinkList categories={this.props.categories} selectedCategory={this.props.selectedCategory} />
								{/* category iteration */}
							</div>
						</div>
					</div>
					{/* pagintation */}
					<Pagination totalItems={this.props.posts.total} currentPage={this.props.posts.currentPage} pages={this.props.posts.pages} 
						totalPages={this.props.posts.totalPages} previousPage={this.props.posts.previous} nextPage={this.props.posts.next}
					/>
				</div>
			</div>
		);
	}
});

module.exports = Posts