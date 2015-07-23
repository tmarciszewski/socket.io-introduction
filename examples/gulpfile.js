'use strict';
var gulp = require('gulp'),
  loadTasks = require('gulp-load')(gulp),
  PATHS = {
    gulpfile: ['gulpfile.js', 'tasks/*.js'],
    server: {
      web: ['app/**/*.js']
    }
  };

gulp.plugin = require('gulp-load-plugins')();
gulp.CONFIG = {
  MAIN_SERVER_FILE: 'index.js',
  PATHS: PATHS
};

loadTasks(__dirname);

gulp.task('develop', [
  'nodemon'
]);
