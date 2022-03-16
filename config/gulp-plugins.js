import notify from 'gulp-notify';
import newer from 'gulp-newer';
import plumber from 'gulp-plumber';
import ifPlugin from 'gulp-if';
import rename from 'gulp-rename';

export default {
    notify,
    if: ifPlugin,
    newer,
    plumber,
    rename,
};
