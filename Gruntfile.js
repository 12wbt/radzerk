/* global require */
(function() {
  'use strict';

  module.exports = function(grunt) {
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
      packageName:  'ra-radzerk',

      clean: {
        dist: ['ra-radzerk*.js']
      },

      concat: {
        options: {
          banner: "'use strict';\n",
          process: function(src, filepath) {
            return '// Source: ' + filepath + '\n' +
                   src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
          }
        },

        dist: {
          src:  ['src/<%= packageName %>.js', 'src/**/*.js'],
          dest: '<%= packageName %>.js'
        }
      },

      ngmin: {
        dist: {
          src:  ['<%= packageName %>.js'],
          dest: '<%= packageName %>.min.js'
        }
      },

      uglify: {
        dist: {
          src:  ['<%= packageName %>.min.js'],
          dest: '<%= packageName %>.min.js'
        }
      },

      bower: {
        options: {
          copy: false
        },
        install: {}
      },

      jshint: {
        src: {
          options: {
            jshintrc: '.jshintrc'
          },
          files: {
            src: ['Gruntfile.js', 'src/{,*/}*.js']
          }
        },

        test: {
          options: {
            jshintrc: 'test/.jshintrc'
          },
          files: {
            src: ['test/{,*/}*.js']
          }
        }
      },

      karma: {
        dev: {
          configFile: 'karma.conf.js',
          singleRun: false
        },

        dist: {
          configFile: 'karma.conf.js'
        }
      },

      bump: {
        options: {
          files:       ['package.json', 'bower.json'],
          commitFiles: ['package.json', 'bower.json'],
          pushTo:      'upstream'
        }
      },

      watch: {
        options: {
          atBegin: true
        },
        scripts: {
          files: ['src/**/*.js'],
          tasks: ['build']
        }
      }
    });

    grunt.registerTask('test', 'karma:dev');
    grunt.registerTask('build', ['jshint:src', 'bower', /*'karma:dist',*/ 'clean', 'concat', 'ngmin', 'uglify']);
  };
})();
