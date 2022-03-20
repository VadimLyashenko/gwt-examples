import fs from 'fs';
import toFont from 'gulp-fonter-fix';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => app.gulp.src(`${app.path.src.fonts}*.otf`, {})
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
        title: 'FONTS',
        message: 'Error: <%= error.message %>',
    })))
    .pipe(toFont({
        formats: ['ttf'],
    }))
    .pipe(app.gulp.dest(`${app.path.src.fonts}`));

export const ttfToWoff = () => app.gulp.src(`${app.path.src.fonts}*.ttf`, {})
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
        title: 'FONTS',
        message: 'Error: <%= error.message %>',
    })))
    .pipe(toFont({
        formats: ['woff'],
    }))
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    .pipe(app.gulp.src(`${app.path.src.fonts}*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    .pipe(app.gulp.src(`${app.path.src.fonts}*.{woff,woff2}`))
    .pipe(app.gulp.dest(`${app.path.build.fonts}`));

export const fontsStyle = done => {
    const fontsStyles = `${app.path.srcFolder}/scss/fonts/fonts.scss`;

    if (app.isFontsReW && fs.existsSync(fontsStyles)) {
        fs.unlinkSync(fontsStyles);
    }

    fs.readdir(app.path.build.fonts, function(err, fontsFiles) {
        if (!fontsFiles) {
            fs.existsSync(fontsStyles) && fs.unlinkSync(fontsStyles);
            return;
        }

        if (fs.existsSync(fontsStyles)) {
            console.log('File scss/fonts/fonts.scss already exist. Use gulp fonts --rewrite for remove');
            return;
        }

        addFontsStyles(fontsStyles, fontsFiles);
    });

    done();
};

function addFontsStyles(styles, fonts) {
    fs.writeFileSync(styles, '');

    let newFileOnly;

    for (let i = 0; i < fonts.length; i++) {
        const fontFileName = fonts[i].split('.')[0];

        if (newFileOnly !== fontFileName) {
            const fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;

            if (fontWeight.toLowerCase() === 'thin') {
                fontWeight = 100;
            } else if (fontWeight.toLowerCase() === 'extralight') {
                fontWeight = 200;
            } else if (fontWeight.toLowerCase() === 'light') {
                fontWeight = 300;
            } else if (fontWeight.toLowerCase() === 'medium') {
                fontWeight = 500;
            } else if (fontWeight.toLowerCase() === 'semibold') {
                fontWeight = 600;
            } else if (fontWeight.toLowerCase() === 'bold') {
                fontWeight = 700;
            } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                fontWeight = 800;
            } else if (fontWeight.toLowerCase() === 'black') {
                fontWeight = 900;
            } else {
                fontWeight = 400;
            }

            fs.appendFileSync(styles, `@font-face {
    font-family: ${fontName};
    font-display: swap;
    src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");
    font-weight: ${fontWeight};
    font-style: normal;\n}\r\n\n`);

            newFileOnly = fontFileName;
        }
    }
}
