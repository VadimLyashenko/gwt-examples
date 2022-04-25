import * as path from 'path';
import {readdir} from 'fs/promises';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

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
    filename: `../${name}.html`,
}));

const config = {
    mode: 'production',
    cache: {
        type: 'filesystem',
    },
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    },
    output: {
        path: `${paths.build}`,
        filename: 'app.min.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.ejs$/i,
                use: ['html-loader', 'template-ejs-loader'],
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                            importLoaders: 0,
                            sourceMap: false,
                            modules: false,
                            url: {
                                filter: url => !(url.includes('img') || url.includes('fonts')),
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                outputStyle: 'expanded',
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        ...multipleHtmlPlugins,
        new MiniCssExtractPlugin({
            filename: '../css/style.css',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: `${paths.src}/favicon.ico`,
                    to: '../',
                    noErrorOnMissing: true,
                },
            ],
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
