import cleanCss from 'gulp-clean-css';
import webpCss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import cssBeautify from 'gulp-cssbeautify';

export const css = () => app.gulp.src(`${app.path.build.css}style.css`, {})
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
        title: 'CSS',
        message: 'Error: <%= error.message %>',
    })))
    .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
    .pipe(app.plugins.if(app.isBuild, autoprefixer({
        grid: true,
        overrideBrowserslist: ['last 2 versions'],
        cascade: true,
    })))
    .pipe(app.plugins.if(app.isWebP, app.plugins.if(app.isBuild, webpCss({
        webpClass: '.webp',
        noWebpClass: '.no-webp',
    }))))
    .pipe(cssBeautify())
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.if(app.isBuild, cleanCss({debug: true}, details => {
        console.log(`${details.name}: ${details.stats.originalSize} bytes`);
        console.log(`${details.name}(min): ${details.stats.minifiedSize} bytes`);
    })))
    .pipe(app.plugins.rename({suffix: '.min'}))
    .pipe(app.gulp.dest(app.path.build.css));
