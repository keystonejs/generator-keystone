# Keystone Generator

A [Yeoman](http://yeoman.io) generator for [KeystoneJS](http://keystonejs.com), the model-driven cms for node.js built on Express and MongoDB.

`yo keystone` will scaffold a new KeystoneJS project for you, and offer to set up blog, gallery and enquiry models + views.

## Getting Started

First up, you'll need Node.js <= 0.10.x and MongoDB <= 2.4.x installed. If you don't have them, follow the instructions at the bottom.

Then, install the generator like this:

````
$ npm install -g generator-keystone
````

If you see errors, check the [problems](#err-please-try-running-this-command-again-as-rootadministrator) section at the bottom.

With the generator installed, create an empty directory for your new KeystoneJS Project, and run `yo keystone` in it like this:

````
$ mkdir my-project
$ cd my project
$ yo keystone
````

The generator will ask you a few questions about which features to include, then prompt you for Cloudinary and Mandrill account details.

**These accounts are optional**, but Cloudinary is used to host the images for the blog and gallery templates. You can get a free account for each at

* [Cloudinary](https://cloudinary.com/users/register/free) - Image serving and management in the cloud
* [Mandrill](https://mandrill.com/signup/) - Transactional email service by [Mailchimp](http://mailchimp.com)

### What next?

When you've got your new project, check out the [KeystoneJS Getting Started Guide](http://keystonejs.com/guide) to learn more about how to get started with KeystoneJS.

## Problems?

### ERR! Please try running this command again as root/Administrator.

When running `npm install -g generator-keystone`, you may get an **EACCES** error asking you to run the command again as root/Administrator.

This means that there's a permissions issue, which you're better off fixing than re-running the command with the `sudo` prefix.

The typical fix for this is to run the following command:

````
sudo chown -R $USER /usr/local
````

For more information, see [this section](http://foohack.com/2010/08/intro-to-npm/#what_no_sudo) of the Intro to npm by Isaac Schulueter.

### What do you mean it couldn't find my Database?

By default, KeystoneJS will look for a mongod server running on `localhost` on the default port, and connect to it. If you're getting errors related to the MongoDB connection, make sure your MongoDB server is running.

If you haven't installed MongoDB yet, follow the instructions below.

To connect to a server **other** than `localhost`, add a line like this to your `.env` file to tell Keystone where to find it:

````
MONGO_URI=mongodb://your-server/database-name
````


## Dependencies

### Install Node.js

Download and install the node.js binaries for your platform from the [Node.js download page](http://nodejs.org/download/).

### Install MongoDB

If you're on a mac, the easiest way to install MongoDB is to use the [homebrew package manager for OS X](http://brew.sh/). To install it, run this in your terminal:

````
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
````

With Homebrew installed, run this in your terminal to download and install MongoDB:

````
brew mongo
````

For other platforms, see the [MongoDB downloads page](http://www.mongodb.org/downloads).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
