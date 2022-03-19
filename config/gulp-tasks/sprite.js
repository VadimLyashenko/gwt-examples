import svgSprite from 'gulp-svg-sprite';

export const sprite = () => app.gulp.src(`${app.path.src.svgIcons}`, {})
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
        title: 'SVG',
        message: 'Error: <%= error.message %>',
    })))
    .pipe(svgSprite({
        mode: {
            symbol: {
                sprite: '../img/icons/icons.svg',
            },
        },
        shape: {
            id: {
                separator: '',
                generator: 'svg-',
            },
            transform: [
                {
                    svgo: {
                        plugins: [
                            {
                                name: 'preset-default',
                            },
                            'removeXMLNS',
                        ],
                    },
                },
            ],
        },
        svg: {
            rootAttributes: {
                style: 'display: none;',
            },
            xmlDeclaration: false,
        },
    }))
    .pipe(app.gulp.dest(`${app.path.srcFolder}`));
