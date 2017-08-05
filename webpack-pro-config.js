/**
 * 
 * webpack生产配置
 * 
 * */ 

const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');

const ExtractCommon = new ExtractPlugin('styles/common.css');
const ExtractModule = new ExtractPlugin('styles/module.css');
const ExtractVendor = new ExtractPlugin('styles/vendor.css');

module.exports = {
    devtool: 'source-map',
    entry: {
        main: path.join(__dirname, 'src/js/index.jsx'),
        vendor: [
            'react', 
            'react-dom',
            'redux',
            'redux-saga', 
            'react-router',
            'antd-mobile',
            'moment'
        ]
    },

    output: {
        path: path.join(__dirname,'/dist'),
        publicPath: '',
        filename: 'js/[name].bundle.js'
    },

    resolve: {
        alias: {
            styles: path.join(__dirname, 'src/styles'),
            app: path.join(__dirname, 'src/js')
        },
        extensions: ['.web.js', '.js', '.jsx', '.json', '.css', '.scss', '*'],
        modules: ['node_modules', path.resolve(__dirname,'./node_modules')]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEV__: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            composser: {
                warnings: true 
            }
        }),
        new HtmlWebpackPlugin({
            title: 'production',
            template: path.resolve(__dirname,'./src/index.html'),
            hash: true,
            inject: 'body',
            filename: 'index.html',
            favicon: './favicon.ico',
            chunk: ['vendor', 'main'],
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/[name].bundle.js'
        }),
        new webpack.HashedModuleIdsPlugin(),
        ExtractVendor,
        ExtractCommon,
        ExtractModule,
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader', 'eslint-loader'],
                exclude: /node_modules/
            },

            // 私有样式
            {
                test: /\.(css|scss)$/,
                use: ExtractModule.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: true,
                                localIdentName: '[local]__[hash:base64:5]',
                                minimize: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {path: './postcss.config.js'}
                            }
                        }
                    ]
                }),
                include: path.resolve(__dirname,'./src/js')
            },

            // 公共样式
            {
                test: /\.(css|scss)$/,
                use: ExtractCommon.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                minimize: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {path: './postcss.config.js'}
                            }
                        }
                    ]
                }),
                include: path.resolve(__dirname,'./src/styles')
            },

            // 依赖库样式
            {
                test: /\.(css|scss)$/,
                use: ExtractVendor.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                minimize: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {path: './postcss.config.js'}
                            }
                        }
                    ]
                }),
                include: path.resolve(__dirname, './node_modules')
            },

            {
                test: /\.svg$/,
                use: 'svg-sprite-loader',
                include: [
                    require.resolve('antd-mobile').replace(/warn\.js$/, '')
                ]
            },

            {
                test: /\.(otf|eot|ttf|svg|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: '[name].[ext]?[hash:base64:5]',
                            output: 'styles/fonts'
                        }
                    }
                ],
                include: path.resolve(__dirname, './src/fonts')
            },

            {
                test: /\.(img|jpg|png|ico)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: '[name].[ext]?[hash:base64:5]',
                            output: 'images/'
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    }
};
