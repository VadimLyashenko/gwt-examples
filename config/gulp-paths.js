const build = './dist';
const src = './src';

export default {
    srcFolder: src,

    src: {
        js: `${src}/js/app.js`,
        images: `${src}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${src}/img/**/*.svg`,
        fonts: `${src}/fonts/`,
        svgIcons: `${src}/svg-icons/*.svg`,
    },

    build: {
        html: `${build}/`,
        css: `${build}/css/`,
        js: `${build}/js/`,
        images: `${build}/img/`,
        fonts: `${build}/fonts/`,
    },
};
