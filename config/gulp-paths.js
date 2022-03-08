const buildFolder = './dist'
const srcFolder = './src'

export default {
    srcFolder,

    build: {
        html: `${buildFolder}/`,
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        images: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts/`,
        files: `${buildFolder}/files/`
    },

    src: {
        html: `${srcFolder}/*.html`,
        js: `${srcFolder}/js/app.js`,
        scss: `${srcFolder}/scss/style.scss`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        fonts: `${srcFolder}/fonts/*.*`,
        files: `${srcFolder}/files/**/*.*`,
        svgicons: `${srcFolder}/svgicons/*.svg`,
    },
}
