import cleanCss from 'gulp-clean-css';
import webpCss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

export const css = () => {
    return app.gulp.src('./dist/css/style.css', {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "CSS",
                message: "Error: <%= error.message %>"
            })))
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    grid: true,
                    overrideBrowserslist: ["last 2 versions"],
                    cascade: true
                })
            )
        )
        .pipe(
            app.plugins.if(
                app.isWebP,
                app.plugins.if(
                    app.isBuild,
                    webpCss(
                        {
                            webpClass: ".webp",
                            noWebpClass: ".no-webp"
                        }
                    )
                )
            )
        )
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(app.plugins.rename({suffix: ".min"}))
        .pipe(app.gulp.dest(app.path.build.css));
}
