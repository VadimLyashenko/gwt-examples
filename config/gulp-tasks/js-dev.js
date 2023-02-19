import * as path from 'path';

import webpack from 'webpack-stream';
import TerserPlugin from 'terser-webpack-plugin';

import webPackConfig from '../webpack.prod.js';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const webPackConfigBeautify = Object.assign({}, webPackConfig);

webPackConfigBeautify.optimization = {
    minimizer: [new TerserPlugin({
        extractComments: false,
        terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
                defaults: false,
                unused: true,
            },
            mangle: false,
            module: false,
            toplevel: false,
            keep_classnames: true,
            keep_fnames: true,
            format: {
                beautify: true,
            },
        },
    })],
};

webPackConfigBeautify.output = {
    path: path.resolve('dist'),
    filename: 'app.js',
    publicPath: '/',
};

webPackConfigBeautify.plugins = [
    new MiniCssExtractPlugin({
        filename: '../css/style.css',
    }),
];

export const jsDev = () => app.gulp.src(app.path.src.js)
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
        title: 'JS',
        message: 'Error: <%= error.message %>',
    })))
    .pipe(webpack({
        config: webPackConfigBeautify,
    }))
    .pipe(app.gulp.dest(app.path.build.js));
