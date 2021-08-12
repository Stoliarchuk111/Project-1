'use strict';

require('/webProjects/gulp/gulp-init.js')({HTML: '.'});

const comb = require('/webProjects/gulp/tasks/comb.js'),
    {scssDC, scssDev, scssOnly}     = require('/webProjects/gulp/tasks/scss.js'),
    mincss   = require('/webProjects/gulp/tasks/mincss.js'),
    uglifyes = require('/webProjects/gulp/tasks/uglify.js').uglifyes,
    { sync, syncInit } = require('/webProjects/gulp/tasks/sync.js');

function watchFiles () {
    syncInit();
    watch($.PATH.scss.files, series(scssOnly));
    watch([$.PATH.js.files, '!' + $.PATH.js.filesMin], series(uglifyes, sync));
    watch($.PATH.html.files, sync);
}

task('combScss', comb);
task('uglifyEs6', series(uglifyes, sync));
task('sass', series(scssOnly));
task('watch', watchFiles);
