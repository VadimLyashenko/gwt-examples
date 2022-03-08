export const html = () => {
    return app.gulp.src('./dist/*.html')
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(app.gulp.dest('./dist/'));
}
