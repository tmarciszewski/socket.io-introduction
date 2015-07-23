'use strict';

module.exports = function(gulp) {
  gulp.task('nodemon', function() {
    gulp.plugin.nodemon({
      script: gulp.CONFIG.MAIN_SERVER_FILE,
      nodeArgs: ['--debug']
    })
    .on('restart', function() {
    });
  });
};
