'use strict()';

var config= {
  port: 3000
};

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    express: {
      options: {
        port: config.port
      },
      dev: {
        options: {
          script: 'keystone.js',
          debug: true
        }
      }
    },

    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        force: true
      },
      all: [ 'routes/**/*.js',
             'models/**/*.js'
      ],

      server: [
        './keystone.js'
      ]
    },

    concurrent: {
      dev: {
        tasks: ['nodemon', 'node-inspector', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    'node-inspector': {
      custom: {
        options: {
          'web-host': 'localhost'
        }
      }
    },

    nodemon: {
      debug: {
        script: 'keystone.js',
        options: {
          nodeArgs: ['--debug'],
          env: {
            port: config.port
          },
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              // Delay before server listens on port
              setTimeout(function() {
                require('open')('http://localhost:8080/debug?port=5858');
              }, 1000);
            });
          }
        }
      }
    },

    watch: {
      js: {
        files: [
          'model/**/*.js',
          'routes/**/*.js'
        ],

        tasks: ['jshint:all']
      },
      express: {
        files: [
          'keystone.js',
          'public/js/lib/**/*.{js,json}'
        ],
        tasks: ['jshint:server', 'express:dev']
      },

      livereload: {
        files: [
          'public/styles/**/*.css',
          'public/styles/**/*.less',
          'templates/**/*.jade',
          'node_modules/keystone/templates/**/*.jade'
        ],
        options: {
          livereload: true
        }
      }
    }
  });

  // load jshint
  grunt.registerTask('lint', function(target){
    grunt.task.run([
      'jshint'
    ]);
  });

  // default option to connect server
  grunt.registerTask('serve', function(target){
    grunt.task.run([
      'jshint',
      'concurrent:dev'
    ]);
  });

};
