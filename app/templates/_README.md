<%= projectName %>
=====================

<% if (viewEngine === 'react') { %>
# ReactJS Generator POC

The work entailed here is for porting reactjs as a template/view for the keystonejs generator.  This includes the homepage, blog, and contact page.  Gallery is work-in-progress.  All react templates are pre-rendered by express and served to the client's browser.  There is currently not a gulp/grunt build tool that transpiles the reactjs application as a naitive browser application.  Though very little work would be entailed in moving to this method, for now having a simple reactjs server-side rendered application is a good starting place.

## KeystoneJS Base Application Layout

For the most part this reactjs generated application mirrors the Handlebars and Jade generated projects as much as possible.

## Getting Started

Assuming you have setup mongodb and have node installed locally

    npm install .
    node keystone.js

<% } %>

Powered by [KeystoneJS](http://keystonejs.com).
