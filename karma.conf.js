// Karma configuration
// Generated on Sun Jul 30 2017 19:52:13 GMT+0800 (中国标准时间)

const path = require('path');
const webpack = require('webpack');

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai'],


        // list of files / patterns to load in the browser
        files: [
            'test/**/*_test.js'
        ],

        // list of files to exclude
        exclude: [],

        // webpack配置
        webpack: {
            devtool: 'inline-source-map',
            module: {
                rules: [{
                        test: /\.(js|jsx)$/,
                        use: {
                            loader: 'babel-loader'
                        },
                        exclude: /node_modules/
                    },
                    // 组件私有样式
                    {
                        test: /\.(css|scss)$/,
                        use: [{
                            loader: 'style-loader'
                        }, {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true,
                                importLoaders: 1,
                                localIdentName: '[local]__[hash:base64:5]'
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: './postcss.config.js'
                                }
                            }
                        }],
                        include: path.join(__dirname, '/src/js')
                    },
                    // 公有样式
                    {
                        test: /\.(css|scss)$/,
                        use: [{
                            loader: 'style-loader'
                        }, {
                            loader: 'css-loader'
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: './postcss.config.js'
                                }
                            }
                        }],
                        include: path.join(__dirname, '/src/styles')
                    },
                    // 依赖库样式
                    {
                        test: /\.css$/,
                        use: [{
                            loader: 'style-loader'
                        }, {
                            loader: 'css-loader'
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: './postcss.config.js'
                                }
                            }
                        }],
                        include: path.join(__dirname, '/node_modules')
                    },

                    {
                        test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
                        use: [{
                            loader: 'url-loader',
                            options: {
                                limit: 10000
                            }
                        }]
                    },

                    {
                        test: /\.(img|jpg|png|ico)$/,
                        use: [{
                            loader: 'url-loader',
                            options: {
                                limit: 10000
                            }
                        }],
                        exclude: /node_modules/
                    },

                    {
                        test: /\.svg$/i,
                        loader: 'svg-sprite-loader',
                        include: require.resolve('antd-mobile').replace(/warn\.js$/, '')
                    }
                ]
            },
            externals: {
                // 使用enzyme配置
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true,
                'react-addons-test-utils': true
            },
            resolve: {
                extensions: ['.web.js', '.js', '.jsx', '.css', '.scss', '.json','*'],
                modules: ['node_modules', path.join(__dirname, './node_modules')],
                alias: {
                    styles: path.join(__dirname, './src/styles'),
                    app: path.join(__dirname, './src/js')
                }
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify('test')
                })
            ]
        },

        plugins: [
            'karma-webpack',
            'karma-mocha',
            'karma-chai',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-coverage'
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test/**/*_test.js': ['webpack']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['coverage','mocha'],

        mochaReporter: {
            output: 'autowatch',
            showDiff: true,
            divider: '---'
        },

        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS','Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
