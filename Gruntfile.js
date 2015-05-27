/*
 * Generated on 2015-05-18
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2015 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['clean', 'assemble']
      },
      sass: {
        files: ['<%= config.src %>/assets/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:dist']
      },
      copy: {
        files: ['<%= config.src %>/assets/{images,scripts}/*.*'],
        tasks: ['copy:assets']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= config.dist %>/styles/{,*/}*.css'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        // hostname: 'localhost'
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          open: true,
          base: [
            'bower_components',
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: 'default.hbs',
          layoutdir: '<%= config.src %>/templates/layouts',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs',
          plugins: ['assemble-contrib-permalinks','assemble-contrib-sitemap'],
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    copy: {
      bower: {
        expand: true,
        cwd: 'bower_components',
        src: '**',
        dest: '<%= config.dist%>/bower_components'
      },
      assets: {
        expand: true,
        cwd: '<%= config.src %>/assets',
        src: ['**', '!styles/**'],
        dest: '<%= config.dist %>/assets'
      }
    },

    sass: {
      options: {
        sourceMap: true, // <== seg faults (sometimes)
        includePaths: ['bower_components']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/assets/styles',
          src: ['*.{scss,sass}'],
          dest: '<%= config.dist %>/assets/css',
          ext: '.css'
        }]
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('assemble');

  grunt.registerTask('server', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'sass:dist',
    'copy',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
