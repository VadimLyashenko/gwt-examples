export const html = () => app.gulp.src(`${app.path.build.html}*.html`)
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
        title: 'HTML',
        message: 'Error: <%= error.message %>',
    })))
    // TODO: add webp handling
    .pipe(app.gulp.dest(app.path.build.html));
