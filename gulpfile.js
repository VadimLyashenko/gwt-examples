import gulp from "gulp";
import plugins from "./config/gulp-plugins.js";
import path from "./config/gulp-paths.js";
import {reset} from "./config/gulp-tasks/reset.js";
import {html} from "./config/gulp-tasks/html.js";
import {css} from "./config/gulp-tasks/css.js";
import {js} from "./config/gulp-tasks/js.js";
import {jsDev} from "./config/gulp-tasks/js-dev.js";
import {images} from "./config/gulp-tasks/images.js";
import {sprite} from "./config/gulp-tasks/sprite.js";
import {fonstStyle, otfToTtf, ttfToWoff} from "./config/gulp-tasks/fonts.js";

global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    isWebP: !process.argv.includes('--no-webp'),
    isFontsReW: process.argv.includes('--rewrite'),
    gulp,
    path,
    plugins
}

const fonts = gulp.series(reset, otfToTtf, ttfToWoff, fonstStyle);
const devTasks = gulp.parallel(fonts);

export {reset}
export {js}
export {jsDev}
export {images}
export {fonts}
export {sprite}

const dev = gulp.series(devTasks);
const build = gulp.series(fonts, jsDev, js, gulp.parallel(html, css, images));

export {dev}
export {build}

gulp.task('default', dev);
