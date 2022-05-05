import * as path from 'path';
import {readdir} from 'fs/promises';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import jsBeautify from 'js-beautify';

class HtmlBeautify {
    apply(compiler) {
        compiler.hooks.compilation.tap('HtmlBeautify', compilation => {
            HtmlWebpackPlugin.getHooks(compilation)
                .beforeEmit
                .tapAsync('HtmlBeautify', (data, cb) => {
                    data.html = jsBeautify.html(data.html, {
                        indent_char: ' ',
                        end_with_newline: true,
                    });
                    cb(null, data);
                });
        });
    }
}

const paths = {
    src: path.resolve('src'),
    build: path.resolve('dist'),
};

const srcFiles = await readdir(paths.src);
const ejsPages = srcFiles
    .filter(e => e.endsWith('.ejs'))
    .map(e => e
        .split('.')
        .slice(0, -1)
        .join('.'));

const multipleHtmlPlugins = ejsPages.map(name => new HtmlWebpackPlugin({
    template: `./src/${name}.ejs`,
    filename: `${name}.html`,
}));

const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: `${paths.src}/js/app.js`,
    output: {
        path: `${paths.build}`,
        filename: 'js/app.min.js',
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: {
            index: '/404.html',
        },
        static: paths.build,
        open: true,
        compress: true,
        port: 'auto',
        host: 'local-ip', // localhost

        // devMiddleware: {
        //     writeToDisk: filePath => /^(?!.*(hot)).*/.test(filePath),
        // },

        watchFiles: [
            `${paths.src}/**/*.html`,
            `${paths.src}/**/*.htm`,
            `${paths.src}/**/*.ejs`,
            `${paths.src}/img/**/*.*`,
            // `${paths.src}/data/**/*.json`,
        ],
    },
    module: {
        rules: [
            {
                test: /\.ejs$/,
                loader: 'ejs-loader',
                options: {
                    esModule: false,
                },
            },
            {
                test: /\.(scss|css)$/,
                exclude: `${paths.src}/fonts`,
                use: [
                    'style-loader',
                    // {
                    //     loader: 'string-replace-loader',
                    //     options: {
                    //         search: '@img',
                    //         replace: '../img',
                    //         flags: 'g',
                    //     },
                    // },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: false,
                            url: {
                                filter: url => !(url.includes('img/') || url.includes('fonts/')),
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        ...multipleHtmlPlugins,
        new HtmlBeautify(),
        new CopyPlugin({
            patterns: [
                {
                    from: `${paths.src}/img`,
                    to: 'img',
                    noErrorOnMissing: true,
                    force: true,
                },
            ],
        }),
        new FaviconsWebpackPlugin({
            logo: `${paths.src}/img/favicon.svg`,
            prefix: 'img/favicon/',
        }),
    ],
    resolve: {
        alias: {
            '@scss': `${paths.src}/scss`,
            '@js': `${paths.src}/js`,
            '@img': `${paths.src}/img`,
        },
    },
};

export default config;
