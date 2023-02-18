import * as path from 'path';
import FileIncludeWebpackPlugin from 'file-include-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const srcFolder = 'src';
const buildFolder = 'dist';

const htmlPages = [new FileIncludeWebpackPlugin({
    source: srcFolder,
    htmlBeautifyOptions: {
        indent_char: '  ',
        end_with_newline: true,
    },
    replace: [
        {regex: '<link rel="stylesheet" href="css/style.min.css">', to: ''},
        {regex: '../img', to: 'img'},
        {regex: '@img', to: 'img'},
    ],
})];

const paths = {
    src: path.resolve(srcFolder),
    build: path.resolve(buildFolder),
};

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
        hot: true,
        host: 'local-ip', // localhost

        // devMiddleware: {
        //     writeToDisk: true,
        // },

        watchFiles: [
            `${paths.src}/**/*.html`,
            `${paths.src}/**/*.htm`,
            `${paths.src}/img/**/*.*`,
        ],
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                exclude: `${paths.src}/fonts`,
                use: [
                    'style-loader',
                    {
                        loader: 'string-replace-loader',
                        options: {
                            search: '@img',
                            replace: '../img',
                            flags: 'g',
                        },
                    },
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
        ...htmlPages,
        new CopyPlugin({
            patterns: [
                {
                    from: `${srcFolder}/img`,
                    to: 'img',
                    noErrorOnMissing: true,
                    force: true,
                }, {
                    from: `${paths.src}/favicon.ico`,
                    to: './',
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
