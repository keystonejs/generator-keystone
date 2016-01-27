var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'page';
	locals.filters = {
		page: req.params.page
	};
	locals.data = {
		pages: []
	};

	// Load the current page
	view.on('init', function(next) {

		// try finding page by custom URL first
		var q = keystone.list('Page').model.findOne({
			url: locals.filters.page
		});

		q.exec(function(err, result) {
			locals.data.page = result;
			next(err);
		});
	});

	console.log(locals.data.page);

	// Render the view
	view.render('page');

};
