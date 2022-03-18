const build = './dist';
const src = './src';

export default {
    srcFolder: src,

    src: {
        html: `${src}/*.html`,
        scss: `${src}/scss/style.scss`,
        js: `${src}/js/app.js`,
        images: `${src}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${src}/img/**/*.svg`,
        fonts: `${src}/fonts/*.*`,
        svgicons: `${src}/svgicons/*.svg`,
    },

    build: {
        html: `${build}/`,
        css: `${build}/css/`,
        js: `${build}/js/`,
        images: `${build}/img/`,
        fonts: `${build}/fonts/`,
    },
};
