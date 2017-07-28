/**
 *
 * postcss配置
 *
*/

const AUTOPREFIXER_BROWSER = ["chrome >= 35", "Firefox >= 31", "Opera >= 12", "safari >= 7.1", "Explorer >= 9"];

module.exports = {
    parse: 'postcss-scss',
    syntax: 'postcss-scss',
    sourceMap: true,
    plugins: [
        require('postcss-pxtorem')({
            rootValue: 100,
            propWhiteList: []
        }),
        require('precss')(),
        require('autoprefixer')({browsers: AUTOPREFIXER_BROWSER}),
        require('rucksack-css')({autoprefixer: true})
    ]
}
