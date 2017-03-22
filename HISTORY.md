# Generator-Keystone

## v 0.5.1 / TBC

* fixed; postcategory relationship to posts
* fixed; add polyfill for for `includes` for older version of node

## v0.5.0 / 2017-03-09

* improved; keystone generator now uses keystone 4.
* improved; moved jade view engine to pug
* fixed; nunjucks template rendering
* fixed; changed underscore references to lodash references
* fixed; lodash pluck switched to map, see: https://github.com/lodash/lodash/wiki/Changelog
* changed; replaced mandrill with mailchimp as base email rendering
* removed; grunt and gulp
* added; `unique: true` to user model
* fixed; keystone email now works correctly with all 4 templating engines
* added; option of `auto` to run the generator with all default options
